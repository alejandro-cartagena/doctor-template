import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero/Hero";
import Intro from "@/components/sections/Introduction/Intro";
import Services from "@/components/sections/Services/Services";
import WhyUs from "@/components/sections/WhyUs/WhyUs";

// HERO V2
import HeroV2 from "@/components/sections/Hero/Herov2";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* <Hero /> */}
        <HeroV2 />
        <Intro />
        <Services />
        <WhyUs />
      </main>
      <Footer />
    </>
  );
}
