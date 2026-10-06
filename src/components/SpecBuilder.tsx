"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import {
  uses, productTypes, materials, bandFor, gsmBands, colours, borders, brandings, packagings, quantities,
  specKeys, specLabels, type Spec,
} from "@/content/spec";
import { SpecCard } from "./SpecCard";
import { Towel, Arrow } from "./ui";

function Group({ n, title, hint, children }: { n: string; title: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <fieldset className="border-t border-ink/12 py-8">
      <legend className="sr-only">{title}</legend>
      <div className="mb-5 flex items-baseline gap-4">
        <span className="font-mono text-[11px] text-clay">{n}</span>
        <div>
          <p className="text-[20px] font-medium tracking-[-0.02em]">{title}</p>
          {hint && <p className="mt-1 text-[14px] text-muted">{hint}</p>}
        </div>
      </div>
      <div className="pl-0 sm:pl-8">{children}</div>
    </fieldset>
  );
}

function Chips({ options, value, onChange }: { options: string[]; value?: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o} type="button" className="chip" aria-pressed={value === o} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

export function specToQuery(spec: Spec) {
  const q = new URLSearchParams();
  specKeys.forEach((k) => spec[k] && q.set(k, spec[k]!));
  return q.toString();
}

export default function SpecBuilder() {
  const sp = useSearchParams();
  const initial = useMemo<Spec>(() => {
    const s: Spec = { use: "Hotel", product: "Bath towel", material: "100% cotton", gsm: "550", size: "70 × 140 cm", colour: "White", border: "Dobby border", branding: "Embroidered logo", packaging: "Bulk export carton", quantity: "500 – 2,000 pcs" };
    specKeys.forEach((k) => {
      const v = sp.get(k);
      if (v) s[k] = v;
    });
    return s;
  }, [sp]);

  const [spec, setSpec] = useState<Spec>(initial);
  const [customSize, setCustomSize] = useState("");
  const [customColour, setCustomColour] = useState("");
  const set = (k: keyof Spec) => (v: string) => setSpec((s) => ({ ...s, [k]: v }));

  const product = productTypes.find((p) => p.name === spec.product) ?? productTypes[0];
  const gsm = Number(spec.gsm ?? 550);
  const band = bandFor(gsm);
  const colourHex = colours.find((c) => c.name === spec.colour)?.hex || "#e9e1d3";
  const pct = ((gsm - 300) / 500) * 100;

  const finalSpec: Spec = {
    ...spec,
    size: spec.size === "Custom" ? customSize || "Custom (to confirm)" : spec.size,
    colour: spec.colour === "Custom / Pantone" ? customColour || "Custom (to confirm)" : spec.colour,
    gsm: `${gsm}`,
  };
  const fields = specKeys
    .filter((k) => finalSpec[k])
    .map((k) => ({ k: specLabels[k], v: k === "gsm" ? `${finalSpec.gsm} GSM · ${band.name}` : finalSpec[k]! }));
  const missing = specKeys.filter((k) => !finalSpec[k]).map((k) => specLabels[k]);
  const query = specToQuery(finalSpec);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <Group n="01" title="Where will it be used?" hint="Use shapes everything else — weight, colour, durability.">
          <Chips options={uses} value={spec.use} onChange={set("use")} />
        </Group>

        <Group n="02" title="Product">
          <Chips
            options={productTypes.map((p) => p.name)}
            value={spec.product}
            onChange={(v) => {
              const p = productTypes.find((x) => x.name === v)!;
              setSpec((s) => ({ ...s, product: v, size: p.sizes[0] }));
            }}
          />
        </Group>

        <Group n="03" title="Weight (GSM)" hint="Grams per square metre. Heavier feels plusher but dries slower.">
          <div className="rounded-2xl bg-linen p-5 sm:p-6">
            <div className="flex items-baseline justify-between">
              <p className="text-[40px] font-medium leading-none tracking-[-0.04em] tabular-nums">
                {gsm}<span className="ml-1.5 text-[16px] tracking-normal text-muted">GSM</span>
              </p>
              <p className="rounded-full bg-paper px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em]">{band.name}</p>
            </div>
            <input
              type="range"
              min={300}
              max={800}
              step={10}
              value={gsm}
              onChange={(e) => set("gsm")(e.target.value)}
              aria-label="GSM"
              className="ws-range mt-6 w-full"
              style={{ background: `linear-gradient(90deg, var(--color-ink) ${pct}%, var(--color-stone) ${pct}%)` }}
            />
            <div className="mt-2 grid grid-cols-5 text-center font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
              {gsmBands.map((b) => (
                <span key={b.name} className={b.name === band.name ? "text-ink" : ""}>{b.name}</span>
              ))}
            </div>
            <p className="mt-5 text-[14.5px] leading-relaxed text-graphite">{band.note}</p>
          </div>
        </Group>

        <Group n="04" title="Size" hint="Common reference sizes for this product, or your own.">
          <Chips options={[...product.sizes, "Custom"]} value={spec.size} onChange={set("size")} />
          {spec.size === "Custom" && (
            <input className="field mt-4 max-w-sm" placeholder="e.g. 75 × 150 cm" value={customSize} onChange={(e) => setCustomSize(e.target.value)} aria-label="Custom size" />
          )}
        </Group>

        <Group n="05" title="Material">
          <Chips options={materials} value={spec.material} onChange={set("material")} />
        </Group>

        <Group n="06" title="Colour">
          <div className="flex flex-wrap gap-2">
            {colours.map((c) => (
              <button key={c.name} type="button" className="chip gap-2.5" aria-pressed={spec.colour === c.name} onClick={() => set("colour")(c.name)}>
                {c.hex ? (
                  <span className="h-4 w-4 rounded-full ring-1 ring-ink/15" style={{ background: c.hex }} />
                ) : (
                  <span className="h-4 w-4 rounded-full ring-1 ring-ink/15" style={{ background: "conic-gradient(#c98466,#a9b09f,#2c3546,#e2d3b9,#c98466)" }} />
                )}
                {c.name}
              </button>
            ))}
          </div>
          {spec.colour === "Custom / Pantone" && (
            <input className="field mt-4 max-w-sm" placeholder="e.g. Pantone 11-0601 TCX or 'match our swatch'" value={customColour} onChange={(e) => setCustomColour(e.target.value)} aria-label="Custom colour" />
          )}
        </Group>

        <Group n="07" title="Border / construction">
          <Chips options={borders} value={spec.border} onChange={set("border")} />
        </Group>

        <Group n="08" title="Branding" hint="Every branding option is confirmed on the sample.">
          <Chips options={brandings} value={spec.branding} onChange={set("branding")} />
        </Group>

        <Group n="09" title="Packaging">
          <Chips options={packagings} value={spec.packaging} onChange={set("packaging")} />
        </Group>

        <Group n="10" title="Quantity" hint="An estimate is fine. Minimums are confirmed when we review your brief.">
          <Chips options={quantities} value={spec.quantity} onChange={set("quantity")} />
        </Group>

        <Group n="11" title="Destination">
          <input className="field max-w-md" placeholder="Country and city / port" value={spec.destination ?? ""} onChange={(e) => set("destination")(e.target.value)} aria-label="Destination" />
        </Group>
      </div>

      <aside className="lg:col-span-5">
        <div className="sticky top-24 space-y-5">
          <div className="relative overflow-hidden rounded-[24px] bg-linen p-6">
            <div className="relative mx-auto h-[150px] max-w-[300px]">
              <Towel
                tone={colourHex}
                border={!spec.border?.startsWith("Plain")}
                className="absolute inset-x-0 transition-all duration-500"
                style={{ height: `${46 + (gsm - 300) / 12}%`, bottom: "8%" }}
              />
              {spec.branding?.includes("logo") && (
                <span className="absolute bottom-[16%] right-[10%] font-mono text-[9px] tracking-[0.2em]" style={{ color: spec.colour === "Charcoal" || spec.colour === "Navy" ? "#f5f2ec" : "#7f371d" }}>
                  YOUR LOGO
                </span>
              )}
            </div>
            <p className="label mt-3 text-center">Live preview · illustrative</p>
          </div>

          <SpecCard fields={fields} status="Draft" reference="WS-SPEC · DRAFT" compact />

          {missing.length > 0 && (
            <p className="text-[13.5px] text-muted">Optional: {missing.join(", ")}. You can add these later.</p>
          )}

          <div className="no-print grid gap-3 sm:grid-cols-2">
            <Link href={`/sample?${query}`} className="btn btn-primary">
              Request a sample <Arrow />
            </Link>
            <Link href={`/brief?${query}`} className="btn btn-ghost">
              Full sourcing brief
            </Link>
          </div>
          <button type="button" onClick={() => window.print()} className="no-print link-u text-[14px] text-graphite">
            Print or save this specification as PDF
          </button>
        </div>
      </aside>
    </div>
  );
}
