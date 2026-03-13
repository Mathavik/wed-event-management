import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
const VendorSidebar = () => {
  return (
    <div className="w-64 min-h-screen shadow-2xl p-6" style={{ background: "#1a0404", borderRight: "1px solid rgba(201,168,76,0.2)" }}>
      {/* Branding Area */}
      <div className="mb-10 text-center">
        <img 
          src={Logo} 
          alt="Kalyana Vaibhogam Logo" 
          className="w-42 h-auto object-contain mb-2" // Logo size-ai inga adjust pannikalam
        />
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mt-1" style={{ color: "#C9A84C" }}>
          Vendor Management
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/vendor/dashboard"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
              isActive ? "bg-[#2a0808] shadow-inner" : "hover:bg-[#2a0808]/50"
            }`
          }
          style={({ isActive }) => ({ color: isActive ? "#C9A84C" : "rgba(201,168,76,0.7)" })}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/vendor/bookings"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
              isActive ? "bg-[#2a0808] shadow-inner" : "hover:bg-[#2a0808]/50"
            }`
          }
          style={({ isActive }) => ({ color: isActive ? "#C9A84C" : "rgba(201,168,76,0.7)" })}
        >
          Bookings
        </NavLink>

        <NavLink
          to="/vendor/profile"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
              isActive ? "bg-[#2a0808] shadow-inner" : "hover:bg-[#2a0808]/50"
            }`
          }
          style={({ isActive }) => ({ color: isActive ? "#C9A84C" : "rgba(201,168,76,0.7)" })}
        >
          Profile
        </NavLink>

        <div className="mt-10 pt-6 border-t border-rgba(201,168,76,0.1)">
          <button
            onClick={() => {
              localStorage.removeItem("vendor");
              window.location.href = "/login";
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default VendorSidebar;