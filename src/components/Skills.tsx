"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./ui/SectionHeader";
import Panel from "./ui/Panel";
import { useLang } from "@/lib/lang-context";
import { SKILLS, COPY } from "@/lib/data";

function SkillIcon({ slug, name, size = 15 }: { slug: string | null; name: string; size?: number }) {
  const [failed, setFailed] = useState(!slug);
  const initials = name.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  if (failed) {
    return (
      <span
        className="flex-shrink-0 grid place-items-center font-mono font-bold text-[8px] tracking-[-0.02em] text-[var(--accent-text)] bg-[var(--accent)]"
        style={{ width: size + 4, height: size + 4 }}
      >
        {initials}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${slug}/ffffff`}
      alt=""
      width={size}
      height={size}
      className="flex-shrink-0 opacity-85"
      onError={() => setFailed(true)}
    />
  );
}

export default function Skills() {
  const { lang } = useLang();

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="w-full max-w-[var(--maxw)] mx-auto px-7">
        <Reveal>
          <SectionHeader op="03" code="ARSENAL" title={COPY.skills.title[lang]} className="mb-10" />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKILLS.map((group, gi) => (
            <Reveal key={gi} delay={gi * 0.07}>
              <Panel interactive tab className="h-full p-5">
                <div className="flex items-center justify-between mb-4 border-b border-[var(--border-soft)] pb-3">
                  <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--accent-safe)] font-semibold">
                    {group.group[lang]}
                  </span>
                  <span className="font-mono text-[9.5px] tracking-[0.14em] text-[var(--faint)]">
                    [{String(group.items.length).padStart(2, "0")}]
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[12.5px] font-mono border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)] transition-colors cursor-default"
                    >
                      <SkillIcon slug={item.slug} name={item.name} />
                      {item.name}
                    </span>
                  ))}
                </div>
              </Panel>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
