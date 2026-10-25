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
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
