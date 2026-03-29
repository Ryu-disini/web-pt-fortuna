import Link from "next/link";

export default function Tentang() {
  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#F4F6FB", overflowX: "hidden" }}>

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

        /* ══════════════════════════════
           HERO — same as Alur / CetakNidi
           ══════════════════════════════ */
        .tentang-hero {
          background: var(--blue-deep);
          position: relative;
          overflow: hidden;
          padding: 100px 48px 80px;
        }

        /* Large yellow orb top-right */
        .tentang-hero::before {
          content: '';
          position: absolute;
          top: -120px; right: -80px;
          width: 480px; height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,193,0,.14) 0%, transparent 70%);
        }

        /* Blue orb bottom-left */
        .tentang-hero::after {
          content: '';
          position: absolute;
          bottom: -60px; left: 5%;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,.22) 0%, transparent 70%);
        }

        /* Grid overlay — identical to Alur */
        .grid-overlay {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 44px 44px;
          pointer-events: none;
        }

        .tentang-hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* Back / breadcrumb — same style as Alur */
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem;
          font-weight: 500;
          color: rgba(255,255,255,.6);
          text-decoration: none;
          border: 1px solid rgba(255,255,255,.2);
          padding: 7px 14px;
          border-radius: 8px;
          margin-bottom: 32px;
          transition: color .2s, border-color .2s, background .2s;
        }
        .back-btn:hover {
          color: var(--yellow);
          border-color: rgba(245,193,0,.4);
          background: rgba(245,193,0,.07);
        }
        .back-btn svg { width: 14px; height: 14px; }

        /* Page tag pill — identical to Alur */
        .page-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(245,193,0,.15);
          border: 1px solid rgba(245,193,0,.35);
          color: var(--yellow);
          padding: 6px 16px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          margin-bottom: 22px;
        }
        .page-tag svg { width: 13px; height: 13px; }

        /* Hero title */
        .tentang-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.12;
          margin-bottom: 16px;
        }
        .tentang-hero h1 em {
          font-style: italic;
          color: var(--yellow);
        }

        /* Hero desc */
        .tentang-hero p.hero-desc {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,.6);
          font-size: 1rem;
          line-height: 1.8;
          font-weight: 300;
          max-width: 540px;
          margin: 0;
        }

        /* ══════════════════
           STAT STRIP
           ══════════════════ */
        .stat-strip {
          background: var(--yellow);
          padding: 0 48px;
        }

        .stat-strip-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .stat-strip-item {
          padding: 28px 32px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-right: 1px solid rgba(11,43,107,.12);
        }
        .stat-strip-item:last-child { border-right: none; }

        .strip-icon {
          width: 44px; height: 44px;
          background: rgba(11,43,107,.12);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .strip-icon svg { width: 22px; height: 22px; color: var(--blue-deep); }

        .strip-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--blue-deep);
          line-height: 1;
        }
        .strip-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .75rem;
          color: rgba(11,43,107,.65);
          font-weight: 500;
        }

        /* ══════════════════
           VISI MISI
           ══════════════════ */
        .section-vm {
          padding: 100px 48px;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }

        .section-tag-blue {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: .12em;
          color: var(--blue-mid);
          background: rgba(26,71,160,.08);
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 18px;
        }

        .section-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 2.5vw, 2.4rem);
          font-weight: 700;
          color: var(--blue-deep);
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .section-h2 em { font-style: italic; color: var(--blue-light); }

        .section-body {
          font-family: 'DM Sans', sans-serif;
          color: var(--gray-text);
          line-height: 1.8;
          font-size: .97rem;
          font-weight: 300;
        }

        /* Value cards */
        .value-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 28px;
        }

        .value-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: var(--gray-soft);
          border-radius: 14px;
          border-left: 4px solid var(--yellow);
          transition: box-shadow .2s;
        }
        .value-card:hover { box-shadow: 0 6px 24px rgba(11,43,107,.08); }

        .value-icon {
          width: 42px; height: 42px;
          background: var(--blue-deep);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .value-icon svg { width: 20px; height: 20px; color: var(--yellow); }

        .value-title {
          font-family: 'DM Sans', sans-serif;
          font-size: .9rem;
          font-weight: 600;
          color: var(--blue-deep);
          margin-bottom: 4px;
        }
        .value-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: .83rem;
          color: var(--gray-text);
          line-height: 1.6;
          font-weight: 300;
        }

        /* Misi list */
        .misi-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 24px;
        }

        .misi-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px 20px;
          background: white;
          border-radius: 12px;
          border: 1px solid rgba(26,71,160,.1);
          transition: border-color .2s, box-shadow .2s;
        }
        .misi-item:hover {
          border-color: var(--yellow);
          box-shadow: 0 4px 16px rgba(11,43,107,.07);
        }

        .misi-num {
          width: 32px; height: 32px;
          background: var(--yellow);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-family: 'Playfair Display', serif;
          font-size: .9rem;
          font-weight: 700;
          color: var(--blue-deep);
        }

        .misi-text {
          font-family: 'DM Sans', sans-serif;
          font-size: .88rem;
          color: var(--gray-text);
          line-height: 1.65;
          font-weight: 300;
          padding-top: 5px;
        }

        /* ══════════════════
           TIM
           ══════════════════ */
        .section-tim {
          background: var(--gray-soft);
          padding: 100px 48px;
        }

        .section-tim-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .tim-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .tim-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .tim-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(26,71,160,.08);
          transition: transform .25s, box-shadow .25s;
        }
        .tim-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(11,43,107,.1);
        }

        .tim-avatar {
          height: 370px;
          overflow: hidden;
          border-bottom: 1px solid rgba(0,0,0,.05);
        }

        .tim-info { padding: 24px; }

        .tim-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--blue-deep);
          margin-bottom: 4px;
        }

        .tim-role {
          font-family: 'DM Sans', sans-serif;
          font-size: .78rem;
          font-weight: 600;
          color: var(--yellow-dark);
          text-transform: uppercase;
          letter-spacing: .08em;
        }

        /* ══════════════════
           COVERAGE
           ══════════════════ */
        .section-coverage {
          padding: 100px 48px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .coverage-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 48px;
        }

        .coverage-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px 24px;
          background: white;
          border-radius: 14px;
          border: 1px solid rgba(26,71,160,.09);
          transition: all .2s;
        }
        .coverage-item:hover {
          background: var(--blue-deep);
          border-color: var(--blue-deep);
        }
        .coverage-item:hover .coverage-icon { background: rgba(245,193,0,.2); }
        .coverage-item:hover .coverage-icon svg { color: var(--yellow); }
        .coverage-item:hover .coverage-label { color: white; }
        .coverage-item:hover .coverage-sub { color: rgba(255,255,255,.55); }

        .coverage-icon {
          width: 44px; height: 44px;
          background: var(--gray-soft);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background .2s;
        }
        .coverage-icon svg { width: 22px; height: 22px; color: var(--blue-mid); transition: color .2s; }

        .coverage-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .92rem;
          font-weight: 600;
          color: var(--blue-deep);
          transition: color .2s;
        }
        .coverage-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: .78rem;
          color: var(--gray-text);
          font-weight: 300;
          transition: color .2s;
        }

        /* ══════════════════
           CTA STRIP
           ══════════════════ */
        .cta-strip {
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          padding: 72px 48px;
          position: relative;
          overflow: hidden;
        }
        .cta-strip::before {
          content: '';
          position: absolute;
          top: -60px; right: 8%;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: rgba(245,193,0,.1);
        }

        .cta-strip-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          position: relative;
          z-index: 2;
        }

        .cta-strip h3 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          color: white;
          margin-bottom: 8px;
        }
        .cta-strip p {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,.6);
          font-size: .92rem;
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
          font-size: .9rem;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: none;
          transition: transform .2s, box-shadow .2s;
          flex-shrink: 0;
        }
        .btn-yellow:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245,193,0,.35);
        }
        .btn-yellow svg { width: 15px; height: 15px; }

        /* ══════════════════
           RESPONSIVE
           ══════════════════ */
        @media (max-width: 900px) {
          .tentang-hero { padding: 80px 24px 60px; }
          .stat-strip { padding: 0 24px; }
          .stat-strip-inner { grid-template-columns: repeat(2, 1fr); }
          .stat-strip-item:nth-child(2) { border-right: none; }
          .section-vm { grid-template-columns: 1fr; gap: 48px; padding: 60px 24px; }
          .tim-grid { grid-template-columns: 1fr 1fr; }
          .coverage-grid { grid-template-columns: 1fr; }
          .section-tim, .section-coverage { padding: 60px 24px; }
          .cta-strip { padding: 52px 24px; }
          .cta-strip-inner { flex-direction: column; text-align: center; }
        }

        @media (max-width: 600px) {
          .tentang-hero { padding: 80px 20px 56px; }
          .tim-grid { grid-template-columns: 1fr; }
          .stat-strip-inner { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="tentang-hero">
        <div className="grid-overlay" />
        <div className="tentang-hero-inner">

          {/* Back button — same as Alur */}
          <Link href="/" className="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            Kembali ke Beranda
          </Link>

          {/* Page tag pill — same as Alur */}
          <div className="page-tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            Profil Perusahaan
          </div>

          <h1>Tentang <em>Perusahaan</em><br />Kami</h1>
          <p className="hero-desc">
            Perusahaan terpercaya di bidang instalasi listrik dan pengurusan sertifikasi
            kelistrikan — melayani rumah, ruko, gedung, hingga fasilitas industri di seluruh Indonesia.
          </p>
        </div>
      </section>

      {/* ── STAT STRIP ── */}
      <div className="stat-strip">
        <div className="stat-strip-inner">
          {[
            { num: "500+", label: "Proyek Selesai", icon: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/> },
            { num: "7 Hari", label: "Rata-rata Proses", icon: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/> },
            { num: "8", label: "Teknisi Bersertifikat", icon: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/> },
            { num: "4.9 ★", label: "Rating Kepuasan", icon: <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/> },
          ].map(({ num, label, icon }) => (
            <div className="stat-strip-item" key={label}>
              <div className="strip-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{icon}</svg>
              </div>
              <div>
                <div className="strip-num">{num}</div>
                <div className="strip-label">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── VISI & MISI ── */}
      <div className="section-vm">
        {/* Visi + Nilai */}
        <div>
          <div className="section-tag-blue">Visi Kami</div>
          <h2 className="section-h2">
            Menjadi Mitra <em>Terpercaya</em><br />Sertifikasi Listrik
          </h2>
          <p className="section-body">
            Kami hadir sebagai solusi lengkap untuk kebutuhan instalasi dan
            sertifikasi listrik yang aman, legal, dan sesuai regulasi Kementerian ESDM.
            Didukung tim teknisi berpengalaman dengan standar kerja tertinggi.
          </p>

          <div className="value-cards">
            {[
              { title: "Keamanan & Kepatuhan", desc: "Setiap pekerjaan dilakukan sesuai standar keamanan nasional dan regulasi yang berlaku.", icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/> },
              { title: "Proses Cepat & Efisien", desc: "Pengurusan sertifikat selesai dalam 3–7 hari kerja dengan prosedur yang terstruktur.", icon: <path d="M13 10V3L4 14h7v7l9-11h-7z"/> },
              { title: "Komunikasi Transparan", desc: "Pelanggan mendapat update progres real-time dari awal hingga sertifikat terbit.", icon: <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/> },
            ].map(({ title, desc, icon }) => (
              <div className="value-card" key={title}>
                <div className="value-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{icon}</svg>
                </div>
                <div>
                  <div className="value-title">{title}</div>
                  <div className="value-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Misi */}
        <div>
          <div className="section-tag-blue">Misi Kami</div>
          <h2 className="section-h2">
            Apa yang Kami<br /><em>Perjuangkan</em>
          </h2>
          <p className="section-body">
            Misi kami berfokus pada penyediaan layanan berkualitas tinggi yang
            memberikan kemudahan dan kepastian bagi setiap pelanggan.
          </p>

          <div className="misi-list">
            {[
              "Memastikan seluruh proses penerbitan NIDI dilakukan sesuai standar keamanan SNI dan regulasi Kementerian ESDM.",
              "Mempercepat proses pengurusan NIDI agar pelanggan dapat segera melanjutkan ke tahap berikutnya.",
              "Memberikan layanan pengurusan NIDI yang profesional, akurat, dan dapat dipercaya.",
              "Menjangkau kebutuhan penerbitan NIDI dari skala rumah tangga hingga fasilitas industri.",
              "Membangun kepercayaan jangka panjang melalui transparansi, kualitas, dan ketepatan waktu dalam proses NIDI.",
            ].map((text, i) => (
              <div className="misi-item" key={i}>
                <div className="misi-num">{i + 1}</div>
                <div className="misi-text">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TIM ── */}
      <section className="section-tim">
        <div className="section-tim-inner">
          <div className="tim-header">
            <div className="section-tag-blue">Tim Kami</div>
            <h2 className="section-h2">Didukung Tenaga <em>Ahli</em> Bersertifikat</h2>
          </div>

          <div className="tim-grid">
            {[
              { name: "Agus Nuari",  role: "IT",                     img: "/images/aga.jpg" },
              { name: "Nesa",        role: "Admin",                   img: "/images/aga.jpg" },
              { name: "Aga",         role: "Admin",                   img: "/images/aga.jpg" },
              { name: "Somad",       role: "Penanggung Jawab Teknik", img: "/images/aga.jpg" },
              { name: "Alfian",      role: "Tenaga Teknik",           img: "/images/aga.jpg" },
              { name: "Andri",       role: "Tenaga Teknik",           img: "/images/aga.jpg" },
              { name: "Samsuri",     role: "Tenaga Teknik",           img: "/images/aga.jpg" },
              { name: "Yopi",        role: "Tenaga Teknik",           img: "/images/aga.jpg" },
              { name: "Dani",        role: "Tenaga Teknik",           img: "/images/aga.jpg" },
            ].map((member, i) => (
              <div className="tim-card" key={i}>
                <div className="tim-avatar">
                  <img
                    src={member.img}
                    alt={member.name}
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: "center top",
                    }}
                  />
                </div>
                <div className="tim-info">
                  <div className="tim-name">{member.name}</div>
                  <div className="tim-role">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COVERAGE ── */}
      <section className="section-coverage">
        <div style={{ textAlign: "center" }}>
          <div className="section-tag-blue" style={{ marginBottom: "16px" }}>Cakupan Layanan</div>
          <h2 className="section-h2">Layanan untuk Semua <em>Jenis Bangunan</em></h2>
        </div>

        <div className="coverage-grid">
          {[
            { label: "Rumah Tinggal",                  sub: "Instalasi & sertifikasi untuk hunian",          icon: <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/> },
            { label: "Ruko & Pertokoan",               sub: "Instalasi daya untuk usaha komersial",          icon: <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/> },
            { label: "Gedung Perkantoran",             sub: "Sistem listrik gedung multi-lantai",            icon: <><path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></> },
            { label: "Fasilitas Industri",             sub: "Instalasi daya besar & perizinan industri",     icon: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></> },
            { label: "Panel Surya & Energi Terbarukan",sub: "Sertifikasi instalasi panel surya",             icon: <path d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07l-.7.7M6.34 17.66l-.7.7m12.02 0l-.7-.7M6.34 6.34l-.7-.7M12 8a4 4 0 100 8 4 4 0 000-8z"/> },
            { label: "Apartemen & Kos",                sub: "Sistem listrik multi-unit hunian",              icon: <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/> },
          ].map(({ icon, label, sub }, i) => (
            <div className="coverage-item" key={i}>
              <div className="coverage-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{icon}</svg>
              </div>
              <div>
                <div className="coverage-label">{label}</div>
                <div className="coverage-sub">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="cta-strip">
        <div className="cta-strip-inner">
          <div>
            <h3>Siap Bekerja Sama dengan Kami?</h3>
            <p>Konsultasikan kebutuhan instalasi & sertifikasi listrik Anda sekarang.</p>
          </div>
          <a href="/kontak" className="btn-yellow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            Hubungi Kami
          </a>
        </div>
      </section>

    </main>
  );
}