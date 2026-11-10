import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { SiteDocument } from "@/components/site-shell";
import { baseMetadata, siteViewport } from "@/lib/seo";
import "../globals.css";

// Root layout for the English pages ("/", "/work", ...).
// The Arabic pages have their own in src/app/(ar)/layout.tsx.

export const metadata = baseMetadata("en");
export const viewport = siteViewport;

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <SiteDocument locale="en" fontClassName={`${GeistSans.variable} ${GeistMono.variable}`}>
      {children}
    </SiteDocument>
  );
}
