import type { ReactNode } from "react";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode();
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      {/* Nov 2026: only rendered inside the Studio's Presentation tool
          preview (or after visiting /api/draft-mode/enable directly) -
          draws the click-to-edit overlay and keeps the preview live as
          fields change. Never present on the real, published site. */}
      {isDraftMode ? (
        <VisualEditing />
      ) : null}
    </>
  );
}
