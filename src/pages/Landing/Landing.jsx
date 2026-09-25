import LandingNavbar from "../../components/LandingComponents/LandingNavbar";
import HeroSection from "../../components/LandingComponents/HeroSection";
import AboutSection from "../../components/LandingComponents/AboutSection";
import ServicesSection from "../../components/LandingComponents/ServicesSection";
import TestimonialsSection from "../../components/LandingComponents/TestimonialsSection";
import CtaSection from "../../components/LandingComponents/CtaSection";
import LandingFooter from "../../components/LandingComponents/LandingFooter";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default Landing;
