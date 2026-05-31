
import { useState, useEffect, useRef } from "react";

/* ───────────────────────── DATA ───────────────────────── */


const PHOTOS = [
  {
    id: 1, cat: "therapy", area: "a",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=85",
    alt: "სპეციალისტი ბავშვთან მუშაობის დროს",
    label: "მეტყველების თერაპია",
  },
  {
    id: 2, cat: "children", area: "b",
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&q=80",
    alt: "ბავშვები სახელოსნოში",
    label: "ბავშვების სამყარო",
  },
  {
    id: 3, cat: "space", area: "c",
    src: "/bg3.jpg",
    alt: "თერაპიული სივრცე",
    label: "ჩვენი სივრცე",
  },
  {
    id: 4, cat: "therapy", area: "d",
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    alt: "ოკუპაციური თერაპია",
    label: "ოკუპაციური თერაპია",
  },
  {
    id: 5, cat: "moments", area: "e",
    src: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&q=80",
    alt: "ბავშვის პირველი ნაბიჯები",
    label: "პირველი ნაბიჯები",
  },
  {
    id: 6, cat: "team", area: "f",
    src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=80",
    alt: "ჩვენი სპეციალისტები",
    label: "ჩვენი გუნდი",
  },
  {
    id: 7, cat: "children", area: "g",
    src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=700&q=80",
    alt: "ბავშვი თამაშის დროს",
    label: "სიხარულის მომენტი",
  },
  {
    id: 8, cat: "therapy", area: "h",
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80",
    alt: "ფიზიკური თერაპია",
    label: "ფიზიკური თერაპია",
  },
];

const STATS = [
  { value: 150, suffix: "+", label: "ფოტო" },
  { value: 6,   suffix: "",  label: "კატეგორია" },
  { value: "∞", suffix: "",  label: "მომენტი" },
];

/* ───────────────── animated counter ───────────────── */
function Counter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (typeof target !== "number") { setCount(target); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(target / 40);
        const id = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(id); }
          else setCount(start);
        }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{typeof target === "number" ? count : target}</span>;
}

/* ───────────────── photo card ───────────────── */
function PhotoCard({ photo, index, visible, filtered }) {
  const show = visible && filtered;
  return (
    <div
      className={`gl-cell gl-cell--${photo.area} ${show ? "gl-cell--in" : ""}`}
      style={{ transitionDelay: `${index * 0.06}s` }}
    >
      <div className="gl-cell-inner">
        <img src={photo.src} alt={photo.alt} className="gl-img" loading="lazy" />
        <div className="gl-img-tint" />
        <div className="gl-overlay">
          <div className="gl-overlay-content">
            <span className="gl-cat-dot" />
            <span className="gl-photo-label">{photo.label}</span>
          </div>
          <div className="gl-zoom-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              <path d="M11 8v6M8 11h6"/>
            </svg>
          </div>
        </div>
        {/* gold corner accent */}
        <div className="gl-corner-accent" />
      </div>
    </div>
  );
}

/* ───────────────── main component ───────────────── */
export default function Gallery() {
  const [active, setActive]   = useState("all");
  const [visible, setVisible] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (rootRef.current) obs.observe(rootRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered = (photo) =>
    active === "all" || photo.cat === active;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;500;600;700;900&display=swap');

        /* ═══════════ TOKENS ═══════════ */
        .gl-root {
          --navy:       #0F1C38;
          --navy-mid:   #162242;
          --navy-card:  #1A2A50;
          --blue:       #2885ef;
          --blue-light: #4DA3FF;
          --blue-glow:  rgba(40,133,239,0.18);
          --gold:       #FBBF24;
          --gold-dim:   rgba(251,191,36,0.18);
          --gold-line:  rgba(251,191,36,0.45);
          --white:      #FFFFFF;
          --white-70:   rgba(255,255,255,0.72);
          --white-35:   rgba(255,255,255,0.35);
          --white-12:   rgba(255,255,255,0.12);
          --cream:      #F5F0E8;

          background: var(--navy);
          padding: 96px 28px 80px;
          font-family: 'Noto Sans Georgian', sans-serif;
          overflow: hidden;
          position: relative;
          color: var(--white);
        }

        /* subtle light beams */
        .gl-root::before {
          content: '';
          position: absolute;
          top: -200px; left: 30%;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(40,133,239,0.12) 0%, transparent 65%);
          pointer-events: none;
        }
        .gl-root::after {
          content: '';
          position: absolute;
          bottom: -120px; right: 10%;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        .gl-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ═══════════ HEADER ═══════════ */
        .gl-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 48px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .gl-header--in { opacity: 1; transform: translateY(0); }

        .gl-header-left {}

        .gl-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 18px;
        }
        .gl-label::before {
          content: '';
          width: 28px; height: 1.5px;
          background: var(--gold);
          border-radius: 2px;
        }

        .gl-title {
          font-size: clamp(28px, 4.5vw, 52px);
          font-weight: 900;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: var(--white);
          margin: 0;
        }
        .gl-title em {
          font-style: italic;
          background: linear-gradient(120deg, var(--gold) 10%, #F59E0B 90%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .gl-subtitle {
          font-size: clamp(13px, 1.5vw, 15px);
          color: var(--white-70);
          margin-top: 14px;
          line-height: 1.7;
          font-weight: 300;
          max-width: 440px;
        }

        .gl-open-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 26px;
          background: transparent;
          border: 1.5px solid var(--gold-line);
          border-radius: 100px;
          color: var(--gold);
          font-family: 'Noto Sans Georgian', sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.25s ease, border-color 0.25s ease,
                      transform 0.25s ease, box-shadow 0.25s ease;
          flex-shrink: 0;
        }
        .gl-open-btn:hover {
          background: var(--gold-dim);
          border-color: var(--gold);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(251,191,36,0.18);
        }
        .gl-open-btn svg { transition: transform 0.2s ease; }
        .gl-open-btn:hover svg { transform: translateX(4px); }

        /* ═══════════ FILTER PILLS ═══════════ */
        .gl-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
        }
        .gl-filters--in { opacity: 1; transform: translateY(0); }

        .gl-pill {
          padding: 7px 18px;
          border-radius: 100px;
          font-family: 'Noto Sans Georgian', sans-serif;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          border: 1.5px solid var(--white-12);
          background: transparent;
          color: var(--white-70);
          transition: all 0.22s ease;
          letter-spacing: 0.01em;
        }
        .gl-pill:hover {
          border-color: var(--white-35);
          color: var(--white);
          background: var(--white-12);
        }
        .gl-pill--active {
          background: var(--blue);
          border-color: var(--blue);
          color: var(--white);
          box-shadow: 0 4px 16px rgba(40,133,239,0.35);
        }
        .gl-pill--active:hover {
          background: var(--blue);
          border-color: var(--blue);
        }

        /* ═══════════ BENTO GRID ═══════════ */
        .gl-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 240px 200px 220px;
          gap: 12px;
        }

        /* grid areas — desktop */
        .gl-cell--a { grid-area: 1 / 1 / 3 / 3; } /* large 2×2 */
        .gl-cell--b { grid-area: 1 / 3 / 2 / 4; }
        .gl-cell--c { grid-area: 1 / 4 / 2 / 5; }
        .gl-cell--d { grid-area: 2 / 3 / 3 / 5; } /* wide 1×2 */
        .gl-cell--e { grid-area: 3 / 1 / 4 / 2; }
        .gl-cell--f { grid-area: 3 / 2 / 4 / 3; }
        .gl-cell--g { grid-area: 3 / 3 / 4 / 4; }
        .gl-cell--h { grid-area: 3 / 4 / 4 / 5; }

        /* ═══════════ CELL ═══════════ */
        .gl-cell {
          border-radius: 14px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(24px) scale(0.97);
          transition:
            opacity 0.55s cubic-bezier(0.16,1,0.3,1),
            transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .gl-cell--in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* hidden cell (filtered out) */
        .gl-cell:not(.gl-cell--in) {
          pointer-events: none;
        }

        .gl-cell-inner {
          position: relative;
          width: 100%; height: 100%;
          overflow: hidden;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.07);
          background: var(--navy-card);
          cursor: pointer;
        }

        .gl-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
          filter: saturate(0.8) brightness(0.88);
        }
        .gl-cell-inner:hover .gl-img {
          transform: scale(1.07);
          filter: saturate(0.95) brightness(0.92);
        }

        /* deep navy-blue tint — coherent with hero */
        .gl-img-tint {
          position: absolute; inset: 0;
          background: linear-gradient(
            160deg,
            rgba(15,28,56,0.5) 0%,
            rgba(22,34,66,0.28) 50%,
            rgba(15,28,56,0.7) 100%
          );
          transition: opacity 0.3s ease;
        }
        .gl-cell-inner:hover .gl-img-tint { opacity: 0.6; }

        /* hover overlay */
        .gl-overlay {
          position: absolute; inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 16px 18px;
          background: linear-gradient(
            to top,
            rgba(15,28,56,0.88) 0%,
            transparent 55%
          );
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .gl-cell-inner:hover .gl-overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .gl-overlay-content {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .gl-cat-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--gold);
          flex-shrink: 0;
        }
        .gl-photo-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--white);
          letter-spacing: 0.02em;
        }

        .gl-zoom-icon {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(251,191,36,0.18);
          border: 1px solid var(--gold-line);
          display: flex; align-items: center; justify-content: center;
          color: var(--gold);
          transition: background 0.2s ease;
        }
        .gl-cell-inner:hover .gl-zoom-icon { background: var(--gold-dim); }

        /* gold corner accent line */
        .gl-corner-accent {
          position: absolute;
          top: 0; right: 0;
          width: 40px; height: 40px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .gl-corner-accent::before,
        .gl-corner-accent::after {
          content: '';
          position: absolute;
          background: var(--gold);
          border-radius: 2px;
        }
        .gl-corner-accent::before {
          top: 12px; right: 0;
          width: 1.5px; height: 20px;
        }
        .gl-corner-accent::after {
          top: 12px; right: 0;
          width: 20px; height: 1.5px;
        }
        .gl-cell-inner:hover .gl-corner-accent { opacity: 0.7; }

        /* ═══════════ STATS BAR ═══════════ */
        .gl-stats {
          margin-top: 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
          padding: 28px 36px;
          background: var(--navy-mid);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.07);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
        }
        .gl-stats--in { opacity: 1; transform: translateY(0); }

        .gl-stats-group {
          display: flex;
          gap: 0;
        }

        .gl-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 0 32px;
          position: relative;
        }
        .gl-stat + .gl-stat::before {
          content: '';
          position: absolute;
          left: 0; top: 8px;
          width: 1px; height: 32px;
          background: rgba(255,255,255,0.1);
        }

        .gl-stat-value {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 900;
          color: var(--white);
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .gl-stat-suffix {
          color: var(--gold);
        }
        .gl-stat-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--white-70);
        }

        .gl-stats-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: var(--blue);
          border: none;
          border-radius: 100px;
          color: white;
          font-family: 'Noto Sans Georgian', sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
          white-space: nowrap;
        }
        .gl-stats-cta:hover {
          background: #1A6DD4;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(40,133,239,0.35);
        }
        .gl-arrow-circle {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s ease;
        }
        .gl-stats-cta:hover .gl-arrow-circle { transform: translateX(3px); }

        /* ═══════════ RESPONSIVE ═══════════ */
        @media (max-width: 900px) {
          .gl-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: 220px 180px 180px 180px;
          }
          .gl-cell--a { grid-area: 1 / 1 / 2 / 2; }
          .gl-cell--b { grid-area: 1 / 2 / 2 / 3; }
          .gl-cell--c { grid-area: 2 / 1 / 3 / 3; } /* wide */
          .gl-cell--d { grid-area: 3 / 1 / 4 / 2; }
          .gl-cell--e { grid-area: 3 / 2 / 4 / 3; }
          .gl-cell--f { grid-area: 4 / 1 / 5 / 2; }
          .gl-cell--g { grid-area: 4 / 2 / 5 / 3; }
          .gl-cell--h { display: none; }

          .gl-root { padding: 80px 20px 60px; }
          .gl-stats { padding: 22px 24px; }
          .gl-stat { padding: 0 20px; }
          .gl-header { flex-direction: column; align-items: flex-start; gap: 20px; }
        }

        @media (max-width: 560px) {
          .gl-root { padding: 64px 16px 48px; }
          .gl-grid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(6, 200px);
            gap: 10px;
          }
          .gl-cell--a { grid-area: 1 / 1; }
          .gl-cell--b { grid-area: 2 / 1; }
          .gl-cell--c { grid-area: 3 / 1; }
          .gl-cell--d { grid-area: 4 / 1; }
          .gl-cell--e { grid-area: 5 / 1; }
          .gl-cell--f { grid-area: 6 / 1; }
          .gl-cell--g { display: none; }
          .gl-cell--h { display: none; }

          .gl-filters { gap: 6px; }
          .gl-pill { padding: 6px 14px; font-size: 11px; }

          .gl-stats {
            flex-direction: column;
            text-align: center;
            padding: 28px 20px;
          }
          .gl-stats-group { justify-content: center; }
          .gl-stat { padding: 0 16px; }
          .gl-stats-cta { width: 100%; justify-content: center; }

          .gl-title { font-size: 26px; }
        }

        .link{
        text-decoration:none;
        color:var(--gold);
        }

        .link2{
        text-decoration:none;
        color:#fff;
        }

        @media (max-width: 380px) {
          .gl-title { font-size: 22px; }
          .gl-stat-value { font-size: 26px; }
          .gl-pill { padding: 5px 11px; font-size: 10px; }
        }

        /* reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .gl-cell, .gl-header, .gl-filters, .gl-stats {
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .gl-img { transition: none; }
          .gl-overlay { opacity: 1; transform: none; }
        }
      `}</style>

      <section className="gl-root" id="gallery" ref={rootRef}>
        <div className="gl-container">

          {/* Header */}
          <div className={`gl-header ${visible ? "gl-header--in" : ""}`}>
            <div className="gl-header-left">
              <p className="gl-label">ჩვენი ცენტრი სურათებში</p>
              <h2 className="gl-title">
                დაათვალიერეთ<br />
                ჩვენი <em>გალერეა</em>
              </h2>
              <p className="gl-subtitle">
                ყოველი ფოტო — ერთი ნაბიჯია. ერთი სიხარულია.<br />
                ერთი მომენტი, რომელიც სიყვარულით შეიქმნა.
              </p>
            </div>
            <button className="gl-open-btn">
              <a className="link" href="/gallery">სრული გალერეა</a>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

         

          {/* Bento grid */}
          <div className="gl-grid">
            {PHOTOS.map((photo, i) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={i}
                visible={visible}
                filtered={active === "all" || photo.cat === active}
              />
            ))}
          </div>

          {/* Stats bar */}
          <div className={`gl-stats ${visible ? "gl-stats--in" : ""}`}>
            <div className="gl-stats-group">
              {STATS.map((s) => (
                <div key={s.label} className="gl-stat">
                  <div className="gl-stat-value">
                    <Counter target={s.value} />
                    <span className="gl-stat-suffix">{s.suffix}</span>
                  </div>
                  <div className="gl-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <button className="gl-stats-cta">
              <a className="link2" href="/gallery">გახსენი გალერეა</a>
              <div className="gl-arrow-circle">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
          </div>

        </div>
      </section>
    </>
  );
}