import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Written to /robots.txt at build time. Search engines and AI crawlers are all welcome.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
