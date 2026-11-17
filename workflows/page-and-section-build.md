# Page & section build workflow

The skill designs **section by section** and assembles **complete pages**, each section planned from research, never generated generically.

## A. Plan the page (after research + approved direction)
1. **Pick the page blueprint** for the business type: `mediums/web-ui/business-layouts.md`.
2. **Adapt it to the research:** add sections that answer top objections, remove sections that have no job, reorder by the visitor's decision journey (awareness → interest → evaluation → action).
3. **Write the page plan:**

```
PAGE PLAN: <page> · goal: <primary conversion> · primary keyword: <kw> (intent: …)
#  Section            Job (user decision it supports)   Pattern (by content type)   CRO lever        SEO role
1  Hero               "Is this for me?"                  Asymmetric split            Value prop + CTA  H1 + kw
2  Proof strip        "Can I trust them?"                Real logos / rating          Trust            —
3  …
Narrative check: does the order answer the questions in the order visitors ask them?
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
Pattern:        <from composition-patterns.md> · why this pattern for this content
Hierarchy:      1st <…> → 2nd <…> → 3rd <…> (focal point)
60/30/10 here:  which color carries what
CRO:            friction removed · trust added · CTA wording + destination
SEO:            heading level + keyword use · internal links · image alt · schema (if any)
Laws applied:   e.g. Proximity for grouping, Hick (3 plans, 1 recommended), Fitts (sticky mobile CTA)
Anti-generic G2: pattern chosen for this content (not default)? real content & proof? signature move?
Micro-interactions: <only those that communicate state>
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
Run the SKILL.md Step 6 checklist for this section **at each breakpoint in the responsive plan**. Screenshot at 375 / 768 / 1280 / 1536 if a browser tool exists. Fix before moving to the next section.

## C. Assemble and review the full page
- **Rhythm:** section structures vary; light/dark bands alternate deliberately; spacing system constant.
- **Narrative:** read only the headlines top to bottom. They should tell the full story and lead to the CTA.
- **CRO pass:** one primary CTA repeated at logical decision points (not after every section), with consistent wording.
- **SEO pass:** one H1, logical H2/H3 outline, title + meta description, internal links, image alts, schema, canonical (`foundations/seo.md` checklist).
- **Performance pass:** LCP element identified and optimized, no layout shift, fonts/images optimized (CWV targets in seo.md).
- **Full Step 6 self-critique** + anti-slop review.
- **Handover** (SKILL.md Step 7) including "tested vs not tested".

## D. Multi-page sites
1. Sitemap first (from business-layouts.md), with each page's goal and keyword.
2. Build shared pieces first: tokens → header/nav → footer → common sections.
3. Then page by page, homepage or the highest-traffic landing page first.
4. Keep `DESIGN.md` updated so later sessions stay consistent.
