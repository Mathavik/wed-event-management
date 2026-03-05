import { Navigate } from "react-router-dom";

export default function VendorProtected({ children }) {
  const vendorToken = localStorage.getItem("token");

  if (!vendorToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}