"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "../../../components/AdminSidebar";
import { useRouter } from "next/navigation";

type Registration = {
  id: string;
  regNumber: string;
  name: string;
  type: string;
  date: string;
  status: "proses" | "selesai" | "ditolak";
};

const initialData: Registration[] = [
  { id: "1", regNumber: "REG-2024-00123", name: "Budi Santoso", type: "NIDI & SLO", date: "2024-03-20", status: "proses" },
  { id: "2", regNumber: "REG-2024-00124", name: "Siti Aminah", type: "NIDI & SLO", date: "2024-03-21", status: "selesai" },
];

export default function AdminStatusPage() {
  const [data, setData] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    regNumber: "",
    type: "NIDI & SLO",
    status: "proses" as Registration["status"],
  });

  useEffect(() => {
    const saved = localStorage.getItem("fs_admin_data");
    setData(saved ? JSON.parse(saved) : initialData);
  }, []);

  useEffect(() => {
    if (data.length > 0) localStorage.setItem("fs_admin_data", JSON.stringify(data));
  }, [data]);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({ name: "", regNumber: "", type: "NIDI & SLO", status: "proses" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Registration) => {
    setEditingId(item.id);
    setForm({ name: item.name, regNumber: item.regNumber, type: item.type, status: item.status });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setData(data.map(item =>
        item.id === editingId ? { ...item, ...form, regNumber: form.regNumber.toUpperCase() } : item
      ));
      showToast("Data registrasi berhasil diperbarui!");
    } else {
      const newItem: Registration = {
        id: Date.now().toString(),
        ...form,
        regNumber: form.regNumber.toUpperCase(),
        date: new Date().toLocaleDateString("id-ID"),
      };
      setData([newItem, ...data]);
      showToast("Registrasi baru berhasil ditambahkan!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
    localStorage.setItem("fs_admin_data", JSON.stringify(newData));
    setDeleteConfirm(null);
    showToast("Data berhasil dihapus.", "error");
  };

  const filteredData = data.filter(item =>
    item.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) =>
    name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  const avatarColors = ["#0B2B6B", "#1A47A0", "#2563EB", "#059669", "#D97706"];
  const getAvatarColor = (name: string) =>
    avatarColors[name.charCodeAt(0) % avatarColors.length];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --blue-deep:   #0B2B6B;
          --blue-mid:    #1A47A0;
          --blue-light:  #2563EB;
          --yellow:      #F5C100;
          --yellow-dark: #D4A200;
          --gray-soft:   #F4F6FB;
          --gray-text:   #4A5568;
        }

        /* ── ROOT ── */
        .as-root {
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: var(--gray-soft);
          min-height: 100vh;
        }

        /* ── CONTENT ── */
        .as-content {
          margin-left: 256px;
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          min-width: 0;
          max-width: calc(100vw - 256px);
          overflow-x: hidden;
        }

        /* ── TOPBAR ── */
        .as-topbar {
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
        .as-topbar-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem; font-weight: 700; color: var(--blue-deep);
        }
        .as-topbar-sub { font-size: .75rem; color: var(--gray-text); font-weight: 300; margin-top: 1px; }
        .as-admin-badge {
          display: flex; align-items: center; gap: 8px;
          background: var(--gray-soft); border: 1px solid rgba(26,71,160,.1);
          border-radius: 100px; padding: 6px 14px 6px 8px; flex-shrink: 0;
        }
        .as-avatar-sm {
          width: 28px; height: 28px; border-radius: 50%;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          display: flex; align-items: center; justify-content: center;
        }
        .as-avatar-sm svg { width: 14px; height: 14px; color: var(--yellow); }
        .as-badge-name { font-size: .8rem; font-weight: 600; color: var(--blue-deep); }

        /* ── BODY ── */
        .as-body { padding: 32px 36px 60px; display: flex; flex-direction: column; gap: 28px; }

        /* ── BANNER ── */
        .as-banner {
          background: linear-gradient(135deg, var(--blue-deep) 0%, var(--blue-mid) 100%);
          border-radius: 20px; padding: 28px 32px;
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
        }
        .as-banner::before {
          content: ''; position: absolute; top: -60px; right: -60px;
          width: 240px; height: 240px; border-radius: 50%;
          background: rgba(245,193,0,.09); pointer-events: none;
        }
        .as-banner::after {
          content: ''; position: absolute; bottom: -40px; left: 30%;
          width: 160px; height: 160px; border-radius: 50%;
          background: rgba(255,255,255,.03); pointer-events: none;
        }
        .as-banner-text { position: relative; z-index: 1; }
        .as-banner-eyebrow {
          font-size: .72rem; font-weight: 600; color: rgba(255,255,255,.5);
          text-transform: uppercase; letter-spacing: .12em; margin-bottom: 5px;
        }
        .as-banner-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 700; color: white; margin-bottom: 4px;
        }
        .as-banner-title em { font-style: italic; color: var(--yellow); }
        .as-banner-date { font-size: .78rem; color: rgba(255,255,255,.4); font-weight: 300; }
        .as-banner-stats {
          position: relative; z-index: 1;
          display: flex; gap: 12px; flex-wrap: wrap;
        }
        .as-stat-pill {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 14px; padding: 12px 18px;
        }
        .as-stat-pill-icon {
          width: 36px; height: 36px; border-radius: 9px;
          background: var(--yellow);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .as-stat-pill-icon svg { width: 17px; height: 17px; color: var(--blue-deep); }
        .as-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 700; color: white; line-height: 1;
        }
        .as-stat-label { font-size: .68rem; color: rgba(255,255,255,.5); font-weight: 300; }

        /* ── CARD ── */
        .as-card {
          background: white;
          border-radius: 20px;
          border: 1px solid rgba(26,71,160,.08);
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(11,43,107,.06);
        }
        .as-card-toolbar {
          padding: 20px 28px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; flex-wrap: wrap;
          border-bottom: 1px solid rgba(26,71,160,.07);
        }
        .as-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 700; color: var(--blue-deep); margin-bottom: 2px;
        }
        .as-card-sub { font-size: .75rem; color: var(--gray-text); font-weight: 300; }
        .as-count-badge {
          display: inline-flex; align-items: center;
          background: rgba(26,71,160,.07); color: var(--blue-mid);
          padding: 4px 10px; border-radius: 100px;
          font-size: .75rem; font-weight: 600; margin-left: 10px;
        }

        /* ── SEARCH + ADD ── */
        .as-search-wrap { position: relative; }
        .as-search-wrap svg {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          width: 16px; height: 16px; color: #9CA3AF; pointer-events: none;
        }
        .as-search {
          padding: 10px 14px 10px 38px;
          border-radius: 10px; border: 1.5px solid rgba(26,71,160,.13);
          background: var(--gray-soft); font-family: 'DM Sans', sans-serif;
          font-size: .86rem; color: var(--blue-deep); outline: none;
          transition: border-color .2s, box-shadow .2s;
          width: 260px;
        }
        .as-search:focus {
          border-color: var(--blue-light);
          box-shadow: 0 0 0 3px rgba(37,99,235,.1);
          background: white;
        }
        .as-search::placeholder { color: #9CA3AF; font-weight: 300; }

        .as-btn-add {
          display: flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          color: white; border: none; border-radius: 10px;
          padding: 10px 20px;
          font-family: 'DM Sans', sans-serif; font-size: .86rem; font-weight: 600;
          cursor: pointer; transition: opacity .2s, transform .2s, box-shadow .2s;
          white-space: nowrap;
        }
        .as-btn-add:hover { opacity: .9; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(11,43,107,.2); }
        .as-btn-add svg { width: 15px; height: 15px; }

        /* ── TABLE ── */
        .as-table-wrap { overflow-x: auto; }
        .as-table { width: 100%; border-collapse: collapse; min-width: 680px; }
        .as-table thead tr { background: linear-gradient(90deg, var(--blue-deep), var(--blue-mid)); }
        .as-table thead th {
          padding: 13px 20px; text-align: left;
          font-size: .68rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .09em;
          color: rgba(255,255,255,.8); white-space: nowrap;
        }
        .as-table thead th:last-child { text-align: center; }
        .as-table tbody tr { border-bottom: 1px solid rgba(26,71,160,.06); transition: background .15s; }
        .as-table tbody tr:last-child { border-bottom: none; }
        .as-table tbody tr:hover { background: rgba(26,71,160,.025); }
        .as-table td { padding: 14px 20px; vertical-align: middle; }

        .as-td-reg { font-size: .82rem; font-weight: 700; color: var(--blue-deep); white-space: nowrap; }
        .as-td-name-wrap { display: flex; align-items: center; gap: 10px; }
        .as-avatar {
          width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: .7rem; font-weight: 700; color: white;
        }
        .as-td-name { font-size: .86rem; color: #2D3748; font-weight: 500; }

        /* Status badge */
        .as-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 11px; border-radius: 100px;
          font-size: .72rem; font-weight: 700;
        }
        .as-badge-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .as-badge.proses  { background: #FFFBEB; color: #D97706; border: 1px solid rgba(217,119,6,.15); }
        .as-badge.proses  .as-badge-dot { background: #F59E0B; }
        .as-badge.selesai { background: #ECFDF5; color: #059669; border: 1px solid rgba(5,150,105,.15); }
        .as-badge.selesai .as-badge-dot { background: #10B981; }
        .as-badge.ditolak { background: #FFF1F2; color: #E11D48; border: 1px solid rgba(225,29,72,.15); }
        .as-badge.ditolak .as-badge-dot { background: #F43F5E; }

        /* Action buttons — icon + label style (same as NIDI page) */
        .as-action-cell { display: flex; align-items: center; justify-content: center; gap: 8px; }
        .as-btn-edit {
          display: flex; align-items: center; gap: 5px;
          background: rgba(26,71,160,.07); color: var(--blue-mid);
          border: 1px solid rgba(26,71,160,.15); border-radius: 8px;
          padding: 6px 11px; font-family: 'DM Sans', sans-serif;
          font-size: .74rem; font-weight: 600; cursor: pointer;
          transition: background .2s, transform .2s;
        }
        .as-btn-edit:hover { background: rgba(26,71,160,.14); transform: translateY(-1px); }
        .as-btn-edit svg { width: 12px; height: 12px; }
        .as-btn-del {
          display: flex; align-items: center; gap: 5px;
          background: rgba(239,68,68,.07); color: #DC2626;
          border: 1px solid rgba(239,68,68,.18); border-radius: 8px;
          padding: 6px 11px; font-family: 'DM Sans', sans-serif;
          font-size: .74rem; font-weight: 600; cursor: pointer;
          transition: background .2s, transform .2s;
        }
        .as-btn-del:hover { background: #FEE2E2; transform: translateY(-1px); }
        .as-btn-del svg { width: 12px; height: 12px; }

        /* ── EMPTY STATE ── */
        .as-empty {
          padding: 52px 20px; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 10px;
        }
        .as-empty-icon {
          width: 60px; height: 60px; border-radius: 50%;
          background: var(--gray-soft); display: flex; align-items: center; justify-content: center;
        }
        .as-empty-icon svg { width: 28px; height: 28px; color: #CBD5E0; }
        .as-empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 700; color: var(--blue-deep);
        }
        .as-empty-desc { font-size: .8rem; color: var(--gray-text); font-weight: 300; }

        /* ── MOBILE CARD LIST ── */
        .as-mobile-list { display: none; }
        .as-mobile-item { padding: 16px 20px; border-bottom: 1px solid rgba(26,71,160,.06); }
        .as-mobile-item:last-child { border-bottom: none; }
        .as-mobile-top { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
        .as-mobile-reg { font-size: .86rem; font-weight: 700; color: var(--blue-deep); flex: 1; }
        .as-mobile-name { font-size: .84rem; color: var(--gray-text); margin-bottom: 8px; }
        .as-mobile-bottom { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
        .as-mobile-actions { display: flex; gap: 8px; }

        /* ── MODAL OVERLAY ── */
        .as-modal-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(11,43,107,.45);
          display: flex; align-items: center; justify-content: center; padding: 24px;
          animation: asFadeIn .2s ease;
        }
        @keyframes asFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes asScaleIn { from{opacity:0;transform:scale(.9)} to{opacity:1;transform:scale(1)} }

        /* ── FORM MODAL ── */
        .as-form-modal {
          background: white; border-radius: 22px; overflow: hidden;
          max-width: 440px; width: 100%;
          box-shadow: 0 24px 64px rgba(11,43,107,.22);
          animation: asScaleIn .25s ease;
        }
        .as-form-modal-header {
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          padding: 20px 28px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .as-form-modal-header-left { display: flex; align-items: center; gap: 12px; }
        .as-form-modal-icon {
          width: 40px; height: 40px; background: var(--yellow);
          border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .as-form-modal-icon svg { width: 20px; height: 20px; color: var(--blue-deep); }
        .as-form-modal-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 700; color: white; margin-bottom: 2px;
        }
        .as-form-modal-sub { font-size: .72rem; color: rgba(255,255,255,.5); }
        .as-modal-close {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.15);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background .2s; flex-shrink: 0;
        }
        .as-modal-close:hover { background: rgba(255,255,255,.2); }
        .as-modal-close svg { width: 16px; height: 16px; color: white; }
        .as-form-modal-body { padding: 28px; }

        .as-form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .as-form-label {
          font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .07em; color: var(--blue-deep);
        }
        .as-field-wrap { position: relative; }
        .as-field-wrap svg.fi {
          position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
          width: 16px; height: 16px; color: #9CA3AF; pointer-events: none; transition: color .2s;
        }
        .as-field-wrap:focus-within svg.fi { color: var(--blue-mid); }
        .as-input {
          width: 100%; padding: 12px 14px 12px 40px;
          border-radius: 10px; border: 1.5px solid rgba(26,71,160,.13);
          background: var(--gray-soft); font-family: 'DM Sans', sans-serif;
          font-size: .9rem; color: var(--blue-deep); outline: none;
          transition: border-color .2s, background .2s, box-shadow .2s;
          box-sizing: border-box;
        }
        .as-input:focus {
          border-color: var(--blue-light); background: white;
          box-shadow: 0 0 0 3px rgba(37,99,235,.1);
        }
        .as-input::placeholder { color: #9CA3AF; font-weight: 300; }

        .as-form-actions { display: flex; gap: 10px; margin-top: 6px; }
        .as-btn-cancel {
          flex: 1; padding: 12px; border-radius: 10px;
          border: 1.5px solid rgba(26,71,160,.12); background: var(--gray-soft);
          font-family: 'DM Sans', sans-serif; font-size: .9rem; font-weight: 600;
          color: var(--gray-text); cursor: pointer; transition: background .2s;
        }
        .as-btn-cancel:hover { background: #E8ECF4; }
        .as-btn-save {
          flex: 1; padding: 12px; border-radius: 10px; border: none;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          font-family: 'DM Sans', sans-serif; font-size: .9rem; font-weight: 600;
          color: white; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: opacity .2s, transform .2s;
        }
        .as-btn-save:hover { opacity: .9; transform: translateY(-1px); }
        .as-btn-save svg { width: 15px; height: 15px; }

        /* ── DELETE / LOGOUT MODAL ── */
        .as-confirm-modal {
          background: white; border-radius: 22px; padding: 40px 36px;
          max-width: 400px; width: 100%; text-align: center;
          box-shadow: 0 24px 64px rgba(11,43,107,.22);
          animation: asScaleIn .25s ease;
        }
        .as-modal-icon {
          width: 68px; height: 68px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; margin: 0 auto 18px;
        }
        .as-modal-icon.danger { background: #FEF2F2; }
        .as-modal-icon.danger svg { width: 30px; height: 30px; color: #EF4444; }
        .as-modal-icon.logout { background: linear-gradient(135deg,#FEF9EC,#FFF3CD); border: 2px solid rgba(245,193,0,.3); }
        .as-modal-icon.logout svg { width: 30px; height: 30px; color: #D4A200; }
        .as-confirm-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem; font-weight: 700; color: var(--blue-deep); margin-bottom: 10px;
        }
        .as-confirm-desc {
          font-size: .86rem; color: var(--gray-text); font-weight: 300;
          line-height: 1.7; margin-bottom: 28px;
        }
        .as-confirm-btns { display: flex; gap: 10px; }
        .as-confirm-cancel {
          flex: 1; padding: 12px; border-radius: 10px;
          border: 1.5px solid rgba(26,71,160,.12); background: var(--gray-soft);
          font-family: 'DM Sans', sans-serif; font-size: .9rem; font-weight: 600;
          color: var(--gray-text); cursor: pointer; transition: background .2s;
        }
        .as-confirm-cancel:hover { background: #E8ECF4; }
        .as-confirm-ok {
          flex: 1; padding: 12px; border-radius: 10px; border: none;
          font-family: 'DM Sans', sans-serif; font-size: .9rem; font-weight: 600;
          color: white; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: opacity .2s, transform .2s;
        }
        .as-confirm-ok:hover { opacity: .9; transform: translateY(-1px); }
        .as-confirm-ok.danger { background: #EF4444; }
        .as-confirm-ok.primary { background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid)); }
        .as-confirm-ok svg { width: 15px; height: 15px; }

        /* ── TOAST ── */
        .as-toast {
          position: fixed; bottom: 28px; right: 28px; z-index: 2000;
          display: flex; align-items: center; gap: 10px;
          padding: 14px 20px; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-size: .87rem; font-weight: 500;
          box-shadow: 0 8px 28px rgba(0,0,0,.14);
          animation: asSlideUp .3s ease;
        }
        @keyframes asSlideUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .as-toast.success { background: var(--blue-deep); color: white; }
        .as-toast.error   { background: #FEF2F2; color: #DC2626; border: 1px solid #FCA5A5; }
        .as-toast svg { width: 17px; height: 17px; flex-shrink: 0; }

        /* ─────────────────────────────────────
           RESPONSIVE
        ───────────────────────────────────── */
        @media (max-width: 768px) {
          /* KUNCI: content mulai tepat di bawah mobile navbar AdminSidebar */
          .as-content {
            margin-left: 0 !important;
            max-width: 100vw !important;
            width: 100% !important;
            /* 
              Hapus padding-top besar.
              AdminSidebar mobile navbar umumnya 64px tingginya.
              Sesuaikan angka ini dengan tinggi navbar AdminSidebar Anda.
            */
            padding-top: 0 !important;
          }

          /* Topbar kita jadikan sticky tepat di bawah mobile navbar */
          .as-topbar {
            /* top = tinggi navbar AdminSidebar mobile (biasanya 64px) */
            top: 64px;
            padding: 12px 16px;
          }

          .as-badge-name { display: none; }

          .as-body { padding: 16px 16px 48px; gap: 16px; }

          .as-banner {
            flex-direction: column; align-items: flex-start;
            padding: 20px; gap: 14px;
          }
          .as-banner-title { font-size: 1.15rem; }
          .as-banner-stats { width: 100%; }
          .as-stat-pill { flex: 1; }

          .as-card-toolbar {
            padding: 14px 16px;
            flex-direction: column; align-items: stretch; gap: 10px;
          }
          .as-search { width: 100%; }
          .as-btn-add { justify-content: center; }

          /* Sembunyikan tabel desktop, tampilkan kartu mobile */
          .as-table-wrap { display: none; }
          .as-mobile-list { display: block; }

          .as-toast { bottom: 16px; right: 16px; left: 16px; }
          .as-confirm-modal { padding: 28px 20px; }
          .as-form-modal-body { padding: 20px 16px; }
        }

        @media (max-width: 480px) {
          .as-mobile-actions { width: 100%; }
          .as-mobile-actions .as-btn-edit,
          .as-mobile-actions .as-btn-del { flex: 1; justify-content: center; }
        }
      `}</style>

      <div className="as-root">
        <AdminSidebar onLogout={() => setShowLogoutModal(true)} />

        <div className="as-content">

          {/* ── TOPBAR ── */}
          <div className="as-topbar">
            <div>
              <div className="as-topbar-title">Kelola Registrasi</div>
              <div className="as-topbar-sub">Manajemen data & status pendaftaran NIDI/SLO</div>
            </div>
            <div className="as-admin-badge">
              <div className="as-avatar-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <span className="as-badge-name">Administrator</span>
            </div>
          </div>

          <div className="as-body">

            {/* ── BANNER ── */}
            <div className="as-banner">
              <div className="as-banner-text">
                <div className="as-banner-eyebrow">Manajemen Registrasi — NIDI & SLO</div>
                <div className="as-banner-title">Kelola <em>Registrasi</em>, Admin!</div>
                <div className="as-banner-date">
                  {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </div>
              </div>
              <div className="as-banner-stats">
                <div className="as-stat-pill">
                  <div className="as-stat-pill-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </div>
                  <div>
                    <div className="as-stat-num">{data.length}</div>
                    <div className="as-stat-label">Total Registrasi</div>
                  </div>
                </div>
                <div className="as-stat-pill">
                  <div className="as-stat-pill-icon" style={{ background: "rgba(245,193,0,.2)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="as-stat-num" style={{ color: "#F5C100" }}>{data.filter(i => i.status === "proses").length}</div>
                    <div className="as-stat-label">Diproses</div>
                  </div>
                </div>
                <div className="as-stat-pill">
                  <div className="as-stat-pill-icon" style={{ background: "rgba(16,185,129,.15)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="as-stat-num" style={{ color: "#10B981" }}>{data.filter(i => i.status === "selesai").length}</div>
                    <div className="as-stat-label">Selesai</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── TABLE CARD ── */}
            <div className="as-card">
              <div className="as-card-toolbar">
                <div>
                  <div className="as-card-title">
                    Daftar Registrasi
                    <span className="as-count-badge">{filteredData.length} data</span>
                  </div>
                  <div className="as-card-sub">Semua data pendaftaran NIDI & SLO</div>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                  <div className="as-search-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    <input
                      className="as-search"
                      placeholder="Cari nama atau nomor registrasi..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="as-btn-add" onClick={handleOpenAdd}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 4v16m8-8H4"/>
                    </svg>
                    Tambah Registrasi
                  </button>
                </div>
              </div>

              {filteredData.length === 0 ? (
                <div className="as-empty">
                  <div className="as-empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </div>
                  <div className="as-empty-title">Belum ada data registrasi</div>
                  <div className="as-empty-desc">Klik "Tambah Registrasi" untuk menambahkan data baru.</div>
                </div>
              ) : (
                <>
                  {/* DESKTOP TABLE */}
                  <div className="as-table-wrap">
                    <table className="as-table">
                      <thead>
                        <tr>
                          <th>No. Registrasi</th>
                          <th>Nama Pelanggan</th>
                          <th>Jenis</th>
                          <th>Status</th>
                          <th>Tanggal</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map(item => (
                          <tr key={item.id}>
                            <td className="as-td-reg">{item.regNumber}</td>
                            <td>
                              <div className="as-td-name-wrap">
                                <div className="as-avatar" style={{ background: getAvatarColor(item.name) }}>
                                  {getInitials(item.name)}
                                </div>
                                <span className="as-td-name">{item.name}</span>
                              </div>
                            </td>
                            <td>
                              <span style={{
                                display: "inline-block", background: "rgba(245,193,0,.12)",
                                color: "var(--yellow-dark)", padding: "3px 10px",
                                borderRadius: "100px", fontSize: ".74rem", fontWeight: 500
                              }}>{item.type}</span>
                            </td>
                            <td>
                              <span className={`as-badge ${item.status}`}>
                                <span className="as-badge-dot"/>
                                {item.status === "proses" ? "Diproses" : item.status === "selesai" ? "Selesai" : "Ditolak"}
                              </span>
                            </td>
                            <td style={{ fontSize: ".75rem", color: "#9CA3AF", whiteSpace: "nowrap" }}>{item.date}</td>
                            <td>
                              <div className="as-action-cell">
                                <button className="as-btn-edit" onClick={() => handleOpenEdit(item)}>
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                  </svg>
                                  Edit
                                </button>
                                <button className="as-btn-del" onClick={() => setDeleteConfirm(item.id)}>
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                  </svg>
                                  Hapus
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* MOBILE CARD LIST */}
                  <div className="as-mobile-list">
                    {filteredData.map(item => (
                      <div key={item.id} className="as-mobile-item">
                        <div className="as-mobile-top">
                          <div className="as-avatar" style={{ background: getAvatarColor(item.name) }}>
                            {getInitials(item.name)}
                          </div>
                          <div className="as-mobile-reg">{item.regNumber}</div>
                          <span className={`as-badge ${item.status}`}>
                            <span className="as-badge-dot"/>
                            {item.status === "proses" ? "Diproses" : item.status === "selesai" ? "Selesai" : "Ditolak"}
                          </span>
                        </div>
                        <div className="as-mobile-name">{item.name}</div>
                        <div className="as-mobile-bottom">
                          <span style={{
                            display: "inline-block", background: "rgba(245,193,0,.12)",
                            color: "var(--yellow-dark)", padding: "3px 10px",
                            borderRadius: "100px", fontSize: ".74rem", fontWeight: 500
                          }}>{item.type}</span>
                          <div className="as-mobile-actions">
                            <button className="as-btn-edit" onClick={() => handleOpenEdit(item)}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                              </svg>
                              Edit
                            </button>
                            <button className="as-btn-del" onClick={() => setDeleteConfirm(item.id)}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                              Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

          </div>{/* end as-body */}
        </div>{/* end as-content */}
      </div>{/* end as-root */}

      {/* ── FORM MODAL ── */}
      {isModalOpen && (
        <div className="as-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="as-form-modal" onClick={e => e.stopPropagation()}>
            <div className="as-form-modal-header">
              <div className="as-form-modal-header-left">
                <div className="as-form-modal-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {editingId
                      ? <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      : <path d="M12 4v16m8-8H4"/>
                    }
                  </svg>
                </div>
                <div>
                  <div className="as-form-modal-title">{editingId ? "Edit Data Registrasi" : "Tambah Registrasi Baru"}</div>
                  <div className="as-form-modal-sub">{editingId ? "Perbarui informasi pendaftaran" : "Isi form untuk menambah data baru"}</div>
                </div>
              </div>
              <button className="as-modal-close" onClick={() => setIsModalOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="as-form-modal-body">
              <form onSubmit={handleSubmit}>
                <div className="as-form-group">
                  <label className="as-form-label">Nama Pelanggan</label>
                  <div className="as-field-wrap">
                    <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <input className="as-input" placeholder="Nama Lengkap Pelanggan" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                </div>
                <div className="as-form-group">
                  <label className="as-form-label">Nomor Registrasi</label>
                  <div className="as-field-wrap">
                    <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                    <input className="as-input" placeholder="REG-2026-XXXXX" value={form.regNumber}
                      onChange={e => setForm({ ...form, regNumber: e.target.value })} required />
                  </div>
                </div>
                <div className="as-form-group">
                  <label className="as-form-label">Status</label>
                  <div className="as-field-wrap">
                    <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <select className="as-input" value={form.status}
                      onChange={e => setForm({ ...form, status: e.target.value as Registration["status"] })}>
                      <option value="proses">Sedang Diproses</option>
                      <option value="selesai">Sertifikat Terbit</option>
                      <option value="ditolak">Perlu Revisi</option>
                    </select>
                  </div>
                </div>
                <div className="as-form-actions">
                  <button type="button" className="as-btn-cancel" onClick={() => setIsModalOpen(false)}>Batal</button>
                  <button type="submit" className="as-btn-save">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 13l4 4L19 7"/>
                    </svg>
                    Simpan Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM MODAL ── */}
      {deleteConfirm && (
        <div className="as-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="as-confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="as-modal-icon danger">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </div>
            <div className="as-confirm-title">Hapus Data Ini?</div>
            <div className="as-confirm-desc">
              Data registrasi <strong style={{ color: "var(--blue-deep)" }}>
                "{data.find(c => c.id === deleteConfirm)?.regNumber}"
              </strong> akan dihapus secara permanen dan tidak dapat dikembalikan.
            </div>
            <div className="as-confirm-btns">
              <button className="as-confirm-cancel" onClick={() => setDeleteConfirm(null)}>Batal</button>
              <button className="as-confirm-ok danger" onClick={() => handleDelete(deleteConfirm)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7"/>
                </svg>
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── LOGOUT CONFIRM MODAL ── */}
      {showLogoutModal && (
        <div className="as-modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="as-confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="as-modal-icon logout">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </div>
            <div className="as-confirm-title">Keluar dari Panel Admin?</div>
            <div className="as-confirm-desc">Anda akan mengakhiri sesi dan diarahkan kembali ke halaman login.</div>
            <div className="as-confirm-btns">
              <button className="as-confirm-cancel" onClick={() => setShowLogoutModal(false)}>Batal</button>
              <button className="as-confirm-ok primary" onClick={() => router.push("/")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className={`as-toast ${toast.type}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {toast.type === "success"
              ? <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              : <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            }
          </svg>
          {toast.msg}
        </div>
      )}
    </>
  );
}