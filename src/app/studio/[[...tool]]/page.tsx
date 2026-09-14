/**
 * Embedded Sanity Studio, served at /studio.
 * See https://www.sanity.io/docs/embedding-sanity-studio for details.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
