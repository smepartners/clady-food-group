"use client";

import { useReducedMotion } from "motion/react";
import { TextureOverlay } from "@/components/ui";

/**
 * The visual half of "One group, multiple capabilities" (home/page.tsx).
 * Reuses the same shortened corporate video as the hero (home-hero-video.tsx)
 * rather than a second, separate graphic clip - the client confirmed
 * (Oct 2026) the upload was meant for both spots, not just the hero.
 * Muted/looping/autoplaying, same as the hero treatment, with the same
 * reduced-motion fallback to a static poster frame.
 */
export function CapabilitiesVideoPanel() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex aspect-[4/5] min-h-[22rem] items-center justify-center overflow-hidden bg-green-900 lg:aspect-auto lg:h-full">
      <TextureOverlay texture="/texture-leather-green.jpg" />
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
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video-hero-full.webm" type="video/webm" />
          <source src="/video-hero-full.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
