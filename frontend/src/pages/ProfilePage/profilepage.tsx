import React, { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  role: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: "from-rose-400 to-pink-600",
      user: "from-blue-400 to-cyan-500",
      manager: "from-violet-400 to-purple-600",
      editor: "from-amber-400 to-orange-500",
    };
    return colors[role?.toLowerCase()] || "from-teal-400 to-emerald-500";
  };

  if (!user) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
          * { font-family: 'Outfit', sans-serif; }

          .bg-animated {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
            background-size: 400% 400%;
            animation: gradientShift 8s ease infinite;
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
        <div className="bg-animated flex justify-center items-center h-screen">
          <div style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "20px",
            padding: "40px 60px",
            textAlign: "center",
            color: "white"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔐</div>
            <p style={{ fontSize: "20px", fontWeight: 600 }}>User not logged in</p>
            <p style={{ fontSize: "14px", opacity: 0.7, marginTop: "6px" }}>Please login to view your profile</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        * { font-family: 'Outfit', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }

        .page-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
        }

        .blob1 {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(255,100,150,0.4) 0%, transparent 70%);
          top: -100px;
          left: -100px;
          animation: floatBlob 6s ease-in-out infinite;
        }
        .blob2 {
          position: absolute;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(100,150,255,0.35) 0%, transparent 70%);
          bottom: -80px;
          right: -80px;
          animation: floatBlob 8s ease-in-out infinite reverse;
        }
        .blob3 {
          position: absolute;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(100,255,200,0.25) 0%, transparent 70%);
          top: 50%;
          left: 60%;
          animation: floatBlob 7s ease-in-out infinite 2s;
        }
        @keyframes floatBlob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -20px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
        }

        .stars {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 50% 10%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 85% 35%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 15% 75%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 60%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(2px 2px at 45% 45%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 25%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 25% 90%, rgba(255,255,255,0.4) 0%, transparent 100%);
        }

        .card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 28px;
          overflow: hidden;
          box-shadow:
            0 25px 60px rgba(0,0,0,0.5),
            0 0 0 1px rgba(255,255,255,0.05) inset,
            0 1px 0 rgba(255,255,255,0.2) inset;
          animation: cardEntrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .card-header {
          padding: 36px 32px 28px;
          text-align: center;
          position: relative;
        }

        .avatar-ring {
          display: inline-flex;
          padding: 4px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f093fb, #f5576c, #4facfe, #00f2fe);
          background-size: 300% 300%;
          animation: gradientSpin 3s linear infinite;
          margin-bottom: 16px;
          box-shadow: 0 8px 32px rgba(240, 147, 251, 0.4);
        }
        @keyframes gradientSpin {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .avatar {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 800;
          color: white;
          letter-spacing: -1px;
        }

        .profile-name {
          font-size: 26px;
          font-weight: 800;
          color: white;
          margin-bottom: 6px;
          letter-spacing: -0.5px;
        }

        .role-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 16px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: white;
          background: linear-gradient(135deg, #f093fb, #f5576c);
          box-shadow: 0 4px 15px rgba(240, 147, 251, 0.3);
        }

        .card-body {
          padding: 8px 32px 32px;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          margin-bottom: 24px;
        }

        .info-grid {
          display: grid;
          gap: 14px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.2s ease;
          cursor: default;
          animation: itemSlide 0.5s ease both;
        }
        .info-item:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateX(4px);
        }
        .info-item:nth-child(1) { animation-delay: 0.1s; }
        .info-item:nth-child(2) { animation-delay: 0.2s; }
        .info-item:nth-child(3) { animation-delay: 0.3s; }
        .info-item:nth-child(4) { animation-delay: 0.4s; }
        @keyframes itemSlide {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .icon-box {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .info-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.45);
          margin-bottom: 2px;
        }

        .info-value {
          font-size: 15px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
        }

        .info-value.muted {
          color: rgba(255,255,255,0.35);
          font-weight: 400;
          font-style: italic;
        }

        .logout-btn {
          width: 100%;
          margin-top: 24px;
          padding: 15px;
          border: none;
          border-radius: 16px;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: white;
          cursor: pointer;
          background: linear-gradient(135deg, #ff416c, #ff4b2b);
          box-shadow: 0 8px 24px rgba(255, 65, 108, 0.35);
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }
        .logout-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(255, 65, 108, 0.5);
        }
        .logout-btn:hover::before { opacity: 1; }
        .logout-btn:active { transform: translateY(0); }
      `}</style>

      <div className="page-bg">
        <div className="blob1" />
        <div className="blob2" />
        <div className="blob3" />
        <div className="stars" />

        <div className="card">
          <div className="card-header">
            <div className="avatar-ring">
              <div className="avatar">
                {getInitials(user.name)}
              </div>
            </div>

            <div className="profile-name">{user.name}</div>
            <div className="role-badge">
              ✦ {user.role}
            </div>
          </div>

          <div className="card-body">
            <div className="divider" />

            <div className="info-grid">
              <div className="info-item">
                <div className="icon-box" style={{ background: "linear-gradient(135deg, rgba(79,172,254,0.3), rgba(0,242,254,0.2))" }}>
                  📧
                </div>
                <div>
                  <div className="info-label">Email</div>
                  <div className="info-value">{user.email}</div>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-box" style={{ background: "linear-gradient(135deg, rgba(67,233,123,0.3), rgba(56,249,215,0.2))" }}>
                  📱
                </div>
                <div>
                  <div className="info-label">Phone</div>
                  <div className={`info-value ${!user.phone ? "muted" : ""}`}>
                    {user.phone || "Not provided"}
                  </div>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-box" style={{ background: "linear-gradient(135deg, rgba(240,147,251,0.3), rgba(245,87,108,0.2))" }}>
                  📍
                </div>
                <div>
                  <div className="info-label">City</div>
                  <div className={`info-value ${!user.city ? "muted" : ""}`}>
                    {user.city || "Not provided"}
                  </div>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-box" style={{ background: "linear-gradient(135deg, rgba(255,200,100,0.3), rgba(255,140,50,0.2))" }}>
                  🎯
                </div>
                <div>
                  <div className="info-label">Role</div>
                  <div className="info-value" style={{ textTransform: "capitalize" }}>{user.role}</div>
                </div>
              </div>
            </div>

            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;