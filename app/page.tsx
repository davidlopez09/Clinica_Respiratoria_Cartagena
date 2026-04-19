import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Specialists } from "@/components/specialists";
import { SleepCenter } from "@/components/sleep-center";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <Specialists />
      <SleepCenter />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
