"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/lang-context";
import { PROFILE, COPY, TERMINAL_LINES } from "@/lib/data";
import Skull from "./Skull";
import AsciiFace from "./AsciiFace";
import Decrypt from "./ui/Decrypt";

type LineType = { type: string; text?: string; key?: string; val?: string; rest?: string };

function TerminalLine({ line }: { line: LineType }) {
  if (line.type === "blank") return <br />;
  if (line.type === "comment")
    return <span className="text-[var(--faint)] italic">{line.text}</span>;
  if (line.type === "close")
    return <span className="text-[var(--text)]">{line.text}</span>;
  if (line.type === "key")
    return (
      <span>
        <span className="text-[var(--accent)]">{line.text} </span>
        <span className="text-[var(--text)]">{line.val}</span>
        <span className="text-[var(--text)]">{line.rest}</span>
      </span>
    );
  if (line.type === "prop")
    return (
      <span>
        <span className="text-[var(--muted)]">{line.key}</span>
        <span className="text-[var(--faint)]">: </span>
        <span className="text-[var(--accent)]">{line.val}</span>
        <span className="text-[var(--faint)]">,</span>
      </span>
    );
  return <span>{line.text}</span>;
}

function GitHubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export default function Hero() {
  const { lang } = useLang();
  const [typed, setTyped] = useState(0);
  const lines = TERMINAL_LINES[lang];

  useEffect(() => {
    setTyped(0);
    const t = setInterval(() => {
      setTyped((n) => {
        if (n >= lines.length) { clearInterval(t); return n; }
        return n + 1;
      });
    }, 90);
    return () => clearInterval(t);
  }, [lang, lines.length]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="min-h-[100svh] flex items-center pt-[120px] pb-24 relative z-10">
      <div className="w-full max-w-[var(--maxw)] mx-auto px-7">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-14 items-center">
          {/* left */}
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-[var(--accent)] text-[var(--accent-text)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] mb-6"
            >
              <Skull size={14} />
              {lang === "en" ? "Developer // System online" : "Developer // Sistema activo"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="font-display text-[clamp(56px,10vw,120px)] tracking-[0.01em] leading-[0.86] mb-6 uppercase text-[var(--text)]"
            >
              <Decrypt text={PROFILE.name} onView={false} />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="text-[clamp(16px,2.2vw,21px)] font-semibold mb-5 text-[var(--muted)]"
            >
              {PROFILE.role[lang]}{" "}
              <span className="font-mono text-[var(--accent)] text-[0.78em]">
                {`// ${PROFILE.roleAccent[lang]}`}
              </span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.36 }}
              className="text-[16px] text-[var(--muted)] max-w-[32em] mb-7 text-balance leading-[1.7] border-l-2 border-[var(--accent)] pl-4"
            >
              {PROFILE.tagline[lang]}
            </motion.p>

            {/* Hacker-HUD status bar */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="max-w-[30em] mb-8"
            >
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--faint)] mb-1.5">
                <span className="flex items-center gap-1.5 text-[var(--accent)]">
                  <Skull size={12} />
                  {lang === "en" ? "Status" : "Estado"}
                </span>
                <span>{lang === "en" ? "Open to opportunities" : "Abierto a oportunidades"}</span>
              </div>
              <div className="h-[10px] border border-[var(--border)] bg-[var(--bg-elev)] relative overflow-hidden">
                <div
                  className="h-full halftone-fill bg-[var(--accent)]"
                  style={{ width: "88%" }}
                />
                <div className="absolute inset-0 flex items-center justify-end pr-2 font-mono text-[8px] text-[var(--accent-text)] font-bold tracking-widest">
                  ●●● ONLINE
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48 }}
              className="flex gap-3 flex-wrap mb-8"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center gap-2 px-6 py-[13px] bg-[var(--accent)] text-[var(--accent-text)] font-mono font-bold text-[13px] tracking-[0.06em] uppercase transition-all hover:shadow-[0_0_28px_var(--glow)] hover:-translate-y-px active:translate-y-px"
              >
                {COPY.hero.cta1[lang]}
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center gap-2 px-6 py-[13px] border border-[var(--border)] font-mono text-[13px] tracking-[0.06em] uppercase font-bold text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all active:translate-y-px"
              >
                {COPY.hero.cta2[lang]}
              </button>
            </motion.div>

            {/* social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.54 }}
              className="flex gap-2.5"
            >
              {[
                { Icon: GitHubIcon, href: PROFILE.github, label: "GitHub" },
                { Icon: LinkedInIcon, href: PROFILE.linkedin, label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-[42px] h-[42px] grid place-items-center border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-dim)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </motion.div>
          </div>

          {/* operator bot + profile dump panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="lg:order-none order-last min-w-0 w-full flex flex-col items-center gap-7"
          >
            <div className="hidden lg:grid place-items-center">
              <AsciiFace size={260} />
            </div>
            <div
              className="hud-card hud-tab overflow-hidden w-full"
              style={{
                boxShadow: "10px 10px 0 0 var(--accent-dim), 0 0 0 1px var(--border)",
              }}
            >
              {/* titlebar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-elev-2)]">
                <Skull size={15} className="text-[var(--accent)]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">whoami.sh</span>
                <span className="ml-auto font-mono text-[9px] text-[var(--accent)] tracking-[0.12em] uppercase flex items-center gap-1.5">
                  <span className="w-[5px] h-[5px] bg-[var(--accent)] animate-pulse" />
                  decrypted
                </span>
              </div>
              {/* body */}
              <div className="p-6 font-mono text-[13px] leading-[2] text-[var(--muted)] relative">
                <div
                  className="absolute inset-0 pointer-events-none opacity-60"
                  style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 3px, var(--scanline) 3px, var(--scanline) 4px)",
                  }}
                />
                {lines.slice(0, typed).map((line, i) => (
                  <div key={i} className="relative">
                    <span className="text-[var(--faint)] select-none mr-3">{String(i + 1).padStart(2, "0")}</span>
                    <TerminalLine line={line} />
                  </div>
                ))}
                {typed < lines.length && (
                  <span className="inline-block w-[8px] h-[15px] bg-[var(--accent)] cursor-blink align-[-2px] ml-9" />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
