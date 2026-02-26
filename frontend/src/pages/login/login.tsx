import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      alert("Login Successful");
      console.log(res.data);
      navigate("/");
    } catch (err) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2a0808] to-[#1a0404]">
      <div className="bg-[#2a0808] p-8 rounded shadow-lg w-96 border border-yellow-700">
        <h2 className="text-2xl text-yellow-500 mb-6 text-center font-serif">
          ✦ Kalyana Vaibhogam Login ✦
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded bg-[#1a0404] text-white border border-yellow-700 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-[#1a0404] text-white border border-yellow-700 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="py-3 bg-gradient-to-r from-yellow-700 to-yellow-500 text-black font-bold uppercase tracking-widest hover:scale-105 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}