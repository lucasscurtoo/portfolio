"use client";

import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";
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

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="w-full max-w-[var(--maxw)] mx-auto px-7">
        <Reveal>
          <Eyebrow label={c.eyebrow[lang]} />
          <h2 className="text-[clamp(28px,4vw,42px)] font-semibold tracking-[-0.02em] leading-[1.1] mb-10">
            {c.title[lang]}
          </h2>
        </Reveal>

        {/* featured grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {featured.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.07}>
              <div className="group flex flex-col h-full border border-[var(--border-soft)] bg-[var(--bg-elev)] rounded-[16px] p-6 hover:border-[var(--accent)] hover:shadow-[0_0_32px_var(--glow)] hover:-translate-y-1 transition-all duration-250">
                {/* top */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-[17px] font-semibold tracking-[-0.01em] mb-1 group-hover:text-[var(--accent)] transition-colors">
                      {project.name}
                    </h3>
                    <span className="font-mono text-[10.5px] text-[var(--faint)]">{project.type[lang]}</span>
                  </div>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-shrink-0 w-[32px] h-[32px] grid place-items-center border border-[var(--border-soft)] rounded-[8px] text-[var(--faint)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all"
                      aria-label={`Open ${project.name}`}
                    >
                      <ExternalIcon />
                    </a>
                  ) : (
                    <span className="flex-shrink-0 w-[32px] h-[32px] grid place-items-center border border-[var(--border-soft)] rounded-[8px] text-[var(--faint)]">
                      <LockIcon />
                    </span>
                  )}
                </div>

                {/* tagline */}
                <p className="text-[13.5px] text-[var(--accent)] font-medium mb-3 leading-[1.45]">
                  {project.tagline[lang]}
                </p>

                {/* description */}
                <p className="text-[13px] text-[var(--muted)] leading-[1.75] mb-5 flex-1">
                  {project.description[lang]}
                </p>

                {/* tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10.5px] px-2 py-1 bg-[var(--bg-elev-2)] border border-[var(--border-soft)] rounded-[6px] text-[var(--faint)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* secondary row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rest.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.06}>
              <div className="flex items-start gap-4 border border-[var(--border-soft)] bg-[var(--bg-elev)] rounded-[14px] px-5 py-4 hover:border-[var(--border)] hover:shadow-[0_0_20px_var(--glow)] transition-all duration-200">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[15.5px] font-semibold tracking-[-0.01em]">{project.name}</h3>
                    <span className="font-mono text-[10px] text-[var(--faint)]">· {project.type[lang]}</span>
                  </div>
                  <p className="text-[13px] text-[var(--muted)] mb-3 leading-[1.7]">{project.description[lang]}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 5).map((tag) => (
                      <span key={tag} className="font-mono text-[10.5px] px-2 py-0.5 bg-[var(--bg-elev-2)] border border-[var(--border-soft)] rounded-[5px] text-[var(--faint)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="flex-shrink-0 mt-1 text-[var(--faint)]"><LockIcon /></span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
