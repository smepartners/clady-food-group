"use client";

import { Container, CTAButton, AccentRule, TextureOverlay } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { useReducedMotion } from "motion/react";

/**
 * Headline/CTA up top, then the company-story video in full underneath -
 * landscape, at its native aspect ratio, so nothing is cropped and the
 * lower-third captions stay intact (the problem with the earlier attempt
 * at putting this video in the hero, which squeezed it into a portrait
 * panel). Replaces the multi-shot masonry grid this hero used before: the
 * individual clip crops read as a bigger operation, but were too short to
 * register as anything more than a flicker - the single continuous video,
 * run at its real length and muted/looping, reads as real footage of the
 * business rather than a stock-style showreel. `video-hero-full.mp4/.webm`
 * is the same source as the About page's video story section
 * (`video-company-story.mp4`), re-encoded without its audio track since
 * it's muted here anyway - see public/PHOTO-CREDITS.md.
 */
export function HomeHero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden bg-green-900">
      <TextureOverlay />
      <Container>
        <div className="relative py-16 sm:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-500/90">
              Clady Group
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] text-cream-100 sm:text-6xl">
              Built around <em className="italic text-gold-500">your business.</em>
            </h1>
            <AccentRule className="mx-auto mt-7" />
            <p className="mx-auto mt-7 max-w-lg text-lg leading-relaxed text-cream-100/85">
              A group of specialist food, confectionery and beverage brands and
              capabilities, delivering quality, choice and flexibility to
              customers across B2B and B2C markets.
            </p>
            <div className="mt-10 flex justify-center">
              <CTAButton href="/brands" tone="inverted">
                Explore our brands
              </CTAButton>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative mt-14 sm:mt-16">
            <div className="relative aspect-[848/478] overflow-hidden rounded-2xl shadow-2xl shadow-green-900/40 sm:rounded-3xl">
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
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
