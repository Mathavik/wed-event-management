import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
const navLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Services", href: "#" },
  { label: "Gallery", href: "#" },
  { label: "Testimonials", href: "#" },
  { label: "Contact", href: "#" },
];


const FloralSeparator = () => (
  <svg viewBox="0 0 8 8" width="8" height="8" fill="#C9A84C" opacity={0.6}>
    <polygon points="4,0 8,4 4,8 0,4" />
  </svg>
);


const Logo = () => (
  <div className="flex items-center">
    <img
      src={logo}
      alt="Kalyana Vaibhogam"
      className="h-40 w-auto object-contain"
    />
  </div>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top announcement bar */}
      <div
        className="w-full text-center py-1.5 px-4 text-xs tracking-widest uppercase hidden sm:block"
        style={{
          background: "linear-gradient(90deg, #3a0a0a, #5a1a1a, #3a0a0a)",
          color: "#8B6914",
          fontFamily: "Georgia, serif",
          borderBottom: "1px solid rgba(201,168,76,0.2)",
        }}
      >
        <span style={{ color: "#C9A84C" }}>✦</span>
        &nbsp; Creating Timeless Wedding Memories Across Tamil Nadu &nbsp;
        <span style={{ color: "#C9A84C" }}>✦</span>
        &nbsp; Call us: +91 98765 43210 &nbsp;
        <span style={{ color: "#C9A84C" }}>✦</span>
      </div>

      {/* Main Header */}
      <header
        className="sticky top-0 z-50 w-full transition-all duration-500"
        style={{
          background: scrolled
            ? "linear-gradient(180deg, rgba(26,4,4,0.98) 0%, rgba(20,2,2,0.97) 100%)"
            : "linear-gradient(180deg, #2a0808 0%, #1a0404 100%)",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.6)" : "none",
          borderBottom: "1px solid rgba(201,168,76,0.2)",
        }}
      >
        {/* Gold top border */}
        <div
          className="h-0.5 w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, #C9A84C 20%, #f0d080 50%, #C9A84C 80%, transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <div key={link.label} className="flex items-center">
                  <button
                    onClick={() => setActiveLink(link.label)}
                    className="relative px-4 py-2 text-sm group transition-all duration-200"
                    style={{
                      fontFamily: "Georgia, serif",
                      color: activeLink === link.label ? "#C9A84C" : "#C9A84C",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {/* Hover underline */}
                    <span
                      className="absolute bottom-0.5 left-4 right-4 h-px transition-all duration-300 origin-left"
                      style={{
                        background: "linear-gradient(90deg, #C9A84C, #f0d080)",
                        transform:
                          activeLink === link.label ? "scaleX(1)" : "scaleX(0)",
                      }}
                    />
                    {/* Hover glow */}
                    <span
                      className="relative z-10 group-hover:text-[#e8c76a] transition-colors duration-200"
                    >
                      {link.label}
                    </span>
                    {/* Active dot */}
                    {activeLink === link.label && (
                      <span
                        className="absolute top-1 right-2 w-1 h-1 rounded-full"
                        style={{ background: "#C9A84C" }}
                      />
                    )}
                  </button>
                  {i < navLinks.length - 1 && (
                    <FloralSeparator />
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                className="relative px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden group"
                style={{
                  fontFamily: "Georgia, serif",
                  background: "linear-gradient(135deg, #8B6914 0%, #C9A84C 50%, #8B6914 100%)",
                  color: "#1a0404",
                  borderRadius: "2px",
                  letterSpacing: "0.15em",
                  boxShadow: "0 2px 15px rgba(201,168,76,0.25)",
                }}
              >
                <span className="relative z-10">✦ Book Now ✦</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #C9A84C 0%, #f0d080 50%, #C9A84C 100%)",
                  }}
                />
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-0.5 transition-all duration-300"
                  style={{
                    background: "#C9A84C",
                    width: i === 1 ? (menuOpen ? "24px" : "16px") : "24px",
                    transform:
                      menuOpen
                        ? i === 0
                          ? "rotate(45deg) translate(4px, 4px)"
                          : i === 2
                          ? "rotate(-45deg) translate(4px, -4px)"
                          : "opacity(0) scale(0)"
                        : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Bottom ornamental line */}
        <div className="flex items-center justify-center gap-3 pb-1 px-6">
          <div
            className="h-px flex-1 max-w-[120px]"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3))",
            }}
          />
          <svg viewBox="0 0 80 10" className="w-16 h-2" fill="none">
            <path d="M0 5 Q20 1 40 5 Q60 9 80 5" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4" />
          </svg>
          <svg viewBox="0 0 10 10" width="8" height="8" fill="#C9A84C" opacity={0.5}>
            <polygon points="5,0 10,5 5,10 0,5" />
          </svg>
          <svg viewBox="0 0 80 10" className="w-16 h-2" fill="none">
            <path d="M0 5 Q20 9 40 5 Q60 1 80 5" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4" />
          </svg>
          <div
            className="h-px flex-1 max-w-[120px]"
            style={{
              background: "linear-gradient(90deg, rgba(201,168,76,0.3), transparent)",
            }}
          />
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className="lg:hidden fixed inset-0 z-40 transition-all duration-400"
        style={{
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: "rgba(0,0,0,0.7)",
            opacity: menuOpen ? 1 : 0,
          }}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className="absolute top-0 right-0 h-full w-72 flex flex-col transition-transform duration-400"
          style={{
            background: "linear-gradient(180deg, #2a0808 0%, #1a0404 100%)",
            borderLeft: "1px solid rgba(201,168,76,0.2)",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          }}
        >
          {/* Drawer header */}
          <div
            className="h-0.5 w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #C9A84C 50%, transparent)",
            }}
          />
          <div className="p-6 border-b" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "#8B6914", fontFamily: "Georgia, serif" }}
            >
              ✦ Navigation Menu
            </p>
          </div>

          <nav className="flex-1 px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setActiveLink(link.label);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-3 text-left transition-all duration-200 group"
                style={{
                  borderBottom: "1px solid rgba(201,168,76,0.08)",
                }}
              >
                <span
                  style={{
                    color: activeLink === link.label ? "#C9A84C" : "#5a3a2a",
                    fontSize: "0.6rem",
                  }}
                >
                  ◆
                </span>
                <span
                  className="text-sm group-hover:text-[#C9A84C] transition-colors duration-200"
                  style={{
                    fontFamily: "Georgia, serif",
                    color: activeLink === link.label ? "#C9A84C" : "#C9A84C",
                    letterSpacing: "0.05em",
                  }}
                >
                  {link.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="p-6">
            <button
              className="w-full py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 active:scale-95"
              style={{
                fontFamily: "Georgia, serif",
                background: "linear-gradient(135deg, #8B6914 0%, #C9A84C 50%, #8B6914 100%)",
                color: "#1a0404",
                borderRadius: "2px",
                letterSpacing: "0.15em",
              }}
            >
              ✦ Book Your Wedding ✦
            </button>
            <p
              className="text-center text-xs mt-3"
              style={{ color: "#5a3a2a", fontFamily: "Georgia, serif" }}
            >
              +91 98765 43210
            </p>
          </div>
        </div>
      </div>
    </>
  );
}