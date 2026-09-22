import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandDetailHero } from "@/components/brand-detail-hero";

type Brand = {
  name: string;
  strap: string;
  focus: string;
  paragraphs: string[];
  seed: string;
  photo: string;
};

// TODO: once the Sanity project is provisioned, replace this map with a
// fetch against BRAND_BY_SLUG_QUERY (src/sanity/lib/queries.ts). Kept static
// for now since sub-brand logo marks are still pending (Build Plan §06,
// open question 04) and there's nothing to gain from wiring a CMS that
// has no content in it yet.
const BRANDS: Record<string, Brand> = {
  "evolving-state": {
    name: "Evolving State",
    strap: "Everyday wellness made easy.",
    focus: "Functional drinks · Supplements · Natural wellness · Performance",
    seed: "clady-evolving-state-wellness",
    photo: "/photo-brand-evolving-state.jpg",
    paragraphs: [
      "Evolving State is focused on natural and functional products designed to enhance everyday health and wellbeing.",
      "Its portfolio spans functional drinks, supplements, natural wellness and performance, bringing together products that fit naturally into modern lifestyles.",
    ],
  },
  "galway-roast": {
    name: "Galway Roast",
    strap: "Coffee with a taste of Galway.",
    focus: "Coffee · B2B · B2C · Irish heritage",
    seed: "clady-galway-roast-coffee",
    photo: "/photo-brand-galway-roast.jpg",
    paragraphs: [
      "Rooted in place, Galway Roast celebrates Irish heritage, local character and a hint of the Galway coastline in every roast.",
      "The brand brings an authentic sense of Galway to the coffee category, with a focus on quality, flavour and keeping it local.",
      "Serving both B2B and B2C customers, Galway Roast offers a distinctive proposition for customers looking for coffee with a genuine sense of place.",
    ],
  },
  "dutch-maid": {
    name: "Dutch Maid",
    strap: "Convenience made simple.",
    focus:
      "Instant coffee · Hot chocolate · Milk & whitener · Cappuccino topping · Soluble ingredients · Private label",
    seed: "clady-dutch-maid-soluble",
    photo: "/photo-brand-dutch-maid.jpg",
    paragraphs: [
      "Dutch Maid brings ease, convenience and on-trend flavours together in a versatile range of soluble drinks and ingredients.",
      "As a private label manufacturer, Dutch Maid supplies premium soluble beverage solutions across a wide range of industries and channels, including vending, catering and foodservice, retail, wholesale and food manufacturing.",
      "The portfolio includes instant coffee, hot chocolate powder, granulated milk, whitener, cappuccino topping and more.",
    ],
  },
  slumberjack: {
    name: "Slumberjack",
    strap: "Our signature beverage brand.",
    focus: "Coffee · Tea · Hot chocolate · B2B · B2C",
    seed: "clady-slumberjack-coffee",
    photo: "/photo-brand-slumberjack.jpg",
    paragraphs: [
      "Our signature beverage brand. Slumberjack is the brand from which the Clady Group story began.",
      "Established in 2014, Slumberjack has grown from its family-business roots to offer a broad range of high-quality hot and cold beverage products.",
      "The range spans coffee, tea and hot chocolate, with products designed to serve the needs of B2B customers across different channels and applications.",
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

  return <BrandDetailHero brand={brand} />;
}
