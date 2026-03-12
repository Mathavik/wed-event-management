import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircle, Trash2, Heart, Sparkles, Calendar } from "lucide-react";

type EventType = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string;
};

export default function AdminEvents() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get("http://localhost:8000/api/admin/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err.response?.data));
  };

  const addEvent = () => {
    if(!title || !description) return alert("Please fill in all required fields.");
    axios.post("http://localhost:8000/api/admin/events", {
      title, description, image: '', tags: ''
    })
    .then(res => {
      fetchEvents();
      setTitle(""); 
      setDescription("");
    })
    .catch(err => console.error(err.response?.data));
  };

  const deleteEvent = (id: number) => {
    // English Confirmation
    if(window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      axios.delete(`http://localhost:8000/api/admin/events/${id}`)
        .then(res => fetchEvents())
        .catch(err => console.error(err.response?.data));
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
       

        {/* Input Form Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-rose-100 p-8 mb-10 border border-rose-50">
          <div className="flex items-center gap-2 mb-6 text-rose-500">
            <PlusCircle size={22} />
            <h3 className="font-bold text-lg">Add New Event</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-rose-400 uppercase ml-1 tracking-wider">Event Title</label>
              <input 
                type="text" 
                placeholder="e.g. Annual Gala 2024" 
                value={title}
                onChange={e=>setTitle(e.target.value)}
                className="w-full bg-rose-50/30 border-2 border-rose-100 p-3 rounded-2xl focus:ring-4 focus:ring-rose-100 focus:border-rose-300 outline-none transition-all placeholder:text-rose-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-rose-400 uppercase ml-1 tracking-wider">Event Description</label>
              <input 
                type="text" 
                placeholder="Briefly describe the event..." 
                value={description}
                onChange={e=>setDescription(e.target.value)}
                className="w-full bg-rose-50/30 border-2 border-rose-100 p-3 rounded-2xl focus:ring-4 focus:ring-rose-100 focus:border-rose-300 outline-none transition-all placeholder:text-rose-200"
              />
            </div>
          </div>
          
          <button 
            onClick={addEvent} 
            className="mt-8 w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold py-4 rounded-2xl hover:shadow-lg hover:shadow-rose-200 hover:-translate-y-0.5 transition-all active:scale-95 shadow-md"
          >
            Confirm & Create Event
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-3xl shadow-xl shadow-rose-100 overflow-hidden border border-rose-50">
          <div className="bg-rose-50 p-4 border-b border-rose-100 flex justify-between items-center">
             <span className="text-rose-600 font-bold px-3">Live Events List</span>
             <span className="bg-white text-rose-500 text-xs font-bold px-3 py-1 rounded-full border border-rose-100">
               {events.length} Active
             </span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-white text-rose-400 border-b border-rose-50">
                <th className="p-5 text-left text-xs font-bold uppercase tracking-widest">Event Name</th>
                <th className="p-5 text-left text-xs font-bold uppercase tracking-widest">Description</th>
                <th className="p-5 text-center text-xs font-bold uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-50">
              {events.length > 0 ? (
                events.map(ev => (
                  <tr key={ev.id} className="hover:bg-rose-50/20 transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="bg-rose-100/50 p-2 rounded-xl text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                          <Calendar size={18} />
                        </div>
                        <span className="font-bold text-gray-700">{ev.title}</span>
                      </div>
                    </td>
                    <td className="p-5 text-gray-500 text-sm italic">{ev.description}</td>
                    <td className="p-5 text-center">
                      <button 
                        onClick={()=>deleteEvent(ev.id)} 
                        className="p-2.5 text-rose-300 hover:text-white hover:bg-rose-400 rounded-xl transition-all border border-transparent hover:border-rose-400"
                        title="Delete Event"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-40">
                      <Heart size={40} className="text-rose-200" />
                      <p className="text-rose-300 font-medium">No events scheduled yet</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}