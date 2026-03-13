import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 min-h-screen text-white p-5" style={{ backgroundColor: "#2D0B0B", borderRight: "1px solid rgba(201,168,76,0.2)" }}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold italic" style={{ color: "#C9A84C" }}>Kalyana</h2>
        <h2 className="text-xl font-bold italic -mt-2" style={{ color: "#C9A84C" }}>Vaibhogam</h2>
        <p className="text-[10px] tracking-widest uppercase opacity-70 mt-1">Admin Panel</p>
      </div>

      <nav className="space-y-2">
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
            className="block p-3 rounded-md transition-all duration-200 hover:bg-[#3d1212]"
            style={{ color: "#fdfdfd" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#fdfdfd")}
          >
            {link.name}
          </Link>
        ))}

        <div className="pt-10">
          <button
            onClick={() => {
              localStorage.removeItem("admin");
              window.location.href = "/";
            }}
            className="w-full text-left p-3 rounded-md border border-red-900/50 hover:bg-red-950/30 text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}