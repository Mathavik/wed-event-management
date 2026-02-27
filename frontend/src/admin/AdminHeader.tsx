export default function AdminHeader() {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      <div className="flex items-center gap-3">
        <span className="text-gray-600">Admin</span>
        <div className="w-8 h-8 bg-pink-500 rounded-full"></div>
      </div>
    </div>
  );
}