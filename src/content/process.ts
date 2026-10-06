export const journey = [
  { n: "01", title: "Specification", body: "You describe the towel. We turn it into a written specification with every field that affects the product." },
  { n: "02", title: "Sample", body: "A manufacturing partner produces a sample to that specification. You hold it, wash it, use it." },
  { n: "03", title: "Approval", body: "Adjustments go into the specification. When you approve, that sample becomes the reference." },
  { n: "04", title: "Production", body: "Production runs against the approved reference — not a general standard or a verbal description." },
  { n: "05", title: "Quality check", body: "Before packing, finished goods are checked against your specification and the reference sample." },
  { n: "06", title: "Packing", body: "Packed as specified: per piece, bundle, carton or retail. Carton marks agreed in advance." },
  { n: "07", title: "Shipment", body: "Export documents are prepared and handed to your forwarder or ours, on the Incoterms we agreed." },
];

export const roles = [
  {
    key: "you",
    label: "You",
    sub: "The buyer",
    does: ["Set the requirement", "Approve the sample", "Own the specification"],
  },
  {
    key: "us",
    label: "WeaveSources",
    sub: "Sourcing partner",
    does: ["Write and maintain the specification", "Select and coordinate the manufacturer", "Coordinate quality checks and export", "Be your single point of contact"],
  },
  {
    key: "maker",
    label: "Manufacturing partner",
    sub: "Independent mill in Pakistan",
    does: ["Produce samples and orders", "Hold their own certifications", "Perform in-line production checks"],
  },
  {
    key: "freight",
    label: "Logistics partner",
    sub: "Forwarder / carrier",
    does: ["Move goods from port to destination", "Customs handling as agreed"],
  },
];

export const qcCheckpoints = [
  { k: "GSM", d: "Weight per square metre, against target and tolerance" },
  { k: "Dimensions", d: "Finished length and width, against tolerance" },
  { k: "Colour", d: "Compared to the approved sample under consistent light" },
  { k: "Construction", d: "Pile, border and hem match the reference" },
  { k: "Stitching", d: "Hems and borders secure, no loose threads" },
  { k: "Branding", d: "Logo or label position, size and finish" },
  { k: "Packing", d: "Packed, labelled and marked as specified" },
  { k: "Quantity", d: "Counts per size and colour match the order" },
];

export const deliverables = [
  { k: "Specification", d: "A written document of every field that defines your towel." },
  { k: "Sample", d: "A physical towel made to that specification." },
  { k: "Approved standard", d: "The sample you sign off becomes the production reference." },
  { k: "Branding", d: "Logo, labels and colours confirmed on the sample." },
  { k: "Packaging", d: "Per-piece, bundle, carton or retail — as specified." },
  { k: "Quality check", d: "A pre-shipment check against your approved standard." },
  { k: "Export documents", d: "Commercial invoice, packing list and the documents your shipment requires." },
];

export const faqs = [
  { q: "Are you a manufacturer?", a: "No. WeaveSources is a sourcing partner. Your towels are produced by independent manufacturing partners in Pakistan. We manage the specification, sampling, quality coordination and export on your behalf, and we tell you which partner makes your order." },
  { q: "Can I get a sample before ordering?", a: "Yes. Sampling is the first step for every new product. Sample costs and timing depend on the specification and are confirmed before anything is made." },
  { q: "What is your minimum order quantity?", a: "Minimums depend on the product, colour and branding. We confirm them when we review your brief, before you commit to anything." },
  { q: "Which certifications do you hold?", a: "Certifications in textiles are held by the manufacturer, not the sourcing company. We list only certificates we have verified, with the name of the partner who holds them. See Buyer Confidence for the current list." },
  { q: "Where do you ship?", a: "We are set up to work with buyers internationally. Shipping terms (Incoterms), freight and import requirements are agreed per order. We only list offices or representatives that actually exist." },
  { q: "How do you keep reorders consistent?", a: "Your approved sample and written specification become the reference. Production and pre-shipment checks are made against them, and reorders cite the same specification." },
  { q: "Can you put our logo on the towels?", a: "Branding options — embroidery, woven borders, labels, packaging — depend on the product and the partner. Every option is confirmed on the sample before production." },
  { q: "You're a new company. Why should we trust you?", a: "You shouldn't have to take our word for it. Start with a sample. See the specification. Speak to the person handling your order. Every step is designed so you can check our work before you commit." },
];
