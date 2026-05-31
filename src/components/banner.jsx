"use client";

import { useEffect, useRef, useState } from "react";

export default function Banner() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;600;700;900&display=swap');

        .cta-wrap {
          background: #F5F0E8;
          padding: 0 28px 96px;
          font-family: 'Noto Sans Georgian', sans-serif;
        }

        /* ── CARD ── */
        .cta-card {
           margin: 0 auto;
          border-radius: 28px;
          background:
            radial-gradient(ellipse at 20% 50%, rgba(40,133,239,0.22) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 20%, rgba(251,191,36,0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0F1C38 0%, #1B2A4A 45%, #162242 100%);
          padding: clamp(52px, 8vw, 84px) clamp(28px, 6vw, 80px);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow:
            0 40px 80px rgba(15,28,56,0.35),
            0 0 0 1px rgba(40,133,239,0.1) inset;
        }

        /* decorative rings */
        .cta-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(251,191,36,0.12);
          pointer-events: none;
        }
        .cta-ring--a {
          width: 500px; height: 500px;
          top: -260px; right: -180px;
        }
        .cta-ring--b {
          width: 340px; height: 340px;
          top: -180px; right: -100px;
          border-color: rgba(40,133,239,0.12);
        }
        .cta-ring--c {
          width: 200px; height: 200px;
          bottom: -120px; left: 5%;
          border-color: rgba(251,191,36,0.08);
        }

        /* gold dot grid — subtle texture */
        .cta-dots {
          position: absolute;
          right: 0; top: 0;
          width: 260px; height: 100%;
          background-image: radial-gradient(circle, rgba(251,191,36,0.18) 1px, transparent 1px);
          background-size: 22px 22px;
          mask-image: linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 100%);
          -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 100%);
          pointer-events: none;
        }

        /* ── INNER ── */
        .cta-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0;
        }

        /* trust badge */
        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 18px;
          background: rgba(251,191,36,0.1);
          border: 1px solid rgba(251,191,36,0.35);
          border-radius: 100px;
          margin-bottom: 28px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .cta-badge--in { opacity: 1; transform: translateY(0); }

        .cta-badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #FBBF24;
          animation: ctaBadgePulse 2s ease-in-out infinite;
        }
        .cta-badge-text {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #FBBF24;
        }

        /* heading */
        .cta-heading {
          font-size: clamp(28px, 5.5vw, 60px);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0 0 20px;
          max-width: 820px;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }
        .cta-heading--in { opacity: 1; transform: translateY(0); }

        .cta-heading-accent {
          position: relative;
          display: inline-block;
          background: linear-gradient(120deg, #FBBF24 10%, #F59E0B 90%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* underline draw */
        .cta-underline {
          position: absolute;
          bottom: -8px; left: 0;
          width: 100%;
          overflow: visible;
          pointer-events: none;
        }
        .cta-underline-path {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          transition: stroke-dashoffset 1.1s ease-out 0.7s;
        }
        .cta-heading--in .cta-underline-path {
          stroke-dashoffset: 0;
        }

        /* subtitle */
        .cta-sub {
          font-size: clamp(14px, 1.8vw, 17px);
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
          font-weight: 300;
          max-width: 520px;
          margin: 0 0 40px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.65s ease 0.22s, transform 0.65s ease 0.22s;
        }
        .cta-sub--in { opacity: 1; transform: translateY(0); }

        /* buttons row */
        .cta-btns {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.65s ease 0.34s, transform 0.65s ease 0.34s;
        }
        .cta-btns--in { opacity: 1; transform: translateY(0); }

        /* primary */
        .cta-btn-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 34px;
          background: linear-gradient(105deg, #2885ef 0%, #1A6DD4 100%);
          border: none;
          border-radius: 100px;
          color: white;
          font-family: 'Noto Sans Georgian', sans-serif;
          font-size: clamp(13px, 1.5vw, 15px);
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          overflow: hidden;
          box-shadow: 0 6px 28px rgba(40,133,239,0.45);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cta-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(40,133,239,0.55);
        }
        .cta-btn-primary:active { transform: translateY(1px); }

        /* shine sweep */
        .cta-btn-primary::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.55s ease;
        }
        .cta-btn-primary:hover::after { transform: translateX(100%); }

        .cta-btn-primary svg { transition: transform 0.2s ease; }
        .cta-btn-primary:hover svg { transform: translateX(4px); }

        /* phone button */
        .cta-btn-phone {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 28px;
          background: rgba(255,255,255,0.07);
          border: 1.5px solid rgba(255,255,255,0.18);
          border-radius: 100px;
          color: white;
          font-family: 'Noto Sans Georgian', sans-serif;
          font-size: clamp(13px, 1.5vw, 15px);
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          backdrop-filter: blur(10px);
          transition: background 0.25s ease, border-color 0.25s ease,
                      transform 0.25s ease, box-shadow 0.25s ease;
          letter-spacing: 0.01em;
        }
        .cta-btn-phone:hover {
          background: rgba(255,255,255,0.13);
          border-color: rgba(255,255,255,0.35);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        .cta-phone-icon {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          animation: ctaRing 2.5s ease-in-out infinite;
        }

        /* trust chips row */
        .cta-chips {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.6s ease 0.46s, transform 0.6s ease 0.46s;
        }
        .cta-chips--in { opacity: 1; transform: translateY(0); }

        .cta-chip {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 6px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          font-size: 12px;
          color: rgba(255,255,255,0.65);
          font-weight: 500;
          backdrop-filter: blur(6px);
        }
        .cta-chip-check {
          width: 16px; height: 16px;
          border-radius: 50%;
          background: rgba(37,211,102,0.2);
          border: 1px solid rgba(37,211,102,0.35);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 9px;
          color: #6EE7B7;
        }

        /* keyframes */
        @keyframes ctaBadgePulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes ctaRing {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.25); }
          60% { box-shadow: 0 0 0 8px rgba(255,255,255,0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .cta-wrap { padding: 0 16px 72px; }
          .cta-card { padding: 52px 24px; border-radius: 22px; }
          .cta-dots { display: none; }
          .cta-btns { flex-direction: column; align-items: stretch; }
          .cta-btn-primary,
          .cta-btn-phone { justify-content: center; width: 100%; max-width: 340px; margin: 0 auto; }
          .cta-chips { display: none; }
        }

        @media (max-width: 480px) {
          .cta-card { padding: 44px 20px; border-radius: 18px; }
          .cta-heading { font-size: clamp(24px, 7vw, 32px); }
          .cta-ring { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cta-badge, .cta-heading, .cta-sub, .cta-btns, .cta-chips {
            transition: none !important; opacity: 1 !important; transform: none !important;
          }
          .cta-badge-dot, .cta-phone-icon { animation: none; }
          .cta-underline-path { transition: none; stroke-dashoffset: 0; }
        }
      `}</style>

      <div className="cta-wrap" ref={ref}>
        <div className="cta-card">

          {/* decorative */}
          <div className="cta-ring cta-ring--a" />
          <div className="cta-ring cta-ring--b" />
          <div className="cta-ring cta-ring--c" />
          <div className="cta-dots" />

          <div className="cta-inner">

            {/* badge */}
            <div className={`cta-badge ${visible ? "cta-badge--in" : ""}`}>
              <div className="cta-badge-dot" />
              <span className="cta-badge-text">უფასო პირველი კონსულტაცია</span>
            </div>

            {/* heading */}
            <h2 className={`cta-heading ${visible ? "cta-heading--in" : ""}`}>
              მზად ხართ{" "}
              <span className="cta-heading-accent">
                პირველი ნაბიჯისთვის?
                <svg className="cta-underline" viewBox="0 0 360 14" fill="none" aria-hidden="true">
                  <path
                    className="cta-underline-path"
                    d="M3 11 Q90 3 180 8 Q270 13 357 6"
                    stroke="#FBBF24"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>

            {/* subtitle */}
            <p className={`cta-sub ${visible ? "cta-sub--in" : ""}`}>
              დაჯავშნეთ უფასო პირველადი კონსულტაცია — ჩვენი
              ექსპერტი დაგეხმარებათ გეგმის შედგენაში და
              სწორი სერვისის შერჩევაში.
            </p>

            {/* buttons */}
            <div className={`cta-btns ${visible ? "cta-btns--in" : ""}`}>
              <a href="#contact" className="cta-btn-primary">
                ჩაეწერე კონსულტაციაზე
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>

              <a  className="cta-btn-phone">
                <div className="cta-phone-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.12 2.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                +995 555 12 34 56
              </a>
            </div>

            {/* trust chips */}
            <div className={`cta-chips ${visible ? "cta-chips--in" : ""}`}>
              {[
                "პასუხობთ 24 საათში",
                "გამოცდილი სპეციალისტები",
                "ინდივიდუალური მიდგომა",
              ].map((c) => (
                <div key={c} className="cta-chip">
                  <div className="cta-chip-check">✓</div>
                  {c}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}