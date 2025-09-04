import HeaderNavigation from "@/components/sections/header-navigation";
import HeroSection from "@/components/sections/hero-section";
import ProjectGrid from "@/components/sections/project-grid";
import MissionStatement from "@/components/sections/mission-statement";
import ProjectShowcase from "@/components/sections/project-showcase";
import ServicesCta from "@/components/sections/services-cta";
import AboutAgency from "@/components/sections/about-agency";
import WomankindGrant from "@/components/sections/womankind-grant";
import SustainabilityCommitment from "@/components/sections/sustainability-commitment";
import Footer from "@/components/sections/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      
      <main>
        <HeroSection />
        <ProjectGrid />
        {/* <FeaturedProjects /> */}
        <MissionStatement />
        <ProjectShowcase />
        <ServicesCta />
        <AboutAgency />
        <WomankindGrant />
        <SustainabilityCommitment />
      </main>
      
      <Footer />
    </div>
  );
}