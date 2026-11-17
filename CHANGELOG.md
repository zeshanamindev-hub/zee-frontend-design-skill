# Changelog — frontend-design-director

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
