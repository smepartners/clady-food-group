"use client";

import { useState, type ReactNode } from "react";
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
 *
 * `heading`/`body` are passed in per page rather than hardcoded, so the
 * same video can introduce itself differently depending on where it sits
 * (e.g. a first-visit "see who we are" framing on the homepage vs. a
 * fuller "hear it from us" framing on About, next to the heritage copy).
 *
 * `tone` defaults to the original dark treatment (every existing caller
 * keeps rendering exactly as before). Round 7 feedback on the About page
 * asked for this block on "a white background (no curved border on
 * video)" once it became the 3rd block there - `tone="light"` flips the
 * section and text colours to light-on-dark's opposite and drops the
 * video's rounded corners, without touching any other page that reuses
 * this component.
 */
export function VideoStorySection({
  heading,
  body,
  tone = "dark",
}: {
  heading: ReactNode;
  body: ReactNode;
  tone?: "dark" | "light";
}) {
  const [playing, setPlaying] = useState(false);
  const isLight = tone === "light";

  return (
    <Section
      className={`relative overflow-hidden ${isLight ? "bg-cream-100" : "bg-green-700"}`}
    >
      {isLight ? null : <TextureOverlay />}
      <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2
            className={`text-2xl font-semibold sm:text-3xl ${
              isLight ? "text-green-700" : "text-cream-100"
            }`}
          >
            {heading}
          </h2>
          <div className={`mt-5 space-y-4 ${isLight ? "text-ink-soft" : "text-cream-100/75"}`}>
            {body}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className={`relative aspect-video overflow-hidden bg-green-900 ${
              isLight ? "" : "rounded-2xl"
            }`}
          >
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
