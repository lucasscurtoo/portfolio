"use client";

import { useLang } from "@/lib/lang-context";
import { NAV_ITEMS, COPY } from "@/lib/data";
import { useActiveSection } from "@/lib/use-active-section";
import Skull from "./Skull";

const CODES: Record<string, string> = {
  about: "DOSSIER",
  projects: "PAYLOADS",
  skills: "ARSENAL",
  experience: "LOGS",
  education: "INTEL",
  contact: "TRANSMIT",
};

const IDS = NAV_ITEMS.map((n) => n.id);

export default function HudShell() {
  const { lang } = useLang();
  const active = useActiveSection(IDS);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* desktop operations rail */}
      <nav
        aria-label={lang === "en" ? "Section navigation" : "Navegación de secciones"}
        className="hidden xl:flex flex-col gap-1 fixed left-4 top-1/2 -translate-y-1/2 z-40"
      >
        {NAV_ITEMS.map((n, i) => {
          const isActive = active === n.id;
          return (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              aria-current={isActive ? "true" : undefined}
              className="group flex items-center gap-2.5 py-1.5"
            >
              <span
                className={[
                  "w-[26px] h-[2px] transition-all duration-200",
                  isActive ? "bg-[var(--accent)] w-[34px]" : "bg-[var(--border)] group-hover:bg-[var(--muted)]",
                ].join(" ")}
              />
              <span
                className={[
                  "font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-200",
                  isActive ? "text-[var(--accent-safe)]" : "text-[var(--faint)] group-hover:text-[var(--muted)]",
                ].join(" ")}
              >
                {String(i + 1).padStart(2, "0")}/{CODES[n.id]}
              </span>
            </button>
          );
        })}
      </nav>

      {/* mobile sticky transmit CTA — owns the bottom bar where the marquee can't */}
      <button
        onClick={() => scrollTo("contact")}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-[48px] flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--accent-text)] font-mono text-[13px] font-bold uppercase tracking-[0.12em] active:translate-y-px"
      >
        <Skull size={16} />
        {COPY.nav.cta[lang]} {"//"} {lang === "en" ? "TRANSMIT" : "TRANSMITIR"}
      </button>
    </>
  );
}
