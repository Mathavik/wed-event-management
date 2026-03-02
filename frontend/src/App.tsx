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

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ User Routes: Header & Footer inga mattum dhaan varum */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services/:eventId" element={<Services />} />
          <Route path="packages" element={<Package />} />
          <Route path="login" element={<Login />} />
          <Route path="booknow" element={<BookNow />} />
          <Route path="register" element={<Register />} />
          <Route path="profilepage" element={<ProfilePage />} />
        </Route>

        {/* ✅ Admin Routes: Idhu MainLayout-ku veliya irukkuradhala Header varaadhu */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;