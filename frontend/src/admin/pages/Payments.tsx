import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CreditCard, ArrowUpRight, Clock, User, CheckCircle, AlertCircle, TrendingUp, Zap, Sparkles } from 'lucide-react';

interface Payment {
  id: number;
  transaction_id: string;
  amount: string | number;
  duration_months: number;
  status: string;
  ends_at: string;
  provider?: {
    name: string;
  };
}

const avatarColors: [string, string][] = [
  ['#f9a8d4', '#ec4899'],
  ['#fbcfe8', '#db2777'],
  ['#f0abfc', '#c026d3'],
  ['#fda4af', '#e11d48'],
  ['#f9a8d4', '#be185d'],
  ['#e879f9', '#a21caf'],
];

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/providers/all-payments')
      .then(response => {
        setPayments(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching payments:", error);
        setLoading(false);
      });
  }, []);

  const totalRevenue = payments.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const completedCount = payments.filter(p => p.status.toLowerCase() === 'completed').length;
  const pendingCount = payments.length - completedCount;

  return (
    <div
      className="min-h-screen p-6 md:p-10"
      style={{
        background: 'linear-gradient(145deg, #fff0f6 0%, #fce7f3 40%, #fdf2f8 70%, #fff5f9 100%)',
        fontFamily: "'Outfit', 'Segoe UI', sans-serif",
      }}
    >
      {/* Decorative blobs */}
      <div style={{
        position: 'fixed', top: '-60px', right: '-60px', width: '320px', height: '320px',
        background: 'radial-gradient(circle, rgba(244,114,182,0.22) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '-80px', left: '-40px', width: '380px', height: '380px',
        background: 'radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', top: '35%', right: '20%', width: '260px', height: '260px',
        background: 'radial-gradient(circle, rgba(251,207,232,0.5) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 1 }}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
           
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

          <div style={{
            background: 'linear-gradient(135deg, #ffffff, #fce7f3)',
            border: '1.5px solid rgba(244,114,182,0.4)',
            borderRadius: '20px', padding: '22px 26px',
            boxShadow: '0 8px 32px rgba(236,72,153,0.12), 0 2px 8px rgba(0,0,0,0.04)',
          }}>
            <div className="flex items-center justify-between mb-3">
              <p style={{ color: '#db2777', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Total Revenue</p>
              <div style={{ background: 'rgba(244,114,182,0.15)', borderRadius: '8px', padding: '6px' }}>
                <TrendingUp size={16} color="#ec4899" />
              </div>
            </div>
            <p style={{
              fontSize: '1.9rem', fontWeight: 800,
              background: 'linear-gradient(90deg, #be185d, #ec4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              ₹ {totalRevenue.toLocaleString()}
            </p>
            <p style={{ color: '#f9a8d4', fontSize: '0.75rem', marginTop: '4px', fontWeight: 600 }}>All time earnings</p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ffffff, #fdf4ff)',
            border: '1.5px solid rgba(192,38,211,0.25)',
            borderRadius: '20px', padding: '22px 26px',
            boxShadow: '0 8px 32px rgba(192,38,211,0.1), 0 2px 8px rgba(0,0,0,0.04)',
          }}>
            <div className="flex items-center justify-between mb-3">
              <p style={{ color: '#a21caf', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Completed</p>
              <div style={{ background: 'rgba(192,38,211,0.12)', borderRadius: '8px', padding: '6px' }}>
                <CheckCircle size={16} color="#c026d3" />
              </div>
            </div>
            <p style={{ fontSize: '1.9rem', fontWeight: 800, color: '#c026d3' }}>{completedCount}</p>
            <p style={{ color: '#e879f9', fontSize: '0.75rem', marginTop: '4px', fontWeight: 600 }}>Successful transactions</p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ffffff, #fff1f2)',
            border: '1.5px solid rgba(251,113,133,0.3)',
            borderRadius: '20px', padding: '22px 26px',
            boxShadow: '0 8px 32px rgba(244,63,94,0.1), 0 2px 8px rgba(0,0,0,0.04)',
          }}>
            <div className="flex items-center justify-between mb-3">
              <p style={{ color: '#e11d48', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Pending / Failed</p>
              <div style={{ background: 'rgba(244,63,94,0.1)', borderRadius: '8px', padding: '6px' }}>
                <Zap size={16} color="#f43f5e" />
              </div>
            </div>
            <p style={{ fontSize: '1.9rem', fontWeight: 800, color: '#f43f5e' }}>{pendingCount}</p>
            <p style={{ color: '#fda4af', fontSize: '0.75rem', marginTop: '4px', fontWeight: 600 }}>Needs attention</p>
          </div>
        </div>

        {/* Table */}
        <div style={{
          background: '#ffffff',
          border: '1.5px solid rgba(244,114,182,0.25)',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(236,72,153,0.1), 0 4px 16px rgba(0,0,0,0.04)',
          overflow: 'hidden',
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{
                  background: 'linear-gradient(90deg, #fce7f3, #fdf2f8, #fce7f3)',
                  borderBottom: '2px solid rgba(244,114,182,0.2)',
                }}>
                  {['Transaction Info', 'Provider', 'Plan Duration', 'Amount', 'Status', 'Expiry Date'].map((h) => (
                    <th key={h} style={{
                      padding: '18px 22px',
                      fontSize: '0.68rem', fontWeight: 800,
                      letterSpacing: '1.2px', textTransform: 'uppercase',
                      color: '#be185d',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(244,114,182,0.1)' }}>
                      {[...Array(6)].map((__, j) => (
                        <td key={j} style={{ padding: '20px 22px' }}>
                          <div style={{
                            height: '14px', borderRadius: '6px',
                            background: 'linear-gradient(90deg, #fce7f3, #fdf2f8, #fce7f3)',
                            animation: 'pulse 1.5s infinite',
                          }} />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : payments.length > 0 ? (
                  payments.map((payment, idx) => {
                    const isCompleted = payment.status.toLowerCase() === 'completed';
                    const [c1, c2] = avatarColors[idx % avatarColors.length];
                    return (
                      <tr
                        key={payment.id}
                        style={{
                          borderBottom: '1px solid rgba(244,114,182,0.1)',
                          transition: 'background 0.2s',
                          cursor: 'default',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#fff5f9')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <td style={{ padding: '18px 22px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{
                              fontFamily: "'Fira Code', monospace",
                              fontSize: '0.82rem', fontWeight: 700, color: '#1f2937', letterSpacing: '0.3px',
                            }}>
                              {payment.transaction_id}
                            </span>
                            <span style={{
                              fontSize: '0.68rem', fontWeight: 600, color: '#ec4899',
                              display: 'flex', alignItems: 'center', gap: '3px',
                              textTransform: 'uppercase', letterSpacing: '0.5px',
                            }}>
                              
                            </span>
                          </div>
                        </td>

                        <td style={{ padding: '18px 22px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '34px', height: '34px', borderRadius: '50%',
                              background: `linear-gradient(135deg, ${c1}, ${c2})`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              boxShadow: `0 4px 12px ${c2}55`,
                              flexShrink: 0,
                            }}>
                              <User size={15} color="white" />
                            </div>
                            <span style={{ fontWeight: 700, color: '#1f2937', fontSize: '0.88rem' }}>
                              {payment.provider?.name || 'N/A'}
                            </span>
                          </div>
                        </td>

                        <td style={{ padding: '18px 22px' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            padding: '5px 12px',
                            background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
                            border: '1px solid rgba(244,114,182,0.35)',
                            borderRadius: '8px',
                            fontSize: '0.75rem', fontWeight: 700, color: '#db2777',
                          }}>
                            <Clock size={11} /> {payment.duration_months} Months
                          </span>
                        </td>

                        <td style={{ padding: '18px 22px' }}>
                          <span style={{
                            fontSize: '1.1rem', fontWeight: 800,
                            background: 'linear-gradient(90deg, #be185d, #ec4899)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                          }}>
                            ₹{Number(payment.amount).toLocaleString()}
                          </span>
                        </td>

                        <td style={{ padding: '18px 22px' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            padding: '5px 12px',
                            background: isCompleted
                              ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)'
                              : 'linear-gradient(135deg, #fff1f2, #ffe4e6)',
                            border: isCompleted
                              ? '1px solid rgba(34,197,94,0.35)'
                              : '1px solid rgba(244,63,94,0.35)',
                            borderRadius: '8px',
                            fontSize: '0.72rem', fontWeight: 800,
                            color: isCompleted ? '#16a34a' : '#e11d48',
                            textTransform: 'uppercase', letterSpacing: '0.5px',
                            boxShadow: isCompleted
                              ? '0 0 10px rgba(34,197,94,0.1)'
                              : '0 0 10px rgba(244,63,94,0.1)',
                          }}>
                            {isCompleted ? <CheckCircle size={11} /> : <AlertCircle size={11} />}
                            {payment.status}
                          </span>
                        </td>

                        <td style={{ padding: '18px 22px' }}>
                          <span style={{
                            fontSize: '0.82rem', fontWeight: 600, color: '#6b7280',
                            background: '#fdf2f8',
                            border: '1px solid rgba(244,114,182,0.2)',
                            padding: '5px 12px', borderRadius: '8px',
                            display: 'inline-block',
                          }}>
                            {payment.ends_at
                              ? new Date(payment.ends_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                              : 'N/A'}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} style={{ padding: '80px', textAlign: 'center', color: '#f9a8d4', fontStyle: 'italic' }}>
                      No payment records found in the database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer line */}
        <div style={{
          height: '3px', marginTop: '32px',
          background: 'linear-gradient(90deg, transparent, #f472b6, #ec4899, #db2777, #f472b6, transparent)',
          borderRadius: '2px', opacity: 0.5,
        }} />
      </div>
    </div>
  );
}