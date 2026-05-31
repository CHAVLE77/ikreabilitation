import { useEffect, useRef, useState } from "react";


const servicesData = [
  {
    id: 1,
    title: "მეტყველების თერაპია",
    subtitle: "ლოგოპედი",
    description:
      "მეტყველების, გამოთქმისა და კომუნიკაციის დარღვევების დიაგნოსტიკა და კორექცია. ინდივიდუალური მიდგომა და თამაშზე დაფუძნებული თერაპია.",
    forWhom:
      "ბავშვები მეტყველების შეფერხებით, ბგერათა გამოთქმის პრობლემებით, ჭექა-ქუხილით ან აფაზიით.",
    // Child communicating with adult, warm setting
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=700&h=500&fit=crop&auto=format",
    color: "#2885ef",
  },
  {
    id: 2,
    title: "ფსიქოლოგი",
    subtitle: "ემოციური მხარდაჭერა",
    description:
      "ემოციური და ქცევითი სირთულეების მართვა, თვითშეფასების ამაღლება, შფოთვისა და სტრესის შემცირება.",
    forWhom:
      "ბავშვები, მოზარდები და ოჯახები, რომლებსაც სჭირდებათ ფსიქოლოგიური მხარდაჭერა.",
    // Calm counseling session
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=700&h=500&fit=crop&auto=format",
    color: "#4A90D9",
  },
  {
    id: 3,
    title: "სპეციალური პედაგოგი",
    subtitle: "სასწავლო მხარდაჭერა",
    description:
      "სწავლის სპეციფიკური მოთხოვნილებების მქონე ბავშვებისთვის ინდივიდუალური სასწავლო გეგმები და მხარდაჭერა.",
    forWhom:
      "ბავშვები სწავლის სირთულეებით, ყურადღების დეფიციტით, დისლექსიით ან დისგრაფიით.",
    // Teacher working one-on-one with child
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?w=700&h=500&fit=crop&auto=format",
    color: "#2B4A8A",
  }
];

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Services = ({ preview = false }) => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  const displayed = preview ? servicesData.slice(0, 3) : servicesData;

  useEffect(() => {
    const hObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) hObs.observe(sectionRef.current);

    const cObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.findIndex((r) => r === entry.target);
            if (idx !== -1) setVisibleCards((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    cardRefs.current.forEach((c) => c && cObs.observe(c));

    return () => { hObs.disconnect(); cObs.disconnect(); };
  }, [displayed.length]);

  return (
    <section id="services" className="svc-section" ref={sectionRef}>
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />

      <div className="svc-container">

        {/* Header */}
        <div className={`svc-header ${headerVisible ? "hdr-in" : ""}`}>
          <span className="svc-badge">ჩვენი მომსახურება</span>
          <h2 className="svc-title">
            სერვისები —{" "}
            <span className="svc-accent">სწორი მხარდაჭერა</span>
          </h2>
          <p className="svc-subtitle">
            მრავალპროფილური გუნდი, რომელიც ფარავს განვითარებისა და
            თერაპიის ყველა მიმართულებას.
          </p>
        </div>

        {/* Cards */}
        <div className={`svc-grid ${preview ? "grid-preview" : "grid-full"}`}>
          {displayed.map((s, idx) => (
            <article
              key={s.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              className={`svc-card ${visibleCards.has(idx) ? "card-in" : ""}`}
              style={{
                "--cc": s.color,
                transitionDelay: `${(idx % 4) * 0.08}s`,
              }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* ── Image ── */}
              <div className="card-img-wrap">
                <img src={s.image} alt={s.title} loading="lazy" className="card-img" />
                <div className="card-overlay" />
                <div className="card-wash" />
                <div className="card-img-tag">{s.subtitle}</div>
              </div>

              {/* ── Body ── */}
              <div className="card-body">
                <h3 className="card-title">{s.title}</h3>
                <p className="card-desc">{s.description}</p>

                <div className="card-audience">
                  <span className="aud-label">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    ვისთვის
                  </span>
                  <p className="aud-txt">{s.forWhom}</p>
                </div>

                <div className="card-cta-row">
                  <span>დეტალურად</span>
                  <ArrowIcon />
                </div>
              </div>

              <div className="card-line" />
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className={`svc-cta-wrap ${headerVisible ? "hdr-in" : ""}`}>
          {preview ? (
            <Link href="/services" className="svc-btn outlined">
              <span>იხილეთ ყველა სერვისი</span>
              <span className="btn-arr"><ArrowIcon /></span>
            </Link>
          ) : (
            <a href="/services" className="svc-btn filled">
              <span>იხილეთ მეტი</span>
              <span className="btn-arr"><ArrowIcon /></span>
            </a>
          )}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;500;600;700;900&display=swap');

        :root {
          --cream: #F5F0E8;
          --navy: #1B2A4A;
          --blue-mid: #2B4A8A;
          --accent: #2885ef;
          --accent2: #F3D646;
          --text-body: #3A3A3A;
          --text-muted: #7A7A8C;
        }

        .svc-section {
          background: var(--cream);
          padding: 5.5rem 1.5rem 5rem;
          font-family: 'Noto Sans Georgian', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 {
          width: 560px; height: 560px;
          background: rgba(40,133,239,0.07);
          top: -140px; right: -80px;
        }
        .blob-2 {
          width: 420px; height: 420px;
          background: rgba(43,74,138,0.06);
          bottom: -100px; left: -60px;
        }

        .svc-container {
          max-width: 1300px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .svc-header {
          text-align: center;
          margin-bottom: 3.5rem;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .svc-header.hdr-in { opacity: 1; transform: translateY(0); }

        .svc-badge {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          background: rgba(40,133,239,0.1);
          padding: 0.3rem 1.1rem;
          border-radius: 40px;
          margin-bottom: 1rem;
        }

        .svc-title {
          font-size: clamp(1.85rem, 4vw, 3rem);
          font-weight: 900;
          color: var(--navy);
          margin-bottom: 0.75rem;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .svc-accent {
          color: var(--blue-mid);
          position: relative;
          display: inline-block;
        }
        .svc-accent::after {
          content: '';
          position: absolute;
          bottom: 0.08em; left: 0;
          width: 100%; height: 0.12em;
          background: var(--accent2);
          border-radius: 2px;
        }

        .svc-subtitle {
          font-size: 1rem;
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Grids */
        .svc-grid {
          display: grid;
          gap: 1.75rem;
          margin-bottom: 3rem;
        }
        .grid-preview { grid-template-columns: repeat(3, 1fr); }
        .grid-full    { grid-template-columns: repeat(3, 1fr); }

        /* Card */
        .svc-card {
          --cc: #2885ef;
          background: #fff;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 8px 28px -10px rgba(27,42,74,0.09);
          opacity: 0;
          transform: translateY(40px) scale(0.97);
          transition:
            opacity 0.6s cubic-bezier(0.22,1,0.36,1),
            transform 0.6s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.35s ease;
          will-change: transform, opacity;
          position: relative;
          cursor: pointer;
        }
        .svc-card.card-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .svc-card:hover {
          transform: translateY(-10px) scale(1.015) !important;
          box-shadow:
            0 28px 48px -14px rgba(27,42,74,0.2),
            0 0 0 1.5px color-mix(in srgb, var(--cc) 35%, transparent);
        }

        /* Left glow border */
        .svc-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: var(--cc);
          opacity: 0;
          border-radius: 4px 0 0 4px;
          transition: opacity 0.3s ease;
          z-index: 3;
        }
        .svc-card:hover::before { opacity: 1; }

        /* Image */
        .card-img-wrap {
          position: relative;
          height: 210px;
          overflow: hidden;
        }
        .card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.65s cubic-bezier(0.22,1,0.36,1);
        }
        .svc-card:hover .card-img { transform: scale(1.09); }

        .card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 35%, rgba(27,42,74,0.3) 100%);
          z-index: 1;
        }

        /* Color tint on hover */
        .card-wash {
          position: absolute; inset: 0;
          background: var(--cc);
          opacity: 0;
          mix-blend-mode: multiply;
          transition: opacity 0.4s ease;
          z-index: 1;
        }
        .svc-card:hover .card-wash { opacity: 0.16; }

        /* Icon badge */
        .card-icon-badge {
          position: absolute;
          top: 14px; right: 14px;
          background: rgba(255,255,255,0.93);
          backdrop-filter: blur(6px);
          width: 42px; height: 42px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          box-shadow: 0 4px 14px rgba(27,42,74,0.15);
          z-index: 2;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .svc-card:hover .card-icon-badge {
          transform: scale(1.2) rotate(-10deg);
          box-shadow: 0 8px 22px rgba(27,42,74,0.22);
        }

        /* Subtitle tag slides up on hover */
        .card-img-tag {
          position: absolute;
          bottom: 14px; left: 14px;
          background: var(--cc);
          color: #fff;
          font-size: 0.63rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.22rem 0.75rem;
          border-radius: 20px;
          z-index: 2;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;
        }
        .svc-card:hover .card-img-tag {
          opacity: 1;
          transform: translateY(0);
        }

        /* Body */
        .card-body {
          padding: 1.4rem 1.35rem 1.3rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .card-title {
          font-size: 1.08rem;
          font-weight: 800;
          color: var(--navy);
          letter-spacing: -0.01em;
          line-height: 1.25;
          margin: 0;
          transition: color 0.25s ease;
        }
        .svc-card:hover .card-title { color: var(--cc); }

        .card-desc {
          font-size: 0.845rem;
          line-height: 1.62;
          color: #4A4A5A;
          margin: 0;
        }

        /* Audience box */
        .card-audience {
          background: #F2F5FC;
          border-radius: 10px;
          padding: 0.6rem 0.85rem;
          margin-top: 0.1rem;
          border-left: 3px solid color-mix(in srgb, var(--cc) 45%, transparent);
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .svc-card:hover .card-audience {
          background: color-mix(in srgb, var(--cc) 8%, white);
          border-left-color: var(--cc);
        }
        .aud-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--blue-mid);
          margin-bottom: 0.28rem;
        }
        .aud-txt {
          font-size: 0.78rem;
          line-height: 1.45;
          color: var(--text-body);
          margin: 0;
        }

        /* "დეტალურად" row */
        .card-cta-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--cc);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.28s ease, transform 0.28s ease;
          margin-top: 0.15rem;
        }
        .svc-card:hover .card-cta-row {
          opacity: 1;
          transform: translateY(0);
        }

        /* Sliding bottom line */
        .card-line {
          position: absolute;
          bottom: 0; left: 0;
          height: 3px;
          width: 0%;
          background: linear-gradient(90deg, var(--cc), color-mix(in srgb, var(--cc) 55%, white));
          border-radius: 0 2px 2px 0;
          transition: width 0.42s cubic-bezier(0.22,1,0.36,1);
        }
        .svc-card:hover .card-line { width: 100%; }

        /* CTA wrap */
        .svc-cta-wrap {
          text-align: center;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s;
        }
        .svc-cta-wrap.hdr-in { opacity: 1; transform: translateY(0); }

        /* Outlined — "იხილეთ მეტი" */
        .svc-btn.outlined {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: transparent;
          border: 2px solid var(--navy);
          color: var(--navy);
          padding: 0.85rem 2rem;
          border-radius: 50px;
          font-family: 'Noto Sans Georgian', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.28s ease;
          letter-spacing: 0.01em;
        }
        .svc-btn.outlined:hover {
          background: var(--navy);
          color: var(--cream);
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -8px rgba(27,42,74,0.28);
        }

        /* Filled — "კონსულტაციის ჩაწერა" */
        .svc-btn.filled {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--navy);
          color: var(--cream);
          padding: 0.85rem 2rem;
          border-radius: 50px;
          font-family: 'Noto Sans Georgian', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.28s ease;
          letter-spacing: 0.01em;
        }
        .svc-btn.filled:hover {
          background: var(--blue-mid);
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -8px rgba(27,42,74,0.35);
        }

        .btn-arr {
          display: flex;
          align-items: center;
          transition: transform 0.25s ease;
        }
        .svc-btn:hover .btn-arr { transform: translateX(4px); }

        /* Responsive */
        @media (max-width: 1024px) {
          .grid-preview, .grid-full {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.4rem;
          }
        }

        @media (max-width: 640px) {
          .svc-section { padding: 3.5rem 1rem 3rem; }
          .grid-preview, .grid-full {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
          .svc-title { font-size: 1.65rem; }
          .svc-subtitle { font-size: 0.9rem; }
          .card-img-wrap { height: 185px; }
          .svc-btn.outlined, .svc-btn.filled {
            width: 100%;
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .svc-header, .svc-cta-wrap, .svc-card,
          .card-img, .card-line, .card-icon-badge,
          .card-cta-row, .card-img-tag, .card-wash {
            transition: none !important;
            animation: none !important;
          }
          .svc-card { opacity: 1; transform: none; }
          .svc-header, .svc-cta-wrap { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
};

export default Services;