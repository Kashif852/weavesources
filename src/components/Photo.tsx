import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Photo slot. Drop a file into /public/images/<slot>.(avif|webp|jpg|jpeg|png)
 * and it replaces the illustration fallback at the next build — no code change.
 * The photo fills the slot's existing container, so layout never changes.
 *
 * Slots and the shot list: docs/photography-brief.md
 */

const EXT = ["avif", "webp", "jpg", "jpeg", "png"];
const DIR = path.join(process.cwd(), "public", "images");

export const photoAlt: Record<string, string> = {
  hero: "Folded white cotton terry towels, stacked, in soft daylight",
  "folded-stack": "A stack of folded white and stone cotton towels",
  "sample-pair": "Two folded cotton towel samples",
  "detail-terry": "Close-up of cotton terry loops",
  "detail-border": "Close-up of a woven dobby border on a white towel",
  "detail-hem": "Close-up of a towel's stitched hem",
  "product-hotel-bath-towels": "Folded white hotel bath towels",
  "product-bath-sheets": "Folded bath sheets in a neutral tone",
  "product-hand-towels": "Folded hand towels",
  "product-face-towels": "Folded face towels and washcloths",
  "product-spa-towels": "Folded spa towels in a muted green tone",
  "product-gym-towels": "Folded charcoal gym towels",
};

function find(slot: string) {
  for (const e of EXT) {
    const f = path.join(DIR, `${slot}.${e}`);
    if (fs.existsSync(f)) return `/images/${slot}.${e}`;
  }
  return null;
}

export function hasPhoto(slot: string) {
  return find(slot) !== null;
}

export default function Photo({
  slot,
  sizes,
  fallback,
  priority = false,
  className = "",
}: {
  slot: string;
  sizes: string;
  fallback: ReactNode;
  priority?: boolean;
  className?: string;
}) {
  const src = find(slot);
  if (!src) return <>{fallback}</>;
  return (
    <Image
      src={src}
      alt={photoAlt[slot] ?? ""}
      fill
      sizes={sizes}
      priority={priority}
      quality={75}
      className={`object-cover ${className}`}
    />
  );
}
