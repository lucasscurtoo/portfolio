"use client";

import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";
import { useLang } from "@/lib/lang-context";
import { PROFILE, COPY } from "@/lib/data";

export default function About() {
  const { lang } = useLang();
  const c = COPY.about;
  const facts = c.facts;

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="w-full max-w-[var(--maxw)] mx-auto px-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_0.8fr] gap-14 items-start">
          <div>
            <Reveal>
              <Eyebrow label={c.eyebrow[lang]} />
              <h2 className="text-[clamp(28px,4vw,42px)] font-semibold tracking-[-0.02em] leading-[1.1] mb-5">
                {c.title[lang]}
              </h2>
              <p className="text-[16.5px] text-[var(--muted)] max-w-[36em] text-balance leading-[1.75]">
                {c.body[lang]}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="border border-[var(--border-soft)] rounded-[14px] overflow-hidden bg-[var(--bg-elev)] divide-y divide-[var(--border-soft)]">
              {[
                { k: facts.location[lang], v: PROFILE.location, accent: false },
                { k: facts.focus[lang], v: facts.focusVal[lang], accent: false },
                { k: facts.english[lang], v: facts.englishVal[lang], accent: false },
                { k: facts.available[lang], v: facts.availableVal[lang], accent: true },
              ].map(({ k, v, accent }) => (
                <div key={k} className="flex justify-between items-center gap-4 px-[18px] py-4">
                  <span className="font-mono text-[11.5px] uppercase tracking-[0.04em] text-[var(--faint)]">{k}</span>
                  {accent ? (
                    <span className="flex items-center gap-2 text-[14.5px] text-[var(--accent)]">
                      <span className="relative w-[7px] h-[7px] flex-shrink-0">
                        <span className="absolute inset-0 rounded-full bg-[var(--accent)]" />
                        <span className="absolute inset-[-3px] rounded-full border border-[var(--accent)] animate-[pulse-ring_2.5s_ease-out_infinite]" />
                      </span>
                      {v}
                    </span>
                  ) : (
                    <span className="text-[14.5px] text-[var(--text)] text-right">{v}</span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
