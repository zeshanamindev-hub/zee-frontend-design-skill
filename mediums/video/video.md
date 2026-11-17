# Video: planning, generation, tools

Covers: website hero/background videos, product demos, explainers, social reels/shorts, ads, testimonials, launch trailers. The skill **plans and directs** video (concept, script, storyboard, shot list, prompts, edit plan, specs) and **recommends the right tools**. It can produce code-driven video (Remotion) or GIF/MP4 conversions locally. AI generation runs in the user's chosen tool account.

**AI video changes fast.** The tool list below is a **Nov 2026 snapshot**. Before recommending, run a quick WebSearch (`best AI video generator <current month year>`) to confirm current models, pricing and availability.

## 1. Discovery (add to the standard questions)
- Goal & placement: website hero · product demo · social (which platform) · ad · explainer · testimonial
- Length & aspect ratio (16:9, 9:16, 4:5, 1:1)
- Live footage, screen recording, motion graphics, AI-generated, or a mix?
- Voiceover / music / captions? Language(s)?
- Budget & tools the user already pays for
- Commercial-use requirements (ads, client work), which affect AI tool choice (licensing, training-data indemnity)

## 2. Planning workflow
1. **Concept** (one sentence) + the one action viewers should take.
2. **Script**: hook (first 1–3s for social) → problem → solution/product → proof → CTA. Write VO and on-screen text separately.
3. **Storyboard**: frame per scene: shot type, subject, motion, on-screen text, duration.
4. **Shot list**: scene · shot (wide/medium/close/screen capture/AI-generated/motion graphic) · camera movement · duration · source · notes.
5. **AI prompts** (for generated shots): subject + action + setting + camera (lens, movement) + lighting + style + color palette (60/30/10) + mood + duration. Keep the same character/style references across shots for consistency.
6. **Edit plan**: sequence, transitions, music beat points, caption style, brand end card.
7. **Export specs** per destination (§5).
Deliver it as a doc: concept · script · storyboard table · shot list · prompts · tool plan · specs.

## 3. Tools (Nov 2026 snapshot; re-verify)
### AI video generation
| Tool | Strength (per Nov 2026 reviews) | Notes |
|---|---|---|
| **Google Veo 3.1** (Gemini app, Flow, Gemini API/Vertex AI) | Widely rated best overall for realism with **native, synced audio** | Short clips per generation (~8s); via Google AI plans or API |
| **Kling 3.0** (Kuaishou) | Strong human motion, longer takes, lip-sync, strong value; native 4K reported | Kling 4.0 reported Oct 2026; verify current version |
| **Runway Gen-4.5** + Aleph (video editing) | Filmmaker control: camera moves, character consistency, video-to-video editing, team features | Credit-based plans, API |
| **Seedance 2.x** (ByteDance) | Rated strongly for commercial-style content | Available inside several platforms |
| **Luma Ray3.x** | Cinematic camera, HDR, prompt adherence | |
| **Adobe Firefly Video** | **Commercially safe** focus (licensed training data); Creative Cloud workflow | Best when legal review matters |
| **Higgsfield, MiniMax Hailuo, Wan** | Camera-control suites / value / open models | Check terms per use |
| ⚠️ **OpenAI Sora 2** | **Discontinued**: consumer app ended April 2026, API shut down Sept 24, 2026 | Don't recommend |

### Avatars, voice & localization
HeyGen, Synthesia (AI presenters, translation/lip-sync dubbing), ElevenLabs (voiceover, dubbing). Only use real people's likeness or voice with their permission.

### Editing & finishing
DaVinci Resolve (free version; pro color + Fusion), Adobe Premiere Pro, Final Cut Pro (Mac), CapCut (fast social editing, templates), Descript (edit by transcript, screen recording).

### Screen recording / product demos
Screen Studio (Mac, auto-zoom polished demos), Loom, Cap, OBS Studio (free).

### Code-driven video (Claude can build and render these in the project)
- **Motion Canvas** (MIT, open source; default for teams): explainers, kinetic type, UI animation in TypeScript.
- **Remotion** (React; v4.0.x): data-driven, templated, personalized videos. **Custom license:** free for individuals and companies of up to 3 people; larger companies need a paid Company License (verified at remotion.dev/license, Nov 2026).
- **Manim Community** (MIT): technical/math explainers. **FFmpeg**: editing, encoding, captions, GIFs.
- **`scripts/render-video.mjs`** (bundled, zero new tools: Playwright + FFmpeg): renders an HTML timeline frame by frame to H.264 MP4. Start from `scripts/templates/video-timeline.html` (masked headline reveal, brand-shaped wipe, camera dolly over a product UI, cursor path + click ripple, circular end-card reveal). Tested: 9 s, 1920×1080, 30 fps rendered in ~26 s. Best for product promos, UI walkthroughs, social cut-downs and app-store previews. The template is 16:9; for 9:16 make a copy laid out at 1080×1920 and render with `--size 1080x1920` (the script warns if the timeline is larger than the frame).
- Setup commands, licenses and the open-source AI video models (Wan 2.2, Mochi 1 under Apache-2.0; LTX-2 community license; HunyuanVideo): `toolchain/asset-generation.md` §4.

### Choosing quickly
- Polished realistic clip with sound → **Veo 3.1**
- Best value / people moving / lip-sync → **Kling**
- Precise control, editing existing footage → **Runway**
- Must be legally safest for ads/clients → **Adobe Firefly**
- Product UI demo → **screen recording + motion graphics** (not AI generation: show the real product)
- Many variants from data → **Remotion** (license permitting) or **Motion Canvas / Revideo** (MIT)
- Must be open source / self-hosted AI generation → **Wan 2.2** (Apache-2.0) via ComfyUI or Diffusers on a GPU

## 3b. The right video for the niche (plan before generating anything)
| Niche | Video that earns its place | Format | Make it with |
|---|---|---|---|
| SaaS / apps | 20–45 s product walkthrough: problem → product doing the job → outcome; captions; real UI | 16:9 site + 1:1/9:16 cut-downs | `render-video.mjs` timeline or screen recording + motion graphics |
| E-commerce | 6–15 s product loops (texture, use, scale), 360° turntables, UGC-style try-ons (real customers, with permission) | 4:5 feed, 9:16 stories, square PDP | real footage; Blender turntable; AI only for backgrounds/scenes, never to fake the product |
| Restaurants / hospitality / travel | cinemagraph hero (steam, pour, waves), 10–20 s mood clips, room/table walk-throughs | 16:9 hero loop + 9:16 | real footage; cinemagraph workflow below |
| Local services | 30–60 s "meet the team / how we work" vertical video; before/after reveals | 9:16 + 16:9 | phone footage + captions; FFmpeg |
| B2B / industrial | facility & process film, 60–90 s; animated explainer of the process | 16:9 | real footage + Motion Canvas diagrams |
| Education / nonprofits | stories of real people (consent), explainer animations, whiteboard-style lessons | 16:9 + 9:16 | interviews + whiteboard/explainer animation |
| Agencies / creators | 30–60 s showreel, cut to music, best work first | 16:9 + 9:16 | editing tool + FFmpeg |
| Health / finance / legal | calm explainer animation ("what happens at your first visit", "how the fee works") | 16:9 | Motion Canvas / illustrations; no stock actors pretending to be staff |
**Honesty rule:** AI video is for illustration, mood and concept. Never show AI people as real staff, customers or testimonials, and never fake the product doing something it can't.

## 3c. AI video prompting (Veo 3.1 structure; works as a checklist for other models)
Formula from Google's own guide: **[Cinematography] + [Subject] + [Action] + [Context] + [Style & Ambiance]**, then audio. [Source: Google Cloud blog, "Ultimate prompting guide for Veo 3.1"; Vertex AI video prompt guide]
- **Cinematography:** shot size (extreme close-up → wide), angle (low, eye-level, top-down), lens/focus (shallow depth of field, rack focus), camera movement (static, slow push-in, dolly, tracking, crane, handheld, POV, aerial).
- **Subject & action:** one clear subject, one clear action per clip; describe physical motion concretely ("steam curls slowly from the cup").
- **Context:** place, time of day, weather, props.
- **Style & ambiance:** lighting (golden hour, soft window light, neon), colour palette (use the brand's), film look, mood.
- **Audio** (Veo 3.x generates sound): separate sentences for dialogue, sound effects, ambience.
- **Negatives:** list unwanted things as nouns ("text overlays, extra fingers") instead of "don't show…" (Google's guidance).
- **Iterate one variable at a time** (lock the shot, then add a camera move). Use first/last-frame or image-to-video to keep brand consistency. Keep a prompt log (prompt, seed, model, result) in `.design/video/prompts.md`.
Example (brand: specialty café): *"Slow push-in, close-up at eye level, shallow depth of field. A barista pours steamed milk into a ceramic cup, forming a tulip pattern. Morning light through a window in a small Lahore café, wooden counter. Warm, calm, natural colour palette of cream, walnut brown and terracotta. Audio: soft café ambience, the gentle hiss of the steam wand. Negatives: text, logos, extra hands."*
Model limits change often (clip length, aspect ratios, audio); check the model's current docs before promising a format.

## 3d. Cinemagraphs (still photo + one moving region)
Use: hero backgrounds for hospitality, food, travel, fashion: motion that adds mood without distraction.
1. **Shoot** on a tripod (absolutely locked camera), 5–15 s, constant light, manual exposure/focus; choose one repeating motion (steam, water, hair, flame, curtains, traffic).
2. **Pick the loop:** find a segment where the end frame matches the start (or plan a crossfade/"ping-pong" loop).
3. **Freeze everything else:** take one still frame as the base layer; mask the moving region (Photoshop timeline, After Effects, DaVinci Resolve Fusion, or Flixel-type tools; with FFmpeg you can overlay the cropped moving region on a still: `ffmpeg -loop 1 -i still.png -i clip.mp4 -filter_complex "[1:v]crop=W:H:X:Y[m];[0:v][m]overlay=X:Y:shortest=1" -c:v libx264 -pix_fmt yuv420p out.mp4`; tested Nov 2026).
4. **Loop seamlessly:** crossfade the last 0.5–1 s into the first, or play forward then reverse.
5. **Export for web:** MP4 (H.264) + optional WebM/AV1, 3–8 s, muted, `loop playsinline autoplay` + poster (the still frame); GIF only where video can't play (email): `make-gif.sh clip.mp4 out.gif 800 12 0 4 --max-mb 2`.
6. **Accessibility:** loops > 5 s need a pause control (WCAG 2.2.2); `prefers-reduced-motion` shows the still.
[Expert: standard cinemagraph technique; Figma's cinemagraph guide couldn't be read by the fetch tool]

## 3e. Animated video & whiteboard animation (explainers)
**Process for any animated video:** goal & audience → script (≈ 130–150 spoken words per minute; 60–90 s for explainers) → storyboard (one frame per beat, with VO line) → style frames (2–3 key frames in the brand style) → animatic (storyboard timed to the VO) → animation → sound (VO, music, SFX) → captions → export per channel.
**Whiteboard / hand-drawn style:** a hand (or invisible pen) draws simple line illustrations in sync with the voice-over; best for processes, abstract services, education, onboarding. Rules: one idea per drawing, draw on the beat of the VO, keep the board uncluttered (erase/pan to a new area per scene), brand colour only for emphasis. Build it in code with SVG **stroke-dashoffset** line-drawing animations (Motion Canvas, or CSS/SVG rendered with `render-video.mjs`), or with dedicated whiteboard tools (e.g. VideoScribe, Doodly; check current licences).
**Tweening** (in-betweens between keyframes): see `../motion-graphics/motion-graphics.md` §3b.

## 4. Website video best practices
- Hero/background video: muted, loop, `playsinline`, **poster image**, short (6–15s), compressed (H.264 MP4 + WebM/AV1), lazy-load if below the fold; pause button (WCAG 2.2.2 for motion over 5s); static poster for `prefers-reduced-motion` and slow connections.
- Text over video needs a scrim; contrast must hold on every frame.
- Product demo videos: captions, chapter markers, transcript (SEO + accessibility); `VideoObject` schema for important videos.
- Host big videos on a video CDN (Mux, Cloudflare Stream, Vimeo, YouTube), not as large files in the repo.

## 5. Export specs (common; confirm current platform specs before publishing)
| Destination | Aspect | Resolution | Notes |
|---|---|---|---|
| Website hero | 16:9 (desktop) + 9:16 or 4:5 crop (mobile) | 1920×1080 / 1080×1920 | Small file, no audio |
| YouTube | 16:9 | 1920×1080 or 3840×2160 | Thumbnail 1280×720 |
| Shorts / Reels / TikTok | 9:16 | 1080×1920 | Keep text inside safe areas (avoid top/bottom UI zones) |
| Instagram / LinkedIn feed | 4:5 or 1:1 | 1080×1350 / 1080×1080 | Captions burned in (many watch muted) |
| Email | GIF (see motion-graphics.md §6) or a linked thumbnail | ≤ 600px wide | |

## 6. Video quality checklist
- [ ] Hook in the first 1–3 seconds (social)
- [ ] One message; CTA at the end (and early for ads)
- [ ] Brand colors/type consistent; end card with logo + CTA
- [ ] Captions; readable on a phone
- [ ] Audio levels consistent; music licensed
- [ ] AI-generated content: permitted for commercial use in that tool's terms; no real people's likeness without consent; disclose where platforms require it
- [ ] Exported in the right specs; file size sensible
