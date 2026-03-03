import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const res = await axios.post("http://localhost:8000/api/login", form);
      const logged = res.data.user;
      alert("Login Successful");
      localStorage.setItem("user", JSON.stringify(logged));
      // redirect based on role stored in DB or returned object
      switch (logged.role) {
        case "vendor":
          navigate("/vendor/dashboard");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        default:
          // regular user (bride/groom) goes to their profile or user dashboard
          navigate("/profilepage");
          break;
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