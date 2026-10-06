import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Arrow } from "@/components/ui";
import { industries } from "@/content/industries";
import { FinalCta } from "@/components/sections";

export const metadata: Metadata = {
  title: "Industries — towels for hotels, spas, gyms, distributors and brands",
  description: "How WeaveSources helps hotels, boutique hotels, spas, gyms, salons, vacation rentals, distributors, retail and private-label brands source towels.",
  alternates: { canonical: "/industries" },
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>Different buyers.<br /><span className="text-muted">Different towel problems.</span></>}
        lede="A spa and a gym can order the same towel and both be disappointed. Each page below starts with the problem that buyer actually has."
      />
      <section className="wrap pb-24 md:pb-32">
        <div className="grid gap-px overflow-hidden rounded-[22px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i, k) => (
            <Link key={i.slug} href={`/industries/${i.slug}`} className="group flex min-h-[240px] flex-col bg-paper p-8 transition-colors hover:bg-linen" data-reveal>
              <p className="font-mono text-[11px] text-clay">{String(k + 1).padStart(2, "0")}</p>
              <p className="mt-6 text-[26px] font-medium tracking-[-0.025em]">{i.name}</p>
              <p className="mt-2 text-[15.5px] text-muted">{i.headline}</p>
              <span className="mt-auto pt-6"><Arrow /></span>
            </Link>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
