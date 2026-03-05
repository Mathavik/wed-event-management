import { useEffect, useState } from "react";
import axios from "axios";

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

  // 🔹 Fetch Vendor Bookings
  useEffect(() => {

    const vendor = localStorage.getItem("vendor");
    const providerId = vendor ? JSON.parse(vendor).id : null;

    if (!providerId) {
      console.error("Vendor ID not found");
      setLoading(false);
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/vendor/enquiries/${providerId}`)
      .then((res) => {
        setBookings(res.data.data);
      })
      .catch((err) => {
        console.error("Booking fetch error:", err);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  // 🔹 Delete Booking
  const deleteBooking = async (id: number) => {

    const confirmDelete = window.confirm("Delete this booking?");

    if (!confirmDelete) return;

    try {

      await axios.delete(`http://127.0.0.1:8000/api/enquiries/${id}`);

      // UI update
      setBookings(bookings.filter((b) => b.id !== id));

    } catch (error) {

      console.error("Delete error:", error);

    }

  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        My Bookings
      </h2>

      <div className="bg-white p-6 rounded shadow">

        {loading && <p>Loading bookings...</p>}

        {!loading && bookings.length === 0 && (
          <p>No bookings yet...</p>
        )}

        {!loading && bookings.length > 0 && (

          <table className="w-full border border-gray-200">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-3 border">Customer Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">City</th>
                <th className="p-3 border">Wedding Date</th>
                <th className="p-3 border">Action</th>
              </tr>

            </thead>

            <tbody>

              {bookings.map((booking) => (

                <tr key={booking.id} className="text-center">

                  <td className="p-2 border">
                    {booking.customer_name}
                  </td>

                  <td className="p-2 border">
                    {booking.customer_email}
                  </td>

                  <td className="p-2 border">
                    {booking.customer_phone}
                  </td>

                  <td className="p-2 border">
                    {booking.wedding_city}
                  </td>

                  <td className="p-2 border">
                    {new Date(booking.wedding_date).toLocaleDateString("en-IN")}
                  </td>

                  <td className="p-2 border">

                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
};

export default VendorBookings;