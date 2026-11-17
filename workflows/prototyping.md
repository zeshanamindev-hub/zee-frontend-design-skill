# Workflow: prototyping (from wireframe to testable, coded prototype)

A prototype exists to **answer a question** before building for real: "Can people find pricing?", "Does this onboarding make sense?", "Does the motion feel right?". Write the question first; it decides the fidelity.

## 1. Pick the fidelity
| Level | Answers | Build it as (Claude Code) | Time |
|---|---|---|---|
| **L0 Flow map** | Which screens/steps exist and in what order? | Mermaid flowchart in `.design/prototypes/flows.md` | minutes |
| **L1 Grey wireframe** | Is the structure and hierarchy right? | Single HTML file, greyscale only ("black and white first": Kennedy R2), real copy, no images | < 1 h |
| **L2 Click-through** | Can people complete the task? | Multi-page HTML (or one file with hash routes), real links, all key states | hours |
| **L3 Hi-fi interactive** | Does it look and feel right? Motion, micro-interactions | HTML/CSS/JS with tokens, real assets, real data; Motion/GSAP only where needed | 0.5–2 days |
| **L4 Production prototype** | Will it work in our stack? | A route/branch in the real project (Next.js / WP block theme / Shopify section) | days |
Default to **coded prototypes**: they're real (responsive, accessible, measurable), they're testable with Playwright, and they port to the stack (`port-to-stack.md`). Use Figma when a team must comment in Figma; if a Figma MCP server is connected, push screens there instead of re-drawing them.

## 2. Steps
1. **Question & success criteria**: e.g. "4 of 5 testers find the annual price in < 20 s."
2. **Scope**: the minimum screens and states to answer it (happy path + 1–2 error/empty paths).
3. **Content**: real copy (draft is fine) + realistic data (D14). No lorem ipsum: it hides layout and comprehension problems.
4. **Build** at the chosen level in `.design/prototypes/<name>/`. Every interactive element has its states (I10).
5. **Self-check**: `node scripts/capture.mjs shots <file> --widths 390,1440 --full` for layout; `node scripts/interaction-qa.mjs <file>` for keyboard, focus, dialogs and video.
6. **Walkthrough recording** (optional): build a timeline and render it with `scripts/render-video.mjs`, or record a Playwright run. Useful for async stakeholder review.
7. **Test** (see §3), log findings in `.design/prototypes/<name>/findings.md` as P0/P1/P2.
8. **Decide**: iterate (back to 4), promote (to L3/L4), or drop the idea. Record the decision in `.design/decisions.md`.

## 3. Lightweight usability test (5 users finds most big problems; NN/g guidance)
- Recruit people who match the audience (not colleagues, if possible).
- 3–5 tasks phrased as goals ("You want to cancel your plan. Show me how."), not instructions.
- Think-aloud; don't help; note where they hesitate, misclick or misread.
- Measure: task success, time, errors, confidence (1–5). Ask one question at the end: "What was confusing?"
- Unmoderated alternative: share the prototype URL + task list; collect screen recordings.
- **Honest caveat:** 5 users is for finding problems, not proving improvements. Conversion claims need analytics or A/B tests (K-rules caveat).

## 4. Prototyping motion and micro-interactions
- Prototype motion in code with the real easing and durations (UI 150–300 ms; entrances 400–700 ms; see `../mediums/web-ui/micro-interactions.md` and `../mediums/motion-graphics/motion-graphics.md` §tweening).
- Compare 2 variants side by side (e.g. `?v=a` / `?v=b`) rather than describing them.
- Every motion gets a line in the motion ledger (`templates/motion-ledger.md`): trigger · purpose · duration · easing · reduced-motion fallback.

## 5. Prototypes for dashboards and apps
- **Dashboards:** load a real CSV/JSON (or a realistic generated dataset with edge cases) and wire filters → charts → table drill-down. The question is usually "can the role answer their daily question in < 10 s?"
- **Mobile apps:** prototype in HTML at device size (393×852 / 412×915) with `capture.mjs --widths 393` and touch emulation; or with Expo/React Native for L4. Test one-handed reach (thumb zone) on a real phone via a local network URL.

## 6. Hand-off from a prototype
Prototype → spec: tokens used, components and states, breakpoints, motion ledger, open questions. Then follow `port-to-stack.md`.
