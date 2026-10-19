import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Now that the site is live at cladyfoodgroup.com (George, Oct 2026), this
// points crawlers at the real sitemap and the real host instead of nothing.
// /studio is the Sanity Studio admin UI (see AGENTS.md "Current state") and
// /api is the contact-form endpoint - neither is content for search
// engines, so both are disallowed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
