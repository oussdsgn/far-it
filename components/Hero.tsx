"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Compass, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/content";
import { Button, GridLines, Label, Rule, SplitWords } from "./ui";

/** FAR-IT "rays" mark, echoing the logo, used as the oversized background motif. */
function Rays({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className} fill="currentColor">
      <rect x="20" y="88" width="180" height="22" rx="11" transform="rotate(-28 110 99)" />
      <rect x="40" y="120" width="160" height="22" rx="11" transform="rotate(-14 120 131)" />
      <rect x="60" y="150" width="140" height="22" rx="11" transform="rotate(-2 130 161)" />
    </svg>
  );
}

export { Rays };

export default function Hero() {
  const { t, locale } = useI18n();
  const ease = [0.22, 1, 0.36, 1] as const;
  const marquee = site.clients.filter((c) => c.mono);

  return (
    <section id="top" className="grain relative overflow-hidden bg-ink pt-[70px]">
      <GridLines />
      <Rays className="pointer-events-none absolute -left-24 top-48 w-[420px] text-white/[0.035]" />
      <div className="shell">
        <Rule className="mt-20" />
      </div>

      <div className="shell relative grid gap-10 pt-16 pb-14 lg:grid-cols-5 lg:gap-0 lg:pt-24">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="lg:pt-3">
          <Label>{t.hero.label}</Label>
        </motion.div>

        <div className="lg:col-span-3 lg:pr-12" key={locale}>
          <h1 className="h-display text-[2.6rem] sm:text-6xl lg:text-[4.1rem] xl:text-[4.5rem]">
            <SplitWords text={t.hero.titleBefore} />{" "}
            <span className="relative inline-block text-lime">
              <SplitWords text={t.hero.titleAccent} delay={0.15} />
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-lime"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.8, ease }}
              />
            </span>
            <SplitWords text={t.hero.titleAfter} delay={0.25} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease }}
            className="mt-8 max-w-xl text-[17px] leading-relaxed text-white/80"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8, ease }}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <Button href="#contact">{t.hero.ctaPrimary}</Button>
            <a href="#approche" className="group inline-flex items-center gap-2 text-[15px] font-medium text-white/80 hover:text-white">
              <Compass className="size-4 text-lime" />
              <span className="border-b border-white/30 pb-0.5 transition-colors group-hover:border-lime">{t.hero.ctaSecondary}</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="mt-10 flex items-center gap-5"
          >
            <div className="flex">
              {t.contact.team.map((m, i) => (
                <Image
                  key={m.name}
                  src={m.photo}
                  alt={m.name}
                  width={64}
                  height={64}
                  className={`size-14 border-2 border-white object-cover ${i ? "-ml-2 rotate-3" : "-rotate-3"}`}
                />
              ))}
            </div>
            <div className="text-sm">
              <p className="text-white/60">{t.hero.foundedBy}</p>
              <p className="text-[15px] text-white">{t.hero.founders}</p>
            </div>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease }}
          className="flex flex-col gap-10 sm:flex-row lg:flex-col"
        >
          <div className="flex items-center justify-center gap-2 text-white/70 sm:w-1/2 lg:w-auto">
            <Laurel />
            <div className="text-center">
              <p className="font-display text-4xl font-semibold tracking-tight text-white">{t.hero.badgeTop}</p>
              <p className="mt-1 text-[10px] font-semibold tracking-[0.18em] uppercase">{t.hero.badgeBottom}</p>
            </div>
            <Laurel flip />
          </div>

          <a href="#approche" className="group block sm:w-1/2 lg:w-auto">
            <p className="mb-3 flex items-center gap-1.5 text-[15px] font-medium">
              <Zap className="size-4 fill-lime text-lime" /> {t.hero.featured}
            </p>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/hero.jpg"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 256px, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-3 pt-10">
                <span className="inline-flex items-center gap-1.5 bg-white/10 px-2 py-1 text-[11px] font-medium backdrop-blur">
                  <span className="size-1.5 animate-pulse rounded-full bg-lime" /> Live Search
                </span>
              </div>
            </div>
            <p className="mt-3 text-[15px] leading-snug text-white/60 transition-colors group-hover:text-white">{t.hero.featuredCaption}</p>
          </a>
        </motion.aside>
      </div>

      <div className="shell grid pb-14 lg:grid-cols-5">
        <div className="min-w-0 lg:col-span-3 lg:col-start-2 lg:pr-12">
          <p className="mb-5 text-sm text-white/50">{t.hero.trusted}</p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-14">
              {[...marquee, ...marquee].map((c, i) => (
                <Image
                  key={`${c.name}-${i}`}
                  src={c.src}
                  alt={i < marquee.length ? c.name : ""}
                  width={c.w}
                  height={c.h}
                  className="h-7 w-auto max-w-[120px] object-contain opacity-70 brightness-0 invert"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Laurel({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 32 64" className={`h-16 w-8 ${flip ? "-scale-x-100" : ""}`} fill="currentColor" aria-hidden>
      {[8, 18, 28, 38, 48].map((y, i) => (
        <ellipse key={y} cx={14 + i * 1.2} cy={y} rx="3.2" ry="6.5" transform={`rotate(${-35 + i * 6} ${14 + i * 1.2} ${y})`} />
      ))}
      <path d="M22 4 C 10 20, 10 44, 24 62" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
