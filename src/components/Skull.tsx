/*
  Hooded-skull mark (WD2-inspired). Rendered as a single currentColor shape with
  the eyes/nose/teeth knocked out via a mask, so the holes are TRANSPARENT and the
  glyph reads correctly on any background (page bg or a colored accent badge).
*/
export default function Skull({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <mask id="skull-knockout" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
        {/* white = painted, gray = faint, black = transparent hole */}
        <rect width="32" height="32" fill="black" />
        {/* hood (faint) */}
        <path
          d="M16 1c-7 0-12 4.6-12 12.5 0 3 .9 5.3 2 7.2L4 30l6-2.2c1.8.8 3.8 1.2 6 1.2s4.2-.4 6-1.2L28 30l-2-9.3c1.1-1.9 2-4.2 2-7.2C28 5.6 23 1 16 1z"
          fill="#5a5a5a"
        />
        {/* skull face */}
        <path
          d="M16 6c-4.4 0-8 3.3-8 7.6 0 2.6 1.4 4.9 3.5 6.3V23l2 1 1-1.4 1.5 1 1.5-1 1 1.4 2-1v-3.1c2.1-1.4 3.5-3.7 3.5-6.3C24 9.3 20.4 6 16 6z"
          fill="white"
        />
        {/* knockouts */}
        <ellipse cx="12.3" cy="14" rx="2.1" ry="2.6" fill="black" />
        <ellipse cx="19.7" cy="14" rx="2.1" ry="2.6" fill="black" />
        <path d="M16 16.5l1.3 2.4h-2.6z" fill="black" />
        <rect x="13" y="20.2" width="6" height="1.5" fill="black" />
      </mask>
      <rect width="32" height="32" mask="url(#skull-knockout)" />
    </svg>
  );
}
