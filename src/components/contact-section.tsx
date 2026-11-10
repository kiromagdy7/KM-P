import { Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { CopyButton } from "@/components/copy-button";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { buttonClass } from "@/components/ui";
import { site, whatsappUrl } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface ContactSectionProps {
  locale: Locale;
  /** h1 on the contact page, h2 when the section closes another page */
  headingLevel?: "h1" | "h2";
}

const rowClass = "flex items-center gap-4 border-b border-line py-4";
const valueClass = "font-medium transition-colors duration-200 hover:text-accent";

/** Every way to reach Kirollos, next to the message form. */
export function ContactSection({ locale, headingLevel: Heading = "h2" }: ContactSectionProps) {
  const t = getDictionary(locale);
  // Keep the heading outline in order: h1 > h2 on the contact page, h2 > h3 elsewhere.
  const FormHeading = Heading === "h1" ? "h2" : "h3";

  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-line py-20 lg:py-28">
      <div className="container-site grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal>
          <Heading id="contact-heading" className="text-title font-semibold">
            {t.contact.heading}
          </Heading>
          <p className="mt-6 max-w-[46ch] text-lead text-muted">{t.contact.lede}</p>

          <a
            href={whatsappUrl(t.site.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("primary", "md", "mt-8")}
          >
            <WhatsAppIcon className="size-4" />
            {t.actions.chatOnWhatsapp}
          </a>

          <ul className="mt-10 border-t border-line">
            <li className={rowClass}>
              <Mail className="size-5 shrink-0 text-muted" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted">{t.contact.email}</p>
                <a href={`mailto:${site.email}`} className={`${valueClass} break-words`}>
                  {site.email}
                </a>
              </div>
              <CopyButton value={site.email} label={t.contact.copyEmail} />
            </li>
            <li className={rowClass}>
              <Phone className="size-5 shrink-0 text-muted" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted">{t.contact.phone}</p>
                {/* dir="ltr" keeps the plus sign in front of the number in Arabic. */}
                <a href={`tel:${site.phone}`} dir="ltr" className={`${valueClass} inline-block`}>
                  {site.phoneDisplay}
                </a>
              </div>
              <CopyButton value={site.phone} label={t.contact.copyPhone} />
            </li>
            <li className={rowClass}>
              <LinkedInIcon className="size-5 shrink-0 text-muted" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted">LinkedIn</p>
                <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer me" className={valueClass}>
                  {site.linkedinHandle}
                </a>
              </div>
            </li>
            <li className={rowClass}>
              <GitHubIcon className="size-5 shrink-0 text-muted" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted">GitHub</p>
                <a href={site.social.github} target="_blank" rel="noopener noreferrer me" className={valueClass}>
                  {site.githubHandle}
                </a>
              </div>
            </li>
          </ul>
        </Reveal>

        {/* Flex column so the message box grows and both columns end on the same line. */}
        <Reveal delay={0.12} className="flex flex-col">
          <FormHeading className="text-xl font-semibold tracking-[-0.02em]">{t.contact.formHeading}</FormHeading>
          <div className="mt-6 flex flex-1 flex-col">
            <ContactForm />
          </div>
          <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-muted">{t.contact.basedIn}</p>
        </Reveal>
      </div>
    </section>
  );
}
