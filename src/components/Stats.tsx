"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./ui/SectionHeader";
import Panel from "./ui/Panel";
import ContribGraph from "./ContribGraph";
import { useLang } from "@/lib/lang-context";

type Lang = { name: string; bytes: number; pct: number };
type Stats = { repos: number; followers: number; stars: number; totalBytes: number; langs: Lang[] };

function fmtBytes(n: number) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}MB`;
  if (n >= 1e3) return `${Math.round(n / 1e3)}KB`;
  return `${n}B`;
}

// green shade per language segment (fades from bright accent)
const shade = (i: number) => `oklch(0.87 0.22 138 / ${Math.max(0.25, 1 - i * 0.15)})`;

export default function Stats() {
  const { lang } = useLang();
  const [data, setData] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/api/gh-stats")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => (d.error ? setFailed(true) : setData(d)))
      .catch(() => setFailed(true));
  }, []);

  if (failed) return null; // fail silent — never show a broken section

  const t = {
    title: lang === "en" ? "Live metrics" : "Métricas en vivo",
    note:
      lang === "en"
        ? "Pulled live from GitHub — code volume, repos and language mix."
        : "En vivo desde GitHub — volumen de código, repos y mezcla de lenguajes.",
    repos: lang === "en" ? "Public repos" : "Repos públicos",
    stars: "Stars",
    followers: lang === "en" ? "Followers" : "Seguidores",
    code: lang === "en" ? "Code pushed" : "Código pusheado",
    langsTitle: lang === "en" ? "Language mix" : "Mezcla de lenguajes",
    loading: lang === "en" ? "syncing…" : "sincronizando…",
  };

  const metrics = [
    { k: t.code, v: data ? fmtBytes(data.totalBytes) : null, hot: true },
    { k: t.repos, v: data ? String(data.repos) : null },
    { k: t.stars, v: data ? String(data.stars) : null },
    { k: t.followers, v: data ? String(data.followers) : null },
  ];

  return (
    <section id="stats" className="py-24 relative z-10">
      <div className="w-full max-w-[var(--maxw)] mx-auto px-7">
        <Reveal>
          <SectionHeader op="07" code="METRICS" title={t.title} className="mb-4" />
          <p className="font-mono text-[12.5px] text-[var(--muted)] mb-10 max-w-[42em] tracking-[0.02em]">
            {t.note}
          </p>
        </Reveal>

        <ContribGraph />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4">
          {/* metric counters */}
          <Reveal>
            <Panel tab className="p-6 h-full">
              <div className="grid grid-cols-2 gap-x-6 gap-y-7">
                {metrics.map((m) => (
                  <div key={m.k}>
                    <div
                      className="font-display leading-none text-[clamp(30px,4vw,46px)]"
                      style={{ color: m.hot ? "var(--accent)" : "var(--text)" }}
                    >
                      {m.v ?? <span className="text-[var(--faint)] text-[20px] font-mono">{t.loading}</span>}
                    </div>
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--faint)] mt-2">
                      {m.k}
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>

          {/* language breakdown */}
          <Reveal delay={0.07}>
            <Panel tab className="p-6 h-full flex flex-col">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent-safe)] mb-5">
                {t.langsTitle}
              </div>

              {/* stacked bar */}
              <div className="flex h-[10px] w-full border border-[var(--border)] overflow-hidden mb-5">
                {(data?.langs ?? []).map((l, i) => (
                  <div key={l.name} style={{ width: `${l.pct}%`, background: shade(i) }} title={`${l.name} ${l.pct.toFixed(1)}%`} />
                ))}
                {!data && <div className="w-full bg-[var(--bg-elev-2)] animate-pulse" />}
              </div>

              {/* legend */}
              <div className="grid grid-cols-2 gap-x-5 gap-y-2.5">
                {(data?.langs ?? []).map((l, i) => (
                  <div key={l.name} className="flex items-center gap-2 font-mono text-[12px]">
                    <span className="w-[9px] h-[9px] flex-shrink-0" style={{ background: shade(i) }} />
                    <span className="text-[var(--text)] truncate">{l.name}</span>
                    <span className="ml-auto text-[var(--faint)]">{l.pct.toFixed(1)}%</span>
                  </div>
                ))}
                {!data && (
                  <span className="font-mono text-[12px] text-[var(--faint)] col-span-2">{t.loading}</span>
                )}
              </div>
            </Panel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
