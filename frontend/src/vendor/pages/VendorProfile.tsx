const VendorProfile = () => {
  const vendor = JSON.parse(localStorage.getItem("vendorData") || "{}");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Profile
      </h2>

      <div className="bg-white p-6 rounded shadow space-y-2">
        <p><strong>Name:</strong> {vendor?.name}</p>
        <p><strong>Email:</strong> {vendor?.email}</p>
        <p><strong>Phone:</strong> {vendor?.phone}</p>
      </div>
    </div>
  );
};

export default VendorProfile;