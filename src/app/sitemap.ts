import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { BRANDS } from "@/lib/brands";

// Now that the site is live at cladyfoodgroup.com (George, Oct 2026), this
// lists every real page under the real domain. Static routes are listed
// directly; /brands/[slug] is generated from the same BRANDS list that
// drives generateStaticParams for that route (src/app/(site)/brands/
// [slug]/page.tsx), so a brand added or removed there (e.g. Galway Roast's
// removal) is reflected here automatically rather than needing its own
// edit. /studio (Sanity admin) and /api (contact-form endpoint) are
// excluded - see the matching note in robots.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/private-label", "/csr", "/brands", "/contact"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
    })),
    ...BRANDS.map((b) => ({
      url: `${SITE_URL}/brands/${b.slug}`,
      lastModified: new Date(),
    })),
  ];
}
