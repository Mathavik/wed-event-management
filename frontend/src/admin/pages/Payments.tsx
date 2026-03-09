import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 1. Define what a Payment object looks like
interface Payment {
  id: number;
  transaction_id: string;
  amount: string | number;
  duration_months: number;
  status: string;
  ends_at: string;
  provider?: {
    name: string;
  };
}

export default function Payments() {
  // 2. Tell the state to expect an array of 'Payment' objects
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your real API URL
    axios.get('http://127.0.0.1:8000/api/providers/all-payments')
      .then(response => {
        // Access the data array from your Laravel response structure
        setPayments(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching payments:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Payments</h2>

      <div className="bg-white rounded shadow p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3 text-left">Transaction ID</th>
              <th className="p-3 text-left">Provider Name</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-4 text-center">Loading...</td></tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-mono">{payment.transaction_id}</td>
                  <td className="p-3 font-medium">{payment.provider?.name || 'N/A'}</td>
                  <td className="p-3">{payment.duration_months} Months</td>
                  <td className="p-3 font-semibold text-blue-600">₹ {payment.amount}</td>
                  <td className="p-3 text-xs">
                    <span className={`px-2 py-1 rounded-full ${
                      payment.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {payment.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-sm">
                    {/* Safe check for the date */}
                    {payment.ends_at ? new Date(payment.ends_at).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}