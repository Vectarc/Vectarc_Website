import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen selection:bg-primary selection:text-primary-foreground overflow-x-hidden bg-background">
      {/* Background grain effect */}
      <div className="grain" />
      <Navbar />
      <main>
        <HeroSection />
        <div className="theme-dark">
          <CapabilitiesSection />
        </div>
        <div className="theme-light">
          <AboutSection />
        </div>
        <div className="theme-dark">
          <WorkSection />
        </div>
        <div className="theme-white">
          <ContactSection />
        </div>
      </main>
      <div className="theme-light">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
