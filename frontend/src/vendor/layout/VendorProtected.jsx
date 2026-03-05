import { Navigate } from "react-router-dom";

export default function VendorProtected({ children }) {
  const vendorToken = localStorage.getItem("vendorToken");

  if (!vendorToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}