"use client";

import { useEffect, useRef, useState } from "react";


const teamData = [
  {
    id: 1,
    name: "მარიამ გელაშვილი",
    role: "მეტყველების თერაპევტი",
    exp: "9 წელი",
    certs: ["ASHA სერტიფიკატი", "Hanen Program", "PROMPT მეთოდი"],
    bio: "მარიამი ბავშვებთან მუშაობას ხელოვნებად მიიჩნევს — ყოველი სიტყვა, რომელიც ბავშვმა პირველად გამოთქვა, მისთვის ახალი გამარჯვებაა.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=700&fit=crop&crop=faces&auto=format",
    color: "#2885ef",
    colorRgb: "40,133,239",
  },
  {
    id: 2,
    name: "ნინო ჯავახიშვილი",
    role: "ბავშვთა ფსიქოლოგი",
    exp: "7 წელი",
    certs: ["CBT სერტიფიკაცია", "Play Therapy", "ოჯახური თერაპია"],
    bio: "ნინო ქმნის სივრცეს, სადაც ბავშვები თავს უსაფრთხოდ გრძნობენ — გამოხატონ, ითამაშონ, გაიზარდონ. სითბო და მეცნიერება ერთ სივრცეში.",
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&h=700&fit=crop&crop=faces&auto=format",
    color: "#4A90D9",
    colorRgb: "74,144,217",
  },
  {
    id: 3,
    name: "თამარ კვარაცხელია",
    role: "სპეციალური პედაგოგი",
    exp: "11 წელი",
    certs: ["სპეც. განათლების M.Ed", "ABA ბაზისური", "დისლექსიის სპეციალისტი"],
    bio: "თამარი ყველა ბავშვში ხედავს პოტენციალს — სწორი მხარდაჭერით. ის ასწავლის ისე, როგორც ბავშვს სჭირდება, არა ისე, როგორც სისტემა მოითხოვს.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=700&fit=crop&crop=faces&auto=format",
    color: "#2B4A8A",
    colorRgb: "43,74,138",
  },
  {
    id: 4,
    name: "ანა მახარაძე",
    role: "ოკუპაციური თერაპევტი",
    exp: "6 წელი",
    certs: ["OT სახელმწიფო ლიცენზია", "Sensory Integration", "NDT სერტიფიკატი"],
    bio: "ანა სენსორული სამყაროს ექსპერტია. ის ბავშვებს ეხმარება, რომ ყოველდღიური გამოწვევები — ტანსაცმლის ჩაცმიდან ფანქრის ჭერამდე — სიამოვნებად იქცეს.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop&crop=faces&auto=format",
    color: "#3A7BD5",
    colorRgb: "58,123,213",
  },
  {
    id: 5,
    name: "გიორგი ბერიძე",
    role: "ქცევითი თერაპევტი (ABA)",
    exp: "8 წელი",
    certs: ["BCBA სერტიფიკატი", "VB-MAPP", "ESDM ტრენინგი"],
    bio: "გიორგი ABA-ს ადამიანურ სახეს წარმოადგენს — სტრუქტურა, სიყვარული და დაჟინება ერთ სივრცეში. ნაბიჯ-ნაბიჯ, გამარჯვება გამარჯვებაზე.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=700&fit=crop&crop=faces&auto=format",
    color: "#1B6FD4",
    colorRgb: "27,111,212",
  },
  {
    id: 6,
    name: "სოფო ლომიძე",
    role: "ფიზიკური თერაპევტი",
    exp: "10 წელი",
    certs: ["PT სახელმწიფო ლიცენზია", "Bobath მეთოდი", "პედიატრიული PT"],
    bio: "სოფო ყოველ ნაბიჯს ზეიმად აქცევს. მისი პაციენტები ისწავლიან არა მხოლოდ სიარულს — არამედ სიამაყეს, რომ შეძლეს.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=700&fit=crop&crop=faces&auto=format",
    color: "#2B4A8A",
    colorRgb: "43,74,138",
  },
];

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Team = ({ preview = false }) => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [flipped, setFlipped] = useState(null);
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);
  const [headerIn, setHeaderIn] = useState(false);

  const displayed = preview ? teamData.slice(0, 3) : teamData;

  useEffect(() => {
    const hObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderIn(true); },
      { threshold: 0.12 }
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
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    cardRefs.current.forEach((c) => c && cObs.observe(c));
    return () => { hObs.disconnect(); cObs.disconnect(); };
  }, [displayed.length]);

  return (
    <section id="team" className="tm-section" ref={sectionRef}>
      <div className="tm-noise" />

      <div className="tm-container">

        {/* ── Header ── */}
        <div className={`tm-header ${headerIn ? "hdr-in" : ""}`}>
          <span className="tm-badge">
            <span className="badge-pulse" />
            ჩვენი სპეციალისტები
          </span>
          <h2 className="tm-title">
            გუნდი, რომელსაც<br />
            <span className="title-em">ენდობიან ოჯახები</span>
          </h2>
          <p className="tm-subtitle">
            გამოცდილი, სერტიფიცირებული და გულწრფელი — ჩვენი
            სპეციალისტები ყოველ ბავშვს პირადად იცნობენ.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="tm-grid">
          {displayed.map((person, idx) => (
            <div
              key={person.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              className={`tm-card ${visibleCards.has(idx) ? "card-in" : ""} ${flipped === idx ? "is-flipped" : ""}`}
              style={{
                "--pc": person.color,
                "--pcr": person.colorRgb,
                transitionDelay: `${(idx % 3) * 0.1}s`,
              }}
            >
              <div className="card-scene">

                {/* ════ FRONT ════ */}
                <div className="card-face front">

                  {/* Full-bleed photo */}
                  <div className="photo-area">
                    <img
                      src={person.image}
                      alt={person.name}
                      loading="lazy"
                      className="photo-img"
                    />
                    {/* Multi-layer gradient: subtle top, strong bottom */}
                    <div className="photo-grad-top" />
                    <div className="photo-grad-bottom" />

                    {/* Color haze that intensifies on hover */}
                    <div className="photo-haze" />

                    {/* Experience pill — top left */}
                    <div className="exp-pill">
                      <span className="exp-dot" />
                      {person.exp}
                    </div>
                  </div>

                  {/* Content panel */}
                  <div className="front-panel">
                    {/* Role tag */}
                    <span className="role-tag">{person.role}</span>

                    {/* Name */}
                    <h3 className="person-name">{person.name}</h3>

                    {/* Bio */}
                    <p className="person-bio">{person.bio}</p>

                    {/* Cert chips */}
                    <div className="cert-chips">
                      {person.certs.map((c, i) => (
                        <span key={i} className="chip">
                          <CheckIcon />
                          {c}
                        </span>
                      ))}
                    </div>

                    {/* Dual action buttons */}
                    <div className="front-actions">
                      <button
                        className="act-btn act-ghost"
                        onClick={() => setFlipped(flipped === idx ? null : idx)}
                      >
                        <span>სრული პროფილი</span>
                        <ArrowRight />
                      </button>
                      <button className="act-btn act-solid">
                        <span>გამოცდილება</span>
                        <ArrowRight />
                      </button>
                    </div>
                  </div>

                  {/* Thin top color bar */}
                  <div className="top-bar" />
                </div>

                {/* ════ BACK ════ */}
                <div className="card-face back">
                  {/* Blurred photo as background */}
                  <div className="back-photo-bg">
                    <img src={person.image} alt="" aria-hidden className="back-bg-img" />
                    <div className="back-bg-mask" />
                  </div>

                  <div className="back-body">
                    {/* Avatar ring */}
                    <div className="back-ring">
                      <img src={person.image} alt={person.name} className="back-avatar-img" />
                      <div className="ring-border" />
                    </div>

                    <h3 className="back-name">{person.name}</h3>

                    <span className="back-role-tag">{person.role}</span>

                    <div className="back-exp-row">
                      <span className="back-exp-dot" />
                      <span>{person.exp} გამოცდილება</span>
                    </div>

                    {/* Certs list */}
                    <div className="back-certs">
                      <p className="back-certs-label">კვალიფიკაცია</p>
                      {person.certs.map((c, i) => (
                        <div key={i} className="back-cert-item">
                          <span className="bci-check"><CheckIcon /></span>
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>

                    <p className="back-bio">{person.bio}</p>

                    <button
                      className="back-return"
                      onClick={() => setFlipped(null)}
                    >
                      <ArrowLeft />
                      <span>უკან</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className={`tm-cta-wrap ${headerIn ? "hdr-in" : ""}`}>
          {preview ? (
            <Link href="/team" className="tm-main-btn">
              <span>იხილეთ მთელი გუნდი</span>
              <span className="main-btn-arr"><ArrowRight /></span>
            </Link>
          ) : (
            <a href="#contact" className="tm-main-btn solid">
              <span>კონსულტაციის ჩაწერა</span>
              <span className="main-btn-arr"><ArrowRight /></span>
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
          --text-body: #3A3A3A;
          --text-muted: #7A7A8C;
        }

        /* ── Section ── */
        .tm-section {
          background: var(--cream);
          padding: 6rem 1.5rem 5.5rem;
          font-family: 'Noto Sans Georgian', sans-serif;
          position: relative;
          overflow: hidden;
        }
        /* Grain overlay for depth */
        .tm-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .tm-container {
          max-width: 1220px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Header ── */
        .tm-header {
          text-align: center;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .tm-header.hdr-in { opacity: 1; transform: none; }

        .tm-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--accent);
          background: rgba(40,133,239,0.09);
          border: 1px solid rgba(40,133,239,0.18);
          padding: 0.35rem 1rem 0.35rem 0.75rem;
          border-radius: 40px;
          margin-bottom: 1.1rem;
        }
        .badge-pulse {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 0 rgba(40,133,239,0.5);
          animation: pulse-anim 2.4s ease infinite;
        }
        @keyframes pulse-anim {
          0%   { box-shadow: 0 0 0 0   rgba(40,133,239,0.5); }
          70%  { box-shadow: 0 0 0 8px rgba(40,133,239,0); }
          100% { box-shadow: 0 0 0 0   rgba(40,133,239,0); }
        }

        .tm-title {
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 900;
          color: var(--navy);
          line-height: 1.18;
          letter-spacing: -0.025em;
          margin: 0 0 0.85rem;
        }
        .title-em {
          color: var(--blue-mid);
          position: relative;
          display: inline-block;
        }
        .title-em::after {
          content: '';
          position: absolute;
          bottom: 0.06em; left: 0;
          width: 100%; height: 0.13em;
          background: var(--accent);
          opacity: 0.4;
          border-radius: 2px;
        }

        .tm-subtitle {
          font-size: 1rem;
          color: var(--text-muted);
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ── Grid ── */
        .tm-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3.5rem;
        }

        /* ── Card shell ── */
        .tm-card {
          --pc: #2885ef;
          --pcr: 40,133,239;
          perspective: 1100px;
          height: 560px;
          opacity: 0;
          transform: translateY(50px) scale(0.96);
          transition:
            opacity 0.65s cubic-bezier(0.22,1,0.36,1),
            transform 0.65s cubic-bezier(0.22,1,0.36,1);
          will-change: transform, opacity;
        }
        .tm-card.card-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .card-scene {
          width: 100%; height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.4,0,0.2,1);
          border-radius: 1.75rem;
          position: relative;
        }
        .tm-card.is-flipped .card-scene {
          transform: rotateY(180deg);
        }

        /* ── Both faces ── */
        .card-face {
          position: absolute;
          inset: 0;
          border-radius: 1.75rem;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* ═══ FRONT ═══ */
        .front {
          display: flex;
          flex-direction: column;
          background: #fff;
          box-shadow:
            0 2px 4px rgba(27,42,74,0.04),
            0 8px 24px rgba(27,42,74,0.08),
            0 24px 48px -12px rgba(27,42,74,0.1);
          transition: box-shadow 0.4s ease, transform 0.4s ease;
        }
        .tm-card:hover:not(.is-flipped) .front {
          box-shadow:
            0 4px 8px rgba(27,42,74,0.05),
            0 16px 40px rgba(27,42,74,0.13),
            0 32px 64px -12px rgba(var(--pcr),0.2),
            0 0 0 1px rgba(var(--pcr),0.12);
          transform: translateY(-10px);
        }

        /* Top color stripe */
        .top-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--pc), rgba(var(--pcr),0.4) 100%);
          z-index: 3;
          border-radius: 1.75rem 1.75rem 0 0;
        }

        /* Photo */
        .photo-area {
          position: relative;
          height: 260px;
          flex-shrink: 0;
          overflow: hidden;
          background: color-mix(in srgb, var(--pc) 14%, #e8eef5);
        }
        .photo-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 15%;
          display: block;
          transition: transform 0.65s cubic-bezier(0.22,1,0.36,1);
        }
        .tm-card:hover:not(.is-flipped) .photo-img {
          transform: scale(1.07);
        }

        /* Top vignette (very subtle) */
        .photo-grad-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 80px;
          background: linear-gradient(to bottom, rgba(27,42,74,0.08), transparent);
          z-index: 1;
        }
        /* Bottom gradient for text readability */
        .photo-grad-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 100px;
          background: linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, transparent 100%);
          z-index: 1;
        }
        /* Colour haze overlay */
        .photo-haze {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(var(--pcr),0.12) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 1;
        }
        .tm-card:hover:not(.is-flipped) .photo-haze { opacity: 1; }

        /* Experience pill */
        .exp-pill {
          position: absolute;
          top: 14px; left: 14px;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.9);
          box-shadow: 0 4px 16px rgba(27,42,74,0.14);
          color: var(--navy);
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.32rem 0.8rem 0.32rem 0.6rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          z-index: 2;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .tm-card:hover:not(.is-flipped) .exp-pill {
          transform: translateY(-3px) scale(1.05);
        }
        .exp-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--pc);
          flex-shrink: 0;
        }

        /* Content panel */
        .front-panel {
          padding: 0.6rem 1.5rem 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .role-tag {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--pc);
          transition: color 0.2s ease;
        }

        .person-name {
          font-size: 1.18rem;
          font-weight: 900;
          color: var(--navy);
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 0;
          transition: color 0.25s ease;
        }
        .tm-card:hover:not(.is-flipped) .person-name {
          color: var(--pc);
        }

        .person-bio {
          font-size: 0.8rem;
          line-height: 1.62;
          color: #555568;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Cert chips */
        .cert-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
        }
        .chip {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.6rem;
          font-weight: 600;
          color: var(--pc);
          background: rgba(var(--pcr), 0.07);
          border: 1px solid rgba(var(--pcr), 0.2);
          padding: 0.2rem 0.6rem 0.2rem 0.5rem;
          border-radius: 20px;
          white-space: nowrap;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .tm-card:hover:not(.is-flipped) .chip {
          background: rgba(var(--pcr), 0.12);
          border-color: rgba(var(--pcr), 0.32);
        }
        .chip svg { color: var(--pc); flex-shrink: 0; }

        /* Action buttons */
        .front-actions {
          display: flex;
          gap: 0.6rem;
          margin-top: auto;
          padding-top: 0.3rem;
        }
        .act-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-family: 'Noto Sans Georgian', sans-serif;
          font-size: 0.71rem;
          font-weight: 700;
          border-radius: 50px;
          padding: 0.5rem 0.75rem;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.22,1,0.36,1);
          letter-spacing: 0.01em;
          white-space: nowrap;
        }
        /* Ghost */
        .act-ghost {
          background: transparent;
          border: 1.5px solid rgba(var(--pcr),0.35);
          color: var(--pc);
        }
        .act-ghost:hover {
          background: rgba(var(--pcr),0.08);
          border-color: var(--pc);
          transform: translateY(-2px);
        }
        .act-ghost:hover svg { transform: translateX(3px); }
        /* Solid */
        .act-solid {
          background: var(--pc);
          border: 1.5px solid var(--pc);
          color: #fff;
        }
        .act-solid:hover {
          background: color-mix(in srgb, var(--pc) 84%, #000);
          border-color: color-mix(in srgb, var(--pc) 84%, #000);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -4px rgba(var(--pcr),0.45);
        }
        .act-solid:hover svg { transform: translateX(3px); }
        .act-btn svg { transition: transform 0.2s ease; flex-shrink: 0; }

        /* ═══ BACK ═══ */
        .back {
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* Blurred photo bg */
        .back-photo-bg {
          position: absolute;
          inset: 0;
        }
        .back-bg-img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: blur(20px) saturate(0.6);
          transform: scale(1.15);
          display: block;
        }
        .back-bg-mask {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg,
            rgba(var(--pcr),0.85) 0%,
            rgba(27,42,74,0.92) 100%
          );
        }

        /* Back body */
        .back-body {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1.75rem 1.75rem;
          height: 100%;
          gap: 0.6rem;
          overflow-y: auto;
        }

        /* Avatar ring */
        .back-ring {
          position: relative;
          width: 80px; height: 80px;
          flex-shrink: 0;
        }
        .back-avatar-img {
          width: 100%; height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: top;
          display: block;
        }
        .ring-border {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2.5px solid rgba(255,255,255,0.45);
        }

        .back-name {
          font-size: 1.12rem;
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.015em;
          text-align: center;
          margin: 0;
        }
        .back-role-tag {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.95);
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.22);
          padding: 0.22rem 0.75rem;
          border-radius: 20px;
        }

        .back-exp-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
        }
        .back-exp-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
        }

        /* Certs block */
        .back-certs {
          width: 100%;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 14px;
          padding: 0.85rem 1rem;
        }
        .back-certs-label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin: 0 0 0.55rem;
        }
        .back-cert-item {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.9);
          padding: 0.22rem 0;
        }
        .bci-check {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          color: #fff;
          flex-shrink: 0;
        }

        .back-bio {
          font-size: 0.76rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.72);
          text-align: center;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .back-return {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: 'Noto Sans Georgian', sans-serif;
          font-size: 0.73rem;
          font-weight: 700;
          color: rgba(255,255,255,0.65);
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          padding: 0.42rem 1.1rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.22s ease;
          margin-top: auto;
        }
        .back-return:hover {
          background: rgba(255,255,255,0.18);
          color: #fff;
          transform: translateX(-3px);
        }

        /* ── CTA ── */
        .tm-cta-wrap {
          text-align: center;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
        }
        .tm-cta-wrap.hdr-in { opacity: 1; transform: none; }

        .tm-main-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: transparent;
          border: 2px solid var(--navy);
          color: var(--navy);
          padding: 0.85rem 2.1rem;
          border-radius: 50px;
          font-family: 'Noto Sans Georgian', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.28s ease;
          letter-spacing: 0.01em;
        }
        .tm-main-btn:hover {
          background: var(--navy);
          color: var(--cream);
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -8px rgba(27,42,74,0.28);
        }
        .tm-main-btn.solid {
          background: var(--navy);
          color: var(--cream);
        }
        .tm-main-btn.solid:hover {
          background: var(--blue-mid);
          box-shadow: 0 14px 30px -8px rgba(27,42,74,0.35);
        }
        .main-btn-arr {
          display: flex;
          align-items: center;
          transition: transform 0.25s ease;
        }
        .tm-main-btn:hover .main-btn-arr { transform: translateX(4px); }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .tm-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.6rem;
          }
          .tm-card { height: 580px; }
        }

        @media (max-width: 640px) {
          .tm-section { padding: 4rem 1rem 3.5rem; }
          .tm-grid {
            grid-template-columns: 1fr;
            gap: 1.4rem;
          }
          .tm-card { height: 540px; }
          .tm-title { font-size: 1.8rem; }
          .tm-title br { display: none; }
          .photo-area { height: 240px; }
          .tm-main-btn { width: 100%; justify-content: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tm-header, .tm-cta-wrap, .tm-card,
          .card-scene, .photo-img, .exp-pill,
          .act-btn, .back-return, .badge-pulse {
            transition: none !important;
            animation: none !important;
          }
          .tm-card { opacity: 1; transform: none; }
          .tm-header, .tm-cta-wrap { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
};

export default Team;