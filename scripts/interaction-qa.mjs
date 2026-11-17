#!/usr/bin/env node
/**
 * interaction-qa.mjs: automated interaction & accessibility checks that screenshots can't catch.
 *
 * Usage:
 *   node interaction-qa.mjs <url|file.html> [--width 1280] [--tabs 60] [--json report.json] [--channel chrome]
 *
 * Checks
 *   1. Console errors, page errors, failed requests (4xx/5xx/network)
 *   2. Keyboard: Tab walk (focus order, missing visible focus indicator, possible focus traps)
 *   3. Accessible names: buttons/links with no name; <img> without alt; broken images
 *   4. Tabs ([role=tablist]): ArrowRight moves focus/selection between [role=tab]
 *   5. Sliders ([role=slider], input[type=range]): Arrow keys change the value
 *   6. Dialogs (triggers with aria-haspopup="dialog", aria-controls → dialog, or data-qa-dialog):
 *      opens, moves focus inside, closes on Escape, returns focus to the trigger
 *   7. Video: seeking works (fails when the server ignores HTTP Range requests); checks 206 support
 *   8. Reduced motion: animations still running with prefers-reduced-motion: reduce
 *   9. Horizontal overflow at the tested width
 *
 * Setup (in the project): npm i -D playwright   (+ `npx playwright install chromium`, or use --channel chrome)
 * Exit code: 1 if any FAIL, else 0.
 */
import { createRequire } from "node:module";
import { existsSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(`--${n}`); if (i === -1) return d; const v = args[i + 1]; return v === undefined || v.startsWith("--") ? true : v; };
const target = args.find((a, i) => !a.startsWith("--") && !(i > 0 && args[i - 1].startsWith("--")));
if (!target) { console.error("Usage: node interaction-qa.mjs <url|file.html> [--width 1280] [--tabs 60] [--json out.json] [--channel chrome]"); process.exit(1); }
const req = createRequire(join(process.cwd(), "noop.js"));
let chromium;
try { ({ chromium } = req("playwright")); } catch { console.error("Playwright not found in this project. Run: npm i -D playwright (then `npx playwright install chromium` or pass --channel chrome)"); process.exit(1); }
const url = /^https?:\/\//.test(target) ? target : existsSync(target) ? pathToFileURL(resolve(target)).href : (console.error(`Not a URL or file: ${target}`), process.exit(1));
const width = parseInt(flag("width", "1280"), 10);
const maxTabs = parseInt(flag("tabs", "60"), 10);
const channel = flag("channel", undefined);

const results = [];
const add = (level, check, msg, detail) => results.push({ level, check, msg, ...(detail ? { detail } : {}) });

const browser = await chromium.launch({ headless: true, ...(channel ? { channel } : {}), ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
const context = await browser.newContext({ viewport: { width, height: 900 } });
const page = await context.newPage();
const consoleErrors = [], pageErrors = [], failed = [];
page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
page.on("pageerror", (e) => pageErrors.push(String(e.message || e)));
page.on("requestfailed", (r) => failed.push(`${r.failure()?.errorText || "failed"} ${r.url()}`));
page.on("response", (r) => r.status() >= 400 && failed.push(`${r.status()} ${r.url()}`));
let navError = null;
const resp = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(async (e) => { navError = e; return null; });
if (navError && !/Timeout/i.test(String(navError))) { console.error(`FAIL  [navigation] Could not load ${url}: ${String(navError.message || navError).split("\n")[0]}`); await browser.close(); process.exit(2); }
if (resp && resp.status() >= 400) { console.error(`FAIL  [navigation] ${url} returned HTTP ${resp.status()}`); await browser.close(); process.exit(2); }
await page.waitForTimeout(500);

// Helper injected into the page: short, stable description of an element
await page.addScriptTag({ content: `window.__qaDesc = (el) => { if (!el) return "(none)"; let s = el.tagName.toLowerCase(); if (el.id) s += "#" + el.id; const c = (el.getAttribute("class")||"").trim().split(/\\s+/).filter(Boolean).slice(0,2); if (c.length) s += "." + c.join("."); const t = (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\\s+/g," ").slice(0,30); return t ? s + ' "' + t + '"' : s; };` });

// 1. Console & network
consoleErrors.forEach((e) => add("FAIL", "console", e));
pageErrors.forEach((e) => add("FAIL", "page-error", e));
[...new Set(failed)].forEach((e) => add("FAIL", "request", e));

// 3. Accessible names, alt text, broken images
const names = await page.evaluate(() => {
  const out = { noName: [], noAlt: [], broken: [] };
  const vis = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none"; };
  document.querySelectorAll("button, a[href], [role=button], [role=link]").forEach((el) => {
    if (!vis(el)) return;
    const name = (el.getAttribute("aria-label") || "").trim() || (el.getAttribute("title") || "").trim() || (el.textContent || "").trim() ||
      [...el.querySelectorAll("img[alt]")].map((i) => i.alt).join("").trim() ||
      (el.getAttribute("aria-labelledby") || "").split(/\s+/).map((id) => document.getElementById(id)?.textContent || "").join("").trim();
    if (!name) out.noName.push(window.__qaDesc(el));
  });
  document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("alt")) out.noAlt.push(window.__qaDesc(img) + " src=" + (img.getAttribute("src") || "").slice(0, 60));
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) out.broken.push(img.getAttribute("src").slice(0, 80));
  });
  return out;
});
names.noName.forEach((d) => add("FAIL", "a11y-name", `Interactive element has no accessible name: ${d}`));
names.noAlt.forEach((d) => add("FAIL", "a11y-alt", `<img> without alt attribute: ${d}`));
names.broken.forEach((d) => add("FAIL", "image", `Broken image: ${d}`));

// 2. Keyboard Tab walk
await page.evaluate(() => { document.activeElement && document.activeElement.blur(); window.scrollTo(0, 0); });
await page.mouse.click(1, 1).catch(() => {});
const seen = [];
let noIndicator = 0;
for (let i = 0; i < maxTabs; i++) {
  await page.keyboard.press("Tab");
  const info = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const pick = (s) => [s.outlineStyle, s.outlineWidth, s.outlineColor, s.boxShadow, s.borderColor, s.backgroundColor, s.textDecorationLine, s.color].join("|");
    const focused = pick(getComputedStyle(el));
    el.blur();
    const blurred = pick(getComputedStyle(el));
    el.focus({ preventScroll: true });
    return { desc: window.__qaDesc(el), visible: focused !== blurred };
  });
  if (!info) break;
  if (seen.length && seen[0] === info.desc && i > 1) break; // wrapped to the start
  seen.push(info.desc);
  if (!info.visible) { noIndicator++; add("FAIL", "focus-visible", `No visible focus indicator: ${info.desc}`); }
}
const uniqueStops = new Set(seen).size;
const totalFocusable = await page.evaluate(() => [...document.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"]),summary,[contenteditable="true"]')].filter((el) => !el.disabled && el.getClientRects().length).length);
add(uniqueStops ? "PASS" : "WARN", "keyboard", `Tab walk reached ${uniqueStops} focus stops (of ~${totalFocusable} focusable elements)${noIndicator ? `; ${noIndicator} without visible focus` : ""}`);
if (seen.length >= 6 && uniqueStops <= 3 && totalFocusable > uniqueStops + 2) add("FAIL", "keyboard", `Possible focus trap: focus cycles within ${uniqueStops} elements`, seen.slice(0, 8));

// 4. Tabs
const tablists = await page.locator('[role="tablist"]').count();
for (let t = 0; t < tablists; t++) {
  const list = page.locator('[role="tablist"]').nth(t);
  const tabs = list.locator('[role="tab"]');
  const n = await tabs.count();
  if (n < 2) continue;
  await tabs.nth(0).focus();
  await page.keyboard.press("ArrowRight");
  const r = await page.evaluate(() => ({ role: document.activeElement?.getAttribute("role"), selected: document.activeElement?.getAttribute("aria-selected"), desc: window.__qaDesc(document.activeElement) }));
  const firstDesc = await tabs.nth(0).evaluate((el) => window.__qaDesc(el));
  if (r.role === "tab" && r.desc !== firstDesc) add(r.selected === "true" ? "PASS" : "WARN", "tabs", `Tablist ${t + 1}: ArrowRight moves focus${r.selected === "true" ? " and selects" : " (selection needs Enter/Space: manual activation)"}`);
  else add("FAIL", "tabs", `Tablist ${t + 1}: ArrowRight does not move between tabs (WAI-ARIA tabs pattern)`);
}

// 5. Sliders
const sliders = page.locator('[role="slider"], input[type="range"]');
const sn = await sliders.count();
for (let s = 0; s < sn; s++) {
  const el = sliders.nth(s);
  if (!(await el.isVisible())) continue;
  const read = () => el.evaluate((e) => e.getAttribute("aria-valuenow") ?? e.value ?? "");
  await el.focus();
  const before = await read();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(100);
  const after = await read();
  const desc = await el.evaluate((e) => window.__qaDesc(e));
  add(before !== after ? "PASS" : "FAIL", "slider", `${desc}: ArrowRight ${before !== after ? `changes value ${before} → ${after}` : "does not change the value"}`);
}

// 6. Dialogs
const triggers = await page.evaluate(() => {
  const isDialog = (el) => el && (el.tagName === "DIALOG" || ["dialog", "alertdialog"].includes(el.getAttribute("role")));
  return [...document.querySelectorAll('[aria-haspopup="dialog"], [aria-controls], [data-qa-dialog]')]
    .filter((b) => b.getAttribute("aria-haspopup") === "dialog" || b.hasAttribute("data-qa-dialog") || isDialog(document.getElementById(b.getAttribute("aria-controls"))))
    .map((b, i) => { b.setAttribute("data-qa-trigger", String(i)); return String(i); });
});
for (const id of triggers) {
  const trig = page.locator(`[data-qa-trigger="${id}"]`);
  if (!(await trig.isVisible())) continue;
  const desc = await trig.evaluate((e) => window.__qaDesc(e));
  await trig.click();
  await page.waitForTimeout(350);
  const openState = await page.evaluate(() => {
    const vis = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && !el.hidden; };
    const d = [...document.querySelectorAll('dialog[open], [role="dialog"], [role="alertdialog"]')].find(vis);
    return { open: !!d, focusInside: !!(d && d.contains(document.activeElement)) };
  });
  if (!openState.open) { add("WARN", "dialog", `${desc}: no visible dialog after click`); continue; }
  if (!openState.focusInside) add("FAIL", "dialog", `${desc}: focus did not move into the dialog`);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(350);
  const closed = await page.evaluate((tid) => {
    const vis = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && !el.hidden; };
    const stillOpen = [...document.querySelectorAll('dialog[open], [role="dialog"], [role="alertdialog"]')].some(vis);
    return { stillOpen, focusBack: document.activeElement?.getAttribute("data-qa-trigger") === tid };
  }, id);
  if (closed.stillOpen) add("FAIL", "dialog", `${desc}: Escape does not close the dialog`);
  else add(closed.focusBack ? "PASS" : "FAIL", "dialog", `${desc}: Escape closes${closed.focusBack ? " and returns focus to the trigger" : " but focus is NOT returned to the trigger"}`);
}

// 7. Video seeking + range support
const videoCount = await page.locator("video").count();
for (let v = 0; v < videoCount; v++) {
  const res = await page.locator("video").nth(v).evaluate(async (video) => {
    const src = video.currentSrc || video.src || video.querySelector("source")?.src;
    const wait = (ev, ms) => new Promise((r) => { const t = setTimeout(() => r(false), ms); video.addEventListener(ev, () => { clearTimeout(t); r(true); }, { once: true }); });
    if (video.readyState < 1) { video.preload = "auto"; video.load(); await wait("loadedmetadata", 8000); }
    let range = "unknown";
    try { const r = await fetch(src, { headers: { Range: "bytes=0-1" }, cache: "no-store" }); range = r.status === 206 ? "206" : String(r.status); } catch { range = "fetch-blocked"; }
    if (!isFinite(video.duration) || video.duration < 2) return { src, range, skipped: true };
    const targetT = Math.round(video.duration * 0.6 * 10) / 10;
    video.currentTime = targetT;
    await wait("seeked", 6000);
    await new Promise((r) => setTimeout(r, 300));
    return { src, range, target: targetT, actual: Math.round(video.currentTime * 10) / 10 };
  });
  const name = (res.src || "video").split("/").pop();
  if (res.skipped) { add("WARN", "video", `${name}: metadata/duration unavailable; seek not tested (range: ${res.range})`); continue; }
  const ok = Math.abs(res.actual - res.target) < 1;
  add(ok ? "PASS" : "FAIL", "video", `${name}: seek to ${res.target}s → ${res.actual}s${ok ? "" : " (seeking failed)"}; Range request → ${res.range}${res.range !== "206" ? "  ⚠ server does not return 206 Partial Content; seeking/scrubbing can break. Use a range-capable server (e.g. npx http-server, next dev, a CDN)" : ""}`);
}

// 9. Overflow
const overflow = await page.evaluate((w) => document.documentElement.scrollWidth - w, width);
add(overflow > 0 ? "FAIL" : "PASS", "overflow", overflow > 0 ? `Horizontal overflow of ${overflow}px at ${width}px width` : `No horizontal overflow at ${width}px`);

// 8. Reduced motion
const rmContext = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
const rmPage = await rmContext.newPage();
await rmPage.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => rmPage.waitForLoadState("load"));
await rmPage.waitForTimeout(600);
const rm = await rmPage.evaluate(() => document.getAnimations().filter((a) => a.playState === "running" && (a.effect?.getTiming?.().iterations === Infinity || (a.effect?.getTiming?.().duration || 0) > 300)).map((a) => `${a.animationName || a.id || "animation"} on ${window.__qaDesc ? window.__qaDesc(a.effect?.target) : (a.effect?.target?.tagName || "").toLowerCase()}`));
add(rm.length ? "WARN" : "PASS", "reduced-motion", rm.length ? `${rm.length} animation(s) still running with prefers-reduced-motion: reduce. Check each is essential` : "No long/infinite animations under prefers-reduced-motion: reduce", rm.slice(0, 10));
await rmContext.close();
await browser.close();

// Report
const order = { FAIL: 0, WARN: 1, PASS: 2 };
results.sort((a, b) => order[a.level] - order[b.level]);
const counts = results.reduce((c, r) => ((c[r.level] = (c[r.level] || 0) + 1), c), {});
console.log(`INTERACTION QA: ${url} @ ${width}px`);
for (const r of results) console.log(`${r.level.padEnd(4)}  [${r.check}] ${r.msg}${r.detail ? `\n        ${JSON.stringify(r.detail)}` : ""}`);
console.log(`\nSummary: ${counts.FAIL || 0} FAIL · ${counts.WARN || 0} WARN · ${counts.PASS || 0} PASS`);
const jsonOut = flag("json", undefined);
if (jsonOut && jsonOut !== true) writeFileSync(resolve(jsonOut), JSON.stringify({ url, width, counts, results }, null, 2));
process.exit(counts.FAIL ? 1 : 0);
