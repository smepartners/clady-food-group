import { sanityFetch } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY, FACILITIES_QUERY } from "@/sanity/lib/queries";
import { FACILITIES as STATIC_FACILITIES } from "@/lib/facilities";

// Nov 2026: live Sanity data for the sitewide footer, with the same
// static-fallback pattern as brands-data.ts - the footer renders on every
// page, so it should never go blank just because Sanity is briefly
// unreachable.

export type SiteContactDetails = { email?: string; phone?: string; address?: string };

export async function getContactDetails(): Promise<SiteContactDetails> {
  try {
    const settings = await sanityFetch<{ contactDetails?: SiteContactDetails } | null>(
      SITE_SETTINGS_QUERY
    );
    if (settings?.contactDetails) return settings.contactDetails;
  } catch {
    // fall through
  }
  return { email: "sales@cladyfoodgroup.com", phone: "028 9442 9555" };
}

export async function getFacilities(): Promise<{ name: string; region: string }[]> {
  try {
    const facilities = await sanityFetch<{ name: string; region: string }[]>(FACILITIES_QUERY);
    if (facilities?.length) return facilities;
  } catch {
    // fall through
  }
  return [...STATIC_FACILITIES];
}
