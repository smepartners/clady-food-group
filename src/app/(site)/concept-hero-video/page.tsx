import { HomeHeroVideo } from "@/components/home-hero-video";

/**
 * Internal, unlinked preview of the alternative "full video" hero concept
 * (see home-hero-video.tsx) - not part of the live site nav, just a URL
 * to compare this concept against the masonry grid on the real homepage
 * without swapping anything there. Delete once a direction is chosen, or
 * leave it as a standing place to compare future hero concepts.
 */
export default function HeroVideoConceptPage() {
  return (
    <div>
      <div className="bg-ink px-4 py-2 text-center text-xs font-medium uppercase tracking-wide text-cream-100/70">
        Hero concept preview - full video, split layout - not the live homepage
      </div>
      <HomeHeroVideo />
    </div>
  );
}
