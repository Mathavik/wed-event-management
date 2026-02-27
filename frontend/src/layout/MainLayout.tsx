import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer"; // Inga import pannunga

export default function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Indha idathula dhaan Home, Services pages render aagum */}
      </main>
      <Footer />
    </>
  );
}