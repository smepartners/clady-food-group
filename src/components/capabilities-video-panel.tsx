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
 * "Clady Food Group" clipped to "lady Food Grou").
 *
 * object-contain avoids that, but on its own just trades cropped text for
 * flat letterbox bars either side whenever the panel's shape and the
 * clip's shape disagree - and on desktop they usually do, since this panel
 * deliberately stretches to match the text column's own height (see the
 * items-stretch/h-full note above) rather than keeping a fixed aspect
 * ratio, so its rendered shape varies. George flagged those bars (Oct
 * 2026) as looking broken. Fixed with a second copy of the poster behind
 * the contained foreground - scaled up, blurred and dimmed with
 * object-cover so it fills the panel completely - so any letterbox space
 * reads as a soft continuation of the same image rather than a flat bar.
 * Deliberately always the static poster (not a second video), even while
 * the foreground video plays: it's blurred enough that the two beats never
 * being in sync is not noticeable, and it avoids running the clip twice.
 *
 * Nov 2026 (George & Zoe Regroup call - "there's the gap right and left...
 * we change our container size... the div needs to be contained"): at
 * desktop this box was letting `lg:aspect-auto lg:h-full` stretch it to
 * match the text column's own height with no ceiling, so on wider/shorter
 * viewports it could end up far taller and squarer than the clip's actual
 * 1400x1080 (~4:3) shape - object-contain then pillarboxed hard left/
 * right, and even with the blurred fill behind it, the seam between the
 * sharp foreground and the soft background read as a visible gap/frame
 * rather than a deliberate crop.
 *
 * Fixed by giving the box a fixed aspect ratio at desktop too
 * (`lg:aspect-[4/3]`, close to the clip's own ~1.3:1) instead of
 * stretch-to-row-height, and capping how wide it can get
 * (`lg:max-w-[46rem]`) so that ratio can't be pushed back out by a very
 * wide column. The parent grid now centers the row instead of stretching
 * it (see page.tsx's capabilityBand - `lg:items-center`), so any leftover
 * vertical space next to a shorter panel shows as the section's own
 * cream background rather than inside this green box.
 */
const SHOW_VIDEO = true;

export function CapabilitiesVideoPanel() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto flex w-full aspect-[4/5] min-h-[22rem] items-center justify-center overflow-hidden bg-green-900 lg:aspect-[4/3] lg:h-auto lg:min-h-0 lg:max-w-[46rem]">
      <TextureOverlay texture="/texture-leather-green.jpg" />

      {/* Blurred fill - see the object-contain note above. Decorative only. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/photo-video-capabilities-poster.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-70 blur-2xl"
      />

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
