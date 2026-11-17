# Responsive design: plan every section, never auto-stack

**Rule:** every section gets a written **responsive plan** (template in `workflows/page-and-section-build.md` B2) before it's coded. "Columns stack on mobile" is not a plan. Mobile is a separate composition, reviewed separately. [Source: DOCX + Expert]

## 1. Breakpoints
**Tailwind v4 defaults** (verified from tailwindcss.com, Nov 2026), mobile-first: unprefixed = all sizes; a prefix applies at that width **and up**.
| Prefix | Min width |
|---|---|
| (none) | 0, mobile |
| `sm` | 40rem / 640px |
| `md` | 48rem / 768px |
| `lg` | 64rem / 1024px |
| `xl` | 80rem / 1280px |
| `2xl` | 96rem / 1536px |
- Ranges: `md:max-xl:flex`. Custom breakpoints in v4: `--breakpoint-*` inside `@theme` (keep all in `rem`).
- **Content decides breakpoints:** add a breakpoint where the content breaks (line too long, cards too narrow), not where a device happens to be.
- Other stacks: use the theme's breakpoints (WordPress theme.json / Shopify theme CSS) so components stay consistent.

## 2. Container queries for components
A card or section that appears in different widths (sidebar vs main column) should respond to **its container**, not the viewport.
```html
<div class="@container">
  <article class="flex flex-col @md:flex-row">…</article>
</div>
```
Tailwind v4 container sizes run from `@3xs` (16rem) to `@7xl` (80rem); named containers use `@container/main` + `@sm/main:`. Plain CSS: `container-type: inline-size;` + `@container (min-width: 28rem) {…}`.

## 3. Fluid foundations
- **Type:** `clamp()` for headings (`clamp(2rem, 1.2rem + 3vw, 4rem)`); body stays ~16–18px. Never below 16px on inputs (iOS Safari zooms into inputs with smaller text).
- **Spacing:** fluid section padding (`clamp(3rem, 2rem + 5vw, 8rem)`); component spacing from the fixed scale.
- **Layout widths:** `max-width` on content (~1200–1440px) and on text (~65ch); wide screens get more margin, not stretched content.

## 4. Per-section responsive decisions (answer these in every plan)
1. **Layout:** what is the composition at each breakpoint (not just column count)?
2. **Order:** does priority change? (e.g. on mobile, show the CTA before the long description; image after headline)
3. **Content density:** what is condensed, truncated, moved into accordions/tabs, or removed on small screens? (Never hide essential content or SEO-critical text; restructure it.)
4. **Images:** art-directed crops per breakpoint (`<picture>` with different sources, or `object-position`), correct `sizes` for responsive images.
5. **Typography:** heading sizes per breakpoint; line length; balance.
6. **Interaction:** hover-dependent features need a tap/visible equivalent; carousels become swipeable with visible affordance; mega-menus become drill-down menus.
7. **Touch:** targets ≥ 44×44px recommended (WCAG 2.2 AA minimum 24×24), with spacing between adjacent targets; thumb-reachable primary actions on app-like screens.
8. **Wide screens (1536+):** what stops the layout from floating or stretching?

## 5. Pattern conversions (desktop → mobile)
| Desktop pattern | Mobile solution |
|---|---|
| Multi-column feature grid | Single column ordered by importance, or horizontal scroll-snap with peek |
| Asymmetric split hero | Headline → CTA → visual (cropped for portrait); keep the signature move visible |
| Bento grid | One column, dominant tile first, keep 1–2 tiles side by side if they're small stats |
| Wide comparison/pricing table | Plan cards with toggle, or a scrollable table with a sticky first column |
| Mega-menu | Full-screen drill-down menu with back navigation |
| Sidebar filters | Bottom-sheet/drawer filter with an "apply" button and active-filter chips |
| Hover-reveal cards | Info visible by default, or tap to expand |
| Long tabs row | Horizontally scrollable tabs or a select/accordion |
| Sticky sidebar CTA | Sticky bottom CTA bar |
| Video background | Static poster image (saves data; respects reduced motion) |

## 6. Responsive images
```html
<picture>
  <source media="(min-width: 64rem)" srcset="hero-wide.avif" type="image/avif">
  <img src="hero-portrait.jpg" alt="…" width="1200" height="1500"
       sizes="(min-width: 64rem) 50vw, 100vw" fetchpriority="high">
</picture>
```
Next.js: `next/image` with `sizes` and `priority` for the LCP image; `fill` + `object-cover` with an aspect-ratio container.

## 7. Common responsive bugs to check
- [ ] Horizontal scroll from an element wider than the viewport (`overflow-x` sneaks in from 100vw elements, long words, wide tables)
- [ ] `100vh` jumps on mobile browsers: use `100dvh` / `100svh`
- [ ] Inputs under 16px trigger zoom on iOS
- [ ] Hover-only interactions unusable on touch
- [ ] Fixed headers covering anchor targets (use `scroll-margin-top`)
- [ ] Tap targets too small or too close
- [ ] Text overlapping images at mid widths (768–1024 is where layouts break most)
- [ ] Images cropped badly (faces/products cut off) at some ratios
- [ ] Modals/drawers not scrollable on short screens; body scroll not locked
- [ ] Landscape phone (short height) layouts broken
- [ ] Safe areas on notched phones for fixed bottom bars: `env(safe-area-inset-bottom)`

## 8. Test widths
**320 / 375 / 390–430** (phones) · **768 / 834** (tablet portrait) · **1024 / 1280** (tablet landscape, laptop) · **1440 / 1536 / 1920+** (desktop/wide). Plus a short-height check (e.g. 375×667) and landscape phone. Use a browser tool for screenshots if available; otherwise state that responsive behavior wasn't visually verified.
