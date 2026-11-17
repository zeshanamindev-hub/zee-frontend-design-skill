# Art directions — the variety engine

Generic output happens when every project starts from the same defaults. This file prevents that. Every new design starts by **choosing a direction on purpose** and **finding a concept**, and the user sees 2–3 genuinely different options.

> Distinctive design comes from deliberate composition, clear content, credible visuals, brand identity and thoughtful interaction, **not from adding more visual effects.** [Source: DOCX guide, final rule]

## 1. What "award-level" actually means
Awwwards juries score sites on **Design 40% · Usability 30% · Creativity 20% · Content 10%** (awwwards.com/about-evaluation). So 40% of an "award-winning" score is usability and content, not looks. A dazzling but confusing site loses. Aim for **craft + clarity + one memorable idea**.

## 2. Find the concept first [Expert]
Before choosing colors, write **one sentence** that is the design idea, taken from the product, audience or brand story:
- Coffee roaster → "a roasting log": batch numbers, temperature curves, kraft-paper warmth.
- Fintech for freelancers → "a calm ledger": ruled lines, tabular numbers, quiet confidence.
- Running shoe → "the start line": diagonal motion, countdown numerals, oversized product crop.
- Dev tool → "the terminal as a showroom": mono type, real command output as hero visual.

The concept decides the signature move, the imagery and the motion. If you can't state it in one sentence, the design will drift into template territory.

## 3. Generating 2–3 directions (Step 3 of SKILL.md)
Each direction must differ from the others on **at least 3 of these 6 axes**. Different colors alone is not a different direction.

| Axis | Examples |
|---|---|
| Value | Light · dark · mixed (dark hero, light body) |
| Type genre | Serif · neutral sans · expressive display · mono · condensed |
| Layout skeleton | Strict grid · asymmetric · editorial columns · bento · full-bleed imagery · type-only |
| Imagery | Photography · real product UI · illustration · 3D · type as image |
| Color strategy | Monochrome + 1 accent · tinted neutrals · bold saturated field · duotone |
| Motion personality | Still & precise · smooth & calm · springy & playful · cinematic |

Present each direction as: **name · concept sentence · 60/30/10 palette (hex) · type pair · layout signature · signature move · best for / risk**. Recommend one, and explain why it fits the brief.

**Anti-repeat rule:** check the project's `DESIGN.md` (if it exists) and earlier work in this session. Don't default to a direction already used unless the user wants consistency.

**Optional style tiles:** for new brands or big redesigns, offer to build one quick HTML style tile per direction (palette swatches, type specimen, button + card + hero fragment) so the user can choose visually before the full build.

## 4. Direction library

Each recipe is a **starting point**, not a template. Adapt it to the concept. Fonts listed are free (see typography.md).

### D1 · Swiss Precision
- **Fits:** B2B, agencies, architecture, consultancies, data products.
- **Palette:** 60 off-white `#F5F5F0` · 30 near-black `#111111` · 10 signal red `#E63312` (or brand accent). Red on off-white = 3.96:1: fine for large text, fills and UI; use `#D42F11` (4.56:1) for small red text.
- **Type:** Geist or Inter (chosen deliberately), tight tracking, strong size jumps; mono for metadata.
- **Layout:** visible 12-column logic, flush-left alignment, asymmetric whitespace, numbered sections, hairline rules.
- **Signature:** one oversized number or word anchored to the grid edge.
- **Avoid:** centered everything, rounded pill everything.
- *Source echo:* Alignment principle, 60/30/10 white-black-yellow example.

### D2 · Editorial Luxury
- **Fits:** fashion, beauty, hospitality, real estate, premium services.
- **Palette:** 60 warm ivory `#F7F3EC` · 30 espresso `#2B2420` · 10 muted gold `#B08D57`. Gold as text on ivory = 2.79:1 (fails); use gold for rules, fills and details on ivory, and as text only on espresso (4.94:1).
- **Type:** Instrument Serif / Cormorant Garamond display (italic for emphasis) + DM Sans / Figtree text.
- **Layout:** magazine spreads, large image crops, generous margins, captions, thin rules, tracked uppercase eyebrows.
- **Signature:** serif italic word inside a sans headline; full-bleed photo with an off-center type block.
- **Avoid:** heavy shadows, bright saturated accents, crowded grids.
- *Source echo:* "Signature Scent" fix, Choga/Ateroz/Bitho moods, white + gold-on-black pairing.

### D3 · Kinetic Sport
- **Fits:** sportswear, fitness, energy drinks, events, gaming.
- **Palette:** 60 deep black or bold brand color · 30 white/neutral · 10 electric accent (volt, orange).
- **Type:** Anton / Big Shoulders Display, heavy italic uppercase + Archivo text.
- **Layout:** diagonals, overlapping product crops bleeding off edges, tilted elements, big numerals.
- **Signature:** oversized product, tilted and cropped, breaking the frame.
- **Avoid:** soft pastels, thin light type, static symmetric layouts.
- *Source echo:* "RUN FURTHER" fix, "Break the pattern with intention", Isolated/Lova Bold moods.

### D4 · Calm Product (anti-template SaaS)
- **Fits:** SaaS, productivity, fintech, health apps.
- **Palette:** 60 tinted near-white `#FAFAF7` · 30 slate text/surfaces · 10 one confident accent (not purple by default).
- **Type:** Plus Jakarta Sans or Manrope single family; tabular numbers.
- **Layout:** product-UI-led: real screens, annotated callouts, tabbed demos, comparison tables. No icon-tile grids.
- **Signature:** an interactive or annotated real product moment in the hero.
- **Avoid:** purple-blue gradient hero, 3 identical feature cards, fake stats.
- *Source echo:* DOCX guide ("show an actual workflow, product UI…").

### D5 · Dark Cinematic
- **Fits:** launches, AI/dev tools, film, premium tech hardware.
- **Palette:** 60 near-black `#0B0B0F` · 30 graphite surfaces · 10 one light source color (warm white beam, amber, ice blue).
- **Type:** Geist / Space Grotesk, large and tight; light weights for subheads.
- **Layout:** big type, deep space, one light-ray or glow as the hero light source, slow reveals.
- **Signature:** a single directional light (beam/rays) that leads the eye to the headline or CTA.
- **Avoid:** multiple neon glows, glass on everything, purple blobs.
- *Source echo:* Light Rays (Huly), Dark mode trend, giant glowing numerals.

### D6 · Bento Showcase
- **Fits:** feature-rich products, hardware, portfolios, app launches.
- **Palette:** brand-led; tiles in 60/30 neutrals, a few tiles in brand color (10%).
- **Type:** Sora / Onest; big numbers inside tiles.
- **Layout:** mixed-size tiles with ONE dominant tile; each tile = one message (stat, feature, quote, UI).
- **Signature:** a hero tile that animates or holds real UI; rhythm through size contrast.
- **Avoid:** equal-size tiles (that's just a card grid), more than ~8 tiles per view.
- *Source echo:* Bento UI (Apple iPhone example), Corode app, brand board bento.

### D7 · Neo-Brutal Pop
- **Fits:** consumer apps, creator tools, youth brands, playful fintech.
- **Palette:** 60 cream or white · 30 black (borders, text) · 10 two flat saturated pastels max (as fills).
- **Type:** Fredoka / Bricolage Grotesque bold + Nunito.
- **Layout:** thick 2–3px black outlines, hard offset shadows (`4px 4px 0 #000`), chunky pills, stickers.
- **Signature:** characterful illustration or sticker system.
- **Avoid:** subtle grays, soft blurred shadows, thin type.
- *Source echo:* Neo Brutalism trend (mobile finance UI).

### D8 · Warm Organic
- **Fits:** food, wellness, sustainability, crafts, outdoor.
- **Palette:** 60 oat/linen `#EFE9DF` · 30 forest or clay · 10 terracotta or sun yellow.
- **Type:** Fraunces / Young Serif + Instrument Sans.
- **Layout:** soft asymmetry, natural photography with consistent warm grading, hand-drawn details (sparingly).
- **Signature:** close-up textures (grain, paper), irregular image masks.
- **Avoid:** cold blues, glassmorphism, tech gradients.
- *Source echo:* Baik/Bussin landscapes, "Give people something to look at".

### D9 · Monochrome Type-Only
- **Fits:** studios, personal brands, manifestos, minimal products.
- **Palette:** 60 white or black · 30 the other · 10 a single accent used once or twice per page (or none).
- **Type:** one expressive family at huge sizes (Unbounded, Syne, Bricolage Grotesque).
- **Layout:** type is the image; giant headlines, small offset body copy, extreme scale contrast.
- **Signature:** a headline that fills the viewport width.
- **Avoid:** decorative imagery, many colors.
- *Source echo:* Giant type ("NOTHIN'"), Big Bold Typography (InVision).

### D10 · Tech Blueprint
- **Fits:** dev tools, web3, hardware, engineering, AI infra.
- **Palette:** 60 light grey grid paper or deep navy · 30 ink · 10 safety orange or signal green.
- **Type:** Space Grotesk + JetBrains Mono / IBM Plex Mono; pixel font for one accent (Pixelify Sans).
- **Layout:** visible grid lines and cells as structure, coordinates/labels, bordered logo strips.
- **Signature:** layout grid drawn on screen; data labels as decoration that carries real info.
- **Avoid:** soft rounded consumer styling.
- *Source echo:* ChainGPT Labs (3D Soft Realism slide), 9-principles grid backgrounds.

### D11 · Retro Revival
- **Fits:** food & drink, music, events, lifestyle brands.
- **Palette:** 60 warm cream · 30 deep brown/red · 10 mustard or teal.
- **Type:** Fraunces (heavy) / Shrikhand display + Nunito / DM Sans.
- **Layout:** badges, stamps, rounded frames, bold color fields.
- **Signature:** a custom badge/seal and a retro display headline.
- **Avoid:** mixing more than one retro era.
- *Source echo:* Aloha Nineties, Fun Fonts red/teal engraved-illustration series.

### D12 · Soft Tactile 3D
- **Fits:** consumer tech, kids/edu, fintech friendly, app icons.
- **Palette:** 60 soft pastel neutral · 30 slightly deeper tint · 10 saturated brand hue.
- **Type:** Outfit / Urbanist rounded-geometric.
- **Layout:** clean UI with 1–3 soft 3D objects as focal points (rendered images, not heavy WebGL by default).
- **Signature:** a puffy/clay 3D object that represents the product concept.
- **Avoid:** 3D for decoration only; heavy runtime 3D on mobile.
- *Source echo:* Soft 3D trend, Adept 3D scene, inflatable objects.

## 5. Mixing rules
- One direction leads. You may borrow **one** element from a second direction (e.g. Swiss Precision + one Editorial serif accent).
- One signature move per page, plus at most one supporting trend.
- Every borrowed element needs a reason tied to the concept or brief. "It looks modern" is not a reason. [Source: DOCX approval rule]
