import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { ABOUT_PAGE_QUERY, ACCREDITATIONS_QUERY } from "@/sanity/lib/queries";
import type { Accreditation } from "@/components/accreditation";

// Rebuilt Nov 2026 alongside the schema change that moved every page
// section (including the ones that used to be fully hardcoded in
// page.tsx, with no Sanity field at all) into one reorderable
// `sections` array - see the comment on schemaTypes/aboutPage.ts.
export type PortfolioBandSection = { _key: string; _type: "portfolioBand"; hidden?: boolean; paragraphs?: string[] };
export type HeritageBandSection = { _key: string; _type: "heritageBand"; hidden?: boolean; paragraphs?: string[] };
export type VideoStoryBlockSection = { _key: string; _type: "videoStoryBlock"; hidden?: boolean };
export type HowWeWorkBandSection = { _key: string; _type: "howWeWorkBand"; hidden?: boolean; paragraphs?: string[] };
export type SectorsBlockSection = { _key: string; _type: "sectorsBlock"; hidden?: boolean };
export type AccreditationsBlockSection = { _key: string; _type: "accreditationsBlock"; hidden?: boolean };
export type ClosingCtaBlockSection = { _key: string; _type: "closingCtaBlock"; hidden?: boolean };

export type AboutSection =
  | PortfolioBandSection
  | HeritageBandSection
  | VideoStoryBlockSection
  | HowWeWorkBandSection
  | SectorsBlockSection
  | AccreditationsBlockSection
  | ClosingCtaBlockSection;

export type AboutPageContent = {
  hero: { subtext?: string; image?: string; ctaLabel?: string };
  sections: AboutSection[];
};

const FALLBACK: AboutPageContent = {
  hero: {
    subtext:
      "Clady Group is the parent company behind a growing portfolio of specialist food and drink businesses, bringing together complementary brands, capabilities and expertise.",
    image: "/photo-about-team.jpg",
    ctaLabel: "Explore our brands",
  },
  sections: [
    {
      _key: "fallback-portfolio-band",
      _type: "portfolioBand",
      paragraphs: [
        "Established in 2014 through Slumberjack, the group has developed from its family-business roots into a broader platform serving customers across branded and private label markets.",
        "Our portfolio spans coffee, tea, hot chocolate, functional beverages, wellness products, soluble drinks and beverage ingredients. Each business has its own identity and area of expertise, giving our customers access to a broader range of products, capabilities and commercial opportunities.",
      ],
    },
    {
      _key: "fallback-heritage-band",
      _type: "heritageBand",
      paragraphs: [
        "From the beginning, our focus has been on building lasting relationships and creating products that deliver for our customers. As the group has grown, we have retained that approach while developing a broader portfolio and greater capability across the food and drink sector.",
        "Our ambition is to continue growing a group of specialist brands that can respond to changing markets while maintaining the personal approach and commercial focus that have shaped our business from the outset.",
      ],
    },
    { _key: "fallback-video-story", _type: "videoStoryBlock" },
    {
      _key: "fallback-how-we-work-band",
      _type: "howWeWorkBand",
      paragraphs: [
        "We combine the scale and breadth of an ambitious and capable group with the responsiveness of a family business.",
        "Our customers operate in fast-moving markets, where quality, reliability and the ability to respond quickly matter. We take a practical, collaborative approach, working closely with customers and partners to understand their requirements, identify opportunities and deliver solutions that work commercially.",
        "We stay close to changing consumer tastes and market trends, while maintaining a consistent focus on quality and service.",
      ],
    },
    { _key: "fallback-sectors", _type: "sectorsBlock" },
    { _key: "fallback-accreditations", _type: "accreditationsBlock" },
    { _key: "fallback-closing-cta", _type: "closingCtaBlock" },
  ],
};

type RawSection = Record<string, unknown> & { _key: string; _type: string };

type SanityAboutPageDoc = {
  hero?: { subtext?: string; image?: unknown; ctaLabel?: string };
  sections?: RawSection[];
};

export async function getAboutPageContent(): Promise<AboutPageContent> {
  try {
    const doc = await client.fetch<SanityAboutPageDoc | null>(ABOUT_PAGE_QUERY);
    if (doc?.sections?.length) {
      return {
        hero: {
          ...FALLBACK.hero,
          ...doc.hero,
          image: doc.hero?.image ? urlForImage(doc.hero.image).width(1800).url() : FALLBACK.hero.image,
        },
        sections: doc.sections as AboutSection[],
      };
    }
  } catch {
    // fall through
  }
  return FALLBACK;
}

export async function getAccreditations(): Promise<Accreditation[]> {
  try {
    const docs = await client.fetch<{ name: string; note?: string; logo?: unknown }[]>(
      ACCREDITATIONS_QUERY
    );
    if (docs?.length) {
      return docs.map((d) => ({
        name: d.name,
        note: d.note ?? "",
        logo: d.logo ? urlForImage(d.logo).width(400).url() : "",
      }));
    }
  } catch {
    // fall through
  }
  return [];
}
