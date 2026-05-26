import Navbar from "../components/layout/Navbar";
import Ticker from "../components/layout/Ticker";
import HeroSection from "../components/hero/HeroSection";
import FeaturesSection from "../components/features/FeaturesSection";
import StatsSection from "../components/stats/StatsSection";
import CTASection from "../components/cta/CTASection";
import Footer from "../components/layout/Footer";
import BackgroundGrid from "../components/common/BackgroundGrid";

import "../styles/animations.css";
import "../styles/SectionDivider.css";

function LandingPage() {

  return (

    <div className="qs-root">

      <BackgroundGrid />

      <Navbar />

      <Ticker />

      <HeroSection />

      <FeaturesSection />

      <StatsSection />

      <CTASection />

      <Footer />

    </div>

  );

}

export default LandingPage;