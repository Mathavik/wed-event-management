import React, { useEffect, useState } from "react";
import axios from "axios";

type Service = {
  id: number;
  title: string;
};

type Vendor = {
  id: number;
  name: string;
  email: string;
  contact?: string;
  city?: string;
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Nunito:wght@400;600;700&display=swap');

  .admin-root { min-height: 100vh; background: #fff5f7; font-family: 'Nunito', sans-serif; padding: 40px; color: #3d2030; }
  
  /* Header Section */
  .page-header { margin-bottom: 40px; border-bottom: 2px solid rgba(232,66,110,0.1); padding-bottom: 20px; }
  .page-header h1 { font-family: 'Playfair Display', serif; font-size: 32px; color: #2a1020; margin: 0; }
  .page-header p { color: #8a6a7a; margin-top: 8px; font-size: 15px; }

  /* Stats Card for Vendors */
  .vendor-stats { background: white; padding: 25px; border-radius: 15px; border: 1px solid #fee2e9; display: inline-flex; align-items: center; gap: 20px; margin-bottom: 40px; box-shadow: 0 4px 15px rgba(232,66,110,0.05); }
  .stat-icon { background: #ffe0ea; width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #e8426e; font-size: 20px; }
  .stat-info { display: flex; flex-direction: column; }
  .stat-count { font-size: 24px; font-weight: 700; color: #e8426e; }
  .stat-text { font-size: 12px; color: #8a6a7a; text-transform: uppercase; letter-spacing: 1px; }

  /* Service Tabs - Category Selection */
  .filter-section { margin-bottom: 30px; }
  .filter-label { font-weight: 700; font-size: 14px; color: #2a1020; margin-bottom: 15px; display: block; }
  .service-tabs { display: flex; gap: 12px; flex-wrap: wrap; background: white; padding: 20px; border-radius: 15px; border: 1px solid #fee2e9; }
  .tab-btn { padding: 10px 20px; border-radius: 10px; border: 1.5px solid #fee2e9; background: white; cursor: pointer; font-size: 13px; font-weight: 600; color: #8a6a7a; transition: all 0.3s ease; }
  .tab-btn:hover { border-color: #e8426e; color: #e8426e; }
  .tab-btn.active { background: #e8426e; color: white; border-color: #e8426e; box-shadow: 0 4px 12px rgba(232,66,110,0.25); }

  /* Table Card Styling */
  .table-card { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(232,66,110,0.08); border: 1px solid #fee2e9; }
  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  th { background: #fff0f4; padding: 18px 25px; text-align: left; font-size: 12px; text-transform: uppercase; color: #d45a7a; font-weight: 700; border-bottom: 2px solid #fee2e9; letter-spacing: 0.5px; }
  td { padding: 18px 25px; border-bottom: 1px solid #f9f0f2; font-size: 14px; vertical-align: middle; word-wrap: break-word; color: #4a2a3a; }
  tr:last-child td { border-bottom: none; }
  tr:hover { background: #fffafa; }

  /* Vendor Specific Components */
  .vendor-name-cell { color: #e8426e; font-weight: 700; font-size: 15px; }
  .contact-text { font-family: 'Nunito', sans-serif; color: #6a3a4a; font-weight: 600; }
  .location-badge { background: #f0f7ff; color: #007bff; padding: 5px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; border: 1px solid #e0eeff; }
  
  .loading-container { text-align: center; padding: 100px; color: #e8426e; }
  .empty-state { text-align: center; padding: 60px; color: #c490a0; font-style: italic; }
`;

export default function AdminVendor() {
  const [services, setServices] = useState<Service[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8000/api/services")
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setLoading(false);
      });
  }, []);

  const handleFetchVendors = (id: number) => {
    setSelectedServiceId(id);
    axios.get(`http://localhost:8000/api/providers/services/${id}/providers`)
      .then((res) => setVendors(res.data))
      .catch((err) => console.error("Error fetching vendors:", err));
  };

  if (loading) return (
    <div className="admin-root">
      <style>{styles}</style>
      <div className="loading-container">
        <h2>Loading Service Categories...</h2>
      </div>
    </div>
  );

  return (
    <div className="admin-root">
      <style>{styles}</style>
      
      {/* 1. Page Header */}
      <div className="page-header">
        <h1>Vendor Management</h1>
        <p>View and manage all service providers by their specialty.</p>
      </div>

      {/* 2. Simple Stat Card */}
      <div className="vendor-stats">
        <div className="stat-icon">🏢</div>
        <div className="stat-info">
          <span className="stat-count">{services.length}</span>
          <span className="stat-text">Active Categories</span>
        </div>
      </div>

      {/* 3. Category Filter Section */}
      <div className="filter-section">
        <span className="filter-label">Select Service Category:</span>
        <div className="service-tabs">
          {services.map((s) => (
            <button 
              key={s.id} 
              className={`tab-btn ${selectedServiceId === s.id ? 'active' : ''}`}
              onClick={() => handleFetchVendors(s.id)}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Vendors Table */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Vendor Details</th>
              <th style={{ width: '30%' }}>Email Address</th>
              <th style={{ width: '25%' }}>Contact Number</th>
              <th style={{ width: '20%' }}>Location</th>
            </tr>
          </thead>
          <tbody>
            {vendors.length > 0 ? (
              vendors.map((v) => (
                <tr key={v.id}>
                  <td className="vendor-name-cell">{v.name}</td>
                  <td>{v.email}</td>
                  <td className="contact-text">{v.contact || "N/A"}</td>
                  <td>
                    {v.city ? <span className="location-badge">{v.city}</span> : "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="empty-state">
                  {selectedServiceId 
                    ? "No registered vendors found for this category." 
                    : "Choose a service category above to display vendors."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}