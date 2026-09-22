import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteThemeProvider, SiteStyleToggle } from "@/components/site-theme";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <SiteThemeProvider>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <SiteStyleToggle />
    </SiteThemeProvider>
  );
}
