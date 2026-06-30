import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** magenta notch tab top-left */
  tab?: boolean;
  /** halftone dot texture behind content (loud zones only — keep off body copy) */
  texture?: boolean;
  /** hover lift + offset magenta shadow (for links/cards) */
  interactive?: boolean;
}

/* Hard-edged DedSec panel — the single card primitive. No border-radius, ever. */
export default function Panel({
  children,
  className = "",
  tab = false,
  texture = false,
  interactive = false,
}: Props) {
  return (
    <div
      className={[
        "dedsec-card",
        tab ? "dedsec-tab" : "",
        interactive ? "dedsec-card--hover" : "",
        "relative",
        className,
      ].join(" ")}
    >
      {texture && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 halftone-fill opacity-40"
        />
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
