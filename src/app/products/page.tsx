import type { Metadata } from "next";
import { PageHero, Button } from "@/components/ui";
import { SampleBand, FinalCta } from "@/components/sections";
import { CategoryBlock, IllustrativeNote } from "@/components/catalog";
import { visibleCategories, visibleProducts } from "@/content/products";
import { inquiryHref } from "@/components/Inquiry";

export const metadata: Metadata = {
  title: "Towel products — bath, hotel, beach, kitchen, spa towels and bathrobes",
  description:
    "Cotton bath towels, hotel towels, beach and pool towels, kitchen textiles, spa and gym towels and terry bathrobes — sourced from manufacturers in Pakistan to your specification. Wholesale and private label.",
  alternates: { canonical: "/products" },
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={<>{visibleProducts.length} products in {visibleCategories.length} categories.<br /><span className="text-muted">Each made to your specification.</span></>}
        lede="Every product page lists the specification fields we agree with you, the industry reference points buyers start from, and the customisation and packaging options to discuss. Values are confirmed with a manufacturing partner during quotation — we don’t publish what we haven’t verified."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={inquiryHref("Request a quote")} variant="primary">Request a quote</Button>
          <Button href="/specification" variant="ghost">Build your specification</Button>
        </div>
      </PageHero>

      <nav className="wrap pb-6" aria-label="Product categories">
        <ul className="flex flex-wrap gap-2">
          {visibleCategories.map((c) => (
            <li key={c.slug}>
              <a href={`#${c.slug}`} className="chip !min-h-[40px] !text-[14px]">{c.name}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="wrap space-y-20 pb-16 pt-6">
        {visibleCategories.map((c) => <CategoryBlock key={c.slug} c={c} />)}
        <IllustrativeNote className="max-w-3xl" />
      </div>
      <SampleBand />
      <FinalCta />
    </>
  );
}
