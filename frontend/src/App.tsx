import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

// Header & Footer Import
// import KalyanaVaibhogamHeader from "./KalyanaVaibhogamHeader";
// import KalyanaVaibhogamFooter from "./KalyanaVaibhogamFooter";
import Header from "./components/header";
import Footer from "./components/footer";

// Dummy Home Page (remove if you already have)
const Home: React.FC = () => {
  return <h1 style={{ padding: "100px", textAlign: "center" }}>Home Page</h1>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Header/>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      {/* <KalyanaVaibhogamFooter /> */}
      <Footer/>
    </Router>
  );
};

export default App;