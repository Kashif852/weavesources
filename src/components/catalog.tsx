import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { type Category, type Product, availabilityLabel, categoryOf, productImage, productsIn } from "@/content/products";
import { site } from "@/content/site";
import { Arrow } from "./ui";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function ProductCard({ p, i = 0, sizes = "(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw" }: { p: Product; i?: number; sizes?: string }) {
  const c = categoryOf(p);
  return (
    <Link href={`/products/${p.slug}`} className="group block" data-reveal style={d((i % 3) * 90)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-linen">
        <Image
          src={productImage(p)}
          alt={p.imageAlt}
          fill
          sizes={sizes}
          quality={75}
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-graphite">{p.sku}</span>
        {c.availability === "enquiry" && (
          <span className="absolute bottom-4 left-4 rounded-full bg-ink/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-paper backdrop-blur">
            {availabilityLabel.enquiry}
          </span>
        )}
        <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-paper/85 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <Arrow />
        </span>
      </div>
      <h3 className="mt-5 text-[20px] font-medium tracking-[-0.02em]">{p.name}</h3>
      <p className="mt-1 text-[14.5px] text-muted">{p.useCase}</p>
    </Link>
  );
}

export function CategoryBlock({ c, headingLevel = "h2" }: { c: Category; headingLevel?: "h2" | "h3" }) {
  const list = productsIn(c.slug);
  const H = headingLevel;
  return (
    <section id={c.slug} className="scroll-mt-28 border-t border-ink/12 pt-12">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="label mb-3">{availabilityLabel[c.availability]}</p>
          <H className="h3">
            <Link href={`/collections/${c.slug}`} className="link-u">{c.name}</Link>
          </H>
        </div>
        <p className="text-[16px] leading-relaxed text-graphite md:col-span-5">{c.intro}</p>
      </div>
      <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => <ProductCard key={p.slug} p={p} i={i} />)}
      </div>
    </section>
  );
}

export function IllustrativeNote({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[13px] leading-relaxed text-muted ${className}`}>
      Product images are illustrative styling, not photographs of a specific production lot. No prices, stock levels or minimums are published:
      they depend on your specification and are confirmed during quotation. <a href={site.catalog.pdf} className="link-u text-ink" download>Download the catalog (PDF)</a>.
    </p>
  );
}
