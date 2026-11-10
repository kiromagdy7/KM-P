"use client";

import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/components/ui";
import { fill, localeInfo } from "@/i18n/config";
import { useI18n } from "@/i18n/provider";

export interface GalleryItem {
  /** Full-size file, shown in the viewer */
  full: string;
  /** Smaller file for the grid */
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  title: string;
  group: string;
  alt: string;
}

interface GalleryProps {
  items: GalleryItem[];
  groups: { id: string; label: string }[];
  /** Which edge to keep when a thumbnail is cropped */
  align: "left" | "center";
}

const ALL = "all";

const arrowButton =
  "press absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 max-sm:top-auto max-sm:bottom-4 max-sm:translate-y-0";

/** Screenshot grid with group filters, name search for large sets, and a full-screen viewer. */
export function Gallery({ items, groups, align }: GalleryProps) {
  const { locale, t } = useI18n();
  const rtl = localeInfo[locale].dir === "rtl";

  const [group, setGroup] = useState(ALL);
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);

  const needle = query.trim().toLowerCase();
  const visible = useMemo(
    () => items.filter((item) => (group === ALL || item.group === group) && (!needle || item.title.toLowerCase().includes(needle))),
    [items, group, needle],
  );

  const current = openIndex === null ? undefined : visible[openIndex];
  const showFilters = groups.length > 1;
  const showSearch = items.length > 12;

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((index) => (index === null ? index : (index + delta + visible.length) % visible.length));
    },
    [visible.length],
  );

  function open(index: number) {
    setOpenIndex(index);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  // Arrow keys move between screenshots while the viewer is open.
  // In a right-to-left page, "next" is to the left.
  useEffect(() => {
    if (openIndex === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") step(rtl ? -1 : 1);
      if (event.key === "ArrowLeft") step(rtl ? 1 : -1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, step, rtl]);

  const filterButton = (id: string, label: string, count: number) => (
    <button
      key={id}
      type="button"
      aria-pressed={group === id}
      onClick={() => setGroup(id)}
      className={cn(
        "press rounded-full border px-3.5 py-1.5 text-sm",
        group === id ? "border-ink bg-ink text-paper" : "border-line text-muted hover:border-ink hover:text-ink",
      )}
    >
      {label} <span className="tabular-nums opacity-70">{count}</span>
    </button>
  );

  // Very tall captures (whole pages) scroll inside the viewer instead of shrinking to fit.
  const isTall = current ? current.height / current.width > 1.4 : false;
  const position = (openIndex ?? 0) + 1;

  return (
    <div>
      {showFilters || showSearch ? (
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {showFilters ? (
            <div className="flex flex-wrap gap-2" role="group" aria-label={t.gallery.filterLabel}>
              {filterButton(ALL, t.gallery.all, items.length)}
              {groups.map((entry) => filterButton(entry.id, entry.label, items.filter((item) => item.group === entry.id).length))}
            </div>
          ) : null}
          {showSearch ? (
            <label className="relative block lg:w-64">
              <span className="sr-only">{t.gallery.searchLabel}</span>
              <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.gallery.searchPlaceholder}
                className="h-10 w-full rounded-[5px] border border-line bg-paper ps-9 pe-3 text-sm transition-colors duration-200 placeholder:text-muted hover:border-line-strong focus:border-ink focus:outline-none"
              />
            </label>
          ) : null}
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {fill(t.gallery.showing, { shown: visible.length, total: items.length })}
      </p>

      {visible.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line-strong px-6 py-12 text-center text-muted">
          {fill(t.gallery.empty, { query })}
        </p>
      ) : (
        // Changing the filter or the search re-keys the list, so the new set eases in.
        <ul key={`${group}|${needle}`} className="grid animate-rise grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-3">
          {visible.map((item, index) => (
            <li key={item.full}>
              <button type="button" onClick={() => open(index)} className="group block w-full text-start">
                <span className="block aspect-[16/10] overflow-hidden rounded-md border border-line bg-wash">
                  <img
                    src={item.src}
                    srcSet={item.srcSet}
                    sizes={item.srcSet ? "(min-width: 64rem) 30vw, 46vw" : undefined}
                    width={item.width}
                    height={item.height}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      "size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]",
                      align === "left" ? "object-left-top" : "object-top",
                    )}
                  />
                </span>
                <span className="mt-2 block text-sm font-medium transition-colors duration-200 group-hover:text-accent sm:mt-2.5 sm:text-[0.9375rem]">
                  {item.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        aria-label={current ? fill(t.gallery.dialogLabel, { title: current.title, index: position, total: visible.length }) : t.project.screenshots}
        className="dialog-fade m-0 h-dvh w-screen bg-black/95 text-white backdrop:bg-black open:flex open:flex-col"
      >
        {current ? (
          <>
            <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="min-w-0 truncate text-[0.9375rem]">
                <span className="font-medium">{current.title}</span>
                <span dir="ltr" className="ms-3 inline-block tabular-nums text-white/60">
                  {position} / {visible.length}
                </span>
              </p>
              <button
                type="button"
                onClick={close}
                aria-label={t.gallery.close}
                className="press grid size-10 shrink-0 place-items-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <div
              className={cn("relative min-h-0 flex-1 px-2 pb-4 sm:px-16", isTall ? "overflow-y-auto" : "grid place-items-center")}
              onClick={(event) => {
                if (event.target === event.currentTarget) close();
              }}
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(event) => {
                const start = touchStartX.current;
                const end = event.changedTouches[0]?.clientX;
                touchStartX.current = null;
                if (start === null || end === undefined || Math.abs(end - start) < 60) return;
                // Swiping towards the reading direction's end shows the next one.
                const swipedLeft = end < start;
                step(swipedLeft === !rtl ? 1 : -1);
              }}
            >
              <img
                key={current.full}
                src={current.full}
                width={current.width}
                height={current.height}
                alt={current.alt}
                className={cn(
                  "animate-rise rounded-md bg-white/5",
                  isTall ? "mx-auto h-auto w-full max-w-5xl" : "max-h-full w-auto max-w-full object-contain",
                )}
              />
            </div>

            {visible.length > 1 ? (
              <>
                {/* "start" is the left edge in English and the right edge in Arabic; the chevrons flip to match. */}
                <button type="button" onClick={() => step(-1)} aria-label={t.gallery.previous} className={cn(arrowButton, "start-2")}>
                  <ChevronLeft className="size-6 rtl:-scale-x-100" aria-hidden />
                </button>
                <button type="button" onClick={() => step(1)} aria-label={t.gallery.next} className={cn(arrowButton, "end-2")}>
                  <ChevronRight className="size-6 rtl:-scale-x-100" aria-hidden />
                </button>
              </>
            ) : null}
          </>
        ) : null}
      </dialog>
    </div>
  );
}
