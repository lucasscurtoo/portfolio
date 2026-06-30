"use client";

import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01100101ABCDEF░▒▓";

interface Props {
  text: string;
  className?: string;
  /** ms between scramble frames */
  speed?: number;
  /** start scramble only when scrolled into view */
  onView?: boolean;
}

/*
  Decrypt scramble — one-shot, hydration-safe, a11y-safe.
  - The real text is ALWAYS exposed to assistive tech via an sr-only span.
  - The animated glyph noise is aria-hidden decoration.
  - Under prefers-reduced-motion (or before mount) it renders the plain text.
*/
export default function Decrypt({ text, className = "", speed = 28, onView = true }: Props) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || reduce || done.current) return;

    const start = () => {
      if (done.current) return;
      done.current = true;
      let frame = 0;
      const total = text.length;
      const id = setInterval(() => {
        frame++;
        const revealed = Math.floor(frame / 2);
        setDisplay(
          text
            .split("")
            .map((ch, i) => {
              if (ch === " ") return " ";
              if (i < revealed) return text[i];
              return GLYPHS[(frame + i) % GLYPHS.length];
            })
            .join("")
        );
        if (revealed >= total) {
          clearInterval(id);
          setDisplay(text);
        }
      }, speed);
    };

    if (!onView) {
      start();
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted, reduce, text, speed, onView]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
