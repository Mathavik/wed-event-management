import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
interface Service {
  id: number;
  title: string;
}

const RegisterProvider: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    service_id: "",
    name: "",
    email: "",          
    password: "",      
    description: "",
    experience: "",
    image: "",
    contact: "",
  });

  const [message, setMessage] = useState("");

  // Fetch services
 useEffect(() => {
  const fetchServices = async () => {
    try {
      const response = await axiosInstance.get("/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  fetchServices();
}, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    ...formData,
    service_id: Number(formData.service_id),
  };

  console.log("Sending:", payload); // Debug check

  try {
    const response = await axiosInstance.post("/providers", payload);

    setMessage("Provider Registered Successfully ✅");
    console.log(response.data);

  } catch (error: any) {
    if (error.response) {
      setMessage("Error: " + JSON.stringify(error.response.data));
    } else {
      setMessage("Server not reachable ❌");
    }
    console.error(error);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register Service Provider
        </h2>

        {message && (
          <div className="mb-4 text-center text-sm text-green-600">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Service Dropdown */}
          <select
            name="service_id"
            value={formData.service_id}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="name"
            placeholder="Provider Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />

          {/* ✅ Email Field */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />

          {/* ✅ Password Field */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterProvider;