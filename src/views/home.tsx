import type { Metadata } from "next";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ContactSection } from "@/components/contact-section";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { SiteImage } from "@/components/site-image";
import { SiteLink as Link } from "@/components/site-link";
import { buttonClass, Section } from "@/components/ui";
import { getHome } from "@/content/home";
import { getServices } from "@/content/services";
import { site } from "@/content/site";
import { featuredSlugs, getProject, getProjects } from "@/content/work";
import { fill, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { shotPath } from "@/lib/images";
import { businessJsonLd, faqJsonLd, pageMetadata, personJsonLd, profilePageJsonLd, websiteJsonLd } from "@/lib/seo";

export function homeMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    title: t.meta.homeTitle,
    description: t.meta.homeDescription,
    path: "/",
    // The home page sets its full title instead of using the "%s | name" template.
    absoluteTitle: true,
  });
}

// Each word of the name slides up from behind a mask. The words sit inline, so the
// name fits on one line when the screen is wide enough and wraps to two otherwise.
// The extra padding keeps
// the mask from cutting off letter tails ("g", "y") and, in Arabic, the dots
// and strokes that sit above and below the line.
const nameLineMask =
  "-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top rtl:-mt-[0.16em] rtl:-mb-[0.34em] rtl:pt-[0.16em] rtl:pb-[0.34em]";
// The Arabic surname ends in a letter that drops well below the line, so the last line gets a deeper mask.
const lastNameLineMask =
  "-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top rtl:-mt-[0.16em] rtl:-mb-[0.2em] rtl:pt-[0.16em] rtl:pb-[0.56em]";

// Arrows point the way the text reads: right in English, left in Arabic.
const arrowClass = "size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1";

export function HomeView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { process, credentials, stack, faqs } = getHome(locale);
  const services = getServices(locale);
  const projects = getProjects(locale);
  const featured = featuredSlugs.flatMap((slug) => getProject(locale, slug) ?? []);
  const [lead, ...rest] = featured;
  const [firstName = "", lastName = ""] = t.hero.nameLines;

  return (
    <>
      <JsonLd
        data={[
          personJsonLd(locale),
          websiteJsonLd(),
          businessJsonLd(locale, services),
          profilePageJsonLd(locale),
          faqJsonLd(locale, faqs),
        ]}
      />

      {/* Hero: fills the screen below the header, so the next section starts on the first scroll. */}
      <section aria-labelledby="hero-heading" className="relative">
        <div className="container-site grid min-h-[calc(100svh-4.0625rem)] items-center gap-12 py-12 md:grid-cols-[minmax(0,7fr)_minmax(0,4.6fr)] md:gap-10 lg:py-16">
          <div>
            <p className="animate-rise text-[0.9375rem] text-muted">{t.hero.kicker}</p>
            <h1 id="hero-heading" className="mt-5 text-center text-display font-bold md:text-start">
              <span className={nameLineMask}>
                <span className="block animate-line-up [animation-delay:80ms]">{firstName}</span>
              </span>{" "}
              <span className={lastNameLineMask}>
                <span className="block animate-line-up [animation-delay:170ms]">
                  {lastName}
                  <span className="ms-[0.06em] inline-block size-[0.13em] animate-halo rounded-full bg-accent align-baseline" aria-hidden />
                </span>
              </span>
            </h1>
            <p className="mt-8 max-w-[31ch] animate-rise text-[clamp(1.375rem,2.4vw,1.75rem)] leading-[1.3] font-medium tracking-[-0.02em] [animation-delay:320ms] rtl:mt-6 rtl:leading-[1.6]">
              {t.hero.lead}
            </p>
            <p className="mt-5 max-w-[52ch] animate-rise leading-relaxed text-muted [animation-delay:400ms]">{t.hero.body}</p>
            <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:480ms]">
              <Link href={localePath(locale, "/contact")} className={buttonClass("primary")}>
                {t.actions.startProject}
              </Link>
              <Link href={localePath(locale, "/work")} className={buttonClass("secondary")}>
                {t.actions.seeWork}
              </Link>
            </div>
          </div>

          {/* On small screens the portrait comes first, centered above the text; from md up it sits beside it. */}
          <div className="relative order-first w-full max-w-[19rem] justify-self-center md:order-none md:max-w-none md:justify-self-end">
            <div className="aspect-[4/5] animate-photo-in overflow-hidden rounded-lg bg-white [animation-delay:200ms]">
              <SiteImage
                src="/images/kirollos-magdy.webp"
                alt={t.hero.portraitAlt}
                sizes="(min-width: 48rem) 36vw, 19rem"
                priority
                className="size-full object-cover"
              />
            </div>
            <p className="absolute start-3 bottom-3 flex animate-rise items-center gap-2.5 rounded-full bg-white py-1.5 ps-3 pe-3.5 text-[0.8125rem] font-medium text-black shadow-[0_2px_10px_rgba(0,0,0,0.14)] [animation-delay:700ms]">
              {/* Live signal: a steady dot with a ring that keeps expanding from it. */}
              <span className="relative flex size-2.5" aria-hidden>
                <span className="absolute inset-0 animate-beacon rounded-full bg-[#22c06c]" />
                <span className="relative size-2.5 rounded-full bg-[#17a45a] shadow-[0_0_8px_2px_rgba(34,192,108,0.6)]" />
              </span>
              {t.hero.available}
            </p>
          </div>
        </div>

        {/* Scroll cue. Hidden on small or short screens, where the hero already runs past the fold. */}
        <a
          href="#work"
          aria-label={t.hero.scrollCue}
          className="press absolute bottom-6 left-1/2 hidden size-10 -translate-x-1/2 animate-rise place-items-center rounded-full border border-line text-muted [animation-delay:900ms] hover:border-ink hover:text-ink lg:grid [@media(max-height:46rem)]:hidden"
        >
          <ArrowDown className="size-4 animate-nudge" aria-hidden />
        </a>
      </section>

      {/* Selected work */}
      <section id="work" aria-labelledby="work-heading" className="border-t border-line py-20 lg:py-28">
        <div className="container-site">
          <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <h2 id="work-heading" className="text-title font-semibold">
              {t.home.workTitle}
            </h2>
            <Link href={localePath(locale, "/work")} className="link-underline text-[0.9375rem]">
              {fill(t.actions.allProjectsCount, { count: projects.length })}
            </Link>
          </Reveal>

          {lead ? (
            <article className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
              <Reveal className="lg:col-span-8">
                <Link
                  href={localePath(locale, `/work/${lead.slug}`)}
                  className="group block overflow-hidden rounded-lg border border-line bg-wash"
                  aria-label={fill(t.home.caseStudyLabel, { title: lead.title })}
                >
                  {/* Shown at its own proportions, so the whole screen is visible instead of a crop. */}
                  <SiteImage
                    src={shotPath(lead.slug, lead.cover)}
                    alt={fill(t.home.coverAlt, { title: lead.title })}
                    sizes="(min-width: 64rem) 62vw, 92vw"
                    className="h-auto w-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.025]"
                  />
                </Link>
              </Reveal>
              <Reveal className="lg:col-span-4" delay={0.12}>
                <p className="text-sm text-muted">
                  {fill(t.home.leadMeta, { kind: t.project.kind[lead.kind], status: lead.status.toLocaleLowerCase(locale) })}
                </p>
                <h3 className="mt-2 text-heading font-semibold">{lead.title}</h3>
                <p className="mt-4 leading-relaxed text-muted">{lead.summary}</p>
                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6">
                  {lead.facts.map((fact) => (
                    <div key={fact.label} className="flex flex-col-reverse">
                      <dt className="mt-1.5 text-sm text-muted">{fact.label}</dt>
                      <dd className="text-[1.75rem] leading-none font-semibold tracking-[-0.03em] tabular-nums">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                <Link href={localePath(locale, `/work/${lead.slug}`)} className={buttonClass("secondary", "md", "group mt-8")}>
                  {t.actions.readCaseStudy}
                  <ArrowRight className={arrowClass} aria-hidden />
                </Link>
              </Reveal>
            </article>
          ) : null}

          <Stagger className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} locale={locale} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Services */}
      <Section id="services" title={t.home.servicesTitle} lede={t.home.servicesLede}>
        <Stagger as="ul" className="border-t border-line">
          {services.map((service) => (
            <StaggerItem as="li" key={service.slug} className="border-b border-line">
              <Link
                href={localePath(locale, `/services/${service.slug}`)}
                className="group grid gap-4 py-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] sm:items-start sm:gap-8"
              >
                <h3 className="text-2xl font-semibold tracking-[-0.025em] transition-colors duration-200 group-hover:text-accent">
                  {service.name}
                </h3>
                <div>
                  <p className="leading-relaxed">{service.summary}</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {t.home.forLabel} {service.audience}
                  </p>
                </div>
                <ArrowRight
                  className="hidden size-5 text-muted transition-[translate,color] duration-300 group-hover:translate-x-1.5 group-hover:text-accent sm:block rtl:-scale-x-100 rtl:group-hover:-translate-x-1.5"
                  aria-hidden
                />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Process */}
      <Section title={t.home.processTitle} lede={t.home.processLede}>
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

      {/* About */}
      <Section id="about" title={t.home.aboutTitle}>
        <Reveal className="max-w-[62ch] space-y-5 text-lead">
          <p>{t.home.aboutLead}</p>
          <p className="text-muted">{t.home.aboutBody}</p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <h3 className="text-xl font-semibold tracking-[-0.02em]">{t.home.certificates}</h3>
            <ul className="mt-5 border-t border-line">
              {credentials.map((credential) => (
                <li key={credential.title} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <div>
                    <p className="font-medium">{credential.title}</p>
                    <p className="mt-1 text-sm text-muted">{credential.issuer}</p>
                  </div>
                  <span className="font-mono text-sm text-muted tabular-nums">{credential.year}</span>
                </li>
              ))}
            </ul>
            <a href={site.cv} download className="link-underline mt-6 inline-block text-[0.9375rem]">
              {t.actions.downloadMyCv}
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="text-xl font-semibold tracking-[-0.02em]">{t.home.tools}</h3>
            <dl className="mt-5 border-t border-line">
              {stack.map((group) => (
                <div key={group.area} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-4">
                  <dt className="text-sm text-muted sm:pt-0.5">{group.area}</dt>
                  {/* Tool names are English; keep them reading left to right on the Arabic page. */}
                  <dd dir="ltr" className="leading-relaxed rtl:text-right">
                    {group.items.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section title={t.home.faqTitle}>
        <Reveal>
          <FaqList faqs={faqs} />
        </Reveal>
      </Section>

      <ContactSection locale={locale} />
    </>
  );
}
