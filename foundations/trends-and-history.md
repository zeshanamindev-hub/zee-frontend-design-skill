# Trends & design history

**Rule:** trends are tools, not defaults. Use **at most one** as a page's signature, only when it fits the brand, audience and content, and never at the cost of readability. *"Prioritize readability, accessibility and task clarity before adopting decorative trends."* [Source: PDF]

## 0. Refresh trends every time (runtime rule)
This file is a **dated snapshot (Nov 2026)**. Before designing any page, run Track 4 of `workflows/research-pipeline.md`: search current-year trends, Awwwards Sites of the Day this month, and the industry. Record each trend with date + source and a use / adapt / skip decision.

### Late-2026 signals (snapshot from Nov 2026 research; re-verify)
- **Intention and restraint** over flashy visuals; a return to predictable patterns users trust.
- **Predictive / personalized UX**, kept transparent and reversible: users can override suggestions and edit pre-filled fields.
- **Cognitive-inclusive and accessible design** as a baseline, not an add-on.
- **Conversational and agent-ready interfaces**, plus designing for AI search (clear, crawlable, helpful content).
- **Tactile depth:** subtle textures, layered depth, materiality after the flat era.
- **Expressive systems:** Apple Liquid Glass and Google Material 3 Expressive (2025) continue to influence UI.
- **Conversion-focused design**: designers are judged on outcomes, not just visuals.

## 1. Current trend toolbox [Source: 3 trend carousels, 2026–2027 predictions]

| Trend | What it is | Use when | Avoid when | Build notes [Expert] |
|---|---|---|---|---|
| **Bento grid** | Content in neat mixed-size tiles, like a bento box (Apple, Airbnb, Pinterest) | Many parallel features/stats; landing feature sections; brand boards | Content is a sequence or story; tiles end up equal-sized | CSS Grid with named areas; one dominant tile; reflow to a single column on mobile with priority order |
| **Liquid glass / glassmorphism** | Blur, light edges, depth; translucent frosted panels | Nav bars, overlays, controls over rich imagery | Over plain backgrounds (nothing to blur); body text containers | `backdrop-filter: blur()` + 1px light border + tint scrim for contrast; test contrast on the busiest part of the background; costly on low-end mobile |
| **Giant / big bold type** | Headlines that dominate the hero | Brand statements, editorial, posters | Long or generic headlines (generic giant headline = slop) | `clamp()` sizing, tight tracking, line-height 0.9–1; reserve space to avoid layout shift |
| **Soft 3D / 3D soft realism** | Inflated, clay-like, soft-lit 3D objects | App icons, product visuals, friendly tech | 3D adds nothing to the concept | Pre-rendered images (AVIF/WebP) by default; runtime 3D (Spline/three.js) only if it adds interaction; lazy-load + poster |
| **Real 3D** | Realistic shadows and textures, immersive scenes | Hardware, launches, "wow" moments | Content-heavy pages, slow audiences | Budget the JS; keep a static fallback |
| **Progressive blur** | Photo gradually blurs into the content area instead of a hard overlay | Image-led mobile screens, cards with text over photos | Already-low-contrast imagery | Stacked `backdrop-filter` layers with `mask-image` gradients |
| **Light rays** | A beam or rays of light as the hero visual | Dark cinematic launches, dev/AI tools | Light themes; multiple competing glows | CSS conic/radial gradients or one optimized image; one light source only |
| **Neo-brutalism** | Thick black outlines, flat saturated fills, hard shadows, playful illustration | Consumer, creator, youth, playful fintech | Luxury, healthcare, enterprise trust | `border: 2–3px solid`, `box-shadow: 4px 4px 0 #000`, no blur |
| **Modern minimalism** | Essentials only, simple navigation (Google, Apple) | Almost always as the base | When "minimal" turns into empty and generic | Minimal ≠ bland: needs strong type and one memorable move |
| **Animated gradients** | Flowing color backgrounds (e.g. ShaderGradient) | Brand moments, launch heroes | Behind body text; when the brand has no gradient identity | Respect `prefers-reduced-motion`; pause offscreen; watch GPU cost |
| **Vibrant colors** | Bold saturated hues | Consumer brands that need to stand out | When saturation reduces readability | Saturated fields with dark/white text that passes contrast |
| **Dark mode** | Eye-friendly alternative where elements pop | Dev tools, media, night use; offering both themes | As the only "premium" trick | Build as a token theme; see color-system.md |
| **Generative design** | Algorithm-made unique layouts/elements | Creative/AI brands with a real generative concept | Decoration only (abstract purple shape = cliché) | Seeded generation so it's reproducible; static fallback |
| **Detailed illustrations / renders** | High-detail product or editorial illustration | Products whose detail is the selling point | Generic stock illustration | One illustration style per product |

## 2. Design history timeline [Source: PDF "UI/UX Design Trendsetters 2010–2026"]
"Trendsetter" does not mean original inventor. Picking one trend per year is an editorial synthesis, not a ranking.

| Year | Direction | Trendsetter | Influence |
|---|---|---|---|
| 2010 | Metro UI + responsive design | Microsoft; Ethan Marcotte | Typographic layouts, flexible grids, media queries |
| 2011 | Mobile-first | Luke Wroblewski | Most important tasks first, for small screens |
| 2012 | Touch-first interfaces | Windows 8 | Large targets, edge gestures, tile navigation |
| 2013 | Flat design | Apple iOS 7 | Less realistic texture; cleaner type, icons, controls |
| 2014 | Material Design | Google | Surfaces, elevation, shadows, meaningful motion |
| 2015 | Mobile-friendly web UX | Google | Readable, usable mobile sites |
| 2016 | Collaborative design systems | Airbnb; Figma | Reusable components, shared language, multiplayer editing |
| 2017 | Gestures + Fluent Design | Apple; Microsoft | Edge-to-edge, depth, motion, gesture navigation |
| 2018 | Theming design systems | Google Material | Brand-specific color, type and shape systems |
| 2019 | Dark mode | Apple iOS 13 | System-wide dark appearance, multi-theme apps |
| 2020 | Soft UI + translucent layers | Community; Apple Big Sur | Rounded surfaces, glass-like effects |
| 2021 | Dynamic color personalization | Google Material You | Wallpaper-based, adaptive themes |
| 2022 | Conversational AI UX | OpenAI ChatGPT | Dialogue as a primary interface |
| 2023 | Spatial UI | Apple Vision Pro | Interfaces in space; eyes, hands, voice |
| 2024 | AI-assisted design tools | Figma AI | AI in design, editing, prototyping |
| 2025 | Expressive UI + Liquid Glass | Apple; Google (Material 3 Expressive) | Translucent controls, spring-like motion, expressive systems |
| 2026 | Adaptive generative interfaces | Google Research | **Emerging research**, not an industry standard: UI that adapts to user intent |

**Recommended study** [Source: PDF]: Apple Human Interface Guidelines, Google Material Design, Microsoft Fluent, scalable design systems, collaborative workflows.

**Primary sources** (from the PDF):
- 2010 Responsive Web Design — https://alistapart.com/article/responsive-web-design/
- 2013 iOS 7 — https://www.apple.com/newsroom/2013/06/10Apple-Unveils-iOS-7/
- 2014 Material Design — https://developers.googleblog.com/en/this-is-material-design/
- 2015 Mobile-friendly update — https://search.googleblog.com/2015/04/
- 2016 Figma multiplayer — https://www.figma.com/blog/multiplayer-editing-in-figma/
- 2019 iOS 13 dark mode — https://www.apple.com/newsroom/2019/06/apple-previews-ios-13/
- 2021 Android 12 / Material You — https://blog.google/products-and-platforms/platforms/android/android-12/
- 2022 ChatGPT — https://openai.com/index/chatgpt/
- 2023 Vision Pro — https://www.apple.com/newsroom/2023/06/introducing-apple-vision-pro/
- 2024 Figma Config — https://www.figma.com/blog/config-2024-recap/
- 2025 Liquid Glass — https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/
- 2025 Material 3 Expressive — https://blog.google/products-and-platforms/platforms/android/material-3-expressive-android-wearos-launch/
- 2026 Adaptive generative interfaces — https://research.google/pubs/self-evolving-systems-moving-beyond-deterministic-interfaces-to-adaptive-generative-interfaces/
