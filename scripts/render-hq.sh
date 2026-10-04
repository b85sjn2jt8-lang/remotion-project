#!/usr/bin/env bash
# High-quality 1920x1080 render for the store-display spots.
#   scripts/render-hq.sh <CompositionId> <output.mp4>
# 1) Remotion renders a ProRes 4444 mezzanine at native 1920x1080 (no scaling).
# 2) ffmpeg encodes H.264 High, yuv420p (BT.709, TV range), 30 fps, two-pass
#    ~18 Mbps (max 20 Mbps) by default, preset slow. VBITRATE=15.5M VMAXRATE=18M keeps
#    a 15s spot under 30 MiB for upload. A very light temporal luma dither
#    (invisible on detail) stops banding in the soft pink gradients.
set -euo pipefail
COMP="$1"; OUT="$2"; OUT_ABS="$(realpath -m "$OUT")"
BROWSER="${BROWSER:-/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell}"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
MEZZ="$TMP/mezzanine.mov"

npx remotion render "$COMP" "$MEZZ" --codec=prores --prores-profile=4444 \
  --scale=1 --browser-executable="$BROWSER" --log=error

VF="scale=1920:1080:flags=lanczos:out_color_matrix=bt709:out_range=tv,noise=c0s=2:c0f=t,format=yuv420p"
X264="-c:v libx264 -preset slow -profile:v high -level:v 4.2 -b:v ${VBITRATE:-18M} -maxrate ${VMAXRATE:-20M} -bufsize 30M -g 30 -bf 2"
COLOR="-color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv"
( cd "$TMP" && ffmpeg -v error -y -i "$MEZZ" -vf "$VF" $X264 $COLOR -r 30 -an -pass 1 -f mp4 /dev/null )
( cd "$TMP" && ffmpeg -v error -y -i "$MEZZ" -vf "$VF" $X264 $COLOR -r 30 -an -pass 2 -movflags +faststart "$OUT_ABS" )
