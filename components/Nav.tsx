"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/content";
import { LinkedInIcon } from "./ui";

export function LangToggle({ className = "", id = "nav" }: { className?: string; id?: string }) {
  const { locale, setLocale, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t.nav.switchTo}
      className={`relative flex items-center border border-white/15 p-0.5 text-xs font-semibold ${className}`}
    >
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`relative z-10 w-9 py-1.5 uppercase transition-colors ${locale === l ? "text-ink" : "text-white/60 hover:text-white"}`}
        >
          {locale === l && (
            <motion.span layoutId={`lang-pill-${id}`} className="absolute inset-0 -z-10 bg-lime" transition={{ type: "spring", stiffness: 500, damping: 40 }} />
          )}
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Nav() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-lime/50 transition-colors duration-300 ${
          scrolled || open ? "bg-ink/90 backdrop-blur-md" : "bg-ink"
        }`}
      >
        <div className="shell flex h-[70px] items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-4" aria-label="FAR-IT">
            <Image src="/images/logo-white.png" alt="FAR-IT" width={1051} height={408} priority className="h-8 w-auto" />
            <span className="hidden border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70 md:inline">
              {t.nav.tagline}
            </span>
          </a>

          <div className="flex items-center gap-3 sm:gap-5">
            <LangToggle />
            <a
              href="#contact"
              className="hidden bg-lime px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-lime-soft sm:inline-block"
            >
              {t.nav.cta}
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? t.nav.close : t.nav.menu}
              className="group relative grid size-10 place-items-center"
            >
              <span
                className={`absolute right-1 h-px bg-white transition-all duration-300 ${
                  open ? "w-7 rotate-45" : "w-8 -translate-y-[5px] group-hover:w-6"
                }`}
              />
              <span
                className={`absolute right-1 h-px bg-white transition-all duration-300 ${
                  open ? "w-7 -rotate-45" : "w-5 translate-y-[5px] group-hover:w-8"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="grain fixed inset-0 z-40 overflow-y-auto bg-ink pt-[70px]"
          >
            <div className="shell grid gap-12 py-12 lg:grid-cols-5 lg:py-20">
              <ul className="lg:col-span-3 lg:col-start-2">
                {t.nav.links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-white/[0.08]"
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-5 py-3 font-display text-4xl font-medium tracking-[-0.04em] text-white/80 transition-colors hover:text-white sm:text-5xl"
                    >
                      <span className="w-8 font-sans text-sm tracking-normal text-lime">0{i + 1}</span>
                      <span className="transition-transform duration-500 group-hover:translate-x-3">{l.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4 text-sm text-white/70 lg:col-span-1"
              >
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail className="size-4 text-lime" /> {site.email}
                </a>
                {t.contact.team.map((m) => (
                  <a key={m.tel} href={`tel:${m.tel}`} className="flex items-center gap-2 hover:text-white">
                    <Phone className="size-4 text-lime" /> {m.name} · {m.phone}
                  </a>
                ))}
                <p className="flex gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-lime" /> {t.contact.address}
                </p>
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white">
                  <LinkedInIcon className="size-4 text-lime" /> LinkedIn
                </a>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
