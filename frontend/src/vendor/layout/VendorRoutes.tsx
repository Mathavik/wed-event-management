import { Routes, Route } from "react-router-dom";
import VendorLayout from "./VendorLayout";
import VendorDashboard from "../pages/VendorDashboard";
import VendorBookings from "../pages/VendorBookings";
import VendorProfile from "../pages/VendorProfile";



// import VendorProtected from "./VendorProtected";

export default function VendorRoutes() {
  return (
    // <VendorProtected>
      <Routes>
        <Route path="/*" element={<VendorLayout />}>
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="bookings" element={<VendorBookings />} />
          <Route path="profile" element={<VendorProfile />} />
        </Route>
      </Routes>
    // </VendorProtected>
  );
}