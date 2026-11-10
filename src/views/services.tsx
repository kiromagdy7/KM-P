import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { SiteLink as Link } from "@/components/site-link";
import { buttonClass, Section } from "@/components/ui";
import { getHome } from "@/content/home";
import { getService, getServices } from "@/content/services";
import { whatsappUrl } from "@/content/site";
import { getProject } from "@/content/work";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { breadcrumbJsonLd, businessJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

// ---- All services -------------------------------------------------------

export function servicesMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return pageMetadata({ locale, title: t.meta.servicesTitle, description: t.meta.servicesDescription, path: "/services" });
}

export function ServicesView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const services = getServices(locale);
  const { process } = getHome(locale);

  const trail = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.services, path: "/services" },
  ];

  return (
    <>
      <JsonLd data={[businessJsonLd(locale, services), breadcrumbJsonLd(locale, trail)]} />

      <div className="container-site pt-10 pb-20 lg:pt-14 lg:pb-24">
        <Breadcrumbs locale={locale} trail={trail} />
        <header className="mt-8 max-w-[52rem]">
          <h1 className="animate-rise text-title font-semibold">{t.services.title}</h1>
          <p className="mt-6 max-w-[58ch] animate-rise text-lead text-muted [animation-delay:90ms]">{t.services.intro}</p>
        </header>

        <Stagger as="ul" className="mt-16 border-t border-line" gap={0.12}>
          {services.map((service) => (
            <StaggerItem
              as="li"
              key={service.slug}
              className="grid gap-8 border-b border-line py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16"
            >
              <div>
                <h2 className="text-heading font-semibold">{service.name}</h2>
                <p className="mt-4 max-w-[40ch] leading-relaxed text-muted">
                  {t.services.whoItIsFor} {service.audience}
                </p>
              </div>
              <div>
                <p className="text-lead">{service.summary}</p>
                <ul className="mt-6 grid gap-x-8 gap-y-2 text-[0.9375rem] text-muted sm:grid-cols-2">
                  {service.includes.map((item) => (
                    <li key={item.title} className="border-t border-line pt-2">
                      {item.title}
                    </li>
                  ))}
                </ul>
                <Link
                  href={localePath(locale, `/services/${service.slug}`)}
                  className="link-underline group mt-8 inline-flex items-center gap-2 font-medium"
                >
                  {t.services.whatIsIncluded}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                    aria-hidden
                  />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Section title={t.home.processTitle} lede={t.services.processLede}>
        <Stagger as="ol" className="grid gap-x-10 gap-y-10 sm:grid-cols-2" gap={0.12}>
          {process.map((step, index) => (
            <StaggerItem as="li" key={step.title} className="border-t border-line pt-5">
              <span className="font-mono text-sm text-muted tabular-nums">{index + 1}</span>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CtaBand locale={locale} heading={t.services.ctaHeading} body={t.services.ctaBody} />
    </>
  );
}

// ---- One service --------------------------------------------------------

export function serviceMetadata(locale: Locale, slug: string): Metadata {
  const service = getService(locale, slug);
  if (!service) return {};

  return pageMetadata({
    locale,
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

export function ServiceView({ locale, slug }: { locale: Locale; slug: string }) {
  const t = getDictionary(locale);
  const service = getService(locale, slug);
  if (!service) notFound();

  const trail = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.services, path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  const related = service.projects.flatMap((projectSlug) => getProject(locale, projectSlug) ?? []);

  return (
    <>
      <JsonLd data={[serviceJsonLd(locale, service), faqJsonLd(locale, service.faqs), breadcrumbJsonLd(locale, trail)]} />

      <header className="container-site pt-10 pb-20 lg:pt-14 lg:pb-24">
        <Breadcrumbs locale={locale} trail={trail} />
        <h1 className="mt-8 max-w-[18ch] animate-rise text-title font-semibold">{service.title}</h1>
        <p className="mt-7 max-w-[62ch] animate-rise text-lead [animation-delay:90ms]">{service.intro}</p>
        <p className="mt-5 max-w-[62ch] animate-rise leading-relaxed text-muted [animation-delay:160ms]">
          {t.services.whoItIsFor} {service.audience}
        </p>
        <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:230ms]">
          <a href={whatsappUrl(service.whatsappMessage)} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
            <WhatsAppIcon className="size-4" />
            {t.actions.chatOnWhatsapp}
          </a>
          <Link href={localePath(locale, "/contact")} className={buttonClass("secondary")}>
            {t.actions.sendMessage}
          </Link>
        </div>
      </header>

      <Section title={t.services.whatIsIncluded}>
        <Stagger as="ul" className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {service.includes.map((item) => (
            <StaggerItem as="li" key={item.title} className="border-t border-line pt-5">
              <h3 className="text-xl font-semibold tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted">{item.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section title={t.services.relatedTitle} lede={t.services.relatedLede}>
        <Stagger className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {related.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} locale={locale} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section title={t.home.faqTitle}>
        <Reveal>
          <FaqList faqs={service.faqs} />
        </Reveal>
      </Section>

      <CtaBand
        locale={locale}
        heading={t.services.serviceCtaHeading}
        body={t.services.serviceCtaBody}
        whatsappMessage={service.whatsappMessage}
      />
    </>
  );
}
