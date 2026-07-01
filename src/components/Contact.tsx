"use client";

import Reveal from "./Reveal";
import SectionHeader from "./ui/SectionHeader";
import Panel from "./ui/Panel";
import Skull from "./Skull";
import LogoMark from "./LogoMark";
import { useLang } from "@/lib/lang-context";
import { PROFILE, COPY } from "@/lib/data";

const LINKS = [
  { key: "email" as const, cmd: "mail", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { key: "linkedin" as const, cmd: "open", value: "linkedin.com/in/lucas-curto", href: PROFILE.linkedin },
  { key: "github" as const, cmd: "clone", value: "github.com/lucascurto", href: PROFILE.github },
  { key: "phone" as const, cmd: "call", value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, "")}` },
];

export default function Contact() {
  const { lang } = useLang();
  const c = COPY.contact;

  return (
    <section id="contact" className="py-24 pb-12 relative z-10">
      <div className="w-full max-w-[var(--maxw)] mx-auto px-7">
        <Reveal>
          <SectionHeader op="06" code="TRANSMIT" title={c.title[lang].replace(/\n/g, " ")} align="left" className="mb-6" />
        </Reveal>

        <Reveal delay={0.05}>
          <p className="text-[16.5px] text-[var(--muted)] max-w-[40em] text-balance leading-[1.75] border-l-2 border-[var(--accent)] pl-5 mb-10">
            {c.body[lang]}
          </p>
        </Reveal>

        {/* transmit channels — honest links, terminal syntax */}
        <Reveal delay={0.1}>
          <Panel tab className="overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[var(--border)] flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--faint)]">
              <Skull size={13} className="text-[var(--accent)]" />
              transmit.sh
              <span className="ml-auto text-[var(--accent-safe)]">{lang === "en" ? "4 channels open" : "4 canales abiertos"}</span>
            </div>
            <div className="divide-y divide-[var(--border-soft)]">
              {LINKS.map(({ key, cmd, value, href }) => (
                <a
                  key={key}
                  href={href}
                  target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center gap-3 px-4 py-4 font-mono text-[13.5px] hover:bg-[var(--accent-dim)] transition-colors"
                >
                  <span className="text-[var(--accent)] select-none">$</span>
                  <span className="text-[var(--muted)] group-hover:text-[var(--accent-safe)] transition-colors">{cmd}</span>
                  <span className="text-[var(--text)] truncate">{value}</span>
                  <span className="ml-auto flex items-center gap-2 text-[var(--faint)] group-hover:text-[var(--accent)] transition-colors">
                    <span className="hidden sm:inline text-[10px] uppercase tracking-[0.12em]">{c.links[key][lang]}</span>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </Panel>
        </Reveal>

        {/* footer */}
        <footer className="mt-16 border-t-2 border-[var(--accent)] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <LogoMark size={32} className="text-[var(--accent)]" />
            <span className="font-display uppercase text-[18px] leading-none text-[var(--text)]">Lucas Curto</span>
          </div>
          <div className="flex flex-col sm:items-end gap-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--faint)]">
            <span className="flex items-center justify-center sm:justify-end gap-2 text-[var(--accent-safe)]">
              <span className="w-[6px] h-[6px] bg-[var(--accent)] animate-pulse" />
              {lang === "en" ? "System online" : "Sistema activo"}
            </span>
            <span>© {new Date().getFullYear()} · {COPY.footer.built[lang]}</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
