import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Search,
  AlertTriangle,
  X
} from "lucide-react";

interface Booking {
  id: number;
  provider_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  wedding_city: string;
  wedding_date: string;
  status: string;
}

const VendorBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);

  useEffect(() => {
    const vendor = localStorage.getItem("vendor");
    const providerId = vendor ? JSON.parse(vendor).id : null;
    if (!providerId) { setLoading(false); return; }

    axios.get(`http://127.0.0.1:8000/api/vendor/enquiries/${providerId}`)
      .then((res) => { setBookings(res.data.data); })
      .catch((err) => { console.error("Booking fetch error:", err); })
      .finally(() => { setLoading(false); });
  }, []);

  // Open popup
  const confirmDelete = (id: number) => {
    setSelectedBookingId(id);
    setShowModal(true);
  };

  // Actual Delete Logic
  const handleDelete = async () => {
    if (!selectedBookingId) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/enquiries/${selectedBookingId}`);
      setBookings(bookings.filter((b) => b.id !== selectedBookingId));
      setShowModal(false);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.wedding_city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDFCFM] p-4 md:p-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              My <span className="text-pink-600">Bookings</span>
            </h1>
            <p className="text-gray-500 font-medium">Manage and track all customer enquiries.</p>
          </div>

          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-pink-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 w-full md:w-80 transition-all"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
             <div className="p-20 text-center"><div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full mx-auto"></div></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 uppercase text-[10px] font-bold text-gray-400 tracking-widest">
                    <th className="px-8 py-5">Customer</th>
                    <th className="px-8 py-5">Event Detail</th>
                    <th className="px-8 py-5">Contact</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="font-bold text-gray-800">{booking.customer_name}</div>
                        <div className="text-[10px] text-gray-400 uppercase font-black">ID: #{booking.id}</div>
                      </td>
                      <td className="px-8 py-6">
<div className="text-sm font-bold text-gray-700 flex items-center gap-1">
  <Calendar size={14} className="text-pink-500"/> 
  
  {new Date(booking.wedding_date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}
</div>
                        <div className="text-sm text-gray-400 flex items-center gap-1">
                          <MapPin size={14}/> {booking.wedding_city}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-medium text-gray-600">{booking.customer_email}</div>
                        <div className="text-sm text-gray-400">{booking.customer_phone}</div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button
                          onClick={() => confirmDelete(booking.id)}
                          className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* --- CUSTOM POPUP MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={40} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Are you sure?</h3>
              <p className="text-gray-500 font-medium mb-8">
                Do you really want to delete this booking? This action cannot be undone.
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
                >
                  No, Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="flex-1 py-4 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 shadow-lg shadow-red-200 transition-all"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorBookings;