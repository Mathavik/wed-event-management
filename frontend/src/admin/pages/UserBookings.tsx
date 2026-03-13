import React, { useEffect, useState } from "react";
import axios from "axios";

interface Booking {
  id: number;
  customer_name: string;
  customer_phone: string;
  wedding_date: string;
  budget?: string;
  status: string;
}

const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, { bg: string; dot: string; text: string; label: string }> = {
    accepted: {
      bg: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
      dot: "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]",
      text: "text-emerald-700",
      label: "Accepted",
    },
    rejected: {
      bg: "bg-red-50 text-red-600 ring-1 ring-red-200",
      dot: "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]",
      text: "text-red-600",
      label: "Rejected",
    },
    pending: {
      bg: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
      dot: "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]",
      text: "text-amber-700",
      label: "Pending",
    },
  };
  const c = config[status] || {
    bg: "bg-gray-100 text-gray-600 ring-1 ring-gray-200",
    dot: "bg-gray-400",
    text: "text-gray-600",
    label: status,
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${c.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  );
};

const Avatar = ({ name }: { name: string }) => {
  const colors = [
    "from-rose-400 to-pink-600",
    "from-violet-400 to-purple-600",
    "from-sky-400 to-blue-600",
    "from-amber-400 to-orange-500",
    "from-teal-400 to-emerald-600",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm`}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

const StatCard = ({
  label,
  value,
  icon,
  colorClass,
  bgClass,
  ringClass,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
  ringClass: string;
}) => (
  <div className={`relative overflow-hidden rounded-2xl p-5 ${bgClass} ring-1 ${ringClass} shadow-sm`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
        <p className={`text-4xl font-black tracking-tight ${colorClass}`}>{value}</p>
      </div>
      <div className={`w-10 h-10 rounded-xl ${bgClass} ring-1 ${ringClass} flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </div>
);

const Spinner = ({ size = "md" }: { size?: "sm" | "md" }) => (
  <span
    className={`inline-block rounded-full border-2 border-current border-t-transparent animate-spin ${
      size === "sm" ? "w-3 h-3" : "w-5 h-5"
    }`}
  />
);

const UserBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
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
    pending: bookings.filter((b) => b.status === "pending").length,
    accepted: bookings.filter((b) => b.status === "accepted").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
  };

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const formatBudget = (budget?: string) => {
    if (!budget) return null;
    const parts = budget.split("_");
    if (parts.length < 2) return budget;
    const fmt = (n: string) => {
      const num = parseInt(n);
      if (isNaN(num)) return n;
      if (num >= 100000) return `${(num / 100000).toFixed(num % 100000 === 0 ? 0 : 1)}L`;
      if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
      return n;
    };
    return `₹${fmt(parts[0])} – ₹${fmt(parts[1])}`;
  };

  return (
    <div className="min-h-screen bg-[#f6f5f3] font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .row-hover { transition: background 0.15s; }
        .row-hover:hover { background: rgba(255,255,255,0.7); }
        .fade-in { animation: fadeIn 0.4s ease both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .chip-active { background: #1e293b; color: #fff; }
        .chip-inactive { background: white; color: #64748b; }
        .chip-inactive:hover { background: #f1f5f9; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 font-body">

        
        

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total"
            value={stats.total}
            colorClass="text-slate-800"
            bgClass="bg-white"
            ringClass="ring-slate-200"
            icon={<svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>}
          />
          <StatCard
            label="Pending"
            value={stats.pending}
            colorClass="text-amber-600"
            bgClass="bg-amber-50"
            ringClass="ring-amber-200"
            icon={<svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
          />
          <StatCard
            label="Accepted"
            value={stats.accepted}
            colorClass="text-emerald-600"
            bgClass="bg-emerald-50"
            ringClass="ring-emerald-200"
            icon={<svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
          />
          <StatCard
            label="Rejected"
            value={stats.rejected}
            colorClass="text-red-500"
            bgClass="bg-red-50"
            ringClass="ring-red-200"
            icon={<svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
          />
        </div>

        {/* ── Table Card ── */}
        <div className="bg-white rounded-3xl ring-1 ring-slate-200 shadow-sm overflow-hidden">

          {/* Table toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2 flex-wrap">
              {(["all", "pending", "accepted", "rejected"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ring-1 ${
                    filter === f
                      ? "chip-active ring-slate-800 shadow-sm"
                      : "chip-inactive ring-slate-200"
                  }`}
                >
                  {f === "all" ? `All (${stats.total})` : f === "pending" ? `Pending (${stats.pending})` : f === "accepted" ? `Accepted (${stats.accepted})` : `Rejected (${stats.rejected})`}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-10 h-10 rounded-full border-[3px] border-rose-100 border-t-rose-500 animate-spin" />
              <p className="text-slate-400 text-sm font-medium">Fetching bookings…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-slate-400 text-sm font-medium">No {filter === "all" ? "" : filter} bookings found</p>
            </div>
          ) : (
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((booking, idx) => (
                <div
                  key={booking.id}
                  className="booking-card bg-[#fafaf9] rounded-2xl ring-1 ring-slate-200 p-5 flex flex-col gap-4 fade-in"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  {/* Card Top: Avatar + Name + Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar name={booking.customer_name} />
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 text-sm truncate">{booking.customer_name}</p>
                        <span className="inline-flex items-center gap-1 text-slate-400 text-xs mt-0.5">
                          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {booking.customer_phone}
                        </span>
                      </div>
                    </div>
                    <StatusBadge status={booking.status} />
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-100" />

                  {/* Info row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wedding Date</p>
                      <span className="inline-flex items-center gap-1.5 text-slate-700 text-xs font-semibold">
                        <svg className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(booking.wedding_date).toLocaleDateString("en-IN", {
                          day: "2-digit", month: "short", year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Budget</p>
                      {formatBudget(booking.budget) ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white ring-1 ring-slate-200 text-slate-700 text-xs font-semibold w-fit">
                          {formatBudget(booking.budget)}
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs font-medium">Not specified</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  {booking.status === "pending" && (
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => acceptBooking(booking.id)}
                        disabled={actionLoading === booking.id}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-emerald-100"
                      >
                        {actionLoading === booking.id ? (
                          <Spinner size="sm" />
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        Accept
                      </button>
                      <button
                        onClick={() => rejectBooking(booking.id)}
                        disabled={actionLoading === booking.id}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white hover:bg-red-50 active:scale-95 text-red-500 ring-1 ring-red-200 hover:ring-red-300 text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          {!loading && bookings.length > 0 && (
            <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between">
              <p className="text-xs text-slate-400 font-medium">
                Showing <span className="text-slate-600 font-semibold">{filtered.length}</span> of{" "}
                <span className="text-slate-600 font-semibold">{bookings.length}</span> enquiries
              </p>
              {filter !== "all" && (
                <button
                  onClick={() => setFilter("all")}
                  className="text-xs text-rose-400 hover:text-rose-500 font-medium transition-colors"
                >
                  Clear filter ×
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBookings;