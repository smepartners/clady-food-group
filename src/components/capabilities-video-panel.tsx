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
 * animation - leather-texture title cards, the Buxton/Belfast/Galway
 * manufacturing map, a "100s of specialist and private label" stat
 * card, closing on the full logo lockup - so the hero and this panel no
 * longer show the identical clip. Still muted/looping/autoplaying, same
 * as before, with the same reduced-motion fallback to a static poster
 * frame (now one pulled from this clip's own manufacturing-map beat,
 * rather than the hero's factory-floor poster).
 *
 * SHOW_VIDEO temporarily false (George, Oct 2026) - same hold as the hero
 * video (home-hero-video.tsx): falling back to the static poster frame
 * here too until video is switched back on sitewide. Flip back to true
 * once resolved.
 */
const SHOW_VIDEO = false;

export function CapabilitiesVideoPanel() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex aspect-[4/5] min-h-[22rem] items-center justify-center overflow-hidden bg-green-900 lg:aspect-auto lg:h-full">
      <TextureOverlay texture="/texture-leather-green.jpg" />
      {!SHOW_VIDEO || reduce ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/photo-video-capabilities-poster.jpg"
          alt="An animated map of Clady Group's manufacturing sites in Buxton, Belfast and Galway"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/photo-video-capabilities-poster.jpg"
          aria-label="Clady Group brand animation - our manufacturing footprint across Buxton, Belfast and Galway, and the scale of what we produce"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video-capabilities.webm" type="video/webm" />
          <source src="/video-capabilities.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
