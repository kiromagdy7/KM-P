"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import * as m from "motion/react-m";
import type { ReactNode } from "react";

/** The site's one easing curve (same as --ease-out-soft in globals.css). */
export const easeOutSoft = [0.16, 1, 0.3, 1] as const;

/**
 * Loads the animation engine once for the whole site. `LazyMotion` ships only
 * the features used here, and `reducedMotion="user"` turns movement off for
 * visitors who asked their device for less motion (fades remain).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

const tags = {
  div: m.div,
  ul: m.ul,
  ol: m.ol,
  li: m.li,
  dl: m.dl,
  article: m.article,
  header: m.header,
} as const;

type Tag = keyof typeof tags;

// Start a little before the element is fully on screen, and only once.
const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait after the element scrolls into view */
  delay?: number;
  as?: Tag;
}

/**
 * Fades content up into place the first time it scrolls into view.
 * `data-reveal` lets the <noscript> rule in layout.tsx show it when scripts are off.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = tags[as];
  return (
    <Component
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.75, ease: easeOutSoft, delay }}
    >
      {children}
    </Component>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Seconds between one child and the next */
  gap?: number;
}

/** Container whose <StaggerItem> children appear one after another. */
export function Stagger({ children, className, as = "div", gap = 0.09 }: StaggerProps) {
  const Component = tags[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: Tag }) {
  const Component = tags[as];
  return (
    <Component
      data-reveal
      className={className}
      variants={{
        hidden: { opacity: 0, y: 22 },
        shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutSoft } },
      }}
    >
      {children}
    </Component>
  );
}
