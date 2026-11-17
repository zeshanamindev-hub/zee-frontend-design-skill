# Workflow: port a prototype to the production stack

Prototypes (HTML in `.design/prototypes/`) are for deciding. Production code must follow the project's stack conventions (`../stacks/`). Port deliberately, section by section, and prove parity.

## 1. Inventory the prototype
List per section: layout ID, components used, tokens used, assets, interactions/motion (ledger), responsive behaviour per breakpoint, and any JS.

## 2. Tokens first
Move design decisions into the stack's token layer **before** components:
- **Next.js + Tailwind v4:** CSS-first config in the global stylesheet:
```css
@import "tailwindcss";
@theme {
  --color-surface: oklch(0.985 0.004 85);
  --color-ink: oklch(0.18 0.01 85);
  --color-action: oklch(0.62 0.19 40);
  --font-display: "Fraunces", serif;
  --font-sans: "Inter", sans-serif;
  --spacing: 0.25rem;            /* Tailwind's spacing unit; utilities use multiples */
  --radius-card: 1rem;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}
```
  If the project uses **shadcn/ui**, map semantic roles onto its variables (`--primary` = the 10% accent, `--accent` = subtle hover tint; see `../mediums/web-ui/implementation.md`). Load fonts with `next/font` (self-hosted, no layout shift).
- **WordPress block theme:** `theme.json` → `settings.color.palette`, `typography.fontFamilies` + `fontSizes` (fluid), `spacing.spacingSizes`, `layout.contentSize/wideSize` (matches content/breakout widths).
- **Shopify (Horizon-style themes):** `config/settings_schema.json` colour schemes + typography settings; section/block settings expose only what merchants should change.

## 3. Components (map each prototype section)
| Prototype | Next.js | WordPress | Shopify |
|---|---|---|---|
| Section (e.g. H-02 hero) | `app/(site)/_sections/Hero.tsx` (Server Component; client island only for interactivity) | block pattern or custom block (`block.json`) | `sections/hero-split.liquid` + schema |
| Repeating item | component with typed props | inner blocks / query loop | theme blocks (`blocks/*.liquid`) |
| Images | `next/image` with `sizes`, `priority` on LCP | core image block / `wp_get_attachment_image` (srcset) | `image_url` + `image_tag` with widths |
| Motion | CSS first; `motion` for complex; lazy-load GSAP only if needed | CSS + small enqueued script, `prefers-reduced-motion` | CSS + section JS (custom element) |
| Video loop | `<video>` + poster, CDN/`public` with range support | media library + `<video>` | Shopify-hosted video (`video_tag`) |
Keep the **named-line grid** (`layout-library.md` §1) as a utility/layout component so sections can choose full / breakout / content / text widths.

## 4. Parity checks (prototype vs production)
1. Screenshots at the same widths: `capture.mjs shots <prototype> --out .design/port/proto` and `capture.mjs shots http://localhost:3000/<route> --out .design/port/prod`, then compare side by side (and visually diff if a tool is available).
2. `interaction-qa.mjs` on the production route: 0 FAIL.
3. Lighthouse / Core Web Vitals on a production build (`next build && next start`), not dev mode.
4. Content & SEO: metadata (`generateMetadata` / Yoast/RankMath / Shopify SEO fields), structured data, headings order.
5. Review the diff for hard-coded values that should be tokens.

## 5. Report
What was ported, what intentionally changed from the prototype and why, what's left. Use the final report format.
