#!/usr/bin/env node
/**
 * capture.mjs: Playwright screenshots for design work.
 *
 * MODES
 *   shots   <url|file.html> [--out dir] [--widths 375,768,1280,1536] [--full] [--dark] [--wait 1500]
 *           → one PNG per width (responsive QA, competitor/inspiration capture)
 *   render  <file.html|url> <out.png> [--size 1080x1350] [--scale 2]
 *           → exact-size PNG of a graphic built in HTML/CSS (social posts, OG images, thumbnails)
 *
 * BROWSER (pick one)
 *   --channel chrome   use the Google Chrome already installed on this machine (no download needed)
 *   (default)          Playwright's bundled Chromium: run once `npx playwright install chromium`
 *
 * SETUP (in the project folder):  npm i -D playwright
 * Examples:
 *   node capture.mjs shots https://example.com --out .design/shots/example --full --channel chrome
 *   node capture.mjs shots http://localhost:3000 --widths 375,1440 --dark
 *   node capture.mjs render og.html public/og.png --size 1200x630
 */
import { createRequire } from "node:module";
import { mkdirSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const mode = args[0];
const flag = (name, def) => {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return def;
  const v = args[i + 1];
  return v === undefined || v.startsWith("--") ? true : v;
};
const positional = args.filter((a, i) => !a.startsWith("--") && !(i > 0 && args[i - 1].startsWith("--") && !["--full", "--dark"].includes(args[i - 1])));

function usage(msg) {
  if (msg) console.error(`Error: ${msg}\n`);
  console.error("Usage:\n  node capture.mjs shots <url|file> [--out dir] [--widths 375,768,1280,1536] [--full] [--dark] [--wait ms] [--channel chrome]\n  node capture.mjs render <file|url> <out.png> [--size 1080x1350] [--scale 2] [--channel chrome]");
  process.exit(1);
}

// Resolve Playwright from the PROJECT (cwd), not from the skill folder.
function loadPlaywright() {
  const req = createRequire(join(process.cwd(), "noop.js"));
  try {
    return req("playwright");
  } catch {
    usage("Playwright not found in this project. Run: npm i -D playwright  (then either `npx playwright install chromium` or pass --channel chrome)");
  }
}

const toUrl = (target) =>
  /^https?:\/\//.test(target) ? target : existsSync(target) ? pathToFileURL(resolve(target)).href : usage(`Not a URL or existing file: ${target}`);

async function launch(chromium) {
  const channel = flag("channel", undefined);
  const executablePath = process.env.CHROME_PATH || undefined;
  return chromium.launch({ headless: true, ...(channel ? { channel } : {}), ...(executablePath ? { executablePath } : {}) });
}

async function shots() {
  const target = positional[1] || usage("shots needs a URL or file");
  const out = resolve(flag("out", ".design/shots"));
  const widths = String(flag("widths", "375,768,1280,1536")).split(",").map((w) => parseInt(w, 10)).filter(Boolean);
  const full = !!flag("full", false);
  const dark = !!flag("dark", false);
  const wait = parseInt(flag("wait", "1200"), 10);
  mkdirSync(out, { recursive: true });
  const { chromium } = loadPlaywright();
  const browser = await launch(chromium);
  const heights = { 375: 812, 390: 844, 768: 1024, 1024: 768, 1280: 800, 1440: 900, 1536: 864, 1920: 1080 };
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: heights[width] || 900 },
      deviceScaleFactor: width < 768 ? 2 : 1,
      colorScheme: dark ? "dark" : "light",
      isMobile: width < 768,
      hasTouch: width < 1024,
    });
    const page = await context.newPage();
    await page.goto(toUrl(target), { waitUntil: "networkidle", timeout: 60000 }).catch(() => page.waitForLoadState("load"));
    await page.waitForTimeout(wait);
    // Measure against the intended width (mobile emulation can widen the layout viewport to fit overflowing content)
    const overflow = await page.evaluate((w) => document.documentElement.scrollWidth - w, width);
    const file = join(out, `${width}${dark ? "-dark" : ""}${full ? "-full" : ""}.png`);
    await page.screenshot({ path: file, fullPage: full });
    console.log(`${file}${overflow > 1 ? `  ⚠ horizontal overflow: ${overflow}px` : ""}`);
    await context.close();
  }
  await browser.close();
}

async function render() {
  const target = positional[1] || usage("render needs an HTML file or URL");
  const outFile = positional[2] || usage("render needs an output .png path");
  const [w, h] = String(flag("size", "1080x1350")).split("x").map((n) => parseInt(n, 10));
  const scale = parseFloat(flag("scale", "2"));
  const { chromium } = loadPlaywright();
  const browser = await launch(chromium);
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
  await page.goto(toUrl(target), { waitUntil: "networkidle", timeout: 60000 }).catch(() => page.waitForLoadState("load"));
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.screenshot({ path: resolve(outFile), clip: { x: 0, y: 0, width: w, height: h } });
  console.log(`${resolve(outFile)}  (${w}×${h} @${scale}x → ${w * scale}×${h * scale}px)`);
  await browser.close();
}

if (mode === "shots") await shots();
else if (mode === "render") await render();
else usage(mode ? `Unknown mode: ${mode}` : undefined);
