# WeaveSources buyer pack

| File | What it is | Format |
|---|---|---|
| `WeaveSources-Buyer-Catalog.pdf` | Product catalog, 19 pages | A4 portrait |
| `WeaveSources-Buyer-Presentation.pdf` | Sales presentation, 10 slides | 16:9 (13.33 × 7.5 in) |

Both are generated from the website's own content, so products, contacts and
process steps never drift from what weavesources.com says.

## Editing

| To change | Edit |
|---|---|
| Products, specs, categories, images | `src/content/products.ts` (same file the website uses) |
| Contact details, team, offices, terms (MOQ, sample policy, Incoterms…) | `src/content/site.ts` |
| Order steps, QC checkpoints, roles | `src/content/process.ts` |
| Partner certificates | `src/content/partners.ts` |
| Pack-only copy: buyer problems, private label, low-risk steps, “what we won't tell you” | `src/content/buyer-pack.ts` |
| Catalog layout | `src/app/print/catalog/page.tsx` |
| Presentation layout | `src/app/print/presentation/page.tsx` |

Preview while editing: `npm run dev`, then open
`http://localhost:3000/print/catalog` or `/print/presentation`.

## Regenerating the PDFs

```bash
./scripts/make-buyer-pack.sh             # build, check, print
SKIP_BUILD=1 ./scripts/make-buyer-pack.sh
```

Before printing, the script opens each layout with `?check` and **fails if any
text runs off a page, is clipped, or an image doesn't load**. Needs Google Chrome.

When a value in `site.ts` or `products.ts` changes from `null` to a verified
value, the PDFs pick it up automatically — e.g. setting `terms.moq` replaces
“Depends on product, colour and branding” on every product page and marks it
“Confirmed”.

## Before sending to buyers — information we need

Nothing below has been invented; the pack says “confirmed at quotation” or
leaves it out until you supply it.

**Commercial terms** (`site.ts → terms`)
- [ ] Minimum order quantity policy (per product / colour / size)
- [ ] Sample policy — cost, who pays courier, whether credited against the first order
- [ ] Typical sample and production lead times
- [ ] Incoterms offered (e.g. FOB Karachi, CIF/DDP on request)
- [ ] Payment terms
- [ ] Whether small trial orders are genuinely possible, and from what quantity

**Company** (`site.ts → company`)
- [ ] Legal company name and registration number (U.S. and/or Pakistan entity)
- [ ] Year founded
- [ ] Company LinkedIn page; personal LinkedIn URLs for both founders

**Manufacturing partners** (`partners.ts`)
- [ ] At least one verified partner per active category (location, products, processes)
- [ ] Certificates actually held by those partners (OEKO-TEX®, BSCI/amfori, ISO, GOTS…) with holder, issuer, scope, facility and validity
- [ ] Which partners agree to be named to buyers

**Photography** — all current images are AI-generated illustrations and are
labelled “Illustrative image” in both PDFs. Replace with real sample photos
(same file names in `public/images/`, see `docs/photography-brief.md`), then
remove the labels for those images only. Priority order:
1. `product-cotton-bath-towels`, `product-hotel-bath-towels`, `product-hand-towels`, `product-face-towels`, `product-bath-sheets`
2. `product-hotel-towel-sets`, `product-coordinated-towel-sets`, `product-spa-towels`, `product-gym-towels`
3. Cover images: `category-bath-hand-towels` (catalog), `category-hotel-hospitality-towels` (presentation)
4. A real photo of a branded sample (embroidered logo, woven label, packaging) for the private-label pages

**Proof** — add only when real and permitted
- [ ] Buyer testimonials or case studies (`site.ts → testimonials / caseStudies`)
- [ ] A sample specification sheet or QC report (anonymised) to show what buyers receive

The trade figure on slide 9 (US$337M of Pakistan’s US$1.01bn cotton terry towel
exports went to the U.S. in 2023) is UN Comtrade national data, labelled as such —
not WeaveSources’ sales. Update it in `src/content/markets.ts`.
