"use client";

import { motion } from "motion/react";
import { CircleCheck, RefreshCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CountUp, GridLines, Reveal } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The "Rendez-vous de transparence" dashboard from the redesign, presented in
 * the lime-framed full-width slot Clonix uses for its showreel.
 */
export default function Console() {
  const { t } = useI18n();
  const c = t.console;
  const bars = [
    { w: "45%", cls: "bg-white" },
    { w: "28%", cls: "bg-brand-bright" },
    { w: "17%", cls: "bg-lime" },
  ];

  return (
    <section aria-label={c.label} className="grain relative bg-ink pb-24">
      <GridLines />
      <div className="shell">
        <Reveal>
          <div className="relative border-[6px] border-lime bg-ink-2 p-5 sm:p-8 lg:p-12">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center bg-lime text-ink">
                  <RefreshCcw className="size-5" />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl">{c.title}</h2>
                  <p className="text-sm text-white/60">{c.sub}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 border border-lime/40 px-3 py-1.5 text-xs font-semibold text-lime">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-lime opacity-60" />
                  <span className="relative size-2 rounded-full bg-lime" />
                </span>
                {c.live}
              </span>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
                  <span className="text-white/60">{c.progress}</span>
                  <span className="font-semibold">{c.coverage}</span>
                </div>
                <div className="mt-4 flex h-3 overflow-hidden bg-white/10">
                  {bars.map((b, i) => (
                    <motion.span
                      key={i}
                      className={`h-full ${b.cls}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: b.w }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.25, duration: 1, ease }}
                    />
                  ))}
                </div>

                <dl className="mt-10 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
                  {c.funnel.map((f, i) => (
                    <div key={f.label} className="bg-ink-2 py-5 pr-4 sm:pl-4 sm:first:pl-0">
                      <dt className="sr-only">{f.label}</dt>
                      <dd>
                        <CountUp
                          value={String(f.value)}
                          className={`block font-display text-5xl font-medium tracking-[-0.04em] ${i === 2 ? "text-lime" : i === 1 ? "text-brand-bright" : ""}`}
                        />
                        <span className="mt-1 block text-sm text-white/60">{f.label}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-white/50 uppercase">{c.profilesTitle}</p>
                <ul className="mt-4 space-y-3">
                  {c.profiles.map((p, i) => (
                    <motion.li
                      key={p.initials}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.15, duration: 0.7, ease }}
                      className="flex items-center gap-4 border border-white/10 bg-ink-3/60 p-4"
                    >
                      <span className={`grid size-11 shrink-0 place-items-center text-sm font-bold ${i ? "bg-brand text-white" : "bg-white text-ink"}`}>
                        {p.initials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{p.role}</p>
                        <p className="truncate text-xs text-white/55">{p.meta}</p>
                      </div>
                      <span className="hidden shrink-0 bg-lime px-2 py-1 text-[11px] font-bold text-ink sm:inline">{p.score}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs">
                  <span className="flex items-center gap-2 text-white/70">
                    <CircleCheck className="size-4 text-brand-bright" /> {c.report}
                  </span>
                  <span className="font-semibold">{c.confidential}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
