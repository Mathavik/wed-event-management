import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Fingerprint, 
  TrendingUp, 
  Users, 
  Plus, 
  LayoutGrid, 
  ArrowUpRight, 
  Activity,
  DollarSign
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
    <div className="min-h-screen bg-[#f2f4f7] text-[#1a1c21] p-4 md:p-10 font-sans selection:bg-black selection:text-white">
      
      {/* FLOATING NAV BAR */}
      {/* <nav className="max-w-7xl mx-auto flex justify-between items-center mb-12 bg-white/60 backdrop-blur-xl border border-white/40 p-4 rounded-[2.5rem] shadow-sm">
        <div className="flex items-center gap-3 px-4">
          <div className="h-10 w-10 bg-black rounded-2xl flex items-center justify-center text-white">
            <Fingerprint size={20} />
          </div>
          <span className="font-black tracking-tighter text-xl">K-HQ</span>
        </div>
        <div className="flex gap-2">
            <button className="h-10 px-6 rounded-2xl bg-black text-white text-xs font-bold hover:scale-105 transition-transform">
                GENERATE REPORT
            </button>
        </div>
      </nav> */}

      <main className="max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* REVENUE - THE CORE METRIC */}
          <div className="lg:col-span-8 bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/40 border border-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8">
                <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:text-black transition-colors">
                    <TrendingUp size={30} />
                </div>
             </div>
             
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Net Platform Value</span>
             <h2 className="text-7xl font-black tracking-tighter mt-4 mb-10">
                ₹{stats.totalRevenue.toLocaleString()}
             </h2>
             
             <div className="flex flex-wrap gap-3">
                <div className="px-5 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black flex items-center gap-2">
                    <Activity size={14}/> LIVE MARKET
                </div>
                <div className="px-5 py-2 bg-slate-900 text-white rounded-full text-xs font-black flex items-center gap-2">
                    <Plus size={14}/> TOP UP ASSETS
                </div>
             </div>
          </div>

          {/* VENDORS - THE VERTICAL CARD */}
          <div className="lg:col-span-4 bg-indigo-600 rounded-[3rem] p-10 text-white flex flex-col justify-between shadow-xl shadow-indigo-200 relative overflow-hidden">
             <div className="absolute -right-10 -bottom-10 opacity-10">
                <Users size={200} />
             </div>
             <div className="relative z-10">
                <p className="text-indigo-200 font-bold text-xs uppercase tracking-widest">Partner Ecosystem</p>
                <h3 className="text-5xl font-black mt-2 tracking-tighter">{stats.totalVendors}</h3>
                <p className="text-indigo-200/60 text-sm mt-2 font-medium">Verified Service Providers</p>
             </div>
             <button className="relative z-10 w-fit mt-8 flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all">
                View Directory <ArrowUpRight size={16}/>
             </button>
          </div>

          {/* SECONDARY GRID */}
          <div className="lg:col-span-3 bg-white border border-slate-100 rounded-[3rem] p-8 flex flex-col items-center justify-center text-center shadow-sm">
             <div className="h-14 w-14 bg-pink-50 text-pink-500 rounded-3xl flex items-center justify-center mb-4">
                <LayoutGrid size={24}/>
             </div>
             <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest">Total Users</h4>
             <p className="text-4xl font-black mt-1 tracking-tighter">{stats.totalUsers}</p>
          </div>

          <div className="lg:col-span-3 bg-white border border-slate-100 rounded-[3rem] p-8 flex flex-col items-center justify-center text-center shadow-sm">
             <div className="h-14 w-14 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mb-4">
                <DollarSign size={24}/>
             </div>
             <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest">Completed Deals</h4>
             <p className="text-4xl font-black mt-1 tracking-tighter">{stats.totalBookings}</p>
          </div>

          {/* PENDING BAR - THE FULL WIDTH ACTION */}
          <div className="lg:col-span-6 bg-[#1a1c21] rounded-[3rem] p-8 flex flex-col md:flex-row items-center justify-between text-white">
             <div className="flex items-center gap-6 mb-4 md:mb-0">
                <div className="h-16 w-16 bg-white/5 rounded-[2rem] flex items-center justify-center">
                    <span className="text-2xl font-black text-indigo-400">{stats.pendingBookings}</span>
                </div>
                <div>
                    <h4 className="font-black text-xl tracking-tight">Pending Enquiries</h4>
                    <p className="text-slate-500 text-sm font-medium">Awaiting manual verification</p>
                </div>
             </div>
             <button className="w-full md:w-fit bg-indigo-500 text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-indigo-400 shadow-lg shadow-indigo-500/20 transition-all">
                CLEAR QUEUE
             </button>
          </div>

        </div>
      </main>
    </div>
  );
}