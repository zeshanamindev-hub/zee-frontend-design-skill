# 09 · Responsive design rules (R1–R9)
Per-breakpoint section planning and code: `../../mediums/web-ui/responsive.md`.

| ID | Rule | How to apply | Honest caveat |
|---|---|---|---|
| **R1** | **Mobile-first** | Write base CSS for the smallest screen, then add `min-width` queries. Decide the mobile content order **first** (what survives on 375px is the real priority). | Mobile-first CSS ≠ designing only for mobile; desktop deserves its own composition (L11, full-bleed). |
| **R2** | **Content-first breakpoints** | Add a breakpoint where the *content* breaks (line length > 75ch, cards too narrow, nav wraps), not at device widths. Typical results: ~480, 768, 1024, 1280, 1536. | Frameworks' default breakpoints are fine if they match where your content breaks. |
| **R3** | **Fluid typography** | `font-size: clamp(min, preferred-vw + rem, max)`; e.g. H1 `clamp(2.25rem, 1.2rem + 4vw, 4.5rem)`. Keep a rem component so browser zoom works (WCAG 1.4.4). | Pure `vw` sizes break zoom; always mix in `rem`. |
| **R4** | **Fluid layout** | `minmax(0,1fr)`, `clamp()` for padding/gaps, `max-width` + `margin-inline: auto`, container queries for components. | Fluid everything can look stretched at 1920px+; cap widths. |
| **R5** | **Responsive images** | `srcset` + `sizes`, AVIF/WebP, explicit `width`/`height` (no CLS), `loading="lazy"` below the fold only, `fetchpriority="high"` on the LCP image, art direction with `<picture>` (different crop on mobile). | Lazy-loading the hero image hurts LCP; never lazy-load it. |
| **R6** | **Progressive enhancement** | Core content and actions work with HTML + CSS; JS adds motion, filters, enhancements. Check `@supports` for new CSS (view transitions, scroll-driven animations). | SPAs often fail here; at minimum, server-render content for SEO and resilience. |
| **R7** | **Graceful degradation** | When a feature is unsupported or reduced (no WebGL, `prefers-reduced-motion`, slow network), fall back to a designed static state (poster image, still frame). | Fallbacks must be *designed*, not just "nothing renders". |
| **R8** | **Adaptive design** | Serve materially different layouts/components per context when needed (data table → cards on mobile; hover menu → full-screen sheet). | More variants = more maintenance; adapt only where fluid fails. |
| **R9** | **Touch-friendly design** | Targets ≥ 44px (I7); primary actions in the thumb zone (bottom half) on mobile; no hover-only menus; inputs ≥ 16px font (prevents iOS zoom); correct `inputmode`/`autocomplete`. | Bottom-anchored CTAs can cover content; add safe-area padding (`env(safe-area-inset-bottom)`). |
