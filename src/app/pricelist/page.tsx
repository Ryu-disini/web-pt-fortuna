"use client";

import { useEffect, useState } from "react";

export default function Pricelist() {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("pricelist") || "[]");
    setData(items);
  }, []);

  const categories = ["Semua", ...Array.from(new Set(data.map((d) => d.layanan)))];

  const filtered = data.filter((item) => {
    const matchCat = filter === "Semua" || item.layanan === filter;
    const matchSearch =
      item.layanan?.toLowerCase().includes(search.toLowerCase()) ||
      item.daya?.toLowerCase().includes(search.toLowerCase()) ||
      item.bangunan?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

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
        .pricelist-hero {
          background: var(--blue-deep);
          position: relative;
          overflow: hidden;
          padding: 100px 48px 80px;
        }

        .pricelist-hero::before {
          content: '';
          position: absolute;
          top: -120px; right: -80px;
          width: 480px; height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,193,0,0.14) 0%, transparent 70%);
        }

        .pricelist-hero::after {
          content: '';
          position: absolute;
          bottom: -60px; left: 5%;
          width: 300px; height: 300px;
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
          display: flex; align-items: center; gap: 8px;
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
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(245,193,0,0.15);
          border: 1px solid rgba(245,193,0,0.35);
          color: var(--yellow);
          padding: 6px 16px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 24px;
        }
        .page-tag svg { width: 13px; height: 13px; }

        .hero-layout {
          display: grid; grid-template-columns: 1fr auto;
          gap: 48px; align-items: end;
        }

        .pricelist-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 900; color: #fff;
          line-height: 1.12; margin-bottom: 18px;
          letter-spacing: -0.01em;
        }
        .pricelist-hero h1 em { font-style: italic; color: var(--yellow); }

        .pricelist-hero p {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.6);
          font-size: 1rem; line-height: 1.8;
          font-weight: 300; max-width: 500px;
        }

        .hero-badge-box {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px; padding: 24px 32px;
          text-align: center; white-space: nowrap;
          backdrop-filter: blur(8px);
        }
        .hero-badge-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.8rem; font-weight: 900;
          color: var(--yellow); line-height: 1; margin-bottom: 6px;
        }
        .hero-badge-label {
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.5);
          font-size: 0.75rem; letter-spacing: 0.05em;
        }

        /* MAIN CONTENT */
        .main-content {
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 48px 80px;
        }

        /* TOOLBAR */
        .toolbar {
          display: flex; align-items: center;
          gap: 16px; margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .search-wrap {
          position: relative; flex: 1; min-width: 220px;
        }
        .search-wrap svg {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%);
          width: 16px; height: 16px;
          color: #9CA3AF; pointer-events: none;
        }
        .search-input {
          width: 100%; padding: 11px 16px 11px 42px;
          border-radius: 10px;
          border: 1.5px solid rgba(26,71,160,0.12);
          background: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; color: var(--blue-deep);
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-input:focus {
          border-color: var(--blue-light);
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }
        .search-input::placeholder { color: #9CA3AF; }

        .filter-tabs {
          display: flex; gap: 8px; flex-wrap: wrap;
        }
        .filter-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; font-weight: 500;
          padding: 8px 16px; border-radius: 8px;
          border: 1.5px solid rgba(26,71,160,0.12);
          background: white; color: var(--gray-text);
          cursor: pointer; transition: all 0.2s;
        }
        .filter-btn:hover { border-color: var(--blue-light); color: var(--blue-deep); }
        .filter-btn.active {
          background: var(--blue-deep); color: white;
          border-color: var(--blue-deep);
        }

        /* RESULT COUNT */
        .result-info {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; color: var(--gray-text);
          margin-bottom: 20px; font-weight: 400;
        }
        .result-info strong { color: var(--blue-deep); }

        /* TABLE WRAPPER */
        .table-wrap {
          background: white;
          border-radius: 20px;
          border: 1px solid rgba(26,71,160,0.08);
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(11,43,107,0.07);
        }

        table {
          width: 100%; border-collapse: collapse;
        }

        thead {
          background: linear-gradient(90deg, var(--blue-deep), var(--blue-mid));
        }

        thead th {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.75);
          padding: 18px 24px; text-align: left;
        }

        thead th:last-child { text-align: right; }

        thead th.th-icon {
          display: flex; align-items: center; gap: 6px;
        }

        tbody tr {
          border-bottom: 1px solid rgba(26,71,160,0.06);
          transition: background 0.15s;
        }

        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: rgba(244,246,251,0.8); }

        tbody td {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; padding: 18px 24px;
          vertical-align: middle;
        }

        .td-layanan {
          font-weight: 600; color: var(--blue-deep);
          display: flex; align-items: center; gap: 10px;
        }

        .td-layanan-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--yellow); flex-shrink: 0;
        }

        .td-daya, .td-bangunan { color: var(--gray-text); }

        .td-daya-badge {
          display: inline-block;
          background: rgba(26,71,160,0.07);
          color: var(--blue-mid);
          font-size: 0.78rem; font-weight: 600;
          padding: 3px 10px; border-radius: 6px;
        }

        .td-bangunan-badge {
          display: inline-block;
          background: rgba(245,193,0,0.12);
          color: var(--yellow-dark);
          font-size: 0.78rem; font-weight: 600;
          padding: 3px 10px; border-radius: 6px;
        }

        .td-harga {
          text-align: right;
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 700;
          color: var(--blue-deep);
          white-space: nowrap;
        }

        .td-harga span {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem; font-weight: 400;
          color: var(--gray-text); margin-right: 2px;
        }

        /* ROW NUMBER */
        .td-num {
          color: #CBD5E0; font-size: 0.8rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500; width: 40px;
        }

        /* EMPTY STATE */
        .empty-state {
          text-align: center;
          padding: 80px 40px;
        }

        .empty-icon {
          width: 80px; height: 80px;
          background: var(--gray-soft);
          border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px;
        }

        .empty-icon svg { width: 38px; height: 38px; color: #CBD5E0; }

        .empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; color: var(--blue-deep);
          margin-bottom: 10px;
        }

        .empty-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; color: var(--gray-text);
          font-weight: 300; line-height: 1.7;
        }

        /* INFO CARDS */
        .info-cards {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 20px; margin-top: 32px;
        }

        .info-card {
          background: white; border-radius: 14px;
          border: 1px solid rgba(26,71,160,0.08);
          padding: 22px; display: flex; gap: 14px; align-items: flex-start;
        }

        .info-card-icon {
          width: 40px; height: 40px; flex-shrink: 0;
          background: var(--gray-soft); border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .info-card-icon svg { width: 20px; height: 20px; color: var(--blue-mid); }

        .info-card-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem; font-weight: 600;
          color: var(--blue-deep); margin-bottom: 4px;
        }

        .info-card-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; color: var(--gray-text);
          font-weight: 300; line-height: 1.6;
        }

        /* CTA */
        .cta-strip {
          background: var(--yellow);
          padding: 40px 48px;
        }

        .cta-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center;
          justify-content: space-between; gap: 32px;
        }

        .cta-inner h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem; color: var(--blue-deep); margin-bottom: 4px;
        }

        .cta-inner p {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; color: rgba(11,43,107,0.6);
          font-weight: 300;
        }

        .btn-blue {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--blue-deep); color: white;
          padding: 13px 26px; border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 0.88rem;
          text-decoration: none; white-space: nowrap;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-blue:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(11,43,107,0.25);
        }
        .btn-blue svg { width: 15px; height: 15px; }

        @media (max-width: 900px) {
          .pricelist-hero { padding: 80px 24px 60px; }
          .hero-layout { grid-template-columns: 1fr; }
          .hero-badge-box { display: none; }
          .main-content { padding: 36px 24px 60px; }
          .info-cards { grid-template-columns: 1fr; }
          .cta-strip { padding: 36px 24px; }
          .cta-inner { flex-direction: column; text-align: center; }
          .toolbar { flex-direction: column; align-items: stretch; }
          .filter-tabs { justify-content: center; }
        }

        @media (max-width: 640px) {
          thead th:nth-child(2), tbody td:nth-child(2) { display: none; }
          .td-num { display: none; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="pricelist-hero">
        <div className="grid-overlay" />
        <div className="hero-inner">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            <span>Pricelist</span>
          </div>

          <div className="hero-layout">
            <div>
              <div className="page-tag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Harga Transparan
              </div>
              <h1>Pricelist <em>Layanan</em><br />Kami</h1>
              <p>
                Daftar harga resmi layanan NIDI, dan instalasi listrik.
                Tidak ada biaya tersembunyi — semua tercantum secara transparan.
              </p>
            </div>

            <div className="hero-badge-box">
              <div className="hero-badge-num">{data.length || "—"}</div>
              <div className="hero-badge-label">Paket Tersedia</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <div className="main-content">

        {data.length === 0 ? (
          /* ── EMPTY STATE ── */
          <div className="table-wrap">
            <div className="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div className="empty-title">Pricelist Belum Tersedia</div>
              <div className="empty-desc">
                Data harga belum dikonfigurasi.<br />
                Silakan hubungi tim kami untuk mendapatkan penawaran harga terbaik.
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* TOOLBAR */}
            <div className="toolbar">
              <div className="search-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input
                  className="search-input"
                  placeholder="Cari layanan, daya, atau jenis bangunan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="filter-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-btn${filter === cat ? " active" : ""}`}
                    onClick={() => setFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* RESULT COUNT */}
            <div className="result-info">
              Menampilkan <strong>{filtered.length}</strong> dari <strong>{data.length}</strong> paket layanan
            </div>

            {/* TABLE */}
            <div className="table-wrap">
              {filtered.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                  </div>
                  <div className="empty-title">Tidak Ditemukan</div>
                  <div className="empty-desc">Coba kata kunci atau filter yang berbeda.</div>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}>#</th>
                      <th>
                        <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                          </svg>
                          Layanan
                        </span>
                      </th>
                      <th>
                        <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                          </svg>
                          Daya
                        </span>
                      </th>
                      <th>
                        <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                          </svg>
                          Bangunan
                        </span>
                      </th>
                      <th style={{ textAlign: "right" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 7, justifyContent: "flex-end" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          Harga
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item, index) => (
                      <tr key={index}>
                        <td className="td-num">{index + 1}</td>
                        <td>
                          <div className="td-layanan">
                            <div className="td-layanan-dot" />
                            {item.layanan}
                          </div>
                        </td>
                        <td>
                          <span className="td-daya-badge">{item.daya}</span>
                        </td>
                        <td>
                          <span className="td-bangunan-badge">{item.bangunan}</span>
                        </td>
                        <td className="td-harga">
                          <span>Rp</span>{Number(item.harga).toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* INFO CARDS */}
        <div className="info-cards">
          <div className="info-card">
            <div className="info-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <div>
              <div className="info-card-title">Harga Sudah Termasuk</div>
              <div className="info-card-desc">Biaya pengurusan dokumen, inspeksi, dan penerbitan sertifikat resmi.</div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
              </svg>
            </div>
            <div>
              <div className="info-card-title">Butuh Harga Khusus?</div>
              <div className="info-card-desc">Hubungi tim kami untuk negosiasi harga proyek skala besar atau industri.</div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
            </div>
            <div>
              <div className="info-card-title">Pembayaran Fleksibel</div>
              <div className="info-card-desc">Tersedia opsi pembayaran transfer bank, e-wallet, dan tunai di kantor.</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="cta-strip">
        <div className="cta-inner">
          <div>
            <h3>Ada Pertanyaan tentang Harga?</h3>
            <p>Konsultasikan kebutuhan Anda dan dapatkan penawaran terbaik dari tim kami.</p>
          </div>
          <a href="/kontak" className="btn-blue">
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