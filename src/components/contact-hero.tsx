import { PageHero } from "@/components/page-hero";

/** Contact's opening hero - full-bleed statement treatment (see
 * page-hero.tsx), same as every other page. The form, brand grid and
 * direct-email line that used to be crammed into this hero as a two-column
 * boxed layout now live in their own section on the page below (see
 * contact/page.tsx), giving the page actual structure instead of being a
 * single hero-shaped block.
 *
 * Nov 2026: subtext is an optional prop, driven by Sanity's
 * contactPage.hero (see page.tsx). */
export function ContactHero({
  subheading = "Whether you're exploring a private label opportunity or want to know more about one of our brands, we'd like to hear from you.",
}: {
  subheading?: string;
}) {
  return (
    <PageHero
      image="/photo-home-hero.jpg"
      alt="Pallets of finished product ready for despatch at a Clady Group manufacturing site"
      heading={
        <>
          Talk to <em className="italic text-gold-500">us</em>
        </>
      }
      subheading={subheading}
      compact
    />
  );
}
