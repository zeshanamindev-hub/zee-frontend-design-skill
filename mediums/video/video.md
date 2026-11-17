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
- Setup commands, licenses and the open-source AI video models (Wan 2.2, Mochi 1 under Apache-2.0; LTX-2 community license; HunyuanVideo): `toolchain/asset-generation.md` §4.

### Choosing quickly
- Polished realistic clip with sound → **Veo 3.1**
- Best value / people moving / lip-sync → **Kling**
- Precise control, editing existing footage → **Runway**
- Must be legally safest for ads/clients → **Adobe Firefly**
- Product UI demo → **screen recording + motion graphics** (not AI generation: show the real product)
- Many variants from data → **Remotion** (license permitting) or **Motion Canvas / Revideo** (MIT)
- Must be open source / self-hosted AI generation → **Wan 2.2** (Apache-2.0) via ComfyUI or Diffusers on a GPU

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
