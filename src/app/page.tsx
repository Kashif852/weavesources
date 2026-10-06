import type { CSSProperties } from "react";
import { Button, Towel } from "@/components/ui";
import { SpecCard } from "@/components/SpecCard";
import Photo from "@/components/Photo";
import {
  SeeHowWeWork,
  ProductGrid,
  WhyWeExist,
  SourcingModel,
  QualitySystem,
  WhatYouReceive,
  Reorder,
  GlobalNetwork,
  PrivateLabel,
  People,
  Proof,
  SampleBand,
  ResourcesTeaser,
  Faq,
  FinalCta,
} from "@/components/sections";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

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
            <p className="eyebrow mb-7" data-reveal>Towel sourcing for hospitality &amp; private-label buyers</p>
            <h1 className="display" data-reveal style={d(80)}>
              Know exactly what you&apos;re ordering.
            </h1>
            <p className="lede mt-8 max-w-[34rem]" data-reveal style={d(160)}>
              WeaveSources sources towels for hotels, spas, distributors and private-label brands. We write your specification, have a sample made by a vetted manufacturing partner in Pakistan, and check production against what you approved.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal style={d(240)}>
              <Button href="/sample" variant="primary">Request a sample</Button>
              <Button href="/specification" variant="ghost">Build your specification</Button>
            </div>
          </div>

          <div className="relative lg:col-span-6" data-reveal style={d(200)}>
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-[28px] bg-linen sm:aspect-square sm:rounded-[32px]">
              <Photo
                slot="hero"
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                fallback={
                  <>
                    <div className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 70% 10%, #fffaf2 0%, transparent 60%)" }} />
                    <Towel tone="stone" className="absolute left-[10%] right-[18%] top-[56%] h-[17%]" />
                    <Towel tone="white" className="absolute left-[8%] right-[16%] top-[41%] h-[18%]" />
                    <Towel tone="white" className="absolute left-[12%] right-[20%] top-[27%] h-[17%]" />
                    <div className="absolute inset-x-0 bottom-0 h-[22%]" style={{ background: "linear-gradient(transparent, rgb(29 28 26 / .06))" }} />
                  </>
                }
              />
            </div>
            <SpecCard
              compact
              status="Sample requested"
              reference="WS-SPEC · 0001"
              className="relative -mt-16 ml-auto mr-2 w-[86%] max-w-[330px] sm:absolute sm:-bottom-8 sm:right-0 sm:mt-0 sm:w-[60%] lg:-right-8 lg:w-[78%]"
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

      <SeeHowWeWork index="02" />
      <ProductGrid index="03" />
      <WhyWeExist index="04" />
      <SourcingModel index="05" />

      {/* 06 — SPECIFICATION */}
      <section className="bg-linen">
        <div className="wrap grid items-center gap-16 py-24 md:py-36 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5" data-reveal><span className="text-clay mr-3">06</span>The specification</p>
            <h2 className="h2" data-reveal>Build your towel specification.</h2>
            <p className="lede mt-6" data-reveal>
              Choose the use, product, weight, size, colour, branding and packaging. See your specification take shape as you go — then request a sample made to it.
            </p>
            <p className="mt-4 text-[15px] text-muted" data-reveal>
              Not sure about GSM or sizes? Every option explains what it means in practice.
            </p>
            <div className="mt-10" data-reveal><Button href="/specification" variant="primary">Open the specification builder</Button></div>
          </div>
          <div className="relative lg:col-span-6 lg:col-start-7" data-reveal>
            <div className="mx-auto max-w-[460px] rounded-[28px] bg-paper p-5 shadow-[0_0_0_1px_rgb(0_0_0/.05)] sm:p-7">
              <p className="label mb-3">GSM · weight</p>
              <div className="relative h-2 rounded-full bg-stone">
                <div className="absolute inset-y-0 left-0 w-[60%] rounded-full bg-ink" />
                <div className="absolute left-[60%] top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-ink bg-paper" />
              </div>
              <div className="mt-3 flex justify-between font-mono text-[11px] text-muted"><span>350</span><span className="text-ink">600 GSM · Substantial</span><span>800</span></div>
              <p className="label mt-7 mb-3">Branding</p>
              <div className="flex flex-wrap gap-2">
                {["None", "Embroidery", "Woven border", "Label only"].map((x, i) => (
                  <span key={x} className="chip !min-h-[38px] !text-[13.5px]" data-on={i === 1}>{x}</span>
                ))}
              </div>
              <p className="label mt-7 mb-3">Packaging</p>
              <div className="flex flex-wrap gap-2">
                {["Bulk carton", "Bundled", "Retail-ready"].map((x, i) => (
                  <span key={x} className="chip !min-h-[38px] !text-[13.5px]" data-on={i === 0}>{x}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <QualitySystem index="07" />
      <WhatYouReceive index="08" />
      <Reorder index="09" />
      <GlobalNetwork index="10" />
      <PrivateLabel index="11" />
      <People index="12" />
      <Proof />
      <SampleBand index="13" />
      <ResourcesTeaser index="14" />
      <Faq index="15" />
      <FinalCta />
    </>
  );
}
