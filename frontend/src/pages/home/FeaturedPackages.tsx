const packages = [
  { title: "Silver Package", price: "₹2,50,000" },
  { title: "Gold Package", price: "₹5,00,000" },
  { title: "Platinum Package", price: "₹8,00,000" },
];

const FeaturedPackages = () => {
  return (
    <section className="py-20 bg-gray-50">
      <h2 className="text-4xl text-center font-semibold mb-12">
        Featured Packages
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {packages.map((pkg, index) => (
          <div key={index} className="bg-white shadow-lg p-8 text-center rounded-lg">
            <h3 className="text-2xl font-bold mb-4">{pkg.title}</h3>
            <p className="text-xl text-yellow-600 mb-6">{pkg.price}</p>
            <button className="bg-yellow-600 text-white px-6 py-2 rounded">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPackages;