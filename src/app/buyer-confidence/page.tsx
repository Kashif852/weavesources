import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Button, Tbc } from "@/components/ui";
import { site } from "@/content/site";
import { journey, qcCheckpoints } from "@/content/process";

export const metadata: Metadata = {
  title: "Buyer confidence — who we are and how to verify us",
  description: "Everything a buyer needs to check WeaveSources: company details, manufacturing partners, quality, sample, specification and export process, certifications and contacts.",
  alternates: { canonical: "/buyer-confidence" },
};

function Row({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="grid scroll-mt-28 gap-6 border-t border-ink/12 py-12 md:grid-cols-12">
      <h2 className="text-[26px] font-medium tracking-[-0.025em] md:col-span-4">{title}</h2>
      <div className="space-y-4 text-[16.5px] leading-relaxed text-graphite md:col-span-8">{children}</div>
    </section>
  );
}

const toc = [
  ["who", "Who we are"], ["partners", "Manufacturing partners"], ["quality", "Quality process"], ["sample", "Sample process"],
  ["spec", "Specification process"], ["export", "Export process"], ["docs", "Documentation"], ["certs", "Certifications"], ["contact", "Contact"],
];

export default function Page() {
  const c = site.company;
  return (
    <>
      <PageHero
        eyebrow="Buyer confidence"
        title={<>Everything you&apos;d want to check.<br /><span className="text-muted">In one place.</span></>}
        lede="We're a new company, so we expect to be checked. This page answers the questions a careful buyer asks before sending a brief — including what we don't have yet."
      />
      <div className="wrap grid gap-12 pb-24 lg:grid-cols-12">
        <nav className="hidden lg:col-span-3 lg:block" aria-label="On this page">
          <ul className="sticky top-28 space-y-2.5 text-[14.5px]">
            {toc.map(([id, t]) => <li key={id}><a href={`#${id}`} className="link-u text-graphite hover:text-ink">{t}</a></li>)}
          </ul>
        </nav>
        <div className="lg:col-span-9">
          <Row id="who" title="Who we are">
            <p>WeaveSources is a textile sourcing company. We do not own a factory. We turn a buyer&apos;s requirements into a written specification, match it to a suitable manufacturing partner in Pakistan, and coordinate sampling, quality checks, packing and export.</p>
            <dl className="grid gap-x-6 gap-y-3 rounded-2xl bg-linen p-6 text-[15px] sm:grid-cols-[180px_1fr]">
              <dt className="label pt-1">Legal name</dt><dd>{c.legalName ?? <Tbc>Registered company name</Tbc>}</dd>
              <dt className="label pt-1">Registration</dt><dd>{c.registration ?? <Tbc>Registration / NTN number</Tbc>}</dd>
              <dt className="label pt-1">Registered address</dt><dd>{c.registeredAddress ?? <Tbc>Registered address</Tbc>}</dd>
              <dt className="label pt-1">Founded</dt><dd>{c.founded ?? <Tbc>Year founded</Tbc>}</dd>
              <dt className="label pt-1">Team</dt><dd>{site.team.length ? site.team.map((m) => `${m.name} (${m.role})`).join(", ") : <Tbc>Names and roles</Tbc>}</dd>
            </dl>
          </Row>
          <Row id="partners" title="Manufacturing partners">
            <p>Your towels are made by independent manufacturing partners in Pakistan. They are separate companies. We tell you which partner produces your order before production starts.</p>
            <p>When we assess a partner we look at the products they regularly make, their capacity for your volume, their in-line quality practices, the certificates they can show us, and how clearly they communicate. We don&apos;t publish a partner&apos;s name without their agreement.</p>
          </Row>
          <Row id="quality" title="Quality process">
            <p>Quality is measured against your approved sample and written specification. Before packing, finished goods are checked against them. The checks for your order are agreed in writing before production.</p>
            <div className="flex flex-wrap gap-2">{qcCheckpoints.map((q) => <span key={q.k} className="rounded-full bg-linen px-3 py-1.5 text-[14px]">{q.k}</span>)}</div>
            <p><Link href="/quality" className="link-u text-ink">Read how quality checks work →</Link></p>
          </Row>
          <Row id="sample" title="Sample process">
            <p>Every new product starts with a sample made to your specification. {site.terms.samplePolicy ?? "Sample cost and timing depend on the specification and are confirmed with you in writing before anything is made."} Once you approve it, the sample becomes the production reference.</p>
          </Row>
          <Row id="spec" title="Specification process">
            <p>Your specification records product, material, GSM and tolerance, finished size and tolerance, colour reference, construction, branding, packaging, quantity and destination. It belongs to you, and every reorder references it.</p>
            <p><Link href="/specification" className="link-u text-ink">Try the specification builder →</Link></p>
          </Row>
          <Row id="export" title="Export process">
            <ol className="space-y-2">{journey.map((j) => <li key={j.n}><span className="font-mono text-[12px] text-clay mr-3">{j.n}</span>{j.title}</li>)}</ol>
            <p>Shipping terms (Incoterms), payment terms and freight arrangements are agreed per order. {site.terms.incoterms ? `Typical terms: ${site.terms.incoterms}.` : ""}</p>
          </Row>
          <Row id="docs" title="Documentation">
            <p>Each order comes with documents appropriate to its destination and terms — typically a commercial invoice, packing list and transport document, plus a certificate of origin and pre-shipment check report where required. Ask early which documents your customs broker needs.</p>
          </Row>
          <Row id="certs" title="Certifications">
            {site.certifications.length ? (
              <ul className="space-y-3">
                {site.certifications.map((x) => (
                  <li key={x.name + x.holder} className="rounded-2xl bg-linen p-5">
                    <p className="font-medium text-ink">{x.name}</p>
                    <p className="text-[14.5px]">Held by {x.holder} · verified {x.verifiedOn}{x.link && <> · <a className="link-u" href={x.link} target="_blank" rel="noopener">certificate ↗</a></>}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p>No certifications are listed yet. In textiles, certificates such as product-safety or social-compliance standards are held by the manufacturer, not the sourcing company.</p>
                <p>As we verify certificates held by our manufacturing partners, we&apos;ll list each one here with the holder&apos;s name and the date we checked it. If your order requires a specific certification, include it in your brief and we&apos;ll only propose partners who can evidence it.</p>
              </>
            )}
          </Row>
          <Row id="contact" title="Contact">
            <ul className="space-y-2">
              <li>Email: {site.contact.email ? <a className="link-u text-ink" href={`mailto:${site.contact.email}`}>{site.contact.email}</a> : <Tbc>Business email</Tbc>}</li>
              {site.contact.lines.map((l) => (
                <li key={l.digits}>
                  {l.region}{l.whatsapp ? " (phone & WhatsApp)" : ""}: <a className="link-u text-ink" href={`tel:+${l.digits}`}>{l.display}</a>
                </li>
              ))}
              {site.offices.map((o) => (
                <li key={o.name}>{o.name}: {o.lines.join(", ")}</li>
              ))}
              <li>LinkedIn: {site.contact.linkedin ? <a className="link-u text-ink" href={site.contact.linkedin}>Company page ↗</a> : <Tbc>LinkedIn page</Tbc>}</li>
            </ul>
            <div className="pt-4 flex flex-wrap gap-3"><Button href="/contact" variant="ghost">Contact options</Button><Button href="/sample" variant="primary">Request a sample</Button></div>
          </Row>
        </div>
      </div>
    </>
  );
}
