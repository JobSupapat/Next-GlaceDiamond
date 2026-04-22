"use client";

import Hero from "@/components/home/Hero";
import Collections from "@/components/home/Collections";
import PrivilegeFAQ from "@/components/home/PrivilegeFAQ";
import AboutUS from "@/components/home/AboutUS";
import Glace from "@/components/concierge/Glace";

export default function HomePage() {
  return (
    <main className="relative w-full overflow-hidden">
      {/* SPA Module Sequence with IDs for Navigation */}
      <section id="home">
        <Hero />
      </section>

      <section id="collections">
        <Collections />
      </section>

      <section id="faq">
        <PrivilegeFAQ />
      </section>

      <section id="about">
        <AboutUS />
      </section>

      {/* AI Assistant 'Glace' */}
      <Glace />
    </main>
  );
}

// Rule 4: SPA Entry Point confirmed. Integrated 'Glace' AI assistant.