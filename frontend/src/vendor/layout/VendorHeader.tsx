import { useState, useEffect } from "react";
import { Link } from "lucide-react";

const VendorHeader = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("vendor");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">
        Welcome, {user?.name}
      </h1>

      <div className="text-sm text-gray-600">
        {user?.email}
      </div>

       <div className="hidden lg:flex items-center gap-4">
        {user ? (
          <div className="relative">

            {/* Clickable User Area */}
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div className="w-9 h-9 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span style={{ color: "#C9A84C" }}>
                {user?.name}
              </span>
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-3 w-40 rounded shadow-lg overflow-hidden z-50"
                style={{
                  background: "#1a0404",
                  border: "1px solid rgba(201,168,76,0.3)",
                }}
              >
                <Link
                  to="/profilepage"
                  className="block px-4 py-2 text-sm hover:bg-[#2a0808]"
                  style={{ color: "#C9A84C" }}
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>

                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    setDropdownOpen(false);
                    window.location.href = "/";
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-[#2a0808]"
                  style={{ color: "#C9A84C" }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" style={{ color: "#C9A84C" }}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default VendorHeader;