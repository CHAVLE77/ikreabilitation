import { useCallback, useEffect, useRef, useState } from "react";
import team1 from "/team1.webp";
import team2 from "/team2.webp";
import team3 from "/team3.webp";

/* ─────────────────────────── ICONS ─────────────────────────── */
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowLeft = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const PhoneIcon = () => ( 
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.28 5.18 2 2 0 015.27 3h3.09a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 11.09a16 16 0 006.83 6.83l1.61-1.61a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg> 
);

/* ─────────────────────────── DATA ─────────────────────────── */
const teamData = [
  {
    id: 1,
    name: "ირმა ხვიჩია",
    role: "ნევროლოგი",
    experience: "26 წელი",
    sessions: "1,200+",
    rating: 5.0,
    specialty: "ბავშვთა ნევროლოგია",
    certs: ["ნევროლოგიის სერტიფიკატი", "ბავშვთა ნევროლოგიის ტრენინგი", "EEG დიაგნოსტიკა"],
    bio: "ირმა ხვიჩია არის ბავშვთა ნევროლოგი, რომელიც ეხმარება პაციენტებს ნერვული სისტემის დარღვევების დიაგნოსტიკასა და მართვაში.",
    fullBio:
      "26 წლიანი გამოცდილებით, ირმა ხვიჩია მუშაობს ბავშვთა ნევროლოგიური მდგომარეობების შეფასებაზე, დიაგნოსტიკასა და ინდივიდუალური მკურნალობის დაგეგმვაზე.",
    image: team1,
    color: "#3A7BD5",
    colorRgb: "58,123,213",
  },
  {
    id: 2,
    name: "გია მელიქიშვილი",
    role: "ეპილეფტოლოგი",
    experience: "10 წელი",
    sessions: "2,000+",
    rating: 5.0,
    specialty: "ეპილეფსიური და კრუნჩხვითი დარღვევების დიაგნოსტიკა და მკურნალობა",
    certs: ["ნევროლოგიის სერტიფიკატი", "EEG დიაგნოსტიკის ტრენინგი", "ეპილეფტოლოგიის სპეციალიზაცია"],
    bio: "გია მელიქიშვილი სპეციალიზდება ეპილეფსიისა და კრუნჩხვითი დარღვევების მართვაში. პაციენტებს ეხმარება ზუსტი დიაგნოსტიკისა და ინდივიდუალური მკურნალობის დაგეგმვაში.",
    fullBio:
      "10 წლიანი გამოცდილებით, გია მელიქიშვილი მუშაობს ეპილეფსიის სხვადასხვა ფორმის დიაგნოსტიკასა და მკურნალობაზე. მისი მიმართულებები მოიცავს EEG კვლევების შეფასებას, კრუნჩხვითი ეპიზოდების მართვას და თანამედროვე თერაპიული მიდგომების გამოყენებას.",
    image: team2,
    color: "#1B6FD4",
    colorRgb: "27,111,212",
  },
  {
    id: 3,
    name: "ლევან ჩიკვატია",
    role: "ორთოპედ-ტრავმატოლოგი",
    experience: "6 წელი",
    sessions: "900+",
    rating: 5.0,
    specialty: "ძვალ-სახსროვანი სისტემის დიაგნოსტიკა და მკურნალობა",
    certs: ["ორთოპედია-ტრავმატოლოგიის სერტიფიკატი", "სახსრების ქირურგიის ტრენინგი", "ბავშვთა ორთოპედიის კურსი"],
    bio: "ლევან ჩიკვატია არის ორთოპედ-ტრავმატოლოგი, რომელიც ეხმარება პაციენტებს ძვალ-სახსროვანი პრობლემების დიაგნოსტიკასა და მკურნალობაში.",
    fullBio:
      "6 წლიანი გამოცდილებით, ლევან ჩიკვატია მუშაობს ტრავმების, ხერხემლისა და სახსრების პრობლემების შეფასებასა და მკურნალობაზე. მისი მიზანია პაციენტებისთვის უსაფრთხო და ეფექტური მკურნალობის გზების შერჩევა.",
    image: team3,
    color: "#2B4A8A",
    colorRgb: "43,74,138",
  },
];

/* ─────────────────── RATING STARS ─────────────────── */
function RatingStars({ rating, tone = "dark" }) {
  return (
    <div className={`tm-stars ${tone === "light" ? "stars-light" : ""}`}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="tm-star"
          style={{ "--sd": `${i * 0.07}s`, opacity: i < Math.floor(rating) ? 1 : 0.22 }}
        >
          <StarIcon />
        </span>
      ))}
      <span className="tm-star-val">{rating.toFixed(1)}</span>
    </div>
  );
}

/* ─────────────────── PROFILE MODAL ─────────────────── */
function ProfileModal({ person, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    document.body.style.overflow = "hidden";
    const esc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", esc);
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  return (
    <div
      className={`pm-backdrop ${mounted ? "is-open" : ""}`}
      onClick={onClose}
      style={{ "--pc": person.color, "--pcr": person.colorRgb }}
    >
      <div className="pm-box" role="dialog" aria-modal="true" aria-label={person.name} onClick={(e) => e.stopPropagation()}>
        <div className="pm-photo">
          <img src={person.image} alt={person.name} className="pm-photo-img" />
          <div className="pm-photo-grad" />
          <div className="pm-photo-info">
            <span className="pm-specialty pm-stg" style={{ "--d": "0.14s" }}>
              {person.specialty}
            </span>
            <h2 className="pm-name pm-stg" style={{ "--d": "0.19s" }}>
              {person.name}
            </h2>
            <div className="pm-stats pm-stg" style={{ "--d": "0.24s" }}>
              <div className="pm-stat">
                <span className="pm-stat-num">{person.experience}</span>
                <span className="pm-stat-lbl">გამოცდ.</span>
              </div>
              <span className="pm-stat-div" />
              <div className="pm-stat">
                <span className="pm-stat-num">{person.sessions}</span>
                <span className="pm-stat-lbl">სეანსი</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="pm-close" aria-label="დახურვა">
            <CloseIcon />
          </button>
        </div>

        <div className="pm-content">
          <div className="pm-role pm-stg" style={{ "--d": "0.2s" }}>
            {person.role}
          </div>
          <div className="pm-stg" style={{ "--d": "0.25s" }}>
            <RatingStars rating={person.rating} />
          </div>
          <p className="pm-bio pm-stg" style={{ "--d": "0.3s" }}>
            {person.fullBio}
          </p>

          <div className="pm-certs-label pm-stg" style={{ "--d": "0.35s" }}>
            კვალიფიკაცია
          </div>
          <div className="pm-certs">
            {person.certs.map((c, i) => (
              <div key={c} className="pm-cert pm-stg" style={{ "--d": `${0.4 + i * 0.07}s` }}>
                <span className="pm-cert-icon">
                  <CheckIcon />
                </span>
                <span className="pm-cert-text">{c}</span>
              </div>
            ))}
          </div>

          <div className="pm-actions pm-stg" style={{ "--d": "0.62s" }}>
            <button
              className="pm-primary"
              onClick={() => {
                sessionStorage.setItem("selectedSpecialist", person.name);
                onClose();
                const contactEl = document.getElementById("contact");
                if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <PhoneIcon /> კონსულტაციის ჩაწერა
            </button>
            <button onClick={onClose} className="pm-secondary">
              <ArrowLeft size={13} /> უკან
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── TEAM CARD ─────────────────── */
function TeamCard({
  person,
  idx,
  isVisible,
  flipped,
  setFlipped,
  onOpenModal,
}) {
  const shellRef = useRef(null);
  const isFlipped = flipped === idx;
  const overActionsRef = useRef(false);

  const resetTilt = useCallback(() => {
    const el = shellRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  const onMove = useCallback(
    (e) => {
      if (isFlipped || overActionsRef.current) return;
      const el = shellRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--rx", `${(0.5 - py) * 8}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * 10}deg`);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    },
    [isFlipped],
  );

  const onLeave = useCallback(() => {
    overActionsRef.current = false;
    resetTilt();
  }, [resetTilt]);

  const onActionsEnter = useCallback(() => {
    overActionsRef.current = true;
    resetTilt();
  }, [resetTilt]);

  const onActionsLeave = useCallback(() => {
    overActionsRef.current = false;
  }, []);

  return (
    <div
      className={`tm-card ${isVisible ? "card-in" : ""} ${isFlipped ? "is-flipped" : ""}`}
      style={{
        "--pc": person.color,
        "--pcr": person.colorRgb,
        transitionDelay: `${(idx % 3) * 0.13}s`,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="card-scene" ref={shellRef}>
        {/* ── FRONT ── */}
        <div className="card-face front">
          <span className="card-glow" aria-hidden />
          <div className="photo-area">
  <img
    src={person.image}
    srcSet={`${person.image.replace('.webp', '')}-470.webp 470w, ${person.image} 720w`}
    sizes="(max-width: 640px) 100vw, 470px"
    alt={person.name}
    loading="lazy"
    className="photo-img"
    width="720"
    height="1120"
  />
            <span className="photo-tint" aria-hidden />
            <div className="overlay-gradient" />
            <span className="photo-sheen" aria-hidden />
            <div className="overlay-content">
              <span className="overlay-role">{person.role}</span>
              <h3 className="overlay-name">{person.name}</h3>
              <div className="overlay-stats">
                <span>{person.experience}</span>
                <span className="dot-sep">•</span>
                <span>{person.sessions}</span>
              </div>
            </div>
          </div>

          <div className="front-panel">
            <span className="role-tag">{person.role}</span>
            <h3 className="person-name">{person.name}</h3>
            <p className="person-bio">{person.bio}</p>

            <div className="certs-list">
              {person.certs.slice(0, 2).map((c, i) => (
                <div key={c} className="cert-row" style={{ "--cd": `${0.06 + i * 0.06}s` }}>
                  <span className="cert-icon">
                    <CheckIcon />
                  </span>
                  <span className="cert-text">{c}</span>
                </div>
              ))}
            </div>

            <div
              className="front-actions"
              onMouseEnter={onActionsEnter}
              onMouseLeave={onActionsLeave}
            >
              <button type="button" className="act-btn act-ghost" onClick={() => setFlipped(isFlipped ? null : idx)}>
                <span>გამოცდილება</span>
                <ArrowRight />
              </button>
              <button type="button" className="act-btn act-solid" onClick={() => onOpenModal(person)}>
                <span>სრული პროფილი</span>
                <ArrowRight />
              </button>
            </div>
          </div>

          <span className="top-bar" />
        </div>

        {/* ── BACK ── */}
        <div className="card-face back">
          <div className="back-photo-bg">
            <img src={person.image} alt="" aria-hidden className="back-bg-img" />
            <div className="back-bg-mask" />
          </div>

          {/* ყოველთვის ხელმისაწვდომი "უკან" ღილაკი */}
          <button
            type="button"
            className="back-nav"
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(null);
            }}
          >
            <ArrowLeft size={12} /> <span>უკან</span>
          </button>

          <div className="back-body">
            <div className="back-ring">
              <img src={person.image} alt={person.name} className="back-avatar-img" />
              <span className="ring-border" />
            </div>
            <h3 className="back-name">{person.name}</h3>
            <span className="back-role-tag">{person.role}</span>
            <RatingStars rating={person.rating} tone="light" />

            <div className="back-certs">
              <p className="back-certs-label">კვალიფიკაცია</p>
              {person.certs.map((c) => (
                <div key={c} className="back-cert-item">
                  <span className="bci-check">
                    <CheckIcon />
                  </span>
                  <span>{c}</span>
                </div>
              ))}
            </div>

            <p className="back-bio">{person.fullBio}</p>

            <button
              type="button"
              className="back-profile-btn"
              onClick={(e) => {
                e.stopPropagation();
                setFlipped(null);
                onOpenModal(person);
              }}
            >
              <span>სრული პროფილი</span>
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── MAIN COMPONENT ─────────────────── */
const Team = ({ preview = false }) => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [flipped, setFlipped] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [headerIn, setHeaderIn] = useState(false);
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);

  const displayed = preview ? teamData.slice(0, 3) : teamData;

  useEffect(() => {
    const hObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setHeaderIn(true);
      },
      { threshold: 0.12 },
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    cardRefs.current.forEach((c) => c && cObs.observe(c));
    return () => {
      hObs.disconnect();
      cObs.disconnect();
    };
  }, [displayed.length]);

  return (
    <section id="team" className="tm-section" ref={sectionRef}>
      <span className="tm-noise" aria-hidden />
      <span className="tm-aura tm-aura-1" aria-hidden />
      <span className="tm-aura tm-aura-2" aria-hidden />

      <div className="tm-container">
        <div className={`tm-header ${headerIn ? "hdr-in" : ""}`}>
          <span className="tm-badge">
            <span className="badge-pulse" />
            ჩვენი სპეციალისტები
          </span>
          <h2 className="tm-title">
            გუნდი, რომელსაც
            <br />
            <span className="title-em">ენდობიან ოჯახები</span>
          </h2>
          <p className="tm-subtitle">
            გამოცდილი, სერტიფიცირებული და გულწრფელი — ჩვენი სპეციალისტები ყოველ ბავშვს პირადად იცნობენ.
          </p>
        </div>

        <div className="tm-grid">
          {displayed.map((person, idx) => (
            <div
              key={person.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="grid-item"
            >
              <TeamCard
                person={person}
                idx={idx}
                isVisible={visibleCards.has(idx)}
                flipped={flipped}
                setFlipped={setFlipped}
                onOpenModal={setActiveModal}
              />
            </div>
          ))}
        </div>

        <div className={`tm-cta-wrap ${headerIn ? "hdr-in" : ""}`}>
          <a href="/team" className="tm-main-btn solid">
            <span>იხილეთ მეტი</span>
            <span className="main-btn-arr">
              <ArrowRight />
            </span>
          </a>
        </div>
      </div>

      {activeModal && <ProfileModal person={activeModal} onClose={() => setActiveModal(null)} />}

      <style>{`
        .tm-section {
          --cream: #F5F0E8;
          --navy: #1B2A4A;
          --blue-mid: #2B4A8A;
          --accent: #2885ef;
          --text-body: #3A3A3A;
          --text-muted: #7A7A8C;
          background: var(--cream);
          padding: 6.5rem 1.5rem 5.5rem;
          font-family: 'Noto Sans Georgian', system-ui, sans-serif;
          position: relative; overflow: hidden;
        }
        .tm-noise {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
        }
        .tm-aura {
          position: absolute; border-radius: 50%; filter: blur(100px);
          pointer-events: none; z-index: 0;
        }
        button{
          cursor:pointer;
          }
        .tm-aura-1 {
          width: 520px; height: 520px; top: -160px; left: -120px;
          background: rgba(40,133,239,0.10);
          animation: aura-drift 20s ease-in-out infinite;
        }
        .tm-aura-2 {
          width: 460px; height: 460px; bottom: -180px; right: -100px;
          background: rgba(43,74,138,0.09);
          animation: aura-drift 26s ease-in-out infinite reverse;
        }
        @keyframes aura-drift {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50%     { transform: translate3d(40px,30px,0) scale(1.1); }
        }

        .tm-container { max-width: 1220px; margin: 0 auto; position: relative; z-index: 1; }

        /* Header */
        .tm-header {
          text-align: center; margin-bottom: 4rem;
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .tm-header.hdr-in { opacity: 1; transform: none; }

        .tm-badge {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-size: 0.67rem; font-weight: 700; letter-spacing: 0.13em;
          text-transform: uppercase; color: var(--accent);
          background: rgba(40,133,239,0.09); border: 1px solid rgba(40,133,239,0.18);
          padding: 0.35rem 1rem 0.35rem 0.75rem; border-radius: 40px; margin-bottom: 1.1rem;
        }
        .badge-pulse {
          width: 7px; height: 7px; border-radius: 50%; background: var(--accent);
          animation: pulse-anim 2.4s ease infinite;
        }
        @keyframes pulse-anim {
          0%   { box-shadow: 0 0 0 0 rgba(40,133,239,0.5); }
          70%  { box-shadow: 0 0 0 8px rgba(40,133,239,0); }
          100% { box-shadow: 0 0 0 0 rgba(40,133,239,0); }
        }

        .tm-title {
          font-size: clamp(2rem, 4.5vw, 3.2rem); font-weight: 900;
          color: var(--navy); line-height: 1.18; letter-spacing: -0.025em; margin: 0 0 0.85rem;
        }
        .title-em { color: var(--blue-mid); position: relative; display: inline-block; }
        .title-em::after {
          content: ''; position: absolute; bottom: 0.06em; left: 0;
          width: 100%; height: 0.13em; background: var(--accent);
          opacity: 0.4; border-radius: 2px;
          transform: scaleX(0); transform-origin: left;
          transition: transform 1s cubic-bezier(0.22,1,0.36,1) 0.4s;
        }
        .tm-header.hdr-in .title-em::after { transform: scaleX(1); }
        .tm-subtitle {
          font-size: 1rem; color: var(--text-muted);
          max-width: 560px; margin: 0 auto; line-height: 1.65;
        }

        /* Grid */
        .tm-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 2rem; margin-bottom: 3.5rem; justify-content: center;
        }
        .grid-item { display: flex; justify-content: center; align-items: start; width: 100%; }

        /* Card shell */
        .tm-card {
          --pc: #2885ef; --pcr: 40,133,239; --rx: 0deg; --ry: 0deg; --mx: 50%; --my: 50%;
          perspective: 1400px;
          width: 100%; max-width: 360px; height: 560px;
          opacity: 0; transform: translateY(54px) scale(0.96);
          transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);
          will-change: transform, opacity;
        }
        .tm-card.card-in { opacity: 1; transform: none; }

        .card-scene {
          position: relative; width: 100%; height: 100%;
          transform-style: preserve-3d;
          transform: rotateX(var(--rx)) rotateY(var(--ry));
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .tm-card.is-flipped .card-scene { transform: rotateY(180deg); }

        /* ფლიპისას წინა (ვიზუალურად დამალული) გვერდი აღარ იჭერდეს click/hover-ს —
           ეს ასწორებს "უკან" ღილაკის non-clickable ბაგს დესკტოპზე */
        .tm-card.is-flipped .card-face.front,
.tm-card.is-flipped .front-panel,
.tm-card.is-flipped .front-actions {
  pointer-events: none !important;
}
.card-face.back { pointer-events: auto; }

        .card-face {
          position: absolute; inset: 0;
          border-radius: 1.6rem; overflow: hidden;
          backface-visibility: hidden; -webkit-backface-visibility: hidden;
          background: #fff;
          box-shadow:
            0 0 0 1px rgba(147,197,253,0.25),
            0 0 20px rgba(64,140,255,0.15),
            0 20px 55px -20px rgba(27,42,74,0.30);
          transition: box-shadow 0.45s ease;
        }
        .tm-card:hover .card-face.front {
          box-shadow:
            0 0 0 1.5px rgba(var(--pcr),0.5),
            0 0 0 4px rgba(var(--pcr),0.08),
            0 0 40px rgba(var(--pcr),0.35),
            0 40px 70px -28px rgba(27,42,74,0.40);
        }
        .card-glow {
          position: absolute; inset: 0; z-index: 6; pointer-events: none; opacity: 0;
          background: radial-gradient(340px circle at var(--mx) var(--my), rgba(var(--pcr),0.12), transparent 62%);
          transition: opacity 0.4s ease;
        }
        .tm-card:hover .card-glow { opacity: 1; }

        .top-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 4px; z-index: 7;
          pointer-events: none;
          background: linear-gradient(90deg, var(--pc), rgba(var(--pcr),0.25));
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
        }
        .tm-card:hover .top-bar { transform: scaleX(1); }

        /* Photo */
        .photo-area { position: absolute; inset: 0; overflow: hidden; }
        .photo-img {
          width: 100%; height: 100%; object-fit: cover; object-position: top center;
          transition: transform 1.1s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease;
        }
        .tm-card:hover .photo-img { transform: scale(1.06) translateY(-1.5%); filter: saturate(1.05); }

        /* მსუბუქი მუქი ტონი მთელ ფოტოზე — ნაგულისხმევად გამორთული, ირთვება მობილურზე */
        .photo-tint {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: rgba(3,13,26,0);
          transition: background 0.3s ease;
        }

        .overlay-gradient {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(180deg, rgba(3,13,26,0) 25%, rgba(3,13,26,0.45) 55%, rgba(3,13,26,0.92) 100%);
          transition: opacity 0.5s ease, background 0.3s ease;
        }
        .photo-sheen {
          position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%);
          transform: translateX(-120%);
        }
        .tm-card:hover .photo-sheen { animation: tm-sheen 1s cubic-bezier(0.22,1,0.36,1); }
        @keyframes tm-sheen { to { transform: translateX(120%); } }

        .overlay-content {
          position: absolute; left: 0; right: 0; bottom: 0; z-index: 4;
          padding: 1.8rem 1.5rem 1.7rem;
          pointer-events: none;
          transition: opacity 0.4s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1);
        }
        .tm-card:hover .overlay-content { opacity: 0; transform: translateY(20px); }
        .overlay-role {
          display: inline-block; font-size: 0.6rem; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase; color: #fff;
          background: rgba(var(--pcr),0.85); padding: 0.24rem 0.75rem;
          border-radius: 40px; margin-bottom: 0.5rem;
        }
        .overlay-name {
          font-size: 1.3rem; font-weight: 900; color: #fff; margin: 0 0 0.35rem;
          letter-spacing: -0.02em; text-shadow: 0 2px 18px rgba(0,0,0,0.4);
        }
        .overlay-stats {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.74rem; font-weight: 600; color: rgba(255,255,255,0.8);
        }
        .dot-sep { color: rgba(255,255,255,0.4); }

        /* Front hover panel — desktop only (>1024px), see media query below for touch devices */
        .front-panel {
          position: absolute; inset: 0; z-index: 5;
          display: flex; flex-direction: column; gap: 0.5rem;
          padding: 1.5rem 1.4rem 1.4rem;
          justify-content: flex-end;
          background: linear-gradient(180deg, rgba(4,12,24,0.3) 0%, rgba(4,12,24,0.7) 30%, rgba(2,8,18,0.97) 100%);
          backdrop-filter: blur(4px);
          opacity: 0; transform: translateY(18px);
          transition: opacity 0.45s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
        }
        .tm-card:hover .front-panel { opacity: 1; transform: none; pointer-events: auto; }

        .role-tag {
          align-self: flex-start; font-size: 0.58rem; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase; color: #fff;
          background: rgba(var(--pcr),0.95); padding: 0.24rem 0.8rem; border-radius: 40px;
          box-shadow: 0 4px 14px -4px rgba(var(--pcr),0.5);
        }
        .person-name {
          font-size: 1.2rem; font-weight: 900; color: #fff; margin: 0;
          letter-spacing: -0.02em; line-height: 1.2;
          text-shadow: 0 2px 12px rgba(0,0,0,0.5);
        }
        .person-bio {
          font-size: 0.78rem; line-height: 1.5; color: rgba(255,255,255,0.85); margin: 0;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden;
          text-shadow: 0 1px 8px rgba(0,0,0,0.3);
        }

        .certs-list { display: flex; flex-direction: column; gap: 0.25rem; margin-top: 0.05rem; }
        .cert-row {
          display: flex; align-items: flex-start; gap: 0.5rem;
          font-size: 0.7rem; color: rgba(255,255,255,0.9);
          opacity: 0; transform: translateX(-10px);
          transition: opacity 0.4s ease var(--cd), transform 0.4s cubic-bezier(0.22,1,0.36,1) var(--cd);
        }
        .tm-card:hover .cert-row { opacity: 1; transform: none; }
        .cert-icon {
          width: 15px; height: 15px; border-radius: 4px; flex-shrink: 0; margin-top: 1px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(var(--pcr),0.4); color: #fff;
        }
        .cert-text { line-height: 1.4; }

        .front-actions { display: flex; gap: 0.5rem; margin-top: 0.4rem; position: relative; z-index: 8; }
        .act-btn {
          flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;
          font-family: inherit; font-size: 0.7rem; font-weight: 700;
          padding: 0.6rem 0.7rem; border-radius: 40px; cursor: pointer;
          position: relative; z-index: 1;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), background 0.25s ease, box-shadow 0.25s ease, color 0.25s ease;
        }
        .act-btn * { pointer-events: none; }
        .act-ghost {
          background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
        }
        .act-ghost:hover { background: rgba(255,255,255,0.22); transform: translateY(-2px); }
        .act-solid {
          background: var(--pc); border: 1px solid var(--pc); color: #fff;
          box-shadow: 0 8px 20px -8px rgba(var(--pcr),0.7);
        }
        .act-solid:hover { transform: translateY(-2px); box-shadow: 0 12px 28px -8px rgba(var(--pcr),0.9); }
        .act-btn svg { transition: transform 0.25s ease; }
        .act-btn:hover svg { transform: translateX(3px); }

        /* Back face */
        .card-face.back {
          transform: rotateY(180deg);
          background: linear-gradient(150deg, #081426, #04101E);
          border: 1px solid rgba(var(--pcr),0.25);
          box-shadow: 0 0 0 1px rgba(var(--pcr),0.15), 0 20px 55px -20px rgba(27,42,74,0.4);
        }
        .back-photo-bg { position: absolute; inset: 0; overflow: hidden; }
        .back-bg-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.15; filter: blur(2px); }
        .back-bg-mask {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(4,16,30,0.7), rgba(4,16,30,0.95));
        }

        /* პინირებული "უკან" ღილაკი — ფლიპისთანავე ჩანს, სქროლის გარეშე */
        .back-nav {
          position: absolute; top: 1rem; left: 1rem; z-index: 20;
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: rgba(255,255,255,0.09); border: 1px solid rgba(255,255,255,0.18);
          color: #fff; backdrop-filter: blur(8px);
          font-family: inherit; font-size: 0.68rem; font-weight: 700;
          padding: 0.42rem 0.9rem; border-radius: 40px; cursor: pointer;
          pointer-events: auto;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .back-nav:hover { background: rgba(255,255,255,0.2); transform: translateX(-3px); }

        .back-body {
          position: relative; z-index: 2; height: 100%;
          padding: 3.1rem 1.35rem 1.3rem;
          display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
          text-align: center; overflow-y: auto;
        }
        .back-ring { position: relative; width: 72px; height: 72px; margin-bottom: 0.15rem; flex-shrink: 0; }
        .back-avatar-img {
          width: 100%; height: 100%; border-radius: 50%;
          object-fit: cover; object-position: top; border: 2px solid rgba(var(--pcr),0.5);
        }
        .ring-border {
          position: absolute; inset: -5px; border-radius: 50%;
          border: 1px dashed rgba(var(--pcr),0.4);
          animation: ring-spin 14s linear infinite;
        }
        @keyframes ring-spin { to { transform: rotate(360deg); } }

        .back-name { font-size: 1.05rem; font-weight: 900; color: #fff; margin: 0; letter-spacing: -0.01em; }
        .back-role-tag {
          font-size: 0.55rem; font-weight: 800; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--pc);
        }
        .back-certs {
          width: 100%; display: flex; flex-direction: column; gap: 0.25rem; margin-top: 0.3rem;
        }
        .back-certs-label {
          font-size: 0.5rem; font-weight: 800; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(255,255,255,0.3); margin: 0 0 0.1rem;
        }
        .back-cert-item {
          display: flex; align-items: flex-start; gap: 0.5rem; text-align: left;
          font-size: 0.7rem; color: rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.03); border: 1px solid rgba(var(--pcr),0.15);
          border-radius: 8px; padding: 0.35rem 0.6rem;
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
        }
        .back-cert-item:hover {
          background: rgba(var(--pcr),0.08); border-color: rgba(var(--pcr),0.35); transform: translateX(3px);
        }
        .bci-check {
          width: 14px; height: 14px; border-radius: 4px; flex-shrink: 0; margin-top: 1px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(var(--pcr),0.25); color: var(--pc);
        }
        .back-bio {
          font-size: 0.7rem; line-height: 1.5; color: rgba(255,255,255,0.5);
          margin: 0.3rem 0 0;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .back-profile-btn {
          margin-top: auto; width: 100%;
          display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;
          background: var(--pc); color: #fff; border: none; cursor: pointer;
          font-family: inherit; font-size: 0.72rem; font-weight: 700;
          padding: 0.6rem 1rem; border-radius: 40px;
          box-shadow: 0 10px 20px -10px rgba(var(--pcr),0.8);
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), filter 0.25s ease;
        }
        .back-profile-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }

        /* Stars */
        .tm-stars { display: flex; align-items: center; gap: 2px; }
        .tm-star { display: flex; color: #FBBF24; animation: star-pop 0.5s cubic-bezier(0.22,1,0.36,1) both; animation-delay: var(--sd); }
        @keyframes star-pop { from { opacity: 0; transform: scale(0.4) rotate(-25deg); } }
        .tm-star-val { margin-left: 5px; font-size: 0.7rem; font-weight: 700; color: rgba(255,255,255,0.4); }
        .stars-light .tm-star-val { color: rgba(255,255,255,0.45); }

        /* Section CTA */
        .tm-cta-wrap {
          text-align: center; opacity: 0; transform: translateY(20px);
          transition: opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s;
        }
        .tm-cta-wrap.hdr-in { opacity: 1; transform: none; }
        .tm-main-btn {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 0.75rem;
          padding: 0.9rem 2.1rem; border-radius: 50px;
          font-family: inherit; font-weight: 700; font-size: 0.9rem; text-decoration: none;
          background: var(--navy); color: var(--cream); border: 2px solid var(--navy);
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease;
        }
        .tm-main-btn::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%);
          transform: translateX(-120%);
        }
        .tm-main-btn:hover::after { animation: tm-sheen 0.85s ease; }
        .tm-main-btn > * { position: relative; z-index: 1; }
        .tm-main-btn:hover {
          background: var(--blue-mid); border-color: var(--blue-mid);
          transform: translateY(-3px); box-shadow: 0 18px 36px -12px rgba(27,42,74,0.42);
        }
        .main-btn-arr { display: flex; transition: transform 0.28s ease; }
        .tm-main-btn:hover .main-btn-arr { transform: translateX(5px); }

        /* ── Profile modal ── */
        .pm-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(1,10,28,0.86); backdrop-filter: blur(16px);
          display: flex; align-items: center; justify-content: center; padding: 16px;
          opacity: 0; transition: opacity 0.35s ease;
          font-family: 'Noto Sans Georgian', system-ui, sans-serif;
        }
        .pm-backdrop.is-open { opacity: 1; }
        .pm-box {
          display: flex; max-width: 840px; width: 100%; max-height: 94vh;
          background: linear-gradient(145deg,#071222,#04101E);
          border: 1px solid rgba(var(--pcr),0.3); border-radius: 24px; overflow: hidden;
          box-shadow: 0 44px 90px rgba(0,0,0,0.7), 0 0 70px rgba(var(--pcr),0.14);
          opacity: 0; transform: translateY(34px) scale(0.96);
          transition: opacity 0.4s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .pm-backdrop.is-open .pm-box { opacity: 1; transform: none; }
        .pm-stg {
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.55s ease var(--d,0s), transform 0.55s cubic-bezier(0.22,1,0.36,1) var(--d,0s);
        }
        .pm-backdrop.is-open .pm-stg { opacity: 1; transform: none; }

        .pm-photo { position: relative; flex: 0 0 380px; min-height: 440px; overflow: hidden; background: #030D1A; }
        .pm-photo-img {
          width: 100%; height: 100%; object-fit: cover; object-position: 50% 12%;
          animation: pm-img-in 1.2s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes pm-img-in { from { transform: scale(1.14); } to { transform: scale(1); } }
        .pm-photo-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(var(--pcr),0.1) 0%, rgba(var(--pcr),0.35) 40%, rgba(3,13,26,0.85) 72%, rgba(3,13,26,0.96) 100%);
        }
        .pm-photo-info { position: absolute; left: 0; right: 0; bottom: 0; z-index: 2; padding: 2rem 1.8rem 1.8rem; }
        .pm-specialty {
          display: inline-block; font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; color: #FBBF24;
          background: rgba(251,191,36,0.12); border: 1px solid rgba(251,191,36,0.25);
          padding: 0.25rem 0.75rem; border-radius: 40px; margin-bottom: 0.5rem;
        }
        .pm-name {
          font-size: 1.8rem; font-weight: 900; color: #fff; margin: 0 0 0.6rem;
          letter-spacing: -0.02em; line-height: 1.12; text-shadow: 0 2px 20px rgba(0,0,0,0.35);
        }
        .pm-stats { display: flex; align-items: center; gap: 1.2rem; }
        .pm-stat { display: flex; flex-direction: column; }
        .pm-stat-div { width: 1px; height: 26px; background: rgba(255,255,255,0.15); }
        .pm-stat-num { font-size: 1.1rem; font-weight: 900; color: #fff; line-height: 1; }
        .pm-stat-lbl {
          font-size: 0.55rem; font-weight: 700; color: rgba(255,255,255,0.5);
          text-transform: uppercase; letter-spacing: 0.08em; margin-top: 3px;
        }
        .pm-close {
          position: absolute; top: 1rem; right: 1rem; z-index: 10;
          width: 36px; height: 36px; border-radius: 12px; cursor: pointer;
          background: rgba(0,0,0,0.5); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.65);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.22s ease, color 0.22s ease, transform 0.3s ease;
        }
        .pm-close:hover { background: rgba(255,255,255,0.12); color: #fff; transform: rotate(90deg); }

        .pm-content {
          flex: 1; padding: 1.9rem 1.8rem 1.6rem; overflow-y: auto;
          display: flex; flex-direction: column; gap: 0.72rem; max-height: 94vh;
        }
        .pm-role {
          font-size: 0.6rem; font-weight: 800; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--pc);
        }
        .pm-bio { font-size: 0.85rem; line-height: 1.75; color: rgba(255,255,255,0.65); margin: 0; }
        .pm-certs-label {
          font-size: 0.55rem; font-weight: 800; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(255,255,255,0.32); margin-top: 0.2rem;
        }
        .pm-certs { display: flex; flex-direction: column; gap: 0.35rem; }
        .pm-cert {
          display: flex; align-items: flex-start; gap: 0.6rem;
          padding: 0.45rem 0.7rem; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(var(--pcr),0.18); border-radius: 9px;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }
        .pm-cert:hover {
          background: rgba(var(--pcr),0.1); border-color: rgba(var(--pcr),0.4); transform: translateX(4px);
        }
        .pm-cert-icon {
          width: 17px; height: 17px; border-radius: 5px; flex-shrink: 0; margin-top: 2px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(var(--pcr),0.25); color: var(--pc);
        }
        .pm-cert-text { font-size: 0.75rem; font-weight: 500; color: rgba(255,255,255,0.82); line-height: 1.5; }

        .pm-actions { display: flex; align-items: center; gap: 0.6rem; margin-top: auto; padding-top: 1rem; flex-wrap: wrap; }
        .pm-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: var(--pc); color: #fff; border: none; cursor: pointer;
          font-family: inherit; font-size: 0.8rem; font-weight: 700;
          padding: 0.78rem 1.5rem; border-radius: 50px;
          box-shadow: 0 14px 28px -12px rgba(var(--pcr),1);
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), filter 0.25s ease, box-shadow 0.25s ease;
        }
        .pm-primary:hover { transform: translateY(-3px); filter: brightness(1.08); box-shadow: 0 20px 34px -12px rgba(var(--pcr),1); }
        .pm-secondary {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.6); cursor: pointer;
          font-family: inherit; font-size: 0.78rem; font-weight: 600;
          padding: 0.72rem 1.15rem; border-radius: 50px;
          transition: background 0.22s ease, color 0.22s ease;
        }
        .pm-secondary:hover { background: rgba(255,255,255,0.12); color: #fff; }

        /* ── Responsive: ტაბლეტი/iPad ჩათვლით <1024px ჰოვერის-გარეშე დიზაინი ── */
        @media (max-width: 1024px) {
          .tm-grid { grid-template-columns: repeat(2, 1fr); gap: 1.6rem; }

          /* ფოტო ბოლომდე ჩანდეს — მსუბუქი გრადიენტი მხოლოდ ქვედა ზოლში */
          .overlay-gradient {
            background: linear-gradient(180deg, rgba(3,13,26,0) 58%, rgba(3,13,26,0.55) 82%, rgba(3,13,26,0.88) 100%);
          }
          .overlay-content { display: none; }

          /* front-panel ყოველთვის ჩართული, ჰოვერზე დამოკიდებული აღარაა */
          .front-panel {
            top: auto; left: 0; right: 0; bottom: 0; height: auto; max-height: 42%;
            opacity: 1; transform: none; pointer-events: auto;
            justify-content: flex-end;
            gap: 0.4rem;
            padding: 1.15rem 1.2rem 1.1rem;
            background: linear-gradient(180deg, rgba(4,12,24,0) 0%, rgba(4,12,24,0.55) 30%, rgba(2,8,18,0.94) 100%);
          }
          .front-panel .certs-list { display: none; }
          .front-panel .role-tag { font-size: 0.56rem; padding: 0.2rem 0.68rem; }
          .front-panel .person-name { font-size: 1.1rem; margin: 0; }
          .person-bio { -webkit-line-clamp: 2; font-size: 0.75rem; }

          .front-actions { flex-direction: row; gap: 0.5rem; margin-top: 0.3rem; }
          .act-btn { padding: 0.65rem 0.7rem; font-size: 0.68rem; }

          .cert-row { opacity: 1; transform: none; }

          .back-nav { padding: 0.38rem 0.8rem; font-size: 0.66rem; }
        }

        @media (max-width: 640px) {
          .tm-section { padding: 4rem 1rem 3.25rem; }
          .tm-grid { grid-template-columns: 1fr; gap: 1.3rem; }
          .tm-title { font-size: 1.75rem; }
          .tm-card { height: 480px; max-width: 400px; }
          .tm-main-btn { width: 70%; justify-content: center; }

          /* ბარათს გარედან, ტელეფონის ეკრანზე, ოდნავ მუქი ტონი დაერთოს —
             რომ კრემისფერ ფონზე ცხადად და "მძიმედ" გამოიყურებოდეს */
          .photo-tint {
            background: linear-gradient(180deg, rgba(3,13,26,0.22) 0%, rgba(3,13,26,0.06) 32%, rgba(3,13,26,0.1) 55%, rgba(3,13,26,0.28) 100%);
          }
          .card-face.front {
            box-shadow:
              0 0 0 1px rgba(27,42,74,0.14),
              0 18px 40px -16px rgba(27,42,74,0.42);
          }
        }

        /* ── Profile modal: ტელეფონი/პატარა ეკრანი — ფოტო + ტექსტი სვეტურად, კარგად ჩანდეს ── */
        @media (max-width: 760px) {
          .pm-backdrop { padding: 0; align-items: flex-end; }
          .pm-box {
            flex-direction: column;
            max-width: 100%; width: 100%;
            max-height: 92vh;
            border-radius: 22px 22px 0 0;
          }
          .pm-photo {
            flex: 0 0 auto; width: 100%; height: 46vh; min-height: 260px; max-height: 340px;
          }
          .pm-photo-img { object-position: 50% 18%; }
          .pm-photo-info { padding: 1.3rem 1.3rem 1.1rem; }
          .pm-name { font-size: 1.45rem; margin: 0 0 0.5rem; }
          .pm-specialty { font-size: 0.56rem; }
          .pm-stats { gap: 0.9rem; }
          .pm-stat-num { font-size: 0.95rem; }

          .pm-content {
            padding: 1.4rem 1.3rem 1.4rem; gap: 0.6rem;
            max-height: none; overflow-y: auto;
          }
          .pm-bio { font-size: 0.82rem; line-height: 1.65; }
          .pm-cert-text { font-size: 0.72rem; }

          .pm-actions { flex-direction: column; align-items: stretch; gap: 0.5rem; }
          .pm-primary, .pm-secondary { width: 100%; justify-content: center; }
          .pm-close { top: 0.75rem; right: 0.75rem; }
        }

        @media (max-width: 420px) {
          .pm-photo { height: 40vh; min-height: 220px; }
          .pm-name { font-size: 1.25rem; }
          .pm-photo-info { padding: 1rem 1.1rem 0.9rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tm-section *, .pm-backdrop * { animation: none !important; transition-duration: 0.001s !important; }
          .tm-card, .tm-header, .tm-cta-wrap, .pm-stg, .pm-box, .cert-row {
            opacity: 1 !important; transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Team;