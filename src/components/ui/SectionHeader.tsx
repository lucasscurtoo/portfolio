import Decrypt from "./Decrypt";
import Skull from "../Skull";

interface Props {
  /** operation index, e.g. "01" */
  op: string;
  /** mono codename — decorative, aria-hidden */
  code: string;
  /** human heading — the real, accessible label */
  title: string;
  className?: string;
  align?: "left" | "center";
}

/*
  Hacker-HUD section spine. The mono "OPERATION 0N // CODENAME" kicker is decorative
  (aria-hidden); the Anton <h2> carries the real, scannable label for recruiters + AT.
*/
export default function SectionHeader({ op, code, title, className = "", align = "left" }: Props) {
  return (
    <header className={[align === "center" ? "items-center text-center" : "items-start", "flex flex-col", className].join(" ")}>
      <div
        aria-hidden="true"
        className={[
          "flex items-center gap-2 mb-3 font-mono text-[11px] uppercase tracking-[0.18em]",
          align === "center" ? "justify-center" : "",
        ].join(" ")}
      >
        <span className="inline-flex items-center gap-1.5 bg-[var(--accent)] text-[var(--accent-text)] font-bold px-2 py-0.5">
          <Skull size={12} />
          OP_{op}
        </span>
        <span className="text-[var(--faint)]">// {code}</span>
      </div>
      <h2 className="font-display uppercase text-[clamp(34px,6vw,68px)] leading-[0.9] tracking-[0.01em] text-[var(--text)]">
        <Decrypt text={title} />
      </h2>
    </header>
  );
}
