import { useEffect, useState } from "react";
import axios from "axios";

interface Vendor {
  id?: number;
  name?: string;
  email?: string;
  contact?: string;
  city?: string;
  area?: string;
  experience?: string;
  image?: string;
}

const BASE_URL = "http://127.0.0.1:8000";

const VendorProfile = () => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Vendor>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const userData = localStorage.getItem("vendor");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      axios
        .get(`${BASE_URL}/api/providers/providers/${parsedUser.id}`)
        .then((res) => { setVendor(res.data); setEditData(res.data); })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
  };

  const handleUpdate = async () => {
    if (!vendor?.id) return;
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(editData).forEach(([k, v]) => {
        if (v !== undefined && k !== "id" && k !== "image") formData.append(k, String(v));
      });
      if (imageFile) formData.append("image", imageFile);
      formData.append("_method", "PUT");
      const res = await axios.put(`${BASE_URL}/api/providers/providers/${vendor.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setVendor(res.data); setEditData(res.data);
      setIsEditing(false); setImageFile(null); setImagePreview(null);
      showToast("Profile updated successfully!");
    } catch { showToast("Update failed.", "error"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!vendor?.id) return;
    try {
      await axios.delete(`${BASE_URL}/api/providers/providers/${vendor.id}`);
      localStorage.removeItem("vendor");
      showToast("Account deleted.");
      setTimeout(() => (window.location.href = "/login"), 1500);
    } catch { showToast("Delete failed.", "error"); }
    finally { setShowDeleteModal(false); }
  };

  const cancelEdit = () => {
    setIsEditing(false); setEditData(vendor || {});
    setImageFile(null); setImagePreview(null);
  };

  const getImageSrc = () => {
    if (imagePreview) return imagePreview;
    if (vendor?.image) return `${BASE_URL}/storage/uploads/providers/${vendor.image}`;
    return null;
  };

  const getInitials = (name?: string) =>
    name ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "VP";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .root {
          min-height: 100vh;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #FAFAF8;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 48px 20px 80px;
        }

        .layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 20px;
          width: 100%;
          max-width: 900px;
          animation: rise 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sidebar-card {
          background: white;
          border-radius: 20px;
          border: 1px solid #EBEBEB;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }

        .sidebar-top {
          background: linear-gradient(160deg, #18181B 0%, #27272A 100%);
          padding: 32px 20px 20px;
          text-align: center;
          position: relative;
        }

        .sidebar-top::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 40px;
          background: white;
          border-radius: 16px 16px 0 0;
        }

        .avatar-wrap {
          position: relative;
          display: inline-block;
          margin-bottom: 8px;
          z-index: 1;
        }

        .avatar-img, .avatar-placeholder {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid white;
          object-fit: cover;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .avatar-placeholder {
          background: linear-gradient(135deg, #F59E0B, #EF4444);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          font-weight: 800;
          color: white;
          letter-spacing: -1px;
        }

        .online-dot {
          position: absolute;
          bottom: 4px; right: 4px;
          width: 14px; height: 14px;
          background: #22C55E;
          border-radius: 50%;
          border: 2px solid white;
        }

        .sidebar-name-section {
          position: relative;
          z-index: 1;
          padding: 16px 20px 0;
          text-align: center;
        }

        .sidebar-name {
          font-size: 17px;
          font-weight: 800;
          color: #18181B;
          margin-bottom: 2px;
        }

        .sidebar-email {
          font-size: 12px;
          color: #A1A1AA;
          word-break: break-all;
        }

        .vendor-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-top: 10px;
          background: #FEF3C7;
          color: #92400E;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 100px;
          border: 1px solid #FDE68A;
        }

        .stat-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid #F4F4F5;
          margin-top: 16px;
        }
        .stat-cell {
          padding: 14px 16px;
          text-align: center;
        }
        .stat-cell:first-child { border-right: 1px solid #F4F4F5; }
        .stat-num { font-size: 20px; font-weight: 800; color: #18181B; }
        .stat-lbl {
          font-size: 10px; font-weight: 600;
          color: #A1A1AA; text-transform: uppercase;
          letter-spacing: 0.5px; margin-top: 2px;
        }

        .sidebar-nav {
          background: white;
          border-radius: 20px;
          border: 1px solid #EBEBEB;
          padding: 8px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          color: #71717A;
          cursor: pointer;
          transition: all 0.15s;
        }
        .nav-item.active, .nav-item:hover {
          background: #18181B;
          color: white;
        }

        .content { display: flex; flex-direction: column; gap: 16px; }

        .content-card {
          background: white;
          border-radius: 20px;
          border: 1px solid #EBEBEB;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          overflow: hidden;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 28px 18px;
          border-bottom: 1px solid #F4F4F5;
        }

        .card-title {
          font-size: 15px;
          font-weight: 800;
          color: #18181B;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card-title-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #F59E0B;
        }

        .info-list { padding: 8px 0; }

        .info-row {
          display: flex;
          align-items: center;
          padding: 14px 28px;
          border-bottom: 1px solid #F9F9F9;
          transition: background 0.15s;
        }
        .info-row:last-child { border-bottom: none; }
        .info-row:hover { background: #FAFAFA; }

        .info-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: #F4F4F5;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          margin-right: 14px;
          flex-shrink: 0;
        }

        .info-text { flex: 1; min-width: 0; }
        .info-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          color: #A1A1AA; margin-bottom: 2px;
        }
        .info-val {
          font-size: 14px; font-weight: 600; color: #18181B;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .info-val.empty { color: #D4D4D8; font-weight: 400; font-style: italic; }

        .edit-form { padding: 24px 28px; }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }

        .field { display: flex; flex-direction: column; gap: 5px; }
        .field-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase; color: #A1A1AA;
        }
        .field-input {
          padding: 11px 14px;
          border: 1.5px solid #E4E4E7;
          border-radius: 12px;
          font-size: 14px; font-weight: 500; color: #18181B;
          background: #FAFAFA; outline: none;
          transition: all 0.15s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .field-input:focus {
          border-color: #18181B; background: white;
          box-shadow: 0 0 0 3px rgba(24,24,27,0.06);
        }

        .img-upload {
          display: flex; align-items: center; gap: 14px;
          padding: 14px;
          border: 1.5px dashed #E4E4E7;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.15s;
          margin-bottom: 20px;
        }
        .img-upload:hover { border-color: #18181B; background: #FAFAFA; }
        .img-upload-thumb {
          width: 48px; height: 48px; border-radius: 50%;
          object-fit: cover; border: 2px solid #E4E4E7; flex-shrink: 0;
        }
        .img-upload-thumb-ph {
          width: 48px; height: 48px; border-radius: 50%;
          background: linear-gradient(135deg, #F59E0B, #EF4444);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 800; color: white; flex-shrink: 0;
        }
        .img-upload-text { font-size: 13px; font-weight: 500; color: #71717A; }
        .img-upload-text strong { color: #18181B; font-weight: 700; }
        .img-upload-input { display: none; }

        .btn-row {
          display: flex; gap: 10px;
          padding: 18px 28px;
          border-top: 1px solid #F4F4F5;
        }

        .btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 7px; padding: 11px 20px;
          border-radius: 12px; border: none;
          font-size: 13px; font-weight: 700;
          cursor: pointer; transition: all 0.15s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .btn-primary { background: #18181B; color: white; box-shadow: 0 2px 8px rgba(24,24,27,0.2); }
        .btn-primary:hover { background: #27272A; transform: translateY(-1px); }
        .btn-sm { padding: 7px 14px; font-size: 12px; border-radius: 10px; }
        .btn-success {
          background: linear-gradient(135deg, #22C55E, #16A34A);
          color: white; box-shadow: 0 2px 8px rgba(34,197,94,0.3);
        }
        .btn-success:hover { transform: translateY(-1px); }
        .btn-success:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .btn-ghost {
          background: #F4F4F5; color: #71717A;
          border: 1.5px solid #E4E4E7;
        }
        .btn-ghost:hover { background: #EBEBEB; color: #18181B; }
        .btn-danger {
          background: #FFF1F2; color: #E11D48;
          border: 1.5px solid #FECDD3;
        }
        .btn-danger:hover { background: #FFE4E6; border-color: #E11D48; }

        .overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(6px);
          z-index: 100;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .modal {
          background: white; border-radius: 24px;
          padding: 36px 32px; max-width: 380px; width: 100%;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          animation: popIn 0.3s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-icon-wrap {
          width: 64px; height: 64px; border-radius: 18px;
          background: #FFF1F2;
          display: flex; align-items: center; justify-content: center;
          font-size: 28px; margin-bottom: 18px;
        }
        .modal-title { font-size: 20px; font-weight: 800; color: #18181B; margin-bottom: 8px; }
        .modal-desc { font-size: 13px; color: #71717A; line-height: 1.7; margin-bottom: 24px; }
        .modal-actions { display: flex; gap: 10px; }

        .toast {
          position: fixed; bottom: 24px; right: 24px; z-index: 200;
          padding: 13px 20px; border-radius: 14px;
          font-size: 13px; font-weight: 700; color: white;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          animation: slideUp 0.4s cubic-bezier(0.22,1,0.36,1) both;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .toast.success { background: #18181B; }
        .toast.error { background: #E11D48; }

        .loading-screen {
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 14px; background: #FAFAF8;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .spin {
          width: 36px; height: 36px;
          border: 3px solid #E4E4E7;
          border-top-color: #18181B;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .loading-lbl { font-size: 13px; font-weight: 600; color: #A1A1AA; }

        @media (max-width: 640px) {
          .layout { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .btn-row { flex-wrap: wrap; }
        }
      `}</style>

      {loading && (
        <div className="loading-screen">
          <div className="spin" />
          <span className="loading-lbl">Loading profile…</span>
        </div>
      )}

      {!loading && vendor && (
        <div className="root">
          <div className="layout">

            {/* SIDEBAR */}
            <div className="sidebar">
              <div className="sidebar-card">
                <div className="sidebar-top">
                  <div className="avatar-wrap">
                    {getImageSrc()
                      ? <img src={getImageSrc()!} alt="avatar" className="avatar-img" />
                      : <div className="avatar-placeholder">{getInitials(vendor.name)}</div>
                    }
                    <div className="online-dot" />
                  </div>
                </div>
                <div className="sidebar-name-section">
                  <div className="sidebar-name">{vendor.name || "—"}</div>
                  <div className="sidebar-email">{vendor.email || "—"}</div>
                  <div><span className="vendor-tag">⭐ Vendor</span></div>
                </div>
                <div className="stat-row">
                  <div className="stat-cell">
                    <div className="stat-num">{vendor.experience?.replace(/\D/g, "") || "—"}</div>
                    <div className="stat-lbl">Yrs Exp</div>
                  </div>
                  <div className="stat-cell">
                    <div className="stat-num">{vendor.city ? "✓" : "—"}</div>
                    <div className="stat-lbl">Location</div>
                  </div>
                </div>
              </div>

              <div className="sidebar-nav">
                {[
                  { icon: "👤", label: "Profile", active: true },
                  { icon: "🔔", label: "Notifications" },
                  { icon: "🔒", label: "Security" },
                  { icon: "📊", label: "Analytics" },
                ].map((item) => (
                  <div key={item.label} className={`nav-item ${item.active ? "active" : ""}`}>
                    <span>{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* CONTENT */}
            <div className="content">
              {!isEditing && (
                <div className="content-card">
                  <div className="card-header">
                    <div className="card-title">
                      <div className="card-title-dot" />
                      Profile Details
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
                      ✏️ Edit
                    </button>
                  </div>
                  <div className="info-list">
                    {[
                      { icon: "✉️", label: "Email", val: vendor.email },
                      { icon: "📞", label: "Phone", val: vendor.contact },
                      { icon: "🏙️", label: "City", val: vendor.city },
                      { icon: "📍", label: "Area", val: vendor.area },
                      { icon: "🏅", label: "Experience", val: vendor.experience },
                    ].map((row) => (
                      <div className="info-row" key={row.label}>
                        <div className="info-icon">{row.icon}</div>
                        <div className="info-text">
                          <div className="info-label">{row.label}</div>
                          <div className={`info-val ${!row.val ? "empty" : ""}`}>
                            {row.val || "Not provided"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="btn-row">
                    <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>
                      🗑️ Delete Account
                    </button>
                  </div>
                </div>
              )}

              {isEditing && (
                <div className="content-card">
                  <div className="card-header">
                    <div className="card-title">
                      <div className="card-title-dot" />
                      Edit Profile
                    </div>
                  </div>
                  <div className="edit-form">
                    <label className="img-upload">
                      {getImageSrc()
                        ? <img src={getImageSrc()!} alt="preview" className="img-upload-thumb" />
                        : <div className="img-upload-thumb-ph">{getInitials(editData.name)}</div>
                      }
                      <div className="img-upload-text">
                        <strong>Click to change photo</strong><br />
                        JPG or PNG, max 5MB
                      </div>
                      <input type="file" accept="image/*" className="img-upload-input" onChange={handleImageChange} />
                    </label>
                    <div className="form-row">
                      <div className="field">
                        <label className="field-label">Name</label>
                        <input className="field-input" name="name" value={editData.name || ""} onChange={handleEditChange} placeholder="Full name" />
                      </div>
                      <div className="field">
                        <label className="field-label">Email</label>
                        <input className="field-input" name="email" value={editData.email || ""} onChange={handleEditChange} placeholder="Email" type="email" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="field">
                        <label className="field-label">Phone</label>
                        <input className="field-input" name="contact" value={editData.contact || ""} onChange={handleEditChange} placeholder="Phone number" />
                      </div>
                      <div className="field">
                        <label className="field-label">Experience</label>
                        <input className="field-input" name="experience" value={editData.experience || ""} onChange={handleEditChange} placeholder="e.g. 5 years" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="field">
                        <label className="field-label">City</label>
                        <input className="field-input" name="city" value={editData.city || ""} onChange={handleEditChange} placeholder="City" />
                      </div>
                      <div className="field">
                        <label className="field-label">Area</label>
                        <input className="field-input" name="area" value={editData.area || ""} onChange={handleEditChange} placeholder="Area / locality" />
                      </div>
                    </div>
                  </div>
                  <div className="btn-row">
                    <button className="btn btn-success" onClick={handleUpdate} disabled={saving}>
                      {saving ? "⏳ Saving…" : "✓ Save Changes"}
                    </button>
                    <button className="btn btn-ghost" onClick={cancelEdit}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon-wrap">🗑️</div>
            <div className="modal-title">Delete Account?</div>
            <p className="modal-desc">
              This will permanently remove your vendor account and all associated data. This action <strong>cannot be undone</strong>.
            </p>
            <div className="modal-actions">
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="btn btn-danger" style={{ flex: 1 }} onClick={handleDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === "success" ? "✓" : "✕"} {toast.msg}
        </div>
      )}
    </>
  );
};

export default VendorProfile;