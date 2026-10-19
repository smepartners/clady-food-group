"use client";

import { useReducedMotion } from "motion/react";
import { TextureOverlay } from "@/components/ui";

/**
 * The visual half of "One group, multiple capabilities" (home/page.tsx).
 *
 * Previously reused the same shortened corporate video as the hero
 * (home-hero-video.tsx) - the client had confirmed (Oct 2026) that upload
 * was meant for both spots. A dedicated second clip has since been
 * supplied (CFG_Website_Animation.mp4, Oct 2026): a silent brand
 * animation - leather-texture title cards, the Buxton/Belfast manufacturing
 * map, a "100s of specialist and private label" stat card, closing on the
 * full logo lockup - so the hero and this panel no longer show the
 * identical clip. Still muted/looping/autoplaying, with the same
 * reduced-motion fallback to a static poster frame pulled from this clip's
 * own closing logo-lockup beat.
 *
 * This was briefly disabled (SHOW_VIDEO = false, George, Oct 2026) because
 * the original clip's manufacturing-map beat had "Galway" labelled on the
 * map graphic - visible in the poster frame even with video off, which
 * wasn't wanted once Galway was removed elsewhere on the site. Fixed by
 * swapping in the client's updated clip (CFG_Website_Animation_2_Sites.mp4,
 * Oct 2026), whose map beat shows only Buxton and Belfast, and re-grabbing
 * the poster from its closing logo-lockup frame (19.5s in) rather than the
 * map beat, so video is back on.
 *
 * object-contain, not object-cover (George, Oct 2026): the clip is
 * type-led - title cards, map labels, the logo lockup - rather than an
 * ambient background shot, and its 1400x1080 frame doesn't match this
 * panel's own aspect ratio at most breakpoints (aspect-[4/5] on mobile
 * in particular). object-cover was cropping text off both edges (e.g.
 * "Clady Food Group" clipped to "lady Food Grou"). object-contain
 * letterboxes instead, which reads fine here since the clip's own
 * background is the same leather texture as this panel's.
 */
const SHOW_VIDEO = true;

export function CapabilitiesVideoPanel() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex aspect-[4/5] min-h-[22rem] items-center justify-center overflow-hidden bg-green-900 lg:aspect-auto lg:h-full">
      <TextureOverlay texture="/texture-leather-green.jpg" />
      {!SHOW_VIDEO || reduce ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/photo-video-capabilities-poster.jpg"
          alt="The Clady Food Group logo and strapline on a leather texture background"
          className="absolute inset-0 h-full w-full object-contain"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/photo-video-capabilities-poster.jpg"
          aria-label="Clady Group brand animation - our manufacturing footprint across Buxton and Belfast, and the scale of what we produce"
          className="absolute inset-0 h-full w-full object-contain"
        >
          <source src="/video-capabilities.webm" type="video/webm" />
          <source src="/video-capabilities.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
