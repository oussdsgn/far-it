"use client";

import { AnimatePresence, motion } from "motion/react";
import { Gauge, Handshake, PiggyBank, Plus, ScanSearch, ShieldCheck, Target, X } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Rays } from "./Hero";
import { Button, GridLines, Label, Reveal, Rule, SplitWords } from "./ui";

const icons = [Target, PiggyBank, Handshake, ScanSearch, ShieldCheck, Gauge];
const ease = [0.22, 1, 0.36, 1] as const;

export default function Engagements() {
  const { t, locale } = useI18n();
  const e = t.engagements;
  const [open, setOpen] = useState(0);

  return (
    <section className="grain relative overflow-hidden bg-ink">
      <GridLines />
      <Rays className="pointer-events-none absolute -left-28 top-10 w-[380px] text-white/[0.035]" />
      <div className="shell pt-24 lg:pt-32">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-0">
          <div className="lg:pt-3">
            <Label>{e.label}</Label>
          </div>
          <div className="lg:col-span-2">
            <h2 className="h-section" key={locale}>
              <SplitWords text={e.title} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">{e.sub}</p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-2 lg:flex lg:items-end lg:justify-end">
            <Button href="#process" className="w-full lg:w-auto">
              {e.cta}
            </Button>
          </Reveal>
        </div>

        <Rule className="mt-20" />

        <div className="grid gap-10 py-16 lg:grid-cols-5 lg:gap-0 lg:pb-28">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <span className="grid size-9 place-items-center bg-lime text-ink">
              <ShieldCheck className="size-5" />
            </span>
            <p className="mt-4 font-display text-4xl font-medium tracking-tight">{e.statValue}</p>
            <p className="mt-1 text-sm text-white/60">{e.statLabel}</p>
          </Reveal>

          <ul className="lg:col-span-4">
            {e.items.map((item, i) => {
              const isOpen = open === i;
              const Icon = icons[i];
              return (
                <li key={item.title} className="border-b border-white/[0.08] first:pt-0">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-end justify-between gap-6 py-6 text-left"
                  >
                    <span>
                      <span className="block text-sm text-white/45">
                        0{i + 1} / {locale === "fr" ? "Engagement" : "Commitment"}
                      </span>
                      <span
                        className={`mt-1 block font-display text-2xl font-medium tracking-[-0.03em] transition-colors sm:text-[2rem] ${
                          isOpen ? "text-white" : "text-white/45 group-hover:text-white/80"
                        }`}
                      >
                        {item.title}
                      </span>
                    </span>
                    <span className="flex items-center gap-4 pb-1">
                      <span className={`hidden border px-3 py-1.5 text-xs transition-colors md:inline ${isOpen ? "border-lime/40 text-lime" : "border-white/10 text-white/60"}`}>
                        {item.tag}
                      </span>
                      {isOpen ? <X className="size-6" strokeWidth={1.25} /> : <Plus className="size-7" strokeWidth={1.25} />}
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
                        <div className="relative mb-8 flex min-h-[260px] flex-col justify-end overflow-hidden bg-gradient-to-br from-ink-3 via-ink-2 to-[#0b2a1f] p-6 sm:p-8">
                          <Icon aria-hidden className="absolute top-6 right-6 size-40 text-lime/[0.07] sm:size-56" strokeWidth={1} />
                          <span className="absolute top-6 left-6 grid size-12 place-items-center bg-lime text-ink sm:left-8">
                            <Icon className="size-6" />
                          </span>
                          <p className="relative max-w-xl text-lg leading-relaxed text-white/90">{item.body}</p>
                          <a href="/contact" className="relative mt-6 w-fit border-b border-white/30 pb-0.5 text-sm text-white/70 transition-colors hover:border-lime hover:text-white">
                            {item.tag} →
                          </a>
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
