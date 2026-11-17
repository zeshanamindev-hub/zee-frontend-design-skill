# Page & section build workflow

The skill designs **section by section** and assembles **complete pages**, each section planned from research, never generated generically.

## A. Plan the page (after research + approved direction)
0. **Reconcile requirements** first if feedback has accumulated (`workflows/feedback-reconciliation.md`), and make sure asset intake ran (`workflows/asset-intake.md`).
1. **Pick the page blueprint** for the business type: `mediums/web-ui/business-layouts.md`, then the niche profile (`foundations/niche-design-profiles.md`).
2. **Adapt it to the research:** add sections that answer top objections, remove sections that have no job, reorder by the visitor's decision journey (awareness → interest → evaluation → action).
3. **Write the page plan:**

```
PAGE PLAN: <page> · goal: <primary conversion> · primary keyword: <kw> (intent: …)
#  Section       Job (user decision it supports)  Layout ID (+runner-up)  Width  Density  Hi-fi?  CRO lever         SEO role
1  Hero          "Is this for me?"                 H-02 (alt H-04)         S      airy     V1      Value prop + CTA  H1 + kw
2  Proof strip   "Can I trust them?"               P-04                    C      dense    —       Trust             —
3  …
Narrative check: does the order answer the questions in the order visitors ask them?
Composition contract (layout-library.md §0): ≥1 full-bleed ✓ · ≥1 breakout/one-side bleed ✓ · ≥1 hi-fi section ✓ · ≤1 card grid ✓ · no two neighbours share layout + density ✓ · ≥1 asymmetric ✓ · signature move: <…>
Motion budget: 2–3 intentional moves (list them; each gets a motion-ledger row)
```
4. Get approval on the page plan (it's cheaper to change now than after build).

## B. Section loop (repeat for every section)

### B1. Section research (Standard depth)
- The user's own references for this section first (if any), then 3+ more inspiration references (`workflows/research-pipeline.md`, Track 3)
- How 3 competitors handle this section, and what's missing
- CRO rules for this section (`foundations/cro.md` §4)

### B2. Section plan: write it BEFORE coding
```
SECTION PLAN: <name>
Job:            the one decision this section supports
Content:        real copy from the content brief (workflows/content-strategy.md): headline, body, CTA; assets; proof (real only)
Layout:         <ID from mediums/web-ui/layout-library.md> · candidates scored with rule IDs (rules/README.md §2) · why it wins · runner-up and when it'd be better
Container:      full-bleed / breakout / content / text / one-side bleed (and why)
Hi-fi visual:   <V-type from hifi-visuals.md or "none">, asset source, fallback if the asset is missing
Hierarchy:      1st <…> → 2nd <…> → 3rd <…> (focal point)
60/30/10 here:  which color carries what
CRO:            friction removed · trust added · CTA wording + destination
SEO:            heading level + keyword use · internal links · image alt · schema (if any)
Rules applied:  rule IDs, e.g. U15 proximity for grouping, U2 Hick (3 plans), U10 one emphasised plan, U1 Fitts (sticky mobile CTA), L19 card test passed
Anti-generic G2: pattern chosen for this content (not default)? real content & proof? signature move?
Micro-interactions: <only those that communicate state>; each motion → a row in .design/motion-ledger.md (trigger · purpose · duration · easing · reduced-motion)
Facts:          every claim in this section is in .design/content/facts.md with a source
Responsive plan (written per section; never "it'll stack"):
  Mobile (<640):     layout · order · what's hidden/condensed · image crop · type sizes · tap targets
  Tablet (640–1023): layout change · columns · image treatment
  Desktop (1024+):   full composition · alignment · signature move
  Wide (1536+):      max-width behavior · how the layout avoids floating
Accessibility:  landmark/heading · keyboard · focus · contrast pairs · reduced motion
Done when:      acceptance criteria (3–5 checkable bullets)
```
Responsive details: `mediums/web-ui/responsive.md`.

### B3. Build the section
Composition first (structure + spacing), then tokens and style, then states and micro-interactions. Follow the stack standards in `stacks/`.

### B4. Review the section
Run the SKILL.md Step 6 checklist for this section **at each breakpoint in the responsive plan**: `node scripts/capture.mjs shots <url> --widths 375,768,1280,1536 --full --sections` (fix any overflow, console error or broken image it reports) and `node scripts/interaction-qa.mjs <url>` once the section has interactive parts. Fix before moving to the next section.

## C. Assemble and review the full page
- **Rhythm:** section structures vary; light/dark bands alternate deliberately; spacing system constant.
- **Narrative:** read only the headlines top to bottom. They should tell the full story and lead to the CTA.
- **CRO pass:** one primary CTA repeated at logical decision points (not after every section), with consistent wording.
- **SEO pass:** one H1, logical H2/H3 outline, title + meta description, internal links, image alts, schema, canonical (`foundations/seo.md` checklist).
- **Performance pass:** LCP element identified and optimized, no layout shift, fonts/images optimized (CWV targets in seo.md).
- **Full Step 6 self-critique** + anti-slop review.
- **Interaction QA:** `interaction-qa.mjs` → 0 FAIL (or each remaining FAIL explained).
- **Port** the approved prototype to the stack if it was built as a prototype (`workflows/port-to-stack.md`).
- **Handover** (SKILL.md Step 7) including "tested vs not tested".

## D. Multi-page sites
1. Sitemap first (from business-layouts.md), with each page's goal and keyword.
2. Build shared pieces first: tokens → header/nav → footer → common sections.
3. Then page by page, homepage or the highest-traffic landing page first.
4. Keep `DESIGN.md` updated so later sessions stay consistent.
