"use client";

import Image from "next/image";
import { Eye } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CountUp, GridLines, Label, Reveal, Rule } from "./ui";

export default function Numbers() {
  const { t } = useI18n();
  const n = t.numbers;

  return (
    <section className="grain relative bg-ink pb-24 lg:pb-32">
      <GridLines />
      <div className="shell">
        <Rule />
        <div className="grid gap-8 pt-16 lg:grid-cols-5 lg:gap-0">
          <div className="lg:pt-3">
            <Label>{n.label}</Label>
          </div>
          <Reveal className="lg:col-span-4">
            <p className="font-display text-[1.8rem] leading-[1.12] font-medium tracking-[-0.03em] sm:text-4xl lg:text-[2.6rem]">{n.statement}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-5 lg:gap-0">
          {n.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="lg:col-start-auto lg:row-start-1 lg:pr-8 lg:first:col-start-2">
              <CountUp value={s.value} className="block font-display text-5xl font-medium tracking-[-0.05em] sm:text-6xl" />
              <p className="mt-3 max-w-[14rem] text-[15px] leading-snug text-white/65">{s.label}</p>
            </Reveal>
          ))}
          <Reveal delay={0.3} className="col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:pr-8">
            <a href="#contact" className="group relative block aspect-[16/9] overflow-hidden lg:aspect-[4/3]">
              <Image src="/images/hero.jpg" alt="" fill sizes="(min-width:1024px) 256px, 100vw" className="object-cover object-[50%_25%] transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-3">
                <span className="grid size-8 shrink-0 place-items-center bg-lime text-ink">
                  <Eye className="size-4" />
                </span>
                <p className="text-xs leading-snug">{n.card}</p>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
