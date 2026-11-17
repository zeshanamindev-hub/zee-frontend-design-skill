# Content strategy: from competitor analysis to finished site copy

Turns research into **site content that engages visitors and meets search-engine standards** (Google, Bing and others). Run it after `workflows/competitor-analysis.md` and before writing any page copy. The wording rules are in `foundations/content-copywriting.md`; the SEO mechanics are in `foundations/seo.md`.

## Step 1: Gather inputs
- Competitor analysis: messaging, **customer language**, objections, **content gaps**, **keyword gaps**, E-E-A-T gaps.
- **Business facts from the user** (ask for anything missing, and never invent it): years in business, numbers (customers, projects, results), certifications/awards, team and credentials, guarantees, pricing, locations, real testimonials and case studies, photos, founder story.
- Keyword research: Semrush MCP if connected; otherwise WebSearch signals (autocomplete, People Also Ask, related searches, competitor titles/H2s, forum questions).

## Step 2: Messaging foundation
```
Positioning:     For <audience> who <need>, <brand> is the <category> that <key benefit>, unlike <alternative> because <proof>.
Value proposition (H1 candidates ×3): outcome-led, specific, in customer language
Proof inventory: every real fact we can claim (with source); missing proof → ask the user
Voice & tone:    3 traits, each with "we say / we don't say" examples
Customer vocabulary: words customers use (from reviews) vs. jargon to avoid
Objections → answers: top 5, each mapped to a page/section
```
Get approval on the positioning and H1 candidates before writing pages.

## Step 3: Keyword → page map (one search intent per page)
| Page | Primary query | Intent | Secondary queries / questions | Competitor pages ranking | Our angle (gap) |
|---|---|---|---|---|---|
- **One page = one main intent.** Don't target the same primary query on two pages (keyword cannibalization).
- Group related queries into **topic clusters**: a pillar page plus supporting pages, linked both ways.
- Local businesses: one page per real service and per real service area, each with unique, useful content. Thin, near-duplicate location pages are doorway spam.
- Output: the sitemap with each page's goal + keyword (feeds `business-layouts.md` and the page plan).

## Step 4: Content brief per page
```
CONTENT BRIEF: <page>
Goal & CTA:           …            Audience & stage: aware / comparing / ready to buy
Primary query & intent: …          Secondary queries: …
Questions to answer:  (PAA, reviews, sales questions) …
What top results cover (topics, not text): …   What they miss (our differentiator): …
E-E-A-T elements:     author/expert, first-hand experience, data, photos, case study, sources
Section outline:      from the page plan (H2s written as reader benefits or real questions)
Length guide:         enough to fully answer the intent; competitor range as context, never a target
Internal links:       to/from …    External citations: authoritative sources for facts
Schema:               type matching the visible content
Facts needed from user: …
```

## Step 5: Write section by section
Follow `foundations/content-copywriting.md`: hook → clarity → proof → action, in the customer's language, answer-first, scannable, specific, with no invented facts. Write the copy **inside the section plan** so design and words are decided together (headline length affects layout).

## Step 6: On-page elements for every page
Title tag · meta description · H1 · H2/H3 outline · URL slug · image alt texts · internal link anchors · CTA labels · microcopy (forms, errors, confirmations) · schema JSON-LD · Open Graph text.

## Step 7: Quality gate (before handover)
Run the **Content QA checklist** in `foundations/content-copywriting.md` §8 (Google + Bing standards, engagement, readability, facts, accessibility). Fix failures.

## Step 8: Publish & monitor (tell the user)
- Google Search Console + **Bing Webmaster Tools** verified; sitemap submitted to both.
- **IndexNow** for Bing (and other participating engines) so new or updated pages get discovered quickly. Many CMS/SEO plugins support it.
- Watch: impressions/CTR (rewrite titles/metas with low CTR), queries the page actually ranks for (add sections for them), engagement (GA4 engaged sessions, scroll depth), conversions. Bing Webmaster Tools also offers an AI Performance report showing Copilot citations (public preview since Feb 2026).
- Refresh content when facts change; show real "updated" dates.

## Deliverables
Messaging foundation · sitemap with keyword map · content brief per page · page copy by section (with all on-page elements) · placeholders list (facts needed) · publish/monitor checklist. Save under `.design/content/`.
