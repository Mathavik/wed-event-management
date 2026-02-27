const GalleryPreview = () => {
  return (
    <section className="py-20 bg-white">
      <h2 className="text-4xl text-center font-semibold mb-12">
        Wedding Moments
      </h2>

      <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto px-6">
        {[1,2,3,4,5,6].map((item) => (
          <div key={item} className="h-60 bg-gray-300 rounded-lg" />
        ))}
      </div>
    </section>
  );
};

export default GalleryPreview;