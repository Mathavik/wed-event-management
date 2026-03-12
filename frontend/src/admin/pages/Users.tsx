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
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600&family=Nunito:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .admin-root {
    min-height: 100vh;
    background: #fff5f7;
    font-family: 'Nunito', sans-serif;
    color: #3d2030;
    padding: 48px 56px;
    position: relative;
    overflow-x: hidden;
  }

  .admin-root::before {
    content: '';
    position: fixed;
    top: -180px;
    right: -180px;
    width: 560px;
    height: 560px;
    background: radial-gradient(circle, rgba(255,182,205,0.35) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .admin-root::after {
    content: '';
    position: fixed;
    bottom: -180px;
    left: -100px;
    width: 480px;
    height: 480px;
    background: radial-gradient(circle, rgba(255,209,220,0.28) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .petal-bg {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .petal-bg::before {
    content: '';
    position: absolute;
    top: 10%;
    left: 5%;
    width: 300px;
    height: 300px;
    background: radial-gradient(ellipse, rgba(255,160,190,0.12) 0%, transparent 65%);
    border-radius: 50%;
  }

  .petal-bg::after {
    content: '';
    position: absolute;
    bottom: 20%;
    right: 8%;
    width: 250px;
    height: 250px;
    background: radial-gradient(ellipse, rgba(255,192,210,0.15) 0%, transparent 65%);
    border-radius: 50%;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 52px;
    padding-bottom: 28px;
    border-bottom: 1.5px solid rgba(220,100,130,0.18);
    gap: 28px;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  .header-logo {
    width: 52px;
    height: 52px;
    background: linear-gradient(135deg, #ff80a0 0%, #ff4d79 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    box-shadow: 0 4px 20px rgba(255,77,121,0.3);
  }

  .page-title {
    font-family: 'Playfair Display', serif;
    font-size: 44px;
    font-weight: 400;
    letter-spacing: -0.5px;
    color: #2a1020;
    line-height: 1;
  }

  .page-title span {
    color: #e8426e;
  }

  .page-subtitle {
    font-size: 12px;
    color: #c490a0;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    margin-top: 6px;
    font-weight: 500;
  }

  .stats-row {
    display: flex;
    gap: 24px;
    justify-content: center;
  }

  .stat-chip {
    background: #ffffff;
    border: 1.5px solid rgba(220,100,140,0.18);
    border-radius: 16px;
    padding: 18px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 12px rgba(220,100,140,0.08);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    min-width: 140px;
  }

  .stat-chip:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(220,100,140,0.14);
  }

  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 500;
    color: #e8426e;
    line-height: 1;
  }

  .stat-label {
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #c490a0;
    margin-top: 3px;
    font-weight: 600;
  }

  /* ─── SECTION ─── */
  .section {
    margin-bottom: 44px;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 16px;
  }

  .section-icon {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    flex-shrink: 0;
  }

  .icon-admin {
    background: linear-gradient(135deg, #ffe0ea, #ffc8d8);
    box-shadow: 0 2px 10px rgba(255,100,140,0.2);
  }

  .icon-couple {
    background: linear-gradient(135deg, #ffd6e8, #ffb8d0);
    box-shadow: 0 2px 10px rgba(255,80,130,0.2);
  }

  .icon-vendor {
    background: linear-gradient(135deg, #ffe8f0, #ffd0e4);
    box-shadow: 0 2px 10px rgba(255,100,150,0.15);
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 400;
    color: #2a1020;
    letter-spacing: 0.2px;
  }

  .section-count {
    margin-left: auto;
    background: #fff0f4;
    border: 1.5px solid rgba(220,100,140,0.2);
    border-radius: 20px;
    padding: 4px 16px;
    font-size: 12px;
    color: #c490a0;
    letter-spacing: 1px;
    font-weight: 600;
  }

  /* ─── TABLE ─── */
  .table-card {
    background: #ffffff;
    border: 1.5px solid rgba(220,100,140,0.14);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(220,100,140,0.08);
  }

  .table-wrap {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    background: linear-gradient(90deg, #fff0f4, #ffe8f0);
    border-bottom: 1.5px solid rgba(220,100,140,0.15);
  }

  th {
    padding: 14px 22px;
    text-align: left;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #d45a7a;
  }

  tbody tr {
    border-bottom: 1px solid rgba(220,100,140,0.07);
    transition: background 0.15s ease;
  }

  tbody tr:last-child { border-bottom: none; }

  tbody tr:hover {
    background: #fff5f8;
  }

  td {
    padding: 16px 22px;
    font-size: 14px;
    color: #6a3a4a;
  }

  .td-name {
    font-weight: 600;
    color: #2a1020;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    flex-shrink: 0;
    letter-spacing: 0.5px;
  }

  .avatar-admin {
    background: linear-gradient(135deg, #ffb8ce, #ff80aa);
    color: #fff;
    box-shadow: 0 2px 8px rgba(255,100,150,0.3);
  }

  .avatar-couple {
    background: linear-gradient(135deg, #ffd0e4, #ff99bb);
    color: #fff;
    box-shadow: 0 2px 8px rgba(255,100,150,0.25);
  }

  .avatar-vendor {
    background: linear-gradient(135deg, #ffe0ec, #ffaac8);
    color: #fff;
    box-shadow: 0 2px 8px rgba(255,120,160,0.25);
  }

  .td-email {
    color: #b07888;
    font-size: 13px;
  }

  .badge-role {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: capitalize;
  }

  .badge-admin {
    background: #fff0f4;
    color: #e8426e;
    border: 1.5px solid rgba(232,66,110,0.25);
  }

  .badge-bride, .badge-groom {
    background: #fff5f8;
    color: #d45882;
    border: 1.5px solid rgba(212,88,130,0.22);
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
    color: #b07888;
    font-size: 13px;
  }

  .td-city::before {
    content: '◎';
    font-size: 10px;
    color: #e8b0c0;
  }

  .empty-row td {
    text-align: center;
    padding: 40px;
    color: #d4a0b0;
    font-style: italic;
    font-size: 14px;
  }

  /* ─── DIVIDER ─── */
  .section-divider {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 52px 0 44px;
  }

  .divider-line {
    flex: 1;
    height: 1.5px;
    background: linear-gradient(90deg, transparent, rgba(220,100,140,0.3), transparent);
  }

  .divider-label {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 400;
    color: #e8426e;
    letter-spacing: 1px;
    white-space: nowrap;
  }

  .divider-rose {
    font-size: 18px;
    color: #ffb0c8;
  }

  /* ─── SERVICE BUTTONS ─── */
  .services-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 22px;
  }

  .service-btn {
    background: #ffffff;
    border: 1.5px solid rgba(220,100,140,0.2);
    border-radius: 12px;
    padding: 10px 22px;
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #c490a0;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 0.3px;
    box-shadow: 0 2px 8px rgba(220,100,140,0.06);
  }

  .service-btn:hover {
    background: #fff0f4;
    border-color: rgba(232,66,110,0.35);
    color: #e8426e;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(220,100,140,0.15);
  }

  .service-btn.active {
    background: linear-gradient(135deg, #ff80a0, #e8426e);
    border-color: transparent;
    color: #fff;
    box-shadow: 0 4px 18px rgba(232,66,110,0.35);
    transform: translateY(-1px);
  }

  /* ─── LOADING ─── */
  .loading-screen {
    min-height: 100vh;
    background: #fff5f7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    font-family: 'Nunito', sans-serif;
  }

  .loading-ring {
    width: 50px;
    height: 50px;
    border: 2.5px solid rgba(220,100,140,0.2);
    border-top-color: #e8426e;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .loading-text {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    color: #d4a0b0;
    letter-spacing: 3px;
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
    opacity: 0.4;
  }

  .vendor-empty-text {
    color: #d4a0b0;
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
                    <td>{user.phone || <span style={{ color: "#e8c0cc" }}>—</span>}</td>
                    <td>
                      <span className={`badge-role badge-${user.role}`}>
                        <span className="badge-dot" />
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <div className="td-city">
                        {user.city || <span style={{ color: "#e8c0cc" }}>—</span>}
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
        <div className="petal-bg" />
        <div className="content-wrapper">

          {/* HEADER */}
          <div className="page-header">
            
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
            <span className="divider-rose">🌹</span>
            <div className="divider-label">Service Vendors</div>
            <span className="divider-rose">🌹</span>
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
              <div className="section-icon icon-vendor">⬡</div>
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
                            <div className="vendor-empty-icon">🌸</div>
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
                          <td>{vendor.contact || <span style={{ color: "#e8c0cc" }}>—</span>}</td>
                          <td>
                            <div className="td-city">
                              {vendor.city || <span style={{ color: "#e8c0cc" }}>—</span>}
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