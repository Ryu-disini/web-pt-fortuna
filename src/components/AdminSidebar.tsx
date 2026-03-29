"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface AdminSidebarProps {
  onLogout: () => void;
}

// ─── NAV ITEMS ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    exact: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5"/>
      </svg>
    ),
  },
  {
    href: "/admin/pricelist",
    label: "Pricelist",
    exact: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      </svg>
    ),
  },
  {
    href: "/admin/nidi",
    label: "Sertifikat NIDI",
    exact: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    href: "/admin/status", 
    label: "Update Status",
    exact: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-7.6-10.6 8.5 8.5 0 013 1.5"/>
        <path d="M16 5l5 5-5 5"/>
      </svg>
    ),
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const SidebarContent = () => (
    <>
      {/* BRAND */}
      <div className="sb-brand">
        <Link href="/admin/dashboard" className="sb-brand-inner" onClick={() => setMobileOpen(false)}>
          <div className="sb-logo-wrap">
            <Image
              src="/images/LogoPT.png"
              alt="Logo PT FORTUNA SOLUSI GROUP"
              width={46} height={46}
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
          </div>
          <div>
            <div className="sb-logo-name">PT FORTUNA SOLUSI GROUP</div>
            <div className="sb-logo-tag">Panel Admin</div>
          </div>
        </Link>
      </div>

      {/* ADMIN INFO */}
      <div className="sb-admin-info">
        <div className="sb-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="sb-admin-name">Administrator</div>
          <div className="sb-admin-role">Super Admin</div>
        </div>
        <div className="sb-online-dot" />
      </div>

      {/* NAV */}
      <nav className="sb-nav">
        <div className="sb-nav-label">Menu Utama</div>
        <div className="sb-nav-list">
          {NAV_ITEMS.map(({ href, label, icon, exact }) => (
            <Link
              key={href}
              href={href}
              className={`sb-nav-item${isActive(href, exact) ? " active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              <div className="sb-nav-icon">{icon}</div>
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="sb-divider" />

      {/* LOGOUT */}
      <div className="sb-bottom">
        <button className="sb-logout-btn" onClick={onLogout}>
          <div className="sb-logout-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
          </div>
          Keluar
        </button>
      </div>
      <div className="sb-version">PT FORTUNA SOLUSI GROUP Admin v1.0</div>
    </>
  );

  return (
    <>
      <style>{`
        :root {
          --blue-deep: #0B2B6B;
          --blue-mid: #1A47A0;
          --yellow: #F5C100;
          --yellow-dark: #D4A200;
          --sb-width: 256px;
        }

        /* ── DESKTOP SIDEBAR ─────────────────────────────── */
        .admin-sidebar {
          width: var(--sb-width);
          min-height: 100vh;
          background: var(--blue-deep);
          position: fixed;
          top: 0; left: 0;
          display: flex;
          flex-direction: column;
          z-index: 40;
          overflow: hidden;
        }
        .admin-sidebar::before {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 200px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(245,193,0,.09) 0%, transparent 70%);
          pointer-events: none;
        }
        .admin-sidebar::after {
          content: '';
          position: absolute; bottom: 100px; left: -60px;
          width: 180px; height: 180px; border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,.14) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── MOBILE TOPBAR ───────────────────────────────── */
        .sb-mobile-topbar {
          display: none;
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          background: var(--blue-deep);
          padding: 0 20px;
          height: 60px;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 12px rgba(11,43,107,.25);
        }
        .sb-mobile-brand {
          display: flex; align-items: center; gap: 10px; text-decoration: none;
        }
        .sb-mobile-logo {
          width: 34px; height: 34px; background: white; border-radius: 8px;
          overflow: hidden; display: flex; align-items: center; justify-content: center;
          border: 1.5px solid rgba(245,193,0,.3);
        }
        .sb-mobile-title {
          font-family: 'Playfair Display', serif;
          font-size: .95rem; font-weight: 700; color: white;
        }
        .sb-hamburger {
          width: 38px; height: 38px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 9px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 5px;
          cursor: pointer; padding: 0;
        }
        .sb-hamburger span {
          display: block; width: 18px; height: 2px;
          background: white; border-radius: 2px;
          transition: transform .25s, opacity .25s;
        }
        .sb-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .sb-hamburger.open span:nth-child(2) { opacity: 0; }
        .sb-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── MOBILE DRAWER ───────────────────────────────── */
        .sb-mobile-overlay {
          display: none;
          position: fixed; inset: 0; z-index: 45;
          background: rgba(11,43,107,.5);
          animation: sbFadeIn .2s ease;
        }
        @keyframes sbFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .sb-mobile-drawer {
          position: fixed; top: 0; left: 0; bottom: 0; z-index: 46;
          width: 280px;
          background: var(--blue-deep);
          display: flex; flex-direction: column;
          overflow: hidden;
          transform: translateX(-100%);
          transition: transform .28s cubic-bezier(.4,0,.2,1);
        }
        .sb-mobile-drawer::before {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 200px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(245,193,0,.09) 0%, transparent 70%);
          pointer-events: none;
        }
        .sb-mobile-drawer.open { transform: translateX(0); }

        /* ── SHARED SIDEBAR PARTS ────────────────────────── */
        .sb-brand {
          padding: 28px 24px 24px;
          border-bottom: 1px solid rgba(255,255,255,.07);
          position: relative; z-index: 1;
          flex-shrink: 0;
        }
        .sb-brand-inner { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .sb-logo-wrap {
          width: 46px; height: 46px; flex-shrink: 0;
          background: white; border-radius: 12px; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(0,0,0,.2);
          border: 2px solid rgba(245,193,0,.3);
        }
        .sb-logo-name {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 700; color: white; line-height: 1; margin-bottom: 3px;
        }
        .sb-logo-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: .65rem; font-weight: 500; color: var(--yellow);
          text-transform: uppercase; letter-spacing: .1em;
        }

        .sb-admin-info {
          margin: 16px 24px 0;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 12px; padding: 12px 14px;
          display: flex; align-items: center; gap: 10px;
          position: relative; z-index: 1; flex-shrink: 0;
        }
        .sb-avatar {
          width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, var(--yellow), var(--yellow-dark));
          display: flex; align-items: center; justify-content: center;
        }
        .sb-avatar svg { width: 18px; height: 18px; color: var(--blue-deep); }
        .sb-admin-name {
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem; font-weight: 600; color: white;
          margin-bottom: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .sb-admin-role {
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem; color: rgba(255,255,255,.4);
        }
        .sb-online-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #10B981; margin-left: auto; flex-shrink: 0;
          box-shadow: 0 0 0 2px rgba(16,185,129,.25);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:.4} }

        .sb-nav { flex: 1; padding: 24px 16px; position: relative; z-index: 1; overflow-y: auto; }
        .sb-nav-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .65rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .14em; color: rgba(255,255,255,.25);
          padding: 0 8px; margin-bottom: 8px;
        }
        .sb-nav-list { display: flex; flex-direction: column; gap: 4px; }
        .sb-nav-item {
          display: flex; align-items: center; gap: 11px;
          padding: 11px 14px; border-radius: 11px;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif; font-size: .88rem; font-weight: 500;
          color: rgba(255,255,255,.55);
          transition: background .2s, color .2s;
          position: relative;
        }
        .sb-nav-item:hover { background: rgba(255,255,255,.07); color: white; }
        .sb-nav-item.active {
          background: rgba(245,193,0,.12); color: white;
          border: 1px solid rgba(245,193,0,.2);
        }
        .sb-nav-item.active::before {
          content: ''; position: absolute; left: 0; top: 25%; bottom: 25%;
          width: 3px; border-radius: 0 2px 2px 0; background: var(--yellow);
        }
        .sb-nav-icon {
          width: 34px; height: 34px; flex-shrink: 0; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,.05); transition: background .2s;
        }
        .sb-nav-item:hover .sb-nav-icon { background: rgba(255,255,255,.1); }
        .sb-nav-item.active .sb-nav-icon { background: var(--yellow); }
        .sb-nav-icon svg { width: 17px; height: 17px; }
        .sb-nav-item.active .sb-nav-icon svg { color: var(--blue-deep); }

        .sb-divider {
          height: 1px; background: rgba(255,255,255,.07);
          margin: 0 16px; position: relative; z-index: 1; flex-shrink: 0;
        }
        .sb-bottom { padding: 16px; position: relative; z-index: 1; flex-shrink: 0; }
        .sb-logout-btn {
          width: 100%; display: flex; align-items: center; gap: 11px;
          padding: 11px 14px; border-radius: 11px;
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: .88rem; font-weight: 500;
          color: rgba(255,255,255,.45);
          transition: background .2s, color .2s; text-align: left;
        }
        .sb-logout-btn:hover { background: rgba(239,68,68,.12); color: #F87171; }
        .sb-logout-btn:hover .sb-logout-icon { background: rgba(239,68,68,.2); }
        .sb-logout-btn:hover .sb-logout-icon svg { color: #F87171; }
        .sb-logout-icon {
          width: 34px; height: 34px; flex-shrink: 0; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,.05); transition: background .2s;
        }
        .sb-logout-icon svg { width: 17px; height: 17px; transition: color .2s; }

        .sb-version {
          padding: 10px 24px 20px;
          font-family: 'DM Sans', sans-serif; font-size: .68rem;
          color: rgba(255,255,255,.2); font-weight: 300;
          position: relative; z-index: 1; flex-shrink: 0;
          display: flex; align-items: center; gap: 6px;
        }
        .sb-version::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: rgba(245,193,0,.4); flex-shrink: 0;
        }

        /* ── RESPONSIVE ──────────────────────────────────── */
        @media (max-width: 768px) {
          .admin-sidebar { display: none; }
          .sb-mobile-topbar { display: flex; }
          .sb-mobile-overlay { display: block; }
        }
      `}</style>

      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="admin-sidebar">
        <SidebarContent />
      </aside>

      {/* ── MOBILE TOPBAR ── */}
      <div className="sb-mobile-topbar">
        <Link href="/admin/dashboard" className="sb-mobile-brand">
          <div className="sb-mobile-logo">
            <Image
              src="/images/LogoPT.png"
              alt="Logo PT FORTUNA SOLUSI GROUP"
              width={34} height={34}
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
          </div>
          <span className="sb-mobile-title">PT FORTUNA SOLUSI GROUP</span>
        </Link>
        <button
          className={`sb-hamburger${mobileOpen ? " open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ── MOBILE OVERLAY ── */}
      {mobileOpen && (
        <div className="sb-mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}

      {/* ── MOBILE DRAWER ── */}
      <div className={`sb-mobile-drawer${mobileOpen ? " open" : ""}`}>
        <SidebarContent />
      </div>
    </>
  );
}