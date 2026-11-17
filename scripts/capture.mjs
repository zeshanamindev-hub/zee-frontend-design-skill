#!/usr/bin/env node
/**
 * capture.mjs: Playwright screenshots for design work.
 *
 * MODES
 *   shots   <url|file.html> [more urls…] [--list urls.txt] [--out dir] [--widths 375,768,1280,1536]
 *           [--full] [--no-scroll] [--sections [selector]] [--dark] [--wait 1200]
 *           → one PNG per width (+ one per section with --sections) and a report.json per target
 *   render  <file.html|url> <out.png> [--size 1080x1350] [--scale 2]
 *           → exact-size PNG of a graphic built in HTML/CSS (social posts, OG images, thumbnails)
 *
 * WHAT "shots" DOES BEFORE EACH SCREENSHOT
 *   1. Scrolls the whole page in steps (default whenever --full or --sections is used; --no-scroll disables)
 *      so lazy-loaded images load and scroll-triggered reveals run, then returns to the top.
 *   2. Forces loading="lazy" images to eager, waits for every <img> to finish + decode, and for web fonts.
 *   3. Records console errors, page errors, failed requests (4xx/5xx/network) and broken images.
 *   4. Measures horizontal overflow against the configured width (any value > 0 px is reported).
 *
 * BROWSER (pick one)
 *   --channel chrome   use the Google Chrome already installed on this machine (no download needed)
 *   CHROME_PATH=/path  use a specific Chrome/Chromium binary
 *   (default)          Playwright's bundled Chromium: run once `npx playwright install chromium`
 *
 * SETUP (in the project folder):  npm i -D playwright
 * Examples:
 *   node capture.mjs shots https://example.com --out .design/shots/example --full --channel chrome
 *   node capture.mjs shots https://a.com https://b.com --widths 390,1440 --sections --channel chrome
 *   node capture.mjs shots --list .design/research/competitors.txt --full
 *   node capture.mjs render og.html public/og.png --size 1200x630
 * Exit code: 0 always for shots (issues are reported, not fatal), 1 on usage errors.
 */
import { createRequire } from "node:module";
import { mkdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const mode = args[0];
const BOOL = new Set(["--full", "--dark", "--no-scroll"]);
const flag = (name, def) => {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return def;
  const v = args[i + 1];
  return v === undefined || v.startsWith("--") ? true : v;
};
const positional = args.filter((a, i) => {
  if (a.startsWith("--")) return false;
  const prev = args[i - 1];
  if (i > 0 && prev.startsWith("--") && !BOOL.has(prev)) {
    // --sections takes an optional selector: treat the next arg as its value only if it doesn't look like a URL/file
    if (prev === "--sections") return /^https?:\/\//.test(a) || existsSync(a);
    return false;
  }
  return true;
});

function usage(msg) {
  if (msg) console.error(`Error: ${msg}\n`);
  console.error(
    "Usage:\n  node capture.mjs shots <url|file> [more…] [--list urls.txt] [--out dir] [--widths 375,768,1280,1536] [--full] [--no-scroll] [--sections [selector]] [--dark] [--wait ms] [--channel chrome]\n  node capture.mjs render <file|url> <out.png> [--size 1080x1350] [--scale 2] [--channel chrome]"
  );
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

const slug = (target) =>
  target.replace(/^https?:\/\//, "").replace(/[?#].*$/, "").replace(/\/+$/, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").slice(0, 60).toLowerCase() || "page";

async function launch(chromium) {
  const channel = flag("channel", undefined);
  const executablePath = process.env.CHROME_PATH || undefined;
  return chromium.launch({ headless: true, ...(channel && channel !== true ? { channel } : {}), ...(executablePath ? { executablePath } : {}) });
}

/** Scroll through the page so lazy content loads and scroll-driven effects run; then wait for images + fonts. */
async function prepare(page, { scroll }) {
  await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((img) => (img.loading = "eager")));
  if (scroll) {
    await page.evaluate(async () => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const step = Math.max(200, Math.floor(window.innerHeight * 0.8));
      let y = 0, guard = 0;
      while (y < document.documentElement.scrollHeight && guard++ < 200) {
        window.scrollTo(0, y);
        await sleep(120);
        y += step;
      }
      window.scrollTo(0, document.documentElement.scrollHeight);
      await sleep(400);
      window.scrollTo(0, 0);
      await sleep(300);
    });
  }
  await page
    .evaluate(async () => {
      const imgs = [...document.images];
      await Promise.race([
        Promise.all(imgs.map((img) => (img.complete ? (img.decode ? img.decode().catch(() => {}) : null) : new Promise((r) => { img.addEventListener("load", r, { once: true }); img.addEventListener("error", r, { once: true }); })))),
        new Promise((r) => setTimeout(r, 10000)),
      ]);
      if (document.fonts) await document.fonts.ready;
    })
    .catch(() => {});
}

async function shots() {
  let targets = positional.slice(1);
  const list = flag("list", undefined);
  if (list && list !== true) targets = targets.concat(readFileSync(list, "utf8").split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#")));
  if (!targets.length) usage("shots needs at least one URL or file (or --list file)");
  const outRoot = resolve(flag("out", ".design/shots"));
  const widths = String(flag("widths", "375,768,1280,1536")).split(",").map((w) => parseInt(w, 10)).filter(Boolean);
  const full = !!flag("full", false);
  const dark = !!flag("dark", false);
  const secFlag = flag("sections", undefined);
  const sectionSel = secFlag === undefined ? null : secFlag === true || /^https?:\/\//.test(secFlag) || existsSync(secFlag) ? "main > section, body > section, main > div > section, [data-section], body > header, body > footer, main > header, main > footer" : secFlag;
  const scroll = !flag("no-scroll", false) && (full || !!sectionSel);
  const wait = parseInt(flag("wait", "1200"), 10);
  const { chromium } = loadPlaywright();
  const browser = await launch(chromium);
  const heights = { 360: 800, 375: 812, 390: 844, 414: 896, 768: 1024, 1024: 768, 1280: 800, 1366: 768, 1440: 900, 1536: 864, 1920: 1080 };

  for (const target of targets) {
    const out = targets.length > 1 ? join(outRoot, slug(target)) : outRoot;
    mkdirSync(out, { recursive: true });
    const report = { target, capturedAt: new Date().toISOString(), widths: {} };
    console.log(`\n▶ ${target}`);
    for (const width of widths) {
      const context = await browser.newContext({
        viewport: { width, height: heights[width] || 900 },
        deviceScaleFactor: width < 768 ? 2 : 1,
        colorScheme: dark ? "dark" : "light",
        isMobile: width < 768,
        hasTouch: width < 1024,
      });
      const page = await context.newPage();
      const issues = { consoleErrors: [], pageErrors: [], failedRequests: [], brokenImages: [] };
      page.on("console", (m) => m.type() === "error" && issues.consoleErrors.push(m.text().slice(0, 300)));
      page.on("pageerror", (e) => issues.pageErrors.push(String(e.message || e).slice(0, 300)));
      page.on("requestfailed", (r) => issues.failedRequests.push(`${r.failure()?.errorText || "failed"} ${r.url()}`.slice(0, 300)));
      page.on("response", (r) => r.status() >= 400 && issues.failedRequests.push(`${r.status()} ${r.url()}`.slice(0, 300)));
      let navError = null;
      await page.goto(toUrl(target), { waitUntil: "networkidle", timeout: 60000 }).catch(async (e) => {
        navError = String(e.message || e).split("\n")[0];
        await page.waitForLoadState("load").catch(() => {});
      });
      if (navError && !/Timeout/i.test(navError)) {
        console.log(`  ✖ ${width}px: could not load (${navError})`);
        report.widths[width] = { error: navError };
        await context.close();
        continue;
      }
      await prepare(page, { scroll });
      await page.waitForTimeout(wait);
      // Measure against the intended width (mobile emulation can widen the layout viewport to fit overflowing content)
      const overflow = await page.evaluate((w) => document.documentElement.scrollWidth - w, width);
      issues.brokenImages = await page.evaluate(() => [...document.images].filter((i) => i.getAttribute("src") && i.complete && i.naturalWidth === 0).map((i) => i.getAttribute("src").slice(0, 200)));
      const file = join(out, `${width}${dark ? "-dark" : ""}${full ? "-full" : ""}.png`);
      await page.screenshot({ path: file, fullPage: full });
      const files = [file];
      if (sectionSel) {
        const handles = await page.$$(sectionSel);
        let n = 0;
        for (const h of handles) {
          const box = await h.boundingBox();
          if (!box || box.height < 40 || box.width < 100) continue;
          n++;
          const sf = join(out, `${width}${dark ? "-dark" : ""}-section-${String(n).padStart(2, "0")}.png`);
          await h.scrollIntoViewIfNeeded().catch(() => {});
          await page.waitForTimeout(250);
          await h.screenshot({ path: sf }).catch(() => n--);
          files.push(sf);
        }
      }
      const uniq = (a) => [...new Set(a)];
      Object.keys(issues).forEach((k) => (issues[k] = uniq(issues[k])));
      report.widths[width] = { files, overflowPx: overflow, ...issues };
      const flags = [
        overflow > 0 ? `⚠ horizontal overflow ${overflow}px` : null,
        issues.consoleErrors.length ? `⚠ ${issues.consoleErrors.length} console error(s)` : null,
        issues.pageErrors.length ? `⚠ ${issues.pageErrors.length} page error(s)` : null,
        issues.failedRequests.length ? `⚠ ${issues.failedRequests.length} failed request(s)` : null,
        issues.brokenImages.length ? `⚠ ${issues.brokenImages.length} broken image(s)` : null,
      ].filter(Boolean);
      console.log(`  ${file}${files.length > 1 ? ` (+${files.length - 1} section shots)` : ""}${flags.length ? "  " + flags.join(" · ") : "  ✓ no issues"}`);
      await context.close();
    }
    writeFileSync(join(out, "report.json"), JSON.stringify(report, null, 2));
    console.log(`  report → ${join(out, "report.json")}`);
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
  await prepare(page, { scroll: false });
  await page.screenshot({ path: resolve(outFile), clip: { x: 0, y: 0, width: w, height: h } });
  console.log(`${resolve(outFile)}  (${w}×${h} @${scale}x → ${w * scale}×${h * scale}px)`);
  await browser.close();
}

if (mode === "shots") await shots();
else if (mode === "render") await render();
else usage(mode ? `Unknown mode: ${mode}` : undefined);
