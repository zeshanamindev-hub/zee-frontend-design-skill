# Design rules library: router, recommendation protocol, conflicts

160 named rules in 12 categories. Every rule has an ID (cite the ID in plans and reviews, e.g. "hero uses L9 + L13 + C1").
Each entry has four parts: **what it says**, **how to apply it (numbers)**, **when**, and an **honest caveat** (what's overstated or often misused).
Tags: **[Source: …]** = taken from a named reference · **[Expert]** = practitioner judgement, not a formal study · **[Evidence: weak/mixed]** = treat as a heuristic.

| # | File | IDs | Use for |
|---|---|---|---|
| 1 | `01-color.md` | C1–C12 | choosing schemes, harmony, contrast, temperature, psychology |
| 2 | `02-layout-composition.md` | L1–L20 | composition, reading patterns, balance, grouping, CRAP |
| 3 | `03-typography.md` | T1–T12 | hierarchy, scales, pairing, measure, leading |
| 4 | `04-ux-laws.md` | U1–U30 | psychology laws (incl. all 30 entries on lawsofux.com) |
| 5 | `05-usability.md` | H1–H14 | Nielsen, Shneiderman, Norman, recall, status, errors |
| 6 | `06-dashboard.md` | D1–D14 | dashboards, data-viz, KPIs |
| 7 | `07-spacing-grid.md` | S1–S10 | 8/4-pt systems, grids, rhythm |
| 8 | `08-interaction.md` | I1–I10 | primary action, feedback, undo, targets |
| 9 | `09-responsive.md` | R1–R9 | mobile-first, fluid type/layout, images |
| 10 | `10-conversion.md` | K1–K10 | AIDA, PAS, CTA, message match, trust |
| 11 | `11-accessibility.md` | A1–A9 | POUR, WCAG 2.2, keyboard, focus, targets |
| 12 | `12-visual-branding.md` | B1–B10 | tokens, atomic design, dominance, minimalism |

(Conversion uses **K** so it never collides with Color **C**; dashboard rules are **D#**, distinct from art directions, which are always written "Direction D#".)

## 1. Task router: which rules to load
| Task | Load first | Then |
|---|---|---|
| Choose a colour scheme | 01, 11 (A3) | `../color-system.md` §7, `../niche-design-profiles.md` |
| Plan a page / section layout | 02, 07, 10 | `../../mediums/web-ui/layout-library.md` |
| Type system / font choice | 03, 11 (A7) | `../typography.md` |
| Landing / sales page | 10, 04 (U2, U9, U10, U12), 02 | `../cro.md` |
| Dashboard / admin / analytics | 06, 05, 07 | `../../mediums/dashboard/dashboard.md` |
| Mobile app screens | 08, 09, 11, 05 | `../../mediums/mobile-app/mobile-app.md` |
| Forms, checkout, onboarding | 05, 08, 04 (U7, U13, U22), 11 | `../../mediums/web-ui/micro-interactions.md` |
| Design system / tokens | 12, 07, 03 | `../../mediums/web-ui/implementation.md` |
| Audit / redesign | all; score with the checklist in §5 | `../../workflows/design-audit.md` |

## 2. Honest layout recommendation protocol (run before every page and every section)
1. **State the job** of the page or section in one sentence (what the visitor must understand, feel or do).
2. **List 2–3 candidate layouts** from `layout-library.md` that could do that job. Never offer only one.
3. **Score each candidate** against the rules that matter for this job (usually 4–6 IDs). Use ✓ / ~ / ✗ and a one-line reason per rule.
4. **Recommend one**, and say plainly:
   - why it wins (rule IDs + the content/asset it depends on),
   - **what it costs** (build time, asset needs, performance, risk),
   - **when the runner-up would be better** (e.g. "if you can't supply product photography, use B instead").
5. **Flag honesty issues**: say so when a requested layout breaks a rule. Examples: a 3-column icon-card row that fails the card test (L19), an auto-rotating carousel for key content (U27, A4), a hero with no real asset (L20 image test). Then follow the violation workflow (§4).
6. **Never claim a rule "proves" a layout converts.** Rules raise the odds. Only testing with real users or analytics proves it (K-rules caveat).

Output format (use it in the section plan):
```
Section: Pricing · Job: let a buyer pick a plan in < 30 s
Candidates: A) 3-tier columns + highlighted middle  B) toggle + comparison table  C) single plan + calculator
Scores:  U2 Hick (A ✓, B ~, C ✓) · U10 Von Restorff (A ✓, B ~, C n/a) · K5 attention ratio (A ✓, B ✗, C ✓) · L9 hierarchy (A ✓, B ~, C ✓)
Recommend A: 3 plans keep the choice small (U2), one emphasised (U10), CTA per column. Cost: needs real plan limits from client.
Use B instead if > 3 plans or enterprise buyers compare features line by line.
```

## 3. When rules conflict: priority order
1. **Accessibility & legal** (A-rules, WCAG 2.2 AA; EU: EN 301 549 V4.1.1 now references WCAG 2.2 AA)
2. **Usability** (H-rules, I-rules, U-rules)
3. **Conversion / business goal** (K-rules)
4. **Brand consistency** (B-rules)
5. **Aesthetics & trends** (L composition, C harmony, trends)
Example: a brand colour fails 4.5:1 for button text → keep the brand hue but darken the button fill or switch the label to black/white (A3 beats B1). A trend (glassmorphism) reduces contrast → it loses.

## 4. Violation workflow (adapted from DAE-UX steering) [Source: github.com/DAE-UX/design-system-scaffold]
When a requested or proposed design breaks a rule:
1. **STOP** before building it.
2. **ASK** for the reason, naming the rule ID, the consequence, and a compliant alternative. (One question; don't lecture.)
3. **RECORD** the decision in `.design/decisions.md`: `| date | rule | what was asked | reason given | accepted risk | alternative offered |`.
4. A user decision overrides aesthetic/brand rules (priority 3–5) once recorded. Accessibility/legal violations (priority 1) are never silently built: build the compliant version and explain.

## 5. Audit checklist (phased, from structure to polish)
1. **Structure**: L9 hierarchy · L7/L8 reading path · K3 one primary CTA per view · U2 choice count · L20 first-viewport tests
2. **Interaction**: H6 status · I3 feedback · H8 + I5 + I9 prevention, undo, recovery · I7 targets · I10 states
3. **Components**: L19 card test · B9 consistency · U18 Jakob conventions
4. **Visual**: C1 60/30/10 · C9 contrast · T1 type hierarchy · S9 consistent spacing · B7 dominance
5. **Accessibility**: A1–A9 (keyboard walk + `scripts/interaction-qa.mjs`)
Score: each failed rule = 1 issue, tagged P0 (blocks use or access), P1 (hurts conversion or trust), P2 (polish).

## Sources used across this library
lawsofux.com (Jon Yablonski) · uxmagic.ai/blog/laws-of-ux · myuxacademy.com/blog/ux-design-laws-principles (Jun 2026) · ux.detroit3d.com/foundations · interaction-design.org design guidelines · DAE-UX design-system-scaffold steering files · Nielsen Norman Group (10 heuristics, 1994/2020 update) · Shneiderman, *Designing the User Interface* (8 golden rules) · Norman, *The Design of Everyday Things* · W3C WCAG 2.2 (Dec 2024 edition) · figma.com/resource-library (UI principles, typography, colour combinations) · uxdesign.cc "58 rules" (T. Bakusevych, Jan 2024) · learnui.design "7 rules for gorgeous UI" (E. Kennedy, 2024 update) · shopify.com/blog/ui-design-principles (2023) · Tufte, *The Visual Display of Quantitative Information* · Few, *Information Dashboard Design*.
