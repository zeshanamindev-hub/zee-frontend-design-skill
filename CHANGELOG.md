# Changelog — frontend-design-director

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
