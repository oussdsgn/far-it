"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Compass } from "lucide-react";
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

        <div className="lg:col-span-4" key={locale}>
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
            <Button href="/contact">{t.hero.ctaPrimary}</Button>
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

      </div>

      <div className="shell grid pb-14 lg:grid-cols-5">
        <div className="min-w-0 lg:col-span-4 lg:col-start-2">
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

