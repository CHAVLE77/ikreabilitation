"use client";

import { useEffect, useRef, useState } from 'react';
import { Heart, Award, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

const SLIDES = [
  { src: '/bg1.jpg', alt: 'ბავშვი თერაპიის დროს' },
  { src: '/bg2.jpg', alt: 'თერაპევტი ბავშვთან' },
  { src: '/bg3.jpg', alt: 'სარეაბილიტაციო სავარჯიშო' },
  { src: '/bg4.jpg', alt: 'ბავშვი და სპეციალისტი' },
];

const INTERVAL = 5000;

export default function Hero() {
  const heroRef = useRef(null);
  const timerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const advance = (next) => {
    setCurrent(c => {
      setPrev(c);
      return next;
    });
    setAnimating(true);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 1100);
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % SLIDES.length;
        setPrev(c);
        setAnimating(true);
        setTimeout(() => { setPrev(null); setAnimating(false); }, 1100);
        return next;
      });
    }, INTERVAL);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleDot = (idx) => {
    if (animating || idx === current) return;
    advance(idx);
    startTimer();
  };

  const smoothScroll = (id) => {
    const el = document.querySelector(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  };

  return (
    <section id="home" ref={heroRef} className="hero-root">

      {/* Slideshow Background */}
      <div className="slides-bg" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`slide ${i === current ? 'slide--active' : i === prev ? 'slide--prev' : ''}`}
          >
            <img src={s.src} alt={s.alt} className="slide-img" loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
          </div>
        ))}
        <div className="slide-overlay" />
        <div className="slide-vignette" />
      </div>

      {/* Content */}
      <div className="hero-inner">
        <div className="hero-content">
          {/* Badge - Animation 1 */}
          <span className={`badge anim-item anim-1 ${mounted ? 'visible' : ''}`}>
            <Sparkles size={13} className="badge-icon" />
            <span className="badge-dot" />
            განვითარებისა და თერაპიის ცენტრი
          </span>

          {/* Heading - Animation 2 */}
          <h1 className={`hero-heading anim-item anim-2 ${mounted ? 'visible' : ''}`}>
            ყოველი ბავშვი
            <br />
            <span className="heading-accent">
              განსაკუთრებულია
              <svg className={`underline-svg ${mounted ? 'draw-visible' : ''}`} viewBox="0 0 320 14" fill="none" aria-hidden="true">
                <path
                  d="M3 11 Q80 3 160 9 Q240 15 317 7"
                  stroke="#FBBF24"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  className="underline-path"
                />
              </svg>
            </span>
          </h1>

          {/* Body Text - Animation 3 */}
          <p className={`hero-body anim-item anim-3 ${mounted ? 'visible' : ''}`}>
            ჩვენ ვეხმარებით ბავშვებს და ოჯახებს პოტენციალის სრულად
            გახსნაში — გამოცდილი სპეციალისტებით, სიყვარულით და
            მეცნიერებაზე დაფუძნებული მიდგომებით.
          </p>

          {/* Buttons - Animation 4, 5, 6 */}
          <div className="btn-row">
            <button className={`btn btn-primary anim-item anim-4 ${mounted ? 'visible' : ''}`} onClick={() => smoothScroll('#contact')}>
              <span className="btn-shine" aria-hidden="true" />
              ჩაეწერე კონსულტაციაზე
              <ArrowRight size={15} className="btn-arrow" />
            </button>
            <button className={`btn btn-glass anim-item anim-5 ${mounted ? 'visible' : ''}`} onClick={() => smoothScroll('#services')}>
              ჩვენი სერვისები
            </button>
            <button className={`btn btn-glass anim-item anim-6 ${mounted ? 'visible' : ''}`} onClick={() => smoothScroll('#contact')}>
              დაგვიკავშირდით
            </button>
          </div>

          {/* Trust Chips - Animation 7 */}
          <div className={`trust-chips anim-item anim-7 ${mounted ? 'visible' : ''}`}>
            {['✓ გამოცდილი გუნდი', '✓ ინდივიდუალური მიდგომა', '✓ ხარისხიანი სერვისი'].map((c, i) => (
              <span key={c} className="chip" style={{ transitionDelay: `${1.1 + i * 0.1}s` }}>{c}</span>
            ))}
          </div>

          {/* Info Badges - Animation 8, 9 */}
          <div className="info-badges">
            <div className={`info-badge float-a anim-item anim-8 ${mounted ? 'visible' : ''}`}>
              <div className="info-badge-icon amber-icon">
                <Heart size={14} className="fill-white text-white" />
              </div>
              <div>
                <div className="info-badge-title">500+ ოჯახი</div>
                <div className="info-badge-sub">გვენდობა ჩვენ</div>
              </div>
            </div>
            <div className={`info-badge float-b anim-item anim-9 ${mounted ? 'visible' : ''}`}>
              <div className="info-badge-icon blue-icon">
                <Award size={14} className="text-white" />
              </div>
              <div>
                <div className="info-badge-title">სერტიფიცირებული</div>
                <div className="info-badge-sub">სპეციალისტები</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Counter - Animation 11 */}
      <div className={`slide-counter anim-item anim-11 ${mounted ? 'visible' : ''}`} aria-live="polite" aria-atomic="true">
        <span className="counter-cur">{String(current + 1).padStart(2, '0')}</span>
        <span className="counter-sep"> / </span>
        <span className="counter-total">{String(SLIDES.length).padStart(2, '0')}</span>
      </div>

      {/* Scroll Hint - Animation 12 */}
      <button className={`scroll-hint anim-item anim-12 ${mounted ? 'visible' : ''}`} onClick={() => smoothScroll('#about')} aria-label="დამატებითი ინფორმაცია">
        <span className="scroll-label">დამატებით</span>
        <div className="scroll-pill">
          <ChevronDown size={13} className="scroll-chevron" />
        </div>
      </button>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@400;500;600;700;800;900&display=swap');

        /* ══════════════════════════════════ ROOT ══════════════════════════════════ */
        .hero-root {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          color: #fff;
          font-family: 'Noto Sans Georgian', system-ui, sans-serif;
        }

        /* ═══════════════════════════ SLIDESHOW (Rich Dark Tones) ═══════════════════ */
        .slides-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          will-change: opacity;
          transition: opacity 1.1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .slide--active { opacity: 1; z-index: 2; }
        .slide--prev   { opacity: 0; z-index: 1; }

        .slide-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          animation: kenBurns 6s ease-out forwards;
        }
        .slide--prev .slide-img { animation: none; }

        /* Deep elegance overlay – royal blue & teal mix */
        .slide-overlay {
          position: absolute; inset: 0; z-index: 10;
          background: linear-gradient(
            125deg,
            rgba(2, 10, 30, 0.68) 0%,
            rgba(6, 28, 58, 0.45) 30%,
            rgba(2, 15, 40, 0.55) 70%,
            rgba(0, 20, 45, 0.85) 100%
          );
        }
        .slide-vignette {
          position: absolute; inset: 0; z-index: 11;
          background: radial-gradient(ellipse at 30% 40%, transparent 35%, rgba(0, 5, 20, 0.65) 90%);
        }

        /* ══════════════════════════════ INNER CONTENT ═════════════════════════════ */
        .hero-inner {
          position: relative;
          z-index: 20;
          flex: 1;
          display: flex;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          padding: clamp(100px, 12vw, 140px) clamp(20px, 6vw, 64px) clamp(80px, 10vw, 100px);
        }

        /* ═══════════════════════════ STAGGERED ANIMATIONS ═══════════════════════════ */
        .anim-item {
          opacity: 0;
          transform: translateY(40px) scale(0.96);
          transition: 
            opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .anim-item.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Staggered delays for each element */
        .anim-1 { transition-delay: 0.1s; }
        .anim-2 { transition-delay: 0.25s; }
        .anim-3 { transition-delay: 0.4s; }
        .anim-4 { transition-delay: 0.55s; }
        .anim-5 { transition-delay: 0.65s; }
        .anim-6 { transition-delay: 0.75s; }
        .anim-7 { transition-delay: 0.9s; }
        .anim-8 { transition-delay: 1.0s; }
        .anim-9 { transition-delay: 1.15s; }
        .anim-10 { transition-delay: 1.3s; }
        .anim-11 { transition-delay: 1.4s; }
        .anim-12 { transition-delay: 1.5s; }

        /* Special entrance for badges - slide from left */
        .anim-1 {
          transform: translateX(-30px) translateY(20px);
        }
        .anim-1.visible {
          transform: translateX(0) translateY(0);
        }

        /* Heading - scale up effect */
        .anim-2 {
          transform: translateY(50px) scale(0.92);
        }
        .anim-2.visible {
          transform: translateY(0) scale(1);
        }

        /* Buttons - subtle bounce */
        .anim-4, .anim-5, .anim-6 {
          transform: translateY(30px) scale(0.9);
        }
        .anim-4.visible, .anim-5.visible, .anim-6.visible {
          transform: translateY(0) scale(1);
        }

        /* Info badges - slide from sides */
        .anim-8 {
          transform: translateX(-40px) translateY(20px);
        }
        .anim-8.visible {
          transform: translateX(0) translateY(0);
        }
        .anim-9 {
          transform: translateX(40px) translateY(20px);
        }
        .anim-9.visible {
          transform: translateX(0) translateY(0);
        }

        /* Bottom elements - fade up from bottom */
        .anim-10, .anim-11, .anim-12 {
          transform: translateY(25px);
        }
        .anim-10.visible, .anim-11.visible, .anim-12.visible {
          transform: translateY(0);
        }

        /* Underline draw animation */
        .underline-path {
          stroke-dasharray: 340;
          stroke-dashoffset: 340;
          transition: stroke-dashoffset 1.2s ease-out;
          transition-delay: 0.8s;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
        }
        .draw-visible .underline-path {
          stroke-dashoffset: 0;
        }

        .hero-content {
          max-width: 720px;
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.5vw, 26px);
        }

        /* ✦ Badge – luminous gold border */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          border-radius: 999px;
          background: rgba(15, 35, 80, 0.55);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(251, 191, 36, 0.55);
          font-size: clamp(10px, 1.4vw, 13px);
          font-weight: 600;
          color: #ffffff;
          width: fit-content;
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }
        .badge-icon { color: #FBBF24; flex-shrink: 0; }
        .badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #FBBF24;
          animation: pulse 2s infinite;
          flex-shrink: 0;
        }

        /* ✦ Heading with glossy text shine */
        .hero-heading {
          font-size: clamp(2.2rem, 5vw, 4.6rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0;
          text-shadow: 0 3px 24px rgba(0, 0, 0, 0.4);
        }
        .heading-accent {
          position: relative;
          display: inline-block;
          background: linear-gradient(135deg, #FBBF24 20%, #F59E0B 80%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-shadow: none;
        }
        .underline-svg {
          position: absolute;
          bottom: -9px; left: 0;
          width: 100%;
          overflow: visible;
        }

        /* ✦ Body text – softer glow */
        .hero-body {
          font-size: clamp(0.9rem, 1.8vw, 1.1rem);
          font-weight: 450;
          color: rgba(255, 255, 255, 0.92);
          line-height: 1.75;
          max-width: 580px;
          margin: 0;
          text-shadow: 0 1px 6px rgba(0,0,0,0.2); 
        }

        /* ✦ Buttons – rich gold & glass */
        .btn-row { display: flex; flex-wrap: wrap; gap: 12px; }
        .btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: clamp(10px, 2vw, 14px) clamp(18px, 3vw, 28px);
          border-radius: 44px;
          font-size: clamp(0.75rem, 1.5vw, 0.88rem);
          font-weight: 700;
          cursor: pointer;
          border: none;
          overflow: hidden;
          white-space: nowrap;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .btn:hover  { transform: translateY(-3px); }
        .btn:active { transform: translateY(1px); }

        .btn-primary {
          background: linear-gradient(105deg, #0066CC 0%, #004C99 35%, #004C99 100%);
          color: #fff;
          box-shadow: 0 4px 20px #3B82F640;
        }
        .btn-primary:hover { box-shadow: 0 8px 28px #004C99; }
        .btn-shine {
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,245,200,0.6) 48%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .btn-primary:hover .btn-shine { transform: translateX(100%); }
        .btn-arrow { transition: transform 0.2s ease; }
        .btn-primary:hover .btn-arrow { transform: translateX(5px); }

        .btn-glass {
          background: rgba(10, 30, 65, 0.55);
          color: #fff;
          border: 1.2px solid rgba(251, 191, 36, 0.6);
          backdrop-filter: blur(12px);
        }
        .btn-glass:hover {
          background: rgba(25, 55, 110, 0.8);
          border-color: #FBBF24;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        /* ✦ Trust chips – shiny elegance */
        .trust-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 4px; }

        @media (max-width:1024px){
          .trust-chips { display: none; }
        }

        .chip {
          padding: 6px 14px;
          border-radius: 40px;
          background: rgba(16,100,60,.45);
          border: 1px solid rgba(52,211,153,.55);
          box-shadow: 0 4px 14px rgba(16,185,129,.2), inset 0 1px 0 rgba(110,231,183,.2);
          color: #A7F3D0;
          font-size: clamp(10px, 1.3vw, 12px);
          font-weight: 600;
          backdrop-filter: blur(8px);
          letter-spacing: 0.3px;
        }

        /* ✦ Info badges – floating with depth */
        .info-badges { display: flex; flex-wrap: wrap; gap: 15px; margin-top: 6px; }
        .info-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 20px 10px 16px;
          border-radius: 28px;
          background: rgba(10, 28, 60, 0.55);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(251, 191, 36, 0.4);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.3);
        }
        .float-a { animation: floatBadge 4.2s ease-in-out infinite; animation-delay: 1.5s; }
        .float-b { animation: floatBadge 4.2s 1.8s ease-in-out infinite; animation-delay: 1.8s; }

        .info-badge-icon {
          width: 38px; height: 38px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .amber-icon { background: linear-gradient(145deg, #FBBF24, #EAB308); box-shadow: 0 4px 10px rgba(251,191,36,0.4); }
        .blue-icon  { background: linear-gradient(135deg, #3B82F6, #1E3A8A); box-shadow: 0 4px 10px rgba(59,130,246,0.3); }
        .info-badge-title {
          font-size: clamp(12px, 1.5vw, 14px);
          font-weight: 800; color: #fff;
          white-space: nowrap;
        }
        .info-badge-sub {
          font-size: clamp(9px, 1.1vw, 11px);
          color: #FFE6B3;
          white-space: nowrap;
        }

        /* ════════════════════════════ DOTS & COUNTER ════════════════════════════ */
        .slide-controls {
          position: absolute;
          bottom: clamp(56px, 8vw, 80px);
          left: 50%;
          transform: translateX(-50%);
          z-index: 30;
        }
        .dots { display: flex; gap: 10px; align-items: center; }
        .dot {
          position: relative;
          width: 32px; height: 3px;
          border-radius: 4px;
          background: rgba(255,255,240,0.35);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .dot--active {
          width: 56px;
          background: rgba(251,191,36,0.7);
        }
        .dot-fill {
          position: absolute;
          top: 0; left: 0;
          height: 100%;
          width: 0%;
          background: #FBBF24;
          border-radius: 4px;
          animation: fillBar linear forwards;
        }

        .slide-counter {
          position: absolute;
          bottom: clamp(54px, 8vw, 78px);
          right: clamp(20px, 6vw, 70px);
          z-index: 30;
          display: flex;
          align-items: baseline;
          gap: 3px;
          background: rgba(0,0,0,0.25);
          backdrop-filter: blur(8px);
          padding: 5px 12px;
          border-radius: 60px;
          font-weight: 600;
        }
        .counter-cur   { font-size: 22px; color: #FBBF24; font-weight: 700; }
        .counter-sep   { font-size: 14px; color: #fff; }
        .counter-total { font-size: 14px; color: rgba(255,255,255,0.7); }

        /* ═══════════════════════════ SCROLL HINT ═══════════════════════════ */
        .scroll-hint {
          position: relative; z-index: 30;
          margin: 0 auto clamp(16px, 3vw, 28px);
          display: flex; flex-direction: column;
          align-items: center; gap: 6px;
          background: none; border: none;
          cursor: pointer;
          color: rgba(255,255,235,0.7);
          transition: all 0.25s ease;
        }
        .scroll-hint:hover { color: #FBBF24; transform: translateY(-2px); }
        .scroll-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .scroll-pill {
          width: 24px; height: 38px;
          border-radius: 100px;
          border: 1.8px solid currentColor;
          display: flex; align-items: flex-start;
          justify-content: center; padding-top: 7px;
        }
        .scroll-chevron { animation: bounce 1.5s ease-in-out infinite; }

        /* ══════════════════════════════ VERY SMALL SCREENS (max-width: 415px) ══════════════════════════════ */
        @media (max-width: 415px) {
          .hero-inner {
            padding: clamp(70px, 15vw, 90px) 16px clamp(60px, 8vw, 70px);
          }
          .hero-content {
            gap: 14px;
          }
          .badge {
            padding: 5px 12px;
            gap: 6px;
            font-size: 9px;
          }
          .badge-icon { width: 10px; height: 10px; }
          .badge-dot { width: 5px; height: 5px; }
          .hero-heading {
            font-size: 2rem;
            line-height: 1.2;
          }
          .underline-svg {
            bottom: -5px;
          }
          .underline-path {
            stroke-width: 2.5;
          }
          .hero-body {
            font-size: 0.8rem;
            line-height: 1.6;
          }
          .btn-row {
            gap: 8px;
          }
          .btn {
            padding: 8px 14px;
            font-size: 0.7rem;
            white-space: normal;
            text-align: center;
            line-height: 1.3;
            gap: 6px;
          }
          .btn-arrow { width: 12px; }
          .info-badges {
            gap: 10px;
            margin-top: 8px;
          }
          .info-badge {
            padding: 6px 12px;
            gap: 8px;
          }
          .info-badge-icon {
            width: 28px;
            height: 28px;
          }
          .info-badge-icon svg {
            width: 12px;
            height: 12px;
          }
          .info-badge-title {
            font-size: 10px;
            white-space: normal;
            line-height: 1.2;
          }
          .info-badge-sub {
            font-size: 8px;
            white-space: normal;
          }
          .dots {
            gap: 6px;
          }
          .dot {
            width: 20px;
            height: 2px;
          }
          .dot--active {
            width: 34px;
          }
          .slide-counter {
            bottom: 48px;
            right: 12px;
            padding: 3px 8px;
          }
          .counter-cur { font-size: 16px; }
          .counter-sep, .counter-total { font-size: 11px; }
          .slide-controls {
            bottom: 48px;
          }
          .scroll-hint {
            margin-bottom: 12px;
          }
          .scroll-pill {
            width: 20px;
            height: 32px;
            padding-top: 5px;
          }
          .scroll-chevron { width: 10px; height: 10px; }
          .scroll-label {
            font-size: 8px;
          }
        }

        /* ══════════════════════════════ ULTRA SMALL SCREENS (max-width: 345px) ══════════════════════════════ */
        @media (max-width: 345px) {
          .hero-inner {
            padding: 60px 12px 50px;
          }
          .hero-content {
            gap: 10px;
          }
          .badge {
            padding: 4px 10px;
            gap: 5px;
            font-size: 8px;
          }
          .badge-icon { width: 9px; height: 9px; }
          .badge-dot { width: 4px; height: 4px; }
          .hero-heading {
            font-size: 1.6rem;
            line-height: 1.25;
          }
          .underline-svg {
            bottom: -3px;
          }
          .underline-path {
            stroke-width: 2;
          }
          .hero-body {
            font-size: 0.7rem;
            line-height: 1.5;
          }
          .btn-row {
            gap: 6px;
          }
          .btn {
            padding: 6px 10px;
            font-size: 0.65rem;
            gap: 4px;
          }
          .btn-arrow { width: 10px; }
          .info-badges {
            gap: 8px;
            margin-top: 4px;
            flex-direction: column;
            align-items: stretch;
          }
          .info-badge {
            padding: 5px 10px;
            gap: 6px;
            width: 100%;
          }
          .info-badge-icon {
            width: 24px;
            height: 24px;
          }
          .info-badge-icon svg {
            width: 10px;
            height: 10px;
          }
          .info-badge-title {
            font-size: 9px;
          }
          .info-badge-sub {
            font-size: 7px;
          }
          .dots {
            gap: 4px;
          }
          .dot {
            width: 16px;
            height: 2px;
          }
          .dot--active {
            width: 28px;
          }
          .slide-counter {
            bottom: 40px;
            right: 8px;
            padding: 2px 6px;
          }
          .counter-cur { font-size: 13px; }
          .counter-sep, .counter-total { font-size: 9px; }
          .slide-controls {
            bottom: 40px;
          }
          .scroll-hint {
            margin-bottom: 8px;
            gap: 4px;
          }
          .scroll-pill {
            width: 18px;
            height: 28px;
            padding-top: 4px;
          }
          .scroll-chevron { width: 8px; height: 8px; }
          .scroll-label {
            font-size: 7px;
          }
        }

        /* ═══════════════════════ KEYFRAMES (Smooth & Premium) ═══════════════════ */
        @keyframes kenBurns {
          from { transform: scale(1.08); }
          to   { transform: scale(1); }
        }
        @keyframes fillBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes floatBadge {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-8px); }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%     { opacity: 0.4; transform: scale(1.2); }
        }
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(6px); }
        }

        /* ══════════════════════ REDUCED MOTION ══════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .slide-img, .float-a, .float-b,
          .scroll-chevron, .badge-dot,
          .underline-path, .dot-fill { animation: none !important; }
          .slide { transition: opacity 0.2s ease; }
          .btn, .btn-primary, .info-badge { transition: none; }
          .anim-item { 
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }

        /* ══════════════════════ RESPONSIVE MICRO-FIXES (existing) ══════════════════════ */
        @media (max-width: 640px) {
          .btn-glass { white-space: normal; padding: 10px 16px; }
          .info-badge { padding: 6px 14px; gap: 8px; }
          .info-badge-icon { width: 30px; height: 30px; }
          .slide-counter { bottom: 54px; }
          .slide-controls { bottom: 54px; }
        }
      `}</style>
    </section>
  );
}
