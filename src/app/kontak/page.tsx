"use client";

import { useState } from "react";

export default function Kontak() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [sent, setSent] = useState(false);

  const kirimPesan = (e: any) => {
    e.preventDefault();
    const text = `Halo, saya ingin konsultasi.\n\nNama: ${nama}\nEmail: ${email}\n\nPesan:\n${pesan}`;
    const url = "https://wa.me/6281288131149?text=" + encodeURIComponent(text);
    window.open(url, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const contacts = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      label: "Email",
      value: "info@nidi-slo.com",
      href: "mailto:info@nidi-slo.com",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      ),
      label: "Telepon",
      value: "0812-8813-1149",
      href: "tel:+6281288131149",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
      label: "Alamat",
      value: "Bogor, Jawa Barat, Indonesia",
      href: "https://maps.google.com/?q=Bogor,Indonesia",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      label: "Jam Operasional",
      value: "Senin–Sabtu, 10.00–17.00 WIB",
      href: null,
    },
  ];

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
        .kontak-hero {
          background: var(--blue-deep);
          position: relative; overflow: hidden;
          padding: 100px 48px 80px;
        }
        .kontak-hero::before {
          content: '';
          position: absolute; top: -120px; right: -80px;
          width: 480px; height: 480px; border-radius: 50%;
          background: radial-gradient(circle, rgba(245,193,0,0.14) 0%, transparent 70%);
        }
        .kontak-hero::after {
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
          max-width: 1100px; margin: 0 auto;
          position: relative; z-index: 2;
        }
        .breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem; color: rgba(255,255,255,0.4);
          margin-bottom: 32px;
        }
        .breadcrumb a { color: rgba(255,255,255,0.55); text-decoration: none; }
        .breadcrumb a:hover { color: var(--yellow); }
        .breadcrumb svg { width: 12px; height: 12px; }
        .breadcrumb span { color: var(--yellow); }

        .page-tag {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(245,193,0,0.15);
          border: 1px solid rgba(245,193,0,0.35);
          color: var(--yellow); padding: 6px 16px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 24px;
        }
        .page-tag svg { width: 13px; height: 13px; }

        .kontak-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 900; color: #fff;
          line-height: 1.12; margin-bottom: 18px;
          letter-spacing: -0.01em;
        }
        .kontak-hero h1 em { font-style: italic; color: var(--yellow); }
        .kontak-hero p {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.6);
          font-size: 1rem; line-height: 1.8;
          font-weight: 300; max-width: 500px;
        }

        /* MAIN LAYOUT */
        .kontak-body {
          max-width: 1100px; margin: 0 auto;
          padding: 56px 48px 80px;
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 40px;
          align-items: start;
        }

        /* LEFT — CONTACT INFO */
        .contact-info-panel {
          display: flex; flex-direction: column; gap: 16px;
        }

        .panel-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 700;
          color: var(--blue-deep); margin-bottom: 4px;
        }
        .panel-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; color: var(--gray-text);
          font-weight: 300; line-height: 1.7;
          margin-bottom: 8px;
        }

        .contact-card {
          background: white; border-radius: 14px;
          border: 1px solid rgba(26,71,160,0.08);
          padding: 18px 20px;
          display: flex; align-items: flex-start; gap: 14px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .contact-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(11,43,107,0.1);
          border-color: var(--yellow);
        }
        .contact-card-icon {
          width: 44px; height: 44px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .contact-card:hover .contact-card-icon { background: var(--yellow); }
        .contact-card-icon svg { width: 20px; height: 20px; color: var(--yellow); transition: color 0.2s; }
        .contact-card:hover .contact-card-icon svg { color: var(--blue-deep); }
        .contact-card-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--gray-text); margin-bottom: 3px;
        }
        .contact-card-value {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem; font-weight: 500;
          color: var(--blue-deep);
        }

        /* WA BUTTON */
        .wa-btn {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          background: #25D366; color: white;
          padding: 15px 24px; border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem; font-weight: 600;
          text-decoration: none; margin-top: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
          border: none; cursor: pointer;
        }
        .wa-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(37,211,102,0.3);
        }
        .wa-btn svg { width: 20px; height: 20px; }

        /* RIGHT — FORM */
        .form-panel {
          background: white; border-radius: 20px;
          border: 1px solid rgba(26,71,160,0.08);
          padding: 40px;
          box-shadow: 0 4px 32px rgba(11,43,107,0.07);
        }

        .form-header {
          margin-bottom: 32px;
        }
        .form-tag {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--blue-mid);
          background: rgba(26,71,160,0.08);
          padding: 4px 12px; border-radius: 100px;
          margin-bottom: 12px;
        }
        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem; font-weight: 700;
          color: var(--blue-deep); margin-bottom: 8px;
        }
        .form-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem; color: var(--gray-text);
          font-weight: 300; line-height: 1.65;
        }

        /* FORM FIELDS */
        .form-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
          margin-bottom: 16px;
        }
        .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .form-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem; font-weight: 600;
          color: var(--blue-deep); letter-spacing: 0.03em;
        }
        .form-label span { color: var(--yellow-dark); }

        .input-wrap { position: relative; }
        .input-wrap svg {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%);
          width: 16px; height: 16px; color: #9CA3AF;
          pointer-events: none; transition: color 0.2s;
        }
        .input-wrap:focus-within svg { color: var(--blue-mid); }

        .form-input {
          width: 100%; padding: 12px 16px 12px 42px;
          border-radius: 10px;
          border: 1.5px solid rgba(26,71,160,0.12);
          background: var(--gray-soft);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; color: var(--blue-deep);
          outline: none; transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .form-input:focus {
          border-color: var(--blue-light);
          background: white;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }
        .form-input::placeholder { color: #9CA3AF; font-weight: 300; }

        .textarea-wrap { position: relative; }
        .textarea-wrap svg {
          position: absolute; left: 14px; top: 16px;
          width: 16px; height: 16px; color: #9CA3AF;
          pointer-events: none; transition: color 0.2s;
        }
        .textarea-wrap:focus-within svg { color: var(--blue-mid); }

        .form-textarea {
          width: 100%; padding: 12px 16px 12px 42px;
          border-radius: 10px;
          border: 1.5px solid rgba(26,71,160,0.12);
          background: var(--gray-soft);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; color: var(--blue-deep);
          outline: none; resize: vertical; min-height: 130px;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          line-height: 1.6;
        }
        .form-textarea:focus {
          border-color: var(--blue-light);
          background: white;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }
        .form-textarea::placeholder { color: #9CA3AF; font-weight: 300; }

        /* SUBMIT */
        .submit-btn {
          width: 100%; padding: 15px;
          background: linear-gradient(90deg, var(--blue-deep), var(--blue-mid));
          color: white; border: none; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem; font-weight: 600;
          cursor: pointer; margin-top: 8px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .submit-btn:hover {
          opacity: 0.92; transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(11,43,107,0.25);
        }
        .submit-btn svg { width: 18px; height: 18px; }

        /* SUCCESS STATE */
        .success-toast {
          display: flex; align-items: center; gap: 12px;
          background: #ECFDF5; border: 1px solid #6EE7B7;
          border-radius: 10px; padding: 14px 18px;
          margin-top: 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; color: #065F46; font-weight: 500;
        }
        .success-toast svg { width: 18px; height: 18px; color: #10B981; flex-shrink: 0; }

        /* DIVIDER */
        .or-divider {
          display: flex; align-items: center; gap: 12px;
          margin: 20px 0;
        }
        .or-divider::before, .or-divider::after {
          content: ''; flex: 1;
          height: 1px; background: rgba(26,71,160,0.1);
        }
        .or-divider span {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; color: #9CA3AF; font-weight: 400;
        }

        @media (max-width: 900px) {
          .kontak-hero { padding: 80px 24px 60px; }
          .kontak-body { grid-template-columns: 1fr; padding: 36px 24px 60px; gap: 32px; }
          .form-panel { padding: 28px 24px; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="kontak-hero">
        <div className="grid-overlay" />
        <div className="hero-inner">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span>Kontak</span>
          </div>
          <div className="page-tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            Hubungi Kami
          </div>
          <h1>Siap Membantu <em>Anda</em><br />Kapan Saja</h1>
          <p>
            Konsultasikan kebutuhan instalasi dan sertifikasi listrik Anda.
            Tim kami siap merespons dengan cepat dan profesional.
          </p>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="kontak-body">

        {/* LEFT — INFO */}
        <div className="contact-info-panel">
          <div>
            <div className="panel-title">Informasi Kontak</div>
            <div className="panel-sub">
              Jangan ragu untuk menghubungi kami melalui salah satu kanal berikut.
              Kami berkomitmen merespons dalam 1×24 jam kerja.
            </div>
          </div>

          {contacts.map(({ icon, label, value, href }) =>
            href ? (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="contact-card">
                <div className="contact-card-icon">{icon}</div>
                <div>
                  <div className="contact-card-label">{label}</div>
                  <div className="contact-card-value">{value}</div>
                </div>
              </a>
            ) : (
              <div key={label} className="contact-card">
                <div className="contact-card-icon">{icon}</div>
                <div>
                  <div className="contact-card-label">{label}</div>
                  <div className="contact-card-value">{value}</div>
                </div>
              </div>
            )
          )}

          <div className="or-divider"><span>atau langsung chat</span></div>

          <a href="https://wa.me/6281288131149" target="_blank" rel="noreferrer" className="wa-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat via WhatsApp
          </a>
        </div>

        {/* RIGHT — FORM */}
        <div className="form-panel">
          <div className="form-header">
            <div className="form-tag">Formulir Kontak</div>
            <div className="form-title">Kirim Pesan ke Kami</div>
            <div className="form-desc">
              Isi formulir di bawah dan pesan Anda akan langsung diteruskan melalui WhatsApp kepada tim kami.
            </div>
          </div>

          <form onSubmit={kirimPesan}>
            <div className="form-row">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Nama Lengkap <span>*</span></label>
                <div className="input-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Masukkan nama lengkap"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Alamat Email <span>*</span></label>
                <div className="input-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Pesan / Pertanyaan <span>*</span></label>
              <div className="textarea-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                </svg>
                <textarea
                  className="form-textarea"
                  placeholder="Tuliskan kebutuhan atau pertanyaan Anda di sini..."
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              Kirim via WhatsApp
            </button>

            {sent && (
              <div className="success-toast">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Pesan berhasil diteruskan! Tim kami akan segera merespons.
              </div>
            )}
          </form>

          <div style={{ marginTop: 24, padding: "16px", background: "rgba(245,193,0,0.08)", borderRadius: 10, border: "1px solid rgba(245,193,0,0.25)", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A200" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#92600A", fontWeight: 400, lineHeight: 1.6, margin: 0 }}>
              Dengan mengklik tombol di atas, Anda akan diarahkan ke WhatsApp dengan pesan yang sudah terisi otomatis.
            </p>
          </div>
        </div>
      </div>

    </main>
  );
}