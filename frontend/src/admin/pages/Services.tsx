export default function AdminServices() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded shadow">Mehandi</div>
        <div className="bg-white p-4 rounded shadow">DJ</div>
        <div className="bg-white p-4 rounded shadow">Cake</div>
        <div className="bg-white p-4 rounded shadow">Decoration</div>
      </div>
    </div>
  );
}