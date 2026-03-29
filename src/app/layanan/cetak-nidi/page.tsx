"use client";

import Link from "next/link";
import { useState } from "react";

export default function CetakNidi() {
  const [nidi, setNidi] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found" | "notfound">("idle");
  const [certificateData, setCertificateData] = useState<any>(null);

  const handleCetak = async (e: any) => {
    e.preventDefault();
    if (!nidi.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch(`/api/nidi/search?number=${encodeURIComponent(nidi)}`);
      const data = await res.json();
      if (res.ok && data) {
        setCertificateData(data);
        setStatus("found");
      } else {
        setCertificateData(null);
        setStatus("notfound");
      }
    } catch (error) {
      console.error("Search error:", error);
      setStatus("notfound");
    }
  };

  const handlePrint = () => window.print();

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#F4F6FB", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --blue-deep: #0B2B6B;
          --blue-mid:  #1A47A0;
          --blue-light:#2563EB;
          --yellow:    #F5C100;
          --yellow-dark:#D4A200;
          --gray-soft: #F4F6FB;
          --gray-text: #4A5568;
        }

        /* ══════════════════════════
           HERO — same as Alur page
           ══════════════════════════ */
        .cn-hero {
          background: var(--blue-deep);
          position: relative;
          overflow: hidden;
          padding: 100px 48px 80px;
        }
        .cn-hero::before {
          content: '';
          position: absolute; top: -120px; right: -80px;
          width: 480px; height: 480px; border-radius: 50%;
          background: radial-gradient(circle, rgba(245,193,0,.14) 0%, transparent 70%);
        }
        .cn-hero::after {
          content: '';
          position: absolute; bottom: -60px; left: 5%;
          width: 300px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,.22) 0%, transparent 70%);
        }
        /* Grid overlay — same as Alur */
        .cn-grid-overlay {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 44px 44px;
          pointer-events: none;
        }

        .cn-hero-inner {
          max-width: 860px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* Back button — same as Alur */
        .cn-back {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem; font-weight: 500;
          color: rgba(255,255,255,.6);
          text-decoration: none;
          border: 1px solid rgba(255,255,255,.2);
          padding: 7px 14px;
          border-radius: 8px;
          margin-bottom: 32px;
          transition: color .2s, border-color .2s, background .2s;
        }
        .cn-back:hover {
          color: var(--yellow);
          border-color: rgba(245,193,0,.4);
          background: rgba(245,193,0,.07);
        }
        .cn-back svg { width: 14px; height: 14px; }

        /* Page tag pill — same as Alur */
        .cn-page-tag {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(245,193,0,.15);
          border: 1px solid rgba(245,193,0,.35);
          color: var(--yellow);
          padding: 6px 16px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: .1em; text-transform: uppercase;
          margin-bottom: 22px;
        }
        .cn-page-tag svg { width: 13px; height: 13px; }

        /* Hero title */
        .cn-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 900; color: white; line-height: 1.12; margin-bottom: 16px;
        }
        .cn-hero-title em { font-style: italic; color: var(--yellow); }

        /* Hero desc */
        .cn-hero-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem; color: rgba(255,255,255,.6);
          font-weight: 300; line-height: 1.8; max-width: 480px;
        }

        /* Hero bottom badges */
        .cn-hero-badges {
          display: flex; gap: 10px; margin-top: 28px; flex-wrap: wrap;
        }
        .cn-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.12);
          padding: 7px 14px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: .75rem; font-weight: 500; color: rgba(255,255,255,.7);
        }
        .cn-badge svg { width: 13px; height: 13px; color: var(--yellow); }

        /* ══════════════════
           MAIN CONTENT
           ══════════════════ */
        .cn-main {
          max-width: 860px;
          margin: 0 auto;
          padding: 40px 24px 80px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* ── SEARCH CARD ── */
        .cn-search-card {
          background: white;
          border-radius: 20px;
          border: 1px solid rgba(26,71,160,.08);
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(11,43,107,.06);
        }
        .cn-search-header {
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          padding: 20px 28px;
          display: flex; align-items: center; gap: 12px;
        }
        .cn-search-header-icon {
          width: 40px; height: 40px; background: var(--yellow);
          border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .cn-search-header-icon svg { width: 20px; height: 20px; color: var(--blue-deep); }
        .cn-search-header-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 700; color: white; margin-bottom: 2px;
        }
        .cn-search-header-sub { font-size: .72rem; color: rgba(255,255,255,.5); }

        .cn-search-body { padding: 28px; }
        .cn-search-body p {
          font-size: .88rem; color: var(--gray-text); margin: 0 0 20px;
          font-weight: 300; line-height: 1.6;
        }
        .cn-input-row {
          display: flex; gap: 12px;
        }
        .cn-nidi-input {
          flex: 1;
          padding: 13px 18px;
          border-radius: 11px;
          border: 1.5px solid rgba(26,71,160,.13);
          background: var(--gray-soft);
          font-family: 'DM Sans', sans-serif;
          font-size: .95rem; color: var(--blue-deep);
          outline: none;
          letter-spacing: .04em;
          transition: border-color .2s, background .2s, box-shadow .2s;
          box-sizing: border-box;
        }
        .cn-nidi-input:focus {
          border-color: var(--blue-light);
          background: white;
          box-shadow: 0 0 0 3px rgba(37,99,235,.1);
        }
        .cn-nidi-input::placeholder { color: #9CA3AF; font-weight: 300; letter-spacing: 0; }
        .cn-submit-btn {
          display: flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          color: white; border: none;
          padding: 0 24px; border-radius: 11px;
          font-family: 'DM Sans', sans-serif;
          font-size: .9rem; font-weight: 600;
          cursor: pointer; white-space: nowrap;
          transition: opacity .2s, transform .2s, box-shadow .2s;
        }
        .cn-submit-btn:hover { opacity: .9; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(11,43,107,.2); }
        .cn-submit-btn:disabled { opacity: .6; cursor: not-allowed; transform: none; }
        .cn-submit-btn svg { width: 16px; height: 16px; }

        /* Loading shimmer */
        .cn-loading {
          background: white; border-radius: 20px;
          border: 1px solid rgba(26,71,160,.08);
          padding: 48px 28px;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
          box-shadow: 0 4px 24px rgba(11,43,107,.06);
        }
        .cn-spinner {
          width: 44px; height: 44px; border-radius: 50%;
          border: 3px solid rgba(26,71,160,.1);
          border-top-color: var(--blue-mid);
          animation: cnSpin .8s linear infinite;
        }
        @keyframes cnSpin { to { transform: rotate(360deg); } }
        .cn-loading-text {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; color: var(--blue-deep); font-weight: 700;
        }
        .cn-loading-sub { font-size: .82rem; color: var(--gray-text); font-weight: 300; }

        /* ── RESULT CARD ── */
        .cn-result-card {
          background: white; border-radius: 20px; overflow: hidden;
          border: 1px solid rgba(26,71,160,.08);
          box-shadow: 0 8px 40px rgba(11,43,107,.1);
          animation: cnFadeUp .35s ease;
        }
        @keyframes cnFadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

        .cn-result-header {
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          padding: 24px 30px;
          display: flex; justify-content: space-between; align-items: center; gap: 16px;
          flex-wrap: wrap;
        }
        .cn-result-number-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .65rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .12em;
          color: rgba(255,255,255,.4); margin-bottom: 4px;
        }
        .cn-result-number {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 700; color: white; letter-spacing: .02em;
        }
        .cn-result-status {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(16,185,129,.15);
          border: 1px solid rgba(16,185,129,.3);
          color: #34D399;
          padding: 8px 16px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: .75rem; font-weight: 600; white-space: nowrap;
        }
        .cn-status-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #34D399;
          box-shadow: 0 0 0 2px rgba(52,211,153,.3);
          animation: cnPulse 2s ease-in-out infinite;
        }
        @keyframes cnPulse { 0%,100%{opacity:1} 50%{opacity:.4} }

        /* Document preview area */
        .cn-doc-preview {
          padding: 28px;
          background: #F0F2F7;
          border-bottom: 1px solid rgba(26,71,160,.07);
        }
        .cn-doc-paper {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(11,43,107,.12);
          border: 1px solid rgba(26,71,160,.06);
        }
        .cn-sertifikat-img {
          width: 100%; height: auto;
          display: block;
          border-bottom: 1px solid rgba(26,71,160,.07);
        }

        /* Info grid inside paper */
        .cn-doc-info {
          padding: 24px 28px;
        }
        .cn-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          border-top: 2px solid var(--yellow);
          padding-top: 20px;
          margin-top: 0;
        }
        .cn-info-item {}
        .cn-info-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em;
          color: #9CA3AF; margin-bottom: 4px;
        }
        .cn-info-value {
          font-family: 'DM Sans', sans-serif;
          font-size: .9rem; font-weight: 600; color: var(--blue-deep);
        }
        .cn-info-value.valid { color: #059669; }

        .cn-doc-footer {
          padding: 14px 28px;
          background: var(--gray-soft);
          border-top: 1px solid rgba(26,71,160,.06);
          font-size: .72rem; color: #9CA3AF; text-align: center;
          font-weight: 300;
        }

        /* Print actions */
        .cn-print-actions {
          display: flex; gap: 12px;
          justify-content: center; flex-wrap: wrap;
          padding: 24px 28px;
          background: white;
        }
        .cn-btn-print {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--yellow); color: var(--blue-deep);
          border: none; padding: 12px 24px; border-radius: 11px;
          font-family: 'DM Sans', sans-serif;
          font-size: .9rem; font-weight: 600; cursor: pointer;
          transition: transform .2s, box-shadow .2s;
        }
        .cn-btn-print:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(245,193,0,.35); }
        .cn-btn-print svg { width: 16px; height: 16px; }
        .cn-btn-download {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          color: white; text-decoration: none;
          padding: 12px 24px; border-radius: 11px;
          font-family: 'DM Sans', sans-serif;
          font-size: .9rem; font-weight: 600;
          transition: opacity .2s, transform .2s;
        }
        .cn-btn-download:hover { opacity: .9; transform: translateY(-1px); }
        .cn-btn-download svg { width: 16px; height: 16px; }

        /* ── NOT FOUND ── */
        .cn-notfound {
          background: white; border-radius: 20px;
          border: 1px solid rgba(239,68,68,.15);
          box-shadow: 0 4px 24px rgba(239,68,68,.06);
          padding: 52px 40px; text-align: center;
          animation: cnFadeUp .3s ease;
        }
        .cn-notfound-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: #FEF2F2;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
        }
        .cn-notfound-icon svg { width: 32px; height: 32px; color: #EF4444; }
        .cn-notfound-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem; font-weight: 700; color: #B91C1C; margin-bottom: 10px;
        }
        .cn-notfound-desc {
          font-size: .88rem; color: var(--gray-text); font-weight: 300;
          line-height: 1.7; max-width: 400px; margin: 0 auto 24px;
        }
        .cn-btn-retry {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--gray-soft);
          border: 1.5px solid rgba(26,71,160,.12);
          color: var(--blue-deep);
          padding: 11px 22px; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: .88rem; font-weight: 600; cursor: pointer;
          transition: background .2s;
        }
        .cn-btn-retry:hover { background: #E8ECF4; }
        .cn-btn-retry svg { width: 14px; height: 14px; }

        /* ── INFO STRIP ── */
        .cn-info-strip {
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          border-radius: 20px; padding: 28px 32px;
          display: grid; grid-template-columns: repeat(3,1fr); gap: 20px;
        }
        .cn-strip-item { display: flex; align-items: center; gap: 12px; }
        .cn-strip-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(255,255,255,.1);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .cn-strip-icon svg { width: 18px; height: 18px; color: var(--yellow); }
        .cn-strip-label {
          font-size: .68rem; text-transform: uppercase;
          letter-spacing: .08em; color: rgba(255,255,255,.4); margin-bottom: 3px;
        }
        .cn-strip-value {
          font-family: 'DM Sans', sans-serif;
          font-size: .88rem; font-weight: 600; color: white;
        }

        /* ══════════════════
           RESPONSIVE
           ══════════════════ */
        @media (max-width: 640px) {
          .cn-hero { padding: 80px 24px 60px; }
          .cn-hero-title { font-size: 1.8rem; }
          .cn-main { padding: 24px 16px 60px; gap: 16px; }
          .cn-input-row { flex-direction: column; }
          .cn-submit-btn { padding: 13px; justify-content: center; }
          .cn-search-body { padding: 20px 16px; }
          .cn-search-header { padding: 16px 20px; }
          .cn-result-header { padding: 18px 20px; }
          .cn-doc-preview { padding: 16px; }
          .cn-doc-info { padding: 18px 16px; }
          .cn-info-grid { grid-template-columns: 1fr; gap: 14px; }
          .cn-print-actions { padding: 18px 16px; flex-direction: column; }
          .cn-btn-print, .cn-btn-download { justify-content: center; }
          .cn-info-strip { grid-template-columns: 1fr; padding: 20px; gap: 14px; }
          .cn-notfound { padding: 36px 20px; }
          .cn-hero-badges { gap: 8px; }
        }

        /* Print styles */
        @media print {
          body { background: white; }
          .cn-hero, .cn-search-card, .cn-print-actions, .cn-info-strip, .cn-back { display: none !important; }
          .cn-main { padding: 0; margin: 0; max-width: 100%; }
          .cn-result-card { box-shadow: none; border: none; border-radius: 0; }
          .cn-doc-preview { padding: 0; background: white; }
          .cn-doc-paper { box-shadow: none; border: none; border-radius: 0; }
          .cn-result-header { background: none; color: black; }
          .cn-result-number, .cn-result-number-label { color: black; }
          .cn-notfound { display: none; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <section className="cn-hero">
        <div className="cn-grid-overlay" />
        <div className="cn-hero-inner">
          <Link href="/layanan" className="cn-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            Kembali ke Layanan
          </Link>

          <div className="cn-page-tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
            </svg>
            Layanan Digital NIDI
          </div>

          <h1 className="cn-hero-title">
            Cetak <em>NIDI</em> Resmi<br/>Kapan Saja
          </h1>

          <p className="cn-hero-desc">
            Masukkan nomor NIDI Anda untuk mengakses dan mencetak sertifikat instalasi listrik yang telah terverifikasi secara resmi oleh Kementerian ESDM.
          </p>

          <div className="cn-hero-badges">
            <span className="cn-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              Terverifikasi Resmi
            </span>
            <span className="cn-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              Data Aman & Terenkripsi
            </span>
            <span className="cn-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
              </svg>
              Siap Cetak PDF
            </span>
          </div>
        </div>
      </section>

      <div className="cn-main">

        {/* ── SEARCH CARD ── */}
        <div className="cn-search-card">
          <div className="cn-search-header">
            <div className="cn-search-header-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <div>
              <div className="cn-search-header-title">Pencarian Sertifikat NIDI</div>
              <div className="cn-search-header-sub">Masukkan nomor NIDI untuk melihat dokumen</div>
            </div>
          </div>
          <div className="cn-search-body">
            <p>Masukkan nomor NIDI Anda dengan format yang benar. Contoh: <strong style={{ color: "var(--blue-deep)", fontWeight: 600 }}>NIDI-2026-0001</strong></p>
            <form onSubmit={handleCetak} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <div className="cn-input-row">
                <input
                  type="text"
                  className="cn-nidi-input"
                  placeholder="Nomor NIDI..."
                  value={nidi}
                  onChange={(e) => { setNidi(e.target.value.toUpperCase()); setStatus("idle"); }}
                  required
                />
                <button type="submit" className="cn-submit-btn" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "cnSpin .8s linear infinite" }}>
                        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                      </svg>
                      Mencari...
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                      Cari Data
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── LOADING ── */}
        {status === "loading" && (
          <div className="cn-loading">
            <div className="cn-spinner" />
            <div className="cn-loading-text">Mencari sertifikat...</div>
            <div className="cn-loading-sub">Mohon tunggu, sedang memverifikasi nomor NIDI Anda</div>
          </div>
        )}

        {/* ── RESULT: FOUND ── */}
        {status === "found" && certificateData && (
          <div className="cn-result-card">
            <div className="cn-result-header">
              <div>
                <div className="cn-result-number-label">Nomor NIDI</div>
                <div className="cn-result-number">{certificateData.nidiNumber}</div>
              </div>
              <div className="cn-result-status">
                <span className="cn-status-dot" />
                AKTIF & VALID
              </div>
            </div>

            <div className="cn-doc-preview">
              <div className="cn-doc-paper">
                <img
                  src={certificateData.fileUrl}
                  alt="Sertifikat NIDI"
                  className="cn-sertifikat-img"
                />
                <div className="cn-doc-info">
                  <div className="cn-info-grid">
                    <div className="cn-info-item">
                      <div className="cn-info-label">Nama Pemilik</div>
                      <div className="cn-info-value">{certificateData.ownerName}</div>
                    </div>
                    <div className="cn-info-item">
                      <div className="cn-info-label">Status Verifikasi</div>
                      <div className="cn-info-value valid">{certificateData.status}</div>
                    </div>
                    <div className="cn-info-item">
                      <div className="cn-info-label">Jenis Bangunan</div>
                      <div className="cn-info-value">{certificateData.buildingType}</div>
                    </div>
                    <div className="cn-info-item">
                      <div className="cn-info-label">Daya Terpasang</div>
                      <div className="cn-info-value">{certificateData.capacity} VA</div>
                    </div>
                  </div>
                </div>
                <div className="cn-doc-footer">
                  Dicetak secara resmi melalui sistem PT FORTUNA SOLUSI GROUP &nbsp;·&nbsp; {new Date().toLocaleString("id-ID")}
                </div>
              </div>
            </div>

            <div className="cn-print-actions">
              <button className="cn-btn-print" onClick={handlePrint}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                </svg>
                Cetak Sertifikat
              </button>
              <a
                href={certificateData.fileUrl}
                download={`NIDI-${certificateData.ownerName}.jpg`}
                className="cn-btn-download"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Download Gambar
              </a>
            </div>
          </div>
        )}

        {/* ── NOT FOUND ── */}
        {status === "notfound" && (
          <div className="cn-notfound">
            <div className="cn-notfound-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="cn-notfound-title">NIDI Tidak Ditemukan</div>
            <div className="cn-notfound-desc">
              Nomor <strong style={{ color: "var(--blue-deep)" }}>{nidi}</strong> belum terdaftar dalam sistem kami. Pastikan nomor sudah benar atau hubungi admin untuk bantuan.
            </div>
            <button className="cn-btn-retry" onClick={() => { setStatus("idle"); setNidi(""); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Coba Lagi
            </button>
          </div>
        )}

        {/* ── INFO STRIP ── */}
        <div className="cn-info-strip">
          {([
            { label: "Telepon", value: "0812-8813-1149", icon: <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/> },
            { label: "Email",   value: "info@nidi-slo.com",  icon: <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/> },
            { label: "Jam Layanan", value: "Senin–Sabtu 08.00–17.00", icon: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/> },
          ] as any[]).map(({ label, value, icon }) => (
            <div className="cn-strip-item" key={label}>
              <div className="cn-strip-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{icon}</svg>
              </div>
              <div>
                <div className="cn-strip-label">{label}</div>
                <div className="cn-strip-value">{value}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}