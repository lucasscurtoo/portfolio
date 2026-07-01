"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/*
  Ambient dot-matrix background — one unified LED field behind everything.
  - Subtle green dot grid, a slow diagonal wave, and a soft spotlight that
    follows the cursor (dots near the pointer brighten/grow).
  - Fixed full-screen, pointer-events-none, low opacity so content stays readable.
  - Theme-aware (reads --accent). Under prefers-reduced-motion: static faint grid.
*/
export default function DotField() {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CELL = 24;
    const DOT = 1.4;
    let w = 0, h = 0, cols = 0, rows = 0;

    let accent = "oklch(0.87 0.22 138)";
    const readAccent = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      if (v) accent = v;
    };
    readAccent();
    const themeObs = new MutationObserver(readAccent);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL) + 1;
      rows = Math.ceil(h / CELL) + 1;
    };
    resize();
    window.addEventListener("resize", resize);

    const GLOW_R = 170;

    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = accent;
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const wave = reduce ? 0 : t * 0.0012;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * CELL;
          const y = r * CELL;

          // base + slow diagonal ripple
          let a = 0.09;
          if (!reduce) a += 0.05 * Math.sin(c * 0.35 + r * 0.22 - wave);

          let radius = DOT;
          // cursor spotlight
          if (!reduce) {
            const dx = x - mx;
            const dy = y - my;
            const d = Math.hypot(dx, dy);
            if (d < GLOW_R) {
              const f = 1 - d / GLOW_R;
              a += f * 0.6;
              radius += f * 1.6;
            }
          }

          if (a <= 0.02) continue;
          ctx.globalAlpha = Math.min(a, 0.85);
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(frame);
    };

    let raf = requestAnimationFrame(frame);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };
    if (!reduce) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseout", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      themeObs.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
}
