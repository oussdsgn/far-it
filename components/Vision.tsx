"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button, GridLines, Label, Reveal, Rule, SplitWords } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

/** Clonix "About us" — founders' words + an awards-style table repurposed for FAR-IT's expertise areas. */
export default function Vision() {
  const { t, locale } = useI18n();
  const v = t.vision;
  const [open, setOpen] = useState(0);

  return (
    <section className="grain relative bg-paper text-ink">
      <GridLines tone="light" />
      <div className="shell py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-0">
          <div className="lg:pt-3">
            <Label tone="light">{v.label}</Label>
          </div>
          <div className="lg:col-span-3 lg:pr-12">
            <h2 className="h-section" key={locale}>
              <SplitWords text={v.title} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-stone">{v.body}</p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:flex lg:items-end lg:justify-end">
            <Button href="#references" variant="ink" className="w-full lg:w-auto lg:min-w-0">
              {v.cta}
            </Button>
          </Reveal>
        </div>

        <Rule tone="light" className="mt-20" />

        <div className="grid gap-8 pt-16 lg:grid-cols-5 lg:gap-0">
          <div className="lg:pt-2">
            <Label tone="light">{v.quoteLabel}</Label>
          </div>
          <Reveal className="flex gap-3 lg:col-span-1 lg:pr-8">
            {t.contact.team.map((m) => (
              <div key={m.name} className="relative aspect-square w-1/2 overflow-hidden bg-ink">
                <Image src={m.photo} alt={m.name} fill sizes="128px" className="object-cover grayscale transition duration-500 hover:grayscale-0" />
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <span aria-hidden className="block font-serif text-7xl leading-[0.6] text-brand">&ldquo;</span>
            <blockquote className="mt-4 font-display text-3xl leading-[1.1] font-medium tracking-[-0.035em] sm:text-[2.6rem]">{v.quote}</blockquote>
            <p className="mt-6 text-right text-[15px] font-medium">{v.quoteBy}</p>
            <p className="text-right text-sm text-stone">{v.quoteRole}</p>
          </Reveal>
        </div>

        <Rule tone="light" className="mt-20" />

        <div className="grid gap-6 pt-16 lg:grid-cols-5 lg:gap-0">
          <div className="lg:pt-2">
            <Label tone="light">{v.expertiseLabel}</Label>
          </div>
          <Reveal className="lg:col-span-2">
            <h3 className="font-display text-3xl font-medium tracking-[-0.035em] sm:text-4xl">{v.expertiseTitle}</h3>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <p className="text-[15px] leading-relaxed text-stone lg:ml-auto lg:max-w-[15rem] lg:text-right">{v.expertiseSub}</p>
          </Reveal>
        </div>

        <div className="mt-12 lg:grid lg:grid-cols-5">
          <div className="lg:col-span-4 lg:col-start-2">
            <div className="grid grid-cols-[3rem_1fr_auto] border-b border-black/10 pb-3 text-sm font-medium sm:grid-cols-4">
              <span>{v.expertiseHead[0]}</span>
              <span className="sm:col-span-2">{v.expertiseHead[1]}</span>
              <span className="hidden text-right sm:block">{v.expertiseHead[2]}</span>
            </div>
            <ul>
              {v.expertise.map((x, i) => {
                const isOpen = open === i;
                return (
                  <li key={x.name} className="border-b border-black/[0.08]">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="grid w-full grid-cols-[3rem_1fr_auto] items-center py-5 text-left sm:grid-cols-4"
                    >
                      <span className={`text-sm ${isOpen ? "text-ink" : "text-black/40"}`}>{"//"} 0{i + 1}</span>
                      <span className={`flex items-center justify-between gap-4 font-display text-xl font-medium tracking-tight transition-colors sm:col-span-2 sm:pr-10 ${isOpen ? "text-ink" : "text-black/45"}`}>
                        {x.name}
                        <Plus className={`size-5 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`} strokeWidth={1.5} />
                      </span>
                      <span className={`hidden text-right text-sm sm:block ${isOpen ? "text-ink" : "text-black/45"}`}>{x.roles}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 sm:grid sm:grid-cols-4">
                            <div className="sm:col-span-2 sm:col-start-2">
                              <p className="text-sm text-stone sm:hidden">{x.roles}</p>
                              <div className="mt-3 flex flex-wrap gap-2 sm:mt-0">
                                {x.roles.split(" · ").map((r) => (
                                  <span key={r} className="bg-white px-3 py-1.5 text-xs font-medium">
                                    {r}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
