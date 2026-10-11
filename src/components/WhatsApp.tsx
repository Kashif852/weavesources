"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { site } from "@/content/site";

/**
 * Floating WhatsApp chat. Opens a small panel where the buyer picks which
 * team to message (every line in site.contact.lines with whatsapp: true),
 * edits a pre-filled message, and is sent to wa.me with it.
 *
 * Other components open it with:  window.dispatchEvent(new Event(OPEN_EVENT))
 */
export const OPEN_EVENT = "ws:whatsapp-open";

export const waLink = (digits: string, text: string) => `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;

export const WaIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z" />
  </svg>
);

const lines = site.contact.lines.filter((l) => l.whatsapp);

function defaultMessage(path: string) {
  // On a product or collection page, name it, so the team knows the context.
  if (typeof document !== "undefined" && (path.startsWith("/products/") || path.startsWith("/collections/"))) {
    const name = document.title.split(" — ")[0].split(" · ")[0];
    return `Hello WeaveSources, I'd like to discuss ${name}.`;
  }
  return "Hello WeaveSources, I'd like to discuss a towel sourcing requirement.";
}

export default function WhatsAppChat() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [line, setLine] = useState(lines[0]?.digits ?? "");
  const [text, setText] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const panelId = useId();

  // Reset the message for each page; it is recomputed when the panel opens.
  const [lastPath, setLastPath] = useState(path);
  if (path !== lastPath) {
    setLastPath(path);
    setOpen(false);
  }

  useEffect(() => {
    const onOpen = () => {
      setText(defaultMessage(window.location.pathname));
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    textRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  if (!lines.length || path.startsWith("/catalog/print")) return null;

  const toggle = () => {
    if (!open) setText(defaultMessage(path));
    setOpen((o) => !o);
  };
  const send = () => {
    window.open(waLink(line, text.trim() || defaultMessage(path)), "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <div className="no-print">
      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-label="Message WeaveSources on WhatsApp"
          className="fixed inset-x-3 bottom-[92px] z-50 overflow-hidden rounded-[22px] bg-paper shadow-[0_24px_60px_-20px_rgb(0_0_0/.45),0_0_0_1px_rgb(0_0_0/.06)] animate-[fadeUp_.35s_var(--ease-out-soft)] sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[360px]"
        >
          <div className="flex items-center gap-3 bg-brand-green px-5 py-4 text-paper">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/weavesources-mark-64.png" alt="" width={25} height={20} className="object-contain" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-medium leading-tight">WeaveSources</p>
              <p className="mt-0.5 text-[12px] leading-snug text-paper/70">{site.contact.hours}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              className="grid h-9 w-9 place-items-center rounded-full text-paper/80 hover:bg-paper/10 hover:text-paper"
              aria-label="Close WhatsApp chat"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M1 1l12 12M13 1 1 13" stroke="currentColor" strokeWidth="1.6" /></svg>
            </button>
          </div>

          <div className="p-5">
            <p className="rounded-2xl rounded-tl-sm bg-linen px-4 py-3 text-[14px] leading-relaxed text-graphite">
              Hello! Tell us the product, rough quantity and destination, and a member of our team will reply on WhatsApp.
            </p>

            {lines.length > 1 && (
              <fieldset className="mt-5">
                <legend className="label mb-2">Message our team in</legend>
                <div className="flex flex-wrap gap-2">
                  {lines.map((l) => (
                    <button
                      key={l.digits}
                      type="button"
                      className="chip !min-h-[38px] !text-[13.5px]"
                      aria-pressed={line === l.digits}
                      onClick={() => setLine(l.digits)}
                    >
                      {l.region}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <label htmlFor={`${panelId}-msg`} className="label mb-2 mt-5 block">Your message</label>
            <textarea
              ref={textRef}
              id={`${panelId}-msg`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              className="field !min-h-[96px] !text-[15px]"
            />
            <button type="button" onClick={send} className="btn mt-4 w-full bg-[#187a41] text-white hover:bg-[#13653a]">
              <WaIcon size={18} /> Open WhatsApp
            </button>
            <p className="mt-3 text-center text-[12px] text-muted">
              Opens WhatsApp with your message. {lines.find((l) => l.digits === line)?.display}
            </p>
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        className="fixed bottom-6 right-6 z-50 hidden h-14 w-14 place-items-center rounded-full bg-[#187a41] text-white shadow-[0_12px_30px_-10px_rgb(0_0_0/.45)] transition-transform duration-300 hover:scale-105 sm:grid"
      >
        {open ? (
          <svg width="16" height="16" viewBox="0 0 14 14" aria-hidden><path d="M1 1l12 12M13 1 1 13" stroke="currentColor" strokeWidth="1.8" /></svg>
        ) : (
          <WaIcon size={26} />
        )}
      </button>
    </div>
  );
}

/** A button that opens the WhatsApp chat panel (for server-rendered pages). */
export function OpenWhatsAppButton({ children = "Ask on WhatsApp", className = "" }: { children?: ReactNode; className?: string }) {
  if (!lines.length) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className}>
      <WaIcon size={16} /> {children}
    </button>
  );
}
