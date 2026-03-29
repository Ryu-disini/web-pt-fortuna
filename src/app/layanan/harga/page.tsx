import Link from "next/link";

const categories = [
  {
    title: "Rumah Tinggal",
    desc: "Cocok untuk hunian pribadi dengan kebutuhan daya listrik standar rumah tangga.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <path d="M9 22V12h6v10"/>
      </svg>
    ),
    items: [
      { daya: "450 VA", harga: "Hubungi Kami" },
      { daya: "900 VA", harga: "Hubungi Kami" },
      { daya: "1.300 VA", harga: "Hubungi Kami" },
      { daya: "2.200 VA", harga: "Hubungi Kami" },
    ],
  },
  {
    title: "Ruko / Kantor",
    desc: "Untuk bangunan komersial kecil seperti ruko, kantor, dan tempat usaha.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    items: [
      { daya: "3.500 VA", harga: "Hubungi Kami" },
      { daya: "5.500 VA", harga: "Hubungi Kami" },
      { daya: "7.700 VA", harga: "Hubungi Kami" },
    ],
  },
  {
    title: "Gedung Komersial",
    desc: "Untuk gedung perkantoran, pusat perbelanjaan, dan fasilitas komersial besar.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
      </svg>
    ),
    items: [
      { daya: "10.600 VA", harga: "Hubungi Kami" },
      { daya: "16.500 VA", harga: "Hubungi Kami" },
      { daya: "23.000 VA", harga: "Hubungi Kami" },
    ],
  },
  {
    title: "Industri",
    desc: "Untuk kawasan industri, pabrik, dan fasilitas produksi dengan kebutuhan daya besar.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    items: [
      { daya: "41.500 VA", harga: "Hubungi Kami" },
      { daya: "53.000 VA", harga: "Hubungi Kami" },
      { daya: "> 200 kVA", harga: "Hubungi Kami" },
    ],
  },
];

const faqs = [
  {
    q: "Apakah harga sudah termasuk biaya inspeksi?",
    a: "Ya, harga yang kami tawarkan sudah mencakup biaya inspeksi lapangan, pengurusan dokumen, dan penerbitan sertifikat resmi.",
  },
  {
    q: "Bagaimana cara mendapatkan penawaran harga?",
    a: "Hubungi tim kami melalui WhatsApp atau email. Kami akan memberikan penawaran harga yang disesuaikan dengan kebutuhan spesifik Anda.",
  },
  {
    q: "Apakah ada diskon untuk proyek skala besar?",
    a: "Ya, kami menyediakan harga khusus untuk proyek dengan volume besar atau kerjasama jangka panjang. Silakan konsultasikan kebutuhan Anda.",
  },
];

export default function Harga() {
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
          --white: #FFFFFF;
          --gray-soft: #F4F6FB;
          --gray-text: #4A5568;
        }

        /* HERO */
        .harga-hero {
          background: var(--blue-deep);
          position: relative; overflow: hidden;
          padding: 100px 48px 80px;
        }
        .harga-hero::before {
          content: '';
          position: absolute; top: -120px; right: -80px;
          width: 480px; height: 480px; border-radius: 50%;
          background: radial-gradient(circle, rgba(245,193,0,0.14) 0%, transparent 70%);
        }
        .harga-hero::after {
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

        .harga-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900; color: #fff;
          line-height: 1.12; margin-bottom: 14px;
        }
        .harga-hero h1 em { font-style: italic; color: var(--yellow); }
        .harga-hero p {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.6); font-size: 1rem;
          line-height: 1.8; font-weight: 300; max-width: 520px;
        }

        /* YELLOW STRIP */
        .yellow-strip {
          background: var(--yellow); padding: 16px 48px;
        }
        .yellow-strip-inner {
          max-width: 1000px; margin: 0 auto;
          display: flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 600; color: var(--blue-deep);
        }
        .yellow-strip svg { width: 17px; height: 17px; flex-shrink: 0; }

        /* MAIN */
        .harga-main {
          max-width: 1000px; margin: 0 auto;
          padding: 56px 48px 80px;
          display: flex; flex-direction: column; gap: 32px;
        }

        /* SECTION LABEL */
        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--blue-mid);
          background: rgba(26,71,160,0.08);
          padding: 4px 12px; border-radius: 100px;
          display: inline-block; margin-bottom: 16px;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 2.5vw, 2.1rem);
          font-weight: 700; color: var(--blue-deep);
          margin-bottom: 8px;
        }
        .section-title em { font-style: italic; color: var(--blue-light); }
        .section-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; color: var(--gray-text);
          font-weight: 300; line-height: 1.7;
        }

        /* CATEGORY CARDS */
        .category-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;
        }

        .cat-card {
          background: white; border-radius: 20px;
          border: 1px solid rgba(26,71,160,0.08);
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(11,43,107,0.05);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .cat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(11,43,107,0.1);
        }

        .cat-card-header {
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          padding: 24px 28px;
          display: flex; align-items: flex-start; gap: 14px;
          position: relative; overflow: hidden;
        }
        .cat-card-header::after {
          content: '';
          position: absolute; top: -30px; right: -30px;
          width: 100px; height: 100px; border-radius: 50%;
          background: rgba(245,193,0,0.1);
        }
        .cat-icon {
          width: 48px; height: 48px; flex-shrink: 0;
          background: var(--yellow); border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 1;
        }
        .cat-icon svg { width: 24px; height: 24px; color: var(--blue-deep); }
        .cat-header-text { position: relative; z-index: 1; }
        .cat-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 700; color: white; margin-bottom: 4px;
        }
        .cat-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; color: rgba(255,255,255,0.6);
          font-weight: 300; line-height: 1.5;
        }

        .cat-rows { padding: 8px 0; }
        .cat-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 28px;
          border-bottom: 1px solid rgba(26,71,160,0.05);
          transition: background 0.15s;
        }
        .cat-row:last-child { border-bottom: none; }
        .cat-row:hover { background: rgba(244,246,251,0.8); }

        .cat-row-left {
          display: flex; align-items: center; gap: 10px;
        }
        .daya-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--yellow); flex-shrink: 0;
        }
        .daya-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 500; color: var(--blue-deep);
        }
        .harga-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem; font-weight: 600;
          color: var(--blue-mid);
          background: rgba(26,71,160,0.07);
          padding: 4px 12px; border-radius: 6px;
          cursor: pointer; text-decoration: none;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .harga-badge:hover { background: var(--blue-deep); color: white; }
        .harga-badge svg { width: 12px; height: 12px; }

        /* INFO BANNER */
        .info-banner {
          background: white; border-radius: 16px;
          border: 1px solid rgba(245,193,0,0.25);
          padding: 24px 28px;
          display: flex; gap: 16px; align-items: flex-start;
          box-shadow: 0 2px 12px rgba(11,43,107,0.04);
        }
        .info-banner-icon {
          width: 44px; height: 44px; flex-shrink: 0;
          background: rgba(245,193,0,0.12);
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
        }
        .info-banner-icon svg { width: 22px; height: 22px; color: var(--yellow-dark); }
        .info-banner-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; font-weight: 600; color: var(--blue-deep); margin-bottom: 4px;
        }
        .info-banner-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.83rem; color: var(--gray-text); font-weight: 300; line-height: 1.7;
        }

        /* FAQ */
        .faq-list { display: flex; flex-direction: column; gap: 12px; }
        .faq-item {
          background: white; border-radius: 14px;
          border: 1px solid rgba(26,71,160,0.08);
          padding: 22px 24px;
          box-shadow: 0 2px 10px rgba(11,43,107,0.04);
          transition: border-color 0.2s;
        }
        .faq-item:hover { border-color: rgba(245,193,0,0.4); }
        .faq-q {
          display: flex; align-items: flex-start; gap: 12px;
          margin-bottom: 10px;
        }
        .faq-q-num {
          width: 26px; height: 26px; flex-shrink: 0;
          background: var(--yellow); border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem; font-weight: 700; color: var(--blue-deep);
        }
        .faq-q-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem; font-weight: 600; color: var(--blue-deep);
          padding-top: 3px; line-height: 1.4;
        }
        .faq-a {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.84rem; color: var(--gray-text);
          font-weight: 300; line-height: 1.7;
          padding-left: 38px;
        }

        /* CTA */
        .harga-cta {
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          border-radius: 20px; padding: 40px;
          position: relative; overflow: hidden;
          display: flex; align-items: center;
          justify-content: space-between; gap: 24px;
        }
        .harga-cta::before {
          content: '';
          position: absolute; top: -40px; right: -40px;
          width: 200px; height: 200px; border-radius: 50%;
          background: rgba(245,193,0,0.1);
        }
        .harga-cta-text { position: relative; z-index: 1; }
        .harga-cta h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; color: white; margin-bottom: 6px;
        }
        .harga-cta p {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.58); font-size: 0.88rem; font-weight: 300;
        }
        .cta-btns {
          display: flex; gap: 12px; flex-shrink: 0; position: relative; z-index: 1;
        }
        .btn-yellow {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--yellow); color: var(--blue-deep);
          padding: 13px 24px; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 600;
          text-decoration: none; white-space: nowrap;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-yellow:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(245,193,0,0.35); }
        .btn-yellow svg { width: 15px; height: 15px; }
        .btn-outline-white {
          display: inline-flex; align-items: center; gap: 7px;
          background: transparent; color: white;
          padding: 13px 24px; border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.3);
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500;
          text-decoration: none; white-space: nowrap;
          transition: background 0.2s, border-color 0.2s;
        }
        .btn-outline-white:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.6); }
        .btn-outline-white svg { width: 15px; height: 15px; }

        @media (max-width: 768px) {
          .harga-hero { padding: 80px 24px 60px; }
          .yellow-strip { padding: 14px 24px; }
          .harga-main { padding: 36px 24px 60px; }
          .category-grid { grid-template-columns: 1fr; }
          .harga-cta { flex-direction: column; padding: 28px; }
          .cta-btns { flex-direction: column; width: 100%; }
          .btn-yellow, .btn-outline-white { justify-content: center; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="harga-hero">
        <div className="grid-overlay" />
        <div className="hero-inner">

          <Link href="/layanan" className="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            Kembali ke Layanan
          </Link>

          

          <h1>Harga <em>Transparan</em><br />Tanpa Biaya Tersembunyi</h1>
          <p>
            Harga layanan NIDI menyesuaikan kapasitas daya listrik
            serta jenis bangunan. Konsultasikan kebutuhan Anda untuk penawaran terbaik.
          </p>

        </div>
      </section>

      {/* ── YELLOW STRIP ── */}
      <div className="yellow-strip">
        <div className="yellow-strip-inner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Semua harga sudah termasuk biaya inspeksi, pengurusan dokumen, dan penerbitan sertifikat resmi ESDM.
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="harga-main">

        {/* HEADER */}
        <div>
          <div className="section-label">Kategori Layanan</div>
          <h2 className="section-title">Pilih Sesuai <em>Jenis Bangunan</em></h2>
          <p className="section-desc">
            Klik "Hubungi Kami" pada daya yang sesuai untuk mendapatkan penawaran harga resmi dari tim kami.
          </p>
        </div>

        {/* CATEGORY CARDS */}
        <div className="category-grid">
          {categories.map((cat) => (
            <div className="cat-card" key={cat.title}>
              <div className="cat-card-header">
                <div className="cat-icon">{cat.icon}</div>
                <div className="cat-header-text">
                  <div className="cat-title">{cat.title}</div>
                  <div className="cat-desc">{cat.desc}</div>
                </div>
              </div>
              <div className="cat-rows">
                {cat.items.map((item) => (
                  <div className="cat-row" key={item.daya}>
                    <div className="cat-row-left">
                      <div className="daya-dot" />
                      <div className="daya-label">{item.daya}</div>
                    </div>
                    <a
                      href="https://wa.me/6281288131149"
                      target="_blank"
                      rel="noreferrer"
                      className="harga-badge"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                      Hubungi Kami
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* INFO BANNER */}
        <div className="info-banner">
          <div className="info-banner-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <div>
            <div className="info-banner-title">Faktor yang Mempengaruhi Harga</div>
            <div className="info-banner-desc">
              Harga akhir ditentukan oleh kapasitas daya, jenis bangunan, lokasi, kompleksitas instalasi,
              dan kondisi lapangan. Tim kami akan melakukan survei awal secara gratis sebelum memberikan penawaran resmi.
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <div className="section-label">FAQ Harga</div>
          <h2 className="section-title" style={{ marginBottom: 20 }}>Pertanyaan <em>Umum</em></h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-q">
                  <div className="faq-q-num">{i + 1}</div>
                  <div className="faq-q-text">{faq.q}</div>
                </div>
                <div className="faq-a">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="harga-cta">
          <div className="harga-cta-text">
            <h3>Minta Penawaran Harga Resmi</h3>
            <p>Konsultasikan kebutuhan listrik Anda dan dapatkan estimasi harga yang akurat.</p>
          </div>
          <div className="cta-btns">
            <a href="https://wa.me/6281288131149" target="_blank" rel="noreferrer" className="btn-yellow">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Kami
            </a>
            <Link href="/kontak" className="btn-outline-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Kirim Email
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}