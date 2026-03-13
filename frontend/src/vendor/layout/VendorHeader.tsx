import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 

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
    <div 
      className="px-8 py-4 flex justify-between items-center border-b shadow-lg" 
      style={{ 
        background: "#1a0404", // Dark Maroon Background
        borderColor: "rgba(201,168,76,0.2)" // Subtle Gold Border
      }}
    >
      <div>
        <h1 className="text-xl font-bold tracking-tight" style={{ color: "#C9A84C" }}>
          Welcome, {user?.name}
        </h1>
        <p className="text-[10px] font-medium opacity-70 uppercase tracking-[0.2em]" style={{ color: "#C9A84C" }}>
          K-HQ System Administrator
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
           <p className="text-xs font-bold" style={{ color: "#C9A84C" }}>{user?.email}</p>
           <p className="text-[9px] font-black opacity-50 uppercase tracking-widest" style={{ color: "#C9A84C" }}>
             Authorized Access
           </p>
        </div>

        {user ? (
          <div className="relative">
            {/* User Profile Circle */}
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 cursor-pointer select-none group"
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all group-hover:border-[#C9A84C]" 
                style={{ 
                  background: "#2a0808", 
                  color: "#C9A84C", 
                  borderColor: "rgba(201,168,76,0.3)" 
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-4 w-48 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95"
                style={{
                  background: "#1a0404",
                  border: "1px solid rgba(201,168,76,0.4)",
                }}
              >
                <Link
                  to="/profilepage"
                  className="block px-5 py-3 text-sm font-bold hover:bg-[#2a0808] transition-colors border-b border-white/5"
                  style={{ color: "#C9A84C" }}
                  onClick={() => setDropdownOpen(false)}
                >
                  My Profile
                </Link>

                <button
                  onClick={() => {
                    localStorage.removeItem("vendor");
                    setDropdownOpen(false);
                    window.location.href = "/";
                  }}
                  className="w-full text-left px-5 py-3 text-sm font-bold hover:bg-red-900/20 transition-colors text-red-400"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="font-bold text-sm" style={{ color: "#C9A84C" }}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default VendorHeader;