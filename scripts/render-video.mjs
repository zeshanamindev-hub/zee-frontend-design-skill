#!/usr/bin/env node
/**
 * render-video.mjs: render an HTML timeline to MP4, frame by frame (deterministic, no screen recording).
 *
 * Usage:
 *   node render-video.mjs <timeline.html|url> <out.mp4> [--size 1920x1080] [--fps 30] [--duration 6]
 *                         [--scale 1] [--crf 20] [--png] [--start 0] [--channel chrome]
 *
 * How time is controlled (first match wins):
 *   1. The page defines  window.__render = (tSeconds) => { … }   (sync or async; pure function of t).
 *      Optional window.__duration (seconds) sets the default length.  ← recommended (see templates/video-timeline.html)
 *   2. Otherwise every Web Animation / CSS animation / CSS transition from document.getAnimations()
 *      is paused and seeked to t on each frame (GSAP: call gsap.globalTimeline.pause() and expose
 *      window.__render = t => gsap.globalTimeline.seek(t)).
 *   The page gets ?render=1 appended so it can skip real-time playback loops.
 *
 * Output: H.264 MP4 (yuv420p, +faststart): plays everywhere, web-ready. Needs ffmpeg on PATH.
 * Setup (in the project): npm i -D playwright   (+ `npx playwright install chromium`, or --channel chrome / CHROME_PATH)
 */
import { createRequire } from "node:module";
import { existsSync, mkdirSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { pathToFileURL } from "node:url";
import { spawn, spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(`--${n}`); if (i === -1) return d; const v = args[i + 1]; return v === undefined || v.startsWith("--") ? true : v; };
const pos = args.filter((a, i) => !a.startsWith("--") && !(i > 0 && args[i - 1].startsWith("--") && args[i - 1] !== "--png"));
const [target, outFile] = pos;
if (!target || !outFile) { console.error("Usage: node render-video.mjs <timeline.html|url> <out.mp4> [--size 1920x1080] [--fps 30] [--duration 6] [--scale 1] [--crf 20] [--png] [--start 0] [--channel chrome]"); process.exit(1); }
if (spawnSync("ffmpeg", ["-version"]).status !== 0) { console.error("ffmpeg not found on PATH. Install it (macOS: brew install ffmpeg · Ubuntu: sudo apt install ffmpeg · Windows: winget install ffmpeg)"); process.exit(1); }
const req = createRequire(join(process.cwd(), "noop.js"));
let chromium;
try { ({ chromium } = req("playwright")); } catch { console.error("Playwright not found in this project. Run: npm i -D playwright"); process.exit(1); }

const [W, H] = String(flag("size", "1920x1080")).split("x").map((n) => parseInt(n, 10));
const fps = parseFloat(flag("fps", "30"));
const scale = parseFloat(flag("scale", "1"));
const crf = String(flag("crf", "20"));
const start = parseFloat(flag("start", "0"));
const png = !!flag("png", false);
const channel = flag("channel", undefined);
const base = /^https?:\/\//.test(target) ? target : existsSync(target) ? pathToFileURL(resolve(target)).href : (console.error(`Not a URL or file: ${target}`), process.exit(1));
const url = base + (base.includes("?") ? "&" : "?") + "render=1";

const browser = await chromium.launch({ headless: true, ...(channel && channel !== true ? { channel } : {}), ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: scale });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e.message || e)));
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => page.waitForLoadState("load"));
await page.evaluate(async () => { if (document.fonts) await document.fonts.ready; await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r))))); });

const info = await page.evaluate(() => {
  const hook = typeof window.__render === "function";
  if (!hook) document.getAnimations().forEach((a) => a.pause());
  const anims = document.getAnimations();
  const longest = anims.reduce((m, a) => { const t = a.effect?.getComputedTiming?.(); return Math.max(m, t && isFinite(t.endTime) ? t.endTime : 0); }, 0);
  return { hook, duration: typeof window.__duration === "number" ? window.__duration : longest / 1000, animations: anims.length };
});
const fit = await page.evaluate(() => ({ w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight }));
if (fit.w > W + 1 || fit.h > H + 1) console.warn(`⚠ The timeline is ${fit.w}×${fit.h}px but the video frame is ${W}×${H}px: content outside the frame will be cropped. Author the timeline at the output size (e.g. a separate 1080×1920 layout for 9:16).`);
const duration = parseFloat(flag("duration", info.duration > 0 ? String(info.duration) : "6"));
const frames = Math.round(duration * fps);
if (!info.hook && info.animations === 0) console.warn("⚠ No window.__render hook and no Web/CSS animations found: the video will be static.");

mkdirSync(dirname(resolve(outFile)), { recursive: true });
const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(fps), "-i", "-",
  "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2", "-c:v", "libx264", "-preset", "veryfast", "-crf", crf, "-pix_fmt", "yuv420p", "-movflags", "+faststart", resolve(outFile)], { stdio: ["pipe", "inherit", "inherit"] });
const t0 = Date.now();
for (let f = 0; f < frames; f++) {
  const t = start + f / fps;
  await page.evaluate(async (t) => {
    if (typeof window.__render === "function") await window.__render(t);
    else document.getAnimations().forEach((a) => { a.pause(); a.currentTime = t * 1000; });
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  }, t);
  const buf = await page.screenshot({ type: png ? "png" : "jpeg", ...(png ? {} : { quality: 95 }), clip: { x: 0, y: 0, width: W, height: H } });
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
  if (f % Math.max(1, Math.round(fps)) === 0) process.stdout.write(`\r  frame ${f + 1}/${frames}`);
}
ff.stdin.end();
const code = await new Promise((r) => ff.on("close", r));
await browser.close();
console.log(`\r  ${frames} frames · ${duration}s @ ${fps}fps · ${W * scale}×${H * scale} · ${((Date.now() - t0) / 1000).toFixed(1)}s render time`);
if (errors.length) console.warn(`⚠ page errors:\n  ${errors.join("\n  ")}`);
if (code !== 0) { console.error(`ffmpeg exited with code ${code}`); process.exit(1); }
console.log(`✓ ${resolve(outFile)}  (time source: ${info.hook ? "window.__render(t)" : `${info.animations} Web/CSS animation(s)`})`);
