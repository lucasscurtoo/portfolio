"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/*
  Dot-matrix LED mascot — a face rendered as a grid of dots whose eyes track the
  cursor. Magenta-on-black halftone aesthetic. Canvas + rAF.
  - Pupils ease toward the pointer; occasional blink; faint dot-noise idle.
  - Decorative → aria-hidden. Under prefers-reduced-motion it draws once, eyes centered.
*/
export default function DotBot({ size = 220 }: { size?: number }) {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const target = useRef({ x: 0, y: 0 }); // desired pupil offset, -1..1
  const cur = useRef({ x: 0, y: 0 }); // eased pupil offset

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const COLS = 19;
    const ROWS = 19;
    const cell = size / COLS;
    const dotR = cell * 0.34;

    // theme colors (re-read on theme switch)
    let accent = "oklch(0.87 0.22 138)";
    let bright = "oklch(0.97 0 0)";
    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      accent = s.getPropertyValue("--accent").trim() || accent;
      bright = s.getPropertyValue("--text").trim() || bright;
    };
    readColors();
    const themeObs = new MutationObserver(readColors);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const cx = (COLS - 1) / 2;
    const cy = (ROWS - 1) / 2;
    const headR = COLS * 0.47;
    const eyeY = cy - 1.2;
    const eyeDX = 3.6;
    const eyeR = 2.6;
    const pupilTravel = 1.35;

    // blink state
    let blink = 0; // 0 open .. 1 shut
    let nextBlink = 1400 + Math.random() * 2600;
    let lastT = 0;
    let t0 = 0;

    const noise = () => (reduce ? 0 : (Math.random() - 0.5) * 0.16);

    const draw = (time: number) => {
      if (!t0) t0 = time;
      const dt = lastT ? time - lastT : 16;
      lastT = time;
      const elapsed = time - t0;

      // ease pupils
      cur.current.x += (target.current.x - cur.current.x) * 0.12;
      cur.current.y += (target.current.y - cur.current.y) * 0.12;

      // blink scheduler
      if (!reduce) {
        nextBlink -= dt;
        if (nextBlink <= 0 && blink === 0) blink = 0.0001;
        if (blink > 0) {
          blink += dt / 90; // close+open speed
          if (blink >= 2) {
            blink = 0;
            nextBlink = 1600 + Math.random() * 3000;
          }
        }
      }
      const lid = blink === 0 ? 0 : blink <= 1 ? blink : 2 - blink; // 0..1..0

      const px = cur.current.x * pupilTravel;
      const py = cur.current.y * pupilTravel;
      const scan = reduce ? -99 : (elapsed / 26) % (ROWS + 8) - 4; // moving scan row

      ctx.clearRect(0, 0, size, size);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const dHead = Math.hypot(c - cx, r - cy);
          let intensity = 0;
          let useBright = false;

          // faint full-grid matrix
          intensity = 0.05;

          // head structure
          if (dHead <= headR) intensity = Math.max(intensity, 0.14);

          // eyes
          for (const ex of [cx - eyeDX, cx + eyeDX]) {
            const dEye = Math.hypot(c - ex, r - eyeY);
            if (dEye <= eyeR) {
              // lid closes from top+bottom toward center
              const open = 1 - lid;
              const vis = Math.abs(r - eyeY) <= eyeR * open + 0.15;
              if (vis) {
                intensity = Math.max(intensity, 0.45);
                // pupil
                const dPup = Math.hypot(c - (ex + px), r - (eyeY + py));
                if (dPup <= 1.05) {
                  intensity = 1;
                  useBright = true;
                }
              } else {
                intensity = Math.max(intensity, 0.16); // closed lid faint
              }
            }
          }

          // mouth / speaker grille
          if (r >= cy + 3.4 && r <= cy + 4.6 && c >= cx - 3 && c <= cx + 3) {
            const m = (c + r) % 2 === 0 ? 0.5 : 0.22;
            intensity = Math.max(intensity, m);
          }

          if (intensity <= 0.04) continue;

          // scan highlight
          if (Math.abs(r - scan) < 0.6) intensity = Math.min(1, intensity + 0.35);

          // idle flicker on lit dots
          if (intensity > 0.2) intensity = Math.min(1, Math.max(0.06, intensity + noise()));

          const x = c * cell + cell / 2;
          const y = r * cell + cell / 2;
          ctx.globalAlpha = intensity;
          ctx.fillStyle = useBright ? bright : accent;
          if (useBright || intensity > 0.85) {
            ctx.shadowColor = accent;
            ctx.shadowBlur = 8;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.beginPath();
          ctx.arc(x, y, dotR, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      // antenna
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(cx * cell + cell / 2, -cell * 0.4, dotR * 1.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    let raf = requestAnimationFrame(draw);

    // cursor tracking
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const bx = rect.left + rect.width / 2;
      const by = rect.top + rect.height * 0.42; // eyes sit above center
      const dx = e.clientX - bx;
      const dy = e.clientY - by;
      const dist = Math.hypot(dx, dy);
      const reach = Math.min(dist / 240, 1);
      const ang = Math.atan2(dy, dx);
      target.current.x = Math.cos(ang) * reach;
      target.current.y = Math.sin(ang) * reach;
    };
    if (!reduce) window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      themeObs.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [size, reduce]);

  return (
    <div aria-hidden="true" className="relative select-none" style={{ width: size, height: size }}>
      <canvas ref={canvasRef} style={{ width: size, height: size, display: "block" }} />
    </div>
  );
}
