#!/usr/bin/env bash
# Builds a fully static copy of the site into ./out for Netlify drag-and-drop.
#
# Drag-and-drop uploads have no build step and no Next.js runtime, so the site
# must be plain HTML/CSS/JS. This script makes three temporary changes and
# reverts all of them on exit (including on failure, via the trap):
#
#   1. /api/submit is moved aside. Route handlers need a server, so it cannot
#      be exported. The forms fall back to their prefilled mailto link, which
#      BuyerForm already renders, so enquiries still reach the inbox.
#   2. next.config.ts is swapped for an export config. `next build` has no
#      --config flag in Next 16, so the file itself must be replaced.
#      Image Optimization is unsupported with the default loader, hence
#      images: { unoptimized: true } — originals are served from /public.
#   3. `export const dynamic = "force-static"` is prepended to sitemap.ts and
#      robots.ts, which output: export requires. Both are pure functions over
#      local content, so making them static changes nothing about their output.
set -euo pipefail
cd "$(dirname "$0")/.."

restore_cfg=0
restore_api=0
patched_files=()

cleanup() {
  local status=$?
  if [ "$restore_cfg" = 1 ]; then
    mv -f .next.config.ts.bak next.config.ts
  fi
  if [ "$restore_api" = 1 ]; then
    # Recreate the parent dir: it is removed below so Next does not emit an
    # empty route tree, and without this the restore would fail.
    mkdir -p src/app/api
    mv -f .api-submit.bak src/app/api/submit
  fi
  for f in ${patched_files[@]+"${patched_files[@]}"}; do
    [ -f "$f.bak" ] && mv -f "$f.bak" "$f"
  done
  if [ "$status" = 0 ]; then
    echo
    echo "==> Done. Upload the ./out folder to Netlify drag-and-drop."
  else
    echo
    echo "==> Build failed. Project files have been restored." >&2
  fi
  return $status
}
trap cleanup EXIT

echo "==> Moving /api/submit aside (route handlers need a server)"
if [ -d src/app/api/submit ]; then
  mv src/app/api/submit .api-submit.bak
  restore_api=1
  rmdir src/app/api 2>/dev/null || true
fi

echo "==> Forcing sitemap/robots to static"
for f in src/app/sitemap.ts src/app/robots.ts; do
  if [ -f "$f" ] && ! grep -q 'force-static' "$f"; then
    cp "$f" "$f.bak"
    patched_files+=("$f")
    printf 'export const dynamic = "force-static";\n\n' | cat - "$f" > "$f.tmp"
    mv "$f.tmp" "$f"
  fi
done

echo "==> Swapping in the static-export config"
cp next.config.ts .next.config.ts.bak
restore_cfg=1
cat > next.config.ts <<'CFG'
import type { NextConfig } from "next";

// Temporary static-export config written by scripts/build-static.sh.
// The real config is restored when that script exits.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
CFG

echo "==> Building static export"
rm -rf out
npx next build
