import HeroSection from "../home/HeroSection";
import DreamWedding from "../home/DreamWedding";
import FeaturedPackages from "../home/FeaturedPackages";
import ServicesOverview from "../home/ServicesOverview";
import TestimonialsSection from "../home/TestimonialsSection";
import GalleryPreview from "../home/GalleryPreview";
import ContactCTA from "../home/ContactCTA";

const Home = () => {
  return (
    <>
      <HeroSection />
      <DreamWedding />
      <FeaturedPackages />
      <ServicesOverview />
      <TestimonialsSection />
      <GalleryPreview />
      <ContactCTA />
    </>
  );
};

export default Home;