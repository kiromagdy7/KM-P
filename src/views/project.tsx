import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { Gallery, type GalleryItem } from "@/components/gallery";
import { JsonLd } from "@/components/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { SiteImage } from "@/components/site-image";
import { SiteLink as Link } from "@/components/site-link";
import { buttonClass, Section } from "@/components/ui";
import { getProject, getProjects } from "@/content/work";
import { fill, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveImage, shotPath } from "@/lib/images";
import { breadcrumbJsonLd, pageMetadata, projectJsonLd } from "@/lib/seo";

export function projectMetadata(locale: Locale, slug: string): Metadata {
  const project = getProject(locale, slug);
  if (!project) return {};

  return pageMetadata({
    locale,
    title: `${project.title}: ${project.tagline}`,
    description: project.seoDescription,
    path: `/work/${project.slug}`,
    image: `/og/work/${project.slug}.jpg`,
    type: "article",
  });
}

export function ProjectView({ locale, slug }: { locale: Locale; slug: string }) {
  const t = getDictionary(locale);
  const project = getProject(locale, slug);
  if (!project) notFound();

  const projects = getProjects(locale);

  const trail = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.work, path: "/work" },
    { name: project.title, path: `/work/${project.slug}` },
  ];

  const details = [
    { label: t.project.type, value: t.project.kind[project.kind] },
    { label: t.project.platform, value: project.platform },
    { label: t.project.status, value: project.status },
    { label: t.project.year, value: String(project.year) },
    ...(project.duration ? [{ label: t.project.buildTime, value: project.duration }] : []),
  ];

  const galleryItems: GalleryItem[] = project.shots.map((shot) => {
    const image = resolveImage(shotPath(project.slug, shot.file));
    return {
      full: image.full,
      src: image.src,
      srcSet: image.srcSet,
      width: image.width,
      height: image.height,
      title: shot.title,
      group: shot.group,
      alt: shot.alt,
    };
  });

  const cover = project.shots.find((shot) => shot.file === project.cover);

  // Suggest the next three projects in the list, wrapping around at the end.
  const position = projects.findIndex((entry) => entry.slug === project.slug);
  const more = [1, 2, 3].flatMap((offset) => projects[(position + offset) % projects.length] ?? []);

  return (
    <>
      <JsonLd data={[projectJsonLd(locale, project), breadcrumbJsonLd(locale, trail)]} />

      <article>
        <header className="container-site pt-10 lg:pt-14">
          <Breadcrumbs locale={locale} trail={trail} />

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
            <div>
              <p className="animate-rise text-[0.9375rem] text-muted">{project.tagline}</p>
              <h1 className="mt-3 animate-rise text-title font-semibold [animation-delay:70ms]">{project.title}</h1>
              <p className="mt-7 max-w-[60ch] animate-rise text-lead [animation-delay:150ms]">{project.intro}</p>

              <div className="mt-8 flex animate-rise flex-wrap gap-3 [animation-delay:230ms]">
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "md", "group")}>
                    {t.project.visitLive}
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                ) : null}
                <Link href={localePath(locale, "/contact")} className={buttonClass(project.liveUrl ? "secondary" : "primary")}>
                  {t.project.askSimilar}
                </Link>
              </div>
            </div>

            <dl className="animate-rise self-start border-t border-line text-[0.9375rem] [animation-delay:200ms]">
              {details.map((detail) => (
                <div key={detail.label} className="flex justify-between gap-6 border-b border-line py-3">
                  <dt className="text-muted">{detail.label}</dt>
                  <dd className="text-end font-medium">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-12 animate-rise overflow-hidden rounded-lg border border-line bg-wash [animation-delay:320ms] lg:mt-16">
            <SiteImage
              src={shotPath(project.slug, project.cover)}
              alt={cover?.alt ?? fill(t.project.screenshotAlt, { title: project.title })}
              sizes="(min-width: 80rem) 72rem, 94vw"
              eager
              className="max-h-[46rem] w-full object-cover object-top"
            />
          </div>

          {project.facts.length ? (
            <Stagger as="dl" className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              {project.facts.map((fact) => (
                <StaggerItem key={fact.label} className="flex flex-col-reverse border-t border-line pt-4">
                  <dt className="mt-1.5 text-sm text-muted">{fact.label}</dt>
                  <dd className="text-[2rem] leading-none font-semibold tracking-[-0.03em] tabular-nums">{fact.value}</dd>
                </StaggerItem>
              ))}
            </Stagger>
          ) : null}

          {project.note ? <p className="mt-8 max-w-[70ch] text-[0.9375rem] leading-relaxed text-muted">{project.note}</p> : null}
        </header>

        <div className="mt-20 lg:mt-28">
          <Section id="highlights" title={project.highlightsHeading}>
            <Stagger as="ul" className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {project.highlights.map((highlight) => (
                <StaggerItem as="li" key={highlight.title} className="border-t border-line pt-5">
                  <h3 className="text-xl font-semibold tracking-[-0.02em]">{highlight.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-muted">{highlight.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </Section>

          <Section id="stack" title={t.project.underTheHood} lede={t.project.underTheHoodLede}>
            <Reveal>
              {project.technical ? <p className="mb-10 max-w-[68ch] leading-relaxed">{project.technical}</p> : null}

              {/* Technology names are English in both languages, so these lists always read left to right. */}
              <ul dir="ltr" className="flex flex-wrap gap-2 rtl:justify-end">
                {project.tech.map((item) => (
                  <li key={item} className="rounded-full border border-line px-3 py-1 font-mono text-[0.8125rem]">
                    {item}
                  </li>
                ))}
              </ul>

              <dl className="mt-10 border-t border-line">
                {project.specs.map((spec) => (
                  <div key={spec.title} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
                    <dt className="font-medium">{spec.title}</dt>
                    <dd>
                      <ul dir="ltr" className="space-y-1.5 text-muted rtl:text-right">
                        {spec.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Section>

          <section id="screenshots" aria-labelledby="screenshots-heading" className="border-t border-line py-20 lg:py-28">
            <div className="container-site">
              <Reveal>
                <h2 id="screenshots-heading" className="text-heading font-semibold">
                  {t.project.screenshots}
                </h2>
                <p className="mt-3 mb-10 text-muted">{fill(t.project.screenshotsLede, { count: project.shots.length })}</p>
              </Reveal>
              <Gallery items={galleryItems} groups={project.groups} align={project.coverPosition} />
            </div>
          </section>
        </div>
      </article>

      <CtaBand
        locale={locale}
        heading={t.project.ctaHeading}
        body={t.project.ctaBody}
        whatsappMessage={fill(t.site.whatsappProjectMessage, { project: project.title })}
      />

      <section aria-labelledby="more-heading" className="border-t border-line py-20 lg:py-24">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <h2 id="more-heading" className="text-heading font-semibold">
              {t.project.more}
            </h2>
            <Link href={localePath(locale, "/work")} className="link-underline text-[0.9375rem]">
              {t.actions.allProjects}
            </Link>
          </div>
          <Stagger className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((entry) => (
              <StaggerItem key={entry.slug}>
                <ProjectCard project={entry} locale={locale} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
