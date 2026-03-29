import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Konsultasi",
    desc: "Hubungi tim kami untuk konsultasi kebutuhan instalasi listrik. Kami akan memandu Anda menentukan jenis layanan yang tepat sesuai daya dan jenis bangunan.",
    detail: ["Konsultasi gratis via WhatsApp atau telepon", "Analisis kebutuhan daya listrik", "Rekomendasi jenis sertifikasi yang diperlukan"],
    duration: "1 Hari",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Pengajuan Data",
    desc: "Kirimkan dokumen yang dibutuhkan untuk proses pendaftaran. Pastikan semua berkas lengkap agar proses dapat berjalan lancar tanpa penundaan.",
    detail: ["KTP pemilik bangunan", "Denah / gambar instalasi listrik", "Surat kepemilikan atau sewa bangunan"],
    duration: "1–2 Hari",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Proses Verifikasi",
    desc: "Tim teknisi bersertifikat kami akan melakukan verifikasi dan inspeksi instalasi listrik di lokasi untuk memastikan semua sesuai standar keamanan nasional.",
    detail: ["Inspeksi instalasi oleh teknisi bersertifikat", "Pengujian keamanan sistem kelistrikan", "Pengajuan ke sistem ESDM secara resmi"],
    duration: "3–5 Hari",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Sertifikat Terbit",
    desc: "NIDI diterbitkan secara resmi oleh Kementerian ESDM. Dokumen dapat langsung digunakan untuk pengajuan sambungan listrik ke PLN.",
    detail: ["Penerbitan NIDI secara resmi"],
    duration: "1–2 Hari",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
      </svg>
    ),
  },
];

const docs = [
  { label: "KTP Pemilik Bangunan", icon: <path d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2"/> },
  { label: "Denah Instalasi Listrik", icon: <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/> },
  { label: "Surat Kepemilikan / Sewa", icon: <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/> },
  { label: "Data Teknis Instalasi", icon: <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"/> },
];

export default function Alur() {
  return (
    <main style={{ fontFamily: "'Georgia', serif", background: "#F4F6FB", overflowX: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --blue-deep: #0B2B6B;
          --blue-mid: #1A47A0;
          --blue-light: #2563EB;
          --yellow: #F5C100;
          --yellow-dark: #D4A200;
          --white: #FFFFFF;
          --gray-soft: #F4F6FB;
          --gray-text: #4A5568;
        }

        /* HERO */
        .alur-hero {
          background: var(--blue-deep);
          position: relative; overflow: hidden;
          padding: 100px 48px 80px;
        }
        .alur-hero::before {
          content: '';
          position: absolute; top: -120px; right: -80px;
          width: 480px; height: 480px; border-radius: 50%;
          background: radial-gradient(circle, rgba(245,193,0,0.14) 0%, transparent 70%);
        }
        .alur-hero::after {
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
          max-width: 1000px; margin: 0 auto;
          position: relative; z-index: 2;
        }

        /* BREADCRUMB */
        .breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem; color: rgba(255,255,255,0.4);
          margin-bottom: 32px;
        }
        .back-btn {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; font-weight: 500;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 7px 14px; border-radius: 8px;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .back-btn:hover {
          color: var(--yellow); border-color: rgba(245,193,0,0.4);
          background: rgba(245,193,0,0.07);
        }
        .back-btn svg { width: 14px; height: 14px; }
        .breadcrumb-sep { color: rgba(255,255,255,0.25); }
        .breadcrumb a { color: rgba(255,255,255,0.5); text-decoration: none; }
        .breadcrumb a:hover { color: var(--yellow); }
        .breadcrumb-cur { color: var(--yellow); }

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

        .alur-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 900; color: #fff;
          line-height: 1.12; margin-bottom: 16px;
        }
        .alur-hero h1 em { font-style: italic; color: var(--yellow); }
        .alur-hero p {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.6); font-size: 1rem;
          line-height: 1.8; font-weight: 300; max-width: 480px;
        }

        /* TOTAL DURATION STRIP */
        .duration-strip {
          background: var(--yellow);
          padding: 16px 48px;
        }
        .duration-strip-inner {
          max-width: 1000px; margin: 0 auto;
          display: flex; align-items: center; gap: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 600; color: var(--blue-deep);
        }
        .duration-strip svg { width: 18px; height: 18px; flex-shrink: 0; }
        .duration-strip strong { font-weight: 700; }

        /* MAIN */
        .alur-main {
          max-width: 1000px; margin: 0 auto;
          padding: 64px 48px 80px;
        }

        /* TIMELINE */
        .timeline {
          position: relative;
          display: flex; flex-direction: column; gap: 0;
        }

        /* vertical line */
        .timeline::before {
          content: '';
          position: absolute;
          left: 35px; top: 36px; bottom: 36px;
          width: 2px;
          background: linear-gradient(to bottom, var(--yellow), var(--blue-light), var(--yellow));
          z-index: 0;
        }

        .step-item {
          display: grid;
          grid-template-columns: 72px 1fr;
          gap: 28px;
          position: relative;
          z-index: 1;
          padding-bottom: 36px;
        }
        .step-item:last-child { padding-bottom: 0; }

        /* LEFT: NUMBER CIRCLE */
        .step-left {
          display: flex; flex-direction: column; align-items: center;
          gap: 0;
        }

        .step-circle {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: var(--blue-deep);
          border: 3px solid var(--yellow);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
          transition: background 0.25s;
          box-shadow: 0 0 0 6px rgba(245,193,0,0.1);
        }

        .step-circle svg { width: 30px; height: 30px; color: var(--yellow); }

        /* RIGHT: CARD */
        .step-card {
          background: white;
          border-radius: 18px;
          border: 1px solid rgba(26,71,160,0.08);
          overflow: hidden;
          box-shadow: 0 2px 16px rgba(11,43,107,0.05);
          transition: box-shadow 0.25s, transform 0.25s;
        }

        .step-card:hover {
          box-shadow: 0 12px 40px rgba(11,43,107,0.11);
          transform: translateX(4px);
        }

        .step-card-top {
          padding: 24px 28px 20px;
          border-bottom: 1px solid rgba(26,71,160,0.06);
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 16px;
        }

        .step-num-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--yellow-dark);
          margin-bottom: 4px;
        }

        .step-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem; font-weight: 700;
          color: var(--blue-deep);
        }

        .step-duration {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(245,193,0,0.12);
          border: 1px solid rgba(245,193,0,0.3);
          color: var(--yellow-dark);
          padding: 5px 12px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem; font-weight: 600;
          white-space: nowrap; flex-shrink: 0;
        }
        .step-duration svg { width: 12px; height: 12px; }

        .step-card-body {
          padding: 20px 28px 24px;
        }

        .step-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; color: var(--gray-text);
          line-height: 1.75; font-weight: 300;
          margin-bottom: 16px;
        }

        .step-checklist {
          display: flex; flex-direction: column; gap: 8px;
        }

        .step-check-item {
          display: flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.84rem; color: var(--gray-text); font-weight: 400;
        }

        .check-dot {
          width: 20px; height: 20px; flex-shrink: 0;
          background: rgba(11,43,107,0.06);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .check-dot svg { width: 11px; height: 11px; color: var(--blue-mid); }

        /* STEP 4 highlight */
        .step-item:last-child .step-card {
          border-color: rgba(245,193,0,0.3);
          background: linear-gradient(135deg, #fff 80%, rgba(245,193,0,0.04));
        }
        .step-item:last-child .step-circle {
          background: var(--yellow);
          border-color: var(--yellow);
          box-shadow: 0 0 0 6px rgba(245,193,0,0.15);
        }
        .step-item:last-child .step-circle svg { color: var(--blue-deep); }

        /* DOKUMEN SECTION */
        .docs-section {
          margin-top: 56px;
          background: white; border-radius: 20px;
          border: 1px solid rgba(26,71,160,0.08);
          padding: 36px;
          box-shadow: 0 2px 16px rgba(11,43,107,0.05);
        }

        .docs-header {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 28px;
        }

        .docs-icon-wrap {
          width: 48px; height: 48px;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
        }
        .docs-icon-wrap svg { width: 24px; height: 24px; color: var(--yellow); }

        .docs-header-text h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem; font-weight: 700; color: var(--blue-deep);
          margin-bottom: 2px;
        }
        .docs-header-text p {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; color: var(--gray-text); font-weight: 300;
        }

        .docs-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
        }

        .doc-item {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px;
          background: var(--gray-soft);
          border-radius: 10px;
          border: 1px solid rgba(26,71,160,0.07);
          transition: border-color 0.2s, background 0.2s;
        }
        .doc-item:hover { border-color: var(--yellow); background: rgba(245,193,0,0.05); }

        .doc-icon {
          width: 36px; height: 36px; flex-shrink: 0;
          background: var(--blue-deep); border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .doc-icon svg { width: 17px; height: 17px; color: var(--yellow); }

        .doc-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem; font-weight: 500; color: var(--blue-deep);
        }

        /* CTA */
        .alur-cta {
          margin-top: 40px;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          border-radius: 20px; padding: 40px;
          position: relative; overflow: hidden;
          display: flex; align-items: center;
          justify-content: space-between; gap: 32px;
        }
        .alur-cta::before {
          content: '';
          position: absolute; top: -40px; right: -40px;
          width: 180px; height: 180px; border-radius: 50%;
          background: rgba(245,193,0,0.1);
        }
        .alur-cta-text { position: relative; z-index: 1; }
        .alur-cta h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; color: white; margin-bottom: 6px;
        }
        .alur-cta p {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.6); font-size: 0.88rem; font-weight: 300;
        }
        .btn-yellow {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--yellow); color: var(--blue-deep);
          padding: 13px 24px; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 0.9rem;
          text-decoration: none; white-space: nowrap;
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative; z-index: 1;
          flex-shrink: 0;
        }
        .btn-yellow:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245,193,0,0.35);
        }
        .btn-yellow svg { width: 15px; height: 15px; }

        @media (max-width: 768px) {
          .alur-hero { padding: 80px 24px 60px; }
          .duration-strip { padding: 14px 24px; }
          .alur-main { padding: 40px 24px 60px; }
          .timeline::before { left: 27px; }
          .step-item { grid-template-columns: 56px 1fr; gap: 16px; }
          .step-circle { width: 56px; height: 56px; }
          .step-circle svg { width: 24px; height: 24px; }
          .step-card-top { flex-direction: column; gap: 10px; }
          .docs-grid { grid-template-columns: 1fr; }
          .alur-cta { flex-direction: column; text-align: center; padding: 28px; }
          .docs-section { padding: 24px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="alur-hero">
        <div className="grid-overlay" />
        <div className="hero-inner">
          <div className="breadcrumb" style={{ marginBottom: 20 }}>
            <Link href="/layanan" className="back-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
              Kembali ke Layanan
            </Link>
          </div>

          {/* <div className="page-tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/>
            </svg>
            Panduan Lengkap
          </div> */}

          <h1>Alur Pendaftaran<br /><em>NIDI</em></h1>
          <p>
            Ikuti 4 langkah mudah berikut untuk mendapatkan sertifikasi instalasi listrik
            yang resmi, aman, dan diakui PLN.
          </p>
        </div>
      </section>

      {/* ── DURATION STRIP ── */}
      <div className="duration-strip">
        <div className="duration-strip-inner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Total estimasi waktu proses: <strong>&nbsp;7–10 Hari Kerja</strong>&nbsp;— dari konsultasi hingga sertifikat terbit.
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="alur-main">

        {/* TIMELINE */}
        <div className="timeline">
          {steps.map((step, i) => (
            <div className="step-item" key={i}>
              <div className="step-left">
                <div className="step-circle">
                  {step.icon}
                </div>
              </div>

              <div className="step-card">
                <div className="step-card-top">
                  <div>
                    <div className="step-num-label">Langkah {step.num}</div>
                    <div className="step-title">{step.title}</div>
                  </div>
                  <div className="step-duration">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {step.duration}
                  </div>
                </div>
                <div className="step-card-body">
                  <div className="step-desc">{step.desc}</div>
                  <div className="step-checklist">
                    {step.detail.map((d, j) => (
                      <div className="step-check-item" key={j}>
                        <div className="check-dot">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M5 13l4 4L19 7"/>
                          </svg>
                        </div>
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DOKUMEN */}
        <div className="docs-section">
          <div className="docs-header">
            <div className="docs-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
              </svg>
            </div>
            <div className="docs-header-text">
              <h3>Dokumen yang Diperlukan</h3>
              <p>Siapkan berkas berikut sebelum memulai proses pendaftaran</p>
            </div>
          </div>
          <div className="docs-grid">
            {docs.map(({ label, icon }, i) => (
              <div className="doc-item" key={i}>
                <div className="doc-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{icon}</svg>
                </div>
                <div className="doc-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="alur-cta">
          <div className="alur-cta-text">
            <h3>Siap Memulai Pendaftaran?</h3>
            <p>Konsultasikan kebutuhan Anda secara gratis bersama tim kami sekarang.</p>
          </div>
          <Link href="/kontak" className="btn-yellow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            Mulai Konsultasi
          </Link>
        </div>

      </div>
    </main>
  );
}