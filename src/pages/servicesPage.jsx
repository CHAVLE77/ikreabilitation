import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVICES } from "../../data/services";
import { STATS } from "../../data/services";
import { FUNDING_PROGRAMS } from "../../data/services";
import { INDIVIDUAL_PROGRAM } from "../../data/services";
// ── Data ────────────────────────────────────────────────────────────────────
// NOTE: exported so other pages (e.g. Contact.jsx) can reuse the exact same
// list of services for the booking dropdown, instead of duplicating it.


// ── Helpers ─────────────────────────────────────────────────────────────────
function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

// ── Modal ────────────────────────────────────────────────────────────────────
function Modal({ service, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Stores the chosen service so the Contact page can auto-select it in the
  // (now dropdown-only) service field, then navigates there.
  const handleBook = () => {
    sessionStorage.setItem("selectedService", service.title);
    onClose();
    navigate("/contact");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        style={{ "--acc": service.accent, "--glow": service.glow }}
      >
        <button className="modal-close" onClick={onClose} aria-label="დახურვა">
          ✕
        </button>

        <div className="modal-img-wrap">
          <img
            src={service.image}
            alt={service.title}
            className="modal-img"
            loading="lazy"
          />
          <div className="modal-img-overlay" />
          <div className="modal-tag">{service.tag}</div>
        </div>

        <div className="modal-body">
          <h2 className="modal-title">{service.title}</h2>
          <p className="modal-short">{service.short}</p>
          <p className="modal-desc">{service.description}</p>

          <div className="modal-section">
            <span className="modal-label"> ვისთვის</span>
            <p className="modal-for">{service.forWhom}</p>
          </div>

          <div className="modal-section">
            <span className="modal-label"> პროცესი</span>
            <div className="modal-steps">
              {service.steps.map((s, i) => (
                <div key={i} className="modal-step">
                  <div className="step-num">{i + 1}</div>
                  <span>{s}</span>
                  {i < service.steps.length - 1 && <div className="step-arrow">→</div>}
                </div>
              ))}
            </div>
          </div>

          <button type="button" className="modal-cta" onClick={handleBook}>
            დაჯავშნა
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <style >{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9000;
          background: rgba(2, 10, 30, 0.82);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.25s ease;
        }
        .modal-box {
          background: #0d1b3e;
          border-radius: 24px;
          max-width: 640px;
          width: 100%;
          max-height: 92vh;
          overflow-y: auto;
          border: 1px solid rgba(251, 191, 36, 0.2);
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.7), 0 0 0 1px var(--acc, #fbbf24) inset;
          position: relative;
          animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          transition: all 0.2s;
        }
        .modal-close:hover {
          background: rgba(255, 255, 255, 0.18);
          transform: scale(1.1);
        }
        .modal-img-wrap {
          position: relative;
          height: 240px;
          overflow: hidden;
          border-radius: 24px 24px 0 0;
        }
        .modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .modal-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 20%, rgba(13, 27, 62, 0.9) 100%);
        }
        .modal-tag {
          position: absolute;
          top: 18px;
          left: 18px;
          background: var(--acc, #fbbf24);
          color: #0d1b3e;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 20px;
        }
        .modal-body {
          padding: 1.5rem 1.75rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }
        .modal-title {
          font-size: 1.5rem;
          font-weight: 900;
          color: #fff;
          margin: 0;
          background: linear-gradient(135deg, #fff 50%, var(--acc, #fbbf24));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .modal-short {
          font-size: 0.8rem;
          color: var(--acc, #fbbf24);
          font-weight: 600;
          margin: -4px 0 0;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .modal-desc {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.82);
          line-height: 1.7;
          margin: 0;
        }
        .modal-section {
          background: rgba(255, 255, 255, 0.04);
          border-radius: 14px;
          padding: 0.9rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.07);
        }
        .modal-label {
          display: block;
          font-size: 0.67rem;
          font-weight: 700;
          color: var(--acc, #fbbf24);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .modal-for {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.78);
          line-height: 1.6;
          margin: 0;
        }
        .modal-steps {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }
        .modal-step {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .step-num {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--acc, #fbbf24);
          color: #0d1b3e;
          font-size: 0.7rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .modal-step span {
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 600;
        }
        .step-arrow {
          color: rgba(255, 255, 255, 0.3);
          font-size: 0.9rem;
        }
        .modal-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(105deg, #0066cc, #004c99);
          color: #fff;
          text-decoration: none;
          border: none;
          font-family: inherit;
          padding: 0.9rem 1.8rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0, 76, 153, 0.4);
          transition: all 0.25s ease;
          align-self: flex-start;
          margin-top: 0.25rem;
        }
        .modal-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 76, 153, 0.55);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(40px) scale(0.96);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        @media (max-width: 520px) {
          .modal-box {
            border-radius: 20px;
          }
          .modal-img-wrap {
            height: 180px;
          }
          .modal-body {
            padding: 1.1rem 1.2rem 1.4rem;
          }
          .modal-title {
            font-size: 1.2rem;
          }
          .modal-cta {
            align-self: stretch;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────
function ServiceCard({ service, idx, onOpen, onClick }) {
  const ref = useRef(null);
  const visible = useInView(ref, 0.1);
  const [hovered, setHovered] = useState(false);

  // If an external onClick is provided, use it; otherwise fall back to onOpen
  const handleCardClick = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      onOpen(service);
    }
  };

  return (
    <article
      ref={ref}
      className={`svc-card ${visible ? "card-in" : ""}`}
      style={{
        "--acc": service.accent,
        "--glow": service.glow,
        transitionDelay: `${(idx % 3) * 0.1}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleCardClick}
    >
      <div className="card-img-wrap">
        <img src={service.image} alt={service.title} loading="lazy" className="card-img" />
        <div className="card-overlay" />
        <div className="card-wash" />
        <span className="card-tag">{service.tag}</span>
      </div>

      <div className="card-body">
        <h3 className="card-title">{service.title}</h3>
        <p className="card-short">{service.short}</p>
        <p className="card-desc">{service.description}</p>

        <div className="card-steps">
          {service.steps.map((s, i) => (
            <span key={i} className="card-step">
              <span className="step-dot" />
              {s}
            </span>
          ))}
        </div>

        {/* "გადიდება" is now purely visual – click bubbles to the article */}
        <span className="card-cta">
          გადიდება
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="card-glow-dot" />
      </div>

      <div className="card-line" />

      <style >{`
        .svc-card {
          --acc: #fbbf24;
          --glow: rgba(251, 191, 36, 0.18);
          background: rgba(13, 27, 62, 0.75);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 22px;
          overflow: hidden;
          cursor: pointer;
          opacity: 0;
          transform: translateY(44px) scale(0.96);
          transition:
            opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.65s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.35s ease,
            border-color 0.35s ease;
          position: relative;
          will-change: transform, opacity;
        }
        .svc-card.card-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .svc-card:hover {
          transform: translateY(-10px) scale(1.018) !important;
          border-color: rgba(251, 191, 36, 0.35);
          box-shadow:
            0 30px 60px rgba(0, 0, 0, 0.5),
            0 0 40px var(--glow, rgba(251, 191, 36, 0.18));
        }
        .svc-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, var(--glow), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 0;
        }
        .svc-card:hover::before {
          opacity: 1;
        }

        .card-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .svc-card:hover .card-img {
          transform: scale(1.1);
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(2, 10, 30, 0.25) 0%, rgba(2, 10, 30, 0.7) 100%);
          z-index: 1;
        }
        .card-wash {
          position: absolute;
          inset: 0;
          background: var(--acc, #fbbf24);
          opacity: 0;
          mix-blend-mode: multiply;
          transition: opacity 0.4s ease;
          z-index: 1;
        }
        .svc-card:hover .card-wash {
          opacity: 0.12;
        }
        .card-tag {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
          background: var(--acc, #fbbf24);
          color: #020a1e;
          font-size: 0.6rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 4px 10px;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        .card-body {
          padding: 1.25rem 1.3rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          position: relative;
          z-index: 1;
        }
        .card-title {
          font-size: 1.05rem;
          font-weight: 900;
          color: #fff;
          margin: 0;
          letter-spacing: -0.01em;
          transition: color 0.25s ease;
        }
        .svc-card:hover .card-title {
          color: var(--acc, #fbbf24);
        }
        .card-short {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--acc, #fbbf24);
          opacity: 0.85;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0;
        }
        .card-desc {
          font-size: 0.81rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.68);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-steps {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 2px;
        }
        .card-step {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.67rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.55);
          background: rgba(255, 255, 255, 0.05);
          padding: 3px 9px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          transition: all 0.25s ease;
        }
        .svc-card:hover .card-step {
          color: rgba(255, 255, 255, 0.82);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.12);
        }
        .step-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--acc, #fbbf24);
          flex-shrink: 0;
        }

        .card-cta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--acc, #fbbf24);
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          cursor: default; /* no longer clickable */
          pointer-events: none;
        }
        .svc-card:hover .card-cta {
          opacity: 1;
          transform: translateX(0);
        }

        .card-glow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--acc, #fbbf24);
          box-shadow: 0 0 10px var(--acc, #fbbf24);
          opacity: 0;
          transition: opacity 0.3s ease;
          animation: pulse-glow 2s infinite;
        }
        .svc-card:hover .card-glow-dot {
          opacity: 1;
        }

        .card-line {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          width: 0%;
          background: linear-gradient(90deg, var(--acc, #fbbf24), rgba(251, 191, 36, 0.3));
          border-radius: 0 2px 2px 0;
          transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .svc-card:hover .card-line {
          width: 100%;
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.4);
          }
        }
      `}</style>
    </article>
  );
}

// ── Stat Counter ─────────────────────────────────────────────────────────────
function StatCounter({ value, label, delay }) {
  const ref = useRef(null);
  const visible = useInView(ref, 0.3);
  return (
    <div
      ref={ref}
      className={`stat-item ${visible ? "stat-in" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <style>{`
        .stat-item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
          text-align: center;
        }
        .stat-item.stat-in {
          opacity: 1;
          transform: translateY(0);
        }
        .stat-value {
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 900;
          color: #fbbf24;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .stat-label {
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
          margin-top: 6px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}

// ── Funding Program Card ──────────────────────────────────────────────────
function FundingCard({ program, idx }) {
  const ref = useRef(null);
  const visible = useInView(ref, 0.1);

  return (
    <div
      ref={ref}
      className={`funding-card ${visible ? "funding-in" : ""}`}
      style={{
        "--acc": program.accent,
        transitionDelay: `${(idx % 3) * 0.08}s`,
      }}
    >
      <div className="funding-accent" style={{ background: program.accent }} />
      <div className="funding-body">
        <h4 className="funding-title">{program.title}</h4>
        <p className="funding-desc">{program.description}</p>
      </div>
      <div className="funding-arrow">→</div>

      <style>{`
        .funding-card {
          display: flex;
          align-items: stretch;
          background: rgba(13, 27, 62, 0.55);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 18px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px) scale(0.97);
          transition:
            opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.35s ease,
            border-color 0.35s ease;
          cursor: default;
          position: relative;
        }
        .funding-card.funding-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .funding-card:hover {
          border-color: rgba(251, 191, 36, 0.2);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(251, 191, 36, 0.05) inset;
          transform: translateY(-4px) scale(1.005) !important;
        }

        .funding-accent {
          width: 5px;
          flex-shrink: 0;
          border-radius: 18px 0 0 18px;
          transition: width 0.3s ease;
        }
        .funding-card:hover .funding-accent {
          width: 7px;
        }

        .funding-body {
          padding: 1.25rem 1.25rem 1.25rem 1.1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .funding-title {
          font-size: 0.92rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.35;
          letter-spacing: -0.01em;
          margin: 0;
          transition: color 0.25s ease;
        }
        .funding-card:hover .funding-title {
          color: var(--acc, #fbbf24);
        }
        .funding-desc {
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
          margin: 0;
        }
        .funding-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-right: 1.2rem;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.15);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .funding-card:hover .funding-arrow {
          color: var(--acc, #fbbf24);
          transform: translateX(4px);
        }

        @media (max-width: 640px) {
          .funding-body {
            padding: 1rem 1rem 1rem 0.9rem;
          }
          .funding-title {
            font-size: 0.82rem;
          }
          .funding-desc {
            font-size: 0.72rem;
          }
          .funding-arrow {
            padding-right: 0.8rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}

// ── Individual Program Component ─────────────────────────────────────────
function IndividualProgram({ program }) {
  const ref = useRef(null);
  const visible = useInView(ref, 0.1);

  return (
    <div
      ref={ref}
      className={`individual-program ${visible ? "individual-in" : ""}`}
      style={{ "--acc": program.accent }}
    >
      <div className="individual-accent" style={{ background: program.accent }} />
      <div className="individual-content">
        <div className="individual-header">
          <h4 className="individual-title">{program.title}</h4>
          <p className="individual-desc">{program.description}</p>
        </div>
        <ul className="individual-tests">
          {program.tests.map((test, i) => (
            <li key={i} className="individual-test-item">
              <span className="test-dot" />
              {test}
            </li>
          ))}
        </ul>
      </div>
      <div className="individual-arrow">→</div>

      <style>{`
        .individual-program {
          display: flex;
          align-items: stretch;
          background: rgba(13, 27, 62, 0.65);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(251, 191, 36, 0.15);
          border-radius: 18px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px) scale(0.97);
          transition:
            opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.35s ease,
            border-color 0.35s ease;
          position: relative;
          margin-top: 1.5rem;
        }
        .individual-program.individual-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .individual-program:hover {
          border-color: rgba(251, 191, 36, 0.4);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(251, 191, 36, 0.08) inset;
          transform: translateY(-4px) scale(1.005) !important;
        }

        .individual-accent {
          width: 6px;
          flex-shrink: 0;
          border-radius: 18px 0 0 18px;
          transition: width 0.3s ease;
        }
        .individual-program:hover .individual-accent {
          width: 9px;
        }

        .individual-content {
          padding: 1.4rem 1.6rem 1.4rem 1.4rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .individual-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .individual-title {
          font-size: 1.05rem;
          font-weight: 900;
          color: #fff;
          line-height: 1.3;
          margin: 0;
          letter-spacing: -0.01em;
          transition: color 0.25s ease;
        }
        .individual-program:hover .individual-title {
          color: var(--acc, #f472b6);
        }
        .individual-desc {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.6;
          margin: 0;
        }
        .individual-tests {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .individual-test-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
          padding: 4px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }
        .individual-test-item:last-child {
          border-bottom: none;
        }
        .test-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--acc, #f472b6);
          flex-shrink: 0;
          box-shadow: 0 0 8px var(--acc, #f472b6);
        }
        .individual-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-right: 1.4rem;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.15);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .individual-program:hover .individual-arrow {
          color: var(--acc, #f472b6);
          transform: translateX(4px);
        }

        @media (max-width: 640px) {
          .individual-content {
            padding: 1rem 1.2rem 1rem 1rem;
          }
          .individual-title {
            font-size: 0.92rem;
          }
          .individual-test-item {
            font-size: 0.76rem;
          }
          .individual-arrow {
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [filter, setFilter] = useState("all");
  const headerRef = useRef(null);
  const headerVisible = useInView(headerRef, 0.15);
  const fundingRef = useRef(null);
  const fundingVisible = useInView(fundingRef, 0.1);

  const FILTERS = [
    { id: "all", label: "ყველა" },
    { id: "therapy", label: "თერაპია" },
    { id: "support", label: "მხარდაჭერა" },
    { id: "development", label: "განვითარება" },
  ];

  const filtered = filter === "all"
    ? SERVICES
    : SERVICES.filter((s) => s.category === filter);

  // Handler for card clicks – navigate for id 10, else open modal
  const handleCardClick = (service) => {
    if (service.id === 10) {
      navigate("/fizio");
    } else {
      setActiveModal(service);
    }
  };

  return (
    <div className="page-root">
      {/* ── Hero Banner ── */}
      <header className="page-hero">
        <div className="hero-noise" />
        <div className="hero-grid-bg" />
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-orb orb-3" />

        <div className="hero-inner" ref={headerRef}>
          <span className={`hero-badge ${headerVisible ? "badge-in" : ""}`}>
            <span className="badge-dot" />
            ჩვენი მომსახურება
          </span>
          <h1 className={`hero-title ${headerVisible ? "title-in" : ""}`}>
            სრული მხარდაჭერა
            <br />
            <span className="title-gold">ყოველ ნაბიჯზე</span>
          </h1>
          <p className={`hero-sub ${headerVisible ? "sub-in" : ""}`}>
            გამოცდილი სპეციალისტების მრავალპროფილური გუნდი — ერთი ადგილი,
            სადაც ბავშვი და ოჯახი იღებს ყველა საჭირო დახმარებას.
          </p>

          <div className={`stats-row ${headerVisible ? "stats-in" : ""}`}>
            {STATS.map((s, i) => (
              <StatCounter key={i} value={s.value} label={s.label} delay={0.5 + i * 0.1} />
            ))}
          </div>
        </div>

        <div className="scroll-hint">
          <span className="scroll-label">სერვისები</span>
          <div className="scroll-pill">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12l7 7 7-7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </header>

      {/* ── Services Grid ── */}
      <section className="services-section">
        <div className="section-container">
          {/* Filter Pills */}
          <div className="filter-row">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={`filter-btn ${filter === f.id ? "active" : ""}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                {filter === f.id && <span className="filter-dot" />}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="svc-grid">
            {filtered.map((s, idx) => (
              <ServiceCard
                key={s.id}
                service={s}
                idx={idx}
                onOpen={setActiveModal}
                onClick={() => handleCardClick(s)}
              />
            ))}
          </div>

          {/* ── STATE FUNDING PROGRAMS ── */}
          <div className="funding-section" ref={fundingRef}>
            {/* Header */}
            <div className={`funding-header ${fundingVisible ? "funding-header-in" : ""}`}>
              <div className="funding-header-left">
                <span className="funding-badge">
                  <span className="funding-badge-dot" />
                  სახელმწიფო პროგრამები
                </span>
                <h2 className="funding-title-main">
                  სახელმწიფო დაფინანსების
                  <br />
                  <span className="funding-title-gold">პროგრამები</span>
                </h2>
                <p className="funding-sub">
                  ჩვენი მიზანია, თითოეულ ბენეფიციარს შევთავაზოთ
                  მაღალი ხარისხის მომსახურება. ამისთვის ჩვენ
                  ვმუშაობთ რამდენიმე სახელმწიფო დაფინანსების
                  პროგრამის ფარგლებში.
                </p>
              </div>
              <div className="funding-header-ornament">
                <div className="ornament-ring" />
                <div className="ornament-ring" />
                <div className="ornament-ring" />
              </div>
            </div>

            {/* Grid of first 5 programs */}
            <div className="funding-grid">
              {FUNDING_PROGRAMS.map((p, idx) => (
                <FundingCard key={p.id} program={p} idx={idx} />
              ))}
            </div>

            {/* 6th program – Individual Program (separate) */}
            <IndividualProgram program={INDIVIDUAL_PROGRAM} />
          </div>

          {/* CTA Banner */}
          <div className="cta-banner">
            <div className="cta-orb" />
            <div className="cta-content">
              <h3 className="cta-title">მზად ხართ პირველი ნაბიჯისთვის?</h3>
              <p className="cta-sub">
                ჩვენი გუნდი დაგეხმარებათ სწორი სერვისის არჩევაში — საწყისი
                კონსულტაცია.
              </p>
            </div>
            <a href="/contact" className="cta-btn">
              ჩაეწერე კონსულტაციაზე
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeModal && <Modal service={activeModal} onClose={() => setActiveModal(null)} />}

      <style >
        {`
          *,
          *::before, 
          *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          } 
        `}
      </style>

      <style >
        {`
          /* ── Root ── */
          .page-root {
            font-family: "Noto Sans Georgian", system-ui, sans-serif;
            background: #020a1e;
            min-height: 100vh;
            color: #fff;
          }

          /* ── Hero ── */
          .page-hero {
            position: relative;
            min-height: 100svh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            padding: clamp(80px, 12vw, 130px) clamp(20px, 6vw, 80px)
              clamp(60px, 8vw, 100px);
          }

          .hero-grid-bg {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(251, 191, 36, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251, 191, 36, 0.04) 1px, transparent 1px);
            background-size: 60px 60px;
            mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%);
          }

          .hero-noise {
            position: absolute;
            inset: 0;
            z-index: 1;
            opacity: 0.025;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
            background-size: 200px 200px;
            pointer-events: none;
          }

          .hero-orb {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            filter: blur(80px);
          }
          .orb-1 {
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(0, 102, 204, 0.35), transparent 70%);
            top: -120px;
            left: -100px;
            animation: driftOrb 12s ease-in-out infinite;
          }
          .orb-2 {
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(251, 191, 36, 0.15), transparent 70%);
            bottom: -80px;
            right: -60px;
            animation: driftOrb 15s ease-in-out infinite reverse;
          }
          .orb-3 {
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(96, 165, 250, 0.12), transparent 70%);
            top: 40%;
            left: 60%;
            animation: driftOrb 20s ease-in-out infinite;
            animation-delay: -7s;
          }

          .hero-inner {
            position: relative;
            z-index: 2;
            max-width: 900px;
            width: 100%;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: clamp(20px, 3vw, 32px);
          }

          .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 22px;
            border-radius: 100px;
            background: rgba(251, 191, 36, 0.08);
            border: 1px solid rgba(251, 191, 36, 0.4);
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #fbbf24;
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            transition: opacity 0.7s ease, transform 0.7s ease;
          }
          .hero-badge.badge-in {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          .badge-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #fbbf24;
            animation: pulse 2s infinite;
          }

          .hero-title {
            font-size: clamp(2.4rem, 6vw, 5rem);
            font-weight: 900;
            line-height: 1.12;
            letter-spacing: -0.03em;
            color: #fff;
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease 0.15s,
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
          }
          .hero-title.title-in {
            opacity: 1;
            transform: translateY(0);
          }
          .title-gold {
            background: linear-gradient(135deg, #fbbf24 30%, #f59e0b 70%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }

          .hero-sub {
            font-size: clamp(0.9rem, 2vw, 1.1rem);
            color: rgba(255, 255, 255, 0.72);
            line-height: 1.75;
            max-width: 620px;
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s;
          }
          .hero-sub.sub-in {
            opacity: 1;
            transform: translateY(0);
          }

          .stats-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            width: 100%;
            padding: 2rem 2.5rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.07);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            margin-top: 8px;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s;
          }
          .stats-row.stats-in {
            opacity: 1;
            transform: translateY(0);
          }
          .stats-row > * + * {
            border-left: 1px solid rgba(255, 255, 255, 0.07);
            padding-left: 2rem;
            margin-left: -1rem;
          }

          .scroll-hint {
            position: absolute;
            bottom: clamp(24px, 4vw, 40px);
            left: 50%;
            transform: translateX(-50%);
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            color: rgba(255, 255, 255, 0.45);
            animation: fadeUp 1s ease 1.5s both;
          }
          .scroll-label {
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;
          }
          .scroll-pill {
            width: 24px;
            height: 38px;
            border-radius: 100px;
            border: 1.5px solid currentColor;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding-top: 7px;
          }
          .scroll-pill svg {
            animation: bounce 1.6s ease-in-out infinite;
          }

          /* ── Services Section ── */
          .services-section {
            padding: clamp(56px, 8vw, 96px) clamp(20px, 5vw, 64px);
            background: linear-gradient(180deg, #020a1e 0%, #061a3a 50%, #020a1e 100%);
            position: relative;
            overflow:hidden;
          }
          .services-section::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.4), transparent);
          }

          .section-container {
            max-width: 1280px;
            margin: 0 auto;
          }

          /* Filter */
          .filter-row {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 2.5rem;
            flex-wrap: wrap;
          }
          .filter-btn {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 9px 22px;
            border-radius: 40px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.65);
            font-family: "Noto Sans Georgian", sans-serif;
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.25s ease;
            letter-spacing: 0.02em;
          }
          .filter-btn:hover {
            background: rgba(255, 255, 255, 0.09);
            border-color: rgba(251, 191, 36, 0.3);
            color: #fff;
          }
          .filter-btn.active {
            background: rgba(251, 191, 36, 0.1);
            border-color: rgba(251, 191, 36, 0.55);
            color: #fbbf24;
          }
          .filter-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #fbbf24;
            animation: pulse 2s infinite;
          }

          .svc-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            margin-bottom: 3.5rem;
          }

          /* ── STATE FUNDING PROGRAMS ── */
          .funding-section {
            margin: 2.5rem 0 3.5rem;
            padding: 2.8rem 2.5rem;
            background: radial-gradient(ellipse at 30% 0%, rgba(251, 191, 36, 0.04), transparent 60%),
              rgba(13, 27, 62, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 28px;
            position: relative;
            overflow: hidden;
          }
          .funding-section::before {
            content: "";
            position: absolute;
            top: -50%;
            right: -20%;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 102, 204, 0.06), transparent 70%);
            pointer-events: none;
          }
          .funding-section::after {
            content: "";
            position: absolute;
            bottom: -40%;
            left: -10%;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(251, 191, 36, 0.04), transparent 70%);
            pointer-events: none;
          }

          .funding-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 2rem;
            margin-bottom: 2.2rem;
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.7s ease, transform 0.7s ease;
            position: relative;
            z-index: 1;
          }
          .funding-header.funding-header-in {
            opacity: 1;
            transform: translateY(0);
          }

          .funding-header-left {
            flex: 1;
          }
          .funding-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 5px 16px;
            border-radius: 100px;
            background: rgba(0, 102, 204, 0.12);
            border: 1px solid rgba(0, 102, 204, 0.3);
            font-size: 0.6rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #60a5fa;
            margin-bottom: 12px;
          }
          .funding-badge-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #60a5fa;
            animation: pulse 2s infinite;
          }

          .funding-title-main {
            font-size: clamp(1.8rem, 3.2vw, 2.8rem);
            font-weight: 900;
            line-height: 1.15;
            color: #fff;
            margin: 0 0 8px;
            letter-spacing: -0.02em;
          }
          .funding-title-gold {
            background: linear-gradient(135deg, #fbbf24 30%, #f59e0b 70%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }

          .funding-sub {
            font-size: clamp(0.82rem, 1.1vw, 0.95rem);
            color: rgba(255, 255, 255, 0.65);
            line-height: 1.75;
            max-width: 620px;
            margin: 0;
          }

          .funding-header-ornament {
            display: flex;
            align-items: center;
            gap: 6px;
            flex-shrink: 0;
            padding-top: 6px;
          }
          .ornament-ring {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 2px solid rgba(251, 191, 36, 0.25);
            transition: all 0.4s ease;
          }
          .ornament-ring:nth-child(2) {
            width: 14px;
            height: 14px;
            border-color: rgba(251, 191, 36, 0.4);
          }
          .ornament-ring:nth-child(3) {
            width: 18px;
            height: 18px;
            border-color: rgba(251, 191, 36, 0.55);
          }
          .funding-header:hover .ornament-ring {
            border-color: rgba(251, 191, 36, 0.7);
            transform: scale(1.1);
          }

          .funding-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            position: relative;
            z-index: 1;
          }

          /* CTA Banner */
          .cta-banner {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 1.5rem;
            padding: 2.5rem 2.8rem;
            background: linear-gradient(135deg, rgba(0, 76, 153, 0.3) 0%, rgba(0, 102, 204, 0.15) 100%);
            border: 1px solid rgba(0, 102, 204, 0.35);
            border-radius: 24px;
            overflow: hidden;
          }
          .cta-orb {
            position: absolute;
            top: -60px;
            right: -40px;
            width: 280px;
            height: 280px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(251, 191, 36, 0.12), transparent 70%);
            pointer-events: none;
          }
          .cta-content {
            position: relative;
            z-index: 1;
            max-width: 560px;
          }
          .cta-title {
            font-size: clamp(1.2rem, 3vw, 1.6rem);
            font-weight: 900;
            color: #fff;
            margin-bottom: 8px;
          }
          .cta-sub {
            font-size: 0.88rem;
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.6;
          }
          .cta-btn {
            position: relative;
            z-index: 1;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: linear-gradient(105deg, #fbbf24, #f59e0b);
            color: #020a1e;
            padding: clamp(12px, 2vw, 15px) clamp(20px, 3vw, 32px);
            border-radius: 50px;
            font-family: "Noto Sans Georgian", sans-serif;
            font-size: 0.88rem;
            font-weight: 800;
            text-decoration: none;
            transition: all 0.28s ease;
            white-space: nowrap;
            box-shadow: 0 8px 28px rgba(251, 191, 36, 0.35);
            flex-shrink: 0;
          }
          .cta-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 14px 36px rgba(251, 191, 36, 0.5);
          }

          /* ── Animations ── */
          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.4;
              transform: scale(1.3);
            }
          }
          @keyframes bounce {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(6px);
            }
          }
          @keyframes driftOrb {
            0%,
            100% {
              transform: translate(0, 0);
            }
            33% {
              transform: translate(30px, -20px);
            }
            66% {
              transform: translate(-20px, 25px);
            }
          }
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }

          /* ── Responsive ── */
          @media (max-width: 1024px) {
            .svc-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            .stats-row {
              grid-template-columns: repeat(2, 1fr);
              gap: 1.5rem;
            }
            .stats-row > * + * {
              border-left: none;
              padding-left: 0;
              margin-left: 0;
            }
            .stats-row > *:nth-child(2n) {
              border-left: 1px solid rgba(255, 255, 255, 0.07);
              padding-left: 1.5rem;
              margin-left: -0.75rem;
            }
            .funding-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            .funding-section {
              padding: 2rem 1.5rem;
            }
          }

          @media (max-width: 768px) {
            .funding-header {
              flex-direction: column;
              gap: 1rem;
            }
            .funding-header-ornament {
              align-self: flex-start;
            }
            .funding-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 640px) {
            .svc-grid {
              grid-template-columns: 1fr;
            }
            .stats-row {
              grid-template-columns: repeat(2, 1fr);
              padding: 1.4rem;
              gap: 1.2rem;
            }
            .stats-row > *:nth-child(2n) {
              padding-left: 1rem;
              margin-left: -0.5rem;
            }
            .cta-banner {
              padding: 1.75rem 1.5rem;
            }
            .cta-btn {
              width: 100%;
              justify-content: center;
            }
            .funding-section {
              padding: 1.5rem 1rem;
              border-radius: 20px;
              margin: 1.5rem 0 2.5rem;
            }
            .funding-title-main {
              font-size: 1.4rem;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-badge,
            .hero-title,
            .hero-sub,
            .stats-row,
            .hero-orb,
            .scroll-pill svg,
            .badge-dot,
            .filter-dot,
            .funding-header,
            .funding-card,
            .individual-program {
              animation: none !important;
              transition: none !important;
            }
            .hero-badge,
            .hero-title,
            .hero-sub,
            .stats-row,
            .funding-header,
            .funding-card,
            .individual-program {
              opacity: 1;
              transform: none;
            }
          }
        `}
      </style>
    </div>
  );
}