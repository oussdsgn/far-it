import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { DocumentTitle } from "@/lib/i18n";
import { dictionaries } from "@/lib/content";

export const metadata: Metadata = {
  title: dictionaries.fr.contact.metaTitle,
  description: dictionaries.fr.contact.sub,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <DocumentTitle page="contact" />
      <Nav />
      <main>
        <Contact standalone />
      </main>
      <Footer />
    </>
  );
}
