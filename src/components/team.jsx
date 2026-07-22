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
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
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
    specialty: "ბავშვთა ნევროლოგია",
    certs: [
      "ნევროლოგიის სერტიფიკატი",
      "ბავშვთა ნევროლოგიის ტრენინგი",
      "EEG დიაგნოსტიკა"
    ],
    bio: "ირმა ხვიჩია არის ბავშვთა ნევროლოგი, რომელიც ეხმარება პაციენტებს ნერვული სისტემის დარღვევების დიაგნოსტიკასა და მართვაში.",
    fullBio: "8 წლიანი გამოცდილებით, ირმა ხვიჩია მუშაობს ბავშვთა ნევროლოგიური მდგომარეობების შეფასებაზე, დიაგნოსტიკასა და ინდივიდუალური მკურნალობის დაგეგმვაზე.",
    image: "/team1.webp",
    color: "#3A7BD5",
    colorRgb: "58,123,213",
  },
  {
    id: 2,
    name: "გია მელიქიშვილი",
    role: "ეპილეფტოლოგი",
    experience: "10 წელი",
    sessions: "2,000+",
    rating: 4.9,
    specialty: "ეპილეფსიური და კრუნჩხვითი დარღვევების დიაგნოსტიკა და მკურნალობა",
    certs: [
      "ნევროლოგიის სერტიფიკატი",
      "EEG დიაგნოსტიკის ტრენინგი",
      "ეპილეფტოლოგიის სპეციალიზაცია"
    ],
    bio: "გია მელიქიშვილი სპეციალიზდება ეპილეფსიისა და კრუნჩხვითი დარღვევების მართვაში. პაციენტებს ეხმარება ზუსტი დიაგნოსტიკისა და ინდივიდუალური მკურნალობის დაგეგმვაში.",
    fullBio: "10 წლიანი გამოცდილებით, გია მელიქიშვილი მუშაობს ეპილეფსიის სხვადასხვა ფორმის დიაგნოსტიკასა და მკურნალობაზე. მისი მიმართულებები მოიცავს EEG კვლევების შეფასებას, კრუნჩხვითი ეპიზოდების მართვას და თანამედროვე თერაპიული მიდგომების გამოყენებას.",
    image: "/team2.webp",
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
    certs: [
      "ორთოპედია-ტრავმატოლოგიის სერტიფიკატი",
      "სახსრების ქირურგიის ტრენინგი",
      "ბავშვთა ორთოპედიის კურსი"
    ],
    bio: "ლევან ჩიკვატია არის ორთოპედ-ტრავმატოლოგი, რომელიც ეხმარება პაციენტებს ძვალ-სახსროვანი პრობლემების დიაგნოსტიკასა და მკურნალობაში.",
    fullBio: "6 წლიანი გამოცდილებით, ლევან ჩიკვატია მუშაობს ტრავმების, ხერხემლისა და სახსრების პრობლემების შეფასებასა და მკურნალობაზე. მისი მიზანია პაციენტებისთვის უსაფრთხო და ეფექტური მკურნალობის გზების შერჩევა.",
    image: "/team3.webp",
    color: "#2B4A8A",
    colorRgb: "43,74,138",
  }
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
        padding:16,
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
          flexDirection: window.innerWidth <= 768 ? "column" : "row",
          maxWidth:820, 
          width:"100%",
          maxHeight:"95vh",
          boxShadow:`0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(${person.colorRgb},0.12)`,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
          transition:"transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
        className="modal-content"
      >
        {/* ── Photo section ── */}
        <div className="modal-photo-section">
          <img
            src={person.image} 
            alt={person.name}
            className="modal-photo-img"
          />
          <div className="modal-photo-overlay">
            <div className="modal-photo-gradient" style={{
              background:`linear-gradient(to bottom, rgba(${person.colorRgb},0.1) 0%, rgba(${person.colorRgb},0.4) 40%, rgba(3,13,26,0.85) 70%, rgba(3,13,26,0.95) 100%)`
            }} />
            <div className="modal-photo-info">
              <span className="modal-photo-specialty">{person.specialty}</span>
              <h2 className="modal-photo-name">{person.name}</h2>
              <div className="modal-photo-stats">
                <div className="modal-photo-stat">
                  <span className="stat-number">{person.experience}</span>
                  <span className="stat-label">გამოცდ.</span>
                </div>
                <div className="modal-photo-stat">
                  <span className="stat-number">{person.sessions}</span>
                  <span className="stat-label">სეანსი</span>
                </div>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <CloseIcon />
          </button>
        </div>

        {/* ── Content section ── */}
        <div className="modal-content-section">
          <div className="modal-role" style={{ color: person.color }}>{person.role}</div>
          <RatingStars rating={person.rating} />
          <p className="modal-bio">{person.fullBio}</p>

          <div className="modal-certs-label">კვალიფიკაცია</div>

          <div className="modal-certs">
            {person.certs.map((c, i) => (
              <div key={i} className="modal-cert-item" style={{ borderColor: `rgba(${person.colorRgb},0.18)` }}>
                <span className="modal-cert-icon" style={{ background: `rgba(${person.colorRgb},0.25)`, color: person.color }}>
                  <CheckIcon />
                </span>
                <span className="modal-cert-text">{c}</span>
              </div>
            ))}
          </div>

          <div className="modal-actions">
            <button
              onClick={() => {
                sessionStorage.setItem("selectedSpecialist", person.name);
                window.location.href = "/contact";
                onClose();
              }}
              className="modal-primary-btn"
              style={{ background: person.color }}
            >
              <PhoneIcon /> კონსულტაციის ჩაწერა
            </button>
            <button onClick={onClose} className="modal-secondary-btn">
              <ArrowLeft size={13} /> უკან
            </button>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Modal Styles ── */
        .modal-content {
          background: linear-gradient(145deg,#071222,#04101E);
          border-radius: 24px;
          overflow: hidden;
          max-width: 820px;
          width: 100%;
          max-height: 95vh;
        }

        /* ── Photo Section ── */
        .modal-photo-section {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 340px;
          flex: 0 0 340px;
          overflow: hidden;
          background: #030D1A;
        }

        .modal-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
        }

        .modal-photo-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .modal-photo-gradient {
          position: absolute;
          inset: 0;
        }

        .modal-photo-info {
          position: relative;
          z-index: 2;
          padding: 2rem 1.8rem 1.8rem;
        }

        .modal-photo-specialty {
          display: inline-block;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #FBBF24;
          background: rgba(251,191,36,0.12);
          border: 1px solid rgba(251,191,36,0.25);
          padding: 0.25rem 0.75rem;
          border-radius: 40px;
          margin-bottom: 0.5rem;
        }

        .modal-photo-name {
          font-size: 1.8rem;
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.02em;
          margin: 0 0 0.5rem 0;
          line-height: 1.1;
          text-shadow: 0 2px 20px rgba(0,0,0,0.3);
        }

        .modal-photo-stats {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .modal-photo-stat {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 1.1rem;
          font-weight: 900;
          color: #fff;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.55rem;
          font-weight: 700;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .modal-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 10;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          border-radius: 10px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.9);
        }

        /* ── Content Section ── */
        .modal-content-section {
          flex: 1;
          padding: 1.8rem 1.8rem 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          max-height: 90vh;
        }

        .modal-role {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .modal-bio {
          font-size: 0.82rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.6);
          margin: 0;
        }

        .modal-certs-label {
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-top: 0.2rem;
        }

        .modal-certs {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .modal-cert-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          padding: 0.4rem 0.7rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(58,123,213,0.15);
          border-radius: 8px;
        }

        .modal-cert-icon {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          flex-shrink: 0;
          margin-top: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-cert-icon svg {
          width: 9px;
          height: 9px;
        }

        .modal-cert-text {
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          line-height: 1.4;
        }

        .modal-actions {
          display: flex;
          gap: 0.6rem;
          margin-top: 0.3rem;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .modal-primary-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          border: none;
          color: #fff;
          padding: 0.7rem 1rem;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 800;
          cursor: pointer;
          font-family: 'Noto Sans Georgian', sans-serif;
          transition: all 0.2s ease;
        }

        .modal-primary-btn:hover {
          filter: brightness(1.15);
          transform: translateY(-2px);
        }

        .modal-secondary-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.4);
          padding: 0.7rem 1rem;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Noto Sans Georgian', sans-serif;
          transition: all 0.2s ease;
        }

        .modal-secondary-btn:hover {
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.8);
        }

        /* ── Responsive ── */
        @media (min-width: 769px) {
          .modal-content {
            flex-direction: row !important;
          }
          
          .modal-photo-section {
            width: 280px;
            flex: 0 0 280px;
            min-height: 400px;
          }
          
          .modal-content-section {
            max-height: 80vh;
          }
        }

        @media (max-width: 768px) {
  .modal-content {
    flex-direction: column !important;
    max-width: 420px !important;
    width: calc(100% - 32px) !important;
    max-height: 88vh !important;
    border-radius: 22px !important;
    margin: 0 auto;
  }

  .modal-photo-section {
    flex: 0 0 auto;
    min-height: 220px;
    height: 220px;
    width: 100%;
    border-radius: 22px 22px 0 0;
  }

  .modal-photo-img {
    height: 220px;
    object-position: center 18%;
  }

  .modal-photo-info {
    padding: 1.1rem 1.2rem 0.9rem;
  }

  .modal-photo-name {
    font-size: 1.3rem;
    margin-bottom: 0.3rem;
  }

  .modal-photo-specialty {
    font-size: 0.5rem;
    padding: 0.2rem 0.6rem;
    margin-bottom: 0.3rem;
  }

  .stat-number {
    font-size: 0.92rem;
  }

  .stat-label {
    font-size: 0.46rem;
  }

  .modal-content-section {
    padding: 1.1rem 1.3rem 1.2rem;
    max-height: 58vh;
    gap: 0.55rem;
  }

  .modal-close-btn {
    top: 0.7rem;
    right: 0.7rem;
    width: 32px;
    height: 32px;
  }

  .modal-close-btn svg {
    width: 16px;
    height: 16px;
  }

  .modal-role {
    font-size: 0.52rem;
  }

  .modal-bio {
    font-size: 0.74rem;
    line-height: 1.6;
  }

  .modal-certs-label {
    font-size: 0.5rem;
    margin-top: 0.15rem;
  }

  .modal-cert-item {
    padding: 0.35rem 0.7rem;
    gap: 0.5rem;
  }

  .modal-cert-text {
    font-size: 0.7rem;
  }

  .modal-cert-icon {
    width: 14px;
    height: 14px;
  }

  .modal-cert-icon svg {
    width: 8px;
    height: 8px;
  }

  .modal-actions {
    flex-direction: column !important;
    gap: 0.45rem !important;
    padding-top: 0.4rem !important;
  }

  .modal-primary-btn {
    padding: 0.6rem 0.8rem !important;
    font-size: 0.7rem !important;
    width: 100% !important;
  }

  .modal-secondary-btn {
    padding: 0.6rem 0.8rem !important;
    font-size: 0.7rem !important;
    width: 100% !important;
    justify-content: center !important;
  }
}

@media (max-width: 480px) {
  .modal-content {
    width: calc(100% - 24px) !important;
    max-width: 380px !important;
    border-radius: 18px !important;
  }

  .modal-photo-section {
    min-height: 190px;
    height: 190px;
    border-radius: 18px 18px 0 0;
  }

  .modal-photo-img {
    height: 190px;
    object-position: center 18%;
  }

  .modal-photo-info {
    padding: 0.9rem 1rem 0.8rem;
  }

  .modal-photo-name {
    font-size: 1.1rem;
  }

  .modal-photo-specialty {
    font-size: 0.45rem;
    padding: 0.15rem 0.5rem;
  }

  .stat-number {
    font-size: 0.8rem;
  }

  .stat-label {
    font-size: 0.42rem;
  }

  .modal-content-section {
    padding: 0.9rem 1rem 0.9rem;
    gap: 0.45rem;
  }

  .modal-close-btn {
    top: 0.55rem;
    right: 0.55rem;
    width: 28px;
    height: 28px;
  }

  .modal-close-btn svg {
    width: 14px;
    height: 14px;
  }

  .modal-bio {
    font-size: 0.66rem;
  }

  .modal-cert-text {
    font-size: 0.63rem;
  }

  .modal-primary-btn {
    padding: 0.5rem 0.6rem !important;
    font-size: 0.62rem !important;
  }

  .modal-secondary-btn {
    padding: 0.5rem 0.6rem !important;
    font-size: 0.62rem !important;
  }

  .modal-primary-btn svg {
    width: 11px !important;
    height: 11px !important;
  }

  .modal-secondary-btn svg {
    width: 11px !important;
    height: 11px !important;
  }
}

        @media (max-width: 480px) {
          .modal-photo-section {
            min-height: 220px;
            height: 220px;
          }

          .modal-photo-img {
            height: 220px;
          }

          .modal-photo-info {
            padding: 0.8rem 1rem 0.8rem;
          }

          .modal-photo-name {
            font-size: 1.1rem;
          }

          .modal-photo-specialty {
            font-size: 0.45rem;
            padding: 0.15rem 0.5rem;
          }

          .stat-number {
            font-size: 0.8rem;
          }

          .stat-label {
            font-size: 0.42rem;
          }

          .modal-content-section {
            padding: 0.8rem 0.8rem 0.8rem;
            gap: 0.4rem;
          }

          .modal-close-btn {
            top: 0.5rem;
            right: 0.5rem;
            width: 28px;
            height: 28px;
          }

          .modal-close-btn svg {
            width: 14px;
            height: 14px;
          }

          .modal-bio {
            font-size: 0.65rem;
          }

          .modal-cert-text {
            font-size: 0.62rem;
          }

          .modal-primary-btn {
            padding: 0.45rem 0.6rem !important;
            font-size: 0.6rem !important;
          }

          .modal-secondary-btn {
            padding: 0.45rem 0.6rem !important;
            font-size: 0.6rem !important;
          }

          .modal-primary-btn svg {
            width: 11px !important;
            height: 11px !important;
          }

          .modal-secondary-btn svg {
            width: 11px !important;
            height: 11px !important;
          }
        }

        @media (max-width: 380px) {
          .modal-photo-section {
            min-height: 180px;
            height: 180px;
          }

          .modal-photo-img {
            height: 180px;
          }

          .modal-photo-info {
            padding: 0.6rem 0.7rem 0.6rem;
          }

          .modal-photo-name {
            font-size: 0.9rem;
          }

          .stat-number {
            font-size: 0.7rem;
          }

          .modal-content-section {
            padding: 0.5rem 0.6rem 0.6rem;
          }

          .modal-bio {
            font-size: 0.58rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .modal-content,
          .modal-close-btn,
          .modal-primary-btn,
          .modal-secondary-btn {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────── TEAM CARD ─────────────────── */
function TeamCard({ person, idx, visibleCards, flipped, setFlipped, onOpenModal }) {
  const cardRefs = useRef(null);
  const isFlipped = flipped === idx;
  const isVisible = visibleCards.has(idx);
  const [isHovered, setIsHovered] = useState(false);

  const handleBack = (e) => {
    e.stopPropagation();
    setFlipped(null);
  };

  const handleFullProfile = (e) => {
    e.stopPropagation();
    setFlipped(null);
    onOpenModal(person);
  };

  return (
    <div
      ref={cardRefs}
      className={`tm-card ${isVisible ? "card-in" : ""} ${isFlipped ? "is-flipped" : ""}`}
      style={{
        "--pc": person.color,
        "--pcr": person.colorRgb,
        transitionDelay: `${(idx % 3) * 0.12}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-scene">

        {/* ════ FRONT ════ */}
        <div className="card-face front">
          <div className="photo-area">
            <img src={person.image} alt={person.name} loading="lazy" className="photo-img" />
            <div className="photo-overlay">
              <div className="overlay-gradient" />
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
          </div>

          <div className={`content-wrapper ${isHovered ? 'content-visible' : ''}`}>
            <div className="front-panel">
              <span className="role-tag">{person.role}</span>
              <h3 className="person-name">{person.name}</h3>
              <p className="person-bio">{person.bio}</p>

              <div className="certs-list">
                {person.certs.map((c, i) => (
                  <div key={i} className="cert-row">
                    <span className="cert-icon"><CheckIcon /></span>
                    <span className="cert-text">{c}</span>
                  </div>
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
                <button
                  className="act-btn act-solid"
                  onClick={() => onOpenModal(person)}
                >
                  <span>სრული პროფილი</span>
                  <ArrowRight />
                </button>
              </div>
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

            <button
              type="button"
              className="back-profile-btn"
              onClick={handleFullProfile}
            >
              <span>სრული პროფილი</span>
              <ArrowRight />
            </button>

            <button type="button" className="back-return" onClick={handleBack}>
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
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );
    cardRefs.current.forEach((c) => c && cObs.observe(c));
    return () => { hObs.disconnect(); cObs.disconnect(); };
  }, [displayed.length]);

  return (
    <section id="team" className="tm-section" ref={sectionRef}>
      <div className="tm-noise" />

      <div className="tm-container">

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

        <div className="tm-grid">
          {displayed.map((person, idx) => (
            <div
              key={person.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="grid-item"
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

        <div className={`tm-cta-wrap ${headerIn ? "hdr-in" : ""}`}>
          <a href="/team" className="tm-main-btn solid">
            <span>იხილეთ მეტი</span>
            <span className="main-btn-arr"><ArrowRight /></span>
          </a>
        </div>

      </div>

      {activeModal && (
        <ProfileModal person={activeModal} onClose={() => setActiveModal(null)} />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@400;500;600;700;900&display=swap');

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

        .tm-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3.5rem;
          justify-content: center;
        }

        .grid-item {
          display: flex;
          justify-content: center;
          align-items: start;
          width: 100%;
        }

        .tm-card {
          --pc: #2885ef; --pcr: 40,133,239;
          perspective: 1100px;
          width: 100%;
          max-width: 360px;
          height: 500px;
          opacity: 0;
          transform: translateY(50px) scale(0.96);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
          will-change: transform, opacity;
        }
        .tm-card.card-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .card-scene {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.72s cubic-bezier(0.4,0,0.2,1);
          border-radius: 20px;
          position: relative;
        }
        .tm-card.is-flipped .card-scene { transform: rotateY(180deg); }

        .card-face {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .front { pointer-events: auto; }
        .back  { pointer-events: none; }
        .tm-card.is-flipped .front { pointer-events: none; }
        .tm-card.is-flipped .back  { pointer-events: auto; }

        .front {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid #E8EDF5;
          box-shadow: 0 1px 3px rgba(27,42,74,0.06), 0 8px 20px rgba(27,42,74,0.07);
          transition: box-shadow 0.5s cubic-bezier(0.22,1,0.36,1),
                      border-color 0.5s cubic-bezier(0.22,1,0.36,1);
          position: relative;
          overflow: hidden;
          height: 100%;
        }

        .top-bar {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 4px;
          background: var(--pc);
          opacity: 0.9;
          z-index: 10;
          border-radius: 20px 0 0 20px;
          transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
        }

        @media (hover: hover) and (pointer: fine) {
          .tm-card:not(.is-flipped):hover .top-bar { width: 6px; }
          .tm-card:not(.is-flipped):hover .front {
            box-shadow: 0 8px 30px rgba(27,42,74,0.12), 0 24px 60px rgba(27,42,74,0.15);
            border-color: rgba(var(--pcr), 0.3);
          }
          .tm-card:not(.is-flipped):hover .photo-img {
            transform: scale(1.05);
            filter: saturate(1.08) brightness(1.05);
          }
        }

        .photo-area {
          position: relative;
          flex: 1;
          min-height: 0;
          overflow: hidden;
          background: #dde4ef;
        }
        .photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 12%;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease;
          filter: saturate(1.05) brightness(1.02);
        }

        .photo-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem 1.8rem 1.8rem;
          z-index: 2;
          pointer-events: none;
        }
        .overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.02) 0%,
            rgba(0,0,0,0.08) 25%,
            rgba(var(--pcr), 0.3) 50%,
            rgba(var(--pcr), 0.6) 70%,
            rgba(var(--pcr), 0.85) 90%,
            rgba(var(--pcr), 0.95) 100%
          );
          border-radius: 20px 20px 0 0;
          transition: opacity 0.4s ease;
        }
        .overlay-content {
          position: relative;
          z-index: 3;
          color: #fff;
        }
        .overlay-role {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.85;
          display: block;
          margin-bottom: 0.2rem;
        }
        .overlay-name {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1.2;
          text-shadow: 0 2px 20px rgba(0,0,0,0.15);
        }
        .overlay-stats {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.3rem;
          font-size: 0.75rem;
          font-weight: 600;
          opacity: 0.85;
        }
        .dot-sep {
          opacity: 0.4;
        }

        .content-wrapper {
          position: relative;
          background: #fff;
          border-radius: 0;
          transform: none;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
          box-shadow: none;
        }

        @media (hover: hover) and (pointer: fine) {
          .content-wrapper {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            border-radius: 20px 20px 0 0;
            padding-top: 0.5rem;
            transform: translateY(100%);
            z-index: 5;
            box-shadow: 0 -10px 30px rgba(0,0,0,0.08);
            max-height: 70%;
            overflow-y: auto;
          }
          .content-wrapper.content-visible {
            transform: translateY(0);
          }
          .content-wrapper.content-visible ~ .photo-area .overlay-gradient {
            opacity: 0.7;
          }
        }

        @media (hover: none), (pointer: coarse) {
          .tm-card {
            height: auto;
            min-height: 0;
          }
          .card-face { position: relative; }
          .tm-card.is-flipped .card-scene { transform: none; }
          .tm-card.is-flipped .back { display: flex; }
          .tm-card.is-flipped .front { display: none; }
          .tm-card:not(.is-flipped) .back { display: none; }

          .photo-area {
            flex: none;
            aspect-ratio: 4 / 3;
          }
          .photo-overlay {
            padding: 1.2rem 1.5rem 1rem;
          }
          .overlay-name { font-size: 1.15rem; }
          .overlay-role { font-size: 0.58rem; }
          .overlay-stats { font-size: 0.68rem; }
          .front-panel {
            padding: 0.7rem 1.2rem 1rem 1.4rem;
          }
          .person-name { display: block !important; }
        }

        .front-panel {
          padding: 0.7rem 1.2rem 1rem 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .role-tag {
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--pc);
        }

        .person-name {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--navy);
          letter-spacing: -0.018em;
          line-height: 1.25;
          margin: 0;
          display: none;
        }
        .person-name::after {
          content: '';
          display: block;
          width: 32px;
          height: 2.5px;
          background: var(--pc);
          border-radius: 2px;
          margin-top: 0.25rem;
          opacity: 0.5;
          transition: width 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .person-name { display: none; }
          .tm-card:not(.is-flipped):hover .person-name::after {
            width: 56px;
            opacity: 1;
          }
        }

        .person-bio {
          font-size: 0.7rem;
          line-height: 1.5;
          color: #5A5A72;
          margin: 0;
          font-weight: 400;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .certs-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid #EEF1F8;
          padding-top: 0.25rem;
        }
        .cert-row {
          display: flex;
          align-items: flex-start;
          gap: 0.45rem;
          padding: 0.15rem 0;
          border-bottom: 1px solid #EEF1F8;
          transition: border-color 0.3s ease;
        }
        .cert-row:last-child {
          border-bottom: none;
        }
        .cert-icon {
          width: 14px;
          height: 14px;
          border-radius: 3px;
          flex-shrink: 0;
          margin-top: 1px;
          background: rgba(var(--pcr), 0.08);
          color: var(--pc);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .cert-text {
          font-size: 0.65rem;
          font-weight: 500;
          color: #3A4A6A;
          line-height: 1.4;
          word-break: break-word;
          hyphens: auto;
        }

        .front-actions {
          display: flex;
          gap: 0.4rem;
          margin-top: 0.2rem;
          padding-top: 0.35rem;
          border-top: 1px solid #EEF1F8;
        }
        .act-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
          font-family: 'Noto Sans Georgian', sans-serif;
          font-size: 0.6rem;
          border-radius: 8px;
          padding: 0.4rem 0.5rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
          letter-spacing: 0.01em;
          white-space: nowrap;
        }
        .act-ghost {
          background: #F5F7FB;
          border: 1px solid #DDE4F0;
          color: var(--navy);
          font-weight: 600;
        }
        .act-ghost:hover {
          background: rgba(var(--pcr), 0.07);
          border-color: rgba(var(--pcr), 0.28);
          color: var(--pc);
        }
        .act-solid {
          background: var(--pc);
          border: 1px solid var(--pc);
          color: #fff;
          font-weight: 700;
        }
        .act-solid:hover {
          filter: brightness(1.1);
          box-shadow: 0 4px 14px rgba(var(--pcr), 0.3);
        }
        .act-btn svg {
          transition: transform 0.3s ease;
          flex-shrink: 0;
          opacity: 0.7;
        }
        .act-btn:hover svg {
          transform: translateX(3px);
          opacity: 1;
        }

        .back {
          transform: rotateY(180deg);
          background: var(--navy);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 100%;
        }
        .back-photo-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .back-bg-img {
          width: 100%;
          height: 50%;
          object-fit: cover;
          object-position: center 15%;
          display: block;
          filter: brightness(0.28) saturate(0.4);
        }
        .back-bg-mask {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(27,42,74,0.5) 0%, rgba(27,42,74,0.98) 38%, rgba(27,42,74,1) 100%);
        }
        .back-body {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.4rem 1.4rem 1.2rem;
          height: 100%;
          gap: 0.4rem;
          overflow-y: auto;
        }
        .back-ring {
          position: relative;
          width: 68px;
          height: 68px;
          flex-shrink: 0;
        }
        .back-avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          object-fit: cover;
          object-position: top;
          display: block;
          border: 2px solid rgba(255,255,255,0.15);
        }
        .back-name {
          font-size: 1rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.015em;
          text-align: center;
          margin: 0;
        }
        .back-role-tag {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: rgba(var(--pcr), 1);
          background: none;
          border: none;
          padding: 0;
        }
        .back-certs {
          width: 100%;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 0.5rem;
          margin-top: 0.1rem;
        }
        .back-certs-label {
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin: 0 0 0.4rem;
        }
        .back-cert-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.68rem;
          font-weight: 500;
          color: rgba(255,255,255,0.82);
          padding: 0.2rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          line-height: 1.4;
        }
        .back-cert-item:last-child {
          border-bottom: none;
        }
        .bci-check {
          width: 14px;
          height: 14px;
          border-radius: 3px;
          flex-shrink: 0;
          margin-top: 1px;
          background: rgba(var(--pcr), 0.25);
          color: rgba(var(--pcr), 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .back-bio {
          font-size: 0.68rem;
          font-weight: 400;
          line-height: 1.6;
          color: rgba(255,255,255,0.5);
          text-align: center;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .back-profile-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-family: 'Noto Sans Georgian', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          color: #fff;
          background: var(--pc);
          border: none;
          padding: 0.45rem 1rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
          width: 100%;
          margin-top: 0.15rem;
        }
        .back-profile-btn:hover {
          filter: brightness(1.12);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(var(--pcr), 0.3);
        }
        .back-profile-btn svg {
          opacity: 0.85;
          transition: transform 0.3s ease;
        }
        .back-profile-btn:hover svg {
          transform: translateX(3px);
          opacity: 1;
        }

        .back-return {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'Noto Sans Georgian', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.35rem 0.9rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .back-return:hover {
          background: rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.85);
          transform: translateY(-2px);
        }

        .tm-cta-wrap {
          text-align: center;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
        }
        .tm-cta-wrap.hdr-in {
          opacity: 1;
          transform: none;
        }
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
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
          letter-spacing: 0.01em;
          position: relative;
          overflow: hidden;
        }
        .tm-main-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--navy);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .tm-main-btn:hover::before {
          transform: scaleX(1);
          transform-origin: left;
        }
        .tm-main-btn span {
          position: relative;
          z-index: 1;
        }
        .tm-main-btn:hover {
          color: var(--cream);
          transform: translateY(-3px);
          box-shadow: 0 14px 30px -8px rgba(27,42,74,0.3);
        }
        .tm-main-btn.solid {
          background: var(--navy);
          color: var(--cream);
        }
        .tm-main-btn.solid::before {
          background: var(--blue-mid);
        }
        .tm-main-btn.solid:hover {
          box-shadow: 0 14px 30px -8px rgba(27,42,74,0.4);
        }
        .main-btn-arr {
          display: flex;
          align-items: center;
          transition: transform 0.3s ease;
          position: relative;
          z-index: 1;
        }
        .tm-main-btn:hover .main-btn-arr {
          transform: translateX(4px);
        }

        /* ── Team Card Responsive ── */
        @media (max-width: 1024px) {
          .tm-section {
            padding: 4rem 1.5rem 4rem;
          }
          .tm-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          .grid-item {
            max-width: 380px;
          }
          .tm-card {
            max-width: 100%;
            height: auto;
            min-height: 0;
          }
          .card-face {
            position: relative;
          }
          .tm-card.is-flipped .card-scene {
            transform: none;
          }
          .tm-card.is-flipped .back {
            display: flex;
          }
          .tm-card.is-flipped .front {
            display: none;
          }
          .tm-card:not(.is-flipped) .back {
            display: none;
          }
          .photo-area {
            flex: none;
            aspect-ratio: 4 / 3;
            min-height: auto;
          }
          .photo-overlay {
            padding: 1.2rem 1.5rem 1rem;
          }
          .overlay-name {
            font-size: 1.15rem;
          }
          .overlay-role {
            font-size: 0.58rem;
          }
          .overlay-stats {
            font-size: 0.68rem;
          }
          .front-panel {
            padding: 0.7rem 1.2rem 1rem 1.4rem;
          }
          .person-name {
            display: block !important;
          }
          .content-wrapper {
            position: relative !important;
            transform: none !important;
            box-shadow: none !important;
            max-height: none !important;
            overflow-y: visible !important;
            border-radius: 0 !important;
            padding-top: 0 !important;
          }
          .content-wrapper.content-visible ~ .photo-area .overlay-gradient {
            opacity: 1 !important;
          }
          .tm-card:not(.is-flipped):hover .photo-img {
            transform: none !important;
          }
          .tm-card:not(.is-flipped):hover .front {
            box-shadow: 0 1px 3px rgba(27,42,74,0.06), 0 8px 20px rgba(27,42,74,0.07) !important;
          }
          .tm-card:not(.is-flipped):hover .top-bar {
            width: 4px !important;
          }
        }

        @media (max-width: 640px) {
          .tm-section {
            padding: 3rem 0.8rem 3rem;
          }
          .tm-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
            justify-items: center;
          }
          .grid-item {
            max-width: 360px;
          }
          .tm-title {
            font-size: 1.6rem;
          }
          .tm-title br {
            display: none;
          }
          .tm-subtitle {
            font-size: 0.85rem;
          }
          .photo-overlay {
            padding: 0.8rem 1rem 0.8rem;
          }
          .overlay-name {
            font-size: 0.95rem;
          }
          .overlay-role {
            font-size: 0.5rem;
          }
          .overlay-stats {
            font-size: 0.6rem;
          }
          .front-panel {
            padding: 0.6rem 0.8rem 0.8rem 1rem;
          }
          .person-name {
            font-size: 0.85rem;
          }
          .person-bio {
            font-size: 0.65rem;
          }
          .cert-text {
            font-size: 0.6rem;
          }
          .act-btn {
            font-size: 0.55rem;
            padding: 0.35rem 0.4rem;
          }
          .tm-main-btn {
            width: 100%;
            justify-content: center;
            font-size: 0.8rem;
            padding: 0.7rem 1.5rem;
          }
          .back-body {
            padding: 1rem 1rem 0.8rem;
          }
          .back-name {
            font-size: 0.9rem;
          }
          .back-cert-item {
            font-size: 0.6rem;
          }
          .back-profile-btn {
            font-size: 0.6rem;
            padding: 0.4rem 0.8rem;
          }
          .back-return {
            font-size: 0.6rem;
            padding: 0.3rem 0.7rem;
          }
        }

        @media (max-width: 400px) {
          .grid-item {
            max-width: 100%;
          }
          .photo-overlay {
            padding: 0.6rem 0.8rem 0.6rem;
          }
          .overlay-name {
            font-size: 0.85rem;
          }
          .overlay-role {
            font-size: 0.45rem;
          }
          .overlay-stats {
            font-size: 0.55rem;
          }
          .front-panel {
            padding: 0.5rem 0.6rem 0.6rem 0.8rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tm-header,
          .tm-cta-wrap,
          .tm-card,
          .card-scene,
          .photo-img,
          .content-wrapper,
          .act-btn,
          .back-return,
          .badge-pulse,
          .front,
          .tm-main-btn::before,
          .overlay-gradient {
            transition: none !important;
            animation: none !important;
          }
          .tm-card {
            opacity: 1;
            transform: none;
          }
          .tm-header,
          .tm-cta-wrap {
            opacity: 1;
            transform: none;
          }
          .content-wrapper {
            transform: translateY(0) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Team;