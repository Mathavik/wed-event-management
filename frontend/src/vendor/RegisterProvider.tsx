import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

interface Service {
  id: number;
  title: string;
  image?: string;
  image_url?: string;
}

interface SelectedService {
  service_id: number;
  price: number;
}

const RegisterProvider: React.FC = () => {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
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
    city: "",
    area: "",
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
      if (selectedServices.length === 0) {
        alert("Please select at least one service");
        return;
      }
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

      const payload = {
        service_pricing: selectedServices,
        city: formData.city,
        area: formData.area,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        contact: formData.contact,
        description: formData.description,
        experience: formData.experience,
        role: "vendor",
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

      navigate("/vendor/dashboard");

    } catch (error: any) {
      console.error(error);
      alert(
        error?.response?.data?.message || "Registration Failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleService = (serviceId: number) => {
    const existing = selectedServices.find(s => s.service_id === serviceId);
    if (existing) {
      setSelectedServices(selectedServices.filter(s => s.service_id !== serviceId));
    } else {
setSelectedServices([...selectedServices, { service_id: serviceId, price: 0 }]);    }
  };

 const updateServicePrice = (serviceId: number, price: number) => {
  setSelectedServices(selectedServices.map(s => 
    s.service_id === serviceId ? { ...s, price } : s
  ));
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-900 mb-2">Vendor Registration</h1>
          <p className="text-gray-600">Join our wedding community</p>
          <div className="flex justify-center gap-2 mt-4">
            {[1, 2, 3, 4, 5, 6, 7].map((s) => (
              <div key={s} className={`h-2 w-8 rounded-full ${step >= s ? 'bg-pink-600' : 'bg-gray-300'}`}></div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* STEP 1 - Services with Images */}
         {step === 1 && (
<>
<h2 className="text-2xl font-bold mb-2 text-purple-900">
Select Services
</h2>

<p className="text-gray-600 mb-6">
Choose at least one service you provide
</p>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

{services.map((service) => {

const isSelected = selectedServices.some(
(s) => s.service_id === service.id
);

return (

<div
key={service.id}
className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
isSelected
? "border-pink-600 shadow-lg"
: "border-gray-200 hover:border-pink-300"
}`}
onClick={() => toggleService(service.id)}
>

{/* Service Image */}

{service.image_url ? (

<img
src={service.image_url}
alt={service.title}
className="w-full h-32 object-cover"
/>

) : (

<div className="w-full h-32 bg-gray-200 flex items-center justify-center">
<span className="text-gray-400">No image</span>
</div>

)}

{/* Title */}

<div className="p-4">
<div className="flex items-center gap-3">

<input
type="checkbox"
checked={isSelected}
onChange={() => toggleService(service.id)}
className="w-5 h-5"
/>

<label className="font-semibold text-gray-800">
{service.title}
</label>

</div>
</div>

{/* PRICE INPUT */}

{isSelected && (

<div
className="bg-pink-50 p-3 border-t border-pink-200"
onClick={(e) => e.stopPropagation()}
>

<input
type="number"
placeholder="Enter price"
min="0"
step="100"
value={
selectedServices.find(
(s) => s.service_id === service.id
)?.price ?? ""
}
onChange={(e) => {

const newPrice =
e.target.value === ""
? 0
: Number(e.target.value);

updateServicePrice(service.id, newPrice);

}}
className="w-full p-2 border border-pink-300 rounded"
/>

</div>

)}

</div>

);

})}

</div>

{selectedServices.length === 0 && (

<div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg mb-6">
Please select at least one service
</div>

)}

<div className="flex gap-3">

<button
onClick={nextStep}
disabled={selectedServices.length === 0}
className="flex-1 bg-pink-600 disabled:bg-gray-300 text-white py-3 rounded-lg"
>

Next

</button>

</div>

</>
)}

          {/* STEP 2 - Location */}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold mb-2 text-purple-900">Your Location</h2>
              <p className="text-gray-600 mb-6">Where are you based?</p>
              
              <input name="city" placeholder="City" value={formData.city} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              />
              <input name="area" placeholder="Area/Region" value={formData.area} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mb-6"
              />

              <div className="flex gap-3">
                <button onClick={prevStep} className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400">
                  Back
                </button>
                <button onClick={nextStep} className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700">
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 3 - Profile Info */}
          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold mb-2 text-purple-900">Your Profile</h2>
              <p className="text-gray-600 mb-6">Tell us about yourself</p>
              
              <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              />
              <input name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              />
              <textarea name="description" placeholder="About yourself" value={formData.description} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 h-24"
              />
              <input name="experience" placeholder="Experience (e.g., 5 years)" value={formData.experience} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              />

              <div className="mb-6">
                <label className="block font-semibold text-gray-700 mb-2">Profile Picture</label>
                <input type="file" accept="image/*" onChange={handleProfileImageUpload} className="w-full mb-3" />
                {profilePreview && (
                  <img src={profilePreview} alt="Profile" className="w-20 h-20 object-cover rounded-full" />
                )}
              </div>

              <div className="flex gap-3">
                <button onClick={prevStep} className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400">
                  Back
                </button>
                <button onClick={nextStep} className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700">
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 4 - Portfolio */}
          {step === 4 && (
            <>
              <h2 className="text-2xl font-bold mb-2 text-purple-900">Your Portfolio</h2>
              <p className="text-gray-600 mb-6">Showcase your best work</p>
              
              <input name="album_name" placeholder="Album Name (e.g., Wedding 2023)" value={formData.album_name} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              />
              <label className="block font-semibold text-gray-700 mb-2">Upload Photos</label>
              <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="w-full mb-4" />
              <p className="text-sm text-gray-600 mb-6">{photos.length} photos selected</p>

              <div className="flex gap-3">
                <button onClick={prevStep} className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400">
                  Back
                </button>
                <button onClick={nextStep} className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700">
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 5 - Preview */}
          {step === 5 && (
            <>
              <h2 className="text-2xl font-bold mb-2 text-purple-900">Preview</h2>
              <p className="text-gray-600 mb-6">Your portfolio photos</p>
              
              {previewUrls.length > 0 ? (
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {previewUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Preview ${index}`} className="h-24 w-full object-cover rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-100 p-8 rounded-lg text-center text-gray-600 mb-6">
                  No photos to preview
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={prevStep} className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400">
                  Back
                </button>
                <button onClick={nextStep} className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700">
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 6 - Choose Package */}
          {step === 6 && (
            <>
              <h2 className="text-2xl font-bold mb-2 text-purple-900">Choose Your Plan</h2>
              <p className="text-gray-600 mb-6">Select a subscription package</p>
              
              <div className="space-y-4 mb-6">
                <label className={`relative block border-2 rounded-lg p-4 cursor-pointer transition ${
                  subscriptionDuration === 6 ? 'border-pink-600 bg-pink-50' : 'border-gray-200 hover:border-pink-300'
                }`}>
                  <input type="radio" value={6} checked={subscriptionDuration === 6}
                    onChange={() => setSubscriptionDuration(6 as 6|12)} className="absolute left-4 top-4"
                  />
                  <div className="ml-8">
                    <div className="font-semibold text-gray-900">6 Months Plan</div>
                    <div className="text-2xl font-bold text-pink-600">₹20,000</div>
                    <div className="text-sm text-gray-600">Save with annual billing</div>
                  </div>
                </label>

                <label className={`relative block border-2 rounded-lg p-4 cursor-pointer transition ${
                  subscriptionDuration === 12 ? 'border-pink-600 bg-pink-50' : 'border-gray-200 hover:border-pink-300'
                }`}>
                  <input type="radio" value={12} checked={subscriptionDuration === 12}
                    onChange={() => setSubscriptionDuration(12 as 6|12)} className="absolute left-4 top-4"
                  />
                  <div className="ml-8">
                    <div className="font-semibold text-gray-900">12 Months Plan</div>
                    <div className="text-2xl font-bold text-pink-600">₹35,000</div>
                    <div className="text-sm text-gray-600">Best value</div>
                  </div>
                </label>
              </div>

              <input type="text" placeholder="Transaction ID (from payment)" value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-6"
              />

              <div className="flex gap-3">
                <button onClick={prevStep} className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400">
                  Back
                </button>
                <button onClick={nextStep} className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700">
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 7 - Success */}
          {step === 7 && (
            <>
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">Registration Successful!</h2>
                <p className="text-gray-600 mb-8">Your vendor profile has been created. Complete payment to activate your account.</p>
                
                <button onClick={handleRegister} disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold mb-3"
                >
                  {loading ? "Processing..." : "Confirm & Activate"}
                </button>
                <button onClick={prevStep} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold">
                  Back
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default RegisterProvider;