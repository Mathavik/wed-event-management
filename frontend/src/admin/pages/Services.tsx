import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface Service {
  id: number;
  title: string;
  image: string;
  event_id: number;
}

interface EventType {
  id: number;
  title: string;
}

export default function AdminServices() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null); // New Ref for scrolling

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/events").then(res => setEvents(res.data));
  }, []);

  const fetchServices = (eventId: number) => {
    setSelectedEvent(eventId);
    axios.get(`http://127.0.0.1:8000/api/services?event_id=${eventId}`).then(res => setServices(res.data));
  };

  const handleSubmit = async () => {
    if (!selectedEvent) {
      Swal.fire("Warning", "Please select event first", "warning");
      return;
    }
    if (!title.trim()) {
      Swal.fire("Error", "Title is required", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("event_id", selectedEvent.toString());
    if (image instanceof File) formData.append("image", image);

    try {
      if (editId) {
        formData.append("_method", "PUT");
        await axios.post(`http://127.0.0.1:8000/api/services/${editId}`, formData);
        Swal.fire({ icon: 'success', title: 'Updated!', timer: 1500, showConfirmButton: false });
      } else {
        await axios.post("http://127.0.0.1:8000/api/services", formData);
        Swal.fire({ icon: 'success', title: 'Created!', timer: 1500, showConfirmButton: false });
      }

      setTitle("");
      setImage(null);
      setEditId(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchServices(selectedEvent);
    } catch (error) {
      Swal.fire("Error", "Action failed!", "error");
    }
  };

  const handleEdit = (service: Service) => {
    setTitle(service.title);
    setEditId(service.id);
    
    // Smooth scroll to the form box
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://127.0.0.1:8000/api/services/${id}`);
        Swal.fire('Deleted!', '', 'success');
        if (selectedEvent) fetchServices(selectedEvent);
      }
    });
  };

  return (
    <div className="flex gap-8 p-6">
      <div className="w-1/4">
        <h2 className="font-bold mb-4">Events</h2>
        {events.map(event => (
          <div
            key={event.id}
            onClick={() => fetchServices(event.id)}
            className={`p-3 mb-2 cursor-pointer rounded ${selectedEvent === event.id ? "bg-pink-500 text-white" : "bg-white shadow"}`}
          >
            {event.title}
          </div>
        ))}
      </div>

      <div className="w-3/4">
        {selectedEvent && (
          <>
            {/* 🔥 Ref added here to track the form position */}
            <div ref={formRef} className="mb-6 bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
              <h2 className="text-lg font-bold mb-3">{editId ? "Edit Service" : "Add New Service"}</h2>
              <div className="flex gap-3">
                <input
                  className="border p-2 rounded flex-1 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Service Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input ref={fileInputRef} type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
                <button onClick={handleSubmit} className={`${editId ? "bg-blue-500" : "bg-green-600"} text-white px-6 py-2 rounded`}>
                  {editId ? "Update" : "Create"}
                </button>
              </div>
            </div>

            <table className="w-full bg-white shadow rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr><th className="p-3">Image</th><th className="p-3">Title</th><th className="p-3 text-center">Actions</th></tr>
              </thead>
              <tbody>
                {services.map(service => (
                  <tr key={service.id} className="border-b text-center">
                    <td className="p-3"><img src={`http://127.0.0.1:8000/uploads/services/${service.image}`} className="h-14 mx-auto rounded" /></td>
                    <td className="font-medium">{service.title}</td>
                    <td className="space-x-2">
                      <button onClick={() => handleEdit(service)} className="bg-blue-500 text-white px-4 py-1 rounded">Edit</button>
                      <button onClick={() => handleDelete(service.id)} className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}