import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Button, SectionHead } from "@/components/ui";
import { Figure, VideoFigure } from "@/components/media";
import { FinalCta } from "@/components/sections";
import { productionStages, roles } from "@/content/process";
import { capabilities, partners } from "@/content/partners";
import { inquiryHref } from "@/components/Inquiry";

export const metadata: Metadata = {
  title: "Manufacturing & sourcing — how towels are made in Pakistan",
  description:
    "The stages of terry towel production in Pakistan — yarn, weaving, dyeing, stitching, finishing, inspection and export packing — and how WeaveSources coordinates sourcing, sampling and quality with independent manufacturers.",
  alternates: { canonical: "/manufacturing" },
};

export default function Page() {
  const ourRole = [
    ["Supplier coordination", "We match your brief to independent manufacturers who regularly make that product at your volume, and confirm in writing which processes each one performs."],
    ["Sampling", "We turn your requirements into a written specification, have a sample made to it, and record every change until you approve one."],
    ["Quality oversight", "We agree a check plan for your order, follow production, and check finished goods against your specification and approved sample before shipment."],
    ["Export planning", "Packing, carton marks, documents and handover to your forwarder on the Incoterms you choose — with one named contact throughout."],
  ];
  return (
    <>
      <PageHero
        eyebrow="Manufacturing & sourcing"
        title={<>How a towel is made —<br /><span className="text-muted">and where we fit in.</span></>}
        lede="Pakistan’s towel industry runs from cotton yarn to export carton. This page explains the typical production stages, which ones a specific partner performs for your order, and what WeaveSources does at each point."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={inquiryHref("Request a quote")} variant="primary">Request a quote</Button>
          <Button href="/quality" variant="ghost">Quality &amp; compliance</Button>
        </div>
      </PageHero>

      <section className="wrap pb-20">
        <VideoFigure
          src="/media/manufacturing-loop.mp4"
          poster="/media/manufacturing-loop.jpg"
          label="Illustrative footage of terry fabric being inspected on a weaving line"
          ratio="aspect-[16/9] md:aspect-[21/9]"
          caption="Illustrative footage. The images on this page show a typical towel production process; they are not photographs of WeaveSources’ manufacturing partners."
        />
      </section>

      <section className="wrap py-16 md:py-24">
        <div className="grid gap-6 rounded-[22px] border border-ink/10 p-7 md:grid-cols-2 md:p-10">
          <div>
            <p className="label">Typical industry process</p>
            <p className="mt-3 text-[16px] leading-relaxed text-graphite">The seven stages below describe how terry towels are generally made. Not every manufacturer performs every stage in-house — some weave and finish but outsource dyeing or embroidery.</p>
          </div>
          <div>
            <p className="label">Verified at a specific partner</p>
            <p className="mt-3 text-[16px] leading-relaxed text-graphite">
              For your order, we confirm in writing which partner performs each stage, and where. {partners.length === 0 && "Partner facility profiles will be published here once partners agree to disclosure; until then they are shared with qualified buyers."}
            </p>
          </div>
        </div>
      </section>

      <section className="wrap pb-24 md:pb-32">
        <SectionHead eyebrow="Typical production stages" title={<>From yarn to export carton.</>} />
        <ol className="mt-14 space-y-16 md:space-y-24">
          {productionStages.map((s, i) => (
            <li key={s.n} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
              <Figure
                className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}
                src={`/images/${s.image}`}
                alt={s.alt}
                sizes="(min-width: 768px) 60vw, 100vw"
                ratio="aspect-[16/10]"
                tag={s.image.startsWith("texture") ? "Detail" : "Illustration"}
              />
              <div className={`md:col-span-5 ${i % 2 ? "md:order-1" : ""}`} data-reveal>
                <p className="font-mono text-[12px] text-clay">{s.n} / {String(productionStages.length).padStart(2, "0")}</p>
                <h3 className="h3 mt-4">{s.t}</h3>
                <p className="mt-4 text-[16.5px] leading-relaxed text-graphite">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-linen">
        <div className="wrap py-24 md:py-32">
          <SectionHead
            eyebrow="Capabilities through the partner network"
            title={<>Confirmed for your order,<br /><span className="text-muted">not assumed.</span></>}
            lede="A capability is shown as verified only once we have confirmed that an active partner performs it to the required standard. Everything else is checked against your specification before we quote."
          />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="label">
                  <th scope="col" className="border-b border-ink/15 py-3 pr-6 font-normal">Process</th>
                  <th scope="col" className="border-b border-ink/15 py-3 pr-6 font-normal">What it covers</th>
                  <th scope="col" className="border-b border-ink/15 py-3 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {capabilities.map((c) => (
                  <tr key={c.key}>
                    <th scope="row" className="border-b border-ink/10 py-4 pr-6 align-top font-medium">{c.name}</th>
                    <td className="border-b border-ink/10 py-4 pr-6 align-top text-graphite">{c.detail}</td>
                    <td className="border-b border-ink/10 py-4 align-top font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
                      {c.verified ? <span className="text-brand-green">Verified at an active partner</span> : "Confirmed per order"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="wrap py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">WeaveSources’ role</p>
            <h2 className="h2">We work on the buyer’s side of the order.</h2>
            <p className="lede mt-6">We do not own factories or looms. Our job is to find the right manufacturer, write down what you are buying, and make sure what ships matches what you approved.</p>
            <Figure
              className="mt-10"
              src="/images/sourcing-sample-review.jpg"
              alt="Illustration: two people reviewing towel samples and a specification sheet"
              sizes="(min-width: 1024px) 480px, 100vw"
              ratio="aspect-[16/10]"
              caption="Illustration of a sample review."
            />
          </div>
          <div className="lg:col-span-7">
            <ul>
              {ourRole.map(([t, s], i) => (
                <li key={t} className="grid grid-cols-[48px_1fr] gap-4 border-t border-ink/12 py-6 last:border-b" data-reveal>
                  <span className="pt-1 font-mono text-[12px] text-clay">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-[21px] font-medium tracking-[-0.02em]">{t}</p>
                    <p className="mt-2 text-[16px] leading-relaxed text-graphite">{s}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {roles.map((r) => (
                <div key={r.key} className={`rounded-[20px] p-6 ${r.key === "us" ? "bg-ink text-paper" : "bg-linen"}`}>
                  <p className={`label ${r.key === "us" ? "!text-paper/50" : ""}`}>{r.sub}</p>
                  <p className="mt-2 text-[20px] font-medium tracking-[-0.02em]">{r.label}</p>
                  <ul className={`mt-4 space-y-1.5 text-[14.5px] ${r.key === "us" ? "text-paper/75" : "text-graphite"}`}>
                    {r.does.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[14.5px] text-muted">
              See how an order moves step by step on <Link href="/how-we-work" className="link-u text-ink">How we work</Link>, and how partner credentials are handled on <Link href="/partners" className="link-u text-ink">Partners &amp; credentials</Link>.
            </p>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
