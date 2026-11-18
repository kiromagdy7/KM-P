import { ArrowUpRight, Star } from "lucide-react";
import { GoogleIcon } from "@/components/icons";
import { SiteLink as Link } from "@/components/site-link";
import { cn } from "@/components/ui";
import { googleReviews, type Review } from "@/content/reviews";
import { getProject } from "@/content/work";
import { fill, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Five filled stars. Purely visual: the rating is spelled out next to it. */
export function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex gap-[0.1em] text-[#f5a623]", className)} aria-hidden>
      {[0, 1, 2, 3, 4].map((index) => (
        <Star key={index} className="size-[1em] fill-current" strokeWidth={0} />
      ))}
    </span>
  );
}

/**
 * The Google rating as a link to the reviews on Google, so a visitor can check
 * them where they were written.
 */
export function GoogleRating({
  locale,
  stacked = false,
  className,
}: {
  locale: Locale;
  /** Put the review count on its own line, for narrow columns */
  stacked?: boolean;
  className?: string;
}) {
  const t = getDictionary(locale);
  const values = { rating: googleReviews.rating.toFixed(1), count: googleReviews.count };

  return (
    <a
      href={googleReviews.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={fill(t.reviews.googleAria, values)}
      className={cn(
        "group inline-flex text-[0.9375rem]",
        stacked ? "flex-col items-start gap-2" : "items-center gap-x-2.5 gap-y-1",
        className,
      )}
    >
      <span className="inline-flex items-center gap-2.5">
        <GoogleIcon className="size-[1.125rem] shrink-0" />
        <span className="font-semibold tabular-nums">{values.rating}</span>
        <Stars className="text-[0.9375rem]" />
      </span>
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
        <span className="text-muted underline decoration-line-strong underline-offset-4 transition-colors duration-200 group-hover:text-ink group-hover:decoration-ink">
          {fill(t.reviews.googleCount, values)}
        </span>
        <ArrowUpRight
          className="size-3.5 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
          aria-hidden
        />
      </span>
    </a>
  );
}

function Paragraphs({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {text.split("\n\n").map((paragraph, index) => (
        <p key={index} className="whitespace-pre-line">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/**
 * One review. When it was written in the other language, the translation is
 * shown, marked as such, with the client's own words in a disclosure below it.
 */
export function ReviewCard({
  review,
  locale,
  large = false,
  showProject = true,
  glowOnTarget = false,
}: {
  review: Review;
  locale: Locale;
  /** Bigger text, for a single review on a project page */
  large?: boolean;
  /** Link to the project the review is about */
  showProject?: boolean;
  /** Glow when the page is opened at the card's section (#review) */
  glowOnTarget?: boolean;
}) {
  const t = getDictionary(locale);
  const original = review.lang === locale;
  const project = showProject && review.project ? getProject(locale, review.project) : undefined;
  const originalDir = review.lang === "ar" ? "rtl" : "ltr";

  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-lg border border-line bg-paper",
        large ? "p-7 sm:p-10" : "p-6 sm:p-7",
        glowOnTarget && "motion-safe:[:target_&]:animate-review-glow motion-reduce:[:target_&]:border-accent",
      )}
    >
      <Stars className={large ? "text-lg" : "text-[0.9375rem]"} />

      <blockquote
        lang={original ? review.lang : locale}
        className={cn("mt-5 leading-relaxed", large ? "text-lead" : "text-[0.9375rem] sm:text-base")}
      >
        <Paragraphs text={original ? review.text : review.translation} />
      </blockquote>

      {!original ? (
        <details className="group/original mt-4 text-sm text-muted">
          <summary className="press inline-flex cursor-pointer list-none items-center gap-1.5 select-none hover:text-ink [&::-webkit-details-marker]:hidden">
            {t.reviews.translated}
            <span aria-hidden>·</span>
            <span className="underline decoration-line-strong underline-offset-4">
              <span className="group-open/original:hidden">{t.reviews.showOriginal}</span>
              <span className="hidden group-open/original:inline">{t.reviews.hideOriginal}</span>
            </span>
          </summary>
          <blockquote lang={review.lang} dir={originalDir} className="mt-3 border-s-2 border-line ps-4 leading-relaxed text-ink/80">
            <Paragraphs text={review.text} />
          </blockquote>
        </details>
      ) : null}

      <figcaption className="mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-1 pt-6">
        <span>
          <span className="block font-semibold">{review.name[locale]}</span>
          {review.context ? <span className="mt-0.5 block text-sm text-muted">{review.context[locale]}</span> : null}
        </span>
        {project ? (
          <Link href={localePath(locale, `/work/${project.slug}`)} className="link-underline text-sm">
            {t.reviews.seeProject}
          </Link>
        ) : null}
      </figcaption>
    </figure>
  );
}
