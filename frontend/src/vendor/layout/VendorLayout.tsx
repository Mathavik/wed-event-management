import { Outlet } from "react-router-dom";
import VendorSidebar from "./VendorSidebar";
import VendorHeader from "./VendorHeader";

const VendorLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <VendorSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <VendorHeader />

        <div className="p-6">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default VendorLayout;