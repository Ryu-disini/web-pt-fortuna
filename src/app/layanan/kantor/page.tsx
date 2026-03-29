import Link from "next/link";

export default function Kantor() {
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
        .kantor-hero {
          background: var(--blue-deep);
          position: relative; overflow: hidden;
          padding: 100px 48px 80px;
        }
        .kantor-hero::before {
          content: '';
          position: absolute; top: -120px; right: -80px;
          width: 480px; height: 480px; border-radius: 50%;
          background: radial-gradient(circle, rgba(245,193,0,0.14) 0%, transparent 70%);
        }
        .kantor-hero::after {
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
          width: fit-content;
          display: flex;
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

        .kantor-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900; color: #fff;
          line-height: 1.12; margin-bottom: 14px;
        }
        .kantor-hero h1 em { font-style: italic; color: var(--yellow); }
        .kantor-hero p {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.6); font-size: 1rem;
          line-height: 1.8; font-weight: 300; max-width: 520px;
        }

        /* YELLOW STRIP */
        .yellow-strip {
          background: var(--yellow);
          padding: 16px 48px;
        }
        .yellow-strip-inner {
          max-width: 1000px; margin: 0 auto;
          display: flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 600; color: var(--blue-deep);
        }
        .yellow-strip svg { width: 17px; height: 17px; flex-shrink: 0; }

        /* MAIN */
        .kantor-main {
          max-width: 1000px; margin: 0 auto;
          padding: 56px 48px 80px;
          display: flex; flex-direction: column; gap: 28px;
        }

        /* MAIN KANTOR CARD */
        .kantor-card {
          background: white; border-radius: 20px;
          border: 1px solid rgba(26,71,160,0.08);
          overflow: hidden;
          box-shadow: 0 4px 28px rgba(11,43,107,0.07);
        }

        .kantor-card-header {
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          padding: 28px 36px;
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
          position: relative; overflow: hidden;
        }
        .kantor-card-header::before {
          content: '';
          position: absolute; top: -40px; right: -40px;
          width: 160px; height: 160px; border-radius: 50%;
          background: rgba(245,193,0,0.1);
        }

        .kantor-header-left {
          display: flex; align-items: center; gap: 16px;
          position: relative; z-index: 1;
        }
        .kantor-header-icon {
          width: 52px; height: 52px;
          background: var(--yellow); border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .kantor-header-icon svg { width: 26px; height: 26px; color: var(--blue-deep); }

        .kantor-header-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem; font-weight: 700; color: white; margin-bottom: 3px;
        }
        .kantor-header-type {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; color: rgba(255,255,255,0.55);
          text-transform: uppercase; letter-spacing: 0.1em;
        }

        .open-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(16,185,129,0.15);
          border: 1px solid rgba(16,185,129,0.35);
          color: #6EE7B7;
          padding: 7px 14px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.76rem; font-weight: 600;
          position: relative; z-index: 1;
          white-space: nowrap;
        }
        .open-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #10B981;
          animation: pulse 1.8s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        /* CONTACT ROWS */
        .contact-rows {
          padding: 32px 36px;
          display: flex; flex-direction: column; gap: 0;
        }

        .contact-row {
          display: flex; align-items: center;
          gap: 16px; padding: 18px 0;
          border-bottom: 1px solid rgba(26,71,160,0.06);
          transition: background 0.2s;
          text-decoration: none;
        }
        .contact-row:last-child { border-bottom: none; }
        .contact-row:hover { background: transparent; }
        .contact-row:hover .contact-row-label { color: var(--blue-light); }

        .contact-row-icon {
          width: 44px; height: 44px; flex-shrink: 0;
          background: var(--gray-soft);
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(26,71,160,0.07);
          transition: background 0.2s, border-color 0.2s;
        }
        .contact-row:hover .contact-row-icon {
          background: var(--blue-deep);
          border-color: var(--blue-deep);
        }
        .contact-row-icon svg { width: 20px; height: 20px; color: var(--blue-mid); transition: color 0.2s; }
        .contact-row:hover .contact-row-icon svg { color: var(--yellow); }

        .contact-row-content { flex: 1; }
        .contact-row-key {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: var(--gray-text); margin-bottom: 3px;
        }
        .contact-row-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem; font-weight: 500;
          color: var(--blue-deep); transition: color 0.2s;
        }

        .contact-row-arrow {
          width: 28px; height: 28px;
          background: rgba(26,71,160,0.05);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s, transform 0.2s;
        }
        .contact-row-arrow svg { width: 13px; height: 13px; color: var(--blue-mid); }
        .contact-row:hover .contact-row-arrow {
          background: var(--yellow);
          transform: translateX(3px);
        }
        .contact-row:hover .contact-row-arrow svg { color: var(--blue-deep); }

        /* JAM OPERASIONAL */
        .jam-card {
          background: white; border-radius: 20px;
          border: 1px solid rgba(26,71,160,0.08);
          overflow: hidden;
          box-shadow: 0 4px 28px rgba(11,43,107,0.05);
        }

        .jam-header {
          background: var(--yellow);
          padding: 20px 28px;
          display: flex; align-items: center; gap: 12px;
        }
        .jam-header svg { width: 20px; height: 20px; color: var(--blue-deep); }
        .jam-header-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem; font-weight: 700; color: var(--blue-deep);
        }

        .jam-rows {
          padding: 8px 0;
        }
        .jam-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 28px;
          border-bottom: 1px solid rgba(26,71,160,0.05);
        }
        .jam-row:last-child { border-bottom: none; }
        .jam-row.today {
          background: rgba(245,193,0,0.06);
        }
        .jam-day {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 500; color: var(--blue-deep);
          display: flex; align-items: center; gap: 8px;
        }
        .today-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--yellow); flex-shrink: 0;
        }
        .jam-time {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem; color: var(--gray-text); font-weight: 400;
        }
        .jam-closed {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; color: #F87171; font-weight: 500;
        }

        /* MAP PLACEHOLDER */
        .map-card {
          background: white; border-radius: 20px;
          border: 1px solid rgba(26,71,160,0.08);
          overflow: hidden;
          box-shadow: 0 4px 28px rgba(11,43,107,0.05);
        }

        .map-header {
          padding: 20px 28px;
          border-bottom: 1px solid rgba(26,71,160,0.06);
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
        }
        .map-header-left {
          display: flex; align-items: center; gap: 10px;
        }
        .map-header-left svg { width: 18px; height: 18px; color: var(--blue-mid); }
        .map-header-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 600; color: var(--blue-deep);
        }

        .map-open-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; font-weight: 600;
          color: var(--blue-mid); text-decoration: none;
          border: 1.5px solid rgba(26,71,160,0.15);
          padding: 6px 14px; border-radius: 8px;
          transition: background 0.2s, color 0.2s;
        }
        .map-open-btn:hover { background: var(--blue-deep); color: white; border-color: var(--blue-deep); }
        .map-open-btn svg { width: 13px; height: 13px; }

        .map-placeholder {
          height: 220px;
          background: linear-gradient(135deg, var(--gray-soft) 0%, rgba(26,71,160,0.04) 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 14px;
          position: relative; overflow: hidden;
        }
        .map-placeholder::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(26,71,160,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,71,160,0.05) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .map-pin {
          width: 56px; height: 56px;
          background: var(--blue-deep); border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 1;
          box-shadow: 0 6px 20px rgba(11,43,107,0.25);
        }
        .map-pin svg { width: 24px; height: 24px; color: var(--yellow); transform: rotate(45deg); }
        .map-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; color: var(--gray-text); font-weight: 400;
          position: relative; z-index: 1;
        }
        .map-label strong { color: var(--blue-deep); font-weight: 600; }

        /* TWO COL */
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }

        /* CTA */
        .kantor-cta {
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          border-radius: 20px; padding: 36px 40px;
          position: relative; overflow: hidden;
          display: flex; align-items: center;
          justify-content: space-between; gap: 24px;
        }
        .kantor-cta::before {
          content: '';
          position: absolute; top: -40px; right: -40px;
          width: 180px; height: 180px; border-radius: 50%;
          background: rgba(245,193,0,0.1);
        }
        .kantor-cta-text { position: relative; z-index: 1; }
        .kantor-cta h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem; color: white; margin-bottom: 5px;
        }
        .kantor-cta p {
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
          padding: 12px 22px; border-radius: 10px;
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
          padding: 12px 22px; border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.3);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 500;
          text-decoration: none; white-space: nowrap;
          transition: background 0.2s, border-color 0.2s;
        }
        .btn-outline-white:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.6); }
        .btn-outline-white svg { width: 15px; height: 15px; }

        @media (max-width: 768px) {
          .kantor-hero { padding: 80px 24px 60px; }
          .yellow-strip { padding: 14px 24px; }
          .kantor-main { padding: 36px 24px 60px; }
          .two-col { grid-template-columns: 1fr; }
          .kantor-card-header { flex-direction: column; align-items: flex-start; }
          .contact-rows { padding: 20px 20px; }
          .kantor-cta { flex-direction: column; padding: 28px; }
          .cta-btns { flex-direction: column; width: 100%; }
          .btn-yellow, .btn-outline-white { justify-content: center; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="kantor-hero">
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
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            Kantor Pelayanan
          </div> */}

          <h1>Kunjungi Kantor<br /><em>Pelayanan</em> Kami</h1>
          <p>
            Kami menyediakan layanan pengurusan NIDI melalui kantor pelayanan
            resmi. Tim kami siap melayani Anda secara langsung dengan profesional.
          </p>
        </div>
      </section>

      {/* ── YELLOW STRIP ── */}
      <div className="yellow-strip">
        <div className="yellow-strip-inner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Konsultasi tatap muka tersedia setiap hari kerja. Tidak perlu membuat janji — datang langsung!
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="kantor-main">

        {/* MAIN KANTOR CARD */}
        <div className="kantor-card">
          <div className="kantor-card-header">
            <div className="kantor-header-left">
              <div className="kantor-header-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <div>
                <div className="kantor-header-name">Kantor Wilayah Jabar</div>
                <div className="kantor-header-type">Kantor Pelayanan Resmi</div>
              </div>
            </div>
            <div className="open-badge">
              <div className="open-badge-dot" />
              Buka Sekarang
            </div>
          </div>

          <div className="contact-rows">
            {/* ALAMAT */}
            <a
              href="https://maps.google.com/?q=Bogor,Indonesia"
              target="_blank"
              rel="noreferrer"
              className="contact-row"
            >
              <div className="contact-row-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div className="contact-row-content">
                <div className="contact-row-key">Alamat</div>
                <div className="contact-row-label">Bogor, Jawa Barat, Indonesia</div>
              </div>
              <div className="contact-row-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </a>

            {/* TELEPON */}
            <a href="tel:+6281288131149" className="contact-row">
              <div className="contact-row-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div className="contact-row-content">
                <div className="contact-row-key">Telepon</div>
                <div className="contact-row-label">0812-8813-1149</div>
              </div>
              <div className="contact-row-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </a>

            {/* WHATSAPP */}
            <a href="https://wa.me/6281288131149" target="_blank" rel="noreferrer" className="contact-row">
              <div className="contact-row-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <div className="contact-row-content">
                <div className="contact-row-key">WhatsApp</div>
                <div className="contact-row-label">0812-8813-1149</div>
              </div>
              <div className="contact-row-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </a>

            {/* EMAIL */}
            <a href="mailto:info@nidi-company.com" className="contact-row">
              <div className="contact-row-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div className="contact-row-content">
                <div className="contact-row-key">Email</div>
                <div className="contact-row-label">info@nidi-company.com</div>
              </div>
              <div className="contact-row-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* JAM & MAP */}
        <div className="two-col">

          {/* JAM OPERASIONAL */}
          <div className="jam-card">
            <div className="jam-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div className="jam-header-title">Jam Operasional</div>
            </div>
            <div className="jam-rows">
              {[
                { day: "Senin", time: "08.00 – 17.00 WIB", today: true },
                { day: "Selasa", time: "08.00 – 17.00 WIB" },
                { day: "Rabu", time: "08.00 – 17.00 WIB" },
                { day: "Kamis", time: "08.00 – 17.00 WIB" },
                { day: "Jumat", time: "08.00 – 16.30 WIB" },
                { day: "Sabtu", time: "08.00 – 13.00 WIB" },
                { day: "Minggu", time: null },
              ].map(({ day, time, today }) => (
                <div className={`jam-row${today ? " today" : ""}`} key={day}>
                  <div className="jam-day">
                    {today && <div className="today-dot" />}
                    {day}
                    {today && (
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: "var(--yellow-dark)", background: "rgba(245,193,0,0.12)", padding: "1px 7px", borderRadius: 4 }}>
                        Hari ini
                      </span>
                    )}
                  </div>
                  {time
                    ? <div className="jam-time">{time}</div>
                    : <div className="jam-closed">Tutup</div>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* MAP */}
          <div className="map-card">
            <div className="map-header">
              <div className="map-header-left">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
                <div className="map-header-title">Lokasi Kantor</div>
              </div>
              <a
                href="https://maps.google.com/?q=Bogor,Indonesia"
                target="_blank"
                rel="noreferrer"
                className="map-open-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                Buka Maps
              </a>
            </div>
            <div className="map-placeholder">
              <div className="map-pin">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div className="map-label">
                <strong>Bogor</strong>, Jawa Barat, Indonesia
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="kantor-cta">
          <div className="kantor-cta-text">
            <h3>Ingin Datang Langsung?</h3>
            <p>Hubungi kami terlebih dahulu untuk memastikan tim tersedia dan siap melayani Anda.</p>
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