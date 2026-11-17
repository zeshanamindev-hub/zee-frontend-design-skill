# Shopify theme standards (Online Store 2.0 + theme blocks / Horizon, Nov 2026)

Official sources: shopify.dev/docs/storefronts/themes (best practices, performance, Theme Store requirements), Shopify CLI docs. Check which architecture the existing theme uses before changing anything.

## 1. Architecture today
- **Online Store 2.0:** JSON templates, sections everywhere, section groups (header/footer), app blocks, metafields/metaobjects as dynamic sources.
- **Theme blocks (`blocks/` folder):** reusable blocks defined once at the theme level and usable in any section that accepts `{ "type": "@theme" }`; **nested blocks** (Horizon supports up to 8 levels); `@app` for app blocks. Horizon (Summer '25 Edition) is Shopify's free theme family built on theme blocks throughout, with web components on the front end and AI block generation in the editor.
- **Dawn-style themes** (section-defined blocks) are still widely used. Extend them in their own pattern unless migration is approved.
- **LiquidDoc** (`{% doc %}` … `{% enddoc %}`) documents block/snippet parameters; use it for new snippets/blocks.

## 2. Build standards
- Work on a **development theme** (`shopify theme dev`), never the live theme. Use Git; `shopify theme push` to an unpublished theme for review.
- Each designed section = a section (or theme blocks) with **merchant-editable settings**: text, images, colors (color schemes), spacing, layout options. No hard-coded copy or hex values.
- Use the theme's **color schemes** and settings for the 60/30/10 roles; expose typography via `font_picker` settings where the theme supports them.
- Translations: all strings in `locales/*.json` (`{{ 'key' | t }}`); schema labels translated too.
- Accessibility: semantic markup, keyboard support for menus/drawers/carousels, focus management in cart drawers and modals, alt text from the image's alt setting.
- **Run `shopify theme check`** (Theme Check linter) and fix errors before handover.

## 3. Performance (Shopify tests Theme Store themes for performance)
- Liquid: avoid expensive loops, limit nested `for` over large collections, use `render` (not `include`), paginate.
- Images: `image_url` with width + `image_tag` (gives `srcset`/`sizes`, width/height); `loading: 'lazy'` below the fold; hero `fetchpriority: 'high'`.
- JS: minimal, deferred, modular (web components); no jQuery dependency for new work; avoid large app scripts on every page.
- CSS: critical CSS small; section-level `{% stylesheet %}`/asset files loaded only where needed.
- Fonts: Shopify font library via `font_face` with `font_display: 'swap'`; limit weights.
- Measure with Lighthouse on a dev store; watch Core Web Vitals in field data where available.

## 4. E-commerce UX & CRO standards
Product page: gallery with zoom/video, clear price + compare-at (truthful), variant swatches, stock/delivery info, sticky add-to-cart on mobile, express checkout buttons (Shop Pay etc.), shipping/returns near the CTA, reviews app block. Collection: filters (Search & Discovery), sort, quick add. Cart: drawer with upsell (relevant only), progress to free shipping (if real). See `foundations/cro.md` §5 and `business-layouts.md` §2.

## 5. SEO in Shopify themes
- `<title>` from `page_title` (+ shop name), meta description from `page_description`, canonical `{{ canonical_url }}`.
- Structured data: product JSON-LD (Product, Offer, AggregateRating from a real reviews app), Organization, BreadcrumbList; keep it consistent with visible content.
- Heading hierarchy per template (one H1: product/collection title).
- Alt text from merchant image settings; descriptive handles/URLs.

## 6. Quality gates
`shopify theme check` · theme editor test (every setting, empty states, long text, missing images) · mobile/desktop visual check at the theme's breakpoints · Lighthouse (performance + accessibility) · test with real products/variants and apps installed · Theme Store requirements review if submitting.
