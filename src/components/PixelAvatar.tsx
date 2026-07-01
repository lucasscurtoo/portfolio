"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { LC_AVATAR } from "@/lib/lc-avatar";

/*
  Hero mascot — the LC 8-bit avatar rendered on a crisp pixel canvas.
  Lightweight (no deps): idle bob, a slow scanline highlight, a glasses-lens
  glint that tracks the cursor, and occasional blink. Theme-aware.
  Decorative → aria-hidden. Static under prefers-reduced-motion.
*/
const COLS = 18;
const ROWS = 15; // content rows
const INK = "#0b0b0b";

export default function PixelAvatar({ size = 240 }: { size?: number }) {
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
    const px = Math.floor(size / COLS);      // pixel cell size
    const artW = px * COLS;
    const artH = px * ROWS;
    const W = size;
    const H = artH + px * 4;                   // headroom for bob
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false;

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

    const ox = (W - artW) / 2;                 // origin offset (centered)
    const oyBase = px * 2;

    // lens (glasses) cells — used for glint + blink
    const lensCells: { x: number; y: number }[] = [];
    for (let y = 0; y < ROWS; y++)
      for (let x = 0; x < COLS; x++)
        if (LC_AVATAR[y][x] === 2 && y >= 6) lensCells.push({ x, y });

    let frame = 0;
    let blink = 0;
    let nextBlink = 180 + Math.random() * 260;

    const draw = () => {
      frame++;
      cur.current.x += (target.current.x - cur.current.x) * 0.1;
      cur.current.y += (target.current.y - cur.current.y) * 0.1;

      const bob = reduce ? 0 : Math.sin(frame * 0.03) * (px * 0.35);
      const shiftX = reduce ? 0 : cur.current.x * px * 0.8;
      const oy = oyBase + bob + (reduce ? 0 : cur.current.y * px * 0.4);
      const scan = reduce ? -99 : (frame * 0.09) % (ROWS + 6) - 3;

      if (!reduce) {
        nextBlink--;
        if (nextBlink <= 0 && blink === 0) blink = 1;
        if (blink > 0) { blink++; if (blink > 8) { blink = 0; nextBlink = 200 + Math.random() * 300; } }
      }
      const blinking = blink > 2 && blink < 6;

      // glint column within lens, follows cursor
      const lensXs = lensCells.map((c) => c.x);
      const minLx = Math.min(...lensXs), maxLx = Math.max(...lensXs);
      const glintX = Math.round(minLx + ((cur.current.x + 1) / 2) * (maxLx - minLx));

      ctx.clearRect(0, 0, W, H);

      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const v = LC_AVATAR[y][x];
          if (v === 0) continue;
          const dx = Math.round(ox + shiftX + x * px);
          const dy = Math.round(oy + y * px);

          if (v === 2) {
            // glasses / dark detail
            if (blinking) { ctx.fillStyle = accent; ctx.globalAlpha = 0.5; }
            else { ctx.fillStyle = INK; ctx.globalAlpha = 1; }
            ctx.fillRect(dx, dy, px, px);
            continue;
          }

          // lime pixel
          let a = 1;
          if (!reduce && Math.abs(y - scan) < 0.6) a = 1; // scan row stays full but glows below
          ctx.globalAlpha = a;
          ctx.fillStyle = accent;
          ctx.fillRect(dx, dy, px, px);
          // scanline glow highlight
          if (!reduce && Math.abs(y - scan) < 0.55) {
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = bright;
            ctx.fillRect(dx, dy, px, px);
          }
        }
      }

      // lens glint (bright pixel tracking cursor)
      if (!reduce && !blinking) {
        const lc = lensCells.find((c) => c.x === glintX) || lensCells[Math.floor(lensCells.length / 2)];
        if (lc) {
          ctx.globalAlpha = 1;
          ctx.fillStyle = bright;
          ctx.shadowColor = accent;
          ctx.shadowBlur = 8;
          ctx.fillRect(Math.round(ox + shiftX + lc.x * px), Math.round(oy + lc.y * px), px, px);
          ctx.shadowBlur = 0;
        }
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    let raf = requestAnimationFrame(draw);

    const onMove = (ev: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      target.current.x = Math.max(-1, Math.min(1, (ev.clientX - cx) / 240));
      target.current.y = Math.max(-1, Math.min(1, (ev.clientY - cy) / 240));
    };
    if (!reduce) window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [size, reduce]);

  return (
    <div aria-hidden="true" className="relative select-none max-w-full" style={{ width: size }}>
      <canvas ref={canvasRef} style={{ maxWidth: "100%", display: "block", imageRendering: "pixelated" }} />
    </div>
  );
}
