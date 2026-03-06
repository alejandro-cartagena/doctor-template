import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import TopBar from "@/components/layout/TopBar";
import Hero from "@/components/sections/Hero/Hero";
import Intro from "@/components/sections/Introduction/Intro";
import Services from "@/components/sections/Services/Services";
import WhyUs from "@/components/sections/WhyUs/WhyUs";
import PracticeHighlights from "@/components/sections/Practice-Highlights/PracticeHighlights";
import StickyBentoScrollSection from "@/components/sections/BentoScroll/BentoScroll";
import Testimonials from "@/components/sections/Testimonials/Testimonials";
import Marquee from "@/components/sections/Marquee/Marquee";
import Cta from "@/components/sections/CTA/Cta";
import OurTeam from "@/components/sections/OurTeam/OurTeam";
import Location from "@/components/sections/Location/Location";
import MainDoctor from "@/components/sections/MainDoctor/MainDoctor";
import Contact from "@/components/sections/Contact/Contact";

// HERO V2
import HeroV2 from "@/components/sections/Hero/Herov2";
import HeroV3 from "@/components/sections/Hero/HeroV3";

// SERVICES V2
import ServicesV2 from "@/components/sections/Services/ServicesV2";

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
        <ServicesV2 />
        <StickyBentoScrollSection />
        {/* <Testimonials /> */}
        <MainDoctor />
        <OurTeam />
        <Cta />
        <Marquee />
        {/* <Intro /> */}
        {/* <Services /> */}
        {/* <WhyUs /> */}
        <Location />
        <Contact />
        
      </main>
      <Footer />
    </>
  );
}
