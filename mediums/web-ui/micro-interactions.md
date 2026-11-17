# Micro-interactions, engagement patterns & visual patterns

Micro-interactions make an interface feel alive and trustworthy, **when each one communicates something**. Motion that only decorates is slop. [Source: DOCX "motion communicates state or progression"; Expert]

## 1. Anatomy (Dan Saffer's model)
**Trigger** (user action or system event) → **Rules** (what happens) → **Feedback** (what the user sees/hears/feels) → **Loops & modes** (what happens over time / repeated use).
For each micro-interaction, write: trigger · feedback · duration/easing · reduced-motion fallback.

## 2. Micro-interaction catalog (with intent)
| Interaction | Intent | Spec (default) |
|---|---|---|
| Button hover/press | Affordance + "registered" | hover: bg/colour shift 150ms ease-out; press: `scale(0.98)` 100ms; never change size/layout |
| Focus ring | Keyboard location | `:focus-visible` 2px ring in accent with offset; ≥ 3:1 contrast; no animation needed |
| Loading button | Action in progress | Label → spinner/progress inside the button, width locked, disabled to prevent double submit |
| Form validation | Error prevention | Validate on blur (not every keystroke); inline message + icon; success check for complex fields |
| Toggle / switch | State change | Thumb slides 150–200ms; colour + position (not colour alone) |
| Checkbox / like / save | Confirmation + delight | Check draws in 200ms; heart pop scale 1 → 1.2 → 1 with spring; count updates |
| Add to cart | Progress + reassurance | Button state "Added ✓", cart badge bumps, mini-cart drawer or toast with "View cart" |
| Copy to clipboard | Confirmation | Icon swaps to check + "Copied" for ~1.5s |
| Toast / snackbar | Status | Slide/fade in 200ms, auto-dismiss 4–6s (pause on hover/focus), undo when relevant, announced via `aria-live` |
| Skeleton loading | Perceived speed | Skeleton matches the final layout; subtle shimmer or none (reduced motion) |
| Pull/scroll progress | Orientation | Reading-progress bar on long articles; step indicator in multi-step flows |
| Accordion / tabs | Disclosure | Height/opacity 200–250ms; chevron rotates; `aria-expanded` |
| Nav menu open | Spatial continuity | Drawer slides from its origin 250–300ms; backdrop fades; focus trapped |
| Hover card reveal | Progressive detail | Desktop only; tap fallback on touch |
| Number counters | Emphasis on real stats | Count up once when in view, ~800ms, `tabular-nums`; static when reduced motion; real numbers only |
| Image hover (e-commerce) | More information | Swap to second product image, 200ms crossfade |
| Drag & drop | Direct manipulation | Lift (shadow + slight scale), placeholder gap, drop settle; keyboard alternative required |
| Empty → filled state | Guidance | Illustrated empty state with one action; celebrate the first success subtly |
| Success confirmation | Closure | Checkmark animation + clear next step (order number, email sent) |
| Cursor effects | Brand moment (rarely) | Custom cursor only in creative/portfolio sites; never hide the native cursor's meaning |

## 3. Engagement patterns (use when they serve the goal)
- **Scrollytelling:** sticky visual that changes as steps scroll. Great for "how it works" and product stories; provide a non-animated fallback.
- **Interactive demo in the hero:** a real, small, working piece of the product (type an input, toggle a setting).
- **Calculators & configurators:** pricing, ROI, size or quote calculators. High intent, strong for lead generation.
- **Quizzes / product finders:** guide choice in large catalogs; end with a personalized recommendation and CTA.
- **Before/after sliders:** services, renovations, image tools.
- **Progress & completion:** onboarding checklists, profile-completion meters (honest, not manipulative).
- **Social proof in context:** "Rated 4.8 by 1,200 customers" next to the CTA (real data only).
- **Personalization:** remembered preferences, recently viewed, location-aware content. Transparent and reversible.
- **Gamification (light):** streaks, badges, milestones for apps and learning products; avoid manipulative loops.
- **Delight moments:** one small surprise per flow (success animation, playful 404). Never in the way of the task.

## 4. Implementation
- **CSS first:** transitions on `transform`/`opacity`; `@starting-style` and `transition-behavior: allow-discrete` for enter animations in modern browsers (progressive enhancement); View Transitions API for page/state transitions where supported.
- **React:** Motion (motion.dev; npm `motion`, v14 in Nov 2026) for layout animations, gestures, exit animations, springs.
- **Complex timelines / scroll:** GSAP (v3.15, Standard "no-charge" license, including its plugins such as ScrollTrigger; check gsap.com/standard-license for terms).
- **Illustrative / stateful animation:** Rive (interactive state machines) or Lottie/dotLottie (vector playback).
- **Accessibility:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
  }
  ```
  Use this as a fallback base; better still, design specific reduced-motion alternatives (crossfade instead of slide). Never flash more than 3 times per second (WCAG 2.3.1). Status changes are announced with `aria-live`.
- **Performance:** keep INP ≤ 200ms; no heavy JS on hover or scroll handlers; `will-change` only while animating.

## 5. Visual patterns & textures (backgrounds that add depth)
| Pattern | Fits | How |
|---|---|---|
| Subtle grain/noise | Organic, editorial, dark cinematic | Tiny tiled noise PNG/SVG at 3–8% opacity (fffuel "nnnoise") |
| Blueprint / grid lines | Tech, dev tools, architecture | CSS `background-image: linear-gradient(...)` grid or SVG; low contrast |
| Dot grid | Product UI, whiteboard feel | `radial-gradient` dots at 16–24px spacing |
| Geometric repeat | Brand identity, packaging feel | Hero Patterns (CC BY 4.0, credit it) / Pattern Monster, tinted to the palette |
| Organic blobs / waves | Friendly, consumer (sparingly) | Haikei SVG; never floating decoration without meaning [Source: DOCX] |
| Grainy gradients | Soft premium, launch pages | fffuel "gggrain"; same-hue or analogous colors |
| Brand-derived motif | Any (best option) | Pattern made from the logo mark, product shape or concept; the most distinctive choice |
Rules: patterns stay behind content with low contrast; text never sits on busy pattern areas without a solid backing; total pattern asset weight stays tiny.

## 6. Animated GIFs (when and how)
- **On websites, prefer video:** a muted, looping `<video autoplay muted loop playsinline>` in MP4/WebM is usually **far smaller** and smoother than the same GIF. Use animated AVIF/WebP as another lighter option.
- **Use GIF when the destination needs it:** email (most clients don't play video), GitHub READMEs, docs, chat tools, some marketplaces.
- **Make good GIFs:** short (2–6s), loop seamlessly, 10–15 fps for UI demos, small dimensions (≤ 800px wide), limited palette, crop to the relevant area.
- **Create:** record (Screen Studio, CleanShot X, Kap, ScreenToGif) → trim → convert with `bash ${CLAUDE_SKILL_DIR}/scripts/make-gif.sh input.mp4 output.gif [width] [fps]` (ffmpeg two-pass palette for quality and size). See `mediums/motion-graphics/motion-graphics.md` §6.
