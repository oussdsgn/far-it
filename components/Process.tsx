"use client";

import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { Button, GridLines, Label, Reveal, Rule, SplitWords } from "./ui";

/** Clonix "Our Process" — four numbered steps with a visual tile and a CTA each. */
export default function Process() {
  const { t, locale } = useI18n();
  const p = t.process;

  return (
    <section id="process" className="grain relative scroll-mt-[70px] bg-white text-ink">
      <GridLines tone="light" />
      <div className="shell py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-0">
          <div className="lg:pt-3">
            <Label tone="light">{p.label}</Label>
          </div>
          <div className="lg:col-span-2">
            <h2 className="h-section" key={locale}>
              <SplitWords text={p.title} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone">{p.sub}</p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-2 lg:flex lg:items-end lg:justify-end">
            <Button href="/contact" variant="ink" className="w-full lg:w-auto">
              {p.cta}
            </Button>
          </Reveal>
        </div>

        <Rule tone="light" className="mt-20" />

        <ol className="mt-16 space-y-16 lg:space-y-6">
          {p.steps.map((s, i) => (
            <li key={s.title} className="grid gap-6 lg:grid-cols-5 lg:gap-0">
              <p className="text-[15px] font-medium">
                <span className="text-brand">{"//"}</span> 0{i + 1}
              </p>
              <Reveal className="lg:col-span-2 lg:pr-6">
                <div className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden bg-ink p-6 text-white">
                  <span aria-hidden className="absolute -right-3 -bottom-10 font-display text-[12rem] leading-none font-semibold text-white/[0.04]">
                    0{i + 1}
                  </span>
                  <div className="flex gap-1.5">
                    {p.steps.map((_, k) => (
                      <motion.span
                        key={k}
                        className={`h-1 flex-1 origin-left ${k <= i ? "bg-lime" : "bg-white/15"}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + k * 0.12, duration: 0.6 }}
                      />
                    ))}
                  </div>
                  <div className="relative">
                    <p className="font-display text-6xl font-medium tracking-[-0.05em] text-lime sm:text-7xl">{s.metric}</p>
                    <p className="mt-1 text-sm text-white/70">{s.metricLabel}</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="flex flex-col justify-between lg:col-span-2 lg:py-4">
                <div>
                  <h3 className="font-display text-3xl font-medium tracking-[-0.035em]">{s.title}.</h3>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone">{s.body}</p>
                </div>
                <Button href="/contact" variant="ink" className="mt-8 w-fit">
                  {p.cta}
                </Button>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
