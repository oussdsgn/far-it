"use client";

import { motion, useInView, useMotionValue, animate } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Tone = "dark" | "light";

/** Vertical column guides that run through every section, Clonix-style. */
export function GridLines({ tone = "dark" }: { tone?: Tone }) {
  const color = tone === "dark" ? "bg-white/[0.06]" : "bg-black/[0.07]";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <div className="shell h-full">
        <div className="relative h-full">
        {[0, 20, 40, 60, 80, 100].map((p) => (
          <span key={p} className={`absolute top-0 h-full w-px ${color}`} style={{ left: `${p}%` }} />
        ))}
        </div>
      </div>
    </div>
  );
}

/** Horizontal rule with "+" crosshairs at the column joints. */
export function Rule({ tone = "dark", className = "" }: { tone?: Tone; className?: string }) {
  const line = tone === "dark" ? "bg-white/[0.08]" : "bg-black/[0.08]";
  const plus = tone === "dark" ? "text-white/25" : "text-black/25";
  return (
    <div aria-hidden className={`relative h-px w-full ${line} ${className}`}>
      {[0, 20, 40, 60, 80, 100].map((p) => (
        <span
          key={p}
          className={`absolute top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-xs leading-none lg:block ${plus}`}
          style={{ left: `${p}%` }}
        >
          +
        </span>
      ))}
    </div>
  );
}

/** "// Label" eyebrow. */
export function Label({ children, tone = "dark" }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <p className={`flex items-center gap-1 text-[15px] font-medium ${tone === "dark" ? "text-white" : "text-ink"}`}>
      <span className={tone === "dark" ? "text-lime" : "text-brand"}>{"//"}</span>
      {children}
    </p>
  );
}

type BtnProps = {
  href: string;
  children: React.ReactNode;
  variant?: "lime" | "ink" | "light";
  className?: string;
  external?: boolean;
};

/** Clonix CTA: a flat bar with a square arrow block on the right. */
export function Button({ href, children, variant = "lime", className = "", external }: BtnProps) {
  const styles = {
    lime: "bg-lime text-ink outline-lime [&_.arr]:bg-ink [&_.arr]:text-white",
    ink: "bg-ink text-white outline-ink [&_.arr]:bg-white [&_.arr]:text-ink",
    light: "bg-white text-ink outline-white [&_.arr]:bg-ink [&_.arr]:text-white",
  }[variant];
  const cls = `group inline-flex min-w-[15rem] items-center justify-between gap-6 py-1 pr-1 pl-3 text-[15px] font-medium outline-2 -outline-offset-2 transition-colors ${styles} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className="arr grid size-9 shrink-0 place-items-center overflow-hidden">
        <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </>
  );
  if (external)
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Fade-and-rise on scroll. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word headline reveal. Observes the wrapper: the words themselves start clipped, so they never intersect. */
export function SplitWords({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Counts up the numeric part of values like "98.4%", "0€", "1:1", "1 An". */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const decimals = match?.[1].includes(".") ? match[1].split(".")[1].length : 0;
  const hasNumber = match !== null;
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(hasNumber ? (0).toFixed(decimals) : value);

  useEffect(() => {
    if (!hasNumber || !inView) return;
    const controls = animate(mv, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, target, decimals, mv, hasNumber]);

  return (
    <span ref={ref} className={className}>
      {match ? (
        <>
          {display}
          <span className="text-lime">{match[2]}</span>
        </>
      ) : (
        value
      )}
    </span>
  );
}

export function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
