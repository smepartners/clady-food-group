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
 * ambient background shot, and object-cover was cropping text off both
 * edges (e.g. "Clady Food Group" clipped to "lady Food Grou").
 *
 * Nov 2026 (George & Zoe Regroup call - "there's the gap right and left...
 * we change our container size... the div needs to be contained... the
 * div needs to be the same"): this box used to stretch to match the text
 * column's own height (`lg:aspect-auto lg:h-full`) or sit at a generic
 * aspect-[4/5] card shape on mobile, neither matching the clip's actual
 * 1400x1080 frame - object-contain then pillarboxed left/right (or
 * letterboxed top/bottom), and even with an earlier attempt at a blurred
 * fill behind the contained foreground to disguise it, the seam between
 * the sharp video and the soft background still read as a visible gap/
 * frame around it rather than a deliberate crop - exactly what George and
 * Zoe flagged on the call.
 *
 * Fixed properly this time: the box's own aspect-ratio is now set to the
 * clip's exact frame (`aspect-[1400/1080]`), at every breakpoint, not an
 * approximation or a height-driven stretch. With the container's shape
 * identical to the video's own, object-contain has nothing left to pad -
 * the video fills the box edge to edge with no letterbox/pillarbox at
 * all, so the blurred-fill trick from the previous round is no longer
 * needed and has been removed. `lg:max-w-[46rem]` just keeps the panel
 * from growing oversized on very wide columns; the parent grid centers
 * the row (page.tsx's capabilityBand - `lg:items-center`) so any
 * difference between this panel's height and the text column's shows as
 * the section's own cream background, never as empty space inside this
 * green box.
 */
const SHOW_VIDEO = true;

export function CapabilitiesVideoPanel() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto flex w-full aspect-[1400/1080] items-center justify-center overflow-hidden bg-green-900 lg:max-w-[46rem]">
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
