import { useCallback, useEffect, useRef, useState } from "react";
import serv1 from "/serv1.webp";
import serv2 from "/serv2.webp";
import serv3 from "/serv3.webp";
import '../services.css'
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
  <img
    className="card-img"
    src={service.image}
    srcSet={`${service.image.replace('.webp', '')}-410.webp 410w, ${service.image} 820w`}
    sizes="(max-width: 768px) 100vw, 409px"
    alt={service.title}
    loading="lazy"
    width="820" 
    height="432"
  />
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
    </section>
  ); 
};

export default Services;