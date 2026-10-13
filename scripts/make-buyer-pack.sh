#!/usr/bin/env bash
# Renders the buyer pack — catalog and presentation — to PDF.
#
#   ./scripts/make-buyer-pack.sh            # builds, serves, checks, prints
#   SKIP_BUILD=1 ./scripts/make-buyer-pack.sh
#
# Sources: src/app/print/catalog, src/app/print/presentation, with content
# from src/content/{products,buyer-pack,site,process}.ts. Output goes to
# docs/buyer-pack/; the catalog is also copied to $SITE_PDF, the file the
# website offers for download. Each page is first opened with ?check; the script stops
# if any text spills off a page or is clipped, or an image fails to load.
# Needs Google Chrome (or set CHROME=…).
set -euo pipefail
cd "$(dirname "$0")/.."

OUT_DIR="docs/buyer-pack"
SITE_PDF="public/catalog/weavesources-towel-sourcing-catalog.pdf"
PORT="${PORT:-3124}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
BASE="http://localhost:$PORT"

[ -x "$CHROME" ] || { echo "Chrome not found at: $CHROME (set CHROME=...)" >&2; exit 1; }
[ "${SKIP_BUILD:-0}" = 1 ] || npx next build

npx next start -p "$PORT" >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT

for _ in $(seq 1 60); do
  curl -sf "$BASE/print/catalog" >/dev/null && break
  sleep 0.5
done

mkdir -p "$OUT_DIR"
status=0
for doc in catalog:WeaveSources-Buyer-Catalog presentation:WeaveSources-Buyer-Presentation; do
  route="${doc%%:*}"; file="$OUT_DIR/${doc#*:}.pdf"

  report=$("$CHROME" --headless=new --disable-gpu --window-size=1400,1000 --virtual-time-budget=15000 \
    --dump-dom "$BASE/print/$route?check" 2>/dev/null | sed -n 's/.*<pre id="qa">\(.*\)<\/pre>.*/\1/p')
  if [ -z "$report" ]; then
    echo "!! $route: layout check did not run" >&2; status=1
  elif ! echo "$report" | grep -q '"problems":\[\],"brokenImages":\[\]'; then
    echo "!! $route: layout problems: $report" >&2; status=1
  else
    echo "==> $route: layout check passed ($(echo "$report" | sed 's/.*"sheets":\([0-9]*\).*/\1/') pages)"
  fi

  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --run-all-compositor-stages-before-draw --virtual-time-budget=20000 \
    --print-to-pdf="$file" "$BASE/print/$route" 2>/dev/null
  echo "==> Wrote $file ($(du -h "$file" | cut -f1))"
done
if [ $status = 0 ]; then
  cp "$OUT_DIR/WeaveSources-Buyer-Catalog.pdf" "$SITE_PDF"
  echo "==> Copied catalog to $SITE_PDF"
else
  echo "!! Layout check failed; $SITE_PDF left unchanged" >&2
fi
exit $status
