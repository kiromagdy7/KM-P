"use client";

import * as m from "motion/react-m";
import { useEffect, type ReactNode } from "react";
import { easeOutSoft } from "@/components/motion";

// The first page a visitor opens is already on screen as plain HTML, so it is
// left alone. Every page they navigate to afterwards eases in.
let isFirstPage = true;

/**
 * Used as each language's `template.tsx`, which Next.js remounts on every
 * navigation. That makes it the place for a page transition, and it gives each
 * page a single root element, which keeps the router's "scroll to the top of
 * the new page" logic reliable.
 *
 * The outer element only fades. The slide happens on the inner one, because
 * the router measures the outer element's position to decide where to scroll,
 * and a moving target would leave the page a few pixels off the top.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const entering = !isFirstPage;

  useEffect(() => {
    isFirstPage = false;
  }, []);

  return (
    <m.div initial={entering ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: "easeOut" }}>
      <m.div initial={entering ? { y: 14 } : false} animate={{ y: 0 }} transition={{ duration: 0.55, ease: easeOutSoft }}>
        {children}
      </m.div>
    </m.div>
  );
}
