import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance"; // 🔥 correct path adjust pannunga

interface Provider {
  id: number;
  name: string;
  image: string;
  description: string;
}

const ServiceProvider = () => {
  const { id } = useParams<{ id: string }>();

  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    axiosInstance
      .get(`/providers/services/${id}/providers`)  // ❌ /api remove pannirukom
      .then((res) => setProviders(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load providers");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading providers...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <section className="py-20 bg-gray-50">
      <h2 className="text-4xl text-center font-semibold mb-12">
        Service Providers
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition"
          >
            <img
              src={`http://127.0.0.1:8000/uploads/providers/${provider.image}`}
              alt={provider.name}
              className="h-40 w-40 mx-auto rounded-full object-cover mb-4"
            />

            <h3 className="text-xl font-semibold mb-2">
              {provider.name}
            </h3>

            <p className="text-gray-600">
              {provider.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceProvider;