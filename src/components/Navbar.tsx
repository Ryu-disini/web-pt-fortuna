"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/tentang", label: "Tentang" },
    { href: "/layanan", label: "Layanan" },
    { href: "/pricelist", label: "Pricelist" },
    { href: "/sertifikat", label: "Sertifikat" },
    { href: "/kontak", label: "Kontak" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');

        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          background: transparent;
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.97);
          box-shadow: 0 1px 0 rgba(0,0,0,0.06), 0 4px 20px rgba(11,43,107,0.08);
          backdrop-filter: blur(12px);
        }

        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* LOGO */
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .logo-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }

        .logo-icon img { width: 100%; height: 100%; object-fit: contain; }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .logo-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #0B2B6B;
          letter-spacing: -0.01em;
        }

        .navbar.scrolled .logo-name { color: #0B2B6B; }
        .navbar:not(.scrolled) .logo-name { color: #fff; }

        .logo-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          color: #F5C100;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* NAV LINKS */
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
        }

        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: 8px;
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
          position: relative;
        }

        .navbar:not(.scrolled) .nav-link {
          color: rgba(255,255,255,0.82);
        }

        .navbar:not(.scrolled) .nav-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.1);
        }

        .navbar.scrolled .nav-link {
          color: #374151;
        }

        .navbar.scrolled .nav-link:hover {
          color: #0B2B6B;
          background: rgba(11,43,107,0.05);
        }

        /* INDICATOR DOT on active */
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 50%;
          transform: translateX(-50%);
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #F5C100;
        }

        /* LOGIN BUTTON */
        .btn-login {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 9px 20px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
          margin-left: 8px;
        }

        .navbar:not(.scrolled) .btn-login {
          background: #F5C100;
          color: #0B2B6B;
        }

        .navbar:not(.scrolled) .btn-login:hover {
          background: #FFD740;
          box-shadow: 0 4px 16px rgba(245,193,0,0.35);
          transform: translateY(-1px);
        }

        .navbar.scrolled .btn-login {
          background: #0B2B6B;
          color: #fff;
        }

        .navbar.scrolled .btn-login:hover {
          background: #1A47A0;
          box-shadow: 0 4px 16px rgba(11,43,107,0.3);
          transform: translateY(-1px);
        }

        .btn-login svg { width: 14px; height: 14px; }

        /* HAMBURGER (mobile) */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
        }

        .hamburger span {
          display: block;
          width: 22px; height: 2px;
          border-radius: 2px;
          transition: all 0.3s;
        }

        .navbar:not(.scrolled) .hamburger span { background: #fff; }
        .navbar.scrolled .hamburger span { background: #0B2B6B; }

        /* MOBILE MENU */
        .mobile-menu {
          display: none;
          position: absolute;
          top: 72px; left: 0; right: 0;
          background: white;
          box-shadow: 0 8px 32px rgba(11,43,107,0.12);
          border-top: 3px solid #F5C100;
          padding: 16px 24px 24px;
        }

        .mobile-menu.open { display: block; }

        .mobile-link {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          padding: 12px 8px;
          border-bottom: 1px solid #f0f0f0;
          transition: color 0.2s;
        }

        .mobile-link:hover { color: #0B2B6B; }

        .mobile-btn-login {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          background: #0B2B6B;
          color: white;
          text-decoration: none;
          padding: 13px;
          border-radius: 10px;
          margin-top: 16px;
        }

        /* SPACER */
        .navbar-spacer { height: 72px; }

        @media (max-width: 768px) {
          .navbar-links { display: none; }
          .hamburger { display: flex; }
          .navbar-inner { padding: 0 24px; }
        }
      `}</style>

      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="navbar-inner">

          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <div className="logo-icon">
              <Image src="/images/LogoPT.png" alt="Logo NIDI SLO" width={38} height={38} style={{ objectFit: "contain" }} />
            </div>
            <div className="logo-text">
              <span className="logo-name">PT FORTUNA</span>
              <span className="logo-tagline">SOLUSI GROUP</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="navbar-links">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="nav-link">{label}</Link>
              </li>
            ))}
            <li>
              <Link href="/admin/login" className="btn-login">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/>
                </svg>
                Login Admin
              </Link>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span style={menuOpen ? { transform: "rotate(45deg) translate(5px, 5px)" } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: "rotate(-45deg) translate(5px, -5px)" } : {}} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="mobile-link" onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href="/admin/login" className="mobile-btn-login" onClick={() => setMenuOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/>
            </svg>
            Login Admin
          </Link>
        </div>
      </nav>
    </>
  );
}