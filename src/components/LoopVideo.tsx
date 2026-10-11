"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A short clip that behaves like a GIF: muted, looping, inline, no controls.
 * It only downloads and plays while on screen, and stays paused on its poster
 * for visitors who prefer reduced motion (they get a play/pause button).
 */
export default function LoopVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isReduced = mq.matches;
    setReduced(isReduced);
    if (isReduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (v.preload !== "auto") v.preload = "auto";
          v.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
    else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        disablePictureInPicture
      />
      {reduced && (
        <button
          type="button"
          onClick={toggle}
          className="absolute bottom-3 right-3 z-[1] rounded-full bg-paper/90 px-3.5 py-2 text-[13px] font-medium text-ink"
          aria-label={playing ? `Pause: ${label}` : `Play: ${label}`}
        >
          {playing ? "Pause" : "Play"}
        </button>
      )}
    </>
  );
}
