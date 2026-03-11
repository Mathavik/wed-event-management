import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

interface Payment {
  id: number;
  enquiry_id: number;
  customer_name: string;
  customer_email: string;
  amount: string;
  bank: string;
  card_last4: string;
  created_at: string;
}

const AdminUserPayments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPayments = async () => {
    try {
      const res = await axiosInstance.get("/admin/user-payments");
      setPayments(res.data.data);
    } catch (error) {
      console.error("Error fetching payments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const deletePayment = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this payment?")) return;
    setDeletingId(id);
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user-payments/${id}`);
      setPayments((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Delete error", error);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = payments.filter(
    (p) =>
      p.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.bank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = payments.reduce(
    (sum, p) => sum + parseFloat(p.amount || "0"),
    0
  );

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const avatarColors = [
    "#6366f1","#8b5cf6","#ec4899","#f59e0b","#10b981","#3b82f6","#ef4444","#14b8a6",
  ];
  const getColor = (name: string) =>
    avatarColors[name.charCodeAt(0) % avatarColors.length];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap');

        * { box-sizing: border-box; }

        .ap-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #f4f6fb;
          min-height: 100vh;
          padding: 2.5rem 2rem;
        }

        .ap-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .ap-breadcrumb {
          font-size: 0.75rem;
          color: #94a3b8;
          margin-bottom: 0.25rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .ap-title {
          font-size: 1.65rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.03em;
        }

        .ap-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .ap-stat {
          background: #ffffff;
          border-radius: 16px;
          padding: 1.4rem 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .ap-stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ap-stat-icon.violet { background: #ede9fe; }
        .ap-stat-icon.emerald { background: #d1fae5; }
        .ap-stat-icon.sky { background: #e0f2fe; }
        .ap-stat-label {
          font-size: 0.72rem;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 0.2rem;
        }
        .ap-stat-value {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0f172a;
          font-family: 'Fira Code', monospace;
          letter-spacing: -0.02em;
        }

        .ap-card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.05);
          overflow: hidden;
        }

        .ap-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #f1f5f9;
        }
        .ap-toolbar-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .ap-count-badge {
          background: #f1f5f9;
          color: #64748b;
          border-radius: 20px;
          padding: 0.2rem 0.65rem;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .ap-toolbar-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1e293b;
        }
        .ap-search-wrap { position: relative; }
        .ap-search-icon {
          position: absolute;
          left: 11px;
          top: 50%;
          transform: translateY(-50%);
          color: #cbd5e1;
          pointer-events: none;
        }
        .ap-search {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          padding: 0.5rem 1rem 0.5rem 2.2rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.82rem;
          color: #334155;
          outline: none;
          width: 230px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ap-search::placeholder { color: #cbd5e1; }
        .ap-search:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }

        /* ── Card-based list (no table, no scroll) ── */
        .ap-list {
          display: flex;
          flex-direction: column;
        }

        .ap-list-header {
          display: grid;
          grid-template-columns: 60px 70px 1fr 1fr 90px 110px 100px 100px 80px;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #fafbfd;
          border-bottom: 1.5px solid #f1f5f9;
        }
        .ap-list-header span {
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: #94a3b8;
          white-space: nowrap;
        }

        .ap-row {
          display: grid;
          grid-template-columns: 60px 70px 1fr 1fr 90px 110px 100px 100px 80px;
          gap: 0.5rem;
          align-items: center;
          padding: 0.9rem 1.5rem;
          border-bottom: 1px solid #f8fafc;
          transition: background 0.12s;
        }
        .ap-row:last-child { border-bottom: none; }
        .ap-row:hover { background: #fafbff; }

        .ap-cell {
          font-size: 0.84rem;
          color: #475569;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .id-chip {
          display: inline-flex;
          align-items: center;
          background: #f1f5f9;
          border-radius: 6px;
          padding: 0.18rem 0.5rem;
          font-family: 'Fira Code', monospace;
          font-size: 0.73rem;
          color: #64748b;
          font-weight: 500;
        }

        .customer-cell {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          min-width: 0;
        }
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.68rem;
          font-weight: 800;
          color: #fff;
          flex-shrink: 0;
          letter-spacing: 0.03em;
        }
        .customer-name {
          font-weight: 600;
          color: #1e293b;
          font-size: 0.83rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .customer-email {
          font-size: 0.78rem;
          color: #94a3b8;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .amount-tag {
          display: inline-flex;
          align-items: center;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 0.25rem 0.6rem;
          font-family: 'Fira Code', monospace;
          font-size: 0.8rem;
          font-weight: 600;
          color: #16a34a;
          white-space: nowrap;
        }

        .bank-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 0.22rem 0.6rem;
          font-size: 0.76rem;
          font-weight: 600;
          color: #475569;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .card-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: 'Fira Code', monospace;
          font-size: 0.78rem;
          color: #64748b;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 0.22rem 0.6rem;
          white-space: nowrap;
        }

        .date-tag {
          font-size: 0.78rem;
          color: #94a3b8;
          font-weight: 500;
          white-space: nowrap;
        }

        .btn-del {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: #fff1f2;
          border: 1.5px solid #fecdd3;
          color: #e11d48;
          border-radius: 9px;
          padding: 0.35rem 0.7rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .btn-del:hover {
          background: #ffe4e6;
          border-color: #fda4af;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(225,29,72,0.15);
        }
        .btn-del:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }

        .ap-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 4.5rem 2rem;
          gap: 0.75rem;
          color: #cbd5e1;
        }
        .ap-empty p { font-size: 0.88rem; margin: 0; font-weight: 500; }

        /* Skeleton */
        .skel-row {
          display: grid;
          grid-template-columns: 60px 70px 1fr 1fr 90px 110px 100px 100px 80px;
          gap: 0.5rem;
          align-items: center;
          padding: 0.9rem 1.5rem;
          border-bottom: 1px solid #f8fafc;
        }
        .skel {
          height: 14px;
          border-radius: 6px;
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: skel-shine 1.4s infinite;
        }
        @keyframes skel-shine {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="ap-root">
        <div className="ap-topbar">
          <div>
            <div className="ap-breadcrumb">Admin › Finance</div>
            <h2 className="ap-title">User Payments</h2>
          </div>
        </div>

        {!loading && (
          <div className="ap-stats">
            <div className="ap-stat">
              <div className="ap-stat-icon violet">
                <svg width="20" height="20" fill="none" stroke="#6366f1" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div>
                <div className="ap-stat-label">Transactions</div>
                <div className="ap-stat-value">{payments.length}</div>
              </div>
            </div>
            <div className="ap-stat">
              <div className="ap-stat-icon emerald">
                <svg width="20" height="20" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div>
                <div className="ap-stat-label">Total Revenue</div>
                <div className="ap-stat-value">
                  ₹{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
                </div>
              </div>
            </div>
            <div className="ap-stat">
              <div className="ap-stat-icon sky">
                <svg width="20" height="20" fill="none" stroke="#0ea5e9" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <div>
                <div className="ap-stat-label">Avg. Transaction</div>
                <div className="ap-stat-value">
                  ₹{payments.length ? (totalAmount / payments.length).toFixed(0) : "0"}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="ap-card">
          <div className="ap-toolbar">
            <div className="ap-toolbar-left">
              <span className="ap-toolbar-title">All Transactions</span>
              <span className="ap-count-badge">{filtered.length}</span>
            </div>
            <div className="ap-search-wrap">
              <svg className="ap-search-icon" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                className="ap-search"
                placeholder="Search payments…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div>
              {Array.from({ length: 7 }).map((_, i) => (
                <div className="skel-row" key={i}>
                  <div className="skel" />
                  <div className="skel" />
                  <div className="skel" />
                  <div className="skel" />
                  <div className="skel" />
                  <div className="skel" />
                  <div className="skel" />
                  <div className="skel" />
                  <div className="skel" />
                </div>
              ))}
            </div>
          ) : (
            <div className="ap-list">
              {/* Header */}
              <div className="ap-list-header">
                <span>ID</span>
                <span>Enquiry</span>
                <span>Customer</span>
                <span>Email</span>
                <span>Amount</span>
                <span>Bank</span>
                <span>Card</span>
                <span>Date</span>
                <span>Action</span>
              </div>

              {filtered.map((payment) => (
                <div className="ap-row" key={payment.id}>
                  <div className="ap-cell">
                    <span className="id-chip"># {payment.id}</span>
                  </div>
                  <div className="ap-cell">
                    <span className="id-chip">{payment.enquiry_id}</span>
                  </div>
                  <div className="ap-cell">
                    <div className="customer-cell">
                      <div className="avatar" style={{ background: getColor(payment.customer_name) }}>
                        {getInitials(payment.customer_name)}
                      </div>
                      <div className="customer-name">{payment.customer_name}</div>
                    </div>
                  </div>
                  <div className="ap-cell customer-email">{payment.customer_email}</div>
                  <div className="ap-cell">
                    <span className="amount-tag">₹ {payment.amount}</span>
                  </div>
                  <div className="ap-cell">
                    <span className="bank-tag">
                      <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="8" width="18" height="13" rx="2"/><path d="M19 8V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2"/>
                      </svg>
                      {payment.bank}
                    </span>
                  </div>
                  <div className="ap-cell">
                    <span className="card-tag">
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                      </svg>
                      •••• {payment.card_last4}
                    </span>
                  </div>
                  <div className="ap-cell">
                    <span className="date-tag">
                      {new Date(payment.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit", month: "short", year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="ap-cell">
                    <button
                      className="btn-del"
                      onClick={() => deletePayment(payment.id)}
                      disabled={deletingId === payment.id}
                    >
                      {deletingId === payment.id ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin 0.8s linear infinite" }}>
                            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                          </svg>
                          Wait…
                        </>
                      ) : (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                            <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
                          </svg>
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="ap-empty">
                  <svg width="52" height="52" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                  <p>{searchTerm ? "No results match your search." : "No payments found."}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminUserPayments;