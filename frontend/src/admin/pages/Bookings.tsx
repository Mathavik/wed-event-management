export default function Bookings() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Bookings</h2>

      <div className="bg-white rounded shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Event</th>
              <th className="text-left p-2">User</th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">Wedding</td>
              <td className="p-2">Arun</td>
              <td className="p-2">12-03-2026</td>
              <td className="p-2 text-yellow-600">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}