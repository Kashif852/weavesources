import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { visibleCategories, productsIn, availabilityLabel } from "@/content/products";
import { orderSteps } from "@/content/process";
import { capabilities, credentials, partners } from "@/content/partners";
import { markets, share, tradeSource, worldTotal } from "@/content/markets";
import { site } from "@/content/site";
import { Arrow, Button, SectionHead } from "./ui";
import { Figure, VideoFigure } from "./media";
import { InquiryForm, inquiryHref } from "./Inquiry";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/* ── Product categories ───────────────────────────────── */
export function CategoryGrid({ index }: { index?: string }) {
  return (
    <section className="wrap py-24 md:py-32" id="categories">
      <SectionHead
        index={index}
        eyebrow="Product categories"
        title={<>Six categories.<br /><span className="text-muted">One sourcing process.</span></>}
        lede="Towels and terry textiles sourced from Pakistani manufacturers to your specification. Categories marked “sourced on enquiry” are confirmed with a suitable partner for each order — we don’t assume availability."
      />
      <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCategories.map((c, i) => {
          const n = productsIn(c.slug).length;
          return (
            <Link key={c.slug} href={`/collections/${c.slug}`} className="group block" data-reveal style={d((i % 3) * 90)}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-linen">
                <Image
                  src={`/images/${c.image}`}
                  alt={c.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
                  quality={75}
                  className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                />
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] ${
                    c.availability === "active" ? "bg-paper/90 text-ink" : "border border-paper/60 bg-ink/55 text-paper backdrop-blur"
                  }`}
                >
                  {availabilityLabel[c.availability]}
                </span>
                <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-paper/85 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <Arrow />
                </span>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="text-[21px] font-medium tracking-[-0.02em]">{c.name}</h3>
                <span className="font-mono text-[11px] text-muted">{n} {n === 1 ? "product" : "products"}</span>
              </div>
              <p className="mt-1.5 text-[15px] text-muted">{c.short}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-12 flex flex-wrap items-center gap-4" data-reveal>
        <Button href="/products" variant="primary">View all products</Button>
        <a href={site.catalog.pdf} className="btn btn-ghost" download>Download product catalog (PDF) <Arrow /></a>
      </div>
      <p className="mt-6 max-w-3xl text-[13px] text-muted">
        Product images are illustrative styling. Your order is made to the specification and sample you approve.
      </p>
    </section>
  );
}

/* ── Why source through WeaveSources ──────────────────── */
export function WhySource({ index }: { index?: string }) {
  const points = [
    ["Access to suitable Pakistani manufacturers", "We match your product, volume and branding to independent manufacturers who regularly make it — and tell you which one makes your order."],
    ["Help with specification and customisation", "GSM, size, construction, colour, branding and packaging written down with tolerances, so nothing is left to interpretation."],
    ["Samples before bulk production", "A physical sample made to your specification. Production starts only after you approve it."],
    ["Documented checks against your specification", "Quality is checked against what you approved, using the plan agreed for your order, and the results are shared with you."],
    ["One contact throughout the order", "A named person handles your order from brief to shipment, with direct lines in the US and Pakistan."],
    ["Packaging and shipment planning", "Carton marks, packing, documents and handover to your forwarder on the Incoterms you agree."],
  ];
  return (
    <section className="bg-ink text-paper">
      <div className="wrap py-24 md:py-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow !text-paper/50 mb-6" data-reveal>{index && <span className="mr-3 text-[#e39a7a]">{index}</span>}Why source through WeaveSources</p>
            <h2 className="h2" data-reveal>A sourcing partner, not a factory pretending to be one.</h2>
            <p className="mt-6 text-[18px] leading-relaxed text-paper/70" data-reveal>
              We don&apos;t own looms. We work on the buyer&apos;s side of the order: finding the right manufacturer in Pakistan, writing down what you&apos;re buying, and checking that what ships matches what you approved.
            </p>
            <Figure
              className="mt-10"
              src="/images/sourcing-sample-review.jpg"
              alt="Illustration: two people reviewing towel samples, a colour fan and a specification sheet at a table"
              sizes="(min-width: 1024px) 480px, 100vw"
              ratio="aspect-[16/10]"
              caption={<span className="text-paper/50">Illustration of a sample review. Not a photograph of our team or a partner.</span>}
            />
          </div>
          <ul className="grid gap-px self-start overflow-hidden rounded-[22px] bg-paper/10 sm:grid-cols-2 lg:col-span-7">
            {points.map(([t, s], i) => (
              <li key={t} className="bg-ink p-7 md:p-8" data-reveal style={d((i % 2) * 80)}>
                <p className="font-mono text-[11px] text-paper/40">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-6 text-[19px] font-medium leading-snug tracking-[-0.02em]">{t}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-paper/60">{s}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── Order process (8 steps) ──────────────────────────── */
export function OrderProcess({ index }: { index?: string }) {
  return (
    <section className="wrap py-24 md:py-36" id="process">
      <SectionHead
        index={index}
        eyebrow="How an order works"
        title={<>Eight steps,<br /><span className="text-muted">each one visible to you.</span></>}
        lede="Every order follows the same path. You see the specification, the sample, the check results and the documents — so you can judge our work before and after you commit."
      />
      <ol className="mt-14 grid gap-px overflow-hidden rounded-[22px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
        {orderSteps.map((s, i) => (
          <li key={s.n} className={`flex flex-col p-7 ${i === 4 ? "bg-linen" : "bg-paper"}`} data-reveal style={d((i % 4) * 70)}>
            <p className="font-mono text-[11px] text-clay">{s.n}</p>
            <p className="mt-6 text-[18px] font-medium leading-snug tracking-[-0.02em]">{s.t}</p>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{s.d}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-wrap gap-3" data-reveal>
        <Button href="/how-we-work" variant="ghost">How we work in detail</Button>
        <Button href={inquiryHref("Discuss custom specifications")} variant="ghost">Discuss custom specifications</Button>
      </div>
    </section>
  );
}

/* ── Manufacturing capabilities ───────────────────────── */
export function Capabilities({ index }: { index?: string }) {
  return (
    <section className="bg-linen" id="capabilities">
      <div className="wrap py-24 md:py-36">
        <SectionHead
          index={index}
          eyebrow="Manufacturing capabilities"
          title={<>What goes into a towel —<br /><span className="text-muted">and what we confirm for yours.</span></>}
          lede="Pakistan’s towel sector covers the full chain from yarn to export carton. Which processes a specific partner performs, and to what standard, is confirmed in writing for your order before we quote."
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <VideoFigure
            className="lg:col-span-7"
            src="/media/manufacturing-loop.mp4"
            poster="/media/manufacturing-loop.jpg"
            label="Illustrative footage of terry fabric being inspected on a weaving line"
            caption="Illustrative footage of a towel weaving line. It does not show a WeaveSources partner facility."
          />
          <ul className="lg:col-span-5">
            {capabilities.map((c) => (
              <li key={c.key} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-ink/12 py-4 last:border-b" data-reveal>
                <div>
                  <p className="text-[17px] font-medium">{c.name}</p>
                  <p className="mt-1 text-[14px] leading-snug text-muted">{c.detail}</p>
                </div>
                <span className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] ${c.verified ? "text-brand-green" : "text-muted"}`}>
                  {c.verified ? "Verified partner" : "Confirmed per order"}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10" data-reveal>
          <Button href="/manufacturing" variant="primary">Manufacturing &amp; sourcing</Button>
        </div>
      </div>
    </section>
  );
}

/* ── Quality assurance ────────────────────────────────── */
export function QualityAssurance({ index }: { index?: string }) {
  const checks = [
    ["Material composition", "Fibre content and yarn type, as specified"],
    ["GSM & weight", "Against target, with an agreed tolerance"],
    ["Dimensions", "Finished length and width, with tolerance"],
    ["Colour consistency", "Against the approved reference, same light"],
    ["Stitching & finishing", "Hems, borders, loose threads, defects"],
    ["Absorbency & performance", "Test method agreed where your order needs it"],
    ["Packaging & labelling", "Labels, bundling, poly-bags, carton marks"],
    ["Quantity & cartons", "Counts per size and colour, carton specification"],
  ];
  return (
    <section className="wrap py-24 md:py-36" id="quality">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-5" data-reveal>{index && <span className="mr-3 text-clay">{index}</span>}Quality assurance</p>
          <h2 className="h2" data-reveal>Quality means matching what you approved.</h2>
          <p className="lede mt-6" data-reveal>
            We help you define each property that matters, approve it on a physical sample, and check production against it. The check plan for your order — what is checked, when, and by whom — is written down before production starts.
          </p>
          <ul className="mt-10 grid gap-x-6 sm:grid-cols-2" data-reveal>
            {checks.map(([k, v]) => (
              <li key={k} className="border-t border-ink/12 py-3.5">
                <p className="text-[16px] font-medium">{k}</p>
                <p className="mt-0.5 text-[13.5px] leading-snug text-muted">{v}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <VideoFigure
            src="/media/sample-approval-loop.mp4"
            poster="/media/sample-approval-loop.jpg"
            label="Illustrative footage of towels being weighed on a scale"
            ratio="aspect-[4/3]"
            caption="Illustrative footage of a weight check. Not a record of an actual inspection."
          />
          <div className="mt-8 rounded-[22px] border border-ink/10 p-6 md:p-8" data-reveal>
            <p className="label">Inspection records</p>
            <p className="mt-3 text-[15.5px] leading-relaxed text-graphite">
              Check results are recorded against your specification and shared with you before shipment. Laboratory tests and third-party inspections are not included by default: where your order needs them, we agree the method and the lab or inspection company with you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/quality" variant="ghost">Quality &amp; compliance</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Partner network & credentials ────────────────────── */
export function PartnerNetwork({ index }: { index?: string }) {
  const hasCreds = credentials.length > 0;
  const hasPartners = partners.length > 0;
  return (
    <section className="bg-linen" id="partners">
      <div className="wrap py-24 md:py-36">
        <SectionHead
          index={index}
          eyebrow="Partner network & credentials"
          title={<>Independent Pakistani manufacturers.<br /><span className="text-muted">Their credentials, not ours.</span></>}
          lede="Your products are made by independent manufacturing companies in Pakistan. Certificates are held by those companies for specific facilities and products — so we list each one with its holder, issuer and scope, never as a WeaveSources badge."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[22px] bg-paper p-7 md:p-9" data-reveal>
            <p className="label">Manufacturing partners</p>
            {hasPartners ? (
              <p className="mt-4 text-[22px] font-medium tracking-[-0.02em]">{partners.length} verified partner {partners.length === 1 ? "profile" : "profiles"}</p>
            ) : (
              <p className="mt-4 text-[22px] font-medium leading-snug tracking-[-0.02em]">Partner details are shared with qualified buyers.</p>
            )}
            <p className="mt-3 text-[15px] leading-relaxed text-graphite">
              Manufacturers often ask that their names stay confidential in public. We tell you which partner makes your order before production starts, and share its location, capabilities and documents for your product.
            </p>
          </div>
          <div className="rounded-[22px] bg-paper p-7 md:p-9" data-reveal style={d(90)}>
            <p className="label">Partner certifications</p>
            {hasCreds ? (
              <p className="mt-4 text-[22px] font-medium tracking-[-0.02em]">{credentials.length} verified {credentials.length === 1 ? "credential" : "credentials"} listed</p>
            ) : (
              <p className="mt-4 text-[22px] font-medium leading-snug tracking-[-0.02em]">No certificates are published here yet.</p>
            )}
            <p className="mt-3 text-[15px] leading-relaxed text-graphite">
              {hasCreds
                ? "Each shows the holder, issuing body, scope, facility and validity, with how to verify it."
                : "Relevant partner documentation can be discussed and provided for the specific products and facilities in your order. Tell us which standards you need and we will only propose partners who can evidence them."}
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-3" data-reveal>
          <Button href="/partners" variant="primary">Partners &amp; credentials</Button>
          <Button href={inquiryHref("Request partner documentation")} variant="ghost">Request partner documentation</Button>
        </div>
      </div>
    </section>
  );
}

/* ── Pakistan's export markets (national statistics) ──── */
export function ExportMarkets({ index }: { index?: string }) {
  const max = markets[0].value;
  const us = markets.find((m) => m.focus)!;
  return (
    <section className="wrap py-24 md:py-36" id="markets">
      <SectionHead
        index={index}
        eyebrow="Pakistan’s towel export markets"
        title={<>The United States is Pakistan’s largest towel market.</>}
        lede="Pakistan exports cotton terry towels at scale, and the US takes about a third of them. That is the market we are built for: our US office is in Seattle, and our sourcing and quality team is in Karachi."
      />
      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4" data-reveal>
          <p className="label">US share of Pakistan’s terry towel exports, {tradeSource.year}</p>
          <p className="mt-3 text-[clamp(3rem,6vw,4.5rem)] font-medium leading-none tracking-[-0.05em] text-brand-green">
            {share(us.value).toFixed(0)}%
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-graphite">
            US${us.value.toFixed(0)} million of US${(worldTotal / 1000).toFixed(2)} billion in total exports under HS {tradeSource.hs}.
          </p>
        </div>
        <figure className="lg:col-span-8" data-reveal style={d(100)}>
          <figcaption className="mb-5 text-[14px] text-muted">
            Pakistan’s exports of cotton terry towels (HS {tradeSource.hs}) by destination, {tradeSource.year}, US$ millions
          </figcaption>
          <ul className="space-y-3">
            {markets.map((m) => (
              <li key={m.code} className="grid grid-cols-[112px_1fr] items-center gap-3 sm:grid-cols-[150px_1fr]" title={`${m.country}: US$${m.value.toFixed(1)}M · ${share(m.value).toFixed(1)}% of total`}>
                <span className={`text-[14px] ${m.focus ? "font-medium text-ink" : "text-graphite"}`}>{m.country}</span>
                <span className="flex items-center gap-3">
                  <span
                    className={`block h-[18px] rounded-r-[4px] ${m.focus ? "bg-brand-green" : "bg-sand"}`}
                    style={{ width: `${(m.value / max) * 78}%` }}
                    aria-hidden
                  />
                  <span className="whitespace-nowrap font-mono text-[12px] text-ink">
                    {m.value.toFixed(1)} <span className="text-muted">· {share(m.value).toFixed(1)}%</span>
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[12.5px] leading-relaxed text-muted">
            Source: {tradeSource.name}, reporter {tradeSource.reporter}, {tradeSource.flow.toLowerCase()}, HS {tradeSource.hs} ({tradeSource.hsLabel.toLowerCase()}), calendar year {tradeSource.year}; retrieved {tradeSource.retrieved}. These are Pakistan’s national export statistics. They are not WeaveSources’ sales, and they do not mean we have customers in these countries.
          </p>
        </figure>
      </div>
    </section>
  );
}

/* ── Catalog download band ────────────────────────────── */
export function CatalogBand() {
  return (
    <section className="wrap py-10 md:py-16">
      <div className="relative overflow-hidden rounded-[32px] bg-brand-green text-paper">
        <div className="grid items-center gap-10 p-8 md:p-14 lg:grid-cols-12 lg:p-16">
          <div className="lg:col-span-7">
            <p className="eyebrow !text-paper/60 mb-5" data-reveal>Product catalog · {site.catalog.edition}</p>
            <h2 className="h2" data-reveal>Take the catalog to your team.</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-paper/75" data-reveal>
              Every category and product, the specification options for each, our sourcing and quality process, and how to request a quote — in one PDF that is easy to forward.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" data-reveal>
              <a href={site.catalog.pdf} className="btn btn-light" download>
                Download catalog (PDF) <Arrow />
              </a>
              <Link href="/catalog" className="btn border border-paper/40 text-paper hover:border-paper hover:bg-paper/10">
                What&apos;s inside
              </Link>
            </div>
          </div>
          <div className="relative hidden aspect-[4/3] lg:col-span-5 lg:block" aria-hidden>
            <div className="absolute inset-y-6 left-10 right-0 rotate-[3deg] overflow-hidden rounded-[10px] bg-paper shadow-[0_30px_60px_-30px_rgb(0_0_0/.6)]">
              <Image src="/images/category-hotel-hospitality-towels.jpg" alt="" fill sizes="400px" className="object-cover" />
            </div>
            <div className="absolute inset-y-10 left-0 right-12 -rotate-[2deg] overflow-hidden rounded-[10px] bg-paper p-6 text-ink shadow-[0_30px_60px_-30px_rgb(0_0_0/.6)]">
              <p className="label">WeaveSources</p>
              <p className="mt-3 text-[26px] font-medium leading-tight tracking-[-0.03em]">Pakistani towel sourcing</p>
              <p className="mt-2 text-[13px] text-muted">Product catalog · {site.catalog.edition}</p>
              <div className="absolute inset-x-6 bottom-6 h-[45%] overflow-hidden rounded-[6px]">
                <Image src="/images/category-bath-hand-towels.jpg" alt="" fill sizes="300px" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Inquiry (final conversion) ───────────────────────── */
export function InquirySection({ index }: { index?: string }) {
  const c = site.contact;
  return (
    <section className="wrap scroll-mt-20 py-24 md:py-32" id="inquiry">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-5">{index && <span className="mr-3 text-clay">{index}</span>}Request a quote or sample</p>
            <h2 className="h2">Tell us what you need.</h2>
            <p className="lede mt-6">A named person replies — not an autoresponder. Quotes are confirmed with a suitable manufacturing partner before we send them.</p>
            <ul className="mt-10 space-y-2.5 text-[15px]">
              {c.email && <li><a className="link-u" href={`mailto:${c.email}`}>{c.email}</a></li>}
              {c.lines.map((l) => (
                <li key={l.digits} className="text-graphite">
                  {l.region}: <a className="link-u text-ink" href={`tel:+${l.digits}`}>{l.display}</a>
                </li>
              ))}
              <li className="pt-2 text-[13.5px] text-muted">{c.hours}</li>
            </ul>
            <p className="mt-8 text-[14px] text-muted">
              Need more room for detail? Use the full <Link href="/brief" className="link-u text-ink">sourcing brief</Link> or <Link href="/sample" className="link-u text-ink">sample request</Link>.
            </p>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
