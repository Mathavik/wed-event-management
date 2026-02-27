import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-pink-600 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">Event Admin</h2>

      <nav className="space-y-3">
        <Link to="/admin" className="block p-2 rounded hover:bg-pink-700">
          Dashboard
        </Link>

        <Link to="/admin/bookings" className="block p-2 rounded hover:bg-pink-700">
          Bookings
        </Link>

        <Link to="/admin/payments" className="block p-2 rounded hover:bg-pink-700">
          Payments
        </Link>

        <Link to="/admin/events" className="block p-2 rounded hover:bg-pink-700">
          Event Types
        </Link>

        <Link to="/admin/services" className="block p-2 rounded hover:bg-pink-700">
          Services
        </Link>

        <Link to="/admin/users" className="block p-2 rounded hover:bg-pink-700">
          Users
        </Link>

        <button className="w-full text-left p-2 rounded hover:bg-red-600">
          Logout
        </button>
      </nav>
    </div>
  );
}