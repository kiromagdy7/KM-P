"use client";

import { Plus } from "lucide-react";
import * as m from "motion/react-m";
import { useId, useState } from "react";
import { easeOutSoft } from "@/components/motion";

/**
 * Questions that open one at a time, with the answer sliding open.
 * Every answer stays in the page's HTML while closed, so search engines and
 * AI assistants can still read it.
 */
export function FaqList({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="border-t border-line">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={faq.question} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-start text-lg font-medium tracking-[-0.01em] transition-colors duration-200 hover:text-accent"
              >
                {faq.question}
                <m.span
                  aria-hidden
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: easeOutSoft }}
                  className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors duration-200 group-hover:border-accent group-hover:text-accent"
                >
                  <Plus className="size-4" />
                </m.span>
              </button>
            </h3>
            <m.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              data-panel
              // Closed panels are skipped by the keyboard and by screen readers.
              inert={!open}
              initial={false}
              animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
              // A slower, even curve than the rest of the site: the panel should
              // visibly unfold instead of snapping most of the way open at once.
              transition={{
                height: { duration: 0.55, ease: [0.33, 0.9, 0.4, 1] },
                opacity: { duration: open ? 0.5 : 0.2, delay: open ? 0.12 : 0 },
              }}
              className="overflow-hidden"
            >
              <p className="max-w-[68ch] pb-6 leading-relaxed text-muted">{faq.answer}</p>
            </m.div>
          </div>
        );
      })}
    </div>
  );
}
