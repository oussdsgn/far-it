import type { Metadata } from "next";
import Nav from "@/components/Nav";
import LegalPage from "@/components/LegalPage";
import Footer from "@/components/Footer";
import { legalDocs } from "@/lib/legal";

export const metadata: Metadata = {
  title: legalDocs.privacy.fr.metaTitle,
  alternates: { canonical: "/politique-de-confidentialite" },
};

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <LegalPage doc="privacy" />
      </main>
      <Footer />
    </>
  );
}
