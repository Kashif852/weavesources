"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { site, whatsappHref } from "@/content/site";

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

const WaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z" />
  </svg>
);

/** Sticky mobile action bar: Request sample + WhatsApp (or brief if WhatsApp not configured). */
export function MobileBar() {
  const path = usePathname();
  if (path.startsWith("/sample") || path.startsWith("/brief")) return null;
  const wa = whatsappHref();
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/90 px-4 pt-3 backdrop-blur-xl sm:hidden" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
      <div className="flex gap-2.5">
        <Link href="/sample" className="btn btn-primary flex-1 !min-h-[50px]">Request a sample</Link>
        {wa ? (
          <a href={wa} className="btn btn-ghost !min-h-[50px] !px-4" aria-label="Message us on WhatsApp">
            <WaIcon />
          </a>
        ) : (
          <Link href="/brief" className="btn btn-ghost !min-h-[50px] !px-4">Brief</Link>
        )}
      </div>
    </div>
  );
}

export { WaIcon };
export const contactConfigured = Boolean(site.contact.email || site.contact.lines.length || site.contact.whatsapp);
