import Hero from "@/components/home/Hero";
import Collections from "@/components/home/Collections";
import PrivilegeFAQ from "@/components/home/PrivilegeFAQ";
import AboutUS from "@/components/home/AboutUS";
import Glace from "@/components/concierge/Glace"; // อัปเดต Import

export default function HomePage() {
  return (
    <main className="relative w-full overflow-hidden">
      {/* SPA Module Sequence */}
      <Hero />
      <Collections />
      <PrivilegeFAQ />
      <AboutUS />

      {/* AI Assistant 'Glace' */}
      <Glace />
    </main>
  );
}

// Comment: SPA Entry Point confirmed. Integrated 'Glace' AI assistant.