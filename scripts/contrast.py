#!/usr/bin/env python3
"""WCAG 2.x contrast checker for design tokens.

Usage:
  python3 contrast.py "#111111" "#FACC15"            # one pair
  python3 contrast.py "#111111" "#FACC15" "#FFFFFF" "#6B7280"   # several pairs (fg bg fg bg ...)

Thresholds (WCAG 2.1/2.2):
  1.4.3  Normal text AA  >= 4.5:1
  1.4.3  Large text AA   >= 3:1   (>= 24px regular, or >= 18.66px / 14pt bold)
  1.4.11 UI components & graphics (borders, icons, focus rings) >= 3:1
  1.4.6  Normal text AAA >= 7:1
"""
import sys


def _channel(v: float) -> float:
    return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4


def luminance(hex_color: str) -> float:
    h = hex_color.strip().lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    if len(h) != 6:
        raise ValueError(f"Not a 3- or 6-digit hex color: {hex_color}")
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    return 0.2126 * _channel(r) + 0.7152 * _channel(g) + 0.0722 * _channel(b)


def ratio(a: str, b: str) -> float:
    hi, lo = sorted((luminance(a), luminance(b)), reverse=True)
    return (hi + 0.05) / (lo + 0.05)


def verdict(r: float) -> str:
    ok = lambda x: "PASS" if r >= x else "FAIL"
    return (f"normal text AA {ok(4.5)} | large text AA {ok(3)} | "
            f"UI/graphics {ok(3)} | normal text AAA {ok(7)}")


def main(argv):
    if len(argv) < 2 or len(argv) % 2:
        print(__doc__)
        return 1
    for fg, bg in zip(argv[0::2], argv[1::2]):
        r = ratio(fg, bg)
        print(f"{fg} on {bg}: {r:.2f}:1  ->  {verdict(r)}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
