import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Camera, FacebookLogo, InstagramLogo, TiktokLogo, LinkedinLogo, Globe } from "@phosphor-icons/react/dist/ssr";
import { Section, Pill, CTAButton, TextureOverlay } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { BrandDetailHero } from "@/components/brand-detail-hero";
import { BrandCarousel } from "@/components/brand-carousel";
import { BrandInstagramSection } from "@/components/instagram-feed";

type Brand = {
  name: string;
  strap: string;
  focus: string;
  paragraphs: string[];
  seed: string;
  photo: string;
  logo: string;
  /** A real product-range photo to sit beside the overview copy. Evolving
   * State, Dutch Maid and Slumberjack all have one supplied now
   * (rounds 5-6). */
  productsImage?: string;
  productsImageAlt?: string;
  /** Round 6 (Zoe, via George): real social/website links supplied for
   * Evolving State and Slumberjack. Dutch Maid's weren't supplied this
   * round, so it keeps the websiteComingSoon line below rather than
   * linking to a guessed URL. */
  social?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    linkedin?: string;
  };
  /** True for Dutch Maid only - the other three brands now have a
   * social/website row (see `social` above). */
  websiteComingSoon?: boolean;
  /** A third-party certification tied to this specific site/entity rather
   * than held group-wide (see ACCREDITATIONS in about/page.tsx for the
   * group-wide ones). Slumberjack only for now - see the note above its
   * entry below. */
  certification?: {
    logo: string;
    logoAlt: string;
    body: string;
  };
};

// TODO: once the Sanity project is provisioned, replace this map with a
// fetch against BRAND_BY_SLUG_QUERY (src/sanity/lib/queries.ts). Kept static
// for now since there's nothing to gain from wiring a CMS that has no
// content in it yet. Sub-brand logo marks (Build Plan §06, open question
// 04) are no longer pending - see `logo` below and public/PHOTO-CREDITS.md.
//
// Round 5 feedback (Zoe, via George): B2B/B2C tags removed from every
// brand's focus line (Slumberjack's "Hot chocolate" tag dropped too, per
// her note); each page gets a product-range image slot and a "get in
// touch" button.
// Round 6 (Zoe, via George): real social/website links and real product
// range photography supplied for Evolving State and Slumberjack; Dutch
// Maid got its real product photo but no social links this round, so it
// keeps the "website coming soon" line.
// Galway Roast removed from the group portfolio (George, Oct 2026) - its
// entry here is gone, so /brands/galway-roast now 404s via notFound()
// below rather than being a reachable page. See lib/brands.ts.
const BRANDS: Record<string, Brand> = {
  "evolving-state": {
    name: "Evolving State",
    strap: "Everyday wellness made easy.",
    focus: "Functional drinks · Supplements · Natural wellness · Performance",
    seed: "clady-evolving-state-wellness",
    photo: "/photo-brand-evolving-state.jpg",
    logo: "/logo-evolving-state.png",
    productsImage: "/photo-evolving-state-products.avif",
    productsImageAlt: "The Evolving State product range",
    social: {
      website: "https://evolvingstate.co",
      facebook: "https://www.facebook.com/profile.php?id=61590720360603",
      instagram: "https://www.instagram.com/evolvingstate/",
      tiktok: "https://www.tiktok.com/@evolving.state",
    },
    paragraphs: [
      "Evolving State is focused on natural and functional products designed to enhance everyday health and wellbeing.",
      "Its portfolio spans functional drinks, supplements, natural wellness and performance, bringing together products that fit naturally into modern lifestyles.",
    ],
  },
  "dutch-maid": {
    name: "Dutch Maid",
    strap: "Convenience made simple.",
    focus:
      "Instant coffee · Hot chocolate · Milk & whitener · Cappuccino topping · Soluble ingredients · Private label",
    seed: "clady-dutch-maid-soluble",
    photo: "/photo-brand-dutch-maid.jpg",
    logo: "/logo-dutch-maid.png",
    productsImage: "/photo-dutch-maid-products.png",
    productsImageAlt: "The Dutch Maid product range",
    websiteComingSoon: true,
    paragraphs: [
      "Dutch Maid brings ease, convenience and on-trend flavours together in a versatile range of soluble drinks and ingredients.",
      "As a private label manufacturer, Dutch Maid supplies premium soluble beverage solutions across a wide range of industries and channels, including vending, catering and foodservice, retail, wholesale and food manufacturing.",
      "The portfolio includes instant coffee, hot chocolate powder, granulated milk, whitener, cappuccino topping and more.",
    ],
  },
  slumberjack: {
    name: "Slumberjack",
    strap: "Our signature beverage brand.",
    focus: "Coffee · Tea · Private label",
    seed: "clady-slumberjack-coffee",
    photo: "/photo-brand-slumberjack.jpg",
    logo: "/logo-slumberjack.svg",
    productsImage: "/photo-slumberjack-products.webp",
    productsImageAlt: "The Slumberjack product range",
    social: {
      website: "https://www.slumberjackcoffee.com/",
      linkedin: "https://www.linkedin.com/company/slumberjack-coffee/posts/",
    },
    // BRCGS Start (Basic) certification, confirmed by the client (Oct
    // 2026) - tied to the Slumberjack Coffee site specifically, not the
    // group as a whole, so it's shown here rather than in the group-wide
    // ACCREDITATIONS list on /about. Per BRCGS's own usage requirements:
    // the official, unaltered logo, shown with the company name
    // ("Slumberjack Coffee", matching the certificate) on this page only,
    // with the scope stated accurately (roasted/ground coffee and instant
    // powder drink blends - not the wider Slumberjack product range).
    certification: {
      logo: "/logo-brcgs-start.png",
      logoAlt: "BRCGS Start certification mark",
      body: "Slumberjack Coffee is BRCGS Start certified (Basic level) for roasted and ground coffee and instant powder drink blends.",
    },
    paragraphs: [
      "Our signature beverage brand. Slumberjack is the brand from which the Clady Group story began.",
      "Established in 2014, Slumberjack has grown from its family-business roots to offer a broad range of high-quality hot and cold beverage products.",
      "The range spans coffee, tea and hot chocolate, with products designed to serve the needs of customers across different channels and applications.",
      "Slumberjack continues to be guided by three simple principles: remain a family business, stay close to the latest taste trends, and offer breadth and variety across formats, flavours and price points.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(BRANDS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = BRANDS[slug];
  return { title: brand?.name ?? "Brand" };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = BRANDS[slug];
  if (!brand) notFound();

  return (
    <>
      <BrandDetailHero brand={brand} slug={slug} />

      {/* Round 5 feedback: overview copy now sits beside a product-range
          image instead of running full-width alone, and closes with a
          "get in touch" CTA. The image is a real supplied photo where
          Zoe's provided one (Evolving State so far) and the standard
          "photography pending" placeholder everywhere else, ready to swap
          in once the rest are supplied. */}
      <Section pad="pt-14 sm:pt-20 pb-10 sm:pb-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="max-w-2xl space-y-4 text-ink-soft">
              {brand.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <ul className="mt-8 flex flex-wrap gap-2 border-t border-cream-200 pt-6">
              {brand.focus.split("·").map((f) => (
                <li key={f}>
                  <Pill>{f.trim()}</Pill>
                </li>
              ))}
            </ul>
            {brand.social ? (
              <ul className="mt-6 flex flex-wrap items-center gap-3">
                {brand.social.website ? (
                  <li>
                    <a
                      href={brand.social.website}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${brand.name} website`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 text-green-700 transition duration-300 hover:-translate-y-0.5 hover:border-green-700 hover:bg-green-700 hover:text-cream-100"
                    >
                      <Globe size={18} weight="bold" />
                    </a>
                  </li>
                ) : null}
                {brand.social.facebook ? (
                  <li>
                    <a
                      href={brand.social.facebook}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${brand.name} on Facebook`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 text-green-700 transition duration-300 hover:-translate-y-0.5 hover:border-green-700 hover:bg-green-700 hover:text-cream-100"
                    >
                      <FacebookLogo size={18} weight="bold" />
                    </a>
                  </li>
                ) : null}
                {brand.social.instagram ? (
                  <li>
                    <a
                      href={brand.social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${brand.name} on Instagram`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 text-green-700 transition duration-300 hover:-translate-y-0.5 hover:border-green-700 hover:bg-green-700 hover:text-cream-100"
                    >
                      <InstagramLogo size={18} weight="bold" />
                    </a>
                  </li>
                ) : null}
                {brand.social.tiktok ? (
                  <li>
                    <a
                      href={brand.social.tiktok}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${brand.name} on TikTok`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 text-green-700 transition duration-300 hover:-translate-y-0.5 hover:border-green-700 hover:bg-green-700 hover:text-cream-100"
                    >
                      <TiktokLogo size={18} weight="bold" />
                    </a>
                  </li>
                ) : null}
                {brand.social.linkedin ? (
                  <li>
                    <a
                      href={brand.social.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${brand.name} on LinkedIn`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 text-green-700 transition duration-300 hover:-translate-y-0.5 hover:border-green-700 hover:bg-green-700 hover:text-cream-100"
                    >
                      <LinkedinLogo size={18} weight="bold" />
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : null}
            {brand.websiteComingSoon ? (
              <p className="mt-6 text-sm font-medium uppercase tracking-wide text-olive-600">
                Website coming soon
              </p>
            ) : null}
            {brand.certification ? (
              <div className="mt-8 flex items-center gap-4 border-t border-cream-200 pt-6">
                <div className="relative h-10 w-32 shrink-0">
                  <Image
                    src={brand.certification.logo}
                    alt={brand.certification.logoAlt}
                    fill
                    sizes="128px"
                    className="object-contain object-left"
                  />
                </div>
                <p className="text-sm leading-relaxed text-ink-soft">{brand.certification.body}</p>
              </div>
            ) : null}
            <div className="mt-8">
              <CTAButton href="/contact">Get in touch about {brand.name}</CTAButton>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            {brand.productsImage ? (
              // Round 7 feedback: "can the frame be square/images set to
              // fit please? It's clipping parts of the images" - object-cover
              // in a 4/5 box was cropping the supplied product shots.
              // Square frame + object-contain shows the whole image, with
              // the cream background filling any letterboxing.
              <div className="relative aspect-square overflow-hidden bg-cream-200">
                <Image
                  src={brand.productsImage}
                  alt={brand.productsImageAlt ?? `The ${brand.name} product range`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="relative flex aspect-square items-center justify-center overflow-hidden border border-cream-200 bg-gradient-to-br from-green-700/25 via-gold-500/20 to-olive-400/25">
                <div className="flex flex-col items-center gap-2 px-6 text-center text-green-700/60">
                  <Camera size={28} weight="light" />
                  <p className="text-xs font-medium uppercase tracking-wide">
                    Product range photography pending
                  </p>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </Section>

      {/* Instagram: a follow teaser/post grid for brands with a confirmed
          handle (just Evolving State for now). Round 7 asked for less gap
          above this and a light background so it reads clearly as its own
          section rather than floating against the overview block above.
          BrandInstagramSection itself renders nothing for a brand with no
          confirmed handle, so no extra guard is needed here. */}
      <Section pad="pt-10 pb-10 sm:pt-14 sm:pb-14" className="bg-cream-200/40">
        <BrandInstagramSection slug={slug} />
      </Section>

      {/* Round 5 feedback: swapped the static BrandGrid for the same
          carousel used on the homepage's "Our brands" band, so this
          closing section reads as the identical brand-portfolio moment
          wherever it appears on the site rather than a smaller, separate
          treatment. */}
      <Section className="relative overflow-hidden bg-green-900">
        <TextureOverlay texture="/texture-leather-gold.jpg" watermark="/logo-icon-watermark-gold.png" />
        <div className="relative">
          <BrandCarousel />
        </div>
      </Section>
    </>
  );
}
