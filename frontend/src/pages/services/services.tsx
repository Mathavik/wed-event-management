import React, { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import axios from "axios";

interface Service {
  id: number;
  title: string;
  image: string;
}

const Services = () => {
  const { id } = useParams<{ id: string }>();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/services?event_id=${id}`)
      .then((res) => setServices(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load services for this event");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading services...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <section className="py-20 bg-white">
      <h2 className="text-4xl text-center font-semibold mb-12">
        Our Services
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition duration-300"
          >
       <img
  src={`http://127.0.0.1:8000/uploads/services/${service.image}`}
  alt={service.title}
  className="h-64 w-full object-cover bg-gray-100"
/>

    <div className="p-6 text-center">
      <h3 className="text-xl font-semibold mb-4">
        {service.title}
      </h3>

      {/* 🔥 Explore Button */}
      <button
        onClick={() => navigate(`/service-provider/${service.id}`)}
        className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
      >
        Explore
      </button>
    </div>
  </div>
))}
      </div>
    </section>
  );
};

export default Services;