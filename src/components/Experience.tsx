"use client";

import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";
import { useLang } from "@/lib/lang-context";
import { EXPERIENCE, COPY } from "@/lib/data";

export default function Experience() {
  const { lang } = useLang();

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="w-full max-w-[var(--maxw)] mx-auto px-7">
        <Reveal>
          <Eyebrow label={COPY.experience.eyebrow[lang]} />
          <h2 className="text-[clamp(28px,4vw,42px)] font-semibold tracking-[-0.02em] leading-[1.1] mb-10">
            {COPY.experience.title[lang]}
          </h2>
        </Reveal>

        <div className="flex flex-col gap-0">
          {EXPERIENCE.map((job, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="grid grid-cols-[26px_1fr] gap-5 sm:gap-6">
                {/* rail */}
                <div className="relative flex justify-center pt-1">
                  {i < EXPERIENCE.length - 1 && (
                    <div
                      className="absolute top-3 bottom-0 w-px"
                      style={{ background: "linear-gradient(var(--border-soft), transparent)", left: "50%", transform: "translateX(-50%)" }}
                    />
                  )}
                  <div
                    className="relative w-[13px] h-[13px] rounded-full border-2 z-10 flex-shrink-0"
                    style={{
                      background: job.current ? "var(--accent)" : "var(--bg-elev-2)",
                      borderColor: job.current ? "var(--accent)" : "var(--border)",
                      boxShadow: job.current ? "0 0 0 5px var(--accent-dim)" : "none",
                    }}
                  />
                </div>

                {/* card */}
                <div className="border border-[var(--border-soft)] bg-[var(--bg-elev)] rounded-[16px] px-6 py-5 mb-5 hover:border-[var(--border)] transition-colors">
                  <div className="flex flex-wrap justify-between items-baseline gap-3 mb-4">
                    <div>
                      <h3 className="text-[18px] font-semibold tracking-[-0.01em]">
                        {job.role[lang]}{" "}
                        <span className="text-[var(--faint)] font-normal">@</span>{" "}
                        <span className="text-[var(--accent)]">{job.company}</span>
                      </h3>
                    </div>
                    <span className="flex items-center gap-2 font-mono text-[12.5px] text-[var(--muted)] whitespace-nowrap">
                      {job.current && (
                        <span className="relative w-[7px] h-[7px] flex-shrink-0">
                          <span className="absolute inset-0 rounded-full bg-[var(--accent)]" />
                          <span className="absolute inset-[-3px] rounded-full border border-[var(--accent)] animate-[pulse-ring_2s_ease-out_infinite]" />
                        </span>
                      )}
                      <span style={{ color: job.current ? "var(--accent)" : undefined }}>{job.period[lang]}</span>
                    </span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {job.points[lang].map((pt, pi) => (
                      <li key={pi} className="relative pl-5 text-[14.5px] text-[var(--muted)] text-balance">
                        <span className="absolute left-0 top-[1px] text-[var(--accent)] text-[11px]">▹</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
