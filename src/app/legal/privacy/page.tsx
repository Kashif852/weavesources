import type { Metadata } from "next";
import { Tbc } from "@/components/ui";

export const metadata: Metadata = { title: "Privacy note", alternates: { canonical: "/legal/privacy" } };

export default function Page() {
  return (
    <section className="wrap max-w-3xl pt-32 pb-24 md:pt-44">
      <p className="eyebrow mb-6">Legal</p>
      <h1 className="h2">Privacy note</h1>
      <div className="prose-ws mt-10">
        <p>When you request a sample, send a sourcing brief or contact us, we receive the details you enter — such as your name, company, email, phone and the specification you describe.</p>
        <p>We use them only to respond to your request and manage any resulting order. We share the specification (not your contact details) with manufacturing partners when needed to prepare a sample or quotation, and we tell you before doing so.</p>
        <p>We do not sell your data. We do not use advertising trackers on this site.</p>
        <p>You can ask us to see, correct or delete your information at any time by contacting us.</p>
        <p className="mt-10"><Tbc>Draft — have this reviewed by a lawyer before launch</Tbc></p>
      </div>
    </section>
  );
}
