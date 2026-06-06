"use client";

export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* orb 1 — terminal green top-left */}
      <div
        className="absolute rounded-full blur-[130px] opacity-[0.16] animate-orb-1"
        style={{
          width: "650px",
          height: "650px",
          top: "-120px",
          left: "-180px",
          background: "radial-gradient(circle, oklch(0.64 0.17 155), transparent 70%)",
        }}
      />
      {/* orb 2 — indigo/blue right */}
      <div
        className="absolute rounded-full blur-[150px] opacity-[0.12] animate-orb-2"
        style={{
          width: "700px",
          height: "700px",
          top: "5%",
          right: "-220px",
          background: "radial-gradient(circle, oklch(0.60 0.20 270), transparent 70%)",
        }}
      />
      {/* orb 3 — deep violet bottom-center */}
      <div
        className="absolute rounded-full blur-[200px] opacity-[0.09] animate-orb-3"
        style={{
          width: "900px",
          height: "900px",
          bottom: "5%",
          left: "15%",
          background: "radial-gradient(circle, oklch(0.55 0.18 290), transparent 70%)",
        }}
      />
      {/* orb 4 — green accent mid-right */}
      <div
        className="absolute rounded-full blur-[90px] opacity-[0.10] animate-orb-4"
        style={{
          width: "320px",
          height: "320px",
          top: "38%",
          right: "18%",
          background: "radial-gradient(circle, oklch(0.64 0.17 155), transparent 70%)",
        }}
      />
    </div>
  );
}
