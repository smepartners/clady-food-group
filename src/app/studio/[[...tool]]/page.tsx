/**
 * Embedded Sanity Studio, served at /studio.
 * See https://www.sanity.io/docs/embedding-sanity-studio for details.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

// George, Nov 2026 (25th): "also put it on light mode" - Sanity defaults
// to following the OS/browser's own colour scheme preference, so a
// visitor/editor on a dark-mode machine was getting a dark Studio even
// though the live site itself is light. Passing `scheme="light"` pins
// it, which also hides the "Appearance" dropdown in the top-right user
// menu (Sanity's own behaviour once a fixed scheme is set) rather than
// leaving a toggle that would just undo this.
export default function StudioPage() {
  return <NextStudio config={config} scheme="light" />;
}
