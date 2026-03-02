import React, { useEffect, useState } from "react";

interface Service {
  id: number;
  title: string;
}

const RegisterProvider: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    service_id: "",
    name: "",
    description: "",
    experience: "",
    image: "",
    contact: "",
  });

  const [message, setMessage] = useState("");

  // Fetch services
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/providers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Provider Registered Successfully ✅");
      setFormData({
        service_id: "",
        name: "",
        description: "",
        experience: "",
        image: "",
        contact: "",
      });
    } else {
      setMessage("Error: " + JSON.stringify(data));
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