import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminProtected from "./AdminProtected";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Payments from "./pages/Payments";
import Events from "./pages/Events";
import Services from "./pages/Services";
import Users from "./pages/Users";
import AdminLogin from "./Adminlogin/AdminLogin";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* LOGIN ROUTE (NO LAYOUT) */}
      <Route path="login" element={<AdminLogin />} />

      {/* PROTECTED ADMIN ROUTES (WITH ADMIN LAYOUT ONLY) */}
      <Route
        path="/*"
        element={
          <AdminProtected>
            <AdminLayout />
          </AdminProtected>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="payments" element={<Payments />} />
        <Route path="events" element={<Events />} />
        <Route path="services" element={<Services />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}