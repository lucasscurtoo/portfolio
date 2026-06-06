"use client";

import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";
import { useLang } from "@/lib/lang-context";
import { EDUCATION, CERTS, COPY } from "@/lib/data";

export default function Education() {
  const { lang } = useLang();

  return (
    <section id="education" className="py-24 relative z-10">
      <div className="w-full max-w-[var(--maxw)] mx-auto px-7">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* education */}
          <div>
            <Reveal>
              <Eyebrow label={COPY.education.eyebrow[lang]} />
              <h2 className="text-[clamp(28px,4vw,42px)] font-semibold tracking-[-0.02em] leading-[1.1] mb-8">
                {COPY.education.title[lang]}
              </h2>
            </Reveal>
            <div className="flex flex-col gap-3.5">
              {EDUCATION.map((edu, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="border border-[var(--border-soft)] bg-[var(--bg-elev)] rounded-[14px] px-5 py-5 hover:border-[var(--border)] hover:translate-x-0.5 transition-all duration-200">
                    <span className="font-mono text-[12px] text-[var(--accent)]">{edu.period[lang]}</span>
                    <h3 className="text-[16.5px] font-semibold tracking-[-0.01em] mt-2 mb-1.5">{edu.title[lang]}</h3>
                    <p className="text-[14px] text-[var(--muted)]">{edu.org}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* certs */}
          <div>
            <Reveal delay={0.05}>
              <Eyebrow label={lang === "en" ? "Certifications" : "Certificaciones"} />
              <h2 className="text-[clamp(28px,4vw,42px)] font-semibold tracking-[-0.02em] leading-[1.1] mb-8">
                {COPY.certs.title[lang]}
              </h2>
            </Reveal>
            <div className="flex flex-col gap-3.5">
              {CERTS.map((cert, i) => (
                <Reveal key={i} delay={0.05 + i * 0.08}>
                  <div className="grid grid-cols-[26px_1fr_auto] gap-3.5 items-center border border-[var(--border-soft)] bg-[var(--bg-elev)] rounded-[14px] px-5 py-4 hover:border-[var(--border)] transition-colors">
                    <div className="flex-shrink-0">
                      {cert.status === "done" ? (
                        <span className="w-[22px] h-[22px] rounded-full bg-[var(--accent-dim)] grid place-items-center">
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M2 5.5L4.5 8L9 3" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      ) : (
                        <span className="w-[22px] h-[22px] rounded-full border-2 border-dashed border-[var(--faint)] grid place-items-center">
                          <span className="w-[6px] h-[6px] rounded-full bg-[oklch(0.85_0.13_95)]" />
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-[15px] font-medium leading-[1.35]">{cert.title[lang]}</p>
                      <p className="text-[12px] text-[var(--faint)] mt-0.5">{cert.org}</p>
                    </div>
                    <span
                      className="font-mono text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap"
                      style={
                        cert.status === "done"
                          ? { color: "var(--accent)", background: "var(--accent-dim)" }
                          : { color: "oklch(0.85 0.13 95)", background: "oklch(0.85 0.13 95 / 0.12)" }
                      }
                    >
                      {cert.status === "done"
                        ? lang === "en" ? "Done" : "Completado"
                        : lang === "en" ? "In Progress" : "En progreso"}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
