import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

interface Service {
  id: number;
  title: string;
}

const RegisterProvider: React.FC = () => {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [subscriptionDuration, setSubscriptionDuration] = useState<6|12>(6);
  const [transactionId, setTransactionId] = useState("");

  // profile picture state
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string>("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    service_id: "",
    city: "",
    area: "",
    price: "",
    price_type: "",
    album_name: "",
    name: "",
    email: "",
    password: "",
    contact: "",
    description: "",
    experience: "",
  });

  useEffect(() => {
    axiosInstance
      .get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setPhotos(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  // profile picture handler
  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setProfileImage(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

// convert file objects to base64 strings for submission
  const encodeFiles = (files: File[]) => {
    const readers = files.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    );
    return Promise.all(readers);
  };

  // 🔥 REGISTER FUNCTION (DB STORE)
  const handleRegister = async () => {
    try {
      if (!transactionId) {
        alert("Please enter a valid transaction ID");
        return;
      }
      setLoading(true);

      const encodedPhotos = await encodeFiles(photos);
      let profileImageBase64 = "";
      if (profileImage) {
        const encoded = await encodeFiles([profileImage]);
        profileImageBase64 = encoded[0];
      }

      // build service_pricing so backend can save JSON
      const servicePricing = [];
      if (formData.service_id) {
        servicePricing.push({
          service_id: Number(formData.service_id),
          price: formData.price ? Number(formData.price) : null,
        });
      }

      const payload = {
        service_id: Number(formData.service_id),
        city: formData.city,
        area: formData.area,
        // keep fields for backwards-compatibility; controller will null them out
        price: formData.price,
        price_type: formData.price_type,
        service_pricing: servicePricing,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        contact: formData.contact,
        description: formData.description,
        experience: formData.experience,
        role: "vendor",
        // profile image will be base64 encoded if available
        image: profileImageBase64,
        albums: [
          {
            name: formData.album_name,
            photos: encodedPhotos,
          },
        ],
        portfolio_count: photos.length,
        subscription_duration: subscriptionDuration,
        payment: {
          status: "completed",
          transaction_id: transactionId,
        },
      };

      await axiosInstance.post("/providers", payload);

      alert("Registration Successful ✅");

      navigate("/payment");

    } catch (error: any) {
      console.error(error);
      alert(
        error?.response?.data?.message || "Registration Failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">Select Service</h2>
            <select
              name="service_id"
              value={formData.service_id}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>
            <button onClick={nextStep} className="mt-4 w-full bg-pink-600 text-white py-2 rounded-lg">
              Next
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-4">Enter Your Location</h2>
            <input name="city" placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
            />
            <input name="area" placeholder="Area"
              value={formData.area}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
            />
            <button onClick={prevStep} className="mr-2 bg-gray-400 text-white px-4 py-2 rounded">
              Back
            </button>
            <button onClick={nextStep} className="bg-pink-600 text-white px-4 py-2 rounded">
              Next
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-bold mb-4">Service & Pricing</h2>
            <input name="price" placeholder="Enter Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
            />
            <select name="price_type"
              value={formData.price_type}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
            >
              <option value="">Select Price Type</option>
              <option value="per_hour">Per Hour</option>
              <option value="per_day">Per Day</option>
              <option value="per_event">Per Event</option>
            </select>
            <button onClick={prevStep} className="mr-2 bg-gray-400 text-white px-4 py-2 rounded">
              Back
            </button>
            <button onClick={nextStep} className="bg-pink-600 text-white px-4 py-2 rounded">
              Next
            </button>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <h2 className="text-xl font-bold mb-4">Enter Your Details</h2>

            <input name="name" placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
            />

            <input type="email" name="email" placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
            />

            <input type="password" name="password" placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
            />

            <input name="contact" placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
            />

            <textarea name="description" placeholder="Short description about yourself"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
            />

            <input name="experience" placeholder="Experience (years or details)"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
            />

            <div className="mb-3">
              <label className="block mb-1">Profile Image</label>
              <input type="file" accept="image/*" onChange={handleProfileImageUpload} />
              {profilePreview && (
                <img src={profilePreview} alt="Profile preview" className="mt-2 w-24 h-24 object-cover rounded-full" />
              )}
            </div>

            <button onClick={prevStep} className="mr-2 bg-gray-400 text-white px-4 py-2 rounded">
              Back
            </button>
            <button onClick={nextStep} className="bg-pink-600 text-white px-4 py-2 rounded">
              Next
            </button>
          </>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <>
            <h2 className="text-xl font-bold mb-4">Add Album</h2>

            <input name="album_name" placeholder="Album Name"
              value={formData.album_name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
            />

            <input type="file" multiple onChange={handlePhotoUpload} className="mb-3" />

            <button onClick={prevStep} className="mr-2 bg-gray-400 text-white px-4 py-2 rounded">
              Back
            </button>
            <button onClick={nextStep} className="bg-pink-600 text-white px-4 py-2 rounded">
              Next
            </button>
          </>
        )}

        {/* STEP 6 */}
        {step === 6 && (
          <>
            <h2 className="text-xl font-bold mb-4">Preview Photos</h2>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {previewUrls.map((url, index) => (
                <img key={index} src={url} className="h-20 w-full object-cover rounded" />
              ))}
            </div>

            <button onClick={prevStep} className="mr-2 bg-gray-400 text-white px-4 py-2 rounded">
              Back
            </button>
            <button onClick={nextStep} className="bg-pink-600 text-white px-4 py-2 rounded">
              Next
            </button>
          </>
        )}

        {/* STEP 7 - subscription/payment */}
        {step === 7 && (
          <>
            <h2 className="text-xl font-bold mb-4">Choose Package</h2>
            <div className="mb-4">
              <label className="mr-4">
                <input
                  type="radio"
                  value={6}
                  checked={subscriptionDuration === 6}
                  onChange={() => setSubscriptionDuration(6 as 6|12)}
                />{' '}
                6 Months (₹20,000)
              </label>
              <label>
                <input
                  type="radio"
                  value={12}
                  checked={subscriptionDuration === 12}
                  onChange={() => setSubscriptionDuration(12 as 6|12)}
                />{' '}
                12 Months (₹35,000)
              </label>
            </div>
            <input
              name="transaction_id"
              placeholder="Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full p-2 border rounded-lg mb-3"
            />

            <button onClick={prevStep} className="mr-2 bg-gray-400 text-white px-4 py-2 rounded">
              Back
            </button>
            <button onClick={nextStep} className="bg-pink-600 text-white px-4 py-2 rounded">
              Next
            </button>
          </>
        )}

        {/* STEP 8 */}
        {step === 8 && (
          <>
            <h2 className="text-xl font-bold mb-4 text-green-600">
              🎉 Congratulations!
            </h2>
            <p className="mb-4">Click below to complete registration and proceed to payment.</p>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg"
            >
              {loading ? "Saving..." : "Register"}
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default RegisterProvider;