import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ── Data ────────────────────────────────────────────────────────────────────
const EQUIPMENT = [
  {
    id: 1,
    name: "ფონოფორები",
    description: "მედიკამენტის ულტრაბგერითი გზით შეყვანა",
    accent: "#60A5FA",
  },
  {
    id: 2,
    name: "ელექტროფორები",
    description: "პრეპარატების ელექტრული იმპულსებით მინოდება",
    accent: "#818CF8",
  },
  {
    id: 3,
    name: "ულტრაფონოფორები",
    description: "ულტრაბგერისა და მედიკამენტური თერაპიის კომბინაცია",
    accent: "#34D399",
  },
  {
    id: 4,
    name: "ელექტროსტიმულაცია",
    description: "კუნთებისა და ნერვული სისტემის აქტივაციის ხელშეწყობა",
    accent: "#FBBF24",
  },
  {
    id: 5,
    name: "ლაზერთთერაპია",
    description: "აღდგენითი პროცესების სტიმულირება დაბალი ინტენსივობის ლაზერთ",
    accent: "#F87171",
  },
  {
    id: 6,
    name: "მაგნოტოთერაპია",
    description: "მაგნიტური ველით ტკივილისა და ანთების შემცირება",
    accent: "#A78BFA",
  },
  {
    id: 7,
    name: "ტურმანიუმის კერამიკის უახლესი ბიოელექტრო მოწყობილობა",
    description:
      "ინოვაციური ბიოელექტრო ტექნოლოგია თერაპიული მხარდაჭერისთვის, უმს თერაპია, ჰიჯაში",
    accent: "#F472B6",
  },
  {
    id: 8,
    name: "UVCh თერაპია – Ultratherm Shortwave Therapy",
    description:
      "პირველად აჭარაში, მხოლოდ ჩვენთან. უკანასკნელი თაობის აპარატი, რომელიც ეფექტურია ართრიტების, ოსტეოქონდროზის, ნერვული დაავადებების, ანთებითი პროცესების და სხვა მდგომარეობების მკურნალობაში. ანთების და ტკივილის კუპირება, სისხლის მიმოქცევის გაუმჯობესება, შეშუპების მოხსნა.",
    accent: "#2DD4BF",
  },
  {
    id: 9,
    name: "უზაი თერაპია",
    description: "ტრადიციული თერაპიული მეთოდი ჯანმრთელობის გაუმჯობესებისთვის",
    accent: "#FB923C",
  },
];

const SENSORY_INFO = {
  title: "სენსორული ოთახი",
  description:
    "ხშირად გარესამყარო ბავშვებისთვის ზედმეტად ხმაურიანი, კაშკაშა და გადამტვირთველია. სწორედ ამიტომ შევქმენით განსაკუთრებული, უსაფრთხო და მულტისენსორული გარემო, რომელიც პატარებს სამყაროს აღქმასა და ემოციების მართვაში ეხმარება.",
  purpose:
    "ეს არის სპეციალურად მოწყობილი სივრცე, სადაც სხვადასხვა სტიმულატორების (სინათლის ეფექტები, მუსიკა, ტაქტილური ზედაპირები, დოზირებული სასიამოვნო სურნელები) სინთეზით ხდება ბავშვის ნერვული სისტემის დაშვიდება, სენსორული ინტეგრაცია და განვითარების სტიმულირება.",
  indications: [
    "აუტიზმის სპექტრის დარღვევები",
    "ყურადღების დეფიციტისა და ჰიპერაქტივობის სინდრომი (ADHD)",
    "სენსორული ინტეგრაციის დარღვევა (ჰიპერ ან ჰიპომგრძნობელობა)",
    "მეტყველებისა და მოტორული განვითარების შეფერხება",
    "ემოციური დისრეგულაცია, შფოთვა ან აგრესიული ქცევა",
    "ცერებრული დამბლა და კუნთოვანი დისტონია",
  ],
};

// ── Helper ──────────────────────────────────────────────────────────────────
function useInView(ref, threshold = 0.1) {
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

// ── Equipment Card ──────────────────────────────────────────────────────────
function EquipmentCard({ item, idx }) {
  const ref = useRef(null);
  const visible = useInView(ref, 0.1);

  return (
    <article
      ref={ref}
      className={`equip-card ${visible ? "equip-in" : ""}`}
      style={{
        "--acc": item.accent,
        transitionDelay: `${(idx % 3) * 0.08}s`,
      }}
    >
      <div className="equip-accent" style={{ background: item.accent }} />
      <div className="equip-body">
        <h3 className="equip-name">{item.name}</h3>
        <p className="equip-desc">{item.description}</p>
      </div>
      <div className="equip-arrow">→</div>

      <style jsx>{`
        .equip-card {
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
          position: relative;
        }
        .equip-card.equip-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .equip-card:hover {
          border-color: rgba(251, 191, 36, 0.2);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(251, 191, 36, 0.05) inset;
          transform: translateY(-4px) scale(1.005) !important;
        }

        .equip-accent {
          width: 5px;
          flex-shrink: 0;
          border-radius: 18px 0 0 18px;
          transition: width 0.3s ease;
        }
        .equip-card:hover .equip-accent {
          width: 7px;
        }

        .equip-body {
          padding: 1.25rem 1.25rem 1.25rem 1.1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .equip-name {
          font-size: 0.95rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.35;
          letter-spacing: -0.01em;
          margin: 0;
          transition: color 0.25s ease;
        }
        .equip-card:hover .equip-name {
          color: var(--acc, #fbbf24);
        }
        .equip-desc {
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.6;
          margin: 0;
        }
        .equip-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-right: 1.2rem;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.15);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .equip-card:hover .equip-arrow {
          color: var(--acc, #fbbf24);
          transform: translateX(4px);
        }

        @media (max-width: 640px) {
          .equip-body {
            padding: 1rem 1rem 1rem 0.9rem;
          }
          .equip-name {
            font-size: 0.85rem;
          }
          .equip-desc {
            font-size: 0.72rem;
          }
          .equip-arrow {
            padding-right: 0.8rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </article>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function FizioPage() {
  // ── SEO (title & meta) ──
  useEffect(() => {
    document.title = "ფიზიკური თერაპია | თანამედროვე აპარატები და სენსორული ოთახი";
    const metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content =
      "ფიზიკური თერაპიის მომსახურება: ფონოფორები, ელექტროფორები, ლაზერთერაპია, UVCh თერაპია და სენსორული ოთახი ბავშვებისთვის.";
    document.head.appendChild(metaDesc);
    return () => {
      document.head.removeChild(metaDesc);
    };
  }, []);

  const heroRef = useRef(null);
  const heroVisible = useInView(heroRef, 0.15);

  return (
    <div className="fizio-page">
      {/* ── Hero ── */}
      <header className="fizio-hero">
        <div className="hero-noise" />
        <div className="hero-grid-bg" />
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-orb orb-3" />

        <div className="hero-inner" ref={heroRef}>
          <span className={`hero-badge ${heroVisible ? "badge-in" : ""}`}>
            <span className="badge-dot" />
            ფიზიკური თერაპია
          </span>
          <h1 className={`hero-title ${heroVisible ? "title-in" : ""}`}>
            თანამედროვე ფიზიოთერაპიული
            <br />
            <span className="title-gold">აპარატები</span>
          </h1>
          <p className={`hero-sub ${heroVisible ? "sub-in" : ""}`}>
            ჩვენს ცენტრში გამოყენებულია უახლესი თაობის ფიზიოთერაპიული მოწყობილობები,
            რაც უზრუნველყოფს მაქსიმალურ ეფექტურობას და პაციენტის კომფორტს.
          </p>
        </div>

        <div className="scroll-hint">
          <span className="scroll-label">აპარატები</span>
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

      {/* ── Equipment Grid ── */}
      <section className="equipment-section">
        <div className="section-container">
          <h2 className="section-title">
            ფიზიოთერაპიული <span className="title-gold">აპარატები</span>
          </h2>
          <p className="section-sub">
            თანამედროვე ტექნოლოგიები აღდგენითი მკურნალობისთვის
          </p>

          <div className="equip-grid">
            {EQUIPMENT.map((item, idx) => (
              <EquipmentCard key={item.id} item={item} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Sensory Room ── */}
      <section className="sensory-section">
        <div className="section-container">
          <div className="sensory-content">
            <div className="sensory-header">
              <span className="sensory-badge">
                <span className="sensory-badge-dot" />
                სენსორული ოთახი
              </span>
              <h2 className="sensory-title">{SENSORY_INFO.title}</h2>
              <p className="sensory-desc">{SENSORY_INFO.description}</p>
            </div>

            <div className="sensory-grid">
              <div className="sensory-purpose">
                <h3 className="sensory-subtitle">რისთვის არის საჭირო?</h3>
                <p>{SENSORY_INFO.purpose}</p>
              </div>
              <div className="sensory-indications">
                <h3 className="sensory-subtitle">ვისთვის არის რეკომენდებული?</h3>
                <ul className="indications-list">
                  {SENSORY_INFO.indications.map((item, i) => (
                    <li key={i} className="indication-item">
                      <span className="indication-dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Back Link ── */}
      <div className="back-link-wrap">
        <Link to="/services" className="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L12 5M5 12L12 19"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          უკან სერვისების გვერდზე
        </Link>
      </div>

      {/* ── Styles ── */}
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;500;600;700;800;900&display=swap");
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
      `}</style>

      <style>{`
        .fizio-page {
          font-family: "Noto Sans Georgian", system-ui, sans-serif;
          background: #020a1e;
          min-height: 100vh;
          color: #fff;
        }

        /* ── Hero ── */
        .fizio-hero {
          position: relative;
          min-height: 80vh;
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
          background: radial-gradient(circle, rgba(244, 114, 182, 0.25), transparent 70%);
          top: -120px;
          left: -100px;
          animation: driftOrb 12s ease-in-out infinite;
        }
        .orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(251, 191, 36, 0.12), transparent 70%);
          bottom: -80px;
          right: -60px;
          animation: driftOrb 15s ease-in-out infinite reverse;
        }
        .orb-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(96, 165, 250, 0.1), transparent 70%);
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
          background: rgba(244, 114, 182, 0.12);
          border: 1px solid rgba(244, 114, 182, 0.4);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #f472b6;
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
          background: #f472b6;
          animation: pulse 2s infinite;
        }

        .hero-title {
          font-size: clamp(2.4rem, 6vw, 4.5rem);
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

        /* ── Equipment Section ── */
        .equipment-section {
          padding: clamp(56px, 8vw, 96px) clamp(20px, 5vw, 64px);
          background: linear-gradient(180deg, #020a1e 0%, #061a3a 50%, #020a1e 100%);
          position: relative;
        }
        .equipment-section::before {
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

        .section-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          line-height: 1.2;
          text-align: center;
          margin-bottom: 0.5rem;
          color: #fff;
        }
        .section-sub {
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          font-size: 1rem;
          margin-bottom: 2.5rem;
        }

        .equip-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
        }

        /* ── Sensory Section ── */
        .sensory-section {
          padding: clamp(56px, 8vw, 96px) clamp(20px, 5vw, 64px);
          background: radial-gradient(ellipse at 70% 0%, rgba(251, 191, 36, 0.04), transparent 60%),
            #020a1e;
        }

        .sensory-content {
          background: rgba(13, 27, 62, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 28px;
          padding: 2.8rem 2.5rem;
          backdrop-filter: blur(8px);
        }

        .sensory-header {
          margin-bottom: 2rem;
        }
        .sensory-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 16px;
          border-radius: 100px;
          background: rgba(251, 191, 36, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.3);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fbbf24;
          margin-bottom: 12px;
        }
        .sensory-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fbbf24;
          animation: pulse 2s infinite;
        }

        .sensory-title {
          font-size: clamp(1.8rem, 3.2vw, 2.8rem);
          font-weight: 900;
          color: #fff;
          margin: 0 0 0.5rem;
        }
        .sensory-desc {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.75;
          max-width: 760px;
        }

        .sensory-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 1.5rem;
        }

        .sensory-purpose,
        .sensory-indications {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 1.4rem 1.6rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .sensory-subtitle {
          font-size: 1.05rem;
          font-weight: 800;
          color: #fbbf24;
          margin: 0 0 0.6rem;
        }

        .sensory-purpose p {
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.7;
          font-size: 0.9rem;
        }

        .indications-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .indication-item {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
          padding: 4px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }
        .indication-item:last-child {
          border-bottom: none;
        }
        .indication-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fbbf24;
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
        }

        /* ── Back Link ── */
        .back-link-wrap {
          padding: 2rem clamp(20px, 5vw, 64px) 4rem;
          text-align: center;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.25s ease, transform 0.25s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 10px 22px;
          border-radius: 40px;
          background: rgba(255, 255, 255, 0.03);
        }
        .back-link:hover {
          color: #fbbf24;
          transform: translateX(-4px);
          border-color: rgba(251, 191, 36, 0.3);
          background: rgba(251, 191, 36, 0.05);
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
          .equip-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .sensory-grid {
            grid-template-columns: 1fr;
          }
          .sensory-content {
            padding: 1.8rem 1.2rem;
          }
        }

        @media (max-width: 640px) {
          .equip-grid {
            grid-template-columns: 1fr;
          }
          .sensory-grid {
            grid-template-columns: 1fr;
          }
          .sensory-content {
            padding: 1.2rem 1rem;
          }
          .sensory-title {
            font-size: 1.6rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-badge,
          .hero-title,
          .hero-sub,
          .hero-orb,
          .scroll-pill svg,
          .badge-dot,
          .equip-card,
          .sensory-badge-dot {
            animation: none !important;
            transition: none !important;
          }
          .hero-badge,
          .hero-title,
          .hero-sub,
          .equip-card {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}