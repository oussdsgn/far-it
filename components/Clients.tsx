"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/content";
import { Rays } from "./Hero";
import { Button, CountUp, GridLines, Label, Reveal, Rule, SplitWords } from "./ui";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/** Clonix "Our Projects" slot → FAR-IT client references. */
export default function Clients() {
  const { t, locale } = useI18n();
  const c = t.clients;

  return (
    <section id="references" className="grain relative scroll-mt-[70px] overflow-hidden bg-ink">
      <GridLines />
      <Rays className="pointer-events-none absolute -left-24 top-16 w-[400px] text-white/[0.035]" />
      <div className="shell py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-0">
          <div className="lg:pt-3">
            <Label>{c.label}</Label>
          </div>
          <div className="lg:col-span-2">
            <h2 className="h-section" key={locale}>
              <SplitWords text={c.title} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">{c.sub}</p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-2 lg:flex lg:items-end lg:justify-end">
            <Button href="/contact" className="w-full lg:w-auto">
              {t.nav.cta}
            </Button>
          </Reveal>
        </div>

        <Rule className="mt-20" />

        <ul className="mt-16 grid grid-cols-2 gap-px bg-white/[0.08] sm:grid-cols-3 lg:grid-cols-5">
          {site.clients.map((logo, i) => (
            <motion.li
              key={logo.name}
              {...rise((i % 5) * 0.06)}
              className="group relative flex aspect-[3/2] items-center justify-center bg-white p-6 transition-colors hover:bg-paper sm:p-8"
            >
                <span className="absolute top-3 left-3 text-[11px] text-black/40">{logo.name}</span>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.w}
                  height={logo.h}
                  className="max-h-[56%] w-auto max-w-[78%] object-contain transition-transform duration-500 group-hover:scale-105"
                />
            </motion.li>
          ))}
          <motion.li {...rise(0.3)} className="flex aspect-[3/2] flex-col items-center justify-center bg-lime p-6 text-center text-ink">
              <CountUp value={c.statValue} className="font-display text-4xl font-semibold tracking-tight [&_span]:text-ink" />
              <span className="mt-1 text-xs font-medium">{c.statLabel}</span>
          </motion.li>
        </ul>
      </div>
    </section>
  );
}
