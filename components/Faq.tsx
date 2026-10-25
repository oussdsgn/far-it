"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Rays } from "./Hero";
import { Button, GridLines, Label, Reveal, Rule, SplitWords } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Faq() {
  const { t, locale } = useI18n();
  const f = t.faq;
  const [group, setGroup] = useState(0);
  const [item, setItem] = useState<string | null>(null);

  return (
    <section id="faq" className="grain relative scroll-mt-[70px] overflow-hidden bg-paper text-ink">
      <GridLines tone="light" />
      <Rays className="pointer-events-none absolute -top-10 right-[8%] w-[360px] rotate-180 text-black/[0.04]" />
      <div className="shell py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-0">
          <div className="lg:pt-3">
            <Label tone="light">{f.label}</Label>
          </div>
          <div className="lg:col-span-2">
            <h2 className="h-section" key={locale}>
              <SplitWords text={f.title} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone">{f.sub}</p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-2 lg:flex lg:items-end lg:justify-end">
            <Button href="#contact" variant="ink" className="w-full lg:w-auto">
              {f.cta}
            </Button>
          </Reveal>
        </div>

        <Rule tone="light" className="mt-20" />

        <div className="grid gap-8 pt-16 lg:grid-cols-5 lg:gap-0">
          <div className="lg:pt-2">
            <Label tone="light">{f.groupsLabel}</Label>
          </div>
          <div className="lg:col-span-4">
            {f.groups.map((g, gi) => {
              const isOpen = group === gi;
              return (
                <div key={g.title} className="border-b border-black/[0.08] first:pt-0">
                  <button
                    type="button"
                    onClick={() => setGroup(isOpen ? -1 : gi)}
                    aria-expanded={isOpen}
                    className="grid w-full items-center gap-2 py-7 text-left sm:grid-cols-2 sm:gap-0"
                  >
                    <span className={`font-display text-2xl font-medium tracking-[-0.03em] transition-colors sm:text-3xl ${isOpen ? "text-ink" : "text-black/40"}`}>
                      {g.title}
                    </span>
                    <span className="flex items-center justify-between gap-6 text-sm text-stone">
                      {g.intro}
                      <Plus className={`size-6 shrink-0 text-ink transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`} strokeWidth={1.25} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease }}
                        className="overflow-hidden"
                      >
                        <ul className="pb-8">
                          {g.items.map((qa) => {
                            const id = `${gi}-${qa.q}`;
                            const qOpen = item === id;
                            return (
                              <li key={qa.q} className="border-t border-black/[0.06] sm:grid sm:grid-cols-2">
                                <button
                                  type="button"
                                  onClick={() => setItem(qOpen ? null : id)}
                                  aria-expanded={qOpen}
                                  className="flex w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-medium sm:pr-10"
                                >
                                  {qa.q}
                                  <Plus className={`size-4 shrink-0 transition-transform sm:hidden ${qOpen ? "rotate-45" : ""}`} />
                                </button>
                                {/* Answers always visible on wide screens, like Clonix's two-column layout */}
                                <p className={`pb-4 text-sm leading-relaxed text-stone sm:block sm:py-4 ${qOpen ? "block" : "hidden"}`}>{qa.a}</p>
                              </li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
