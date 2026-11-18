// The date each page's content last changed, used for <lastmod> in sitemap.xml.
// Search engines only trust lastmod when it is accurate, so when you change what
// a page says or shows, set its date here in the same change. Pure styling or
// layout tweaks do not count. Both language versions share one date.
//
// Every page in the sitemap needs an entry: the build stops with an error naming
// any page that is missing (a new project, for example).

export const pageUpdated: Record<string, string> = {
  "/": "2026-11-18",
  "/work": "2026-11-14",
  "/work/jewelry-system": "2026-11-18",
  "/work/kmz-hub": "2026-11-10",
  "/work/physiotherapy": "2026-11-18",
  "/work/tahwega-cafe": "2026-11-10",
  "/work/wistore": "2026-11-13",
  "/work/athl-furniture": "2026-11-14",
  "/work/travely": "2026-11-10",
  "/work/ip-inspector": "2026-11-10",
  "/work/teta-kitchen": "2026-11-10",
  "/work/word-of-the-lord": "2026-11-12",
  "/work/code-crate": "2026-11-10",
  "/work/div-store": "2026-11-10",
  "/services": "2026-11-14",
  "/services/business-systems": "2026-11-10",
  "/services/websites": "2026-11-14",
  "/services/desktop-software": "2026-11-10",
  "/contact": "2026-11-10",
};
