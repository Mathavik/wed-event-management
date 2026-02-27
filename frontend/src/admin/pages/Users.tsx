export default function AdminUsers() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Users</h2>

      <div className="bg-white rounded shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">Jesi</td>
              <td className="p-2">jesi@gmail.com</td>
              <td className="p-2">9876543210</td>
              <td className="p-2">User</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}