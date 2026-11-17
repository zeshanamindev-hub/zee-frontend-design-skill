# Tech-stack standards: general rules (any stack)

Load this for every build, then the stack file: `nextjs.md` · `wordpress.md` · `shopify.md` · `other-frameworks.md` (React+Vite, Astro, Vue/Nuxt, SvelteKit, Laravel, static HTML, Webflow/Framer).

## 1. Detect, don't assume
1. Identify the stack and **installed versions** (`package.json`, lockfile, `composer.json`, `style.css`/`theme.json` headers, Shopify `config/settings_schema.json` → `theme_info`).
2. **Existing project:** follow the installed version's conventions. Don't upgrade, don't introduce a new framework, styling system or component library without the user's approval. Explain upgrade benefits, risks and effort separately if relevant.
3. **New project:** use the **latest stable** versions. Check before scaffolding (`npm view <pkg> version`, official release notes). Never introduce beta/canary/experimental APIs silently.
4. **Version-sensitive APIs:** confirm against official docs for the installed version (Next.js bundles version-matched docs in `node_modules/next/dist/docs/` from 16.2+; check the relevant docs site otherwise). If you can't verify an API, say so.

**Snapshot of latest stable (npm, checked 2026-11-17; re-check):** next 16.4.6 · react 19.3.1 · tailwindcss 4.3.5 · vite 8.3.8 · astro 7.4.12 · nuxt 4.6.4 · motion 14.14.0 · gsap 3.15.1 · WordPress 7.1.4 (Oct 28, 2026).

## 2. Universal frontend standards
**HTML & accessibility**
- Semantic landmarks (`header`, `nav`, `main`, `footer`, `section` with headings), one `h1`, logical heading order.
- Native elements first (`button`, `a`, `details`, `dialog`, form controls); ARIA only to fill gaps.
- Every input has a visible `<label>`; errors linked with `aria-describedby`; live regions for async status.
- Keyboard: everything operable, visible `:focus-visible`, no traps (except modals with escape), skip link.
- WCAG 2.2 AA: contrast (contrast.py), target size ≥ 24×24 (44×44 recommended), reduced motion, no info by color alone.
- `lang` attribute, `alt` text by purpose, captions/transcripts for media.

**CSS**
- Design tokens as CSS custom properties (color roles, type scale, spacing, radius, shadow, motion); no magic numbers in components.
- Mobile-first media queries; container queries for reusable components; logical properties (`margin-inline`) for RTL readiness.
- Modern layout: Grid for 2D, Flex for 1D; avoid absolute positioning for layout.
- No `!important` except in utilities/overrides you document; keep specificity low.

**JavaScript**
- Ship the least JS needed; progressive enhancement (core content works without JS).
- No layout-shifting injections; defer non-critical scripts; avoid long main-thread tasks (INP).
- Event handlers on scroll/resize throttled, or use IntersectionObserver/ResizeObserver.

**Performance (Core Web Vitals: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1)**
- Optimize the LCP element (hero image: correct size, modern format, high fetch priority, not lazy-loaded).
- Self-host and subset fonts; max ~2 families / 4 weights; `font-display: swap` with metric-matched fallbacks.
- All images with width/height or aspect-ratio; lazy-load below the fold; responsive `srcset`/`sizes`.
- Third-party scripts audited; load after interaction or idle when possible.

**SEO** (details in `foundations/seo.md`): server-rendered content, unique title/meta, canonical, sitemap, robots, structured data, internal links.

**Security basics for frontend work**
- Never commit secrets; public env vars are public (`NEXT_PUBLIC_`, `VITE_`, `PUBLIC_`).
- Escape/sanitize user content; avoid `dangerouslySetInnerHTML` / `innerHTML` with untrusted data.
- External links that open new tabs: `rel="noopener noreferrer"`.
- Forms: server-side validation always; CSRF protection per framework; spam protection (honeypot/turnstile).

**Quality gates before handover**
- Type check, lint, format (project's own tools), build passes.
- Tests where the project has them; add tests for logic you write.
- Lighthouse / PageSpeed run (or ask the user to run it); accessibility automated scan (axe) + manual keyboard check.
- Visual check at the breakpoints in the section's responsive plan.
- Report: tested ✓ / not tested ✗, honestly.

## 3. Git & delivery
- Small, focused commits; don't reformat unrelated files.
- Never edit production directly: dev branch / dev theme / staging first.
- Document new tokens, components and decisions in `DESIGN.md`.
