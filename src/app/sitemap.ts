import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { BRANDS } from "@/lib/brands";
import { getFlexiblePageSlugs } from "@/lib/flexible-page-data";

// Now that the site is live at cladyfoodgroup.com (George, Oct 2026), this
// lists every real page under the real domain. Static routes are listed
// directly; /brands/[slug] is generated from the same BRANDS list that
// drives generateStaticParams for that route (src/app/(site)/brands/
// [slug]/page.tsx), so a brand added or removed there (e.g. Galway Roast's
// removal) is reflected here automatically rather than needing its own
// edit. /studio (Sanity admin) and /api (contact-form endpoint) are
// excluded - see the matching note in robots.ts.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/about", "/private-label", "/private-label/coffee", "/csr", "/brands", "/contact"];

  const flexibleSlugs = await getFlexiblePageSlugs();

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
    })),
    ...BRANDS.map((b) => ({
      url: `${SITE_URL}/brands/${b.slug}`,
      lastModified: new Date(),
    })),
    ...flexibleSlugs.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
