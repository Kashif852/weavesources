"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo, Arrow } from "./ui";

const nav = [
  { href: "/products", label: "Products" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/quality", label: "Quality" },
  { href: "/private-label", label: "Private label" },
  { href: "/industries", label: "Industries" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  // A section is active on its own page and any page beneath it (e.g. /products/bath-sheets).
  const isActive = (href: string) => path === href || path.startsWith(`${href}/`);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const [lastPath, setLastPath] = useState(path);
  if (path !== lastPath) {
    setLastPath(path);
    setOpen(false);
  }
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${scrolled || open ? "bg-paper/85 backdrop-blur-xl shadow-[0_1px_0_rgb(29_28_26/0.08)]" : ""}`}
      >
        <div className="wrap flex h-[76px] items-center justify-between gap-6">
          <Link href="/" aria-label="WeaveSources home" className="shrink-0">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {nav.map((n) => {
              const active = isActive(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-[14.5px] tracking-[-0.01em] ${active ? "text-ink" : "link-u text-graphite hover:text-ink"}`}
                >
                  {n.label}
                  {active && <span aria-hidden className="absolute inset-x-0 -bottom-[7px] h-[2px] rounded-full bg-clay" />}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/brief"
              aria-current={isActive("/brief") ? "page" : undefined}
              className={`btn btn-ghost !min-h-[42px] !px-5 !text-[14px] hidden md:inline-flex ${isActive("/brief") ? "!border-ink bg-ink/[0.05]" : ""}`}
            >
              Sourcing brief
            </Link>
            <Link
              href="/sample"
              aria-current={isActive("/sample") ? "page" : undefined}
              className={`btn btn-primary !min-h-[42px] !px-5 !text-[14px] hidden sm:inline-flex ${isActive("/sample") ? "ring-2 ring-clay ring-offset-2 ring-offset-paper" : ""}`}
            >
              Request a sample
            </Link>
            <button
              className="relative grid h-11 w-11 place-items-center rounded-full lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-0 top-[76px] bottom-0 bg-paper transition-all duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <nav className="wrap flex h-full flex-col pt-6 pb-10" aria-label="Mobile">
          {[...nav, { href: "/buyer-confidence", label: "Buyer confidence" }, { href: "/contact", label: "Contact" }].map((n, i) => {
            const active = isActive(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between border-b border-ink/10 py-4 text-[26px] font-medium tracking-[-0.03em] ${active ? "text-clay" : ""}`}
                style={{ transition: "transform .6s var(--ease-out-soft), opacity .6s", transitionDelay: `${open ? i * 30 : 0}ms`, transform: open ? "none" : "translateY(10px)", opacity: open ? 1 : 0 }}
              >
                <span className="flex items-center gap-3">
                  {active && <span aria-hidden className="h-2 w-2 rounded-full bg-clay" />}
                  {n.label}
                </span>
                {active ? <span className="font-mono text-[10.5px] uppercase tracking-[0.12em]">You&apos;re here</span> : <Arrow className="text-muted" />}
              </Link>
            );
          })}
          <div className="mt-auto grid grid-cols-2 gap-3">
            <Link href="/brief" className="btn btn-ghost">Sourcing brief</Link>
            <Link href="/sample" className="btn btn-primary">Request sample</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
