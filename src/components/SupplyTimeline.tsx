"use client";

import { useState } from "react";
import { journey, qcCheckpoints } from "@/content/process";
import { SpecCard } from "./SpecCard";
import { Towel } from "./ui";

const baseSpec = [
  { k: "Use", v: "Hotel guest rooms" },
  { k: "Product", v: "Bath towel" },
  { k: "GSM", v: "550 ± 5%" },
  { k: "Size", v: "70 × 140 cm" },
  { k: "Colour", v: "White" },
  { k: "Border", v: "Dobby, 5 cm" },
  { k: "Branding", v: "Embroidered logo" },
  { k: "Packing", v: "10 pcs / bundle, export carton" },
];

function Panel({ i }: { i: number }) {
  if (i === 0) return <SpecCard fields={baseSpec} status="Draft" reference="WS-SPEC · DRAFT 01" className="w-full max-w-[400px]" compact />;
  if (i === 1)
    return (
      <div className="relative w-full max-w-[420px]">
        <Towel tone="white" className="aspect-[4/3] w-full" />
        <div className="absolute -bottom-5 left-6 rotate-[-3deg] rounded-md bg-[#fffdf9] px-4 py-3 shadow-[0_10px_30px_-12px_rgb(0_0_0/.35)]">
          <p className="label !text-[9px]">Sample tag</p>
          <p className="font-mono text-[12px]">Bath towel · 550 GSM · 70×140</p>
          <p className="font-mono text-[12px] text-muted">Ref WS-SPEC · DRAFT 01</p>
        </div>
      </div>
    );
  if (i === 2)
    return (
      <div className="relative w-full max-w-[400px]">
        <SpecCard fields={baseSpec} status="Approved standard" reference="WS-SPEC · v1 APPROVED" compact />
        <div className="absolute -right-3 -top-4 grid h-24 w-24 rotate-[12deg] place-items-center rounded-full border-2 border-clay text-center font-mono text-[10px] uppercase leading-tight tracking-[0.1em] text-clay">
          Approved<br />reference<br />sample
        </div>
      </div>
    );
  if (i === 3)
    return (
      <div className="w-full max-w-[420px] rounded-2xl bg-[#fffdf9] p-6 shadow-[0_0_0_1px_rgb(0_0_0/.06)]">
        <p className="label">Production order</p>
        <p className="mt-2 text-xl font-medium tracking-tight">Produced against v1 approved standard</p>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {["white", "white", "white", "white", "white", "white"].map((t, k) => (
            <Towel key={k} tone={t} className="aspect-[5/3]" />
          ))}
        </div>
        <p className="mt-5 text-[14px] text-muted">Changes to yarn, colour or construction need your approval — they are not made silently.</p>
      </div>
    );
  if (i === 4)
    return (
      <div className="w-full max-w-[420px] rounded-2xl bg-[#fffdf9] p-6 shadow-[0_0_0_1px_rgb(0_0_0/.06)]">
        <p className="label">Pre-shipment check · against v1</p>
        <ul className="mt-4">
          {qcCheckpoints.map((c) => (
            <li key={c.k} className="flex items-center justify-between border-t border-ink/[.07] py-2.5 text-[14px]">
              <span>{c.k}</span>
              <span className="font-mono text-[11px] text-muted">checked vs. reference</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[12.5px] text-muted">Example layout. The checks for your order are agreed in writing before production.</p>
      </div>
    );
  if (i === 5)
    return (
      <div className="relative w-full max-w-[380px] rounded-xl bg-[#c9b48f] p-6 text-ink shadow-[0_30px_50px_-30px_rgb(60_40_20/.6)]" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgb(0 0 0/.03) 0 2px, transparent 2px 6px)" }}>
        <div className="rounded border-2 border-ink/70 p-4 font-mono text-[12px] leading-relaxed">
          <p className="text-[10px] tracking-[0.14em]">CARTON MARK</p>
          <p className="mt-2">BUYER: YOUR COMPANY</p>
          <p>ITEM: BATH TOWEL 70×140 WHITE</p>
          <p>SPEC: WS-SPEC v1</p>
          <p>QTY: 50 PCS · CTN 001/—</p>
          <p>MADE IN PAKISTAN</p>
        </div>
      </div>
    );
  return (
    <div className="w-full max-w-[420px] rounded-2xl bg-[#fffdf9] p-6 shadow-[0_0_0_1px_rgb(0_0_0/.06)]">
      <p className="label">Shipment file</p>
      <ul className="mt-4">
        {["Commercial invoice", "Packing list", "Bill of lading / airway bill", "Certificate of origin (where required)", "Pre-shipment check report"].map((d) => (
          <li key={d} className="flex items-center gap-3 border-t border-ink/[.07] py-2.5 text-[14px]">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden><path d="M1 1h8l4 4v10H1z" stroke="currentColor" strokeWidth="1.2" /></svg>
            {d}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[12.5px] text-muted">Exact documents depend on destination and Incoterms.</p>
    </div>
  );
}

export default function SupplyTimeline() {
  const [i, setI] = useState(0);
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <ol className="lg:col-span-5" role="tablist" aria-label="How an order moves">
        {journey.map((s, k) => {
          const on = k === i;
          return (
            <li key={s.n} className="border-t border-ink/12 last:border-b">
              <button
                role="tab"
                aria-selected={on}
                onClick={() => setI(k)}
                onMouseEnter={() => setI(k)}
                className="group flex w-full items-start gap-5 py-5 text-left"
              >
                <span className={`mt-1 font-mono text-[12px] transition-colors ${on ? "text-clay" : "text-muted"}`}>{s.n}</span>
                <span className="flex-1">
                  <span className={`block text-[22px] font-medium tracking-[-0.025em] transition-colors md:text-[26px] ${on ? "text-ink" : "text-ink/45 group-hover:text-ink/75"}`}>
                    {s.title}
                  </span>
                  <span
                    className="grid transition-all duration-500"
                    style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
                  >
                    <span className="overflow-hidden">
                      <span className="block pt-2 pr-6 text-[15.5px] leading-relaxed text-graphite">{s.body}</span>
                    </span>
                  </span>
                </span>
              </button>
              {on && (
                <div className="flex justify-center px-2 pb-10 pt-4 lg:hidden">
                  <Panel i={k} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <div className="relative hidden lg:col-span-7 lg:block">
        <div className="sticky top-28 flex min-h-[560px] items-center justify-center overflow-hidden rounded-[28px] bg-linen p-12">
          <div key={i} className="flex w-full justify-center animate-[fadeUp_.6s_var(--ease-out-soft)]">
            <Panel i={i} />
          </div>
          <p className="label absolute left-7 top-6">What you see at this step</p>
          <p className="absolute right-7 top-6 font-mono text-[11px] text-muted">{journey[i].n} / 07</p>
        </div>
      </div>
    </div>
  );
}
