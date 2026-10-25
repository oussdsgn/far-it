"use client";

import Image from "next/image";
import { ArrowUpRight, Building2, CircleCheck, Lock, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/content";
import { Rays } from "./Hero";
import { GridLines, Label, Reveal, Rule, SplitWords } from "./ui";

type Status = "idle" | "sending" | "success" | "error" | "invalid";

/** Spinning circular text badge from the Clonix footer. */
function CircleBadge({ text }: { text: string }) {
  return (
    <div className="relative size-32 shrink-0 rounded-full bg-lime text-ink sm:size-36">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" aria-hidden>
        <defs>
          <path id="circle-text" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-ink text-[9.5px] font-semibold tracking-[0.18em] uppercase">
          <textPath href="#circle-text">{text.repeat(2)}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center text-2xl">✶</span>
    </div>
  );
}

export default function Contact({ standalone = false }: { standalone?: boolean }) {
  const { t, locale } = useI18n();
  const c = t.contact;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (!data.name?.trim() || !data.company?.trim() || !data.role?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const Heading = standalone ? "h1" : "h2";
  const field =
    "mt-2 w-full border border-transparent bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-black/35 outline-none transition-colors focus:border-ink focus:bg-white";
  const f = c.fields;

  return (
    <section id="contact" className={`grain relative scroll-mt-[70px] overflow-hidden bg-ink ${standalone ? "min-h-screen pt-[70px]" : ""}`}>
      <GridLines />
      <Rays className="pointer-events-none absolute -right-20 top-24 w-[460px] -scale-x-100 text-white/[0.035]" />
      <div className="shell pt-24 lg:pt-32">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-0">
          <div className="lg:pt-3">
            <Label>{c.label}</Label>
          </div>
          <div className="lg:col-span-3">
            <Heading className="h-display text-5xl sm:text-6xl lg:text-[4.2rem]" key={locale}>
              <SplitWords text={c.title} />
            </Heading>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/75">{c.sub}</p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="hidden lg:flex lg:items-start lg:justify-end">
            <CircleBadge text={c.badge} />
          </Reveal>
        </div>

        <Rule className="mt-20" />

        <div className="grid gap-10 py-16 lg:grid-cols-5 lg:gap-0 lg:pb-28">
          <div className="space-y-3 lg:col-span-2 lg:pr-10">
            {c.team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className="flex items-center gap-4 border border-white/10 bg-ink-2 p-4">
                  <Image src={m.photo} alt={m.name} width={64} height={64} className="size-14 object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-xl font-medium tracking-tight">{m.name}</p>
                    <p className="text-[11px] font-semibold tracking-[0.12em] text-lime uppercase">{m.role}</p>
                  </div>
                  <a
                    href={`tel:${m.tel}`}
                    className="flex items-center gap-2 bg-white/5 px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors hover:bg-lime hover:text-ink"
                  >
                    <Phone className="size-4" />
                    <span className="hidden sm:inline">{m.phone}</span>
                  </a>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.16}>
              <div className="flex gap-4 border border-white/10 p-4">
                <Building2 className="mt-0.5 size-5 shrink-0 text-lime" />
                <div className="text-sm">
                  <p className="font-semibold">{c.office}</p>
                  <p className="mt-1 text-white/65">{c.address}</p>
                  <a href={site.maps} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-lime hover:underline">
                    {c.maps} <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={onSubmit} noValidate className="bg-white p-6 text-ink sm:p-10">
              <h3 className="font-display text-3xl font-medium tracking-[-0.035em]">{c.formTitle}</h3>
              <p className="mt-2 text-sm text-stone">{c.formSub}</p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <label className="text-xs font-semibold">
                  {f.name.label} *
                  <input name="name" required autoComplete="name" placeholder={f.name.placeholder} className={field} />
                </label>
                <label className="text-xs font-semibold">
                  {f.company.label} *
                  <input name="company" required autoComplete="organization" placeholder={f.company.placeholder} className={field} />
                </label>
                <label className="text-xs font-semibold">
                  {f.email.label} *
                  <input name="email" type="email" required autoComplete="email" placeholder={f.email.placeholder} className={field} />
                </label>
                <label className="text-xs font-semibold">
                  {f.role.label} *
                  <input name="role" required placeholder={f.role.placeholder} className={field} />
                </label>
                <label className="text-xs font-semibold sm:col-span-2">
                  {f.message.label}
                  <textarea name="message" rows={4} placeholder={f.message.placeholder} className={`${field} resize-none`} />
                </label>
                {/* honeypot */}
                <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              </div>

              <p className="mt-5 flex items-center gap-2 text-xs text-stone">
                <Lock className="size-3.5 text-brand" /> {c.privacy}
              </p>

              <button
                type="submit"
                disabled={status === "sending"}
                className="group mt-6 flex w-full items-center justify-between bg-ink py-1 pr-1 pl-4 text-[15px] font-medium text-white transition-colors hover:bg-ink-3 disabled:opacity-60"
              >
                {status === "sending" ? c.sending : c.submit}
                <span className="grid size-10 place-items-center bg-lime text-ink">
                  <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>

              <div aria-live="polite" className="text-sm">
                {status === "success" && (
                  <p className="mt-4 flex items-start gap-2 bg-brand/10 p-3 text-brand">
                    <CircleCheck className="mt-0.5 size-4 shrink-0" /> {c.success}
                  </p>
                )}
                {status === "invalid" && <p className="mt-4 bg-red-50 p-3 text-red-700">{c.invalid}</p>}
                {status === "error" && (
                  <p className="mt-4 bg-red-50 p-3 text-red-700">
                    {c.error}{" "}
                    <a className="font-semibold underline" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
