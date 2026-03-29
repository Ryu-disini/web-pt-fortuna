"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "../../../components/AdminSidebar";
import { useRouter } from "next/navigation";

interface NidiCertificate {
  id: string;
  nidiNumber: string;
  ownerName: string;
  buildingType: string;
  capacity: string;
  image: string;
  date: string;
}

export default function AdminNidiUpload() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [certificates, setCertificates] = useState<NidiCertificate[]>([]);
  const [formData, setFormData] = useState({
    nidiNumber: "",
    ownerName: "",
    buildingType: "",
    capacity: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [previewModal, setPreviewModal] = useState<NidiCertificate | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("nidi_storage_data");
    if (saved) setCertificates(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("nidi_storage_data", JSON.stringify(certificates));
  }, [certificates]);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          const scale = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL("image/jpeg", 0.7));
          }
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(await compressImage(file));
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImagePreview(await compressImage(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) { showToast("Pilih gambar sertifikat dulu!", "error"); return; }
    setLoading(true);
    setTimeout(() => {
      const newEntry: NidiCertificate = {
        id: Date.now().toString(),
        ...formData,
        nidiNumber: formData.nidiNumber.toUpperCase(),
        image: imagePreview,
        date: new Date().toLocaleDateString("id-ID"),
      };
      setCertificates(prev => [newEntry, ...prev]);
      setFormData({ nidiNumber: "", ownerName: "", buildingType: "", capacity: "" });
      setImagePreview(null);
      setLoading(false);
      showToast("Sertifikat NIDI berhasil disimpan!");
    }, 800);
  };

  const handleDelete = (id: string) => {
    setCertificates(prev => prev.filter(item => item.id !== id));
    setDeleteConfirm(null);
    showToast("Sertifikat dihapus.", "error");
  };

  return (
    <>
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
        }

        /* ── ROOT ── */
        .nu-root {
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: var(--gray-soft);
          min-height: 100vh;
        }

        /* ── CONTENT ── */
        .nu-content {
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
        .nu-topbar {
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
        .nu-topbar-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem; font-weight: 700; color: var(--blue-deep);
        }
        .nu-topbar-sub { font-size: .75rem; color: var(--gray-text); font-weight: 300; margin-top: 1px; }
        .nu-admin-badge {
          display: flex; align-items: center; gap: 8px;
          background: var(--gray-soft); border: 1px solid rgba(26,71,160,.1);
          border-radius: 100px; padding: 6px 14px 6px 8px; flex-shrink: 0;
        }
        .nu-avatar-sm {
          width: 28px; height: 28px; border-radius: 50%;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          display: flex; align-items: center; justify-content: center;
        }
        .nu-avatar-sm svg { width: 14px; height: 14px; color: var(--yellow); }
        .nu-badge-name { font-size: .8rem; font-weight: 600; color: var(--blue-deep); }

        /* ── BODY ── */
        .nu-body { padding: 32px 36px 60px; display: flex; flex-direction: column; gap: 28px; }

        /* ── GREETING BANNER ── */
        .nu-banner {
          background: linear-gradient(135deg, var(--blue-deep) 0%, var(--blue-mid) 100%);
          border-radius: 20px; padding: 28px 32px;
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
        }
        .nu-banner::before {
          content: ''; position: absolute; top: -60px; right: -60px;
          width: 240px; height: 240px; border-radius: 50%;
          background: rgba(245,193,0,.09); pointer-events: none;
        }
        .nu-banner::after {
          content: ''; position: absolute; bottom: -40px; left: 30%;
          width: 160px; height: 160px; border-radius: 50%;
          background: rgba(255,255,255,.03); pointer-events: none;
        }
        .nu-banner-text { position: relative; z-index: 1; }
        .nu-banner-eyebrow {
          font-size: .72rem; font-weight: 600; color: rgba(255,255,255,.5);
          text-transform: uppercase; letter-spacing: .12em; margin-bottom: 5px;
        }
        .nu-banner-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 700; color: white; margin-bottom: 4px;
        }
        .nu-banner-title em { font-style: italic; color: var(--yellow); }
        .nu-banner-date { font-size: .78rem; color: rgba(255,255,255,.4); font-weight: 300; }
        .nu-banner-stat {
          position: relative; z-index: 1;
          display: flex; gap: 20px; flex-wrap: wrap;
        }
        .nu-stat-pill {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 14px; padding: 12px 18px;
        }
        .nu-stat-pill-icon {
          width: 36px; height: 36px; border-radius: 9px;
          background: var(--yellow);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .nu-stat-pill-icon svg { width: 17px; height: 17px; color: var(--blue-deep); }
        .nu-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 700; color: white; line-height: 1;
        }
        .nu-stat-label { font-size: .68rem; color: rgba(255,255,255,.5); font-weight: 300; }

        /* ── TWO-COL GRID ── */
        .nu-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 24px;
          align-items: start;
        }

        /* ── CARD ── */
        .nu-card {
          background: white;
          border-radius: 20px;
          border: 1px solid rgba(26,71,160,.08);
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(11,43,107,.06);
        }
        .nu-card-header {
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          padding: 20px 28px;
          display: flex; align-items: center; gap: 12px;
        }
        .nu-card-header-icon {
          width: 40px; height: 40px; background: var(--yellow);
          border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .nu-card-header-icon svg { width: 20px; height: 20px; color: var(--blue-deep); }
        .nu-card-header-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 700; color: white; margin-bottom: 2px;
        }
        .nu-card-header-sub { font-size: .72rem; color: rgba(255,255,255,.5); }
        .nu-card-body { padding: 28px; }

        /* Table card header (white) */
        .nu-table-header {
          padding: 20px 28px;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          border-bottom: 1px solid rgba(26,71,160,.07); flex-wrap: wrap;
        }
        .nu-table-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 700; color: var(--blue-deep); margin-bottom: 2px;
        }
        .nu-table-sub { font-size: .75rem; color: var(--gray-text); font-weight: 300; }
        .nu-count-badge {
          display: inline-flex; align-items: center;
          background: rgba(26,71,160,.07); color: var(--blue-mid);
          padding: 4px 10px; border-radius: 100px;
          font-size: .75rem; font-weight: 600; margin-left: 10px;
        }

        /* ── FORM ── */
        .nu-form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .nu-form-label {
          font-size: .72rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .07em; color: var(--blue-deep);
        }
        .nu-field-wrap { position: relative; }
        .nu-field-wrap svg.fi {
          position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
          width: 16px; height: 16px; color: #9CA3AF; pointer-events: none; transition: color .2s;
        }
        .nu-field-wrap:focus-within svg.fi { color: var(--blue-mid); }
        .nu-input {
          width: 100%; padding: 12px 14px 12px 40px;
          border-radius: 10px; border: 1.5px solid rgba(26,71,160,.13);
          background: var(--gray-soft); font-family: 'DM Sans', sans-serif;
          font-size: .9rem; color: var(--blue-deep); outline: none;
          transition: border-color .2s, background .2s, box-shadow .2s;
          box-sizing: border-box;
        }
        .nu-input:focus {
          border-color: var(--blue-light); background: white;
          box-shadow: 0 0 0 3px rgba(37,99,235,.1);
        }
        .nu-input::placeholder { color: #9CA3AF; font-weight: 300; }

        .nu-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        /* Upload box */
        .nu-upload-box {
          border: 2px dashed rgba(26,71,160,.2);
          border-radius: 12px; padding: 24px 20px;
          text-align: center; cursor: pointer;
          background: var(--gray-soft);
          transition: border-color .2s, background .2s;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .nu-upload-box.drag-over {
          border-color: var(--blue-light);
          background: rgba(37,99,235,.04);
        }
        .nu-upload-box.has-image { border-color: rgba(5,150,105,.3); background: rgba(5,150,105,.04); }
        .nu-upload-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(26,71,160,.08);
          display: flex; align-items: center; justify-content: center;
        }
        .nu-upload-icon svg { width: 22px; height: 22px; color: var(--blue-mid); }
        .nu-upload-title { font-size: .85rem; font-weight: 600; color: var(--blue-deep); }
        .nu-upload-sub { font-size: .72rem; color: var(--gray-text); font-weight: 300; }
        .nu-preview-img {
          width: 100%; max-height: 180px; object-fit: contain;
          border-radius: 10px; margin-top: 14px;
          border: 1px solid rgba(26,71,160,.08);
        }

        /* Submit button */
        .nu-btn-submit {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          color: white; border: none; border-radius: 10px; padding: 14px;
          font-family: 'DM Sans', sans-serif; font-size: .92rem; font-weight: 600;
          cursor: pointer; margin-top: 6px;
          transition: opacity .2s, transform .2s, box-shadow .2s;
        }
        .nu-btn-submit:hover { opacity: .9; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(11,43,107,.2); }
        .nu-btn-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }
        .nu-btn-submit svg { width: 16px; height: 16px; }

        /* ── TABLE ── */
        .nu-table-wrap { overflow-x: auto; }
        .nu-table { width: 100%; border-collapse: collapse; }
        .nu-table thead tr { background: linear-gradient(90deg, var(--blue-deep), var(--blue-mid)); }
        .nu-table thead th {
          padding: 13px 20px; text-align: left;
          font-size: .68rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .09em;
          color: rgba(255,255,255,.8); white-space: nowrap;
        }
        .nu-table thead th:last-child { text-align: center; }
        .nu-table tbody tr { border-bottom: 1px solid rgba(26,71,160,.06); transition: background .15s; }
        .nu-table tbody tr:last-child { border-bottom: none; }
        .nu-table tbody tr:hover { background: rgba(26,71,160,.025); }
        .nu-table td { padding: 13px 20px; }
        .nu-td-nidi { font-size: .82rem; font-weight: 700; color: var(--blue-deep); white-space: nowrap; }
        .nu-td-name { font-size: .84rem; color: var(--gray-text); }
        .nu-pill-daya {
          display: inline-block; background: rgba(26,71,160,.08); color: var(--blue-mid);
          padding: 3px 10px; border-radius: 100px;
          font-size: .74rem; font-weight: 500;
        }
        .nu-pill-building {
          display: inline-block; background: rgba(245,193,0,.12); color: var(--yellow-dark);
          padding: 3px 10px; border-radius: 100px;
          font-size: .74rem; font-weight: 500;
        }
        .nu-td-date { font-size: .75rem; color: #9CA3AF; white-space: nowrap; }
        .nu-action-cell { display: flex; align-items: center; justify-content: center; gap: 8px; }
        .nu-btn-preview-tbl {
          display: flex; align-items: center; gap: 5px;
          background: rgba(26,71,160,.07); color: var(--blue-mid);
          border: 1px solid rgba(26,71,160,.15); border-radius: 8px;
          padding: 6px 11px; font-family: 'DM Sans', sans-serif;
          font-size: .74rem; font-weight: 600; cursor: pointer;
          transition: background .2s, transform .2s;
        }
        .nu-btn-preview-tbl:hover { background: rgba(26,71,160,.14); transform: translateY(-1px); }
        .nu-btn-preview-tbl svg { width: 12px; height: 12px; }
        .nu-btn-del {
          display: flex; align-items: center; gap: 5px;
          background: rgba(239,68,68,.07); color: #DC2626;
          border: 1px solid rgba(239,68,68,.18); border-radius: 8px;
          padding: 6px 11px; font-family: 'DM Sans', sans-serif;
          font-size: .74rem; font-weight: 600; cursor: pointer;
          transition: background .2s, transform .2s;
        }
        .nu-btn-del:hover { background: #FEE2E2; transform: translateY(-1px); }
        .nu-btn-del svg { width: 12px; height: 12px; }

        /* Empty state */
        .nu-empty {
          padding: 52px 20px; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 10px;
        }
        .nu-empty-icon {
          width: 60px; height: 60px; border-radius: 50%;
          background: var(--gray-soft); display: flex; align-items: center; justify-content: center;
        }
        .nu-empty-icon svg { width: 28px; height: 28px; color: #CBD5E0; }
        .nu-empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 700; color: var(--blue-deep);
        }
        .nu-empty-desc { font-size: .8rem; color: var(--gray-text); font-weight: 300; }

        /* Mobile card list */
        .nu-mobile-list { display: none; }
        .nu-mobile-item { padding: 16px 20px; border-bottom: 1px solid rgba(26,71,160,.06); }
        .nu-mobile-item:last-child { border-bottom: none; }
        .nu-mobile-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
        .nu-mobile-nidi { font-size: .88rem; font-weight: 700; color: var(--blue-deep); }
        .nu-mobile-date { font-size: .72rem; color: #9CA3AF; }
        .nu-mobile-name { font-size: .84rem; color: var(--gray-text); margin-bottom: 8px; }
        .nu-mobile-pills { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
        .nu-mobile-actions { display: flex; gap: 8px; }
        .nu-mobile-actions .nu-btn-preview-tbl,
        .nu-mobile-actions .nu-btn-del { flex: 1; justify-content: center; }

        /* ── MODALS ── */
        .nu-modal-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(11,43,107,.45);
          display: flex; align-items: center; justify-content: center; padding: 24px;
          animation: nuFadeIn .2s ease;
        }
        @keyframes nuFadeIn { from{opacity:0} to{opacity:1} }
        .nu-modal-box {
          background: white; border-radius: 22px; padding: 40px 36px;
          max-width: 400px; width: 100%; text-align: center;
          box-shadow: 0 24px 64px rgba(11,43,107,.22);
          animation: nuScaleIn .25s ease;
        }
        @keyframes nuScaleIn { from{opacity:0;transform:scale(.9)} to{opacity:1;transform:scale(1)} }
        .nu-modal-icon {
          width: 68px; height: 68px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; margin: 0 auto 18px;
        }
        .nu-modal-icon svg { width: 30px; height: 30px; }
        .nu-modal-icon.danger { background: #FEF2F2; }
        .nu-modal-icon.danger svg { color: #EF4444; }
        .nu-modal-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem; font-weight: 700; color: var(--blue-deep); margin-bottom: 10px;
        }
        .nu-modal-desc {
          font-size: .86rem; color: var(--gray-text); font-weight: 300;
          line-height: 1.7; margin-bottom: 28px;
        }
        .nu-modal-btns { display: flex; gap: 10px; }
        .nu-modal-cancel {
          flex: 1; padding: 12px; border-radius: 10px;
          border: 1.5px solid rgba(26,71,160,.12); background: var(--gray-soft);
          font-family: 'DM Sans', sans-serif; font-size: .9rem; font-weight: 600;
          color: var(--gray-text); cursor: pointer; transition: background .2s;
        }
        .nu-modal-cancel:hover { background: #E8ECF4; }
        .nu-modal-confirm {
          flex: 1; padding: 12px; border-radius: 10px; border: none;
          font-family: 'DM Sans', sans-serif; font-size: .9rem; font-weight: 600;
          color: white; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: opacity .2s, transform .2s;
        }
        .nu-modal-confirm:hover { opacity: .9; transform: translateY(-1px); }
        .nu-modal-confirm.danger { background: #EF4444; }
        .nu-modal-confirm svg { width: 15px; height: 15px; }

        /* Preview modal */
        .nu-preview-modal {
          background: white; border-radius: 22px; overflow: hidden;
          max-width: 600px; width: 100%;
          box-shadow: 0 24px 64px rgba(11,43,107,.22);
          animation: nuScaleIn .25s ease;
        }
        .nu-preview-modal-header {
          background: linear-gradient(135deg, var(--blue-deep), var(--blue-mid));
          padding: 20px 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nu-preview-modal-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 700; color: white;
        }
        .nu-preview-modal-sub { font-size: .72rem; color: rgba(255,255,255,.5); margin-top: 2px; }
        .nu-modal-close {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(255,255,255,.1);
          border: 1px solid rgba(255,255,255,.15);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background .2s;
        }
        .nu-modal-close:hover { background: rgba(255,255,255,.2); }
        .nu-modal-close svg { width: 16px; height: 16px; color: white; }
        .nu-preview-modal-body { padding: 24px; }
        .nu-preview-full-img {
          width: 100%; border-radius: 10px;
          border: 1px solid rgba(26,71,160,.08); margin-bottom: 20px;
        }
        .nu-preview-info-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
          border-top: 2px solid var(--yellow); padding-top: 18px;
        }
        .nu-preview-info-label {
          font-size: .67rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: .1em; color: #9CA3AF; margin-bottom: 3px;
        }
        .nu-preview-info-value {
          font-size: .88rem; font-weight: 600; color: var(--blue-deep);
        }

        /* ── TOAST ── */
        .nu-toast {
          position: fixed; bottom: 28px; right: 28px; z-index: 2000;
          display: flex; align-items: center; gap: 10px;
          padding: 14px 20px; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-size: .87rem; font-weight: 500;
          box-shadow: 0 8px 28px rgba(0,0,0,.14);
          animation: nuSlideUp .3s ease;
        }
        @keyframes nuSlideUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .nu-toast.success { background: var(--blue-deep); color: white; }
        .nu-toast.error { background: #FEF2F2; color: #DC2626; border: 1px solid #FCA5A5; }
        .nu-toast svg { width: 17px; height: 17px; flex-shrink: 0; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .nu-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .nu-content {
            margin-left: 0 !important;
            max-width: 100vw !important;
            width: 100% !important;
            padding-top: 60px;
          }
          .nu-topbar { top: 60px; padding: 12px 16px; }
          .nu-badge-name { display: none; }
          .nu-body { padding: 16px 16px 48px; gap: 16px; }
          .nu-banner { flex-direction: column; align-items: flex-start; padding: 20px; gap: 14px; }
          .nu-banner-title { font-size: 1.15rem; }
          .nu-banner-stat { width: 100%; }
          .nu-stat-pill { flex: 1; }
          .nu-card-body { padding: 20px 16px; }
          .nu-card-header { padding: 16px 20px; }
          .nu-table-header { padding: 14px 16px; flex-direction: column; align-items: flex-start; gap: 8px; }
          .nu-two-col { grid-template-columns: 1fr; }
          .nu-table-wrap { display: none; }
          .nu-mobile-list { display: block; }
          .nu-toast { bottom: 16px; right: 16px; left: 16px; }
          .nu-modal-box { padding: 28px 20px; }
          .nu-preview-modal { max-width: 100%; border-radius: 16px; }
          .nu-preview-info-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 480px) {
          .nu-mobile-actions { flex-direction: column; }
        }
      `}</style>

      <div className="nu-root">
        <AdminSidebar onLogout={() => setShowLogoutModal(true)} />

        <div className="nu-content">

          {/* TOPBAR */}
          <div className="nu-topbar">
            <div>
              <div className="nu-topbar-title">Upload Sertifikat NIDI</div>
              <div className="nu-topbar-sub">Kelola data sertifikat instalasi listrik</div>
            </div>
            <div className="nu-admin-badge">
              <div className="nu-avatar-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <span className="nu-badge-name">Administrator</span>
            </div>
          </div>

          <div className="nu-body">

            {/* BANNER */}
            <div className="nu-banner">
              <div className="nu-banner-text">
                <div className="nu-banner-eyebrow">Manajemen Sertifikat — NIDI</div>
                <div className="nu-banner-title">Kelola <em>Sertifikat</em>, Admin!</div>
                <div className="nu-banner-date">
                  {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </div>
              </div>
              <div className="nu-banner-stat">
                <div className="nu-stat-pill">
                  <div className="nu-stat-pill-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="nu-stat-num">{certificates.length}</div>
                    <div className="nu-stat-label">Total Sertifikat</div>
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN GRID */}
            <div className="nu-grid">

              {/* ── FORM UPLOAD ── */}
              <div className="nu-card">
                <div className="nu-card-header">
                  <div className="nu-card-header-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                    </svg>
                  </div>
                  <div>
                    <div className="nu-card-header-title">Input Sertifikat NIDI</div>
                    <div className="nu-card-header-sub">Isi semua field lalu upload gambar</div>
                  </div>
                </div>
                <div className="nu-card-body">
                  <form onSubmit={handleSubmit}>

                    {/* Nomor NIDI */}
                    <div className="nu-form-group">
                      <label className="nu-form-label">Nomor NIDI</label>
                      <div className="nu-field-wrap">
                        <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                        </svg>
                        <input
                          className="nu-input"
                          placeholder="NIDI-2026-XXXX"
                          value={formData.nidiNumber}
                          onChange={e => setFormData({ ...formData, nidiNumber: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    {/* Nama Pemilik */}
                    <div className="nu-form-group">
                      <label className="nu-form-label">Nama Pemilik</label>
                      <div className="nu-field-wrap">
                        <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        <input
                          className="nu-input"
                          placeholder="Nama Lengkap Pemilik"
                          value={formData.ownerName}
                          onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    {/* Bangunan + Daya */}
                    <div className="nu-two-col">
                      <div className="nu-form-group">
                        <label className="nu-form-label">Jenis Bangunan</label>
                        <div className="nu-field-wrap">
                          <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                          </svg>
                          <input
                            className="nu-input"
                            placeholder="Rumah Tinggal"
                            value={formData.buildingType}
                            onChange={e => setFormData({ ...formData, buildingType: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="nu-form-group">
                        <label className="nu-form-label">Daya (VA)</label>
                        <div className="nu-field-wrap">
                          <svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                          </svg>
                          <input
                            className="nu-input"
                            placeholder="1300"
                            value={formData.capacity}
                            onChange={e => setFormData({ ...formData, capacity: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Upload image */}
                    <div className="nu-form-group">
                      <label className="nu-form-label">Gambar Sertifikat</label>
                      <label
                        className={`nu-upload-box${dragOver ? " drag-over" : ""}${imagePreview ? " has-image" : ""}`}
                        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                      >
                        {imagePreview ? (
                          <>
                            <div className="nu-upload-icon" style={{ background: "rgba(5,150,105,.1)" }}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                                <path d="M5 13l4 4L19 7"/>
                              </svg>
                            </div>
                            <div className="nu-upload-title" style={{ color: "#059669" }}>Gambar siap diupload</div>
                            <div className="nu-upload-sub">Klik untuk ganti gambar</div>
                          </>
                        ) : (
                          <>
                            <div className="nu-upload-icon">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                              </svg>
                            </div>
                            <div className="nu-upload-title">Pilih atau seret gambar</div>
                            <div className="nu-upload-sub">PNG, JPG, JPEG — maks. 5MB</div>
                          </>
                        )}
                        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                      </label>
                      {imagePreview && (
                        <img src={imagePreview} className="nu-preview-img" alt="Preview sertifikat" />
                      )}
                    </div>

                    <button type="submit" className="nu-btn-submit" disabled={loading}>
                      {loading ? (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "nuSlideUp 0s, spin 0.8s linear infinite" }}>
                            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                          </svg>
                          Memproses...
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 13l4 4L19 7"/>
                          </svg>
                          Simpan Sertifikat
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* ── TABLE ── */}
              <div className="nu-card">
                <div className="nu-table-header">
                  <div>
                    <div className="nu-table-title">
                      Daftar Sertifikat
                      <span className="nu-count-badge">{certificates.length} data</span>
                    </div>
                    <div className="nu-table-sub">Semua sertifikat NIDI yang tersimpan</div>
                  </div>
                </div>

                {certificates.length === 0 ? (
                  <div className="nu-empty">
                    <div className="nu-empty-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                      </svg>
                    </div>
                    <div className="nu-empty-title">Belum ada sertifikat</div>
                    <div className="nu-empty-desc">Upload sertifikat pertama menggunakan form di sebelah kiri.</div>
                  </div>
                ) : (
                  <>
                    {/* DESKTOP TABLE */}
                    <div className="nu-table-wrap">
                      <table className="nu-table">
                        <thead>
                          <tr>
                            <th>No. NIDI</th>
                            <th>Pemilik</th>
                            <th>Bangunan</th>
                            <th>Daya</th>
                            <th>Tanggal</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {certificates.map(item => (
                            <tr key={item.id}>
                              <td className="nu-td-nidi">{item.nidiNumber}</td>
                              <td className="nu-td-name">{item.ownerName}</td>
                              <td><span className="nu-pill-building">{item.buildingType || "—"}</span></td>
                              <td><span className="nu-pill-daya">{item.capacity ? `${item.capacity} VA` : "—"}</span></td>
                              <td className="nu-td-date">{item.date}</td>
                              <td>
                                <div className="nu-action-cell">
                                  <button className="nu-btn-preview-tbl" onClick={() => setPreviewModal(item)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                    </svg>
                                    Lihat
                                  </button>
                                  <button className="nu-btn-del" onClick={() => setDeleteConfirm(item.id)}>
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
                    <div className="nu-mobile-list">
                      {certificates.map(item => (
                        <div key={item.id} className="nu-mobile-item">
                          <div className="nu-mobile-top">
                            <div className="nu-mobile-nidi">{item.nidiNumber}</div>
                            <div className="nu-mobile-date">{item.date}</div>
                          </div>
                          <div className="nu-mobile-name">{item.ownerName}</div>
                          <div className="nu-mobile-pills">
                            {item.buildingType && <span className="nu-pill-building">{item.buildingType}</span>}
                            {item.capacity && <span className="nu-pill-daya">{item.capacity} VA</span>}
                          </div>
                          <div className="nu-mobile-actions">
                            <button className="nu-btn-preview-tbl" onClick={() => setPreviewModal(item)}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                              </svg>
                              Lihat
                            </button>
                            <button className="nu-btn-del" onClick={() => setDeleteConfirm(item.id)}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                              Hapus
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* MODAL HAPUS */}
      {deleteConfirm && (
        <div className="nu-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="nu-modal-box" onClick={e => e.stopPropagation()}>
            <div className="nu-modal-icon danger">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </div>
            <div className="nu-modal-title">Hapus Sertifikat Ini?</div>
            <div className="nu-modal-desc">
              Data sertifikat <strong style={{ color: "var(--blue-deep)" }}>
                "{certificates.find(c => c.id === deleteConfirm)?.nidiNumber}"
              </strong> akan dihapus secara permanen.
            </div>
            <div className="nu-modal-btns">
              <button className="nu-modal-cancel" onClick={() => setDeleteConfirm(null)}>Batal</button>
              <button className="nu-modal-confirm danger" onClick={() => handleDelete(deleteConfirm)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7"/>
                </svg>
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PREVIEW SERTIFIKAT */}
      {previewModal && (
        <div className="nu-modal-overlay" onClick={() => setPreviewModal(null)}>
          <div className="nu-preview-modal" onClick={e => e.stopPropagation()}>
            <div className="nu-preview-modal-header">
              <div>
                <div className="nu-preview-modal-title">{previewModal.nidiNumber}</div>
                <div className="nu-preview-modal-sub">{previewModal.ownerName}</div>
              </div>
              <button className="nu-modal-close" onClick={() => setPreviewModal(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="nu-preview-modal-body">
              <img src={previewModal.image} className="nu-preview-full-img" alt="Sertifikat NIDI" />
              <div className="nu-preview-info-grid">
                <div>
                  <div className="nu-preview-info-label">Nomor NIDI</div>
                  <div className="nu-preview-info-value">{previewModal.nidiNumber}</div>
                </div>
                <div>
                  <div className="nu-preview-info-label">Nama Pemilik</div>
                  <div className="nu-preview-info-value">{previewModal.ownerName}</div>
                </div>
                <div>
                  <div className="nu-preview-info-label">Jenis Bangunan</div>
                  <div className="nu-preview-info-value">{previewModal.buildingType || "—"}</div>
                </div>
                <div>
                  <div className="nu-preview-info-label">Daya Terpasang</div>
                  <div className="nu-preview-info-value">{previewModal.capacity ? `${previewModal.capacity} VA` : "—"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL LOGOUT */}
      {showLogoutModal && (
        <div className="nu-modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="nu-modal-box" onClick={e => e.stopPropagation()}>
            <div className="nu-modal-icon" style={{ background: "linear-gradient(135deg,#FEF9EC,#FFF3CD)", border: "2px solid rgba(245,193,0,.3)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#D4A200" strokeWidth="1.8">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </div>
            <div className="nu-modal-title">Keluar dari Panel Admin?</div>
            <div className="nu-modal-desc">Anda akan mengakhiri sesi dan diarahkan kembali ke halaman login.</div>
            <div className="nu-modal-btns">
              <button className="nu-modal-cancel" onClick={() => setShowLogoutModal(false)}>Batal</button>
              <button
                className="nu-modal-confirm"
                style={{ background: "linear-gradient(135deg,var(--blue-deep),var(--blue-mid))" }}
                onClick={() => router.push("/")}
              >
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
        <div className={`nu-toast ${toast.type}`}>
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