import { localePath, type Locale } from "@/i18n/config";

// Contact details and identity that are the same in every language.
// Change a value here and it updates the pages, the metadata and the structured data.
// Text that is translated (name, role, description) lives in src/i18n/dictionaries.ts.

const whatsappNumber = "201092035237";

export const site = {
  url: "https://kiromagdy.com",
  /** Latin spelling, used where a single canonical name is needed (structured data). */
  name: "Kirollos Magdy",
  city: "Alexandria",
  countryCode: "EG",
  email: "contact@kiromagdy.com",
  phone: "+201092035237",
  phoneDisplay: "+20 109 203 5237",
  cv: "/cv/Kirollos-Magdy-CV.pdf",
  /** Formspree endpoint that receives the contact form. */
  formEndpoint: "https://formspree.io/f/mpwlerqp",
  linkedinHandle: "kirollosmagdy7",
  githubHandle: "kiromagdy7",
  social: {
    github: "https://github.com/kiromagdy7",
    linkedin: "https://www.linkedin.com/in/kirollosmagdy7/",
    facebook: "https://www.facebook.com/kiromagdyz77/",
    instagram: "https://www.instagram.com/kiromagdy_7",
  },
  alternateNames: ["Kiro Magdy", "Kero Magdy", "Kerolos Magdy", "Kirolos Magdy", "كيرلس مجدي", "كيرو مجدي"],
} as const;

/** WhatsApp chat link with a message already typed in. */
export function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Full address of a page: absoluteUrl("/work", "ar") -> https://kiromagdy.com/ar/work */
export function absoluteUrl(path = "/", locale: Locale = "en") {
  const localized = localePath(locale, path);
  return localized === "/" ? `${site.url}/` : `${site.url}${localized}`;
}

/** Full address of a file under /public (images, PDFs), which is the same in every language. */
export function assetUrl(path: string) {
  return `${site.url}${path}`;
}
