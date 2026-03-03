import { NavLink } from "react-router-dom";

const VendorSidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md p-6">
      <h2 className="text-2xl font-bold mb-8 text-pink-600">
        Vendor Panel
      </h2>

      <nav className="flex flex-col gap-4">
        <NavLink
          to="/vendor/dashboard"
          className="hover:text-pink-600"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/vendor/bookings"
          className="hover:text-pink-600"
        >
          Bookings
        </NavLink>

        <NavLink
          to="/vendor/profile"
          className="hover:text-pink-600"
        >
          Profile
        </NavLink>

        <button
          onClick={() => {
            localStorage.removeItem("vendor");
            window.location.href = "/login";
          }}
          className="text-left text-red-500 mt-6"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default VendorSidebar;