export type Industry = {
  slug: string;
  name: string;
  headline: string;
  problem: string;
  whatMatters: string[];
  howWeHelp: string[];
  products: string[]; // product slugs
};

export const industries: Industry[] = [
  {
    slug: "hotels",
    name: "Hotels",
    headline: "One standard across every room, every reorder.",
    problem:
      "Hotel groups rarely struggle to find towels. They struggle to get the same towel twice. A new batch arrives a little lighter, a shade off-white, with a different border — and housekeeping ends up with mismatched sets.",
    whatMatters: [
      "Weight that suits your laundry cycle, not just the showroom",
      "White that stays consistent between batches",
      "Matched bath, hand and face towels",
      "Packing that suits your receiving and storage",
    ],
    howWeHelp: [
      "We document your approved sample as the production reference",
      "Production checks are made against that reference, not a general standard",
      "Reorders cite the same specification, so nothing is re-explained",
    ],
    products: ["hotel-bath-towels", "bath-sheets", "hand-towels", "face-towels"],
  },
  {
    slug: "boutique-hotels",
    name: "Boutique Hotels",
    headline: "A towel that feels like part of the brand.",
    problem:
      "Boutique properties want something more personal than a catalogue towel, but at volumes that large mills often ignore. The result is either generic stock or a long, uncertain custom process.",
    whatMatters: [
      "A distinctive border, colour or embroidery",
      "Smaller quantities handled properly",
      "A clear sample before committing",
    ],
    howWeHelp: [
      "We help you turn a look and feel into a written specification",
      "We match your brief to a partner suited to your volume",
      "You approve a physical sample before any production",
    ],
    products: ["hotel-bath-towels", "bath-sheets", "hand-towels"],
  },
  {
    slug: "spas",
    name: "Spas & Wellness",
    headline: "Colour, softness and wash-resilience — agreed up front.",
    problem:
      "Spa towels are coloured, washed hot and handled slowly by guests who notice texture. Colour that fades or a hand-feel that hardens after a few washes undermines the whole experience.",
    whatMatters: ["Colour match and colourfastness", "Hand-feel after washing", "Wrap and treatment formats"],
    howWeHelp: [
      "Colour references are agreed on the sample, not described in an email",
      "We note colourfastness and wash expectations in your specification",
      "Spa formats can be added to the same brief as your bath towels",
    ],
    products: ["spa-towels", "bath-sheets", "face-towels"],
  },
  {
    slug: "gyms",
    name: "Gyms & Studios",
    headline: "Towels built for turnover.",
    problem:
      "Gym towels are washed daily, lost often and replaced constantly. Heavy hotel towels drive up laundry costs; cheap ones fray within weeks.",
    whatMatters: ["Lighter weights that dry fast", "Durable hems", "A logo that survives commercial washing"],
    howWeHelp: [
      "We help you specify weight against your laundry setup",
      "Logo method is agreed on the sample",
      "Reorders use the same documented spec, so replacements match",
    ],
    products: ["gym-towels", "hand-towels"],
  },
  {
    slug: "salons",
    name: "Salons",
    headline: "Towels that handle colour, chemicals and constant use.",
    problem:
      "Salon towels see hair colour, bleach and many washes a day. Buyers often discover the wrong colour or fibre choice only after a few weeks of use.",
    whatMatters: ["Colour choice that hides staining", "Size for shoulders and wraps", "Volume pricing on simple items"],
    howWeHelp: [
      "We put use conditions in the brief so partners can advise on construction",
      "You test a sample in your salon before ordering",
      "Standard specs can be reordered without re-briefing",
    ],
    products: ["hand-towels", "face-towels", "spa-towels"],
  },
  {
    slug: "vacation-rentals",
    name: "Vacation Rentals",
    headline: "Hotel-grade sets for portfolios of homes.",
    problem:
      "Rental operators manage many small properties, each needing matched sets. Retail packs are expensive at scale; wholesale often means quantities and paperwork built for large hotels.",
    whatMatters: ["Matched sets across properties", "Durability under frequent turnover", "Practical packing per property"],
    howWeHelp: [
      "We specify a set once, then reuse it across your portfolio",
      "Packing can be planned around how you distribute to properties",
      "One contact for the whole order",
    ],
    products: ["hotel-bath-towels", "hand-towels", "face-towels"],
  },
  {
    slug: "distributors",
    name: "Distributors",
    headline: "A reliable spec you can resell with confidence.",
    problem:
      "Distributors carry the risk when a batch doesn't match what was sold. Your customers expect the same product every time, regardless of which factory run it came from.",
    whatMatters: ["Repeatable specifications", "Clear documentation", "Predictable communication"],
    howWeHelp: [
      "Each product line gets a documented specification",
      "Pre-shipment checks are reported against that specification",
      "A named contact handles your account",
    ],
    products: ["hotel-bath-towels", "bath-sheets", "hand-towels", "face-towels", "gym-towels"],
  },
  {
    slug: "retail-brands",
    name: "Retail Brands",
    headline: "From product idea to shelf-ready towel.",
    problem:
      "Retail brands need more than a towel — they need packaging, labelling and a product that matches the photography. Each of those is a separate conversation with most suppliers.",
    whatMatters: ["Retail packaging and labels", "Colour accuracy", "Consistency across reorders"],
    howWeHelp: [
      "Product, branding and packaging are written into one brief",
      "You approve the sample with its packaging",
      "The approved version becomes the reorder standard",
    ],
    products: ["bath-sheets", "hotel-bath-towels", "hand-towels", "gym-towels"],
  },
  {
    slug: "private-label",
    name: "Private Label Brands",
    headline: "Your brand on the label. Your specification in the towel.",
    problem:
      "Private-label buyers need to know exactly who makes the product and how it will be checked — because their name is on it, not the factory's.",
    whatMatters: ["Clarity on who manufactures", "Logo, label and packaging control", "Confidentiality of your designs"],
    howWeHelp: [
      "We tell you which partner produces your order",
      "Branding and packaging are confirmed on the sample",
      "Your specification belongs to you",
    ],
    products: ["hotel-bath-towels", "bath-sheets", "hand-towels", "spa-towels", "gym-towels"],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
