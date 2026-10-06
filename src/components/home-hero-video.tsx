"use client";

import { Container, CTAButton, AccentRule, TextureOverlay } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { useReducedMotion } from "motion/react";

/**
 * Hero concept B: the full company-story video, split alongside the
 * headline/CTA text - content on the left, video on the right, the same
 * split arrangement the masonry hero (`home-hero.tsx`, the site's live
 * hero) uses, so the two concepts are a fair side-by-side comparison
 * rather than two unrelated layouts.
 *
 * The video runs at its native aspect ratio (848/478) inside its own
 * column rather than full-bleed, so nothing is cropped and the lower-
 * third captions stay intact - muted, looping, autoplaying, same as
 * every other background clip on the site. See public/PHOTO-CREDITS.md
 * for `video-hero-full.mp4/.webm`.
 */
export function HomeHeroVideo() {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden bg-green-900">
      <TextureOverlay />
      <Container>
        {/* 5/7 split rather than an even 50/50 - the video is the point of
            this concept, so it gets the larger column and dominates the
            section instead of sitting alongside the text as an equal,
            modestly-sized panel. */}
        <div className="relative grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
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

          <Reveal delay={0.1} className="lg:col-span-7">
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
