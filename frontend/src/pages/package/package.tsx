import { useEffect, useState } from "react";
import axios from "axios";

interface EventType {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string;
}

export default function Package() {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/events")
      .then(res => setEvents(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-pink-50">

      {/* Hero Section */}
      <div className="relative h-72">
        <img
          src="http://localhost:8000/uploads/events/hero.jpg"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold">
            Choose Your Event Type
          </h1>
          <p className="mt-2 text-lg">
            Let us make your special moments unforgettable 💫
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 p-10">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 overflow-hidden"
          >
            <img
              src={`http://localhost:8000/uploads/events/${event.image}`}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold text-pink-600">
                {event.title}
              </h2>

              <p className="text-gray-600 mt-2 text-sm">
                {event.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {event.tags.split(",").map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg transition">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}