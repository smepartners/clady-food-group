import { PageHero } from "@/components/page-hero";

/** Brands index hero - previously text-only with no image slot; now the
 * same full-bleed photography treatment as every other page (see
 * page-hero.tsx), leading with the signature brand's own product
 * photography since the brand cards themselves follow immediately below. */
export function BrandsHero() {
  return (
    <PageHero
      image="/photo-brand-slumberjack.jpg"
      alt="Slumberjack product photography, one of the Clady Group brands"
      heading={
        <>
          A portfolio with <em className="italic text-gold-500">a purpose</em>
        </>
      }
      subheading="Our brands operate across complementary areas of the food and drink market, each with a clear proposition and specialist focus."
    />
  );
}
