"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import Panel from "./ui/Panel";
import { useLang } from "@/lib/lang-context";

type Day = { date: string; count: number; level: number };
type Data = { total: number; days: Day[] };

const LEVEL_BG = [
  "var(--border-soft)",
  "oklch(0.87 0.22 138 / 0.32)",
  "oklch(0.87 0.22 138 / 0.55)",
  "oklch(0.87 0.22 138 / 0.8)",
  "oklch(0.87 0.22 138)",
];

const MONTHS_EN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTHS_ES = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

function localDate(s: string) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export default function ContribGraph() {
  const { lang } = useLang();
  const [data, setData] = useState<Data | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/api/gh-contributions")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => (d.error ? setFailed(true) : setData(d)))
      .catch(() => setFailed(true));
  }, []);

  if (failed) return null;

  const months = lang === "en" ? MONTHS_EN : MONTHS_ES;

  // build week columns (7 rows Sun..Sat), padding the first week
  const days = data?.days ?? [];
  const cols: (Day | null)[][] = [];
  if (days.length) {
    let col: (Day | null)[] = [];
    const firstDow = localDate(days[0].date).getDay();
    for (let i = 0; i < firstDow; i++) col.push(null);
    for (const d of days) {
      col.push(d);
      if (col.length === 7) { cols.push(col); col = []; }
    }
    if (col.length) { while (col.length < 7) col.push(null); cols.push(col); }
  }

  // month label per column (when month changes)
  const monthLabels = cols.map((c, i) => {
    const first = c.find(Boolean);
    if (!first) return "";
    const m = localDate(first.date).getMonth();
    const prev = i > 0 ? cols[i - 1].find(Boolean) : null;
    const pm = prev ? localDate(prev.date).getMonth() : -1;
    return m !== pm ? months[m] : "";
  });

  return (
    <Reveal className="mb-4">
      <Panel tab className="p-6">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <span className="font-mono text-[13px] tracking-[0.02em] text-[var(--text)]">
            <span className="text-[var(--accent-safe)]">{data ? data.total.toLocaleString() : "···"}</span>{" "}
            {lang === "en" ? "contributions · last year" : "contribuciones · último año"}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--faint)]">
            {lang === "en" ? "less" : "menos"}
            {LEVEL_BG.map((bg, i) => (
              <span key={i} className="w-[10px] h-[10px]" style={{ background: bg }} />
            ))}
            {lang === "en" ? "more" : "más"}
          </span>
        </div>

        <div className="overflow-x-auto pb-1">
          <div className="inline-flex flex-col gap-1 min-w-max">
            {/* month row */}
            <div className="flex gap-[3px] mb-1 pl-[26px]">
              {monthLabels.map((m, i) => (
                <div key={i} className="w-[11px] font-mono text-[9px] text-[var(--faint)] relative">
                  {m && <span className="absolute -top-0.5 left-0 whitespace-nowrap">{m}</span>}
                </div>
              ))}
            </div>
            {/* grid: rows = weekdays */}
            <div className="flex">
              <div className="flex flex-col gap-[3px] pr-2 w-[26px] justify-between font-mono text-[9px] text-[var(--faint)] py-[1px]">
                <span>Mon</span><span>Wed</span><span>Fri</span>
              </div>
              <div className="flex gap-[3px]">
                {cols.length
                  ? cols.map((c, ci) => (
                      <div key={ci} className="flex flex-col gap-[3px]">
                        {c.map((d, ri) => (
                          <span
                            key={ri}
                            className="w-[11px] h-[11px]"
                            style={{ background: d ? LEVEL_BG[d.level] : "transparent" }}
                            title={d ? `${d.count} · ${d.date}` : ""}
                          />
                        ))}
                      </div>
                    ))
                  : Array.from({ length: 52 }).map((_, ci) => (
                      <div key={ci} className="flex flex-col gap-[3px]">
                        {Array.from({ length: 7 }).map((_, ri) => (
                          <span key={ri} className="w-[11px] h-[11px] bg-[var(--bg-elev-2)] animate-pulse" />
                        ))}
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </Reveal>
  );
}
