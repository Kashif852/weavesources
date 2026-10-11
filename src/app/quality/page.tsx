import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Button, SectionHead } from "@/components/ui";
import { Figure, VideoFigure } from "@/components/media";
import { QualitySystem, FinalCta } from "@/components/sections";
import { qcMatrix } from "@/content/process";
import { credentials } from "@/content/partners";
import { inquiryHref } from "@/components/Inquiry";

export const metadata: Metadata = {
  title: "Quality & compliance — how towel quality is defined and checked",
  description:
    "How WeaveSources defines towel quality with buyers: written specifications with tolerances, reference sample approval, GSM and dimensional checks, colour and stitching inspection, packaging verification, inspection records and partner compliance documentation.",
  alternates: { canonical: "/quality" },
};

const sections = [
  {
    id: "requirements",
    t: "How quality requirements are defined",
    p: [
      "Quality starts as a written specification: fibre and yarn, GSM with a tolerance, finished dimensions with a tolerance, colour reference, construction, stitching, branding, packaging and labelling.",
      "If your company has its own quality manual or test standards, they become part of the specification. If you don’t, we propose sensible tolerances and explain each one.",
    ],
  },
  {
    id: "sample",
    t: "Sample approval and reference samples",
    p: [
      "A manufacturing partner makes a sample to the specification. You wash it, use it and request changes. When you approve it, that sample is sealed and labelled as the reference, with a counterpart retained for comparison during production.",
      "Production does not start without an approved reference sample for every new product.",
    ],
  },
  {
    id: "gsm",
    t: "Material and GSM verification",
    p: [
      "GSM is checked by cutting or weighing a measured area, or by weighing finished pieces against an agreed piece weight. The method and tolerance are agreed up front, so the result means the same thing to everyone.",
      "Fibre composition is confirmed from the partner’s yarn records. Where you need it independently verified, it is a laboratory test — see below.",
    ],
  },
  {
    id: "dimensions",
    t: "Dimensional checks",
    p: ["Finished length and width are measured flat against the stated tolerance, on a sample size agreed in the check plan. Shrinkage after washing is a separate property and is tested separately when it matters for your use."],
  },
  {
    id: "visual",
    t: "Stitching, finishing and colour inspection",
    p: [
      "Hems, borders and corners are inspected for secure stitching, loose threads, pulled loops and finishing defects. Colour is compared to the approved reference under consistent lighting, piece to piece and carton to carton.",
    ],
  },
  {
    id: "packaging",
    t: "Packaging and labelling verification",
    p: ["Labels (brand, care, size, country of origin), bundling, poly-bags, inserts and carton marks are verified against the specification, along with counts per size and colour."],
  },
  {
    id: "records",
    t: "Inspection records and corrective actions",
    p: [
      "Check results are recorded against your specification and shared with you before shipment. If a batch doesn’t match the reference, we tell you, and agree with you what happens next — rework, replacement, re-inspection or release with your written agreement.",
      "Changes proposed by a partner in yarn, dye or construction need your approval. They are never made silently.",
    ],
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Quality & compliance"
        title={<>We don&apos;t promise &ldquo;the highest quality.&rdquo;<br /><span className="text-muted">We show you how it&apos;s checked.</span></>}
        lede="Quality is defined the only way a buyer can hold us to it: does the towel match the specification and the sample you approved? This page explains each check, who performs it, and what needs an independent laboratory or inspection company."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={inquiryHref("Discuss custom specifications")} variant="primary">Discuss your quality requirements</Button>
          <Button href={inquiryHref("Request partner documentation")} variant="ghost">Request compliance documentation</Button>
        </div>
      </PageHero>

      <section className="wrap pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <Figure
            src="/images/mfg-quality-inspection.jpg"
            alt="Illustration: an inspector measuring a white towel with a tape measure beside a digital scale"
            sizes="(min-width: 768px) 50vw, 100vw"
            ratio="aspect-[4/3]"
            caption="Illustration of a dimensional check."
          />
          <VideoFigure
            src="/media/sample-approval-loop.mp4"
            poster="/media/sample-approval-loop.jpg"
            label="Illustrative footage of towels being weighed on a scale"
            ratio="aspect-[4/3]"
            caption="Illustrative footage of a weight check. Not a record of an actual inspection."
          />
        </div>
      </section>

      <div className="wrap grid gap-12 pb-20 lg:grid-cols-12">
        <nav className="hidden lg:col-span-3 lg:block" aria-label="On this page">
          <ul className="sticky top-28 space-y-2.5 text-[14.5px]">
            {sections.map((s) => <li key={s.id}><a href={`#${s.id}`} className="link-u text-graphite hover:text-ink">{s.t}</a></li>)}
            <li><a href="#who" className="link-u text-graphite hover:text-ink">Who does what</a></li>
            <li><a href="#testing" className="link-u text-graphite hover:text-ink">Laboratory testing</a></li>
            <li><a href="#certificates" className="link-u text-graphite hover:text-ink">Partner certifications</a></li>
            <li><a href="#buyer" className="link-u text-graphite hover:text-ink">Your own requirements</a></li>
          </ul>
        </nav>
        <div className="lg:col-span-9">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="grid scroll-mt-28 gap-6 border-t border-ink/12 py-10 md:grid-cols-12">
              <h2 className="text-[24px] font-medium leading-tight tracking-[-0.025em] md:col-span-4">
                <span className="mb-2 block font-mono text-[11px] text-clay">{String(i + 1).padStart(2, "0")}</span>
                {s.t}
              </h2>
              <div className="space-y-4 text-[16.5px] leading-relaxed text-graphite md:col-span-8">
                {s.p.map((x) => <p key={x}>{x}</p>)}
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="bg-linen scroll-mt-20" id="who">
        <div className="wrap py-24 md:py-32">
          <SectionHead
            eyebrow="Who does what"
            title={<>WeaveSources, the manufacturer,<br /><span className="text-muted">or an independent lab.</span></>}
            lede="Quality work is shared between three kinds of party. This is the default split; the plan for your order is confirmed in writing before production."
          />
          <div className="mt-12 overflow-x-auto rounded-[22px] bg-paper p-2 sm:p-4">
            <table className="w-full min-w-[720px] border-collapse text-left text-[14.5px]">
              <thead>
                <tr className="label">
                  <th scope="col" className="border-b border-ink/15 px-3 py-3 font-normal">Activity</th>
                  <th scope="col" className="border-b border-ink/15 px-3 py-3 font-normal">WeaveSources</th>
                  <th scope="col" className="border-b border-ink/15 px-3 py-3 font-normal">Manufacturing partner</th>
                  <th scope="col" className="border-b border-ink/15 px-3 py-3 font-normal">Independent lab / inspection company</th>
                </tr>
              </thead>
              <tbody>
                {qcMatrix.map((r) => (
                  <tr key={r.activity} className="align-top">
                    <th scope="row" className="border-b border-ink/10 px-3 py-3.5 font-medium">{r.activity}</th>
                    <td className="border-b border-ink/10 px-3 py-3.5 text-graphite">{r.ws}</td>
                    <td className="border-b border-ink/10 px-3 py-3.5 text-graphite">{r.partner}</td>
                    <td className="border-b border-ink/10 px-3 py-3.5 text-graphite">{r.independent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <QualitySystem />

      <section className="wrap scroll-mt-28 pb-12" id="testing">
        <div className="rounded-[22px] border border-ink/10 p-8 md:p-10">
          <p className="label">Laboratory testing and third-party inspection</p>
          <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-graphite">
            Absorbency, shrinkage, colourfastness, pilling and fibre composition need defined test methods. Third-party pre-shipment inspection is performed by an independent inspection company. Neither is included by default. Where your order needs them, we agree the method, the laboratory or inspection company and who pays — as part of your specification. We only describe a test or inspection as performed when it has been, and you receive the report.
          </p>
        </div>
      </section>

      <section className="wrap scroll-mt-28 pb-12" id="certificates">
        <div className="rounded-[22px] bg-linen p-8 md:p-10">
          <p className="label">Partner certifications</p>
          <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-graphite">
            Certificates such as product-safety, organic-content or social-compliance standards are issued to a specific company and facility, for a defined scope. A certificate held by a supplier does not certify WeaveSources, and does not automatically cover every product made by that supplier. We record the holder, issuer, scope, facility and validity of each one and check it with the issuer where possible.
          </p>
          <p className="mt-4 text-[15px] text-muted">
            {credentials.length ? `${credentials.length} verified partner credential${credentials.length === 1 ? " is" : "s are"} listed on Partners & credentials.` : "No partner certificates are published yet. Documentation for the products and facilities in your order can be discussed and provided on request."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/partners" variant="ghost">Partners &amp; credentials</Button>
            <Button href={inquiryHref("Request partner documentation")} variant="primary">Request documentation</Button>
          </div>
        </div>
      </section>

      <section className="wrap scroll-mt-28 pb-24" id="buyer">
        <div className="grid gap-8 rounded-[22px] border border-ink/10 p-8 md:grid-cols-12 md:p-10">
          <div className="md:col-span-5">
            <p className="label">Buyer-specific requirements</p>
            <p className="mt-4 text-[24px] font-medium leading-tight tracking-[-0.02em]">Bring your own standards.</p>
          </div>
          <div className="space-y-4 text-[16px] leading-relaxed text-graphite md:col-span-7">
            <p>Retailers and hospitality groups often have their own test protocols, labelling rules, packaging requirements or approved inspection companies. Send them with your brief: they become part of the specification, and we only propose partners who can meet them.</p>
            <p>
              To request compliance documentation for a product, <Link href={inquiryHref("Request partner documentation")} className="link-u text-ink">tell us the product, destination and standard</Link> you need. We will tell you what is available for the relevant partner and facility — and what isn&apos;t.
            </p>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
