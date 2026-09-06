import { useCallback, useEffect, useRef, useState } from "react";
import team1 from "/team1.webp";
import team2 from "/team2.webp";
import team3 from "/team3.webp";
import '../team.css'

/* ─────────────── RESPONSIVE IMAGE HELPER ───────────────
   person.image არის სტრიქონი მაგ. "/team2.webp" (Vite public dir import).
   ვიღებთ საბაზისო სახელს ("team2") და ვაწყობთ სწორ srcSet-ს
   იმ ზომებით, რაც resize-images.js სკრიპტმა უნდა დააგენერიროს
   (team1-468.webp, team1-936.webp, team2-468.webp, ... და ა.შ.)
*/
function getResponsiveImage(imagePath) {
  const base = imagePath.replace(/^\//, "").replace(/\.webp$/, "");
  return {
    src: `/${base}-468.webp`,
    srcSet: `/${base}-468.webp 468w, /${base}-936.webp 936w`,
  };
}

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
  const responsiveImg = getResponsiveImage(person.image);

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
              src={responsiveImg.src}
              srcSet={responsiveImg.srcSet}
              sizes="(max-width: 640px) 100vw, 470px"
              alt={person.name}
              loading="lazy"
              className="photo-img"
              width="468"
              height="558"
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
            <img
              src={responsiveImg.src}
              srcSet={responsiveImg.srcSet}
              sizes="468px"
              width="468"
              height="558"
              loading="lazy"
              alt={person.name}
              aria-hidden
              className="back-bg-img"
            />
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
              <img
                src={responsiveImg.src}
                alt={person.name}
                className="back-avatar-img"
                loading="lazy"
                width="468"
                height="558"
              />
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
    </section>
  );
};

export default Team;