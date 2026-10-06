/**
 * WeaveSources — single source of truth for company facts.
 *
 * RULE: nothing in this file may be invented. Every value marked `null` or
 * listed in an empty array renders as an honest "to be confirmed" state on the
 * site (or the block is hidden). Fill these in only with verified information.
 */

export type TeamMember = {
  name: string;
  role: string;
  location: string;
  linkedin?: string;
  photo?: string; // path in /public, e.g. "/team/name.jpg"
  note?: string; // one line on what they handle for buyers
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  country: string;
  linkedin?: string;
};

export type Certification = {
  name: string;
  holder: string; // which manufacturing partner holds it — never "WeaveSources" unless true
  verifiedOn: string; // ISO date the certificate was checked
  link?: string;
};

export type PhoneLine = {
  region: string; // which team answers this line
  display: string; // as printed
  digits: string; // international digits only, used for tel: and WhatsApp links
  whatsapp: boolean;
};

export type Office = { name: string; lines: string[] };

export type RegionStatus = "active" | "building" | "partner";

export const site = {
  name: "WeaveSources",
  domain: "weavesources.com",
  url: "https://weavesources.com",
  tagline: "Know exactly what you're ordering.",
  description:
    "WeaveSources is a textile sourcing partner for hotels, spas, distributors and private-label brands. We turn your towel specification into an approved sample, then coordinate production, quality checks and export with vetted manufacturing partners in Pakistan.",

  // ── Contact ─────────────────────────────────────────────
  contact: {
    email: "hello@weavesources.com" as string | null,
    lines: [
      { region: "United States", display: "+1 727 833 3236", digits: "17278333236", whatsapp: true },
      { region: "Pakistan", display: "+92 303 2831741", digits: "923032831741", whatsapp: true },
    ] as PhoneLine[],
    // Number used by the mobile WhatsApp button (digits only).
    whatsapp: "17278333236" as string | null,
    linkedin: null as string | null, // company page URL
    instagram: null as string | null,
    facebook: null as string | null,
    hours: "Replies within one business day (Mon–Fri, Karachi and Seattle)",
  },

  // ── Legal entity ─────────────────────────────────────────── TO CONFIRM
  company: {
    legalName: null as string | null,
    registration: null as string | null, // registration / NTN number
    registeredAddress: null as string | null,
    founded: null as string | null, // year the company was formed
    // One honest sentence on where the business operates, e.g.
    // "Sourcing and quality coordination in Pakistan; business development from Sydney."
    operations: "Sourcing, sampling, quality coordination and export from Karachi, Pakistan. U.S. operations from Seattle, Washington." as string | null,
  },

  // ── Offices ─────────────────────────────────────────────
  offices: [
    { name: "Pakistan Operations", lines: ["Karachi, Pakistan"] },
    { name: "U.S. Office", lines: ["1200 12th Ave S, Suite 803", "Seattle, WA 98144", "United States"] },
  ] as Office[],

  // ── People ───────────────────────────────────────────────── TO CONFIRM
  // Add real people only. Two real people beat ten invented ones.
  team: [
    {
      name: "Kashif Hussain",
      role: "Co-Founder & Head of Operations",
      location: "Karachi, Pakistan",
      photo: "/team/kashif-hussain.jpg",
      // linkedin: "https://www.linkedin.com/in/…",
    },
    {
      name: "Dr. Jean-Paul Yafali",
      role: "Co-Founder & U.S. Operations",
      location: "Seattle, Washington, USA",
      photo: "/team/jean-paul-yafali.jpg",
      // linkedin: "https://www.linkedin.com/in/…",
    },
  ] as TeamMember[],

  // ── Proof ─────────────────────────────────────────────────── EMPTY UNTIL REAL
  testimonials: [] as Testimonial[],
  certifications: [] as Certification[],
  caseStudies: [] as { title: string; href: string }[],

  // ── Commercial terms ─────────────────────────────────────── TO CONFIRM
  terms: {
    moq: null as string | null, // e.g. "From 500 pieces per colour/size"
    samplePolicy: null as string | null, // e.g. "Sample cost credited against first order"
    leadTime: null as string | null,
    incoterms: null as string | null, // e.g. "FOB Karachi, CIF on request"
    payment: null as string | null,
  },

  // ── Geography ─────────────────────────────────────────────
  // Only "active" for places where real work happens today.
  // If a founder or representative genuinely works from a market (e.g. business
  // development from Australia), set that region's role to "Business development",
  // status "partner", and describe it accurately.
  regions: [
    {
      key: "pakistan",
      name: "Pakistan",
      role: "Manufacturing & sourcing",
      detail: "Our Karachi operations. Where manufacturing partners produce, and where sampling, quality checks and export coordination happen.",
      status: "active" as RegionStatus,
    },
    {
      key: "usa",
      name: "United States",
      role: "U.S. operations",
      detail: "Our U.S. office in Seattle, Washington, led by co-founder Dr. Jean-Paul Yafali.",
      status: "active" as RegionStatus,
    },
    {
      key: "europe",
      name: "Europe & UK",
      role: "Buyer market",
      detail: "Hospitality groups and distributors. Served remotely.",
      status: "building" as RegionStatus,
    },
    {
      key: "middleeast",
      name: "Middle East",
      role: "Buyer market",
      detail: "Hospitality suppliers and hotel groups. Served remotely.",
      status: "building" as RegionStatus,
    },
    {
      key: "apac",
      name: "Asia-Pacific",
      role: "Buyer market",
      detail: "Australia and Southeast Asia. Served remotely.",
      status: "building" as RegionStatus,
    },
  ],

  // Form submissions are POSTed to this webhook (Zapier, Make, Formspree…)
  // configured via the FORM_WEBHOOK_URL environment variable.
};

export const whatsappHref = (text = "Hello WeaveSources, I'd like to discuss a towel sourcing brief.") =>
  site.contact.whatsapp ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}` : null;
