import type { Metadata } from "next";
import { Suspense } from "react";
import BuyerForm, { type Section } from "@/components/BuyerForm";
import { Towel } from "@/components/ui";
import Photo from "@/components/Photo";
import { site } from "@/content/site";
import { businessTypes, productTypes, colours, brandings, packagings, quantities } from "@/content/spec";

export const metadata: Metadata = {
  title: "Request a sample",
  description: "Request a towel sample made to your specification. Feel it before you buy it.",
  alternates: { canonical: "/sample" },
};

const sections: Section[] = [
  {
    title: "About you",
    fields: [
      { name: "name", label: "Name", required: true, half: true },
      { name: "company", label: "Company", required: true, half: true },
      { name: "role", label: "Role", half: true, placeholder: "e.g. Purchasing manager" },
      { name: "businessType", label: "Business type", type: "select", options: businessTypes, required: true, half: true },
      { name: "email", label: "Work email", type: "email", required: true, half: true },
      { name: "phone", label: "Phone / WhatsApp", type: "tel", half: true },
      { name: "country", label: "Country", required: true, half: true },
    ],
  },
  {
    title: "The towel",
    note: "Rough answers are fine. We'll refine the specification with you before anything is made.",
    fields: [
      { name: "product", label: "Product", type: "select", options: productTypes.map((p) => p.name), required: true, half: true },
      { name: "gsm", label: "GSM", half: true, placeholder: "e.g. 550 — or 'advise me'" },
      { name: "size", label: "Size", half: true, placeholder: "e.g. 70 × 140 cm" },
      { name: "colour", label: "Colour", type: "select", options: colours.map((c) => c.name), half: true },
      { name: "branding", label: "Branding", type: "select", options: brandings, half: true },
      { name: "packaging", label: "Packaging", type: "select", options: packagings, half: true },
      { name: "quantity", label: "Estimated order quantity", type: "chips", options: quantities },
      { name: "destination", label: "Destination", placeholder: "Country and city / port", half: true },
      { name: "message", label: "Anything else?", type: "textarea", placeholder: "Use conditions, a towel you want to match, timing…" },
    ],
  },
];

export default function Page() {
  return (
    <section className="wrap pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-6">Request a sample</p>
            <h1 className="h2 !text-[clamp(2.4rem,4.4vw,3.8rem)]">Feel it before you buy it.</h1>
            <p className="lede mt-6">Specifications tell you what a towel is. A sample tells you how it feels.</p>
            <div className="relative mt-10 hidden h-40 lg:block">
              <Photo
                slot="folded-stack"
                sizes="380px"
                className="rounded-[18px]"
                fallback={
                  <>
                    <Towel tone="white" className="absolute inset-x-[6%] top-0 h-[46%]" />
                    <Towel tone="stone" className="absolute inset-x-0 top-[40%] h-[50%]" />
                  </>
                }
              />
            </div>
            <ul className="mt-10 space-y-3 text-[15px] text-graphite">
              <li className="flex gap-3"><span className="mt-[10px] h-px w-3 shrink-0 bg-clay" />{site.terms.samplePolicy ?? "Sample cost and timing are confirmed with you before anything is made."}</li>
              <li className="flex gap-3"><span className="mt-[10px] h-px w-3 shrink-0 bg-clay" />Your approved sample becomes the reference for production.</li>
              <li className="flex gap-3"><span className="mt-[10px] h-px w-3 shrink-0 bg-clay" />{site.contact.hours}.</li>
            </ul>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Suspense>
            <BuyerForm
              kind="sample"
              sections={sections}
              submitLabel="Request my sample"
              successTitle="Your sample request has been received."
              contactEmail={site.contact.email}
              nextSteps={[
                { t: "We review your request", d: "A named person on our team reads it and checks the specification for gaps." },
                { t: "We confirm details with you", d: "Specification, sample cost, timing and delivery — in writing, before anything is made." },
                { t: "A manufacturing partner makes the sample", d: "We tell you which partner, and send the sample to you." },
                { t: "You review and approve", d: "Wash it, use it, compare it. Changes go into the specification. Your approval sets the standard." },
              ]}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
