import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { FlexibleBlocks } from "@/components/flexible-blocks";
import { getFlexiblePageBySlug, getFlexiblePageSlugs } from "@/lib/flexible-page-data";

// Catch-all for client-built pages (schemaTypes/flexiblePage.ts) - every
// hand-coded page (about, csr, contact, brands, private-label and its
// /coffee child) is its own static route above this one in the folder
// tree, and Next.js always matches a static segment ahead of a dynamic
// one at the same level, so none of those collide with this route even
// though they also live directly under (site).
export async function generateStaticParams() {
  const slugs = await getFlexiblePageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getFlexiblePageBySlug(slug);
  if (!page) return {};
  return { title: page.title, description: page.seoDescription };
}

export default async function FlexiblePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getFlexiblePageBySlug(slug);
  if (!page) notFound();

  return (
    <>
      <PageHero
        image={page.hero.image ?? "/photo-production-packing.jpg"}
        alt={page.hero.heading}
        heading={page.hero.heading}
        subheading={page.hero.subtext}
        cta={page.hero.ctaLabel && page.hero.ctaHref ? { href: page.hero.ctaHref, label: page.hero.ctaLabel } : undefined}
      />
      <FlexibleBlocks blocks={page.sections} />
    </>
  );
}
