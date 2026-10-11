import Image from "next/image";
import type { ReactNode } from "react";
import LoopVideo from "./LoopVideo";

/**
 * Every supplied visual is an AI-generated editorial illustration (see
 * public/images/CREDITS.md). Manufacturing and process imagery always carries
 * this tag so a buyer never mistakes it for a partner's facility.
 */
export function IllustrationTag({ children = "Illustration", className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <span className={`pointer-events-none absolute left-3 top-3 z-[1] rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-paper backdrop-blur ${className}`}>
      {children}
    </span>
  );
}

/** A captioned image in a fixed-ratio frame, tagged as an illustration. */
export function Figure({
  src,
  alt,
  caption,
  sizes,
  ratio = "aspect-[4/3]",
  priority = false,
  tag = "Illustration",
  className = "",
  rounded = "rounded-[22px]",
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  sizes: string;
  ratio?: string;
  priority?: boolean;
  tag?: string | null;
  className?: string;
  rounded?: string;
}) {
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden bg-linen ${ratio} ${rounded}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} quality={75} className="object-cover" />
        {tag && <IllustrationTag>{tag}</IllustrationTag>}
      </div>
      {caption && <figcaption className="mt-3 text-[13px] leading-snug text-muted">{caption}</figcaption>}
    </figure>
  );
}

/** A silent looping clip in a fixed-ratio frame, tagged as illustrative footage. */
export function VideoFigure({
  src,
  poster,
  label,
  caption,
  ratio = "aspect-video",
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  caption?: ReactNode;
  ratio?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden rounded-[22px] bg-ink ${ratio}`}>
        <LoopVideo src={src} poster={poster} label={label} />
        <IllustrationTag>Illustrative footage</IllustrationTag>
      </div>
      {caption && <figcaption className="mt-3 text-[13px] leading-snug text-muted">{caption}</figcaption>}
    </figure>
  );
}
