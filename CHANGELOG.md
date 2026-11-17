# Changelog — frontend-design-director

## v0.4.0 — 2026-11-18
**Why:** the v0.3 field run produced a page that looked generic ("just animations added"): box layout only, no full-width sections, no high-fidelity visual section. Cause: nothing enforced container-width variety, a hi-fi section, or niche-specific design. v0.4 makes variety, niche fit, real assets and honest rule-based recommendations mandatory, and adds dashboards, mobile apps and prototyping.

**Added**
- **Rules library** (`foundations/rules/`, 160 rules with IDs: C1–C12, L1–L20, T1–T12, U1–U30, H1–H14, D1–D14, S1–S10, I1–I10, R1–R9, K1–K10, A1–A9, B1–B10): the user's 12-category list + all 30 lawsofux.com entries, each with how-to numbers and an honest caveat (e.g. three-click rule debunked, golden ratio overstated, Miller's law misapplied, colour psychology weak evidence). README: task router, **honest layout-recommendation protocol**, conflict priority, violation workflow, phased audit checklist.
- **Layout library** (`mediums/web-ui/layout-library.md`): 36 section layouts with IDs and default widths, a tested named-line grid for full / breakout / content / text / one-side-bleed widths (verified at 375–1920 px, no overflow), the **page composition contract** (anti-box rules), the page rhythm map, 30 app layout types, anti-box checks.
- **Hi-fi visuals** (`mediums/web-ui/hifi-visuals.md`): 12 visual types (product theatre, art-directed photo, collage, SVG scenes, data-viz, type posters, 3D, video/cinemagraph, interactive demos, maps, texture, licensed AI imagery), chosen by available assets.
- **Niche design profiles** (`foundations/niche-design-profiles.md`): 18 business types with conventions, colour options and the rule behind each, type, layout IDs, hi-fi, video, the category-breaking move, what to avoid.
- **New mediums:** `mediums/dashboard/dashboard.md` (types, KPI tiles, chart choice, tables, data colour, states, a11y) and `mediums/mobile-app/mobile-app.md` (iOS 26 Liquid Glass / HIG 44 pt, Material 3 Expressive / 48 dp, nav-drawer deprecation, safe areas, thumb zone, core screens, store assets). Facts verified Nov 2026.
- **New workflows:** `asset-intake.md` (harvest, then **ask the user to upload and pause**, then inventory, colour extraction, asset-driven layout), `redesign-revamp.md` (baseline captures, keep/rework/replace per section, SEO parity, **design ledger** to vary looks across sites), `feedback-reconciliation.md`, `prototyping.md` (fidelity ladder, 5-user test), `port-to-stack.md` (tokens → Tailwind v4 `@theme` / theme.json / Shopify settings, parity checks); `templates/` (facts, requirements + decisions, motion ledger, asset inventory, design ledger).
- **New scripts (all tested):** `interaction-qa.mjs` (keyboard walk, focus visibility, names, alt, tabs, sliders, dialogs + focus return, **video seek + HTTP Range check**, reduced motion, overflow; caught 12 seeded bugs, passed the correct widgets); `render-video.mjs` + `scripts/templates/video-timeline.html` (HTML timeline → H.264 MP4 with masked reveals, brand-shaped wipe, camera dolly, cursor + click ripple; 9 s 1080p in ~26 s); `extract-colors.py` (real colours from logos/photos, monochrome detection).
- **Art directions D13–D16:** Monochrome System (B&W brands; hierarchy by value/weight/texture; code highlighting without colour), Immersive Full-Bleed, Broken-Grid Collage, Product Theatre; style vocabulary (uistyleguide.com).
- **Colour-scheme decision procedure** (`color-system.md` §7) using all ten colour rules + niche + competitors + real asset colours.
- **Video:** niche video guide, Veo 3.1 prompt formula (from Google's guide), cinemagraph workflow (FFmpeg overlay recipe tested), animated/whiteboard explainer process; **tweening & easing** section in motion-graphics.
- **Gotchas list** (`implementation.md` §6), incl. the verified range-request bug: Python `http.server` returns 200 (no seeking); `npx http-server` returns 206.
- **Trends 2026–2027 synthesis** with cautions and Pixelean's skip list; accessibility law update (EN 301 549 V4.1.1, Sep 2026 → WCAG 2.2 AA).

**Changed**
- `capture.mjs`: scroll-first full-page/section captures (lazy images + scroll reveals render), image/font waits, console/page errors, failed requests, broken images, overflow reported at **> 0 px** (was > 1), multiple URLs / `--list`, `--sections`, `report.json`.
- `palette.py`: `--mono` mode (auto when OKLCH chroma < 0.03): neutral scale + light/dark value systems with contrast verdicts + hierarchy-without-colour guidance; no meaningless harmonies.
- `make-gif.sh`: `--max-mb N` size budget (fps → colours → width ladder; exit 3 if impossible). Tested: 2.47 MB → 1.16 MB. (An ordered-dither step was tried and removed: it made the test GIF *bigger*.)
- Anti-generic detector: 12 → **14 checks** (box layout, no hi-fi section) + scoring clarifications (a real-number proof strip ≠ icon cards; every motion needs a ledger reason; partial credit doesn't exist) + litmus checks.
- Discovery: job-type round, **asset upload pause**; research Track 0 (asset harvest); section plan gains layout ID, container width, hi-fi, rule IDs, motion ledger, facts; competitor analysis gains section-by-section captures and a layout census; content strategy gains the facts register with client-site contradiction checks; audit uses the rules checklist and `interaction-qa.mjs`.
- SKILL.md rewritten (modes J redesign, K dashboard, L mobile app, M prototype; 10-step spine; 15 hard rules).

**Verified**
- Frontmatter: `when_to_use` and `${CLAUDE_SKILL_DIR}` inside `allowed-tools` are supported by **Claude Code** (checked against the Claude Code skills docs in v0.3). Combined description + when_to_use = 1,152 / 1,536 chars.
- ⚠ **Compatibility:** uploading this skill to claude.ai or the Skills API rejects unknown frontmatter keys such as `when_to_use`. For those surfaces, merge `when_to_use` into `description` and delete the key.

**Sources that couldn't be read** (robots/blocked): 11 figma.com/resource-library pages (AI tools, outpainting, AI animation, node-based AI, AI video, AI video prompts, tweening, whiteboard animation, cinemagraphs, animated videos, bad-digital-experiences survey), medium.com 2027 trends, behance.net Design Trends 2026. Topics covered from other primary sources and marked.

## v0.3.0 — 2026-11-17
**Added**
- **Browser tools** (`toolchain/browser-tools.md`): Playwright MCP + Claude in Chrome setup steps (verified against the Playwright MCP README and Claude Code docs), when to use which, and how each workflow uses them
- **`scripts/capture.mjs`**: multi-width screenshots (with horizontal-overflow warnings) + exact-size HTML→PNG rendering. Tested with Chrome: caught a real CSS-grid overflow at 375/768px; no false positives after the fix
- **Asset toolchain** (`toolchain/asset-generation.md`): SVG creation (hand-coded, SVGO, Rough.js, Satori, resvg, vtracer, Potrace), image processing (sharp, Playwright render), AI image tools (hosted + open-weight with per-checkpoint licenses), code-driven video (Motion Canvas MIT, Remotion license terms verified, Manim MIT, FFmpeg), open-weight video models (Wan 2.2 / Mochi 1 Apache-2.0, LTX-2 community license, HunyuanVideo), motion assets
- **Competitor analysis workflow** (`workflows/competitor-analysis.md`): business + search + aspirational competitors, captures, review mining, 12-dimension scorecard, gaps → hand-offs
- **Content strategy workflow** (`workflows/content-strategy.md`): messaging foundation, keyword → page map, content briefs, section copy, on-page elements, QA, publish & monitor (Search Console, Bing Webmaster Tools, IndexNow)
- **Content standard rewritten** (`foundations/content-copywriting.md`): Google (helpful content, E-E-A-T, Who/How/Why, spam policies incl. scaled content abuse, Oct 2026 main-content/effort/fake-author guidance, May 2026 AI-search guide) + Bing (Feb 2026 guidelines, Copilot grounding, IndexNow); engagement writing; SEO wording rules; wording by page type; banned AI copy; Content QA checklist
- **Design laws & physics** (`foundations/design-laws-and-physics.md`): Gestalt, 14 UX laws, reading patterns, visual weight, optical corrections, light/shadow/depth, motion physics, proportion math
- **Color rules & physics quick sheet** at the top of `color-system.md`
- **Anti-generic gate**: 3 gates (G1–G3), a 12-point generic-design detector score, banned defaults by category; enforced inline in SKILL.md
- **Inspiration links**: always asked first in discovery; every reference is processed (screenshots, Figma MCP, images)
- SKILL.md: visible foundation-layers table, inline anti-generic gate, new modes (competitor analysis, site content, SVG/graphics), browser step

## v0.2.0 — 2026-11-17
**Added**
- **Work modes:** full page/site · single section · design audit · CRO/SEO/content · motion & micro-interactions · video · graphics
- **workflows/:** research pipeline (business, competitors with user list + own search + review mining, inspiration per section, trend refresh every time, CRO research, SEO research) · page & section build loop with a per-section plan (incl. responsive plan per breakpoint) · design audit (10 lenses, severity, ICE priority, report format)
- **foundations/:** `cro.md` (LIFT, Fogg, section checklists, CRO by business type, no dark patterns) · `seo.md` (on-page + technical, verified Nov 2026: CWV thresholds, FAQ rich results removed May 7 2026, Google's May 2026 AI-search guidance) · `content-copywriting.md` · color theory (light & gamut, value, OKLCH, harmonies, temperature, context, culture, CVD, dark-mode physics, data color) · readable-font shortlist (21 more fonts verified OFL) + "3 options" format + multi-script · trend refresh rule + late-2026 signals · pattern/texture resources (verified licenses)
- **mediums/web-ui/:** `business-layouts.md` (18 business types) · `responsive.md` (Tailwind v4 breakpoints verified, container queries, per-section decisions, conversions, bug list) · `micro-interactions.md` (catalog, engagement patterns, visual patterns, GIF guidance)
- **mediums/:** `motion-graphics/`, `video/` (AI video tools Nov 2026; Sora 2 marked discontinued), `graphics/` (AI image tools, sizes)
- **stacks/:** general standards + Next.js 16 (verified upgrade guide), WordPress 7.1 (field guides), Shopify (theme blocks/Horizon), other frameworks
- **scripts/:** `palette.py` (OKLCH tonal scale + harmonies + contrast, gamut-safe) · `make-gif.sh` (ffmpeg two-pass GIF + web MP4; tested: MP4 ~10× smaller)

**Known limits**
- Tool landscapes (AI video/image, motion tools) change monthly; the skill re-checks at runtime, but the files are a Nov 2026 snapshot.
- WebFetch can't see images; visual competitor/inspiration judgments need a browser/screenshot tool or user screenshots.
- Remotion's exact license terms couldn't be fetched; marked "check remotion.dev".
- Not yet tested end-to-end inside Claude Code on a real project.

## v0.1.0 — 2026-11-17 (first version)
**Built from:**
- 110 unique design screenshots (116 uploaded; 6 duplicates): 60/30/10 rule, 9 principles, 2 before→after fix carousels, 3 trend carousels, 6 font carousels, "108 websites" toolbox, icon libraries
- PDF: *UI/UX Design Trendsetters 2010–2026*
- DOCX: *Design Without AI Slop: UI/UX Guide*
- Verified additions: WCAG 2.x contrast thresholds, shadcn/ui token roles, Claude Code skill format, Google Fonts/Fontsource licenses (49 fonts, OFL-1.1), Fontshare license, Awwwards scoring weights, CSS `text-wrap` support

**Structure:** `foundations/` (medium-agnostic) + `mediums/web-ui/` + `mediums/_template/` for future mediums.

**Known limits / next ideas:**
- Only the Web UI medium is built (motion graphics, video and social graphics are planned).
- Fontshare font names other than Clash Display and Cabinet Grotesk were not individually re-verified.
- Premium fonts from the source images are listed for mood reference only; licenses are unverified.
- Not yet tested on real projects. Next: run it on 3 real briefs (Next.js landing page, WordPress theme section, Shopify section) and refine.
