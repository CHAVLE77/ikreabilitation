"use client";

import { useEffect, useRef, useState } from "react";

// ── Data ────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 1,
    tag: "ლოგოპედი",
    title: "მეტყველების თერაპია",
    short: "გამოთქმა, კომუნიკაცია, ენობრივი განვითარება",
    description:
      "მეტყველების, გამოთქმისა და კომუნიკაციის დარღვევების დიაგნოსტიკა და კომპლექსური კორექცია. ინდივიდუალური მიდგომა და თამაშზე დაფუძნებული თერაპია სრული ჩართულობისთვის.",
    forWhom:
      "ბავშვები მეტყველების შეფერხებით, ბგერათა გამოთქმის პრობლემებით, ჭექა-ქუხილით ან აფაზიით.",
    steps: ["შეფასება", "გეგმა", "თერაპია", "კონტროლი"],
    accent: "#FBBF24",
    glow: "rgba(251,191,36,0.18)",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=560&fit=crop&auto=format",
    category: "therapy",
  },
  {
    id: 2,
    tag: "ფსიქოლოგი",
    title: "ფსიქოლოგიური კონსულტაცია",
    short: "ემოციები, ქცევა, ოჯახური მხარდაჭერა",
    description:
      "ემოციური და ქცევითი სირთულეების კომპლექსური მართვა, თვითშეფასების ამაღლება, შფოთვისა და სტრესის გადალახვა. ბავშვი, მოზარდი, ოჯახი — ყველა დონეზე.",
    forWhom:
      "ბავშვები, მოზარდები და ოჯახები, რომლებსაც სჭირდებათ ფსიქოლოგიური მხარდაჭერა.",
    steps: ["შეფასება", "მიზნები", "სეანსები", "შედეგი"],
    accent: "#60A5FA",
    glow: "rgba(96,165,250,0.18)",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=560&fit=crop&auto=format",
    category: "support",
  },
  {
    id: 3,
    tag: "სპეც. პედაგოგი",
    title: "სპეციალური პედაგოგიკა",
    short: "სწავლება, მხარდაჭერა, ინდივიდუალური გეგმა",
    description:
      "სწავლის სპეციფიკური მოთხოვნილებების მქონე ბავშვებისთვის მორგებული სასწავლო გეგმები. დისლექსია, დისგრაფია, ყურადღების დეფიციტი — გამოვლენა და კორექცია.",
    forWhom:
      "ბავშვები სწავლის სირთულეებით, ყურადღების დეფიციტით, დისლექსიით ან დისგრაფიით.",
    steps: ["დიაგნოსტიკა", "IEP", "მუშაობა", "პროგრესი"],
    accent: "#34D399",
    glow: "rgba(52,211,153,0.18)",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=560&fit=crop&auto=format",
    category: "support",
  },
  {
    id: 4,
    tag: "ფიზიოთერაპია",
    title: "ფიზიკური თერაპია / რეაბილიტაცია",
    short: "მოძრაობა, კოორდინაცია, სხეულის კონტროლი",
    description:
      "ფიზიკური განვითარების სტიმულაცია, კოორდინაციისა და ბალანსის გამომუშავება. სპეციალიზებული სარეაბილიტაციო პროგრამები ყოველი ასაკისთვის — ძალის, გამძლეობისა და მოქნილობის განვითარებით.",
    forWhom:
      "ბავშვები საავტომობილო განვითარების შეფერხებით, ცერებრული დამბლით ან სხვა ფიზიკური შეზღუდვით.",
    steps: ["შეფასება", "პროგრამა", "ვარჯიში", "ადაპტაცია"],
    accent: "#F87171",
    glow: "rgba(248,113,113,0.18)",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&h=560&fit=crop&auto=format",
    category: "therapy",
  },
  {
    id: 5,
    tag: "ოკუპაციური თერაპია",
    title: "ოკუპაციური თერაპია",
    short: "თვითმოვლა, სენსორი, ყოველდღიური უნარები",
    description:
      "ყოველდღიური ცხოვრების უნარების განვითარება, სენსორული ინტეგრაცია, სკოლისა და სახლის გარემოსთვის ადაპტაცია. ბავშვი სწავლობს დამოუკიდებლობას — ნაბიჯ-ნაბიჯ.",
    forWhom:
      "ბავშვები სენსორული დამუშავების სირთულეებით, ავტიზმის სპექტრით, ან ადაპტაციის გამოწვევებით.",
    steps: ["სენსორული შეფასება", "სტრატეგიები", "პრაქტიკა", "განვრცობა"],
    accent: "#A78BFA",
    glow: "rgba(167,139,250,0.18)",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=560&fit=crop&auto=format",
    category: "therapy",
  },
  {
    id: 6,
    tag: "ქცევითი თერაპია",
    title: "ქცევითი თერაპია (ABA)",
    short: "ქცევა, უნარები, სტრუქტურირებული სწავლება",
    description:
      "გამოყენებითი ქცევის ანალიზზე (ABA) დაფუძნებული თერაპია სასურველი ქცევების განვითარებისა და პრობლემური ქცევების შემცირებისთვის. მეცნიერულად დამტკიცებული მეთოდი.",
    forWhom:
      "ბავშვები ავტიზმის სპექტრით, ყურადღების დეფიციტ-ჰიპერაქტიურობის აშლილობით ან ქცევითი სირთულეებით.",
    steps: ["ქცევითი შეფასება", "მიზნების დასახვა", "ინტენსიური მუშაობა", "განზოგადება"],
    accent: "#FB923C",
    glow: "rgba(251,146,60,0.18)",
    image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=560&fit=crop&auto=format",
    category: "therapy",
  },
  {
    id: 7,
    tag: "ადრეული ჩარევა",
    title: "ადრეული განვითარება",
    short: "0–6 წელი, ადრეული ჩარევა, განვითარების სტიმულაცია",
    description:
      "0–6 წლის ბავშვებისთვის კომპლექსური ადრეული ჩარევის პროგრამა. ნეიროპლასტიურობის გამოყენება ოპტიმალური შედეგებისთვის — რაც უფრო ადრე, მით უფრო ეფექტური.",
    forWhom:
      "ჩვილები და პატარა ბავშვები განვითარების შეფერხების ნიშნებით, მშობლები, რომლებსაც სჭირდებათ მიმართულება.",
    steps: ["სრული შეფასება", "ოჯახის ჩართვა", "მულტიდისციპლინური გეგმა", "პროგრესის ზედამხედველობა"],
    accent: "#2DD4BF",
    glow: "rgba(45,212,191,0.18)",
    image: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=800&h=560&fit=crop&auto=format",
    category: "development",
  },
  {
    id: 8,
    tag: "აუტიზმი",
    title: "აუტიზმის სპექტრის მხარდაჭერა",
    short: "სპექტრი, სოციალური უნარები, ყოვლისმომცველი მიდგომა",
    description:
      "სპეციალიზებული, ყოვლისმომცველი მხარდაჭერა ASD დიაგნოზის მქონე ბავშვებისთვის. სოციალური კომუნიკაცია, სენსორული რეგულაცია, ყოველდღიური ადაპტაცია — ერთ სახურავქვეშ.",
    forWhom:
      "ბავშვები ავტიზმის სპექტრის აშლილობით და მათი ოჯახები — დიაგნოზიდან სასკოლო ინტეგრაციამდე.",
    steps: ["დიაგნოსტიკური შეფასება", "ინდივიდუალური გეგმა", "სპეციალისტთა გუნდი", "ოჯახის სწავლება"],
    accent: "#818CF8",
    glow: "rgba(129,140,248,0.18)",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=560&fit=crop&auto=format",
    category: "support",
  },
  {
    id: 9,
    tag: "მშობლის კონსულტაცია",
    title: "მშობლის კონსულტაცია",
    short: "სახელმძღვანელო, სტრატეგიები, ოჯახური ჰარმონია",
    description:
      "მშობლებისთვის პრაქტიკული ინსტრუმენტები სახლში განვითარების გასაგრძელებლად. კომუნიკაციის სტრატეგიები, საზღვრების დასმა, ბავშვის პოტენციალის მაქსიმალური გახსნა.",
    forWhom:
      "მშობლები, მეურვეები და ოჯახები, რომლებიც ეძებენ ეფექტურ მიდგომებს სახლის გარემოში.",
    steps: ["მოლოდინების შეფასება", "მორგებული სტრატეგიები", "პრაქტიკული ვარჯიში", "მუდმივი მხარდაჭერა"],
    accent: "#F472B6",
    glow: "rgba(244,114,182,0.18)",
    image: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&h=560&fit=crop&auto=format",
    category: "support",
  },
];

const STATS = [
  { value: "500+", label: "ოჯახი ენდობა" },
  { value: "8+", label: "წლიანი გამოცდილება" },
  { value: "9", label: "სპეციალიზაცია" },
  { value: "98%", label: "კმაყოფილება" },
];

// ── Helpers ─────────────────────────────────────────────────────────────────
function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

// ── Modal ────────────────────────────────────────────────────────────────────
function Modal({ service, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ "--acc": service.accent, "--glow": service.glow }}>
        <button className="modal-close" onClick={onClose} aria-label="დახურვა">✕</button>

        <div className="modal-img-wrap">
          <img src={service.image} alt={service.title} className="modal-img" loading="lazy" />
          <div className="modal-img-overlay" />
          <div className="modal-tag">{service.tag}</div>
        </div>

        <div className="modal-body">
          <h2 className="modal-title">{service.title}</h2>
          <p className="modal-short">{service.short}</p>
          <p className="modal-desc">{service.description}</p>

          <div className="modal-section">
            <span className="modal-label">👥 ვისთვის</span>
            <p className="modal-for">{service.forWhom}</p>
          </div>

          <div className="modal-section">
            <span className="modal-label">📋 პროცესი</span>
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

          <a href="#contact" className="modal-cta" onClick={onClose}>
            დეტალურად
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 9000;
          background: rgba(2,10,30,0.82);
          backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          animation: fadeIn 0.25s ease;
        }
        .modal-box {
          background: #0D1B3E;
          border-radius: 24px;
          max-width: 640px; width: 100%;
          max-height: 92vh;
          overflow-y: auto;
          border: 1px solid rgba(251,191,36,0.2);
          box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px var(--acc, #FBBF24) inset;
          position: relative;
          animation: slideUp 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .modal-close {
          position: absolute; top: 16px; right: 16px; z-index: 10;
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; transition: all 0.2s;
        }
        .modal-close:hover { background: rgba(255,255,255,0.18); transform: scale(1.1); }
        .modal-img-wrap { position: relative; height: 240px; overflow: hidden; border-radius: 24px 24px 0 0; }
        .modal-img { width: 100%; height: 100%; object-fit: cover; }
        .modal-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 20%, rgba(13,27,62,0.9) 100%);
        }
        .modal-tag {
          position: absolute; top: 18px; left: 18px;
          background: var(--acc, #FBBF24); color: #0D1B3E;
          font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 4px 12px; border-radius: 20px;
        }
        .modal-body { padding: 1.5rem 1.75rem 1.75rem; display: flex; flex-direction: column; gap: 0.9rem; }
        .modal-title {
          font-size: 1.5rem; font-weight: 900;
          color: #fff; margin: 0;
          background: linear-gradient(135deg, #fff 50%, var(--acc, #FBBF24));
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .modal-short { font-size: 0.8rem; color: var(--acc, #FBBF24); font-weight: 600; margin: -4px 0 0; text-transform: uppercase; letter-spacing: 0.06em; }
        .modal-desc { font-size: 0.9rem; color: rgba(255,255,255,0.82); line-height: 1.7; margin: 0; }
        .modal-section { background: rgba(255,255,255,0.04); border-radius: 14px; padding: 0.9rem 1rem; border: 1px solid rgba(255,255,255,0.07); }
        .modal-label { display: block; font-size: 0.67rem; font-weight: 700; color: var(--acc, #FBBF24); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; }
        .modal-for { font-size: 0.85rem; color: rgba(255,255,255,0.78); line-height: 1.6; margin: 0; }
        .modal-steps { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; }
        .modal-step { display: flex; align-items: center; gap: 6px; }
        .step-num {
          width: 26px; height: 26px; border-radius: 50%;
          background: var(--acc, #FBBF24); color: #0D1B3E;
          font-size: 0.7rem; font-weight: 800;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .modal-step span { font-size: 0.78rem; color: rgba(255,255,255,0.85); font-weight: 600; }
        .step-arrow { color: rgba(255,255,255,0.3); font-size: 0.9rem; }
        .modal-cta {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(105deg, #0066CC, #004C99);
          color: #fff; text-decoration: none;
          padding: 0.9rem 1.8rem; border-radius: 50px;
          font-size: 0.875rem; font-weight: 700;
          box-shadow: 0 8px 24px rgba(0,76,153,0.4);
          transition: all 0.25s ease;
          align-self: flex-start;
          margin-top: 0.25rem;
        }
        .modal-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,76,153,0.55); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(40px) scale(0.96); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
        @media (max-width: 520px) {
          .modal-box { border-radius: 20px; }
          .modal-img-wrap { height: 180px; }
          .modal-body { padding: 1.1rem 1.2rem 1.4rem; }
          .modal-title { font-size: 1.2rem; }
          .modal-cta { align-self: stretch; justify-content: center; }
        }
      `}</style>
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────
function ServiceCard({ service, idx, onOpen }) {
  const ref = useRef(null);
  const visible = useInView(ref, 0.1);
  const [hovered, setHovered] = useState(false);

  const handleEnlarge = (e) => {
    e.stopPropagation();
    onOpen(service);
  };

  const handleDetails = (e) => {
    e.stopPropagation();
    // Just a visual element - no function
  };

  return (
    <article
      ref={ref}
      className={`svc-card ${visible ? "card-in" : ""}`}
      style={{ "--acc": service.accent, "--glow": service.glow, transitionDelay: `${(idx % 3) * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(service)}
    >
      {/* Image */}
      <div className="card-img-wrap">
        <img src={service.image} alt={service.title} loading="lazy" className="card-img" />
        <div className="card-overlay" />
        <div className="card-wash" />
        <span className="card-tag">{service.tag}</span>
      </div>

      {/* Body */}
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

        <div className="card-footer">
          <span className="card-cta" onClick={handleEnlarge}>
            გადიდება
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>

          <span className="card-cta" onClick={handleDetails}>
            დეტალურად
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>

          <div className="card-glow-dot" />
        </div>
      </div>

      {/* Accent line */}
      <div className="card-line" />

      <style jsx>{`
        .svc-card {
          --acc: #FBBF24;
          --glow: rgba(251,191,36,0.18);
          background: rgba(13,27,62,0.75);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 22px;
          overflow: hidden;
          cursor: pointer;
          opacity: 0;
          transform: translateY(44px) scale(0.96);
          transition:
            opacity 0.65s cubic-bezier(0.22,1,0.36,1),
            transform 0.65s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.35s ease,
            border-color 0.35s ease;
          position: relative;
          will-change: transform, opacity;
        }
        .svc-card.card-in { opacity: 1; transform: translateY(0) scale(1); }
        .svc-card:hover {
          transform: translateY(-10px) scale(1.018) !important;
          border-color: rgba(251,191,36,0.35);
          box-shadow:
            0 30px 60px rgba(0,0,0,0.5),
            0 0 40px var(--glow, rgba(251,191,36,0.18));
        }
        .svc-card::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, var(--glow), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none; z-index: 0;
        }
        .svc-card:hover::before { opacity: 1; }

        .card-img-wrap { position: relative; height: 200px; overflow: hidden; }
        .card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .svc-card:hover .card-img { transform: scale(1.1); }
        .card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(2,10,30,0.25) 0%, rgba(2,10,30,0.7) 100%);
          z-index: 1;
        }
        .card-wash {
          position: absolute; inset: 0;
          background: var(--acc, #FBBF24);
          opacity: 0; mix-blend-mode: multiply;
          transition: opacity 0.4s ease; z-index: 1;
        }
        .svc-card:hover .card-wash { opacity: 0.12; }
        .card-tag {
          position: absolute; top: 14px; left: 14px; z-index: 2;
          background: var(--acc, #FBBF24); color: #020A1E;
          font-size: 0.6rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.1em;
          padding: 4px 10px; border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .card-body {
          padding: 1.25rem 1.3rem 1.1rem;
          display: flex; flex-direction: column; gap: 0.5rem;
          position: relative; z-index: 1;
        }
        .card-title {
          font-size: 1.05rem; font-weight: 900;
          color: #fff; margin: 0; letter-spacing: -0.01em;
          transition: color 0.25s ease;
        }
        .svc-card:hover .card-title { color: var(--acc, #FBBF24); }
        .card-short {
          font-size: 0.7rem; font-weight: 600;
          color: var(--acc, #FBBF24); opacity: 0.85;
          text-transform: uppercase; letter-spacing: 0.06em;
          margin: 0;
        }
        .card-desc {
          font-size: 0.81rem; line-height: 1.65;
          color: rgba(255,255,255,0.68); margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-steps { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 2px; }
        .card-step {
          display: flex; align-items: center; gap: 5px;
          font-size: 0.67rem; font-weight: 600;
          color: rgba(255,255,255,0.55);
          background: rgba(255,255,255,0.05);
          padding: 3px 9px; border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.25s ease;
        }
        .svc-card:hover .card-step {
          color: rgba(255,255,255,0.82);
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.12);
        }
        .step-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--acc, #FBBF24); flex-shrink: 0; }

        .card-footer {
          display: flex; align-items: center; justify-content: space-evenly;
          margin-top: 0.25rem;
          gap: 12px;
          flex-wrap: wrap;
        }
        .card-cta {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.78rem; font-weight: 700;
          color: var(--acc, #FBBF24);
          opacity: 0; transform: translateX(-8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          cursor: pointer;
        }
        .svc-card:hover .card-cta { opacity: 1; transform: translateX(0); }
        .card-cta:hover {
          opacity: 0.8 !important;
          transform: translateX(2px) !important;
        }
        .card-glow-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--acc, #FBBF24);
          box-shadow: 0 0 10px var(--acc, #FBBF24);
          opacity: 0; transition: opacity 0.3s ease;
          animation: pulse-glow 2s infinite;
        }
        .svc-card:hover .card-glow-dot { opacity: 1; }

        .card-line {
          position: absolute; bottom: 0; left: 0;
          height: 3px; width: 0%;
          background: linear-gradient(90deg, var(--acc, #FBBF24), rgba(251,191,36,0.3));
          border-radius: 0 2px 2px 0;
          transition: width 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .svc-card:hover .card-line { width: 100%; }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.4); }
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
    <div ref={ref} className={`stat-item ${visible ? "stat-in" : ""}`} style={{ transitionDelay: `${delay}s` }}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <style jsx>{`
        .stat-item { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; text-align: center; }
        .stat-item.stat-in { opacity: 1; transform: translateY(0); }
        .stat-value { font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 900; color: #FBBF24; letter-spacing: -0.03em; line-height: 1; }
        .stat-label { font-size: 0.78rem; color: rgba(255,255,255,0.6); font-weight: 600; margin-top: 6px; letter-spacing: 0.04em; text-transform: uppercase; }
      `}</style>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [filter, setFilter] = useState("all");
  const headerRef = useRef(null);
  const headerVisible = useInView(headerRef, 0.15);

  const FILTERS = [
    { id: "all", label: "ყველა" },
    { id: "therapy", label: "თერაპია" },
    { id: "support", label: "მხარდაჭერა" },
    { id: "development", label: "განვითარება" },
  ];

  const filtered = filter === "all"
    ? SERVICES
    : SERVICES.filter(s => s.category === filter);

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

          {/* Stats Row */}
          <div className={`stats-row ${headerVisible ? "stats-in" : ""}`}>
            {STATS.map((s, i) => (
              <StatCounter key={i} value={s.value} label={s.label} delay={0.5 + i * 0.1} />
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint">
          <span className="scroll-label">სერვისები</span>
          <div className="scroll-pill">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </header>

      {/* ── Services Grid ── */}
      <section className="services-section">
        <div className="section-container">

          {/* Filter Pills */}
          <div className="filter-row">
            {FILTERS.map(f => (
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
              <ServiceCard key={s.id} service={s} idx={idx} onOpen={setActiveModal} />
            ))}
          </div>

          {/* CTA Banner */}
          <div className="cta-banner">
            <div className="cta-orb" />
            <div className="cta-content">
              <h3 className="cta-title">მზად ხართ პირველი ნაბიჯისთვის?</h3>
              <p className="cta-sub">ჩვენი გუნდი დაგეხმარებათ სწორი სერვისის არჩევაში —  საწყისი კონსულტაცია.</p>
            </div>
            <a href="/contact" className="cta-btn">
              ჩაეწერე კონსულტაციაზე
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeModal && <Modal service={activeModal} onClose={() => setActiveModal(null)} />}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;500;600;700;800;900&display=swap');

        /* ── Root ── */
        .page-root {
          font-family: 'Noto Sans Georgian', system-ui, sans-serif;
          background: #020A1E;
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
          padding: clamp(80px,12vw,130px) clamp(20px,6vw,80px) clamp(60px,8vw,100px);
        }

        /* Animated grid background */
        .hero-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(251,191,36,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251,191,36,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%);
        }

        /* Noise texture overlay */
        .hero-noise {
          position: absolute; inset: 0; z-index: 1;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
        }

        /* Glowing orbs */
        .hero-orb {
          position: absolute; border-radius: 50%;
          pointer-events: none; filter: blur(80px);
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(0,102,204,0.35), transparent 70%);
          top: -120px; left: -100px;
          animation: driftOrb 12s ease-in-out infinite;
        }
        .orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(251,191,36,0.15), transparent 70%);
          bottom: -80px; right: -60px;
          animation: driftOrb 15s ease-in-out infinite reverse;
        }
        .orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(96,165,250,0.12), transparent 70%);
          top: 40%; left: 60%;
          animation: driftOrb 20s ease-in-out infinite;
          animation-delay: -7s;
        }

        .hero-inner {
          position: relative; z-index: 2;
          max-width: 900px; width: 100%;
          text-align: center;
          display: flex; flex-direction: column;
          align-items: center; gap: clamp(20px,3vw,32px);
        }

        /* Badge */
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 22px; border-radius: 100px;
          background: rgba(251,191,36,0.08);
          border: 1px solid rgba(251,191,36,0.4);
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #FBBF24;
          opacity: 0; transform: translateY(20px) scale(0.95);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .hero-badge.badge-in { opacity: 1; transform: translateY(0) scale(1); }
        .badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #FBBF24;
          animation: pulse 2s infinite;
        }

        /* Title */
        .hero-title {
          font-size: clamp(2.4rem,6vw,5rem);
          font-weight: 900;
          line-height: 1.12; letter-spacing: -0.03em;
          color: #fff;
          opacity: 0; transform: translateY(40px);
          transition: opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s;
        }
        .hero-title.title-in { opacity: 1; transform: translateY(0); }
        .title-gold {
          background: linear-gradient(135deg, #FBBF24 30%, #F59E0B 70%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }

        /* Sub */
        .hero-sub {
          font-size: clamp(0.9rem,2vw,1.1rem);
          color: rgba(255,255,255,0.72);
          line-height: 1.75; max-width: 620px;
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s;
        }
        .hero-sub.sub-in { opacity: 1; transform: translateY(0); }

        /* Stats row */
        .stats-row {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 2rem; width: 100%;
          padding: 2rem 2.5rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          margin-top: 8px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s;
        }
        .stats-row.stats-in { opacity: 1; transform: translateY(0); }

        /* Dividers between stats */
        .stats-row > * + * { border-left: 1px solid rgba(255,255,255,0.07); padding-left: 2rem; margin-left: -1rem; }

        /* Scroll hint */
        .scroll-hint {
          position: absolute; bottom: clamp(24px,4vw,40px); left: 50%; transform: translateX(-50%);
          z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 6px;
          color: rgba(255,255,255,0.45);
          animation: fadeUp 1s ease 1.5s both;
        }
        .scroll-label { font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; }
        .scroll-pill {
          width: 24px; height: 38px; border-radius: 100px;
          border: 1.5px solid currentColor;
          display: flex; align-items: flex-start; justify-content: center; padding-top: 7px;
        }
        .scroll-pill svg { animation: bounce 1.6s ease-in-out infinite; }

        /* ── Services Section ── */
        .services-section {
          padding: clamp(56px,8vw,96px) clamp(20px,5vw,64px);
          background: linear-gradient(180deg, #020A1E 0%, #061A3A 50%, #020A1E 100%);
          position: relative;
        }
        .services-section::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent);
        }

        .section-container { max-width: 1280px; margin: 0 auto; }

        /* Filter */
        .filter-row {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 2.5rem; flex-wrap: wrap;
        }
        .filter-btn {
          position: relative;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 22px; border-radius: 40px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.65);
          font-family: 'Noto Sans Georgian', sans-serif;
          font-size: 0.8rem; font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.02em;
        }
        .filter-btn:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(251,191,36,0.3);
          color: #fff;
        }
        .filter-btn.active {
          background: rgba(251,191,36,0.1);
          border-color: rgba(251,191,36,0.55);
          color: #FBBF24;
        }
        .filter-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #FBBF24;
          animation: pulse 2s infinite;
        }

        /* Grid */
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 3.5rem;
        }

        /* CTA Banner */
        .cta-banner {
          position: relative;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1.5rem;
          padding: 2.5rem 2.8rem;
          background: linear-gradient(135deg, rgba(0,76,153,0.3) 0%, rgba(0,102,204,0.15) 100%);
          border: 1px solid rgba(0,102,204,0.35);
          border-radius: 24px;
          overflow: hidden;
        }
        .cta-orb {
          position: absolute; top: -60px; right: -40px;
          width: 280px; height: 280px; border-radius: 50%;
          background: radial-gradient(circle, rgba(251,191,36,0.12), transparent 70%);
          pointer-events: none;
        }
        .cta-content { position: relative; z-index: 1; max-width: 560px; }
        .cta-title { font-size: clamp(1.2rem,3vw,1.6rem); font-weight: 900; color: #fff; margin-bottom: 8px; }
        .cta-sub { font-size: 0.88rem; color: rgba(255,255,255,0.7); line-height: 1.6; }
        .cta-btn {
          position: relative; z-index: 1;
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(105deg, #FBBF24, #F59E0B);
          color: #020A1E;
          padding: clamp(12px,2vw,15px) clamp(20px,3vw,32px);
          border-radius: 50px;
          font-family: 'Noto Sans Georgian', sans-serif;
          font-size: 0.88rem; font-weight: 800;
          text-decoration: none;
          transition: all 0.28s ease;
          white-space: nowrap;
          box-shadow: 0 8px 28px rgba(251,191,36,0.35);
          flex-shrink: 0;
        }
        .cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(251,191,36,0.5);
        }

        /* ── Animations ── */
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(1.3); } }
        @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(6px); } }
        @keyframes driftOrb { 0%,100% { transform:translate(0,0); } 33% { transform:translate(30px,-20px); } 66% { transform:translate(-20px,25px); } }
        @keyframes fadeUp { from { opacity:0; transform:translateX(-50%) translateY(15px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr); }
          .stats-row { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
          .stats-row > * + * { border-left: none; padding-left: 0; margin-left: 0; }
          .stats-row > *:nth-child(2n) { border-left: 1px solid rgba(255,255,255,0.07); padding-left: 1.5rem; margin-left: -0.75rem; }
        }
        @media (max-width: 640px) {
          .svc-grid { grid-template-columns: 1fr; }
          .stats-row { grid-template-columns: repeat(2,1fr); padding: 1.4rem; gap: 1.2rem; }
          .stats-row > *:nth-child(2n) { padding-left: 1rem; margin-left: -0.5rem; }
          .cta-banner { padding: 1.75rem 1.5rem; }
          .cta-btn { width: 100%; justify-content: center; }
          .card-footer { justify-content: flex-start; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-badge, .hero-title, .hero-sub, .stats-row,
          .hero-orb, .scroll-pill svg, .badge-dot,
          .filter-dot { animation: none !important; transition: none !important; }
          .hero-badge, .hero-title, .hero-sub, .stats-row { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}