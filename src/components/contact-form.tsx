"use client";

import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Select } from "radix-ui";
import { useState, type FormEvent } from "react";
import { easeOutSoft } from "@/components/motion";
import { buttonClass } from "@/components/ui";
import { site } from "@/content/site";
import { localeInfo } from "@/i18n/config";
import { useI18n } from "@/i18n/provider";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "mt-2 w-full rounded-[5px] border border-line-strong bg-paper px-3.5 py-3 text-base text-ink placeholder:text-muted/70 transition-colors duration-200 hover:border-muted focus:border-ink focus:outline-none";

const swap = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: easeOutSoft },
} as const;

/** Sends the message to Formspree and reports the result in place, without leaving the page. */
export function ContactForm() {
  const { locale, t } = useI18n();
  const [status, setStatus] = useState<Status>("idle");
  const [projectType, setProjectType] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Bots fill every field, including the hidden one. Pretend it worked and send nothing.
    if (data.get("_gotcha")) {
      setStatus("sent");
      return;
    }

    // Tells you which language version of the site the message came from.
    data.append("site_language", locale);

    setStatus("sending");
    try {
      const response = await fetch(site.formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Form service answered ${response.status}`);
      form.reset();
      setProjectType("");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <m.div key="sent" role="status" className="flex-1 rounded-lg border border-line bg-wash p-8" {...swap}>
          <m.span
            className="grid size-10 place-items-center rounded-full bg-ok text-white"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.15 }}
          >
            <Check className="size-5" aria-hidden />
          </m.span>
          <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em]">{t.form.sentTitle}</h3>
          <p className="mt-2 leading-relaxed text-muted">{t.form.sentBody}</p>
          <button type="button" onClick={() => setStatus("idle")} className={buttonClass("secondary", "sm", "mt-6")}>
            {t.form.sendAnother}
          </button>
        </m.div>
      ) : (
        <m.form key="form" onSubmit={onSubmit} action={site.formEndpoint} method="POST" className="flex flex-1 flex-col gap-5" {...swap}>
          {/* Honeypot: hidden from people, visible to bots. */}
          <div className="absolute -start-[9999px]" aria-hidden>
            <label>
              {t.form.honeypot}
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              {t.form.name}
              <input type="text" name="name" required autoComplete="name" placeholder={t.form.namePlaceholder} className={fieldClass} />
            </label>
            <label className="block text-sm font-medium">
              {t.form.email}
              {/* Email addresses are typed left to right in every language. */}
              <input
                type="email"
                name="email"
                required
                dir="ltr"
                autoComplete="email"
                placeholder={t.form.emailPlaceholder}
                className={`${fieldClass} rtl:text-right`}
              />
            </label>
          </div>

          <div>
            <label htmlFor="project-type" className="block text-sm font-medium">
              {t.form.need}
            </label>
            {/* A custom list instead of the browser's <select>, so the open menu matches the site in both themes. */}
            <Select.Root name="project_type" required dir={localeInfo[locale].dir} value={projectType} onValueChange={setProjectType}>
              <Select.Trigger
                id="project-type"
                className={`${fieldClass} group flex items-center justify-between gap-3 text-start data-[placeholder]:text-muted/70`}
              >
                <Select.Value placeholder={t.form.needPlaceholder} />
                <Select.Icon>
                  <ChevronDown
                    className="size-4 text-muted transition-transform duration-300 group-data-[state=open]:rotate-180"
                    aria-hidden
                  />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  position="popper"
                  sideOffset={6}
                  className="z-50 w-[var(--radix-select-trigger-width)] origin-top overflow-hidden rounded-md border border-line-strong bg-paper text-ink shadow-[0_12px_32px_-8px_rgba(0,0,0,0.25)] data-[state=open]:animate-rise"
                >
                  <Select.Viewport className="p-1.5">
                    {t.form.types.map((type) => (
                      <Select.Item
                        key={type}
                        value={type}
                        className="flex cursor-pointer items-center justify-between gap-3 rounded px-3 py-2.5 text-[0.9375rem] outline-none transition-colors duration-150 select-none data-[highlighted]:bg-wash data-[state=checked]:font-medium"
                      >
                        <Select.ItemText>{type}</Select.ItemText>
                        <Select.ItemIndicator>
                          <Check className="size-4 text-accent" aria-hidden />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          {/* Grows to fill the column on wide screens, so the form matches the contact list's height. */}
          <label className="flex flex-1 flex-col text-sm font-medium">
            {t.form.message}
            <textarea
              name="message"
              required
              rows={5}
              placeholder={t.form.messagePlaceholder}
              className={`${fieldClass} min-h-36 flex-1 resize-y lg:resize-none`}
            />
          </label>

          {status === "error" ? (
            <m.p
              role="alert"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[5px] border border-danger/40 bg-danger/5 px-4 py-3 text-sm text-danger"
            >
              {t.form.error}{" "}
              <a href={`mailto:${site.email}`} className="font-medium underline">
                {site.email}
              </a>
            </m.p>
          ) : null}

          <div>
            <button type="submit" disabled={status === "sending"} className={buttonClass("primary", "md", "group disabled:opacity-60")}>
              {status === "sending" ? t.form.sending : t.form.send}
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                aria-hidden
              />
            </button>
          </div>
        </m.form>
      )}
    </AnimatePresence>
  );
}
