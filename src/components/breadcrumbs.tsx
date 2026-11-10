import { SiteLink as Link } from "@/components/site-link";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface BreadcrumbsProps {
  locale: Locale;
  /** Language-neutral paths; the last entry is the current page */
  trail: { name: string; path: string }[];
}

/** Trail of links back up the site. */
export function Breadcrumbs({ locale, trail }: BreadcrumbsProps) {
  const t = getDictionary(locale);
  return (
    <nav aria-label={t.nav.breadcrumbLabel}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        {trail.map((item, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={localePath(locale, item.path)} className="transition-colors duration-200 hover:text-ink">
                    {item.name}
                  </Link>
                  <span aria-hidden>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
