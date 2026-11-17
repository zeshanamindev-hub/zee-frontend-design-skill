#!/usr/bin/env python3
"""extract-colors.py: pull the real brand colours out of a logo, product photo or screenshot.

Usage:
  python3 extract-colors.py logo.png [more images…] [--k 6] [--ignore-bg] [--css brand]

What it prints (per image, then a combined summary when several images are given):
  · the dominant colours with their share of (opaque) pixels, hex, OKLCH and contrast vs white / #0A0A0A
  · whether each colour is NEUTRAL (OKLCH chroma < 0.03) or CHROMATIC
  · role hints: the most-used neutral is a 60% candidate; the most vivid chromatic colour is the 10% accent candidate
  · whether the whole asset set is effectively monochrome (→ run palette.py --mono)

Notes
  · Transparent pixels are ignored. --ignore-bg also drops the colour found in the image corners (photo/screenshot background).
  · SVG logos: rasterize first, e.g. `node capture.mjs render logo.svg logo.png --size 800x800`, or export a PNG.
  · These are the colours IN THE ASSET. Brand guidelines (if they exist) win over extraction. Ask for them.
Requires Pillow (pip install pillow).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
try:
    from PIL import Image
except ImportError:
    print("Pillow not installed. Run: pip install pillow  (or pip install --break-system-packages pillow)")
    sys.exit(1)
from palette import rgb_to_oklch, contrast, MONO_THRESHOLD  # noqa: E402


def to_hex(rgb):
    return "#{:02X}{:02X}{:02X}".format(*rgb)


def oklab_dist(a, b):
    import math
    (L1, C1, H1), (L2, C2, H2) = a, b
    a1, b1 = C1 * math.cos(math.radians(H1)), C1 * math.sin(math.radians(H1))
    a2, b2 = C2 * math.cos(math.radians(H2)), C2 * math.sin(math.radians(H2))
    return math.sqrt((L1 - L2) ** 2 + (a1 - a2) ** 2 + (b1 - b2) ** 2)


def analyse(path, k, ignore_bg):
    im = Image.open(path)
    im.thumbnail((240, 240))
    rgba = im.convert("RGBA")
    data = rgba.get_flattened_data() if hasattr(rgba, "get_flattened_data") else rgba.getdata()  # Pillow ≥ 12.1 renamed it
    px = [tuple(p[:3]) for p in data if p[3] >= 128]
    if not px:
        return []
    if ignore_bg:
        w, h = rgba.size
        corners = [rgba.getpixel(xy)[:3] for xy in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1))]
        bg = max(set(corners), key=corners.count)
        bg_ok = rgb_to_oklch(tuple(c / 255 for c in bg))
        px = [p for p in px if oklab_dist(rgb_to_oklch(tuple(c / 255 for c in p)), bg_ok) > 0.05] or px
    flat = Image.new("RGB", (len(px), 1))
    flat.putdata(px)
    q = flat.quantize(colors=max(2, k + 2), method=Image.Quantize.MEDIANCUT)
    pal = q.getpalette()
    counts = sorted(q.getcolors(), reverse=True)
    total = sum(c for c, _ in counts)
    colours = []
    for count, idx in counts:
        rgb = tuple(pal[idx * 3: idx * 3 + 3])
        ok = rgb_to_oklch(tuple(c / 255 for c in rgb))
        # merge near-duplicates (ΔE_OK < 0.04)
        for c in colours:
            if oklab_dist(c["oklch"], ok) < 0.04:
                c["share"] += count / total
                break
        else:
            colours.append({"rgb": rgb, "hex": to_hex(rgb), "oklch": ok, "share": count / total})
    colours.sort(key=lambda c: c["share"], reverse=True)
    return colours[:k]


def report(title, colours):
    print(f"\n{title}")
    print("  share   hex      oklch                 type        vs white  vs #0A0A0A")
    for c in colours:
        L, C, H = c["oklch"]
        kind = "neutral" if C < MONO_THRESHOLD else "CHROMATIC"
        print(f"  {c['share']*100:5.1f}%  {c['hex']}  oklch({L:.3f} {C:.3f} {H:5.1f})  {kind:<10}  {contrast(c['hex'], '#FFFFFF'):5.2f}:1   {contrast(c['hex'], '#0A0A0A'):5.2f}:1")
    neutrals = [c for c in colours if c["oklch"][1] < MONO_THRESHOLD]
    chroma = [c for c in colours if c["oklch"][1] >= MONO_THRESHOLD]
    if neutrals:
        print(f"  → 60% (dominant neutral) candidate: {neutrals[0]['hex']}")
    if chroma:
        vivid = max(chroma, key=lambda c: c["oklch"][1])
        print(f"  → 10% accent candidate (most vivid): {vivid['hex']}  (check ≥ 4.5:1 for text, ≥ 3:1 for UI/large text)")
        if len(chroma) > 1:
            print(f"  → other brand hues present: {', '.join(c['hex'] for c in chroma if c is not vivid)}  (secondary / illustration / data colours)")
    chroma_share = sum(c["share"] for c in chroma)
    if chroma_share < 0.05:
        print("  ⚑ Effectively MONOCHROME (< 5% chromatic pixels): build a value system with `python3 palette.py <hex> --mono`")


def main(argv):
    if not argv or argv[0] in ("-h", "--help"):
        print(__doc__)
        return 1
    k = int(argv[argv.index("--k") + 1]) if "--k" in argv else 6
    css = argv[argv.index("--css") + 1] if "--css" in argv else None
    ignore_bg = "--ignore-bg" in argv
    skip = {argv.index(f) + 1 for f in ("--k", "--css") if f in argv}
    files = [a for i, a in enumerate(argv) if not a.startswith("--") and i not in skip]
    combined = []
    for f in files:
        if not os.path.isfile(f):
            print(f"✗ not found: {f}")
            continue
        if f.lower().endswith(".svg"):
            print(f"✗ {f}: SVG. Rasterize first (node capture.mjs render {f} out.png --size 800x800)")
            continue
        cols = analyse(f, k, ignore_bg)
        report(f"{f}", cols)
        combined.extend(cols)
    if len(files) > 1 and combined:
        merged = []
        for c in sorted(combined, key=lambda c: c["share"], reverse=True):
            if not any(oklab_dist(m["oklch"], c["oklch"]) < 0.05 for m in merged):
                merged.append(dict(c))
        report("Across all assets (colours that recur are the brand; one-offs are photo content)", merged[:k])
    if css and combined:
        print(f"\n:root {{")
        for i, c in enumerate(sorted(combined, key=lambda c: c["share"], reverse=True)[:k], 1):
            L, C, H = c["oklch"]
            print(f"  --{css}-{i}: oklch({L:.3f} {C:.3f} {H:.1f}); /* {c['hex']} */")
        print("}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
