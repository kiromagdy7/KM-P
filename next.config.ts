import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is fully static: `next build` writes plain HTML/CSS/JS to ./out,
  // which Cloudflare serves as static assets (see wrangler.jsonc).
  //
  // Export mode is switched on for builds only. In `next dev` it turns an
  // unknown address such as /services/656 into a red error overlay, instead of
  // the 404 page a visitor gets on the live site. Leaving it off in dev makes
  // local behaviour match production.
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
  experimental: {
    // English and Arabic each have their own root layout (lang, direction,
    // fonts), so there is no single layout a 404 page could use. This lets
    // src/app/global-not-found.tsx provide one for the whole site.
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
