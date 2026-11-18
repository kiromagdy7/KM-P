import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/content/services";
import { absoluteUrl } from "@/content/site";
import { pageUpdated } from "@/content/updated";
import { projectSlugs } from "@/content/work";
import { locales } from "@/i18n/config";

// Written to /sitemap.xml at build time. Every page is listed once per
// language, each entry pointing to its translation (hreflang). The lastmod
// dates come from src/content/updated.ts.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/work",
    ...projectSlugs.map((slug) => `/work/${slug}`),
    "/services",
    ...serviceSlugs.map((slug) => `/services/${slug}`),
    "/contact",
  ];

  const missing = paths.filter((path) => !pageUpdated[path]);
  if (missing.length) {
    throw new Error(`No last-updated date for ${missing.join(", ")}. Add it to src/content/updated.ts.`);
  }
  const unknown = Object.keys(pageUpdated).filter((path) => !paths.includes(path));
  if (unknown.length) {
    throw new Error(`src/content/updated.ts lists pages that do not exist: ${unknown.join(", ")}.`);
  }

  return paths.flatMap((path) => {
    const languages = Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(path, locale)]));
    return locales.map((locale) => ({
      url: absoluteUrl(path, locale),
      lastModified: pageUpdated[path],
      alternates: { languages },
    }));
  });
}
