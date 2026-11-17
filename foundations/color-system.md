# Color system

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
