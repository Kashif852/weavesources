/**
 * Turns the supplied source media in ./content into web-ready files in
 * ./public/images and ./public/media.
 *
 *   node scripts/prepare-media.mjs
 *
 * Sources are matched by their "Image N —" / "Video N —" prefix, so the
 * descriptive part of the filename can change. Every output has a descriptive
 * name; product crops are named product-<slug>.jpg so the <Photo> slot picks
 * them up with no code change.
 *
 * All supplied images are AI-generated editorial visuals. See
 * public/images/CREDITS.md — they must stay labelled as illustrations.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "content");
const IMG = path.join(ROOT, "public", "images");
const MEDIA = path.join(ROOT, "public", "media");

const files = fs.readdirSync(SRC);
const source = (prefix) => {
  const f = files.find((x) => x.startsWith(`${prefix} `) || x.startsWith(`${prefix}—`));
  if (!f) throw new Error(`Missing source for "${prefix}" in ./content`);
  return path.join(SRC, f);
};

// [source, output name, optional crop {left, top, width, height} in source px]
const jobs = [
  ["Image 1", "mfg-weaving-hall"],
  ["Image 2", "mfg-yarn-and-weaving"],
  ["Image 3", "mfg-dyeing-and-finishing"],
  ["Image 4", "mfg-quality-inspection"],
  ["Image 5", "mfg-stitching-and-hemming"],
  ["Image 6", "mfg-packing-and-export"],
  ["Image 7", "category-bath-hand-towels"],
  ["Image 8", "category-hotel-hospitality-towels"],
  ["Image 9", "category-beach-pool-towels"],
  ["Image 10", "category-kitchen-utility-textiles"],
  ["Image 11", "category-bathrobes-coordinated-sets"],
  ["Image 12", "texture-cotton-terry"],
  ["Image 13", "sourcing-sample-review"],

  // Product views: distinct regions of the category shots, so related
  // products in a category never show the identical frame.
  ["Image 7", "product-cotton-bath-towels", { left: 280, top: 420, width: 1400, height: 1100 }],
  ["Image 7", "product-coordinated-towel-sets"],
  ["Image 8", "product-hotel-towel-sets"],
  ["Image 9", "product-cabana-beach-towels", { left: 40, top: 100, width: 1500, height: 1500 }],
  ["Image 9", "product-pool-resort-towels", { left: 560, top: 720, width: 1296, height: 1450 }],
  ["Image 10", "product-kitchen-tea-towels", { left: 0, top: 380, width: 970, height: 1200 }],
  ["Image 10", "product-waffle-weave-cloths", { left: 990, top: 270, width: 866, height: 920 }],
  ["Image 10", "product-bar-mops", { left: 980, top: 980, width: 876, height: 1040 }],
  ["Image 11", "product-terry-bathrobes", { left: 60, top: 330, width: 1796, height: 1940 }],
];

fs.mkdirSync(IMG, { recursive: true });
fs.mkdirSync(MEDIA, { recursive: true });

for (const [prefix, name, crop] of jobs) {
  let img = sharp(source(prefix)).rotate();
  if (crop) img = img.extract(crop);
  const out = path.join(IMG, `${name}.jpg`);
  await img
    .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 74, mozjpeg: true, progressive: true })
    .toFile(out);
  console.log(`${name}.jpg  ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
}

// Videos are already H.264 at 1280×720 and ~4 MB; they are copied as-is
// (no ffmpeg dependency) and play muted on loop. Posters come from
// content/posters/*.png when present (macOS: `qlmanage -t -s 1280`).
const videos = [
  ["Video 1", "manufacturing-loop"],
  ["Video 2", "sample-approval-loop"],
];
for (const [prefix, name] of videos) {
  fs.copyFileSync(source(prefix), path.join(MEDIA, `${name}.mp4`));
  const poster = path.join(SRC, "posters", `${name}.png`);
  if (fs.existsSync(poster)) {
    await sharp(poster).jpeg({ quality: 72, mozjpeg: true }).toFile(path.join(MEDIA, `${name}.jpg`));
  }
  console.log(`${name}.mp4`);
}
