/** Options for the specification builder and forms. Reference guidance only. */

export const uses = ["Hotel", "Boutique hotel", "Spa", "Gym", "Salon", "Vacation rental", "Retail / private label", "Distribution"];

export const productTypes = [
  { name: "Bath towel", sizes: ["70 × 140 cm", "76 × 152 cm", "27 × 54 in", "30 × 56 in"] },
  { name: "Bath sheet", sizes: ["90 × 160 cm", "100 × 150 cm", "35 × 60 in", "40 × 70 in"] },
  { name: "Hand towel", sizes: ["40 × 70 cm", "50 × 90 cm", "16 × 30 in", "20 × 30 in"] },
  { name: "Face towel / washcloth", sizes: ["30 × 30 cm", "33 × 33 cm", "13 × 13 in"] },
  { name: "Spa towel", sizes: ["70 × 140 cm", "80 × 160 cm (wrap)", "40 × 70 cm"] },
  { name: "Gym / sports towel", sizes: ["30 × 90 cm", "40 × 80 cm", "50 × 100 cm"] },
  { name: "Bath mat", sizes: ["50 × 80 cm", "20 × 30 in"] },
];

export const materials = ["100% cotton", "Combed cotton", "Ring-spun cotton", "Zero-twist cotton", "Cotton / polyester blend", "Not sure — advise me"];

export const gsmBands = [
  { min: 300, max: 399, name: "Light", note: "Fastest drying and lowest laundry cost. Common for gyms, pools and high-turnover use." },
  { min: 400, max: 499, name: "Mid-light", note: "Practical for high-volume operations where drying time matters." },
  { min: 500, max: 599, name: "Balanced", note: "A common hospitality choice — a fuller hand-feel without long drying cycles." },
  { min: 600, max: 699, name: "Substantial", note: "A plush, premium feel. Takes longer to dry and costs more to launder." },
  { min: 700, max: 800, name: "Heavy", note: "Luxury feel for low-turnover use. Heaviest laundry load." },
];
export const bandFor = (g: number) => gsmBands.find((b) => g >= b.min && g <= b.max) ?? gsmBands[2];

export const colours = [
  { name: "White", hex: "#f8f6f1" },
  { name: "Ivory", hex: "#efe7d6" },
  { name: "Stone", hex: "#d9d1c3" },
  { name: "Sand", hex: "#e2d3b9" },
  { name: "Sage", hex: "#a9b09f" },
  { name: "Charcoal", hex: "#3b3935" },
  { name: "Navy", hex: "#2c3546" },
  { name: "Custom / Pantone", hex: "" },
];

export const borders = ["Dobby border", "Plain (no border)", "Jacquard border", "Satin / cam border", "Not sure — advise me"];
export const brandings = ["None", "Embroidered logo", "Woven / jacquard logo", "Brand label only", "Not sure yet"];
export const packagings = ["Bulk export carton", "Bundled (e.g. 10 pcs) in carton", "Individually poly-bagged", "Retail-ready packaging", "Not sure — advise me"];
export const quantities = ["Under 500 pcs", "500 – 2,000 pcs", "2,000 – 10,000 pcs", "10,000+ pcs", "Not sure yet"];
export const timelines = ["As soon as possible", "1–3 months", "3–6 months", "6+ months", "Researching for now"];
export const budgets = ["Prefer not to say", "Under US$5,000", "US$5,000 – 25,000", "US$25,000 – 100,000", "US$100,000+"];
export const businessTypes = ["Hotel / hotel group", "Boutique hotel", "Spa / wellness", "Gym / studio", "Salon", "Vacation rental operator", "Distributor / wholesaler", "Retail brand", "Private-label brand", "Other"];

/** Spec fields carried between builder → sample → brief via URL query. */
export const specKeys = ["use", "product", "material", "gsm", "size", "colour", "border", "branding", "packaging", "quantity", "destination"] as const;
export type SpecKey = (typeof specKeys)[number];
export type Spec = Partial<Record<SpecKey, string>>;

export const specLabels: Record<SpecKey, string> = {
  use: "Use",
  product: "Product",
  material: "Material",
  gsm: "GSM",
  size: "Size",
  colour: "Colour",
  border: "Border",
  branding: "Branding",
  packaging: "Packaging",
  quantity: "Quantity",
  destination: "Destination",
};
