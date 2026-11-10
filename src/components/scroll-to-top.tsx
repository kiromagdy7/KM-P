"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { easeOutSoft } from "@/components/motion";
import { SiteLink as Link } from "@/components/site-link";
import { useI18n } from "@/i18n/provider";

/**
 * Scrolls back to the top. The smooth glide comes from `scroll-behavior` in
 * globals.css, which is already switched off for visitors who prefer reduced motion.
 */
export function scrollToTop() {
  window.scrollTo({ top: 0 });
  // Drop a section anchor (e.g. "/#about") so the address matches what is on screen.
  if (window.location.hash) {
    history.replaceState(history.state, "", window.location.pathname + window.location.search);
  }
}

const normalise = (path: string) => path.replace(/\/+$/, "") || "/";

interface HomeLogoProps {
  href: string;
  label: string;
  className?: string;
  children: ReactNode;
}

/** The header logo: on the home page it scrolls to the top, elsewhere it goes home. */
export function HomeLogo({ href, label, className, children }: HomeLogoProps) {
  const pathname = usePathname();

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    // Let modified clicks (new tab, new window) behave like a normal link.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (normalise(pathname) !== normalise(href)) return;
    event.preventDefault();
    scrollToTop();
  }

  return (
    <Link href={href} aria-label={label} dir="ltr" lang="en" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

/** How far down (in viewport heights) the visitor scrolls before the button appears. */
const SHOW_AFTER = 0.8;

/** Floating "back to top" button, on large screens only (phones get the WhatsApp button there). */
export function BackToTop() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * SHOW_AFTER);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <m.button
          key="back-to-top"
          type="button"
          onClick={scrollToTop}
          aria-label={t.nav.backToTop}
          title={t.nav.backToTop}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.35, ease: easeOutSoft }}
          className="press group fixed end-6 bottom-6 z-30 hidden size-12 place-items-center rounded-full border border-line-strong bg-paper/85 text-ink shadow-[0_6px_24px_rgba(0,0,0,0.18)] backdrop-blur-md transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper lg:grid"
        >
          <ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
        </m.button>
      ) : null}
    </AnimatePresence>
  );
}
