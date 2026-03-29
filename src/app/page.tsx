export default function Home() {
  return (
    <main style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#fff", overflowX: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

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

        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }

        /* HERO */
        .hero {
          background: var(--blue-deep);
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -120px; right: -120px;
          width: 520px; height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,193,0,0.18) 0%, transparent 70%);
        }

        .hero::after {
          content: '';
          position: absolute;
          bottom: -80px; left: -80px;
          width: 380px; height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%);
        }

        .hero-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(245,193,0,0.15);
          border: 1px solid rgba(245,193,0,0.4);
          color: var(--yellow);
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }

        .hero-badge svg { width: 14px; height: 14px; flex-shrink: 0; }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          font-weight: 900;
          color: var(--white);
          line-height: 1.12;
          margin-bottom: 24px;
          letter-spacing: -0.01em;
        }

        .hero-title span {
          color: var(--yellow);
        }

        .hero-desc {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.72);
          font-size: 1.05rem;
          line-height: 1.75;
          margin-bottom: 40px;
          font-weight: 300;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--yellow);
          color: var(--blue-deep);
          padding: 14px 28px;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245,193,0,0.4);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: var(--white);
          padding: 14px 28px;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.95rem;
          border: 1.5px solid rgba(255,255,255,0.35);
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.6);
        }

        .hero-btns {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        /* HERO CARD */
        .hero-card-wrap {
          position: relative;
        }

        .hero-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          padding: 36px;
          backdrop-filter: blur(12px);
        }

        .hero-card-title {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.55);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 20px;
        }

        .stat-row {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .stat-icon {
          width: 44px; height: 44px;
          background: var(--yellow);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-icon svg { width: 22px; height: 22px; color: var(--blue-deep); }

        .stat-label {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.55);
          font-size: 0.78rem;
          margin-bottom: 2px;
        }

        .stat-value {
          font-family: 'Playfair Display', serif;
          color: var(--white);
          font-size: 1.15rem;
          font-weight: 700;
        }

        .accent-dot {
          position: absolute;
          top: -16px; right: -16px;
          width: 48px; height: 48px;
          background: var(--yellow);
          border-radius: 50%;
          opacity: 0.8;
        }

        /* TENTANG */
        .section-about {
          padding: 100px 48px;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .section-tag {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--blue-mid);
          background: rgba(26,71,160,0.08);
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 20px;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.9rem, 3vw, 2.8rem);
          font-weight: 700;
          color: var(--blue-deep);
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .section-title em {
          font-style: italic;
          color: var(--blue-light);
        }

        .section-desc {
          font-family: 'DM Sans', sans-serif;
          color: var(--gray-text);
          line-height: 1.8;
          font-size: 1rem;
          font-weight: 300;
        }

        .about-visual {
          position: relative;
        }

        .about-card-main {
          background: var(--blue-deep);
          border-radius: 20px;
          padding: 40px;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .about-card-main::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 160px; height: 160px;
          border-radius: 50%;
          background: rgba(245,193,0,0.12);
        }

        .about-icon-wrap {
          width: 56px; height: 56px;
          background: var(--yellow);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
        }

        .about-icon-wrap svg { width: 28px; height: 28px; color: var(--blue-deep); }

        .about-card-main h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          margin-bottom: 10px;
        }

        .about-card-main p {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.68);
          font-size: 0.9rem;
          line-height: 1.7;
          font-weight: 300;
        }

        .about-mini-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 14px;
        }

        .about-mini {
          background: var(--gray-soft);
          border-radius: 14px;
          padding: 18px;
          border: 1px solid rgba(26,71,160,0.08);
        }

        .about-mini-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--blue-deep);
          line-height: 1;
          margin-bottom: 4px;
        }

        .about-mini-num span {
          color: var(--yellow-dark);
        }

        .about-mini-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          color: var(--gray-text);
        }

        /* LAYANAN */
        .section-layanan {
          background: var(--gray-soft);
          padding: 100px 48px;
        }

        .section-layanan-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .layanan-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .layanan-card {
          background: white;
          border-radius: 20px;
          padding: 40px 32px;
          border: 1px solid rgba(26,71,160,0.08);
          transition: transform 0.25s, box-shadow 0.25s;
          position: relative;
          overflow: hidden;
        }

        .layanan-card::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--blue-mid), var(--yellow));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .layanan-card:hover::before { transform: scaleX(1); }
        .layanan-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(11,43,107,0.12); }

        .layanan-icon {
          width: 60px; height: 60px;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
        }

        .layanan-icon svg { width: 28px; height: 28px; color: var(--yellow); }

        .layanan-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          color: var(--blue-deep);
          margin-bottom: 12px;
          font-weight: 700;
        }

        .layanan-desc {
          font-family: 'DM Sans', sans-serif;
          color: var(--gray-text);
          font-size: 0.9rem;
          line-height: 1.75;
          font-weight: 300;
        }

        .layanan-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--blue-mid);
          text-decoration: none;
          cursor: pointer;
        }

        .layanan-link svg { width: 14px; height: 14px; transition: transform 0.2s; }
        .layanan-card:hover .layanan-link svg { transform: translateX(4px); }

        /* PROSES */
        .section-proses {
          padding: 100px 48px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .proses-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
          margin-top: 60px;
        }

        .proses-connector {
          position: absolute;
          top: 36px;
          left: 12.5%;
          right: 12.5%;
          height: 2px;
          background: repeating-linear-gradient(
            90deg,
            var(--blue-light) 0px,
            var(--blue-light) 8px,
            transparent 8px,
            transparent 18px
          );
          z-index: 0;
        }

        .proses-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 16px;
          position: relative;
          z-index: 1;
        }

        .proses-num {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: white;
          border: 3px solid var(--blue-light);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
          position: relative;
        }

        .proses-num-inner {
          width: 52px; height: 52px;
          border-radius: 50%;
          background: var(--blue-deep);
          display: flex; align-items: center; justify-content: center;
        }

        .proses-num-inner svg { width: 24px; height: 24px; color: var(--yellow); }

        .proses-item:nth-child(even) .proses-num { border-color: var(--yellow-dark); }
        .proses-item:nth-child(even) .proses-num-inner { background: var(--yellow); }
        .proses-item:nth-child(even) .proses-num-inner svg { color: var(--blue-deep); }

        .proses-step-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--blue-light);
          font-weight: 600;
          margin-bottom: 6px;
        }

        .proses-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem;
          color: var(--blue-deep);
          font-weight: 700;
          margin-bottom: 10px;
        }

        .proses-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.83rem;
          color: var(--gray-text);
          line-height: 1.65;
          font-weight: 300;
        }

        /* CTA */
        .section-cta {
          background: linear-gradient(135deg, var(--blue-deep) 0%, var(--blue-mid) 100%);
          padding: 80px 48px;
          position: relative;
          overflow: hidden;
        }

        .section-cta::before {
          content: '';
          position: absolute;
          top: -60px; right: 10%;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: rgba(245,193,0,0.1);
        }

        .section-cta::after {
          content: '';
          position: absolute;
          bottom: -80px; left: 5%;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
        }

        .cta-inner {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          color: white;
          font-weight: 700;
          margin-bottom: 16px;
          line-height: 1.25;
        }

        .cta-desc {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.65);
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 36px;
          font-weight: 300;
        }

        /* FOOTER */
        footer {
          background: #08193F;
          padding: 32px 48px;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.35);
          font-size: 0.82rem;
        }

        footer span { color: var(--yellow); }

        @media (max-width: 900px) {
          .hero-inner, .section-about { grid-template-columns: 1fr; gap: 40px; padding: 60px 24px; }
          .layanan-grid { grid-template-columns: 1fr; }
          .proses-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
          .proses-connector { display: none; }
          .section-layanan, .section-proses { padding: 60px 24px; }
          .section-cta { padding: 60px 24px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-grid-overlay" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Resmi & Terpercaya
            </div>

            <h1 className="hero-title">
              Jasa Pengurusan<br />
              <span>NIDI</span><br />
              Profesional
            </h1>

            <p className="hero-desc">
              Membantu pengurusan Nomer Identitas Instalasi (NIDI) untuk kebutuhan
              pemasangan listrik baru atau tambah daya PLN — cepat, resmi, dan terpercaya.
            </p>

            <div className="hero-btns">
              <button className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                Konsultasi Sekarang
              </button>
              <button className="btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 9l-7 7-7-7"/>
                </svg>
                Pelajari Layanan
              </button>
            </div>
          </div>

          <div className="hero-card-wrap">
            <div className="accent-dot" />
            <div className="hero-card">
              <div className="hero-card-title">Keunggulan Kami</div>
              <div className="stat-row">
                <div className="stat-item">
                  <div className="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="stat-label">Proses Tercepat</div>
                    <div className="stat-value">1–7 Hari Kerja</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="stat-label">Jaminan</div>
                    <div className="stat-value">100% Resmi ESDM</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="stat-label">Pelanggan Dilayani</div>
                    <div className="stat-value">500+ Klien</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TENTANG ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="section-about">
          <div>
            <div className="section-tag">Tentang Kami</div>
            <h2 className="section-title">
              Solusi <em>Terpercaya</em> untuk<br />Sertifikasi Listrik Anda
            </h2>
            <p className="section-desc">
              Kami adalah perusahaan yang menyediakan layanan pengurusan NIDI untuk instalasi listrik rumah, kantor, ruko,
              maupun industri. Proses cepat, resmi, dan sesuai standar Kementerian ESDM.
            </p>
            <p className="section-desc" style={{ marginTop: "16px" }}>
              Didukung oleh tenaga ahli bersertifikat yang berpengalaman, kami memastikan
              setiap instalasi listrik Anda aman, legal, dan siap terhubung dengan jaringan PLN.
            </p>
          </div>

          <div className="about-visual">
            <div className="about-card-main">
              <div className="about-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3>Berlisensi Resmi</h3>
              <p>Seluruh proses dilakukan sesuai regulasi Kementerian ESDM dan terdaftar secara resmi pada sistem perizinan nasional.</p>
            </div>

            <div className="about-mini-cards">
              <div className="about-mini">
                <div className="about-mini-num">500<span>+</span></div>
                <div className="about-mini-label">Proyek selesai</div>
              </div>
              <div className="about-mini">
                <div className="about-mini-num">7<span>hr</span></div>
                <div className="about-mini-label">Rata-rata proses</div>
              </div>
              <div className="about-mini">
                <div className="about-mini-num">100<span>%</span></div>
                <div className="about-mini-label">Disetujui PLN</div>
              </div>
              <div className="about-mini">
                <div className="about-mini-num">4.9<span>★</span></div>
                <div className="about-mini-label">Rating klien</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── LAYANAN ── */}
      <section className="section-layanan">
        <div className="section-layanan-inner">
          <div className="section-header">
            <div className="section-tag">Layanan Kami</div>
            <h2 className="section-title">Apa yang Kami Kerjakan</h2>
          </div>

          <div className="layanan-grid">
            <div className="layanan-card">
              <div className="layanan-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                </svg>
              </div>
              <div className="layanan-title">Pengurusan NIDI</div>
              <div className="layanan-desc">
                Pengurusan Nomor Identitas Instalasi listrik sebagai identitas resmi instalasi tenaga listrik yang diakui secara nasional.
              </div>
              <div className="layanan-link">
                Selengkapnya
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </div>

            <div className="layanan-card">
              <div className="layanan-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <div className="layanan-title">Pengerjaan Instalasi</div>
              <div className="layanan-desc">

              </div>
              <div className="layanan-link">
                Selengkapnya
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </div>

            <div className="layanan-card">
              <div className="layanan-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div className="layanan-title">Instalasi Listrik</div>
              <div className="layanan-desc">
                Jasa pemasangan instalasi listrik rumah, ruko, kantor, dan bangunan komersial lainnya oleh teknisi bersertifikat.
              </div>
              <div className="layanan-link">
                Selengkapnya
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROSES ── */}
      <section style={{ background: "white", padding: "100px 48px" }}>
        <div className="section-proses" style={{ padding: 0 }}>
          <div className="section-header">
            <div className="section-tag">Alur Kerja</div>
            <h2 className="section-title">Proses Mudah & Transparan</h2>
          </div>

          <div className="proses-grid">
            <div className="proses-connector" />

            <div className="proses-item">
              <div className="proses-num">
                <div className="proses-num-inner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
              </div>
              <div className="proses-step-label">Langkah 01</div>
              <div className="proses-title">Konsultasi</div>
              <div className="proses-desc">Hubungi tim kami untuk konsultasi kebutuhan listrik Anda secara gratis</div>
            </div>

            <div className="proses-item">
              <div className="proses-num">
                <div className="proses-num-inner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
              </div>
              <div className="proses-step-label">Langkah 02</div>
              <div className="proses-title">Pengajuan Data</div>
              <div className="proses-desc">Kirimkan dokumen dan data instalasi melalui platform kami</div>
            </div>

            <div className="proses-item">
              <div className="proses-num">
                <div className="proses-num-inner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
              </div>
              <div className="proses-step-label">Langkah 03</div>
              <div className="proses-title">Proses NIDI</div>
              <div className="proses-desc">Tim ahli kami memproses pengajuan sertifikat secara resmi</div>
            </div>

            <div className="proses-item">
              <div className="proses-num">
                <div className="proses-num-inner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <div className="proses-step-label">Langkah 04</div>
              <div className="proses-title">Sertifikat Terbit</div>
              <div className="proses-desc">Dokumen resmi siap digunakan untuk pengajuan ke PLN</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-cta">
        <div className="cta-inner">
          <h2 className="cta-title">Siap Urus NIDI Anda?</h2>
          <p className="cta-desc">
            Konsultasikan kebutuhan listrik Anda sekarang. Tim kami siap membantu proses perizinan secara profesional dan efisien.
          </p>
          <div className="hero-btns" style={{ justifyContent: "center" }}>
            <button className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Hubungi Kami
            </button>
            <button className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
              </svg>
              WhatsApp Kami
            </button>
          </div>
        </div>
      </section>

      
    </main>
  );
} 