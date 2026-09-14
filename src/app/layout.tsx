import type { Metadata } from "next";
import { Poppins } from "next/font/google";
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
        {children}
      </body>
    </html>
  );
}
