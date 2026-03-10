import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Interface to keep TypeScript happy
interface Review {
  id: number;
  name: string;
  location: string;
  event: string;
  text: string;
  displayImage: string; // The work (Food or Makeup)
  profilePic: string;   // The person (Customer)
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Priya Sudhakar",
    location: "Coimbatore",
    event: "Bridal Makeup & Styling - Jan 2026",
    text: "The bridal makeup was absolutely stunning! I wanted a traditional yet modern look for my Muhurtham, and the team delivered it perfectly. The makeup stayed fresh for over 12 hours, and the hair styling was exactly what I dreamed of. I felt like a queen on my big day!",
    // Large image showing the bridal makeup work
    displayImage: "https://media.istockphoto.com/id/1336649728/photo/beautiful-traditional-indian-bride-getting-ready-for-her-wedding-day-by-makeup-artist.jpg?s=612x612&w=0&k=20&c=sFQRDldX1yYiyhPweZpKYNkTEyX5kIcWkdjFTSdwD2g=",
    // Small "kutty" profile of the bride
    profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Rajesh Kannan",
    location: "Madurai",
    event: "Premium Wedding Catering - Feb 2026",
    text: "The catering service was the highlight of the reception. Every guest praised the quality and the authentic taste of the South Indian menu. The buffet setup was elegant, and the live counters were managed very professionally. Truly the best food we've ever had at a wedding!",
    // Large image showing the catering/food setup
    displayImage: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
    // Small "kutty" profile of the person who gave the review
    profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-16 bg-[#FCF9F6] font-serif overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header with Ornate Swirls */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-2">
            <svg width="60" height="20" viewBox="0 0 60 20" className="fill-none stroke-[#B18B5E] scale-x-[-1] opacity-70">
              <path d="M0 10 Q 15 0, 30 10 T 60 10" />
            </svg>
            <span className="font-cursive text-3xl text-[#B18B5E] italic">Testimonials</span>
            <svg width="60" height="20" viewBox="0 0 60 20" className="fill-none stroke-[#B18B5E] opacity-70">
              <path d="M0 10 Q 15 0, 30 10 T 60 10" />
            </svg>
          </div>
          <h2 className="text-5xl font-bold text-[#0A1D37]">What Our Clients Say</h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 bg-white p-4 rounded-sm shadow-sm">
          
          {/* LEFT: Large Display Image (The Makeup or the Food) */}
          <div className="w-full lg:w-5/12">
            <div className="relative border-[10px] border-[#FCF9F6] shadow-xl h-[400px]">
              <img 
                src={currentReview.displayImage} 
                alt="Service Showcase" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* RIGHT: Content and the "Kutty" Profile */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center px-4">
            
            <p className="text-slate-600 text-lg md:text-xl italic leading-relaxed mb-8 border-l-4 border-[#B18B5E] pl-6">
              "{currentReview.text}"
            </p>

            <div className="flex items-center gap-5 mb-10">
              {/* Kutty Profile Pic */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#B18B5E] shadow-md">
                <img 
                  src={currentReview.profilePic} 
                  alt={currentReview.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-[#0A1D37] tracking-tight">{currentReview.name}</h4>
                <p className="text-[#B18B5E] text-xs font-bold uppercase tracking-[0.2em]">{currentReview.location}</p>
                <p className="text-slate-400 text-[10px] mt-1 italic">({currentReview.event})</p>
              </div>
            </div>

            {/* Navigation Square Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={prevSlide}
                className="w-14 h-12 flex items-center justify-center border border-slate-200 bg-white text-slate-400 hover:bg-[#B18B5E] hover:text-white transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextSlide}
                className="w-14 h-12 flex items-center justify-center border border-slate-200 bg-white text-slate-400 hover:bg-[#B18B5E] hover:text-white transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;