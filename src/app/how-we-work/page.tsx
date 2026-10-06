import type { Metadata } from "next";
import { PageHero, Button } from "@/components/ui";
import { SeeHowWeWork, SourcingModel, WhatYouReceive, Reorder, FinalCta, Faq } from "@/components/sections";

export const metadata: Metadata = {
  title: "How we work — towel sourcing from specification to shipment",
  description: "How WeaveSources sources towels: specification, sample, approval, production, quality check, packing and shipment — and who is responsible at each step.",
  alternates: { canonical: "/how-we-work" },
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title={<>From specification<br />to shipment.</>}
        lede="Seven steps, four parties, one written specification holding it all together. This page shows exactly how an order moves — and who is responsible for what."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/brief" variant="primary">Send a sourcing brief</Button>
          <Button href="/sample" variant="ghost">Request a sample</Button>
        </div>
      </PageHero>
      <SourcingModel index="01" />
      <SeeHowWeWork index="02" />
      <WhatYouReceive index="03" />
      <Reorder index="04" />
      <Faq />
      <FinalCta />
    </>
  );
}
