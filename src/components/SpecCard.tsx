import type { CSSProperties } from "react";
import { Mark } from "./ui";

export type SpecField = { k: string; v: string; muted?: boolean };

const statusStyle: Record<string, string> = {
  Draft: "bg-linen text-graphite",
  "Sample requested": "bg-clay-soft text-clay-deep",
  "Approved standard": "bg-ink text-paper",
};

/**
 * The Specification Card — WeaveSources' signature object.
 * The same card travels from brief → sample → approved standard → reorder.
 */
export function SpecCard({
  fields,
  status = "Draft",
  reference = "WS-SPEC · DRAFT",
  title = "Towel specification",
  className = "",
  style,
  compact = false,
}: {
  fields: SpecField[];
  status?: "Draft" | "Sample requested" | "Approved standard";
  reference?: string;
  title?: string;
  className?: string;
  style?: CSSProperties;
  compact?: boolean;
}) {
  return (
    <div
      className={`${className.includes("absolute") ? "" : "relative"} rounded-[20px] bg-[#fffdf9] text-ink ${className}`}
      style={{
        boxShadow: "0 0 0 1px rgb(29 28 26 / .08), 0 30px 60px -30px rgb(60 40 20 / .35), 0 8px 20px -12px rgb(60 40 20 / .18)",
        ...style,
      }}
    >
      <div className={`flex items-center justify-between gap-3 ${compact ? "px-5 pt-4 pb-3" : "px-6 pt-5 pb-4"}`}>
        <div className="flex items-center gap-2.5">
          <span className="text-ink"><Mark size={20} /></span>
          <div>
            <p className="text-[13.5px] font-semibold leading-tight tracking-[-0.01em]">{title}</p>
            <p className="label !text-[9.5px] mt-0.5">{reference}</p>
          </div>
        </div>
        <span className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] ${statusStyle[status]}`}>
          {status}
        </span>
      </div>
      <dl className={compact ? "px-5 pb-4" : "px-6 pb-5"}>
        {fields.map((f) => (
          <div key={f.k} className="grid grid-cols-[96px_1fr] items-baseline gap-3 border-t border-ink/[0.07] py-[9px]">
            <dt className="label !text-[9.5px]">{f.k}</dt>
            <dd className={`text-[14px] leading-snug tracking-[-0.01em] ${f.muted ? "text-muted" : ""}`}>{f.v}</dd>
          </div>
        ))}
      </dl>
      {/* Perforation detail */}
      <div className="relative h-0">
        <div className="absolute inset-x-6 -top-px border-t border-dashed border-ink/15" />
      </div>
      <div className={`flex items-center justify-between ${compact ? "px-5 py-3" : "px-6 py-3.5"}`}>
        <span className="label !text-[9px]">Reference for sample · production · reorder</span>
        <span className="font-mono text-[9px] tracking-[0.1em] text-muted">weavesources.com</span>
      </div>
    </div>
  );
}
