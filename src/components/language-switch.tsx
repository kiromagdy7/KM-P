"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/components/ui";
import { switchLocalePath } from "@/i18n/config";
import { useI18n } from "@/i18n/provider";

/**
 * Link to the page the visitor is on, in the other language.
 * A plain <a>, because each language has its own document (lang, direction
 * and fonts), so switching needs a full page load.
 */
export function LanguageSwitch({ className }: { className?: string }) {
  const pathname = usePathname();
  const { locale, t } = useI18n();
  const other = locale === "en" ? "ar" : "en";

  return (
    <a
      href={switchLocalePath(pathname)}
      hrefLang={other}
      lang={other}
      aria-label={t.nav.otherLanguageLabel}
      className={cn("press rounded-[5px] px-2.5 py-2 text-sm font-medium text-muted hover:bg-wash hover:text-ink", className)}
    >
      {t.nav.otherLanguage}
    </a>
  );
}
