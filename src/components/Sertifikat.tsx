"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface Sertifikat {
  id: string;
  judul: string;
  penerima: string;
  kategori: string;
  nomor: string;
  tanggalTerbit: string;
  tanggalBerlaku: string;
  lembagaPenerbit: string;
  deskripsi: string;
  fileUrl: string; 
  fileName: string;
  status: "aktif" | "kadaluarsa";
}

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const MOCK: Sertifikat[] = [
  {
    id: "1",
    judul: "Sertifikat Kompetensi",
    penerima: "PT Fortuna Solusi Group",
    kategori: "NIDI",
    nomor: "NIDI-2024-0021",
    tanggalTerbit: "10 Januari 2024",
    tanggalBerlaku: "10 Januari 2027",
    lembagaPenerbit: "PLN UIW Jawa Barat",
    deskripsi: "Sertifikat Kompetensi PT Fortuna Solusi Group, Bogor.",
    fileUrl: "/images/LogoPT.png", 
    fileName: "LogoPT.png",
    status: "aktif",
  },
  {
    id: "2",
    judul: "NIDI Gedung Operasional",
    penerima: "PT Fortuna Solusi Group",
    kategori: "NIDI",
    nomor: "NIDI-2023-0087",
    tanggalTerbit: "5 Maret 2023",
    tanggalBerlaku: "5 Maret 2026",
    lembagaPenerbit: "PT Fortuna Solusi Group",
    deskripsi: "Sertifikat Kompetensi PT Fortuna Solusi Group, Bogor.",
    fileUrl: "/images/LogoPT.png", 
    fileName: "LogoPT.png",
    status: "aktif",
  },
  {
    id: "3",
    judul: "Sertifikat Kompetensi Instalatir",
    penerima: "Tim Teknisi PT Fortuna Solusi Group",
    kategori: "NIDI",
    nomor: "NIDI-2022-0345",
    tanggalTerbit: "20 Juli 2022",
    tanggalBerlaku: "20 Juli 2025",
    lembagaPenerbit: "LSPI – Lembaga Sertifikasi Profesi Indonesia",
    deskripsi: "Sertifikat Kompetensi PT Fortuna Solusi Group, Bogor.",
    fileUrl: "/images/LogoPT.png", 
    fileName: "LogoPT.png",
    status: "kadaluarsa",
  }
];

const KATEGORI_COLOR: Record<string, { bg: string; color: string }> = {
  SLO:         { bg: "rgba(26,71,160,.09)",  color: "#1A47A0" },
  NIDI:        { bg: "rgba(245,193,0,.13)",  color: "#B45309" },
  Kompetensi: { bg: "rgba(139,92,246,.09)", color: "#6D28D9" },
  Lainnya:     { bg: "rgba(6,182,212,.09)",  color: "#0891B2" },
};

function getKategoriStyle(kat: string) {
  return KATEGORI_COLOR[kat] ?? KATEGORI_COLOR["Lainnya"];
}

export default function SertifikatPage() {
  const [list, setList]           = useState<Sertifikat[]>([]);
  const [filter, setFilter]       = useState("Semua");
  const [preview, setPreview]     = useState<Sertifikat | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("sertifikat_publik");
    setList(saved ? JSON.parse(saved) : MOCK);
  }, []);

  const kategoriList = ["Semua", ...Array.from(new Set(list.map(s => s.kategori)))];
  const filtered     = filter === "Semua" ? list : list.filter(s => s.kategori === filter);
  const aktifCount   = list.filter(s => s.status === "aktif").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        :root {
          --blue-deep:#0B2B6B; --blue-mid:#1A47A0; --blue-light:#2563EB;
          --yellow:#F5C100;    --yellow-dark:#D4A200;
          --gray-soft:#F4F6FB; --gray-text:#4A5568;
        }

        /* ── HERO RESPONSIVE ── */
        .sh-hero {
          background: var(--blue-deep);
          padding: 120px 24px 60px;
          position: relative; overflow: hidden;
          text-align: left;
        }
        @media (min-width: 768px) { .sh-hero { padding: 160px 24px 100px; } }

        .sh-hero::before {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .sh-hero-inner { position: relative; z-index: 1; max-width: 1160px; margin: 0 auto; }
        
        .sh-back {
          display: inline-flex; align-items: center; gap: 6px; font-family: 'DM Sans', sans-serif; font-size: .75rem; font-weight: 500;
          color: rgba(255,255,255,.5); text-decoration: none; padding: 8px 16px; border-radius: 100px;
          background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); margin-bottom: 24px;
        }

        .sh-hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 8vw, 3.5rem); font-weight: 900; color: white; line-height: 1.1; margin: 0 0 20px; }
        .sh-hero h1 em { font-style: italic; color: var(--yellow); }
        .sh-hero p { font-family: 'DM Sans', sans-serif; font-size: clamp(0.95rem, 2vw, 1.1rem); color: rgba(255,255,255,.6); font-weight: 300; line-height: 1.6; max-width: 650px; margin: 0; }
        
        .sh-stats { display: flex; align-items: center; gap: 40px; margin-top: 40px; flex-wrap: wrap; }
        .sh-stat { position: relative; }
        @media (min-width: 768px) {
          .sh-stat:not(:last-child)::after { content:''; position:absolute; right:-20px; top:50%; transform:translateY(-50%); height:30px; width:1px; background: rgba(255,255,255,0.1); }
        }
        .sh-stat-val { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: white; line-height: 1; }
        .sh-stat-val span { color: var(--yellow); }
        .sh-stat-label { font-family: 'DM Sans', sans-serif; font-size: .7rem; color: rgba(255,255,255,.4); margin-top: 6px; text-transform: uppercase; letter-spacing: 1px; }

        /* ── BODY & GRID RESPONSIVE ── */
        .sh-body { max-width: 1160px; margin: 0 auto; padding: 40px 24px 80px; }
        
        .sh-filter-bar { margin-bottom: 32px; overflow-x: auto; padding-bottom: 8px; -webkit-overflow-scrolling: touch; }
        .sh-filter-bar::-webkit-scrollbar { display: none; }
        .sh-filter-inner { display: flex; gap: 8px; min-width: max-content; }

        .sh-filter-btn {
          padding: 8px 20px; border-radius: 100px; border: 1.5px solid rgba(26,71,160,.12);
          background: white; font-family: 'DM Sans', sans-serif; font-size: .85rem; cursor: pointer; white-space: nowrap;
        }
        .sh-filter-btn.active { background: var(--blue-deep); color: white; border-color: var(--blue-deep); }

        .sh-grid { 
          display: grid; 
          grid-template-columns: 1fr; 
          gap: 20px; 
        }
        @media (min-width: 640px) { .sh-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; } }
        @media (min-width: 1024px) { .sh-grid { grid-template-columns: repeat(3, 1fr); gap: 28px; } }
        
        .sh-card {
          background: white; border-radius: 20px; border: 1px solid rgba(26,71,160,.08);
          display: flex; flex-direction: column; transition: 0.3s; cursor: pointer; height: 100%;
        }
        .sh-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(11,43,107,0.1); }
        
        .sh-card-image {
          aspect-ratio: 4/3; width: 100%; background: #f8fafc; border-bottom: 1px solid rgba(26,71,160,.05);
          position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;
        }
        .sh-card-image img { width: 100%; height: 100%; object-fit: cover; }
        
        .sh-card-body { padding: 20px; flex: 1; display: flex; flex-direction: column; gap: 12px; }
        .sh-card-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: var(--blue-deep); line-height: 1.3; margin: 0; }
        
        /* ── MODAL RESPONSIVE ── */
        .sh-overlay { position: fixed; inset: 0; z-index: 1000; background: rgba(11,43,107,.8); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 16px; }
        .sh-modal { 
          background: white; border-radius: 24px; width: 100%; max-width: 900px; 
          max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; 
        }
        @media (min-width: 992px) { .sh-modal { flex-direction: row; height: 80vh; } }
        
        .sh-modal-visual { flex: 1.2; background: #1e293b; display: flex; align-items: center; justify-content: center; padding: 20px; min-height: 300px; }
        .sh-modal-visual img { max-width: 100%; max-height: 100%; object-fit: contain; }
        
        .sh-modal-info { flex: 1; display: flex; flex-direction: column; overflow-y: auto; background: white; }
        .sh-modal-header { padding: 24px; border-bottom: 1px solid #f1f5f9; position: sticky; top: 0; background: white; z-index: 2; }
        .sh-modal-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }

        /* ── CTA RESPONSIVE ── */
        .sh-cta { 
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid)); 
          border-radius: 24px; padding: 32px; margin-top: 48px;
          display: flex; flex-direction: column; gap: 24px; text-align: center;
        }
        @media (min-width: 768px) { .sh-cta { padding: 48px; flex-direction: row; text-align: left; justify-content: space-between; } }
        
        .sh-cta h3 { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; color: white; margin: 0 0 8px; }
        .sh-cta p { color: rgba(255,255,255,.7); margin: 0; font-size: 0.95rem; }
        .sh-btn-cta { 
          background: var(--yellow); color: var(--blue-deep); padding: 16px 32px; 
          border-radius: 12px; text-decoration: none; font-weight: 700; display: inline-block; white-space: nowrap;
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="sh-hero">
        <div className="sh-hero-inner">
          <Link href="/layanan" className="sh-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="12"><path d="M15 19l-7-7 7-7"/></svg>
            Kembali
          </Link>
          <h1>Sertifikat <em>Kompetensi</em></h1>
          <p>Dokumentasi standar keamanan dan legalitas operasional PT Fortuna Solusi Group dalam melayani sistem kelistrikan Anda.</p>
          
          <div className="sh-stats">
            <div className="sh-stat">
              <div className="sh-stat-val">{list.length}</div>
              <div className="sh-stat-label">Dokumen</div>
            </div>
            <div className="sh-stat">
              <div className="sh-stat-val">{aktifCount}<span>+</span></div>
              <div className="sh-stat-label">Aktif</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="sh-body">
        <div className="sh-filter-bar">
          <div className="sh-filter-inner">
            {kategoriList.map(k => (
              <button key={k} className={`sh-filter-btn ${filter === k ? 'active' : ''}`} onClick={() => setFilter(k)}>{k}</button>
            ))}
          </div>
        </div>

        <div className="sh-grid">
          {filtered.map(sert => {
            const katStyle = getKategoriStyle(sert.kategori);
            return (
              <div className="sh-card" key={sert.id} onClick={() => setPreview(sert)}>
                <div className="sh-card-image">
                  <img src={sert.fileUrl || "/api/placeholder/400/560"} alt={sert.judul} />
                  <div style={{position:'absolute', top:'12px', right:'12px', width:'12px', height:'12px', borderRadius:'50%', background: sert.status === 'aktif' ? '#10B981' : '#EF4444', border:'2px solid white'}} />
                </div>
                <div className="sh-card-body">
                  <span style={{ background: katStyle.bg, color: katStyle.color, padding:'4px 10px', borderRadius:'100px', fontSize:'.65rem', fontWeight:700, alignSelf:'flex-start', textTransform:'uppercase' }}>{sert.kategori}</span>
                  <h3 className="sh-card-title">{sert.judul}</h3>
                  <code style={{fontSize:'.75rem', color: 'var(--blue-mid)', background:'#f1f5f9', padding:'2px 6px', borderRadius:'4px'}}>{sert.nomor}</code>
                  <div style={{marginTop:'auto', display:'flex', justifyContent:'space-between', borderTop:'1px solid #f1f5f9', paddingTop:'12px', fontSize:'.75rem'}}>
                    <span style={{color:'#94a3b8'}}>Berlaku s/d</span>
                    <span style={{fontWeight:600, color: sert.status === 'aktif' ? 'var(--blue-deep)' : '#EF4444'}}>{sert.tanggalBerlaku}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="sh-cta">
          <div>
            <h3>Butuh SLO atau NIDI?</h3>
            <p>Tim ahli kami siap membantu proses sertifikasi instalasi listrik Anda.</p>
          </div>
          <Link href="/kontak" className="sh-btn-cta">Hubungi Kami</Link>
        </div>
      </div>

      {/* ── MODAL ── */}
      {preview && (
        <div className="sh-overlay" onClick={() => setPreview(null)}>
          <div className="sh-modal" onClick={e => e.stopPropagation()}>
            <div className="sh-modal-visual">
              <img src={preview.fileUrl || "/api/placeholder/400/560"} alt={preview.judul} />
            </div>
            <div className="sh-modal-info">
              <div className="sh-modal-header">
                <button onClick={() => setPreview(null)} style={{position:'absolute', right:'20px', top:'20px', background:'#f1f5f9', border:'none', width:'32px', height:'32px', borderRadius:'50%', cursor:'pointer'}}>✕</button>
                <h2 style={{fontFamily:'Playfair Display', fontSize:'1.25rem', color:'var(--blue-deep)', margin:'0 0 4px'}}>{preview.judul}</h2>
                <span style={{fontSize:'.8rem', color:'#64748b'}}>{preview.kategori} • {preview.status.toUpperCase()}</span>
              </div>
              <div className="sh-modal-body">
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
                  <div style={{gridColumn:'span 2'}}><small style={{color:'#94a3b8', textTransform:'uppercase', fontSize:'.65rem', fontWeight:700}}>Penerima</small><div style={{fontWeight:500}}>{preview.penerima}</div></div>
                  <div><small style={{color:'#94a3b8', textTransform:'uppercase', fontSize:'.65rem', fontWeight:700}}>Nomor</small><div style={{fontFamily:'monospace'}}>{preview.nomor}</div></div>
                  <div><small style={{color:'#94a3b8', textTransform:'uppercase', fontSize:'.65rem', fontWeight:700}}>Terbit</small><div>{preview.tanggalTerbit}</div></div>
                  <div style={{gridColumn:'span 2'}}><small style={{color:'#94a3b8', textTransform:'uppercase', fontSize:'.65rem', fontWeight:700}}>Lembaga</small><div>{preview.lembagaPenerbit}</div></div>
                </div>
                {/* <button onClick={() => window.print()} style={{width:'100%', padding:'16px', borderRadius:'12px', background:'var(--blue-deep)', color:'white', fontWeight:700, border:'none', cursor:'pointer', marginTop:'8px'}}>Cetak / Simpan PDF</button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}