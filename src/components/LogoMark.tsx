import { LC_AVATAR } from "@/lib/lc-avatar";

/*
  LC 8-bit avatar mark (backwards cap + glasses). Lime pixels use currentColor
  (set via text-[var(--accent)]); dark detail pixels stay near-black so the
  glasses read on any theme. Rendered as crisp SVG rects.
*/
const INK = "#0b0b0b";

export default function LogoMark({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={(size * 15) / 18}
      viewBox="0 0 18 15"
      shapeRendering="crispEdges"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      {LC_AVATAR.slice(0, 15).map((row, y) =>
        row.map((v, x) =>
          v === 0 ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={v === 2 ? INK : "currentColor"} />
          )
        )
      )}
    </svg>
  );
}
