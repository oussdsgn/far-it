"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { legalDocs, type LegalItem, type LegalKey } from "@/lib/legal";
import { Rays } from "./Hero";
import { Button, GridLines, Label, Reveal, Rule, SplitWords } from "./ui";

function ItemText({ item }: { item: LegalItem }) {
  if (!item.href) return <>{item.text}</>;
  const cls = "font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand";
  return item.href.startsWith("/") ? (
    <Link href={item.href} className={cls}>
      {item.text}
    </Link>
  ) : (
    <a href={item.href} className={cls}>
      {item.text}
    </a>
  );
}

/** Shared layout for the "Mentions légales" and "Politique de confidentialité" pages. */
export default function LegalPage({ doc }: { doc: LegalKey }) {
  const { t, locale } = useI18n();
  const d = legalDocs[doc][locale];

  useEffect(() => {
    document.title = d.metaTitle;
  }, [d.metaTitle]);

  return (
    <>
      <section className="grain relative overflow-hidden bg-ink pt-[70px]">
        <GridLines />
        <Rays className="pointer-events-none absolute -left-24 top-24 w-[380px] text-white/[0.035]" />
        <div className="shell">
          <Rule className="mt-20" />
          <div className="grid gap-8 pt-16 pb-20 lg:grid-cols-5 lg:gap-0 lg:pb-28">
            <div className="lg:pt-3">
              <Label>{d.label}</Label>
            </div>
            <div className="lg:col-span-4">
              <h1 className="h-display text-5xl sm:text-6xl lg:text-[4.2rem]" key={locale}>
                <SplitWords text={d.title} />
              </h1>
              {d.intro && (
                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/75">{d.intro}</p>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="grain relative bg-paper text-ink">
        <GridLines tone="light" />
        <div className="shell grid gap-12 py-20 lg:grid-cols-5 lg:gap-0 lg:py-28">
          <nav aria-label={d.tocLabel} className="lg:sticky lg:top-28 lg:self-start lg:pr-8">
            <p className="mb-4 text-xs font-semibold tracking-[0.12em] text-stone uppercase">{d.tocLabel}</p>
            <ol className="space-y-2.5 text-sm">
              {d.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-ink/70 transition-colors hover:text-brand">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="lg:col-span-3">
            {d.notice && <p className="mb-10 border-l-2 border-lime bg-white px-4 py-3 text-sm text-stone">{d.notice}</p>}
            {d.sections.map((s, i) => (
              <Reveal key={s.id} delay={0.05}>
                <article id={s.id} className={`scroll-mt-28 ${i ? "mt-14 border-t border-black/[0.08] pt-14" : ""}`}>
                  <h2 className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl">{s.title}</h2>
                  <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-stone">
                    {s.blocks.map((b, k) =>
                      b.type === "p" ? (
                        <p key={k}>{b.text}</p>
                      ) : b.items.every((it) => it.label && it.text.length < 60) ? (
                        <dl key={k} className="divide-y divide-black/[0.06] border-y border-black/[0.06]">
                          {b.items.map((it) => (
                            <div key={it.label} className="grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] sm:gap-6">
                              <dt className="text-ink">{it.label}</dt>
                              <dd>
                                <ItemText item={it} />
                              </dd>
                            </div>
                          ))}
                        </dl>
                      ) : (
                        <ul key={k} className="space-y-3">
                          {b.items.map((it) => (
                            <li key={it.text} className="relative pl-5">
                              <span aria-hidden className="absolute top-[0.6em] left-0 size-1.5 bg-brand" />
                              {it.label && <span className="font-medium text-ink">{it.label}{locale === "fr" ? "\u00a0: " : ": "}</span>}
                              <ItemText item={it} />
                            </li>
                          ))}
                        </ul>
                      ),
                    )}
                  </div>
                </article>
              </Reveal>
            ))}

            <div className="mt-16 border-t border-black/[0.08] pt-10">
              <Button href="/contact" variant="ink">
                {d.contactCta}
              </Button>
              <p className="mt-4 text-sm text-stone">{t.contact.address}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
