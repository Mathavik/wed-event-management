import React, { useEffect, useState } from "react";
import axios from "axios";

// User Type Definition
type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  city?: string;
  created_at?: string;
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Nunito:wght@300;400;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .admin-body {
    min-height: 100vh;
    background: #fdf8f9;
    font-family: 'Nunito', sans-serif;
    color: #3d2030;
    padding: 40px;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Header Section */
  .header-box {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .title-area h1 {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    color: #2a1020;
  }

  .title-area p {
    color: #c490a0;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* Stats Row */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .stat-card {
    background: white;
    padding: 20px;
    border-radius: 15px;
    border: 1px solid #fee2e9;
    box-shadow: 0 4px 10px rgba(0,0,0,0.02);
  }

  .stat-val {
    font-size: 24px;
    font-weight: 700;
    color: #e8426e;
  }

  .stat-lab {
    font-size: 12px;
    color: #8a6a7a;
  }

  /* Table Styling */
  .table-container {
    background: white;
    border-radius: 20px;
    border: 1px solid #fee2e9;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(232,66,110,0.05);
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    background: #fffafa;
    padding: 15px 20px;
    text-align: left;
    font-size: 12px;
    text-transform: uppercase;
    color: #d45a7a;
    border-bottom: 2px solid #fee2e9;
  }

  td {
    padding: 15px 20px;
    border-bottom: 1px solid #f9f0f2;
    font-size: 14px;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .user-avatar {
    width: 35px;
    height: 35px;
    background: #ffe0ea;
    color: #e8426e;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 12px;
  }

  .role-pill {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    text-transform: capitalize;
  }

  .role-admin { background: #fee2e9; color: #e8426e; }
  .role-bride { background: #f0f7ff; color: #007bff; }
  .role-groom { background: #f0fff4; color: #28a745; }
  .role-default { background: #eee; color: #666; }

  .loading { text-align: center; padding: 50px; font-style: italic; color: #e8426e; }
`;

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);


  // Unga useEffect block-a mattum intha maathiri update pannunga:

useEffect(() => {
  setLoading(true);
  axios.get("http://localhost:8000/api/admin/users")
    .then((res) => {
      const allData = res.data.data || res.data;
      
      // ADMIN-A FILTER PANNI REMOVE PANNUM LINE ITHU THAAN:
      const onlyUsers = allData.filter((u: User) => u.role !== "admin");
      
      setUsers(onlyUsers);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error:", err);
      setLoading(false);
    });
}, []);
 

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getRoleClass = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'role-admin';
      case 'bride': return 'role-bride';
      case 'groom': return 'role-groom';
      default: return 'role-default';
    }
  };

  if (loading) return (
    <div className="admin-body">
      <style>{styles}</style>
      <div className="loading">Fetching users list...</div>
    </div>
  );

  return (
    <div className="admin-body">
      <style>{styles}</style>
      <div className="container">
        
        {/* HEADER */}
        <header className="header-box">
          <div className="title-area">
            <h1>Registered Users</h1>
          </div>
        </header>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-val">{users.length}</div>
            <div className="stat-lab">Total Registered</div>
          </div>
          <div className="stat-card">
            <div className="stat-val">
              {users.filter(u => u.role === 'admin').length}
            </div>
            <div className="stat-lab">Administrators</div>
          </div>
          <div className="stat-card">
            <div className="stat-val">
              {users.filter(u => u.role !== 'admin').length}
            </div>
            <div className="stat-lab">Customers / Couples</div>
          </div>
        </div>

        {/* USERS TABLE */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User Details</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">{getInitials(user.name)}</div>
                        <span style={{fontWeight: 600}}>{user.name}</span>
                      </div>
                    </td>
                    <td style={{color: '#8a6a7a'}}>{user.email}</td>
                    <td>{user.phone || "—"}</td>
                    <td>
                      <span className={`role-pill ${getRoleClass(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.city || "Not Specified"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{textAlign: 'center', padding: '40px'}}>
                    No users found in the database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}