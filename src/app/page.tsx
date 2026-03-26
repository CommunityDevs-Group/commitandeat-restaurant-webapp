import AboutSection from "@/components/sections/AboutSection";
import Chefs_Speciealties_Section from "@/components/sections/Chefs_Speciealties_Section";
import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <main>
      {/* <h1>Commit &amp; Eat</h1>
      <p>Landing page – coming soon.</p> */}
      <HeroSection />
      <AboutSection />
      <Chefs_Speciealties_Section />
    </main>
  );
}
