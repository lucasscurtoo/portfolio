"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/lib/lang-context";
import { useTheme } from "@/lib/theme-context";
import { NAV_ITEMS, COPY } from "@/lib/data";
import Skull from "./Skull";

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Nav() {
  const { lang, toggle } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="w-full max-w-[var(--maxw)] mx-auto px-7 flex items-center justify-between h-[68px] relative z-10">
        {/* brand */}
        <button
          onClick={() => scrollTo("about")}
          className="flex items-center gap-3 group"
          aria-label="Go to top"
        >
          <span className="w-[34px] h-[34px] grid place-items-center bg-[var(--accent)] text-[var(--accent-text)] group-hover:shadow-[0_0_18px_var(--glow)] transition-all">
            <Skull size={20} />
          </span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-[17px] tracking-[0.04em] text-[var(--text)]">LUCAS CURTO</span>
            <span className="font-mono text-[8.5px] tracking-[0.2em] text-[var(--faint)] uppercase mt-0.5">full-stack // dev</span>
          </span>
        </button>

        {/* desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((n, i) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="group font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              <span className="text-[var(--faint)] group-hover:text-[var(--accent)]">{String(i + 1).padStart(2, "0")}/</span>
              {lang === "en" ? n.en : n.es}
            </button>
          ))}
        </div>

        {/* right controls */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-[32px] h-[32px] grid place-items-center text-[var(--muted)] border border-transparent hover:text-[var(--accent)] hover:border-[var(--border)] transition-all duration-200"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={toggle}
            className="font-mono text-[11.5px] text-[var(--muted)] hover:text-[var(--accent)] transition-colors w-[32px] h-[32px] grid place-items-center border border-transparent hover:border-[var(--border)]"
            aria-label="Switch language"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--accent)] text-[var(--accent-text)] font-mono text-[12px] font-bold uppercase tracking-[0.08em] hover:shadow-[0_0_18px_var(--glow)] hover:-translate-y-px transition-all duration-200"
          >
            {COPY.nav.cta[lang]}
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* mobile controls */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className="w-[34px] h-[34px] grid place-items-center text-[var(--muted)] hover:text-[var(--accent)] transition-all"
            aria-label={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={toggle}
            className="font-mono text-[11px] text-[var(--muted)] hover:text-[var(--accent)] w-[34px] h-[34px] grid place-items-center transition-all"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex flex-col gap-[5px] w-10 h-10 items-center justify-center"
            aria-label="Menu"
          >
            <span
              className="w-[20px] h-[2px] bg-[var(--accent)] transition-all duration-200"
              style={open ? { transform: "translateY(3.5px) rotate(45deg)" } : {}}
            />
            <span
              className="w-[20px] h-[2px] bg-[var(--accent)] transition-all duration-200"
              style={open ? { transform: "translateY(-3.5px) rotate(-45deg)" } : {}}
            />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className="md:hidden flex flex-col gap-0.5 px-6 pb-5 backdrop-blur-xl border-b border-[var(--border)] transition-all duration-250 overflow-hidden"
        style={{ background: "var(--nav-bg)", maxHeight: open ? "340px" : "0", opacity: open ? 1 : 0 }}
      >
        {NAV_ITEMS.map((n, i) => (
          <button
            key={n.id}
            onClick={() => scrollTo(n.id)}
            className="text-left font-mono text-[14px] uppercase tracking-[0.06em] py-2.5 text-[var(--muted)] hover:text-[var(--accent)] transition-colors w-full border-b border-[var(--border-soft)] last:border-0"
          >
            <span className="text-[var(--faint)]">{String(i + 1).padStart(2, "0")}/ </span>
            {lang === "en" ? n.en : n.es}
          </button>
        ))}
      </div>
    </nav>
  );
}
