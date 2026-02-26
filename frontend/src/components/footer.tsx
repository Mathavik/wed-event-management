import { useState } from "react";
import logo from "../assets/logo.png";

const FloralIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} fill="none" className="flex-shrink-0">
    <circle cx="20" cy="20" r="4" fill="#C9A84C" />
    {[0, 60, 120, 180, 240, 300].map((deg, i) => (
      <ellipse
        key={i}
        cx="20" cy="12"
        rx="3" ry="6"
        fill="#C9A84C"
        opacity="0.75"
        transform={`rotate(${deg} 20 20)`}
      />
    ))}
  </svg>
);

const services = [
  "Venue Decoration",
  "Catering & Cuisine",
  "Photography & Film",
  "Floral Arrangements",
  "Bridal Styling",
  "Wedding Planning",
];

const quickLinks = [
  "Home",
  "About Us",
  "Services",
  "Gallery",
  "Testimonials",
  "Contact",
];

const socialLinks = [
  {
    name: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #3a0a0a 0%, #1a0404 60%, #0d0202 100%)",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Top gold border */}
      <div
        className="h-0.5 w-full"
        style={{
          background: "linear-gradient(90deg, transparent, #C9A84C 20%, #f0d080 50%, #C9A84C 80%, transparent)",
        }}
      />

      {/* Tightened Ornamental Section */}
      <div className="flex justify-center items-center gap-4 py-6">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A84C] opacity-50" />
        <FloralIcon size={22} />
        <div className="h-px w-16 bg-[#C9A84C] opacity-20" />
        <FloralIcon size={14} />
        <div className="h-px w-16 bg-[#C9A84C] opacity-20" />
        <FloralIcon size={22} />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A84C] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          
          {/* Logo Column - Combined here to remove extra spacing */}
          <div className="lg:col-span-1 flex flex-col items-start">
            <img
              src={logo}
              alt="Kalyana Vaibhogam"
              className="h-40 w-auto object-contain mb-4"
              style={{ filter: "drop-shadow(0 0 12px rgba(201,168,76,0.35))" }}
            />
            <p className="text-[10px] tracking-[0.15em] uppercase leading-relaxed" style={{ color: "#b08840" }}>
              ✦ Crafting Timeless <br/> Wedding Memories ✦
            </p>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-1" style={{ color: "#C9A84C" }}>
              Our Services
            </h3>
            <div className="w-10 h-px mb-5" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-2 group cursor-pointer">
                  <span className="text-xs flex-shrink-0" style={{ color: "#8B6914" }}>❧</span>
                  <span className="text-sm transition-colors duration-200 group-hover:text-[#e8c76a]" style={{ color: "#9a8060" }}>
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-1" style={{ color: "#C9A84C" }}>
              Quick Links
            </h3>
            <div className="w-10 h-px mb-5" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l} className="flex items-center gap-2 group cursor-pointer">
                  <span className="text-[10px] flex-shrink-0" style={{ color: "#8B6914" }}>◆</span>
                  <span className="text-sm transition-colors duration-200 group-hover:text-[#e8c76a]" style={{ color: "#9a8060" }}>
                    {l}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-1" style={{ color: "#C9A84C" }}>
              Contact Us
            </h3>
            <div className="w-10 h-px mb-5" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-sm">📍</span>
                <div>
                  <p className="text-[10px] tracking-wider uppercase mb-0.5" style={{ color: "#8B6914" }}>Address</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#9a8060" }}>
                    No. 12, Bridal Lane,<br/>Coimbatore – 641 001
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-sm">📞</span>
                <div>
                  <p className="text-[10px] tracking-wider uppercase mb-0.5" style={{ color: "#8B6914" }}>Phone</p>
                  <p className="text-sm" style={{ color: "#9a8060" }}>+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-1" style={{ color: "#C9A84C" }}>
              Stay Connected
            </h3>
            <div className="w-10 h-px mb-5" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
            {subscribed ? (
              <div className="text-xs py-3 px-4 text-center border border-[#C9A84C]/30 text-[#C9A84C] bg-[#C9A84C]/5">
                ✦ Subscribed ✦
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="text-sm px-3 py-2 bg-transparent border border-[#C9A84C]/30 text-[#C9A84C] outline-none rounded-sm"
                />
                <button
                  onClick={handleSubscribe}
                  className="text-[10px] py-2 tracking-widest uppercase font-bold bg-gradient-to-r from-[#8B6914] via-[#C9A84C] to-[#8B6914] text-[#1a0404] rounded-sm"
                >
                  Subscribe
                </button>
              </div>
            )}
            <div className="mt-5 flex gap-2">
              {socialLinks.map((s) => (
                <button key={s.name} className="w-8 h-8 flex items-center justify-center border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all">
                  {s.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#C9A84C]/20 py-6 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-[#6a5040]">
            © {new Date().getFullYear()} Kalyana Vaibhogam. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms", "Sitemap"].map((l) => (
              <a key={l} href="#" className="text-[10px] text-[#6a5040] hover:text-[#C9A84C] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}