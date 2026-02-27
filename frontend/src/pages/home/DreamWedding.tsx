import React, { useState, useEffect } from 'react';

const WeddingServices = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    // Staggered animation on mount
    services.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 150);
    });
  }, []);

  const services = [
    {
      id: 1,
      icon: '🏛️',
      title: 'Venue Decoration',
      description: 'Transform your chosen venue into a magical wonderland with our exquisite decor expertise',
      color: 'from-amber-600 to-amber-700',
      accentColor: 'amber'
    },
    {
      id: 2,
      icon: '🍽️',
      title: 'Catering & Cuisine',
      description: 'Delectable cuisines crafted to perfection, curated for your special celebration',
      color: 'from-rose-600 to-rose-700',
      accentColor: 'rose'
    },
    {
      id: 3,
      icon: '📸',
      title: 'Photography & Film',
      description: 'Capture every precious moment with our award-winning photography and videography',
      color: 'from-purple-600 to-purple-700',
      accentColor: 'purple'
    },
    {
      id: 4,
      icon: '💐',
      title: 'Floral Arrangements',
      description: 'Breathtaking floral designs that add grace and fragrance to your celebrations',
      color: 'from-pink-600 to-pink-700',
      accentColor: 'pink'
    },
    {
      id: 5,
      icon: '✨',
      title: 'Bridal Styling',
      description: 'Complete bridal transformation with makeup, hair, and styling expertise',
      color: 'from-indigo-600 to-indigo-700',
      accentColor: 'indigo'
    },
    {
      id: 6,
      icon: '🎊',
      title: 'Wedding Planning',
      description: 'End-to-end planning and coordination to make your dream wedding a reality',
      color: 'from-orange-600 to-orange-700',
      accentColor: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-72 h-72 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase block mb-2">
              ✦ Our Expertise ✦
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-rose-200">
            Crafting Timeless Wedding Memories
          </h2>
          
          <p className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed font-light">
            From intimate ceremonies to grand celebrations, we orchestrate every detail with precision, elegance, and a passion for perfection. Your dream wedding deserves nothing less than our finest expertise.
          </p>
        </div>

        {/* Services Grid */}
     

        {/* CTA Section */}
        <div className="relative bg-gradient-to-r from-amber-900/30 to-rose-900/30 border border-amber-600/40 rounded-3xl p-12 text-center backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-rose-400/5 rounded-3xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-playfair">
              Ready to Plan Your Perfect Wedding?
            </h3>
            
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
              Let's transform your vision into reality. Get in touch with our wedding experts today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Book a Consultation
              </button>
              {/* <button className="px-10 py-4 border-2 border-amber-400 text-amber-300 font-bold rounded-lg hover:bg-amber-900/20 transition-all duration-300">
                View Packages
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Style */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Lora:wght@400;500&display=swap');
        
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(217, 119, 6, 0.5);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(217, 119, 6, 0.8);
        }

        @media (max-width: 768px) {
          .text-6xl {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default WeddingServices;