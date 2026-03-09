import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface EventType {
  id: number;
  title: string;
  image: string;
}

const ServicesOverview = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<EventType[]>("http://127.0.0.1:8000/api/events");
        setEvents(response.data);
      } catch (err) {
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <p className="text-center py-20 text-[#0A1D37]">Loading services...</p>;
  if (error) return <p className="text-red-500 text-center py-20 font-sans">{error}</p>;

  return (
    <section className="py-20 bg-[#FCF9F6] font-serif overflow-hidden relative">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-12 relative">
        <p className="font-cursive text-3xl text-[#B18B5E] mb-1 opacity-90 italic">
          ~ What We Do ~
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#0A1D37] tracking-tight">
          Our Best <span className="text-[#0A1D37]">Services</span>
        </h2>
        <div className="mt-4 w-24 h-[2px] bg-[#B18B5E] mx-auto rounded-full"></div>
      </div>

      {/* CENTERED 3-COLUMN GRID WITH SMALLER CARDS */}
      <div className="flex justify-center items-center w-full"> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl px-6 w-full justify-items-center">
          {events.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="group relative h-[420px] w-full max-w-[300px] overflow-hidden rounded-sm shadow-md hover:shadow-2xl transition-all duration-500 bg-white border border-[#F2E5D5]"
            >
              
              {/* INITIAL STATE: IMAGE + LABEL */}
              <div className="relative w-full h-full transition-all duration-700 group-hover:-translate-y-full">
                  <img
                      src={`http://localhost:8000/uploads/events/${event.image}`}
                      alt={event.title}
                      className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-0 right-0 px-4">
                      <div className="bg-white py-4 px-2 shadow-lg text-center border border-[#F2E5D5]">
                          <h3 className="text-lg font-bold text-[#0A1D37] tracking-tight uppercase">
                              {event.title}
                          </h3>
                      </div>
                  </div>
              </div>

              {/* HOVER STATE: ORNATE DESIGN (Matching image_2e6b64.png) */}
              <div className="absolute inset-0 bg-[#0A1D37]/95 p-6 flex flex-col justify-center items-center text-center transition-all duration-500 transform translate-y-full group-hover:translate-y-0">
                  
                  {/* TOP ORNATE DECORATION */}
                  <div className="mb-4 flex flex-col items-center">
                    <div className="relative w-16 h-16 mb-2">
                        {/* Heart & Icon Container */}
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#B18B5E]" strokeWidth="2">
                            <path d="M50 85 C10 65 5 35 30 20 C40 15 45 15 50 25 C55 15 60 15 70 20 C95 35 90 65 50 85 Z" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[#B18B5E]">
                           {/* Small Icon in center of heart */}
                           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"/></svg>
                        </div>
                    </div>
                    {/* Decorative Curvy Swirls under heart */}
                    <svg width="100" height="20" viewBox="0 0 100 20" className="fill-none stroke-[#B18B5E]" strokeWidth="1">
                        <path d="M10 10 Q 25 0, 40 10 T 70 10 T 90 10" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 uppercase leading-tight tracking-wide">
                      {event.title}
                  </h3>

                  <p className="text-[#D1D1D1] text-xs font-sans leading-relaxed mb-6 px-2">
                      Our expert planners who can help you plan the perfect celebration for your loved ones.
                  </p>

                  <button 
                      onClick={() => navigate(`/event/${event.id}`)}
                      className="border-b-[1px] border-[#B18B5E] text-[#B18B5E] pb-1 text-[10px] font-bold tracking-[0.2em] uppercase hover:text-white hover:border-white transition-all duration-300"
                  >
                      READ MORE
                  </button>

                  {/* BOTTOM CORNER ORNAMENTS (Optional for extra detail) */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#B18B5E]/40 opacity-50"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#B18B5E]/40 opacity-50"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EXPLORE MORE BUTTON */}
      <div className="mt-16 text-center">
        <button
          onClick={() => { navigate('/headerservice'); window.scrollTo(0, 0); }}
          className="px-10 py-3 border-[1.5px] border-[#B18B5E] text-[#B18B5E] font-bold text-xs tracking-[0.3em] uppercase hover:bg-[#B18B5E] hover:text-white transition-all duration-500 rounded-full"
        >
          Explore All Services
        </button>
      </div>
    </section>
  );
};

export default ServicesOverview;