import HeroSection from "../home/HeroSection";
import DreamWedding from "../home/DreamWedding";
import FeaturedPackages from "../home/FeaturedPackages";
import ServicesOverview from "../home/ServicesOverview";
import TestimonialsSection from "../home/TestimonialsSection";
import ContactCTA from "../home/ContactCTA";
import KalyanaVaibhogamPage from "./Gallery";
import GalleryPage from "./Gallery";

const Home = () => {
  return (
    <>
      <HeroSection />
      <DreamWedding />
      {/* <FeaturedPackages /> */}
      <ServicesOverview />
      <GalleryPage/>
      <TestimonialsSection />
      <ContactCTA />
    </>
  );
};

export default Home;