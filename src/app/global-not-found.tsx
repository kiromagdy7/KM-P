import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { SiteDocument } from "@/components/site-shell";
import { SiteLink as Link } from "@/components/site-link";
import { buttonClass } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import "./globals.css";

// The 404 page for any address that does not exist, in either language.
// With one root layout per language there is no single layout to build it
// from, so Next.js asks for a complete document here (see `globalNotFound`
// in next.config.ts). It is written out as /404.html, which Cloudflare serves
// with a 404 status.

const en = getDictionary("en");
const ar = getDictionary("ar");

export const metadata: Metadata = {
  title: `${en.notFound.title} | ${en.site.name}`,
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <SiteDocument locale="en" fontClassName={`${GeistSans.variable} ${GeistMono.variable}`}>
      <div className="container-site py-24 lg:py-36">
        <p className="font-mono text-sm text-muted">404</p>
        <h1 className="mt-4 text-title font-semibold">{en.notFound.heading}</h1>
        <p className="mt-6 max-w-[52ch] text-lead text-muted">{en.notFound.body}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className={buttonClass("primary")}>
            {en.notFound.home}
          </Link>
          <Link href="/work" className={buttonClass("secondary")}>
            {en.actions.seeWork}
          </Link>
          <Link href="/contact" className={buttonClass("secondary")}>
            {en.nav.contact}
          </Link>
        </div>

        {/* The address may have been an Arabic one, so offer the way back in Arabic too. */}
        <p lang="ar" dir="rtl" className="mt-14 border-t border-line pt-8 text-start text-muted">
          {ar.notFound.heading}.{" "}
          <a href="/ar" className="link-underline text-ink">
            {ar.notFound.home}
          </a>
        </p>
      </div>
    </SiteDocument>
  );
}
