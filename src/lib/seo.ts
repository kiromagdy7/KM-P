import type { Metadata, Viewport } from "next";
import { getHome } from "@/content/home";
import type { Project } from "@/content/projects";
import type { Service } from "@/content/services";
import { absoluteUrl, assetUrl, site } from "@/content/site";
import { localeInfo, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// Ids that tie the structured data together. They are the same on every page
// and in every language, so search engines see one person and one business.
const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;
const businessId = `${site.url}/#business`;

const homeShareImage = "/og/home.jpg";

interface PageMetaInput {
  locale: Locale;
  title: string;
  description: string;
  /** Language-neutral path, e.g. "/work/kmz-hub" */
  path: string;
  /** Path under /public of a 1200x630 image */
  image?: string;
  type?: "website" | "article";
  /** Set when the title should not get the " | Kirollos Magdy" suffix */
  absoluteTitle?: boolean;
}

/**
 * Builds title, description, canonical address, links to the other language
 * (hreflang) and social-share tags for one page.
 */
export function pageMetadata({
  locale,
  title,
  description,
  path,
  image = homeShareImage,
  type = "website",
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path, locale);
  const languages: Record<string, string> = { "x-default": absoluteUrl(path, "en") };
  for (const other of locales) languages[other] = absoluteUrl(path, other);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: getDictionary(locale).site.name,
      locale: localeInfo[locale].openGraph,
      alternateLocale: locales.filter((other) => other !== locale).map((other) => localeInfo[other].openGraph),
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** Metadata shared by every page of one language; set once in that language's root layout. */
export function baseMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.homeTitle, template: `%s | ${t.site.name}` },
    description: t.site.description,
    applicationName: t.site.name,
    authors: [{ name: t.site.name, url: site.url }],
    creator: t.site.name,
    robots: {
      index: true,
      follow: true,
      googleBot: { "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    formatDetection: { telephone: false },
  };
}

/** Colour of the browser chrome on phones, matching the light and dark themes. */
export const siteViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

type JsonLd = Record<string, unknown>;

const areaServed = [{ "@type": "Country", name: "Egypt" }, "Worldwide"];

export function personJsonLd(locale: Locale): JsonLd {
  const t = getDictionary(locale);
  const { credentials, stack } = getHome(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.name,
    alternateName: site.alternateNames,
    url: `${site.url}/`,
    image: assetUrl("/images/kirollos-magdy.webp"),
    jobTitle: t.site.jobTitle,
    description: t.site.description,
    email: site.email,
    telephone: site.phone,
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: site.countryCode },
    knowsLanguage: ["ar", "en"],
    knowsAbout: stack.flatMap((group) => group.items),
    hasCredential: credentials.map((credential) => ({
      "@type": "EducationalOccupationalCredential",
      name: credential.title,
      credentialCategory: "certificate",
      recognizedBy: { "@type": "Organization", name: credential.issuer },
      dateCreated: credential.year,
    })),
    sameAs: Object.values(site.social),
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    alternateName: ["Kiro Magdy", "كيرلس مجدي"],
    url: `${site.url}/`,
    inLanguage: ["en", "ar"],
    publisher: { "@id": personId },
  };
}

/** The freelance practice as a business, so search engines know what is offered and where. */
export function businessJsonLd(locale: Locale, services: Service[]): JsonLd {
  const t = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": businessId,
    name: t.site.businessName,
    url: `${site.url}/`,
    image: assetUrl(homeShareImage),
    description: t.site.description,
    email: site.email,
    telephone: site.phone,
    founder: { "@id": personId },
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: site.countryCode },
    areaServed,
    availableLanguage: ["Arabic", "English"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.services.title,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.summary,
          url: absoluteUrl(`/services/${service.slug}`, locale),
        },
      })),
    },
  };
}

export function profilePageJsonLd(locale: Locale): JsonLd {
  const t = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${absoluteUrl("/", locale)}#profile`,
    url: absoluteUrl("/", locale),
    name: t.meta.homeTitle,
    inLanguage: locale,
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
  };
}

export function breadcrumbJsonLd(locale: Locale, trail: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, locale),
    })),
  };
}

export function faqJsonLd(locale: Locale, faqs: { question: string; answer: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function serviceJsonLd(locale: Locale, service: Service): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.seoDescription,
    url: absoluteUrl(`/services/${service.slug}`, locale),
    inLanguage: locale,
    provider: { "@id": businessId },
    areaServed,
    audience: { "@type": "Audience", audienceType: service.audience },
  };
}

export function projectJsonLd(locale: Locale, project: Project): JsonLd {
  const url = absoluteUrl(`/work/${project.slug}`, locale);
  const data: JsonLd = {
    "@context": "https://schema.org",
    // Portfolio entries are described as creative works. Marking them as
    // SoftwareApplication makes Google expect a price and ratings, which a
    // case study does not have.
    "@type": "CreativeWork",
    name: project.title,
    description: project.intro,
    url,
    image: assetUrl(`/og/work/${project.slug}.jpg`),
    inLanguage: locale,
    creator: { "@id": personId },
    dateCreated: project.created || undefined,
    keywords: project.keywords.length ? project.keywords.join(", ") : undefined,
    mainEntityOfPage: url,
  };

  if (project.schemaType === "SoftwareApplication") {
    data.additionalType = "https://schema.org/SoftwareApplication";
    data.genre = project.category;
  }

  return data;
}

export function projectListJsonLd(locale: Locale, projects: Project[]): JsonLd {
  const t = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.work.title,
    url: absoluteUrl("/work", locale),
    inLanguage: locale,
    isPartOf: { "@id": websiteId },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: absoluteUrl(`/work/${project.slug}`, locale),
      })),
    },
  };
}
