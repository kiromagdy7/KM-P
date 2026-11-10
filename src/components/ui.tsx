import type { ReactNode } from "react";
import { Reveal } from "@/components/motion";

/** Joins class names, skipping empty values. */
export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

type ButtonVariant = "primary" | "secondary";

// `press` (globals.css) adds the transition and the slight give when clicked.
const buttonBase = "press inline-flex items-center justify-center gap-2 rounded-[5px] font-medium tracking-[-0.01em] select-none";

const buttonVariants: Record<ButtonVariant, string> = {
  // Solid: black on white (inverted in dark mode), brand blue on hover.
  primary: "bg-ink text-paper hover:bg-accent-solid hover:text-white",
  // Outlined: the border darkens and the surface tints on hover.
  secondary: "border border-line-strong text-ink hover:border-ink hover:bg-wash",
};

const buttonSizes = {
  md: "h-11 px-5 text-[0.9375rem]",
  sm: "h-9 px-3.5 text-sm",
};

/** Class string for anything that should look like a button (links included). */
export function buttonClass(variant: ButtonVariant = "primary", size: keyof typeof buttonSizes = "md", extra?: string) {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size], extra);
}

/** Round icon-only button used in the header and dialogs. */
export const iconButtonClass = "press grid size-10 place-items-center rounded-full text-ink hover:bg-wash";

/**
 * Page section with the site's two-column rhythm: the heading sits in a narrow
 * left column and stays in view while the content scrolls past on wide screens.
 * Heading and content fade up as the section scrolls into view.
 */
export function Section({
  id,
  title,
  lede,
  aside,
  children,
  className,
}: {
  id?: string;
  title: string;
  lede?: string;
  /** Optional link or note shown under the heading */
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("border-t border-line py-20 lg:py-28", className)}>
      <div className="container-site grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16">
        <Reveal as="header" className="lg:sticky lg:top-28 lg:self-start">
          <h2 id={headingId} className="text-heading font-semibold">
            {title}
          </h2>
          {lede ? <p className="mt-4 max-w-[34ch] text-[0.9375rem] leading-relaxed text-muted">{lede}</p> : null}
          {aside ? <div className="mt-6">{aside}</div> : null}
        </Reveal>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
