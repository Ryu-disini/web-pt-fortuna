import Link from "next/link";

const services = [
  {
    title: "Kantor Pelayanan",
    desc: "Temukan lokasi kantor pelayanan kami terdekat untuk konsultasi langsung dan pengajuan dokumen.",
    link: "/layanan/kantor",
    tag: "Informasi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
  },
  {
    title: "Cek Status Pendaftaran",
    desc: "Pantau progres pengajuan NIDI Anda secara real-time melalui sistem kami.",
    link: "/layanan/status",
    tag: "Monitoring",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: "Cetak NIDI",
    desc: "Unduh dan cetak Nomor Identitas Instalasi listrik Anda yang telah resmi diterbitkan.",
    link: "/layanan/cetak-nidi",
    tag: "Dokumen",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm1-4h4v-4H10v4z"/>
      </svg>
    ),
  },
  {
    title: "Alur Pendaftaran",
    desc: "Pelajari langkah-langkah lengkap proses pendaftaran NIDI dari awal hingga selesai.",
    link: "/layanan/alur",
    tag: "Panduan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/>
      </svg>
    ),
  },
  {
    title: "Kesepakatan Harga",
    desc: "Lihat estimasi biaya layanan secara transparan. Tidak ada biaya tersembunyi.",
    link: "/layanan/harga",
    tag: "Harga",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  {
    title: "Instalasi Listrik",
    desc: "Jasa pemasangan instalasi listrik untuk rumah, ruko, kantor, dan industri oleh teknisi bersertifikat.",
    link: "/layanan/instalasi",
    tag: "Instalasi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
      </svg>
    ),
  },
];

export default function Layanan() {
  return (
    <main style={{ fontFamily: "'Georgia', serif", background: "#fff", overflowX: "hidden" }}>

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
        .layanan-hero {
          background: var(--blue-deep);
          position: relative;
          overflow: hidden;
          padding: 100px 48px 80px;
        }

        .layanan-hero::before {
          content: '';
          position: absolute;
          top: -120px; right: -80px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,193,0,0.14) 0%, transparent 70%);
        }

        .layanan-hero::after {
          content: '';
          position: absolute;
          bottom: -70px; left: 5%;
          width: 320px; height: 320px;
          border-radius: 50%;
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
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
          margin-bottom: 32px;
        }
        .breadcrumb a { color: rgba(255,255,255,0.55); text-decoration: none; }
        .breadcrumb a:hover { color: var(--yellow); }
        .breadcrumb svg { width: 12px; height: 12px; }
        .breadcrumb span { color: var(--yellow); }

        .page-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(245,193,0,0.15);
          border: 1px solid rgba(245,193,0,0.35);
          color: var(--yellow);
          padding: 6px 16px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .page-tag svg { width: 13px; height: 13px; }

        .hero-layout {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 48px;
          align-items: end;
        }

        .layanan-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 4vw, 3.6rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.12;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
        }

        .layanan-hero h1 em {
          font-style: italic;
          color: var(--yellow);
        }

        .layanan-hero p {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.62);
          font-size: 1rem;
          line-height: 1.8;
          font-weight: 300;
          max-width: 520px;
        }

        .hero-count-box {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          padding: 28px 36px;
          text-align: center;
          white-space: nowrap;
          backdrop-filter: blur(8px);
        }

        .hero-count-num {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 900;
          color: var(--yellow);
          line-height: 1;
          margin-bottom: 6px;
        }

        .hero-count-label {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.55);
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.05em;
        }

        /* YELLOW BAR */
        .yellow-bar {
          background: var(--yellow);
          padding: 18px 48px;
        }

        .yellow-bar-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--blue-deep);
        }

        .yellow-bar svg { width: 18px; height: 18px; flex-shrink: 0; }

        /* GRID LAYANAN */
        .layanan-section {
          padding: 80px 48px 100px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .layanan-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* CARD */
        .service-card {
          background: white;
          border-radius: 20px;
          border: 1px solid rgba(26,71,160,0.09);
          overflow: hidden;
          transition: transform 0.25s, box-shadow 0.25s;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          position: relative;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 56px rgba(11,43,107,0.13);
        }

        .service-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--blue-mid), var(--yellow));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .service-card:hover::after { transform: scaleX(1); }

        .card-top {
          background: linear-gradient(135deg, var(--blue-deep) 0%, var(--blue-mid) 100%);
          padding: 36px 32px 28px;
          position: relative;
          overflow: hidden;
        }

        .card-top::before {
          content: '';
          position: absolute;
          top: -30px; right: -30px;
          width: 120px; height: 120px;
          border-radius: 50%;
          background: rgba(245,193,0,0.1);
        }

        .card-top::after {
          content: '';
          position: absolute;
          bottom: -20px; left: -10px;
          width: 80px; height: 80px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
        }

        .card-tag {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--blue-deep);
          background: var(--yellow);
          padding: 3px 10px;
          border-radius: 100px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .card-icon-wrap {
          width: 64px; height: 64px;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(245,193,0,0.4);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          position: relative;
          z-index: 1;
          transition: background 0.2s, border-color 0.2s;
        }

        .service-card:hover .card-icon-wrap {
          background: var(--yellow);
          border-color: var(--yellow);
        }

        .card-icon-wrap svg {
          width: 30px; height: 30px;
          color: var(--yellow);
          transition: color 0.2s;
        }

        .service-card:hover .card-icon-wrap svg { color: var(--blue-deep); }

        .card-body {
          padding: 24px 28px 28px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--blue-deep);
          margin-bottom: 10px;
          line-height: 1.3;
        }

        .card-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: var(--gray-text);
          line-height: 1.7;
          font-weight: 300;
          flex: 1;
          margin-bottom: 20px;
        }

        .card-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.83rem;
          font-weight: 600;
          color: var(--blue-mid);
          transition: gap 0.2s, color 0.2s;
        }

        .service-card:hover .card-link {
          gap: 10px;
          color: var(--blue-deep);
        }

        .card-link svg { width: 14px; height: 14px; }

        /* BOTTOM FEATURE STRIP */
        .feature-strip {
          background: var(--gray-soft);
          padding: 64px 48px;
        }

        .feature-strip-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          text-align: center;
        }

        .feature-item { }

        .feature-icon {
          width: 52px; height: 52px;
          background: white;
          border: 2px solid rgba(26,71,160,0.1);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 14px;
          transition: background 0.2s, border-color 0.2s;
        }

        .feature-item:hover .feature-icon {
          background: var(--blue-deep);
          border-color: var(--blue-deep);
        }

        .feature-item:hover .feature-icon svg { color: var(--yellow); }

        .feature-icon svg { width: 24px; height: 24px; color: var(--blue-mid); transition: color 0.2s; }

        .feature-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--blue-deep);
          margin-bottom: 6px;
        }

        .feature-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          color: var(--gray-text);
          font-weight: 300;
          line-height: 1.6;
        }

        /* CTA */
        .cta-strip {
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          padding: 72px 48px;
          position: relative;
          overflow: hidden;
        }

        .cta-strip::before {
          content: '';
          position: absolute;
          top: -60px; right: 10%;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: rgba(245,193,0,0.09);
        }

        .cta-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          position: relative;
          z-index: 2;
        }

        .cta-inner h3 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          color: white;
          margin-bottom: 8px;
        }

        .cta-inner p {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.58);
          font-size: 0.92rem;
          font-weight: 300;
        }

        .btn-yellow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--yellow);
          color: var(--blue-deep);
          padding: 14px 28px;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn-yellow:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245,193,0,0.35);
        }

        .btn-yellow svg { width: 15px; height: 15px; }

        @media (max-width: 900px) {
          .layanan-hero { padding: 80px 24px 60px; }
          .hero-layout { grid-template-columns: 1fr; }
          .hero-count-box { display: none; }
          .yellow-bar { padding: 16px 24px; }
          .layanan-section { padding: 60px 24px 80px; }
          .layanan-grid { grid-template-columns: 1fr 1fr; }
          .feature-strip { padding: 48px 24px; }
          .feature-strip-inner { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .cta-strip { padding: 52px 24px; }
          .cta-inner { flex-direction: column; text-align: center; }
        }

        @media (max-width: 600px) {
          .layanan-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="layanan-hero">
        <div className="grid-overlay" />
        <div className="hero-inner">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span>Layanan</span>
          </div>

          <div className="hero-layout">
            <div>
              <div className="page-tag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Layanan Kami
              </div>
              <h1>Semua yang Anda<br />Butuhkan, <em>Satu Tempat</em></h1>
              <p>
                Dari instalasi listrik hingga pengurusan sertifikasi resmi — kami menyediakan
                layanan lengkap dengan proses yang mudah, transparan, dan cepat.
              </p>
            </div>

            <div className="hero-count-box">
              <div className="hero-count-num">6</div>
              <div className="hero-count-label">Jenis Layanan<br />Tersedia</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── YELLOW INFO BAR ── */}
      <div className="yellow-bar">
        <div className="yellow-bar-inner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Semua layanan kami resmi dan sesuai regulasi Kementerian ESDM. Proses 3–7 hari kerja. Konsultasi gratis.
        </div>
      </div>

      {/* ── GRID LAYANAN ── */}
      <div className="layanan-section">
        <div className="layanan-grid">
          {services.map((s) => (
            <Link href={s.link} key={s.title} className="service-card">
              <div className="card-top">
                <div className="card-tag">{s.tag}</div>
                <div className="card-icon-wrap">
                  {s.icon}
                </div>
              </div>
              <div className="card-body">
                <div className="card-title">{s.title}</div>
                <div className="card-desc">{s.desc}</div>
                <div className="card-link">
                  Selengkapnya
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── FEATURE STRIP ── */}
      <div className="feature-strip">
        <div className="feature-strip-inner">
          {[
            {
              icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>,
              title: "100% Resmi ESDM",
              desc: "Seluruh proses sesuai regulasi nasional",
            },
            {
              icon: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>,
              title: "Proses 3–7 Hari",
              desc: "Pengurusan sertifikat cepat dan terstruktur",
            },
            {
              icon: <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>,
              title: "Konsultasi Gratis",
              desc: "Tim kami siap membantu tanpa biaya awal",
            },
            {
              icon: <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>,
              title: "Disetujui PLN",
              desc: "Sertifikat langsung dapat digunakan ke PLN",
            },
          ].map(({ icon, title, desc }) => (
            <div className="feature-item" key={title}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{icon}</svg>
              </div>
              <div className="feature-title">{title}</div>
              <div className="feature-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="cta-strip">
        <div className="cta-inner">
          <div>
            <h3>Butuh Bantuan Memilih Layanan?</h3>
            <p>Tim konsultan kami siap memandu Anda memilih layanan yang tepat secara gratis.</p>
          </div>
          <a href="/kontak" className="btn-yellow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            Konsultasi Gratis
          </a>
        </div>
      </section>

    </main>
  );
}