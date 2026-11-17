# WordPress standards: themes, blocks, plugins (WordPress 7.1.x, Nov 2026)

Current stable: **7.1.4** (Oct 28, 2026). WordPress moved to **three major releases per year** in 2026 (7.0 in May, 7.1 in August). Check the site's version and the theme/plugin's "Requires at least" before using new APIs. Official sources: developer.wordpress.org, make.wordpress.org/core (dev notes, field guides).

## 1. Recent changes that affect design work
- **7.1:** block themes can set **custom mobile/tablet breakpoints** in `theme.json` via the top-level `settings.viewport` (defaults: 480px mobile, 782px tablet) · **responsive block styles** (tablet/mobile overrides for typography, color, spacing, layout…) · **pseudo-state styling** (`:hover`, `:focus`, `:focus-visible`, `:active`) in `theme.json` and the editor · text-shadow support · the post editor is **always iframed** (editor styles must load via `add_editor_style`/`block.json` and work inside the iframe) · public **SVG Icon API** · Abilities API updates.
- **7.0:** WP AI Client + Connectors API (core AI infrastructure) · client-side Abilities API · Font Library with a dedicated fonts page · Interactivity API changes (`watch()`, server-side `state.url`; `state.navigation` deprecated) · pattern editing / overrides improvements · viewport-based block visibility.
Verify details in the 7.0/7.1 Field Guides before relying on any of them.

## 2. Block theme standards (preferred for new themes)
- Structure: `style.css` (header), `theme.json`, `templates/*.html`, `parts/*.html`, `patterns/*.php`, `styles/*.json` (style variations), `functions.php` (minimal), `assets/`.
- **theme.json is the design system:** color palette (role-named slugs: base/contrast/accent → the 60/30/10 roles), duotones, gradients, typography (`fontFamilies` with self-hosted `fontFace`, fluid type sizes), spacing scale (`spacingSizes`), layout (`contentSize`, `wideSize`), shadows, custom CSS properties, per-block styles, element styles (links, buttons, headings), pseudo-states (7.1), viewport breakpoints (7.1).
- Use **patterns** for sections (each designed section = a pattern with real content placeholders); lock or `contentOnly` where clients shouldn't break layout.
- Build responsive behavior with block supports and the 7.1 responsive styles first; custom CSS only when needed.
- Keep `functions.php` lean: enqueue, theme supports, pattern categories, block style registrations.

## 3. Custom blocks
- `block.json` (apiVersion 3), `@wordpress/scripts` (or the current recommended build tooling) for builds; `render.php` for dynamic blocks.
- Use the **Interactivity API** for front-end interactivity instead of ad-hoc jQuery.
- Support `supports` (color, spacing, typography) so blocks inherit theme.json tokens.
- Editor styles must work in the iframed editor.

## 4. Security & code standards (themes and plugins)
- **Escape late:** `esc_html()`, `esc_attr()`, `esc_url()`, `wp_kses_post()` on output.
- **Sanitize early:** `sanitize_text_field()`, `absint()`, etc. on input.
- **Nonces** (`wp_nonce_field`, `check_admin_referer`/`wp_verify_nonce`) + **capability checks** (`current_user_can`) for every state-changing action.
- `$wpdb->prepare()` for any custom SQL; prefer WP APIs (WP_Query, options, meta).
- Enqueue assets with `wp_enqueue_style/script` (versioned, dependencies declared, `strategy` defer/async where suitable); never hard-code `<script>` in templates.
- Prefix functions/classes/options (or namespaces); internationalize strings (`__()`, `esc_html__()`, text domain).
- Follow the **WordPress Coding Standards** (PHPCS + WPCS); test with **Theme Check** / **Plugin Check** before submission.
- Never modify core; use hooks and filters.

## 5. Performance & SEO
- Self-host fonts through theme.json/Font Library (no blocking third-party font CSS); limit weights.
- Images: registered sizes, `srcset` (core), lazy-load (core), AVIF/WebP where the host supports it; hero image not lazy-loaded (`fetchpriority="high"`).
- Avoid plugin bloat; audit what each plugin loads on the front end; use caching (host/page cache) + a CDN.
- SEO: permalinks `/%postname%/`, an SEO plugin (Yoast / Rank Math / SEOPress) or equivalent for titles/meta/schema/sitemaps; heading hierarchy in templates and patterns; breadcrumbs (core Breadcrumb block filters in 7.0).

## 6. Classic & hybrid themes
Respect the existing architecture (template hierarchy, `functions.php`, customizer). Add `theme.json` incrementally for tokens if appropriate, and don't convert to a block theme without approval.

## 7. Quality gates
PHPCS (WPCS) · Theme Check / Plugin Check · test on the minimum supported WP and PHP versions · accessibility (theme review accessibility-ready guidelines if targeting the directory) · Lighthouse · front end + editor (iframe) visual check at the theme's breakpoints.
