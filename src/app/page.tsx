import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WhatIBuild from "@/components/sections/WhatIBuild";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import TechStack from "@/components/sections/TechStack";
import GitHub from "@/components/sections/GitHub";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhatIBuild />
        <FeaturedProjects />
        <Experience />
        <Education />
        <TechStack />
        <GitHub />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
