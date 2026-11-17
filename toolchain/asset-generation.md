# Asset generation toolchain: images, SVG, video, motion, graphics

What the skill can **produce directly inside Claude Code** (code-first, mostly open source), and what it **plans and hands to external tools**. Versions and licenses checked **Nov 17, 2026** (npm/PyPI metadata + official pages). Re-check before commercial use; AI tools change monthly.

## 0. Decision order (always)
1. **Real assets first:** the user's product screenshots, photography, logo SVG, brand illustrations. Real beats generated.
2. **Code-generated** (open source, reproducible, editable): SVG, HTML/CSS graphics → PNG, Motion Canvas/Remotion video, CSS/Lottie motion.
3. **AI-generated** only where it adds value (mood imagery, B-roll, textures, concepts), with **commercial rights confirmed** and no real people's likeness, logos or copyrighted characters.
4. Every asset passes the anti-slop check (no generic blobs, no rainbow gradients, no stock-cliché scenes).

---

## 1. SVG creation (Claude can do this directly)
| Need | Tool | License | How |
|---|---|---|---|
| Icons, illustrations, logos-in-progress, patterns, diagrams | **Hand-written SVG** (Claude writes the code) | n/a | Use a grid (24px icons, 2px strokes or a consistent style), `currentColor`, `viewBox`, no hard-coded sizes |
| Optimize SVG | **SVGO** (v4.1) | MIT | `npx svgo in.svg -o out.svg` (keep `viewBox`; check visual diff) |
| Hand-drawn/sketch style | **Rough.js** (v4.6) | MIT | Generate rough strokes for playful brands |
| HTML/JSX → SVG (OG images, cards) | **Satori** (v0.63) | MPL-2.0 | Used by `next/og` / `@vercel/og` |
| SVG → PNG (server/CLI) | **resvg** (`@resvg/resvg-js` v2.6) | MPL-2.0 | Fast, accurate rasterizing |
| Raster → vector (trace a logo/sketch) | **vtracer** (PyPI v0.6) | MIT | `pip install vtracer`; color tracing; clean up by hand |
| Raster → vector (B/W) | **Potrace** (npm `potrace` v2.1) | **GPL-2.0** | Fine for producing assets; GPL matters only if you ship it inside your software |
| Visual SVG editing | **Inkscape** (desktop) | GPL | `inkscape in.svg --export-type=png --export-filename=out.png` |
| Background generators | Haikei, fffuel, Pattern Monster, Hero Patterns (CC BY 4.0) | see `foundations/resources.md` | Tint to the palette |
| AI vector generation | **Recraft** (proprietary) | Plan terms | Vector output; check commercial rights |
**SVG rules:** one style per icon set (stroke width, corner radius, cap/join), optical sizing for small sizes, accessible (`role="img"` + `<title>` or `aria-hidden="true"` when decorative), animate with CSS/SMIL only when it communicates something.

## 2. Raster graphics & image processing (code-first)
| Need | Tool | License | Notes |
|---|---|---|---|
| Social posts, OG images, thumbnails, banners from HTML/CSS | **capture.mjs render** (Playwright v1.65) | Apache-2.0 | `node ${CLAUDE_SKILL_DIR}/scripts/capture.mjs render post.html out.png --size 1080x1350` |
| Next.js OG images | `next/og` (Satori) | MPL-2.0 | `app/opengraph-image.tsx` |
| Resize, convert (AVIF/WebP), crop, compress | **sharp** (v0.35) | Apache-2.0 | Batch-produce responsive image sets |
| Puppeteer alternative | **Puppeteer** (v25) | Apache-2.0 | Same idea as Playwright |
| DOM node → image in the browser | html-to-image (v1.11) | MIT | Client-side exports |

## 3. AI image generation
### Hosted (proprietary), Nov 2026 snapshot
ChatGPT Images / GPT Image (all-round, accurate text) · Google Nano Banana Pro / 2 (photoreal, consistency, edits) · Midjourney V7–V8 (art direction) · Ideogram (text in images) · Recraft V4 (vectors, brand sets) · FLUX.2 pro (API) · **Adobe Firefly** (commercially safe, licensed training data).
### Open weights (self-host; needs a capable GPU or a GPU cloud)
| Model | License (per checkpoint) | Commercial use |
|---|---|---|
| **FLUX.1 [schnell]** | Apache-2.0 | ✅ |
| **Qwen-Image** (2025 open line incl. Edit) | Apache-2.0 | ✅ (the 2026 Qwen-Image 2.0 line is reported API-only) |
| **Z-Image-Turbo** | Apache-2.0 | ✅ |
| FLUX.2 [klein] 4B | Apache-2.0 (per Aug 2026 reports; verify) | ✅ if confirmed |
| SDXL 1.0 | OpenRAIL++-M | ✅ with use restrictions |
| Stable Diffusion 3.5 | Stability Community License | Free under $1M revenue; paid above |
| FLUX.1/FLUX.2 [dev], FLUX.2 [klein] 9B | Non-commercial | ❌ without a BFL license |
| Ideogram 4 open weights | Non-commercial model agreement | ❌ |
**Runners:** ComfyUI (GPL-3.0, node workflows) · Hugging Face Diffusers (Apache-2.0, Python) · InvokeAI.
### Node-based AI platforms (chain models + edits on one canvas)
A node canvas connects generate → edit → upscale → extend → animate steps so results are **reproducible and consistent** (same references, seeds and prompts across a whole campaign). Options: **ComfyUI** (open source, GPL-3.0, local GPU or cloud) · **Figma Weave** (formerly Weavy; acquired by Figma ~Oct 2025; hosted; chains models such as Veo, Flux, Ideogram, Nano Banana, Seedream/Seedance with editing tools, branch/remix/refine). If a Figma MCP server with Weave tools is connected, it can be driven from Claude Code. Similar hosted canvases exist (e.g. FLORA, Runway's node tool). [Sources: techcrunch.com, techradar.com on the Weavy acquisition; Figma's own node-based-AI article couldn't be read by the fetch tool]
### Outpainting / generative expand (extend an image beyond its frame)
Use it to adapt **real** photos to new aspect ratios (16:9 hero → 9:16 story, 21:9 banner) without cropping the subject: Photoshop Generative Expand / Firefly (commercially safe training data), Canva/Figma AI features, or open models in ComfyUI (inpaint/outpaint workflows with a commercially licensed checkpoint). Rules: extend backgrounds only (never invent product details or people), match grain and light, and check the edge seams at 100%.
**Rule:** licenses attach to **each checkpoint**, not the model family. Verify on the model card before commercial use.

## 4. Video
### Code-driven video (Claude can build and render these in the project)
| Tool | License | Best for | Start |
|---|---|---|---|
| **Motion Canvas** (v3.17) | **MIT** (open source) | Animated explainers, kinetic type, UI animations, diagrams, in TypeScript with a visual editor | `npm init @motion-canvas@latest` (Node 16+); rendering per motioncanvas.io/docs/rendering |
| **Revideo** (v0.11) | MIT | Motion Canvas–based, oriented to programmatic/batch rendering | See revideo docs |
| **Remotion** (v4.0) | **Custom license**: free for individuals and companies up to 3 people; companies above need a paid Company License (Creators $25/seat/mo; Automators $0.01/render, $100/mo min) | React-based video: data-driven, templated, personalized videos | `npx create-video@latest` (Node 16+ / Bun 1.0.3+); `npx remotion skills add` adds Remotion's agent skills; rendering per remotion.dev/docs/render |
| **Manim Community** (v0.22) | **MIT** | Math/technical explainer animation, Python ≥ 3.11 | `pip install manim` |
| **FFmpeg** | LGPL/GPL | Cut, concat, scale, encode, captions burn-in, GIF/MP4 conversion | `make-gif.sh`; `ffmpeg -i in.mov -c:v libx264 -crf 23 -preset veryfast out.mp4` |
| **Blender** | GPL | 3D product renders/animation | Python scripting possible |
**Choose:** open source and team use → **Motion Canvas** (or Manim for technical). React codebase + data-driven batches + license OK → **Remotion**. Editing/encoding → **FFmpeg**.

### AI video generation
- **Hosted (Nov 2026):** Google Veo 3.1 (realism + native audio) · Kling 3.x (value, human motion, lip-sync) · Runway Gen-4.5 + Aleph (control, video-to-video) · Seedance 2.x · Luma Ray3.x · Adobe Firefly Video (commercially safe) · ⚠️ OpenAI **Sora 2 discontinued** (API shut Sept 24, 2026).
- **Open weights (self-host, GPU required):**
| Model | License | Commercial |
|---|---|---|
| **Wan 2.2** (Alibaba) | Apache-2.0; no rights claimed over outputs | ✅ |
| **Mochi 1** (Genmo) | Apache-2.0 | ✅ |
| CogVideoX-2B | Apache-2.0 (5B has its own license) | ✅ (2B) |
| LTX-2.x (Lightricks) | LTX-2 Community License: paid agreement at $10M+ annual revenue | ✅ under the threshold |
| HunyuanVideo 1.5 (Tencent) | Tencent community license | Check terms |
Runners: ComfyUI, Diffusers, or GPU clouds. Sources disagree on some licenses, so check the checkpoint's model card.

### Voice & sound (for videos)
ElevenLabs (hosted voice/dubbing; consent required for voice cloning) · licensed music libraries · FFmpeg for mixing and normalizing.

## 5. Motion & animation assets
| Need | Tool | License |
|---|---|---|
| UI motion in code | CSS · **Motion** (`motion` v14) | MIT |
| Timelines & scroll animation | **GSAP** (v3.15) | Standard "no-charge" license (not OSI open source; read gsap.com/standard-license) |
| Vector animation playback | **lottie-web** (v5.13) · **dotLottie web** (v0.83) | MIT |
| Interactive state-machine animation | Rive (editor proprietary; runtimes open) | Free plan + paid |
| Authoring Lottie | Lottie Creator, After Effects + LottieFiles plugin, Jitter, Cavalry | Proprietary (various free tiers) |
| GIF / MP4 loops | `make-gif.sh` (FFmpeg) | LGPL/GPL |

## 6. 3D
Spline (web 3D, proprietary) · Blender (GPL) · three.js (MIT) / React Three Fiber (MIT) for code · always ship a static poster fallback and lazy-load.

## 7. How a typical code-first production runs in Claude Code
1. **Plan** (concept → storyboard / layout) using `foundations/` and the medium file.
2. **Tokens:** reuse the project's color/type tokens so assets match the site.
3. **Build:** SVG/HTML for graphics, Motion Canvas or Remotion composition for video, Lottie/CSS for UI motion.
4. **Render:** `capture.mjs render` (PNG) · `render-video.mjs` (HTML timeline → MP4, bundled) · Motion Canvas/Remotion render (MP4) · `make-gif.sh` (GIF + web MP4; `--max-mb` size budget).
   Colours from real assets: `extract-colors.py`; palettes: `palette.py` (`--mono` for black-and-white brands).
5. **Optimize:** SVGO, sharp (AVIF/WebP), FFmpeg (CRF, size).
6. **Verify:** open/inspect the output (Read the PNG, check the video frames), check sizes and contrast, then run the anti-slop check.
7. **Deliver:** files + source (so the user can edit) + license notes.
