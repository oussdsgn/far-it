"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { CircleCheck, Plus } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button, GridLines, Label, Reveal, Rule, SplitWords } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

/** Light "Why choose" block: vision intro + the 3-part commercial offer as a numbered accordion. */
export default function Why() {
  const { t, locale } = useI18n();
  const w = t.why;
  const [open, setOpen] = useState(0);

  return (
    <section id="approche" className="grain relative scroll-mt-[70px] bg-paper text-ink">
      <GridLines tone="light" />
      <div className="shell pt-24 lg:pt-32">
        <Rule tone="light" />
        <div className="grid gap-8 pt-16 lg:grid-cols-5 lg:gap-0">
          <div className="lg:pt-3">
            <Label tone="light">{w.label}</Label>
          </div>
          <div className="lg:col-span-3 lg:pr-12">
            <h2 className="h-section" key={locale}>
              <SplitWords text={w.title} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-stone">{w.body}</p>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-12 grid items-center gap-8 lg:grid-cols-5 lg:gap-0">
          <div className="flex items-center gap-4 lg:col-span-2 lg:col-start-2">
            <div className="flex">
              {t.contact.team.map((m, i) => (
                <Image key={m.name} src={m.photo} alt={m.name} width={56} height={56} className={`size-12 object-cover ${i ? "-ml-1" : ""}`} />
              ))}
            </div>
            <div className="text-sm">
              <p className="text-stone">{w.singleSub}</p>
              <p className="font-medium">{w.single}</p>
            </div>
          </div>
          <div className="lg:col-span-2 lg:flex lg:justify-end">
            <Button href="#contact" variant="ink" className="w-full lg:w-auto">
              {w.cta}
            </Button>
          </div>
        </Reveal>

        <Rule tone="light" className="mt-20" />

        <div id="offre" className="scroll-mt-[90px] pt-16 pb-24 lg:pb-32">
          <div className="grid gap-6 lg:grid-cols-5 lg:gap-0">
            <div className="lg:pt-2">
              <Label tone="light">{w.offerLabel}</Label>
            </div>
            <Reveal className="lg:col-span-2">
              <h3 className="font-display text-3xl font-medium tracking-[-0.035em] sm:text-4xl">{w.offerTitle}</h3>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-2 lg:pl-12">
              <p className="text-[15px] leading-relaxed text-stone lg:text-right">{w.offerSub}</p>
            </Reveal>
          </div>

          <ul className="mt-14">
            {w.offers.map((o, i) => {
              const isOpen = open === i;
              return (
                <li key={o.title} className="border-t border-black/[0.08] last:border-b">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="grid w-full grid-cols-[3.5rem_1fr_auto] items-center gap-4 py-8 text-left lg:grid-cols-5 lg:gap-0"
                  >
                    <span className={`font-display text-4xl font-medium tracking-tight transition-colors lg:col-start-2 ${isOpen ? "text-ink" : "text-black/30"}`}>
                      0{i + 1}
                    </span>
                    <span className={`font-display text-2xl font-medium tracking-[-0.03em] transition-colors sm:text-[2rem] lg:col-span-2 ${isOpen ? "text-ink" : "text-black/45"}`}>
                      {o.title}
                    </span>
                    <span className="flex items-center justify-end gap-4">
                      <span className="hidden bg-white px-2.5 py-1 text-xs font-semibold text-brand sm:inline">{o.tag}</span>
                      <Plus className={`size-7 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`} strokeWidth={1.25} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 pb-10 lg:grid-cols-5 lg:gap-0">
                          <div className="space-y-4 text-[15px] leading-relaxed text-stone lg:col-span-2 lg:col-start-3 lg:pr-12">
                            {o.body.map((p) => (
                              <p key={p}>{p}</p>
                            ))}
                          </div>
                          <div className="relative flex min-h-[220px] flex-col justify-between overflow-hidden bg-ink p-6 text-white">
                            <span aria-hidden className="pointer-events-none absolute -top-6 -right-2 font-display text-[11rem] leading-none font-semibold text-white/[0.04]">
                              0{i + 1}
                            </span>
                            <span className="relative w-fit bg-lime px-2.5 py-1 text-xs font-bold text-ink">{o.tag}</span>
                            {o.highlight ? (
                              <div className="relative mt-8 border-l-2 border-lime pl-4">
                                <p className="text-sm font-semibold text-lime">{o.highlight.title}</p>
                                <p className="mt-1 text-sm text-white/75">{o.highlight.text}</p>
                              </div>
                            ) : null}
                            <p className="relative mt-8 flex items-center gap-2 border-t border-white/10 pt-4 text-sm font-medium">
                              <CircleCheck className="size-4 text-brand-bright" /> {o.foot}
                            </p>
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
    </section>
  );
}
