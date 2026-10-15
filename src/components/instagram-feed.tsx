import Image from "next/image";
import { InstagramLogo, ArrowUpRight, Heart } from "@phosphor-icons/react/dist/ssr";
import { Reveal, RevealStagger } from "@/components/reveal";

/**
 * Instagram content, per brand page only (not a cross-site highlight -
 * tried that on Home/About/Private Label and it was asked to come back
 * off, Oct 2026: just the brand's own page, not a group-wide feature).
 *
 * Posts are real, specific photos/reels the client sent over as Instagram
 * links (Oct 2026) - NOT a live auto-updating feed. Why not an inline embed:
 * Instagram's own post pages send `X-Frame-Options: DENY`, which blocks
 * framing from any third-party site outright (confirmed directly - curling
 * a post URL returns that header, and it rendered blank when actually
 * iframed). That rules out both a raw iframe and their official
 * blockquote+embed.js widget, since that widget iframes the same URL under
 * the hood. So each post's real photo and caption were pulled from its
 * public Open Graph tags (the same mechanism Slack/iMessage/Twitter use for
 * link previews - no login, no API key) and the image saved to
 * /public/instagram/. Three tiers, in priority order (BrandInstagramSection):
 * 1. `posts` - the real photo + caption snippet above, each card linking out
 *    to the actual post. Refreshes only when new post URLs are supplied.
 * 2. `instagramWidgetId` - a live, auto-updating feed via a widget provider
 *    (SnapWidget/Elfsight). Needs a free account only George can create,
 *    since account signup isn't something this build process does on a
 *    client's behalf, so this stays unset until one exists.
 * 3. Neither set: a styled "follow" teaser linking out to the profile.
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
    /** Specific posts supplied by the client (Oct 2026) - real photo +
     * caption pulled from each post's public Open Graph tags. */
    posts: [
      {
        url: "https://www.instagram.com/evolvingstate/p/Degp87ARGvm/",
        image: "/instagram/evolving-state-post-1.jpg",
        caption:
          "Spooky season is officially here... Our matcha and latte has got into the Halloween spirit and is looking a little boo-tiful 💚",
      },
      {
        url: "https://www.instagram.com/evolvingstate/p/DeO9TgKiGv2/",
        image: "/instagram/evolving-state-post-2.jpg",
        caption:
          "Have you picked up our matcha lattes in your local TK Maxx? Creamy, smooth and perfect for these cooler days.",
      },
      {
        url: "https://www.instagram.com/evolvingstate/p/DdWWJSjjdpd/",
        image: "/instagram/evolving-state-post-3.jpg",
        caption:
          "A lot goes into our Protein Iced Mocha. Good thing we've got a dedicated team on the job...",
      },
      {
        url: "https://www.instagram.com/evolvingstate/reel/DdGpwoDxNKQ/",
        image: "/instagram/evolving-state-post-4.jpg",
        caption: "POV: You can't decide…",
      },
    ],
  },
  {
    slug: "galway-roast",
    name: "Galway Roast",
    handle: "galwayroastcoffee",
    url: "https://www.instagram.com/galwayroastcoffee/",
    photo: "/photo-galway-roast-products.jpg",
    logo: "/logo-galway-roast.png",
    instagramWidgetId: undefined as string | undefined,
    posts: [
      {
        url: "https://www.instagram.com/galwayroastcoffee/p/DdYTWs3OdAP/",
        image: "/instagram/galway-roast-post-1.jpg",
        caption:
          "☕ BIG NEWS! The Galway Roast Decaf Coffee is available in Lidl stores across Ireland - 100% Irish-crafted decaf, premium flavour, zero caffeine.",
      },
      {
        url: "https://www.instagram.com/galwayroastcoffee/reel/DVO879sjtM5/",
        image: "/instagram/galway-roast-post-2.jpg",
        caption: "#galwayroast #coffeelovers #lidlireland #supportlocal #coffeetime",
      },
      {
        url: "https://www.instagram.com/galwayroastcoffee/reel/DVYP7q6iPXB/",
        image: "/instagram/galway-roast-post-3.jpg",
        caption: "#lidlireland #lidl #supportlocalbrand #coffeelover",
      },
    ],
  },
] as const;

/** A single real post - its downloaded photo, a caption snippet, and a
 * link out to the real post on Instagram. */
function InstagramPostCard({
  post,
  brandName,
}: {
  post: { url: string; image: string; caption: string };
  brandName: string;
}) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden rounded-xl border border-cream-200 bg-cream-100 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/10"
    >
      {/* object-contain rather than object-cover - two of these are reel
          thumbnails (portrait 9:16 / landscape 16:9), not square, and
          cropping them to fill the square cut off part of the shot. The
          cream fill behind shows the letterboxing is intentional rather
          than a stretched/broken image. */}
      <div className="relative aspect-square overflow-hidden bg-cream-200">
        <Image
          src={post.image}
          alt={`${brandName} Instagram post`}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-contain transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <p className="line-clamp-3 text-sm text-ink-soft">{post.caption}</p>
        <ArrowUpRight
          size={16}
          weight="bold"
          className="mt-0.5 shrink-0 text-green-700 opacity-0 transition duration-300 group-hover:opacity-100"
        />
      </div>
    </a>
  );
}

/** A single brand's photo-backed "follow" card - one product shot, the
 * brand mark, the @handle and a link out to the real profile. Fallback for
 * a brand with no `posts` and no live widget yet. */
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

/** For an individual brand page: real post cards when the client has
 * supplied post links, a live SnapWidget feed once that brand has an
 * `instagramWidgetId`, otherwise a single follow teaser. Renders nothing
 * for a brand with no confirmed handle at all. */
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
      {brand.posts.length > 0 ? (
        <RevealStagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {brand.posts.map((post) => (
            <InstagramPostCard key={post.url} post={post} brandName={brand.name} />
          ))}
        </RevealStagger>
      ) : (
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
      )}
      <Reveal delay={0.15} className="mt-6">
        <a
          href={brand.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 transition hover:text-green-900"
        >
          <Heart size={16} weight="bold" />
          Follow @{brand.handle} on Instagram
        </a>
      </Reveal>
    </div>
  );
}
