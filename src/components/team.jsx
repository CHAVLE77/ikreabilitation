import { useEffect, useRef, useState } from "react";

/* ─────────────────────────── ICONS ─────────────────────────── */
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ArrowLeft = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.28 5.18 2 2 0 015.27 3h3.09a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 11.09a16 16 0 006.83 6.83l1.61-1.61a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─────────────────────────── DATA ─────────────────────────── */
const teamData = [
  {
    id: 1,
    name: "ირმა ხვიჩია",
    role: "ნევროლოგი",
    experience: "8 წელი",
    sessions: "1,200+",
    rating: 5.0,
    specialty: "სენსორული ინტეგრაცია",
    certs: ["OT სახელმწიფო ლიცენზია", "Sensory Integration", "NDT სერტიფიკატი"],
    bio: "ანა სენსორული სამყაროს ექსპერტია. ის ბავშვებს ეხმარება, რომ ყოველდღიური გამოწვევები — ტანსაცმლის ჩაცმიდან ფანქრის ჭერამდე — სიამოვნებად იქცეს.",
    fullBio: "ირმა სენსორული სამყაროს ექსპერტია 8 წლიანი გამოცდილებით. ის ბავშვებს ეხმარება, რომ ყოველდღიური გამოწვევები — ტანსაცმლის ჩაცმიდან ფანქრის ჭერამდე — სიამოვნებად იქცეს. მისი ინდივიდუალური მიდგომა და ბავშვებისადმი სიყვარული მას გამარჯვებებს მოჰყავს.",
    image: "/team1.webp",
    color: "#3A7BD5",
    colorRgb: "58,123,213",
  },
  {
    id: 2,
    name: "გიორგი ბერიძე",
    role: "ქცევითი თერაპევტი (ABA)",
    experience: "10 წელი",
    sessions: "2,000+",
    rating: 4.9,
    specialty: "ABA თერაპია",
    certs: ["BCBA სერტიფიკატი", "VB-MAPP", "ESDM ტრენინგი"],
    bio: "გიორგი ABA-ს ადამიანურ სახეს წარმოადგენს — სტრუქტურა, სიყვარული და დაჟინება ერთ სივრცეში. ნაბიჯ-ნაბიჯ, გამარჯვება გამარჯვებაზე.",
    fullBio: "გიორგი ABA-ს ადამიანურ სახეს წარმოადგენს — სტრუქტურა, სიყვარული და დაჟინება ერთ სივრცეში. 10 წლიანი გამოცდილებით, ის ბავშვებს ეხმარება ქცევითი გამოწვევების გადალახვაში. VB-MAPP და ESDM ტრენინგი მისი ძირითადი მეთოდოლოგიაა.",
    image: "/team2.webp",
    color: "#1B6FD4",
    colorRgb: "27,111,212",
  },
  {
    id: 3,
    name: "სოფო ლომიძე",
    role: "ფიზიკური თერაპევტი",
    experience: "6 წელი",
    sessions: "900+",
    rating: 5.0,
    specialty: "ფიზიკური რეაბილიტაცია",
    certs: ["PT სახელმწიფო ლიცენზია", "Bobath მეთოდი", "პედიატრიული PT"],
    bio: "სოფო ყოველ ნაბიჯს ზეიმად აქცევს. მისი პაციენტები ისწავლიან არა მხოლოდ სიარულს — არამედ სიამაყეს, რომ შეძლეს.",
    fullBio: "სოფო ყოველ ნაბიჯს ზეიმად აქცევს. 6 წლიანი გამოცდილებით, მისი პაციენტები ისწავლიან არა მხოლოდ სიარულს — არამედ სიამაყეს, რომ შეძლეს. Bobath მეთოდი და პედიატრიული PT მისი ძირითადი ინსტრუმენტებია.",
    image: "/team3.webp",
    color: "#2B4A8A",
    colorRgb: "43,74,138",
  },
];

/* ─────────────────── RATING STARS ─────────────────── */
function RatingStars({ rating }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:3 }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < Math.floor(rating) ? "#FBBF24" : "rgba(251,191,36,0.22)", display:"flex" }}>
          <StarIcon />
        </span>
      ))}
      <span style={{ marginLeft:6, fontSize:"0.72rem", fontWeight:700, color:"rgba(255,255,255,0.45)" }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

/* ─────────────────── PROFILE MODAL ─────────────────── */
function ProfileModal({ person, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position:"fixed", inset:0, zIndex:9999,
        background:"rgba(1,10,28,0.88)",
        backdropFilter:"blur(18px)",
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:24,
        opacity: mounted ? 1 : 0,
        transition:"opacity 0.35s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        role="dialog" aria-modal="true"
        style={{
          background:"linear-gradient(145deg,#071222,#04101E)",
          border:`1px solid rgba(${person.colorRgb},0.3)`,
          borderRadius:24,
          overflow:"hidden",
          display:"flex",
          maxWidth:820, width:"100%",
          maxHeight:"90vh",
          boxShadow:`0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(${person.colorRgb},0.12)`,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
          transition:"transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* ── Photo column ── */}
        <div style={{ width:260, flexShrink:0, position:"relative", overflow:"hidden", background:"#030D1A" }}>
          <img
            src={person.image} alt={person.name}
            style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", filter:"brightness(0.55) saturate(0.75)" }}
          />
          <div style={{
            position:"absolute", inset:0,
            background:`linear-gradient(to bottom, rgba(${person.colorRgb},0.25) 0%, rgba(3,13,26,0.95) 100%)`
          }} />
          <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"1.5rem", zIndex:2 }}>
            <span style={{
              display:"inline-block", fontSize:"0.58rem", fontWeight:800, letterSpacing:"0.14em",
              textTransform:"uppercase", color:"#FBBF24",
              background:"rgba(251,191,36,0.12)", border:"1px solid rgba(251,191,36,0.3)",
              padding:"0.28rem 0.75rem", borderRadius:40, marginBottom:"0.9rem"
            }}>{person.specialty}</span>
            <div style={{ display:"flex", alignItems:"center", gap:"1.2rem" }}>
              {[{ n: person.experience, l:"გამოცდ." }, { n: person.sessions, l:"სეანსი" }].map((s, i) => (
                <div key={i} style={{ display:"flex", flexDirection:"column" }}>
                  <span style={{ fontSize:"1.15rem", fontWeight:900, color:"#fff", lineHeight:1 }}>{s.n}</span>
                  <span style={{ fontSize:"0.58rem", fontWeight:700, color:"rgba(255,255,255,0.45)", textTransform:"uppercase", letterSpacing:"0.08em" }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ flex:1, padding:"2rem 1.8rem", position:"relative", overflowY:"auto", display:"flex", flexDirection:"column", gap:"0.9rem" }}>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position:"absolute", top:"1.1rem", right:"1.1rem",
              background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
              color:"rgba(255,255,255,0.4)", borderRadius:10, width:36, height:36,
              display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
              transition:"all 0.2s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
          >
            <CloseIcon />
          </button>

          <div style={{ fontSize:"0.6rem", fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase", color: person.color }}>{person.role}</div>
          <h2 style={{ fontSize:"1.8rem", fontWeight:900, color:"#fff", letterSpacing:"-0.022em", margin:0, lineHeight:1.1 }}>{person.name}</h2>
          <RatingStars rating={person.rating} />
          <p style={{ fontSize:"0.85rem", lineHeight:1.72, color:"rgba(255,255,255,0.6)", margin:0 }}>{person.fullBio}</p>

          <div style={{ fontSize:"0.58rem", fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginTop:"0.3rem" }}>
            კვალიფიკაცია
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
            {person.certs.map((c, i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:"0.6rem",
                fontSize:"0.78rem", color:"rgba(255,255,255,0.72)",
                padding:"0.48rem 0.75rem",
                background:`rgba(${person.colorRgb},0.08)`,
                border:`1px solid rgba(${person.colorRgb},0.18)`,
                borderRadius:10,
              }}>
                <span style={{
                  width:18, height:18, borderRadius:6,
                  background:`rgba(${person.colorRgb},0.25)`,
                  color: person.color, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0
                }}><CheckIcon /></span>
                {c}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display:"flex", gap:"0.65rem", marginTop:"auto", paddingTop:"0.5rem" }}>
            <button
              onClick={() => {
                sessionStorage.setItem("selectedSpecialist", person.name);
                window.location.href = "/contact";
                onClose();
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.filter = ""; e.currentTarget.style.transform = ""; }}
              style={{
                flex:1, display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"0.45rem",
                background: person.color, border:"none", color:"#fff",
                padding:"0.78rem 1.2rem", borderRadius:12,
                fontSize:"0.78rem", fontWeight:800, cursor:"pointer",
                fontFamily:"'Noto Sans Georgian', sans-serif",
                transition:"all 0.2s ease",
              }}
            >
              <PhoneIcon /> კონსულტაციის ჩაწერა
            </button>
            <button
              onClick={onClose}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
              style={{
                display:"inline-flex", alignItems:"center", gap:"0.4rem",
                background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
                color:"rgba(255,255,255,0.45)", padding:"0.78rem 1.1rem", borderRadius:12,
                fontSize:"0.78rem", fontWeight:700, cursor:"pointer",
                fontFamily:"'Noto Sans Georgian', sans-serif",
                transition:"all 0.2s ease",
              }}
            >
              <ArrowLeft size={13} /> უკან
            </button>
          </div>
        </div>
      </div>

      {/* responsive modal style */}
      <style>{`
        @media (max-width: 640px) {
          [role="dialog"] { flex-direction: column !important; max-height: 95vh !important; }
          [role="dialog"] > div:first-child { width: 100% !important; height: 200px !important; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────── TEAM CARD ─────────────────── */
function TeamCard({ person, idx, visibleCards, flipped, setFlipped, onOpenModal }) {
  const cardRefs = useRef(null);
  const isFlipped  = flipped === idx;
  const isVisible  = visibleCards.has(idx);

  return (
    <div
      ref={cardRefs}
      className={`tm-card ${isVisible ? "card-in" : ""} ${isFlipped ? "is-flipped" : ""}`}
      style={{
        "--pc": person.color,
        "--pcr": person.colorRgb,
        transitionDelay: `${(idx % 3) * 0.1}s`,
      }}
    >
      <div className="card-scene">

        {/* ════ FRONT ════ */}
        <div className="card-face front">
          <div className="photo-area">
            <img src={person.image} alt={person.name} loading="lazy" className="photo-img" />
            <div className="photo-grad-bottom" />
            <div className="-pill">
              <span className="-dot" />
            </div>
          </div>

          <div className="front-panel">
            <span className="role-tag">{person.role}</span>
            <h3 className="person-name">{person.name}</h3>
            <p className="person-bio">{person.bio}</p>

            <div className="cert-chipss">
              {person.certs.map((c, i) => (
                <span key={i} className="chips">
                  <CheckIcon />{c}
                </span>
              ))}
            </div>

            <div className="front-actions">
              <button
                className="act-btn act-ghost"
                onClick={() => setFlipped(isFlipped ? null : idx)}
              >
                <span>გამოცდილება</span>
                <ArrowRight />
              </button>
              {/* ── FUNCTIONAL: opens ProfileModal ── */}
              <button
                className="act-btn act-solid"
                onClick={() => onOpenModal(person)}
              >
                <span>სრული პროფილი</span>
                <ArrowRight />
              </button>
            </div>
          </div>

          <div className="top-bar" />
        </div>

        {/* ════ BACK ════ */}
        <div className="card-face back">
          <div className="back-photo-bg">
            <img src={person.image} alt="" aria-hidden className="back-bg-img" />
            <div className="back-bg-mask" />
          </div>

          <div className="back-body">
            <div className="back-ring">
              <img src={person.image} alt={person.name} className="back-avatar-img" />
              <div className="ring-border" />
            </div>
            <h3 className="back-name">{person.name}</h3>
            <span className="back-role-tag">{person.role}</span>

            {/* Rating on back */}
            <div style={{ marginTop:2 }}>
              <RatingStars rating={person.rating} />
            </div>

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

            {/* ── FUNCTIONAL: opens ProfileModal from back too ── */}
            <button
              className="back-profile-btn"
              onClick={() => { setFlipped(null); onOpenModal(person); }}
            >
              <span>სრული პროფილი</span>
              <ArrowRight />
            </button>

            <button className="back-return" onClick={() => setFlipped(null)}>
              <ArrowLeft /> <span>უკან</span>
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
  const [flipped, setFlipped]           = useState(null);
  const [activeModal, setActiveModal]   = useState(null);
  const cardRefs   = useRef([]);
  const sectionRef = useRef(null);
  const [headerIn, setHeaderIn]         = useState(false);

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

        {/* Header */}
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

        {/* Grid */}
        <div className="tm-grid">
          {displayed.map((person, idx) => (
            <div
              key={person.id}
              ref={(el) => (cardRefs.current[idx] = el)}
            >
              <TeamCard
                person={person}
                idx={idx}
                visibleCards={visibleCards}
                flipped={flipped}
                setFlipped={setFlipped}
                onOpenModal={setActiveModal}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`tm-cta-wrap ${headerIn ? "hdr-in" : ""}`}>
          <a href="/team" className="tm-main-btn solid">
            <span>იხილეთ მეტი</span>
            <span className="main-btn-arr"><ArrowRight /></span>
          </a>
        </div>

      </div>

      {/* Profile Modal */}
      {activeModal && (
        <ProfileModal person={activeModal} onClose={() => setActiveModal(null)} />
      )}

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

        .tm-section {
          background: var(--cream);
          padding: 6rem 1.5rem 5.5rem;
          font-family: 'Noto Sans Georgian', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .tm-noise {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0;
        }
        .tm-container {
          max-width: 1220px; margin: 0 auto; position: relative; z-index: 1;
        }

        /* Header */
        .tm-header {
          text-align: center; margin-bottom: 4rem;
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
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
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent); box-shadow: 0 0 0 0 rgba(40,133,239,0.5);
          animation: pulse-anim 2.4s ease infinite;
        }
        @keyframes pulse-anim {
          0%   { box-shadow: 0 0 0 0   rgba(40,133,239,0.5); }
          70%  { box-shadow: 0 0 0 8px rgba(40,133,239,0); }
          100% { box-shadow: 0 0 0 0   rgba(40,133,239,0); }
        }

        .tm-title {
          font-size: clamp(2rem, 4.5vw, 3.2rem); font-weight: 900;
          color: var(--navy); line-height: 1.18; letter-spacing: -0.025em; margin: 0 0 0.85rem;
        }
        .title-em {
          color: var(--blue-mid); position: relative; display: inline-block;
        }
        .title-em::after {
          content: ''; position: absolute; bottom: 0.06em; left: 0;
          width: 100%; height: 0.13em; background: var(--accent);
          opacity: 0.4; border-radius: 2px;
        }
        .tm-subtitle {
          font-size: 1rem; color: var(--text-muted);
          max-width: 560px; margin: 0 auto; line-height: 1.65;
        }

        /* Grid */
        .tm-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 2rem; margin-bottom: 3.5rem;
        }

        /* Card */
        .tm-card {
          --pc: #2885ef; --pcr: 40,133,239;
          perspective: 1100px; height: 560px;
          opacity: 0; transform: translateY(40px);
          transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1);
          will-change: transform, opacity;
        }
        .tm-card.card-in { opacity: 1; transform: translateY(0); }

        .card-scene {
          width: 100%; height: 100%; transform-style: preserve-3d;
          transition: transform 0.72s cubic-bezier(0.4,0,0.2,1);
          border-radius: 20px; position: relative;
        }
        .tm-card.is-flipped .card-scene { transform: rotateY(180deg); }

        .card-face {
          position: absolute; inset: 0; border-radius: 20px;
          overflow: hidden; backface-visibility: hidden; -webkit-backface-visibility: hidden;
        }

        /* Front */
        .front {
          display: flex; flex-direction: column; background: #fff;
          border: 1px solid #E8EDF5;
          box-shadow: 0 1px 3px rgba(27,42,74,0.06), 0 8px 20px rgba(27,42,74,0.07);
          transition: box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease;
        }
        @media (hover: hover) {
          .tm-card:hover:not(.is-flipped) .front {
            box-shadow: 0 4px 12px rgba(27,42,74,0.08), 0 20px 44px rgba(27,42,74,0.12);
            border-color: rgba(var(--pcr), 0.22); transform: translateY(-8px);
          }
          .tm-card:hover:not(.is-flipped) .top-bar { width: 5px; }
          .tm-card:hover:not(.is-flipped) .photo-img { transform: scale(1.05); filter: saturate(1.05) brightness(1.04); }
          .tm-card:hover:not(.is-flipped) .-pill { transform: translateY(-2px); box-shadow: 0 4px 14px rgba(27,42,74,0.14); }
          .tm-card:hover:not(.is-flipped) .person-name::after { width: 52px; opacity: 0.9; }
          .tm-card:hover:not(.is-flipped) .chips { background: rgba(var(--pcr), 0.07); border-color: rgba(var(--pcr), 0.25); color: var(--pc); }
          .tm-card:hover:not(.is-flipped) .chips svg { color: var(--pc); }
        }
        @media (max-width: 1024px) {
          .tm-card:not(.is-flipped) .front {
            box-shadow: 0 4px 12px rgba(27,42,74,0.08), 0 20px 44px rgba(27,42,74,0.12);
            border-color: rgba(var(--pcr), 0.22); transform: translateY(-4px);
          }
          .tm-card:not(.is-flipped) .top-bar { width: 5px; }
          .tm-card:not(.is-flipped) .photo-img { transform: scale(1.03); filter: saturate(1.05) brightness(1.04); }
        }

        .top-bar {
          position: absolute; top: 0; left: 0; bottom: 0;
          width: 4px; background: var(--pc); opacity: 0.9; z-index: 3;
          border-radius: 20px 0 0 20px; transition: width 0.3s ease;
        }

        .photo-area {
          position: relative; height: 245px; flex-shrink: 0; overflow: hidden; background: #dde4ef;
        }
        .photo-img {
          width: 100%; height: 100%; object-fit: cover; object-position: center 12%; display: block;
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease;
          filter: saturate(0.92) brightness(1.02);
        }
        .photo-grad-bottom {
          position: absolute; bottom: 0; left: 0; right: 0; height: 56px;
          background: linear-gradient(to top, #fff 0%, transparent 100%); z-index: 1;
        }

        .-pill {
          position: absolute; bottom: 14px; right: 14px;
          background: #fff; border: 1px solid #E2E8F0;
          box-shadow: 0 2px 8px rgba(27,42,74,0.1);
          color: var(--navy); font-size: 0.68rem; font-weight: 700;
          padding: 0.3rem 0.75rem 0.3rem 0.55rem; border-radius: 8px;
          display: flex; align-items: center; gap: 0.45rem; z-index: 2;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--pc); flex-shrink: 0; }

        .front-panel {
          padding: 1.1rem 1.4rem 1.3rem 1.6rem;
          display: flex; flex-direction: column; gap: 0.45rem; flex: 1;
        }
        .role-tag { font-size: 0.63rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--pc); }
        .person-name { font-size: 1.15rem; font-weight: 800; color: var(--navy); letter-spacing: -0.018em; line-height: 1.25; margin: 0; }
        .person-name::after {
          content: ''; display: block; width: 32px; height: 2px;
          background: var(--pc); border-radius: 2px; margin-top: 0.55rem;
          opacity: 0.5; transition: width 0.3s ease, opacity 0.3s ease;
        }
        .person-bio {
          font-size: 0.8rem; line-height: 1.65; color: #5A5A72; margin: 0;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .cert-chipss { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.1rem; }
        .chips {
          display: inline-flex; align-items: center; gap: 0.28rem;
          font-size: 0.6rem; font-weight: 600; color: #3A4A6A;
          background: #F0F4FA; border: 1px solid #DDE4F0;
          padding: 0.22rem 0.6rem 0.22rem 0.48rem; border-radius: 6px; white-space: nowrap;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .chips svg { color: #7A9AC5; flex-shrink: 0; }

        .front-actions { display: flex; gap: 0.55rem; margin-top: auto; padding-top: 0.45rem; }
        .act-btn {
          flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 0.38rem;
          font-family: 'Noto Sans Georgian', sans-serif; font-size: 0.7rem; font-weight: 700;
          border-radius: 8px; padding: 0.52rem 0.7rem; cursor: pointer;
          transition: all 0.2s ease; letter-spacing: 0.01em; white-space: nowrap;
        }
        .act-ghost { background: #F5F7FB; border: 1px solid #DDE4F0; color: var(--navy); }
        .act-ghost:hover { background: rgba(var(--pcr), 0.07); border-color: rgba(var(--pcr), 0.3); color: var(--pc); transform: translateY(-1px); }
        .act-solid { background: var(--pc); border: 1px solid var(--pc); color: #fff; }
        .act-solid:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(var(--pcr),0.35); }
        .act-btn svg { transition: transform 0.18s ease; flex-shrink: 0; opacity: 0.7; }
        .act-btn:hover svg { transform: translateX(3px); opacity: 1; }

        /* Back */
        .back {
          transform: rotateY(180deg); background: var(--navy);
          display: flex; flex-direction: column; overflow: hidden;
        }
        .back-photo-bg { position: absolute; inset: 0; overflow: hidden; }
        .back-bg-img {
          width: 100%; height: 50%; object-fit: cover; object-position: center 15%; display: block;
          filter: brightness(0.28) saturate(0.4);
        }
        .back-bg-mask {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(27,42,74,0.5) 0%, rgba(27,42,74,0.98) 38%, rgba(27,42,74,1) 100%);
        }
        .back-body {
          position: relative; z-index: 1; display: flex; flex-direction: column;
          align-items: center; padding: 1.6rem 1.6rem 1.4rem; height: 100%;
          gap: 0.45rem; overflow-y: auto;
        }
        .back-ring { position: relative; width: 76px; height: 76px; flex-shrink: 0; }
        .back-avatar-img {
          width: 100%; height: 100%; border-radius: 12px; object-fit: cover; object-position: top;
          display: block; border: 2px solid rgba(255,255,255,0.15);
        }
        .back-name { font-size: 1.08rem; font-weight: 800; color: #fff; letter-spacing: -0.015em; text-align: center; margin: 0; }
        .back-role-tag {
          font-size: 0.63rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase;
          color: rgba(var(--pcr), 1); background: none; border: none; padding: 0;
        }
        .back-certs {
          width: 100%; border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 0.65rem; margin-top: 0.1rem;
        }
        .back-certs-label {
          font-size: 0.58rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.35); margin: 0 0 0.5rem;
        }
        .back-cert-item {
          display: flex; align-items: center; gap: 0.55rem;
          font-size: 0.75rem; color: rgba(255,255,255,0.82);
          padding: 0.25rem 0; border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .back-cert-item:last-child { border-bottom: none; }
        .bci-check {
          width: 16px; height: 16px; border-radius: 4px;
          background: rgba(var(--pcr), 0.25); color: rgba(var(--pcr), 1);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .back-bio {
          font-size: 0.75rem; line-height: 1.62; color: rgba(255,255,255,0.5);
          text-align: center; margin: 0;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }

        /* Back full-profile btn */
        .back-profile-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;
          font-family: 'Noto Sans Georgian', sans-serif;
          font-size: 0.7rem; font-weight: 700; color: #fff;
          background: var(--pc); border: none;
          padding: 0.45rem 1.1rem; border-radius: 8px; cursor: pointer;
          transition: all 0.2s ease; width: 100%; margin-top: 0.2rem;
        }
        .back-profile-btn:hover { filter: brightness(1.12); transform: translateY(-1px); }
        .back-profile-btn svg { opacity: 0.85; transition: transform 0.18s ease; }
        .back-profile-btn:hover svg { transform: translateX(3px); opacity: 1; }

        .back-return {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'Noto Sans Georgian', sans-serif;
          font-size: 0.7rem; font-weight: 700; color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
          padding: 0.38rem 1rem; border-radius: 8px; cursor: pointer;
          transition: all 0.2s ease;
        }
        .back-return:hover { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.85); }

        /* CTA */
        .tm-cta-wrap {
          text-align: center; opacity: 0; transform: translateY(18px);
          transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
        }
        .tm-cta-wrap.hdr-in { opacity: 1; transform: none; }
        .tm-main-btn {
          display: inline-flex; align-items: center; gap: 0.8rem;
          background: transparent; border: 2px solid var(--navy); color: var(--navy);
          padding: 0.85rem 2.1rem; border-radius: 50px;
          font-family: 'Noto Sans Georgian', sans-serif; font-weight: 700; font-size: 0.9rem;
          text-decoration: none; transition: all 0.28s ease; letter-spacing: 0.01em;
        }
        .tm-main-btn:hover { background: var(--navy); color: var(--cream); transform: translateY(-2px); box-shadow: 0 14px 30px -8px rgba(27,42,74,0.28); }
        .tm-main-btn.solid { background: var(--navy); color: var(--cream); }
        .tm-main-btn.solid:hover { background: var(--blue-mid); box-shadow: 0 14px 30px -8px rgba(27,42,74,0.35); }
        .main-btn-arr { display: flex; align-items: center; transition: transform 0.25s ease; }
        .tm-main-btn:hover .main-btn-arr { transform: translateX(4px); }

        /* Responsive */
        @media (max-width: 1024px) {
          .tm-grid { grid-template-columns: repeat(2, 1fr); gap: 1.6rem; }
          .tm-card { height: 580px; }
        }
        @media (max-width: 640px) {
          .tm-section { padding: 4rem 1rem 3.5rem; }
          .tm-grid { grid-template-columns: 1fr; gap: 1.4rem; }
          .tm-card { height: 540px; }
          .tm-title { font-size: 1.8rem; }
          .tm-title br { display: none; }
          .photo-area { height: 240px; }
          .tm-main-btn { width: 100%; justify-content: center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tm-header, .tm-cta-wrap, .tm-card, .card-scene, .photo-img,
          .-pill, .act-btn, .back-return, .badge-pulse {
            transition: none !important; animation: none !important;
          }
          .tm-card { opacity: 1; transform: none; }
          .tm-header, .tm-cta-wrap { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
};

export default Team;