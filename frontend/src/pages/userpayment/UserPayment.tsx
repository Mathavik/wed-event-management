import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

interface Enquiry {
  id: number;
  customer_name: string;
  customer_email: string;
  wedding_city: string;
  wedding_date: string;
  budget: string;
}

const UserPayment: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [bank, setBank] = useState("");

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://127.0.0.1:8000/api/enquiries/${id}`)
      .then((res) => {
        setEnquiry(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

 const handlePayment = async () => {
  if (!cardNumber || !expiry || !cvv || !bank) {
    alert("Please fill all payment details");
    return;
  }

  if (!enquiry) return;

  // FIX: Extract only numbers from the budget string (e.g., "above_40000" -> 40000)
  const amount = enquiry.budget ? parseInt(enquiry.budget.replace(/[^0-9]/g, "")) : 0;

  if (!amount || isNaN(amount) || amount <= 0) {
    alert("Invalid amount. Please contact admin.");
    return;
  }

  try {
    await axiosInstance.post("/user-payment", {
      enquiry_id: enquiry.id,
      customer_name: enquiry.customer_name,
      customer_email: enquiry.customer_email,
      amount: amount,
      bank: bank,
      card_number: cardNumber,
      // note: expiry and cvv are being sent but not handled in your Laravel store method
    });

    alert("Payment Successful! Your booking is confirmed.");
  } catch (error) {
    console.error(error);
    alert("Payment Failed");
  }
};

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!enquiry) return <p className="text-center text-red-500">Enquiry not found</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Wedding Payment
        </h2>

        <div className="space-y-2 mb-5">
          <p><b>Customer:</b> {enquiry.customer_name}</p>
          <p><b>Email:</b> {enquiry.customer_email}</p>
          <p><b>City:</b> {enquiry.wedding_city}</p>
          <p><b>Date:</b> {new Date(enquiry.wedding_date).toLocaleDateString()}</p>
          <p><b>Amount:</b> ₹{enquiry.budget}</p>
        </div>

        {/* Payment Form */}

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Card Number"
            className="w-full border p-2 rounded"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="MM/YY"
              className="w-1/2 border p-2 rounded"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />

            <input
              type="text"
              placeholder="CVV"
              className="w-1/2 border p-2 rounded"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>

          <select
            className="w-full border p-2 rounded"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
          >
            <option value="">Select Bank</option>
            <option value="HDFC Bank">HDFC Bank</option>
            <option value="ICICI Bank">ICICI Bank</option>
            <option value="SBI Bank">SBI Bank</option>
            <option value="Axis Bank">Axis Bank</option>
          </select>

        </div>

        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Pay ₹{enquiry.budget}
        </button>

      </div>
    </div>
  );
};

export default UserPayment;