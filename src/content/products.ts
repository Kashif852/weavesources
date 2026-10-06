/**
 * Product collection.
 *
 * `reference` values are COMMON INDUSTRY REFERENCE POINTS shown to help buyers
 * write a brief. They are not WeaveSources' confirmed offering. Confirmed
 * capabilities from manufacturing partners go in `confirmed` once verified.
 */

export type Product = {
  slug: string;
  name: string;
  short: string;
  useCase: string;
  intro: string;
  buyers: string[];
  reference: {
    sizes: string[];
    gsmRange: string;
    notes: string;
  };
  material: string;
  colours: string;
  customisation: string[];
  // Filled only with partner-verified data. null → "Available according to specification"
  confirmed: {
    gsm: string | null;
    sizes: string | null;
    moq: string | null;
    construction: string | null;
  };
  tone: "white" | "stone" | "clay" | "charcoal" | "sage" | "sand";
  specDefaults: { use: string; product: string; gsm: number; size: string };
};

export const products: Product[] = [
  {
    slug: "hotel-bath-towels",
    name: "Hotel Bath Towels",
    short: "The guest-room standard.",
    useCase: "Guest rooms, suites, serviced apartments",
    intro:
      "The towel guests judge a room by. For hotels the brief is a balance: a hand-feel that matches the room rate, and a weight your laundry can turn around without extending drying cycles.",
    buyers: ["Hotels", "Boutique hotels", "Vacation rentals", "Distributors"],
    reference: {
      sizes: ["70 × 140 cm", "27 × 54 in", "76 × 152 cm"],
      gsmRange: "Commonly specified between 450 and 650 GSM",
      notes: "Many properties choose a mid-range weight for faster drying and lower laundry cost.",
    },
    material: "Cotton terry. Yarn type and count agreed in your specification.",
    colours: "White is standard for hospitality. Other colours by specification.",
    customisation: ["Dobby or plain border", "Embroidered logo", "Woven label", "Custom packaging"],
    confirmed: { gsm: null, sizes: null, moq: null, construction: null },
    tone: "white",
    specDefaults: { use: "Hotel", product: "Bath towel", gsm: 550, size: "70 × 140 cm" },
  },
  {
    slug: "bath-sheets",
    name: "Bath Sheets",
    short: "Larger format for premium rooms and spas.",
    useCase: "Suites, premium rooms, spa changing areas",
    intro:
      "A bath sheet signals a step up in room category. It also changes your laundry load and storage space, so size and weight should be decided together.",
    buyers: ["Hotels", "Spas", "Retail brands"],
    reference: {
      sizes: ["90 × 160 cm", "100 × 150 cm", "35 × 60 in"],
      gsmRange: "Commonly specified between 500 and 700 GSM",
      notes: "Heavier sheets feel generous but take longer to dry.",
    },
    material: "Cotton terry. Yarn type agreed in your specification.",
    colours: "White, neutrals or brand colours by specification.",
    customisation: ["Border style", "Embroidered logo", "Woven label", "Retail or bulk packaging"],
    confirmed: { gsm: null, sizes: null, moq: null, construction: null },
    tone: "stone",
    specDefaults: { use: "Hotel", product: "Bath sheet", gsm: 600, size: "90 × 160 cm" },
  },
  {
    slug: "hand-towels",
    name: "Hand Towels",
    short: "High-turnover, everywhere.",
    useCase: "Guest bathrooms, washrooms, salons",
    intro:
      "Hand towels are replaced most often and washed most often. Matching them to your bath towels — weight, border, colour — is what makes a set look intentional.",
    buyers: ["Hotels", "Salons", "Vacation rentals", "Distributors"],
    reference: {
      sizes: ["40 × 70 cm", "50 × 90 cm", "16 × 30 in"],
      gsmRange: "Usually matched to the bath towel in the same set",
      notes: "Ordering as a matched set reduces colour and texture variation.",
    },
    material: "Cotton terry, matched to your set.",
    colours: "Matched to your set.",
    customisation: ["Matched border", "Embroidered logo", "Woven label"],
    confirmed: { gsm: null, sizes: null, moq: null, construction: null },
    tone: "sand",
    specDefaults: { use: "Hotel", product: "Hand towel", gsm: 550, size: "50 × 90 cm" },
  },
  {
    slug: "face-towels",
    name: "Face Towels & Washcloths",
    short: "Small format, high volume.",
    useCase: "Guest bathrooms, spa treatments, amenity kits",
    intro:
      "Small, washed constantly, and easy to get wrong on consistency. Washcloths are a good place to test a supplier: dimensions and hemming show quality quickly.",
    buyers: ["Hotels", "Spas", "Salons"],
    reference: {
      sizes: ["30 × 30 cm", "33 × 33 cm", "13 × 13 in"],
      gsmRange: "Usually matched to the set",
      notes: "Tolerance on small dimensions matters more than buyers expect.",
    },
    material: "Cotton terry, matched to your set.",
    colours: "Matched to your set.",
    customisation: ["Matched border", "Hemming style", "Bundled packaging"],
    confirmed: { gsm: null, sizes: null, moq: null, construction: null },
    tone: "white",
    specDefaults: { use: "Hotel", product: "Face towel / washcloth", gsm: 500, size: "30 × 30 cm" },
  },
  {
    slug: "spa-towels",
    name: "Spa Towels",
    short: "Treatment rooms and wellness.",
    useCase: "Treatment rooms, wellness centres, pools",
    intro:
      "Spa towels are often coloured, washed hot, and handled by guests in a calm setting where texture is noticed. Colourfastness and hand-feel should be agreed on the sample.",
    buyers: ["Spas", "Salons", "Hotels with wellness facilities"],
    reference: {
      sizes: ["Bath, hand and wrap formats"],
      gsmRange: "Varies by treatment use",
      notes: "Coloured towels should be checked for colourfastness before approval.",
    },
    material: "Cotton terry. Blend agreed in your specification.",
    colours: "Neutral and brand colours by specification.",
    customisation: ["Colour matching", "Embroidered logo", "Wrap formats", "Custom packaging"],
    confirmed: { gsm: null, sizes: null, moq: null, construction: null },
    tone: "sage",
    specDefaults: { use: "Spa", product: "Spa towel", gsm: 550, size: "70 × 140 cm" },
  },
  {
    slug: "gym-towels",
    name: "Gym & Sports Towels",
    short: "Light, fast-drying, durable.",
    useCase: "Gyms, studios, sports clubs, team kits",
    intro:
      "Gym towels are a different brief: lighter weight, faster drying, and colours that hide wear. Many clubs also want a logo that survives repeated commercial washing.",
    buyers: ["Gyms", "Studios", "Retail brands", "Distributors"],
    reference: {
      sizes: ["30 × 90 cm", "40 × 80 cm", "50 × 100 cm"],
      gsmRange: "Commonly specified in lighter weights",
      notes: "Lighter towels dry faster and cost less to launder.",
    },
    material: "Cotton or cotton blend. Agreed in your specification.",
    colours: "Darker colours common. By specification.",
    customisation: ["Embroidered or woven logo", "Colour by brand", "Hanging loop", "Retail packaging"],
    confirmed: { gsm: null, sizes: null, moq: null, construction: null },
    tone: "charcoal",
    specDefaults: { use: "Gym", product: "Gym / sports towel", gsm: 400, size: "30 × 90 cm" },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const futureCategories = ["Bathrobes", "Bed linen", "Spa textiles", "Kitchen textiles"];
