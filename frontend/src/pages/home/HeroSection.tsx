import React, { useState, useEffect } from "react";

// 💡 1. மேல இமேஜஸை Import செய்கிறோம்
// உன்னுடைய ஃபோல்டரில் உள்ள இமேஜ் பெயர்களுக்கு ஏத்த மாதிரி இதை மாற்றிக்கொள்
import wedding1 from "../../assets/tel1.jpg";
import wedding2 from "../../assets/tel4.jpg";
import wedding3 from "../../assets/tel6.jpg";

import birthday1 from "../../assets/bir1.jpg";
import birthday2 from "../../assets/bir2.jpg";
import birthday3 from "../../assets/bir2.jpg";

import traditional1 from "../../assets/tra.png";

// 💡 2. Import செய்த பெயர்களை இந்த Array-க்குள் வைக்கிறோம்
const images = [
  wedding1, wedding2, wedding3,
  birthday1, birthday2, birthday3,
  traditional1
];

const slideContent = [
  {
    title: "Timeless Wedding Memories",
    highlight: "Wedding"
  },
  {
    title: "Joyful Birthday Celebrations",
    highlight: "Birthday"
  },
  {
    title: "Authentic Traditional Functions",
    highlight: "Traditional"
  }
];

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getContentIndex = () => {
    if (current < 3) return 0; // முதல் 3 இமேஜுக்கு Wedding title
    if (current < 6) return 1; // அடுத்த 3 இமேஜுக்கு Birthday title
    return 2; // மற்றவற்றுக்கு Traditional title
  };

  const activeContent = slideContent[getContentIndex()];

  return (
    <section className="relative h-[90vh] overflow-hidden flex items-center justify-center text-white bg-black">
      
      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform ${
            index === current ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Content */}
      {/* <div className="relative z-10 text-center px-4 max-w-5xl">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-2xl transition-all duration-500">
          {activeContent.title.split(" ").map((word, i) => (
            <span 
              key={i} 
              className={word === activeContent.highlight ? "text-pink-500" : "text-white"}
            >
              {word}{" "}
            </span>
          ))}
        </h1>
      </div> */}

      {/* Slider Progress Indicators (Dots) */}
      <div className="absolute bottom-10 flex gap-3">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === current ? "w-10 bg-pink-500" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;