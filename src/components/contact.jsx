import { useState, useEffect, useRef } from "react";
import { SERVICES } from "../../data/services";

const SERVICE_OPTIONS = SERVICES.map((s) => s.title);

/* EEG-ის ხანგრძლივობის ვარიანტები */
const EEG_DURATIONS = ["1 საათიანი", "1-3 საათიანი", "6-12 საათიანი", "24 საათიანი"];

/* ─────────────── DATA ─────────────── */
const HOURS = [
  { day: "ორშაბათი – პარასკევი", time: "09:00 – 19:00", open: true },
  { day: "შაბათი",               time: "დახურულია",      open: false },
  { day: "კვირა",                time: "დახურულია",      open: false },
];

/* ფილიალები — თითოეულს დაუმატე შენი რეალური სახელი, მისამართი, ტელეფონი, ფოტო და რუკის ლინკი */
const BRANCHES = [
  { 
    id: "batumi-main", 
    city: "ბათუმი",
    name: "მთავარი ფილიალი",
    address: "ექვთიმე თაყაიშვილის 58",
    phone: "+995 32 2 423 864",
    hours: "09:00 – 19:00",
    isOpen: true,
    image: "/branch-batumi.webp",
    mapLink: 
      "https://www.google.com/maps/place/%E1%83%98%E1%83%A0%E1%83%9B%E1%83%90+%E1%83%AE%E1%83%95%E1%83%98%E1%83%A9%E1%83%98%E1%83%90%E1%83%A1+%E1%83%A0%E1%83%94%E1%83%90%E1%83%91%E1%83%98%E1%83%9A%E1%83%98%E1%83%A2%E1%83%90%E1%83%AA%E1%83%98%E1%83%98%E1%83%A1+%E1%83%AA%E1%83%94%E1%83%9C%E1%83%A2%E1%83%A0%E1%83%98",
  },
  {
    id: "batumi-second",
    city: "ბათუმი",
    name: "ფილიალი #2",
    address: "შეავსე მისამართი",
    phone: "შეავსე ნომერი",
    hours: "შეავსე საათები",
    isOpen: true,
    image: "/branch-2.webp",
    mapLink: "https://www.google.com/maps",
  },
];

const CONTACT_ITEMS = [
  { 
    id: "address",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "მისამართი",
    value: "ექვთიმე თაყაიშვილის 58",
    sub: "ბათუმი, საქართველო",
    link: "https://www.google.com/maps/place/%E1%83%98%E1%83%A0%E1%83%9B%E1%83%90+%E1%83%AE%E1%83%95%E1%83%98%E1%83%A9%E1%83%98%E1%83%90%E1%83%A1+%E1%83%A0%E1%83%94%E1%83%90%E1%83%91%E1%83%98%E1%83%9A%E1%83%98%E1%83%A2%E1%83%90%E1%83%AA%E1%83%98%E1%83%98%E1%83%A1+%E1%83%AA%E1%83%94%E1%83%9C%E1%83%A2%E1%83%A0%E1%83%98",
    color: "#3A7BD5",
    colorRgb: "58,123,213",
  },
  {
    id: "phone",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.12 2.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    label: "ტელეფონი",
    value: "+995 32 2 423 864",
    sub: "ორშ–პარ, 09:00–19:00",
    link: "tel:+995 32 2 423 864",
    color: "#10B981",
    colorRgb: "16,185,129",
  },
  {
    id: "email",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "ელფოსტა",
    value: "ikrehabilitation@gmail.com",
    sub: "პასუხი 24 საათში",
    link: "mailto:ikrehabilitation@gmail.com",
    color: "#F5A623",
    colorRgb: "245,166,35",
  },
];

/* ─────────────── CONTACT ITEM ─────────────── */
function ContactItem({ item, visible, delay }) {
  return (
    <a
      href={item.link}
      target={item.id === "address" ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`ct-info-item ${visible ? "ct-info-item--in" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="ct-info-icon" style={{ background: `rgba(${item.colorRgb},0.12)`, border: `1px solid rgba(${item.colorRgb},0.25)`, color: item.color }}>
        {item.icon}
      </div>
      <div className="ct-info-body">
        <span className="ct-info-label" style={{ color: item.color }}>{item.label}</span>
        <span className="ct-info-value">{item.value}</span>
        <span className="ct-info-sub">{item.sub}</span>
      </div>
    </a>
  );
}

/* ─────────────── BRANCH EXPLORER ───────────────
   ფილიალების ინტერაქტიული სია: მარცხნივ ირჩევ ფილიალს,
   მარჯვნივ ჩნდება მისი დეტალები და ფოტო/რუკის ბმული. */
function BranchExplorer({ branches, visible }) {
  const [selected, setSelected] = useState(branches[0]);

  return (
    <div className={`bx-root ${visible ? "bx-root--in" : ""}`}>
      <div className="bx-head">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1M9 13h1M14 9h1M14 13h1"/>
        </svg>
        ჩვენი ფილიალები
      </div>

      <div className="bx-grid">
        <div className="bx-list">
          {branches.map((b) => {
            const isActive = selected.id === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelected(b)}
                className={`bx-card ${isActive ? "bx-card--active" : ""}`}
              >
                <div className="bx-card-top">
                  <div>
                    <span className="bx-card-city">{b.city}</span>
                    <h4 className="bx-card-name">{b.name}</h4>
                  </div>
                  <span className={`bx-badge ${b.isOpen ? "bx-badge--open" : "bx-badge--closed"}`}>
                    {b.isOpen ? "ღიაა" : "დაკეტილია"}
                  </span>
                </div>
                <div className="bx-card-rows">
                  <div className="bx-card-row">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{b.address}</span>
                  </div>
                  <div className="bx-card-row">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>{b.hours}</span>
                  </div>
                  <div className="bx-card-row">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.12 2.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    <span>{b.phone}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="bx-detail">
          <div className="bx-detail-eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="3 11 22 2 13 21 11 13 3 11"/>
            </svg>
            არჩეული ლოკაცია
          </div>
          <h3 className="bx-detail-title">{selected.name} — {selected.city}</h3>
          <p className="bx-detail-address">{selected.address}</p>

          <div className="bx-detail-preview">
            <img src={selected.image} alt={selected.name} loading="lazy" />
            <div className="bx-detail-preview-overlay">
              <a href={selected.mapLink} target="_blank" rel="noopener noreferrer" className="bx-detail-link">
                Google Maps-ზე გახსნა
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── MAIN COMPONENT ─────────────── */
export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    specialist: "",
    service: "",
    message: "",
    eegDuration: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const rootRef = useRef(null);
  const formRef = useRef(null);

  // ეეგ სერვისის ამოცნობა (ქართული და ინგლისური ჩანაწერებისთვის)
  const isEEG = /eeg|ეეგ/i.test(formData.service);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.04 }
    );
    if (rootRef.current) obs.observe(rootRef.current);

    const preselectedSpecialist = sessionStorage.getItem("selectedSpecialist");
    if (preselectedSpecialist) {
      setFormData(prev => ({ ...prev, specialist: preselectedSpecialist }));
      sessionStorage.removeItem("selectedSpecialist");
    }

    const preselectedService = sessionStorage.getItem("selectedService");
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
      sessionStorage.removeItem("selectedService");
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }

    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  // Validate required fields
  if (!formData.name.trim()) {
    setError("გთხოვთ შეიყვანოთ სახელი");
    setLoading(false);
    return;
  }
  if (!formData.phone.trim()) {
    setError("გთხოვთ შეიყვანოთ ტელეფონის ნომერი");
    setLoading(false);
    return;
  }
  if (isEEG && !formData.eegDuration) {
    setError("გთხოვთ აირჩიოთ ეეგ-ის ხანგრძლივობა");
    setLoading(false);
    return;
  }

  try {
    const serviceValue = formData.service?.trim()
      ? isEEG && formData.eegDuration
        ? `${formData.service.trim()} (${formData.eegDuration})`
        : formData.service.trim()
      : null;

    const submissionData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      specialist: formData.specialist?.trim() || null,
      service: serviceValue,
      message: formData.message?.trim() || null,
      status: "pending",
    };

    // Supabase-ს mარტო აქ ვტვირთავთ, submit-ის დროს
    const { getSupabase } = await import( "../../lib/supabase");
    const supabase = await getSupabase();

    const { data, error } = await supabase
      .from("submissions")
      .insert([submissionData])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      setError(`მონაცემების გაგზავნა ვერ მოხერხდა: ${error.message}`);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
    setFormData({ name: "", phone: "", specialist: "", service: "", message: "", eegDuration: "" });

    setTimeout(() => {
      setSent(false);
    }, 4000);

  } catch (err) {
    console.error("Error:", err);
    setError("დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.");
    setLoading(false);
  }
};

  return (
    <>
      <style>{`

        html, body { margin: 0; padding: 0; }

        .ct-root {
          --navy:        #0F2344;
          --navy-2:      #142B52;
          --navy-3:      #1A3460;
          --gold:        #F5A623;
          --gold-light:  #FFD166;
          --gold-dim:    rgba(245,166,35,0.15);
          --gold-border: rgba(245,166,35,0.3);
          --cream:       #FEF9F0;
          --blue:        #4DA6FF;
          --text-body:   #E2E8F0;
          --text-muted:  rgba(226,232,240,0.55);
          --card:        rgba(255,255,255,0.055);
          --card-border: rgba(255,255,255,0.1);
          --wa:          #25D366;
          --fb:          #0084FF;

          background: var(--navy);
          font-family: 'Noto Sans Georgian', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        .ct-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .ct-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
        }
        .ct-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
        }

        .ct-wrap {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 96px 32px 80px;
        }

        .ct-header {
          text-align: center;
          margin-bottom: 72px;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ct-header--in { opacity: 1; transform: translateY(0); }

        .ct-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          background: var(--gold-dim);
          border: 1px solid var(--gold-border);
          padding: 6px 14px;
          border-radius: 40px;
          margin-bottom: 24px;
        }
        .ct-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--gold);
          animation: ctPulse 2.2s ease infinite;
        }

        .ct-title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 900;
          color: #fff;
          line-height: 1.12;
          letter-spacing: -0.03em;
          margin: 0 0 18px;
        }
        .ct-title span {
          background: linear-gradient(135deg, var(--gold) 20%, var(--gold-light) 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ct-lead {
          font-size: clamp(13px, 1.6vw, 15px);
          color: var(--text-muted);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.75;
        }

        .ct-grid {
          display: grid;
          grid-template-columns: 1fr 1.08fr;
          gap: 28px;
          align-items: start;
        }

        .ct-left {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ct-info-strip {
          display: flex;
          flex-direction: column;
          gap: 10px;
          opacity: 0;
          transform: translateX(-28px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .ct-info-strip--in { opacity: 1; transform: translateX(0); }

        .ct-info-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          background: var(--card);
          border: 1px solid var(--card-border);
          border-radius: 16px;
          text-decoration: none;
          color: inherit;
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.5s ease, transform 0.5s ease, background 0.25s ease, border-color 0.25s ease;
        }
        .ct-info-item--in {
          opacity: 1;
          transform: translateX(0);
        }
        .ct-info-item:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.14);
          transform: translateX(5px);
        }

        .ct-info-icon {
          width: 42px; height: 42px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .ct-info-item:hover .ct-info-icon {
          transform: scale(1.08) rotate(-4deg);
        }

        .ct-info-body {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .ct-info-label {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .ct-info-value {
          font-size: 13.5px;
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ct-info-sub {
          font-size: 11px;
          color: var(--text-muted);
        }

        .ct-messengers {
          display: flex;
          gap: 10px;
          opacity: 0;
          transform: translateX(-28px);
          transition: opacity 0.55s ease 0.15s, transform 0.55s ease 0.15s;
        }
        .ct-messengers--in { opacity: 1; transform: translateX(0); }

        .ct-msg-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 18px;
          border-radius: 14px;
          border: none;
          font-family: 'Noto Sans Georgian', sans-serif;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          color: white;
          transition: transform 0.22s ease, filter 0.22s ease;
        }
        .ct-msg-btn:hover { transform: translateY(-3px); filter: brightness(1.08); }
        .ct-msg-wa { background: linear-gradient(135deg, #25D366, #1AAD5A); }
        .ct-msg-fb { background: linear-gradient(135deg, #0084FF, #005AC4); }

        .ct-hours {
          background: var(--card);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 22px 22px 18px;
          opacity: 0;
          transform: translateX(-28px);
          transition: opacity 0.55s ease 0.25s, transform 0.55s ease 0.25s;
        }
        .ct-hours--in { opacity: 1; transform: translateX(0); }

        .ct-hours-head {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(245,166,35,0.2);
        }

        .ct-hours-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 0;
          border-bottom: 1px solid rgba(255,255,255,0.045);
        }
        .ct-hours-row:last-child { border-bottom: none; }
        .ct-hours-day { font-size: 12.5px; color: rgba(255,255,255,0.7); font-weight: 500; }
        .ct-hours-right { display: flex; align-items: center; gap: 10px; }
        .ct-hours-time { font-size: 12.5px; font-weight: 700; color: #fff; }
        .ct-hours-time--closed { color: rgba(255,255,255,0.3); font-weight: 400; font-style: italic; }
        .ct-hours-badge {
          font-size: 9px; font-weight: 800; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 3px 9px; border-radius: 40px;
        }
        .ct-hours-badge--open { background: rgba(16,185,129,0.18); color: #6EE7B7; border: 1px solid rgba(16,185,129,0.35); }
        .ct-hours-badge--closed { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.3); border: 1px solid rgba(255,255,255,0.08); }

        /* ─── ფილიალების ინტერაქტიული სექცია ─── */
        .bx-section {
          margin-top: 44px;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .bx-section--in { opacity: 1; transform: translateY(0); }

        .bx-root {
          background: var(--card);
          border: 1px solid var(--card-border);
          border-radius: 24px;
          padding: 28px 26px;
        }

        .bx-head {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 22px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(245,166,35,0.2);
        }

        .bx-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 22px;
          align-items: stretch;
        }

        .bx-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .bx-card {
          text-align: left;
          cursor: pointer;
          padding: 18px 20px;
          border-radius: 16px;
          border: 1px solid var(--card-border);
          background: rgba(255,255,255,0.03);
          font-family: 'Noto Sans Georgian', sans-serif;
          color: inherit;
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .bx-card:hover {
          border-color: rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.05);
        }
        .bx-card--active {
          background: rgba(245,166,35,0.08);
          border-color: rgba(245,166,35,0.5);
        }

        .bx-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 12px;
        }
        .bx-card-city {
          display: block;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 3px;
        }
        .bx-card-name {
          margin: 0;
          font-size: 16px;
          font-weight: 800;
          color: #fff;
        }

        .bx-badge {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 40px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .bx-badge--open { background: rgba(16,185,129,0.15); color: #6EE7B7; border: 1px solid rgba(16,185,129,0.3); }
        .bx-badge--closed { background: rgba(239,68,68,0.12); color: #FCA5A5; border: 1px solid rgba(239,68,68,0.28); }

        .bx-card-rows {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .bx-card-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: var(--text-muted);
        }
        .bx-card-row svg { flex-shrink: 0; color: rgba(255,255,255,0.35); }

        .bx-detail {
          position: relative;
          background: rgba(255,255,255,0.035);
          border: 1px solid var(--card-border);
          border-radius: 18px;
          padding: 26px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .bx-detail-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          align-self: flex-start;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold);
          background: var(--gold-dim);
          border: 1px solid var(--gold-border);
          padding: 5px 12px;
          border-radius: 40px;
          margin-bottom: 16px;
        }

        .bx-detail-title {
          font-size: 20px;
          font-weight: 900;
          color: #fff;
          margin: 0 0 8px;
          letter-spacing: -0.02em;
        }

        .bx-detail-address {
          font-size: 13px;
          color: var(--text-muted);
          margin: 0 0 18px;
        }

        .bx-detail-preview {
          position: relative;
          flex: 1;
          min-height: 180px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: var(--navy-2);
        }
        .bx-detail-preview img {
          width: 100%;
          height: 100%;
          min-height: 180px;
          object-fit: cover;
          display: block;
        }
        .bx-detail-preview-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 16px;
          background: linear-gradient(to top, rgba(11,22,40,0.9) 0%, transparent 100%);
          display: flex;
          justify-content: flex-end;
        }

        .bx-detail-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 16px;
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
          color: var(--navy);
          border-radius: 40px;
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
          transition: transform 0.22s ease, filter 0.22s ease;
        }
        .bx-detail-link:hover {
          transform: translateY(-2px);
          filter: brightness(1.06);
        }

        .ct-right {
          display: flex;
          flex-direction: column;
          gap: 20px;
          opacity: 0;
          transform: translateX(32px);
          transition: opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s;
        }
        .ct-right--in { opacity: 1; transform: translateX(0); }

        .ct-form-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 24px;
          padding: 32px 28px;
          position: relative;
          overflow: hidden;
        }
        .ct-form-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), var(--gold-light), transparent);
        }

        .ct-form-head { margin-bottom: 22px; }
        .ct-form-title {
          font-size: 19px; font-weight: 900; color: #fff;
          margin: 0 0 5px; letter-spacing: -0.02em;
        }
        .ct-form-sub { font-size: 12.5px; color: var(--text-muted); }

        .ct-form { display: flex; flex-direction: column; gap: 13px; }
        .ct-field-row { display: flex; gap: 13px; }
        .ct-field { display: flex; flex-direction: column; gap: 6px; flex: 1; }

        .ct-field label {
          font-size: 10px; font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(245,166,35,0.8);
        }
        .ct-field input, .ct-field textarea, .ct-field select {
          padding: 11px 15px;
          border-radius: 13px;
          border: 1.5px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          font-family: 'Noto Sans Georgian', sans-serif;
          font-size: 13px;
          color: #fff;
          outline: none;
          transition: all 0.22s ease;
        }
        .ct-field input::placeholder, .ct-field textarea::placeholder { color: rgba(255,255,255,0.22); }
        .ct-field input:focus, .ct-field textarea:focus, .ct-field select:focus {
          border-color: rgba(245,166,35,0.5);
          background: rgba(245,166,35,0.05);
          box-shadow: 0 0 0 4px rgba(245,166,35,0.08);
        }
        .ct-field textarea { resize: none; min-height: 90px; }

        .ct-field select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23F5A623' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
        }
        .ct-field select option {
          background: #0F2344;
          color: #fff;
        }
        .ct-field select:invalid,
        .ct-field select.ct-select-empty {
          color: rgba(255,255,255,0.4);
        }

        .ct-field-prefilled input, .ct-field-prefilled select {
          border-color: rgba(245,166,35,0.45);
          background: rgba(245,166,35,0.07);
          color: var(--gold-light);
          font-weight: 600;
        }
        .ct-field-prefilled label { color: var(--gold); }

        .ct-error {
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 10px;
          padding: 10px 14px;
          color: #FCA5A5;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ct-submit {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 14px 24px;
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
          color: var(--navy);
          border: none; border-radius: 60px;
          font-family: 'Noto Sans Georgian', sans-serif;
          font-weight: 800; font-size: 13px;
          cursor: pointer; margin-top: 4px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
          box-shadow: 0 8px 28px rgba(245,166,35,0.28);
          letter-spacing: 0.01em;
        }
        .ct-submit:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(245,166,35,0.38);
          filter: brightness(1.06);
        }
        .ct-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .ct-submit--sent {
          background: linear-gradient(135deg, #10B981, #059669);
          box-shadow: 0 8px 28px rgba(16,185,129,0.3);
          color: #fff;
        }

        .ct-map-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .ct-map-card iframe {
          display: block;
          width: 100%;
          height: 260px;
          border: none;
          filter: brightness(0.85) saturate(0.9);
        }
        .ct-map-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 20px 20px 18px;
          background: linear-gradient(to top, rgba(11,22,40,0.95) 0%, transparent 100%);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
        }
        .ct-map-loc {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ct-map-loc-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--gold);
          animation: ctPulse 2s ease infinite;
          flex-shrink: 0;
        }
        .ct-map-loc-text {
          font-size: 12px; font-weight: 700; color: #fff;
        }
        .ct-map-link {
          font-size: 11px; font-weight: 700;
          color: var(--gold);
          text-decoration: none;
          display: flex; align-items: center; gap: 5px;
          background: rgba(245,166,35,0.12);
          border: 1px solid rgba(245,166,35,0.3);
          padding: 5px 12px;
          border-radius: 40px;
          transition: all 0.22s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .ct-map-link:hover { background: rgba(245,166,35,0.22); }

        .ft-root {
          background: #0D2040;
          border-top: 1px solid rgba(255,255,255,0.08);
          position: relative;
        }
        .ft-gold-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), var(--gold-light), transparent);
        }

        @keyframes ctPulse {
          0%,100% { transform: scale(1); opacity:1; }
          50% { transform: scale(1.35); opacity:0.6; }
        }

        @media (max-width: 960px) {
          .ct-grid { grid-template-columns: 1fr; }
          .ct-wrap { padding: 72px 20px 64px; }
          .bx-grid { grid-template-columns: 1fr; }
        }

        /* ─── CONTACT SECTION RESPONSIVE (565px-ზე ქვემოთ) ─── */
        @media (max-width: 565px) {
          .ct-wrap {
            padding: 48px 12px 40px;
          }
          
          .ct-header {
            margin-bottom: 32px;
          }
          
          .ct-eyebrow {
            font-size: 9px;
            padding: 4px 10px;
            gap: 5px;
          }
          
          .ct-title {
            font-size: clamp(22px, 5.5vw, 28px);
            line-height: 1.15;
          }
          
          .ct-lead {
            font-size: 11.5px;
            max-width: 100%;
            padding: 0 4px;
          }
          
          .ct-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .ct-left {
            gap: 10px;
          }
          
          .ct-info-item {
            padding: 9px 12px;
            gap: 10px;
            border-radius: 12px;
          }
          
          .ct-info-icon {
            width: 32px;
            height: 32px;
            border-radius: 9px;
          }
          .ct-info-icon svg {
            width: 14px;
            height: 14px;
          }
          
          .ct-info-label {
            font-size: 7.5px;
          }
          
          .ct-info-value {
            font-size: 11px;
            white-space: normal;
            word-break: break-word;
          }
          
          .ct-info-sub {
            font-size: 9px;
          }
          
          .ct-messengers {
            flex-direction: column;
            gap: 6px;
          }
          
          .ct-msg-btn {
            padding: 9px 12px;
            font-size: 10.5px;
            border-radius: 11px;
          }
          .ct-msg-btn svg {
            width: 14px;
            height: 14px;
          }
          
          .ct-hours {
            padding: 14px 12px 12px;
            border-radius: 14px;
          }
          
          .ct-hours-head {
            font-size: 8.5px;
            margin-bottom: 10px;
            padding-bottom: 8px;
          }
          .ct-hours-head svg {
            width: 12px;
            height: 12px;
          }
          
          .ct-hours-row {
            padding: 6px 0;
            flex-wrap: wrap;
            gap: 3px;
          }
          
          .ct-hours-day {
            font-size: 10.5px;
          }
          
          .ct-hours-right {
            gap: 5px;
            flex-wrap: wrap;
          }
          
          .ct-hours-time {
            font-size: 10.5px;
          }
          
          .ct-hours-badge {
            font-size: 6.5px;
            padding: 2px 6px;
          }

          /* ფილიალების სექცია — მობილურზე უფრო კომპაქტური */
          .bx-section { margin-top: 24px; }
          .bx-root {
            padding: 16px 14px;
            border-radius: 16px;
          }
          .bx-head {
            font-size: 9px;
            margin-bottom: 14px;
            padding-bottom: 10px;
          }
          .bx-head svg { width: 12px; height: 12px; }
          .bx-grid { gap: 12px; }
          .bx-card { padding: 13px 14px; border-radius: 12px; }
          .bx-card-city { font-size: 8.5px; }
          .bx-card-name { font-size: 13px; }
          .bx-badge { font-size: 7.5px; padding: 3px 8px; }
          .bx-card-row { font-size: 10.5px; gap: 6px; }
          .bx-detail { padding: 16px; border-radius: 14px; }
          .bx-detail-eyebrow { font-size: 8.5px; padding: 4px 10px; margin-bottom: 12px; }
          .bx-detail-title { font-size: 15px; }
          .bx-detail-address { font-size: 11px; margin-bottom: 12px; }
          .bx-detail-preview { min-height: 130px; }
          .bx-detail-preview img { min-height: 130px; }
          .bx-detail-link { font-size: 10.5px; padding: 7px 12px; }
          
          .ct-right {
            gap: 14px;
          }
          
          .ct-form-card {
            padding: 18px 14px;
            border-radius: 16px;
          }
          
          .ct-form-head {
            margin-bottom: 14px;
          }
          
          .ct-form-title {
            font-size: 15px;
          }
          
          .ct-form-sub {
            font-size: 10.5px;
          }
          
          .ct-form {
            gap: 9px;
          }
          
          .ct-field-row {
            flex-direction: column;
            gap: 9px;
          }
          
          .ct-field label {
            font-size: 8.5px;
          }
          
          .ct-field input,
          .ct-field textarea,
          .ct-field select {
            padding: 8px 11px;
            font-size: 11.5px;
            border-radius: 10px;
          }
          
          .ct-field textarea {
            min-height: 65px;
          }
          
          .ct-error {
            font-size: 10.5px;
            padding: 7px 10px;
          }
          
          .ct-submit {
            padding: 10px 16px;
            font-size: 11.5px;
          }
          
          .ct-map-card {
            border-radius: 14px;
          }
          
          .ct-map-card iframe {
            height: 160px;
          }
          
          .ct-map-overlay {
            padding: 12px 12px 10px;
            flex-wrap: wrap;
            gap: 6px;
          }
          
          .ct-map-loc-text {
            font-size: 10px;
          }
          .ct-map-loc-dot {
            width: 6px;
            height: 6px;
          }
          
          .ct-map-link {
            font-size: 9.5px;
            padding: 4px 9px;
          }
          .ct-map-link svg {
            width: 8px;
            height: 8px;
          }
        }

        /* ─── 475px-ზე ქვემოთ (ყველაფერი პატარა) ─── */
        @media (max-width: 475px) {
          .ct-wrap {
            padding: 36px 8px 32px;
          }
          
          .ct-header {
            margin-bottom: 24px;
          }
          
          .ct-eyebrow {
            font-size: 7.5px;
            padding: 3px 8px;
            gap: 4px;
          }
          .ct-eyebrow-dot {
            width: 4px;
            height: 4px;
          }
          
          .ct-title {
            font-size: clamp(18px, 5vw, 22px);
            margin-bottom: 10px;
          }
          
          .ct-lead {
            font-size: 10px;
            line-height: 1.5;
          }
          
          .ct-grid {
            gap: 12px;
          }
          
          .ct-left {
            gap: 8px;
          }
          
          .ct-info-item {
            padding: 7px 10px;
            gap: 8px;
            border-radius: 10px;
          }
          
          .ct-info-icon {
            width: 26px;
            height: 26px;
            border-radius: 7px;
          }
          .ct-info-icon svg {
            width: 12px;
            height: 12px;
          }
          
          .ct-info-label {
            font-size: 6.5px;
          }
          
          .ct-info-value {
            font-size: 9.5px;
            white-space: normal;
            word-break: break-word;
          }
          
          .ct-info-sub {
            font-size: 8px;
          }
          
          .ct-messengers {
            gap: 5px;
          }
          
          .ct-msg-btn {
            padding: 7px 10px;
            font-size: 9px;
            border-radius: 9px;
            gap: 5px;
          }
          .ct-msg-btn svg {
            width: 12px;
            height: 12px;
          }
          
          .ct-hours {
            padding: 10px 10px 8px;
            border-radius: 12px;
          }
          
          .ct-hours-head {
            font-size: 7.5px;
            margin-bottom: 8px;
            padding-bottom: 6px;
          }
          .ct-hours-head svg {
            width: 10px;
            height: 10px;
          }
          
          .ct-hours-row {
            padding: 4px 0;
          }
          
          .ct-hours-day {
            font-size: 9px;
          }
          
          .ct-hours-right {
            gap: 4px;
          }
          
          .ct-hours-time {
            font-size: 9px;
          }
          
          .ct-hours-badge {
            font-size: 5.5px;
            padding: 1px 5px;
          }

          .bx-root { padding: 12px 10px; border-radius: 14px; }
          .bx-head { font-size: 8px; margin-bottom: 10px; padding-bottom: 8px; }
          .bx-head svg { width: 10px; height: 10px; }
          .bx-card { padding: 10px 11px; border-radius: 10px; }
          .bx-card-city { font-size: 7.5px; }
          .bx-card-name { font-size: 11.5px; }
          .bx-badge { font-size: 6.5px; padding: 2px 6px; }
          .bx-card-row { font-size: 9px; gap: 5px; }
          .bx-detail { padding: 12px; border-radius: 12px; }
          .bx-detail-eyebrow { font-size: 7.5px; padding: 3px 8px; margin-bottom: 8px; }
          .bx-detail-title { font-size: 13px; }
          .bx-detail-address { font-size: 9.5px; margin-bottom: 8px; }
          .bx-detail-preview { min-height: 100px; }
          .bx-detail-preview img { min-height: 100px; }
          .bx-detail-link { font-size: 9px; padding: 6px 10px; }
          
          .ct-right {
            gap: 10px;
          }
          
          .ct-form-card {
            padding: 14px 10px;
            border-radius: 14px;
          }
          .ct-form-card::before {
            height: 1.5px;
          }
          
          .ct-form-head {
            margin-bottom: 10px;
          }
          
          .ct-form-title {
            font-size: 13px;
          }
          
          .ct-form-sub {
            font-size: 9px;
          }
          
          .ct-form {
            gap: 7px;
          }
          
          .ct-field-row {
            gap: 7px;
          }
          
          .ct-field {
            gap: 4px;
          }
          
          .ct-field label {
            font-size: 7.5px;
            letter-spacing: 0.08em;
          }
          
          .ct-field input,
          .ct-field textarea,
          .ct-field select {
            padding: 6px 9px;
            font-size: 10px;
            border-radius: 8px;
            border-width: 1px;
          }
          
          .ct-field textarea {
            min-height: 50px;
          }
          
          .ct-field select {
            background-position: right 10px center;
            padding-right: 28px;
          }
          .ct-field select option {
            font-size: 10px;
          }
          
          .ct-error {
            font-size: 9px;
            padding: 6px 8px;
            border-radius: 8px;
          }
          .ct-error svg {
            width: 12px;
            height: 12px;
          }
          
          .ct-submit {
            padding: 8px 14px;
            font-size: 10px;
            border-radius: 50px;
            margin-top: 2px;
          }
          .ct-submit svg {
            width: 11px;
            height: 11px;
          }
          
          .ct-map-card {
            border-radius: 12px;
          }
          
          .ct-map-card iframe {
            height: 120px;
          }
          
          .ct-map-overlay {
            padding: 8px 8px 6px;
            gap: 4px;
          }
          
          .ct-map-loc {
            gap: 4px;
          }
          .ct-map-loc-dot {
            width: 5px;
            height: 5px;
          }
          
          .ct-map-loc-text {
            font-size: 8.5px;
          }
          
          .ct-map-link {
            font-size: 8px;
            padding: 3px 7px;
            border-radius: 30px;
            gap: 3px;
          }
          .ct-map-link svg {
            width: 7px;
            height: 7px;
          }
        }

        /* ─── 380px-ზე ქვემოთ (ძალიან პატარა) ─── */
        @media (max-width: 380px) {
          .ct-wrap {
            padding: 28px 6px 24px;
          }
          
          .ct-title {
            font-size: clamp(16px, 4.5vw, 19px);
          }
          
          .ct-lead {
            font-size: 9px;
          }
          
          .ct-info-item {
            padding: 5px 8px;
            gap: 6px;
          }
          
          .ct-info-icon {
            width: 22px;
            height: 22px;
          }
          .ct-info-icon svg {
            width: 10px;
            height: 10px;
          }
          
          .ct-info-value {
            font-size: 8.5px;
          }
          
          .ct-info-sub {
            font-size: 7px;
          }
          
          .ct-msg-btn {
            padding: 6px 8px;
            font-size: 8px;
          }
          .ct-msg-btn svg {
            width: 10px;
            height: 10px;
          }
          
          .ct-hours {
            padding: 8px 8px 6px;
          }
          
          .ct-hours-day {
            font-size: 8px;
          }
          
          .ct-hours-time {
            font-size: 8px;
          }
          
          .ct-hours-badge {
            font-size: 5px;
            padding: 1px 4px;
          }

          .bx-root { padding: 8px 8px; }
          .bx-card { padding: 8px 9px; }
          .bx-detail { padding: 10px; }
          .bx-detail-preview { min-height: 80px; }
          .bx-detail-preview img { min-height: 80px; }
          
          .ct-form-card {
            padding: 10px 8px;
          }
          
          .ct-form-title {
            font-size: 11px;
          }
          
          .ct-form-sub {
            font-size: 8px;
          }
          
          .ct-field input,
          .ct-field textarea,
          .ct-field select {
            padding: 5px 8px;
            font-size: 9px;
          }
          
          .ct-field textarea {
            min-height: 40px;
          }
          
          .ct-submit {
            padding: 6px 12px;
            font-size: 9px;
          }
          
          .ct-map-card iframe {
            height: 100px;
          }
          
          .ct-map-loc-text {
            font-size: 7.5px;
          }
          
          .ct-map-link {
            font-size: 7px;
            padding: 2px 6px;
          }
        }

        @media (max-width: 600px) {
          .ct-field-row { flex-direction: column; }
          .ct-info-value { white-space: normal; }
        }

        /* ─── FOOTER RESPONSIVE (არ შეხებია) ─── */
        @media (max-width: 1024px) {
          .ft-root > div {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
            padding: 48px 24px 36px !important;
          }
        }

        @media (max-width: 768px) {
          .ft-root > div {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            padding: 40px 20px 32px !important;
            text-align: center !important;
          }
          .ft-root > div > div:first-child p {
            max-width: 100% !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .ft-root > div > div:first-child > div:first-child {
            justify-content: center !important;
          }
          .ft-root > div > div:first-child > div:last-child {
            justify-content: center !important;
          }
          .ft-root > div > div nav {
            align-items: center !important;
          }
          .ft-root > div > div:last-child > div {
            align-items: center !important;
          }
          .ft-root > div > div:last-child > a {
            margin: 0 auto !important;
          }
          .ft-root > div:last-child {
            padding: 14px 16px !important;
            font-size: 10px !important;
          }
        }

        @media (max-width: 480px) {
          .ft-root > div {
            padding: 32px 16px 28px !important;
            gap: 24px !important;
          }
          .ft-root > div > div:first-child > div:first-child {
            flex-direction: column !important;
            align-items: center !important;
          }
          .ft-root > div > div:first-child > div:first-child > div {
            text-align: center !important;
          }
          .ft-root > div > div:last-child > a {
            font-size: 10px !important;
            padding: 8px 14px !important;
          }
          .ft-root > div:last-child {
            padding: 12px 12px !important;
            font-size: 9px !important;
          }
        }
      `}</style>
      

      <section className="ct-root" id="contact" ref={rootRef}>
        <div className="ct-bg">
          <div className="ct-bg-grid" />
          <div className="ct-bg-orb" style={{ width:700, height:700, top:-250, right:-200, background:"radial-gradient(circle, rgba(56,139,255,0.16) 0%, transparent 70%)" }} />
          <div className="ct-bg-orb" style={{ width:500, height:500, bottom:-80, left:-80, background:"radial-gradient(circle, rgba(77,166,255,0.13) 0%, transparent 70%)" }} />
          <div className="ct-bg-orb" style={{ width:350, height:350, top:"40%", left:"40%", background:"radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)" }} />
        </div>

        <div className="ct-wrap">
          <header className={`ct-header ${visible ? "ct-header--in" : ""}`}>
            <div className="ct-eyebrow">
              <div className="ct-eyebrow-dot" />
              დაგვიკავშირდით
            </div>
            <h2 className="ct-title">
              ჩვენ <span>მზად ვართ</span><br />
              თქვენს გვერდით
            </h2>
            <p className="ct-lead">
              გვიბარეთ ზარი, გამოაგზავნეთ შეტყობინება ან მობრძანდით პირდაპირ —
              პირველი ნაბიჯი ყოველთვის ჩვენთანაა.
            </p>
          </header>

          <div className="ct-grid">
            <div className="ct-left">
              <div className={`ct-info-strip ${visible ? "ct-info-strip--in" : ""}`}>
                {CONTACT_ITEMS.map((item, i) => (
                  <ContactItem key={item.id} item={item} visible={visible} delay={i * 0.1} />
                ))}
              </div>

              <div className={`ct-messengers ${visible ? "ct-messengers--in" : ""}`}>
                <a href="https://wa.me/995555123456" target="_blank" rel="noopener noreferrer" className="ct-msg-btn ct-msg-wa">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <a href="https://www.facebook.com/profile.php?id=100063818393741" target="_blank" rel="noopener noreferrer" className="ct-msg-btn ct-msg-fb">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </div>

              <div className={`ct-hours ${visible ? "ct-hours--in" : ""}`}>
                <div className="ct-hours-head">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  სამუშაო საათები
                </div>
                {HOURS.map((h) => (
                  <div key={h.day} className="ct-hours-row">
                    <span className="ct-hours-day">{h.day}</span>
                    <div className="ct-hours-right">
                      <span className={`ct-hours-time ${h.open ? "" : "ct-hours-time--closed"}`}>{h.time}</span>
                      <span className={`ct-hours-badge ${h.open ? "ct-hours-badge--open" : "ct-hours-badge--closed"}`}>
                        {h.open ? "ღია" : "დახ."}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`ct-right ${visible ? "ct-right--in" : ""}`}>
              <div className="ct-form-card" ref={formRef}>
                <div className="ct-form-head">
                  <h3 className="ct-form-title">დაჯავშნეთ ვიზიტი</h3>
                  <p className="ct-form-sub">დაგიკავშირდებით მოკლე ხანში</p>
                </div>
                <form className="ct-form" onSubmit={handleSubmit}>
                  <div className="ct-field-row">
                    <div className="ct-field">
                      <label>სახელი *</label>
                      <input 
                        type="text"
                        placeholder="თქვენი სრული სახელი"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="ct-field">
                      <label>ტელეფონი *</label>
                      <input
                        type="tel"
                        placeholder="+995 5XX XX XX XX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className={`ct-field ${formData.specialist ? "ct-field-prefilled" : ""}`}>
                    <label>სპეციალისტი</label>
                    <input
                      type="text"
                      placeholder="სპეციალისტი რომელთანაც ეწერებით"
                      value={formData.specialist}
                      onChange={(e) => setFormData({ ...formData, specialist: e.target.value })}
                      disabled={loading}
                    />
                  </div>

                  <div className={`ct-field ${formData.service ? "ct-field-prefilled" : ""}`}>
                    <label>სერვისი</label>
                    <select
                      className={!formData.service ? "ct-select-empty" : ""}
                      value={formData.service}
                      onChange={(e) => {
                        const value = e.target.value;
                        const stillEEG = /eeg|ეეგ/i.test(value);
                        setFormData({
                          ...formData,
                          service: value,
                          // სერვისის შეცვლისას, თუ ახალი სერვისი აღარაა ეეგ, ვასუფთავებთ ხანგრძლივობას
                          eegDuration: stillEEG ? formData.eegDuration : "",
                        });
                      }}
                      disabled={loading}
                    >
                      <option value="">აირჩიეთ სერვისი</option>
                      {SERVICE_OPTIONS.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {isEEG && (
                    <div className={`ct-field ${formData.eegDuration ? "ct-field-prefilled" : ""}`}>
                      <label>ეეგ-ის ხანგრძლივობა *</label>
                      <select
                        className={!formData.eegDuration ? "ct-select-empty" : ""}
                        value={formData.eegDuration}
                        onChange={(e) => setFormData({ ...formData, eegDuration: e.target.value })}
                        required={isEEG}
                        disabled={loading}
                      >
                        <option value="">აირჩიეთ ხანგრძლივობა</option>
                        {EEG_DURATIONS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="ct-field">
                    <label>შეტყობინება</label>
                    <textarea
                      placeholder="მოგვიყევით თქვენს საჭიროებებზე..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={loading}
                    />
                  </div>

                  {error && (
                    <div className="ct-error">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {error}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className={`ct-submit ${sent ? "ct-submit--sent" : ""}`}
                    disabled={loading || sent}
                  >
                    {loading ? (
                      <>
                        <span style={{ 
                          display: 'inline-block', 
                          width: 14, 
                          height: 14, 
                          border: '2px solid rgba(15,35,68,0.3)', 
                          borderTopColor: '#0F2344', 
                          borderRadius: '50%', 
                          animation: 'spin 0.7s linear infinite' 
                        }} />
                        იტვირთება...
                      </>
                    ) : sent ? (
                      <>
                        გაგზავნილია ✓
                      </>
                    ) : (
                      <>
                        გაგზავნა
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </>
                    )}
                  </button> 
                </form>
              </div>

              <div className="ct-map-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000.0!2d41.6282323!3d41.6410399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406787123775ff67%3A0x87dba33f22dd4919!2sIrma%20Khvichia%20Rehabilitation%20Center!5e0!3m2!1sen!2sge!4v1740000000000"
                  allowFullScreen=""
                  loading="lazy"
                  title="ირმა ხვიჩიას რეაბილიტაციის ცენტრი"
                />
                <div className="ct-map-overlay">
                  <div className="ct-map-loc">
                    <div className="ct-map-loc-dot" />
                    <span className="ct-map-loc-text">ექვთიმე თაყაიშვილის 58, ბათუმი</span>
                  </div>
                  <a
                    href="https://www.google.com/maps/place/Irma+Khvichia+Rehabilitation+Center"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ct-map-link"
                  >
                    გზამკვლევი
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={`bx-section ${visible ? "bx-section--in" : ""}`}>
            <BranchExplorer branches={BRANCHES} visible={visible} />
          </div>
        </div>

        <footer className="ft-root">
          <div className="ft-gold-line" />
          <div style={{ maxWidth:1200, margin:'0 auto', padding:'60px 32px 44px', display:'grid', gridTemplateColumns:'2fr 1fr 1.4fr 1.4fr', gap:44 }}>
            <div>
              <div style={{ display:'flex', gap:12, marginBottom:20 }}>
                <div style={{ width:42, height:42, background:'rgba(245,166,35,0.1)', borderRadius:11, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid rgba(245,166,35,0.2)', flexShrink:0 }}>
                  <svg width="26" height="26" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="19" stroke="#F5A623" strokeWidth="1.5"/><path d="M12 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#F5A623" strokeWidth="2"/><circle cx="20" cy="24" r="4" fill="#F5A623"/></svg>
                </div>
                <div>
                  <div style={{ fontSize:17, fontWeight:900, color:'white', letterSpacing:'-0.02em' }}>ირმა ხვიჩიას რეაბილიტაციის<span style={{ color:'#F5A623' }}>ცენტრი</span></div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.35)', marginTop:2 }}>განვითარება · მხარდაჭერა</div>
                </div>
              </div>
              <p style={{ fontSize:13, color:'rgba(255,255,255,0.45)', maxWidth:250, lineHeight:1.7, marginBottom:24 }}>ჩვენ ვქმნით სივრცეს, სადაც ყოველი ბავშვი პოულობს საკუთარ ბილიკს.</p>
              <div style={{ display:'flex', gap:8 }}>
                {[
                  { href:"https://www.facebook.com/profile.php?id=100063818393741", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                  { href:"https://instagram.com", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg> },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width:36, height:36, borderRadius:9, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(255,255,255,0.5)', textDecoration:'none' }}>{s.icon}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ color:'#F5A623', fontSize:11, fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:18 }}>ნავიგაცია</h4>
              <nav style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {[{label:"მთავარი",href:"#home"},{label:"ჩვენს შესახებ",href:"/about"},{label:"სერვისები",href:"/services"},{label:"გალერეა",href:"/gallery"},{label:"კონტაქტი",href:"#contact"}].map(l=>(
                  <a key={l.label} href={l.href} style={{ fontSize:13, color:'rgba(255,255,255,0.5)', textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ width:3, height:3, background:'rgba(245,166,35,0.6)', borderRadius:'50%', flexShrink:0 }} />{l.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <h4 style={{ color:'#F5A623', fontSize:11, fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:18 }}>სერვისები</h4>
              <nav style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {["მეტყველების თერაპია","ფსიქოლოგი","სპეციალური პედაგოგი","ოკუპაციური თერაპია","ქცევითი თერაპია","ადრეული განვითარება"].map(s=>(
                  <a key={s} href="/services" style={{ fontSize:13, color:'rgba(255,255,255,0.5)', textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ width:3, height:3, background:'rgba(245,166,35,0.6)', borderRadius:'50%', flexShrink:0 }} />{s}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <h4 style={{ color:'#F5A623', fontSize:11, fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:18 }}>საკონტაქტო</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:22 }}>
                {[
                  { icon:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, text:"ექვთიმე თაყაიშვილის 58 ბათუმი", href:null },
                  { icon:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.12 2.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, text:"+995 032 242 38 64", href:"tel:+995032242386" },
                  { icon:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text:"ikrehabilitation@gmail.com", href:"mailto:ikrehabilitation@gmail.com" },
                ].map((c, i) => (
                  <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                    <div style={{ width:20, height:20, background:'rgba(245,166,35,0.1)', borderRadius:5, display:'flex', alignItems:'center', justifyContent:'center', color:'#F5A623', flexShrink:0, marginTop:1 }}>{c.icon}</div>
                    {c.href
                      ? <a href={c.href} style={{ fontSize:12.5, color:'rgba(255,255,255,0.5)', textDecoration:'none' }}>{c.text}</a>
                      : <span style={{ fontSize:12.5, color:'rgba(255,255,255,0.5)' }}>{c.text}</span>
                    }
                  </div>
                ))}
              </div>
              <a href="#contact" style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'10px 18px', background:'rgba(245,166,35,0.1)', border:'1px solid rgba(245,166,35,0.35)', borderRadius:100, color:'#F5A623', fontSize:11.5, fontWeight:700, textDecoration:'none' }}>
                ჩაეწერე კონსულტაციაზე
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.05)', padding:'18px 32px', textAlign:'center', fontSize:12, color:'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} ირმა ხვიჩიას რეაბილიტაციის ცენტრი — ყველა უფლება დაცულია
          </div>
        </footer>
      </section>
    </>
  );
}