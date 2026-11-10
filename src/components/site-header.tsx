import { LanguageSwitch } from "@/components/language-switch";
import { MobileMenu } from "@/components/mobile-menu";
import { NavLinks, type NavItem } from "@/components/nav-links";
import { HomeLogo } from "@/components/scroll-to-top";
import { SiteLink as Link } from "@/components/site-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonClass } from "@/components/ui";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const home = localePath(locale, "/");

  const items: NavItem[] = [
    { href: localePath(locale, "/work"), label: t.nav.work },
    { href: localePath(locale, "/services"), label: t.nav.services },
    { href: localePath(locale, "/#about"), label: t.nav.about },
    { href: localePath(locale, "/contact"), label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <HomeLogo href={home} label={t.nav.homeLinkLabel} className="text-lg font-semibold tracking-[-0.03em]">
          {t.site.shortName}
          <span className="text-accent">.</span>
        </HomeLogo>

        <nav aria-label={t.nav.mainLabel} className="hidden md:block">
          <NavLinks items={items} />
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageSwitch className="max-md:hidden" />
          <ThemeToggle />
          <Link href={localePath(locale, "/contact")} className={buttonClass("primary", "sm", "max-sm:hidden")}>
            {t.actions.startProject}
          </Link>
          <MobileMenu items={items} homeHref={home} />
        </div>
      </div>
    </header>
  );
}
