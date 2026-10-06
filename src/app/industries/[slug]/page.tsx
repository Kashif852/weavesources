import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, getIndustry } from "@/content/industries";
import { getProduct } from "@/content/products";
import { Button, Towel } from "@/components/ui";
import Photo from "@/components/Photo";
import { SampleBand, FinalCta } from "@/components/sections";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return {};
  return { title: `Towels for ${i.name.toLowerCase()} — ${i.headline}`, description: i.problem, alternates: { canonical: `/industries/${i.slug}` } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) notFound();
  const prods = i.products.map(getProduct).filter(Boolean);
  return (
    <>
      <section className="wrap pt-32 pb-16 md:pt-44 md:pb-20">
        <nav className="label mb-8" aria-label="Breadcrumb"><Link href="/industries" className="link-u">Industries</Link> <span className="mx-2">/</span> {i.name}</nav>
        <h1 className="display max-w-5xl" data-reveal>{i.headline}</h1>
        <p className="eyebrow mt-8" data-reveal>For {i.name.toLowerCase()}</p>
      </section>
      <section className="wrap pb-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="label mb-4">The problem</p>
            <p className="text-[22px] leading-snug tracking-[-0.015em] md:text-[26px]" data-reveal>{i.problem}</p>
          </div>
          <div className="space-y-10 lg:col-span-5 lg:col-start-8">
            <div data-reveal>
              <p className="label mb-4">What matters</p>
              <ul>{i.whatMatters.map((x) => <li key={x} className="border-t border-ink/12 py-3.5 text-[16.5px]">{x}</li>)}</ul>
            </div>
            <div data-reveal>
              <p className="label mb-4">How we help</p>
              <ul>{i.howWeHelp.map((x) => <li key={x} className="border-t border-ink/12 py-3.5 text-[16.5px]">{x}</li>)}</ul>
            </div>
            <div className="flex flex-wrap gap-3" data-reveal>
              <Button href="/sample" variant="primary">Request a sample</Button>
              <Button href="/brief" variant="ghost">Send a brief</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="wrap pb-24">
        <p className="eyebrow mb-8">Products often specified</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {prods.map((p) => (
            <Link key={p!.slug} href={`/products/${p!.slug}`} className="group block">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[20px] bg-linen">
                <Photo slot={`product-${p!.slug}`} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" fallback={<Towel tone={p!.tone} className="absolute inset-x-[14%] top-[34%] h-[30%] transition-transform duration-700 group-hover:-translate-y-1" />} />
              </div>
              <p className="mt-4 text-[18px] font-medium">{p!.name}</p>
              <p className="text-[14px] text-muted">{p!.short}</p>
            </Link>
          ))}
        </div>
      </section>
      <SampleBand />
      <FinalCta />
    </>
  );
}
