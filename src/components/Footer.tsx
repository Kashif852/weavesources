import Link from "next/link";
import { site } from "@/content/site";
import { Logo, Tbc } from "./ui";

const cols = [
  {
    title: "Sourcing",
    links: [
      ["Products", "/products"],
      ["Build a specification", "/specification"],
      ["Private label", "/private-label"],
      ["Industries", "/industries"],
    ],
  },
  {
    title: "How we work",
    links: [
      ["Our process", "/how-we-work"],
      ["Quality", "/quality"],
      ["Buyer confidence", "/buyer-confidence"],
      ["Buyer resources", "/resources"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Request a sample", "/sample"],
      ["Send a sourcing brief", "/brief"],
    ],
  },
];

export default function Footer() {
  const c = site.contact;
  const socials = [
    ["LinkedIn", c.linkedin],
    ["Instagram", c.instagram],
    ["Facebook", c.facebook],
  ] as const;
  return (
    <footer className="bg-ink text-paper pb-28 sm:pb-0">
      <div className="wrap pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo onDark />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-paper/65">
              A textile sourcing partner for international buyers. Towels made by vetted manufacturing partners in Pakistan — specified, sampled and checked before they ship.
            </p>
            <div className="mt-8 space-y-2 text-[14.5px]">
              {c.email ? <a className="link-u block w-fit" href={`mailto:${c.email}`}>{c.email}</a> : <Tbc>Business email</Tbc>}
              {c.lines.length ? (
                c.lines.map((l) => (
                  <div key={l.digits}>
                    <span className="text-paper/45">{l.region} · </span>
                    <a className="link-u" href={`tel:+${l.digits}`}>{l.display}</a>
                  </div>
                ))
              ) : (
                <div><Tbc>Phone / WhatsApp</Tbc></div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            {cols.map((col) => (
              <div key={col.title}>
                <p className="label !text-paper/45 mb-5">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map(([l, h]) => (
                    <li key={h}>
                      <Link href={h} className="link-u text-[15px] text-paper/85 hover:text-paper">{l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-8 border-t border-paper/12 pt-8 md:grid-cols-3 md:items-center">
          <div className="flex flex-wrap gap-5 text-[14px] text-paper/70">
            {socials.map(([n, h]) =>
              h ? (
                <a key={n} href={h} className="link-u" rel="noopener" target="_blank">{n}</a>
              ) : null
            )}
            {socials.every(([, h]) => !h) && <span className="tbc !bg-transparent !text-paper/50 !border-paper/25">Social links</span>}
          </div>
          <div className="flex flex-wrap gap-5 text-[13.5px] text-paper/55 md:justify-center">
            <Link href="/legal/privacy" className="link-u">Privacy</Link>
            <Link href="/legal/terms" className="link-u">Terms</Link>
            <Link href="/legal/trade" className="link-u">Shipping &amp; trade</Link>
          </div>
          <p className="text-[13px] text-paper/45 md:text-right">
            © {new Date().getFullYear()} {site.company.legalName ?? "WeaveSources"}
            {site.company.registration ? ` · ${site.company.registration}` : ""}
          </p>
        </div>
        <p className="mt-6 max-w-3xl text-[12.5px] leading-relaxed text-paper/40">
          WeaveSources is a sourcing company. Products are manufactured by independent manufacturing partners. Certifications, where listed, are held by the named partner.
        </p>
      </div>
    </footer>
  );
}
