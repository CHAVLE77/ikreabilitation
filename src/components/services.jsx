import { useCallback, useEffect, useRef, useState } from "react";
import serv1 from "/serv1.webp";
import serv2 from "/serv2.webp";
import serv3 from "/serv3.webp";

const servicesData = [
  {
    id: 1,
    title: "მეტყველების თერაპია",
    subtitle: "ლოგოპედი",
    description:
      "მეტყველების, გამოთქმისა და კომუნიკაციის დარღვევების დიაგნოსტიკა და კორექცია. ინდივიდუალური მიდგომა და თამაშზე დაფუძნებული თერაპია.",
    forWhom:
      "ბავშვები მეტყველების შეფერხებით, ბგერათა გამოთქმის პრობლემებით, ჭექა-ქუხილით ან აფაზიით.",
    steps: ["შეფასება", "გეგმა", "თერაპია", "კონტროლი"],
    image: serv1,
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
    steps: ["შეფასება", "მიზნები", "სეანსები", "შედეგი"],
    image: serv2,
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
    steps: ["დიაგნოსტიკა", "IEP", "მუშაობა", "პროგრესი"],
    image: serv3,
    color: "#2B4A8A",
  },
];

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UsersIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FlowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M4 6h10M4 12h16M4 18h7"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ── Modal ───────────────────────────────────────────── */
function ServiceModal({ service, onClose }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(true));
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className={`svm-backdrop ${open ? "is-open" : ""}`} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={service.title}
        className="svm-box"
        onClick={(e) => e.stopPropagation()}
        style={{ "--cc": service.color }}
      >
        <button className="svm-close" onClick={onClose} aria-label="დახურვა">
          <CloseIcon />
        </button>

        <div className="svm-img-wrap">
          <img className="svm-img" src={service.image} alt={service.title} />
          <div className="svm-img-overlay" />
          <span className="svm-tag">{service.subtitle}</span>
        </div>

        <div className="svm-body">
          <h3 className="svm-title stg" style={{ "--d": "0.06s" }}>
            {service.title}
          </h3>
          <p className="svm-desc stg" style={{ "--d": "0.11s" }}>
            {service.description}
          </p>

          <div className="svm-section stg" style={{ "--d": "0.16s" }}>
            <div className="svm-label">
              <UsersIcon />
              ვისთვის
            </div>
            <p className="svm-for">{service.forWhom}</p>
          </div>

          <div className="stg" style={{ "--d": "0.21s" }}>
            <div className="svm-label svm-label-plain">
              <FlowIcon />
              პროცესი
            </div>
            <div className="svm-steps">
              {service.steps.map((s, i) => (
                <div className="svm-step-wrap" key={s}>
                  <div className="svm-step" style={{ "--sd": `${0.26 + i * 0.07}s` }}>
                    <span className="svm-step-num">{i + 1}</span>
                    <span className="svm-step-text">{s}</span>
                  </div>
                  {i < service.steps.length - 1 && (
                    <span className="svm-step-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            className="svm-cta stg"
            style={{ "--d": "0.32s" }}
            onClick={() => {
              sessionStorage.setItem("selectedService", service.title);
              onClose();
              const contactEl = document.getElementById("contact");
              if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
            }}
          >
            კონსულტაციის ჩაწერა
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Card ────────────────────────────────────────────── */
function ServiceCard({
  service,
  idx,
  visible,
  onOpen,
  cardRef,
}) {
  const innerRef = useRef(null);

  const onMove = useCallback((e) => {
    const el = innerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - py) * 7}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 9}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }, []);

  const onLeave = useCallback(() => {
    const el = innerRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <div
      ref={cardRef}
      className={`svc-card-shell ${visible ? "card-in" : ""}`}
      style={{ transitionDelay: `${(idx % 4) * 0.11}s` }}
    >
      <div
        ref={innerRef}
        className="svc-card"
        style={{ "--cc": service.color }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onOpen}
        role="button"
        tabIndex={0}
        aria-label={`${service.title} — დეტალების ნახვა`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
      >
        <span className="svc-halo" aria-hidden />
        <div className="card-img-wrap">
          <img className="card-img" src={service.image} alt={service.title} loading="lazy" />
          <span className="card-overlay" />
          <span className="card-wash" />
          <span className="card-sheen" />
          <span className="card-img-tag">{service.subtitle}</span>
        </div>

        <div className="card-body">
          <h3 className="card-title">{service.title}</h3>
          <p className="card-desc">{service.description}</p>

          <div className="card-audience">
            <div className="aud-label">
              <UsersIcon />
              ვისთვის
            </div>
            <p className="aud-txt">{service.forWhom}</p>
          </div>

          <div className="card-cta-row">
            <span>დეტალურად</span>
            <span className="cta-arr">
              <ArrowIcon />
            </span>
          </div>
        </div>

        <span className="card-line" />
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────── */
const Services = ({ preview = false }) => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [activeModal, setActiveModal] = useState(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);

  const displayed = preview ? servicesData.slice(0, 3) : servicesData;

  useEffect(() => {
    const hObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.15 },
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
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );
    cardRefs.current.forEach((c) => c && cObs.observe(c));

    return () => {
      hObs.disconnect();
      cObs.disconnect();
    };
  }, [displayed.length]);

  return (
    <section id="services" className="svc-section" ref={sectionRef}>
      <span className="bg-blob blob-1" aria-hidden />
      <span className="bg-blob blob-2" aria-hidden />
      <span className="svc-grid-lines" aria-hidden />

      <div className="svc-container">
        <div className={`svc-header ${headerVisible ? "hdr-in" : ""}`}>
          <span className="svc-badge">
            <span className="badge-pulse" />
            ჩვენი მომსახურება
          </span>
          <h2 className="svc-title">
            სერვისები — <span className="svc-accent">სწორი მხარდაჭერა</span>
          </h2>
          <p className="svc-subtitle">
            მრავალპროფილური გუნდი, რომელიც ფარავს განვითარებისა და თერაპიის ყველა მიმართულებას.
          </p>
        </div>

        <div className={`svc-grid ${preview ? "grid-preview" : "grid-full"}`}>
          {displayed.map((s, idx) => (
            <ServiceCard
              key={s.id}
              service={s}
              idx={idx}
              visible={visibleCards.has(idx)}
              onOpen={() => setActiveModal(s)}
              cardRef={(el) => {
                cardRefs.current[idx] = el;
              }}
            />
          ))}
        </div>

        <div className={`svc-cta-wrap ${headerVisible ? "hdr-in" : ""}`}>
          {preview ? (
            <a href="/services" className="svc-btn outlined">
              იხილეთ ყველა სერვისი
              <span className="btn-arr">
                <ArrowIcon />
              </span>
            </a>
          ) : (
            <a href="#contact" className="svc-btn filled">
              კონსულტაციის ჩაწერა
              <span className="btn-arr">
                <ArrowIcon />
              </span>
            </a>
          )}
        </div>
      </div>

      {activeModal && <ServiceModal service={activeModal} onClose={() => setActiveModal(null)} />}

      <style>{`
        .svc-section {
          --cream: #F5F0E8;
          --navy: #1B2A4A;
          --blue-mid: #2B4A8A;
          --accent: #2885ef;
          --text-body: #3A3A3A;
          --text-muted: #7A7A8C;
          background: var(--cream);
          padding: 6rem 1.5rem 5.5rem;
          font-family: 'Noto Sans Georgian', system-ui, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .bg-blob {
          position: absolute; border-radius: 50%;
          filter: blur(90px); pointer-events: none; z-index: 0;
        }
        .blob-1 {
          width: 560px; height: 560px;
          background: rgba(40,133,239,0.09);
          top: -140px; right: -80px;
          animation: blob-float 18s ease-in-out infinite;
        }
        .blob-2 {
          width: 420px; height: 420px;
          background: rgba(43,74,138,0.07);
          bottom: -100px; left: -60px;
          animation: blob-float 22s ease-in-out infinite reverse;
        }
        @keyframes blob-float {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50%     { transform: translate3d(30px,-28px,0) scale(1.08); }
        }
        .svc-grid-lines {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(27,42,74,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27,42,74,0.035) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse at 50% 0%, #000 0%, transparent 72%);
        }

        .svc-container { max-width: 1300px; margin: 0 auto; position: relative; z-index: 1; }

        /* Header */
        .svc-header {
          text-align: center; margin-bottom: 3.75rem;
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .svc-header.hdr-in { opacity: 1; transform: none; }

        .svc-badge {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--accent);
          background: rgba(40,133,239,0.1);
          border: 1px solid rgba(40,133,239,0.18);
          padding: 0.35rem 1.1rem 0.35rem 0.8rem;
          border-radius: 40px; margin-bottom: 1rem;
        }
        .badge-pulse {
          width: 7px; height: 7px; border-radius: 50%; background: var(--accent);
          animation: badge-pulse 2.4s ease infinite;
        }
        @keyframes badge-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(40,133,239,0.5); }
          70%  { box-shadow: 0 0 0 8px rgba(40,133,239,0); }
          100% { box-shadow: 0 0 0 0 rgba(40,133,239,0); }
        }

        .svc-title {
          font-size: clamp(1.85rem, 4vw, 3rem); font-weight: 900;
          color: var(--navy); margin: 0 0 0.75rem; line-height: 1.2; letter-spacing: -0.02em;
        }
        .svc-accent { color: var(--blue-mid); position: relative; display: inline-block; }
        .svc-accent::after {
          content: ''; position: absolute; left: 0; bottom: 0.06em;
          height: 0.13em; width: 100%; border-radius: 2px;
          background: var(--accent); opacity: 0.38;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.35s;
        }
        .svc-header.hdr-in .svc-accent::after { transform: scaleX(1); }

        .svc-subtitle {
          font-size: 1rem; color: var(--text-muted);
          max-width: 600px; margin: 0 auto; line-height: 1.65;
        }

        /* Grid */
        .svc-grid { display: grid; gap: 1.9rem; margin-bottom: 3rem; }
        .grid-preview, .grid-full { grid-template-columns: repeat(3, 1fr); }

        .svc-card-shell {
          opacity: 0; transform: translateY(46px) scale(0.965);
          transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1);
          will-change: transform, opacity;
          perspective: 1200px;
        }
        .svc-card-shell.card-in { opacity: 1; transform: none; }

        /* Card */
        .svc-card {
          --cc: #2885ef; --rx: 0deg; --ry: 0deg; --mx: 50%; --my: 50%;
          position: relative;
          background: #fff;
          border-radius: 1.5rem;
          overflow: hidden;
          cursor: pointer; outline: none;
          transform-style: preserve-3d;
          transform: rotateX(var(--rx)) rotateY(var(--ry));
          box-shadow: 0 10px 30px -14px rgba(27,42,74,0.16);
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
        }
        .svc-card:hover, .svc-card:focus-visible {
          box-shadow:
            0 34px 60px -20px rgba(27,42,74,0.28),
            0 0 0 1.5px color-mix(in srgb, var(--cc) 34%, transparent);
        }
        .svc-halo {
          position: absolute; inset: -1px; z-index: 4; pointer-events: none;
          border-radius: inherit; opacity: 0;
          background: radial-gradient(320px circle at var(--mx) var(--my), color-mix(in srgb, var(--cc) 18%, transparent), transparent 60%);
          transition: opacity 0.35s ease;
        }
        .svc-card:hover .svc-halo, .svc-card:focus-visible .svc-halo { opacity: 1; }

        .svc-card::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 4px; background: var(--cc); z-index: 5;
          transform: scaleY(0); transform-origin: top;
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .svc-card:hover::before, .svc-card:focus-visible::before { transform: scaleY(1); }

        /* Image */
        .card-img-wrap { position: relative; height: 215px; overflow: hidden; }
        .card-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.9s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease;
        }
        .svc-card:hover .card-img, .svc-card:focus-visible .card-img {
          transform: scale(1.1); filter: saturate(1.08);
        }
        .card-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(180deg, transparent 35%, rgba(27,42,74,0.32) 100%);
        }
        .card-wash {
          position: absolute; inset: 0; z-index: 1; background: var(--cc);
          opacity: 0; mix-blend-mode: multiply; transition: opacity 0.45s ease;
        }
        .svc-card:hover .card-wash, .svc-card:focus-visible .card-wash { opacity: 0.16; }
        .card-sheen {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background: linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.42) 50%, transparent 62%);
          transform: translateX(-120%);
        }
        .svc-card:hover .card-sheen, .svc-card:focus-visible .card-sheen {
          animation: sheen 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes sheen { to { transform: translateX(120%); } }

        .card-img-tag {
          position: absolute; bottom: 14px; left: 14px; z-index: 3;
          background: var(--cc); color: #fff;
          font-size: 0.63rem; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 0.24rem 0.78rem; border-radius: 20px;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.35s ease 0.04s, transform 0.35s cubic-bezier(0.22,1,0.36,1) 0.04s;
          box-shadow: 0 8px 18px -8px color-mix(in srgb, var(--cc) 70%, transparent);
        }
        .svc-card:hover .card-img-tag, .svc-card:focus-visible .card-img-tag {
          opacity: 1; transform: translateY(0);
        }

        /* Body */
        .card-body {
          padding: 1.45rem 1.4rem 1.35rem;
          display: flex; flex-direction: column; gap: 0.6rem;
          transform: translateZ(0.01px);
        }
        .card-title {
          font-size: 1.1rem; font-weight: 800; color: var(--navy);
          letter-spacing: -0.01em; line-height: 1.25; margin: 0;
          transition: color 0.28s ease;
        }
        .svc-card:hover .card-title, .svc-card:focus-visible .card-title { color: var(--cc); }
        .card-desc { font-size: 0.845rem; line-height: 1.62; color: #4A4A5A; margin: 0; }

        .card-audience {
          background: #F2F5FC; border-radius: 10px;
          padding: 0.62rem 0.85rem;
          border-left: 3px solid color-mix(in srgb, var(--cc) 45%, transparent);
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.35s ease;
        }
        .svc-card:hover .card-audience, .svc-card:focus-visible .card-audience {
          background: color-mix(in srgb, var(--cc) 8%, white);
          border-left-color: var(--cc);
          transform: translateX(3px);
        }
        .aud-label {
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.67rem; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--blue-mid); margin-bottom: 0.28rem;
        }
        .aud-txt { font-size: 0.78rem; line-height: 1.45; color: var(--text-body); margin: 0; }

        .card-cta-row {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.8rem; font-weight: 700; color: var(--cc);
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.32s ease, transform 0.32s cubic-bezier(0.22,1,0.36,1);
        }
        .svc-card:hover .card-cta-row, .svc-card:focus-visible .card-cta-row {
          opacity: 1; transform: translateY(0);
        }
        .cta-arr { display: flex; transition: transform 0.3s ease; }
        .svc-card:hover .cta-arr { transform: translateX(4px); }

        .card-line {
          position: absolute; bottom: 0; left: 0; height: 3px; width: 100%;
          background: linear-gradient(90deg, var(--cc), color-mix(in srgb, var(--cc) 45%, white));
          transform: scaleX(0); transform-origin: left; z-index: 5;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .svc-card:hover .card-line, .svc-card:focus-visible .card-line { transform: scaleX(1); }

        /* Section CTA */
        .svc-cta-wrap {
          text-align: center; opacity: 0; transform: translateY(18px);
          transition: opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s;
        }
        .svc-cta-wrap.hdr-in { opacity: 1; transform: none; }

        .svc-btn {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 0.75rem;
          padding: 0.9rem 2.1rem; border-radius: 50px;
          font-family: inherit; font-weight: 700; font-size: 0.9rem;
          text-decoration: none; letter-spacing: 0.01em;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, color 0.3s ease, background 0.3s ease;
        }
        .svc-btn::after {
          content: ''; position: absolute; inset: 0; z-index: 0;
          background: linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.28) 50%, transparent 60%);
          transform: translateX(-120%);
        }
        .svc-btn:hover::after { animation: sheen 0.85s ease; }
        .svc-btn > * { position: relative; z-index: 1; }

        .svc-btn.outlined { background: transparent; border: 2px solid var(--navy); color: var(--navy); }
        .svc-btn.outlined:hover {
          background: var(--navy); color: var(--cream);
          transform: translateY(-3px);
          box-shadow: 0 16px 34px -10px rgba(27,42,74,0.32);
        }
        .svc-btn.filled { background: var(--navy); color: var(--cream); border: 2px solid var(--navy); }
        .svc-btn.filled:hover {
          background: var(--blue-mid); border-color: var(--blue-mid);
          transform: translateY(-3px);
          box-shadow: 0 16px 34px -10px rgba(27,42,74,0.4);
        }
        .btn-arr { display: flex; transition: transform 0.28s ease; }
        .svc-btn:hover .btn-arr { transform: translateX(5px); }

        /* ── Modal ── */
        .svm-backdrop {
          position: fixed; inset: 0; z-index: 9000;
          background: rgba(10,20,50,0.7);
          backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px; opacity: 0; transition: opacity 0.28s ease;
          font-family: 'Noto Sans Georgian', system-ui, sans-serif;
        }
        .svm-backdrop.is-open { opacity: 1; }
        .svm-box {
          background: #fff; border-radius: 22px;
          max-width: 580px; width: 100%; max-height: 90vh; overflow-y: auto;
          box-shadow: 0 40px 90px rgba(6,16,40,0.4);
          position: relative; border-top: 4px solid var(--cc, #2885ef);
          opacity: 0; transform: translateY(36px) scale(0.95);
          transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .svm-backdrop.is-open .svm-box { opacity: 1; transform: none; }
        .stg {
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.5s ease var(--d, 0s), transform 0.5s cubic-bezier(0.22,1,0.36,1) var(--d, 0s);
        }
        .svm-backdrop.is-open .stg { opacity: 1; transform: none; }

        .svm-close {
          position: absolute; top: 14px; right: 14px; z-index: 10;
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(255,255,255,0.85); backdrop-filter: blur(6px);
          border: none; cursor: pointer; color: #1B2A4A;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.22s, transform 0.22s;
        }
        .svm-close:hover { background: #fff; transform: rotate(90deg) scale(1.06); }

        .svm-img-wrap { position: relative; height: 224px; overflow: hidden; border-radius: 18px 18px 0 0; }
        .svm-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          animation: modal-img-in 1.1s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes modal-img-in { from { transform: scale(1.12); } to { transform: scale(1); } }
        .svm-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 30%, rgba(27,42,74,0.45) 100%);
        }
        .svm-tag {
          position: absolute; bottom: 14px; left: 16px;
          background: var(--cc); color: #fff;
          font-size: 0.62rem; font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 4px 12px; border-radius: 20px;
        }

        .svm-body { padding: 1.6rem 1.75rem 1.85rem; display: flex; flex-direction: column; gap: 1rem; }
        .svm-title { font-size: 1.5rem; font-weight: 900; color: #1B2A4A; margin: 0; letter-spacing: -0.02em; line-height: 1.2; }
        .svm-desc { font-size: 0.9rem; line-height: 1.72; color: #4A4A5A; margin: 0; }
        .svm-section {
          background: #F5F0E8; border-radius: 12px;
          padding: 0.9rem 1rem; border-left: 3px solid var(--cc);
        }
        .svm-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.66rem; font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--cc); margin-bottom: 0.55rem;
        }
        .svm-label-plain { margin-bottom: 0.7rem; }
        .svm-for { font-size: 0.855rem; line-height: 1.6; color: #3A3A3A; margin: 0; }

        .svm-steps { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; }
        .svm-step-wrap { display: flex; align-items: center; gap: 6px; }
        .svm-step {
          display: flex; align-items: center; gap: 7px;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.45s ease var(--sd), transform 0.45s cubic-bezier(0.22,1,0.36,1) var(--sd);
        }
        .svm-backdrop.is-open .svm-step { opacity: 1; transform: none; }
        .svm-step-num {
          width: 27px; height: 27px; border-radius: 50%;
          background: var(--cc); color: #fff;
          font-size: 0.7rem; font-weight: 800;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          box-shadow: 0 6px 14px -6px color-mix(in srgb, var(--cc) 80%, transparent);
        }
        .svm-step-text { font-size: 0.78rem; font-weight: 600; color: #3A3A3A; }
        .svm-step-arrow { color: #9A9AAA; display: flex; align-items: center; }

        .svm-cta {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--cc); color: #fff;
          padding: 0.9rem 1.8rem; border-radius: 50px;
          font-family: inherit; font-size: 0.875rem; font-weight: 700;
          border: none; cursor: pointer; align-self: flex-start;
          box-shadow: 0 10px 24px color-mix(in srgb, var(--cc) 35%, transparent);
          transition: filter 0.25s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease;
        }
        .svm-cta:hover {
          filter: brightness(1.08); transform: translateY(-3px);
          box-shadow: 0 18px 34px color-mix(in srgb, var(--cc) 45%, transparent);
        }
        .svm-cta:hover svg { transform: translateX(4px); }
        .svm-cta svg { transition: transform 0.25s ease; }

        /* Responsive */
        @media (max-width: 1024px) {
          .grid-preview, .grid-full { grid-template-columns: repeat(2, 1fr); gap: 1.4rem; }
        }
        @media (max-width: 640px) {
          .svc-section { padding: 3.75rem 1rem 3rem; }
          .grid-preview, .grid-full { grid-template-columns: 1fr; gap: 1.2rem; }
          .svc-title { font-size: 1.65rem; }
          .svc-subtitle { font-size: 0.9rem; }
          .card-img-wrap { height: 190px; }
          .svc-btn { width: 50%; justify-content: center; }
          .svm-box { border-radius: 16px; max-height: 94vh; }
          .svm-img-wrap { height: 176px; }
          .svm-body { padding: 1.2rem 1.15rem 1.5rem; }
          .svm-title { font-size: 1.2rem; }
          .svm-cta { align-self: stretch; justify-content: center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .svc-section *, .svm-backdrop * {
            animation: none !important;
            transition-duration: 0.001s !important;
          }
          .svc-card-shell, .svc-header, .svc-cta-wrap, .stg, .svm-box, .svm-step {
            opacity: 1 !important; transform: none !important;
          }
        }
      `}</style>
    </section>
  ); 
};

export default Services;