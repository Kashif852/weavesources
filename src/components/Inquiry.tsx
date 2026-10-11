import type { Section } from "./BuyerForm";
import { BuyerForm } from "./BuyerForm";
import { visibleProducts } from "@/content/products";
import { quantities } from "@/content/spec";
import { site } from "@/content/site";

export const intents = [
  "Request a quote",
  "Request a sample",
  "Discuss custom specifications",
  "Request partner documentation",
  "Request the product catalog",
  "General question",
];

/** Link to the contact form with the intent (and optionally a product) chosen. */
export const inquiryHref = (intent: string, product?: string) => {
  const q = new URLSearchParams({ intent });
  if (product) q.set("interest", product);
  return `/contact?${q.toString()}#inquiry`;
};

export const inquirySections: Section[] = [
  {
    title: "What you need",
    fields: [
      { name: "intent", label: "I'd like to", type: "chips", options: intents, required: true },
      {
        name: "interest",
        label: "Product interest",
        type: "select",
        options: [...visibleProducts.map((p) => p.name), "Several products", "Not sure yet"],
        required: true,
      },
    ],
  },
  {
    title: "About you",
    fields: [
      { name: "name", label: "Name", required: true, half: true },
      { name: "email", label: "Business email", type: "email", required: true, half: true },
      { name: "company", label: "Company", required: true, half: true },
      { name: "country", label: "Country", required: true, half: true },
    ],
  },
  {
    title: "Your requirements",
    note: "Optional. Rough answers help us reply with useful questions rather than generic ones.",
    fields: [
      { name: "quantity", label: "Estimated quantity or annual requirement", type: "select", options: quantities, half: true },
      { name: "customisation", label: "Customisation", half: true, placeholder: "e.g. embroidered logo, custom colour" },
      { name: "message", label: "Additional notes", type: "textarea", placeholder: "Use, sizes, a towel you want to match, compliance documents you need, timing…" },
    ],
  },
];

export const inquiryNextSteps = [
  { t: "A named person reads it", d: `${site.contact.hours}.` },
  { t: "We reply with questions or next steps", d: "For quotes and samples, we confirm the specification and check it with a suitable manufacturing partner first." },
  { t: "Terms are confirmed in writing", d: "Pricing, minimums, sample cost and timing — before you commit to anything." },
];

/** The inquiry form without URL prefill — for pages where it sits inline. */
export function InquiryForm() {
  return (
    <BuyerForm
      kind="inquiry"
      sections={inquirySections}
      submitLabel="Send inquiry"
      successTitle="Your inquiry has been sent."
      contactEmail={site.contact.email}
      nextSteps={inquiryNextSteps}
    />
  );
}
