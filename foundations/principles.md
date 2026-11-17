# Design principles & rules

The 9 core principles, the before → after fixes and the layout system. The **laws behind them** (Gestalt, Hick, Fitts, optical corrections, light/depth and motion physics) are in `design-laws-and-physics.md`; the color rules and color physics are in `color-system.md`.

## 1. The 9 core principles [Source]

| # | Principle | What it means | Check question |
|---|---|---|---|
| 1 | **Balance** | Visual weight distributed so the layout feels stable (symmetric, or asymmetric with counterweights placed diagonally). | Does any side feel heavy or empty without intent? |
| 2 | **Contrast** | Opposites (light/dark, big/small, bold/light) make elements distinct and readable. | Can you tell the important thing apart instantly? |
| 3 | **Emphasis** | One odd element draws the eye: the focal point. | What is the ONE thing seen first? Is it the right thing? |
| 4 | **Alignment** | Elements share invisible lines (a hard left edge, a grid column), which creates order. | Are there stray edges that align with nothing? |
| 5 | **Repetition** | Repeating shapes, colors and styles builds consistency and rhythm. | Do the same things look the same everywhere? |
| 6 | **Proportion** | Relative size communicates importance. | Do sizes match importance? |
| 7 | **Hierarchy** | Size, weight and color step down by importance. | Squint: is there a clear 1 → 2 → 3 reading order? |
| 8 | **Negative space** | Empty space is an active element that gives focus. | Is space used to group and to separate, or just leftover? |
| 9 | **Movement** | A deliberate path guides the eye through the layout. | Where does the eye go after the headline? To the CTA? |

## 2. Five principles from "Design Without AI Slop" [Source: DOCX]
1. **Layout before styling.** Define content priority, information architecture, responsive grid and page composition before visual effects.
2. **Typography as a system.** Explicit styles, sizes, weights, line heights, widths and hierarchy.
3. **Brand identity at the component level.** Tokens for color, spacing, radius, borders, imagery, buttons and icons. The whole interface is coherent, not just the hero.
4. **Real user tasks over decoration.** Navigation, controls, forms, search and decision points designed around real tasks: affordance, readability, accessibility.
5. **Accountable review.** For every significant element, ask what purpose it serves; remove or revise what is repetitive, unsupported or inconsistent.

## 3. Before → After fixes [Source: two carousels]
These describe the gap between "template" and "designed".

| Problem (before) | Fix (after) |
|---|---|
| **Everything looks equally important**, so nothing stands out | Give it a CLEAR HIERARCHY: headline bigger, supporting text smaller, key info (offer, price) easy to find |
| **Playing it too safe**: same weight, size and color everywhere feels flat | Combine bold + light type, large + small elements, light + dark colors |
| **More fonts** used to "improve" design | Make type work harder: ONE strong typeface, different weights, adjusted letter-spacing, intentional sizes |
| **Crowded corners**, or equal spacing everywhere that feels disconnected | Give elements room to breathe: group related elements, add clear space BETWEEN sections |
| **Perfectly aligned, repeated, predictable** layouts | Break the pattern with intention: unexpected crop, oversized element, asymmetric layout, different image scale |
| **Too much plain text**, lifeless | Give people something to look at: relevant image, close-up crop, graphic element, visual metaphor |
| **Low contrast**: grey headline, grey button, everything the same | Use contrast to create focus: color, size and weight contrast on the key message and CTA |
| **Busy palette** (5 competing colors) | Few well-chosen colors in balance; let ONE color take the lead |
| **Cluttered layout** (badges, nav, 3 icon features, leaf decorations, long copy) | Keep it simple: remove unnecessary elements, focus on the key message, keep a clear layout |
| **Overcrowded** feature bullets + shapes | White space = cleaner, more premium, easier to understand |
| **Generic product-on-grey**, small dark "Shop Now" button | Lifestyle/emotional imagery, two-weight headline, brand-color field, one strong CTA |

**Recurring "after" moves in the source material:** brand-color background field · two-tone headline · eyebrow + accent rule + headline · ONE strong CTA (often with an arrow) · oversized/cropped hero object · one accent color carrying the CTA.

## 4. Layout system [Expert]
- **Spacing scale (4/8-based):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128. Only use the scale.
- **Proximity:** space inside a group < space between groups < space between sections. Roughly double at each level.
- **Grid:** 12 columns desktop / 8 tablet / 4 mobile; consistent gutters; max content width ~1200–1440px; text columns narrower (~65ch).
- **Section rhythm:** keep the spacing system constant but **vary the structure** between sections (split → full-bleed → list → bento → quote). Never the same centered-heading + card-grid section repeated. [Source: DOCX]
- **Alignment choice:** choose left/center based on scanning and reading flow. Long text is left-aligned; centering suits short, symmetric moments only. [Source: DOCX]
- **One focal point per section, one primary CTA per view.**
- **Radius scale with roles:** small for controls (inputs, buttons), larger for containers; don't apply the same big radius to everything. [Source: DOCX]
- **Elevation scale:** 2–3 shadow levels with meaning (resting, raised, overlay). [Source: DOCX "effects indicate elevation, focus, state"]

## 5. Lessons from design history [Source: PDF Trendsetters 2010–2026]
- **Mobile-first** (Wroblewski, 2011): prioritize the most important tasks for small screens.
- **Touch-first** (2012): large targets. Today: WCAG 2.2 AA minimum target 24×24 CSS px; 44×44 is the comfortable recommendation. [Expert]
- **Flat → Material** (2013–2014): remove fake texture, but keep hierarchy through surface, elevation and meaningful motion.
- **Design systems & theming** (2016–2018): reusable components and brand-specific tokens.
- **Practical rule:** prioritize readability, accessibility and task clarity before adopting decorative trends.
