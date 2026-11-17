# Motion graphics: planning, principles, tools, export

Covers: UI motion systems, animated logos, kinetic typography, explainer animations, social motion posts, Lottie/Rive animations for web/apps, animated GIFs. Uses all `foundations/` (60/30/10, type, art direction, design laws & physics, anti-slop) plus this file. Production tools and licenses: `toolchain/asset-generation.md`. Recording interactions: `toolchain/browser-tools.md`. Tool facts checked **Nov 2026**; verify pricing/features before recommending a purchase.

## 1. Discovery (add to the standard questions)
- What is it for? (website hero/UI, product demo, social post/reel, ad, explainer, logo sting, presentation)
- Where will it play? (web/app → Lottie/Rive/CSS; social → MP4 9:16 / 4:5 / 1:1; email → GIF; presentation → MP4)
- Length, aspect ratio, sound (music/VO), captions needed?
- Brand assets available (logo SVG, fonts, colors, existing motion language)?
- Interactive (responds to hover/scroll/state) or linear playback?

## 2. Planning workflow
1. **Concept**: one sentence: what should the viewer understand or feel? (Same concept rule as art-directions.md.)
2. **Motion language**: pick one personality to match the art direction: *precise* (Swiss/Tech: linear-ish, short, snappy), *smooth* (Calm Product/Editorial: ease-in-out, gentle), *springy* (Playful/Neo-brutal: overshoot, bounce), *cinematic* (Dark Cinematic: slow, dramatic easing, light).
3. **Script / beat sheet**: list beats with timing (e.g. 0–1.5s logo reveal; 1.5–4s problem; 4–8s product moment; 8–10s CTA).
4. **Storyboard**: one frame per beat: composition, text on screen, transition to the next beat. Use the 60/30/10 roles per frame.
5. **Styleframes**: 2–3 fully designed key frames for approval *before animating*.
6. **Animatic**: rough timing pass (blocks + text) to approve pacing.
7. **Animate → polish → export** per destination (§6).
Deliver the plan as a short doc: concept · motion language · beat sheet with timings · storyboard frames · tool choice · export specs.

## 3. Animation principles (applied to UI and motion graphics)
Use the classic Disney principles where they help clarity: **timing** · **easing (slow in / slow out)** · **anticipation** (small wind-up before a big move) · **follow-through & overlapping action** (elements settle at different times) · **staging** (one thing moves at a time; direct the eye) · **arcs** (natural paths) · **squash & stretch** (playful brands only) · **secondary action** · **exaggeration** (sparingly) · **appeal**.
UI-specific:
- Motion explains **where things came from and went**: spatial continuity.
- Durations: micro 100–200ms, components 200–300ms, transitions 300–500ms; marketing motion can be slower, but keep text on screen long enough to read (rule of thumb: ~3 words per second, plus 1s).
- Stagger related items 30–80ms; one hero motion at a time.
- **Reduced motion** version for anything on the web; no flashing > 3 times/sec (WCAG 2.3.1).
- Kinetic type: legibility first. Animate in by word or line, hold, then exit; avoid spinning or warping body text.

## 3b. Tweening, keyframes and easing (how in-betweens are made)
- **Keyframes** define states at moments in time (position, scale, opacity, colour, path); **tweening** generates the frames in between. Types: **motion tween** (position/scale/rotation), **property tween** (opacity, colour, blur), **shape/path tween** (morphing one vector into another; needs compatible point counts: use Flubber or GSAP MorphSVG, or design both shapes with the same points), **classic/frame-by-frame** for organic hand-drawn moments.
- **Easing decides the feel:** `ease-out` (fast → slow) for things entering; `ease-in` (slow → fast) for things leaving; `ease-in-out` for moves within the screen; **linear** only for continuous loops (marquees, spinners) and scroll-linked motion; **spring** physics for direct manipulation and playful brands. Starter curves: out-expo `cubic-bezier(0.16,1,0.3,1)`, in-out-cubic `cubic-bezier(0.65,0,0.35,1)`, out-back `cubic-bezier(0.34,1.56,0.64,1)` (overshoot, use sparingly).
- **Code tweening:** CSS transitions/`@keyframes`, the Web Animations API (`element.animate()`), Motion (`motion` package), GSAP timelines; all are seekable, so `scripts/render-video.mjs` can render them to video (WAAPI/CSS automatically; GSAP via `window.__render = t => gsap.globalTimeline.seek(t)`).
- **Deterministic timelines** (for video): write motion as a pure function of time (`window.__render(t)`, see `scripts/templates/video-timeline.html`), so every frame renders identically and you can scrub, preview and re-render.
- **Common mistakes:** everything on the same easing and duration (robotic); linear easing on UI moves (mechanical); tweening layout properties (`top`, `width`) instead of `transform`/`opacity` (jank); morphing shapes with mismatched points (blobby artefacts).

## 4. Tools (Nov 2026 snapshot)
| Tool | Best for | Output | Notes |
|---|---|---|---|
| **Adobe After Effects** | Industry standard: motion graphics, kinetic type, compositing | MP4/MOV; Lottie via Bodymovin or the LottieFiles plugin | Subscription; steep learning curve |
| **Rive** | Interactive, stateful animation for apps/web (state machines, hover/scroll/input) | `.riv` + runtimes (web, iOS, Android, Flutter, React) | Free plan + paid tiers; not Lottie |
| **Lottie Creator (LottieFiles)** | Lottie/dotLottie animations in the browser without After Effects | Lottie JSON / dotLottie, GIF, MP4 | Free tier has limited exports |
| **Jitter** | Fast, simple web-based motion design (UI animations, social motion) | MP4, GIF, Lottie export | Good for designers coming from Figma |
| **Figma (prototype animations / plugins)** | Prototype transitions; LottieFiles plugin | Prototypes, Lottie via plugin | Quick UI motion specs |
| **Cavalry** | Procedural, data-driven 2D motion at scale | MP4, GIF, Lottie | Free for individuals with all features since Apr 2026 (per LottieFiles, Jul 2026) |
| **Spline** | Interactive 3D for web | Web embed, video, images | Watch performance; static fallback |
| **DaVinci Resolve (Fusion)** | Editing + node-based motion/VFX | Video | Free version available |
| **Maxon Autograph** | Layer-based motion & compositing | Video | Reported as newly free in 2026; verify |
| **Blender** | 3D motion, product renders | Video/images | Free, open source |
| **Code: CSS / Motion / GSAP** | Production UI motion on websites | Live code | Motion (npm `motion`) and GSAP (Standard no-charge license) |
| **Code: Motion Canvas** | Open-source (MIT) code-driven animation & explainers in TypeScript, with editor | MP4 / image sequence | `npm init @motion-canvas@latest` |
| **Code: Remotion** | Programmatic/data-driven videos with React | MP4 | Free for individuals and companies up to 3 people; paid Company License above (remotion.dev/license) |
| **Code: Manim** | Technical/math animation (Python) | MP4 | MIT |
| **AI motion** | Quick explorations (Runway, Kling and similar via video.md) | Video | Use for ideation/B-roll; brand-critical motion stays hand-crafted |

**How to choose:**
- Lives in a web/app UI and reacts to the user → **Rive** (or code).
- Lives in a web/app UI as a linear icon/illustration animation → **Lottie/dotLottie** (Lottie Creator, After Effects + plugin, Jitter export).
- Social/ads/explainer video → **After Effects**, **Jitter**, **Cavalry**, or **Remotion** for templated/data-driven batches.
- Website interactions → **CSS/Motion/GSAP** (see `mediums/web-ui/micro-interactions.md`).

## 5. Formats on the web
| Format | Use | Notes |
|---|---|---|
| CSS / JS animation | UI states, transitions | Lightest; fully accessible control |
| Lottie / dotLottie | Vector illustrations, icons, loaders | dotLottie is compressed; use `@lottiefiles/dotlottie-react` / web component; lazy-load |
| Rive (.riv) | Interactive animations with state | Rive runtime (`@rive-app/react-canvas` etc.) |
| MP4/WebM `<video muted loop playsinline>` | Rich motion, product demos | Poster image, `preload="none"` or lazy-load below the fold |
| Animated AVIF/WebP | Short loops without video controls | Lighter than GIF |
| GIF | Email, docs, READMEs | Heaviest; keep short and small (§6) |

## 6. GIF creation workflow
1. Record or export the clip (screen: Screen Studio, CleanShot X, Kap, ScreenToGif; motion tools export MP4).
2. Trim to 2–6s and design a seamless loop (end frame = start frame).
3. Convert: `bash ${CLAUDE_SKILL_DIR}/scripts/make-gif.sh input.mp4 output.gif 800 12` (two-pass ffmpeg palette; also writes a much smaller `.web.mp4`, around 10× smaller in testing).
4. Check size: aim for under ~2–3 MB for email/docs; reduce width, fps or duration if larger. `gifsicle -O3 --lossy=80` can squeeze further if installed.
5. Add alt text where the GIF is embedded; avoid flashing.
- **Size budget:** `bash scripts/make-gif.sh in.mp4 out.gif 800 12 0 6 --max-mb 3` steps down fps → colours → width until the GIF fits (exit 3 if it can't; then shorten/crop or ship the MP4). Tested: 2.47 MB → 1.16 MB in 3 steps.

## 7. Motion-graphics slop markers → alternatives
| Slop | Instead |
|---|---|
| Everything bounces / spins in | One motion language, applied consistently |
| Random template transitions (glitch, zoom-blur) on everything | Transitions that follow the concept (a wipe in the brand's shape, a match cut) |
| Text flying too fast to read | ~3 words/sec + 1s hold |
| Generic stock 3D blobs | Product, concept-specific visuals |
| No safe areas on social | Respect platform UI overlays (captions, buttons) |
| Music-driven cuts with no message | Beat sheet driven by the message, music supports it |

## 8. Export checklist
- [ ] Correct aspect ratio and resolution for each destination
- [ ] Brand fonts outlined/embedded; colors match the 60/30/10 tokens
- [ ] Captions for any speech; key text on screen long enough to read
- [ ] Loop seamless (if looping); file size within budget
- [ ] Reduced-motion fallback for web; no flashing
- [ ] Source files + export settings saved for future edits
