/**
 * Manufacturing partners, their credentials, and the production capabilities
 * available through them.
 *
 * RULE: nothing here may be invented. Every list starts empty or unverified,
 * and the site shows an honest "not yet published" state until real,
 * checked information is added.
 *
 * - A credential belongs to the partner that holds it — never to WeaveSources,
 *   and never to "all products". Record the exact holder, facility and scope.
 * - A partner's name is published only with their written agreement
 *   (`disclosure: "public"`). Otherwise the profile shows location and
 *   capabilities, and the name is shared with qualified buyers on request.
 * - Photos must be real photographs of that partner's facility, taken or
 *   supplied with permission. Never use illustrations here.
 */

export type PartnerCredential = {
  id: string;
  name: string; // e.g. "OEKO-TEX® STANDARD 100"
  holder: string; // the legal entity named on the certificate
  issuer: string; // certification or testing body
  reference: string | null; // certificate / report number, where appropriate to publish
  scope: string; // products or processes covered, as stated on the certificate
  facility: string; // site the certificate applies to
  validFrom: string | null; // ISO date
  validUntil: string | null; // ISO date
  verification: string; // how a buyer can verify it, e.g. issuer's online database, or "Copy on request"
  verificationUrl?: string;
  checkedOn: string; // ISO date WeaveSources last checked it against the issuer
  partnerId?: string;
};

export type PartnerProfile = {
  id: string;
  disclosure: "public" | "on-request";
  name: string | null; // only when disclosure === "public"
  location: string; // city / region, e.g. "Faisalabad, Punjab"
  products: string[]; // category or product slugs from products.ts
  processes: string[]; // capability keys below, verified at this partner
  photos: { src: string; caption: string }[]; // real photographs only
  credentialIds: string[];
  verifiedOn: string; // ISO date of WeaveSources' last assessment / visit
  note?: string;
};

export const partners: PartnerProfile[] = [];
export const credentials: PartnerCredential[] = [];

/**
 * Candidate capabilities. `verified` becomes true only once at least one
 * active partner has been confirmed to perform the process to the required
 * standard (record which partner in `verifiedAt`). Until then the site
 * describes them as processes that are confirmed per order.
 */
export type Capability = {
  key: string;
  name: string;
  detail: string;
  image?: string; // illustration in /public/images (labelled as such)
  verified: boolean;
  verifiedAt?: string[]; // partner ids
};

export const capabilities: Capability[] = [
  { key: "weaving", name: "Terry weaving", detail: "Loop pile woven on terry looms. Pile height, ply and pick density define weight and hand-feel.", image: "mfg-weaving-hall.jpg", verified: false },
  { key: "dyeing", name: "Dyeing & processing", detail: "Piece-dyed or yarn-dyed colour, bleaching and softening. Colour is matched to your reference.", image: "mfg-dyeing-and-finishing.jpg", verified: false },
  { key: "stitching", name: "Cutting & stitching", detail: "Cut to finished size, hemmed and bordered. Stitch density and hem style are part of the specification.", image: "mfg-stitching-and-hemming.jpg", verified: false },
  { key: "embroidery", name: "Embroidery & logos", detail: "Embroidered, woven or jacquard logos — method depends on the product and the volume.", verified: false },
  { key: "private-label", name: "Private labelling", detail: "Brand, care and size labels, swing tags and barcodes to your artwork.", verified: false },
  { key: "inspection", name: "Inspection", detail: "In-line checks by the partner, and a pre-shipment check against your approved sample.", image: "mfg-quality-inspection.jpg", verified: false },
  { key: "packing", name: "Export packing", detail: "Bundling, poly-bagging, retail packaging, carton marks and palletising for export.", image: "mfg-packing-and-export.jpg", verified: false },
];

export const verifiedCapabilities = capabilities.filter((c) => c.verified);
