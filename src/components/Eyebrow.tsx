interface Props { label: string; }

export default function Eyebrow({ label }: Props) {
  return (
    <span className="inline-flex items-center gap-2.5 font-mono text-[13px] tracking-[0.04em] text-[var(--accent)] mb-[18px]">
      <span className="inline-block w-6 h-px bg-[var(--accent)] opacity-60" />
      {label}
    </span>
  );
}
