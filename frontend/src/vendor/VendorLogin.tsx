import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VendorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/admin/vendor/login", {
     
        email,
        password,
      });

      localStorage.setItem("vendorToken", res.data.token);
      localStorage.setItem("vendorData", JSON.stringify(res.data.vendor));

      navigate("/vendor/dashboard");
    } catch (error) {
      alert("Invalid Login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Vendor Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-pink-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default VendorLogin;