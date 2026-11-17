# High-fidelity visual sections: what goes inside the big moments

Every full page needs **≥ 1 hi-fi visual section** (layout contract, `layout-library.md` §0). A hi-fi section is one a visitor would screenshot, built from **real material**, and it does **narrative work**: it explains, proves or makes the visitor feel something. Removing it would hurt the page (L20 image test).
Not hi-fi: stock photo + gradient blob, icon grids, AI-generated fake dashboards, generic 3D shapes with no meaning.

## 0. Pick by what you have (asset-first)
Run `../../workflows/asset-intake.md` first. Then:
| You have… | Strongest hi-fi options |
|---|---|
| A real product UI (SaaS/app) | V1 product theatre · V9 interactive demo · V8 rendered UI video |
| Great photography (or can commission it) | V2 art-directed photo · V3 collage · V8 cinemagraph |
| Real data / numbers | V5 data-viz story |
| Strong copy, little imagery (B&W, law, consulting) | V6 typographic poster · V11 texture & material · V4 custom illustration |
| A physical product | V2 + V7 3D/turntable · F-03 annotated product |
| Locations / spatial info | V10 map |
| Nothing yet | V6 type poster or V4 illustration now + a shot list / asset request for the client (never fake it) |

## 1. The visual types
| ID | Type | How to build (open-source first) | Budget & a11y |
|---|---|---|---|
| **V1** | **Product theatre**: real UI recreated in HTML/CSS (or a crisp screenshot) on a branded stage: perspective tilt, layered panels, cursor, highlights; optionally scroll-linked | Rebuild key UI in HTML with **real or realistic data** (D14); stage = brand colour field or texture; depth with 2–3 layered panels; `transform: perspective()`; scroll-linked via CSS `animation-timeline: view()` with a static fallback; export stills with `scripts/capture.mjs render`. | LCP: ship a static first frame; no "generated UI frames" (AI images of fake UIs). [Source: DAE-UX steering] |
| **V2** | **Art-directed photography** | Real photos with one consistent treatment (grade, crop ratio, duotone, grain); focal points on thirds (L1); `object-position` per breakpoint; text via overlay methods (see `craft-details.md` §text-over-image). Write a **shot list** when the client must shoot. | Hero image AVIF ≤ ~200 KB, `fetchpriority="high"`, explicit size. |
| **V3** | **Collage / masked composition** | 3–5 images clipped by brand shapes (`clip-path`, SVG `mask`), overlapping type, cut-paper edges; grid-breaking offsets. | Each image needs meaningful alt or `alt=""` if decorative; check text contrast over overlaps. |
| **V4** | **Custom SVG illustration scene** | Hand-coded or drawn SVG with a 3–5 colour palette from the tokens, one stroke weight, one corner style; can animate parts (SMIL-free: CSS/Motion). Keep it on-brand (brand shape language). | Inline SVG with `<title>`; or `aria-hidden` if decorative. |
| **V5** | **Data-viz story** | Real data → SVG chart (hand-built, D3 or Observable Plot); annotate the insight in plain words; one highlight colour (D8); animate the draw once on enter. | Provide a data table or text summary; don't encode by colour alone (C12). |
| **V6** | **Typographic poster** | Huge display type (clamp to 8–15vw), variable-font axes, mixed weights/italics, text as image; optional kinetic type (split letters, scroll-linked weight). | Real text (not an image); `prefers-reduced-motion` stops kinetic effects. |
| **V7** | **3D object / scene** | three.js / React Three Fiber (MIT), Spline (hosted), or a pre-rendered Blender turntable as video/image sequence. | Lazy-load after idle or interaction; static poster fallback; never block LCP; the pixelean 2027 trend review lists "heavy 3D heroes" as a pattern to skip. |
| **V8** | **Video loop / cinemagraph / rendered UI video** | Real footage, or a deterministic HTML timeline rendered with `scripts/render-video.mjs` (camera moves, cursor, brand wipes). Cinemagraph = still photo + one moving region (see `../video/video.md` §cinemagraph). | `<video autoplay muted loop playsinline poster>`; ≤ 2–4 MB; WCAG 2.2.2: auto-playing motion > 5 s needs a visible pause control; `prefers-reduced-motion` → poster only. |
| **V9** | **Interactive demo / configurator** | A working mini version of the product: calculator, before/after, colour/material picker, live code playground. | Keyboard operable (A4); results announced (`aria-live`). |
| **V10** | **Map / spatial** | MapLibre GL (BSD-3) or a stylised static SVG map; branded style; pins with real data. | Provide a text list of locations. |
| **V11** | **Texture & material** | Grain (SVG `feTurbulence` or a tiny tiled PNG), halftone, paper, risograph dots, hairline grids; one texture family per site. Key for Monochrome (Direction D13) and Warm Organic. | Keep text on calm areas; texture ≤ 4–8% opacity behind text. |
| **V12** | **AI-generated imagery** (when licensed and honest) | Generate *illustrative* scenes, backgrounds, textures, extended crops (outpainting / generative expand to fit 21:9 or 9:16). Use node workflows for consistency (ComfyUI, GPL-3.0 local; Figma Weave, hosted, formerly Weavy). Feed brand references; keep one model + seed + style prompt per project. | Never present AI images as real people, real customers, real premises or real results; check the model's commercial licence (`../../toolchain/asset-generation.md` §3); label where your market requires disclosure. |

## 2. Composition rules for hi-fi sections
- One hi-fi anchor per viewport; supporting copy is short (≤ 2 lines + CTA).
- The visual must carry **brand-specific** information (their product, their place, their people, their data). If it could sit on a competitor's site, it fails (L20 brand test).
- Motion inside the section has a written reason in the motion ledger (`../../workflows/templates/motion-ledger.md`).
- Every hi-fi section has a **designed fallback** (reduced motion, no-JS, slow network, mobile).
- On mobile the hi-fi visual stays big (≥ 60% of the viewport height), not a thumbnail.
