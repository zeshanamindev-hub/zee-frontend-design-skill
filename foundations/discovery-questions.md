# Discovery questions — question bank

Use with the `AskUserQuestion` tool: max 4 questions per call, 2–4 options per question, recommended option first and labeled "(Recommended)" when you have a real recommendation. The user can always type their own answer.

**Skip rules**
- Skip any question the prompt, CLAUDE.md, or the codebase (Step 1) already answers.
- Skip Round 2 brand questions if a design system / brand guideline exists. Confirm it in one line instead.
- Never ask more than ~12 questions in total. Ask what changes the design, not what is nice to know.
- For motion, video or graphics jobs, add the medium-specific questions from that medium's file.
- If the user says "you decide", choose, and write the choice + reason in the brief.

---

## Always ask first: inspiration & materials (never skip)
**"Do you have any inspiration or reference material?"** Ask for all of it in one question (free text + options):
- Links to websites, apps or pages you like (and what you like about each)
- Links or screenshots you **dislike** (just as useful)
- Dribbble/Behance/Pinterest/Awwwards shots · Figma files · brand guidelines · competitor sites you admire
- Existing photos, logo files, videos, copy documents
Options: "Yes, I'll share links/files" · "No, find inspiration for me (Recommended if none)" · "Both"
**Then process every item:** open each link with a browser tool (screenshots at 375 + 1440), read Figma via Figma MCP if connected, view images with Read. Write one line per reference: **what works · the principle behind it · how we'll adapt it (never copy)**. If the user shares nothing, run Track 3 of the research pipeline yourself.

## Round 1 — Purpose (always, unless already clear)

**1. What are we designing?**
Landing / marketing page · App screen or dashboard · E-commerce (product, collection, cart) · Component or section only
*Why it matters:* layout density, hierarchy and CTA strategy differ completely.

**2. What is the ONE action a visitor should take?**
Buy / add to cart · Sign up / start trial · Book a call / contact · Read / learn (content)
*Why it matters:* this becomes the 10% accent's main job and the single primary CTA [Source: hierarchy + 60/30/10].

**3. Who is it for?**
Consumers (B2C) · Business buyers (B2B) · Developers / technical users · Internal team users
*Why it matters:* B2B/technical audiences value clarity and density; B2C values emotion and imagery [Expert].

**4. Brand personality — pick the closest direction** (or type 3 words)
Premium & minimal · Bold & energetic · Friendly & playful · Trustworthy & corporate
*Why it matters:* drives the font mood (see typography.md catalog) and color temperature.

**4b. Business type** (skip if obvious) → picks the blueprint in `mediums/web-ui/business-layouts.md`
SaaS / software · E-commerce · Local service · Agency/consultant (or type: restaurant, real estate, education, healthcare, law, fintech, nonprofit, portfolio, event, hotel, B2B, app, blog, marketplace)

**4c. Competitors** (always ask, then ALSO search on your own; see research-pipeline Track 2)
"Who are your 3–5 main competitors, or sites you want to beat? Any sites you admire outside your industry?" (free text)
Options if they don't know: "Find them for me (Recommended)" · "I'll share later"

## Round 2 — Brand & visual direction

**5. Brand assets?**
Use existing brand (I'll share colors/logo/fonts) · Logo only, create the rest · Create a new direction · Match the current site/app
*Follow-up if they have colors:* assign them to 60 / 30 / 10 roles together. Don't guess which color is the accent.

**6. Theme?**
Light · Dark · Both (light default) · Both (dark default)

**7. How bold should it be?**
Safe & clean (Recommended for B2B/corporate) · Balanced, with one signature moment · Expressive / award-level showcase
*Why it matters:* decides whether a trend (bento, giant type, glass, neo-brutalism…) is used as the signature move.

**8. References?** Already collected in "Always ask first". Ask a follow-up only for gaps (e.g. "anything you dislike?").

**8b. SEO & content** (pages that need search traffic)
Main keyword/topic you want to rank for? Target location/language? Existing content to keep? Options: "Research keywords for me (Recommended)" · "I have keywords" · "SEO not needed (internal app)"

**8c. Conversion & measurement**
What counts as success? (purchase, lead form, call, booking, signup) · Do you have analytics data or known drop-off points? Options: "Yes, I'll share" · "No data yet" · "Not sure"

## Round 3 — Constraints

**9. Stack / platform** (skip if detected in Step 1)
Next.js + Tailwind (+ shadcn/ui) · WordPress (block theme / theme.json) · Shopify theme (Liquid sections) · Plain HTML/CSS

**10. Content readiness**
Final copy + images ready · Copy ready, need image direction · Need placeholder copy & images · Mixed
*Rule:* placeholders are labeled. Never invent stats, reviews or logos.

**11. Device priority**
Mobile first (Recommended for B2C) · Desktop first (dashboards/B2B tools) · Equal

**12. Accessibility target**
WCAG 2.2 AA (Recommended default) · AA + reduced-motion & high-contrast care · AAA where possible

---

## Example first call (landing page, nothing known)

```
questions:
1. "What is the ONE action visitors should take on this page?"  header "Goal"
   options: Start free trial | Book a demo/call | Buy a product | Join waitlist
2. "Who is the main audience?"  header "Audience"
   options: Small business owners | Developers/technical | Enterprise buyers | Consumers
3. "Which brand personality fits best?"  header "Personality"
   options: Premium & minimal | Bold & energetic | Friendly & playful | Trustworthy & corporate
4. "Do you have brand colors, logo or fonts?"  header "Brand"
   options: Yes, existing brand | Logo only | Create a new direction | Match current site
```

## After the answers
→ Write the concept sentence and propose 2–3 directions (SKILL.md Step 3, art-directions.md), then the Design Brief (Step 4).
