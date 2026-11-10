import { SiteLink as Link } from "@/components/site-link";
import { getServices } from "@/content/services";
import { site, whatsappUrl } from "@/content/site";
import { getProjects } from "@/content/work";
import { localeInfo, localePath, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const linkClass = "inline-block py-0.5 text-muted transition-colors duration-200 hover:text-ink";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const year = new Date().getFullYear();
  const other = locales.find((entry) => entry !== locale) ?? "en";

  return (
    <footer className="border-t border-line bg-wash">
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href={localePath(locale, "/")} className="text-xl font-semibold tracking-[-0.03em]">
            {t.site.name}
            <span className="text-accent">.</span>
          </Link>
          <p className="mt-4 max-w-[36ch] text-[0.9375rem] leading-relaxed text-muted">{t.site.footerBlurb}</p>
        </div>

        <nav aria-label={t.footer.services}>
          <h2 className="text-sm font-semibold">{t.footer.services}</h2>
          <ul className="mt-4 space-y-1.5 text-[0.9375rem]">
            {getServices(locale).map((service) => (
              <li key={service.slug}>
                <Link href={localePath(locale, `/services/${service.slug}`)} className={linkClass}>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.footer.work}>
          <h2 className="text-sm font-semibold">{t.footer.work}</h2>
          <ul className="mt-4 space-y-1.5 text-[0.9375rem]">
            {getProjects(locale)
              .slice(0, 4)
              .map((project) => (
                <li key={project.slug}>
                  <Link href={localePath(locale, `/work/${project.slug}`)} className={linkClass}>
                    {project.title}
                  </Link>
                </li>
              ))}
            <li>
              <Link href={localePath(locale, "/work")} className={linkClass}>
                {t.actions.allProjects}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold">{t.footer.contact}</h2>
          <ul className="mt-4 space-y-1.5 text-[0.9375rem]">
            <li>
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </li>
            <li>
              {/* dir="ltr" keeps the plus sign in front of the number in Arabic. */}
              <a href={`tel:${site.phone}`} dir="ltr" className={linkClass}>
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={whatsappUrl(t.site.whatsappMessage)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {t.actions.whatsapp}
              </a>
            </li>
            <li>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer me" className={linkClass}>
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.social.github} target="_blank" rel="noopener noreferrer me" className={linkClass}>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {t.site.name}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={localePath(other, "/")} hrefLang={other} lang={other} className={linkClass}>
              {localeInfo[other].nativeName}
            </a>
            <a href={site.cv} download className={linkClass}>
              {t.actions.downloadCvPdf}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
