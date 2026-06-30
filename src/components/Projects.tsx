"use client";

import Reveal from "./Reveal";
import SectionHeader from "./ui/SectionHeader";
import Panel from "./ui/Panel";
import Chip from "./ui/Chip";
import { useLang } from "@/lib/lang-context";
import { PROJECTS, COPY } from "@/lib/data";

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

export default function Projects() {
  const { lang } = useLang();
  const c = COPY.projects;
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);
  const lockedLabel = lang === "en" ? "Private — NDA" : "Privado — NDA";

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="w-full max-w-[var(--maxw)] mx-auto px-7">
        <Reveal>
          <SectionHeader op="02" code="PAYLOADS" title={c.title[lang]} className="mb-10" />
        </Reveal>

        {/* featured grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {featured.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.07}>
              <Panel interactive tab className="group flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[9.5px] tracking-[0.18em] text-[var(--faint)] uppercase">
                    PAYLOAD_{String(i + 1).padStart(2, "0")}
                  </span>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-shrink-0 w-[30px] h-[30px] grid place-items-center border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all"
                      aria-label={`${lang === "en" ? "Open" : "Abrir"} ${project.name}`}
                    >
                      <ExternalIcon />
                    </a>
                  ) : (
                    <span className="flex-shrink-0 grid place-items-center px-2 h-[24px] border border-[var(--border)] text-[var(--faint)]" title={lockedLabel}>
                      <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.1em]">
                        <LockIcon /> {lang === "en" ? "NDA" : "NDA"}
                      </span>
                    </span>
                  )}
                </div>

                <h3 className="font-display uppercase text-[24px] leading-[0.95] mb-1.5 text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                  {project.name}
                </h3>
                <span className="font-mono text-[10.5px] text-[var(--faint)] mb-3">{project.type[lang]}</span>

                <p className="text-[13.5px] text-[var(--accent-safe)] font-semibold mb-2.5 leading-[1.45]">
                  {project.tagline[lang]}
                </p>
                <p className="text-[13px] text-[var(--muted)] leading-[1.75] mb-5 flex-1">
                  {project.description[lang]}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </div>
              </Panel>
            </Reveal>
          ))}
        </div>

        {/* secondary row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rest.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.06}>
              <Panel interactive className="flex items-start gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    <h3 className="font-display uppercase text-[19px] leading-none text-[var(--text)]">{project.name}</h3>
                    <span className="font-mono text-[10px] text-[var(--faint)]">// {project.type[lang]}</span>
                  </div>
                  <p className="text-[13px] text-[var(--muted)] mb-3 leading-[1.7]">{project.description[lang]}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 5).map((tag) => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </div>
                </div>
                <span className="flex-shrink-0 flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--faint)] mt-1" title={lockedLabel}>
                  <LockIcon /> NDA
                </span>
              </Panel>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
