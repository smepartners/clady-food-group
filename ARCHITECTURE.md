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

**What's wired to fetch live:** every page now fetches from Sanity -
Home, About, Private Label, CSR, Contact and the brand detail page, plus
the sitewide footer (contact details + manufacturing sites, via
`siteSettings`/`facility`). Each page has its own small data-access file
under `src/lib/` (`home-page-data.ts`, `about-page-data.ts`,
`private-label-page-data.ts`, `csr-page-data.ts`, `brands-data.ts`,
`site-settings-data.ts`) that fetches the matching query, maps any
Sanity image refs through `urlForImage`, and falls back to the site's
original hardcoded copy if Sanity is ever unreachable or a document is
missing - so a Sanity outage degrades to the old static site rather than
a broken page. Verified in dev across all of them (confirmed via Sanity
CDN image URLs and live seeded copy appearing in each page's HTML).

Headings that mix plain and emphasised text (an inline `<em>` splitting
a headline, e.g. "Built around *your business.*") deliberately stay as
hardcoded JSX rather than Sanity fields - representing that in GROQ/
portable text would need a bigger schema change (marks within a string),
and a stylised headline like this isn't really day-to-day copy a client
edits anyway. Subtext, body paragraphs, CTA labels, images and repeatable
cards (stats, pillars, categories, accreditations, values) are all live.

**Still hardcoded by design:** the main header nav (`site-header.tsx` is
a client component for the mobile menu, so wiring it would need the nav
links threaded through the layout as props - nav structure changes rarely
enough that this wasn't worth doing yet) and the `/brands` index page
(it intentionally carries its own slightly different `focus`/strap copy
per brand from the brand detail pages - see its own comment - so pointing
it at the same `brand` documents would risk silently merging two
deliberately-separate copy sets). The `aboutPage.manufacturingSection`
schema field also has nothing to wire to - no manufacturing image band
currently exists in the real About page design (the photo it would have
used, `photo-roastery-detail.jpg`, isn't referenced anywhere in the
current page) - leave it unused or remove it in a later cleanup pass.

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
