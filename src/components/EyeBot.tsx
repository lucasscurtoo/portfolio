"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/*
  DedSec operator bot — a little hooded droid whose eyes track the cursor.
  - Pupils follow the pointer (clamped inside the sockets) via rAF-throttled mousemove.
  - Blinks occasionally. Under prefers-reduced-motion the eyes stay centered (no tracking).
  - Purely decorative → aria-hidden.
*/
export default function EyeBot({ size = 200 }: { size?: number }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState(0);
  const [blink, setBlink] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) return;

    const onMove = (e: MouseEvent) => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const ang = Math.atan2(dy, dx);
        const dist = Math.min(Math.hypot(dx, dy) / 26, 1); // 0..1 reach
        const max = 5; // px of pupil travel
        setPupil({ x: Math.cos(ang) * max * dist, y: Math.sin(ang) * max * dist });
        setTilt(Math.max(-6, Math.min(6, dx / 60)));
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduce]);

  // occasional blink
  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      const next = 2200 + Math.random() * 3200;
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 130);
        loop();
      }, next);
    };
    loop();
    return () => clearTimeout(t);
  }, [reduce]);

  const Eye = () => (
    <span className="relative grid place-items-center w-[34%] h-[40%] bg-[var(--bg)] border-2 border-[var(--accent)] overflow-hidden">
      {/* pupil */}
      <span
        className="block w-[42%] h-[42%] bg-[var(--accent)]"
        style={{
          transform: `translate(${pupil.x}px, ${pupil.y}px) scaleY(${blink ? 0.1 : 1})`,
          transition: "transform 0.08s linear",
          boxShadow: "0 0 10px var(--accent-glow)",
        }}
      />
      {/* scan glint */}
      <span className="pointer-events-none absolute inset-0 opacity-30 halftone-fill" />
    </span>
  );

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="relative select-none"
      style={{ width: size, height: size }}
    >
      <div
        className="relative w-full h-full"
        style={{ transform: `rotate(${tilt}deg)`, transition: "transform 0.25s ease-out" }}
      >
        {/* antenna */}
        <span className="absolute left-1/2 -translate-x-1/2 -top-[10%] w-[2px] h-[12%] bg-[var(--border)]" />
        <span className="absolute left-1/2 -translate-x-1/2 -top-[14%] w-[10px] h-[10px] bg-[var(--accent)] animate-pulse" />

        {/* head */}
        <div className="dedsec-card w-full h-full flex flex-col items-center justify-center gap-[8%] p-[12%]"
             style={{ boxShadow: "8px 8px 0 0 var(--accent-dim)" }}>
          {/* eyes row */}
          <div className="flex items-center justify-center gap-[14%] w-full h-[46%]">
            <Eye />
            <Eye />
          </div>
          {/* mouth / speaker grille */}
          <div className="flex gap-[6px] h-[10%] items-end">
            {[6, 11, 8, 13, 7].map((h, i) => (
              <span key={i} className="w-[3px] bg-[var(--muted)]" style={{ height: h }} />
            ))}
          </div>
          {/* label */}
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--faint)]">
            dedsec_bot
          </span>
        </div>
      </div>
    </div>
  );
}
