import type { Metadata } from "next";
import { PageHero, Button } from "@/components/ui";
import { QualitySystem, Reorder, FinalCta } from "@/components/sections";

export const metadata: Metadata = {
  title: "Quality — your approved sample is the benchmark",
  description: "How WeaveSources approaches towel quality: a written specification, an approved reference sample, and pre-shipment checks against both.",
  alternates: { canonical: "/quality" },
};

const principles = [
  ["Quality is defined by you", "We don't measure your towels against a vague promise. We measure them against the specification and the sample you approved."],
  ["Checks are written down before production", "Which checks happen, at what stage and by whom is agreed in writing for each order — so there are no surprises after the fact."],
  ["Tolerances are explicit", "GSM and dimensions are stated with a tolerance. 'About 550 GSM' is not a specification."],
  ["Changes need your approval", "If a partner proposes a change in yarn, dye or construction, you decide — it is never made silently."],
  ["You see the result", "Before shipment, you receive the outcome of the pre-shipment check for your order."],
  ["Problems are named, not hidden", "If a batch doesn't match the reference, we tell you, and agree with you what happens next."],
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Quality"
        title={<>We don&apos;t promise &ldquo;the highest quality.&rdquo;<br /><span className="text-muted">We show you how it&apos;s checked.</span></>}
        lede="Quality claims are easy to write and hard to verify. So we define quality the only way a buyer can hold us to it: does the towel match what you approved?"
      />
      <section className="wrap pb-10">
        <div className="grid gap-px overflow-hidden rounded-[22px] bg-ink/10 md:grid-cols-2 lg:grid-cols-3">
          {principles.map(([t, d], i) => (
            <div key={t} className="bg-paper p-8" data-reveal>
              <p className="font-mono text-[11px] text-clay">0{i + 1}</p>
              <p className="mt-6 text-[21px] font-medium tracking-[-0.02em]">{t}</p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-graphite">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <QualitySystem />
      <section className="wrap pb-24">
        <div className="rounded-[22px] border border-ink/10 p-8 md:p-10">
          <p className="label">About testing</p>
          <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-graphite">
            Some properties — absorbency, shrinkage, colourfastness — need specific test methods. Where your order needs them, we agree the method and who performs it (the manufacturing partner&apos;s lab or an independent inspection agency) as part of your specification. We only list a test as performed when it has been.
          </p>
          <div className="mt-6"><Button href="/brief" variant="ghost">Include testing in your brief</Button></div>
        </div>
      </section>
      <Reorder />
      <FinalCta />
    </>
  );
}
