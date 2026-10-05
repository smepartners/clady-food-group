import { Container, CTAButton, AccentRule, TextureOverlay } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { HeroMasonry, type MasonryTile } from "@/components/hero-masonry";

/**
 * Split text/image hero - a statement on the left, a grid of real shots
 * from around the business on the right, in the same split arrangement
 * unilever.co.uk uses for its own homepage hero (headline + CTA on one
 * side, imagery on the other).
 *
 * The company-story video (`video-company-story.mp4`, used in full on the
 * About page) doesn't work here on its own: it's landscape and has lower-
 * third captions burned in, so cropping it into a single portrait hero
 * panel either distorts it or chops the captions in half. A grid of
 * several real shots solves that outright - no single frame has to be
 * cropped to fit - and six different shots of the business read as a far
 * bigger operation than one looping clip. Three of the six are frame grabs
 * pulled from clean, caption-free moments in that same video (roasting
 * beans, the roaster and storage tanks, a packing robot arm); the rest are
 * the client's own site photography. See public/PHOTO-CREDITS.md.
 */
const HERO_TILES: MasonryTile[] = [
  {
    src: "/photo-roastery-floor.jpg",
    alt: "The roasting floor at Clady Group's Buxton manufacturing site",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/photo-site-aerial.jpg",
    alt: "Aerial view of the Clady Group manufacturing site in Buxton",
    span: "col-span-2 row-span-1",
  },
  {
    src: "/photo-video-still-roasting-beans.jpg",
    alt: "Coffee beans mid-roast on the production line",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/photo-video-still-robotic-arm.jpg",
    alt: "A robotic packing arm on the production line",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/photo-video-still-roaster-tanks.jpg",
    alt: "The roaster and storage tanks at Clady Group's Buxton site",
    span: "col-span-2 row-span-1",
  },
  {
    src: "/photo-production-casepacker.jpg",
    alt: "Case packing on Clady Group's production line",
    span: "col-span-2 row-span-1",
  },
];

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-green-900">
      <TextureOverlay />
      <Container>
        <div className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-500/90">
              Clady Group
            </p>
            <h1 className="mt-4 max-w-lg text-4xl font-semibold leading-[1.05] text-cream-100 sm:text-6xl">
              Built around <em className="italic text-gold-500">your business.</em>
            </h1>
            <AccentRule className="mt-7" />
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-cream-100/85">
              A group of specialist food, confectionery and beverage brands and
              capabilities, delivering quality, choice and flexibility to
              customers across B2B and B2C markets.
            </p>
            <div className="mt-10">
              <CTAButton href="/brands" tone="inverted">
                Explore our brands
              </CTAButton>
            </div>
          </Reveal>

          <HeroMasonry tiles={HERO_TILES} />
        </div>
      </Container>
    </section>
  );
}
