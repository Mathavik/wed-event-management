import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div 
      className="w-64 min-h-screen sticky top-0 flex flex-col text-white p-5 transition-all" 
      style={{ backgroundColor: "#2D0B0B", borderRight: "1px solid rgba(201,168,76,0.2)" }}
    >
      {/* 1. Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold italic" style={{ color: "#C9A84C" }}>Kalyana</h2>
        <h2 className="text-xl font-bold italic -mt-2" style={{ color: "#C9A84C" }}>Vaibhogam</h2>
        <p className="text-[10px] tracking-widest uppercase opacity-70 mt-1">Admin Panel</p>
      </div>

      {/* 2. Navigation Links (Takes available space) */}
      <nav className="flex-grow space-y-1">
        {[
          { name: "Dashboard", path: "/admin" },
          { name: "Vendor Payments", path: "/admin/payments" },
          { name: "Event Types", path: "/admin/events" },
          { name: "Services", path: "/admin/services" },
          { name: "Bookings", path: "/admin/user-bookings" },
          { name: "Users", path: "/admin/users" },
          { name: "User Payments", path: "/admin/user-payments" },
        ].map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="block p-3 rounded-md transition-all duration-200 hover:bg-[#3d1212] font-medium"
            style={{ color: "#fdfdfd" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#fdfdfd")}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* 3. Logout Section (Always at the bottom) */}
      <div className="pt-5 border-t border-white/10">
        <button
          onClick={() => {
            localStorage.removeItem("admin");
            window.location.href = "/";
          }}
          className="w-full text-left p-3 rounded-md transition-all duration-200 group flex items-center gap-2"
          style={{ color: "#ff6b6b" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 107, 107, 0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}