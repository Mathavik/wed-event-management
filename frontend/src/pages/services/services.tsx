import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Service {
  id: number;
  title: string;
  image: string;
}

const Services = () => {
  const { id } = useParams<{ id: string }>();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    axios
      .get(`http://127.0.0.1:8000/api/services?event_id=${id}`)
      .then((res) => setServices(res.data))
      .catch((err) => { console.error(err); setError("Failed to load services"); })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!loading && services.length > 0) {
      const t = setTimeout(() => setAnimate(true), 80);
      return () => clearTimeout(t);
    }
  }, [loading, services]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 gap-5">
        <div className="w-12 h-12 rounded-full border-4 border-pink-500 border-t-transparent animate-spin" />
        <p className="text-gray-400 text-sm tracking-widest uppercase">Loading services…</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700;900&display=swap');

        @keyframes cardRise {
          0%   { opacity: 0; transform: translateY(70px) scale(0.85); }
          65%  { opacity: 1; transform: translateY(-8px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }

        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmerSweep {
          from { transform: translateX(-100%) skewX(-15deg); }
          to   { transform: translateX(220%) skewX(-15deg); }
        }

        @keyframes orbPulse {
          0%, 100% { transform: scale(1) translate(0,0); }
          50%       { transform: scale(1.12) translate(20px, 30px); }
        }

        .sv-title { font-family: 'Cormorant Garamond', serif; }

        .sv-card {
          opacity: 0;
          transform: translateY(70px) scale(0.85);
        }
        .sv-card.visible {
          animation: cardRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .sv-hero-label {
          animation: fadeSlideDown 0.5s ease forwards;
        }
        .sv-hero-title {
          animation: fadeSlideDown 0.5s 0.1s ease both;
        }
        .sv-hero-sub {
          animation: fadeSlideDown 0.5s 0.2s ease both;
        }
        .sv-hero-bar {
          animation: fadeSlideDown 0.5s 0.3s ease both;
        }

        .explore-btn {
          position: relative;
          overflow: hidden;
        }
        .explore-btn:hover .btn-shimmer {
          animation: shimmerSweep 0.55s ease forwards;
        }

        .card-img img {
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sv-card:hover .card-img img {
          transform: scale(1.1);
        }

        .orb1 { animation: orbPulse 10s ease-in-out infinite; }
        .orb2 { animation: orbPulse 13s 3s ease-in-out infinite reverse; }
        .orb3 { animation: orbPulse 9s 6s ease-in-out infinite; }
      `}</style>

      <section className="relative min-h-screen bg-gray-950 overflow-hidden pb-24">

        {/* Background orbs */}
        <div className="orb1 pointer-events-none fixed -top-32 -left-32 w-96 h-96 rounded-full bg-pink-600 opacity-10 blur-3xl" />
        <div className="orb2 pointer-events-none fixed -bottom-24 -right-24 w-80 h-80 rounded-full bg-amber-500 opacity-10 blur-3xl" />
        <div className="orb3 pointer-events-none fixed top-1/2 left-1/2 w-72 h-72 rounded-full bg-violet-600 opacity-10 blur-3xl" />

        {/* Hero */}
        <div className="relative z-10 text-center pt-20 pb-14 px-6">
          <span className="sv-hero-label inline-block text-xs font-medium tracking-[4px] uppercase text-pink-400 border border-pink-500/30 px-4 py-1.5 rounded-full mb-5">
            ✦ What We Offer
          </span>

          <h1 className="sv-title sv-hero-title text-5xl md:text-7xl font-black text-white leading-tight mb-4">
            Crafted{" "}
            <span className="bg-gradient-to-r from-pink-500 to-amber-400 bg-clip-text text-transparent">
              Services
            </span>
          </h1>

          <p className="sv-hero-sub text-gray-400 text-base font-light tracking-wide mb-6">
            Handpicked providers. Unforgettable experiences.
          </p>

          <div className="sv-hero-bar mx-auto w-14 h-1 rounded-full bg-gradient-to-r from-pink-500 to-amber-400" />
          <p className="sv-hero-sub mt-4 text-gray-600 text-sm tracking-wider">
            {services.length} services available
          </p>
        </div>

        {/* Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto px-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`sv-card group rounded-2xl overflow-hidden bg-gray-900 border border-white/5 cursor-pointer
                hover:border-pink-500/40 hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300`}
              style={{ animationDelay: `${index * 0.1}s` }}
              ref={(el) => {
                if (el && animate) el.classList.add("visible");
              }}
              onClick={() => navigate(`/service-provider/${service.id}`)}
            >
              {/* Image */}
              <div className="card-img relative h-56 overflow-hidden">
                <img
                  src={`http://127.0.0.1:8000/uploads/services/${service.image}`}
                  alt={service.title}
                  className="w-full h-full object-cover bg-gray-800"
                />
                {/* Gradient fade */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-gray-900 to-transparent" />

                {/* Tag */}
                <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-[2px] uppercase text-amber-400 bg-amber-400/10 border border-amber-400/25 px-3 py-1 rounded-full">
                  Service
                </span>
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="sv-title text-xl font-bold text-white mb-5 leading-snug">
                  {service.title}
                </h3>

                <button
                  className="explore-btn flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-600
                    text-white text-sm font-semibold px-6 py-2.5 rounded-full
                    hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/40
                    transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/service-provider/${service.id}`);
                  }}
                >
                  {/* Shimmer layer */}
                  <span
                    className="btn-shimmer pointer-events-none absolute inset-0 w-1/3 bg-white/20 skew-x-[-15deg] opacity-80"
                    style={{ transform: "translateX(-100%) skewX(-15deg)" }}
                  />
                  Explore
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none" stroke="currentColor" strokeWidth="2.5"
                    viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Services;