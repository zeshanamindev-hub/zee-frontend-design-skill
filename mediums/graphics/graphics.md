# Graphics: social, marketing, brand & web graphics

Covers: social posts & carousels, ad creatives, banners, OG/share images, thumbnails, email headers, infographics, icons/illustration systems, brand boards. Uses all `foundations/` (60/30/10, typography, art directions, anti-slop). The skill can build graphics as HTML/SVG (and render them to PNG via a headless browser if one is available), write prompts for AI image tools, or produce specs for the user's design tool (Figma, Canva).

## 1. Discovery (add to the standard questions)
- Platform(s) and format(s) · goal (awareness, click, save/share, sign-up) · single image or series/carousel
- Brand assets (logo SVG, fonts, colors, photography) · copy (headline, CTA)
- Production tool: HTML/SVG generated here · Figma · Canva · AI image tool · combination

## 2. Planning workflow
1. **Message hierarchy per graphic:** one headline (≤ ~8 words on social), one supporting line, one CTA/brand mark.
2. **Template system** for series: grid, type scale, color roles, logo position, page counter, swipe cue. The source carousels show the pattern: cover → value slides (numbered) → CTA/save slide.
3. **Layout per format:** design the master at one ratio, then **recompose** (don't just crop) for others.
4. **Imagery decision:** real photo · product render · illustration · type-only · AI-generated (see §4).
5. **Build → review** (squint test, phone-size test, contrast, brand check) → export.

## 3. Design rules for graphics
- **Thumb-stop test:** at phone size in a feed, is the headline readable and the focal point obvious within ~1 second?
- **Type:** large and few words; heavy weights for headlines; min ~24px equivalent at 1080px width for secondary text.
- **60/30/10** still applies: dominant field, supporting, accent for the key word/CTA.
- **Safe zones:** keep text away from edges (≥ ~5–8% margin) and away from platform UI overlays on stories/reels.
- **Series consistency:** same grid and type across slides; change one variable per slide (number, image, accent position).
- **Carousel cover:** a bold promise or number ("9 principles of design"); last slide = save/share/CTA.
- **Text in images & accessibility:** add alt text / captions when posting; keep text contrast ≥ 4.5:1.
- Use the anti-slop rules: no rainbow gradients, no random 3D blobs, no generic stock illustration.

## 4. AI image generation (Nov 2026 snapshot; re-verify before recommending)
| Tool | Reviewers rate it best for |
|---|---|
| **ChatGPT Images / GPT Image** (OpenAI) | All-round, accurate text, conversational edits |
| **Nano Banana Pro / Nano Banana 2** (Google Gemini image models) | Photorealism, character consistency, fast reference-led edits |
| **Midjourney** (V7–V8) | Artistic, editorial, art-direction quality |
| **Ideogram** (3.x/4) | **Readable text inside images**: posters, ads, social graphics |
| **Recraft** (V4) | **Vector output**, brand-consistent sets, icons/logos |
| **FLUX.2** (Black Forest Labs) | Photorealism, developer/API and open-weights workflows |
| **Adobe Firefly** | **Commercially safe** (licensed training data), Photoshop integration |
Rules: check commercial-use terms for the plan used; never generate real people, logos or copyrighted characters you don't have rights to; keep a consistent style reference across a series; final typography is usually better set in real fonts on top of the image than generated.

**Prompt structure:** subject · composition/camera · setting · lighting · style/medium · color palette (name the 60/30/10 hex roles) · mood · aspect ratio · what to avoid.

## 5. Common sizes (verify current platform specs before publishing)
| Use | Size (px) |
|---|---|
| Open Graph / link share | 1200×630 |
| Instagram feed | 1080×1350 (4:5) · 1080×1080 (1:1) |
| Stories / Reels / TikTok cover | 1080×1920 (9:16) |
| LinkedIn post image | 1200×627 or 1080×1350 |
| X/Twitter post image | 1600×900 (16:9) |
| YouTube thumbnail | 1280×720 |
| Facebook cover (desktop display) | ~820×312 (design safe area for mobile crop) |
| Email header | 600–700 wide |
| Favicon set | SVG + 32×32 PNG + 180×180 apple-touch-icon + 512×512 (manifest) |

## 6. Building graphics with code (when no design tool is used)
- Build each graphic as an HTML page (exact pixel size, real web fonts, CSS tokens) or SVG, then render it: `node ${CLAUDE_SKILL_DIR}/scripts/capture.mjs render post.html post.png --size 1080x1350` (2× by default for crispness). Open the PNG to check it before delivering.
- Optimize: SVGO for SVG, sharp for AVIF/WebP. Full tool list with licenses (SVG, open-weight image models such as FLUX.1 [schnell] / Qwen-Image under Apache-2.0): `toolchain/asset-generation.md`.
- For OG images in Next.js, use the `opengraph-image` route convention (`next/og` ImageResponse).
- Export: PNG for graphics with text, JPG/WebP/AVIF for photos, SVG for icons/illustrations.

## 7. Graphics checklist
- [ ] One message, readable at phone size
- [ ] Brand colors in 60/30/10 roles; fonts licensed
- [ ] Safe zones respected; consistent template across the series
- [ ] Real claims only; placeholders marked
- [ ] Correct sizes per platform; alt text/caption prepared
- [ ] AI-generated assets: commercial rights confirmed
