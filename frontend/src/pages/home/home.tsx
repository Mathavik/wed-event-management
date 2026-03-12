import HeroSection from "../home/HeroSection";
import DreamWedding from "../home/DreamWedding";
import FeaturedPackages from "../home/FeaturedPackages";
import ServicesOverview from "../home/ServicesOverview";
import TestimonialsSection from "../home/TestimonialsSection";
import ContactCTA from "../home/ContactCTA";
import GalleryPage from "./Gallery";
import EventPlannerHero from "./EventPlannerHero";

const Home = () => {
  return (
    <>
      <HeroSection />
      <DreamWedding />
      {/* <FeaturedPackages /> */}

      <ServicesOverview />
      <EventPlannerHero/>
      <ContactCTA />
    <GalleryPage/>

      <TestimonialsSection />
    </>
  );
};

export default Home;