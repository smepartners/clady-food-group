import Image from "next/image";
import { InstagramLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";

/**
 * Instagram content, per brand page only (not a cross-site highlight -
 * tried that on Home/About/Private Label and it was asked to come back
 * off, Oct 2026: just the brand's own page, not a group-wide feature).
 *
 * There's no API access wired up yet - a live, auto-updating feed needs a
 * widget account (SnapWidget/Elfsight) that only George can create, since
 * account signup isn't something this build process does on a client's
 * behalf. So for now every brand with a confirmed Instagram handle gets a
 * styled "follow" teaser instead of a scraped feed - just a link out to the
 * real profile, not actual pulled-in posts. Once a widget embed code
 * exists for a brand, set its `instagramWidgetId` below and swap the
 * teaser card for the live SnapWidget iframe in `BrandInstagramSection`.
 *
 * Confirmed handles (Round 6 social links, George, Oct 2026):
 * - Evolving State: instagram.com/evolvingstate
 * - Galway Roast: instagram.com/galwayroastcoffee
 * Slumberjack and Dutch Maid don't have a confirmed handle yet - both are
 * left out of INSTAGRAM_BRANDS until one is supplied, same pattern as the
 * "coming soon" treatment Dutch Maid already gets for its website.
 */
export const INSTAGRAM_BRANDS = [
  {
    slug: "evolving-state",
    name: "Evolving State",
    handle: "evolvingstate",
    url: "https://www.instagram.com/evolvingstate/",
    photo: "/photo-evolving-state-products.avif",
    logo: "/logo-evolving-state.png",
    /** Set once a SnapWidget (or similar) widget exists for this handle. */
    instagramWidgetId: undefined as string | undefined,
  },
  {
    slug: "galway-roast",
    name: "Galway Roast",
    handle: "galwayroastcoffee",
    url: "https://www.instagram.com/galwayroastcoffee/",
    photo: "/photo-galway-roast-products.jpg",
    logo: "/logo-galway-roast.png",
    instagramWidgetId: undefined as string | undefined,
  },
] as const;

/** A single brand's photo-backed "follow" card - one product shot, the
 * brand mark, the @handle and a link out to the real profile. Used both on
 * that brand's own page and in the cross-site highlight grid. */
function InstagramFollowCard({
  brand,
}: {
  brand: (typeof INSTAGRAM_BRANDS)[number];
}) {
  return (
    <a
      href={brand.url}
      target="_blank"
      rel="noreferrer"
      className="group relative block aspect-square overflow-hidden rounded-xl bg-cream-200"
    >
      <Image
        src={brand.photo}
        alt={`${brand.name} on Instagram`}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/10 to-transparent transition duration-300 group-hover:from-green-900/90" />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4">
        <span className="flex items-center gap-1.5 text-sm font-medium text-cream-100">
          <InstagramLogo size={18} weight="bold" />@{brand.handle}
        </span>
        <ArrowUpRight
          size={16}
          weight="bold"
          className="text-cream-100 opacity-0 transition duration-300 group-hover:opacity-100"
        />
      </div>
    </a>
  );
}

/** For an individual brand page: renders a live SnapWidget feed once that
 * brand has an `instagramWidgetId`, otherwise a single follow teaser.
 * Renders nothing for a brand with no confirmed handle at all. */
export function BrandInstagramSection({ slug }: { slug: string }) {
  const brand = INSTAGRAM_BRANDS.find((b) => b.slug === slug);
  if (!brand) return null;

  return (
    <div>
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-olive-600">
          On Instagram
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
          Follow {brand.name}
        </h2>
      </Reveal>
      <Reveal delay={0.1} className="mt-8">
        {brand.instagramWidgetId ? (
          <iframe
            src={`https://snapwidget.com/embed/${brand.instagramWidgetId}`}
            className="h-[520px] w-full border-0"
            title={`${brand.name} Instagram feed`}
          />
        ) : (
          <div className="max-w-sm">
            <InstagramFollowCard brand={brand} />
          </div>
        )}
      </Reveal>
    </div>
  );
}
