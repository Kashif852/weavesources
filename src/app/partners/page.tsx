import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, Button, SectionHead } from "@/components/ui";
import { FinalCta } from "@/components/sections";
import { capabilities, credentials, partners } from "@/content/partners";
import { categories } from "@/content/products";
import { inquiryHref } from "@/components/Inquiry";

export const metadata: Metadata = {
  title: "Manufacturing partners & credentials",
  description:
    "How WeaveSources works with independent towel manufacturers in Pakistan, and how partner certifications are listed: holder, issuing body, scope, facility, validity and verification.",
  alternates: { canonical: "/partners" },
};

const fmt = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—");
const catName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;
const capName = (key: string) => capabilities.find((c) => c.key === key)?.name ?? key;

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Partners & credentials"
        title={<>Independent manufacturers.<br /><span className="text-muted">Credentials shown as theirs.</span></>}
        lede="WeaveSources does not own a factory. Your products are made by independent manufacturing companies in Pakistan. This page explains how we work with them, and how their certifications and documents are presented — with the holder named, never as a WeaveSources badge."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={inquiryHref("Request partner documentation")} variant="primary">Request partner documentation</Button>
          <Button href="/manufacturing" variant="ghost">Manufacturing &amp; sourcing</Button>
        </div>
      </PageHero>

      <section className="wrap pb-24">
        <SectionHead
          eyebrow="The partner network"
          title={<>How the relationship works.</>}
          lede="Manufacturers are separate companies with their own facilities, certificates and customers. We select them per product and per order."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-[22px] bg-ink/10 md:grid-cols-3">
          {[
            ["How partners are chosen", "We look at the products a manufacturer regularly makes, capacity for your volume, in-line quality practice, the certificates they can evidence, and how clearly they communicate."],
            ["What you are told", "Which partner makes your order, where, and which processes they perform — before production starts. Changes of partner need your approval."],
            ["Confidentiality", "Many manufacturers prefer not to be named publicly. We publish a partner profile only with written permission, and share details with qualified buyers for their order."],
          ].map(([t, s]) => (
            <div key={t} className="bg-paper p-8" data-reveal>
              <p className="text-[20px] font-medium tracking-[-0.02em]">{t}</p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-graphite">{s}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="h3">Partner profiles</h2>
          {partners.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {partners.map((p) => (
                <article key={p.id} className="overflow-hidden rounded-[22px] bg-linen">
                  {p.photos[0] && (
                    <div className="relative aspect-[16/9]">
                      <Image src={p.photos[0].src} alt={p.photos[0].caption} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                    </div>
                  )}
                  <div className="p-7">
                    <p className="label">{p.location}</p>
                    <p className="mt-2 text-[22px] font-medium tracking-[-0.02em]">{p.disclosure === "public" && p.name ? p.name : "Name shared with qualified buyers"}</p>
                    <dl className="mt-5 grid gap-x-4 gap-y-2 text-[14.5px] sm:grid-cols-[130px_1fr]">
                      <dt className="text-muted">Products</dt><dd>{p.products.map(catName).join(", ")}</dd>
                      <dt className="text-muted">Processes</dt><dd>{p.processes.map(capName).join(", ")}</dd>
                      <dt className="text-muted">Documents</dt><dd>{p.credentialIds.length ? `${p.credentialIds.length} listed below` : "On request"}</dd>
                      <dt className="text-muted">Last assessed</dt><dd>{fmt(p.verifiedOn)}</dd>
                    </dl>
                    {p.note && <p className="mt-4 text-[14px] text-muted">{p.note}</p>}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-[22px] border border-dashed border-sand p-8">
              <p className="max-w-3xl text-[16.5px] leading-relaxed text-graphite">
                No partner profiles are published yet. Profiles will appear here — with location, product capabilities, processes, real facility photographs and verified documents — once each manufacturer agrees to public disclosure. Until then, we share the relevant partner&apos;s details with qualified buyers for their order.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-linen" id="credentials">
        <div className="wrap py-24 md:py-32">
          <SectionHead
            eyebrow="Verified partner credentials"
            title={<>Every certificate, with its holder.</>}
            lede="A certificate covers a named company, a facility and a scope, for a period of time. That is what we list — and nothing that we haven’t checked."
          />
          {credentials.length ? (
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {credentials.map((c) => (
                <article key={c.id} className="rounded-[22px] bg-paper p-7">
                  <p className="text-[21px] font-medium tracking-[-0.02em]">{c.name}</p>
                  <dl className="mt-5 grid gap-x-4 gap-y-2 text-[14.5px] sm:grid-cols-[150px_1fr]">
                    <dt className="text-muted">Certificate holder</dt><dd className="font-medium">{c.holder}</dd>
                    <dt className="text-muted">Issued by</dt><dd>{c.issuer}</dd>
                    {c.reference && (<><dt className="text-muted">Reference</dt><dd className="font-mono text-[13px]">{c.reference}</dd></>)}
                    <dt className="text-muted">Scope</dt><dd>{c.scope}</dd>
                    <dt className="text-muted">Facility</dt><dd>{c.facility}</dd>
                    <dt className="text-muted">Valid</dt><dd>{fmt(c.validFrom)} – {fmt(c.validUntil)}</dd>
                    <dt className="text-muted">Verification</dt>
                    <dd>{c.verificationUrl ? <a href={c.verificationUrl} className="link-u" target="_blank" rel="noopener">{c.verification} ↗</a> : c.verification}</dd>
                    <dt className="text-muted">Checked by us</dt><dd>{fmt(c.checkedOn)}</dd>
                  </dl>
                  <p className="mt-5 text-[12.5px] text-muted">Held by {c.holder}, not by WeaveSources. Applies only to the scope and facility above.</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-8 rounded-[22px] bg-paper p-8 md:grid-cols-12 md:p-10">
              <div className="md:col-span-5">
                <p className="label">Current status</p>
                <p className="mt-3 text-[24px] font-medium leading-tight tracking-[-0.02em]">No partner certificates are published yet.</p>
              </div>
              <div className="space-y-4 text-[16px] leading-relaxed text-graphite md:col-span-7">
                <p>Relevant partner documentation can be discussed and provided for the specific products and facilities in your order. If you need a particular standard, tell us at the start: we will only propose partners who can evidence it, and you will see the document before production.</p>
                <p>When certificates are listed here, each will show the certificate name, the company that holds it, the issuing body, the reference number where appropriate, the scope and facility it applies to, its validity dates, and how to verify it with the issuer.</p>
                <Button href={inquiryHref("Request partner documentation")} variant="primary">Request partner documentation</Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="wrap py-24">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label">How to request documents</p>
            <p className="mt-3 text-[26px] font-medium leading-tight tracking-[-0.025em]">Tell us the product, the destination and the standard.</p>
          </div>
          <ol className="space-y-4 text-[16px] leading-relaxed text-graphite md:col-span-7">
            <li><span className="mr-3 font-mono text-[12px] text-clay">01</span>Send a documentation request with the product and the standard or document you need.</li>
            <li><span className="mr-3 font-mono text-[12px] text-clay">02</span>We check which partner can supply that product and what they hold for the relevant facility.</li>
            <li><span className="mr-3 font-mono text-[12px] text-clay">03</span>We send what is available, with the holder and scope stated — and tell you plainly what is not.</li>
          </ol>
        </div>
        <p className="mt-10 text-[14.5px] text-muted">
          Related: <Link href="/quality" className="link-u text-ink">Quality &amp; compliance</Link> · <Link href="/buyer-confidence" className="link-u text-ink">Buyer confidence</Link>
        </p>
      </section>
      <FinalCta />
    </>
  );
}
