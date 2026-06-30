"use client";

import Reveal from "./Reveal";
import SectionHeader from "./ui/SectionHeader";
import Panel from "./ui/Panel";
import { useLang } from "@/lib/lang-context";
import { PROFILE, COPY } from "@/lib/data";

export default function About() {
  const { lang } = useLang();
  const c = COPY.about;
  const facts = c.facts;

  const rows = [
    { k: facts.location[lang], v: PROFILE.location, accent: false },
    { k: facts.focus[lang], v: facts.focusVal[lang], accent: false },
    { k: facts.english[lang], v: facts.englishVal[lang], accent: false },
    { k: facts.available[lang], v: facts.availableVal[lang], accent: true },
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="w-full max-w-[var(--maxw)] mx-auto px-7">
        <Reveal>
          <SectionHeader op="01" code="DOSSIER" title={c.title[lang]} className="mb-10" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_0.8fr] gap-10 items-start">
          <Reveal>
            <p className="text-[17px] text-[var(--text)] max-w-[38em] text-balance leading-[1.8] border-l-2 border-[var(--accent)] pl-5">
              {c.body[lang]}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Panel tab className="overflow-hidden">
              <div className="px-[18px] py-2.5 border-b border-[var(--border)] font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--faint)] flex items-center justify-between">
                <span>subject.dat</span>
                <span className="text-[var(--accent)]">●●●</span>
              </div>
              <div className="divide-y divide-[var(--border-soft)]">
                {rows.map(({ k, v, accent }) => (
                  <div key={k} className="flex justify-between items-center gap-4 px-[18px] py-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--faint)]">{k}</span>
                    {accent ? (
                      <span className="flex items-center gap-2 text-[13.5px] font-mono text-[var(--accent-safe)]">
                        <span className="relative w-[7px] h-[7px] flex-shrink-0">
                          <span className="absolute inset-0 bg-[var(--accent)]" />
                          <span className="absolute inset-[-3px] border border-[var(--accent)] animate-[pulse-ring_2.5s_ease-out_infinite]" />
                        </span>
                        {v}
                      </span>
                    ) : (
                      <span className="text-[14px] text-[var(--text)] text-right">{v}</span>
                    )}
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
