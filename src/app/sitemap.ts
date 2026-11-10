import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/content/services";
import { absoluteUrl } from "@/content/site";
import { projectSlugs } from "@/content/work";
import { locales } from "@/i18n/config";

// Written to /sitemap.xml at build time. Every page is listed once per
// language, each entry pointing to its translation (hreflang).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [
    "/",
    "/work",
    ...projectSlugs.map((slug) => `/work/${slug}`),
    "/services",
    ...serviceSlugs.map((slug) => `/services/${slug}`),
    "/contact",
  ];

  return paths.flatMap((path) => {
    const languages = Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(path, locale)]));
    return locales.map((locale) => ({
      url: absoluteUrl(path, locale),
      lastModified,
      alternates: { languages },
    }));
  });
}
