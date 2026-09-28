import { PageHero } from "@/components/page-hero";

/** About page's opening hero - full-bleed photography matching the
 * homepage's "corporate scale" treatment (see page-hero.tsx). The lede
 * paragraph and "since 2014 / today our portfolio spans..." copy that used
 * to live inside this boxed hero now opens the "At a glance" section on
 * the page instead, alongside the stat row. */
export function AboutHero() {
  return (
    <PageHero
      image="/photo-about-team.jpg"
      alt="The Clady Group team at work"
      heading={
        <>
          A group built around <em className="italic text-gold-500">beverage expertise</em>
        </>
      }
      subheading="Clady Group is the parent company behind a growing portfolio of specialist food and drink businesses, bringing together complementary brands, capabilities and expertise."
      cta={{ href: "/brands", label: "Explore our brands" }}
    />
  );
}
