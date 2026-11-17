#!/usr/bin/env python3
"""Palette generator: OKLCH tonal scale + color harmonies + contrast hints.

Usage:
  python3 palette.py "#2563EB"                 # scale + harmonies for one brand color
  python3 palette.py "#2563EB" --css brand     # also print CSS custom properties (--brand-50 … --brand-950)
  python3 palette.py "#111111" --mono          # black-and-white / neutral brand: value system, no harmonies
                                               # (mono mode also switches on automatically when chroma < 0.03)

What it gives you:
  1. The color in OKLCH (L = perceived lightness 0–1, C = chroma, H = hue angle)
  2. A 50–950 tonal scale built in OKLCH (perceptually even steps, same hue)
     with WCAG contrast vs white and vs near-black for each step
  3. Harmonies by hue rotation in OKLCH: complementary, analogous, split-complementary, triadic, tetradic
Colors outside the sRGB gamut are reduced in chroma until they fit (so every hex is real).
"""
import math
import sys


# ---------- conversions (Björn Ottosson's OKLab) ----------
def _srgb_to_linear(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def _linear_to_srgb(c):
    return 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055


def hex_to_rgb(h):
    h = h.strip().lstrip("#")
    if len(h) == 3:
        h = "".join(ch * 2 for ch in h)
    if len(h) != 6:
        raise ValueError(f"Not a hex color: {h}")
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


def rgb_to_oklch(rgb):
    r, g, b = (_srgb_to_linear(c) for c in rgb)
    l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
    l_, m_, s_ = (math.copysign(abs(v) ** (1 / 3), v) for v in (l, m, s))
    L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
    A = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
    B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
    C = math.hypot(A, B)
    H = math.degrees(math.atan2(B, A)) % 360
    return L, C, H


def oklch_to_linear(L, C, H):
    a, b = C * math.cos(math.radians(H)), C * math.sin(math.radians(H))
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    return (4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
            -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
            -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s)


def in_gamut(lin):
    return all(-1e-4 <= v <= 1 + 1e-4 for v in lin)


def fit(L, C, H):
    """Reduce chroma until the color fits sRGB. Returns (hex, chroma_used)."""
    c = C
    while c > 0 and not in_gamut(oklch_to_linear(L, c, H)):
        c -= 0.002
    c = max(c, 0)
    lin = oklch_to_linear(L, c, H)
    hx = "#" + "".join(f"{max(0, min(255, round(_linear_to_srgb(max(0, min(1, v))) * 255))):02X}" for v in lin)
    return hx, c


def oklch_to_hex(L, C, H):
    return fit(L, C, H)[0]


# ---------- contrast ----------
def luminance(hex_color):
    r, g, b = (_srgb_to_linear(c) for c in hex_to_rgb(hex_color))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b):
    hi, lo = sorted((luminance(a), luminance(b)), reverse=True)
    return (hi + 0.05) / (lo + 0.05)


# ---------- scale & harmonies ----------
# Target OKLCH lightness per step (tuned for UI scales, similar in spirit to Tailwind's)
STEPS = {50: 0.97, 100: 0.94, 200: 0.88, 300: 0.80, 400: 0.71, 500: 0.62,
         600: 0.54, 700: 0.46, 800: 0.38, 900: 0.30, 950: 0.22}

HARMONIES = {
    "complementary": [180],
    "analogous": [-30, 30],
    "split-complementary": [150, 210],
    "triadic": [120, 240],
    "tetradic (square)": [90, 180, 270],
}


def chroma_for_step(base_c, L):
    # Taper chroma toward the very light and very dark ends (keeps tints clean, shades rich)
    taper = 1 - abs(L - 0.6) * 0.9
    return base_c * max(0.25, taper)


MONO_THRESHOLD = 0.03  # OKLCH chroma below this reads as neutral (black/white/grey); hue rotation is meaningless

# Role → OKLCH lightness for a value-driven (monochrome) UI. Light and dark themes.
MONO_ROLES = {
    "light": [("bg", 0.985), ("surface", 0.965), ("raised", 1.0), ("line", 0.885), ("line-strong", 0.62),
              ("text-muted", 0.50), ("text", 0.22), ("ink", 0.145)],
    "dark":  [("bg", 0.155), ("surface", 0.205), ("raised", 0.25), ("line", 0.32), ("line-strong", 0.56),
              ("text-muted", 0.71), ("text", 0.93), ("ink", 0.985)],
}


def mono(base, L, C, H, css_name):
    tint = C if C >= 0.004 else 0.0  # keep a faint warm/cool cast if the brand grey has one
    kind = "pure grey" if tint == 0 else f"tinted neutral (hue {H:.0f}°, chroma {C:.3f})"
    print(f"Base {base.upper()}  →  oklch({L:.3f} {C:.3f} {H:.1f})  ·  {kind}")
    print("MONO MODE: chroma below 0.03, so hue harmonies would be meaningless and are not printed.\n")
    print("Neutral scale (OKLCH lightness steps, same faint tint)")
    print("  step  hex       vs white   vs #0A0A0A")
    scale = {}
    for step, l in STEPS.items():
        hx, c_used = fit(l, tint * 0.8, H)
        scale[step] = (hx, c_used, l)
        print(f"  {step:>4}  {hx}   {contrast(hx, '#FFFFFF'):5.2f}:1   {contrast(hx, '#0A0A0A'):5.2f}:1")
    for theme, roles in MONO_ROLES.items():
        print(f"\nValue system: {theme} theme  (WCAG checks against that theme's bg)")
        hexes = {name: fit(l, tint * 0.6, H)[0] for name, l in roles}
        bg = hexes["bg"]
        for name, l in roles:
            hx = hexes[name]
            r = contrast(hx, bg)
            need = {"text": 4.5, "ink": 4.5, "text-muted": 4.5, "line-strong": 3.0}.get(name)
            verdict = "" if need is None else ("  ✓" if r >= need else f"  ✗ needs ≥ {need}:1")
            print(f"  {name:<12} {hx}   {r:5.2f}:1 vs bg{verdict}")
    print("""
Hierarchy without color: use these levers, strongest first
  1. Value (lightness) contrast: ink on bg for primary, text-muted for secondary; never more than 3 text values
  2. Scale + weight: size steps from a type scale; weight 400 / 600-700 / 800+ only; one heavy display moment per view
  3. Space: bigger gaps before new sections than inside them (proximity does the grouping colour would do)
  4. Inversion: one full-bleed inverted band (ink background) per page = the "accent" of a mono system
  5. Texture: halftone / grain / hairline rules / dot grids / photography in black-and-white; one texture family only
  6. Line: 1px hairlines (line) for structure, line-strong (≥ 3:1) for input borders and focus-adjacent edges
  7. Code / data highlighting: weight (bold keywords), italics (comments), underline/dotted (links), value steps
Focus states: a 2px ink outline + 2px bg offset (two-tone ring) stays visible on light, dark and inverted bands.
States (error/success/warning): mono brands still need them. Add semantic hues ONLY for state, never decoration,
and pair them with an icon + text (WCAG 1.4.1: colour is never the only signal).""")
    if css_name:
        print(f"\n:root {{")
        for step, (hx, c_used, l) in scale.items():
            print(f"  --{css_name}-{step}: oklch({l:.3f} {c_used:.3f} {H:.1f}); /* {hx} */")
        print("}")
    return 0


def main(argv):
    if not argv:
        print(__doc__)
        return 1
    base = argv[0]
    css_name = argv[argv.index("--css") + 1] if "--css" in argv else None
    L, C, H = rgb_to_oklch(hex_to_rgb(base))
    if "--mono" in argv or C < MONO_THRESHOLD:
        return mono(base, L, C, H, css_name)
    print(f"Base {base.upper()}  →  oklch({L:.3f} {C:.3f} {H:.1f})")
    print(f"  vs white {contrast(base, '#FFFFFF'):.2f}:1 · vs #0A0A0A {contrast(base, '#0A0A0A'):.2f}:1\n")

    print("Tonal scale (OKLCH, same hue)        text on it: use the color with ≥ 4.5:1")
    print("  step  hex       oklch                 vs white   vs #0A0A0A")
    scale = {}
    for step, l in STEPS.items():
        hx, c_used = fit(l, chroma_for_step(C, l), H)
        scale[step] = (hx, c_used)
        cw, cb = contrast(hx, "#FFFFFF"), contrast(hx, "#0A0A0A")
        print(f"  {step:>4}  {hx}   oklch({l:.2f} {c_used:.3f} {H:.1f})   {cw:5.2f}:1   {cb:5.2f}:1")

    print("\nHarmonies (hue rotation in OKLCH, same L and C as the base):")
    for name, offsets in HARMONIES.items():
        cols = [oklch_to_hex(L, C, (H + o) % 360) for o in offsets]
        print(f"  {name:<20} {base.upper()} + {' '.join(cols)}")

    print("\nTip: in UI, use ONE hue as the 10% accent and neutrals for 60/30;"
          " use harmonies for illustrations, charts or a secondary accent only.")

    if css_name:
        print(f"\n:root {{")
        for step, (hx, c_used) in scale.items():
            print(f"  --{css_name}-{step}: oklch({STEPS[step]:.2f} {c_used:.3f} {H:.1f}); /* {hx} */")
        print("}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
