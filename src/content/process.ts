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
  { q: "Which certifications do you hold?", a: "Certifications in textiles are held by the manufacturer, not the sourcing company. We list only certificates we have verified, with the partner that holds them, the issuer, scope and facility. See Partners & credentials for the current list, or request documentation for your product." },
  { q: "Which markets do you serve?", a: "Our primary market is the United States, supported by our office in Seattle. We also work with buyers elsewhere. Shipping terms (Incoterms), freight and import requirements are agreed per order. We only list offices or representatives that actually exist." },
  { q: "Do you publish prices?", a: "No. Towel pricing depends on fibre, weight, size, construction, branding, packaging and quantity, and on the manufacturing partner. We quote against your specification once a suitable partner has confirmed it." },
  { q: "How do you keep reorders consistent?", a: "Your approved sample and written specification become the reference. Production and pre-shipment checks are made against them, and reorders cite the same specification." },
  { q: "Can you put our logo on the towels?", a: "Branding options — embroidery, woven borders, labels, packaging — depend on the product and the partner. Every option is confirmed on the sample before production." },
  { q: "You're a new company. Why should we trust you?", a: "You shouldn't have to take our word for it. Start with a sample. See the specification. Speak to the person handling your order. Every step is designed so you can check our work before you commit." },
];

/** The eight steps of an order, as shown on the homepage and in the catalog. */
export const orderSteps = [
  { n: "01", t: "You share your requirements", d: "Product, use, quantity, branding, packaging and destination — rough answers are fine." },
  { n: "02", t: "We identify suitable manufacturing options", d: "We match your brief to independent Pakistani manufacturers that regularly make that product." },
  { n: "03", t: "Specification and quotation are agreed", d: "A written specification with tolerances, and a quotation confirmed with the partner." },
  { n: "04", t: "Samples are prepared and reviewed", d: "A physical sample made to the specification. You wash it, use it and request changes." },
  { n: "05", t: "Production starts after your approval", d: "The approved sample becomes the production reference. Nothing starts without it." },
  { n: "06", t: "Quality checks follow the agreed plan", d: "In-line checks by the partner; a pre-shipment check against your specification and sample." },
  { n: "07", t: "Packing and shipment are coordinated", d: "Packed and marked as specified, then handed to the forwarder on the agreed Incoterms." },
  { n: "08", t: "You receive documents and updates", d: "Check results, commercial invoice, packing list and transport documents — and a named contact throughout." },
];

/**
 * Typical stages of terry towel production. This describes the INDUSTRY
 * process, not a specific partner facility. Images are illustrations.
 */
export const productionStages = [
  { n: "01", t: "Yarn preparation", d: "Cotton yarn is selected by count and type — ring-spun, combed, zero-twist — then warped onto beams for the ground and pile.", image: "mfg-yarn-and-weaving.jpg", alt: "Illustration: cones of cotton yarn feeding a terry loom" },
  { n: "02", t: "Terry weaving", d: "Terry looms weave the ground fabric and pull the pile warp into loops. Pile height, picks per inch and ply largely determine GSM and hand-feel.", image: "mfg-weaving-hall.jpg", alt: "Illustration: a hall of terry looms weaving white towel fabric" },
  { n: "03", t: "Dyeing & processing", d: "Woven fabric is scoured, bleached or dyed and softened. Yarn-dyed products, such as striped beach towels, are coloured before weaving instead.", image: "mfg-dyeing-and-finishing.jpg", alt: "Illustration: towel fabric leaving a stainless-steel dyeing machine" },
  { n: "04", t: "Cutting & stitching", d: "Fabric is cut to size, then hemmed along the sides and ends. Hem width, stitch density and border placement are checked here.", image: "mfg-stitching-and-hemming.jpg", alt: "Illustration: an operator hemming a white towel on an industrial sewing machine" },
  { n: "05", t: "Finishing & branding", d: "Embroidery, labels and any finishing treatments are applied, followed by trimming of loose threads and a hand-feel check.", image: "texture-cotton-terry.jpg", alt: "Close-up of cotton terry loops" },
  { n: "06", t: "Quality inspection", d: "Finished towels are checked for weight, dimensions, colour, stitching and defects against the specification and approved sample.", image: "mfg-quality-inspection.jpg", alt: "Illustration: an inspector measuring a white towel against a tape measure beside a scale" },
  { n: "07", t: "Packing & shipment preparation", d: "Towels are folded, bundled or bagged, packed into marked export cartons and prepared for container loading.", image: "mfg-packing-and-export.jpg", alt: "Illustration: workers packing folded towels into export cartons" },
];

/** Who does what in quality. "—" means not involved by default. */
export const qcMatrix: { activity: string; ws: string; partner: string; independent: string }[] = [
  { activity: "Defining requirements and tolerances", ws: "Writes the specification with you", partner: "Confirms it can be made", independent: "—" },
  { activity: "Reference sample", ws: "Coordinates and sends it to you", partner: "Produces the sample", independent: "—" },
  { activity: "In-line production checks", ws: "Follows up and records results", partner: "Performs them", independent: "—" },
  { activity: "GSM and dimensional checks", ws: "Pre-shipment check against the agreed plan", partner: "Checks during production", independent: "If you contract one" },
  { activity: "Colour, stitching and finish", ws: "Compared to the approved sample", partner: "Checks during production", independent: "If you contract one" },
  { activity: "Laboratory tests (absorbency, shrinkage, colourfastness)", ws: "Agrees the method and who performs it", partner: "In-house lab, where it has one", independent: "Accredited lab, when required" },
  { activity: "Packaging and labelling", ws: "Verified against the specification", partner: "Packs and labels", independent: "—" },
  { activity: "Third-party pre-shipment inspection", ws: "Coordinates access and timing", partner: "Presents goods", independent: "Performs it, when you arrange or request one" },
  { activity: "Certifications", ws: "Checks validity, holder and scope", partner: "Holds the certificate", independent: "Certification body issues it" },
];
