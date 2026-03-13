import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  TrendingUp, 
  Users, 
  Plus, 
  LayoutGrid, 
  ArrowUpRight, 
  Activity,
  DollarSign,
  ClipboardCheck
} from "lucide-react";

export default function TitaniumDashboard() {
  const [stats, setStats] = useState({
    totalVendors: 0,
    totalBookings: 0,
    totalUsers: 0,
    pendingBookings: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/admin/dashboard-stats")
      .then(res => setStats(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#2a1b15] p-4 md:p-10 font-sans">
      
      <main className="max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* REVENUE - Soft Cream & Gold Theme */}
          <div className="lg:col-span-8 bg-white rounded-[3rem] p-10 shadow-xl shadow-orange-100/50 border border-[#eee4d3] relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8">
                <div className="h-16 w-16 bg-[#fffcf5] rounded-full flex items-center justify-center text-[#c5a059] group-hover:scale-110 transition-transform">
                    <TrendingUp size={30} />
                </div>
             </div>
             
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#a68b7c]">Net Platform Value</span>
             <h2 className="text-7xl font-black tracking-tighter mt-4 mb-10 text-[#4a1d1d]">
                ₹{stats.totalRevenue.toLocaleString()}
             </h2>
             
             <div className="flex flex-wrap gap-3">
                <div className="px-5 py-2 bg-[#fdf2f2] text-[#a32a2a] rounded-full text-xs font-black flex items-center gap-2 border border-[#f5e1e1]">
                    <Activity size={14}/> LIVE MARKET
                </div>
                <div className="px-5 py-2 bg-[#4a1d1d] text-[#f2e6d8] rounded-full text-xs font-black flex items-center gap-2 hover:bg-[#632626] transition-colors cursor-pointer">
                    <Plus size={14}/> TOP UP ASSETS
                </div>
             </div>
          </div>

          {/* PARTNER ECOSYSTEM - Maroon/Brown Theme */}
          <div className="lg:col-span-4 bg-[#4a1d1d] rounded-[3rem] p-10 text-[#f2e6d8] flex flex-col justify-between shadow-xl shadow-red-900/10 relative overflow-hidden">
             <div className="absolute -right-10 -bottom-10 opacity-10">
                <Users size={200} />
             </div>
             <div className="relative z-10">
                <p className="text-[#c5a059] font-bold text-xs uppercase tracking-widest">Partner Ecosystem</p>
                <h3 className="text-6xl font-black mt-2 tracking-tighter">{stats.totalVendors}</h3>
                <p className="text-[#f2e6d8]/60 text-sm mt-2 font-medium">Verified Service Providers</p>
             </div>
             <button className="relative z-10 w-fit mt-8 flex items-center gap-2 bg-[#c5a059] text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#b38f4d] transition-all shadow-lg">
                View Directory <ArrowUpRight size={16}/>
             </button>
          </div>

          {/* SECONDARY GRID */}
          <div className="lg:col-span-3 bg-white border border-[#eee4d3] rounded-[3rem] p-8 flex flex-col items-center justify-center text-center shadow-sm">
             <div className="h-14 w-14 bg-[#fff5f5] text-[#a32a2a] rounded-3xl flex items-center justify-center mb-4">
                <LayoutGrid size={24}/>
             </div>
             <h4 className="text-[#a68b7c] font-bold text-xs uppercase tracking-widest">Total Users</h4>
             <p className="text-4xl font-black mt-1 tracking-tighter text-[#4a1d1d]">{stats.totalUsers}</p>
          </div>

          <div className="lg:col-span-3 bg-white border border-[#eee4d3] rounded-[3rem] p-8 flex flex-col items-center justify-center text-center shadow-sm">
             <div className="h-14 w-14 bg-[#fffcf0] text-[#c5a059] rounded-3xl flex items-center justify-center mb-4">
                <DollarSign size={24}/>
             </div>
             <h4 className="text-[#a68b7c] font-bold text-xs uppercase tracking-widest">Completed Deals</h4>
             <p className="text-4xl font-black mt-1 tracking-tighter text-[#4a1d1d]">{stats.totalBookings}</p>
          </div>

          {/* PENDING BAR - Light Theme but with Contrast Action */}
          <div className="lg:col-span-6 bg-white border border-[#eee4d3] rounded-[3rem] p-8 flex flex-col md:flex-row items-center justify-between shadow-md">
             <div className="flex items-center gap-6 mb-4 md:mb-0">
                <div className="h-16 w-16 bg-[#fdf2f2] rounded-[2rem] flex items-center justify-center">
                    <span className="text-2xl font-black text-[#a32a2a]">{stats.pendingBookings}</span>
                </div>
                <div>
                    <h4 className="font-black text-xl tracking-tight text-[#4a1d1d]">Pending Enquiries</h4>
                    <p className="text-[#a68b7c] text-sm font-medium">Awaiting manual verification</p>
                </div>
             </div>
             <button className="w-full md:w-fit bg-[#a32a2a] text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-[#821f1f] shadow-lg shadow-red-200 transition-all">
                CLEAR QUEUE
             </button>
          </div>

        </div>
      </main>
    </div>
  );
}