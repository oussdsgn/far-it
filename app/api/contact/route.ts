import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: unknown, max = 200) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots fill every field; pretend success.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(body.name),
    company: clean(body.company),
    email: clean(body.email),
    role: clean(body.role),
    message: clean(body.message, 4000),
    locale: body.locale === "en" ? "en" : "fr",
  };

  if (!lead.name || !lead.company || !lead.role || !EMAIL_RE.test(lead.email)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!SMTP_HOST) {
    console.warn("[contact] SMTP_HOST not set — lead not delivered:", lead);
    return NextResponse.json({ error: "mail_not_configured" }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT) === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  const rows: [string, string][] = [
    ["Nom", lead.name],
    ["Entreprise", lead.company],
    ["Email", lead.email],
    ["Poste recherché", lead.role],
    ["Précisions", lead.message || "—"],
    ["Langue du site", lead.locale.toUpperCase()],
  ];

  try {
    await transporter.sendMail({
      from: CONTACT_FROM ?? "FAR-IT Site <no-reply@far-it.com>",
      to: CONTACT_TO ?? "gestion@far-it.com",
      replyTo: lead.email,
      subject: `Nouvelle mission de chasse — ${lead.role} · ${lead.company}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `<table cellpadding="6">${rows
        .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
        .join("")}</table>`,
    });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
