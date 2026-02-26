import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Package from "./pages/package/package";
import Services from "./pages/services/services";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import BookNow from "./pages/contact/booknow";


function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/packages" element={<Package />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booknow" element={<BookNow />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;