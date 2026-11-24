import { PageHero } from "@/components/page-hero";

/** White Label Coffee's opening hero - same full-bleed photography
 * pattern as every other secondary page (see page-hero.tsx). subtext/
 * image/CTA label are driven by Sanity's whiteLabelCoffeePage.hero (see
 * page.tsx), same convention as PrivateLabelHero. */
export function WhiteLabelCoffeeHero({
  subheading = "From a proven blend to something entirely your own, our roastery handles every stage so you can put a product on shelf or behind the counter that carries your name.",
  image = "/photo-roastery-floor.jpg",
  ctaLabel = "Talk to us about white label coffee",
}: {
  subheading?: string;
  image?: string;
  ctaLabel?: string;
}) {
  return (
    <PageHero
      image={image}
      alt="Coffee roasting at Clady Group's production facility"
      heading={
        <>
          White label coffee — <em className="italic text-gold-500">your blend,</em> roasted by us.
        </>
      }
      subheading={subheading}
      cta={{ href: "/contact", label: ctaLabel }}
    />
  );
}
