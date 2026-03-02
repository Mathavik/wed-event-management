import { Routes, Route } from "react-router-dom";
import VendorLayout from "./VendorLayout";
import VendorDashboard from "../pages/VendorDashboard";
import VendorBookings from "../pages/VendorBookings";
import VendorProfile from "../pages/VendorProfile";



export default function VendorRoutes() {
  return (
    <Routes>

      {/* PROTECTED VENDOR PANEL */}
      <Route path="/*" element={<VendorLayout />}>
        {/* <Route index element={<VendorDashboard />} /> */}
        <Route path="dashboard" element={<VendorDashboard />} />
        <Route path="bookings" element={<VendorBookings />} />
        <Route path="profile" element={<VendorProfile />} />
      </Route>

    </Routes>
  );
}