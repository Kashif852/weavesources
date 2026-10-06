import Link from "next/link";
import type { CSSProperties } from "react";
import { products } from "@/content/products";
import { deliverables, faqs, qcCheckpoints, roles } from "@/content/process";
import { articles } from "@/content/resources";
import { site } from "@/content/site";
import points from "@/content/map-points.json";
import { Arrow, Button, SectionHead, Tbc, Towel, Placeholder } from "./ui";
import { SpecCard } from "./SpecCard";
import SupplyTimeline from "./SupplyTimeline";
import Photo from "./Photo";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/* ── 02 · See how we work ─────────────────────────────── */
export function SeeHowWeWork({ index = "02" }: { index?: string }) {
  return (
    <section className="wrap py-24 md:py-36" id="how-it-works">
      <SectionHead
        index={index}
        eyebrow="Don't take our word for it"
        title={<>See how we work.<br /><span className="text-muted">Every step, before you commit.</span></>}
        lede={<>We&apos;re a new company. We don&apos;t expect you to trust us blindly — so we show you each step of an order and what you&apos;ll see at it. Nothing here depends on taking a claim at face value.</>}
      />
      <div className="mt-16 md:mt-24">
        <SupplyTimeline />
      </div>
    </section>
  );
}

/* ── Product collection ───────────────────────────────── */
export function ProductGrid({ index, limit }: { index?: string; limit?: number }) {
  const list = limit ? products.slice(0, limit) : products;
  return (
    <section className="wrap py-24 md:py-32" id="collection">
      <SectionHead
        index={index}
        eyebrow="The collection"
        title={<>Six towels.<br />Each made to your specification.</>}
        lede="A focused starting range, built around how commercial towels are actually used. Every product is produced to the specification you approve — not picked from a catalogue."
      />
      <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <Link key={p.slug} href={`/products/${p.slug}`} className="group block" data-reveal style={d((i % 3) * 90)}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-linen sm:aspect-[4/5]">
              <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]">
                <Photo
                  slot={`product-${p.slug}`}
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
                  fallback={
                    <>
                      <Towel tone={p.tone} className="absolute left-[12%] right-[12%] top-[34%] h-[22%]" />
                      <Towel tone={p.tone} className="absolute left-[10%] right-[10%] top-[52%] h-[24%]" />
                    </>
                  }
                />
              </div>
              <span className="label absolute left-5 top-5">{String(i + 1).padStart(2, "0")}</span>
              <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-paper/80 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <Arrow />
              </span>
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3 className="text-[21px] font-medium tracking-[-0.02em]">{p.name}</h3>
            </div>
            <p className="mt-1.5 text-[15px] text-muted">{p.useCase}</p>
          </Link>
        ))}
      </div>
      <p className="mt-14 text-[14px] text-muted" data-reveal>
        Planned categories, once towels are established: bathrobes, bed linen, spa and kitchen textiles.
      </p>
    </section>
  );
}

/* ── Why we exist ─────────────────────────────────────── */
export function WhyWeExist({ index }: { index?: string }) {
  const problems = [
    ["The specification lives in an email thread.", "So two people remember the order differently."],
    ["The sample is approved, then forgotten.", "So production drifts from what you signed off."],
    ["Nobody owns the reorder.", "So you re-explain everything, every time."],
  ];
  return (
    <section className="bg-ink text-paper">
      <div className="wrap py-24 md:py-36">
        <p className="eyebrow !text-paper/50 mb-6" data-reveal>{index && <span className="text-[#e39a7a] mr-3">{index}</span>}Why we exist</p>
        <h2 className="h2 max-w-4xl" data-reveal>
          Sourcing towels internationally shouldn&apos;t depend on luck, memory or a long email thread.
        </h2>
        <div className="mt-16 grid gap-px overflow-hidden rounded-[22px] bg-paper/10 md:grid-cols-3">
          {problems.map(([a, b], i) => (
            <div key={a} className="bg-ink p-8 md:p-10" data-reveal style={d(i * 100)}>
              <p className="font-mono text-[12px] text-paper/40">0{i + 1}</p>
              <p className="mt-8 text-[22px] font-medium leading-snug tracking-[-0.02em]">{a}</p>
              <p className="mt-3 text-[16px] text-paper/60">{b}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-12" data-reveal>
          <p className="text-[22px] leading-snug tracking-[-0.015em] md:col-span-7 md:text-[28px]">
            WeaveSources puts the specification at the centre. It is written once, approved on a physical sample, and used as the reference for production, quality checks and every reorder.
          </p>
          <div className="md:col-span-4 md:col-start-9 md:self-end">
            <Button href="/about" variant="light">Read our story</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Sourcing model: who does what ────────────────────── */
export function SourcingModel({ index }: { index?: string }) {
  const flow = ["Your requirements", "Our sourcing team", "Matched manufacturing partner", "Sample", "Approval", "Production", "Quality check", "Shipment"];
  return (
    <section className="wrap py-24 md:py-36" id="model">
      <SectionHead
        index={index}
        eyebrow="Our sourcing model"
        title={<>Four parties.<br />Clear lines between them.</>}
        lede={<>We are not a factory, and we don&apos;t pretend to be one. We are the sourcing partner between you and an independent manufacturer — accountable for the specification, the coordination and the communication.</>}
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {roles.map((r, i) => (
          <div
            key={r.key}
            className={`relative flex flex-col rounded-[22px] p-7 ${r.key === "us" ? "bg-ink text-paper" : "bg-linen"}`}
            data-reveal
            style={d(i * 80)}
          >
            <p className={`label ${r.key === "us" ? "!text-paper/50" : ""}`}>{r.sub}</p>
            <p className="mt-3 text-[24px] font-medium tracking-[-0.025em]">{r.label}</p>
            <ul className="mt-6 space-y-2.5 text-[15px]">
              {r.does.map((x) => (
                <li key={x} className={`flex gap-3 ${r.key === "us" ? "text-paper/80" : "text-graphite"}`}>
                  <span className={`mt-[9px] h-px w-3 shrink-0 ${r.key === "us" ? "bg-[#e39a7a]" : "bg-clay"}`} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[22px] border border-ink/10 p-6 md:p-8" data-reveal>
        <p className="label mb-5">The path of an order</p>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
          {flow.map((f, i) => (
            <li key={f} className="flex items-center gap-2">
              <span className={`rounded-full px-4 py-2 text-[14px] ${i === 1 ? "bg-ink text-paper" : i === 0 ? "bg-clay-soft text-clay-deep" : "bg-linen"}`}>{f}</span>
              {i < flow.length - 1 && <Arrow className="text-sand" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── What you actually receive ────────────────────────── */
export function WhatYouReceive({ index }: { index?: string }) {
  return (
    <section className="bg-linen">
      <div className="wrap py-24 md:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5" data-reveal>{index && <span className="text-clay mr-3">{index}</span>}What you actually receive</p>
            <h2 className="h2" data-reveal>You&apos;re not just buying towels.</h2>
            <p className="lede mt-6" data-reveal>
              A towel is the last thing that arrives. Before it, you get the documents and decisions that make the next order as predictable as the first.
            </p>
            <div className="relative mt-12 hidden aspect-[5/4] lg:block" data-reveal>
              <Photo
                slot="folded-stack"
                sizes="480px"
                className="rounded-[22px]"
                fallback={
                  <>
                    <Towel tone="white" className="absolute inset-x-[8%] top-[30%] h-[30%]" />
                    <Towel tone="white" className="absolute inset-x-[4%] top-[52%] h-[34%]" />
                  </>
                }
              />
            </div>
          </div>
          <ol className="lg:col-span-7">
            {deliverables.map((x, i) => (
              <li key={x.k} className="grid grid-cols-[48px_1fr] gap-4 border-t border-ink/12 py-6 last:border-b md:grid-cols-[64px_220px_1fr]" data-reveal style={d(i * 50)}>
                <span className="font-mono text-[12px] text-muted pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[22px] font-medium tracking-[-0.02em]">{x.k}</span>
                <span className="col-start-2 text-[16px] leading-relaxed text-graphite md:col-start-3 md:pt-1">{x.d}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ── Quality / specification system ───────────────────── */
export function QualitySystem({ index }: { index?: string }) {
  return (
    <section className="wrap py-24 md:py-36" id="quality">
      <div className="grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-5" data-reveal>{index && <span className="text-clay mr-3">{index}</span>}Quality, explained — not promised</p>
          <h2 className="h2" data-reveal>Your approved sample becomes the benchmark.</h2>
          <p className="lede mt-6" data-reveal>
            We don&apos;t claim &ldquo;the highest quality.&rdquo; We define quality as matching what you approved. Every check before shipment is made against your specification and your reference sample.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-0" data-reveal>
            {qcCheckpoints.map((c) => (
              <li key={c.k} className="border-t border-ink/12 py-3.5">
                <p className="text-[16px] font-medium">{c.k}</p>
                <p className="mt-0.5 text-[13.5px] leading-snug text-muted">{c.d}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13.5px] text-muted" data-reveal>
            The checks for each order, and who performs them, are written into your specification before production starts.
          </p>
          <div className="mt-8" data-reveal><Button href="/quality" variant="ghost">How quality checks work</Button></div>
        </div>
        <div className="relative lg:col-span-6" data-reveal>
          <div className="relative mx-auto max-w-[520px] rounded-[28px] bg-linen p-6 sm:p-10">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex-1">
                <p className="label mb-3 text-center">Approved sample</p>
                <div className="relative aspect-[4/3]">
                  <Photo slot="detail-terry" sizes="240px" className="rounded-[14px]" fallback={<Towel tone="white" className="absolute inset-0" />} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 pt-6">
                <span className="font-mono text-[11px] text-clay">=</span>
              </div>
              <div className="flex-1">
                <p className="label mb-3 text-center">Production</p>
                <div className="relative aspect-[4/3]">
                  <Photo slot="detail-terry" sizes="240px" className="rounded-[14px]" fallback={<Towel tone="white" className="absolute inset-0" />} />
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-[#fffdf9] p-5 font-mono text-[12px] shadow-[0_0_0_1px_rgb(0_0_0/.05)]">
              {[["GSM", "550 ± 5%"], ["Size", "70 × 140 cm ± 2 cm"], ["Colour", "Matches reference"], ["Border", "Dobby 5 cm"]].map(([k, v]) => (
                <div key={k} className="flex justify-between border-t border-ink/[.06] py-2 first:border-0">
                  <span className="text-muted">{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-[12px] text-muted">Example tolerances. Yours are set in your specification.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Reorder / consistency ────────────────────────────── */
export function Reorder({ index }: { index?: string }) {
  const fields = [
    { k: "Product", v: "Bath towel" },
    { k: "GSM", v: "550 ± 5%" },
    { k: "Size", v: "70 × 140 cm" },
    { k: "Colour", v: "White · ref. sample" },
    { k: "Construction", v: "Dobby border 5 cm" },
    { k: "Branding", v: "Embroidery, lower right" },
    { k: "Packaging", v: "10 / bundle, export carton" },
  ];
  return (
    <section className="bg-ink text-paper overflow-hidden">
      <div className="wrap grid items-center gap-16 py-24 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow !text-paper/50 mb-5" data-reveal>{index && <span className="text-[#e39a7a] mr-3">{index}</span>}Make your next order easier</p>
          <h2 className="h2" data-reveal>Your first order creates the standard for every order after it.</h2>
          <p className="mt-6 text-[18px] leading-relaxed text-paper/70" data-reveal>
            Once you approve a product, its specification is documented. A reorder references that document — product, weight, size, colour, construction, branding and packing — so nothing has to be re-described and nothing quietly changes.
          </p>
        </div>
        <div className="relative lg:col-span-6 lg:col-start-7" data-reveal>
          <div className="relative mx-auto h-[460px] max-w-[440px] sm:h-[480px]">
            <SpecCard fields={fields} status="Approved standard" reference="WS-SPEC · v1 · ORDER 01" className="absolute left-0 right-10 top-0 opacity-30 sm:right-20" compact />
            <SpecCard fields={fields} status="Approved standard" reference="WS-SPEC · v1 · REORDER 02" className="absolute left-5 right-5 top-10 opacity-60 sm:left-10 sm:right-10" compact />
            <SpecCard fields={fields} status="Approved standard" reference="WS-SPEC · v1 · REORDER 03" className="absolute left-10 right-0 top-20 sm:left-20" compact />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Private label equation ───────────────────────────── */
export function PrivateLabel({ index, full = false }: { index?: string; full?: boolean }) {
  const parts = [
    { k: "Your brand", d: "Logo, colours, voice" },
    { k: "Your specification", d: "Weight, size, construction" },
    { k: "Our sourcing", d: "Partner, sample, checks, export" },
  ];
  const options = [
    ["Logo", "Embroidery, woven or jacquard border — depending on product"],
    ["Labels", "Care, brand and size labels"],
    ["Colours", "Matched to your reference"],
    ["Sizes", "Standard or custom dimensions"],
    ["Packaging", "Bulk, bundled, banded or retail-ready"],
  ];
  return (
    <section className="wrap py-24 md:py-36" id="private-label">
      <SectionHead
        index={index}
        eyebrow="Private label"
        title={<>Your name on it.<br /><span className="text-muted">Our process behind it.</span></>}
        lede="For brands, distributors and hospitality groups that sell or present towels under their own name. Every branding option is confirmed on the sample before production — and only offered where the manufacturing partner supports it."
      />
      <div className="mt-14 grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1.2fr]">
        {parts.map((p, i) => (
          <div key={p.k} className="contents">
            <div className="rounded-[22px] bg-linen p-7" data-reveal style={d(i * 90)}>
              <p className="label">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-8 text-[24px] font-medium tracking-[-0.025em]">{p.k}</p>
              <p className="mt-1 text-[15px] text-muted">{p.d}</p>
            </div>
            <div className="grid place-items-center py-1 text-[28px] font-light text-sand" aria-hidden>{i < 2 ? "+" : "="}</div>
          </div>
        ))}
        <div className="relative overflow-hidden rounded-[22px] bg-clay p-7 text-white" data-reveal style={d(300)}>
          <p className="label !text-white/60">Result</p>
          <p className="mt-8 text-[28px] font-medium tracking-[-0.025em]">Your product</p>
          <p className="relative z-10 mt-1 max-w-[12rem] text-[15px] text-white/80">Documented, repeatable, yours.</p>
          <Towel tone="sand" className="absolute -bottom-10 -right-8 h-20 w-36 rotate-[-8deg] opacity-80" />
        </div>
      </div>
      <div className={`mt-12 grid gap-8 ${full ? "" : "lg:grid-cols-12"}`}>
        <ul className={`grid gap-x-8 sm:grid-cols-2 ${full ? "lg:grid-cols-3" : "lg:col-span-8"}`}>
          {options.map(([k, v]) => (
            <li key={k} className="border-t border-ink/12 py-4" data-reveal>
              <p className="text-[17px] font-medium">Custom {k.toLowerCase()}</p>
              <p className="text-[14.5px] text-muted">{v}</p>
            </li>
          ))}
        </ul>
        {!full && (
          <div className="lg:col-span-4 lg:self-end" data-reveal>
            <Button href="/private-label" variant="ghost">Private label in detail</Button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Global network ───────────────────────────────────── */
export function GlobalNetwork({ index }: { index?: string }) {
  const pts = points as Record<string, { x: number; y: number }>;
  return (
    <section className="bg-linen overflow-hidden" id="network">
      <div className="wrap py-24 md:py-36">
        <SectionHead
          index={index}
          eyebrow="Where we work"
          title={<>Made in Pakistan.<br /><span className="text-muted">Built for buyers anywhere.</span></>}
          lede={<>Production, sampling and quality coordination happen in Pakistan, where our manufacturing partners are. We work with buyers internationally. We list a market as a place we operate only when a real person or partner is there — never to look bigger than we are.</>}
        />
        <div className="relative mt-14" data-reveal>
          <div className="relative mx-auto aspect-[2/1] w-full max-w-[1100px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/world-dots.svg" alt="" className="absolute inset-0 h-full w-full" loading="lazy" decoding="async" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden>
              {site.regions.filter((r) => r.key !== "pakistan").map((r) => {
                const a = pts.pakistan, b = pts[r.key];
                const mx = (a.x + b.x) / 2, my = Math.min(a.y, b.y) / 2 - 4;
                return (
                  <path key={r.key} d={`M${a.x} ${a.y / 2} Q ${mx} ${my} ${b.x} ${b.y / 2}`} fill="none" stroke="var(--color-clay)" strokeWidth=".18" strokeDasharray=".6 .6" vectorEffect="non-scaling-stroke" opacity=".7" />
                );
              })}
            </svg>
            {site.regions.map((r) => {
              const p = pts[r.key];
              const active = r.status === "active";
              return (
                <div key={r.key} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                  <span className={`relative block -translate-x-1/2 -translate-y-1/2 rounded-full ${active ? "pulse h-3.5 w-3.5 bg-clay" : "h-2.5 w-2.5 border-2 border-ink bg-linen"}`} />
                  <span className={`absolute top-1 hidden whitespace-nowrap ${r.key === "middleeast" ? "right-3" : "left-3"} rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] sm:block ${active ? "bg-ink text-paper" : "bg-paper text-graphite"}`}>
                    {r.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[22px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
          {site.regions.map((r) => (
            <div key={r.key} className="bg-linen p-6" data-reveal>
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${r.status === "active" ? "bg-clay" : "border border-ink"}`} />
                <p className="label">{r.role}</p>
              </div>
              <p className="mt-4 text-[19px] font-medium tracking-[-0.02em]">{r.name}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{r.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[13.5px] text-muted">
          Representatives in other markets will be listed here — with names — once those relationships are formal.
        </p>
      </div>
    </section>
  );
}

/* ── People ───────────────────────────────────────────── */
export function People({ index }: { index?: string }) {
  const team = site.team;
  return (
    <section className="wrap py-24 md:py-36" id="people">
      <SectionHead
        index={index}
        eyebrow="People behind the supply"
        title={<>A small team.<br />Real names. Direct lines.</>}
        lede="You'll know who is handling your order, where they are, and how to reach them. We would rather show you two real people than a logo pretending to be a large organisation."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.length > 0
          ? team.map((m) => (
              <div key={m.name} data-reveal>
                <div className="aspect-[4/5] overflow-hidden rounded-[22px] bg-linen">
                  {m.photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo} alt={m.name} className="h-full w-full object-cover" loading="lazy" />
                  )}
                </div>
                <p className="mt-4 text-[20px] font-medium tracking-[-0.02em]">{m.name}</p>
                <p className="text-[15px] text-graphite">{m.role}</p>
                <p className="label mt-2">{m.location}</p>
                {m.note && <p className="mt-2 text-[14px] text-muted">{m.note}</p>}
                {m.linkedin && <a href={m.linkedin} className="link-u mt-2 inline-block text-[14px]" target="_blank" rel="noopener">LinkedIn ↗</a>}
              </div>
            ))
          : [0, 1].map((i) => (
              <div key={i} data-reveal style={d(i * 90)}>
                <Placeholder label="Team photo" className="aspect-[4/5]" />
                <div className="mt-4 space-y-2">
                  <Tbc>Name</Tbc>
                  <div><Tbc>Role · Location</Tbc></div>
                  <div><Tbc>LinkedIn</Tbc></div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}

/* ── Social proof architecture (honest) ───────────────── */
export function Proof() {
  const t = site.testimonials;
  if (t.length === 0) {
    return (
      <section className="wrap pb-24 md:pb-32">
        <div className="grid gap-8 rounded-[28px] border border-ink/10 p-8 md:grid-cols-12 md:p-12" data-reveal>
          <div className="md:col-span-5">
            <p className="label">Reviews &amp; case studies</p>
            <p className="mt-4 text-[26px] font-medium leading-tight tracking-[-0.025em]">Reviews you can verify — or none at all.</p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-[16px] leading-relaxed text-graphite">
              We only publish reviews from named buyers — with their role, company and country, verifiable on LinkedIn. As a new company, we&apos;re building that record now. Until it&apos;s here, judge us on what you can check yourself: the specification, the sample and the people.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/sample" variant="primary">Request a sample</Button>
              <Button href="/buyer-confidence" variant="ghost">Buyer confidence</Button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="wrap pb-24 md:pb-32">
      <div className="grid gap-6 md:grid-cols-2">
        {t.map((x) => (
          <figure key={x.name} className="rounded-[22px] bg-linen p-8" data-reveal>
            <blockquote className="text-[22px] leading-snug tracking-[-0.015em]">&ldquo;{x.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 text-[14.5px]">
              <span className="font-medium">{x.name}</span> · {x.role}, {x.company} · {x.country}
              {x.linkedin && <a className="link-u ml-2" href={x.linkedin} target="_blank" rel="noopener">Verify on LinkedIn ↗</a>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ── Sample-first band ────────────────────────────────── */
export function SampleBand({ index }: { index?: string }) {
  return (
    <section className="wrap py-10 md:py-16" id="sample">
      <div className="relative overflow-hidden rounded-[32px] bg-clay text-white">
        <div className="grid gap-12 p-8 md:p-14 lg:grid-cols-12 lg:p-20">
          <div className="relative z-10 lg:col-span-7">
            <p className="eyebrow !text-white/60 mb-6" data-reveal>{index && <span className="mr-3">{index}</span>}Sample first</p>
            <h2 className="display !text-[clamp(2.6rem,6vw,5.4rem)]" data-reveal>Feel it before you buy it.</h2>
            <p className="mt-6 max-w-xl text-[19px] leading-relaxed text-white/80" data-reveal>
              Specifications tell you what a towel is. A sample tells you how it feels. Every new product starts with one.
            </p>
            <div className="mt-10 flex flex-wrap gap-3" data-reveal>
              <Button href="/sample" variant="light">Request a sample</Button>
              <Link href="/brief" className="btn border border-white/40 text-white hover:border-white hover:bg-white/10">
                Send a full sourcing brief <Arrow />
              </Link>
            </div>
            <p className="mt-6 text-[13.5px] text-white/60" data-reveal>
              {site.terms.samplePolicy ?? "Sample costs and timing are confirmed with you before anything is made."}
            </p>
          </div>
          <div className="relative min-h-[280px] lg:col-span-5" aria-hidden>
            <Photo
              slot="sample-pair"
              sizes="(min-width: 1024px) 480px, 100vw"
              className="rounded-[22px]"
              fallback={
                <>
                  <Towel tone="white" className="absolute right-0 top-[8%] h-[40%] w-[86%] rotate-[-4deg]" />
                  <Towel tone="sand" className="absolute bottom-[10%] left-0 h-[40%] w-[80%] rotate-[3deg]" />
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Resources teaser ─────────────────────────────────── */
export function ResourcesTeaser({ index }: { index?: string }) {
  const list = articles.slice(0, 4);
  return (
    <section className="wrap py-24 md:py-36">
      <SectionHead
        index={index}
        eyebrow="Buyer resources"
        title={<>Know more before you order.</>}
        lede="Plain guides on towel specification and sourcing — written to help you buy well, whoever you buy from."
      />
      <div className="mt-14 grid gap-px overflow-hidden rounded-[22px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((a, i) => (
          <Link key={a.slug} href={`/resources/${a.slug}`} className="group flex min-h-[260px] flex-col bg-paper p-7 transition-colors hover:bg-linen" data-reveal style={d(i * 70)}>
            <p className="label">{a.category} · {a.minutes} min</p>
            <p className="mt-6 text-[22px] font-medium leading-snug tracking-[-0.02em]">{a.title}</p>
            <p className="mt-3 text-[14.5px] text-muted">{a.summary}</p>
            <span className="mt-auto pt-6 text-ink"><Arrow /></span>
          </Link>
        ))}
      </div>
      <div className="mt-8" data-reveal><Button href="/resources" variant="ghost">All buyer resources</Button></div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────── */
export function Faq({ index }: { index?: string }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section className="wrap py-24 md:py-32" id="faq">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-5" data-reveal>{index && <span className="text-clay mr-3">{index}</span>}Questions buyers ask</p>
          <h2 className="h2" data-reveal>Straight answers.</h2>
        </div>
        <div className="lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="group border-t border-ink/12 last:border-b" data-reveal>
              <summary className="flex items-center justify-between gap-6 py-6 text-[19px] font-medium tracking-[-0.015em] md:text-[21px]">
                {f.q}
                <span className="faq-plus grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 text-[18px] font-light transition-transform duration-300">+</span>
              </summary>
              <p className="max-w-2xl pb-7 pr-12 text-[16px] leading-relaxed text-graphite">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </section>
  );
}

/* ── Final CTA ────────────────────────────────────────── */
export function FinalCta() {
  return (
    <section className="wrap pb-24 pt-8 md:pb-32">
      <div className="grid gap-10 border-t border-ink/12 pt-16 lg:grid-cols-12">
        <h2 className="display lg:col-span-8" data-reveal>Start with a sample.<br /><span className="text-muted">Decide with confidence.</span></h2>
        <div className="flex flex-col justify-end gap-3 lg:col-span-4" data-reveal>
          <Button href="/sample" variant="primary" className="w-full">Request a sample</Button>
          <Button href="/specification" variant="ghost" className="w-full">Build your specification</Button>
          <p className="mt-2 text-center text-[13.5px] text-muted">{site.contact.hours}</p>
        </div>
      </div>
    </section>
  );
}
