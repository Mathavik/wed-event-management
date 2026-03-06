import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: any) => {
  e.preventDefault();
  try {
  const res = await axiosInstance.post("/login", form);
    const logged = res.data.user;

    alert("Login Successful");

    // Clear old data first
    // localStorage.removeItem("user");
    // localStorage.removeItem("admin");
    // localStorage.removeItem("vendor");

    // Save based on role
    if (logged.role === "admin") {
      localStorage.setItem("admin", JSON.stringify(logged));
      navigate("/admin/dashboard");
    } 
    else if (logged.role === "vendor") {
      localStorage.setItem("vendor", JSON.stringify(logged));
      navigate("/vendor/dashboard");
    } 
    else {
      localStorage.setItem("user", JSON.stringify(logged));
      navigate("/profilepage");
    }

  } catch (err: any) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-pink-100">
      <div className="mb-6 text-center">
        <p className="mb-2">New here? Register as:</p>
        <div className="space-x-2">
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            User
          </button>
          <button
            onClick={() => navigate("/registerprovider")}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Vendor
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input name="email" type="email" placeholder="Email"
          onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />

        <input name="password" type="password" placeholder="Password"
          onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />

        <button className="w-full bg-pink-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}