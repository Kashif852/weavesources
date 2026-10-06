# WeaveSources — website

A Next.js 16 (App Router) site for WeaveSources, a B2B towel sourcing brand.
41 static pages, one API route, no client-side data stores, no trackers.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Before launch — fill in the truth

Every company fact lives in **`src/content/site.ts`**. Anything left `null` or empty
renders as a dashed "◌ placeholder" chip (or the block hides). Nothing on the site
claims a fact that isn't in that file.

| What | Where | Shows on |
|---|---|---|
| Business email, phone, WhatsApp, LinkedIn/Instagram/Facebook | `site.contact` | Footer, Contact, Buyer confidence, mobile WhatsApp button |
| Legal name, registration/NTN, registered address, year founded | `site.company` | Footer, Buyer confidence, Contact |
| Where the business operates (one honest sentence) | `site.company.operations` | Contact |
| Team: name, role, location, LinkedIn, photo (`/public/team/…`) | `site.team` | Home, About, Buyer confidence |
| MOQ, sample policy, lead time, Incoterms, payment terms | `site.terms` | Product pages, Sample page, Buyer confidence |
| Verified certificates (with the **holder's** name and date checked) | `site.certifications` | Buyer confidence |
| Named, verifiable testimonials | `site.testimonials` | Home (replaces the "reviews you can verify" block) |
| Regions: mark a market `partner`/"Business development" only if a real person works there | `site.regions` | Home & About map |
| Partner-confirmed GSM / sizes / construction / MOQ per product | `src/content/products.ts → confirmed` | Product pages (else "Available according to specification") |
| Real product photography | drop files into `public/images/` — see `docs/photography-brief.md` | Hero, collection, product pages, sample sections |

### Process commitments the site makes — keep them true

The copy promises these as how WeaveSources operates. Change the wording in
`src/app/page.tsx`, `src/content/process.ts` and `src/app/quality/page.tsx` if any isn't true:

- A physical sample is approved before production of any new product
- The buyer gets a written specification
- The buyer is told which manufacturing partner makes their order
- One named contact per order
- Replies within one business day (`site.contact.hours`)
- Pre-shipment check results are shared before shipment; partner changes need buyer approval
- "Vetted" manufacturing partners

Legal pages (`/legal/*`) are drafts — have them reviewed.

## Brand

All logo files are in `public/brand/` (outlined SVG — no fonts needed):

| File | Use |
|---|---|
| `weavesources-primary-on-light.svg` / `-on-dark.svg` | Stacked: mark, wordmark, "Global Textile Sourcing". Letterheads, business cards, packaging |
| `weavesources-horizontal-on-light.svg` / `-on-dark.svg` | Website, invoices, shipping documents, email signatures |
| `weavesources-mark-on-light.svg` / `-on-dark.svg` | Compact mark: labels, stamps, small spaces |
| `weavesources-tile-dark.svg` / `-tile-light.svg`, `weavesources-avatar-512.png` | LinkedIn/social avatar, app icon |

Favicon: `src/app/icon.svg` and `src/app/apple-icon.png`. Regenerate everything with
`python3 scripts/make_logo.py` (needs `pip install fonttools brotli`).

The mark is a 3×3 plain weave turned 45° — threads passing over and under each other.
Keep clear space around it of at least half the mark's height; don't recolour beyond ink (`#1d1c1a`) and paper (`#f5f2ec`).

## Forms

`/sample` and `/brief` POST to `/api/submit`, which forwards JSON to
**`FORM_WEBHOOK_URL`** (Zapier, Make, Formspree, a CRM webhook, Slack…).
Without it, submissions are **not** silently swallowed: the form tells the buyer it
couldn't send and offers a pre-filled email (if `site.contact.email` is set) and
"copy my details". A hidden honeypot field filters basic bots.

The specification builder (`/specification`) passes the spec to both forms via the URL,
so a configured towel arrives with the request.

## Deploy (Netlify or Vercel)

Both detect Next.js automatically. Set `FORM_WEBHOOK_URL` in the site's environment
variables and point `weavesources.com` at the deployment. Update `site.url` if the
domain differs.

## Structure

```
src/content/      site facts, products, industries, process, resources, spec options
src/components/   SpecCard (signature), SupplyTimeline, SpecBuilder, BuyerForm, sections, ui
src/app/          routes; sitemap.ts, robots.ts, icon.svg
scripts/make-map.mjs  regenerates public/world-dots.svg + marker positions
```

Design tokens (colours, fonts) are in `src/app/globals.css` under `@theme`.
Fonts are self-hosted via Fontsource (Instrument Sans, IBM Plex Mono).
