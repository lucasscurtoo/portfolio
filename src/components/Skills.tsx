"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";
import { useLang } from "@/lib/lang-context";
import { SKILLS, COPY } from "@/lib/data";

function SkillIcon({ slug, name, size = 16 }: { slug: string | null; name: string; size?: number }) {
  const [failed, setFailed] = useState(!slug);
  const initials = name.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  if (failed) {
    return (
      <span
        className="flex-shrink-0 grid place-items-center rounded-[5px] font-mono font-semibold text-[8px] tracking-[-0.02em] text-[var(--accent)] bg-[var(--accent-dim)]"
        style={{ width: size + 4, height: size + 4 }}
      >
        {initials}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${slug}/a8b0bd`}
      alt=""
      width={size}
      height={size}
      className="flex-shrink-0 opacity-75"
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
          <Eyebrow label={COPY.skills.eyebrow[lang]} />
          <h2 className="text-[clamp(28px,4vw,42px)] font-semibold tracking-[-0.02em] leading-[1.1] mb-10">
            {COPY.skills.title[lang]}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKILLS.map((group, gi) => (
            <Reveal key={gi} delay={gi * 0.07}>
              <div className="border border-[var(--border-soft)] bg-[var(--bg-elev)] rounded-[16px] p-5 hover:border-[var(--border)] hover:shadow-[0_0_24px_var(--glow)] hover:-translate-y-0.5 transition-all duration-250">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] flex-shrink-0" />
                  <span className="font-mono text-[12px] uppercase tracking-[0.05em] text-[var(--accent)]">
                    {group.group[lang]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[13px] bg-[var(--bg-elev-2)] border border-[var(--border-soft)] rounded-[8px] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)] transition-colors cursor-default"
                    >
                      <SkillIcon slug={item.slug} name={item.name} />
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
