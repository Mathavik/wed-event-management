import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import bride from "../../assets/wedding.jpg";
import ceremony from "../../assets/bir1.jpg";
import drone from "../../assets/tel5.jpg";
import decor from "../../assets/tra.png";
import celebration from "../../assets/about1.jpg";

const GalleryPage: React.FC = () => {
  const images = [ceremony, bride, drone, decor, celebration];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for right, -1 for left

  // Auto Slider
  useEffect(() => {
    const interval = setInterval(() => {
      moveStep(1);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const moveStep = (step: number) => {
    setDirection(step);
    setCurrentIndex((prev) => (prev + step + images.length) % images.length);
  };

  const getCardStyles = (offset: number) => {
    // Offset -2 (Far Left), -1 (Near Left), 0 (Center), 1 (Near Right), 2 (Far Right)
    const isCenter = offset === 0;
    const absOffset = Math.abs(offset);

    return {
      zIndex: 50 - absOffset * 10,
      x: offset * 220, // Distance between cards
      scale: 1 - absOffset * 0.15,
      rotateY: offset * -25, // 3D rotation angle
      opacity: 1 - absOffset * 0.3,
      filter: isCenter ? "grayscale(0%)" : "grayscale(40%)",
    };
  };

  return (
    <div className="min-h-screen bg-[#FCF9F6] py-20 overflow-hidden font-serif">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* HEADER */}
        <div className="mb-10">
          <p className="italic text-[#B18B5E] text-2xl">~ Wedding Gallery ~</p>
          <h1 className="text-5xl font-bold text-[#0A1D37] mt-2">Captures of Lovely Moments</h1>
        </div>

        {/* NAVIGATION TABS (Optional - Based on your screenshot) */}
        {/* <div className="flex justify-center gap-8 mb-12 text-sm font-semibold text-gray-500 tracking-widest uppercase">
          {["Birthday", "Decoration", "Drone", "House Warming", "Wedding"].map((tab) => (
            <span key={tab} className={`cursor-pointer hover:text-[#B18B5E] ${tab === 'Drone' ? 'text-[#B18B5E] border-b-2 border-[#B18B5E]' : ''}`}>
              {tab}
            </span>
          ))}
        </div> */}

        {/* 3D ANIMATED SLIDER */}
        <div className="relative flex items-center justify-center h-[550px]" style={{ perspective: "1500px" }}>
          
          {/* BUTTONS */}
          <button onClick={() => moveStep(-1)} className="absolute left-10 z-50 bg-white p-4 shadow-xl hover:bg-[#B18B5E] hover:text-white transition-all rounded-full">
            <ChevronLeft size={28} />
          </button>

          <div className="relative flex items-center justify-center w-full h-full">
            <AnimatePresence initial={false} custom={direction}>
              {[-2, -1, 0, 1, 2].map((offset) => {
                const index = (currentIndex + offset + images.length) % images.length;
                const styles = getCardStyles(offset);

                return (
                  <motion.div
                    key={`${index}-${offset}`}
                    initial={{ opacity: 0, x: direction * 300 }}
                    animate={styles}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                    }}
                    className="absolute w-[320px] md:w-[400px] h-[450px] md:h-[500px] border-[8px] border-white shadow-2xl cursor-pointer group"
                    style={{ position: "absolute" }}
                  >
                    <img src={images[index]} alt="gallery" className="w-full h-full object-cover" />
                    
                    {/* CENTER CARD OVERLAY */}
                    {/* {offset === 0 && (
                      <div className="absolute inset-0 border border-white/20">
                        <div className="absolute top-4 left-4 border-t-2 border-l-2 border-white w-12 h-12" />
                        <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-white w-12 h-12" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/10">
                          <div className="bg-white p-4 rounded-full shadow-lg">
                            <Search className="text-gray-800" />
                          </div>
                        </div>
                      </div>
                    )} */}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button onClick={() => moveStep(1)} className="absolute right-10 z-50 bg-white p-4 shadow-xl hover:bg-[#B18B5E] hover:text-white transition-all rounded-full">
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;