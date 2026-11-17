# Composition patterns (web UI)

Choose components and layouts by **the type of information**, not the generator's default pattern. [Source: DOCX]
Work **composition first**: decide sections, priority and layout as a grayscale wireframe, then apply style. [Source: DOCX "layout before styling"]

## 1. Choose the section pattern by content type

| Content you have | Use | Not |
|---|---|---|
| 3–6 parallel features of similar weight | Bento with one dominant tile · annotated product screenshot with callouts · icon-less two-column list with strong headings | 3 identical icon cards |
| A process / how it works | Numbered steps on a horizontal or vertical timeline · sticky-scroll story (visual changes as steps scroll) | Cards with "Step 1/2/3" icons |
| A comparison (us vs them, plans, before/after) | Real comparison table · before/after slider · side-by-side split | Marketing bullets |
| Proof (customers, results) | Case-study cards with real numbers + photo · one big quote with name, role and photo · real logo strip (permission) | Invented stats, carousel of anonymous 5-star reviews |
| A demo of the product | Real UI in a clean frame · tabbed demo (tabs = jobs to be done) · short looping video with poster | Abstract 3D blob or generic dashboard illustration |
| A story / narrative / mission | Editorial layout: large pull quote, image + text offset, chapter numbers | Centered paragraph walls |
| Pricing | 2–3 plans, recommended plan emphasized by layout (not just a badge), comparison table below | 4+ equal plans |
| FAQ | Accordion with real questions grouped by topic; 2-column on desktop | Wall of text |
| Final CTA | Brand-color field, specific headline restating the outcome, one action | Repeating the hero |

## 2. Hero archetypes (pick by concept, vary between projects)

| Hero | Structure | Best with direction |
|---|---|---|
| **Asymmetric split** | Headline + CTA left (5–6 cols), real product/visual right, bleeding off the edge | Calm Product, Swiss |
| **Full-bleed image + offset type** | Edge-to-edge photo, type block anchored to a corner, scrim only where needed | Editorial Luxury, Warm Organic |
| **Giant type** | Headline fills the width; small nav and subcopy offset; minimal imagery | Monochrome, Dark Cinematic |
| **Product-forward** | Big real UI or product, headline above/below, annotated details | Calm Product, Tech Blueprint |
| **Oversized object** | One product/object huge, tilted, cropped, overlapping the headline | Kinetic Sport, Soft 3D |
| **Bento hero** | First screen IS a bento: one hero tile + supporting tiles | Bento Showcase |
| **Editorial cover** | Magazine-cover layout: masthead, issue/number details, image | Editorial, Retro |
| **Interactive moment** | Small real interaction (try the input, toggle, drag) as the hero | Calm Product, Playful |

Avoid the default formula: pill badge → centered gradient headline → two buttons → floating mockup.

## 3. Section rhythm
- Keep the spacing system constant; **vary structure** from section to section. [Source: DOCX]
- Alternate density: dense section → breathing section.
- Alternate value: light → one dark band (e.g. stats or proof, like the 60/30/10 black-band example) → light.
- Use full-bleed moments sparingly (1–2 per page) for impact.
- Every section has: one job (a user decision it supports), one focal point, and a clear exit to the next section.

## 4. Navigation & core UX [Source: DOCX "functional UX"; Expert]
- Nav: 4–7 items max, current page indicated, primary CTA visible, mobile menu usable with one thumb.
- Forms: labels always visible (no placeholder-only labels), inline validation, clear error text, generous targets.
- Search, filters and decision points designed around real tasks.
- Keyboard: logical tab order, visible focus, skip link on content-heavy pages.

## 5. Mobile is a separate composition
Review desktop and mobile **separately**. [Source: DOCX] Don't just stack columns:
- Reorder by priority (the CTA might move up).
- Crop images differently (`object-position`, art-directed `<picture>` sources).
- Turn wide tables into stacked cards or horizontally scrollable tables with a sticky first column.
- Bento → single column ordered by importance.
- Thumb zone: primary actions reachable at the bottom on app-like screens.
