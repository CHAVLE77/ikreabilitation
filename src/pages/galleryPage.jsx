import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────── DATA (24 PHOTOS) ─────────────────────── */
const PHOTOS = [
  {
    id: 1,
    src: "gal2.webp",
    thumb: "gal2.webp",
    alt: "სპეციალისტი ბავშვთან მუშაობის დროს",
    cols: 2, rows: 2,
  },
  {
    id: 2,
    src: "gal7.webp",
    thumb: "gal7.webp",
    alt: "ბავშვები სახელოსნოში",
    cols: 1, rows: 1,
  },
  {
    id: 3,
    src: "gal16.webp",
    thumb: "gal16.webp",
    alt: "თერაპიული სივრცე",
    cols: 1, rows: 1,
  },
  {
    id: 4,
    src: "gal17.webp",
    thumb: "gal17.webp",
    alt: "ოკუპაციური თერაპია",
    cols: 2, rows: 1,
  },
  {
    id: 5,
    src: "gal18.webp",
    thumb: "gal18.webp",
    alt: "ბავშვის პირველი ნაბიჯები",
    cols: 1, rows: 1,
  },
  {
    id: 6,
    src: "gal19.webp",
    thumb: "gal19.webp",
    alt: "ჩვენი სპეციალისტები",
    cols: 1, rows: 2,
  },
  {
    id: 7,
    src: "gal4.webp",
    thumb: "gal4.webp",
    alt: "ბავშვი თამაშის დროს",
    cols: 1, rows: 1,
  },
  {
    id: 8,
    src: "gal1.webp",
    thumb: "gal1.webp",
    alt: "ფიზიკური თერაპია",
    cols: 2, rows: 1, 
  },
  {
    id: 9,
    src: "gal9.webp",
    thumb: "gal9.webp",
    alt: "სიხარულის მომენტი",
    cols: 1, rows: 1,
  },
  {
    id: 10,
    src: "gal5.webp",
    thumb: "gal5.webp",
    alt: "ლოდინის ზონა",
    cols: 1, rows: 1,
  },
  {
    id: 11,
    src: "gal10.webp",
    thumb: "gal10.webp",
    alt: "სპეციალისტი",
    cols: 1, rows: 1,
  },
  {
    id: 12,
    src: "gal20.webp",
    thumb: "gal20.webp",
    alt: "ჯგუფური სესია",
    cols: 2, rows: 1,
  },
  {
    id: 13,
    src: "gal12.webp",
    thumb: "gal12.webp",
    alt: "ბავშვი ხატავს",
    cols: 1, rows: 1,
  },
  {
    id: 14,
    src: "gal11.webp",
    thumb: "gal11.webp",
    alt: "მშობელი და ბავშვი",
    cols: 1, rows: 1,
  },
  {
    id: 15,
    src: "gal14.webp",
    thumb: "gal14.webp",
    alt: "სენსორული ოთახი",
    cols: 2, rows: 1,
  },
  {
    id: 16,
    src: "gal15.webp",
    thumb: "gal15.webp",
    alt: "წარმატების მომენტი",
    cols: 1, rows: 2,
  },
  {
    id: 17,
    src: "gal21.webp",
    thumb: "gal21.webp",
    alt: "ლოგოპედიური სესია",
    cols: 1, rows: 1,
  },
  {
    id: 18,
    src: "gal8.webp",
    thumb: "gal8.webp",
    alt: "ბავშვები თამაშობენ",
    cols: 2, rows: 1,
  },
  {
    id: 19,
    src: "gal3.webp",
    thumb: "gal3.webp",
    alt: "მუსიკალური თერაპია",
    cols: 1, rows: 1,
  },
  {
    id: 20,
    src: "gal6.webp",
    thumb: "gal6.webp",
    alt: "ბავშვი ქვიშის თერაპიაში",
    cols: 1, rows: 1,
  },
  {
    id: 21,
    src: "gal13.webp",
    thumb: "gal13.webp",
    alt: "თერაპიული ცხოველები",
    cols: 2, rows: 1,
  },
  {
    id: 22,
    src: "gal22.webp",
    thumb: "gal22.webp",
    alt: "ინკლუზიური განათლება",
    cols: 1, rows: 1,
  },
  {
    id: 23,
    src: "gal23.webp",
    thumb: "gal23.webp",
    alt: "აღმზრდელი და ბავშვი",
    cols: 1, rows: 1,
  },
  {
    id: 24,
    src: "gal24.webp",
    thumb: "gal24.webp",
    alt: "ბავშვების ღიმილი",
    cols: 2, rows: 2,
  },
];

/* ─────────────────── Lightbox ─────────────────── */
function LightboxFull({ photos, currentIndex, onClose, onNext, onPrev, onThumb }) {
  const photo = photos[currentIndex];

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev]);

  if (!photo) return null;

  return (
    <div className="lb-backdrop" onClick={onClose}>
      <button className="lb-close" onClick={onClose} aria-label="დახურვა">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
      <div className="lb-counter">{currentIndex + 1} / {photos.length}</div>
      <button className="lb-nav lb-nav--prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="წინა">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
        <div className="lb-img-wrap">
          <img key={photo.id} src={photo.src} alt={photo.alt} className="lb-img" />
          <div className="lb-img-shine" />
        </div>
      </div>
      <button className="lb-nav lb-nav--next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="შემდეგი">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
      <div className="lb-strip" onClick={(e) => e.stopPropagation()}>
        {photos.map((p, i) => (
          <button key={p.id} className={`lb-thumb ${i === currentIndex ? "lb-thumb--active" : ""}`} onClick={() => onThumb(i)}>
            <img src={p.thumb} alt={p.alt} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── Grid Card ─────────────── */
function GridCard({ photo, index, visible, onClick }) {
  return (
    <div
      className={`gp-card ${photo.cols === 2 ? "gp-card--c2" : ""} ${photo.rows === 2 ? "gp-card--r2" : ""} ${visible ? "gp-card--in" : ""}`}
      style={{ transitionDelay: `${index * 0.04}s` }}
      onClick={onClick}
    >
      <div className="gp-card-inner">
        <div className="gp-card-img-wrap">
          <img src={photo.thumb} alt={photo.alt} className="gp-card-img" loading="lazy" />
        </div>
        <div className="gp-card-overlay">
          <div className="gp-card-zoom">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
            </svg>
            გადიდება
          </div>
        </div>
        <div className="gp-card-corner" />
        <div className="gp-card-shine" />
      </div>
    </div>
  );
}

/* ─────────── Masonry Card ─────────── */
function MasonryCard({ photo, index, visible, onClick }) {
  return (
    <div className={`gp-card gp-card--masonry ${visible ? "gp-card--in" : ""}`} style={{ transitionDelay: `${index * 0.035}s` }} onClick={onClick}>
      <div className="gp-card-inner" style={{ borderRadius: 20 }}>
        <div className="gp-card-img-wrap" style={{ height: "auto" }}>
          <img src={photo.thumb} alt={photo.alt} className="gp-card-img" style={{ height: "auto", minHeight: 180 }} loading="lazy" />
        </div>
        <div className="gp-card-overlay">
          <div className="gp-card-zoom">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
            </svg>
            გადიდება
          </div>
        </div>
        <div className="gp-card-corner" />
        <div className="gp-card-shine" />
      </div>
    </div>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */
export default function GalleryPage() {
  const [lightbox, setLightbox] = useState(null);
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState("masonry");
  const rootRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.04 });
    if (rootRef.current) obs.observe(rootRef.current);
    return () => obs.disconnect();
  }, []);

  const openLightbox = useCallback((index) => setLightbox(index), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const nextPhoto = useCallback(() => setLightbox(i => (i + 1) % PHOTOS.length), []);
  const prevPhoto = useCallback(() => setLightbox(i => (i - 1 + PHOTOS.length) % PHOTOS.length), []);

  return (
    <>
      <style>{` 
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body, html, #root {
          background: #0A152C;
          width: 100%;
          min-height: 100vh;
        }
        :root {
          --navy:       #0A152C;
          --navy-mid:   #0F1E3A;
          --navy-card:  #142645;
          --navy-hover: #1A2F55;
          --blue:       #2885ef;
          --blue-light: #4DA3FF;
          --blue-glow:  rgba(40,133,239,0.2);
          --gold:       #FBBF24;
          --gold-dim:   rgba(251,191,36,0.12);
          --gold-line:  rgba(251,191,36,0.35);
          --gold-glow:  rgba(251,191,36,0.2);
          --white:      #FFFFFF;
          --w80:        rgba(255,255,255,0.82);
          --w60:        rgba(255,255,255,0.62);
          --w35:        rgba(255,255,255,0.35);
          --w15:        rgba(255,255,255,0.15);
          --w08:        rgba(255,255,255,0.08);
          --w04:        rgba(255,255,255,0.04);
          --font:       'Noto Sans Georgian', sans-serif;
        }
        .gp-page {
          background: var(--navy);
          min-height: 100vh;
          font-family: var(--font);
          color: var(--white);
          position: relative;
          overflow-x: hidden;
          width: 100%;
          margin: 0;
          padding: 0;
        }
        .gp-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(100px); }
        .gp-orb--1 { width: 700px; height: 700px; top: -200px; left: -150px; background: radial-gradient(circle, rgba(40,133,239,0.12) 0%, transparent 70%); }
        .gp-orb--2 { width: 600px; height: 600px; bottom: 100px; right: -150px; background: radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%); }
        .gp-orb--3 { width: 500px; height: 500px; top: 60vh; left: 30%; background: radial-gradient(circle, rgba(40,133,239,0.06) 0%, transparent 70%); }
        .gp-hero { position: relative; z-index: 1; padding: 100px 32px 72px; text-align: center; overflow: hidden; }
        .gp-hero::after { content: ''; position: absolute; bottom: 0; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, var(--w15), transparent); }
        .gp-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(var(--w04) 1px, transparent 1px), linear-gradient(90deg, var(--w04) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent); pointer-events: none; }
        .gp-hero-eyebrow { display: inline-flex; align-items: center; gap: 12px; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold); margin-bottom: 24px; }
        .gp-hero-eyebrow::before, .gp-hero-eyebrow::after { content: ''; width: 40px; height: 1px; background: linear-gradient(90deg, transparent, var(--gold)); }
        .gp-hero-eyebrow::after { background: linear-gradient(90deg, var(--gold), transparent); }
        .gp-hero-h1 { font-size: clamp(36px, 6vw, 72px); font-weight: 900; letter-spacing: -0.03em; line-height: 1.05; margin: 0 0 20px; }
        .gp-hero-h1 em { font-style: italic; background: linear-gradient(130deg, var(--gold) 0%, #F59E0B 60%, #EF8C10 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .gp-hero-sub { font-size: clamp(14px, 1.8vw, 17px); color: var(--w60); font-weight: 300; line-height: 1.75; max-width: 560px; margin: 0 auto 40px; }
        .gp-hero-cta-row { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
        .gp-btn-primary { display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; background: var(--blue); border: none; border-radius: 100px; color: white; font-family: var(--font); font-size: 13px; font-weight: 700; cursor: pointer; transition: background 0.22s, transform 0.22s, box-shadow 0.22s; }
        .gp-btn-primary:hover { background: #1A6DD4; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(40,133,239,0.4); }
        .gp-btn-ghost { display: inline-flex; align-items: center; gap: 10px; padding: 13px 26px; background: transparent; border: 1.5px solid var(--gold-line); border-radius: 100px; color: var(--gold); font-family: var(--font); font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.22s; }
        .gp-btn-ghost:hover { background: var(--gold-dim); border-color: var(--gold); transform: translateY(-2px); box-shadow: 0 8px 24px var(--gold-glow); }
        .gp-toolbar { position: relative; z-index: 1; padding: 0 32px 32px; max-width: 1280px; margin: 0 auto; display: flex; justify-content: flex-end; opacity: 0; transform: translateY(14px); transition: opacity 0.5s 0.1s, transform 0.5s 0.1s; }
        .gp-toolbar--in { opacity: 1; transform: translateY(0); }
        .gp-view-toggle { display: flex; gap: 4px; background: var(--navy-mid); border: 1px solid var(--w08); border-radius: 12px; padding: 4px; }
        .gp-view-btn { padding: 8px 14px; border: none; border-radius: 8px; background: transparent; color: var(--w35); cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px; font-family: var(--font); font-size: 12px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
        .gp-view-btn--active { background: var(--navy-card); color: var(--white); box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
        .gp-grid-section { position: relative; z-index: 1; padding: 0 32px 60px; max-width: 1280px; margin: 0 auto; }
        .gp-grid { display: grid; grid-template-columns: repeat(4, 1fr); auto-rows: 240px; gap: 18px; }
        .gp-grid--masonry { columns: 4; column-gap: 18px; display: block; }
        .gp-card { position: relative; border-radius: 20px; overflow: hidden; cursor: pointer; opacity: 0; transform: scale(0.95) translateY(20px); transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .gp-card--in { opacity: 1; transform: scale(1) translateY(0); }
        .gp-card--c2 { grid-column: span 2; }
        .gp-card--r2 { grid-row: span 2; }
        .gp-card--masonry { display: inline-block; width: 100%; margin-bottom: 18px; break-inside: avoid; }
        .gp-card-inner { position: relative; width: 100%; height: 100%; border-radius: 20px; overflow: hidden; background: var(--navy-card); }
        .gp-card-img-wrap { width: 100%; height: 100%; overflow: hidden; }
        .gp-card-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s; filter: saturate(0.85) brightness(0.88); }
        .gp-card:hover .gp-card-img { transform: scale(1.08); filter: saturate(1.05) brightness(0.92); }
        .gp-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,21,44,0.7) 0%, rgba(10,21,44,0.2) 40%, transparent 70%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px; opacity: 0; transform: translateY(10px); transition: opacity 0.4s cubic-bezier(0.2,0.9,0.4,1.1), transform 0.4s ease; }
        .gp-card:hover .gp-card-overlay { opacity: 1; transform: translateY(0); }
        .gp-card-zoom { align-self: flex-start; display: flex; align-items: center; gap: 8px; padding: 7px 16px; background: rgba(251,191,36,0.12); border: 1px solid var(--gold-line); border-radius: 100px; color: var(--gold); font-size: 11px; font-weight: 700; letter-spacing: 0.05em; transition: all 0.25s; backdrop-filter: blur(4px); }
        .gp-card:hover .gp-card-zoom { background: rgba(251,191,36,0.22); border-color: var(--gold); gap: 10px; }
        .gp-card-corner { position: absolute; top: 0; right: 0; width: 50px; height: 50px; opacity: 0; transition: opacity 0.35s; pointer-events: none; }
        .gp-card-corner::before, .gp-card-corner::after { content: ''; position: absolute; background: var(--gold); border-radius: 1px; }
        .gp-card-corner::before { top: 12px; right: 0; width: 1.5px; height: 24px; }
        .gp-card-corner::after { top: 12px; right: 0; width: 24px; height: 1.5px; }
        .gp-card:hover .gp-card-corner { opacity: 0.7; }
        .gp-card-shine { position: absolute; top: 0; left: -100%; width: 60%; height: 100%; background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%); transition: left 0.6s ease; pointer-events: none; }
        .gp-card:hover .gp-card-shine { left: 100%; }
        .lb-backdrop { position: fixed; inset: 0; z-index: 9999; background: rgba(6,12,24,0.97); display: flex; align-items: center; justify-content: center; animation: lb-in 0.3s ease; backdrop-filter: blur(16px); }
        @keyframes lb-in { from { opacity: 0; backdrop-filter: blur(0px); } to { opacity: 1; backdrop-filter: blur(16px); } }
        .lb-close { position: fixed; top: 24px; right: 28px; width: 48px; height: 48px; border-radius: 50%; background: var(--w08); border: 1px solid var(--w15); color: var(--w80); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10001; transition: all 0.25s; }
        .lb-close:hover { background: rgba(251,191,36,0.15); color: var(--gold); transform: scale(1.05); }
        .lb-counter { position: fixed; top: 32px; left: 28px; font-size: 13px; font-weight: 700; color: var(--w35); letter-spacing: 0.1em; z-index: 10001; font-family: var(--font); }
        .lb-nav { position: fixed; top: 50%; transform: translateY(-50%); width: 52px; height: 52px; border-radius: 50%; background: var(--w08); border: 1px solid var(--w15); color: var(--w80); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10001; transition: all 0.25s; }
        .lb-nav--prev { left: 24px; }
        .lb-nav--next { right: 24px; }
        .lb-nav:hover { background: rgba(40,133,239,0.25); color: var(--blue-light); transform: translateY(-50%) scale(1.08); }
        .lb-stage { width: min(92vw, 1100px); display: flex; flex-direction: column; gap: 0; animation: lb-slide 0.35s cubic-bezier(0.16,1,0.3,1); }
        @keyframes lb-slide { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        .lb-img-wrap { position: relative; border-radius: 20px; overflow: hidden; background: var(--navy-card); }
        .lb-img { width: 100%; max-height: 80vh; object-fit: contain; display: block; border-radius: 20px; }
        .lb-img-shine { position: absolute; top: 0; left: -60%; width: 40%; height: 100%; background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%); pointer-events: none; }
        .lb-strip { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); display: flex; gap: 10px; padding: 10px 16px; background: rgba(6,12,24,0.85); border: 1px solid var(--w08); border-radius: 18px; backdrop-filter: blur(12px); z-index: 10001; max-width: 90vw; overflow-x: auto; scrollbar-width: none; }
        .lb-strip::-webkit-scrollbar { display: none; }
        .lb-thumb { flex-shrink: 0; width: 56px; height: 42px; border-radius: 8px; overflow: hidden; border: 2px solid transparent; cursor: pointer; padding: 0; background: none; transition: all 0.2s; opacity: 0.5; }
        .lb-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .lb-thumb--active { border-color: var(--gold); opacity: 1; transform: scale(1.05); }
        .aboutLink{
        color:var(--gold);
        text-decoration:none;
        }
        @media (max-width: 1024px) { .gp-grid { grid-template-columns: repeat(3, 1fr); auto-rows: 220px; } .gp-grid--masonry { columns: 3; } }
        @media (max-width: 768px) { .gp-hero { padding: 80px 20px 56px; } .gp-grid-section, .gp-toolbar { padding-left: 20px; padding-right: 20px; } .gp-grid { grid-template-columns: repeat(2, 1fr); auto-rows: 200px; } .gp-grid--masonry { columns: 2; } .lb-nav { display: none; } }
        @media (max-width: 540px) { .gp-grid { grid-template-columns: 1fr; } .gp-grid--masonry { columns: 1; } }
      `}</style>

      <div className="gp-page" ref={rootRef}>
        <div className="gp-orb gp-orb--1" />
        <div className="gp-orb gp-orb--2" />
        <div className="gp-orb gp-orb--3" />

        <section className="gp-hero">
          <div className="gp-hero-grid" />
          <p className="gp-hero-eyebrow">ფოტო გალერეა</p>
          <h1 className="gp-hero-h1">ყოველი სურათი —<br /><em>ერთი ამბავია</em></h1>
          <p className="gp-hero-sub">ჩვენი ცენტრის ცხოვრება სურათებში. თერაპია, სიხარული, განვითარება და ის განსაკუთრებული მომენტები, რომლებიც სიტყვებით ვერ გადმოიცემა.</p>
          <div className="gp-hero-cta-row">
            <button className="gp-btn-ghost"><a className="aboutLink" href="/about">ჩვენს შესახებ </a><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
          </div>
        </section>

        <div className={`gp-toolbar ${visible ? "gp-toolbar--in" : ""}`}>
          <div className="gp-view-toggle">
            <button className={`gp-view-btn ${view === "masonry" ? "gp-view-btn--active" : ""}`} onClick={() => setView("masonry")}><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="4" height="16" rx="1.5"/><rect x="6" y="3" width="4" height="13" rx="1.5"/><rect x="12" y="1" width="4" height="15" rx="1.5"/></svg>მოზაიკა</button>
          </div>
        </div>

        <div className="gp-grid-section">
          {view === "grid" ? (
            <div className="gp-grid">
              {PHOTOS.map((photo, i) => <GridCard key={photo.id} photo={photo} index={i} visible={visible} onClick={() => openLightbox(i)} />)}
            </div>
          ) : (
            <div className="gp-grid--masonry">
              {PHOTOS.map((photo, i) => <MasonryCard key={photo.id} photo={photo} index={i} visible={visible} onClick={() => openLightbox(i)} />)}
            </div>
          )}
        </div>

        {lightbox !== null && <LightboxFull photos={PHOTOS} currentIndex={lightbox} onClose={closeLightbox} onNext={nextPhoto} onPrev={prevPhoto} onThumb={(i) => setLightbox(i)} />}
      </div>
    </>
  );
}