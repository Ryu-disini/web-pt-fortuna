"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

const todayStr = new Date().toLocaleDateString("id-ID", {
  weekday: "long", day: "numeric", month: "long", year: "numeric",
});

export default function PricelistAdmin() {
  const router = useRouter();
  const [layanan, setLayanan]   = useState("");
  const [daya, setDaya]         = useState("");
  const [bangunan, setBangunan] = useState("");
  const [harga, setHarga]       = useState("");
  const [data, setData]         = useState<any[]>([]);
  const [editIndex, setEditIndex]         = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [toast, setToast]       = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [search, setSearch]     = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [greeting, setGreeting] = useState("Selamat datang");

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("pricelist") || "[]"));
    const h = new Date().getHours();
    if (h < 11)      setGreeting("Selamat pagi");
    else if (h < 15) setGreeting("Selamat siang");
    else if (h < 18) setGreeting("Selamat sore");
    else             setGreeting("Selamat malam");
  }, []);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const simpan = (items: any[]) => {
    localStorage.setItem("pricelist", JSON.stringify(items));
    setData(items);
  };

  const tambah = (e: any) => {
    e.preventDefault();
    const items = [...data];
    if (editIndex !== null) {
      items[editIndex] = { layanan, daya, bangunan, harga };
      setEditIndex(null);
      showToast("Data berhasil diperbarui.");
    } else {
      items.push({ layanan, daya, bangunan, harga });
      showToast("Data berhasil ditambahkan.");
    }
    simpan(items);
    setLayanan(""); setDaya(""); setBangunan(""); setHarga("");
  };

  const hapus = (i: number) => {
    const items = [...data];
    items.splice(i, 1);
    simpan(items);
    setDeleteConfirm(null);
    showToast("Data dihapus.", "error");
  };

  const edit = (i: number) => {
    const it = data[i];
    setLayanan(it.layanan); setDaya(it.daya); setBangunan(it.bangunan); setHarga(it.harga);
    setEditIndex(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const batal = () => {
    setEditIndex(null);
    setLayanan(""); setDaya(""); setBangunan(""); setHarga("");
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.push("/admin/login");
  };

  const fmt = (v: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v);

  const filtered = data.filter(item =>
    [item.layanan, item.daya, item.bangunan].some(v =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const statCards = [
    {
      bg: "linear-gradient(135deg,#0B2B6B,#1A47A0)",
      iconBg: "#F5C100", iconColor: "#0B2B6B",
      val: data.length, label: "Total Item",
      valColor: "white", labelColor: "rgba(255,255,255,.6)",
      icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>,
    },
    {
      border: "1px solid rgba(245,193,0,.2)", iconBg: "rgba(245,193,0,.12)", iconColor: "#D4A200",
      val: [...new Set(data.map((d: any) => d.layanan))].length, label: "Jenis Layanan",
      icon: <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>,
    },
    {
      border: "1px solid rgba(5,150,105,.15)", iconBg: "rgba(5,150,105,.1)", iconColor: "#059669",
      val: data.length > 0 ? `Rp ${(Math.min(...data.map((d: any) => Number(d.harga))) / 1000).toFixed(0)}rb` : "–",
      label: "Harga Terendah",
      icon: <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>,
    },
    {
      border: "1px solid rgba(139,92,246,.15)", iconBg: "rgba(139,92,246,.1)", iconColor: "#7C3AED",
      val: data.length > 0 ? `Rp ${(Math.max(...data.map((d: any) => Number(d.harga))) / 1000).toFixed(0)}rb` : "–",
      label: "Harga Tertinggi",
      icon: <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        .pl-root {
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #F4F6FB;
          min-height: 100vh;
        }

        /* Content shifts right on desktop to make room for fixed sidebar */
        .pl-content {
          margin-left: 256px;
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          /* Prevent ANY horizontal overflow leaking from children */
          min-width: 0;
          max-width: calc(100vw - 256px);
          overflow-x: hidden;
        }

        .pl-topbar {
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
        .pl-topbar-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem; font-weight: 700; color: #0B2B6B;
        }
        .pl-topbar-sub { font-size: .75rem; color: #4A5568; font-weight: 300; margin-top: 1px; }
        .pl-admin-badge {
          display: flex; align-items: center; gap: 8px;
          background: #F4F6FB; border: 1px solid rgba(26,71,160,.1);
          border-radius: 100px; padding: 6px 14px 6px 8px; flex-shrink: 0;
        }
        .pl-avatar-sm {
          width: 28px; height: 28px; border-radius: 50%;
          background: linear-gradient(135deg,#0B2B6B,#1A47A0);
          display: flex; align-items: center; justify-content: center;
        }
        .pl-avatar-sm svg { width: 14px; height: 14px; color: #F5C100; }
        .pl-badge-name { font-size: .8rem; font-weight: 600; color: #0B2B6B; }

        .pl-body {
          padding: 32px 36px 60px;
          display: flex; flex-direction: column; gap: 28px;
        }

        /* ── BANNER ── */
        .pl-banner {
          background: linear-gradient(135deg,#0B2B6B 0%,#1A47A0 100%);
          border-radius: 20px; padding: 28px 32px;
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
        }
        .pl-banner::before {
          content:''; position:absolute; top:-60px; right:-60px;
          width:240px; height:240px; border-radius:50%;
          background:rgba(245,193,0,.09); pointer-events:none;
        }
        .pl-banner::after {
          content:''; position:absolute; bottom:-40px; left:30%;
          width:160px; height:160px; border-radius:50%;
          background:rgba(255,255,255,.03); pointer-events:none;
        }
        .pl-banner-text { position:relative; z-index:1; }
        .pl-banner-eyebrow {
          font-size:.75rem; font-weight:500; color:rgba(255,255,255,.5);
          text-transform:uppercase; letter-spacing:.12em; margin-bottom:5px;
        }
        .pl-banner-title {
          font-family:'Playfair Display',serif;
          font-size:1.45rem; font-weight:700; color:white; margin-bottom:4px;
        }
        .pl-banner-title em { font-style:italic; color:#F5C100; }
        .pl-banner-date { font-size:.78rem; color:rgba(255,255,255,.4); font-weight:300; }
        .pl-banner-action { position:relative; z-index:1; flex-shrink:0; }
        .pl-btn-preview {
          display:inline-flex; align-items:center; gap:7px;
          padding:11px 18px; border-radius:10px; text-decoration:none;
          font-size:.85rem; font-weight:600; white-space:nowrap;
          background:#F5C100; color:#0B2B6B;
          transition:transform .2s,box-shadow .2s;
        }
        .pl-btn-preview:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(245,193,0,.35); }
        .pl-btn-preview svg { width:14px; height:14px; }

        /* ── STATS ── */
        .pl-stats {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 16px;
        }
        .pl-stat-card {
          border-radius:16px; padding:20px 22px;
          display:flex; align-items:center; gap:14px;
          box-shadow:0 2px 12px rgba(11,43,107,.05);
          background:white; border:1px solid rgba(26,71,160,.08);
          min-width:0; overflow:hidden;
        }
        .pl-stat-icon {
          width:50px; height:50px; border-radius:12px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
        }
        .pl-stat-icon svg { width:22px; height:22px; }
        .pl-stat-body { min-width:0; overflow:hidden; }
        .pl-stat-val {
          font-family:'Playfair Display',serif;
          font-size:1.4rem; font-weight:700; line-height:1; margin-bottom:3px;
          color:#0B2B6B; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
        }
        .pl-stat-label { font-size:.74rem; font-weight:400; color:#4A5568; }

        /* ── FORM CARD ── */
        .pl-form-card {
          background:white; border-radius:20px;
          border:1px solid rgba(26,71,160,.08); overflow:hidden;
          box-shadow:0 4px 24px rgba(11,43,107,.06);
        }
        .pl-form-header {
          background:linear-gradient(135deg,#0B2B6B,#1A47A0);
          padding:20px 28px;
          display:flex; align-items:center; justify-content:space-between; gap:12px;
          flex-wrap:wrap;
        }
        .pl-form-header-left { display:flex; align-items:center; gap:12px; }
        .pl-form-header-icon {
          width:40px; height:40px; background:#F5C100;
          border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .pl-form-header-icon svg { width:20px; height:20px; color:#0B2B6B; }
        .pl-form-header-title {
          font-family:'Playfair Display',serif;
          font-size:1rem; font-weight:700; color:white; margin-bottom:2px;
        }
        .pl-form-header-sub { font-size:.72rem; color:rgba(255,255,255,.5); }
        .pl-edit-badge {
          display:inline-flex; align-items:center; gap:6px;
          background:rgba(245,193,0,.15); border:1px solid rgba(245,193,0,.35);
          color:#F5C100; padding:5px 12px; border-radius:100px;
          font-size:.72rem; font-weight:600;
        }
        .pl-edit-badge svg { width:12px; height:12px; }
        .pl-form-body { padding:28px; }
        .pl-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .pl-form-group { display:flex; flex-direction:column; gap:6px; }
        .pl-form-label {
          font-size:.75rem; font-weight:600;
          text-transform:uppercase; letter-spacing:.07em; color:#0B2B6B;
        }
        .pl-field-wrap { position:relative; }
        .pl-field-wrap svg.fi {
          position:absolute; left:13px; top:50%; transform:translateY(-50%);
          width:16px; height:16px; color:#9CA3AF; pointer-events:none; transition:color .2s;
        }
        .pl-field-wrap:focus-within svg.fi { color:#1A47A0; }
        .pl-form-input {
          width:100%; padding:12px 14px 12px 40px;
          border-radius:10px; border:1.5px solid rgba(26,71,160,.13);
          background:#F4F6FB; font-family:'DM Sans',sans-serif;
          font-size:.9rem; color:#0B2B6B; outline:none;
          transition:border-color .2s,background .2s,box-shadow .2s;
          box-sizing:border-box;
        }
        .pl-form-input:focus {
          border-color:#2563EB; background:white;
          box-shadow:0 0 0 3px rgba(37,99,235,.1);
        }
        .pl-form-input::placeholder { color:#9CA3AF; font-weight:300; }
        .pl-form-actions { display:flex; gap:10px; margin-top:20px; }
        .pl-btn-submit {
          flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
          background:linear-gradient(135deg,#0B2B6B,#1A47A0);
          color:white; border:none; border-radius:10px; padding:13px;
          font-family:'DM Sans',sans-serif; font-size:.92rem; font-weight:600;
          cursor:pointer; transition:opacity .2s,transform .2s,box-shadow .2s;
        }
        .pl-btn-submit:hover { opacity:.9; transform:translateY(-1px); box-shadow:0 6px 20px rgba(11,43,107,.2); }
        .pl-btn-submit svg { width:16px; height:16px; }
        .pl-btn-batal {
          display:flex; align-items:center; gap:7px;
          background:#F4F6FB; color:#4A5568;
          border:1.5px solid rgba(26,71,160,.1); border-radius:10px;
          padding:13px 18px; font-family:'DM Sans',sans-serif;
          font-size:.88rem; font-weight:500; cursor:pointer;
          transition:background .2s; white-space:nowrap;
        }
        .pl-btn-batal:hover { background:#E8ECF4; }
        .pl-btn-batal svg { width:14px; height:14px; }

        /* ── TABLE CARD ── */
        .pl-table-card {
          background:white; border-radius:20px;
          border:1px solid rgba(26,71,160,.08); overflow:hidden;
          box-shadow:0 4px 24px rgba(11,43,107,.06);
        }
        .pl-table-header {
          padding:20px 28px;
          display:flex; align-items:center; justify-content:space-between; gap:16px;
          border-bottom:1px solid rgba(26,71,160,.07); flex-wrap:wrap;
        }
        .pl-table-title {
          font-family:'Playfair Display',serif;
          font-size:1rem; font-weight:700; color:#0B2B6B; margin-bottom:2px;
        }
        .pl-table-sub { font-size:.75rem; color:#4A5568; font-weight:300; }
        .pl-count-badge {
          display:inline-flex; align-items:center;
          background:rgba(26,71,160,.07); color:#1A47A0;
          padding:4px 10px; border-radius:100px;
          font-size:.75rem; font-weight:600; margin-left:10px;
        }
        .pl-search-wrap { position:relative; }
        .pl-search-wrap svg {
          position:absolute; left:12px; top:50%; transform:translateY(-50%);
          width:15px; height:15px; color:#9CA3AF; pointer-events:none;
        }
        .pl-search-input {
          padding:9px 14px 9px 36px; border-radius:9px;
          border:1.5px solid rgba(26,71,160,.12); background:#F4F6FB;
          font-family:'DM Sans',sans-serif; font-size:.85rem; color:#0B2B6B;
          outline:none; width:220px;
          transition:border-color .2s,box-shadow .2s;
          box-sizing:border-box;
        }
        .pl-search-input:focus {
          border-color:#2563EB;
          box-shadow:0 0 0 3px rgba(37,99,235,.08); background:white;
        }
        .pl-search-input::placeholder { color:#9CA3AF; }

        /* Desktop table */
        .pl-desktop-table { overflow-x:auto; }
        .pl-table { width:100%; border-collapse:collapse; }
        .pl-table thead tr { background:linear-gradient(90deg,#0B2B6B,#1A47A0); }
        .pl-table thead th {
          padding:14px 20px; text-align:left;
          font-size:.72rem; font-weight:600;
          text-transform:uppercase; letter-spacing:.09em; color:rgba(255,255,255,.8);
          white-space:nowrap;
        }
        .pl-table thead th:last-child { text-align:center; }
        .pl-table tbody tr { border-bottom:1px solid rgba(26,71,160,.06); transition:background .15s; }
        .pl-table tbody tr:last-child { border-bottom:none; }
        .pl-table tbody tr:hover { background:rgba(26,71,160,.025); }
        .pl-table tbody tr.editing-row { background:rgba(245,193,0,.05); }
        .pl-table td { padding:14px 20px; }
        .pl-td-no { font-size:.72rem; color:#CBD5E0; font-weight:600; }
        .pl-td-name { font-size:.88rem; font-weight:600; color:#0B2B6B; }
        .pl-pill-daya {
          display:inline-block; background:rgba(26,71,160,.08); color:#1A47A0;
          padding:3px 10px; border-radius:100px; font-size:.78rem; font-weight:500;
        }
        .pl-pill-bangunan {
          display:inline-block; background:rgba(245,193,0,.12); color:#D4A200;
          padding:3px 10px; border-radius:100px; font-size:.78rem; font-weight:500;
        }
        .pl-td-harga {
          font-family:'Playfair Display',serif;
          font-size:.95rem; font-weight:700; color:#059669; white-space:nowrap;
        }
        .pl-action-cell { display:flex; align-items:center; justify-content:center; gap:8px; }
        .pl-btn-edit {
          display:flex; align-items:center; gap:5px;
          background:rgba(245,193,0,.12); color:#D4A200;
          border:1px solid rgba(245,193,0,.3); border-radius:8px;
          padding:7px 13px; font-family:'DM Sans',sans-serif;
          font-size:.78rem; font-weight:600; cursor:pointer;
          transition:background .2s,transform .2s;
        }
        .pl-btn-edit:hover { background:#F5C100; color:#0B2B6B; transform:translateY(-1px); }
        .pl-btn-edit svg { width:13px; height:13px; }
        .pl-btn-hapus {
          display:flex; align-items:center; gap:5px;
          background:rgba(239,68,68,.08); color:#DC2626;
          border:1px solid rgba(239,68,68,.2); border-radius:8px;
          padding:7px 13px; font-family:'DM Sans',sans-serif;
          font-size:.78rem; font-weight:600; cursor:pointer;
          transition:background .2s,transform .2s;
        }
        .pl-btn-hapus:hover { background:#FEE2E2; transform:translateY(-1px); }
        .pl-btn-hapus svg { width:13px; height:13px; }

        /* Mobile card list — hidden on desktop */
        .pl-mobile-list { display:none; }
        .pl-mobile-item {
          padding:16px 20px;
          border-bottom:1px solid rgba(26,71,160,.06);
        }
        .pl-mobile-item:last-child { border-bottom:none; }
        .pl-mobile-top {
          display:flex; align-items:flex-start;
          justify-content:space-between; gap:8px; margin-bottom:8px;
        }
        .pl-mobile-name { font-size:.9rem; font-weight:600; color:#0B2B6B; }
        .pl-mobile-price {
          font-family:'Playfair Display',serif;
          font-size:.95rem; font-weight:700; color:#059669; white-space:nowrap;
        }
        .pl-mobile-pills { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px; }
        .pl-mobile-actions { display:flex; gap:8px; }
        .pl-mobile-actions .pl-btn-edit,
        .pl-mobile-actions .pl-btn-hapus { flex:1; justify-content:center; }

        /* Empty state */
        .pl-empty {
          padding:60px 20px; text-align:center;
          display:flex; flex-direction:column; align-items:center; gap:12px;
        }
        .pl-empty-icon {
          width:64px; height:64px; border-radius:50%;
          background:#F4F6FB; display:flex; align-items:center; justify-content:center;
        }
        .pl-empty-icon svg { width:30px; height:30px; color:#CBD5E0; }
        .pl-empty-title {
          font-family:'Playfair Display',serif;
          font-size:1.05rem; font-weight:700; color:#0B2B6B;
        }
        .pl-empty-desc { font-size:.82rem; color:#4A5568; font-weight:300; }

        /* Modals */
        .pl-modal-overlay {
          position:fixed; inset:0; z-index:1000;
          background:rgba(11,43,107,.45);
          display:flex; align-items:center; justify-content:center; padding:24px;
          animation:plFadeIn .2s ease;
        }
        @keyframes plFadeIn { from{opacity:0} to{opacity:1} }
        .pl-modal-box {
          background:white; border-radius:22px; padding:40px 36px;
          max-width:400px; width:100%; text-align:center;
          box-shadow:0 24px 64px rgba(11,43,107,.22);
          animation:plScaleIn .25s ease;
        }
        @keyframes plScaleIn { from{opacity:0;transform:scale(.9)} to{opacity:1;transform:scale(1)} }
        .pl-modal-icon {
          width:68px; height:68px; border-radius:50%;
          display:flex; align-items:center; justify-content:center; margin:0 auto 18px;
        }
        .pl-modal-icon svg { width:30px; height:30px; }
        .pl-modal-icon.danger { background:#FEF2F2; }
        .pl-modal-icon.danger svg { color:#EF4444; }
        .pl-modal-icon.warning {
          background:linear-gradient(135deg,#FEF9EC,#FFF3CD);
          border:2px solid rgba(245,193,0,.3);
        }
        .pl-modal-icon.warning svg { color:#D4A200; }
        .pl-modal-title {
          font-family:'Playfair Display',serif;
          font-size:1.2rem; font-weight:700; color:#0B2B6B; margin-bottom:10px;
        }
        .pl-modal-desc {
          font-size:.86rem; color:#4A5568; font-weight:300;
          line-height:1.7; margin-bottom:28px;
        }
        .pl-modal-btns { display:flex; gap:10px; }
        .pl-modal-cancel {
          flex:1; padding:12px; border-radius:10px;
          border:1.5px solid rgba(26,71,160,.12); background:#F4F6FB;
          font-family:'DM Sans',sans-serif; font-size:.9rem; font-weight:600;
          color:#4A5568; cursor:pointer; transition:background .2s;
        }
        .pl-modal-cancel:hover { background:#E8ECF4; }
        .pl-modal-confirm {
          flex:1; padding:12px; border-radius:10px; border:none;
          font-family:'DM Sans',sans-serif; font-size:.9rem; font-weight:600;
          color:white; cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:8px;
          transition:opacity .2s,transform .2s;
        }
        .pl-modal-confirm:hover { opacity:.9; transform:translateY(-1px); }
        .pl-modal-confirm.danger { background:#EF4444; }
        .pl-modal-confirm.primary { background:linear-gradient(135deg,#0B2B6B,#1A47A0); }
        .pl-modal-confirm svg { width:15px; height:15px; }

        /* Toast */
        .pl-toast {
          position:fixed; bottom:28px; right:28px; z-index:2000;
          display:flex; align-items:center; gap:10px;
          padding:14px 20px; border-radius:12px;
          font-family:'DM Sans',sans-serif; font-size:.87rem; font-weight:500;
          box-shadow:0 8px 28px rgba(0,0,0,.14);
          animation:plSlideUp .3s ease;
        }
        @keyframes plSlideUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .pl-toast.success { background:#0B2B6B; color:white; }
        .pl-toast.error { background:#FEF2F2; color:#DC2626; border:1px solid #FCA5A5; }
        .pl-toast svg { width:17px; height:17px; flex-shrink:0; }

        /* ═══════════════════════════
           RESPONSIVE
           ═══════════════════════════ */
        @media (max-width:1200px) {
          .pl-stats { grid-template-columns:repeat(2,1fr); }
        }

        @media (max-width:1024px) {
          .pl-form-grid { grid-template-columns:1fr; }
        }

        /* MOBILE — key fix: remove margin-left entirely */
        @media (max-width:768px) {
          .pl-content {
            margin-left: 0 !important;
            max-width: 100vw !important;
            width: 100% !important;
            /* AdminSidebar renders a fixed 60px mobile topbar above everything */
            padding-top: 60px;
          }

          /* Sticky topbar sits below the mobile topbar from AdminSidebar (z-index 50) */
          .pl-topbar {
            top: 60px;
            padding: 12px 16px;
          }
          .pl-topbar-title { font-size: 1rem; }
          .pl-badge-name { display: none; }

          .pl-body { padding: 16px 16px 48px; gap: 16px; }

          .pl-banner {
            flex-direction: column;
            align-items: flex-start;
            padding: 20px 18px;
            gap: 14px;
          }
          .pl-banner-title { font-size: 1.15rem; }
          .pl-banner-action { width: 100%; }
          .pl-btn-preview { width: 100%; justify-content: center; }

          .pl-stats { grid-template-columns: repeat(2,1fr); gap: 10px; }
          .pl-stat-card { padding: 14px 12px; gap: 10px; }
          .pl-stat-icon { width: 38px; height: 38px; border-radius: 9px; }
          .pl-stat-icon svg { width: 17px; height: 17px; }
          .pl-stat-val { font-size: 1.1rem; }
          .pl-stat-label { font-size: .68rem; }

          .pl-form-body { padding: 16px; }
          .pl-form-header { padding: 14px 16px; }
          .pl-form-grid { grid-template-columns: 1fr; }

          .pl-table-header {
            padding: 14px 16px;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .pl-search-wrap { width: 100%; }
          .pl-search-input { width: 100%; }

          /* Hide desktop table, show card list */
          .pl-desktop-table { display: none !important; }
          .pl-mobile-list { display: block !important; }

          .pl-toast { bottom:16px; right:16px; left:16px; }
          .pl-modal-box { padding: 28px 20px; }
        }

        @media (max-width:480px) {
          .pl-form-actions { flex-direction: column; }
          .pl-btn-batal { justify-content: center; }
          .pl-stats { gap: 8px; }
          .pl-stat-val { font-size: 1rem; }
        }
      `}</style>

      <div className="pl-root">
        <AdminSidebar onLogout={() => setShowLogoutModal(true)} />

        <div className="pl-content">

          {/* TOPBAR */}
          <div className="pl-topbar">
            <div>
              <div className="pl-topbar-title">Manajemen Pricelist</div>
              <div className="pl-topbar-sub">Kelola data harga layanan NIDI</div>
            </div>
            <div className="pl-admin-badge">
              <div className="pl-avatar-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <span className="pl-badge-name">Administrator</span>
            </div>
          </div>

          <div className="pl-body">

            {/* BANNER */}
            <div className="pl-banner">
              <div className="pl-banner-text">
                <div className="pl-banner-eyebrow">Manajemen Pricelist — NIDI</div>
                <div className="pl-banner-title"><em>{greeting}</em>, Admin!</div>
                <div className="pl-banner-date">{todayStr}</div>
              </div>
              <div className="pl-banner-action">
                <Link href="/pricelist" className="pl-btn-preview" target="_blank">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  Preview Halaman Publik
                </Link>
              </div>
            </div>

            {/* STATS */}
            <div className="pl-stats">
              {statCards.map(({ bg, border, iconBg, iconColor, icon, val, label, valColor, labelColor }, i) => (
                <div
                  key={i}
                  className="pl-stat-card"
                  style={{ background: bg || "white", border: border || "1px solid rgba(26,71,160,.08)" }}
                >
                  <div className="pl-stat-icon" style={{ background: iconBg }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.8">{icon}</svg>
                  </div>
                  <div className="pl-stat-body">
                    <div className="pl-stat-val" style={{ color: valColor || "#0B2B6B" }}>{val}</div>
                    <div className="pl-stat-label" style={{ color: labelColor || "#4A5568" }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* FORM */}
            <div className="pl-form-card">
              <div className="pl-form-header">
                <div className="pl-form-header-left">
                  <div className="pl-form-header-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {editIndex !== null
                        ? <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        : <path d="M12 4v16m8-8H4"/>}
                    </svg>
                  </div>
                  <div>
                    <div className="pl-form-header-title">
                      {editIndex !== null ? "Edit Data Pricelist" : "Tambah Data Pricelist"}
                    </div>
                    <div className="pl-form-header-sub">
                      {editIndex !== null ? `Mengedit item ke-${editIndex + 1}` : "Isi semua field untuk menambah item baru"}
                    </div>
                  </div>
                </div>
                {editIndex !== null && (
                  <div className="pl-edit-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Mode Edit
                  </div>
                )}
              </div>
              <div className="pl-form-body">
                <form onSubmit={tambah}>
                  <div className="pl-form-grid">
                    {[
                      { label:"Jenis Layanan",  val:layanan,  set:setLayanan,  placeholder:"Contoh: NIDI Rumah",    type:"text",   icon:<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/> },
                      { label:"Daya Listrik",   val:daya,     set:setDaya,     placeholder:"Contoh: 1300 VA",       type:"text",   icon:<path d="M13 10V3L4 14h7v7l9-11h-7z"/> },
                      { label:"Jenis Bangunan", val:bangunan, set:setBangunan, placeholder:"Contoh: Rumah Tinggal", type:"text",   icon:<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/> },
                      { label:"Harga (Rp)",     val:harga,    set:setHarga,    placeholder:"Contoh: 250000",        type:"number", icon:<path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/> },
                    ].map(({ label, val, set, placeholder, type, icon }) => (
                      <div className="pl-form-group" key={label}>
                        <label className="pl-form-label">{label}</label>
                        <div className="pl-field-wrap">
                          <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{icon}</svg>
                          <input
                            type={type}
                            className="pl-form-input"
                            placeholder={placeholder}
                            value={val}
                            onChange={e => set(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pl-form-actions">
                    {editIndex !== null && (
                      <button type="button" className="pl-btn-batal" onClick={batal}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                        Batal
                      </button>
                    )}
                    <button type="submit" className="pl-btn-submit">
                      {editIndex !== null
                        ? <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>Simpan Perubahan</>
                        : <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 4v16m8-8H4"/></svg>Tambah ke Pricelist</>}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* TABLE */}
            <div className="pl-table-card">
              <div className="pl-table-header">
                <div>
                  <div className="pl-table-title">
                    Data Pricelist
                    <span className="pl-count-badge">{filtered.length} item</span>
                  </div>
                  <div className="pl-table-sub">Daftar semua item harga layanan</div>
                </div>
                <div className="pl-search-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  <input
                    type="text"
                    className="pl-search-input"
                    placeholder="Cari layanan..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="pl-empty">
                  <div className="pl-empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </div>
                  <div className="pl-empty-title">{search ? "Tidak ada hasil" : "Belum ada data"}</div>
                  <div className="pl-empty-desc">
                    {search ? `Tidak ditemukan untuk "${search}"` : "Tambahkan item pricelist pertama menggunakan form di atas."}
                  </div>
                </div>
              ) : (
                <>
                  {/* DESKTOP TABLE */}
                  <div className="pl-desktop-table">
                    <table className="pl-table">
                      <thead>
                        <tr>
                          <th style={{ width: 40 }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="2" style={{ width:14,height:14 }}>
                              <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                            </svg>
                          </th>
                          {["Layanan","Daya Listrik","Jenis Bangunan","Harga","Aksi"].map(h => <th key={h}>{h}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((item, index) => {
                          const ri = data.indexOf(item);
                          return (
                            <tr key={index} className={editIndex === ri ? "editing-row" : ""}>
                              <td><span className="pl-td-no">{String(index+1).padStart(2,"0")}</span></td>
                              <td className="pl-td-name">{item.layanan}</td>
                              <td><span className="pl-pill-daya">{item.daya}</span></td>
                              <td><span className="pl-pill-bangunan">{item.bangunan}</span></td>
                              <td className="pl-td-harga">{fmt(Number(item.harga))}</td>
                              <td>
                                <div className="pl-action-cell">
                                  <button className="pl-btn-edit" onClick={() => edit(ri)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                    Edit
                                  </button>
                                  <button className="pl-btn-hapus" onClick={() => setDeleteConfirm(ri)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                    Hapus
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* MOBILE CARD LIST */}
                  <div className="pl-mobile-list">
                    {filtered.map((item, index) => {
                      const ri = data.indexOf(item);
                      return (
                        <div
                          key={index}
                          className="pl-mobile-item"
                          style={editIndex === ri ? { background:"rgba(245,193,0,.04)" } : {}}
                        >
                          <div className="pl-mobile-top">
                            <div className="pl-mobile-name">{item.layanan}</div>
                            <div className="pl-mobile-price">{fmt(Number(item.harga))}</div>
                          </div>
                          <div className="pl-mobile-pills">
                            <span className="pl-pill-daya">{item.daya}</span>
                            <span className="pl-pill-bangunan">{item.bangunan}</span>
                          </div>
                          <div className="pl-mobile-actions">
                            <button className="pl-btn-edit" onClick={() => edit(ri)}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                              </svg>
                              Edit
                            </button>
                            <button className="pl-btn-hapus" onClick={() => setDeleteConfirm(ri)}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                              Hapus
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* MODAL HAPUS */}
      {deleteConfirm !== null && (
        <div className="pl-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="pl-modal-box" onClick={e => e.stopPropagation()}>
            <div className="pl-modal-icon danger">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </div>
            <div className="pl-modal-title">Hapus Data Ini?</div>
            <div className="pl-modal-desc">
              Data pricelist <strong style={{ color:"#0B2B6B" }}>"{data[deleteConfirm]?.layanan}"</strong> akan dihapus secara permanen.
            </div>
            <div className="pl-modal-btns">
              <button className="pl-modal-cancel" onClick={() => setDeleteConfirm(null)}>Batal</button>
              <button className="pl-modal-confirm danger" onClick={() => hapus(deleteConfirm)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7"/>
                </svg>
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL LOGOUT */}
      {showLogoutModal && (
        <div className="pl-modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="pl-modal-box" onClick={e => e.stopPropagation()}>
            <div className="pl-modal-icon warning">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </div>
            <div className="pl-modal-title">Keluar dari Panel Admin?</div>
            <div className="pl-modal-desc">Anda akan mengakhiri sesi dan diarahkan kembali ke halaman login.</div>
            <div className="pl-modal-btns">
              <button className="pl-modal-cancel" onClick={() => setShowLogoutModal(false)}>Batal</button>
              <button className="pl-modal-confirm primary" onClick={handleLogout}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className={`pl-toast ${toast.type}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {toast.type === "success"
              ? <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              : <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>}
          </svg>
          {toast.msg}
        </div>
      )}
    </>
  );
}