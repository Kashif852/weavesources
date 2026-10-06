import type { Metadata } from "next";
import { Tbc } from "@/components/ui";

export const metadata: Metadata = { title: "Shipping & trade information", alternates: { canonical: "/legal/trade" } };

export default function Page() {
  return (
    <section className="wrap max-w-3xl pt-32 pb-24 md:pt-44">
      <p className="eyebrow mb-6">Legal</p>
      <h1 className="h2">Shipping & trade information</h1>
      <div className="prose-ws mt-10">
        <p>We coordinate export from Pakistan. Shipping terms are agreed per order using standard Incoterms (for example FOB or CIF), which define who arranges and pays for transport and insurance, and where risk passes to the buyer.</p>
        <p>Import duties, taxes and customs clearance at destination are typically the buyer&apos;s responsibility unless agreed otherwise in writing.</p>
        <p>Each shipment is accompanied by the export documents required for its terms and destination. Tell us early which documents your customs broker needs.</p>
        <p>Payment terms are agreed per order and confirmed in writing before production.</p>
        <p className="mt-10"><Tbc>Draft — have this reviewed by a lawyer before launch</Tbc></p>
      </div>
    </section>
  );
}
