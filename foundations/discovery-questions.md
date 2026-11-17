# Discovery questions — question bank

Use with the `AskUserQuestion` tool: max 4 questions per call, 2–4 options per question, recommended option first and labeled "(Recommended)" when you have a real recommendation. The user can always type their own answer.

**Skip rules**
- Skip any question the prompt, CLAUDE.md, or the codebase (Step 1) already answers.
- Skip Round 2 brand questions if a design system / brand guideline exists. Confirm it in one line instead.
- Never ask more than ~10 questions in total. Ask what changes the design, not what is nice to know.
- If the user says "you decide", choose, and write the choice + reason in the brief.

---

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

## Round 2 — Brand & visual direction

**5. Brand assets?**
Use existing brand (I'll share colors/logo/fonts) · Logo only, create the rest · Create a new direction · Match the current site/app
*Follow-up if they have colors:* assign them to 60 / 30 / 10 roles together. Don't guess which color is the accent.

**6. Theme?**
Light · Dark · Both (light default) · Both (dark default)

**7. How bold should it be?**
Safe & clean (Recommended for B2B/corporate) · Balanced, with one signature moment · Expressive / award-level showcase
*Why it matters:* decides whether a trend (bento, giant type, glass, neo-brutalism…) is used as the signature move.

**8. References?** (free text)
"Share 1–3 sites or screenshots you like, and one you dislike, plus what you like about each."
*Use:* extract the pattern (type, spacing, color temperature), never copy the layout.

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
