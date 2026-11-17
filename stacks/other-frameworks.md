# Other stacks: quick standards (verify against each framework's official docs)

Latest stable on npm, checked 2026-11-17: **vite 8.3.8 · react 19.3.1 · astro 7.4.12 · nuxt 4.6.4**. Always check the installed version and follow its docs. These are orientation notes, not a substitute for the official docs.

## React + Vite (SPA / app)
- Vite with the React plugin; TypeScript strict; route-level code splitting (`lazy` + `Suspense`).
- SPAs are weak for SEO on marketing pages. Prefer a framework with SSR/SSG (Next.js, Astro, React Router framework mode) for public content; use SPA for logged-in apps.
- Env vars: only `VITE_`-prefixed values reach the client, and they are public.
- State: server state via a query library; avoid global state for server data.
- Same token/Tailwind/shadcn approach as Next.js (Tailwind v4 Vite plugin).

## Astro (content sites, marketing, blogs)
- Ideal for content-heavy, SEO-focused sites: HTML-first, zero JS by default, **islands** for interactivity (`client:visible`, `client:idle`) using React/Vue/Svelte components.
- Content collections with schemas for blog/docs; image optimization via the built-in image component; sitemap integration.
- Keep islands small; animations in CSS where possible; View Transitions support for page transitions.

## Vue / Nuxt
- Nuxt for SSR/SSG with file-based routing; `useHead`/`useSeoMeta` for metadata; Nuxt Image and Nuxt Fonts modules for media/fonts; server routes for APIs.
- Composition API with `<script setup>` + TypeScript; Pinia for client state.
- Check Nuxt 4 directory conventions (`app/` directory) in the docs for the installed version.

## SvelteKit
- SSR/SSG per route; `+page.server.ts` for data; form actions for mutations with progressive enhancement; adapters per host.
- Svelte transitions for micro-interactions; respect reduced motion.

## Laravel (Blade / Livewire / Inertia)
- Blade components for design-system pieces; Vite for assets (Tailwind); Livewire or Inertia (React/Vue) for interactivity.
- Escape output (`{{ }}`), CSRF (`@csrf`) on forms, validation via Form Requests.

## Static HTML / CSS / vanilla JS
- Semantic HTML, CSS custom properties for tokens, a small build (Vite) if needed; images with width/height and `srcset`; minimal JS with `defer`/`type="module"`.

## No-code / visual builders (Webflow, Framer)
- Translate the skill's tokens into the builder's variables/styles (colors, type, spacing) and components/symbols.
- Respect the builder's responsive breakpoints, and plan each section's responsive behavior per breakpoint (`mediums/web-ui/responsive.md`).
- Check SEO settings per page (title, meta, OG, canonical, alt), performance (image sizes, interactions/animations weight) and accessibility (semantic tags, focus states), since builders don't do these by default.
