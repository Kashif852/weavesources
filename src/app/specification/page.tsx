import type { Metadata } from "next";
import { Suspense } from "react";
import SpecBuilder from "@/components/SpecBuilder";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Build your towel specification",
  description: "Configure a towel specification — use, product, GSM, size, colour, border, branding, packaging — and request a sample made to it.",
  alternates: { canonical: "/specification" },
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Specification builder"
        title={<>Build your towel specification.</>}
        lede="Choose each detail and watch your specification take shape. When it looks right, request a sample made to it — or send it as a full sourcing brief. Nothing is committed until you approve a sample."
      />
      <section className="wrap pb-24 md:pb-32">
        <Suspense fallback={<div className="h-[600px] rounded-[24px] bg-linen" />}>
          <SpecBuilder />
        </Suspense>
      </section>
    </>
  );
}
