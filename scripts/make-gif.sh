#!/usr/bin/env bash
# make-gif.sh: convert a video clip into a high-quality, small animated GIF (ffmpeg two-pass palette).
#
# Usage:
#   bash make-gif.sh input.mp4 output.gif [width=800] [fps=12] [start=0] [duration=full] [--max-mb 3]
# Examples:
#   bash make-gif.sh demo.mp4 demo.gif                       # 800px wide, 12 fps
#   bash make-gif.sh demo.mov hero.gif 600 15 2 5            # 600px, 15 fps, from 2s, 5s long
#   bash make-gif.sh demo.mp4 demo.gif 800 12 0 6 --max-mb 3 # shrink until the GIF is ≤ 3 MB
#
# --max-mb N: if the GIF is over budget, retries with a size ladder (lower fps → fewer colours →
#   smaller width; never below 8 fps / 320 px) until it fits. Uses gifsicle -O3 --lossy if installed.
#   Exits with code 3 if it still cannot fit: then shorten the clip, crop it, or use the MP4 instead.
#
# Also writes an MP4 next to the GIF (usually 5–10× smaller, best for websites):
#   <output>.web.mp4  →  use with <video autoplay muted loop playsinline>
# Requires: ffmpeg (https://ffmpeg.org). macOS: brew install ffmpeg · Windows: winget install ffmpeg
# Optional: gifsicle (brew install gifsicle · apt install gifsicle) for an extra 20–40% lossy squeeze.
set -euo pipefail

MAXMB=""; POS=()
while [ $# -gt 0 ]; do
  case "$1" in
    --max-mb) MAXMB="${2:-}"; shift 2 ;;
    --max-mb=*) MAXMB="${1#*=}"; shift ;;
    *) POS+=("$1"); shift ;;
  esac
done
set -- "${POS[@]+"${POS[@]}"}"
if [ $# -lt 2 ]; then sed -n '2,20p' "$0"; exit 1; fi
command -v ffmpeg >/dev/null 2>&1 || { echo "ffmpeg not found. Install it first (see header)."; exit 1; }

IN="$1"; OUT="$2"; WIDTH="${3:-800}"; FPS="${4:-12}"; START="${5:-0}"; DUR="${6:-}"
[ -f "$IN" ] || { echo "Input not found: $IN"; exit 1; }
TRIM=(-ss "$START"); [ -n "$DUR" ] && TRIM+=(-t "$DUR")
TMPD="$(mktemp -d)"; trap 'rm -rf "$TMPD"' EXIT

bytes() { wc -c < "$1" | tr -d ' '; }
human() { awk -v b="$1" 'BEGIN{ printf (b>=1048576? "%.2f MB" : "%.0f KB"), (b>=1048576? b/1048576 : b/1024) }'; }

# render_gif WIDTH FPS COLORS DITHER → writes $OUT
render_gif() {
  local w="$1" f="$2" colors="$3" dither="$4"
  local filters="fps=${f},scale=${w}:-1:flags=lanczos"
  # Pass 1: optimized palette from the clip; Pass 2: render with it (diff_mode=rectangle keeps frame deltas small)
  ffmpeg -v error -y "${TRIM[@]}" -i "$IN" -vf "${filters},palettegen=max_colors=${colors}:stats_mode=diff" "$TMPD/palette.png"
  ffmpeg -v error -y "${TRIM[@]}" -i "$IN" -i "$TMPD/palette.png" \
    -lavfi "${filters}[x];[x][1:v]paletteuse=dither=${dither}:diff_mode=rectangle" -loop 0 "$OUT"
}

render_gif "$WIDTH" "$FPS" 256 "sierra2_4a"
USED="${WIDTH}px · ${FPS}fps · 256 colours · sierra2_4a"

if [ -n "$MAXMB" ]; then
  LIMIT=$(awk -v m="$MAXMB" 'BEGIN{ printf "%d", m*1048576 }')
  W="$WIDTH"; F="$FPS"; COLORS=256; DITHER="sierra2_4a"; STEP=0
  while [ "$(bytes "$OUT")" -gt "$LIMIT" ] && [ $STEP -lt 12 ]; do
    STEP=$((STEP+1))
    case $STEP in
      1) F=$(( F>10 ? 10 : F )) ;;     # fewer frames: the biggest single saving for UI clips
      2) COLORS=128 ;;
      3) W=$(( W*85/100 )) ;;
      4) F=$(( F>8 ? 8 : F )) ;;
      5) COLORS=96 ;;
      6) W=$(( W*85/100 )) ;;
      7) COLORS=64 ;;
      *) W=$(( W*85/100 )) ;;
    esac
    [ "$W" -lt 320 ] && W=320
    render_gif "$W" "$F" "$COLORS" "$DITHER"
    USED="${W}px · ${F}fps · ${COLORS} colours · ${DITHER}"
    echo "  try $STEP: $USED → $(human "$(bytes "$OUT")")"
  done
  if [ "$(bytes "$OUT")" -gt "$LIMIT" ] && command -v gifsicle >/dev/null 2>&1; then
    gifsicle -O3 --lossy=80 "$OUT" -o "$TMPD/squeezed.gif" && mv "$TMPD/squeezed.gif" "$OUT"
    USED="$USED · gifsicle -O3 --lossy=80"
  fi
fi

# Web-friendly MP4 alternative (H.264, no audio, even dimensions, fast start)
MP4="${OUT%.*}.web.mp4"
ffmpeg -v error -y "${TRIM[@]}" -i "$IN" -an -vf "fps=${FPS},scale=${WIDTH}:-2:flags=lanczos" \
  -c:v libx264 -preset veryfast -crf 26 -pix_fmt yuv420p -movflags +faststart "$MP4"

echo "GIF: $OUT ($(human "$(bytes "$OUT")"))  [$USED]"
echo "MP4: $MP4 ($(human "$(bytes "$MP4")"))  ← prefer this on websites"
if [ -n "$MAXMB" ] && [ "$(bytes "$OUT")" -gt "$LIMIT" ]; then
  echo "✗ Still over the ${MAXMB} MB budget. Shorten the clip (duration), crop to the part that matters, or use the MP4."
  exit 3
fi
[ -n "$MAXMB" ] && echo "✓ within the ${MAXMB} MB budget"
exit 0
