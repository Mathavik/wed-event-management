import React from "react";

const services = [
  {
    title: "Venue Selection",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552",
  },
  {
    title: "Catering",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033",
  },
  {
    title: "Decoration",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf",
  },
  {
    title: "Photography",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
  },
  {
    title: "Entertainment",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
  },
  {
    title: "Bridal Styling",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
  },
];

const ServicesOverview = () => {
  return (
    <section className="py-20 bg-white">
      <h2 className="text-4xl text-center font-semibold mb-12">
        Our Services
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition duration-300"
          >
            <img
              src={`${service.image}?auto=format&fit=crop&w=600&q=80`}
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