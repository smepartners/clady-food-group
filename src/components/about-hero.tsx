import { PageHero } from "@/components/page-hero";

/** About page's opening hero - full-bleed photography matching the
 * homepage's "corporate scale" treatment (see page-hero.tsx). The lede
 * paragraph and "since 2014 / today our portfolio spans..." copy that used
 * to live inside this boxed hero now opens the "At a glance" section on
 * the page instead, alongside the stat row.
 *
 * Nov 2026: subtext/image/CTA label are optional props, driven by
 * Sanity's aboutPage.hero (see page.tsx), defaulting to this original
 * copy. The heading keeps its hardcoded <em> split - see the note on
 * HomeHeroVideo for why headings like this stay out of the schema. */
export function AboutHero({
  subheading = "Clady Group is the parent company behind a growing portfolio of specialist food and drink businesses, bringing together complementary brands, capabilities and expertise.",
  image = "/photo-about-team.jpg",
  ctaLabel = "Explore our brands",
}: {
  subheading?: string;
  image?: string;
  ctaLabel?: string;
}) {
  return (
    <PageHero
      image={image}
      alt="The Clady Group team at work"
      heading={
        <>
          A group built around <em className="italic text-gold-500">beverage expertise</em>
        </>
      }
      subheading={subheading}
      cta={{ href: "/brands", label: ctaLabel }}
    />
  );
}
