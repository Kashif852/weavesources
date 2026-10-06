import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { People, GlobalNetwork, FinalCta } from "@/components/sections";

export const metadata: Metadata = {
  title: "About — a new company building a better way to source textiles",
  description: "Why WeaveSources exists, why Pakistan, how we select manufacturing partners, and what transparency means to us.",
  alternates: { canonical: "/about" },
};

const chapters = [
  {
    t: "Why we started",
    p: [
      "We started with a simple observation: sourcing quality textiles internationally can be unnecessarily difficult.",
      "Buyers find plenty of suppliers. What they struggle to find is clarity — who actually makes the product, what exactly was agreed, and whether the next shipment will match the last.",
    ],
  },
  {
    t: "The problem we want to solve",
    p: [
      "Most sourcing problems aren't about bad towels. They're about ambiguity: a specification that lives in an email thread, a sample that's approved and then forgotten, a reorder that has to be explained from scratch.",
      "We're building WeaveSources to remove that ambiguity — with a written specification at the centre of every order.",
    ],
  },
  {
    t: "Why Pakistan",
    p: [
      "Pakistan is a long-established cotton-growing country with a substantial home-textile and terry towel industry, including many export-oriented mills.",
      "That depth of manufacturing gives us a strong base to work from. What we add is the buyer-side process: specification, sampling, coordination and communication in a form international buyers expect.",
    ],
  },
  {
    t: "How we choose production partners",
    p: [
      "We match each brief to a partner suited to it — product type, volume, branding method and any required certifications. We look for partners who make that product regularly, can evidence their certificates, and communicate clearly when something goes wrong.",
      "We tell you which partner makes your order. We don't present their factory as ours.",
    ],
  },
  {
    t: "What transparency means to us",
    p: [
      "Not claiming what we can't show. No invented years, customers, capacity or reviews. If we don't have something yet, we say so.",
      "Separating clearly what we do, what our manufacturing partners do, and what logistics partners do — so you always know who is responsible.",
    ],
  },
  {
    t: "What we're building",
    p: [
      "We start with towels and intend to do them properly. Over time we plan to extend the same process to bathrobes, bed linen and other hospitality textiles — and to make every approved specification easy to reorder from.",
      "We're new. We think that's an advantage: we get to build the buying experience we'd want ourselves.",
    ],
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="About WeaveSources"
        title={<>A new company,<br />building a better way<br /><span className="text-muted">to source textiles.</span></>}
      />
      <section className="wrap pb-16 md:pb-24">
        {chapters.map((c, i) => (
          <div key={c.t} className="grid gap-6 border-t border-ink/12 py-12 md:grid-cols-12 md:py-16" data-reveal>
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] text-clay">0{i + 1}</p>
              <h2 className="mt-3 text-[28px] font-medium tracking-[-0.025em]">{c.t}</h2>
            </div>
            <div className="space-y-5 md:col-span-7 md:col-start-6">
              {c.p.map((x, k) => (
                <p key={k} className={k === 0 ? "text-[21px] leading-snug tracking-[-0.01em] md:text-[24px]" : "text-[17px] leading-relaxed text-graphite"}>{x}</p>
              ))}
            </div>
          </div>
        ))}
      </section>
      <People />
      <GlobalNetwork />
      <FinalCta />
    </>
  );
}
