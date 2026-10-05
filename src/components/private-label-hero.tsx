import { PageHero } from "@/components/page-hero";

/** Private Label's opening hero - full-bleed photography (see
 * page-hero.tsx). This is the page most likely to be read by a procurement
 * contact sizing Clady up for a white label programme, so it carries the
 * strongest CTA of any secondary-page hero. The scale stats that used to
 * render inside this hero now live in their own "manufacturing capability"
 * band on the page instead, next to supporting photography - the same
 * move the homepage made (see page.tsx), for the same reason: none of the
 * reference sites (abf.co.uk, pg.co.uk, unilever.co.uk) put stats in the
 * hero itself. */
export function PrivateLabelHero() {
  return (
    <PageHero
      image="/photo-production-packing.jpg"
      alt="The packing and labelling line at Clady Group's Buxton site"
      heading={
        <>
          Your brand. <em className="italic text-gold-500">Our expertise.</em>
        </>
      }
      subheading="From concept to finished product, Clady Group provides private label beverage solutions designed around your requirements."
      cta={{ href: "/contact", label: "Talk to us about private label" }}
    />
  );
}
