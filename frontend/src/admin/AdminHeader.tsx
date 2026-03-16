import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface AdminUser {
  name?: string;
  email?: string;
}

export default function AdminHeader() {

  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("admin");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse admin data", e);
      }
    }

  }, []);

  const displayName = user?.name || "Admin";
  const initial = displayName.charAt(0).toUpperCase();

  const logout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/";
  };

  return (
    <div
      className="p-4 flex justify-between items-center border-b"
      style={{
        backgroundColor: "#1F0808",
        borderColor: "rgba(201,168,76,0.2)",
      }}
    >

      {/* Title */}
      <h1
        className="text-xl font-semibold uppercase tracking-wider"
        style={{ color: "#C9A84C" }}
      >
        Admin Dashboard
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {user ? (

          <div className="relative group">

            {/* Admin Info */}
            <div className="flex items-center gap-3 cursor-pointer select-none">

              <div className="flex flex-col items-end hidden sm:flex">
                <span
                  className="text-sm font-medium"
                  style={{ color: "#C9A84C" }}
                >
                  {displayName}
                </span>

                <span className="text-[10px] text-gray-400">
                  System Administrator
                </span>
              </div>

              {/* Circle */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold border-2"
                style={{
                  backgroundColor: "#2D0B0B",
                  borderColor: "#C9A84C",
                  color: "#C9A84C",
                }}
              >
                {initial}
              </div>

            </div>

            {/* Hover Dropdown */}
            <div
              className="
                absolute right-0 mt-3 w-40 rounded-md shadow-xl
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-all duration-200
              "
              style={{
                background: "#2D0B0B",
                border: "1px solid #C9A84C",
              }}
            >

              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 text-sm hover:bg-red-950/40 transition-colors"
                style={{ color: "#ff4d4d" }}
              >
                Logout
              </button>

            </div>

          </div>

        ) : (

          <Link
            to="/login"
            className="px-4 py-2 rounded border transition-all"
            style={{
              color: "#C9A84C",
              borderColor: "#C9A84C",
            }}
          >
            Login
          </Link>

        )}

      </div>
    </div>
  );
}