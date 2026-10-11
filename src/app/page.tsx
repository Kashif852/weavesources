import type { CSSProperties } from "react";
import Image from "next/image";
import { Button } from "@/components/ui";
import { SpecCard } from "@/components/SpecCard";
import { PrivateLabel, People, Faq } from "@/components/sections";
import {
  CategoryGrid,
  WhySource,
  OrderProcess,
  Capabilities,
  QualityAssurance,
  PartnerNetwork,
  ExportMarkets,
  CatalogBand,
  InquirySection,
} from "@/components/home";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const buyers = ["Importers & distributors", "Hotel & hospitality supply", "Private-label & retail brands", "Spa, gym & institutional"];

const commitments = [
  ["A sample before every new product", "No production without a physical sample you have approved."],
  ["Your specification, in writing", "Every field that defines your towel, documented and yours to keep."],
  ["We name the manufacturer", "You'll know which partner makes your order. We're a sourcing company, not a factory."],
  ["One accountable contact", "A named person handles your order from brief to shipment."],
];

export default function Home() {
  return (
    <>
      {/* 01 — HERO */}
      <section className="relative overflow-hidden">
        <div className="wrap grid min-h-[100svh] items-center gap-12 pb-16 pt-32 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-28">
          <div className="lg:col-span-6 xl:col-span-6">
            <p className="eyebrow mb-7" data-reveal>Towel sourcing from Pakistan · for US &amp; international buyers</p>
            <h1 className="display" data-reveal style={d(80)}>
              Pakistani towels, sourced to your specification.
            </h1>
            <p className="lede mt-8 max-w-[36rem]" data-reveal style={d(160)}>
              WeaveSources is your sourcing partner for Pakistani towels. We connect importers, hospitality suppliers and private-label brands with suitable independent manufacturers — then coordinate the specification, sample approval, quality checks and export.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2" data-reveal style={d(200)} aria-label="Buyers we work with">
              {buyers.map((b) => (
                <li key={b} className="rounded-full border border-ink/12 px-3 py-1.5 text-[13px] text-graphite">{b}</li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal style={d(240)}>
              <Button href="/products" variant="primary">Explore products</Button>
              <Button href="#inquiry" variant="ghost">Request a quote or sample</Button>
            </div>
          </div>

          <div className="relative lg:col-span-6" data-reveal style={d(200)}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-[28px] bg-linen sm:rounded-[32px]">
              <Image
                src="/images/category-bath-hand-towels.jpg"
                alt="Folded cotton terry bath towels, hand towels and washcloths in white, navy, charcoal and taupe"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                quality={75}
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-paper/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-graphite">Illustrative product styling</span>
            </div>
            <SpecCard
              compact
              status="Draft"
              reference="WS-SPEC · EXAMPLE"
              className="relative -mt-16 ml-auto mr-2 w-[86%] max-w-[330px] sm:absolute sm:-bottom-8 sm:right-0 sm:mt-0 sm:w-[60%] lg:-right-8 lg:w-[70%]"
              fields={[
                { k: "Use", v: "Hotel" },
                { k: "Product", v: "Bath towel" },
                { k: "GSM", v: "600" },
                { k: "Size", v: "27 × 54 in" },
                { k: "Colour", v: "White" },
                { k: "Branding", v: "Custom embroidery" },
                { k: "Packaging", v: "Bulk carton" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 02 — TRUST WITHOUT FAKE CLAIMS */}
      <section className="border-y border-ink/10 bg-paper">
        <div className="wrap grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map(([t, s], i) => (
            <div key={t} className="py-6 sm:py-8 sm:px-6 sm:first:pl-0 lg:border-l lg:border-ink/10 lg:first:border-0" data-reveal style={d(i * 80)}>
              <p className="font-mono text-[11px] text-clay">0{i + 1}</p>
              <p className="mt-3 text-[17px] font-medium tracking-[-0.015em]">{t}</p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <CategoryGrid index="01" />
      <WhySource index="02" />
      <OrderProcess index="03" />
      <Capabilities index="04" />
      <QualityAssurance index="05" />
      <PartnerNetwork index="06" />
      <ExportMarkets index="07" />
      <PrivateLabel index="08" />
      <People index="09" />
      <CatalogBand />
      <Faq index="10" />
      <InquirySection index="11" />
    </>
  );
}
