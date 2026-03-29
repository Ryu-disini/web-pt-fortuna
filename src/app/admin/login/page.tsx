"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginAdmin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("admin", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Username atau password salah. Silakan coba lagi.");
        setLoading(false);
      }
    }, 900);
  };

  return (
    <main style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", background: "#F4F6FB", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --blue-deep: #0B2B6B;
          --blue-mid: #1A47A0;
          --blue-light: #2563EB;
          --yellow: #F5C100;
          --yellow-dark: #D4A200;
          --gray-soft: #F4F6FB;
          --gray-text: #4A5568;
        }

        .login-wrapper {
          width: 100%; max-width: 440px;
          display: flex; flex-direction: column; gap: 0;
        }

        /* TOP BRAND STRIP */
        .brand-strip {
          background: var(--blue-deep);
          border-radius: 20px 20px 0 0;
          padding: 32px 36px 28px;
          position: relative; overflow: hidden;
          text-align: center;
        }
        .brand-strip::before {
          content: '';
          position: absolute; top: -50px; right: -50px;
          width: 160px; height: 160px; border-radius: 50%;
          background: rgba(245,193,0,0.12);
        }
        .brand-strip::after {
          content: '';
          position: absolute; bottom: -30px; left: -30px;
          width: 110px; height: 110px; border-radius: 50%;
          background: rgba(37,99,235,0.2);
        }
        .brand-logo {
          width: 64px; height: 64px;
          background: var(--yellow);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
          position: relative; z-index: 1;
          box-shadow: 0 8px 24px rgba(245,193,0,0.3);
        }
        .brand-logo svg { width: 32px; height: 32px; color: var(--blue-deep); }
        .brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 700; color: white;
          margin-bottom: 4px;
          position: relative; z-index: 1;
        }
        .brand-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; font-weight: 400;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase; letter-spacing: 0.1em;
          position: relative; z-index: 1;
        }

        /* FORM CARD */
        .login-card {
          background: white;
          border-radius: 0 0 20px 20px;
          border: 1px solid rgba(26,71,160,0.08);
          border-top: none;
          padding: 36px;
          box-shadow: 0 16px 48px rgba(11,43,107,0.1);
        }

        .login-heading {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--gray-text); margin-bottom: 24px; text-align: center;
        }

        /* FORM */
        .form-group { margin-bottom: 16px; }
        .form-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem; font-weight: 600;
          color: var(--blue-deep); display: block;
          margin-bottom: 7px; letter-spacing: 0.02em;
        }
        .field-wrap { position: relative; }
        .field-icon {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%);
          width: 17px; height: 17px; color: #9CA3AF;
          pointer-events: none; transition: color 0.2s;
        }
        .field-wrap:focus-within .field-icon { color: var(--blue-mid); }

        .form-input {
          width: 100%; padding: 13px 16px 13px 44px;
          border-radius: 10px;
          border: 1.5px solid rgba(26,71,160,0.13);
          background: var(--gray-soft);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem; color: var(--blue-deep);
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .form-input:focus {
          border-color: var(--blue-light); background: white;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }
        .form-input::placeholder { color: #9CA3AF; font-weight: 300; }
        .form-input.error-field { border-color: #F87171; }
        .form-input.error-field:focus { box-shadow: 0 0 0 3px rgba(248,113,113,0.15); }

        /* SHOW PASSWORD */
        .pass-toggle {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          padding: 4px; color: #9CA3AF;
          transition: color 0.2s;
        }
        .pass-toggle:hover { color: var(--blue-mid); }
        .pass-toggle svg { width: 16px; height: 16px; display: block; }

        /* ERROR */
        .error-box {
          display: flex; align-items: flex-start; gap: 9px;
          background: #FEF2F2; border: 1px solid #FCA5A5;
          border-radius: 10px; padding: 12px 14px;
          margin-bottom: 16px;
          animation: shake 0.4s ease;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .error-box svg { width: 16px; height: 16px; color: #F87171; flex-shrink: 0; margin-top: 1px; }
        .error-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; color: #DC2626; font-weight: 400; line-height: 1.5;
        }

        /* SUBMIT */
        .submit-btn {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          color: white; border: none; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem; font-weight: 600;
          cursor: pointer; margin-top: 8px;
          display: flex; align-items: center; justify-content: center; gap: 9px;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .submit-btn:hover:not(:disabled) {
          opacity: 0.9; transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(11,43,107,0.25);
        }
        .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .submit-btn svg { width: 17px; height: 17px; }

        /* SPINNER */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 17px; height: 17px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        /* FOOTER */
        .login-footer {
          text-align: center; margin-top: 20px;
        }
        .login-footer a {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem; color: rgba(255,255,255,0.5);
          text-decoration: none; transition: color 0.2s;
        }
        .login-footer a:hover { color: var(--yellow); }

        /* BACK LINK */
        .back-link {
          display: flex; align-items: center; justify-content: center;
          gap: 6px; margin-top: 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem; color: var(--gray-text);
          text-decoration: none;
          transition: color 0.2s;
        }
        .back-link:hover { color: var(--blue-mid); }
        .back-link svg { width: 13px; height: 13px; }

        /* DIVIDER */
        .divider {
          display: flex; align-items: center; gap: 12px; margin: 20px 0 0;
        }
        .divider::before, .divider::after {
          content: ''; flex: 1;
          height: 1px; background: rgba(26,71,160,0.09);
        }
        .divider span {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem; color: #9CA3AF;
        }

        /* SECURITY NOTE */
        .security-note {
          display: flex; align-items: center; gap: 7px;
          margin-top: 16px; justify-content: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.74rem; color: #9CA3AF; font-weight: 300;
        }
        .security-note svg { width: 13px; height: 13px; flex-shrink: 0; }
      `}</style>

      <div className="login-wrapper">

        {/* BRAND STRIP */}
        <div className="brand-strip">
          <div className="brand-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div className="brand-name">PT FORTUNA SOLUSI GROUP</div>
          <div className="brand-sub">Portal Admin</div>
        </div>

        {/* FORM CARD */}
        <div className="login-card">
          <div className="login-heading">Masuk ke Dasbor Admin</div>

          {/* ERROR */}
          {error && (
            <div className="error-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div className="error-text">{error}</div>
            </div>
          )}

          <form onSubmit={login}>

            {/* USERNAME */}
            <div className="form-group">
              <label className="form-label">Username</label>
              <div className="field-wrap">
                <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <input
                  type="text"
                  className={`form-input${error ? " error-field" : ""}`}
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(""); }}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="field-wrap">
                <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <input
                  type={showPass ? "text" : "password"}
                  className={`form-input${error ? " error-field" : ""}`}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  required
                  autoComplete="current-password"
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  className="pass-toggle"
                  onClick={() => setShowPass(!showPass)}
                  tabIndex={-1}
                >
                  {showPass ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <><div className="spinner" /> Memverifikasi...</>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/>
                  </svg>
                  Masuk ke Dasbor
                </>
              )}
            </button>

          </form>

          <div className="divider"><span>aman & terenkripsi</span></div>

          <div className="security-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            Akses terbatas untuk administrator yang berwenang
          </div>

        </div>

        {/* BACK TO HOME */}
        <a href="/" className="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Kembali ke halaman utama
        </a>

      </div>
    </main>
  );
}