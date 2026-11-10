// Languages the site is published in. English lives at the root ("/work"),
// Arabic under "/ar" ("/ar/work"). Every page exists in both.

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const localeInfo: Record<Locale, { dir: "ltr" | "rtl"; openGraph: string; nativeName: string }> = {
  en: { dir: "ltr", openGraph: "en_US", nativeName: "English" },
  ar: { dir: "rtl", openGraph: "ar_EG", nativeName: "العربية" },
};

/**
 * Turns a language-neutral path into the address for one language.
 *   localePath("ar", "/work")   -> "/ar/work"
 *   localePath("ar", "/")       -> "/ar"
 *   localePath("ar", "/#about") -> "/ar#about"
 *   localePath("en", "/work")   -> "/work"
 */
export function localePath(locale: Locale, path: string) {
  if (locale === "en") return path;
  if (path === "/") return "/ar";
  if (path.startsWith("/#")) return `/ar${path.slice(1)}`;
  return `/ar${path}`;
}

/** The same page in the other language, given the address currently open. */
export function switchLocalePath(pathname: string) {
  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    return pathname.slice(3) || "/";
  }
  return pathname === "/" ? "/ar" : `/ar${pathname}`;
}

/** Fills {placeholders} in a dictionary string: fill("All {count} projects", { count: 10 }). */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
