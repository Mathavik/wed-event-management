import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

interface Service {
  id: number;
  title: string;
  image: string;
}

const ServicesOverview = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosInstance.get<Service[]>("/services/services");
        setServices(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading services...</p>;
  }

  if (error) {
    return <p className="text-center py-20 text-red-500">{error}</p>;
  }

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
              src={service.image}
              alt={service.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold">
                {service.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesOverview;