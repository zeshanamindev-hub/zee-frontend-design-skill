# Competitor analysis (mandatory before planning any page or site)

The output of this workflow feeds **four** things: the art direction (how to stand out), the page plan (what sections the market expects and what's missing), the **content strategy** (`workflows/content-strategy.md`), and CRO (objections to answer). Never skip it for a page or site; for a single section, run the short version (§6).

## 1. Build the competitor set (ask + search)
1. **Ask the user** (discovery): "Who are your 3–5 main competitors? Any sites you admire, inside or outside your industry?"
2. **Search yourself, always**, even when the user gave a list. There are three kinds of competitor:
   | Type | How to find | Why |
   |---|---|---|
   | **Business competitors** | `<service> <city>`, `best <product category>`, `<brand> alternatives`, `<brand> vs`, directories (G2/Capterra, Google Maps, marketplaces) | Same customers, same offer |
   | **Search competitors** | Search the 3–5 main keywords; the top organic results (and pages cited in AI answers) | Whoever ranks is who we must out-help in search, often not the business rival |
   | **Aspirational leaders** | Category leaders + Awwwards/Godly sites in the industry | Quality bar and ideas |
3. Pick **3–5 business + 2–3 search + 1–2 aspirational**. List them with URLs and why each was chosen. Confirm with the user if any are surprising.

## 2. Capture (evidence first)
For each competitor, capture the homepage + 2–3 key pages (pricing, main service/product, about, a top blog post):
- **Screenshots:** `node ${CLAUDE_SKILL_DIR}/scripts/capture.mjs shots <url> --out .design/shots/<name> --widths 375,1440 --full` (or Playwright MCP / Claude in Chrome; see `toolchain/browser-tools.md`).
- **Text & structure:** WebFetch each page: title tag, meta description, H1, H2 outline, CTAs, offer, word count, internal links, schema hints.
- **Reviews:** Google reviews, Trustpilot, G2/Capterra, app stores, Reddit/forums: collect repeated praise and complaints **in the customers' own words**.
- **Optional data:** Semrush MCP (traffic, top keywords, top pages), PageSpeed Insights (speed).
If no browser tool is connected, label all visual findings "not seen" and ask the user for screenshots.

## 3. Analyze: the 12-point scorecard (1–5 each, with evidence)
| # | Dimension | What to record |
|---|---|---|
| 1 | **Positioning & messaging** | H1/value prop, target audience, tone of voice, key claims |
| 2 | **Offer & pricing** | What's sold, price visibility, plans, guarantees, free trial/consult |
| 3 | **Information architecture** | Nav items, sitemap depth, page types |
| 4 | **Page structure** | Section order on key pages, patterns used |
| 5 | **Visual design** (only if seen) | Direction, palette & its 60/30/10 balance, type, imagery, generic or distinctive? |
| 6 | **UX & usability** | Clarity, navigation, mobile experience, forms, friction |
| 7 | **CRO** | CTA wording/placement, trust signals, objection handling, urgency (honest?) |
| 8 | **Content depth & quality** | Topics covered, formats (guides, tools, video, case studies), freshness, originality |
| 9 | **E-E-A-T signals** | Authors, credentials, real photos, case studies, reviews, contact/policies |
| 10 | **On-page SEO** | Titles, metas, H1/H2 use, URL structure, internal linking, schema |
| 11 | **Performance & tech** | Speed (if measured), mobile issues, platform if visible |
| 12 | **Reputation** | Review rating, volume, common complaints |

## 4. Synthesize: what to do with it
```
COMPETITOR ANALYSIS: <business> · <date> · evidence: screenshots ✓/✗, reviews ✓/✗, SEO data ✓/✗

Competitor set: name · type (business/search/aspirational) · URL · why chosen

Table stakes (everyone has it; we must too): …
Gaps (nobody does it well; we can own it): …
Clichés to avoid (everyone looks/sounds the same): …   ← differentiation + anti-slop input
Customer language (from reviews): words/phrases they actually use: …
Top objections & complaints (from reviews): … → answer on which page/section
Content gaps: topics/questions competitors don't cover or cover badly: …
Keyword gaps: queries competitors rank for that we don't target, and queries nobody serves well: …
Design gaps: e.g. "all use blue + stock photos + 3 icon cards" → our opportunity
CRO gaps: e.g. hidden pricing, weak guarantees, no reviews near CTAs
Scorecard table: competitors × 12 dimensions
Recommendations: 5–8 concrete moves, each tied to evidence
Sources & captures: links + .design/shots/ paths
```
Save as `.design/research/competitors.md` and show the user a short summary (top gaps + recommendations).

## 5. Hand-offs
- **Art directions** (`foundations/art-directions.md`): avoid the shared visual clichés; use the design gaps.
- **Page plan** (`workflows/page-and-section-build.md`): include table-stakes sections, add sections for the gaps and objections.
- **Content strategy** (`workflows/content-strategy.md`): customer language, content gaps, keyword gaps, E-E-A-T gaps.
- **CRO** (`foundations/cro.md`): objections → sections; proof placement.

## 6. Short version (single section)
For one section (e.g. pricing): capture that section on 3 competitors → how each handles it, what's missing, what customers complain about → 3 bullets of "do better" → section plan.

## Rules
- Analyze; **never copy** competitors' layouts, copy, images or brand assets.
- Every claim about a competitor needs evidence (screenshot, quote, URL). Mark guesses as hypotheses.
- Don't log in to competitor accounts, scrape behind paywalls, or submit their forms.
