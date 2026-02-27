import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy Admin Check
    if (email === "admin@gmail.com" && password === "123456") {
      localStorage.setItem("admin", "true");
      navigate("/admin");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 to-purple-600">
      
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}