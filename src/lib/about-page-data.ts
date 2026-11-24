import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { ABOUT_PAGE_QUERY, ACCREDITATIONS_QUERY } from "@/sanity/lib/queries";
import type { Accreditation } from "@/components/accreditation";

export type AboutPageContent = {
  hero: { subtext?: string; image?: string; ctaLabel?: string };
  portfolioSection: { paragraphs?: string[]; hidden?: boolean };
  heritageSection: { paragraphs?: string[]; hidden?: boolean };
  howWeWorkSection: { paragraphs?: string[]; hidden?: boolean };
};

const FALLBACK: AboutPageContent = {
  hero: {
    subtext:
      "Clady Group is the parent company behind a growing portfolio of specialist food and drink businesses, bringing together complementary brands, capabilities and expertise.",
    image: "/photo-about-team.jpg",
    ctaLabel: "Explore our brands",
  },
  portfolioSection: {
    paragraphs: [
      "Established in 2014 through Slumberjack, the group has developed from its family-business roots into a broader platform serving customers across branded and private label markets.",
      "Our portfolio spans coffee, tea, hot chocolate, functional beverages, wellness products, soluble drinks and beverage ingredients. Each business has its own identity and area of expertise, giving our customers access to a broader range of products, capabilities and commercial opportunities.",
    ],
  },
  heritageSection: {
    paragraphs: [
      "From the beginning, our focus has been on building lasting relationships and creating products that deliver for our customers. As the group has grown, we have retained that approach while developing a broader portfolio and greater capability across the food and drink sector.",
      "Our ambition is to continue growing a group of specialist brands that can respond to changing markets while maintaining the personal approach and commercial focus that have shaped our business from the outset.",
    ],
  },
  howWeWorkSection: {
    paragraphs: [
      "We combine the scale and breadth of an ambitious and capable group with the responsiveness of a family business.",
      "Our customers operate in fast-moving markets, where quality, reliability and the ability to respond quickly matter. We take a practical, collaborative approach, working closely with customers and partners to understand their requirements, identify opportunities and deliver solutions that work commercially.",
      "We stay close to changing consumer tastes and market trends, while maintaining a consistent focus on quality and service.",
    ],
  },
};

type SanityAboutPageDoc = {
  hero?: { subtext?: string; image?: unknown; ctaLabel?: string };
  portfolioSection?: AboutPageContent["portfolioSection"];
  heritageSection?: AboutPageContent["heritageSection"];
  howWeWorkSection?: AboutPageContent["howWeWorkSection"];
};

export async function getAboutPageContent(): Promise<AboutPageContent> {
  try {
    const doc = await client.fetch<SanityAboutPageDoc | null>(ABOUT_PAGE_QUERY);
    if (doc) {
      return {
        hero: {
          ...FALLBACK.hero,
          ...doc.hero,
          image: doc.hero?.image ? urlForImage(doc.hero.image).width(1800).url() : FALLBACK.hero.image,
        },
        portfolioSection: { ...FALLBACK.portfolioSection, ...doc.portfolioSection },
        heritageSection: { ...FALLBACK.heritageSection, ...doc.heritageSection },
        howWeWorkSection: { ...FALLBACK.howWeWorkSection, ...doc.howWeWorkSection },
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
