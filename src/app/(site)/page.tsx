import { Section, Container, CTAButton, TextureOverlay } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { HomeHeroVideo } from "@/components/home-hero-video";
import { ParallaxBand } from "@/components/parallax-band";
import { BrandCarousel } from "@/components/brand-carousel";
import { ValuesDarkBand } from "@/components/values-section";
import { CapabilitiesVideoPanel } from "@/components/capabilities-video-panel";
import { getHomePageContent, getHomeValuePillars } from "@/lib/home-page-data";

// Nov 2026: subtext, CTA labels, body paragraphs, the manufacturing band's
// copy/photo and the "What drives us" values now come from Sanity
// (homePage + valuePillar documents), with the file's own previous
// hardcoded copy kept as the fallback inside home-page-data.ts. Headings
// that mix plain and emphasised text (the <em> splits below) stay
// hardcoded JSX rather than Sanity string fields - see the comment on
// HomeHeroVideo for why.
export default async function HomePage() {
  const [content, values] = await Promise.all([getHomePageContent(), getHomeValuePillars()]);
  return (
    <>
      {/* George (Oct 2026): drop the live review toggles for both the hero
          and values sections - video hero and the dark-band values concept
          are the confirmed picks, so the switcher pills (dev/review-only
          UI, never meant to ship) come out and these render directly. */}
      <HomeHeroVideo
        eyebrow={content.hero.eyebrow}
        subtext={content.hero.subtext}
        ctaLabel={content.hero.ctaLabel}
      />

      {/* Light/beige, not dark green - with the hero already dark green,
          opening straight into another dark-green block here read as more
          of the same rather than a new moment. Text leads on the left and
          the visual follows on the right, with square rather than rounded
          corners, per the previous round of client feedback.

          The visual slot carries its own second video (CapabilitiesVideoPanel)
          - originally the same clip as the hero, since the client's first
          upload was confirmed for both spots, but now a dedicated brand
          animation supplied separately (Oct 2026), so the hero and this
          panel show two different clips rather than the same one twice.

          Round 5 feedback: the box was locked to its own aspect ratio
          (aspect-[4/5] / aspect-[16/11]), independent of how tall the text
          column happened to be, which is what was leaving a band of cream
          background below it. `items-stretch` + `h-full` on the box makes
          it match the text column's own height instead, so the two
          columns line up top and bottom with no leftover gap. */}
{!content.capabilityBand.hidden && (
      <Section className="bg-cream-200/40">
        <div className="relative grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          <Reveal className="lg:col-span-5 lg:pt-4">
            <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">
              One group. <em className="italic text-gold-700">Multiple capabilities.</em>
            </h2>
            <div className="mt-5 space-y-4 text-ink-soft">
              {content.capabilityBand.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <CapabilitiesVideoPanel />
          </Reveal>
        </div>
      </Section>
      )}

      {/* Moved above the brand carousel - this is the group's second
          "capability" moment (its own eyebrow says as much), and grouping
          it with the "One group, multiple capabilities" band above means a
          visitor reads the whole capability story before moving on to the
          brand portfolio, rather than capability/brands/capability
          alternating. */}
{!content.manufacturingBand.hidden && (
      <ParallaxBand
        image={content.manufacturingBand.image ?? "/photo-production-packing.jpg"}
        alt="The packing and labelling line at Clady Group's Buxton site"
        eyebrow={content.manufacturingBand.eyebrow ?? "Our capability"}
        heading={content.manufacturingBand.heading ?? "Real manufacturing scale, behind every brand."}
        body={content.manufacturingBand.body}
      />
      )}

      {/* Bigger, more deliberate moment than a quiet grid at the bottom of
          a photo section: its own full band, horizontally scrollable with
          press-the-arrows navigation, matching how pg.co.uk's own "Our
          Brands" carousel works rather than the static BrandGrid used for
          smaller brand mentions elsewhere on the site. */}
      <Section className="relative overflow-hidden bg-green-900">
        <TextureOverlay texture="/texture-leather-gold.jpg" watermark="/logo-icon-watermark-gold.png" />
        <div className="relative">
          <BrandCarousel />
        </div>
      </Section>

      {/* Four built concepts, switchable live via the fixed pill (bottom
          left) - see values-section.tsx for the rationale. Replaces the
          original five-equal-card grid, which read as disconnected from
          the bolder full-bleed sections around it. */}
      <ValuesDarkBand values={values} />

      {/* Full width rather than a contained rounded card, per client
          feedback - matches the brand carousel band above it as an
          edge-to-edge dark green moment instead of a card floating with
          cream margins either side. */}
{!content.closingBand.hidden && (
      <section className="relative overflow-hidden bg-green-700 py-14 text-center sm:py-20">
        <TextureOverlay />
        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-olive-400/15 blur-3xl" />
        <Reveal className="relative">
          <Container>
            <h2 className="mx-auto max-w-2xl text-2xl font-semibold text-cream-100 sm:text-3xl">
              {content.closingBand.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream-100/80">{content.closingBand.body}</p>
            <div className="mt-8 flex justify-center">
              <CTAButton href="/contact" tone="inverted">
                {content.closingBand.ctaLabel}
              </CTAButton>
            </div>
          </Container>
        </Reveal>
      </section>
      )}
    </>
  );
}
