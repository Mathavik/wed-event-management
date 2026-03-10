import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Framer Motion import pannunga
import bgImage from "../../assets/about1.jpg";
import swirl from "../../assets/cta_title_left.svg";

const ContactCTA = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative py-14 flex items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0A1D37]/70"></div>

      {/* Content with Animation */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }} // Start: Left-la 100px thalli, invisible-a irukum
        whileInView={{ opacity: 1, x: 0 }} // Scroll panni varappa: Normal position-ku varum
        transition={{ 
          duration: 1.2, // Animation evlo neram nadakanum (slow-a vara 1.2s)
          ease: "easeOut" 
        }}
        viewport={{ once: true }} // Oru thadava mattum animation nadaka
        className="relative z-10 flex flex-wrap items-center justify-center gap-6 px-4"
      >
        {/* LEFT SWIRL */}
        <img
          src={swirl}
          alt="swirl-left"
          className="w-16 md:w-28 opacity-90"
        />

        {/* TEXT */}
        <h2 className="text-2xl md:text-4xl font-serif font-semibold tracking-wide text-center">
          We Make Your Dreams Come True
        </h2>

        {/* RIGHT SWIRL */}
        <img
          src={swirl}
          alt="swirl-right"
          className="w-16 md:w-28 rotate-180 opacity-90"
        />

        {/* BUTTON */}
        <button
          onClick={() => navigate("/contact")}
          className="ml-0 md:ml-8 bg-[#D6A77A] hover:bg-[#c5966a] text-white px-8 py-3 font-semibold tracking-wide transition-colors"
        >
          CONTACT US
        </button>
      </motion.div>
    </section>
  );
};

export default ContactCTA;