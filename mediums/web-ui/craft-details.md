# Craft details — what makes it look premium and high-fidelity

Premium is not more effects. It's **many small decisions done consistently**. Use this as the polish pass after the layout works. [Expert, unless tagged]

## 1. Typography craft
- `text-wrap: balance` on headings; `text-wrap: pretty` on paragraphs (progressive enhancement).
- Tight tracking on large display; wide tracking on small uppercase labels.
- `font-variant-numeric: tabular-nums` for prices, tables, counters, timers.
- Real typographic characters: curly quotes ’ “ ”, en dash for ranges (2010–2026), ellipsis …, × for dimensions.
- Optical alignment: large headlines often need a small negative indent to *look* aligned with body text.
- Max ~65ch body width; never full-width paragraphs on desktop.
- Hanging details: list bullets and quote marks outside the text edge when the layout allows.

## 2. Color & surface craft
- **Tinted neutrals:** greys pick up a hint of the brand hue (warm or cool), never dead `#808080`.
- **Hairline borders:** 1px at low opacity (e.g. `color-mix(in oklch, var(--foreground) 10%, transparent)`) instead of heavy borders.
- **Layered shadows:** combine 2–3 soft shadows (tight + wide) for natural elevation; max 3 elevation levels.
- **Gradients:** same-hue or analogous only, subtle, with a reason (light source, depth). [Source: DOCX "gradients optional, never automatic"]
- **Texture:** a very subtle grain/noise overlay can add tactile warmth to flat fields. Keep opacity low and the file tiny.
- **Selection & focus in brand color:** `::selection` and `:focus-visible` rings use the accent (with 3:1 contrast against the background).

## 3. Imagery craft
- One art direction for all photos: same color grade, similar lighting, consistent crop logic.
- Real product UI shown crisp (2x assets), in a light frame, or as cropped detail views, not inside fake device mockups by default.
- Consistent aspect ratios per role (e.g. 4:5 portraits, 16:9 media, 1:1 avatars).
- Close-up crops and unexpected scale create interest. [Source: "Give people something to look at"; "Break the pattern"]
- `alt` text describes purpose; decorative images get `alt=""`.

## 3b. Light, depth and text over images [Source: learnui.design, E. Kennedy, "7 Rules for Creating Gorgeous UI" (2024 update)]
- **Light comes from the sky:** raised elements (buttons, cards, dropdowns, popups, slider knobs) get a slightly lighter top and a soft shadow below; recessed elements (inputs, pressed buttons, slider tracks, unchecked boxes) get an inner shadow at the top. Keep it subtle ("flatty": flat + light shadows). Higher layers are slightly brighter in dark mode.
- **Black and white first:** design the layout in greyscale; add colour last and only with a job (one accent, or shades of one hue).
- **Text over images, from safest to riskiest:** (2) text in a solid/semi-opaque box · (1) full-image overlay (≈ 35% black, or a brand-colour overlay) · (4) floor fade: gradient darkening the bottom third + faint text shadow (or "floor blur") · (3) blur the area behind the text · bonus: radial scrim behind the text · (0) direct text on the image only if the image is dark and calm **and** you've tested every breakpoint and crop. Always verify the result with `contrast.py` against the *lightest* pixel behind the text.

## 4. Interaction states — design ALL of them (hi-fi = complete)
For every interactive component: **default · hover · focus-visible · active/pressed · disabled · loading**.
For every data view: **loading (skeleton matching the layout) · empty (helpful, with an action) · error (what happened + how to fix) · success · partial/long content**.
- Buttons don't change size on hover (no layout shift).
- Hover is a hint, not the only signal: touch devices have no hover.

## 5. Motion craft [Source: DOCX "motion communicates state or progression"; timing Expert]
| Use | Duration | Easing |
|---|---|---|
| Micro feedback (hover, press, toggle) | 100–200ms | ease-out |
| Component enter/exit (menu, modal, toast) | 200–300ms | ease-out in, ease-in out |
| Page/section transitions, larger moves | 300–500ms | custom ease or spring |
| Staggered lists | 30–80ms between items | — |
- Animate `transform` and `opacity` (GPU-friendly), not `width/height/top/left`.
- One motion personality per product (still · smooth · springy · cinematic), matching the art direction.
- Scroll-triggered reveals: a few key moments, not every element. [Source: DOCX]
- Always: `@media (prefers-reduced-motion: reduce)` → remove non-essential motion, keep state changes instant.
- Libraries: CSS first; Motion (formerly Framer Motion) for React orchestration; GSAP for complex timelines; Rive/Lottie for illustrative animation. [Source list + Expert]

## 6. Responsive craft
- Fluid type (`clamp()`) and fluid spacing for big sections.
- Container queries for components that live in different widths.
- Test 360/375, 768, 1024, 1280, 1440+; also very wide (1920+) so the layout doesn't float.
- Touch targets ≥ 44×44 px recommended (WCAG 2.2 AA minimum is 24×24).

## 7. Performance is part of "premium"
Awwwards weights usability at 30% of the score. Slow or janky pages lose there. [Expert]
- Self-host fonts via `next/font` (no layout shift), subset, max ~4 font files.
- `next/image` (or `<img>` with width/height + `loading="lazy"` + modern formats).
- Hero visual optimized for LCP; avoid huge JS just for decoration.
- No layout shift from fonts, images, banners or late-loading embeds.

## 8. Final polish checklist
- [ ] Favicon, social share image (OG), page titles match the brand
- [ ] Consistent icon size and stroke, optically aligned with text
- [ ] Every interactive state designed
- [ ] Empty/loading/error states exist where data appears
- [ ] Copy has no lorem ipsum; placeholders clearly marked
- [ ] Dark mode (if offered) checked screen by screen
- [ ] Desktop and mobile screenshots reviewed side by side
