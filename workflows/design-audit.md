# Design audit: find gaps and issues, then suggest improvements

Use when the user asks to review, audit, critique or improve an existing site, page, section, Figma file or screenshot.

## 1. Gather the evidence
- **Live URL:** WebFetch (structure + copy) + `capture.mjs shots <url> --widths 375,768,1440 --full --sections` (its `report.json` lists overflow, console errors, failed requests and broken images: real defects). Otherwise ask for screenshots and mark visual findings as "not seen".
- **Codebase:** inspect components, tokens, CSS, fonts and images (SKILL.md Step 1).
- **Figma:** Figma MCP if connected.
- **Performance:** PageSpeed Insights / Lighthouse data (the user can run it, or fetch the PSI result page if accessible). Never guess scores.
- **Context:** business goal, audience, competitors (run research-pipeline Tracks 1–2 at Standard depth).

## 2. Audit lenses (run all, record findings with evidence)
| Lens | Check with |
|---|---|
| **Visual design** | 60/30/10 · one color leads · type system · hierarchy · spacing · alignment · 9 principles (`foundations/principles.md`) |
| **Rules library** | `foundations/rules/README.md` §5 phased checklist (structure → interaction → components → visual → accessibility); cite rule IDs in every finding |
| **AI-slop / genericness** | `foundations/anti-ai-slop.md`: generic-design detector score (0–14, incl. box layout and missing hi-fi section), banned defaults, logo-swap/brand/image tests |
| **Layout variety** | `mediums/web-ui/layout-library.md` §6 anti-box checks: width mix, card count, hi-fi section, rhythm |
| **Design laws & physics** | `foundations/design-laws-and-physics.md`: Gestalt grouping, Hick/Fitts, visual weight, optical alignment, light/shadow consistency, motion physics |
| **Usability** (Nielsen's 10 heuristics) | visibility of status · match with real world · user control · consistency · error prevention · recognition over recall · flexibility · minimalist design · error recovery · help |
| **Accessibility** (WCAG 2.2 AA) | contrast (run contrast.py), `scripts/interaction-qa.mjs` (keyboard walk, focus visible, names, alt, tabs, sliders, dialogs, video seek, reduced motion), headings, labels, target size |
| **CRO** | `foundations/cro.md` audit checklist: value prop clarity, CTA, friction, trust, objections |
| **Content** | specificity, clarity, scannability, claims backed by evidence, tone |
| **Responsive** | each breakpoint: layout, order, tap targets, overflow, image crops (`mediums/web-ui/responsive.md` bug list) |
| **SEO (on-page + technical)** | `foundations/seo.md` checklist. If the user's **seo-codebase-auditor** plugin (or another SEO audit tool) is installed, run it for the deep technical pass |
| **Performance** | LCP element, CLS sources, INP-heavy scripts, image/font weight |
| **Competitive gap** | what competitors do better / what nobody does |

## 3. Score and prioritize
For each finding:
- **Severity:** Critical (blocks conversion/access) · Major (hurts clarity/trust) · Minor (polish)
- **Impact × Confidence ÷ Effort** (ICE, 1–5 each) → priority order
- **Evidence:** screenshot reference, selector/file path, metric, or quote. No finding without evidence.

## 4. Report format (concise)
```
DESIGN AUDIT: <site/page> · <date> · evidence: screenshots ✓/✗, code ✓/✗, PSI ✓/✗

Summary: 3–5 sentences: overall quality, biggest risk, biggest opportunity.

Top 5 fixes (highest ICE first)
1. [Critical] <issue> → <specific fix> · why (principle/rule) · effort S/M/L

Findings by lens
Visual · Usability · Accessibility · CRO · Content · Responsive · SEO · Performance
  - <issue> | evidence | fix | severity

Quick wins (≤ 1 hour each): …
Strategic improvements (redesign-level): …
Not verified / needs testing: …
```
Then offer to fix: one section at a time via `workflows/page-and-section-build.md`, starting with the top fix.

## Rules
- Be honest and specific. "The CTA is weak" is not a finding. "The hero CTA ('Submit') doesn't say what happens next and is 2.9:1 contrast" is.
- Praise what works (so it isn't broken in the redesign).
- Separate **observed** issues from **hypotheses** (e.g. "may reduce conversions; validate with analytics or an A/B test").
