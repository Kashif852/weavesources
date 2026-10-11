#!/usr/bin/env bash
# Regenerates the downloadable product catalog PDF from /catalog/print.
#
#   ./scripts/make-catalog.sh            # builds, serves, prints
#   SKIP_BUILD=1 ./scripts/make-catalog.sh
#
# Product data comes from src/content/products.ts — edit there, then rerun
# and commit public/catalog/*.pdf. Needs Google Chrome (or set CHROME=…).
set -euo pipefail
cd "$(dirname "$0")/.."

OUT="public/catalog/weavesources-towel-sourcing-catalog.pdf"
PORT="${PORT:-3123}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

[ -x "$CHROME" ] || { echo "Chrome not found at: $CHROME (set CHROME=...)" >&2; exit 1; }
[ "${SKIP_BUILD:-0}" = 1 ] || npx next build

npx next start -p "$PORT" >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT

for _ in $(seq 1 60); do
  curl -sf "http://localhost:$PORT/catalog/print" >/dev/null && break
  sleep 0.5
done

mkdir -p "$(dirname "$OUT")"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw --virtual-time-budget=20000 \
  --print-to-pdf="$OUT" "http://localhost:$PORT/catalog/print" 2>/dev/null

echo "==> Wrote $OUT ($(du -h "$OUT" | cut -f1))"
