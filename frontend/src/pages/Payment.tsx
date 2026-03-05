import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const Payment: React.FC = () => {
  const [duration, setDuration] = useState<6 | 12>(12);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const plans = {
    6: {
      duration: "6 Months",
      originalPrice: 22200,
      discountedPrice: 20000,
      discount: 10,
    },
    12: {
      duration: "12 Months",
      originalPrice: 38888,
      discountedPrice: 35000,
      discount: 10,
    },
  };

  const currentPlan = plans[duration];
  const gstAmount = Math.round((currentPlan.discountedPrice * 18) / 100);
  const totalAmount = currentPlan.discountedPrice + gstAmount;

  const handlePayment = async () => {
    try {
      setLoading(true);
      // This would typically integrate with a payment gateway like Razorpay
      await axiosInstance.post("/payment/process", {
        amount: totalAmount,
        duration,
        method: selectedPaymentMethod,
      });
      alert("Payment successful!");
      navigate("/vendor/dashboard");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white px-6 py-2 rounded-full shadow-md mb-4">
            <p className="text-purple-600 font-semibold text-sm">Wedding Bazaar Membership</p>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Grow Your Business</h1>
          <p className="text-lg text-gray-600">Vendors have generated ₹50 crore revenue. Join them today!</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pricing Cards - Left */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-8">
              {/* Plan Toggle */}
              <div className="p-6 bg-gradient-to-r from-pink-500 to-purple-600">
                <div className="flex gap-3 bg-white/20 rounded-lg p-1">
                  <button
                    onClick={() => setDuration(6)}
                    className={`flex-1 px-3 py-2 rounded-lg font-semibold transition ${
                      duration === 6
                        ? "bg-white text-pink-600"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    6 Months
                  </button>
                  <button
                    onClick={() => setDuration(12)}
                    className={`flex-1 px-3 py-2 rounded-lg font-semibold transition relative ${
                      duration === 12
                        ? "bg-white text-pink-600"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    12 Months
                    {duration !== 12 && (
                      <span className="absolute -top-3 -right-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full text-black">
                        Save 10%
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Plan Details */}
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Plan Duration</p>
                  <p className="text-2xl font-bold text-purple-900">{currentPlan.duration}</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-600 text-sm mb-2">Price Breakdown</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Base Price</span>
                      <span className="line-through text-gray-400">₹{currentPlan.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">After Discount (10%)</span>
                      <span className="font-semibold text-gray-800">₹{currentPlan.discountedPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">GST (18%)</span>
                      <span className="font-semibold text-gray-800">₹{gstAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 bg-pink-50 -mx-6 -mb-6 px-6 py-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 font-semibold">Total Amount</span>
                    <span className="text-3xl font-bold text-pink-600">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-500">Inclusive of all taxes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form - Right */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Payment</h2>

              {/* Payment Methods */}
              <div className="space-y-3 mb-8">
                <label className={`relative block border-2 rounded-xl p-4 cursor-pointer transition ${
                  selectedPaymentMethod === "card"
                    ? "border-pink-600 bg-pink-50"
                    : "border-gray-200 hover:border-pink-300"
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={selectedPaymentMethod === "card"}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">💳</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Credit/Debit Card</div>
                      <div className="text-sm text-gray-600">Visa, Mastercard, RuPay</div>
                    </div>
                  </div>
                </label>

                <label className={`relative block border-2 rounded-xl p-4 cursor-pointer transition ${
                  selectedPaymentMethod === "upi"
                    ? "border-pink-600 bg-pink-50"
                    : "border-gray-200 hover:border-pink-300"
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={selectedPaymentMethod === "upi"}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">📱</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">UPI</div>
                      <div className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</div>
                    </div>
                  </div>
                </label>

                <label className={`relative block border-2 rounded-xl p-4 cursor-pointer transition ${
                  selectedPaymentMethod === "netbanking"
                    ? "border-pink-600 bg-pink-50"
                    : "border-gray-200 hover:border-pink-300"
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={selectedPaymentMethod === "netbanking"}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">🏦</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Net Banking</div>
                      <div className="text-sm text-gray-600">All major banks</div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Features */}
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">What You Get:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex gap-3">
                    <span className="text-pink-600 text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Paid Tag on Website</p>
                      <p className="text-xs text-gray-600">Appear as verified vendor</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-pink-600 text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Dedicated Support</p>
                      <p className="text-xs text-gray-600">24/7 customer assistance</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-pink-600 text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Profile Visibility</p>
                      <p className="text-xs text-gray-600">10x more customer reach</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-pink-600 text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Unlimited Photos</p>
                      <p className="text-xs text-gray-600">4K portfolio support</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-pink-600 text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Direct Enquiries</p>
                      <p className="text-xs text-gray-600">Receive customer messages</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-pink-600 text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Social Media Share</p>
                      <p className="text-xs text-gray-600">Visibility to 1M+ followers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 rounded-xl transition transform hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>💳</span>
                    Pay ₹{totalAmount.toLocaleString()}
                  </span>
                )}
              </button>

              {/* Support */}
              <div className="mt-6 text-center text-sm text-gray-600">
                <p>Having trouble? <a href="tel:+918864312795" className="text-pink-600 hover:underline font-semibold">Call us at 8864312795</a></p>
                <p className="mt-2 text-xs">Secure & encrypted payment • 100% safe transaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-2xl">⭐</span>
              ))}
            </div>
            <p className="text-lg text-gray-700 mb-4 italic">
              "Wedding Bazaar helped me get 50+ bookings in just 6 months. The platform is amazing and the support team is very responsive!"
            </p>
            <p className="font-semibold text-gray-900">- Priya Sharma, Photographer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
