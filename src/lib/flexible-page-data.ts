import { sanityFetch } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { FLEXIBLE_PAGE_BY_SLUG_QUERY, FLEXIBLE_PAGE_SLUGS_QUERY } from "@/sanity/lib/queries";

export type Tone = "white" | "cream";

export type GridItem = { name?: string; body?: string; icon?: string; tone?: "gold" | "green" | "olive" };
export type StatItem = { value?: string; label?: string };
export type Card = { title?: string; body?: string };

export type FlexibleSection =
  | { _type: "textImageBlock"; _key: string; hidden?: boolean; heading?: string; paragraphs?: string[]; image?: string; imagePosition?: "left" | "right"; tone?: Tone }
  | { _type: "iconGridBlock"; _key: string; hidden?: boolean; heading?: string; tone?: Tone; items?: GridItem[] }
  | { _type: "statsBlock"; _key: string; hidden?: boolean; tone?: Tone; items?: StatItem[] }
  | { _type: "cardsBlock"; _key: string; hidden?: boolean; heading?: string; tone?: Tone; cards?: Card[] }
  | { _type: "pillsBlock"; _key: string; hidden?: boolean; heading?: string; pills?: string[]; note?: string; tone?: Tone }
  | { _type: "texturedCtaBlock"; _key: string; hidden?: boolean; heading?: string; body?: string; ctaLabel?: string; ctaHref?: string; style?: "gold-texture" | "plain" };

export type FlexiblePageContent = {
  title: string;
  seoDescription?: string;
  hero: { heading: string; subtext?: string; image?: string; ctaLabel?: string; ctaHref?: string };
  sections: FlexibleSection[];
};

type SanityFlexibleDoc = {
  title: string;
  seoDescription?: string;
  hero?: { heading?: string; subtext?: string; image?: unknown; ctaLabel?: string; ctaHref?: string };
  sections?: (Record<string, unknown> & { _type: string; _key: string; image?: unknown })[];
};

export async function getFlexiblePageSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityFetch<string[]>(FLEXIBLE_PAGE_SLUGS_QUERY);
    return slugs ?? [];
  } catch {
    return [];
  }
}

export async function getFlexiblePageBySlug(slug: string): Promise<FlexiblePageContent | null> {
  try {
    const doc = await sanityFetch<SanityFlexibleDoc | null>(FLEXIBLE_PAGE_BY_SLUG_QUERY, { slug });
    if (!doc) return null;
    return {
      title: doc.title,
      seoDescription: doc.seoDescription,
      hero: {
        heading: doc.hero?.heading ?? doc.title,
        subtext: doc.hero?.subtext,
        image: doc.hero?.image ? urlForImage(doc.hero.image).width(1800).url() : undefined,
        ctaLabel: doc.hero?.ctaLabel,
        ctaHref: doc.hero?.ctaHref,
      },
      sections: (doc.sections ?? []).map((s) => {
        if (s.image) {
          return { ...s, image: urlForImage(s.image).width(1200).url() } as FlexibleSection;
        }
        return s as unknown as FlexibleSection;
      }),
    };
  } catch {
    return null;
  }
}
