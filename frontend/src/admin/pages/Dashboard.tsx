export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold">120</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Total Bookings</h3>
          <p className="text-2xl font-bold">85</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold">₹ 2,50,000</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Pending Bookings</h3>
          <p className="text-2xl font-bold">10</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Confirmed Bookings</h3>
          <p className="text-2xl font-bold">60</p>
        </div>

      </div>
    </div>
  );
}