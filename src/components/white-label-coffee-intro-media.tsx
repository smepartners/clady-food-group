"use client";

import { useReducedMotion } from "motion/react";

/**
 * Intro section media for the White Label Coffee page (page.tsx's
 * introBlock case). Previously a static photo (ImageFrame). Rebuilt Nov
 * 2026 per Zoe's feedback: "shall we change the image to a hopper of
 * moving coffee beans to add some movement to the page?" - rather than
 * commissioning new footage, this reuses clip-roasting-beans.mp4/.webm,
 * real client-supplied footage (a 1.5s window of video-company-story.mp4,
 * slowed and forward/reverse looped - see public/PHOTO-CREDITS.md) that
 * was cut for an earlier "hero grid" concept that's no longer in the
 * codebase, so it's sitting unused. It's roasting beans in motion rather
 * than literally a hopper, but it's the closest real footage available
 * without commissioning anything new.
 *
 * Same aspect/overflow wrapper as ImageFrame so it drops into the same
 * two-column layout without any surrounding layout changes, and the same
 * reduced-motion fallback pattern as capabilities-video-panel.tsx (static
 * poster frame, no animation).
 */
export function IntroRoastingBeansMedia({ aspect = "aspect-[4/3]" }: { aspect?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative overflow-hidden ${aspect}`}>
      {reduce ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/photo-video-still-roasting-beans.jpg"
          alt="Coffee beans in motion during roasting at Clady Group"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/photo-video-still-roasting-beans.jpg"
          aria-label="Coffee beans in motion during roasting at Clady Group"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/clip-roasting-beans.webm" type="video/webm" />
          <source src="/clip-roasting-beans.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
