import React from 'react';
import aboutImage from "../../assets/about1.jpg"; 

const WeddingServices = () => {
  const eventFeatures = [
    { title: "Grand Weddings", desc: "Curating bespoke luxury weddings from engagement to the grand reception." },
    { title: "Corporate Galas", desc: "Professional event management for product launches and corporate milestones." },
    { title: "Social Celebrations", desc: "Vibrant birthday bashes, anniversaries, and intimate family gatherings." },
    { title: "Theme Decors", desc: "Innovative and traditional floral arrangements tailored to your vision." }
  ];

  return (
    <section className="py-16 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-start gap-12">
        
        {/* Left Side: Image - Starts at the top */}
        <div className="w-full lg:w-1/2">
          <div className="relative rounded-[2rem] overflow-hidden shadow-xl">
            <img 
              src={aboutImage} 
              alt="Luxury Event Decor" 
              className="w-full h-[450px] md:h-[550px] object-cover block"
            />
            {/* <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <p className="text-pink-600 font-bold text-xs tracking-widest">ESTD. 2024</p>
            </div> */}
          </div>
        </div>

        {/* Right Side: Content - Aligned exactly with image top */}
        <div className="w-full lg:w-1/2 pt-2"> {/* pt-2 matches the image's visual start */}
          <div className="flex items-center gap-3 mb-4">
            {/* <div className="w-10 h-[2px] bg-pink-600"></div>
            <span className="text-pink-600 font-bold tracking-[0.2em] uppercase text-[10px]">
              Premier Event Specialists
            </span> */}
          </div>
{/* Section Title */}
<p
  className="text-center italic text-2xl mb-2"
  style={{
    fontFamily: "Georgia, serif",
    color: "#b08a5b"
  }}
>
  ~ About Us ~
</p>

{/* Main Heading */}
<h2
  className="text-center text-5xl md:text-6xl font-bold mb-4"
  style={{
    fontFamily: "Georgia, serif",
    color: "#0f2235"
  }}
>
  Crafting Beautiful Celebrations
</h2>

{/* Decorative Line */}
<div className="flex justify-center mb-8">
  <div className="w-24 h-[2px]" style={{ background: "#b08a5b" }}></div>
</div>
<p className="text-gray-500 text-base leading-relaxed max-w-xl mb-4">
  At <strong>Kalyana Vaibhogam</strong>, we specialize in creating
  unforgettable celebrations filled with elegance, beauty, and joy.
  Our dedicated team carefully plans every detail to ensure your
  special moments become lifelong memories.
</p>

<p className="text-gray-500 text-base leading-relaxed max-w-xl">
  From weddings and birthdays to traditional ceremonies and
  corporate events, we deliver exceptional experiences with
  creativity, passion, and perfect coordination.
</p>

          {/* Quote Block */}
          {/* <div className="p-6 bg-slate-50 rounded-xl border-l-4 border-pink-600 mb-8">
            <p className="text-slate-700 font-medium italic text-base">
              "We engineer emotions and capture memories that last a lifetime."
            </p>
          </div> */}
          
          {/* <div className="flex gap-4">
            <button className="px-8 py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-pink-600 transition-all text-xs tracking-widest uppercase">
              Start Planning
            </button>
          </div> */}
        </div>

      </div>
    </section>
  );
};

export default WeddingServices;