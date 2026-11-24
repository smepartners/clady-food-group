import { createClient, type QueryParams } from "next-sanity";
import { draftMode } from "next/headers";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // `false` while developing so content updates show without a CDN cache
  // delay; flip to `true` once the site is live and stable.
  useCdn: false,
});

// Nov 2026 (George: "make sanity show preview of pages before saving") -
// the same write token already used by the migration scripts, reused here
// to read unpublished drafts for live preview. A dedicated read-only
// viewer token would be the tidier long-term setup (see the Presentation
// tool/draft-mode route comments), but this works today without adding a
// second secret to .env.local.
const token = process.env.SANITY_API_WRITE_TOKEN;

/**
 * Every page's data fetcher calls this instead of `client.fetch` directly.
 * Outside the Studio's Presentation tool this behaves exactly like
 * `client.fetch` - published content only, no CDN. When draft mode is on
 * (set by visiting /api/draft-mode/enable, which the Presentation tool's
 * preview iframe does automatically), it instead reads the `drafts`
 * perspective with a token, so an editor sees their unpublished edits
 * update live as they type, before hitting Publish.
 */
export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {}
): Promise<T> {
  const { isEnabled } = await draftMode();
  if (isEnabled) {
    if (!token) {
      throw new Error(
        "SANITY_API_WRITE_TOKEN is required to preview drafts - set it in .env.local (and in Vercel's project env vars for the preview to work there too)."
      );
    }
    return client
      .withConfig({ token, perspective: "drafts", useCdn: false })
      .fetch<T>(query, params, { stega: true });
  }
  return client.fetch<T>(query, params);
}
