"use client";

import { usePathname } from "next/navigation";
import { Download, Mail, Menu, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/icons";
import { LanguageSwitch } from "@/components/language-switch";
import type { NavItem } from "@/components/nav-links";
import { SiteLink as Link } from "@/components/site-link";
import { buttonClass, iconButtonClass } from "@/components/ui";
import { site, whatsappUrl } from "@/content/site";
import { useI18n } from "@/i18n/provider";

/**
 * Full-screen menu for small screens. Built on <dialog>, so the browser
 * handles focus trapping, the Escape key and hiding the page behind it.
 */
export function MobileMenu({ items, homeHref }: { items: NavItem[]; homeHref: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const { t } = useI18n();

  // Close after navigating to another page.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const close = () => dialogRef.current?.close();

  return (
    <div className="md:hidden">
      <button type="button" onClick={() => dialogRef.current?.showModal()} aria-label={t.nav.openMenu} className={iconButtonClass}>
        <Menu className="size-5" aria-hidden />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={t.nav.menu}
        className="dialog-fade m-0 h-dvh w-screen bg-paper text-ink backdrop:bg-transparent open:flex open:flex-col"
      >
        <div className="container-site flex h-16 shrink-0 items-center justify-between border-b border-line">
          <Link href={homeHref} onClick={close} dir="ltr" lang="en" className="font-sans text-lg font-semibold tracking-[-0.03em]">
            {t.site.shortName}
            <span className="text-accent">.</span>
          </Link>
          <div className="flex items-center gap-1">
            <LanguageSwitch />
            <button type="button" onClick={close} autoFocus aria-label={t.nav.closeMenu} className={iconButtonClass}>
              <X className="size-5" aria-hidden />
            </button>
          </div>
        </div>

        <nav aria-label={t.nav.mainLabel} className="container-site flex-1 overflow-y-auto py-6">
          <ul>
            {[{ href: homeHref, label: t.nav.home }, ...items].map((item, index) => (
              // The entrance replays every time the menu opens, each link a beat after the last.
              <li key={item.href} className="animate-rise border-b border-line" style={{ animationDelay: `${80 + index * 55}ms` }}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block py-4 text-[2rem] leading-tight font-semibold tracking-[-0.035em] transition-colors duration-200 hover:text-accent active:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container-site shrink-0 animate-rise space-y-4 border-t border-line py-5 [animation-delay:380ms]">
          <div className="grid grid-cols-2 gap-3">
            <a href={whatsappUrl(t.site.whatsappMessage)} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
              <WhatsAppIcon className="size-4" />
              {t.actions.whatsapp}
            </a>
            <a href={site.cv} download className={buttonClass("secondary")}>
              <Download className="size-4" aria-hidden />
              {t.actions.downloadCv}
            </a>
          </div>
          <div className="flex items-center gap-1 text-muted">
            <a href={`mailto:${site.email}`} aria-label={t.contact.email} className="press grid size-11 place-items-center rounded-full hover:text-ink">
              <Mail className="size-5" aria-hidden />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="press grid size-11 place-items-center rounded-full hover:text-ink"
            >
              <LinkedInIcon className="size-5" />
            </a>
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="press grid size-11 place-items-center rounded-full hover:text-ink"
            >
              <GitHubIcon className="size-5" />
            </a>
          </div>
        </div>
      </dialog>
    </div>
  );
}
