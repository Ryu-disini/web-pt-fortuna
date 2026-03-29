"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

// ─── DATA ────────────────────────────────────────────────────────────────────
const JAM = [
  { hari: "Senin",  buka: "08.00", tutup: "17.00", libur: false },
  { hari: "Selasa", buka: "08.00", tutup: "17.00", libur: false },
  { hari: "Rabu",   buka: "08.00", tutup: "17.00", libur: false },
  { hari: "Kamis",  buka: "08.00", tutup: "17.00", libur: false },
  { hari: "Jumat",  buka: "08.00", tutup: "17.00", libur: false },
  { hari: "Sabtu",  buka: "08.00", tutup: "17.00", libur: false },
  { hari: "Minggu", buka: "–",     tutup: "–",     libur: true  },
];

const LAYANAN_PUBLIK = [
  { label: "Beranda",    href: "/",                  icon: <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/> },
  { label: "Layanan",   href: "/layanan",            icon: <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/> },
  { label: "Pricelist",  href: "/pricelist",          icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/> },
  { label: "Cek Status", href: "/layanan/status",     icon: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/> },
  { label: "Cetak NIDI", href: "/layanan/cetak-nidi", icon: <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/> },
  { label: "Kontak",    href: "/kontak",              icon: <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/> },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function DashboardAdmin() {
  const router = useRouter();
  const [pricelist, setPricelist]         = useState<any[]>([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [greeting, setGreeting]           = useState("Selamat datang");
  const [jamSekarang, setJamSekarang]     = useState("");
  const [hariIni, setHariIni]             = useState(0);

  useEffect(() => {
    setPricelist(JSON.parse(localStorage.getItem("pricelist") || "[]"));
    const now = new Date();
    const h   = now.getHours();
    setHariIni(now.getDay());
    setJamSekarang(now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
    if (h < 11)      setGreeting("Selamat pagi");
    else if (h < 15) setGreeting("Selamat siang");
    else if (h < 18) setGreeting("Selamat sore");
    else             setGreeting("Selamat malam");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.push("/admin/login");
  };

  const todayStr  = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const totalItem  = pricelist.length;
  const totalJenis = [...new Set(pricelist.map((d: any) => d.layanan))].length;
  const hargaMin   = pricelist.length > 0 ? Math.min(...pricelist.map((d: any) => Number(d.harga))) : 0;
  const hargaMax   = pricelist.length > 0 ? Math.max(...pricelist.map((d: any) => Number(d.harga))) : 0;
  const fmt = (v: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v);

  // JS getDay: 0=min → index 6, 1=sen → index 0, ...
  const hariMap  = [6, 0, 1, 2, 3, 4, 5];
  const todayJam = JAM[hariMap[hariIni]];
  const sedangBuka = !todayJam?.libur;

  return (
    <div className="dash-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        :root {
          --blue-deep: #0B2B6B;
          --blue-mid:  #1A47A0;
          --blue-light:#2563EB;
          --yellow:    #F5C100;
          --yellow-dark:#D4A200;
          --gray-soft: #F4F6FB;
          --gray-text: #4A5568;
          --sb-width:  256px;
        }

        /* ── ROOT ── */
        .dash-root {
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: var(--gray-soft);
          min-height: 100vh;
        }

        /* ── CONTENT AREA ── */
        .dash-content {
          margin-left: var(--sb-width);
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          min-width: 0;
        }

        /* ── TOPBAR ── */
        .dash-topbar {
          background: white;
          border-bottom: 1px solid rgba(26,71,160,.08);
          padding: 18px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .dash-topbar-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem; font-weight: 700; color: var(--blue-deep);
        }
        .dash-topbar-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: .75rem; color: var(--gray-text); font-weight: 300; margin-top: 1px;
        }
        .topbar-right { display: flex; align-items: center; gap: 12px; }
        .time-chip {
          display: flex; align-items: center; gap: 6px;
          background: var(--gray-soft); border: 1px solid rgba(26,71,160,.08);
          border-radius: 100px; padding: 6px 14px;
          font-family: 'DM Sans', sans-serif; font-size: .8rem; font-weight: 500; color: var(--blue-deep);
        }
        .time-chip svg { width: 13px; height: 13px; color: var(--blue-mid); }
        .admin-badge {
          display: flex; align-items: center; gap: 8px;
          background: var(--gray-soft); border: 1px solid rgba(26,71,160,.1);
          border-radius: 100px; padding: 6px 14px 6px 8px;
        }
        .admin-avatar-sm {
          width: 28px; height: 28px; border-radius: 50%;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          display: flex; align-items: center; justify-content: center;
        }
        .admin-avatar-sm svg { width: 14px; height: 14px; color: var(--yellow); }
        .admin-badge-name {
          font-family: 'DM Sans', sans-serif;
          font-size: .8rem; font-weight: 600; color: var(--blue-deep);
        }

        /* ── BODY ── */
        .dash-body {
          padding: 32px 36px 60px;
          display: flex; flex-direction: column; gap: 28px;
        }

        /* ── HERO CARD ── */
        .hero-card {
          border-radius: 24px; overflow: hidden; position: relative;
          background: var(--blue-deep);
          padding: 40px 44px;
          display: grid; grid-template-columns: 1fr auto;
          align-items: center; gap: 32px;
        }
        .hero-card::before {
          content: ''; position: absolute; top: -80px; right: -80px;
          width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle, rgba(245,193,0,.1) 0%, transparent 65%);
        }
        .hero-card::after {
          content: ''; position: absolute; bottom: -60px; left: 200px;
          width: 200px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,.15) 0%, transparent 65%);
        }
        .hero-left { position: relative; z-index: 1; }
        .hero-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem; font-weight: 600; color: var(--yellow);
          text-transform: uppercase; letter-spacing: .14em; margin-bottom: 10px;
          display: flex; align-items: center; gap: 8px;
        }
        .hero-eyebrow::before {
          content: ''; width: 20px; height: 2px;
          background: var(--yellow); border-radius: 2px;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem; font-weight: 900; color: white; line-height: 1.15; margin-bottom: 10px;
        }
        .hero-title em { font-style: italic; color: var(--yellow); }
        .hero-date {
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem; color: rgba(255,255,255,.4); font-weight: 300;
        }
        .hero-right {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: flex-end; gap: 12px;
        }
        .status-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-size: .78rem; font-weight: 600;
        }
        .status-badge.open {
          background: rgba(16,185,129,.15); color: #34D399;
          border: 1px solid rgba(16,185,129,.25);
        }
        .status-badge.closed {
          background: rgba(239,68,68,.15); color: #F87171;
          border: 1px solid rgba(239,68,68,.25);
        }
        .status-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .status-badge.open .status-dot {
          background: #34D399; box-shadow: 0 0 0 2px rgba(52,211,153,.3);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        .status-badge.closed .status-dot { background: #F87171; }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:.4} }
        .jam-info {
          font-family: 'DM Sans', sans-serif;
          font-size: .75rem; color: rgba(255,255,255,.4); font-weight: 300; text-align: right;
        }
        .btn-hero {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 11px 20px; border-radius: 10px; text-decoration: none;
          font-family: 'DM Sans', sans-serif; font-size: .85rem; font-weight: 600;
          background: var(--yellow); color: var(--blue-deep);
          transition: transform .2s, box-shadow .2s;
        }
        .btn-hero:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(245,193,0,.35); }
        .btn-hero svg { width: 14px; height: 14px; }

        /* ── STAT BAND ── */
        .stat-band { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .sband-card {
          background: white; border-radius: 18px; padding: 24px;
          border: 1px solid rgba(26,71,160,.08); box-shadow: 0 2px 12px rgba(11,43,107,.04);
          position: relative; overflow: hidden;
          transition: transform .2s, box-shadow .2s;
        }
        .sband-card:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(11,43,107,.1); }
        .sband-icon {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
        }
        .sband-icon svg { width: 22px; height: 22px; }
        .sband-val {
          font-family: 'Playfair Display', serif;
          font-size: 2rem; font-weight: 700; line-height: 1; margin-bottom: 4px;
        }
        .sband-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .75rem; font-weight: 400; color: var(--gray-text);
        }
        .sband-tag {
          display: inline-flex; align-items: center; gap: 4px; margin-top: 10px;
          font-family: 'DM Sans', sans-serif; font-size: .7rem; font-weight: 500;
          padding: 3px 9px; border-radius: 100px;
        }

        /* ── TWO COL ── */
        .two-col { display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; }

        /* ── SECTION CARD ── */
        .sec-card {
          background: white; border-radius: 20px;
          border: 1px solid rgba(26,71,160,.08); overflow: hidden;
          box-shadow: 0 4px 20px rgba(11,43,107,.05);
        }
        .sec-header {
          padding: 20px 24px; border-bottom: 1px solid rgba(26,71,160,.06);
          display: flex; align-items: center; justify-content: space-between;
        }
        .sec-header-left { display: flex; align-items: center; gap: 10px; }
        .sec-header-icon {
          width: 36px; height: 36px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
        }
        .sec-header-icon svg { width: 18px; height: 18px; }
        .sec-title {
          font-family: 'Playfair Display', serif;
          font-size: .95rem; font-weight: 700; color: var(--blue-deep);
        }
        .sec-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem; color: var(--gray-text); font-weight: 300; margin-top: 1px;
        }
        .sec-link {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: 'DM Sans', sans-serif; font-size: .75rem; font-weight: 600;
          color: var(--blue-mid); text-decoration: none;
          padding: 5px 10px; border-radius: 7px;
          background: rgba(26,71,160,.06); transition: background .2s;
        }
        .sec-link:hover { background: rgba(26,71,160,.12); }
        .sec-link svg { width: 12px; height: 12px; }

        /* ── PRICELIST PREVIEW TABLE ── */
        .prev-table { width: 100%; border-collapse: collapse; }
        .prev-table thead tr { background: linear-gradient(90deg, var(--blue-deep), var(--blue-mid)); }
        .prev-table thead th {
          padding: 11px 18px; text-align: left;
          font-family: 'DM Sans', sans-serif; font-size: .67rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .09em; color: rgba(255,255,255,.8);
        }
        .prev-table tbody tr { border-bottom: 1px solid rgba(26,71,160,.05); }
        .prev-table tbody tr:last-child { border-bottom: none; }
        .prev-table tbody tr:hover { background: rgba(26,71,160,.02); }
        .prev-table td { padding: 12px 18px; }
        .pt-name {
          font-family: 'DM Sans', sans-serif;
          font-size: .84rem; font-weight: 600; color: var(--blue-deep);
        }
        .pt-daya {
          display: inline-block; background: rgba(26,71,160,.08); color: var(--blue-mid);
          padding: 2px 8px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-size: .72rem; font-weight: 500;
        }
        .pt-harga {
          font-family: 'Playfair Display', serif;
          font-size: .9rem; font-weight: 700; color: #059669;
        }
        .prev-footer {
          padding: 14px 20px; border-top: 1px solid rgba(26,71,160,.06);
          display: flex; align-items: center; justify-content: space-between;
        }
        .prev-footer-text {
          font-family: 'DM Sans', sans-serif;
          font-size: .73rem; color: var(--gray-text); font-weight: 300;
        }
        .btn-see-all {
          display: inline-flex; align-items: center; gap: 5px;
          background: var(--blue-deep); color: white;
          padding: 7px 14px; border-radius: 8px; text-decoration: none;
          font-family: 'DM Sans', sans-serif; font-size: .76rem; font-weight: 600;
          transition: opacity .2s;
        }
        .btn-see-all:hover { opacity: .85; }
        .btn-see-all svg { width: 11px; height: 11px; }
        .prev-empty { padding: 40px; text-align: center; }
        .prev-empty svg { width: 32px; height: 32px; color: #CBD5E0; margin: 0 auto 10px; display: block; }
        .prev-empty p { font-family: 'DM Sans', sans-serif; font-size: .82rem; color: var(--gray-text); }

        /* ── JAM OPERASIONAL ── */
        .jam-list { padding: 16px; }
        .jam-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 12px; border-radius: 10px; margin-bottom: 4px;
          transition: background .15s;
        }
        .jam-row:last-child { margin-bottom: 0; }
        .jam-row.today { background: rgba(245,193,0,.08); border: 1px solid rgba(245,193,0,.18); }
        .jam-hari {
          font-family: 'DM Sans', sans-serif;
          font-size: .84rem; font-weight: 500; color: var(--blue-deep);
          display: flex; align-items: center; gap: 8px;
        }
        .jam-hari .today-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--yellow); flex-shrink: 0;
        }
        .jam-status { font-family: 'DM Sans', sans-serif; font-size: .78rem; font-weight: 500; }
        .jam-status.open { color: #059669; }
        .jam-status.libur { color: #9CA3AF; }

        /* ── QUICK LINKS ── */
        .quick-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 8px; padding: 16px;
        }
        .ql-item {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 14px; border-radius: 12px;
          text-decoration: none; background: var(--gray-soft);
          border: 1px solid transparent;
          transition: border-color .2s, background .2s, transform .15s;
        }
        .ql-item:hover { border-color: rgba(26,71,160,.12); background: white; transform: translateY(-1px); }
        .ql-icon {
          width: 34px; height: 34px; border-radius: 8px;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ql-icon svg { width: 15px; height: 15px; color: white; }
        .ql-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem; font-weight: 600; color: var(--blue-deep);
        }
        .ql-ext { margin-left: auto; width: 14px; height: 14px; color: #CBD5E0; flex-shrink: 0; }

        /* ── KONTAK STRIP ── */
        .kontak-strip {
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          border-radius: 20px; padding: 28px 32px;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
        }
        .ks-item { display: flex; align-items: center; gap: 12px; }
        .ks-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(255,255,255,.1);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ks-icon svg { width: 18px; height: 18px; color: var(--yellow); }
        .ks-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem; text-transform: uppercase; letter-spacing: .08em;
          color: rgba(255,255,255,.4); margin-bottom: 3px;
        }
        .ks-value {
          font-family: 'DM Sans', sans-serif;
          font-size: .88rem; font-weight: 600; color: white;
        }

        /* ── MODAL ── */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(11,43,107,.45);
          display: flex; align-items: center; justify-content: center; padding: 24px;
          animation: fadeIn .2s ease;
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .modal-box {
          background: white; border-radius: 22px; padding: 40px 36px;
          max-width: 400px; width: 100%; text-align: center;
          box-shadow: 0 24px 64px rgba(11,43,107,.22);
          animation: scaleIn .25s ease;
        }
        @keyframes scaleIn { from{opacity:0;transform:scale(.9)} to{opacity:1;transform:scale(1)} }
        .modal-icon {
          width: 68px; height: 68px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; margin: 0 auto 18px;
          background: linear-gradient(135deg, #FEF9EC, #FFF3CD);
          border: 2px solid rgba(245,193,0,.3);
        }
        .modal-icon svg { width: 30px; height: 30px; color: var(--yellow-dark); }
        .modal-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem; font-weight: 700; color: var(--blue-deep); margin-bottom: 10px;
        }
        .modal-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: .86rem; color: var(--gray-text); font-weight: 300; line-height: 1.7; margin-bottom: 28px;
        }
        .modal-btns { display: flex; gap: 10px; }
        .modal-btn-cancel {
          flex: 1; padding: 12px; border-radius: 10px;
          border: 1.5px solid rgba(26,71,160,.12); background: var(--gray-soft);
          font-family: 'DM Sans', sans-serif; font-size: .9rem; font-weight: 600;
          color: var(--gray-text); cursor: pointer; transition: background .2s;
        }
        .modal-btn-cancel:hover { background: #E8ECF4; }
        .modal-btn-confirm {
          flex: 1; padding: 12px; border-radius: 10px; border: none;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          font-family: 'DM Sans', sans-serif; font-size: .9rem; font-weight: 600;
          color: white; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: opacity .2s, transform .2s;
        }
        .modal-btn-confirm:hover { opacity: .9; transform: translateY(-1px); }
        .modal-btn-confirm svg { width: 15px; height: 15px; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1200px) {
          .stat-band { grid-template-columns: 1fr 1fr; }
          .kontak-strip { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 1024px) {
          .two-col { grid-template-columns: 1fr; }
          .quick-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .dash-content { margin-left: 0; padding-top: 60px; }
          .dash-topbar { padding: 14px 20px; }
          .dash-topbar-title { font-size: 1.05rem; }
          .time-chip { display: none; }
          .dash-body { padding: 20px 16px 48px; gap: 20px; }
          .hero-card { grid-template-columns: 1fr; padding: 28px 24px; gap: 20px; }
          .hero-title { font-size: 1.5rem; }
          .hero-right { align-items: flex-start; }
          .stat-band { grid-template-columns: 1fr 1fr; gap: 12px; }
          .sband-card { padding: 18px; }
          .sband-val { font-size: 1.6rem; }
          .two-col { grid-template-columns: 1fr; gap: 16px; }
          .quick-grid { grid-template-columns: 1fr; }
          .kontak-strip { grid-template-columns: 1fr; padding: 20px; gap: 14px; }
          .modal-box { padding: 28px 20px; }
        }
        @media (max-width: 480px) {
          .stat-band { grid-template-columns: 1fr 1fr; }
          .admin-badge-name { display: none; }
          .hero-card { padding: 22px 18px; }
          .hero-title { font-size: 1.3rem; }
        }
      `}</style>

      {/* SIDEBAR */}
      <AdminSidebar onLogout={() => setShowLogoutModal(true)} />

      {/* CONTENT */}
      <div className="dash-content">

        {/* TOPBAR */}
        <div className="dash-topbar">
          <div>
            <div className="dash-topbar-title">Dashboard</div>
            <div className="dash-topbar-sub">Ringkasan panel admin PT FORTUNA SOLUSI GROUP</div>
          </div>
          <div className="topbar-right">
            {jamSekarang && (
              <div className="time-chip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {jamSekarang} WIB
              </div>
            )}
            <div className="admin-badge">
              <div className="admin-avatar-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <span className="admin-badge-name">Administrator</span>
            </div>
          </div>
        </div>

        <div className="dash-body">

          {/* HERO */}
          <div className="hero-card">
            <div className="hero-left">
              <div className="hero-eyebrow">Panel Admin PT FORTUNA SOLUSI GROUP</div>
              <div className="hero-title">{greeting},<br/><em>Selamat bekerja!</em></div>
              <div className="hero-date">{todayStr}</div>
            </div>
            <div className="hero-right">
              <div className={`status-badge ${sedangBuka ? "open" : "closed"}`}>
                <span className="status-dot"/>
                {sedangBuka ? "Kantor Sedang Buka" : "Kantor Tutup"}
              </div>
              {todayJam && !todayJam.libur && (
                <div className="jam-info">Jam {todayJam.buka} – {todayJam.tutup} WIB</div>
              )}
              <Link href="/admin/pricelist" className="btn-hero">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                Kelola Pricelist
              </Link>
            </div>
          </div>

          {/* STATS */}
          <div className="stat-band">
            {([
              { color: "var(--blue-deep)", iconBg: "linear-gradient(135deg,var(--blue-deep),var(--blue-mid))", iconColor: "var(--yellow)", val: totalItem, label: "Total Item Pricelist", tag: "item aktif", tagBg: "rgba(26,71,160,.07)", tagColor: "var(--blue-mid)", icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/> },
              { color: "var(--yellow-dark)", iconBg: "linear-gradient(135deg,var(--yellow),var(--yellow-dark))", iconColor: "var(--blue-deep)", val: totalJenis, label: "Jenis Layanan", tag: "kategori", tagBg: "rgba(245,193,0,.1)", tagColor: "var(--yellow-dark)", icon: <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/> },
              { color: "#059669", iconBg: "linear-gradient(135deg,#10B981,#059669)", iconColor: "white", val: hargaMin > 0 ? `${(hargaMin/1000).toFixed(0)}rb` : "–", label: "Harga Terendah", tag: "mulai dari", tagBg: "rgba(5,150,105,.08)", tagColor: "#059669", icon: <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/> },
              { color: "#7C3AED", iconBg: "linear-gradient(135deg,#8B5CF6,#7C3AED)", iconColor: "white", val: hargaMax > 0 ? `${(hargaMax/1000).toFixed(0)}rb` : "–", label: "Harga Tertinggi", tag: "maksimum", tagBg: "rgba(139,92,246,.08)", tagColor: "#7C3AED", icon: <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/> },
            ] as any[]).map(({ iconBg, iconColor, icon, val, label, tag, tagBg, tagColor, color }, i) => (
              <div className="sband-card" key={i}>
                <div className="sband-icon" style={{ background: iconBg }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.8">{icon}</svg>
                </div>
                <div className="sband-val" style={{ color }}>{val}</div>
                <div className="sband-label">{label}</div>
                <div className="sband-tag" style={{ background: tagBg, color: tagColor }}>{tag}</div>
              </div>
            ))}
          </div>

          {/* TWO COL: Preview + Jam */}
          <div className="two-col">

            {/* Pricelist preview */}
            <div className="sec-card">
              <div className="sec-header">
                <div className="sec-header-left">
                  <div className="sec-header-icon" style={{ background: "rgba(5,150,105,.1)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </div>
                  <div>
                    <div className="sec-title">Preview Pricelist</div>
                    <div className="sec-sub">5 item pricelist terakhir</div>
                  </div>
                </div>
                <Link href="/admin/pricelist" className="sec-link">
                  Kelola
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                </Link>
              </div>
              {pricelist.length === 0 ? (
                <div className="prev-empty">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                  <p>Belum ada data pricelist.<br/>Tambahkan di halaman Pricelist.</p>
                </div>
              ) : (
                <>
                  <div style={{ overflowX: "auto" }}>
                    <table className="prev-table">
                      <thead>
                        <tr>{["Layanan", "Daya", "Harga"].map(h => <th key={h}>{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {[...pricelist].slice(-5).reverse().map((item, i) => (
                          <tr key={i}>
                            <td className="pt-name">{item.layanan}</td>
                            <td><span className="pt-daya">{item.daya}</span></td>
                            <td className="pt-harga">{fmt(Number(item.harga))}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="prev-footer">
                    <div className="prev-footer-text">Menampilkan {Math.min(5, pricelist.length)} dari {pricelist.length} item</div>
                    <Link href="/admin/pricelist" className="btn-see-all">
                      Semua
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Jam operasional */}
            <div className="sec-card">
              <div className="sec-header">
                <div className="sec-header-left">
                  <div className="sec-header-icon" style={{ background: "rgba(245,193,0,.1)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--yellow-dark)" strokeWidth="1.8">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="sec-title">Jam Operasional</div>
                    <div className="sec-sub">Jadwal layanan kantor</div>
                  </div>
                </div>
              </div>
              <div className="jam-list">
                {JAM.map(({ hari, buka, tutup, libur }, i) => {
                  const jsDay   = [6, 0, 1, 2, 3, 4, 5];
                  const isToday = jsDay[hariIni] === i;
                  return (
                    <div className={`jam-row${isToday ? " today" : ""}`} key={hari}>
                      <div className="jam-hari">
                        {isToday && <span className="today-dot"/>}
                        {hari}
                      </div>
                      {libur
                        ? <span className="jam-status libur">Libur</span>
                        : <span className="jam-status open">{buka} – {tutup}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="sec-card">
            <div className="sec-header">
              <div className="sec-header-left">
                <div className="sec-header-icon" style={{ background: "rgba(26,71,160,.08)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--blue-mid)" strokeWidth="1.8">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <div className="sec-title">Akses Cepat Halaman Publik</div>
                  <div className="sec-sub">Buka langsung halaman situs dari sini</div>
                </div>
              </div>
            </div>
            <div className="quick-grid">
              {LAYANAN_PUBLIK.map(({ label, href, icon }) => (
                <Link href={href} key={href} className="ql-item" target="_blank">
                  <div className="ql-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{icon}</svg>
                  </div>
                  <div className="ql-label">{label}</div>
                  <svg className="ql-ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* KONTAK STRIP */}
          <div className="kontak-strip">
            {([
              { label: "Telepon", value: "0812-8813-1149", icon: <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/> },
              { label: "Email",   value: "info@nidi-slo.com",  icon: <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/> },
              { label: "Alamat",  value: "Bogor, Jawa Barat",  icon: <><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></> },
            ] as any[]).map(({ label, value, icon }) => (
              <div className="ks-item" key={label}>
                <div className="ks-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{icon}</svg>
                </div>
                <div>
                  <div className="ks-label">{label}</div>
                  <div className="ks-value">{value}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* MODAL LOGOUT */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </div>
            <div className="modal-title">Keluar dari Panel Admin?</div>
            <div className="modal-desc">Anda akan mengakhiri sesi ini dan diarahkan kembali ke halaman login.</div>
            <div className="modal-btns">
              <button className="modal-btn-cancel" onClick={() => setShowLogoutModal(false)}>Batal</button>
              <button className="modal-btn-confirm" onClick={handleLogout}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}