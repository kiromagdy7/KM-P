import type { ReactNode } from "react";
import { Alexandria, IBM_Plex_Sans_Arabic } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { SiteDocument } from "@/components/site-shell";
import { baseMetadata, siteViewport } from "@/lib/seo";
import "../globals.css";

// Root layout for the Arabic pages ("/ar", "/ar/work", ...): right-to-left,
// with Arabic typefaces. Geist has no Arabic letters, so headings use
// Alexandria and running text uses IBM Plex Sans Arabic. Both are downloaded
// at build time and served from this site, never from Google.
//
// `preload: false` matters: the build lists every font for every page, so
// preloading these would make the English pages download Arabic fonts they
// never show. Without it, a browser fetches them only when Arabic text is on
// the page, and `adjustFontFallback` sizes the stand-in font to avoid a jump.

const display = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-arabic-display",
  display: "swap",
  preload: false,
});

const body = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-arabic-body",
  display: "swap",
  preload: false,
});

export const metadata = baseMetadata("ar");
export const viewport = siteViewport;

export default function ArabicLayout({ children }: { children: ReactNode }) {
  return (
    <SiteDocument locale="ar" fontClassName={`${GeistSans.variable} ${GeistMono.variable} ${display.variable} ${body.variable}`}>
      {children}
    </SiteDocument>
  );
}
