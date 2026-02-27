export default function Payments() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Payments</h2>

      <div className="bg-white rounded shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Booking ID</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">#102</td>
              <td className="p-2">Kumar</td>
              <td className="p-2">₹ 25,000</td>
              <td className="p-2 text-green-600">Paid</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}