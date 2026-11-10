"use client";

import type { MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { iconButtonClass } from "@/components/ui";
import { useI18n } from "@/i18n/provider";

/** Length of the theme switch animation, in milliseconds. */
const DURATION = 900;
/** Same curve as `--ease-out-soft` in globals.css. */
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Switches between light and dark. The choice is saved; until the visitor
 * chooses, the site follows the device setting (see the script in site-shell.tsx).
 *
 * The new theme spreads out from the button as a growing circle (View
 * Transitions API). Browsers without it get a short colour cross-fade instead,
 * and visitors who prefer reduced motion get an instant switch.
 */
export function ThemeToggle() {
  const { t } = useI18n();

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const dark = !root.classList.contains("dark");

    function apply() {
      root.classList.toggle("dark", dark);
      try {
        localStorage.setItem("theme", dark ? "dark" : "light");
      } catch {
        // Storage can be blocked (private mode). The theme still changes for this visit.
      }
    }

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }

    // Fallback: let every colour ease into the new palette for a moment.
    if (!("startViewTransition" in document)) {
      root.classList.add("theme-fade");
      apply();
      window.setTimeout(() => root.classList.remove("theme-fade"), DURATION);
      return;
    }

    // Centre of the button, and the distance to the farthest screen corner.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(apply);
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: DURATION, easing: EASING, pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {
        // The transition was skipped; the theme has already been applied.
      });
  }

  const iconClass =
    "col-start-1 row-start-1 size-[1.125rem] transition-[rotate,scale,opacity] duration-500 ease-out-soft";

  return (
    <button type="button" onClick={toggle} aria-label={t.nav.themeToggle} className={iconButtonClass}>
      <span className="grid place-items-center" aria-hidden>
        <Moon className={`${iconClass} dark:scale-50 dark:-rotate-90 dark:opacity-0`} />
        <Sun className={`${iconClass} scale-50 rotate-90 opacity-0 dark:scale-100 dark:rotate-0 dark:opacity-100`} />
      </span>
    </button>
  );
}
