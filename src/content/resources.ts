export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "note"; text: string };

export type Article = {
  slug: string;
  title: string;
  summary: string;
  category: "Specification" | "Sourcing" | "Quality";
  minutes: number;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "how-to-choose-towel-gsm",
    title: "How to choose towel GSM",
    summary: "What GSM measures, what it doesn't, and how to pick a weight for how the towel will actually be used.",
    category: "Specification",
    minutes: 5,
    body: [
      { type: "p", text: "GSM — grams per square metre — is the weight of the towel fabric. It is the most quoted towel number and the most misunderstood. A higher GSM means more cotton in the same area, which usually means a thicker towel. It does not, on its own, tell you how soft, absorbent or durable a towel will be." },
      { type: "h", text: "Start with use, not weight" },
      { type: "p", text: "Ask three questions before choosing a number: how often will this towel be washed, how is it dried, and what experience should the guest have? A towel that is washed daily in a commercial laundry has different needs from one used occasionally in a premium suite." },
      { type: "list", items: ["Higher weight: more substantial feel, longer drying time, higher laundry cost per piece", "Lower weight: faster drying, lighter to handle, can feel thin if the yarn quality is poor", "Mid-range: often chosen by hospitality buyers as a balance"] },
      { type: "h", text: "What else matters as much as GSM" },
      { type: "list", items: ["Yarn type and twist — affects softness and lint", "Pile height and loop density — affects hand-feel", "Border and hem construction — affects durability", "Finishing — affects how the towel feels after the first wash"] },
      { type: "note", text: "Write GSM as a target with an agreed tolerance in your specification. A sample at that weight is the best way to judge whether the number matches the feel you want." },
    ],
  },
  {
    slug: "400-vs-500-vs-600-gsm",
    title: "400 vs 500 vs 600 GSM",
    summary: "A practical comparison of three common towel weights and where each tends to fit.",
    category: "Specification",
    minutes: 4,
    body: [
      { type: "p", text: "These three weights cover most commercial towel briefs. The right choice depends on your use, your laundry, and the experience you want guests to have. The descriptions below are general reference points, not guarantees — two towels at the same GSM can feel very different." },
      { type: "table", head: ["", "≈400 GSM", "≈500 GSM", "≈600 GSM"], rows: [["Feel", "Light, thin", "Balanced", "Substantial"], ["Drying", "Fastest", "Moderate", "Slower"], ["Typical fit", "Gyms, pools, high-turnover", "Many hotels, rentals", "Premium rooms, spas"], ["Laundry cost", "Lowest", "Moderate", "Higher"]] },
      { type: "h", text: "How to decide" },
      { type: "p", text: "If you are unsure, sample two adjacent weights in the same construction. Feeling the difference side by side is more useful than any chart." },
    ],
  },
  {
    slug: "what-makes-a-commercial-towel",
    title: "What makes a commercial towel?",
    summary: "Why towels built for hotels, spas and gyms are specified differently from retail towels.",
    category: "Specification",
    minutes: 4,
    body: [
      { type: "p", text: "A commercial towel is designed around how it is laundered and replaced, not how it looks on a shelf. It is washed more often, at higher temperatures, and handled in bulk." },
      { type: "list", items: ["Reinforced hems and borders that hold up to repeated washing", "Weights chosen for drying time as well as feel", "Consistent colour, especially white, across batches", "Packing designed for receiving and storage, not display"] },
      { type: "p", text: "Retail towels prioritise first impression. Commercial towels prioritise the hundredth wash. A good commercial specification states both what the towel should be and how it will be used." },
    ],
  },
  {
    slug: "how-to-evaluate-a-towel-supplier",
    title: "How to evaluate a towel supplier",
    summary: "Questions that separate a supplier you can rely on from one that only looks reliable online.",
    category: "Sourcing",
    minutes: 6,
    body: [
      { type: "p", text: "Most supplier websites make similar claims. The useful information is in how a supplier answers specific questions — and whether those answers hold up when a sample arrives." },
      { type: "h", text: "Ask directly" },
      { type: "list", items: ["Who manufactures the product, and is that your own facility or a partner's?", "Which certifications apply, who holds them, and can I see the certificate?", "What tolerance do you work to on GSM and dimensions?", "What is checked before shipment, and will I see the result?", "How do you make sure a reorder matches my first order?", "Who is my contact, and how quickly do they reply?"] },
      { type: "h", text: "Watch for" },
      { type: "list", items: ["Certifications listed without a certificate holder", "Very large capacity claims with no detail", "Reluctance to send a sample or describe sample costs", "Vague answers about who actually makes the product"] },
      { type: "note", text: "A newer supplier can be a good choice if they are transparent. Clear answers are worth more than a long company history you can't verify." },
    ],
  },
  {
    slug: "private-label-vs-oem",
    title: "Private label vs OEM",
    summary: "What the two terms usually mean in textiles, and which fits your brief.",
    category: "Sourcing",
    minutes: 4,
    body: [
      { type: "p", text: "The terms are used loosely across the industry, so always confirm what a supplier means. In general use:" },
      { type: "list", items: ["Private label: an existing or lightly adapted product sold under your brand, with your labels and packaging", "OEM: a product made to your own specification — construction, size, weight, colour — and branded for you"] },
      { type: "p", text: "Private label is usually faster to start. OEM gives you more control and a more distinctive product, but needs a fuller specification and sampling round." },
      { type: "note", text: "Either way, the specification should be written down and the approved sample kept as the reference." },
    ],
  },
  {
    slug: "questions-to-ask-a-textile-manufacturer",
    title: "Questions to ask a textile manufacturer",
    summary: "A checklist to send before you commit to samples.",
    category: "Sourcing",
    minutes: 3,
    body: [
      { type: "list", items: ["What products and constructions do you regularly make?", "What is your minimum order per colour and size?", "What are sample costs and lead times?", "What are production lead times after sample approval?", "Which certifications do you hold? Please share copies.", "What quality checks do you perform in-line and before packing?", "How do you handle a batch that doesn't match the approved sample?", "Which Incoterms and payment terms do you work with?"] },
      { type: "p", text: "Sending the same list to every supplier makes answers directly comparable." },
    ],
  },
  {
    slug: "how-towel-sampling-works",
    title: "How towel sampling works",
    summary: "From written specification to a physical towel you approve — and why that sample matters later.",
    category: "Quality",
    minutes: 4,
    body: [
      { type: "p", text: "A sample turns a specification into something you can hold. It is where hand-feel, colour and finish are agreed — things words describe poorly." },
      { type: "list", items: ["Brief: you describe use, size, weight, colour, branding and packaging", "Sample: a towel is produced or selected to match the brief", "Review: you check it, wash it, use it", "Adjust: changes are written into the specification", "Approve: the final sample becomes the reference for production"] },
      { type: "p", text: "Keep a sealed counterpart of the approved sample on both sides where possible. It settles questions quickly if a batch is ever disputed." },
    ],
  },
  {
    slug: "consistency-across-repeat-orders",
    title: "How to maintain consistency across repeat orders",
    summary: "Why towels drift between batches, and the simple discipline that prevents it.",
    category: "Quality",
    minutes: 4,
    body: [
      { type: "p", text: "Batch drift is common: a slightly different yarn lot, a new dye batch, a substituted border. Each change is small. Together they produce a towel that no longer matches the one in your rooms." },
      { type: "h", text: "What prevents it" },
      { type: "list", items: ["A written specification with tolerances", "An approved reference sample retained by both parties", "Pre-shipment checks against that reference", "Reorders that cite the specification, not a description"] },
      { type: "note", text: "Your first order should create the standard for every order after it." },
    ],
  },
  {
    slug: "how-to-source-towels-internationally",
    title: "How to source towels internationally",
    summary: "An overview of the steps between a first enquiry and towels arriving at your door.",
    category: "Sourcing",
    minutes: 6,
    body: [
      { type: "list", items: ["Define the brief: product, use, quantity, branding, destination", "Shortlist suppliers and request samples", "Approve a sample and confirm the specification", "Agree commercial terms: price, Incoterms, payment, lead time", "Production with in-line checks", "Pre-shipment inspection against the approved sample", "Export documentation and freight", "Customs clearance and delivery at destination"] },
      { type: "p", text: "Incoterms decide who pays for and takes risk on each stage of transport. Confirm them in writing before production starts, and plan for import duties and clearance in your country." },
      { type: "note", text: "Ask early which documents your customs broker needs. It avoids delays at the port." },
    ],
  },
  {
    slug: "understanding-towel-specifications",
    title: "Understanding towel specifications",
    summary: "The fields that make a towel brief complete — and the ones buyers often forget.",
    category: "Specification",
    minutes: 5,
    body: [
      { type: "table", head: ["Field", "What to state"], rows: [["Product", "Bath towel, bath sheet, hand towel…"], ["Material", "Fibre and yarn type"], ["GSM", "Target weight and tolerance"], ["Size", "Finished dimensions and tolerance"], ["Colour", "Reference (e.g. a Pantone or physical swatch)"], ["Construction", "Pile, weave, border style, hem"], ["Branding", "Method, position, size of logo or label"], ["Packaging", "Per-piece, bundle, carton, retail"], ["Quantity", "Per size and colour"], ["Destination", "Delivery country and port"]] },
      { type: "p", text: "Fields most often missed: tolerances, care-label requirements and carton labelling. Adding them up front avoids questions at the end." },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
