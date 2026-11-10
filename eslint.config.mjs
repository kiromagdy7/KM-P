import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // The site is a static export, so next/image cannot resize on demand.
      // Responsive variants are generated ahead of time (npm run images) and
      // served through plain <img srcset> in components/site-image.tsx.
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "next-env.d.ts", ".opencode/**", ".wrangler/**"]),
]);
