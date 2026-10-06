# WeaveSources — product photography brief

One campaign, one look. Every image should feel like it came from the same day, the same table, the same light.

## How the site uses photos

Put a file in `public/images/` with the slot name below (`.jpg`, `.png`, `.webp` or `.avif`) and rebuild.
The photo replaces the illustration in that spot automatically — no code changes, no layout changes.
The site serves it as AVIF/WebP at the right size for each screen.

Export at the size listed, sRGB, high-quality JPEG (~85). Keep the subject centred with some breathing room: cards crop differently on phone and desktop.

| Slot (file name) | Where it appears | Shot | Export |
|---|---|---|---|
| `hero` | Home page, top right | Three folded white/ivory bath towels stacked, seen from a slight 3/4 angle | 2000 × 2000 |
| `product-hotel-bath-towels` | Collection card, product page, related tiles | Two or three folded white bath towels, stacked | 1600 × 2000 |
| `product-bath-sheets` | 〃 | Folded bath sheets — visibly larger fold than the bath towel | 1600 × 2000 |
| `product-hand-towels` | 〃 | Folded hand towels, matched set feel | 1600 × 2000 |
| `product-face-towels` | 〃 | Folded washcloths/face towels, small stack | 1600 × 2000 |
| `product-spa-towels` | 〃 | Folded spa towels in a muted colour | 1600 × 2000 |
| `product-gym-towels` | 〃 | Folded dark gym towels | 1600 × 2000 |
| `folded-stack` | "What you actually receive", Sample page | A neat stack of folded towels, white and stone | 1600 × 1300 |
| `sample-pair` | "Feel it before you buy it" band | Two folded samples, one slightly overlapping the other, with a plain card tag | 1600 × 1200 |
| `detail-terry` | Quality: "Approved sample = Production" | Macro of terry loops, raking light so loops cast tiny shadows | 1200 × 900 |
| `detail-border` | *(reserved)* | Macro of a dobby border | 1200 × 900 |
| `detail-hem` | *(reserved)* | Macro of a stitched hem and towel edge | 1200 × 900 |

The product pages already say "Product photography — replace with real sample photos" next to the illustration; that note disappears once the photo is in.

## Look

- **Light:** soft natural daylight from one side (window light, left), a white bounce on the other. No flash glare, no HDR.
- **Background:** warm off-white or pale stone (close to the site's `#f5f2ec` / `#ece6db`), a matte surface — linen, plaster or uncoated paper. No marble, no props that suggest a hotel we don't run.
- **Camera:** same height and angle for every product shot (slight 3/4, about 30° down). 50–100mm equivalent so proportions stay true.
- **Colour:** white towels must read as white, not blue or yellow. Shoot with a grey card; keep white balance the same across the set.
- **Styling:** real folds with slight irregularity. Visible loops, visible hem stitching, borders facing the camera. Lint-roll before shooting; don't steam flat.
- **No:** people, hands, hotel rooms, factories, packaging with other brands, AI-generated or 3D-rendered towels.

## Honesty

- Best: photograph your partners' **actual samples**. Then the image is evidence, and you can say so.
- Acceptable: licensed stock used as general product imagery. Keep the licence and source. Don't present stock as your production, your factory or your customers.
- Never use images of factories, people or places as if they were your operations unless they are.

Record each image's source and licence in `public/images/CREDITS.md`.
