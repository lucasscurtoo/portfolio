"use client";

import Reveal from "./Reveal";
import SectionHeader from "./ui/SectionHeader";
import Panel from "./ui/Panel";
import { useLang } from "@/lib/lang-context";
import { EDUCATION, CERTS, COPY } from "@/lib/data";

export default function Education() {
  const { lang } = useLang();

  return (
    <section id="education" className="py-24 relative z-10">
      <div className="w-full max-w-[var(--maxw)] mx-auto px-7">
        <Reveal>
          <SectionHeader op="05" code="INTEL" title={COPY.education.title[lang]} className="mb-10" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* education */}
          <div>
            <div className="flex items-center gap-2 mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--faint)]">
              <span className="w-2 h-2 bg-[var(--accent)]" />
              {lang === "en" ? "Academic" : "Académico"}
            </div>
            <div className="flex flex-col gap-3.5">
              {EDUCATION.map((edu, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <Panel interactive className="px-5 py-5">
                    <span className="font-mono text-[12px] text-[var(--accent-safe)] tracking-[0.04em]">{edu.period[lang]}</span>
                    <h3 className="font-display uppercase text-[19px] leading-[1] mt-2 mb-1.5 text-[var(--text)]">{edu.title[lang]}</h3>
                    <p className="text-[14px] text-[var(--muted)]">{edu.org}</p>
                  </Panel>
                </Reveal>
              ))}
            </div>
          </div>

          {/* certs */}
          <div>
            <div className="flex items-center gap-2 mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--faint)]">
              <span className="w-2 h-2 bg-[var(--accent)]" />
              {COPY.certs.title[lang]}
            </div>
            <div className="flex flex-col gap-3.5">
              {CERTS.map((cert, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <Panel interactive className="grid grid-cols-[24px_1fr_auto] gap-3.5 items-center px-5 py-4">
                    <div className="flex-shrink-0">
                      {cert.status === "done" ? (
                        <span className="w-[22px] h-[22px] bg-[var(--accent)] grid place-items-center">
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M2 5.5L4.5 8L9 3" stroke="var(--accent-text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      ) : (
                        <span className="w-[22px] h-[22px] border border-dashed border-[var(--muted)] grid place-items-center">
                          <span className="w-[6px] h-[6px] bg-[var(--muted)] animate-pulse" />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14.5px] font-medium leading-[1.35] text-[var(--text)]">{cert.title[lang]}</p>
                      <p className="text-[12px] text-[var(--faint)] mt-0.5">{cert.org}</p>
                    </div>
                    <span
                      className={[
                        "font-mono text-[9.5px] uppercase tracking-[0.1em] px-2 py-1 whitespace-nowrap border",
                        cert.status === "done"
                          ? "border-[var(--accent)] text-[var(--accent-safe)]"
                          : "border-[var(--border)] text-[var(--faint)]",
                      ].join(" ")}
                    >
                      {cert.status === "done"
                        ? lang === "en" ? "Done" : "Completado"
                        : lang === "en" ? "In Progress" : "En progreso"}
                    </span>
                  </Panel>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
