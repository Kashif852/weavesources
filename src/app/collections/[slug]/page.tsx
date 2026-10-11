import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { visibleCategories, getCategory, productsIn, availabilityLabel, availabilityNote } from "@/content/products";
import { site } from "@/content/site";
import { Button } from "@/components/ui";
import { ProductCard, IllustrativeNote } from "@/components/catalog";
import { SampleBand } from "@/components/sections";
import { inquiryHref } from "@/components/Inquiry";

export function generateStaticParams() {
  return visibleCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) return {};
  return {
    title: `${c.name} — wholesale sourcing from Pakistan`,
    description: `${c.name} sourced from manufacturers in Pakistan for ${c.buyers.join(", ").toLowerCase()}. ${c.intro}`,
    alternates: { canonical: `/collections/${c.slug}` },
    openGraph: { images: [{ url: `/images/${c.image}`, alt: c.imageAlt }] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) notFound();
  const list = productsIn(c.slug);
  const others = visibleCategories.filter((x) => x.slug !== c.slug);

  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Products", item: `${site.url}/products` },
      { "@type": "ListItem", position: 2, name: c.name, item: `${site.url}/collections/${c.slug}` },
    ],
  };

  return (
    <>
      <section className="wrap pt-28 md:pt-36">
        <nav className="label mb-8" aria-label="Breadcrumb">
          <Link href="/products" className="link-u">Products</Link> <span className="mx-2">/</span> <span aria-current="page">{c.name}</span>
        </nav>
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-5" data-reveal>{availabilityLabel[c.availability]}</p>
            <h1 className="title" data-reveal>{c.name}</h1>
            <p className="lede mt-6" data-reveal>{c.intro}</p>
            <p className="mt-6 rounded-2xl bg-linen px-5 py-4 text-[14.5px] leading-relaxed text-graphite" data-reveal>{availabilityNote[c.availability]}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-reveal>
              <Button href={inquiryHref("Request a quote", list[0]?.name)} variant="primary">Request a quote</Button>
              <Button href={inquiryHref("Request a sample", list[0]?.name)} variant="ghost">Request a sample</Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-linen lg:col-span-6" data-reveal>
            <Image src={`/images/${c.image}`} alt={c.imageAlt} fill priority sizes="(min-width: 1024px) 620px, 100vw" quality={75} className="object-cover" />
            <span className="absolute bottom-4 left-4 rounded-full bg-paper/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-graphite">Illustrative product styling</span>
          </div>
        </div>
      </section>

      <section className="wrap py-20 md:py-28">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="h3">{list.length} {list.length === 1 ? "product" : "products"}</h2>
          <p className="text-[14px] text-muted">Often specified by {c.buyers.join(", ").toLowerCase()}.</p>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => <ProductCard key={p.slug} p={p} i={i} />)}
        </div>
        <IllustrativeNote className="mt-12 max-w-3xl" />
      </section>

      <SampleBand />

      <section className="wrap py-20 md:py-28">
        <p className="eyebrow mb-8">Other categories</p>
        <ul className="grid gap-px overflow-hidden rounded-[22px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/collections/${o.slug}`} className="block h-full bg-paper p-6 transition-colors hover:bg-linen">
                <p className="text-[17px] font-medium tracking-[-0.02em]">{o.name}</p>
                <p className="label mt-3">{availabilityLabel[o.availability]}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
