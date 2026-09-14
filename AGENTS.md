<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Clady Group site - project notes

See PRD.md, ARCHITECTURE.md, TASKS.md, DECISIONS.md for full context.

## Commands
- `npm run dev` - local dev server (also serves Sanity Studio at /studio)
- `npm run build` - production build
- `npm run lint` - ESLint

## Current state
Static copy on all 9 routes (approved content from the source doc), Sanity
schemas/Studio scaffolded but not yet fetched from - no Sanity project
exists yet. `[PENDING]` badges mark every open content gap. Full detail in
ARCHITECTURE.md.
