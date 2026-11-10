import type { MetadataRoute } from "next";
import { getDictionary } from "@/i18n/dictionaries";

// Written to /manifest.webmanifest at build time.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const t = getDictionary("en");
  return {
    name: `${t.site.name} — ${t.site.role}`,
    short_name: t.site.name,
    description: t.site.description,
    lang: "en",
    dir: "ltr",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
