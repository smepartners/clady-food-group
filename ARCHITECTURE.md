# Architecture

Next.js 16 (App Router) + Tailwind v4 + Sanity, on Vercel.

```
src/
  app/
    (site)/            marketing pages - share SiteHeader/SiteFooter via layout.tsx
      page.tsx          /
      about/page.tsx     /about
      brands/
        page.tsx          /brands
        [slug]/page.tsx   /brands/evolving-state etc.
      private-label/page.tsx
      csr/page.tsx
      contact/page.tsx
    studio/[[...tool]]/page.tsx   embedded Sanity Studio at /studio
    layout.tsx          root layout - fonts only, no header/footer (Studio needs its own chrome)
    globals.css          brand tokens as CSS vars, mapped into Tailwind's @theme
  components/            SiteHeader, SiteFooter, Container/Section/Pending
  sanity/
    schemaTypes/          brand, facility, produceCategory, accreditation,
                           valuePillar, stat, csrInitiative, siteSettings,
                           homePage, aboutPage, privateLabelPage, csrPage, contactPage
    lib/                  client.ts, image.ts, queries.ts (GROQ, via next-sanity's defineQuery)
    env.ts                 reads the three NEXT_PUBLIC_SANITY_* vars
    structure.ts           Studio desk structure (6 singletons pinned at the top)
sanity.config.ts          root-level Studio config, imported by the /studio route
scripts/seed-sanity.ts    one-off script: seeds the current site copy into Sanity as documents
```

## Sanity - live as of Nov 2026 (open question 07, resolved)
The Sanity project now exists (George created it under his own org -
project ID `00ym5yh3`, dataset `production`) and `.env.local` is wired with
real credentials (`NEXT_PUBLIC_SANITY_PROJECT_ID`/`DATASET`/`API_VERSION`
plus a server-only `SANITY_API_WRITE_TOKEN`, Editor permission - see
`.env.example` for the full list). CORS origins are configured on the
Sanity project for localhost and the eventual production domain.

The schema was rebuilt from scratch rather than reused as-is: the original
scaffold (field names like `strapline`/`bodyBlocks`/`focusTags`/
`accentColour`) no longer matched the real site, which had evolved through
many rounds of client feedback since the scaffold was written. Every
schema file now has a comment pointing at the exact page component/array
it mirrors, so the Studio fields line up 1:1 with what's actually live.

Per George's "everything, in one go" + "seed from current copy" answers:
the rebuild covers every page (not just brands), and `scripts/seed-sanity.ts`
has already been run against the real project - all 3 brands, both
facilities, all 4 produce categories, all 3 accreditations, all 5 value
pillars, the 3 group stats, both CSR green credentials, `siteSettings` and
all 5 per-page singletons are live in Sanity right now, with their real
photos/logos uploaded as Sanity image assets (confirmed by fetching the
Slumberjack brand doc back from the API and by loading `/brands/slumberjack`
in dev - its BRCGS certification text and product photo now come from
Sanity, not a hardcoded map).

**What's wired to fetch live, and what isn't yet:** only the brand detail
page (`/brands/[slug]`, via `src/lib/brands-data.ts`) fetches from Sanity
so far, with a same-shaped static fallback in that file if Sanity is ever
unreachable. Every other page (Home, About, Private Label, CSR, Contact,
the `/brands` index, the nav/footer via `siteSettings`) still renders its
original hardcoded copy - the schema, queries and seeded content for all
of them are ready and live in the dataset (see `src/sanity/lib/queries.ts`
for the matching query per page), but the page components themselves
haven't been switched over to call `client.fetch(QUERY)` yet. That's a
mechanical swap now (follow the `brands-data.ts` pattern: fetch, map
Sanity image refs through `urlForImage`, fall back to static content on
error), not new design or schema work - next up.

Re-running `npm run seed:sanity` is safe (every seeded document has a
fixed `_id` and uses `createOrReplace`), but don't run it again once
anyone has made real edits in the Studio - it will overwrite them.

## Brand tokens
Colour and type tokens live in `src/app/globals.css` as CSS custom
properties, pulled from the Clady brand pack (`CladyFoodGroup_v1.pdf`):
`green-700` #32533a (primary), `olive-600` #7c7f3d, `gold-500` #f4bf44,
`cream-100` #f5f4e5. Typeface: Poppins (`next/font/google`), used for both
display and body for now - revisit during the design-direction pass
(Build Plan phase 3) once brand assets are in.
