"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "@phosphor-icons/react/dist/ssr";
import { Section, TextureOverlay } from "@/components/ui";
import { Reveal } from "@/components/reveal";

/**
 * Split text/video band - the client's own company-story video (shot on
 * site at Buxton, featuring group leadership) sits on one side as a
 * click-to-play clip rather than a full-bleed background. The client
 * supplied this alongside the Oct 2026 photography drop (see
 * public/PHOTO-CREDITS.md), but the source is 848x478 - fine for a
 * contained player, too soft to stretch full-width the way the page
 * heroes do. Click-to-play (not autoplay) keeps the band from forcing
 * motion/audio on a visitor who hasn't asked for it; the poster frame is a
 * still pulled from the video itself so the "cover" look matches what
 * plays beneath it.
 */
export function VideoStorySection() {
  const [playing, setPlaying] = useState(false);

  return (
    <Section className="relative overflow-hidden bg-green-700">
      <TextureOverlay />
      <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="text-2xl font-semibold text-cream-100 sm:text-3xl">
            Hear it <em className="italic text-gold-500">from us.</em>
          </h2>
          <div className="mt-5 space-y-4 text-cream-100/75">
            <p>
              A short look at Clady Group, in the words of the people who run
              it - our roots as a family business, how the group has grown,
              and what we&apos;re building toward next.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-green-900">
            {playing ? (
              <video
                src="/video-company-story.mp4"
                poster="/photo-video-poster.jpg"
                controls
                autoPlay
                playsInline
                className="h-full w-full object-cover"
              >
                Your browser does not support embedded video.
              </video>
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play the Clady Group company story video"
                className="group absolute inset-0 h-full w-full"
              >
                <Image
                  src="/photo-video-poster.jpg"
                  alt="Still from the Clady Group company story video"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-green-900/25 transition duration-300 group-hover:bg-green-900/35" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-100/95 text-green-700 shadow-lg transition duration-300 group-hover:scale-110">
                    <Play size={26} weight="fill" className="translate-x-0.5" />
                  </span>
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
