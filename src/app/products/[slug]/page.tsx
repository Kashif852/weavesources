import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/content/products";
import { industries } from "@/content/industries";
import { site } from "@/content/site";
import { Button, Towel, Arrow } from "@/components/ui";
import { SpecCard } from "@/components/SpecCard";
import Photo from "@/components/Photo";
import { SampleBand } from "@/components/sections";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — wholesale, made to specification`,
    description: `${p.name} for ${p.buyers.join(", ").toLowerCase()}. ${p.intro.split(". ")[0]}.`,
    alternates: { canonical: `/products/${p.slug}` },
  };
}

const CONFIRM = "Available according to specification";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const q = new URLSearchParams({ use: p.specDefaults.use, product: p.specDefaults.product, gsm: String(p.specDefaults.gsm), size: p.specDefaults.size }).toString();
  const others = products.filter((x) => x.slug !== p.slug).slice(0, 3);
  const inds = industries.filter((i) => i.products.includes(p.slug)).slice(0, 4);

  const rows: [string, string, boolean?][] = [
    ["Use", p.useCase],
    ["Material", p.material],
    ["GSM", p.confirmed.gsm ?? CONFIRM, !p.confirmed.gsm],
    ["Dimensions", p.confirmed.sizes ?? CONFIRM, !p.confirmed.sizes],
    ["Construction", p.confirmed.construction ?? CONFIRM, !p.confirmed.construction],
    ["Colours", p.colours],
    ["Customisation", p.customisation.join(" · ")],
    ["Minimum order", p.confirmed.moq ?? site.terms.moq ?? "Confirmed when we review your brief", !(p.confirmed.moq ?? site.terms.moq)],
    ["Sample", site.terms.samplePolicy ?? "Available — cost and timing confirmed before production"],
  ];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.intro,
    brand: { "@type": "Brand", name: "WeaveSources" },
    category: "Towels",
  };

  return (
    <>
      <section className="wrap pt-28 md:pt-36">
        <nav className="label mb-8" aria-label="Breadcrumb">
          <Link href="/products" className="link-u">Products</Link> <span className="mx-2">/</span> {p.name}
        </nav>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-linen" data-reveal>
              <Photo
                slot={`product-${p.slug}`}
                priority
                sizes="(min-width: 1024px) 760px, 100vw"
                fallback={
                  <>
                    <div className="absolute inset-0" style={{ background: "radial-gradient(100% 70% at 70% 0%, #fffaf2, transparent 60%)" }} />
                    <Towel tone={p.tone} className="absolute inset-x-[16%] top-[24%] h-[22%]" />
                    <Towel tone={p.tone} className="absolute inset-x-[13%] top-[42%] h-[24%]" />
                    <Towel tone={p.tone} className="absolute inset-x-[10%] top-[62%] h-[25%]" />
                    <span className="tbc absolute bottom-4 left-4">Product photography — replace with real sample photos</span>
                  </>
                }
              />
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5" data-reveal>{p.buyers.join(" · ")}</p>
            <h1 className="h2" data-reveal>{p.name}</h1>
            <p className="mt-3 text-[20px] text-muted" data-reveal>{p.short}</p>
            <p className="lede mt-6" data-reveal>{p.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-reveal>
              <Button href={`/sample?${q}`} variant="primary">Request a sample</Button>
              <Button href={`/specification?${q}`} variant="ghost">Configure this towel</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">Specification</p>
            <dl>
              {rows.map(([k, v, tbc]) => (
                <div key={k} className="grid grid-cols-1 gap-1 border-t border-ink/12 py-4 last:border-b sm:grid-cols-[200px_1fr] sm:gap-6">
                  <dt className="label pt-1">{k}</dt>
                  <dd className={`text-[16.5px] ${tbc ? "text-muted" : ""}`}>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[14px] text-muted">
              We don&apos;t publish specifications we haven&apos;t confirmed with a manufacturing partner. Final values are agreed with you and recorded on your approved sample.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-[24px] bg-linen p-6 md:p-8">
              <p className="label">Common reference points</p>
              <p className="mt-2 text-[14px] text-muted">Industry-typical starting values buyers often use. Not a WeaveSources specification.</p>
              <ul className="mt-6 space-y-4">
                <li>
                  <p className="text-[13px] text-muted">Sizes often requested</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.reference.sizes.map((s) => <span key={s} className="rounded-full bg-paper px-3 py-1.5 font-mono text-[12px]">{s}</span>)}
                  </div>
                </li>
                <li>
                  <p className="text-[13px] text-muted">Weight</p>
                  <p className="mt-1 text-[16px]">{p.reference.gsmRange}</p>
                </li>
                <li>
                  <p className="text-[13px] text-muted">Note</p>
                  <p className="mt-1 text-[16px]">{p.reference.notes}</p>
                </li>
              </ul>
              <Link href="/resources/how-to-choose-towel-gsm" className="link-u mt-6 inline-flex items-center gap-2 text-[14.5px]">How to choose GSM <Arrow /></Link>
            </div>
            <SpecCard
              className="mt-6"
              compact
              status="Draft"
              reference={`WS-SPEC · ${p.slug.toUpperCase().slice(0, 10)}`}
              title="Starting point"
              fields={[
                { k: "Use", v: p.specDefaults.use },
                { k: "Product", v: p.specDefaults.product },
                { k: "GSM", v: `${p.specDefaults.gsm} (adjustable)` },
                { k: "Size", v: `${p.specDefaults.size} (adjustable)` },
              ]}
            />
          </div>
        </div>
      </section>

      {inds.length > 0 && (
        <section className="wrap pb-20">
          <p className="eyebrow mb-6">Often specified by</p>
          <div className="grid gap-px overflow-hidden rounded-[22px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {inds.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`} className="group bg-paper p-6 transition-colors hover:bg-linen">
                <p className="text-[19px] font-medium tracking-[-0.02em]">{i.name}</p>
                <p className="mt-2 text-[14px] text-muted">{i.headline}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <SampleBand />

      <section className="wrap py-20 md:py-28">
        <p className="eyebrow mb-8">More from the collection</p>
        <div className="grid gap-6 sm:grid-cols-3">
          {others.map((o) => (
            <Link key={o.slug} href={`/products/${o.slug}`} className="group block">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[20px] bg-linen">
                <Photo slot={`product-${o.slug}`} sizes="(min-width: 640px) 33vw, 100vw" fallback={<Towel tone={o.tone} className="absolute inset-x-[14%] top-[34%] h-[30%] transition-transform duration-700 group-hover:-translate-y-1" />} />
              </div>
              <p className="mt-4 text-[18px] font-medium">{o.name}</p>
              <p className="text-[14px] text-muted">{o.useCase}</p>
            </Link>
          ))}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
