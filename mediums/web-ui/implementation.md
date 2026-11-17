# Implementation (web UI)

How the design system becomes code on each platform. **Always inspect and follow the project's existing conventions first**; these are defaults for new work.

## 1. Color tokens: mapping 60/30/10 to code

### ⚠️ Naming trap (shadcn/ui) [Expert — verified against ui.shadcn.com/docs/theming]
In shadcn, `--primary` is for **high-emphasis actions and brand surfaces** (default Button, badges, selected states). `--accent` is for **hover, focus and active surfaces** (ghost buttons, menu highlights, hovered rows).

| 60/30/10 role | shadcn tokens |
|---|---|
| **60% dominant** | `--background`, `--popover` (and `--card` when cards sit flat on the page) |
| **30% secondary** | `--secondary`, `--muted`, `--card` (when cards contrast), `--foreground` (text/structure), `--border`, `--sidebar` |
| **10% accent** | **`--primary`**, `--sidebar-primary`, `--chart-1`; `--ring` only if the accent has ≥ 3:1 contrast against the background (light accents like yellow don't, so use a dark ring) |
| shadcn `--accent` | NOT the brand accent. Use a subtle tint derived from the 60/30 neutrals, for hover states. |

### 1a. Tailwind v4 + shadcn (CSS-first) [verified pattern from shadcn docs]
```css
/* app/globals.css */
:root {
  --background: oklch(0.99 0.005 95);   /* 60% warm off-white */
  --foreground: oklch(0.18 0.01 95);    /* 30% near-black text/structure */
  --secondary:  oklch(0.18 0.01 95);    /* 30% dark section bands */
  --secondary-foreground: oklch(0.99 0.005 95);
  --muted: oklch(0.95 0.008 95);
  --muted-foreground: oklch(0.45 0.01 95);
  --primary: oklch(0.86 0.17 92);       /* 10% yellow accent → CTAs */
  --primary-foreground: oklch(0.18 0.01 95);
  --accent: oklch(0.95 0.008 95);       /* shadcn hover tint, NOT brand accent */
  --accent-foreground: oklch(0.18 0.01 95);
  --border: oklch(0.90 0.008 95);
  --ring: oklch(0.18 0.01 95);         /* focus ring: dark. Yellow ring on this bg = 1.49:1, fails WCAG 1.4.11 (needs 3:1) */
  --radius: 0.75rem;
}
.dark { /* same token names, dark values */ }

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  /* …map every token… */
}
```
(Example values. Checked: foreground/background 18.26:1 · muted-foreground/background 7.26:1 · primary-foreground on primary 12.22:1 · yellow vs background only 1.49:1, so yellow works as a **fill with dark text**, never as text, ring or border on the light background. Always run contrast.py on the real values.)

### 1b. Tailwind v3
Define the same CSS variables, then reference them in `tailwind.config.{js,ts}` → `theme.extend.colors` (e.g. `primary: 'hsl(var(--primary))'` or the format the project already uses). Follow the project's existing convention.

### 1c. WordPress (theme.json) [Expert]
Define the palette in `settings.color.palette` (`slug`, `name`, `color`). Name the slugs by **role**, not hue (e.g. `base` = 60%, `contrast`/`surface` = 30%, `accent` = 10%), so a rebrand changes values, not markup. Inspect the existing theme's slugs first and keep them if they exist.

### 1d. Shopify [Expert]
Inspect `config/settings_schema.json` for the theme's existing color settings / color schemes and map 60/30/10 onto them. Don't hard-code hex values in section Liquid; expose them as settings so merchants can adjust.

## 2. Loading fonts [Expert]

### Next.js (App Router), Google Fonts → `next/font/google` (self-hosted at build, no layout shift)
```tsx
// app/layout.tsx
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${sans.variable} ${display.variable}`}><body>{children}</body></html>;
}
```
```css
/* globals.css (Tailwind v4) */
@theme inline {
  --font-sans: var(--font-jakarta);
  --font-display: var(--font-instrument);
}
```
Variable fonts load all weights from one file; non-variable fonts need explicit `weight`. Check the font's options before writing the import.

### Next.js, Fontshare or licensed fonts → `next/font/local`
Download the WOFF2 files into the project (e.g. `app/fonts/`), then:
```tsx
import localFont from "next/font/local";
const satoshi = localFont({ src: "./fonts/Satoshi-Variable.woff2", variable: "--font-satoshi", display: "swap" });
```
Keep the font's license file in the repo next to the font.

### WordPress (block theme)
Register families in `theme.json` → `settings.typography.fontFamilies`, self-hosting the files with `fontFace` (`src` like `file:./assets/fonts/<file>.woff2`). Name slugs by role (`body`, `display`), not by font name. Check the theme's existing `theme.json` version and structure first.

### Shopify
If the theme exposes `font_picker` settings, use the Shopify font library through them (merchant-editable). For a custom licensed font, add WOFF2 files to `assets/` and declare `@font-face` with `asset_url`. Confirm the license allows web embedding.

## 3. Type, spacing, radius & shadow tokens
Define them once and reference them everywhere:
```css
:root {
  --step-0: 1rem;  --step-1: 1.25rem; --step-2: 1.563rem; --step-3: 1.953rem;
  --step-4: 2.441rem; --step-5: 3.052rem; --step-6: clamp(3rem, 2rem + 4vw, 4.768rem);
  --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem; --space-4: 1rem;
  --space-6: 1.5rem;  --space-8: 2rem;   --space-12: 3rem;   --space-16: 4rem;
  --space-24: 6rem;   --space-32: 8rem;
  --radius-control: 0.5rem;  /* inputs, buttons */
  --radius-container: 1rem;  /* cards, panels   */
  --shadow-1: 0 1px 2px rgb(0 0 0 / .06), 0 1px 1px rgb(0 0 0 / .04);
  --shadow-2: 0 4px 12px rgb(0 0 0 / .08), 0 2px 4px rgb(0 0 0 / .05);
  --shadow-3: 0 16px 40px rgb(0 0 0 / .14), 0 4px 12px rgb(0 0 0 / .08);
}
```
(Type steps shown = ratio 1.25 in rem: 1.25ⁿ. Example values; adjust to the direction.)

## 4. Visual verification
- If a browser or screenshot tool is available (e.g. a Playwright MCP server or a browser extension), capture each page at **375px and 1440px**, review against the Step 5 checklist, and fix before handover.
- If no visual tool is available, say so plainly in the handover: "Not visually verified. Please check at mobile and desktop widths." Never claim a design "looks right" without seeing it.

## 5. DESIGN.md: decision record
At handover, **offer** to save a `DESIGN.md` in the project root (create it only with the user's OK). It keeps future sessions consistent and powers the anti-repeat rule:
```md
# Design decisions
- Direction: D2 Editorial Luxury (+ Swiss grid). Concept: "<one sentence>"
- Color 60/30/10: <name #hex> / <name #hex> / <name #hex>. Token file: app/globals.css
- Type: <display> + <text>, scale 1.25, weights 400/500/700. License: OFL
- Signature move: <…>
- Rules: one primary CTA per view; radius control 8px / container 16px; motion = smooth
- Placeholders to replace: <…>
```
