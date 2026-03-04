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
  });

  useEffect(() => {
    axiosInstance
      .get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // 🔥 REGISTER FUNCTION (DB STORE)
  const handleRegister = async () => {
    try {
      setLoading(true);

      const payload = {
        service_id: Number(formData.service_id),
        city: formData.city,
        area: formData.area,
        price: formData.price,
        price_type: formData.price_type,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        contact: formData.contact,
        role: "vendor",
        album_name: formData.album_name,
        portfolio_count: photos.length,
      };

      await axiosInstance.post("/", payload);

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

        {/* STEP 7 */}
        {step === 7 && (
          <>
            <h2 className="text-xl font-bold mb-4 text-green-600">
              🎉 Congratulations!
            </h2>
            <p className="mb-4">Click below to complete registration.</p>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg"
            >
              {loading ? "Saving..." : "Next"}
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default RegisterProvider;