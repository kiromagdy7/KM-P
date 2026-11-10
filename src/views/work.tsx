import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { Stagger, StaggerItem } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/content/work";
import { fill, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { breadcrumbJsonLd, pageMetadata, projectListJsonLd } from "@/lib/seo";

export function workMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return pageMetadata({ locale, title: t.meta.workTitle, description: t.meta.workDescription, path: "/work" });
}

export function WorkView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const projects = getProjects(locale);
  const commissioned = projects.filter((project) => project.kind !== "personal");
  const personal = projects.filter((project) => project.kind === "personal");
  const cardSizes = "(min-width: 40rem) 46vw, 92vw";

  const trail = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.work, path: "/work" },
  ];

  return (
    <>
      <JsonLd data={[projectListJsonLd(locale, projects), breadcrumbJsonLd(locale, trail)]} />

      <div className="container-site pt-10 pb-20 lg:pt-14 lg:pb-28">
        <Breadcrumbs locale={locale} trail={trail} />
        <header className="mt-8 max-w-[52rem]">
          <h1 className="animate-rise text-title font-semibold">{t.work.title}</h1>
          <p className="mt-6 max-w-[58ch] animate-rise text-lead text-muted [animation-delay:90ms]">
            {fill(t.work.intro, { count: projects.length })}
          </p>
        </header>

        <section aria-labelledby="commissioned-heading" className="mt-16">
          <h2 id="commissioned-heading" className="border-b border-line pb-4 text-xl font-semibold tracking-[-0.02em]">
            {t.work.commissioned}
          </h2>
          <Stagger className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {commissioned.map((project, index) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} locale={locale} sizes={cardSizes} eager={index < 2} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <section aria-labelledby="personal-heading" className="mt-24">
          <h2 id="personal-heading" className="border-b border-line pb-4 text-xl font-semibold tracking-[-0.02em]">
            {t.work.personal}
          </h2>
          <Stagger className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {personal.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} locale={locale} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      </div>

      <CtaBand locale={locale} heading={t.work.ctaHeading} body={t.work.ctaBody} />
    </>
  );
}
