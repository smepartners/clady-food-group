import { PageHero } from "@/components/page-hero";

/** CSR's opening hero - same full-bleed photography treatment as the rest
 * of the site (see page-hero.tsx).
 *
 * Nov 2026: subtext/image are optional props, driven by Sanity's
 * csrPage.hero (see page.tsx). */
export function CsrHero({
  subheading = "At Clady Group, we believe responsible business is about making the right decisions for our people, our customers, our partners and the communities in which we operate.",
  image = "/photo-csr-sourcing.jpg",
}: {
  subheading?: string;
  image?: string;
}) {
  return (
    <PageHero
      image={image}
      alt="Responsible sourcing at Clady Group"
      heading={
        <>
          Doing business <em className="italic text-gold-500">responsibly</em>
        </>
      }
      subheading={subheading}
    />
  );
}
