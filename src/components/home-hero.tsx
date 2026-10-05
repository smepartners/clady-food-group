import { Container, CTAButton, AccentRule, TextureOverlay } from "@/components/ui";
import { Reveal } from "@/components/reveal";

/**
 * Split text/video homepage hero - the client's own company-story video
 * plays muted and on loop behind a simple statement on the left, in the
 * same split arrangement unilever.co.uk uses for its own homepage hero
 * (headline + CTA on one side, motion on the other), but square-cornered
 * rather than Unilever's heavily rounded/pill-shaped image mask - that
 * shape reads as a very specific, borrowed visual signature rather than
 * this site's own, so the video panel uses the same moderate rounding
 * (`rounded-2xl`) as every other photo frame on the site instead.
 *
 * `photo-product-range.jpg` - the real product-range photography the
 * client brought to the Oct 2026 design review (see
 * public/PHOTO-CREDITS.md) - is the video's poster frame: it covers the
 * instant before the video can start playing and any browser/device that
 * declines autoplay, so the product shot the client specifically asked to
 * see "at the top of the page" is still what a visitor sees there either
 * way.
 */
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

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-green-900 sm:aspect-square lg:aspect-[4/5]">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/photo-product-range.jpg"
                aria-label="The Clady Group company story"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src="/video-company-story.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
