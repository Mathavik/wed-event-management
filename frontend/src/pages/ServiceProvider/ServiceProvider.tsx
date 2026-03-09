import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
interface Album {
  name: string;
  photos: string[];
}
interface Provider {
  id: number;
  service_id: number;
  name: string;
  email: string;
  contact: string;
  description: string;
  image: string;
  experience?: string;
  rating?: number;
  reviews_count?: number;
  is_featured?: boolean;
  price?: number;
  price_type?: string;
  area: string;
  city: string;
  albums?: Album[];
}

interface EnquiryForm {
  provider_id: number;
  wedding_city: string;
  interested_services: string[];
  budget: string;
  wedding_date: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
}

const ServiceProvider = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [submittedProvider, setSubmittedProvider] = useState<Provider | null>(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [formData, setFormData] = useState<EnquiryForm>({
    provider_id: 0,
    wedding_city: "",
    interested_services: [],
    budget: "",
    wedding_date: "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
  });

  useEffect(() => {
    if (!id) return;

    // Fetch providers for the selected service
    axiosInstance
      .get(`/providers/services/${id}/providers`)
      .then((res) => {
        console.log("Providers fetched:", res.data);
        setProviders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching providers:", err);
        setError("Failed to load service providers. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleEnquiryClick = (provider: Provider) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user"); // if you store user info

    // If not registered (no user data at all)
    if (!user) {
      navigate("/register");
      return;
    }

    // If registered but not logged in (no token)
    if (!token) {
      navigate("/login");
      return;
    }

    // If logged in → show form
    setSelectedProvider(provider);
    setFormData({
      ...formData,
      provider_id: provider.id,
    });
    setShowEnquiryForm(true);
  };

  const handleCloseForm = () => {
    setShowEnquiryForm(false);
    setSelectedProvider(null);
    setFormData({
      provider_id: 0,
      wedding_city: "",
      interested_services: [],
      budget: "",
      wedding_date: "",
      customer_name: "",
      customer_email: "",
      customer_phone: "",
    });
  };

  const handleCloseThankYou = () => {
    setShowThankYou(false);
    setSubmittedProvider(null);
    handleCloseForm();
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      interested_services: prev.interested_services.includes(service)
        ? prev.interested_services.filter((s) => s !== service)
        : [...prev.interested_services, service],
    }));
  };

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axiosInstance.post("/enquiries", formData);
      console.log("Enquiry submitted:", response.data);
      setShowEnquiryForm(false);

      // Use provider data from the response if available
      if (response.data.data && response.data.data.provider) {
        setSubmittedProvider({
          ...selectedProvider,
          ...response.data.data.provider
        } as Provider);
      } else {
        setSubmittedProvider(selectedProvider);
      }

      setShowThankYou(true);
    } catch (err) {
      console.error("Error submitting enquiry:", err);
      alert("Failed to submit enquiry. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <p className="text-center text-red-500 text-lg">{error}</p>
      </section>
    );
  }

  if (providers.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <p className="text-center text-gray-500 text-lg">No service providers available</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl text-center font-semibold mb-4">
          Service Providers
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Find the best professionals for your event
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              {/* Provider Image */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                {provider.image ? (
                  <img
                    src={`http://127.0.0.1:8000/uploads/providers/${provider.image}`}
                    alt={provider.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
                    <span className="text-4xl text-gray-300">👤</span>
                  </div>
                )}
              </div>

              {/* Provider Info */}
              <div className="p-6">
                {provider.albums && provider.albums.length > 0 && (
                  <p>
                    {provider.albums[0].name}
                  </p>
                )}

                {provider.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {provider.description}
                  </p>
                )}

                {/* Contact Info */}
                <div className="space-y-2 mb-4 text-sm text-gray-600">

                  {(provider.area || provider.city) && (
                    <p>
                      {/* <span className="font-semibold">📍 </span> */}
                      {provider.area}{provider.area && provider.city && ", "}
                      {provider.city}
                    </p>
                  )}
                </div>

                {/* Rating and Price */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  {provider.rating && Number(provider.rating) > 0 ? (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="font-semibold text-gray-800">
                        {Number(provider.rating).toFixed(1)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">No ratings yet</span>
                  )}
                  {provider.price && Number(provider.price) > 0 && (
                    <div className="text-indigo-600 font-semibold">
                      ₹{Number(provider.price)} {provider.price_type}
                    </div>
                  )}
                </div>

                {/* Send Enquiry Button */}
                <button

                  onClick={() => handleEnquiryClick(provider)}
                  className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Send Enquiry
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enquiry Form Modal */}
      {showEnquiryForm && selectedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Enquiry Form</h2>
                <p className="text-pink-100 text-sm">For: {selectedProvider.name}</p>
              </div>
              <button
                onClick={handleCloseForm}
                className="text-white hover:bg-pink-700 p-2 rounded-full transition"
              >
                ✕
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmitEnquiry} className="p-6 space-y-6">
              {/* Customer Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-800">Your Details</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customer_name}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.customer_email}
                      onChange={(e) =>
                        setFormData({ ...formData, customer_email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.customer_phone}
                      onChange={(e) =>
                        setFormData({ ...formData, customer_phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="10 digit number"
                    />
                  </div>
                </div>
              </div>

              {/* Wedding Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-800">Wedding Details</h3>

                {/* Wedding City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wedding City
                  </label>
                  <select
                    required
                    value={formData.wedding_city}
                    onChange={(e) =>
                      setFormData({ ...formData, wedding_city: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">Select a city</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Pune">Pune</option>
                    <option value="Jaipur">Jaipur</option>
                  </select>
                </div>

                {/* Wedding Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wedding Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.wedding_date}
                    onChange={(e) =>
                      setFormData({ ...formData, wedding_date: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    You can select up to 4 wedding dates
                  </p>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Your Budget
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: "upto_10000", label: "Upto ₹10,000" },
                      { value: "10000_20000", label: "₹10,000 - 20,000" },
                      { value: "20000_30000", label: "₹20,000 - 30,000" },
                      { value: "30000_40000", label: "₹30,000 - 40,000" },
                      { value: "above_40000", label: "Over ₹40,000" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="budget"
                          value={option.value}
                          checked={formData.budget === option.value}
                          onChange={(e) =>
                            setFormData({ ...formData, budget: e.target.value })
                          }
                          className="w-4 h-4 text-pink-600"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Interested Services */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Interested in Other Services?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Hair Makeup", "Bridal Makeup", "Guest Makeup"].map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        className={`px-4 py-2 rounded-full font-medium transition ${formData.interested_services.includes(service)
                          ? "bg-pink-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div> */}
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition"
                >
                  {submitting ? "Sending..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Thank You Modal */}
      {showThankYou && submittedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Logo Header */}
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <div className="text-pink-600 font-bold text-xl">
                💐 Kalayana Vaibhogam
              </div>
              <button
                onClick={handleCloseThankYou}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full transition"
              >
                ✕
              </button>
            </div>

            {/* Thank You Content */}
            <div className="p-8 space-y-6">
              {/* Thank You Heading */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  Thank you!
                </h2>
                <p className="text-gray-600">
                  Thank you for your interest in <span className="font-semibold">{submittedProvider.name}</span>.
                  Our team will contact you shortly to share this vendor's details.
                </p>
              </div>

              {/* Provider Card */}
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
                <p className="text-center text-gray-700 mb-4">
                  <span className="text-sm text-gray-500">To get the best price for</span>
                </p>
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                  {submittedProvider.name}
                </h3>
                <button className="w-full text-pink-600 font-semibold hover:text-pink-700 transition flex items-center justify-center gap-2 mb-6">
                  Talk to our expert <span>→</span>
                </button>

                {/* Contact Information */}
                {submittedProvider.contact && (
                  <div className="bg-white border border-pink-100 rounded-lg p-4 space-y-4">
                    <div className="text-center">
                      <p className="text-gray-700 font-semibold text-sm mb-4">
                        {submittedProvider.name} : {submittedProvider.name}
                      </p>
                    </div>
                    <div className="flex gap-4 items-center justify-center">
                      {/* Phone Contact */}
                      <a
                        href={`tel:${submittedProvider.contact}`}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-pink-300 text-pink-600 font-semibold rounded-lg hover:bg-pink-50 transition"
                      >
                        <span>📞</span>
                        {submittedProvider.contact}
                      </a>

                      {/* WhatsApp Contact */}
                      <a
                        href={`https://wa.me/${submittedProvider.contact.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-green-300 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition"
                      >
                        <span>💬</span>
                        Contact on WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions Section */}
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-4">
                  Few more suggestions for {providers[0]?.description?.split(' ').slice(0, 2).join(' ') || 'Services'}
                </h3>

                <div className="grid grid-cols-3 gap-4">
                  {providers
                    .filter((p) => p.id !== submittedProvider.id)
                    .slice(0, 3)
                    .map((provider) => (
                      <div
                        key={provider.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
                      >
                        {/* Image */}
                        <div className="h-32 bg-gray-200 overflow-hidden">
                          {provider.image ? (
                            <img
                              src={`http://127.0.0.1:8000/uploads/providers/${provider.image}`}
                              alt={provider.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
                              <span className="text-3xl text-gray-300">👤</span>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="p-4">
                          {provider.rating && Number(provider.rating) > 0 && (
                            <div className="flex items-center gap-1 mb-2">
                              <span className="text-yellow-400">⭐</span>
                              <span className="text-sm font-semibold text-gray-800">
                                {Number(provider.rating).toFixed(1)}
                              </span>
                              <span className="text-xs text-gray-500">
                                {provider.reviews_count || 0} Reviews
                              </span>
                            </div>
                          )}

                          <h4 className="font-semibold text-gray-800 mb-1 truncate">
                            {provider.name}
                          </h4>
                          <p className="text-xs text-gray-600 mb-3">Chennai</p>

                          <div className="flex items-center justify-between">
                            {provider.price && Number(provider.price) > 0 && (
                              <span className="font-semibold text-gray-800">
                                ₹{Number(provider.price).toLocaleString()}
                              </span>
                            )}
                            <input
                              type="checkbox"
                              className="w-5 h-5 border-gray-300 rounded cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-4 border-t">
                <button
                  onClick={handleCloseThankYou}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-lg transition"
                >
                  Back to Providers
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceProvider;