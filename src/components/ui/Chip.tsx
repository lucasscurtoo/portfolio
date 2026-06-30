import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** magenta-filled emphasis chip */
  solid?: boolean;
}

/* Mono tag chip — hard-edged. Default = outline; solid = magenta fill. */
export default function Chip({ children, className = "", solid = false }: Props) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] whitespace-nowrap",
        solid
          ? "bg-[var(--accent)] text-[var(--accent-text)] font-bold"
          : "border border-[var(--border)] text-[var(--muted)]",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
