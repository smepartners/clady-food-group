import { sanityFetch } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { BRANDS_QUERY, BRAND_BY_SLUG_QUERY } from "@/sanity/lib/queries";

export type Brand = {
  name: string;
  strap: string;
  focus: string;
  paragraphs: string[];
  seed: string;
  photo: string;
  logo: string;
  productsImage?: string;
  productsImageAlt?: string;
  social?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    linkedin?: string;
  };
  websiteComingSoon?: boolean;
  certification?: {
    logo: string;
    logoAlt: string;
    body: string;
  };
  contactEmail?: string;
  contactPhone?: string;
};

// Static fallback content - the site's original hardcoded copy, kept so
// the live pages keep working (same content as before Sanity was wired
// up) if the Sanity project is briefly unreachable, a document hasn't
// been seeded yet, or env vars aren't set in a given environment. Not
// exported for editing elsewhere; `getBrand`/`getBrands` below are the
// only supported way to read brand content now.
const STATIC_BRANDS: Record<string, Brand> = {
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
    // Zoe, Nov 2026 (George & Zoe Regroup call): Evolving State and
    // Slumberjack both follow <brand>@cladyfoodgroup.com, one word, no
    // hyphens - only Dutch Maid gets its own phone number (Buxton); these
    // two use the group default from Site settings, so no contactPhone
    // override here.
    contactEmail: "evolvingstate@cladyfoodgroup.com",
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
    // George, Nov 2026 (WhatsApp): the group inbox/number was showing on
    // the Dutch Maid journey instead of Dutch Maid's own - these are the
    // real values to show instead.
    contactEmail: "dutchmaid@cladyfoodgroup.com",
    contactPhone: "01298 777617",
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
    certification: {
      logo: "/logo-brcgs-start.png",
      logoAlt: "BRCGS Start certification mark",
      body: "Slumberjack Coffee is BRCGS Start certified (Basic level) for roasted and ground coffee and instant powder drink blends.",
    },
    // Zoe, Nov 2026 (George & Zoe Regroup call) - see the Evolving State
    // comment above.
    contactEmail: "slumberjack@cladyfoodgroup.com",
    paragraphs: [
      "Our signature beverage brand. Slumberjack is the brand from which the Clady Group story began.",
      "Established in 2014, Slumberjack has grown from its family-business roots to offer a broad range of high-quality hot and cold beverage products.",
      "The range spans coffee, tea and hot chocolate, with products designed to serve the needs of customers across different channels and applications.",
      "Slumberjack continues to be guided by three simple principles: remain a family business, stay close to the latest taste trends, and offer breadth and variety across formats, flavours and price points.",
    ],
  },
};

export const STATIC_BRAND_SLUGS = Object.keys(STATIC_BRANDS);

type SanityBrand = {
  name: string;
  slug: string;
  strap?: string;
  focus?: string;
  paragraphs?: string[];
  photo?: unknown;
  logo?: unknown;
  productsImage?: unknown;
  productsImageAlt?: string;
  social?: Brand["social"];
  websiteComingSoon?: boolean;
  certification?: { logo?: unknown; logoAlt?: string; body?: string };
  seed?: string;
  contactEmail?: string;
  contactPhone?: string;
};

function toBrand(doc: SanityBrand): Brand {
  return {
    name: doc.name,
    strap: doc.strap ?? "",
    focus: doc.focus ?? "",
    paragraphs: doc.paragraphs ?? [],
    seed: doc.seed ?? `clady-${doc.slug}`,
    photo: doc.photo ? urlForImage(doc.photo).width(1600).url() : "",
    logo: doc.logo ? urlForImage(doc.logo).width(400).url() : "",
    productsImage: doc.productsImage ? urlForImage(doc.productsImage).width(1200).url() : undefined,
    productsImageAlt: doc.productsImageAlt,
    social: doc.social,
    websiteComingSoon: doc.websiteComingSoon,
    certification: doc.certification?.logo
      ? {
          logo: urlForImage(doc.certification.logo).width(400).url(),
          logoAlt: doc.certification.logoAlt ?? "",
          body: doc.certification.body ?? "",
        }
      : undefined,
    contactEmail: doc.contactEmail,
    contactPhone: doc.contactPhone,
  };
}

/** All brand slugs - used by generateStaticParams. Falls back to the
 * static list if Sanity has nothing seeded yet (e.g. local dev with no
 * env vars configured). */
export async function getBrandSlugs(): Promise<string[]> {
  try {
    const docs = await sanityFetch<{ slug: string }[]>(BRANDS_QUERY);
    if (docs?.length) return docs.map((d) => d.slug);
  } catch {
    // Sanity unreachable/misconfigured - fall through to static list.
  }
  return STATIC_BRAND_SLUGS;
}

/** A single brand by slug, fetched from Sanity with a same-shaped static
 * fallback - see the comment on STATIC_BRANDS above for why. */
export async function getBrand(slug: string): Promise<Brand | undefined> {
  try {
    const doc = await sanityFetch<SanityBrand | null>(BRAND_BY_SLUG_QUERY, { slug });
    if (doc) return toBrand({ ...doc, slug });
  } catch {
    // fall through
  }
  return STATIC_BRANDS[slug];
}
