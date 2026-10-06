import type { Metadata } from "next";
import { PageHero, Button } from "@/components/ui";
import { PrivateLabel, SampleBand, FinalCta } from "@/components/sections";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private label & OEM towels",
  description: "Private-label and OEM towels with your logo, labels, colours, sizes and packaging — specified, sampled and checked before production.",
  alternates: { canonical: "/private-label" },
};

const steps = [
  ["Share your brand and product idea", "Logo files, colour references, a towel you like, your target customer."],
  ["We write the specification", "Product, construction, branding method and position, labels, packaging."],
  ["Branded sample", "Made with your logo and packaging, so you approve the whole product — not just the towel."],
  ["Production to the approved sample", "Checked against it before packing."],
  ["Reorder from the same specification", "Your design and specification remain yours."],
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Private label & OEM"
        title={<>Your brand.<br />Your specification.<br /><span className="text-muted">Our sourcing.</span></>}
        lede="For retail brands, distributors and hospitality groups who want towels under their own name — with full clarity on who makes them and how they're checked."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/brief" variant="primary">Start a private-label brief</Button>
          <Link href="/resources/private-label-vs-oem" className="btn btn-ghost">Private label vs OEM</Link>
        </div>
      </PageHero>
      <PrivateLabel full />
      <section className="wrap pb-24 md:pb-32">
        <p className="eyebrow mb-8">How a private-label order works</p>
        <ol>
          {steps.map(([t, d], i) => (
            <li key={t} className="grid gap-3 border-t border-ink/12 py-7 last:border-b md:grid-cols-[80px_1fr_1fr]" data-reveal>
              <span className="font-mono text-[12px] text-clay">0{i + 1}</span>
              <span className="text-[24px] font-medium tracking-[-0.02em]">{t}</span>
              <span className="text-[16px] text-graphite md:pt-1.5">{d}</span>
            </li>
          ))}
        </ol>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-[22px] bg-linen p-8">
            <p className="label">Confidentiality</p>
            <p className="mt-4 text-[16px] leading-relaxed text-graphite">Your logo files, designs and specifications are used only for your orders. If you need an NDA before sharing them, tell us in your brief.</p>
          </div>
          <div className="rounded-[22px] bg-linen p-8">
            <p className="label">What&apos;s possible</p>
            <p className="mt-4 text-[16px] leading-relaxed text-graphite">Branding methods vary by product and manufacturing partner. We confirm what&apos;s achievable for your product before you commit — and show it on the sample.</p>
          </div>
        </div>
      </section>
      <SampleBand />
      <FinalCta />
    </>
  );
}
