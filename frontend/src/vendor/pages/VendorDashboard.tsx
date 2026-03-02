const VendorDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Total Bookings</h3>
          <p className="text-3xl mt-2">12</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-3xl mt-2">3</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Completed</h3>
          <p className="text-3xl mt-2">8</p>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;