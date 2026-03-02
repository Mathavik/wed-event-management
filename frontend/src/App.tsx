import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Package from "./pages/package/package";
import Services from "./pages/services/services";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import BookNow from "./pages/contact/booknow";
import Register from "./pages/Register/register";
import ProfilePage from "./pages/ProfilePage/profilepage";
import AdminRoutes from "./admin/AdminRoutes";
import MainLayout from "./layout/MainLayout";
import RegisterProvider from "./vendor/RegisterProvider";
import ServiceProvider from "./pages/ServiceProvider/ServiceProvider";

import VendorRoutes from "./vendor/layout/VendorRoutes";
import headerservice from "./pages/services/headerservice";
import HeaderService from "./pages/services/headerservice";

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ User Routes: Header & Footer inga mattum dhaan varum */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/event/:id" element={<Services />} />
          <Route path="packages" element={<Package />} />
          <Route path="login" element={<Login />} />
          <Route path="booknow" element={<BookNow />} />
          <Route path="register" element={<Register />} />
          <Route path="profilepage" element={<ProfilePage />} />
        <Route path="/headerservice" element={<HeaderService/>} />

          <Route path="registerprovider" element={<RegisterProvider />} />

         <Route path="/service-provider/:id" element={<ServiceProvider />} />
        </Route>

        {/* ✅ Admin Routes: Idhu MainLayout-ku veliya irukkuradhala Header varaadhu */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        {/* ✅ Vendor Routes (MainLayout-ku veliya) */}
        <Route path="/vendor/*" element={<VendorRoutes />} />


      </Routes>
    </Router>
  );
}

export default App;