import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Arrow } from "@/components/ui";
import { articles } from "@/content/resources";
import { FinalCta } from "@/components/sections";

export const metadata: Metadata = {
  title: "Buyer resources — towel GSM, specifications and sourcing guides",
  description: "Plain guides for towel buyers: choosing GSM, 400 vs 500 vs 600 GSM, evaluating suppliers, private label vs OEM, sampling and consistent reorders.",
  alternates: { canonical: "/resources" },
};

const cats = ["Specification", "Sourcing", "Quality"] as const;

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Buyer resources"
        title={<>Buy towels well —<br /><span className="text-muted">whoever you buy from.</span></>}
        lede="Short, practical guides on specification, sampling and sourcing. No sales pitch, no filler."
      />
      <section className="wrap pb-24 md:pb-32">
        {cats.map((c) => (
          <div key={c} className="mb-16">
            <p className="eyebrow mb-6">{c}</p>
            <div className="grid gap-px overflow-hidden rounded-[22px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
              {articles.filter((a) => a.category === c).map((a) => (
                <Link key={a.slug} href={`/resources/${a.slug}`} className="group flex min-h-[220px] flex-col bg-paper p-7 transition-colors hover:bg-linen">
                  <p className="label">{a.minutes} min read</p>
                  <p className="mt-5 text-[22px] font-medium leading-snug tracking-[-0.02em]">{a.title}</p>
                  <p className="mt-2 text-[14.5px] text-muted">{a.summary}</p>
                  <span className="mt-auto pt-6"><Arrow /></span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
      <FinalCta />
    </>
  );
}
