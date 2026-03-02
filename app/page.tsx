import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero/Hero";
import Intro from "@/components/sections/Introduction/Intro";
import Services from "@/components/sections/Services/Services";
import WhyUs from "@/components/sections/WhyUs/WhyUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Services />
        <WhyUs />
      </main>
      <Footer />
    </>
  );
}
