import React from 'react';

const EventPlannerHero: React.FC = () => {
  return (
    <div className="w-full bg-white font-sans overflow-hidden">
      {/* Container: Max width vachuruken so screen perusa irunthalum neat-ah center-la irukkum */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center min-h-[75vh] px-8 md:px-16 py-12 gap-10 md:gap-20">
        
        {/* Left Section: Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1">
          
          {/* Subheading: Screenshot-la ulla mathiriye clean font */}
          <h1 className="text-[#001f3f] text-3xl md:text-4xl font-serif font-bold leading-tight mb-8">
            Event Planner in <br />Coimbatore
          </h1>
          
          {/* Paragraph: Nalla gap (leading-relaxed) matthum spacing kuduthuruken */}
          <div className="max-w-md mb-10">
            <p className="text-gray-500 text-[15px] md:text-base leading-[1.8] tracking-wide text-justify">
              At Kalyana Vaibhogam Events, we provide comprehensive event planning services 
              for all types of events, including corporate meetings,conferences, 
              social gatherings, weddings, and more. Our team of experienced event 
              planners is dedicated to bringing your vision to life and creating 
              an unforgettable experience for you and your guests.
            </p>
          </div>

          {/* Read More Button: Matching Tan/Peach color */}
          {/* <button className="bg-[#e6b17e] hover:bg-[#d4a06d] text-white font-bold py-4 px-10 w-full md:w-fit transition-all duration-300 uppercase tracking-widest text-xs shadow-sm">
            Read More
          </button> */}
        </div>

        {/* Right Section: Clean Video (Minimal Look) */}
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <div className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gray-50 border border-gray-100">
            {/* Video Placeholder */}
            <video 
              className="w-full h-full object-cover"
              autoPlay loop muted playsInline
            >
              <source src="your-video-link.mp4" type="video/mp4" />
            </video>
            
            {/* Minimal Play Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
               <div className="w-16 h-16 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/60">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1.5"></div>
               </div>
            </div>
          </div>
        </div>

      </div>

      {/* Page-ku keela neenga ketta mathiri nalla space */}
      <div className="h-32 md:h-48 bg-white"></div>
    </div>
  );
};

export default EventPlannerHero;