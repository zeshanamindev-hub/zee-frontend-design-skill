#!/usr/bin/env bash
# make-gif.sh: convert a video clip into a high-quality, small animated GIF (ffmpeg two-pass palette).
#
# Usage:
#   bash make-gif.sh input.mp4 output.gif [width=800] [fps=12] [start=0] [duration=full]
# Examples:
#   bash make-gif.sh demo.mp4 demo.gif                 # 800px wide, 12 fps
#   bash make-gif.sh demo.mov hero.gif 600 15 2 5      # 600px, 15 fps, from 2s, 5s long
#
# Also writes an MP4 next to the GIF (usually much smaller, best for websites):
#   <output>.web.mp4  →  use with <video autoplay muted loop playsinline>
# Requires: ffmpeg (https://ffmpeg.org). macOS: brew install ffmpeg · Windows: winget install ffmpeg
set -euo pipefail

if [ $# -lt 2 ]; then
  sed -n '2,13p' "$0"; exit 1
fi
command -v ffmpeg >/dev/null 2>&1 || { echo "ffmpeg not found. Install it first (see header)."; exit 1; }

IN="$1"; OUT="$2"; WIDTH="${3:-800}"; FPS="${4:-12}"; START="${5:-0}"; DUR="${6:-}"
[ -f "$IN" ] || { echo "Input not found: $IN"; exit 1; }

TRIM=(-ss "$START"); [ -n "$DUR" ] && TRIM+=(-t "$DUR")
TMPD="$(mktemp -d)"; trap 'rm -rf "$TMPD"' EXIT
PALETTE="$TMPD/palette.png"
FILTERS="fps=${FPS},scale=${WIDTH}:-1:flags=lanczos"

# Pass 1: build an optimized 256-color palette from the clip
ffmpeg -v error -y "${TRIM[@]}" -i "$IN" -vf "${FILTERS},palettegen=stats_mode=diff" "$PALETTE"
# Pass 2: render the GIF with that palette (dithering keeps gradients smooth, rectangles diff keeps size down)
ffmpeg -v error -y "${TRIM[@]}" -i "$IN" -i "$PALETTE" \
  -lavfi "${FILTERS}[x];[x][1:v]paletteuse=dither=sierra2_4a:diff_mode=rectangle" -loop 0 "$OUT"

# Web-friendly MP4 alternative (H.264, no audio, even dimensions, fast start)
MP4="${OUT%.*}.web.mp4"
ffmpeg -v error -y "${TRIM[@]}" -i "$IN" -an -vf "fps=${FPS},scale=${WIDTH}:-2:flags=lanczos" \
  -c:v libx264 -preset veryfast -crf 26 -pix_fmt yuv420p -movflags +faststart "$MP4"

size() { du -h "$1" | cut -f1; }
echo "GIF: $OUT ($(size "$OUT"))"
echo "MP4: $MP4 ($(size "$MP4"))  ← prefer this on websites"
