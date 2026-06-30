"use client";

import Reveal from "./Reveal";
import SectionHeader from "./ui/SectionHeader";
import Panel from "./ui/Panel";
import { useLang } from "@/lib/lang-context";
import { EXPERIENCE, COPY } from "@/lib/data";

export default function Experience() {
  const { lang } = useLang();

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="w-full max-w-[var(--maxw)] mx-auto px-7">
        <Reveal>
          <SectionHeader op="04" code="LOGS" title={COPY.experience.title[lang]} className="mb-10" />
        </Reveal>

        <div className="flex flex-col gap-0">
          {EXPERIENCE.map((job, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="grid grid-cols-[24px_1fr] gap-4 sm:gap-6">
                {/* rail */}
                <div className="relative flex justify-center pt-1.5">
                  {i < EXPERIENCE.length - 1 && (
                    <div
                      className="absolute top-4 bottom-0 w-px"
                      style={{ background: "linear-gradient(var(--accent), transparent)", left: "50%", transform: "translateX(-50%)", opacity: 0.5 }}
                    />
                  )}
                  <div
                    className="relative w-[12px] h-[12px] border-2 z-10 flex-shrink-0 rotate-45"
                    style={{
                      background: job.current ? "var(--accent)" : "var(--bg)",
                      borderColor: job.current ? "var(--accent)" : "var(--border)",
                      boxShadow: job.current ? "0 0 0 4px var(--accent-dim)" : "none",
                    }}
                  />
                </div>

                {/* card */}
                <Panel interactive className="px-6 py-5 mb-5">
                  <div className="flex flex-wrap justify-between items-baseline gap-3 mb-4">
                    <h3 className="font-display uppercase text-[22px] leading-none text-[var(--text)]">
                      {job.role[lang]}{" "}
                      <span className="text-[var(--faint)]">@</span>{" "}
                      <span className="text-[var(--accent-safe)]">{job.company}</span>
                    </h3>
                    <span className="flex items-center gap-2 font-mono text-[11.5px] text-[var(--muted)] whitespace-nowrap uppercase tracking-[0.06em]">
                      {job.current && (
                        <span className="relative w-[7px] h-[7px] flex-shrink-0">
                          <span className="absolute inset-0 bg-[var(--accent)]" />
                          <span className="absolute inset-[-3px] border border-[var(--accent)] animate-[pulse-ring_2s_ease-out_infinite]" />
                        </span>
                      )}
                      <span style={{ color: job.current ? "var(--accent-safe)" : undefined }}>{job.period[lang]}</span>
                    </span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {job.points[lang].map((pt, pi) => (
                      <li key={pi} className="relative pl-5 text-[14.5px] text-[var(--muted)] text-balance leading-[1.6]">
                        <span className="absolute left-0 top-[3px] text-[var(--accent)] font-mono text-[11px]">{">"}</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </Panel>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
