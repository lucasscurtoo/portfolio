"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/*
  ASCII-art face — the LC hooded mark rendered with monospace glyphs (@#%*+=-:.)
  instead of dots, for a terminal/hacker look. Density maps to the hood
  silhouette; two eyes glow bright and track the cursor; subtle glyph flicker
  keeps it alive. Decorative → aria-hidden. Static under prefers-reduced-motion.
*/

const HOOD = "M50 6 L68.48 13.04 L83.44 35.92 L89.6 94 L10.4 94 L16.56 35.92 L31.52 13.04 Z";
const FACE = "M50 32.4 L69.36 46.48 L64.08 76.4 L50 85.2 L35.92 76.4 L30.64 46.48 Z";
const RAMP = " .:-=+*#%@";

export default function AsciiFace({ size = 260 }: { size?: number }) {
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

    const F = size / 26;              // glyph size
    const cellH = F;
    const cellW = F * 0.6;            // monospace aspect
    const cols = Math.ceil(size / cellW);
    const rows = Math.ceil(size / cellH);
    const s = size / 100;

    const hood = new Path2D();
    hood.addPath(new Path2D(HOOD), new DOMMatrix([s, 0, 0, s, 0, 0]));
    const face = new Path2D();
    face.addPath(new Path2D(FACE), new DOMMatrix([s, 0, 0, s, 0, 0]));

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

    // precompute per-cell base density (path units + px position)
    type Cell = { x: number; y: number; ux: number; uy: number; base: number };
    const cells: Cell[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const xPx = c * cellW;
        const yPx = r * cellH;
        const cxPx = xPx + cellW / 2;
        const cyPx = yPx + cellH / 2;
        const inHood = ctx.isPointInPath(hood, cxPx, cyPx);
        const inFace = ctx.isPointInPath(face, cxPx, cyPx);
        let base = 0;
        if (inHood) base = inFace ? 0.34 : 0.74;
        cells.push({ x: xPx, y: yPx, ux: (cxPx / size) * 100, uy: (cyPx / size) * 100, base });
      }
    }

    const eyes = [
      { x: 41.5, y: 53 },
      { x: 58.5, y: 53 },
    ];
    const travel = 3.4;

    ctx.font = `${F}px 'JetBrains Mono', ui-monospace, monospace`;
    ctx.textBaseline = "top";

    let frame = 0;
    const draw = () => {
      frame++;
      cur.current.x += (target.current.x - cur.current.x) * 0.12;
      cur.current.y += (target.current.y - cur.current.y) * 0.12;
      const px = cur.current.x * travel;
      const py = cur.current.y * travel;

      ctx.clearRect(0, 0, size, size);
      ctx.font = `${F}px 'JetBrains Mono', ui-monospace, monospace`;
      ctx.textBaseline = "top";

      for (const cell of cells) {
        let v = cell.base;
        let eye = false;
        for (const e of eyes) {
          const d = Math.hypot(cell.ux - (e.x + px), cell.uy - (e.y + py));
          if (d < 5) { v = Math.max(v, 0.65 + (1 - d / 5) * 0.35); if (d < 2.4) eye = true; }
        }
        if (v <= 0.04) continue;

        // subtle flicker on lit glyphs
        if (!reduce && v > 0.1) {
          const n = Math.sin(frame * 0.06 + cell.x * 0.7 + cell.y * 0.4) * 0.06;
          v = Math.max(0.05, Math.min(1, v + n));
        }

        const gi = Math.min(RAMP.length - 1, Math.max(1, Math.round(v * (RAMP.length - 1))));
        const ch = RAMP[gi];
        if (ch === " ") continue;

        ctx.globalAlpha = eye ? 1 : 0.4 + v * 0.55;
        ctx.fillStyle = eye ? bright : accent;
        if (eye) { ctx.shadowColor = accent; ctx.shadowBlur = 10; } else { ctx.shadowBlur = 0; }
        ctx.fillText(ch, cell.x, cell.y);
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
