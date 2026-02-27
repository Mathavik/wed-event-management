import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    city: "",
    role: "bride"
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/register", form);
    alert("Registered Successfully");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange}
          className="w-full mb-3 p-2 border rounded" required />

        <input name="email" type="email" placeholder="Email"
          onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />

        <input name="phone" placeholder="Phone"
          onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />

        <input name="password" type="password" placeholder="Password"
          onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />

        <input name="city" placeholder="City"
          onChange={handleChange} className="w-full mb-3 p-2 border rounded" />

        <select name="role" onChange={handleChange}
          className="w-full mb-3 p-2 border rounded">
          <option value="bride">Bride Side</option>
          <option value="groom">Groom Side</option>
        </select>

        <button className="w-full bg-pink-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}