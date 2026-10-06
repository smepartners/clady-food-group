# Photography, video & logo credits

## Real Clady Group media (Oct 2026)

Real client-supplied photography, video and brand logo marks, sourced from
the client's own "Images and Video" folder and swapped in to replace the
placeholder stock photography below (Build Plan §06 open question 04 -
now resolved for every slot a real asset was supplied for). Frame grabs
pulled from `video-company-story.mp4` are noted as such.

| File | Used for | Source |
| --- | --- | --- |
| photo-product-range.jpg | Home hero (`HomeHero`) | Client-supplied product photography |
| photo-roastery-floor.jpg | Home manufacturing band (`clady-manufacturing-northern-ireland`) | Client-supplied site photography, Buxton |
| photo-roastery-detail.jpg | About manufacturing band (`clady-about-manufacturing`) | Client-supplied site photography, Buxton |
| photo-production-packing.jpg | Private Label hero; Private Label showcase lead tile | Client-supplied site photography, Buxton |
| photo-production-casepacker.jpg | Private Label manufacturing band (`clady-private-label-manufacturing`) | Client-supplied site photography, Buxton |
| photo-video-poster.jpg | Video story section poster; also the Home hero video concept's poster | Frame grab, `video-company-story.mp4` |
| photo-video-still-roastery-floor.jpg | Poster frame for `clip-roastery-floor.mp4` | Frame grab, `video-company-story.mp4` (00:28.1) |
| photo-site-aerial.jpg | Poster frame for `clip-site-aerial.mp4` | Frame grab, `video-company-story.mp4` (00:10.1) |
| photo-video-still-roasting-beans.jpg | Poster frame for `clip-roasting-beans.mp4` | Frame grab, `video-company-story.mp4` (00:56.0) |
| photo-video-still-robotic-arm.jpg | Poster frame for `clip-robotic-arm.mp4` | Frame grab, `video-company-story.mp4` (01:36.7) |
| photo-video-still-roaster-tanks.jpg | Poster frame for `clip-roaster-tanks.mp4` | Frame grab, `video-company-story.mp4` (01:12) |
| photo-video-still-casepacking.jpg | Poster frame for `clip-casepacking.mp4` | Frame grab, `video-company-story.mp4` (01:41.1) |
| clip-roastery-floor.mp4 / .webm | Home hero grid concept (`HomeHero`, via the hero toggle) | Clip, `video-company-story.mp4` (00:28.1-00:29.6), slowed ~1.9x, forward/reverse loop, silent, h264 + vp9, 5.4s |
| clip-site-aerial.mp4 / .webm | Home hero grid concept (`HomeHero`, via the hero toggle) | Clip, `video-company-story.mp4` (00:10.1-00:11.9), slowed ~1.9x, forward/reverse loop, silent, h264 + vp9, 6.5s |
| clip-roasting-beans.mp4 / .webm | Home hero grid concept (`HomeHero`, via the hero toggle) | Clip, `video-company-story.mp4` (00:56.0-00:57.5), slowed ~1.9x, forward/reverse loop, silent, h264 + vp9, 5.4s |
| clip-robotic-arm.mp4 / .webm | Home hero grid concept (`HomeHero`, via the hero toggle) | Clip, `video-company-story.mp4` (01:36.7-01:39.7), slowed 1.5x, forward/reverse loop, silent, h264 + vp9, 8.8s |
| clip-roaster-tanks.mp4 / .webm | Home hero grid concept (`HomeHero`, via the hero toggle) | Clip, `video-company-story.mp4` (01:12-01:17), forward/reverse loop (not slowed - already the longest source window), silent, h264 + vp9, 10s |
| clip-casepacking.mp4 / .webm | Home hero grid concept (`HomeHero`, via the hero toggle) | Clip, `video-company-story.mp4` (01:41.1-01:43.4), slowed 1.8x, forward/reverse loop, silent, h264 + vp9, 8s, overhead case-packing line |
| video-hero-full.mp4 / .webm | Home hero video concept (`HomeHeroVideo`, via the hero toggle) - the full company-story video, muted/looping, landscape, uncropped | `video-company-story.mp4` re-encoded without its audio track (muted here anyway), h264 + vp9, same 848x478 frame, full 170s length |
| video-company-story.mp4 | About page video story section (`VideoStorySection`) | Client-supplied company story video, re-encoded for web (34MB source → 19.6MB, h264 crf26 + aac96k, native 848x478 resolution kept) |
| logo-evolving-state.png | Evolving State brand mark (brand grid, brand index, brand detail hero) | Client-supplied logo artwork |
| logo-galway-roast.png | Galway Roast brand mark (brand grid, brand index, brand detail hero) | Client-supplied logo artwork |
| logo-dutch-maid.png | Dutch Maid brand mark (brand grid, brand index, brand detail hero) | Client-supplied logo artwork |
| logo-slumberjack.svg | Slumberjack brand mark (brand grid, brand index, brand detail hero) | Client-supplied logo artwork |

## Orphaned stock (no longer referenced)

These stock files are no longer used anywhere in the codebase now that
real photography has replaced them in every slot they filled. Left in
`public/` rather than deleted, in case either is wanted again for a future
page; safe to delete in a later cleanup pass.

- `photo-home-manufacturing.jpg` - previously the Home manufacturing band image, replaced by `photo-roastery-floor.jpg`.
- `photo-private-label-bottling.jpg` - previously the Private Label hero and showcase lead tile, replaced by `photo-production-packing.jpg`.

## Home hero: two concepts, one toggle

The Home hero has two interchangeable treatments, both built and both
live - `HeroSwitcher` renders one or the other and gives the client a
"Grid"/"Video" pill (bottom-right of the page) to flip between them for
review, rather than us swapping code each time:

- **Grid** (`home-hero.tsx`, the default) - a 4x3 masonry grid of six
  real, silent, looping clips (see the `clip-*.mp4/.webm` rows above),
  each a forward/reverse "boomerang" loop, several slowed ~1.5-1.9x so
  the loop reads as long enough to register rather than a flicker.
- **Video** (`home-hero-video.tsx`) - the full company-story video
  (`video-hero-full.mp4/.webm`, see above), landscape and uncropped,
  split alongside the text with the video column taking the larger share
  (7/12) for impact.

## Remaining stock photography

Still placeholder, sourced under free licences (Unsplash License / Pexels
License - no attribution required, but credited here for the record)
while real Clady Group photography for these slots is pending. Swap out
once supplied - see the `seed` prop on each `ImageFrame` call site to find
where each one is used.

| File | Used for | Source | Photographer |
| --- | --- | --- | --- |
| photo-home-hero.jpg | Contact hero | Unsplash | photo-1710141530542 |
| photo-csr-sourcing.jpg | CSR hero (`clady-csr-responsible-sourcing`) | Pexels #30717831 | 1500m Coffee |
| photo-about-team.jpg | About hero | Unsplash | photo-1758873269276 |
| photo-about-heritage.jpg | About heritage band (`clady-family-business-heritage`) | Unsplash | photo-1758599543152 |
| photo-brand-evolving-state.jpg | Evolving State brand imagery | Pexels #17890560 | Lisa Fotios |
| photo-brand-galway-roast.jpg | Galway Roast brand imagery | Unsplash | photo-1753837787691 |
| photo-brand-dutch-maid.jpg | Dutch Maid brand imagery | Unsplash | photo-1629248990514 |
| photo-brand-slumberjack.jpg | Slumberjack brand imagery | Unsplash | photo-1619860703338 |
