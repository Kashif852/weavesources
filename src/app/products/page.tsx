import type { Metadata } from "next";
import { PageHero, Button } from "@/components/ui";
import { ProductGrid, SampleBand, FinalCta } from "@/components/sections";

export const metadata: Metadata = {
  title: "Towels for hotels, spas and private label",
  description: "Hotel bath towels, bath sheets, hand towels, washcloths, spa and gym towels — sourced to your specification from manufacturing partners in Pakistan.",
  alternates: { canonical: "/products" },
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={<>A focused collection.<br /><span className="text-muted">Made to your specification.</span></>}
        lede="We start with towels and do them properly. Each product page explains how it's used, what to specify, and the reference points buyers commonly start from."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/specification" variant="primary">Build your specification</Button>
          <Button href="/sample" variant="ghost">Request a sample</Button>
        </div>
      </PageHero>
      <ProductGrid />
      <SampleBand />
      <FinalCta />
    </>
  );
}
