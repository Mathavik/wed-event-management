import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import axios from "axios";
import { 
  LayoutDashboard, 
  Clock, 
  CheckCircle2, 
  Users, 
  TrendingUp,
  Calendar,
  ArrowUpRight,
  MoreVertical,
  Mail,
  Phone,
  ArrowRight
} from "lucide-react";

interface Booking {
  id: number;
  status: string;
  customer_name: string;
  customer_email: string;
  wedding_date: string;
}

const VendorDashboard = () => {
  const navigate = useNavigate(); // 2. Initialize navigate
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const vendor = localStorage.getItem("vendor");
    const providerId = vendor ? JSON.parse(vendor).id : null;

    if (!providerId) return;

    axios.get(`http://127.0.0.1:8000/api/vendor/enquiries/${providerId}`)
      .then(res => {
        const bookings: Booking[] = res.data.data;
        setTotal(bookings.length);
        setPending(bookings.filter(b => b.status === "pending").length);
        setCompleted(bookings.filter(b => b.status === "completed").length);
        setRecentBookings(bookings.slice(0, 5)); 
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFM] p-4 md:p-8 font-sans text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Vendor <span className="text-pink-600">Dashboard</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium">Monitoring your business performance and enquiries.</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center gap-3 bg-white shadow-sm border border-gray-100 p-2 rounded-2xl">
          <div className="bg-pink-50 p-2 rounded-xl text-pink-600"><Calendar size={20} /></div>
          <span className="text-sm font-bold text-gray-700 mr-2">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 p-3 rounded-2xl text-blue-600"><Users size={24} /></div>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Enquiries</p>
            <h2 className="text-4xl font-black mt-2">{total}</h2>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-orange-50 p-3 rounded-2xl text-orange-600"><Clock size={24} /></div>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pending</p>
            <h2 className="text-4xl font-black mt-2">{pending}</h2>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-green-50 p-3 rounded-2xl text-green-600"><CheckCircle2 size={24} /></div>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Completed</p>
            <h2 className="text-4xl font-black mt-2">{completed}</h2>
          </div>
        </div>

        {/* RECENT RECORDS TABLE */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="text-pink-500" size={20} /> Recent Enquiries
            </h3>
            
            {/* 3. Navigation Button logic */}
            <button 
              onClick={() => navigate('/vendor/bookings')} 
              className="flex items-center gap-2 text-sm font-bold text-pink-600 hover:text-pink-700 transition-all group"
            >
              View All Records 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Wedding Date</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentBookings.length > 0 ? (
                  recentBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="font-bold text-gray-800">{b.customer_name}</div>
                        <div className="text-[10px] text-gray-400 font-medium tracking-wide">ID: #{b.id}</div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="text-sm font-bold text-gray-600">{b.wedding_date}</div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex gap-2 text-gray-400">
                          <Mail size={16} className="hover:text-pink-600 cursor-pointer" />
                          <Phone size={16} className="hover:text-pink-600 cursor-pointer" />
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          b.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-10 text-center text-gray-400 font-medium">
                      No recent enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;