import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import Apps from "./components/homepage/apps";
import AiDemo from "./components/homepage/ai-demo";
import Certifications from "./components/homepage/certifications";
import { certifications } from "@/utils/data/certifications";
import { experiences } from "@/utils/data/experience";
import { appsData } from "@/utils/data/apps-data";

export default async function Home() {

  return (
    <div suppressHydrationWarning >
      <HeroSection />
      <AboutSection />
      {experiences.length > 0 && <Experience />}
      <Skills />
      <Projects />
      <AiDemo />
      {appsData.length > 0 && <Apps />}
      {certifications.length > 0 && <Certifications />}
      <Education />
      <ContactSection />
    </div>
  )
};