# Research pipeline: research before every page or section

Good design starts from evidence, not taste. Before planning a page or section, run the research tracks below, scaled to the job size. Save findings to `.design/research/<page>.md` in the project (ask once, the first time the `.design/` folder is created).

## Research depth by job size
| Job | Depth | Tracks |
|---|---|---|
| Tiny tweak | None | Use existing tokens and patterns |
| One section | **Standard** (~15–30 min of tool calls) | Inspiration for this section type · CRO for this section · competitors' version of this section |
| Full page / new site / redesign | **Deep** | All 6 tracks below |
| Audit | Deep | Competitors + trends + CRO + SEO, compared against the current site |

## Tools to use (Claude Code)
- **WebSearch**: find competitors, galleries, trends, CRO benchmarks, keyword ideas.
- **WebFetch**: read a competitor page, gallery entry or article. **Limit:** WebFetch returns text/markdown, so you **cannot see images or the visual layout** this way. Treat it as a structural read (headings, copy, CTAs, section order, offers).
- **Browser / screenshot tools**: Playwright MCP, Claude in Chrome, or `scripts/capture.mjs` (setup in `toolchain/browser-tools.md`). Capture competitors and references at 375 + 1440 to judge the visual layer. If none is connected, give the user the setup steps, ask for screenshots, and say plainly which judgments are text-only.
- **Semrush MCP** (if connected): keyword research, competitor domains, organic pages. Otherwise use WebSearch signals (People Also Ask, related searches, competitor titles).
- **Figma MCP** (if connected): read the user's existing designs and libraries.

Never present a visual judgment about a site you only read as text.

---

## Track 0: Harvest real assets (always first; it lifts the design most)
Before any inspiration hunting: list the client's real logo, photos, product UI, video, proof and brand colours from the project, the live site, social profiles and Figma; then ask the user to upload what's missing and **wait** (`workflows/asset-intake.md`). Record everything in `.design/assets/inventory.md`. Extract colours with `scripts/extract-colors.py`.

## Track 1: Business & audience (always)
From discovery plus the project: business model · primary conversion · audience segments · their jobs-to-be-done · top 3 objections/anxieties · price point · geography & language · brand personality.
Output: a 6–10 line **business snapshot**.

## Track 2: Competitors (ask + search): full workflow in `workflows/competitor-analysis.md`
Mandatory for every page/site: build the set (user's list + your own search for business, search and aspirational competitors), capture screenshots + text + reviews, score 12 dimensions, and synthesize table stakes, gaps, clichés, customer language, objections, and content/keyword/design/CRO gaps. Saved to `.design/research/competitors.md`. Its output feeds directions, the page plan, CRO and the **content strategy** (`workflows/content-strategy.md`).

## Track 3: Design inspiration (every section)
**Start with the user's own references** (links, screenshots, Figma, brand files collected in discovery): capture and analyze each one first. Then add your own research.
For each section type you're about to design (hero, pricing, features, testimonials…):
1. Search galleries for **this industry + this section**: Awwwards, Godly, Land-book, Lapa Ninja, SiteInspire, Mobbin (apps), Dribbble/Behance (concepts; less realistic).
   - e.g. `site:land-book.com pricing`, `awwwards <industry>`, `<industry> landing page design inspiration`
2. Look outside the industry too: one reference from a different field often provides the signature move.
3. Pick 3–6 references. For each, extract **the pattern and the reason**, never the layout:

| Reference | What works | Why it works (principle) | How we adapt it (not copy) |
|---|---|---|---|

4. Respect IP: never reproduce a specific site's layout, illustrations, copy or brand assets. [Source: DOCX "borrow, not copy"]

## Track 4: Current trends (every page; refresh each time)
The trends file in this skill is a dated snapshot. **Every time** you design a page:
1. WebSearch: `UI design trends <current year>`, `web design trends <next year>`, `awwwards sites of the day <current month>`, plus the industry (`<industry> website design <year>`).
2. Prefer sources with evidence (Awwwards, Figma, NN/g, Smashing, Baymard for e-commerce) over listicles.
3. Record 3–5 current trends with date and source, and decide for each: **use / adapt / skip, and why**. At most one trend becomes the signature (see trends-and-history.md).

## Track 5: CRO research
1. Identify the conversion type (purchase, lead form, booking, signup, call).
2. Search for best practices and evidence for **this business type + this section** (Baymard for e-commerce UX; NN/g for usability; vendor case studies, treated with caution).
3. List the objections from Track 2 review mining and map each to a section that answers it.
4. Apply `foundations/cro.md`. Don't quote conversion-lift percentages unless the source is cited and credible.

## Track 6: SEO & content research (then run `workflows/content-strategy.md`)
1. Primary keyword + 5–15 secondary/related queries (Semrush MCP if available; otherwise WebSearch suggestions, People Also Ask, competitor titles and H2s).
2. Search intent of the main query (informational / commercial / transactional / local). The page type must match the intent.
3. What top-ranking pages cover that we must cover (topics, not copied text), and what they miss.
4. Apply `foundations/seo.md` and `foundations/content-copywriting.md`.

---

## Output: research brief (save, then summarize to the user)
```
RESEARCH BRIEF: <page> · <date>
Business snapshot:     …
Competitors analyzed:  A, B, C (+ aspirational X) · table stakes: … · gaps we can own: …
Top objections:        1… 2… 3… → answered in sections …
Inspiration refs:      <ref + principle we adapt> ×3–6
Trends (dated):        <trend: use/adapt/skip + reason>
CRO priorities:        …
SEO:                   primary kw · intent · must-cover topics · differentiation
Visual verification:   seen via screenshots / text-only (say which)
Sources:               links
```
Then continue to `workflows/page-and-section-build.md`.
