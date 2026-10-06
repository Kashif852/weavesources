import type { Metadata } from "next";
import { Tbc } from "@/components/ui";

export const metadata: Metadata = { title: "Terms of use", alternates: { canonical: "/legal/terms" } };

export default function Page() {
  return (
    <section className="wrap max-w-3xl pt-32 pb-24 md:pt-44">
      <p className="eyebrow mb-6">Legal</p>
      <h1 className="h2">Terms of use</h1>
      <div className="prose-ws mt-10">
        <p>This website describes the sourcing services of WeaveSources. Content on the site — including product reference points and buyer guides — is general information, not a binding offer.</p>
        <p>Specifications, prices, minimum quantities, lead times, sample costs and shipping terms are agreed in writing for each order and form part of that order&apos;s terms.</p>
        <p>WeaveSources is a sourcing company. Products are manufactured by independent manufacturing partners.</p>
        <p className="mt-10"><Tbc>Draft — have this reviewed by a lawyer before launch</Tbc></p>
      </div>
    </section>
  );
}
