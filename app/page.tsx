import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import TopBar from "@/components/layout/TopBar";
import Hero from "@/components/sections/Hero/Hero";
import Intro from "@/components/sections/Introduction/Intro";
import Services from "@/components/sections/Services/Services";
import WhyUs from "@/components/sections/WhyUs/WhyUs";
import PracticeHighlights from "@/components/sections/Practice-Highlights/PracticeHighlights";
import StickyBentoScrollSection from "@/components/sections/BentoScroll/BentoScroll";

// HERO V2
import HeroV2 from "@/components/sections/Hero/Herov2";
import HeroV3 from "@/components/sections/Hero/HeroV3";

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        {/* <Hero /> */}
        {/* <HeroV2 /> */}
        <HeroV3 />
        <PracticeHighlights />
        <StickyBentoScrollSection />
        <Intro />
        <Services />
        <WhyUs />
      </main>
      <Footer />
    </>
  );
}
