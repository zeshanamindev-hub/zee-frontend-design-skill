# Workflow: asset intake (harvest real assets first, then ask the user to upload)

Real assets lift a design more than any trick. In the v0.3 field run, harvesting the client's real images was the single biggest quality improvement. Run this **before** concept work and **before** generating anything.

## Step 1. Harvest what already exists (no questions yet)
Look in this order and list what you find in `.design/assets/inventory.md` (template: `templates/asset-inventory.md`):
1. **The project**: `public/`, `static/`, `assets/`, `src/assets/`, `images/`, theme `assets/` (Shopify), `wp-content/uploads` exports, `/captures/` or `.design/` folders from earlier runs, favicon/app icons, existing CSS variables or `theme.json` colours.
2. **The live site** (redesigns): with `node scripts/capture.mjs shots <url> --full --sections` and, if browser tools are connected, list `<img>` sources, `og:image`, logo SVGs, video files, fonts in use (Network panel or `document.fonts`).
3. **Social profiles & listings** (only public pages the user points to or the site links): Instagram/LinkedIn/Facebook cover images, Google Business photos, YouTube videos, app-store screenshots.
4. **Design files**: a Figma link → if a Figma MCP server is connected, read frames, variables and exportable images; otherwise ask the user to export.
5. **Brand documents**: brand guidelines PDF, pitch decks, packaging, signage photos.
Record for each asset: source, type, resolution, licence/permission status, quality (A usable / B needs work / C replace).

## Step 2. Ask the user to upload (then pause)
After the harvest, send **one** message that tells the user exactly what is missing and how to provide it. Then **wait** (use AskUserQuestion when available so the session pauses; otherwise end the turn with the request).

Message template:
> I found **N** usable assets (logo SVG, 6 product photos, brand colours from your CSS). To design this properly I still need the items below. Upload what you have now:
> **How:** drag files into this chat **or** copy them into `.design/assets/inbox/` in the project, then reply "done".
> 1. **Logo**: SVG preferred (or PNG ≥ 1000px, transparent background)
> 2. **Brand guidelines**: colours, fonts, do/don't (PDF/Figma link)
> 3. **Photography**: product / team / place / work. Original files, not screenshots (≥ 2000px wide for full-bleed)
> 4. **Product UI**: screenshots or a demo login (SaaS/apps)
> 5. **Video**: raw clips or existing brand films
> 6. **Proof**: testimonials (with permission), review links, case-study numbers, certifications, client logos you may show
> 7. **Fonts**: licensed font files, if the brand uses commercial fonts
> Don't have some of these? Say "skip". I'll design around them with type-led or illustration-led sections and give you a shot list.

AskUserQuestion version (when available): one question "How do you want to provide assets?" with options: *Upload now (I'll wait)* · *They're in the project folder* · *Skip: design with placeholders + give me a shot list* · *Use AI-generated imagery where licensed*.

## Step 3. Process the uploads
1. Move files from `inbox/` to `.design/assets/{logo,photo,ui,video,docs,fonts}/` with descriptive names (`hero-kitchen-wide.jpg`).
2. **Colours from assets:** `python3 scripts/extract-colors.py logo.png [photos…] --ignore-bg`. If it reports MONOCHROME → `python3 scripts/palette.py <hex> --mono`.
3. **Check quality:** resolution vs. intended use (full-bleed ≥ 2000px; retina ≥ 2× display size), compression artefacts, faces/rights (model releases for people in ads), logo formats.
4. **Optimise for web:** AVIF/WebP + fallback, `srcset` widths (640/1024/1600/2400), SVG cleaned (SVGO). Never ship the 8 MB original.
5. **Update the inventory**: status per asset; what each will be used for (which section, which layout ID).

## Step 4. Let assets drive the layout (asset-driven decisions)
- Strong photography → full-bleed hero (H-01) and collage (H-06/V3).
- Real product UI → product theatre (V1), feature tabs with live preview (F-02).
- Real numbers → proof strip (P-04) and data-viz (V5).
- Weak or no imagery → type-led hero (H-03), illustration (V4), texture (V11), and a **shot list** for the client.
- Logo is B&W → Monochrome system direction (D13) is a candidate; don't invent brand colours without asking.
State in the concept which sections depend on which assets, and what the fallback is if an asset doesn't arrive.

## Rules
- Never present AI-generated or stock images as the client's real people, premises, products or results.
- Respect licences: a font file or photo the client "found online" isn't automatically licensed; ask.
- Keep originals untouched; work on copies.
