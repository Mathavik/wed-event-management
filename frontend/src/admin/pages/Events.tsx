export default function Events() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Event Types</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">Wedding</div>
        <div className="bg-white p-6 rounded shadow">Birthday</div>
        <div className="bg-white p-6 rounded shadow">Traditional Function</div>
      </div>
    </div>
  );
}