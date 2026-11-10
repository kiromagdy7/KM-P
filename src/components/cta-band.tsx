import { WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { SiteLink as Link } from "@/components/site-link";
import { buttonClass } from "@/components/ui";
import { whatsappUrl } from "@/content/site";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface CtaBandProps {
  locale: Locale;
  heading: string;
  body: string;
  /** Defaults to the general greeting */
  whatsappMessage?: string;
}

/** Closing prompt on project and service pages, so no page ends without a way to get in touch. */
export function CtaBand({ locale, heading, body, whatsappMessage }: CtaBandProps) {
  const t = getDictionary(locale);
  return (
    <section aria-label={t.contact.bandLabel} className="border-t border-line bg-wash py-16 lg:py-20">
      <Reveal className="container-site flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-heading font-semibold">{heading}</h2>
          <p className="mt-3 max-w-[56ch] leading-relaxed text-muted">{body}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <a
            href={whatsappUrl(whatsappMessage ?? t.site.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("primary")}
          >
            <WhatsAppIcon className="size-4" />
            {t.actions.chatOnWhatsapp}
          </a>
          <Link href={localePath(locale, "/contact")} className={buttonClass("secondary", "md", "bg-paper")}>
            {t.actions.sendMessage}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
