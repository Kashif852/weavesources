"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { specKeys } from "@/content/spec";
import emailjs from "@emailjs/browser";
import { Arrow } from "./ui";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "select" | "textarea" | "chips";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  half?: boolean;
  hint?: string;
};
export type Section = { title: string; note?: string; fields: FieldDef[] };

type Status = "idle" | "sending" | "sent" | "error" | "unconfigured";

export default function BuyerForm({
  kind,
  sections,
  submitLabel,
  successTitle,
  nextSteps,
  contactEmail,
}: {
  kind: "sample" | "brief";
  sections: Section[];
  submitLabel: string;
  successTitle: string;
  nextSteps: { t: string; d: string }[];
  contactEmail: string | null;
}) {
  const sp = useSearchParams();
  const prefill = useMemo(() => {
    const o: Record<string, string> = {};
    specKeys.forEach((k) => {
      const v = sp.get(k);
      if (v) o[k] = v;
    });
    const p = sp.get("product");
    if (p) o.product = p;
    return o;
  }, [sp]);
  const fromSpec = Object.keys(prefill).length > 2;

  const [values, setValues] = useState<Record<string, string>>(prefill);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (n: string, v: string) => setValues((s) => ({ ...s, [n]: v }));

  const all = sections.flatMap((s) => s.fields);
  const summary = all
    .filter((f) => values[f.name])
    .map((f) => `${f.label}: ${values[f.name]}`)
    .join("\n");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    all.forEach((f) => {
      const v = (values[f.name] ?? "").trim();
      if (f.required && !v) errs[f.name] = "Required";
      if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errs[f.name] = "Check this email address";
    });
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus("sending");

    const hp = (e.currentTarget.elements.namedItem("company_website") as HTMLInputElement)?.value;
    // Honeypot: bots fill the hidden field. Show success, send nothing.
    if (hp) {
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!SERVICE || !TEMPLATE || !PUBLIC_KEY) {
      // No credentials: fall back to the mailto / copy panel rather than
      // pretending the brief was received.
      setStatus("unconfigured");
      return;
    }

    try {
      await emailjs.send(
        SERVICE,
        TEMPLATE,
        {
          // The buyer, so a reply goes straight back to them.
          from_name: values.name ?? "",
          from_email: values.email ?? "",
          reply_to: values.email ?? "",
          from_number: values.phone ?? "",
          company: values.company ?? "",
          country: values.country ?? "",
          subject: kind === "sample" ? "Sample request" : "Sourcing brief",
          // Every answered field, label: value, one per line. This is what
          // makes one template cover both forms and any future field.
          message: summary,
          to_name: "WeaveSources",
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("[BuyerForm] EmailJS send failed", err);
      setStatus("error");
    }

    // Best-effort second copy to the server webhook (Zapier/CRM), for Node
    // deploys where /api/submit exists. Skipped on the static export, where
    // that route is not built. Never blocks or fails what the buyer sees.
    if (process.env.NEXT_PUBLIC_HAS_API !== "0") {
      void fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, values, company_website: hp }),
      }).catch(() => {});
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-[28px] bg-linen p-8 md:p-14">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden><path d="M4 11.5 9 16l9-10" stroke="currentColor" strokeWidth="2" /></svg>
        </div>
        <h2 className="h2 mt-8">{successTitle}</h2>
        <p className="lede mt-4 max-w-xl">Thank you{values.name ? `, ${values.name.split(" ")[0]}` : ""}. Here is exactly what happens next.</p>
        <ol className="mt-10 max-w-2xl">
          {nextSteps.map((s, i) => (
            <li key={s.t} className="grid grid-cols-[44px_1fr] gap-3 border-t border-ink/12 py-5">
              <span className="font-mono text-[12px] text-clay pt-1">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-[18px] font-medium tracking-[-0.015em]">{s.t}</p>
                <p className="mt-1 text-[15px] text-graphite">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/resources" className="btn btn-ghost">Read buyer resources <Arrow /></Link>
          <Link href="/" className="btn btn-ghost">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative">
      {fromSpec && (
        <div className="mb-10 rounded-2xl bg-clay-soft px-5 py-4 text-[15px] text-clay-deep">
          <p className="font-medium">Your specification is attached to this request.</p>
          <p className="mt-2 font-mono text-[12px] leading-relaxed text-clay-deep/80">
            {Object.entries(prefill).map(([k, v]) => `${k}: ${v}`).join(" · ")}
          </p>
          <p className="mt-2">Check the fields below, then add your details.</p>
        </div>
      )}
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>Website<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {sections.map((sec, si) => (
        <fieldset key={sec.title} className="border-t border-ink/12 py-10 first:border-0 first:pt-0">
          <legend className="contents">
            <span className="flex items-baseline gap-4">
              <span className="font-mono text-[11px] text-clay">{String(si + 1).padStart(2, "0")}</span>
              <span className="text-[22px] font-medium tracking-[-0.02em]">{sec.title}</span>
            </span>
          </legend>
          {sec.note && <p className="mt-2 text-[14.5px] text-muted sm:pl-8">{sec.note}</p>}
          <div className="mt-6 grid gap-x-5 gap-y-6 sm:grid-cols-2 sm:pl-8">
            {sec.fields.map((f) => {
              const id = `f-${f.name}`;
              const err = errors[f.name];
              const common = {
                id,
                name: f.name,
                value: values[f.name] ?? "",
                "aria-invalid": Boolean(err),
                "aria-describedby": err ? `${id}-err` : undefined,
              };
              return (
                <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
                  <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-[14.5px] font-medium">
                    <span>{f.label}{f.required && <span className="text-clay"> *</span>}</span>
                    {!f.required && <span className="font-mono text-[10.5px] font-normal uppercase tracking-[0.08em] text-muted">Optional</span>}
                  </label>
                  {f.type === "select" ? (
                    <select {...common} className="field" onChange={(e) => set(f.name, e.target.value)}>
                      <option value="">Select…</option>
                      {f.options?.map((o) => <option key={o}>{o}</option>)}
                      {values[f.name] && !f.options?.includes(values[f.name]) && <option>{values[f.name]}</option>}
                    </select>
                  ) : f.type === "chips" ? (
                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby={id}>
                      <input type="hidden" {...common} />
                      {f.options?.map((o) => (
                        <button key={o} type="button" className="chip" aria-pressed={values[f.name] === o} onClick={() => set(f.name, o)}>{o}</button>
                      ))}
                    </div>
                  ) : f.type === "textarea" ? (
                    <textarea {...common} className="field" placeholder={f.placeholder} onChange={(e) => set(f.name, e.target.value)} />
                  ) : (
                    <input
                      {...common}
                      type={f.type ?? "text"}
                      className="field"
                      placeholder={f.placeholder}
                      autoComplete={f.name === "name" ? "name" : f.name === "email" ? "email" : f.name === "phone" ? "tel" : f.name === "company" ? "organization" : f.name === "country" ? "country-name" : undefined}
                      onChange={(e) => set(f.name, e.target.value)}
                    />
                  )}
                  {f.hint && !err && <p className="mt-1.5 text-[13px] text-muted">{f.hint}</p>}
                  {err && <p id={`${id}-err`} className="mt-1.5 text-[13px] text-clay">{err}</p>}
                </div>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="sticky bottom-0 z-10 -mx-5 border-t border-ink/10 bg-paper/90 px-5 py-4 backdrop-blur-xl sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:pt-4 sm:backdrop-blur-none">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full sm:w-auto disabled:opacity-60">
          {status === "sending" ? "Sending…" : submitLabel} {status !== "sending" && <Arrow />}
        </button>
        <p className="mt-3 text-[13px] text-muted">
          We use your details only to respond to this request. See our <Link href="/legal/privacy" className="link-u">privacy note</Link>.
        </p>
      </div>

      {(status === "error" || status === "unconfigured") && (
        <div className="mt-6 rounded-2xl border border-clay/40 bg-clay-soft/60 p-5 text-[15px] text-clay-deep" role="alert">
          <p className="font-medium">We couldn&apos;t send this automatically.</p>
          <p className="mt-1">
            Nothing is lost — {contactEmail ? (
              <>email it to <a className="underline" href={`mailto:${contactEmail}?subject=${encodeURIComponent(kind === "sample" ? "Sample request" : "Sourcing brief")}&body=${encodeURIComponent(summary)}`}>{contactEmail}</a> with one click, or </>
            ) : null}
            copy your details below.
          </p>
          <button type="button" className="btn btn-ghost mt-4 !min-h-[42px]" onClick={() => navigator.clipboard?.writeText(summary)}>
            Copy my details
          </button>
        </div>
      )}
    </form>
  );
}
