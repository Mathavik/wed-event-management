const VendorHeader = () => {
  const vendor = JSON.parse(localStorage.getItem("vendorData") || "{}");

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">
        Welcome, {vendor?.name}
      </h1>

      <div className="text-sm text-gray-600">
        {vendor?.email}
      </div>
    </div>
  );
};

export default VendorHeader;