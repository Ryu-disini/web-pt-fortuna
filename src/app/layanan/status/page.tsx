"use client";

import Link from "next/link";
import { useState } from "react";

type StatusType = "idle" | "loading" | "proses" | "selesai" | "ditolak" | "notfound";

const statusConfig: Record<string, {
  label: string; color: string; bg: string; border: string;
  icon: React.ReactNode; step: number;
}> = {
  proses: {
    label: "Sedang Diproses", color: "#D97706", bg: "#FFFBEB", border: "#FCD34D",
    step: 2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  selesai: {
    label: "Sertifikat Terbit", color: "#059669", bg: "#ECFDF5", border: "#6EE7B7",
    step: 4,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  ditolak: {
    label: "Perlu Revisi", color: "#DC2626", bg: "#FEF2F2", border: "#FCA5A5",
    step: 2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
      </svg>
    ),
  },
};

// Simulate: regs ending in odd → proses, even → selesai, short → notfound
function mockLookup(reg: string): StatusType {
  if (reg.length < 5) return "notfound";
  const last = parseInt(reg.slice(-1));
  if (isNaN(last)) return "proses";
  if (last % 3 === 0) return "selesai";
  if (last % 3 === 1) return "proses";
  return "ditolak";
}

const steps = ["Pengajuan Diterima", "Verifikasi Dokumen", "Inspeksi Lapangan", "Sertifikat Terbit"];

export default function Status() {
  const [reg, setReg] = useState("");
  const [status, setStatus] = useState<StatusType>("idle");
  const [submittedReg, setSubmittedReg] = useState("");

  const handleCek = (e: any) => {
    e.preventDefault();
    if (!reg.trim()) return;
    setStatus("loading");
    setSubmittedReg(reg.toUpperCase());
    setTimeout(() => setStatus(mockLookup(reg)), 1500);
  };

  const cfg = status !== "idle" && status !== "loading" && status !== "notfound"
    ? statusConfig[status] : null;

  return (
    <main style={{ fontFamily: "'Georgia', serif", background: "#F4F6FB", overflowX: "hidden", minHeight: "100vh" }}>

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

        /* HERO */
        .status-hero {
          background: var(--blue-deep);
          position: relative; overflow: hidden;
          padding: 100px 48px 80px;
        }
        .status-hero::before {
          content: '';
          position: absolute; top: -120px; right: -80px;
          width: 480px; height: 480px; border-radius: 50%;
          background: radial-gradient(circle, rgba(245,193,0,0.14) 0%, transparent 70%);
        }
        .status-hero::after {
          content: '';
          position: absolute; bottom: -60px; left: 5%;
          width: 300px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 70%);
        }
        .grid-overlay {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 44px 44px;
        }
        .hero-inner {
          max-width: 860px; margin: 0 auto;
          position: relative; z-index: 2;
        }
        .back-btn {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; font-weight: 500;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 7px 14px; border-radius: 8px;
          margin-bottom: 28px;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .back-btn:hover {
          color: var(--yellow); border-color: rgba(245,193,0,0.4);
          background: rgba(245,193,0,0.07);
        }
        .back-btn svg { width: 14px; height: 14px; }
        .page-tag {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(245,193,0,0.15);
          border: 1px solid rgba(245,193,0,0.35);
          color: var(--yellow); padding: 6px 16px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 22px;
        }
        .page-tag svg { width: 13px; height: 13px; }
        .status-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900; color: #fff;
          line-height: 1.12; margin-bottom: 14px;
        }
        .status-hero h1 em { font-style: italic; color: var(--yellow); }
        .status-hero p {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.6); font-size: 1rem;
          line-height: 1.8; font-weight: 300; max-width: 480px;
        }

        /* MAIN */
        .status-main {
          max-width: 860px; margin: 0 auto;
          padding: 52px 48px 80px;
          display: flex; flex-direction: column; gap: 24px;
        }

        /* FORM CARD */
        .form-card {
          background: white; border-radius: 20px;
          border: 1px solid rgba(26,71,160,0.08);
          padding: 36px 40px;
          box-shadow: 0 4px 28px rgba(11,43,107,0.07);
        }
        .form-card-header {
          display: flex; align-items: center; gap: 14px; margin-bottom: 28px;
        }
        .form-header-icon {
          width: 52px; height: 52px;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
        }
        .form-header-icon svg { width: 26px; height: 26px; color: var(--yellow); }
        .form-header-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem; font-weight: 700; color: var(--blue-deep); margin-bottom: 3px;
        }
        .form-header-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; color: var(--gray-text); font-weight: 300;
        }

        /* INPUT */
        .input-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem; font-weight: 600;
          color: var(--blue-deep); letter-spacing: 0.03em;
          margin-bottom: 8px; display: block;
        }
        .input-label span { color: var(--yellow-dark); }
        .input-row { display: flex; gap: 12px; }
        .field-wrap { position: relative; flex: 1; }
        .field-wrap svg {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%);
          width: 18px; height: 18px; color: #9CA3AF;
          pointer-events: none; transition: color 0.2s;
        }
        .field-wrap:focus-within svg { color: var(--blue-mid); }
        .reg-input {
          width: 100%; padding: 14px 16px 14px 46px;
          border-radius: 12px;
          border: 1.5px solid rgba(26,71,160,0.14);
          background: var(--gray-soft);
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem; font-weight: 500;
          color: var(--blue-deep); letter-spacing: 0.06em;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .reg-input:focus {
          border-color: var(--blue-light); background: white;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }
        .reg-input::placeholder { color: #9CA3AF; font-weight: 300; letter-spacing: 0; }
        .submit-btn {
          display: flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          color: white; border: none; border-radius: 12px;
          padding: 14px 24px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem; font-weight: 600;
          cursor: pointer; white-space: nowrap;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .submit-btn:hover {
          opacity: 0.9; transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(11,43,107,0.22);
        }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .submit-btn svg { width: 17px; height: 17px; }
        .input-hint {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.76rem; color: var(--gray-text);
          font-weight: 300; margin-top: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .input-hint svg { width: 13px; height: 13px; color: #9CA3AF; flex-shrink: 0; }

        /* SPINNER */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 17px; height: 17px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite; flex-shrink: 0;
        }

        /* RESULT FADE */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.4s ease; }

        /* STATUS CARD */
        .result-card {
          background: white; border-radius: 20px;
          border: 1px solid rgba(26,71,160,0.08);
          overflow: hidden;
          box-shadow: 0 4px 28px rgba(11,43,107,0.07);
        }

        .result-header {
          background: linear-gradient(90deg, var(--blue-deep), var(--blue-mid));
          padding: 20px 32px;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
        }
        .result-header-left {
          display: flex; align-items: center; gap: 12px;
        }
        .result-reg-icon {
          width: 40px; height: 40px;
          background: var(--yellow); border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .result-reg-icon svg { width: 20px; height: 20px; color: var(--blue-deep); }
        .result-reg-key {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem; text-transform: uppercase;
          letter-spacing: 0.1em; color: rgba(255,255,255,0.5); margin-bottom: 2px;
        }
        .result-reg-val {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem; font-weight: 700; color: white; letter-spacing: 0.04em;
        }

        /* PROGRESS STEPS */
        .steps-wrap { padding: 32px 36px; }
        .steps-track {
          display: grid; grid-template-columns: repeat(4, 1fr);
          position: relative; gap: 0;
          margin-bottom: 32px;
        }
        .steps-line {
          position: absolute;
          top: 22px; left: 11%; right: 11%; height: 2px;
          background: rgba(26,71,160,0.1); z-index: 0;
        }
        .steps-line-fill {
          height: 100%; background: linear-gradient(90deg, var(--blue-deep), var(--yellow));
          transition: width 0.6s ease;
        }
        .step-node {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; gap: 10px; position: relative; z-index: 1;
        }
        .step-circle {
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s;
        }
        .step-circle.done {
          background: var(--blue-deep); border: 2px solid var(--blue-deep);
        }
        .step-circle.active {
          background: var(--yellow); border: 2px solid var(--yellow);
        }
        .step-circle.pending {
          background: white; border: 2px solid rgba(26,71,160,0.15);
        }
        .step-circle svg { width: 18px; height: 18px; }
        .step-circle.done svg { color: white; }
        .step-circle.active svg { color: var(--blue-deep); }
        .step-circle.pending svg { color: #CBD5E0; }
        .step-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem; font-weight: 500; line-height: 1.4;
        }
        .step-label.done { color: var(--blue-deep); font-weight: 600; }
        .step-label.active { color: var(--yellow-dark); font-weight: 600; }
        .step-label.pending { color: #CBD5E0; }

        /* STATUS BANNER */
        .status-banner {
          border-radius: 12px; padding: 18px 22px;
          display: flex; align-items: center; gap: 14px;
          border-width: 1px; border-style: solid;
        }
        .status-banner-icon {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .status-banner-icon svg { width: 20px; height: 20px; }
        .status-banner-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem; font-weight: 600; margin-bottom: 3px;
        }
        .status-banner-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; font-weight: 300; line-height: 1.6; opacity: 0.75;
        }

        /* DETAIL ROWS */
        .detail-rows {
          border-top: 1px solid rgba(26,71,160,0.06);
          padding: 24px 36px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }
        .detail-field-key {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.09em;
          color: var(--gray-text); margin-bottom: 4px;
        }
        .detail-field-val {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; font-weight: 500; color: var(--blue-deep);
        }

        /* NOT FOUND */
        .notfound-card {
          background: white; border-radius: 20px;
          border: 1px solid rgba(239,68,68,0.15);
          padding: 48px 40px; text-align: center;
          box-shadow: 0 4px 28px rgba(11,43,107,0.05);
        }
        .notfound-icon {
          width: 72px; height: 72px;
          background: #FEF2F2; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
        }
        .notfound-icon svg { width: 34px; height: 34px; color: #F87171; }
        .notfound-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem; font-weight: 700; color: var(--blue-deep); margin-bottom: 8px;
        }
        .notfound-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; color: var(--gray-text); font-weight: 300; line-height: 1.7;
        }
        .notfound-actions {
          display: flex; gap: 12px; justify-content: center; margin-top: 24px;
        }

        /* BUTTONS */
        .btn-blue {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--blue-deep); color: white;
          padding: 11px 22px; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 600;
          border: none; cursor: pointer; text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-blue:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(11,43,107,0.22); }
        .btn-blue svg { width: 15px; height: 15px; }
        .btn-yellow {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--yellow); color: var(--blue-deep);
          padding: 11px 22px; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 600;
          border: none; cursor: pointer; text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-yellow:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(245,193,0,0.35); }
        .btn-yellow svg { width: 15px; height: 15px; }

        /* INFO CARDS */
        .info-row {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
        }
        .info-card {
          background: white; border-radius: 14px;
          border: 1px solid rgba(26,71,160,0.08);
          padding: 20px; display: flex; gap: 12px; align-items: flex-start;
        }
        .info-icon {
          width: 38px; height: 38px; flex-shrink: 0;
          border-radius: 9px; display: flex; align-items: center; justify-content: center;
        }
        .info-icon svg { width: 19px; height: 19px; }
        .info-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.84rem; font-weight: 600; color: var(--blue-deep); margin-bottom: 3px;
        }
        .info-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.76rem; color: var(--gray-text); font-weight: 300; line-height: 1.6;
        }

        @media (max-width: 768px) {
          .status-hero { padding: 80px 24px 60px; }
          .status-main { padding: 36px 24px 60px; }
          .form-card { padding: 24px; }
          .input-row { flex-direction: column; }
          .submit-btn { width: 100%; justify-content: center; }
          .steps-track { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .steps-line { display: none; }
          .steps-wrap { padding: 24px 20px; }
          .detail-rows { grid-template-columns: 1fr; padding: 20px; }
          .info-row { grid-template-columns: 1fr; }
          .notfound-actions { flex-direction: column; align-items: center; }
          .result-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="status-hero">
        <div className="grid-overlay" />
        <div className="hero-inner">

          <Link href="/layanan" className="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            Kembali ke Layanan
          </Link>

          {/* <div className="page-tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
            </svg>
            Cek Status
          </div> */}

          <h1>Status <em>Pendaftaran</em><br />NIDI</h1>
          <p>
            Pantau progres pengajuan sertifikat Anda secara real-time.
            Masukkan nomor registrasi yang diberikan saat pendaftaran.
          </p>

        </div>
      </section>

      {/* ── MAIN ── */}
      <div className="status-main">

        {/* FORM */}
        <div className="form-card">
          <div className="form-card-header">
            <div className="form-header-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <div>
              <div className="form-header-title">Lacak Pengajuan Anda</div>
              <div className="form-header-sub">Masukkan nomor registrasi yang tercantum di bukti pendaftaran</div>
            </div>
          </div>

          <form onSubmit={handleCek}>
            <label className="input-label">Nomor Registrasi <span>*</span></label>
            <div className="input-row">
              <div className="field-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <input
                  type="text"
                  className="reg-input"
                  placeholder="Contoh: REG-2024-XXXXXX"
                  value={reg}
                  onChange={(e) => { setReg(e.target.value.toUpperCase()); setStatus("idle"); }}
                  required
                />
              </div>
              <button type="submit" className="submit-btn" disabled={status === "loading"}>
                {status === "loading"
                  ? <><div className="spinner" />Mencari...</>
                  : <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                      Cek Status
                    </>
                }
              </button>
            </div>
            <div className="input-hint">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Nomor registrasi dikirimkan ke email Anda saat pendaftaran selesai.
            </div>
          </form>
        </div>

        {/* ── RESULT: FOUND ── */}
        {cfg && (
          <div className="result-card fade-up">
            {/* header */}
            <div className="result-header">
              <div className="result-header-left">
                <div className="result-reg-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <div>
                  <div className="result-reg-key">Nomor Registrasi</div>
                  <div className="result-reg-val">{submittedReg}</div>
                </div>
              </div>
              {/* status badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: cfg.bg, border: `1px solid ${cfg.border}`,
                color: cfg.color, padding: "7px 14px", borderRadius: 100,
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.76rem", fontWeight: 600,
                whiteSpace: "nowrap",
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.color, display: "inline-block" }} />
                {cfg.label}
              </div>
            </div>

            {/* STEPS */}
            <div className="steps-wrap">
              <div className="steps-track">
                <div className="steps-line">
                  <div className="steps-line-fill" style={{ width: `${((cfg.step - 1) / 3) * 100}%` }} />
                </div>
                {steps.map((label, i) => {
                  const stepNum = i + 1;
                  const state = stepNum < cfg.step ? "done" : stepNum === cfg.step ? "active" : "pending";
                  return (
                    <div className="step-node" key={label}>
                      <div className={`step-circle ${state}`}>
                        {state === "done"
                          ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
                          : state === "active"
                            ? cfg.icon
                            : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/></svg>
                        }
                      </div>
                      <div className={`step-label ${state}`}>{label}</div>
                    </div>
                  );
                })}
              </div>

              {/* status banner */}
              <div className="status-banner" style={{ background: cfg.bg, borderColor: cfg.border }}>
                <div className="status-banner-icon" style={{ background: cfg.color + "22" }}>
                  <span style={{ color: cfg.color }}>{cfg.icon}</span>
                </div>
                <div>
                  <div className="status-banner-title" style={{ color: cfg.color }}>{cfg.label}</div>
                  <div className="status-banner-desc" style={{ color: cfg.color }}>
                    {status === "proses" && "Pengajuan Anda sedang dalam tahap verifikasi dan inspeksi lapangan oleh tim teknisi kami."}
                    {status === "selesai" && "Selamat! Sertifikat NIDI Anda telah diterbitkan dan siap digunakan untuk pengajuan ke PLN."}
                    {status === "ditolak" && "Terdapat kekurangan pada dokumen atau instalasi. Tim kami akan menghubungi Anda untuk revisi."}
                  </div>
                </div>
              </div>
            </div>

            {/* DETAIL */}
            <div className="detail-rows">
              {[
                { key: "Jenis Pengajuan", val: "NIDI" },
                { key: "Tanggal Pengajuan", val: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) },
                { key: "Estimasi Selesai", val: status === "selesai" ? "Selesai" : "3–7 Hari Kerja" },
                { key: "Petugas", val: "Tim Verifikasi NIDI" },
              ].map(({ key, val }) => (
                <div key={key}>
                  <div className="detail-field-key">{key}</div>
                  <div className="detail-field-val">{val}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULT: NOT FOUND ── */}
        {status === "notfound" && (
          <div className="notfound-card fade-up">
            <div className="notfound-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="notfound-title">Nomor Registrasi Tidak Ditemukan</div>
            <div className="notfound-desc">
              Nomor <strong style={{ color: "var(--blue-deep)" }}>{submittedReg}</strong> tidak ada dalam sistem kami.<br />
              Pastikan nomor sudah benar, atau hubungi tim kami untuk bantuan.
            </div>
            <div className="notfound-actions">
              <button className="btn-yellow" onClick={() => { setReg(""); setStatus("idle"); }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Coba Lagi
              </button>
              <Link href="/kontak" className="btn-blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                Hubungi Kami
              </Link>
            </div>
          </div>
        )}

        {/* INFO CARDS */}
        <div className="info-row">
          {[
            {
              bg: "rgba(11,43,107,0.06)", iconColor: "var(--blue-mid)",
              icon: <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>,
              title: "Di mana nomor registrasi?",
              desc: "Nomor registrasi dikirim ke email Anda segera setelah pengajuan diterima oleh tim kami.",
            },
            {
              bg: "rgba(245,193,0,0.1)", iconColor: "var(--yellow-dark)",
              icon: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>,
              title: "Berapa lama prosesnya?",
              desc: "Rata-rata 3–7 hari kerja dari pengajuan hingga sertifikat diterbitkan secara resmi.",
            },
            {
              bg: "rgba(16,185,129,0.08)", iconColor: "#059669",
              icon: <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>,
              title: "Butuh bantuan?",
              desc: "Hubungi tim kami via WhatsApp atau email jika ada kendala dalam pengecekan status.",
            },
          ].map(({ bg, iconColor, icon, title, desc }) => (
            <div className="info-card" key={title}>
              <div className="info-icon" style={{ background: bg }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.8">{icon}</svg>
              </div>
              <div>
                <div className="info-title">{title}</div>
                <div className="info-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}