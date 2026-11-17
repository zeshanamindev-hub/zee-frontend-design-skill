# Next.js standards (App Router): verified against Next.js 16 docs, Nov 2026

Current stable: **16.4.x** (15.5.x still receives patches). Check the installed version first and follow its docs. From 16.2+, Next.js ships version-matched docs in `node_modules/next/dist/docs/`; prefer those.

## 1. Next.js 16 facts to respect
- **Requirements:** Node.js ≥ 20.9, TypeScript ≥ 5.1; browsers Chrome/Edge/Firefox 111+, Safari 16.4+.
- **Turbopack is the default** for `next dev` and `next build` (custom `webpack` config makes `next build` fail unless you pass `--webpack`). `turbopack` config is top-level in `next.config.ts`.
- **Async Request APIs only:** `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` must be awaited. Use the `PageProps<'/route/[slug]'>` / `LayoutProps` helpers (`npx next typegen`).
- **`middleware` → `proxy`:** the file and the export are now `proxy.ts` / `export function proxy()`, with the Node.js runtime. Edge middleware must not be blindly renamed.
- **`next lint` removed:** run ESLint (flat config) or Biome directly.
- **Caching:** `cacheComponents: true` opts into Cache Components (`"use cache"`, `cacheLife`, `cacheTag`, now stable). `revalidateTag(tag, profile)` requires a cacheLife profile; `updateTag` (Server Actions) gives read-your-writes; `refresh()` refreshes the client router.
- **React Compiler:** stable via `reactCompiler: true` (opt-in; slower builds).
- **next/image defaults changed:** `qualities` defaults to `[75]` (add values you use), `minimumCacheTTL` 4h, `16` removed from `imageSizes`, `images.domains` deprecated (use `remotePatterns`), local images with query strings need `localPatterns`.
- **Scroll:** Next.js no longer overrides `scroll-behavior: smooth` during navigation (add `data-scroll-behavior="smooth"` on `<html>` for the old behavior).
- **Parallel routes:** every slot needs a `default.js`.
- **View transitions** work in the App Router without a flag (16.3+), useful for page-transition motion.
- Removed: AMP, `serverRuntimeConfig`/`publicRuntimeConfig` (use env vars), `next/legacy/image` deprecated.

## 2. Architecture standards
- **Server Components by default;** add `"use client"` only to interactive leaves (forms, toggles, animation wrappers). Keep client bundles small.
- Data fetching on the server; Server Actions for mutations with server-side validation (e.g. Zod); never trust client input.
- **Route structure:** `app/(marketing)/…`, `app/(app)/…` route groups; colocate components, keep `components/ui` for primitives (shadcn), `components/sections` for page sections.
- `loading.tsx` with skeletons that match the layout; `error.tsx` and `not-found.tsx` designed (not defaults).
- Environment variables: server-only by default; `NEXT_PUBLIC_` only for safe public values.

## 3. Styling & UI
- **Tailwind v4** (CSS-first `@theme`), tokens as CSS variables (see `mediums/web-ui/implementation.md`). Use `cn()` (clsx + tailwind-merge) for conditional classes.
- **shadcn/ui:** components are copied into the repo; theme via CSS variables. The 10% brand accent → `--primary`; `--accent` = hover tint.
- Icons: one library (shadcn projects usually use Lucide).
- Motion: CSS first; `motion` package for React orchestration, wrapped in client components; respect `prefers-reduced-motion`.

## 4. Performance & media
- **Fonts:** `next/font/google` or `next/font/local` (self-hosted, `size-adjust` fallbacks, no CLS); expose as CSS variables.
- **Images:** `next/image` with explicit `sizes`; `priority` (or `fetchPriority="high"`) on the LCP image only; `fill` inside an aspect-ratio container; configure `qualities` if you use non-75 values.
- Video: `<video>` with poster, lazy-loaded below the fold; heavy embeds behind a facade (click to load).
- Third-party scripts via `next/script` with `strategy="lazyOnload"`/`afterInteractive` as appropriate.
- Measure with Lighthouse / PageSpeed / Vercel Speed Insights (Next.js 16 removed the size metrics from `next build` output).

## 5. SEO in Next.js
- `export const metadata` / `generateMetadata` per route: title template in the root layout, description, canonical (`alternates.canonical`), Open Graph, Twitter.
- `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` (`next/og`); for multiple sitemaps, `generateSitemaps`. In 16, sitemap `id` and image `params`/`id` are Promises.
- JSON-LD: render a `<script type="application/ld+json">` in the Server Component with data that matches the page.
- Keep primary content server-rendered; avoid client-only rendering for SEO-critical sections.

## 6. Quality gates
`tsc --noEmit` · ESLint/Biome · `next build` · tests (Vitest/Jest, Playwright for flows) · Lighthouse · axe · visual check at section breakpoints.
