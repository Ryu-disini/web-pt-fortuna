import Link from "next/link";

const layananList = [
  {
    title: "Instalasi Listrik Rumah",
    desc: "Pemasangan instalasi listrik lengkap untuk hunian baru maupun renovasi, sesuai standar keamanan SNI.",
    detail: ["Pemasangan panel listrik & MCB", "Instalasi stop kontak & saklar", "Grounding & penangkal petir"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    title: "Instalasi Listrik Ruko",
    desc: "Sistem kelistrikan untuk ruko dan pertokoan dengan kapasitas daya yang sesuai kebutuhan usaha.",
    detail: ["Instalasi daya 3 phase", "Panel distribusi komersial", "Sistem penerangan toko"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
  },
  {
    title: "Instalasi Listrik Kantor",
    desc: "Perancangan dan pemasangan sistem listrik perkantoran yang efisien, aman, dan siap mendukung operasional.",
    detail: ["Instalasi jaringan UPS & genset", "Sistem pencahayaan hemat energi", "Pengkabelan workstation & server"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
      </svg>
    ),
  },
  {
    title: "Instalasi Listrik Gedung",
    desc: "Instalasi sistem kelistrikan gedung bertingkat dan fasilitas publik dengan standar keamanan tinggi.",
    detail: ["Panel utama & sub-panel gedung", "Sistem fire alarm & emergency", "Lift, HVAC & sistem mekanikal"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"/>
      </svg>
    ),
  },
];

const proses = [
  {
    num: "01",
    title: "Survei Lokasi",
    desc: "Tim teknisi kami melakukan survei untuk menilai kebutuhan instalasi di lokasi Anda.",
    icon: <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>,
  },
  {
    num: "02",
    title: "Perencanaan & RAB",
    desc: "Kami menyusun rencana instalasi dan Rencana Anggaran Biaya yang transparan.",
    icon: <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>,
  },
  {
    num: "03",
    title: "Pemasangan",
    desc: "Teknisi bersertifikat melakukan pemasangan instalasi sesuai standar keamanan SNI.",
    icon: <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z"/>,
  },
  {
    num: "04",
    title: "Uji & Sertifikasi",
    desc: "Pengujian sistem listrik dan pengurusan NIDI agar instalasi resmi dan legal.",
    icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>,
  },
];

export default function Instalasi() {
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
        .inst-hero {
          background: var(--blue-deep);
          position: relative; overflow: hidden;
          padding: 100px 48px 80px;
        }
        .inst-hero::before {
          content: '';
          position: absolute; top: -120px; right: -80px;
          width: 480px; height: 480px; border-radius: 50%;
          background: radial-gradient(circle, rgba(245,193,0,0.14) 0%, transparent 70%);
        }
        .inst-hero::after {
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
        .inst-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900; color: #fff;
          line-height: 1.12; margin-bottom: 14px;
        }
        .inst-hero h1 em { font-style: italic; color: var(--yellow); }
        .inst-hero p {
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
        .inst-main {
          max-width: 1000px; margin: 0 auto;
          padding: 56px 48px 80px;
          display: flex; flex-direction: column; gap: 48px;
        }

        /* SECTION LABEL */
        .sec-tag {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--blue-mid);
          background: rgba(26,71,160,0.08);
          padding: 4px 12px; border-radius: 100px;
          margin-bottom: 12px;
        }
        .sec-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: 700; color: var(--blue-deep);
          margin-bottom: 6px; line-height: 1.2;
        }
        .sec-title em { font-style: italic; color: var(--blue-light); }
        .sec-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; color: var(--gray-text);
          font-weight: 300; line-height: 1.75;
          margin-bottom: 32px; max-width: 560px;
        }

        /* LAYANAN GRID */
        .layanan-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
        }
        .layanan-card {
          background: white; border-radius: 18px;
          border: 1px solid rgba(26,71,160,0.08);
          overflow: hidden;
          transition: transform 0.25s, box-shadow 0.25s;
          position: relative;
        }
        .layanan-card::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--blue-mid), var(--yellow));
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s ease;
        }
        .layanan-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(11,43,107,0.11); }
        .layanan-card:hover::after { transform: scaleX(1); }

        .card-top {
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          padding: 28px 28px 22px;
          position: relative; overflow: hidden;
        }
        .card-top::before {
          content: '';
          position: absolute; top: -24px; right: -24px;
          width: 100px; height: 100px; border-radius: 50%;
          background: rgba(245,193,0,0.1);
        }
        .card-icon {
          width: 56px; height: 56px;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(245,193,0,0.4);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 1;
          transition: background 0.2s, border-color 0.2s;
        }
        .layanan-card:hover .card-icon { background: var(--yellow); border-color: var(--yellow); }
        .card-icon svg { width: 26px; height: 26px; color: var(--yellow); transition: color 0.2s; }
        .layanan-card:hover .card-icon svg { color: var(--blue-deep); }

        .card-body { padding: 22px 28px 26px; }
        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 700;
          color: var(--blue-deep); margin-bottom: 8px;
        }
        .card-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem; color: var(--gray-text);
          font-weight: 300; line-height: 1.7; margin-bottom: 14px;
        }
        .card-list { display: flex; flex-direction: column; gap: 6px; }
        .card-list-item {
          display: flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem; color: var(--gray-text); font-weight: 400;
        }
        .list-dot {
          width: 18px; height: 18px; flex-shrink: 0;
          background: rgba(26,71,160,0.07); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .list-dot svg { width: 10px; height: 10px; color: var(--blue-mid); }

        /* PROSES */
        .proses-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 0; position: relative;
        }
        .proses-line {
          position: absolute; top: 32px; left: 12.5%; right: 12.5%;
          height: 2px;
          background: repeating-linear-gradient(
            90deg, var(--blue-light) 0, var(--blue-light) 8px,
            transparent 8px, transparent 18px
          );
        }
        .proses-item {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          padding: 0 12px; position: relative; z-index: 1;
        }
        .proses-circle {
          width: 64px; height: 64px; border-radius: 50%;
          background: var(--blue-deep);
          border: 3px solid var(--yellow);
          box-shadow: 0 0 0 5px rgba(245,193,0,0.1);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
        }
        .proses-circle svg { width: 26px; height: 26px; color: var(--yellow); }
        .proses-num {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--yellow-dark); margin-bottom: 4px;
        }
        .proses-title {
          font-family: 'Playfair Display', serif;
          font-size: 0.95rem; font-weight: 700;
          color: var(--blue-deep); margin-bottom: 6px;
        }
        .proses-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; color: var(--gray-text);
          font-weight: 300; line-height: 1.6;
        }

        /* KEUNGGULAN */
        .keunggulan-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
        }
        .keunggulan-card {
          background: white; border-radius: 14px;
          border: 1px solid rgba(26,71,160,0.08);
          padding: 22px; display: flex; gap: 14px; align-items: flex-start;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .keunggulan-card:hover { border-color: var(--yellow); box-shadow: 0 6px 24px rgba(11,43,107,0.07); }
        .keunggulan-icon {
          width: 42px; height: 42px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .keunggulan-icon svg { width: 20px; height: 20px; color: var(--yellow); }
        .keunggulan-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 600;
          color: var(--blue-deep); margin-bottom: 4px;
        }
        .keunggulan-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; color: var(--gray-text);
          font-weight: 300; line-height: 1.6;
        }

        /* CTA */
        .inst-cta {
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          border-radius: 20px; padding: 40px;
          position: relative; overflow: hidden;
          display: flex; align-items: center;
          justify-content: space-between; gap: 24px;
        }
        .inst-cta::before {
          content: '';
          position: absolute; top: -40px; right: -40px;
          width: 180px; height: 180px; border-radius: 50%;
          background: rgba(245,193,0,0.1);
        }
        .cta-text { position: relative; z-index: 1; }
        .cta-text h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; color: white; margin-bottom: 6px;
        }
        .cta-text p {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.58); font-size: 0.85rem; font-weight: 300;
        }
        .cta-btns {
          display: flex; gap: 12px; flex-shrink: 0;
          position: relative; z-index: 1;
        }
        .btn-yellow {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--yellow); color: var(--blue-deep);
          padding: 13px 22px; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 600;
          text-decoration: none; white-space: nowrap;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-yellow:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(245,193,0,0.35); }
        .btn-yellow svg { width: 15px; height: 15px; }
        .btn-outline-white {
          display: inline-flex; align-items: center; gap: 7px;
          background: transparent; color: white;
          padding: 13px 22px; border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.3);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 500;
          text-decoration: none; white-space: nowrap;
          transition: background 0.2s, border-color 0.2s;
        }
        .btn-outline-white:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.6); }
        .btn-outline-white svg { width: 15px; height: 15px; }

        @media (max-width: 900px) {
          .inst-hero { padding: 80px 24px 60px; }
          .yellow-strip { padding: 14px 24px; }
          .inst-main { padding: 40px 24px 60px; gap: 40px; }
          .layanan-grid { grid-template-columns: 1fr; }
          .proses-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
          .proses-line { display: none; }
          .keunggulan-grid { grid-template-columns: 1fr 1fr; }
          .inst-cta { flex-direction: column; padding: 28px; }
          .cta-btns { flex-direction: column; width: 100%; }
          .btn-yellow, .btn-outline-white { justify-content: center; }
        }
        @media (max-width: 560px) {
          .keunggulan-grid { grid-template-columns: 1fr; }
          .proses-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="inst-hero">
        <div className="grid-overlay" />
        <div className="hero-inner">
          <Link href="/layanan" className="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            Kembali ke Layanan
          </Link>


          <h1>Jasa Instalasi <em>Listrik</em><br />Profesional</h1>
          <p>
            Kami menyediakan layanan pembangunan dan pemasangan instalasi listrik
            untuk berbagai jenis bangunan — dikerjakan oleh teknisi bersertifikat
            sesuai standar keamanan nasional SNI.
          </p>
        </div>
      </section>

      {/* ── YELLOW STRIP ── */}
      <div className="yellow-strip">
        <div className="yellow-strip-inner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          Semua instalasi dikerjakan teknisi bersertifikat — Garansi pekerjaan & pengurusan NIDI tersedia.
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="inst-main">

        {/* LAYANAN */}
        <div>
          <div className="sec-tag">Cakupan Layanan</div>
          <h2 className="sec-title">Kami Tangani <em>Semua Jenis</em> Bangunan</h2>
          <p className="sec-desc">
            Dari hunian pribadi hingga gedung komersial — tim kami berpengalaman
            menangani berbagai skala proyek instalasi listrik.
          </p>
          <div className="layanan-grid">
            {layananList.map((item) => (
              <div className="layanan-card" key={item.title}>
                <div className="card-top">
                  <div className="card-icon">{item.icon}</div>
                </div>
                <div className="card-body">
                  <div className="card-title">{item.title}</div>
                  <div className="card-desc">{item.desc}</div>
                  <div className="card-list">
                    {item.detail.map((d) => (
                      <div className="card-list-item" key={d}>
                        <div className="list-dot">
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
            ))}
          </div>
        </div>

        {/* PROSES */}
        <div>
          <div className="sec-tag">Cara Kerja Kami</div>
          <h2 className="sec-title">Proses <em>Instalasi</em> Kami</h2>
          <p className="sec-desc">
            Empat tahap terstruktur yang memastikan setiap proyek instalasi listrik
            selesai tepat waktu, aman, dan legal.
          </p>
          <div className="proses-grid">
            <div className="proses-line" />
            {proses.map((p) => (
              <div className="proses-item" key={p.num}>
                <div className="proses-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {p.icon}
                  </svg>
                </div>
                <div className="proses-num">Langkah {p.num}</div>
                <div className="proses-title">{p.title}</div>
                <div className="proses-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* KEUNGGULAN */}
        <div>
          <div className="sec-tag">Mengapa Kami</div>
          <h2 className="sec-title">Keunggulan <em>Layanan</em> Kami</h2>
          <div className="keunggulan-grid">
            {[
              {
                icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>,
                title: "Teknisi Bersertifikat",
                desc: "Seluruh pekerjaan dilakukan oleh teknisi yang memiliki sertifikat kompetensi resmi.",
              },
              {
                icon: <path d="M13 10V3L4 14h7v7l9-11h-7z"/>,
                title: "Pengerjaan Cepat",
                desc: "Kami berkomitmen menyelesaikan proyek sesuai jadwal tanpa mengorbankan kualitas.",
              },
              {
                icon: <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>,
                title: "Garansi Pekerjaan",
                desc: "Kami memberikan garansi pada setiap pekerjaan instalasi yang telah diselesaikan.",
              },
              {
                icon: <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>,
                title: "Harga Transparan",
                desc: "RAB diberikan sebelum pekerjaan dimulai. Tidak ada biaya tersembunyi.",
              },
              {
                icon: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>,
                title: "Tim Berpengalaman",
                desc: "Lebih dari 500 proyek instalasi listrik telah kami selesaikan di berbagai wilayah.",
              },
              {
                icon: <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>,
                title: "Konsultasi Gratis",
                desc: "Dapatkan konsultasi dan estimasi biaya tanpa biaya awal sebelum memulai proyek.",
              },
            ].map(({ icon, title, desc }) => (
              <div className="keunggulan-card" key={title}>
                <div className="keunggulan-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{icon}</svg>
                </div>
                <div>
                  <div className="keunggulan-title">{title}</div>
                  <div className="keunggulan-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="inst-cta">
          <div className="cta-text">
            <h3>Siap Mulai Proyek Instalasi?</h3>
            <p>Hubungi kami untuk survei gratis dan estimasi biaya tanpa kewajiban.</p>
          </div>
          <div className="cta-btns">
            <a href="https://wa.me/6281288131149" target="_blank" rel="noreferrer" className="btn-yellow">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat WhatsApp
            </a>
            <Link href="/kontak" className="btn-outline-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              Konsultasi Online
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}