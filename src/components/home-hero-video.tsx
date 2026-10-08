"use client";

import { Container, CTAButton, AccentRule } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { useReducedMotion } from "motion/react";

/**
 * Hero concept B: a true full-bleed video hero - edge to edge, reaching the
 * very top of the page, with the transparent header (see site-header.tsx)
 * floating over it rather than a solid cream bar pushing it down. Built
 * after client feedback that the previous split layout (text column +
 * contained video panel) was "letting those beneath it down" - this is
 * what she asked to see instead: the video filling the whole width, under
 * the navigation.
 *
 * The video still runs at a wide landscape crop (object-cover) rather than
 * its native aspect ratio, since a full-bleed hero can't preserve an exact
 * ratio the way a contained panel could - the lower-third captions baked
 * into the source are far enough down that they're cropped out at typical
 * hero heights, same as how video-company-story.mp4 already gets cropped
 * in other full-bleed treatments on the site.
 */
export function HomeHeroVideo() {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate h-[90vh] min-h-[560px] w-full overflow-hidden bg-green-900 sm:min-h-[640px]">
      {reduce ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/photo-video-poster.jpg"
          alt="A still from Clady Group's company story video, showing the Buxton manufacturing site"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/photo-video-poster.jpg"
          aria-label="Clady Group company story - roasting, blending, packing and dispatch across our manufacturing sites"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video-hero-full.webm" type="video/webm" />
          <source src="/video-hero-full.mp4" type="video/mp4" />
        </video>
      )}

      {/* Darkens the video enough for the overlaid header/text to stay
          legible on any frame, heaviest at the very top (under the nav)
          and bottom (behind the text block), lightest through the middle
          where the footage itself is the point. */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/15 to-green-900/50" />

      <div className="absolute inset-x-0 bottom-0">
        <Container>
          <Reveal className="max-w-xl pb-14 sm:pb-20">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-500/90">
              Clady Group
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] text-cream-100 sm:text-6xl">
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
        </Container>
      </div>
    </section>
  );
}
