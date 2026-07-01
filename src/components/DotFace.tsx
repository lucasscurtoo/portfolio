"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/*
  Dot-matrix face — the LC hooded mark rendered as an LED grid, unified with
  the DotField background. The hood silhouette is filled with dots; two eyes
  glow and track the cursor. No emoji grille — reads as a hooded portrait.
  Decorative → aria-hidden. Static under prefers-reduced-motion.
*/

// outer hood silhouette (favicon viewBox 0..100)
const HOOD = "M50 6 L68.48 13.04 L83.44 35.92 L89.6 94 L10.4 94 L16.56 35.92 L31.52 13.04 Z";
// face cavity (kept slightly darker so eyes read)
const FACE = "M50 32.4 L69.36 46.48 L64.08 76.4 L50 85.2 L35.92 76.4 L30.64 46.48 Z";

export default function DotFace({ size = 260 }: { size?: number }) {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const N = 30;                    // cells across
    const cellU = 100 / N;           // grid step in path units (0..100)
    const cellPx = size / N;
    const dotR = cellPx * 0.34;
    const s = size / 100;            // unit -> px

    // scale the 0..100 paths into pixel space so hit-tests match the grid
    const hood = new Path2D();
    hood.addPath(new Path2D(HOOD), new DOMMatrix([s, 0, 0, s, 0, 0]));
    const face = new Path2D();
    face.addPath(new Path2D(FACE), new DOMMatrix([s, 0, 0, s, 0, 0]));

    // theme color
    let accent = "oklch(0.87 0.22 138)";
    let bright = "oklch(0.98 0 0)";
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      accent = cs.getPropertyValue("--accent").trim() || accent;
      bright = cs.getPropertyValue("--text").trim() || bright;
    };
    readColors();
    const obs = new MutationObserver(readColors);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // precompute per-cell base intensity (static): hood fill, dimmer face cavity
    type Cell = { x: number; y: number; ux: number; uy: number; base: number };
    const cells: Cell[] = [];
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const ux = c * cellU + cellU / 2;
        const uy = r * cellU + cellU / 2;
        const xPx = c * cellPx + cellPx / 2;
        const yPx = r * cellPx + cellPx / 2;
        const inHood = ctx.isPointInPath(hood, xPx, yPx);
        const inFace = ctx.isPointInPath(face, xPx, yPx);
        let base = 0.06;                          // ambient (blends with field)
        if (inHood) base = inFace ? 0.16 : 0.5;   // hood bright, face cavity dim
        cells.push({ x: xPx, y: yPx, ux, uy, base });
      }
    }

    // eye centers (path units) + travel
    const eyes = [
      { x: 41.5, y: 53 },
      { x: 58.5, y: 53 },
    ];
    const travel = 3.2; // units

    const draw = () => {
      cur.current.x += (target.current.x - cur.current.x) * 0.12;
      cur.current.y += (target.current.y - cur.current.y) * 0.12;
      const px = cur.current.x * travel;
      const py = cur.current.y * travel;

      ctx.clearRect(0, 0, size, size);

      for (const cell of cells) {
        let a = cell.base;
        let useBright = false;
        let r = dotR;

        // eye glow (tracks cursor)
        for (const e of eyes) {
          const d = Math.hypot(cell.ux - (e.x + px), cell.uy - (e.y + py));
          if (d < 5.5) {
            const f = 1 - d / 5.5;
            a = Math.max(a, 0.4 + f * 0.6);
            r = dotR + f * dotR * 0.7;
            if (d < 2.2) useBright = true;
          }
        }

        if (a <= 0.03) continue;
        ctx.globalAlpha = Math.min(a, 1);
        ctx.fillStyle = useBright ? bright : accent;
        if (useBright) { ctx.shadowColor = accent; ctx.shadowBlur = 10; } else { ctx.shadowBlur = 0; }
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    let raf = requestAnimationFrame(draw);

    const onMove = (ev: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.5;
      const dx = ev.clientX - cx;
      const dy = ev.clientY - cy;
      const reach = Math.min(Math.hypot(dx, dy) / 260, 1);
      const ang = Math.atan2(dy, dx);
      target.current.x = Math.cos(ang) * reach;
      target.current.y = Math.sin(ang) * reach;
    };
    if (!reduce) window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [size, reduce]);

  return (
    <div aria-hidden="true" className="relative select-none max-w-full" style={{ width: size, height: size }}>
      <canvas ref={canvasRef} style={{ width: size, height: size, maxWidth: "100%", display: "block" }} />
    </div>
  );
}
