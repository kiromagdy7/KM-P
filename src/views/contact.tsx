import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/content/site";
import { fill, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export function contactMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    title: t.meta.contactTitle,
    description: fill(t.meta.contactDescription, { phone: site.phoneDisplay, email: site.email }),
    path: "/contact",
  });
}

export function ContactView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const trail = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.contact, path: "/contact" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, trail)} />
      {/* The section draws its own top border; on this page it is the first thing, so the border is removed. */}
      <div className="[&>section]:border-t-0 [&>section]:pt-12 lg:[&>section]:pt-16">
        <ContactSection locale={locale} headingLevel="h1" />
      </div>
    </>
  );
}
