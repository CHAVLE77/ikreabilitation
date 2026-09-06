import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom"
import '../navbar.css'
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

    if (href === "/" || href === "/about" || href === "/services" || href === "/team" || href === "/gallery" || href === "/contact") {
      navigate(href)
      return
    }

    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        const el = document.querySelector(href);
        if (!el) return;
        const offset = document.querySelector('header')?.offsetHeight ?? 80;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
      }, 100)
      return
    }

    const el = document.querySelector(href);
    if (!el) return;
    const offset = document.querySelector('header')?.offsetHeight ?? 80;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`nb-root ${scrolled ? 'nb-root--scrolled' : ''}`}>
        <div className="nb-accent-line" aria-hidden="true" />

        <div className="nb-inner">

          {/* ── Logo — hidden on mobile when menu open ── */}
          <button
            className="nb-logo"
            onClick={() => handleNav('/')}
            aria-label="მთავარ გვერდზე გადასვლა"
            style={{ visibility: menuOpen ? 'hidden' : 'visible', pointerEvents: menuOpen ? 'none' : 'auto' }}
          >
            <div className="nb-logo-img-wrap">
              <img src="/logo.webp" alt="ლოგო" className="nb-logo-img" loading="eager" />
              <span className="nb-logo-pulse" aria-hidden="true" />
            </div>
            <div className="nb-logo-text">
              <span className="nb-logo-name">ირმა ხვიჩიას</span>
              <span className="nb-logo-sub">რეაბილიტაციის ცენტრი</span>
            </div>
          </button>

          {/* ── Desktop nav — hidden on mobile when menu open ── */}
          <nav
            className="nb-nav"
            aria-label="მთავარი მენიუ"
            style={{ visibility: menuOpen ? 'hidden' : 'visible' }}
          >
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

          {/* ── Desktop CTA — hidden on mobile when menu open ── */}
          <button
            className="nb-cta"
            onClick={() => handleNav('/contact')}
            style={{ visibility: menuOpen ? 'hidden' : 'visible', pointerEvents: menuOpen ? 'none' : 'auto' }}
          >
            <span className="nb-cta-glow" aria-hidden="true" />
            <Phone size={13} className="nb-cta-icon" strokeWidth={2.5} />
            <span className="nb-cta-full">ჩაეწერე კონსულტაციაზე</span>
            <span className="nb-cta-short">ჩაეწერე</span>
          </button>

          {/* ── Hamburger — always visible on mobile ── */}
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
        <div className="nb-mobile-edge" aria-hidden="true" />

        <nav className="nb-mobile-nav">

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

    
    </>
  );
} 