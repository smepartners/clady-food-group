import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Clady Group",
    template: "%s | Clady Group",
  },
  description:
    "Clady Group brings together a portfolio of specialist food, confectionery and beverage brands and capabilities, delivering quality, choice and flexibility to customers across B2B and B2C markets.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream-100 text-ink">
        {/* Google tag (gtag.js) - George's GA4 property (G-2Y1WS4TJBF),
            added site-wide so every page is tracked. Loaded with
            next/script's "afterInteractive" strategy rather than a plain
            <script> in <head>, which is the Next.js-recommended way to load
            third-party analytics: it still loads early (right after the
            page becomes interactive) without blocking initial render/
            hydration. See src/lib/gtag.ts for the event-tracking helper
            used elsewhere (e.g. the contact form reporting submissions). */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
