# Design laws & design physics

Rules about how people **perceive**, **decide** and **move** through an interface. Use them to make and defend every layout decision ("why is this here, this big, this close?"). Pairs with `principles.md` (the 9 principles + before/after fixes) and `color-system.md` (color rules and physics). [Expert unless tagged]

## 1. Perception physics: Gestalt laws (how the eye groups things)
| Law | What happens | Apply it |
|---|---|---|
| **Proximity** | Things close together are seen as a group | Space inside a group < space between groups < space between sections [Source: "group related elements"] |
| **Similarity** | Things that look alike seem related | Same style = same function (all links one color, all primary buttons identical) |
| **Common region** | Things inside a shared boundary group together | Cards/panels for related content; don't box unrelated items together |
| **Continuity** | The eye follows lines and curves | Align elements on clear axes; use direction (lines, gaze, arrows) toward the CTA [Source: Movement] |
| **Closure** | The mind completes incomplete shapes | Cropped images and partial cards hint "there's more" (carousels, scroll cues) |
| **Figure–ground** | We separate a subject from its background | Strong value contrast between content and background; scrims on images |
| **Symmetry & order** | Symmetric, simple forms feel stable and fast to read | Use symmetry for calm/trust moments, asymmetry for energy [Source: Balance] |
| **Common fate** | Things moving together seem related | Animate grouped items together; stagger only to show order |
| **Focal point / isolation (Von Restorff)** | The one different item is remembered | ONE accent element per view: the primary CTA [Source: Emphasis, 60/30/10 accent] |

## 2. UX laws (how people decide and act)
| Law | Meaning | Design rule |
|---|---|---|
| **Hick's law** | Decision time grows with the number and complexity of choices | Fewer options per decision; a recommended plan; progressive disclosure |
| **Fitts's law** | Time to hit a target depends on its size and distance | Big, close primary actions; ≥ 44×44px touch targets; CTAs near the content that motivates them |
| **Jakob's law** | Users expect your site to work like the sites they already know | Use conventions for nav, cart, search, forms; innovate in the visuals and story, not in basic controls |
| **Miller's law** (often over-applied) | Working memory is limited | Chunk information (phone numbers, steps, features in groups); don't treat "7±2" as a hard menu limit |
| **Tesler's law** | Complexity can't vanish, only move | The system should absorb complexity (smart defaults, autofill) so users don't |
| **Doherty threshold** | Productivity rises when responses come within ~400ms | Instant feedback; optimistic UI; skeletons; keep INP ≤ 200ms |
| **Serial position effect** | First and last items are remembered best | Put key items first and last in lists and navs; the final CTA section matters |
| **Peak–end rule** | Experiences are judged by their peak and their end | Design the best moment (aha/demo) and a strong ending (success state, thank-you page) |
| **Aesthetic–usability effect** | Beautiful designs are perceived as easier to use | Polish matters, but it can hide usability problems, so test anyway |
| **Zeigarnik effect** | Unfinished tasks stay in mind | Progress indicators, checklists (honest, not manipulative) |
| **Goal-gradient effect** | Motivation rises near the goal | Show progress in multi-step forms/checkout; make the last step short |
| **Postel's law** | Be liberal in what you accept | Forgiving inputs (any phone format), clear guidance, helpful errors |
| **Pareto (80/20)** | A few features drive most use | Design the top tasks best; give them the prime positions |
| **Cognitive load** | Every element costs attention | Remove what doesn't serve the section's job [Source: "keep it simple and clean"] |

## 3. Reading & scanning physics
- **F-pattern** (text-heavy pages): people scan the top, then the left edge. Front-load headings, start lines with key words, use meaningful subheads.
- **Z-pattern** (sparse pages/heroes): eye moves top-left → top-right → diagonal → bottom-right. Place logo → nav/CTA → visual → primary CTA along it.
- **Layer-cake scanning:** people jump between headings, so headings must carry the story alone.
- **Line length** 45–75 characters; **line height** 1.5–1.7 for body. Long lines lose the reader's place; short lines break rhythm.
- **Reading gravity:** in LTR languages the start is top-left; in RTL (Urdu, Arabic) mirror the layout direction.

## 4. Visual weight physics (what pulls the eye first)
Visual weight increases with: **size** · **value contrast** (dark on light or light on dark) · **color saturation** · **warm hue** · **isolation** (space around it) · **texture/detail** · **faces and eyes** (and where they look) · **position** (top/left in LTR, optical center) · **irregular shape**.
- Balance a heavy element with space or a counterweight on the opposite diagonal [Source: Balance].
- **Squint / blur test:** blur the screenshot; the order in which shapes still pop is the real hierarchy.
- **Grayscale test:** hierarchy must survive without color (value does the work; see color-system.md §6.2).

## 5. Optical corrections (why "mathematically correct" looks wrong)
- **Optical center** sits slightly **above** the geometric center: place centered hero content a bit higher than true middle.
- **Round and pointed shapes overshoot:** circles and triangles must be slightly larger than squares to look the same size (icons, logo lockups).
- **Optical alignment:** large headlines need a small negative indent to line up with body text; play-button triangles need nudging right; icons beside text need vertical nudges.
- **Visual spacing ≠ measured spacing:** text has internal space (line-height, side bearings); adjust padding so it *looks* even, especially in buttons (often slightly less top than bottom padding visually, depending on the font).
- **Thin lines look lighter on dark backgrounds and vice versa:** adjust weight per theme.
- **Large type needs tighter tracking, small caps need looser tracking** (typography.md).

## 6. Light, depth & material physics
- **One light source** for the whole interface (usually from top): shadows fall downward and consistently; never mix directions.
- **Elevation = closeness to the user:** higher elements get larger, softer, more offset shadows. Keep 2–3 levels with meaning (resting, raised, overlay) [Source: DOCX "effects indicate elevation"].
- **Realistic shadows** are layered (a tight contact shadow + a wide ambient one), tinted toward the background hue (not pure black at high opacity).
- **Dark themes:** shadows barely show, so express elevation with lighter surfaces.
- **Glass/translucency:** blur needs something behind it to blur; add a tint and border for legibility; check contrast on the busiest background [Source: trends].
- **Texture and grain** add materiality; keep them subtle and behind content.

## 7. Motion physics (making movement feel natural)
- Real objects **accelerate and decelerate**, so never use linear easing for UI movement (except progress/looping). **Ease-out** for entering (arrives fast, settles), **ease-in** for leaving, **ease-in-out** for moving between positions.
- **Springs** feel physical: tune **stiffness** (speed), **damping** (bounce), **mass** (weight). Low damping = playful bounce; high damping = calm, no overshoot. Match the art direction's motion personality.
- **Mass & distance:** bigger elements and longer distances move slightly slower; small elements are quicker.
- **Continuity:** elements should move from where they came from (a card expands into the detail view) so users keep orientation.
- **Gravity of attention:** only one thing moves at a time when you want it noticed.
- Durations and reduced-motion rules: `mediums/web-ui/micro-interactions.md` and `mediums/motion-graphics/motion-graphics.md`.

## 8. Proportion & layout math
- **Spacing scale** on a 4/8px base; **type scale** from a ratio (1.2 / 1.25 / 1.333): typography.md.
- **Grids:** 12 columns desktop / 8 tablet / 4 mobile; consistent gutters; content aligns to columns, with breakouts done on purpose.
- **Rule of thirds** for image crops and hero composition: place the subject or focal point on a third line.
- **Golden ratio (~1.618):** a useful proportion for two-column splits (about 62/38) or scale steps, but its "magic" is overstated. Use it as an option, not a rule.
- **Ratios that read well:** split heroes 60/40 or 7/5 columns; sidebars ~25–33%; media 16:9, 4:5, 1:1, 3:2.
- **Consistency beats cleverness:** a few proportions repeated everywhere create rhythm [Source: Repetition].

## 9. Using these in the workflow
- In every **section plan**, name the laws behind the key decisions (e.g. "Hick's law: 3 plans with one recommended; Fitts: sticky CTA on mobile").
- In **reviews and audits**, cite the law when flagging an issue ("Proximity: label is closer to the next field than its own input").
- Teach the user the principle behind each important decision in the handover.
