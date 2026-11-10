import { WhatsAppIcon } from "@/components/icons";
import { whatsappUrl } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Floating WhatsApp shortcut, shown on phones and tablets where chat is the fastest way to reach out. */
export function WhatsAppButton({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <a
      href={whatsappUrl(t.site.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.actions.chatOnWhatsapp}
      className="press fixed end-4 bottom-4 z-30 grid size-13 animate-rise place-items-center rounded-full bg-ink text-paper shadow-[0_6px_24px_rgba(0,0,0,0.22)] [animation-delay:1s] hover:bg-accent-solid hover:text-white lg:hidden"
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
