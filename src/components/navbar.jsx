import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useNavigate, useLocation } from "react-router-dom"

const navLinks = [
  { label: 'მთავარი', href: '/' },
  { label: 'ჩვენს შესახებ', href: '/about' },
  { label: 'სერვისები', href: '/services' },
  { label: 'სპეციალისტები', href: '/team' },
  { label: 'გალერეა', href: '/gallery' },
  { label: 'კონტაქტი', href: '/contact' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState('/');

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const y = window.scrollY + 100;

      for (const { href } of navLinks) {
        if (!href.startsWith("#")) continue;

        const el = document.getElementById(href.slice(1));

        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          setActive(href);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

   useEffect(() => {
      setActive(location.pathname);
    }, [location.pathname]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (href) => {
    setActive(href);
    setMenuOpen(false);

    // Route pages
    if (href === "/" || href === "/about" || href === "/services" || href === "/team" || href === "/gallery" || href === "/contact") {
      navigate(href)
      return
    }

    // Scroll sections
    if (location.pathname !== "/") {
      navigate("/")

      setTimeout(() => {
        const el = document.querySelector(href);

        if (!el) return;

        const offset = document.querySelector('header')?.offsetHeight ?? 80;

        window.scrollTo({
          top: el.getBoundingClientRect().top + window.pageYOffset - offset,
          behavior: 'smooth'
        });
      }, 100)

      return
    }

    const el = document.querySelector(href);

    if (!el) return;

    const offset = document.querySelector('header')?.offsetHeight ?? 80;

    window.scrollTo({
      top: el.getBoundingClientRect().top + window.pageYOffset - offset,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <header className={`nb-root ${scrolled ? 'nb-root--scrolled' : ''}`}>

        {/* top accent line */}
        <div className="nb-accent-line" aria-hidden="true" />

        <div className="nb-inner">

          {/* ── Logo ── */}
          <button className="nb-logo" onClick={() => handleNav('/')} aria-label="მთავარ გვერდზე გადასვლა">
            <div className="nb-logo-img-wrap">
              <img src="/logo.png" alt="ლოგო" className="nb-logo-img" loading="eager" />
              <span className="nb-logo-pulse" aria-hidden="true" />
            </div>
            <div className="nb-logo-text">
              <span className="nb-logo-name">ირმა ხვიჩიას</span>
              <span className="nb-logo-sub">რეაბილიტაციის ცენტრი</span>
            </div>
          </button>

          {/* ── Desktop nav ── */}
          <nav className="nb-nav" aria-label="მთავარი მენიუ">
            {navLinks.map(({ href, label }) => (
              <button
                key={href}
                onClick={() => handleNav(href)}
                className={`nb-link ${active === href ? 'nb-link--active' : ''}`}
              >
                {label}
                <span className="nb-link-bar" aria-hidden="true" />
              </button>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <button className="nb-cta" onClick={() => handleNav('/contact')}>
            <span className="nb-cta-glow" aria-hidden="true" />
            <Phone size={13} className="nb-cta-icon" strokeWidth={2.5} />
            <span className="nb-cta-full" onClick={() => handleNav('/contact')}>ჩაეწერე კონსულტაციაზე</span>
            <span className="nb-cta-short">ჩაეწერე</span>
          </button>

          {/* ── Hamburger ── */}
          <button
            className={`nb-ham ${menuOpen ? 'nb-ham--open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'დახურვა' : 'მენიუ'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="nb-ham-bar nb-ham-bar-1" />
            <span className="nb-ham-bar nb-ham-bar-2" />
            <span className="nb-ham-bar nb-ham-bar-3" />
          </button>

        </div>
      </header>

      {/* ── Mobile backdrop ── */}
      <div
        className={`nb-backdrop ${menuOpen ? 'nb-backdrop--open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile menu ── */}
      <div
        id="mobile-menu"
        className={`nb-mobile ${menuOpen ? 'nb-mobile--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="მობილური მენიუ"
      >
        {/* decorative top edge */}
        <div className="nb-mobile-edge" aria-hidden="true" />

        <nav className="nb-mobile-nav">

          {/* branding inside drawer */}
          <div className="nb-mobile-brand">
            <img src="/logo.webp" alt="ლოგო" className="nb-mobile-logo" loading="eager" />
            <div>
              <div className="nb-mobile-brand-name">ირმა ხვიჩიას</div>
              <div className="nb-mobile-brand-sub">რეაბილიტაციის ცენტრი</div>
            </div>
          </div>

          <div className="nb-mobile-divider" />

          {navLinks.map(({ href, label }, i) => (
            <button
              key={href}
              onClick={() => handleNav(href)}
              className={`nb-mobile-link ${active === href ? 'nb-mobile-link--active' : ''}`}
              style={{ '--i': i }}
            >
              <span className={`nb-mobile-pip ${active === href ? 'nb-mobile-pip--active' : ''}`} />
              <span>{label}</span>
              {active === href && <span className="nb-mobile-tick">✓</span>}
            </button>
          ))}

          <div className="nb-mobile-footer">
            <button className="nb-mobile-cta" onClick={() => handleNav('/contact')}>
              <Phone size={14} strokeWidth={2.5} />
              ჩაეწერე კონსულტაციაზე
            </button>
            <p className="nb-mobile-note">გამოცდილი სპეციალისტები · ინდივიდუალური მიდგომა</p>
          </div>
        </nav>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@400;500;600;700;800;900&display=swap');

        /* ═══════════════════════════════════════════
           TOKENS
        ═══════════════════════════════════════════ */
        :root {
          --nb-font:   'Noto Sans Georgian', system-ui, sans-serif;
          --nb-blue:   #213989;
          --nb-blue2:  #1a2fa0;
          --nb-amber:  #FBBF24;
          --nb-dark:   #0F1E5A;
          --nb-white:  #FFFFFF;
          --nb-radius: 14px;
        }

        /* ═══════════════════════════════════════════
           ROOT HEADER
        ═══════════════════════════════════════════ */
        .nb-root {
          position: fixed;
          top: 0;
          inset-inline: 0;
          z-index: 50;
          background: linear-gradient(
            to bottom,
            rgba(15,35,110,0.80) 0%,
            rgba(20,45,130,0.45) 80%,
            transparent 100%
          );
          padding: 0;
          transition:
            background  0.5s ease,
            box-shadow  0.5s ease,
            padding     0.4s ease;
        }

        /* once scrolled → brand blue frosted bar */
        .nb-root--scrolled {
          background: rgba(21,40,120,0.94);
          backdrop-filter: blur(22px) saturate(1.4);
          -webkit-backdrop-filter: blur(22px) saturate(1.4);
          box-shadow:
            0 1px 0 rgba(251,191,36,0.2),
            0 8px 40px rgba(10,20,80,0.5);
        }

        .contactLink{
        text-decoration:none;
        color:black;
        }

        /* amber + blue animated hairline */
        .nb-accent-line {
          height: 3px;
          background: linear-gradient(90deg, #1D4ED8 0%, #FBBF24 50%, #1D4ED8 100%);
          background-size: 200% 100%;
          animation: accentSlide 5s linear infinite;
        }

        .nb-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: clamp(12px,2vw,20px) clamp(16px,5vw,52px);
          display: flex;
          align-items: center;
          gap: clamp(10px,2vw,20px);
          font-family: 'Noto Sans Georgian', system-ui, sans-serif;
        }

        /* ═══════════════════════════════════════════
           LOGO
        ═══════════════════════════════════════════ */
        .nb-logo {
          display: flex;
          align-items: center;
          gap: clamp(8px,1.5vw,12px);
          background: none;
          border: none;
          cursor: pointer;
          padding: 3px;
          border-radius: var(--nb-radius);
          flex-shrink: 0;
          transition: opacity 0.2s ease;
        }
        .nb-logo:hover { opacity: 0.88; }
        .nb-logo:focus-visible { outline: 2px solid var(--nb-amber); outline-offset: 4px; }

        .nb-logo-img-wrap {
          position: relative;
          width: clamp(38px,5.5vw,50px);
          height: clamp(38px,5.5vw,50px);
          flex-shrink: 0;
        }
        .nb-logo-img {
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 10px;
          display: block;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.15), 0 4px 16px rgba(0,0,0,0.35);
        }
        /* animated ring around logo */
        .nb-logo-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 14px;
          border: 1.5px solid rgba(251,191,36,0.55);
          animation: logoPulse 3s ease-in-out infinite;
        }

        .nb-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .nb-logo-name {
          font-family: 'Noto Sans Georgian', system-ui, sans-serif;
          font-size: clamp(13px,1.9vw,18px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.01em;
          white-space: nowrap;
          text-shadow: 0 1px 8px rgba(0,0,0,0.4);
        }
        .nb-logo-sub {
          font-family: 'Noto Sans Georgian', system-ui, sans-serif;
          font-size: clamp(8px,1.1vw,10px);
          font-weight: 600;
          color: var(--nb-amber);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* ═══════════════════════════════════════════
           DESKTOP NAV
        ═══════════════════════════════════════════ */
        .nb-nav {
          display: none;
          align-items: center;
          gap: 0;
          margin-left: auto;
        }
        @media (min-width: 1024px) { .nb-nav { display: flex; } }

        .nb-link {
          position: relative;
          padding: 8px clamp(10px,1.1vw,16px);
          font-family: 'Noto Sans Georgian', system-ui, sans-serif;
          font-size: clamp(12px,1.05vw,13.5px);
          font-weight: 500;
          color: rgba(255,255,255,0.78);
          background: none;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          white-space: nowrap;
          letter-spacing: 0.01em;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .nb-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.1);
        }
        .nb-link--active {
          color: #fff;
          font-weight: 600;
          background: rgba(255,255,255,0.08);
        }
        .nb-link:focus-visible { outline: 2px solid var(--nb-amber); outline-offset: 2px; border-radius: 8px; }

        /* animated underbar */
        .nb-link-bar {
          position: absolute;
          bottom: 4px;
          left: 50%;
          width: 16px;
          height: 2px;
          border-radius: 2px;
          background: var(--nb-amber);
          transform: translateX(-50%) scaleX(0);
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
          transform-origin: center;
        }
        .nb-link--active .nb-link-bar,
        .nb-link:hover    .nb-link-bar { transform: translateX(-50%) scaleX(1); }

        /* ═══════════════════════════════════════════
           DESKTOP CTA
        ═══════════════════════════════════════════ */
        .nb-cta {
          display: none;
          position: relative;
          overflow: hidden;
          align-items: center;
          gap: 6px;
          /* base size for 1024–1279px */
          padding: 7px 11px;
          font-family: 'Noto Sans Georgian', system-ui, sans-serif;
          font-size: 11.5px;
          font-weight: 700;
          color: var(--nb-dark);
          background: var(--nb-amber);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          letter-spacing: 0.01em;
          box-shadow:
            0 0 0 1px rgba(251,191,36,0.6),
            0 4px 20px rgba(251,191,36,0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        @media (min-width: 1024px) { .nb-cta { display: inline-flex; } }
        /* slightly larger on wider screens */
        @media (min-width: 1280px) {
          .nb-cta { padding: 9px 14px; font-size: 12.5px; border-radius: 11px; }
        }
        @media (min-width: 1440px) {
          .nb-cta { padding: 10px 16px; font-size: 13px; border-radius: 12px; }
        }

        .nb-cta:hover {
          transform: translateY(-2px);
          box-shadow:
            0 0 0 1px rgba(251,191,36,0.8),
            0 8px 28px rgba(251,191,36,0.55);
        }
        .nb-cta:active { transform: translateY(0); }
        .nb-cta:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

        .nb-cta-glow {
          position: absolute; inset: 0;
          background: linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.35) 50%,transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .nb-cta:hover .nb-cta-glow { transform: translateX(100%); }
        .nb-cta-icon { flex-shrink: 0; }
        .nb-cta-short { display: none; }
        .nb-cta-full  { display: inline; }
        @media (min-width: 1024px) and (max-width: 1123px) {
          .nb-cta-full  { display: none; }
          .nb-cta-short { display: inline; }
        }

        /* ═══════════════════════════════════════════
           HAMBURGER
        ═══════════════════════════════════════════ */
        .nb-ham {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 42px; height: 42px;
          padding: 9px;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(255,255,255,0.2);
          border-radius: 11px;
          cursor: pointer;
          margin-left: auto;
          flex-shrink: 0;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        @media (min-width: 1024px) { .nb-ham { display: none; } }
        .nb-ham:hover {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.4);
          transform: scale(1.05);
        }
        .nb-ham:focus-visible { outline: 2px solid var(--nb-amber); outline-offset: 2px; }

        .nb-ham-bar {
          display: block;
          width: 20px; height: 2px;
          border-radius: 2px;
          background: #fff;
          transform-origin: center;
          transition: transform 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.22s ease;
        }
        .nb-ham--open .nb-ham-bar-1 { transform: translateY(7px) rotate(45deg); }
        .nb-ham--open .nb-ham-bar-2 { opacity: 0; transform: scaleX(0); }
        .nb-ham--open .nb-ham-bar-3 { transform: translateY(-7px) rotate(-45deg); }

        /* ═══════════════════════════════════════════
           MOBILE BACKDROP
        ═══════════════════════════════════════════ */
        .nb-backdrop {
          display: none;
          position: fixed; inset: 0;
          z-index: 44;
          background: rgba(4,12,30,0.5);
          backdrop-filter: blur(5px);
          opacity: 0; pointer-events: none;
          transition: opacity 0.35s ease;
        }
        @media (max-width: 1023px) { .nb-backdrop { display: block; }  }
        .nb-backdrop--open { opacity: 1; pointer-events: auto; }

        /* ═══════════════════════════════════════════
           MOBILE DRAWER — slides in from top
        ═══════════════════════════════════════════ */
        .nb-mobile {
          display: none;
          position: fixed;
          top: 0; inset-inline: 0;
          z-index: 48;
          pointer-events: none;
        }
        @media (max-width: 1023px) { .nb-mobile { display: block; } }

        .nb-mobile-edge {
          height: 3px;
          background: linear-gradient(90deg,#1D4ED8,#FBBF24,#1D4ED8);
          background-size: 200% 100%;
          animation: accentSlide 5s linear infinite;
        }

        .nb-mobile-nav {
          background: rgba(15,30,100,0.97);
          backdrop-filter: blur(28px) saturate(1.5);
          -webkit-backdrop-filter: blur(28px) saturate(1.5);
          border-bottom: 1px solid rgba(251,191,36,0.12);
          padding: clamp(16px,4vw,24px);
          display: flex;
          flex-direction: column;
          gap: 3px;

          /* entry animation */
          transform: translateY(-110%);
          opacity: 0;
          transition:
            transform 0.42s cubic-bezier(0.34,1.2,0.64,1),
            opacity   0.28s ease;
          pointer-events: none;
        }

        .nb-mobile--open { pointer-events: auto; }
        .nb-mobile--open .nb-mobile-nav {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        /* ── Brand inside drawer ── */
        .nb-mobile-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 4px 16px;
        }
        .nb-mobile-logo {
          width: 44px; height: 44px;
          border-radius: 10px;
          object-fit: cover;
          border: 2px solid rgba(255,255,255,0.12);
          box-shadow: 0 4px 16px rgba(0,0,0,0.4);
        }
        .nb-mobile-brand-name {
          font-family: 'Noto Sans Georgian', system-ui, sans-serif;
          font-size: clamp(15px,4vw,18px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .nb-mobile-brand-sub {
          font-family: 'Noto Sans Georgian', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 600;
          color: var(--nb-amber);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 2px;
        }

        .nb-mobile-divider {
          height: 1px;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent);
          margin-bottom: 4px;
        }

        /* ── Links ── */
        .nb-mobile-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: clamp(12px,3vw,15px) clamp(12px,3vw,16px);
          font-family: 'Noto Sans Georgian', system-ui, sans-serif;
          font-size: clamp(14px,4vw,16px);
          font-weight: 500;
          color: rgba(255,255,255,0.72);
          background: none;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: background 0.2s ease, color 0.2s ease;

          opacity: 0;
          transform: translateX(-14px);
        }
        .nb-mobile--open .nb-mobile-link {
          animation: slideInLink 0.35s ease forwards;
          animation-delay: calc(var(--i) * 50ms + 120ms);
        }
        .nb-mobile-link:hover {
          background: rgba(255,255,255,0.07);
          color: #fff;
        }
        .nb-mobile-link--active {
          background: rgba(33,57,137,0.5);
          color: #fff;
          font-weight: 600;
        }
        .nb-mobile-link:focus-visible { outline: 2px solid var(--nb-amber); outline-offset: 2px; border-radius: 10px; }

        .nb-mobile-pip {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          flex-shrink: 0;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .nb-mobile-pip--active {
          background: var(--nb-amber);
          transform: scale(1.4);
          box-shadow: 0 0 8px rgba(251,191,36,0.6);
        }
        .nb-mobile-tick {
          margin-left: auto;
          font-size: 11px;
          color: var(--nb-amber);
          font-weight: 700;
        }

        /* ── Footer ── */
        .nb-mobile-footer {
          margin-top: 8px;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          gap: 10px;
          opacity: 0;
        }
        .nb-mobile--open .nb-mobile-footer {
          animation: slideInLink 0.3s ease forwards;
          animation-delay: calc(${navLinks.length} * 50ms + 150ms);
        }

        .nb-mobile-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: clamp(12px,3vw,15px);
          font-family: 'Noto Sans Georgian', system-ui, sans-serif;
          font-size: clamp(13px,3.5vw,15px);
          font-weight: 700;
          color: var(--nb-dark);
          background: var(--nb-amber);
          border: none;
          border-radius: 13px;
          cursor: pointer;
          letter-spacing: 0.01em;
          box-shadow: 0 4px 20px rgba(251,191,36,0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .nb-mobile-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(251,191,36,0.55);
        }
        .nb-mobile-cta:active { transform: scale(0.98); }
        .nb-mobile-cta:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

        .nb-mobile-note {
          font-family: 'Noto Sans Georgian', system-ui, sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          text-align: center;
          margin: 0;
          letter-spacing: 0.02em;
        } 

        /* ═══════════════════════════════════════════
           KEYFRAMES
        ═══════════════════════════════════════════ */
        @keyframes accentSlide {
          0%   { background-position: 0%   50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes logoPulse {
          0%, 100% { opacity: 0.55; transform: scale(1);    }
          50%       { opacity: 0.9;  transform: scale(1.06); }
        }
        @keyframes slideInLink {
          to { opacity: 1; transform: translateX(0); }
        }

        /* ═══════════════════════════════════════════
           SUB-345px — პატარა ეკრანები
        ═══════════════════════════════════════════ */
        @media (max-width: 344px) {
          .nb-inner {
            padding: 10px 12px;
            gap: 8px;
          }
          .nb-logo-img-wrap { width: 32px; height: 32px; }
          .nb-logo-img      { border-radius: 7px; }
          .nb-logo-pulse    { border-radius: 10px; }
          .nb-logo-name     { font-size: 12px; }
          .nb-logo-sub      { font-size: 7.5px; letter-spacing: 0.06em; }
          .nb-ham           { width: 36px; height: 36px; padding: 7px; border-radius: 9px; }
          .nb-ham-bar       { width: 17px; }

          /* mobile drawer */
          .nb-mobile-nav        { padding: 12px; gap: 2px; }
          .nb-mobile-brand      { padding: 6px 2px 12px; gap: 8px; }
          .nb-mobile-logo       { width: 36px; height: 36px; }
          .nb-mobile-brand-name { font-size: 13px; }
          .nb-mobile-brand-sub  { font-size: 9px; }
          .nb-mobile-link       { padding: 10px; font-size: 13px; gap: 9px; }
          .nb-mobile-cta        { padding: 11px; font-size: 12px; }
          .nb-mobile-note       { font-size: 10px; }
        }

        /* ═══════════════════════════════════════════
           REDUCED MOTION
        ═══════════════════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .nb-accent-line,
          .nb-mobile-edge,
          .nb-logo-pulse,
          .nb-cta-glow { animation: none !important; }

          .nb-mobile-nav { transition: opacity 0.2s ease; transform: none !important; }
          .nb-mobile-link,
          .nb-mobile-footer { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </>
  );
}