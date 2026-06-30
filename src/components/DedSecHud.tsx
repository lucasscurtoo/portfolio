"use client";

import { useLang } from "@/lib/lang-context";

/* DedSec heads-up overlay — scrolling propaganda ticker pinned to the bottom */
export default function DedSecHud() {
  const { lang } = useLang();

  const slogans =
    lang === "en"
      ? ["WE ARE DEDSEC", "OF THE PEOPLE", "FOR THE PEOPLE", "HACK THE SYSTEM", "FULL-STACK // NO MASTERS"]
      : ["SOMOS DEDSEC", "DEL PUEBLO", "PARA EL PUEBLO", "HACKEÁ EL SISTEMA", "FULL-STACK // SIN AMOS"];

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
            <span className="text-[var(--accent)]">☠</span>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
