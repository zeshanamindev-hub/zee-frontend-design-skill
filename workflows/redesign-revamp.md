# Workflow: redesign / revamp (page by page, section by section, across many sites)

For existing sites the job is to keep what works, fix what doesn't, and make it unmistakably the client's, without silently breaking SEO, content or functionality.

## 1. Scope the revamp (discovery additions)
- Which **pages** and in which **order**? (Default order: home → top 3 landing pages by traffic → key service/product template → pricing/contact → blog/article template.)
- **Keep** list: brand elements, content, URLs, features or integrations that must not change.
- Platform: stay on the current stack (WordPress/Shopify/Next.js) or re-platform? Who maintains it?
- Analytics access (top pages, conversion paths, bounce) and Search Console (queries, indexed pages)? If not available, say so and use proxies (screenshots, competitor benchmarks).

## 2. Baseline (before touching anything)
1. Capture every in-scope page: `node scripts/capture.mjs shots --list .design/revamp/urls.txt --out .design/revamp/before --widths 390,1440 --full --sections`. The `report.json` per page lists console errors, broken images, failed requests and overflow: real defects to fix.
2. Run `node scripts/interaction-qa.mjs <url>` on the home page and one key template.
3. Harvest assets (`asset-intake.md`) and content facts (`templates/facts.md`; flag contradictions on the client's own site, e.g. "20 years" on home vs "since 2012" on about).
4. Record SEO baseline: titles, meta descriptions, H1s, canonical URLs, structured data, internal links, indexed pages. **Every existing URL must be kept or 301-redirected.**
5. Audit with `design-audit.md` and the rules checklist (`../foundations/rules/README.md` §5).

## 3. Decide per section: keep · rework · replace
Make a table per page in `.design/revamp/<page>.md`:
| # | Current section | Job it should do | Verdict | Why (rule IDs, evidence) | New layout ID | Assets |
|---|---|---|---|---|---|---|
| 1 | Hero: stock photo + slogan | Say what they do + main CTA | Replace | L20 brand test fails; K8 unclear offer | H-02 | real team photo |
| 2 | 3 icon cards "Quality, Service, Price" | Differentiation | Replace | L19 card test; generic claims | F-03 annotated product | product photo |
| 3 | Testimonials slider | Proof | Rework | U27 auto-rotate ignored | P-02 big quote | 1 real quote |
Rules: **keep** what performs (analytics, strong content, recognisable brand assets); **rework** what has the right content but the wrong form; **replace** what fails the job.

## 4. Design the new page (same steps as a new page, with constraints)
Concept → 2–3 directions (respect the keep list) → page rhythm map (`../mediums/web-ui/layout-library.md` §4) → section loop (`page-and-section-build.md`) → full-page review.
Show **before/after per section** (screenshots side by side in `.design/revamp/compare/`) so the client sees the reason for each change.

## 5. Many sites: avoid sameness (design ledger)
Keep `.design/design-ledger.md` (template `templates/design-ledger.md`) in a shared location across client projects, or ask the user where they keep it. Per site, log: niche · art direction · hero layout ID · signature move · type pairing · palette rule · hi-fi type.
Before proposing directions for a new site, read the ledger and **don't propose the same hero ID + art direction + type pairing as the last 3 sites** unless the brand demands it. Variety comes from the niche profile and the client's real assets, not randomness.

## 6. Ship safely
- Content parity check: every heading, fact and FAQ from the old page exists (or was consciously removed) in the new one.
- SEO parity: titles/meta/H1/canonical/structured data carried over or improved; redirects map for changed URLs; no `noindex` left from staging.
- Performance: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 (Core Web Vitals "good" thresholds) on the after version, measured.
- Accessibility: `interaction-qa.mjs` passes with 0 FAIL on templates.
- After launch, compare analytics for 2–4 weeks (bounce, conversions, rankings), and report honestly, including what got worse.
