import type { ReactNode } from "react";
import { MotionProvider } from "@/components/motion";
import { BackToTop } from "@/components/scroll-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { localeInfo, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { I18nProvider } from "@/i18n/provider";

// Runs before the first paint so the page never flashes the wrong theme.
// A saved choice wins; otherwise the device setting decides.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})()`;

// Scroll animations start hidden and are revealed by JavaScript. Without it, show everything.
const noScriptStyles = `[data-reveal]{opacity:1!important;transform:none!important}[data-panel]{height:auto!important;opacity:1!important}`;

interface SiteDocumentProps {
  locale: Locale;
  /** Classes that expose the font variables for this language */
  fontClassName: string;
  children: ReactNode;
}

/**
 * The whole HTML document for one language: <html> with the right language and
 * direction, then header, page and footer. Each language's root layout (and the
 * 404 page) renders this, so they cannot drift apart.
 */
export function SiteDocument({ locale, fontClassName, children }: SiteDocumentProps) {
  const t = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={localeInfo[locale].dir}
      className={fontClassName}
      // Tells Next.js the page uses smooth scrolling, so it switches it off while changing routes.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        {/* First thing in <body>, so it runs before anything is painted. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{noScriptStyles}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-50 focus:rounded-[5px] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          {t.nav.skipToContent}
        </a>
        <I18nProvider locale={locale} dictionary={t}>
          <MotionProvider>
            <SiteHeader locale={locale} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter locale={locale} />
            <WhatsAppButton locale={locale} />
            <BackToTop />
          </MotionProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
