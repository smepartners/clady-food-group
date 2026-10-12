import { TextureOverlay } from "@/components/ui";

/**
 * Replaces the roastery photo in the "One group, multiple capabilities"
 * band per client feedback ("could we add in a map to show locations rather
 * than have a list of them, that could replace the roastery image?"). A
 * stylised locator graphic rather than a literal political map - two soft,
 * simplified landmasses (Ireland, Great Britain) in roughly correct
 * relative position, with a pin and label per manufacturing site from
 * `lib/facilities.ts` so Buxton/Belfast/Galway stay the single source of
 * truth. A thin connecting path between the three pins stands in for the
 * "flow"/network idea rather than a photo of one site, which only ever
 * showed Buxton and said nothing about the other two.
 */
const PINS = [
  // Position as a percentage of the 360x440 viewBox below.
  { name: "Buxton", x: 255, y: 215 },
  { name: "Belfast", x: 108, y: 150 },
  { name: "Galway", x: 70, y: 245 },
] as const;

export function LocationsMap({ className = "" }: { className?: string }) {
  return (
    <div
      className={`group relative aspect-[4/5] overflow-hidden bg-green-900 sm:aspect-[16/11] ${className}`}
    >
      <TextureOverlay texture="/texture-leather-green.jpg" />
      <svg
        viewBox="0 0 360 440"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Map of the UK and Ireland showing Clady Group's three manufacturing sites: Buxton, Belfast and Galway"
      >
        {/* Ireland - simplified, west of Great Britain */}
        <path
          d="M40 130 C20 160 18 200 30 235 C22 260 28 295 55 310 C80 325 105 310 112 285 C130 270 128 235 115 210 C125 185 118 150 95 135 C78 118 55 112 40 130 Z"
          className="fill-cream-100/10"
        />
        {/* Great Britain - simplified */}
        <path
          d="M230 55 C260 45 285 60 290 85 C310 95 318 120 300 140 C315 160 310 185 290 195 C300 220 290 245 268 250 C275 275 260 300 240 295 C235 320 210 330 198 310 C178 320 165 300 172 280 C150 270 148 245 165 230 C150 210 158 180 180 170 C172 145 185 115 210 110 C202 85 212 62 230 55 Z"
          className="fill-cream-100/10"
        />
        {/* Thin connecting path between the three sites */}
        <path
          d="M70 245 L108 150 L255 215"
          fill="none"
          className="stroke-gold-500/50"
          strokeWidth="1.5"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
        {PINS.map((p) => (
          <g key={p.name} className="transition duration-300 group-hover:-translate-y-0.5">
            <circle cx={p.x} cy={p.y} r="12" className="fill-gold-500/20" />
            <circle cx={p.x} cy={p.y} r="5.5" className="fill-gold-500" />
            <circle cx={p.x} cy={p.y} r="5.5" className="fill-none stroke-green-900" strokeWidth="1.5" />
          </g>
        ))}
      </svg>
      {/* Labels as HTML rather than SVG text, so they inherit the site's
          actual font rather than the SVG's default. Positioned to match
          the pin coordinates above, as percentages of the same viewBox. */}
      {PINS.map((p) => (
        <div
          key={p.name}
          className="absolute flex -translate-x-1/2 -translate-y-[calc(100%+10px)] flex-col items-center whitespace-nowrap"
          style={{ left: `${(p.x / 360) * 100}%`, top: `${(p.y / 440) * 100}%` }}
        >
          <span className="rounded-sm bg-ink/70 px-2 py-0.5 text-xs font-semibold text-cream-100 backdrop-blur-sm">
            {p.name}
          </span>
        </div>
      ))}
    </div>
  );
}
