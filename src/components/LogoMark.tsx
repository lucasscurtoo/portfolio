/*
  LC brand mark — DIR_03 glitch/hood. Official asset geometry, recolored to
  currentColor so it adapts to theme (set color via text-[var(--accent)]).
  The face is a transparent cutout (evenodd), so it reads on any background.
*/
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
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M50 6L68.48 13.04L83.44 35.92L89.6 94L10.4 94L16.56 35.92L31.52 13.04Z M50 32.4L69.36 46.48L64.08 76.4L50 85.2L35.92 76.4L30.64 46.48Z"
      />
      <path d="M35.92 57.04L46.48 51.76L47.36 55.28L36.8 60.56Z" />
      <path d="M64.08 57.04L53.52 51.76L52.64 55.28L63.2 60.56Z" />
      <path d="M48.24 64.96L51.76 64.96L50 72Z" />
    </svg>
  );
}
