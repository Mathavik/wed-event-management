import { Navigate } from "react-router-dom";

export default function AdminProtected({ children }: any) {
  const isAdmin = localStorage.getItem("admin");

  if (!isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}