/**
 * Product catalog — the single source for categories and products.
 * Product pages, collection pages, the homepage, forms, the sitemap and the
 * printable PDF catalog all read from this file.
 *
 * RULES
 * - `confirmed` holds ONLY values a manufacturing partner has verified in
 *   writing for WeaveSources. Anything null renders as
 *   "Specifications confirmed during quotation". Never fill these with typical
 *   or hoped-for values.
 * - `typical` is industry reference guidance to help a buyer write a brief.
 *   It is always labelled as such and is never presented as a WeaveSources
 *   specification, minimum or capability.
 * - `availability` on a category controls how it is presented:
 *     "active"  — part of the current sourcing range
 *     "enquiry" — shown, but labelled "sourced on enquiry": partner supply is
 *                 confirmed per order before anything is quoted
 *     "hidden"  — not shown anywhere (products in it disappear too)
 *   Move a category to "active" only once at least one partner is verified
 *   for it.
 * - No prices, stock levels or lead times belong here.
 */

export type Availability = "active" | "enquiry" | "hidden";

export type Category = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  buyers: string[];
  availability: Availability;
  image: string; // file in /public/images
  imageAlt: string;
};

export type Product = {
  slug: string;
  sku: string; // WeaveSources reference code, used on quotes and samples
  name: string;
  category: string; // Category slug
  short: string;
  useCase: string;
  intro: string;
  buyers: string[];
  imageAlt: string;
  /** Partner-verified values only. null → confirmed during quotation. */
  confirmed: {
    material: string | null;
    gsm: string | null;
    dimensions: string | null;
    construction: string | null;
    colours: string | null;
    packaging: string | null;
    moq: string | null;
    compliance: string | null;
  };
  /** Industry reference points and the options a buyer can specify. */
  typical: {
    material: string;
    gsm: string;
    sizes: string[];
    construction: string;
    colours: string;
    customisation: string[];
    packaging: string[];
    notes: string;
  };
  tone: "white" | "stone" | "clay" | "charcoal" | "sage" | "sand";
  /** Starting values passed to the specification builder and forms. */
  specDefaults: { use: string; product: string; gsm: number; size: string };
};

export const CONFIRM = "Specifications confirmed during quotation";

const none = { material: null, gsm: null, dimensions: null, construction: null, colours: null, packaging: null, moq: null, compliance: null };

export const categories: Category[] = [
  {
    slug: "bath-hand-towels",
    name: "Bath & Hand Towels",
    short: "Bath towels, bath sheets, hand towels, washcloths and matched sets.",
    intro:
      "The core of most towel programmes. Bath, hand and face formats are best specified together so weight, border and colour match across the set.",
    buyers: ["Importers & distributors", "Retail & e-commerce brands", "Private-label brands", "Hospitality suppliers"],
    availability: "active",
    image: "category-bath-hand-towels.jpg",
    imageAlt: "Folded cotton terry bath towels, hand towels and washcloths in white, navy, charcoal and taupe",
  },
  {
    slug: "hotel-hospitality-towels",
    name: "Hotel & Hospitality Towels",
    short: "Guest-room towels and full room sets built for commercial laundering.",
    intro:
      "Hospitality towels are judged in the room and in the laundry. Weight, construction and finish are specified to balance guest feel against drying time and wash life.",
    buyers: ["Hotel supply companies", "Commercial linen suppliers", "Hotel groups", "Vacation-rental operators"],
    availability: "active",
    image: "category-hotel-hospitality-towels.jpg",
    imageAlt: "A stack of folded white hotel towels with dobby borders in front of linen shelving",
  },
  {
    slug: "spa-institutional-towels",
    name: "Spa, Gym & Institutional Towels",
    short: "Treatment-room, salon, gym and club towels for high-turnover use.",
    intro:
      "Towels used and washed many times a day. Colourfastness, drying speed and durability usually matter more here than maximum plushness.",
    buyers: ["Spa & wellness operators", "Gyms & sports clubs", "Salons", "Institutional buyers"],
    availability: "active",
    image: "product-spa-towels.jpg",
    imageAlt: "Folded sage-green spa towels",
  },
  {
    slug: "beach-pool-towels",
    name: "Beach & Pool Towels",
    short: "Striped cabana, pool and resort towels in larger formats.",
    intro:
      "Larger formats in yarn-dyed stripes or solid colours, for resorts, pool decks and retail. Colourfastness to sun, chlorine and salt water should be agreed on the sample.",
    buyers: ["Resorts & pool operators", "Retail & e-commerce brands", "Distributors", "Promotional buyers"],
    availability: "enquiry",
    image: "category-beach-pool-towels.jpg",
    imageAlt: "Navy and white striped beach towel draped over a bench beside folded terracotta and sand striped towels",
  },
  {
    slug: "kitchen-utility-textiles",
    name: "Kitchen & Utility Textiles",
    short: "Kitchen and tea towels, waffle-weave cloths and bar mops.",
    intro:
      "Flat-weave, waffle and terry constructions for kitchens, bars and cleaning. Absorbency, lint and shrinkage are the properties buyers most often need to agree.",
    buyers: ["Restaurant & bar suppliers", "Retail & homeware brands", "Janitorial distributors", "Private-label brands"],
    availability: "enquiry",
    image: "category-kitchen-utility-textiles.jpg",
    imageAlt: "Folded striped tea towels, waffle-weave cloths in green, taupe and grey, and white terry bar mops",
  },
  {
    slug: "bathrobes-sets",
    name: "Bathrobes & Coordinated Sets",
    short: "Terry bathrobes and robe-and-towel sets.",
    intro:
      "Robes add sizing, pattern and trim to the specification. They are often ordered alongside a matching towel programme for hotels, spas and gift sets.",
    buyers: ["Hotels & spas", "Retail & gift brands", "Private-label brands"],
    availability: "enquiry",
    image: "category-bathrobes-coordinated-sets.jpg",
    imageAlt: "A white shawl-collar terry bathrobe folded beside two white bath towels",
  },
];

const terryCustom = ["Dobby, jacquard or plain border", "Embroidered logo", "Woven or jacquard logo", "Brand and care labels", "Custom colour to your reference"];
const terryPack = ["Bulk export carton", "Bundled (e.g. 10 pcs) and banded", "Individually poly-bagged", "Retail-ready packaging"];

export const products: Product[] = [
  // ── Bath & hand ────────────────────────────────────────
  {
    slug: "cotton-bath-towels",
    sku: "WS-BH-01",
    name: "Cotton Bath Towels",
    category: "bath-hand-towels",
    short: "Everyday cotton terry bath towels for retail and wholesale.",
    useCase: "Retail, e-commerce, wholesale distribution",
    intro:
      "A cotton terry bath towel specified for the shelf as much as the bathroom: consistent colour across lots, a border that photographs well, and packaging that suits your channel.",
    buyers: ["Importers", "Retail brands", "E-commerce brands", "Distributors"],
    imageAlt: "Stacked cotton bath towels in white, slate blue and charcoal with woven borders",
    confirmed: { ...none },
    typical: {
      material: "100% cotton terry; ring-spun or combed yarn",
      gsm: "Commonly specified between 450 and 650 GSM",
      sizes: ["70 × 140 cm", "27 × 52 in", "30 × 56 in"],
      construction: "Two-ply or single-ply terry, dobby or plain border",
      colours: "Solid colours dyed to your reference",
      customisation: terryCustom,
      packaging: terryPack,
      notes: "Retail buyers usually fix colour references and packaging artwork before the sample.",
    },
    tone: "stone",
    specDefaults: { use: "Retail / private label", product: "Bath towel", gsm: 550, size: "70 × 140 cm" },
  },
  {
    slug: "bath-sheets",
    sku: "WS-BH-02",
    name: "Bath Sheets",
    category: "bath-hand-towels",
    short: "Larger format for premium rooms, spas and retail.",
    useCase: "Suites, premium rooms, spa changing areas, retail",
    intro:
      "A bath sheet signals a step up in room category. It also changes your laundry load and storage space, so size and weight should be decided together.",
    buyers: ["Hotels", "Spas", "Retail brands"],
    imageAlt: "Two folded taupe cotton bath sheets",
    confirmed: { ...none },
    typical: {
      material: "100% cotton terry",
      gsm: "Commonly specified between 500 and 700 GSM",
      sizes: ["90 × 160 cm", "100 × 150 cm", "35 × 60 in"],
      construction: "Terry with dobby or plain border",
      colours: "White, neutrals or brand colours",
      customisation: terryCustom,
      packaging: terryPack,
      notes: "Heavier sheets feel generous but take longer to dry.",
    },
    tone: "stone",
    specDefaults: { use: "Hotel", product: "Bath sheet", gsm: 600, size: "90 × 160 cm" },
  },
  {
    slug: "hand-towels",
    sku: "WS-BH-03",
    name: "Hand Towels",
    category: "bath-hand-towels",
    short: "High-turnover, everywhere.",
    useCase: "Guest bathrooms, washrooms, salons, retail sets",
    intro:
      "Hand towels are replaced most often and washed most often. Matching them to your bath towels — weight, border, colour — is what makes a set look intentional.",
    buyers: ["Hotels", "Salons", "Vacation rentals", "Distributors"],
    imageAlt: "Three folded sand-coloured cotton hand towels",
    confirmed: { ...none },
    typical: {
      material: "100% cotton terry, matched to the set",
      gsm: "Usually matched to the bath towel in the same set",
      sizes: ["40 × 70 cm", "50 × 90 cm", "16 × 30 in"],
      construction: "Terry, border matched to the set",
      colours: "Matched to your set",
      customisation: ["Matched border", "Embroidered logo", "Woven label"],
      packaging: terryPack,
      notes: "Ordering as a matched set reduces colour and texture variation.",
    },
    tone: "sand",
    specDefaults: { use: "Hotel", product: "Hand towel", gsm: 550, size: "50 × 90 cm" },
  },
  {
    slug: "face-towels",
    sku: "WS-BH-04",
    name: "Washcloths & Face Towels",
    category: "bath-hand-towels",
    short: "Small format, high volume.",
    useCase: "Guest bathrooms, spa treatments, amenity kits, retail sets",
    intro:
      "Small, washed constantly, and easy to get wrong on consistency. Washcloths are a good place to test a supplier: dimensions and hemming show quality quickly.",
    buyers: ["Hotels", "Spas", "Salons", "Retail brands"],
    imageAlt: "A stack of folded white cotton washcloths",
    confirmed: { ...none },
    typical: {
      material: "100% cotton terry, matched to the set",
      gsm: "Usually matched to the set",
      sizes: ["30 × 30 cm", "33 × 33 cm", "13 × 13 in"],
      construction: "Terry, hemmed edges, optional border",
      colours: "Matched to your set",
      customisation: ["Matched border", "Hemming style", "Bundled packaging"],
      packaging: ["Bundled (e.g. 12 pcs)", "Bulk export carton", "Retail packs"],
      notes: "Tolerance on small dimensions matters more than buyers expect.",
    },
    tone: "white",
    specDefaults: { use: "Hotel", product: "Face towel / washcloth", gsm: 500, size: "30 × 30 cm" },
  },
  {
    slug: "coordinated-towel-sets",
    sku: "WS-BH-05",
    name: "Coordinated Towel Sets",
    category: "bath-hand-towels",
    short: "Bath, hand and face towels specified as one set.",
    useCase: "Retail sets, gift programmes, vacation rentals",
    intro:
      "A set sold or presented together has to match: same colour lot, same border, proportionate weights. Specifying the set as one product keeps every piece consistent.",
    buyers: ["Retail brands", "E-commerce brands", "Private-label brands", "Vacation-rental operators"],
    imageAlt: "A coordinated set of bath, hand and face towels in white, navy, charcoal and taupe",
    confirmed: { ...none },
    typical: {
      material: "100% cotton terry",
      gsm: "One weight across the set, or proportionate weights by piece",
      sizes: ["Bath + hand + washcloth", "2 bath + 2 hand + 2 washcloth", "Custom set composition"],
      construction: "Matched border across all pieces",
      colours: "Matched colour lot across the set",
      customisation: [...terryCustom, "Set packaging and inserts"],
      packaging: ["Retail-ready set packaging", "Banded sets in export carton", "Gift box"],
      notes: "Set composition and packaging artwork are usually agreed before the sample.",
    },
    tone: "stone",
    specDefaults: { use: "Retail / private label", product: "Towel set", gsm: 550, size: "Bath + hand + washcloth" },
  },

  // ── Hotel & hospitality ────────────────────────────────
  {
    slug: "hotel-bath-towels",
    sku: "WS-HT-01",
    name: "Hotel Bath Towels",
    category: "hotel-hospitality-towels",
    short: "The guest-room standard.",
    useCase: "Guest rooms, suites, serviced apartments",
    intro:
      "The towel guests judge a room by. For hotels the brief is a balance: a hand-feel that matches the room rate, and a weight your laundry can turn around without extending drying cycles.",
    buyers: ["Hotels", "Hotel supply companies", "Commercial linen suppliers", "Distributors"],
    imageAlt: "Two folded white hotel bath towels with dobby borders",
    confirmed: { ...none },
    typical: {
      material: "100% cotton terry; ring-spun yarn common",
      gsm: "Commonly specified between 450 and 650 GSM",
      sizes: ["70 × 140 cm", "27 × 54 in", "76 × 152 cm"],
      construction: "Terry with dobby border; hemmed edges",
      colours: "White is standard for hospitality",
      customisation: ["Dobby or plain border", "Embroidered logo", "Woven label", "Custom packaging"],
      packaging: ["Bundled (e.g. 10 pcs) in export carton", "Bulk export carton"],
      notes: "Many properties choose a mid-range weight for faster drying and lower laundry cost.",
    },
    tone: "white",
    specDefaults: { use: "Hotel", product: "Bath towel", gsm: 550, size: "70 × 140 cm" },
  },
  {
    slug: "hotel-towel-sets",
    sku: "WS-HT-02",
    name: "Hotel Towel Programmes",
    category: "hotel-hospitality-towels",
    short: "Bath, hand, face towels and bath mats for a whole room.",
    useCase: "Hotel groups, linen suppliers, refurbishments",
    intro:
      "A full room set — bath towel, hand towel, washcloth and bath mat — specified once so every piece matches, and so replacement stock matches the original order.",
    buyers: ["Hotel supply companies", "Commercial linen suppliers", "Hotel groups"],
    imageAlt: "A stack of white hotel bath, hand and face towels with dobby borders",
    confirmed: { ...none },
    typical: {
      material: "100% cotton terry",
      gsm: "Set by piece; bath mats usually heavier than towels",
      sizes: ["Bath 70 × 140 cm", "Hand 40 × 70 cm", "Face 30 × 30 cm", "Bath mat 50 × 80 cm"],
      construction: "Matched dobby border across the programme",
      colours: "White, or hotel colour to reference",
      customisation: ["Matched border", "Embroidered logo", "Woven label", "Colour-coded hems"],
      packaging: ["Bundled by piece type in export carton", "Mixed-set cartons"],
      notes: "Linen suppliers often specify one programme for several properties, so tolerances matter.",
    },
    tone: "white",
    specDefaults: { use: "Hotel", product: "Towel set", gsm: 550, size: "Bath + hand + washcloth + bath mat" },
  },

  // ── Spa, gym & institutional ───────────────────────────
  {
    slug: "spa-towels",
    sku: "WS-SI-01",
    name: "Spa Towels",
    category: "spa-institutional-towels",
    short: "Treatment rooms and wellness.",
    useCase: "Treatment rooms, wellness centres, salons",
    intro:
      "Spa towels are often coloured, washed hot, and handled by guests in a calm setting where texture is noticed. Colourfastness and hand-feel should be agreed on the sample.",
    buyers: ["Spas", "Salons", "Hotels with wellness facilities"],
    imageAlt: "Two folded sage-green spa towels",
    confirmed: { ...none },
    typical: {
      material: "Cotton terry, or a blend agreed in your specification",
      gsm: "Varies by treatment use",
      sizes: ["Bath, hand and wrap formats", "80 × 160 cm (wrap)"],
      construction: "Terry; wrap formats with closures where required",
      colours: "Neutral and brand colours",
      customisation: ["Colour matching", "Embroidered logo", "Wrap formats", "Custom packaging"],
      packaging: terryPack,
      notes: "Coloured towels should be checked for colourfastness before approval.",
    },
    tone: "sage",
    specDefaults: { use: "Spa", product: "Spa towel", gsm: 550, size: "70 × 140 cm" },
  },
  {
    slug: "gym-towels",
    sku: "WS-SI-02",
    name: "Gym & Sports Towels",
    category: "spa-institutional-towels",
    short: "Light, fast-drying, durable.",
    useCase: "Gyms, studios, sports clubs, team kits",
    intro:
      "Gym towels are a different brief: lighter weight, faster drying, and colours that hide wear. Many clubs also want a logo that survives repeated commercial washing.",
    buyers: ["Gyms", "Studios", "Retail brands", "Distributors"],
    imageAlt: "Three folded charcoal gym towels",
    confirmed: { ...none },
    typical: {
      material: "Cotton or cotton blend",
      gsm: "Commonly specified in lighter weights",
      sizes: ["30 × 90 cm", "40 × 80 cm", "50 × 100 cm"],
      construction: "Terry, optional hanging loop",
      colours: "Darker colours common",
      customisation: ["Embroidered or woven logo", "Colour by brand", "Hanging loop", "Retail packaging"],
      packaging: terryPack,
      notes: "Lighter towels dry faster and cost less to launder.",
    },
    tone: "charcoal",
    specDefaults: { use: "Gym", product: "Gym / sports towel", gsm: 400, size: "30 × 90 cm" },
  },

  // ── Beach & pool ───────────────────────────────────────
  {
    slug: "cabana-beach-towels",
    sku: "WS-BP-01",
    name: "Striped Cabana Beach Towels",
    category: "beach-pool-towels",
    short: "Yarn-dyed stripes in large formats.",
    useCase: "Retail, resorts, beach clubs, promotional programmes",
    intro:
      "The classic cabana stripe is woven with dyed yarn rather than printed, so stripe width, colour and repeat are part of the specification and are approved on the sample.",
    buyers: ["Retail brands", "Resorts", "Distributors", "Promotional buyers"],
    imageAlt: "A navy and white striped cabana beach towel draped over a wooden bench",
    confirmed: { ...none },
    typical: {
      material: "100% cotton terry, yarn-dyed",
      gsm: "Commonly specified in mid to heavy weights",
      sizes: ["76 × 152 cm", "30 × 60 in", "90 × 180 cm (oversized)"],
      construction: "Yarn-dyed terry stripes; jacquard designs also specified",
      colours: "Stripe colours to your references",
      customisation: ["Stripe width and colourway", "Jacquard logo or pattern", "Woven label", "Retail packaging"],
      packaging: ["Rolled and banded", "Individually poly-bagged", "Bulk export carton"],
      notes: "Colourfastness to light, chlorine and salt water should be agreed on the sample.",
    },
    tone: "stone",
    specDefaults: { use: "Retail / private label", product: "Beach / pool towel", gsm: 500, size: "76 × 152 cm" },
  },
  {
    slug: "pool-resort-towels",
    sku: "WS-BP-02",
    name: "Pool & Resort Towels",
    category: "beach-pool-towels",
    short: "Durable pool-deck towels in resort colours.",
    useCase: "Hotel pools, resorts, cruise and leisure operators",
    intro:
      "Pool towels are handled outdoors, washed hard and replaced often. A distinct colour or stripe keeps them separate from guest-room towels in the laundry.",
    buyers: ["Resorts", "Hotel supply companies", "Leisure operators", "Commercial linen suppliers"],
    imageAlt: "Folded terracotta and sand striped pool towels",
    confirmed: { ...none },
    typical: {
      material: "100% cotton terry",
      gsm: "Commonly specified in mid weights for durability and drying",
      sizes: ["76 × 152 cm", "80 × 160 cm", "35 × 70 in"],
      construction: "Yarn-dyed stripe or solid colour terry",
      colours: "Resort colours to your reference",
      customisation: ["Stripe or solid colour", "Embroidered or jacquard logo", "Colour coding by area"],
      packaging: ["Bundled in export carton", "Bulk export carton"],
      notes: "A distinct colour keeps pool towels out of the guest-room laundry stream.",
    },
    tone: "clay",
    specDefaults: { use: "Hotel", product: "Beach / pool towel", gsm: 500, size: "76 × 152 cm" },
  },

  // ── Kitchen & utility ──────────────────────────────────
  {
    slug: "kitchen-tea-towels",
    sku: "WS-KU-01",
    name: "Kitchen & Tea Towels",
    category: "kitchen-utility-textiles",
    short: "Flat-weave towels with classic stripes.",
    useCase: "Retail homeware, restaurants, gift sets",
    intro:
      "Flat-weave cotton or cotton-linen towels for drying glassware and dishes. Stripe placement, hanging loops and lint behaviour are the details buyers notice.",
    buyers: ["Homeware brands", "Retail brands", "Restaurant suppliers", "Private-label brands"],
    imageAlt: "Folded flat-weave tea towels with navy and red stripes",
    confirmed: { ...none },
    typical: {
      material: "Cotton or cotton–linen flat weave",
      gsm: "Light weights; specified by construction",
      sizes: ["50 × 70 cm", "45 × 65 cm", "20 × 28 in"],
      construction: "Plain, herringbone or yarn-dyed stripe weave",
      colours: "Stripe colourways to your references",
      customisation: ["Stripe colourway", "Hanging loop", "Woven or printed label", "Retail bands"],
      packaging: ["Banded sets of 2–4", "Retail header cards", "Bulk export carton"],
      notes: "Shrinkage after washing should be agreed alongside finished size.",
    },
    tone: "sand",
    specDefaults: { use: "Retail / private label", product: "Kitchen / tea towel", gsm: 300, size: "50 × 70 cm" },
  },
  {
    slug: "waffle-weave-cloths",
    sku: "WS-KU-02",
    name: "Waffle-Weave Cloths",
    category: "kitchen-utility-textiles",
    short: "Quick-drying honeycomb weave.",
    useCase: "Kitchen, cleaning and retail homeware",
    intro:
      "The waffle or honeycomb weave dries quickly and has a distinctive texture that sells well in retail. Cell size and weight define how it feels and performs.",
    buyers: ["Homeware brands", "Retail brands", "E-commerce brands"],
    imageAlt: "Folded waffle-weave cloths in sage, taupe and grey",
    confirmed: { ...none },
    typical: {
      material: "100% cotton waffle weave",
      gsm: "Specified by construction and cell size",
      sizes: ["33 × 33 cm", "40 × 60 cm", "50 × 70 cm"],
      construction: "Waffle / honeycomb weave, hemmed edges",
      colours: "Solid colours to your reference",
      customisation: ["Colour", "Cell size", "Hanging loop", "Woven label"],
      packaging: ["Banded sets", "Retail packaging", "Bulk export carton"],
      notes: "Waffle cloths shrink as the weave closes up; agree finished size after washing.",
    },
    tone: "sage",
    specDefaults: { use: "Retail / private label", product: "Waffle cloth", gsm: 300, size: "40 × 60 cm" },
  },
  {
    slug: "bar-mops",
    sku: "WS-KU-03",
    name: "Bar Mops & Utility Cloths",
    category: "kitchen-utility-textiles",
    short: "Absorbent terry cloths for bars and kitchens.",
    useCase: "Bars, restaurants, commercial kitchens, janitorial",
    intro:
      "Bar mops are bought by the dozen and judged by absorbency and how many washes they survive. Weight per dozen is often the key commercial specification.",
    buyers: ["Restaurant & bar suppliers", "Janitorial distributors", "Commercial linen suppliers"],
    imageAlt: "A stack of folded white terry bar mops",
    confirmed: { ...none },
    typical: {
      material: "Cotton terry (ribbed or plain)",
      gsm: "Often specified by weight per dozen",
      sizes: ["16 × 19 in", "40 × 50 cm"],
      construction: "Ribbed or plain terry, hemmed edges",
      colours: "White; coloured stripes for colour coding",
      customisation: ["Colour-coded stripe", "Weight per dozen", "Bundling"],
      packaging: ["Bundled by the dozen", "Bulk export carton"],
      notes: "Agree weight per dozen with a tolerance, as you would GSM for towels.",
    },
    tone: "white",
    specDefaults: { use: "Distribution", product: "Bar mop", gsm: 400, size: "16 × 19 in" },
  },

  // ── Bathrobes & sets ───────────────────────────────────
  {
    slug: "terry-bathrobes",
    sku: "WS-RB-01",
    name: "Terry Bathrobes",
    category: "bathrobes-sets",
    short: "Shawl-collar and kimono robes, alone or with matching towels.",
    useCase: "Hotels, spas, retail and gift sets",
    intro:
      "A robe brings size grading, collar style, pockets and belt loops into the specification. Many buyers order robes with a matching towel set so the colour lot is shared.",
    buyers: ["Hotels", "Spas", "Retail brands", "Gift-set brands"],
    imageAlt: "A white shawl-collar terry bathrobe folded beside matching bath towels",
    confirmed: { ...none },
    typical: {
      material: "Cotton terry; waffle and velour finishes also specified",
      gsm: "Specified by fabric construction",
      sizes: ["S/M, L/XL", "One size", "Custom size grading"],
      construction: "Shawl or kimono collar, patch pockets, belt and loops",
      colours: "White, neutrals or brand colours",
      customisation: ["Collar style", "Embroidered logo", "Woven label", "Matching towel set"],
      packaging: ["Individually folded and poly-bagged", "Hanger and retail bag", "Gift box"],
      notes: "Size grading and shrinkage should be checked on a washed sample.",
    },
    tone: "white",
    specDefaults: { use: "Hotel", product: "Bathrobe", gsm: 400, size: "L/XL" },
  },
];

export const visibleCategories = categories.filter((c) => c.availability !== "hidden");
export const visibleProducts = products.filter((p) => visibleCategories.some((c) => c.slug === p.category));

export const getProduct = (slug: string) => visibleProducts.find((p) => p.slug === slug);
export const getCategory = (slug: string) => visibleCategories.find((c) => c.slug === slug);
export const productsIn = (category: string) => visibleProducts.filter((p) => p.category === category);
export const categoryOf = (p: Product) => categories.find((c) => c.slug === p.category)!;

export const availabilityLabel: Record<Availability, string> = {
  active: "Current sourcing range",
  enquiry: "Sourced on enquiry",
  hidden: "",
};
export const availabilityNote: Record<Availability, string> = {
  active: "Part of our current sourcing range. Specifications, minimums and terms are confirmed for your order during quotation.",
  enquiry: "Sourced on enquiry: we confirm a suitable manufacturing partner for your specification before anything is quoted. Availability is not assumed.",
  hidden: "",
};

/** Image path for a product (crops produced by scripts/prepare-media.mjs). */
export const productImage = (p: Product) => `/images/product-${p.slug}.jpg`;

/** Every row a product detail view must show: a verified value, or CONFIRM. */
export function specRows(p: Product, terms: { moq: string | null; samplePolicy: string | null }) {
  const c = p.confirmed;
  const t = p.typical;
  return [
    { k: "Material composition", v: c.material, typical: t.material },
    { k: "GSM / weight", v: c.gsm, typical: t.gsm },
    { k: "Dimensions", v: c.dimensions, typical: t.sizes.join(" · ") },
    { k: "Construction & weave", v: c.construction, typical: t.construction },
    { k: "Colours", v: c.colours, typical: t.colours },
    { k: "Customisation & branding", v: null, typical: t.customisation.join(" · "), always: "Options confirmed on your sample, where the manufacturing partner supports them" },
    { k: "Packaging", v: c.packaging, typical: t.packaging.join(" · ") },
    { k: "Minimum order quantity", v: c.moq ?? terms.moq, typical: "Depends on product, colour and branding" },
    { k: "Sample", v: terms.samplePolicy, typical: null, always: "Available — cost and timing confirmed in writing before anything is made" },
    { k: "Compliance", v: c.compliance, typical: null, always: "Partner documentation discussed for your order — see Partner credentials" },
  ] as { k: string; v: string | null; typical: string | null; always?: string }[];
}
