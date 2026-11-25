/**
 * Bespoke pack-shape icon glyphs for the White Label Coffee page's formats
 * grid (page.tsx's formatsBlock case). Phosphor's icon set has no literal
 * stand-up pouch, squeeze tube or sachet-stick shape (checked - the
 * closest it offers are generic container icons like Cylinder/Package,
 * which are fine for cans and boxes but don't read as a pouch or a tube).
 * Zoe, Nov 2026: "we can do a graphic for each pack type to add a visual
 * aspect here which I think is important for quick recognition" - these
 * three fill that gap in-house rather than licensing stock icon art,
 * keeping every format icon in one consistent, single-colour style.
 *
 * Deliberately simple geometry (straight lines and a couple of corner
 * curves, no illustration detail) so they read clearly at the small
 * badge size used in the formats grid (20px) and sit comfortably
 * alongside the Phosphor "bold" weight icons used for the other formats
 * (Cylinder for cans & tins, Package for boxes & cartons) in the same
 * row. Same call signature as a Phosphor icon component (size/className)
 * so they drop into FORMAT_ICONS in page.tsx without special-casing.
 */

type PackIconProps = {
  size?: number | string;
  className?: string;
};

/** Stand-up pouch: flat heat-sealed top, tapered shoulders, rounded base. */
export function PouchIcon({ size = 20, className }: PackIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 2 L16 2 L17.5 6.5 L17.5 18.5 Q17.5 21 15.3 21 L8.7 21 Q6.5 21 6.5 18.5 L6.5 6.5 Z" />
    </svg>
  );
}

/** Squeeze tube: narrow cap, flared shoulders, straight body, flat crimped base. */
export function TubeIcon({ size = 20, className }: PackIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 1 L14 1 L14 3 L15.5 3 L17 7 L17 19 L7 19 L7 7 L8.5 3 L10 3 Z" />
    </svg>
  );
}

/** Single-portion sticks/sachets: a row of individual, flush-topped packets. */
export function SachetIcon({ size = 20, className }: PackIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 3 L7.5 3 L7.5 21 L4 21 Z M10 3 L13.5 3 L13.5 21 L10 21 Z M16 3 L19.5 3 L19.5 21 L16 21 Z" />
    </svg>
  );
}
