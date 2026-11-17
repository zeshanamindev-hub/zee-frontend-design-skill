# Typography

Typography is most of the design. Treat it as a **system**, not a font choice. [Source: DOCX guide, principle 2]

## 1. Core rules [Source]
- **Choose ONE strong typeface**, then explore its weights, adjust letter-spacing, and set intentional sizes. More fonts don't automatically improve a design.
- **Combine contrasts:** bold + light, large + small. Same weight and same size everywhere makes the design flat.
- **Hierarchy:** headline bigger, supporting text smaller, key info easy to find.
- **Two-tone headline:** one line or word in a contrasting color or weight (e.g. "Timeless" regular + "*Style*" bold italic; black "Sport" + orange "Watch").
- **Eyebrow → rule → headline pattern:** a small tracked-out uppercase label (e.g. "NEW COLLECTION"), a short accent rule, then the headline. It shows up again and again in the premium examples.
- **Category drives type:** perfume/luxury → elegant serif italic; sport → heavy italic condensed caps; tech → geometric/mono.
- **Avoid automatic "modern SaaS" typography.** Set explicit styles, sizes, weights, line heights and widths. [Source: DOCX guide]

## 2. The type system [Expert]

**Scale.** Pick a ratio and use only its steps.
| Use | Ratio | Steps from 16px |
|---|---|---|
| Dense app/dashboard | 1.2 (minor third) | 16 · 19 · 23 · 28 · 33 · 40 |
| Balanced product/marketing | 1.25 (major third) | 16 · 20 · 25 · 31 · 39 · 49 · 61 |
| Expressive editorial/landing | 1.333 (perfect fourth) | 16 · 21 · 28 · 38 · 51 · 67 · 90 |
(16 × ratioⁿ, rounded.) Display sizes can step outside the scale when used as a deliberate signature (giant type).

**Fluid headings:** `font-size: clamp(2.5rem, 1.5rem + 4vw, 5rem);` Set min, preferred and max on purpose.

**Line height:** body 1.5–1.7 · headings 1.05–1.25 · giant display 0.9–1.0.

**Line length:** body text 45–75 characters (`max-width: 65ch` is a good default).

**Letter-spacing:**
- Large display: tighten (`-0.02em` to `-0.04em`). Big type looks loose at default tracking.
- Small uppercase eyebrows/labels: loosen (`+0.08em` to `+0.2em`).
- Body: leave at default.

**Weights:** use 3–4 per project at most (e.g. 400 / 500 / 700 / 800). Every weight is a font file to download.

**Numbers:** `font-variant-numeric: tabular-nums` for prices, tables and counters (stops digits jumping).

**Line breaks:** `text-wrap: balance` on headings (supported in all major browsers since 2024), `text-wrap: pretty` on paragraphs as a progressive enhancement (narrower support). Never insert manual `<br>` for balance.

## 3. Pairing [Expert]
- Default: **one family** (variable font) for everything.
- Two families only when roles differ clearly: **display** (personality) + **text** (quiet, highly readable).
- Pair by contrast of structure (serif + sans, or expressive + neutral), never two similar sans fonts.
- Check that x-heights sit comfortably together at body size.
- Scripts/handwritten fonts: accent words only (max 2–3 words), never paragraphs, never buttons.

**Verified pairing starters (all free, OFL on Google Fonts):**
| Direction | Display | Text |
|---|---|---|
| Editorial luxury | Instrument Serif / Playfair Display | DM Sans / Manrope |
| Fashion & beauty | Cormorant Garamond | Figtree |
| Modern product / SaaS | Plus Jakarta Sans (single family) | — |
| Statement tech | Unbounded / Syne | Manrope / Onest |
| Bold commerce & sport | Anton / Big Shoulders Display | Archivo |
| Developer tool | Space Grotesk | JetBrains Mono (code/data) |
| Friendly & playful | Fredoka | Nunito |
| Warm editorial | Fraunces | Instrument Sans |
| Swiss / neutral precision | Geist / Inter (chosen on purpose) | Geist Mono / IBM Plex Mono |

## 4. Font catalog by mood

**License policy (user decision):** free-licensed fonts by default. Fonts from the source images marked ⚠️ are commercial, demo or "personal use" fonts. Use them only if the user confirms they hold a license. Before using any font, confirm it exists (`fonts.google.com/specimen/<Name>` or fontshare.com).

| Mood / personality | Seen in source images (⚠️ check license) | Free alternatives — Google Fonts (OFL, verified) | Fontshare (free commercial use, ITF license) |
|---|---|---|---|
| **Clean modern / geometric** | Urbanist ✅ free, Outfit ✅ free, Alro ⚠️, Ancola ⚠️, Piccole ⚠️ | Urbanist, Outfit, Plus Jakarta Sans, Manrope, Sora, Figtree, Onest, DM Sans, Geist | Satoshi, General Sans |
| **Wide / extended statement** | Nura ⚠️, Progo ⚠️, Avion ⚠️, Luxie ⚠️ | Unbounded, Syne, Michroma | Clash Display, Panchang |
| **Condensed heavy impact** (posters, sport, streetwear) | Isolated ⚠️, Lova Bold ⚠️ | Anton, Bebas Neue, Oswald, Big Shoulders Display, Archivo (width axis) | — |
| **Luxury / editorial high-contrast serif** | Ateroz ("Mystical and High Luxury"), Bitho ("Retro Glam"), Choga ("Editorial and Refined"), Kolagi ("Artistic"), Broela, Bussin Branding, Vermica, Baik ⚠️ | Playfair Display, Bodoni Moda, Cormorant Garamond, DM Serif Display, Instrument Serif, Gloock, Fraunces, Newsreader (text) | Zodiak, Gambetta, Boska |
| **Futuristic / cyber / tech** | Nubico, Roba ("Cyber-minimalist"), Altron ("Industrial Tech"), Rewon, Godber, Bitcoa ⚠️ | Orbitron, Michroma, Chakra Petch, Exo 2, Space Grotesk, Saira | — |
| **Friendly rounded / playful** | Bingo, Surgena, Molen Friend (Demo), Spooky Memories, Milano ⚠️ | Fredoka, Nunito, Quicksand, Baloo 2 | Chillax |
| **Retro bold / 70s–90s** | Aloha Nineties ⚠️ | Fraunces (heavy weights), Shrikhand, Young Serif | — |
| **Hand-drawn / script accent** | Mocka ⚠️ | Caveat, Kalam (marker) · Great Vibes, Pinyon Script (formal script, accents only) | — |
| **Mono / grid-tech / pixel** | (ChainGPT Labs example) | Space Mono, JetBrains Mono, IBM Plex Mono, Pixelify Sans, Silkscreen | — |
| **Light minimal luxury caps** | Luxie, Ourova ⚠️ | Urbanist (ExtraLight/Light + wide tracking), Manrope ExtraLight | — |
| **Expressive grotesk** | — | Bricolage Grotesque, Familjen Grotesk, Instrument Sans | Cabinet Grotesk, Switzer |

Verification notes:
- All 49 Google Fonts names in this table have an `@fontsource/<name>` npm package licensed **OFL-1.1** (checked Nov 2026).
- **Cocogoose** (from the "clean fonts" set) is **free for personal/non-commercial use only**; commercial use needs a Zetafonts license.
- Fontshare fonts are free for personal **and** commercial use under ITF's own license (not open-source; no redistribution of font files). Confirm each name on fontshare.com before use. Not every Fontshare name above was individually re-checked.
- **"Demo" in a font name = not licensed for commercial work.**

## 5. Font tools [Source: "108 websites"]
Google Fonts · Fontshare · Typewolf (what fonts real sites use) · Fontpair (pairings) · Pangram Pangram (⚠️ commercial; trials) · Velvetyne (libre/experimental, check each license) · Adobe Fonts (subscription) · WhatFont (identify fonts on a page) · FontBrief · Type Scale (scale calculator).

## 6. Loading fonts
Implementation per platform (next/font, theme.json, Shopify font settings) lives in `mediums/web-ui/implementation.md`.

## 7. Readability-first shortlist (default recommendations)
When the user wants "top, readable, simple" fonts, start here. All are free (OFL-1.1, verified via Fontsource Nov 2026), have multiple weights, and work well at UI sizes.

**What makes a font readable** [Expert]: generous x-height · open apertures (c, e, s don't close up) · distinct I / l / 1 and 0 / O · moderate stroke contrast · enough weights (at least 400/500/600/700) · good hinting at small sizes · the language support you need.

| Font | Character | Best for | Notes |
|---|---|---|---|
| **Inter** | Neutral, highly legible UI sans | Apps, dashboards, SaaS | Excellent at small sizes; very common, so pair it with a distinctive display font or strong layout |
| **Plus Jakarta Sans** | Modern geometric-humanist, friendly | SaaS, startups, marketing | Distinctive without being loud |
| **Manrope** | Semi-condensed, modern, technical | Fintech, tech, product sites | Great numbers |
| **DM Sans** | Low-contrast geometric, clean | Marketing, portfolios | Pairs well with serifs |
| **Figtree** | Friendly, clean geometric | Consumer, education, health | Very readable body text |
| **Source Sans 3** | Humanist, calm, long-form friendly | Docs, content, education | Large character set |
| **Public Sans** | Neutral, institutional | Government, nonprofit, B2B | Strong, plain, trustworthy |
| **Atkinson Hyperlegible Next** | Designed for low-vision readers | Accessibility-first sites, healthcare, education | Extra character distinction |
| **Lexend** | Designed around reading-proficiency research | Education, kids, reading-heavy UIs | Wide spacing |
| **IBM Plex Sans** | Engineered, corporate-technical | Enterprise, dev tools | Has Mono and Serif siblings + Arabic |
| **Work Sans / Albert Sans / Hanken Grotesk** | Clean grotesques | Agencies, editorial UI | Good alternatives to Inter |
| **Noto Sans** | Neutral, huge language coverage | Multilingual sites | Matching Noto scripts available |

Serif options for editorial reading: **Newsreader** (text) and **Fraunces** (display); see §3 and §4 for more serifs.

## 8. How to present font options to the user (always give choices)
Never pick a font silently. Present **3 options** in the brief, with one recommended:
```
FONT OPTIONS (all free, OFL)
★ Recommended: Plus Jakarta Sans: friendly-modern, very readable at 14–16px, distinct from competitors (they use Inter/Roboto). Weights 400/500/700/800.
  Option B: Manrope + Instrument Serif (display): more editorial/premium; serif for 1–2 headline words only.
  Option C: Atkinson Hyperlegible Next: maximum legibility (older or low-vision audience); less personality, so carry the brand through color and layout.
Why ★: <tie to personality words, audience, competitor gap, language support>
```
- Show the options rendered: a specimen in a style tile or a quick HTML preview with real headline + body copy, at mobile and desktop sizes.
- Check each option against the competitor fonts found in research. Using the same font as the main competitor weakens differentiation.

## 9. Multi-language & script support
- Check the languages before choosing: not every font has Arabic, Urdu (Nastaliq), Devanagari, Cyrillic or Vietnamese glyphs.
- Verified free options: **Noto Sans Arabic**, **Noto Nastaliq Urdu** (traditional Urdu style; needs more line height), **IBM Plex Sans Arabic**; the **Noto** family covers most scripts.
- RTL layouts: `dir="rtl"`, CSS logical properties (`margin-inline-start`, `padding-inline`), mirrored icons where direction matters (arrows), not mirrored where it doesn't (logos, media controls).
- Pair Latin and non-Latin fonts with similar weight and x-height so mixed text looks even.
