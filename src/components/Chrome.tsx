"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { site } from "@/content/site";
import { OPEN_EVENT, WaIcon } from "./WhatsApp";

/** Opts the page into scroll-reveal and observes [data-reveal] elements. */
export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("js-reveal");
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    els.forEach((el) => {
      // Anything already in view on load shows immediately.
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95) requestAnimationFrame(() => el.classList.add("in"));
      else io.observe(el);
    });
    return () => io.disconnect();
  }, [path]);
  return null;
}


/** Sticky mobile action bar: Request sample + WhatsApp (or brief if WhatsApp not configured). */
export function MobileBar() {
  const path = usePathname();
  if (path.startsWith("/sample") || path.startsWith("/brief")) return null;
  const wa = site.contact.lines.some((l) => l.whatsapp);
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/90 px-4 pt-3 backdrop-blur-xl sm:hidden" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
      <div className="flex gap-2.5">
        <Link href="/sample" className="btn btn-primary flex-1 !min-h-[50px]">Request a sample</Link>
        {wa ? (
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
            className="btn btn-ghost !min-h-[50px] !px-4 text-[#187a41]"
            aria-label="Chat with us on WhatsApp"
          >
            <WaIcon />
          </button>
        ) : (
          <Link href="/brief" className="btn btn-ghost !min-h-[50px] !px-4">Brief</Link>
        )}
      </div>
    </div>
  );
}

export const contactConfigured = Boolean(site.contact.email || site.contact.lines.length || site.contact.whatsapp);
