/**
 * Copy for the buyer pack: the printable catalog (/print/catalog) and the
 * sales presentation (/print/presentation). Both are rendered to PDF by
 * scripts/make-buyer-pack.sh into docs/buyer-pack/.
 *
 * Products come from products.ts, company facts from site.ts, process steps
 * from process.ts. This file holds only the narrative that is specific to the
 * pack. The same RULE applies as everywhere else: nothing here may claim a
 * customer, certificate, capacity, price, minimum or lead time that is not
 * verified. Where a value is unknown, say it is confirmed per order.
 */

export const pack = {
  edition: "2026 edition",
  catalogTitle: "Towel Sourcing Catalog",
  presentationTitle: "Your textile sourcing partner",
};

/** The problems US buyers describe, in their words, and how we answer each. */
export const buyerProblems = [
  {
    k: "01",
    problem: "The sample was right. The bulk order wasn't.",
    detail: "Weight, colour or size drift between sample and production, and there is no written reference to hold anyone to.",
    answer: "Your approved sample and a written specification with tolerances become the production reference.",
  },
  {
    k: "02",
    problem: "Answers are slow, vague, or change.",
    detail: "A 9–13 hour time difference, a different contact each order, and decisions buried in message threads.",
    answer: "One named contact, a U.S. office in Seattle and operations in Karachi. Replies within one business day.",
  },
  {
    k: "03",
    problem: "The specification has gaps.",
    detail: "GSM with no tolerance, colour with no reference, packaging decided last. Gaps become disputes.",
    answer: "We write every field that affects the towel into one document you own, before the sample is made.",
  },
  {
    k: "04",
    problem: "Private label is more than a logo.",
    detail: "Labels, packaging, artwork and U.S. labelling details have to be coordinated across several suppliers.",
    answer: "Branding, labels and packaging are specified with the towel and confirmed on the sample.",
  },
];

export const approach = [
  { t: "Clear specifications", d: "Fibre, weight, size, construction, colour, branding and packaging written down with tolerances. You own the document." },
  { t: "Supplier coordination", d: "We match your brief to independent Pakistani manufacturers that make that product, and tell you which one makes your order." },
  { t: "Customisation", d: "Colour to your reference, borders, logos, labels, set composition and retail packaging — confirmed on the sample." },
  { t: "Transparent communication", d: "A named contact, written updates at each stage, and the check results before goods ship." },
];

/** Private-label options. Offered only where the partner for your order supports them. */
export const privateLabel = [
  { t: "Logo", d: "Embroidered, woven border or jacquard, depending on the product and volume." },
  { t: "Colour", d: "Dyed to your Pantone or physical swatch; yarn-dyed stripes for beach and kitchen." },
  { t: "Construction", d: "Border style, pile, size, hem and the composition of a set." },
  { t: "Labels", d: "Brand, care, size and fibre-content labels; swing tags and barcodes to your artwork." },
  { t: "Packaging", d: "Bulk carton, bundled and banded, poly-bagged, retail-ready or gift-boxed." },
  { t: "Product development", d: "Start from a towel you already sell, a competitor’s sample, or a written brief." },
];

/**
 * U.S. labelling points buyers ask about. General guidance only — the buyer
 * remains responsible for compliance of their own product.
 */
export const packagingFormats = [
  "Bulk export carton, with carton marks to your specification",
  "Bundled and banded (e.g. 10 or 12 pieces)",
  "Individually poly-bagged, with barcode stickers",
  "Retail-ready: belly bands, header cards or printed sleeves",
  "Coordinated sets, banded or boxed",
  "Gift box",
  "Rolled and banded (beach towels)",
];

export const usLabelling = [
  "Fibre content, country of origin and the dealer’s identity (name or RN number) — Textile Fiber Products Identification Act",
  "Care instructions — FTC Care Labeling Rule",
  "Barcodes, swing tags and carton marks to your retailer’s requirements",
];

export const artworkChecklist = [
  "Logo as a vector file (AI, EPS, SVG or PDF)",
  "Colour references: Pantone codes or a physical swatch",
  "Label wording, size and position",
  "Packaging dieline or format, and quantity per pack",
  "Barcodes / UPCs, if retail-ready",
];

/** The seven stages of an order, for the presentation. */
export const howItWorks = [
  { t: "Inquiry", d: "You share the product, use and rough quantity." },
  { t: "Requirements", d: "We turn it into a written specification." },
  { t: "Quotation", d: "Confirmed with a suitable partner, in writing." },
  { t: "Sample approval", d: "You wash it, measure it, approve or adjust." },
  { t: "Production", d: "Runs against the approved sample." },
  { t: "Quality checks", d: "In-line by the partner; pre-shipment against your spec." },
  { t: "Shipment", d: "Packed as specified, with documents, on agreed Incoterms." },
];

/** Low-risk first step. Each stage is a point where the buyer can stop. */
export const lowRisk = [
  { t: "Share a brief", d: "No commitment. Rough answers are fine.", gate: "You decide whether to continue" },
  { t: "Receive a written spec & quote", d: "Every field and tolerance, confirmed with the partner.", gate: "Nothing is made yet" },
  { t: "Evaluate a sample", d: "Cost and timing agreed in writing before it is made.", gate: "Approve, adjust or walk away" },
  { t: "Place a trial order", d: "A first order sized to the partner’s minimum for your specification, where the partner supports it.", gate: "Checked before it ships" },
  { t: "Reorder to the same spec", d: "Repeat orders cite the same specification and reference sample.", gate: "Consistency you can check" },
];

/** What a buyer receives in writing. */
export const inWriting = [
  "Written specification with tolerances",
  "Quotation confirmed with the manufacturing partner",
  "The name of the partner making your order",
  "Sample approval record",
  "Pre-shipment check results",
  "Commercial invoice, packing list and transport documents",
];

/** Honest limits, stated up front. */
export const whatWeDont = [
  "We are not a manufacturer and do not own factories.",
  "We do not publish prices, minimums or lead times before we see a specification.",
  "We do not present a partner’s certificates as our own.",
  "Images in this pack are illustrative, not photographs of your future order.",
];

/** Fields a buyer should send with an inquiry. */
export const inquiryFields = [
  { k: "Product", v: "Catalog reference (e.g. WS-HT-01) or description" },
  { k: "Use", v: "Hotel, retail, spa, gym, kitchen, promotional…" },
  { k: "Size & weight", v: "Target dimensions and GSM, or a towel to match" },
  { k: "Colour", v: "Pantone, swatch or ‘white’" },
  { k: "Branding", v: "Logo method, labels, private label" },
  { k: "Packaging", v: "Bulk, bundled, poly-bagged or retail" },
  { k: "Quantity", v: "Per size and colour, or annual volume" },
  { k: "Destination", v: "Country, port or warehouse" },
  { k: "Documents", v: "Any test standard or compliance document you need" },
];
