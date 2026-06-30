"use client";

import Skull from "./Skull";

export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: "var(--orb-opacity)" }}
    >
      {/* magenta glow — top-left */}
      <div
        className="absolute rounded-full blur-[150px] opacity-[0.18] animate-orb-1"
        style={{
          width: "560px",
          height: "560px",
          top: "-160px",
          left: "-140px",
          background: "radial-gradient(circle, var(--accent), transparent 70%)",
        }}
      />
      {/* magenta glow — bottom-right */}
      <div
        className="absolute rounded-full blur-[180px] opacity-[0.12] animate-orb-2"
        style={{
          width: "680px",
          height: "680px",
          bottom: "-200px",
          right: "-200px",
          background: "radial-gradient(circle, var(--accent), transparent 70%)",
        }}
      />

      {/* giant ghost skull watermark, right side */}
      <Skull
        className="absolute text-[var(--text)] opacity-[0.03] -right-[6%] top-[14%] rotate-6"
        size={620}
      />

      {/* continuous scan sweep */}
      <div
        className="absolute left-0 right-0 h-[3px]"
        style={{
          top: 0,
          background:
            "linear-gradient(90deg, transparent, var(--accent-glow) 40%, var(--accent) 50%, var(--accent-glow) 60%, transparent)",
          boxShadow: "0 0 22px 3px var(--accent-glow)",
          animation: "scan-sweep 8s linear infinite",
        }}
      />
    </div>
  );
}
