import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { visibleProducts, getProduct, categoryOf, productsIn, productImage, specRows, availabilityLabel, availabilityNote, CONFIRM } from "@/content/products";
import { industries } from "@/content/industries";
import { site } from "@/content/site";
import { Button, Arrow } from "@/components/ui";
import { ProductCard } from "@/components/catalog";
import { SampleBand } from "@/components/sections";
import { inquiryHref } from "@/components/Inquiry";
import { OpenWhatsAppButton } from "@/components/WhatsApp";

export function generateStaticParams() {
  return visibleProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — wholesale & private label, sourced from Pakistan`,
    description: `${p.name} for ${p.buyers.join(", ").toLowerCase()}, sourced from manufacturers in Pakistan to your specification. ${p.intro.split(". ")[0]}.`,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { images: [{ url: productImage(p), alt: p.imageAlt }] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const c = categoryOf(p);
  const specQ = new URLSearchParams({ use: p.specDefaults.use, product: p.specDefaults.product, gsm: String(p.specDefaults.gsm), size: p.specDefaults.size }).toString();
  const siblings = productsIn(c.slug).filter((x) => x.slug !== p.slug);
  const others = (siblings.length >= 3 ? siblings : [...siblings, ...visibleProducts.filter((x) => x.category !== c.slug)]).slice(0, 3);
  const inds = industries.filter((i) => i.products.includes(p.slug)).slice(0, 4);
  const rows = specRows(p, site.terms);

  // No Product schema: Google requires offers/review/aggregateRating for it,
  // and pricing is quote-based, so the markup would be flagged as invalid.
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Products", item: `${site.url}/products` },
        { "@type": "ListItem", position: 2, name: c.name, item: `${site.url}/collections/${c.slug}` },
        { "@type": "ListItem", position: 3, name: p.name, item: `${site.url}/products/${p.slug}` },
      ],
    },
  ];

  return (
    <>
      <section className="wrap pt-28 md:pt-36">
        <nav className="label mb-8" aria-label="Breadcrumb">
          <Link href="/products" className="link-u">Products</Link>
          <span className="mx-2">/</span>
          <Link href={`/collections/${c.slug}`} className="link-u">{c.name}</Link>
          <span className="mx-2">/</span>
          <span aria-current="page">{p.name}</span>
        </nav>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <figure data-reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-linen">
                <Image src={productImage(p)} alt={p.imageAlt} fill priority sizes="(min-width: 1024px) 760px, 100vw" quality={75} className="object-cover" />
              </div>
              <figcaption className="mt-3 text-[13px] text-muted">
                Illustrative product styling — not a photograph of a specific production lot. Your order is made to the sample you approve.
              </figcaption>
            </figure>
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5" data-reveal>{c.name} · Ref. {p.sku}</p>
            <h1 className="title" data-reveal>{p.name}</h1>
            <p className="mt-3 text-[20px] text-muted" data-reveal>{p.short}</p>
            <p className="lede mt-6" data-reveal>{p.intro}</p>
            <p className="mt-6 rounded-2xl bg-linen px-5 py-4 text-[14px] leading-relaxed text-graphite" data-reveal>
              <span className="label mr-2 !text-ink">{availabilityLabel[c.availability]}</span>
              {availabilityNote[c.availability]}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2" data-reveal>
              <Button href={inquiryHref("Request a quote", p.name)} variant="primary">Request a quote</Button>
              <Button href={`/sample?${specQ}`} variant="ghost">Request a sample</Button>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px]" data-reveal>
              <Link href={`/specification?${specQ}`} className="link-u inline-flex items-center gap-2">Configure this product <Arrow /></Link>
              <Link href={inquiryHref("Request partner documentation", p.name)} className="link-u inline-flex items-center gap-2">Request documentation <Arrow /></Link>
              <OpenWhatsAppButton className="link-u inline-flex items-center gap-2 text-[#187a41]" />
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="eyebrow mb-6">Specification</h2>
            <dl>
              <div className="grid grid-cols-1 gap-1 border-t border-ink/12 py-4 sm:grid-cols-[210px_1fr] sm:gap-6">
                <dt className="label pt-1">Product · reference</dt>
                <dd className="text-[16.5px]">{p.name} · <span className="font-mono text-[14px]">{p.sku}</span></dd>
              </div>
              <div className="grid grid-cols-1 gap-1 border-t border-ink/12 py-4 sm:grid-cols-[210px_1fr] sm:gap-6">
                <dt className="label pt-1">Category</dt>
                <dd className="text-[16.5px]"><Link href={`/collections/${c.slug}`} className="link-u">{c.name}</Link></dd>
              </div>
              {rows.map((r) => (
                <div key={r.k} className="grid grid-cols-1 gap-1 border-t border-ink/12 py-4 last:border-b sm:grid-cols-[210px_1fr] sm:gap-6">
                  <dt className="label pt-1">{r.k}</dt>
                  <dd>
                    {r.v ? (
                      <span className="text-[16.5px]">{r.v} <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.08em] text-brand-green">Partner-confirmed</span></span>
                    ) : (
                      <span className="text-[16.5px] text-graphite">{r.always ?? CONFIRM}</span>
                    )}
                    {r.typical && !r.v && (
                      <span className="mt-1 block text-[13.5px] text-muted">Commonly specified: {r.typical}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[14px] leading-relaxed text-muted">
              We don&apos;t publish GSM, composition, minimums, prices or certifications that a manufacturing partner hasn&apos;t confirmed. “Commonly specified” values are industry reference points to help you write a brief — not a WeaveSources offer. Final values are agreed with you and recorded on your approved sample.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-[24px] bg-linen p-6 md:p-8">
              <p className="label">Common reference points</p>
              <p className="mt-2 text-[14px] text-muted">Industry-typical starting values. Not a WeaveSources specification.</p>
              <ul className="mt-6 space-y-5">
                <li>
                  <p className="text-[13px] text-muted">Sizes often requested</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.typical.sizes.map((s) => <span key={s} className="rounded-full bg-paper px-3 py-1.5 font-mono text-[12px]">{s}</span>)}
                  </div>
                </li>
                <li>
                  <p className="text-[13px] text-muted">Weight</p>
                  <p className="mt-1 text-[16px]">{p.typical.gsm}</p>
                </li>
                <li>
                  <p className="text-[13px] text-muted">Customisation to discuss</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {p.typical.customisation.map((s) => <li key={s} className="rounded-full bg-paper px-3 py-1.5 text-[13px]">{s}</li>)}
                  </ul>
                </li>
                <li>
                  <p className="text-[13px] text-muted">Packaging to discuss</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {p.typical.packaging.map((s) => <li key={s} className="rounded-full bg-paper px-3 py-1.5 text-[13px]">{s}</li>)}
                  </ul>
                </li>
                <li>
                  <p className="text-[13px] text-muted">Note</p>
                  <p className="mt-1 text-[16px]">{p.typical.notes}</p>
                </li>
              </ul>
              <div className="mt-6 flex flex-col gap-2 text-[14.5px]">
                <Link href="/resources/how-to-choose-towel-gsm" className="link-u inline-flex items-center gap-2">How to choose GSM <Arrow /></Link>
                <Link href="/quality" className="link-u inline-flex items-center gap-2">How quality is checked <Arrow /></Link>
                <Link href="/private-label" className="link-u inline-flex items-center gap-2">Private label options <Arrow /></Link>
              </div>
            </div>
            <div className="mt-6 rounded-[24px] border border-ink/10 p-6 md:p-8">
              <p className="label">Discuss this product</p>
              <p className="mt-3 text-[15px] leading-relaxed text-graphite">Send your target size, weight, colour and quantity — or a towel you want to match — and we&apos;ll confirm what a suitable partner can make.</p>
              <div className="mt-5 flex flex-col gap-3">
                <Button href={inquiryHref("Discuss custom specifications", p.name)} variant="ghost">Discuss custom specifications</Button>
                <a href={site.catalog.pdf} className="btn btn-ghost" download>Download product catalog <Arrow /></a>
              </div>
            </div>
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
        <p className="eyebrow mb-8">{siblings.length ? `More ${c.name.toLowerCase()}` : "More from the collection"}</p>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-3">
          {others.map((o, i) => <ProductCard key={o.slug} p={o} i={i} sizes="(min-width: 640px) 33vw, 100vw" />)}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
