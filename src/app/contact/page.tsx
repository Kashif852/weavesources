import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Tbc, Arrow } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact WeaveSources by email, phone, WhatsApp or LinkedIn — or send a sample request or sourcing brief.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  const c = site.contact;
  const channels = [
    { k: "Email", v: c.email, href: c.email ? `mailto:${c.email}` : null, d: "Best for briefs, files and specifications." },
    ...c.lines.map((l) => ({
      k: `${l.region} · Phone${l.whatsapp ? " & WhatsApp" : ""}`,
      v: l.display,
      href: `tel:+${l.digits}`,
      wa: l.whatsapp ? `https://wa.me/${l.digits}` : null,
      d: l.whatsapp ? "Call, or message on WhatsApp for quick questions and photos." : "For a call, book a time by email first.",
    })),
    { k: "LinkedIn", v: c.linkedin ? "Company page" : null, href: c.linkedin, d: "See the people behind WeaveSources." },
  ];
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Talk to a person,<br /><span className="text-muted">not a form.</span></>}
        lede={`${c.hours}. Every message is read and answered by a named member of our team.`}
      />
      <section className="wrap pb-16">
        <div className="grid gap-px overflow-hidden rounded-[22px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((x) => (
            <div key={x.k} className="flex min-h-[200px] flex-col bg-paper p-7">
              <p className="label">{x.k}</p>
              <div className="mt-5 text-[20px] font-medium tracking-[-0.02em]">
                {x.v && x.href ? <a href={x.href} className="link-u break-all">{x.v}</a> : <Tbc>{x.k}</Tbc>}
              </div>
              {"wa" in x && x.wa && (
                <a href={x.wa} className="link-u mt-2 w-fit text-[14.5px] text-clay" target="_blank" rel="noopener">
                  Message on WhatsApp ↗
                </a>
              )}
              <p className="mt-auto pt-6 text-[14.5px] text-muted">{x.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="wrap pb-24 md:pb-32">
        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/sample" className="group rounded-[24px] bg-ink p-8 text-paper md:p-10">
            <p className="label !text-paper/50">Ready to feel the product?</p>
            <p className="mt-10 text-[32px] font-medium tracking-[-0.03em]">Request a sample</p>
            <span className="mt-6 inline-flex items-center gap-2 text-paper/70 group-hover:text-paper">Start <Arrow /></span>
          </Link>
          <Link href="/brief" className="group rounded-[24px] bg-linen p-8 md:p-10">
            <p className="label">Need pricing and terms?</p>
            <p className="mt-10 text-[32px] font-medium tracking-[-0.03em]">Send a sourcing brief</p>
            <span className="mt-6 inline-flex items-center gap-2 text-graphite group-hover:text-ink">Start <Arrow /></span>
          </Link>
        </div>
        <div className="mt-12 rounded-[22px] border border-ink/10 p-8">
          <p className="label">Company information</p>
          <dl className="mt-5 grid gap-x-6 gap-y-3 text-[15px] sm:grid-cols-[200px_1fr]">
            <dt className="text-muted">Company</dt><dd>{site.company.legalName ?? <Tbc>Registered company name</Tbc>}</dd>
            <dt className="text-muted">Offices</dt>
            <dd className="grid gap-4 sm:grid-cols-2">
              {site.offices.map((o) => (
                <div key={o.name}>
                  <p className="font-medium">{o.name}</p>
                  {o.lines.map((l) => <p key={l} className="text-graphite">{l}</p>)}
                </div>
              ))}
            </dd>
            <dt className="text-muted">Registered address</dt><dd>{site.company.registeredAddress ?? <Tbc>Registered address</Tbc>}</dd>
            <dt className="text-muted">Where we operate</dt><dd>{site.company.operations ?? <>Sourcing, sampling, quality coordination and export in Pakistan. <Tbc>Confirm any other operating locations</Tbc></>}</dd>
          </dl>
        </div>
      </section>
    </>
  );
}
