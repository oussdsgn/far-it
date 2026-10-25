import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Console from "@/components/Console";
import Why from "@/components/Why";
import Engagements from "@/components/Engagements";
import Numbers from "@/components/Numbers";
import Vision from "@/components/Vision";
import Clients from "@/components/Clients";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { DocumentTitle } from "@/lib/i18n";

export default function Home() {
  return (
    <>
      <DocumentTitle page="home" />
      <Nav />
      <main>
        <Hero />
        <Console />
        <Why />
        <Engagements />
        <Numbers />
        <Vision />
        <Clients />
        <Process />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
