import React, { useState, useEffect } from "react";
import axios from "axios";

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
    axios.post("http://localhost:8000/api/admin/events", {
      title, description, image: '', tags: ''
    })
    .then(res => {
      fetchEvents(); // Refresh list
      setTitle(""); setDescription("");
    })
    .catch(err => console.error(err.response?.data));
  };

  const deleteEvent = (id: number) => {
    axios.delete(`http://localhost:8000/api/admin/events/${id}`)
      .then(res => fetchEvents())
      .catch(err => console.error(err.response?.data));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Events</h2>

      <div className="mb-4">
        <input 
          type="text" placeholder="Title" value={title}
          onChange={e=>setTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <input 
          type="text" placeholder="Description" value={description}
          onChange={e=>setDescription(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addEvent} className="bg-blue-500 text-white p-2 rounded">Add Event</button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(ev => (
            <tr key={ev.id} className="border-b">
              <td className="p-2">{ev.title}</td>
              <td className="p-2">{ev.description}</td>
              <td className="p-2">
                <button 
                  onClick={()=>deleteEvent(ev.id)} 
                  className="bg-red-500 text-white p-1 rounded"
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}