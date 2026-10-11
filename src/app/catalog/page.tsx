import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Arrow } from "@/components/ui";
import { FinalCta } from "@/components/sections";
import { visibleCategories, productsIn } from "@/content/products";
import { site } from "@/content/site";
import { inquiryHref } from "@/components/Inquiry";

export const metadata: Metadata = {
  title: "Product catalog (PDF) — Pakistani towel sourcing",
  description:
    "Download the WeaveSources product catalog: towel categories and products, specification options, customisation and private label, sampling and quality process, and how to request a quote.",
  alternates: { canonical: "/catalog" },
};

const contents = [
  "Our sourcing model",
  "How an order works, and what is checked",
  "Product categories",
  "One page per product, with specification fields and reference points",
  "Customisation and private-label options",
  "Packaging and export coordination",
  "Manufacturing partners and credentials",
  "How to request a quote or sample",
];

export default function Page() {
  const shareHref = `mailto:?subject=${encodeURIComponent("WeaveSources towel sourcing catalog")}&body=${encodeURIComponent(
    `WeaveSources' product catalog for Pakistani towel sourcing:\n${site.url}${site.catalog.pdf}\n\nProduct pages: ${site.url}/products`
  )}`;
  return (
    <>
      <PageHero
        eyebrow={`Product catalog · ${site.catalog.edition}`}
        title={<>The catalog,<br /><span className="text-muted">ready to forward.</span></>}
        lede="Every category and product, with the specification fields we agree with buyers, the sampling and quality process, and how to request a quote — in one A4 PDF."
      >
        <div className="flex flex-wrap gap-3">
          <a href={site.catalog.pdf} className="btn btn-primary" download>Download catalog (PDF) <Arrow /></a>
          <a href={shareHref} className="btn btn-ghost">Email it to a colleague</a>
        </div>
      </PageHero>

      <section className="wrap pb-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label">Inside</p>
            <ol className="mt-4">
              {contents.map((x, i) => (
                <li key={x} className="grid grid-cols-[40px_1fr] border-t border-ink/12 py-3.5 text-[16px] last:border-b">
                  <span className="pt-1 font-mono text-[11px] text-clay">{String(i + 1).padStart(2, "0")}</span>
                  {x}
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="label">Products in this edition</p>
            <div className="mt-4 space-y-6">
              {visibleCategories.map((c) => (
                <div key={c.slug}>
                  <Link href={`/collections/${c.slug}`} className="link-u text-[18px] font-medium tracking-[-0.015em]">{c.name}</Link>
                  <p className="mt-1 text-[14.5px] text-muted">
                    {productsIn(c.slug).map((p) => `${p.name} (${p.sku})`).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-[22px] bg-linen p-6 text-[14.5px] leading-relaxed text-graphite">
              The catalog contains no prices, stock levels, minimum order quantities or certifications that haven&apos;t been confirmed. Those are agreed for your specification during quotation. Images are illustrative.{" "}
              <Link href={inquiryHref("Request a quote")} className="link-u text-ink">Request a quote</Link>.
            </div>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
