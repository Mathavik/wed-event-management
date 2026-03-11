import React, { useEffect, useState } from "react";
import axios from "axios";

interface Booking {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  wedding_city: string;
  wedding_date: string;
  budget?: string;
  status: string;
}

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    accepted: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    rejected: "bg-red-100 text-red-600 border border-red-200",
    pending: "bg-amber-100 text-amber-700 border border-amber-200",
  };
  const dots: Record<string, string> = {
    accepted: "bg-emerald-500",
    rejected: "bg-red-500",
    pending: "bg-amber-500",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || "bg-gray-400"}`} />
      {status}
    </span>
  );
};

const UserBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/enquiries");
      setBookings(res.data.data.data);
    } catch (error) {
      console.error("Error fetching bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const acceptBooking = async (id: number) => {
    setActionLoading(id);
    try {
      await axios.get(`http://127.0.0.1:8000/api/admin/enquiries/accept/${id}`);
      fetchBookings();
    } catch (error) {
      console.error("Accept error", error);
    } finally {
      setActionLoading(null);
    }
  };

  const rejectBooking = async (id: number) => {
    setActionLoading(id);
    try {
      await axios.get(`http://127.0.0.1:8000/api/admin/enquiries/reject/${id}`);
      fetchBookings();
    } catch (error) {
      console.error("Reject error", error);
    } finally {
      setActionLoading(null);
    }
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    accepted: bookings.filter(b => b.status === "accepted").length,
    rejected: bookings.filter(b => b.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Wedding Bookings</h1>
          </div>
          <p className="text-slate-500 text-sm ml-11">Manage and review all wedding enquiries</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, color: "text-slate-700", bg: "bg-white", border: "border-slate-200" },
            { label: "Pending", value: stats.pending, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Accepted", value: stats.accepted, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
            { label: "Rejected", value: stats.rejected, color: "text-red-500", bg: "bg-red-50", border: "border-red-100" },
          ].map(({ label, value, color, bg, border }) => (
            <div key={label} className={`${bg} border ${border} rounded-xl p-4 shadow-sm`}>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{label}</p>
              <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">All Enquiries</h2>
            <button
              onClick={fetchBookings}
              className="text-xs text-slate-500 hover:text-rose-500 flex items-center gap-1 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-8 h-8 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
              <p className="text-slate-400 text-sm">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-2">
              <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-slate-400 text-sm">No bookings found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {["#", "Customer", "Contact", "City", "Wedding Date", "Budget", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {bookings.map((booking, idx) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      <td className="px-5 py-4 text-slate-400 font-mono text-xs">{String(idx + 1).padStart(2, "0")}</td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                            {booking.customer_name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-slate-800 whitespace-nowrap">{booking.customer_name}</span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-slate-600 text-xs">{booking.customer_email}</span>
                          <span className="text-slate-400 text-xs">{booking.customer_phone}</span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-slate-600 whitespace-nowrap">
                          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {booking.wedding_city}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                        {new Date(booking.wedding_date).toLocaleDateString("en-IN", {
                          day: "2-digit", month: "short", year: "numeric"
                        })}
                      </td>

                      <td className="px-5 py-4">
 {booking.budget ? (
  <span className="font-semibold text-slate-700">
    ₹{booking.budget.split("_")[0]} - ₹{booking.budget.split("_")[1]}
  </span>
) : (
  <span className="text-slate-400 text-xs">Not specified</span>
)}
</td>

                      <td className="px-5 py-4">
                        <StatusBadge status={booking.status} />
                      </td>

                      <td className="px-5 py-4">
                        {booking.status === "pending" ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => acceptBooking(booking.id)}
                              disabled={actionLoading === booking.id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                            >
                              {actionLoading === booking.id ? (
                                <span className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                              Accept
                            </button>
                            <button
                              onClick={() => rejectBooking(booking.id)}
                              disabled={actionLoading === booking.id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-red-50 text-red-500 border border-red-200 hover:border-red-300 text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-300 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && bookings.length > 0 && (
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50">
              <p className="text-xs text-slate-400">
                Showing <span className="font-medium text-slate-600">{bookings.length}</span> enquiries
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBookings;