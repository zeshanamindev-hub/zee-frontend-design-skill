# Color system

## 0. Color rules: quick sheet (apply on every design)
**Rules**
1. **60/30/10:** 60% dominant (backgrounds, large areas) · 30% secondary (cards, sections, structure, text) · 10% accent (CTAs, highlights, key icons). [Source]
2. **One color leads.** One accent hue carries attention; everything else supports it. [Source]
3. **Value (lightness) before hue:** hierarchy must survive in grayscale.
4. **Contrast is non-negotiable:** text ≥ 4.5:1, large text & UI parts ≥ 3:1 (contrast.py).
5. **Never color alone** for meaning: add icon, label or pattern (about 1 in 12 men have a color vision deficiency).
6. **Tinted neutrals,** never dead grey: warm for human/organic brands, cool for tech/precision.
7. **Build scales in OKLCH** (palette.py), not by mixing with black/white.
8. **Semantic colors** (success/warning/error/info) are for status only, never decoration.
9. **Accent discipline:** if the accent is everywhere, it directs nothing. Reserve it for the primary action.
10. **Judge colors in context** (on every surface they appear on), not as isolated swatches.
11. **Dark mode is its own palette:** off-white text, near-black surfaces, lighter = higher, slightly calmer accents.
12. **Gradients only with a reason** (light source, brand identity), same-hue or analogous, interpolated in OKLCH. [Source: DOCX]
13. **Check culture and category:** meanings vary; decide to fit or break category conventions on purpose (from competitor research).
14. **Plan for print** early if the brand will be printed (CMYK gamut is smaller than screen RGB).

**Color physics, in one paragraph:** screens emit light (additive RGB), print absorbs it (subtractive CMYK). Perceived lightness is not linear (that's why OKLCH beats HSL). Saturated colors look brighter than they measure (Helmholtz–Kohlrausch). Every color shifts with its surroundings (simultaneous contrast). Warm colors advance and cool colors recede. Details: §6.

## 1. The 60/30/10 rule [Source]

A simple color formula for balanced, memorable, professional design.

| Role | Share | What it is | Use it for | Purpose |
|---|---|---|---|---|
| **Primary (dominant)** | 60% | The main color of the design | Backgrounds, large design elements, main visual identity | Consistency and recognition |
| **Secondary (supporting)** | 30% | Supports the primary without overpowering it | Cards, sections, graphics, illustrations (and in UI: structure + text) | Depth and visual balance |
| **Accent** | 10% | The attention-grabbing color | CTA buttons, highlights, icons, important text | Directs attention where it matters most |

*"A small amount of accent color creates a big impact."* [Source]

**Why it works** [Source]: creates visual hierarchy (guides the eye) · makes the brand look premium (balanced palette) · improves readability (better contrast) · keeps the design balanced (no color overpowers) · builds brand recognition through consistency. *"Great brands aren't random. They're intentional."*

**Real-world example** [Source]
- White 60% → backgrounds, clean space
- Black 30% → text, sections, structure (e.g. a black stats band)
- Yellow 10% → nav CTA, primary button, highlights

**Let one color take the lead** [Source: "Choose the right palette"]: a few well-chosen colors in balance. Five competing hues (purple + pink + yellow + cyan + orange) look busy and unbalanced. The fix: navy/black + one electric blue, with the product recolored to match.

### How to apply it in UI [Expert]
- Percentages are **approximate visual area per screen**, not exact math. Judge them by squinting at a screenshot.
- **Neutrals count.** In most UIs the 60% is a near-white or near-black, and the 30% is a contrasting neutral or a brand tint.
- **Semantic colors** (success / warning / error / info) sit outside the rule. Use them only for status, never decoration.
- **Accent discipline:** the accent marks what to click or notice. If it is on every heading, icon and border, it stops directing attention. Heuristic: a handful of accent touches per viewport, with the primary CTA as the strongest.
- The accent must pass contrast **in the way it's used**:
  - Yellow `#FACC15` on white = **1.53:1** → FAILS even for large text. Use yellow as a button *fill* with dark text: `#0A0A0A` on `#FACC15` = **12.93:1** → passes AAA.
  - Light grey `#9CA3AF` text on white = **2.54:1** → fails. `#6B7280` on white = **4.83:1** → passes AA.
  - (Calculated with `scripts/contrast.py`, the WCAG 2.x relative-luminance formula.)

## 2. Contrast requirements [Expert — WCAG 2.1/2.2]

| Element | Minimum (AA) |
|---|---|
| Normal text | 4.5 : 1 |
| Large text (≥ 24px regular, or ≥ 18.66px bold) | 3 : 1 |
| UI components & meaningful graphics (input borders, icons, focus rings, chart lines) | 3 : 1 |
| AAA normal text (nice to have) | 7 : 1 |

Run: `python3 ${CLAUDE_SKILL_DIR}/scripts/contrast.py "<fg>" "<bg>"` for every text/background token pair before handover.

## 3. Building a palette [Expert]

1. **Start from the decision, not a generator.** What should the accent make people do? Which emotion fits the 3 personality words?
2. Pick the **accent** (10%) first if the brand has one; otherwise derive it from the personality.
3. Pick the **dominant** (60%): usually a tinted neutral (off-white warmed or cooled toward the accent hue, or a deep near-black).
4. Pick the **secondary** (30%): a contrasting neutral or a deep/soft brand tint for sections, cards and text.
5. Build **tonal scales** (50–950) for neutrals and the accent. OKLCH gives more even perceived steps than HSL (shadcn/ui's default tokens are written in `oklch()`).
6. Add semantic colors, harmonized to the palette's temperature.
7. Check every pair with contrast.py, then check the screen by squinting.

**Palette tools** [Source: "108 websites" list]: Coolors, Color Hunt, Khroma, Happy Hues, Colormind, BrandColors, ColorSpace, Adobe Color, Leonardo (contrast-based palettes), Huemint.

## 4. Dark mode [Source: trends + PDF 2019; rules Expert]
- Dark mode is a **second theme built from the same roles**, not an inverted copy.
- 60% becomes a deep near-black/charcoal; 30% becomes slightly lighter surfaces (elevation = lighter, not shadow).
- Reduce accent saturation/brightness a little if it vibrates on dark. Re-check contrast; don't assume.
- Avoid pure `#000` + neon glow as the default "premium" look. It is a common AI-template tell (see anti-ai-slop.md). Use it only if the brand calls for it.

## 5. Mapping to code
Framework-specific token mapping (shadcn/Tailwind v4, Tailwind v3, WordPress theme.json, Shopify) lives in the medium module: `mediums/web-ui/implementation.md`.

## 6. Color theory beyond 60/30/10 [Expert]

### 6.1 Light and color models (the physics)
- **Screens add light (RGB, additive):** red + green + blue light = white. Design for screens in **sRGB**; modern displays also show the wider **Display P3** gamut.
- **Print absorbs light (CMYK, subtractive):** saturated screen colors (electric blues, neon greens, bright oranges) often **can't be printed** and come out duller. For print work, check the brand colors in CMYK early and define official CMYK/Pantone values.
- **Wide gamut on the web:** OKLCH can describe P3 colors. Provide an sRGB fallback and enhance inside `@media (color-gamut: p3)`.

### 6.2 The three dimensions, and why lightness matters most
- **Hue** (which color), **chroma/saturation** (how intense), **lightness/value** (how light or dark).
- **Value does most of the work** in hierarchy and readability. **Grayscale test:** desaturate a screenshot. If the hierarchy disappears, the design relies on hue alone, so fix the value contrast.
- **HSL lies about lightness:** yellow and blue at the same HSL "L" look completely different. **OKLCH lightness** is close to what eyes perceive, so build scales and pick pairs in OKLCH. Use `python3 ${CLAUDE_SKILL_DIR}/scripts/palette.py "<hex>"` for an OKLCH 50–950 scale with contrast values for every step.
- **Helmholtz–Kohlrausch effect:** highly saturated colors *look* brighter than their measured luminance. Contrast math can feel off for vivid colors, but still meet the WCAG numbers.

### 6.3 Harmonies (for choosing supporting colors)
| Harmony | Hues | Feels | Best UI use |
|---|---|---|---|
| Monochromatic | One hue, many lightness steps | Calm, cohesive, premium | Most UIs: neutrals + one hue scale |
| Analogous | Neighbors (±30°) | Harmonious, natural | Illustrations, gradients, warm/cool families |
| Complementary | Opposite (180°) | High energy, strong contrast | Accent vs base (e.g. navy + orange CTA), in small doses |
| Split-complementary | Base + two neighbors of its opposite | Lively but balanced | Marketing sites needing 2 accents |
| Triadic | 3 evenly spaced (120°) | Playful, vibrant | Kids, games, illustration systems; keep one dominant |
| Tetradic / square | 4 hues | Rich, hard to balance | Data viz / illustration only |
Generate them with `palette.py`. Rule: harmonies feed **illustrations, charts and secondary accents**; the interface itself stays one-color-led (60/30/10).

### 6.4 Temperature
- Warm colors (red, orange, yellow) feel closer, energetic, appetizing; cool colors (blue, green, violet) feel calmer, recede, feel trustworthy or technical.
- **Tint your neutrals:** warm-tinted greys feel human and organic (food, hospitality, wellness); cool-tinted greys feel precise and technical (SaaS, fintech, health-tech).

### 6.5 Context changes color (simultaneous contrast)
- The same color looks different on different backgrounds: grey looks lighter on black and darker on white; a color next to its complement looks more intense.
- **Always judge colors in the real layout**, not on isolated swatches. Re-check accents on every surface they appear on (light section, dark band, image).

### 6.6 Meaning & psychology (use with care)
- Color associations are **cultural and contextual**, and evidence for universal effects is weak. Treat them as hypotheses, not laws. Common Western associations: blue → trust/calm, green → growth/health/money, red → urgency/passion/danger, black → luxury/power, yellow → optimism/attention.
- Check the audience's culture: e.g. white is associated with weddings in many Western contexts and with mourning in some East and South Asian contexts; green carries religious and national meaning in parts of the Muslim world.
- **Category conventions** matter more than psychology charts: research competitors (Track 2), then decide whether to fit the category (trust) or break it (differentiation).

### 6.7 Proportion rule variants (heuristics)
- **60/30/10**: the default [Source].
- **70/20/10**: minimal or content-heavy UIs (more neutral space).
- **Dashboards/apps:** ~80–90% neutrals + semantic colors + one accent; color is reserved for meaning (status, selection, data).
- Whatever the split: **one dominant, one supporting, one accent**.

### 6.8 Color accessibility beyond contrast
- **Never use color alone** to convey meaning (WCAG 1.4.1): pair status colors with icons, text labels or patterns; underline links in body text.
- **Color vision deficiency** affects about **1 in 12 men and 1 in 200 women** (Cleveland Clinic figures). Red/green distinctions are the most common problem: use blue/orange pairs or add icons and labels.
- Simulate it: Chrome DevTools → Rendering → "Emulate vision deficiencies".
- **APCA** (Accessible Perceptual Contrast Algorithm) is being developed for future WCAG versions. Use **WCAG 2.x ratios for compliance today**; APCA can inform fine-tuning.

### 6.9 Dark mode physics
- Pure white text on pure black can cause **halation** (glowing, blurry edges) for some readers, especially people with astigmatism. Use off-white text (~`#E8E8E8`–`#F5F5F5`) on near-black (`#0B0B0F`–`#18181B`).
- Lower the accent's chroma slightly on dark backgrounds; saturated colors vibrate.
- Elevation = lighter surfaces, not shadows (shadows barely show on dark).

### 6.10 Tints, shades, tones, gradients
- **Tint** = mix with white · **shade** = mix with black · **tone** = mix with grey. Mixing with pure black makes muddy shades. Generate scales in OKLCH instead (palette.py).
- **Gradients:** interpolate in OKLCH to avoid grey "dead zones": `linear-gradient(in oklch, #2563EB, #9333EA)`. Keep gradients same-hue or analogous unless the brand calls for more [Source: DOCX "gradients optional, never automatic"].

### 6.11 Color for data
- **Categorical:** distinct hues that also differ in lightness; max ~6–8 categories.
- **Sequential:** one hue, light → dark (more = darker).
- **Diverging:** two hues meeting at a neutral midpoint (e.g. negative ↔ positive).
- Highlight one series with the accent; grey out the rest.
