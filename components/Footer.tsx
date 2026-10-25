"use client";

import Image from "next/image";
import { ChevronUp, Clock, Mail, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/content";
import { LangToggle } from "./Nav";
import { GridLines, LinkedInIcon, Rule } from "./ui";

export default function Footer() {
  const { t } = useI18n();
  const f = t.footer;
  const heading = "mb-4 text-xs font-semibold tracking-[0.12em] text-white/45 uppercase";

  return (
    <footer className="grain relative bg-ink text-white">
      <GridLines />
      <div className="shell">
        <Rule />
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          <div className="sm:col-span-2 lg:col-span-1 lg:pr-8">
            <Image src="/images/logo-white.png" alt="FAR-IT" width={1051} height={408} className="h-10 w-auto" />
            <p className="mt-5 text-sm leading-relaxed text-white/60">{f.about}</p>
            <span className="mt-5 inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 text-xs font-medium text-lime">
              <span className="size-1.5 rounded-full bg-lime" /> {f.chip}
            </span>
          </div>

          <div className="lg:pl-8">
            <p className={heading}>{f.quick}</p>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-lime">
                  <Mail className="size-4 text-lime" /> {site.email}
                </a>
              </li>
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-lime" />
                <a href={site.maps} target="_blank" rel="noreferrer" className="hover:text-lime">
                  {t.contact.address}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4 text-lime" /> {f.hours}
              </li>
            </ul>
          </div>

          <div className="lg:pl-8">
            <p className={heading}>{f.team}</p>
            <ul className="space-y-3">
              {t.contact.team.map((m, i) => (
                <li key={m.name} className="bg-white/[0.03] p-3">
                  <a href={`tel:${m.tel}`} className="block text-sm font-semibold hover:text-lime">
                    {m.name}
                  </a>
                  <p className="text-xs text-white/55">{f.teamRoles[i]}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-8">
            <p className={heading}>{f.info}</p>
            <ul className="space-y-2.5 text-sm text-white/80">
              {f.infoLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-lime">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start justify-between gap-6 lg:items-end">
            <LangToggle id="footer" />
            <a href="#top" aria-label={f.top} className="grid size-11 place-items-center bg-lime text-ink transition-transform hover:-translate-y-1">
              <ChevronUp className="size-5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/[0.08] py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {f.copyright}
          </p>
          <div className="flex items-center gap-5">
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white">
              <LinkedInIcon className="size-3.5" /> LinkedIn
            </a>
            <a href="#" className="hover:text-white">
              {f.cookies}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
