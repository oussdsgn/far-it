import type { Metadata } from "next";
import Nav from "@/components/Nav";
import LegalPage from "@/components/LegalPage";
import Footer from "@/components/Footer";
import { legalDocs } from "@/lib/legal";

export const metadata: Metadata = {
  title: legalDocs.mentions.fr.metaTitle,
  alternates: { canonical: "/mentions-legales" },
};

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <LegalPage doc="mentions" />
      </main>
      <Footer />
    </>
  );
}
