import type { Metadata } from "next";
import { Suspense } from "react";
import BuyerForm, { type Section } from "@/components/BuyerForm";
import { site } from "@/content/site";
import { businessTypes, productTypes, colours, brandings, packagings, quantities, materials, timelines, budgets } from "@/content/spec";

export const metadata: Metadata = {
  title: "Build your sourcing brief",
  description: "Send a complete towel sourcing brief — product, quantity, GSM, size, branding, packaging, destination and timeline.",
  alternates: { canonical: "/brief" },
};

const sections: Section[] = [
  {
    title: "Your company",
    fields: [
      { name: "name", label: "Your name", required: true, half: true },
      { name: "email", label: "Work email", type: "email", required: true, half: true },
      { name: "company", label: "Company", required: true, half: true },
      { name: "country", label: "Country", required: true, half: true },
      { name: "industry", label: "Industry", type: "select", options: businessTypes, required: true, half: true },
      { name: "phone", label: "Phone / WhatsApp", type: "tel", half: true },
    ],
  },
  {
    title: "The product",
    fields: [
      { name: "product", label: "Product", type: "select", options: productTypes.map((p) => p.name), required: true, half: true },
      { name: "material", label: "Material", type: "select", options: materials, half: true },
      { name: "gsm", label: "GSM", half: true, placeholder: "e.g. 550" },
      { name: "size", label: "Size", half: true, placeholder: "e.g. 70 × 140 cm" },
      { name: "colour", label: "Colour", type: "select", options: colours.map((c) => c.name), half: true },
      { name: "border", label: "Border / construction", half: true, placeholder: "e.g. dobby border" },
    ],
  },
  {
    title: "Branding & packaging",
    fields: [
      { name: "branding", label: "Branding", type: "select", options: brandings, half: true },
      { name: "packaging", label: "Packaging", type: "select", options: packagings, half: true },
    ],
  },
  {
    title: "Order",
    fields: [
      { name: "quantity", label: "Quantity", type: "chips", options: quantities, required: true },
      { name: "destination", label: "Destination", placeholder: "Country and city / port", required: true, half: true },
      { name: "timeline", label: "Target timeline", type: "select", options: timelines, half: true },
      { name: "budget", label: "Budget range", type: "select", options: budgets, half: true, hint: "Helps us match partners. Never shared with them without your agreement." },
      { name: "message", label: "Message", type: "textarea", placeholder: "Current supplier issues, a towel you want to match, compliance requirements…" },
    ],
  },
];

export default function Page() {
  return (
    <section className="wrap pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-6">Request a quote</p>
            <h1 className="h2 !text-[clamp(2.4rem,4.4vw,3.8rem)]">Build your sourcing brief.</h1>
            <p className="lede mt-6">The more we know, the more precise our reply. Unsure about a field? Leave it blank or choose &ldquo;advise me&rdquo; — that&apos;s what we&apos;re here for.</p>
            <div className="mt-10 rounded-2xl bg-linen p-6">
              <p className="label">What you&apos;ll get back</p>
              <ul className="mt-4 space-y-3 text-[15px] text-graphite">
                <li>A written specification for you to check</li>
                <li>Questions on anything unclear</li>
                <li>Indicative pricing, minimums and timing — once confirmed with a suitable manufacturing partner</li>
                <li>A proposed sample plan</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Suspense>
            <BuyerForm
              kind="brief"
              sections={sections}
              submitLabel="Send my sourcing brief"
              successTitle="Your brief has been received."
              contactEmail={site.contact.email}
              nextSteps={[
                { t: "We read your brief", d: `${site.contact.hours}. A named person replies — not an autoresponder.` },
                { t: "We turn it into a specification", d: "Every field written down, with questions on anything unclear." },
                { t: "We match a manufacturing partner", d: "Chosen for your product, volume and branding. We tell you who it is." },
                { t: "We confirm terms in writing", d: "Pricing, minimums, sample cost, lead time and shipping terms — before you commit." },
                { t: "Sample, then approval", d: "Nothing goes into production until you approve a physical sample." },
              ]}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
