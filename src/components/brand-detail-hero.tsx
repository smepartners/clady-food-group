import { PageHero } from "@/components/page-hero";

/** Individual brand page's hero - full-bleed treatment (see page-hero.tsx).
 * The longer brand paragraphs and focus-area pills that used to sit inside
 * this hero now render in their own section on the page below, so the
 * hero itself stays to a name, a strapline and one statement image like
 * every other hero on the site. */
export function BrandDetailHero({
  brand,
}: {
  brand: { name: string; strap: string; seed: string; photo: string };
}) {
  return (
    <PageHero
      image={brand.photo}
      alt={brand.name}
      eyebrow="Clady Group brand"
      heading={brand.name}
      subheading={brand.strap}
      compact
    />
  );
}
