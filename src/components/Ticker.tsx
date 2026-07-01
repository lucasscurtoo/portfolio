"use client";

import { useLang } from "@/lib/lang-context";

/* Heads-up overlay — scrolling slogan ticker pinned to the bottom (desktop). */
export default function Ticker() {
  const { lang } = useLang();

  const slogans =
    lang === "en"
      ? ["BUILT END TO END", "BACKEND // FRONTEND // INFRA", "ONE DEVELOPER", "SHIP IT"]
      : ["DE PUNTA A PUNTA", "BACKEND // FRONTEND // INFRA", "UN DESARROLLADOR", "A PRODUCCIÓN"];

  // duplicated so the -50% marquee loop is seamless
  const strip = [...slogans, ...slogans];

  return (
    <div
      aria-hidden="true"
      className="hidden lg:flex fixed bottom-0 left-0 right-0 z-40 h-[26px] border-t border-[var(--border)] bg-[var(--bg)] overflow-hidden items-center select-none pointer-events-none"
    >
      <div className="marquee flex whitespace-nowrap will-change-transform">
        {strip.map((s, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-4 font-mono text-[10.5px] tracking-[0.22em] text-[var(--faint)]"
          >
            <span className="text-[var(--accent)]">▌</span>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
