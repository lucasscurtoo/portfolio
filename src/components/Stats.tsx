"use client";

import Reveal from "./Reveal";
import SectionHeader from "./ui/SectionHeader";
import ContribGraph from "./ContribGraph";
import { useLang } from "@/lib/lang-context";

export default function Stats() {
  const { lang } = useLang();
  const t = {
    title: lang === "en" ? "Live metrics" : "Métricas en vivo",
    note:
      lang === "en"
        ? "Contribution activity pulled live from GitHub — last 12 months."
        : "Actividad de contribuciones en vivo desde GitHub — últimos 12 meses.",
  };

  return (
    <section id="stats" className="py-24 relative z-10">
      <div className="w-full max-w-[var(--maxw)] mx-auto px-7">
        <Reveal>
          <SectionHeader op="07" code="METRICS" title={t.title} className="mb-4" />
          <p className="font-mono text-[12.5px] text-[var(--muted)] mb-10 max-w-[42em] tracking-[0.02em]">
            {t.note}
          </p>
        </Reveal>

        <ContribGraph />
      </div>
    </section>
  );
}
