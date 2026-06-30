import Skull from "./Skull";

interface Props { label: string; }

export default function Eyebrow({ label }: Props) {
  return (
    <span className="inline-flex items-center gap-2.5 mb-[18px]">
      <span className="inline-flex items-center gap-2 bg-[var(--accent)] text-[var(--accent-text)] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
        <Skull size={13} />
        {label}
      </span>
      <span className="inline-block flex-1 w-16 h-px bg-[var(--border)]" />
    </span>
  );
}
