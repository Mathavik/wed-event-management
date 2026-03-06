import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { User, Lock, Mail, Store, UserPlus } from "lucide-react"; // Icons add pannirukken

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/login", form);
      const logged = res.data.user;

      // Clear local storage logic...
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
      localStorage.removeItem("vendor");

      if (logged.role === "admin") {
        localStorage.setItem("admin", JSON.stringify(logged));
        navigate("/admin/dashboard");
      } else if (logged.role === "vendor") {
        localStorage.setItem("vendor", JSON.stringify(logged));
        navigate("/vendor/dashboard");
      } else {
        localStorage.setItem("user", JSON.stringify(logged));
        navigate("/profilepage");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-100 p-4">
      <div className="w-full max-w-md">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-pink-600 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Please enter your details to sign in</p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-pink-50">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Input */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  name="email" type="email" placeholder="name@example.com"
                  onChange={handleChange} 
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  required 
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  name="password" type="password" placeholder="••••••••"
                  onChange={handleChange} 
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  required 
                />
              </div>
            </div>

            {/* Login Button */}
            <button 
              disabled={loading}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-xl shadow-lg transform transition active:scale-95 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-400">New here?</span></div>
          </div>

          {/* Registration Options */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/register")}
              className="flex items-center justify-center gap-2 p-3 border-2 border-blue-100 rounded-xl text-blue-600 font-medium hover:bg-blue-50 transition-colors"
            >
              <UserPlus size={18} /> User
            </button>
            <button
              onClick={() => navigate("/registerprovider")}
              className="flex items-center justify-center gap-2 p-3 border-2 border-green-100 rounded-xl text-green-600 font-medium hover:bg-green-50 transition-colors"
            >
              <Store size={18} /> Vendor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}