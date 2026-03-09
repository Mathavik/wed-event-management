import React, { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  city?: string;
};

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
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .admin-root {
    min-height: 100vh;
    background: #0a0a0f;
    font-family: 'DM Sans', sans-serif;
    color: #e8e4dc;
    padding: 48px 56px;
    position: relative;
    overflow-x: hidden;
  }

  .admin-root::before {
    content: '';
    position: fixed;
    top: -200px;
    right: -200px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(184,145,100,0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .admin-root::after {
    content: '';
    position: fixed;
    bottom: -200px;
    left: -100px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(120,100,180,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .content-wrapper {
    position: relative;
    z-index: 1;
    max-width: 1300px;
    margin: 0 auto;
  }

  /* ─── HEADER ─── */
  .page-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 56px;
    padding-bottom: 32px;
    border-bottom: 1px solid rgba(184,145,100,0.2);
  }

  .page-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px;
    font-weight: 300;
    letter-spacing: -0.5px;
    color: #f0ebe0;
    line-height: 1;
  }

  .page-title span {
    color: #b89164;
  }

  .page-subtitle {
    font-size: 13px;
    color: #6b6560;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 8px;
  }

  .stats-row {
    display: flex;
    gap: 24px;
  }

  .stat-chip {
    background: rgba(184,145,100,0.08);
    border: 1px solid rgba(184,145,100,0.15);
    border-radius: 40px;
    padding: 8px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 500;
    color: #b89164;
    line-height: 1;
  }

  .stat-label {
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #5a5550;
    margin-top: 2px;
  }

  /* ─── SECTION ─── */
  .section {
    margin-bottom: 48px;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }

  .section-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .icon-admin { background: rgba(100,130,220,0.15); }
  .icon-couple { background: rgba(220,100,130,0.15); }
  .icon-vendor { background: rgba(100,200,160,0.15); }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 400;
    color: #ddd8cc;
    letter-spacing: 0.3px;
  }

  .section-count {
    margin-left: auto;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 4px 14px;
    font-size: 12px;
    color: #6b6560;
    letter-spacing: 1px;
  }

  /* ─── TABLE ─── */
  .table-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    overflow: hidden;
    backdrop-filter: blur(10px);
  }

  .table-wrap {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    background: rgba(184,145,100,0.06);
    border-bottom: 1px solid rgba(184,145,100,0.12);
  }

  th {
    padding: 14px 20px;
    text-align: left;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #b89164;
  }

  tbody tr {
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: background 0.15s ease;
  }

  tbody tr:last-child { border-bottom: none; }

  tbody tr:hover {
    background: rgba(184,145,100,0.04);
  }

  td {
    padding: 16px 20px;
    font-size: 14px;
    color: #c8c3bb;
  }

  .td-name {
    font-weight: 500;
    color: #e8e4dc;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    flex-shrink: 0;
    letter-spacing: 0.5px;
  }

  .avatar-admin {
    background: rgba(100,130,220,0.2);
    color: #8aa0e8;
  }

  .avatar-couple {
    background: rgba(220,100,130,0.2);
    color: #e88aa0;
  }

  .avatar-vendor {
    background: rgba(100,200,160,0.2);
    color: #80c8a8;
  }

  .td-email { color: #7a7570; font-size: 13px; }

  .badge-role {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: capitalize;
  }

  .badge-admin {
    background: rgba(100,130,220,0.12);
    color: #8aa0e8;
    border: 1px solid rgba(100,130,220,0.2);
  }

  .badge-bride, .badge-groom {
    background: rgba(220,100,130,0.12);
    color: #e88aa0;
    border: 1px solid rgba(220,100,130,0.2);
  }

  .badge-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
  }

  .td-city {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #5a5550;
    font-size: 13px;
  }

  .td-city::before {
    content: '◎';
    font-size: 10px;
    color: #3a3530;
  }

  .empty-row td {
    text-align: center;
    padding: 40px;
    color: #3a3530;
    font-style: italic;
    font-size: 14px;
  }

  /* ─── DIVIDER ─── */
  .section-divider {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 56px 0 48px;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,145,100,0.25), transparent);
  }

  .divider-label {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 400;
    color: #b89164;
    letter-spacing: 1px;
    white-space: nowrap;
  }

  /* ─── SERVICE BUTTONS ─── */
  .services-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }

  .service-btn {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 10px 22px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: #8a8580;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 0.3px;
  }

  .service-btn:hover {
    background: rgba(184,145,100,0.08);
    border-color: rgba(184,145,100,0.2);
    color: #c8a878;
  }

  .service-btn.active {
    background: rgba(184,145,100,0.12);
    border-color: rgba(184,145,100,0.35);
    color: #d4b888;
    box-shadow: 0 0 20px rgba(184,145,100,0.08);
  }

  /* ─── LOADING ─── */
  .loading-screen {
    min-height: 100vh;
    background: #0a0a0f;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    font-family: 'DM Sans', sans-serif;
  }

  .loading-ring {
    width: 48px;
    height: 48px;
    border: 2px solid rgba(184,145,100,0.15);
    border-top-color: #b89164;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .loading-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    color: #4a4540;
    letter-spacing: 2px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ─── VENDOR EMPTY STATE ─── */
  .vendor-empty {
    padding: 60px 20px;
    text-align: center;
  }

  .vendor-empty-icon {
    font-size: 36px;
    margin-bottom: 12px;
    opacity: 0.3;
  }

  .vendor-empty-text {
    color: #3a3530;
    font-size: 14px;
    letter-spacing: 0.5px;
  }
`;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);
  const [bridesGrooms, setBridesGrooms] = useState<User[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = axios.get("http://localhost:8000/api/admin/users");
    const fetchServices = axios.get("http://localhost:8000/api/services");

    Promise.all([fetchUsers, fetchServices])
      .then(([usersRes, servicesRes]) => {
        const usersData = usersRes.data.data || usersRes.data;
        setUsers(usersData);
        setAdmins(usersData.filter((u: User) => u.role === "admin"));
        setBridesGrooms(
          usersData.filter(
            (u: User) => u.role === "bride" || u.role === "groom"
          )
        );
        setServices(servicesRes.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const fetchVendors = (serviceId: number) => {
    setSelectedService(serviceId);
    axios
      .get(
        `http://localhost:8000/api/providers/services/${serviceId}/providers`
      )
      .then((res) => setVendors(res.data))
      .catch((err) => console.log(err));
  };

  if (loading)
    return (
      <>
        <style>{styles}</style>
        <div className="loading-screen">
          <div className="loading-ring" />
          <div className="loading-text">LOADING</div>
        </div>
      </>
    );

  const renderTable = (
    data: User[],
    title: string,
    iconClass: string,
    icon: string,
    avatarClass: string
  ) => (
    <div className="section">
      <div className="section-header">
        <div className={`section-icon ${iconClass}`}>{icon}</div>
        <div className="section-title">{title}</div>
        <div className="section-count">{data.length} records</div>
      </div>

      <div className="table-card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr className="empty-row">
                  <td colSpan={5}>No records found</td>
                </tr>
              ) : (
                data.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="td-name">
                        <div className={`avatar ${avatarClass}`}>
                          {getInitials(user.name)}
                        </div>
                        {user.name}
                      </div>
                    </td>
                    <td className="td-email">{user.email}</td>
                    <td>{user.phone || <span style={{ color: "#2a2520" }}>—</span>}</td>
                    <td>
                      <span
                        className={`badge-role badge-${user.role}`}
                      >
                        <span className="badge-dot" />
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <div className="td-city">
                        {user.city || <span style={{ color: "#2a2520" }}>—</span>}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="admin-root">
        <div className="content-wrapper">

          {/* HEADER */}
          <div className="page-header">
            <div>
              <div className="page-title">
                Admin <span>Dashboard</span>
              </div>
              <div className="page-subtitle">User & Vendor Management</div>
            </div>
            <div className="stats-row">
              <div className="stat-chip">
                <div className="stat-num">{users.length}</div>
                <div className="stat-label">Total Users</div>
              </div>
              <div className="stat-chip">
                <div className="stat-num">{admins.length}</div>
                <div className="stat-label">Admins</div>
              </div>
              <div className="stat-chip">
                <div className="stat-num">{bridesGrooms.length}</div>
                <div className="stat-label">Couples</div>
              </div>
            </div>
          </div>

          {/* USERS */}
          {renderTable(admins, "Administrators", "icon-admin", "⬡", "avatar-admin")}
          {renderTable(bridesGrooms, "Brides & Grooms", "icon-couple", "♡", "avatar-couple")}

          {/* DIVIDER */}
          <div className="section-divider">
            <div className="divider-line" />
            <div className="divider-label">Service Vendors</div>
            <div className="divider-line" />
          </div>

          {/* SERVICE BUTTONS */}
          <div className="services-row">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => fetchVendors(service.id)}
                className={`service-btn ${selectedService === service.id ? "active" : ""}`}
              >
                {service.title}
              </button>
            ))}
          </div>

          {/* VENDORS TABLE */}
          <div className="section">
            <div className="section-header">
              <div className={`section-icon icon-vendor`}>⬡</div>
              <div className="section-title">
                {selectedService
                  ? services.find((s) => s.id === selectedService)?.title + " Providers"
                  : "All Vendors"}
              </div>
              {vendors.length > 0 && (
                <div className="section-count">{vendors.length} vendors</div>
              )}
            </div>

            <div className="table-card">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>City</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.length === 0 ? (
                      <tr>
                        <td colSpan={4}>
                          <div className="vendor-empty">
                            <div className="vendor-empty-icon">◈</div>
                            <div className="vendor-empty-text">
                              Select a service above to view vendors
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      vendors.map((vendor) => (
                        <tr key={vendor.id}>
                          <td>
                            <div className="td-name">
                              <div className="avatar avatar-vendor">
                                {getInitials(vendor.name)}
                              </div>
                              {vendor.name}
                            </div>
                          </td>
                          <td className="td-email">{vendor.email}</td>
                          <td>{vendor.contact || <span style={{ color: "#2a2520" }}>—</span>}</td>
                          <td>
                            <div className="td-city">
                              {vendor.city || <span style={{ color: "#2a2520" }}>—</span>}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}