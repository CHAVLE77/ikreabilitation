import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabase";
/* ─────────────── DATA ─────────────── */
const HOURS = [
  { day: "ორშაბათი – პარასკევი", time: "09:00 – 19:00", open: true },
  { day: "შაბათი",               time: "დახურულია",      open: false },
  { day: "კვირა",                time: "დახურულია",      open: false },
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
    value: "+995 032 242 38 64",
    sub: "ორშ–პარ, 09:00–19:00",
    link: "tel:+995032242386",
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

/* ─────────────── MAIN COMPONENT ─────────────── */
export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", specialist: "", message: "" });
  const [sent, setSent] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.04 }
    );
    if (rootRef.current) obs.observe(rootRef.current);

    const preselected = sessionStorage.getItem("selectedSpecialist");
    if (preselected) {
      setFormData(prev => ({ ...prev, specialist: preselected }));
      sessionStorage.removeItem("selectedSpecialist");
    }

    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const { error } = await supabase
    .from("submissions")
    .insert([{
      name:       formData.name,
      phone:      formData.phone,
      specialist: formData.specialist,
      message:    formData.message,
      status:     "pending",
    }]);

  if (!error) {
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormData({ name: "", phone: "", specialist: "", message: "" });
  } else {
    console.error("შეცდომა:", error);
  }
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;500;600;700;800;900&display=swap');

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

        /* ── Background Decoration ── */
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

        /* ── Section Wrapper ── */
        .ct-wrap {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 96px 32px 80px;
        }

        /* ── Header ── */
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

        /* ── Main Grid ── */
        .ct-grid {
          display: grid;
          grid-template-columns: 1fr 1.08fr;
          gap: 28px;
          align-items: start;
        }

        /* ── LEFT COLUMN ── */
        .ct-left {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ── Info strip (3 cards side by side) ── */
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
          transition: all 0.3s ease;
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

        /* ── Messenger Buttons ── */
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

        /* ── Hours Card ── */
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

        /* ── RIGHT COLUMN ── */
        .ct-right {
          display: flex;
          flex-direction: column;
          gap: 20px;
          opacity: 0;
          transform: translateX(32px);
          transition: opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s;
        }
        .ct-right--in { opacity: 1; transform: translateX(0); }

        /* ── Form Card ── */
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
        .ct-field input, .ct-field textarea {
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
        .ct-field input:focus, .ct-field textarea:focus {
          border-color: rgba(245,166,35,0.5);
          background: rgba(245,166,35,0.05);
          box-shadow: 0 0 0 4px rgba(245,166,35,0.08);
        }
        .ct-field textarea { resize: none; min-height: 90px; }

        /* specialist field highlight */
        .ct-field-specialist input {
          border-color: rgba(245,166,35,0.3);
          background: rgba(245,166,35,0.06);
          color: var(--gold-light);
          font-weight: 600;
        }
        .ct-field-specialist label { color: var(--gold); }

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
        .ct-submit:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(245,166,35,0.38);
          filter: brightness(1.06);
        }
        .ct-submit--sent {
          background: linear-gradient(135deg, #10B981, #059669);
          box-shadow: 0 8px 28px rgba(16,185,129,0.3);
          color: #fff;
          pointer-events: none;
        }

        /* ── Map Card ── */
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

        /* ── FOOTER ── */
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
        }
        @media (max-width: 600px) {
          .ct-field-row { flex-direction: column; }
          .ct-info-value { white-space: normal; }
        }
      `}</style>

      <section className="ct-root" id="contact" ref={rootRef}>

        {/* Background */}
        <div className="ct-bg">
          <div className="ct-bg-grid" />
          <div className="ct-bg-orb" style={{ width:700, height:700, top:-250, right:-200, background:"radial-gradient(circle, rgba(56,139,255,0.16) 0%, transparent 70%)" }} />
          <div className="ct-bg-orb" style={{ width:500, height:500, bottom:-80, left:-80, background:"radial-gradient(circle, rgba(77,166,255,0.13) 0%, transparent 70%)" }} />
          <div className="ct-bg-orb" style={{ width:350, height:350, top:"40%", left:"40%", background:"radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)" }} />
        </div>

        <div className="ct-wrap">

          {/* Header */}
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

          {/* Main Grid */}
          <div className="ct-grid">

            {/* LEFT */}
            <div className="ct-left">

              {/* Contact Info */}
              <div className={`ct-info-strip ${visible ? "ct-info-strip--in" : ""}`}>
                {CONTACT_ITEMS.map((item, i) => (
                  <ContactItem key={item.id} item={item} visible={visible} delay={i * 0.1} />
                ))}
              </div>

              {/* Messengers */}
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

              {/* Hours */}
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

            {/* RIGHT */}
            <div className={`ct-right ${visible ? "ct-right--in" : ""}`}>

              {/* Form — TOP */}
              <div className="ct-form-card">
                <div className="ct-form-head">
                  <h3 className="ct-form-title">გამოგვიგზავნეთ შეტყობინება</h3>
                  <p className="ct-form-sub">დაგვიკავშირდებით მოკლე ხანში</p>
                </div>
                <form className="ct-form" onSubmit={handleSubmit}>
                  <div className="ct-field-row">
                    <div className="ct-field">
                      <label>სახელი</label>
                      <input type="text" placeholder="თქვენი სახელი" value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div className="ct-field">
                      <label>ტელეფონი</label>
                      <input type="tel" placeholder="+995 5XX XX XX XX" value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                    </div>
                  </div>
                  <div className={`ct-field ${formData.specialist ? "ct-field-specialist" : ""}`}>
                    <label>სპეციალისტი</label>
                    <input type="text" placeholder="ექიმი რომელთანაც ეწერებით"
                      value={formData.specialist}
                      onChange={(e) => setFormData({...formData, specialist: e.target.value})} />
                  </div>
                  <div className="ct-field">
                    <label>შეტყობინება</label>
                    <textarea placeholder="მოგვიყევით თქვენი ბავშვის საჭიროებებზე..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})} />
                  </div>
                  <button type="submit" className={`ct-submit ${sent ? "ct-submit--sent" : ""}`}>
                    {sent
                      ? <>გაგზავნილია <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg></>
                      : <>გაგზავნა <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                    }
                  </button>
                </form>
              </div>

              {/* Map — BOTTOM */}
              <div className="ct-map-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000.0!2d41.6282323!3d41.6410399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406787123775ff67%3A0x87dba33f22dd4919!2sIrma%20Khvichia%20Rehabilitation%20Center!5e0!3m2!1sen!2sge!4v1740000000000"
                  allowFullScreen="" loading="lazy" title="ირმა ხვიჩიას რეაბილიტაციის ცენტრი"
                />
                <div className="ct-map-overlay">
                  <div className="ct-map-loc">
                    <div className="ct-map-loc-dot" />
                    <span className="ct-map-loc-text">ექვთიმე თაყაიშვილის 58, ბათუმი</span>
                  </div>
                  <a
                    href="https://www.google.com/maps/place/Irma+Khvichia+Rehabilitation+Center"
                    target="_blank" rel="noopener noreferrer"
                    className="ct-map-link"
                  >
                    გზამკვლევი
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="ft-root">
          <div className="ft-gold-line" />
          <div style={{ maxWidth:1200, margin:'0 auto', padding:'60px 32px 44px', display:'grid', gridTemplateColumns:'2fr 1fr 1.4fr 1.4fr', gap:44 }}>

            {/* Brand */}
            <div>
              <div style={{ display:'flex', gap:12, marginBottom:20 }}>
                <div style={{ width:42, height:42, background:'rgba(245,166,35,0.1)', borderRadius:11, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid rgba(245,166,35,0.2)', flexShrink:0 }}>
                  <svg width="26" height="26" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="19" stroke="#F5A623" strokeWidth="1.5"/><path d="M12 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#F5A623" strokeWidth="2"/><circle cx="20" cy="24" r="4" fill="#F5A623"/></svg>
                </div>
                <div>
                  <div style={{ fontSize:17, fontWeight:900, color:'white', letterSpacing:'-0.02em' }}>რეაბილიტაციის<span style={{ color:'#F5A623' }}>ცენტრი</span></div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.35)', marginTop:2 }}>განვითარება · მხარდაჭერა</div>
                </div>
              </div>
              <p style={{ fontSize:13, color:'rgba(255,255,255,0.45)', maxWidth:250, lineHeight:1.7, marginBottom:24 }}>ჩვენ ვქმნით სივრცეს, სადაც ყოველი ბავშვი პოულობს საკუთარ ბილიკს.</p>
              <div style={{ display:'flex', gap:8 }}>
                {[{href:"https://www.facebook.com/profile.php?id=100063818393741",icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>},{href:"https://instagram.com",icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg>}].map((s,i)=>(
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width:36, height:36, borderRadius:9, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(255,255,255,0.5)', textDecoration:'none' }}>{s.icon}</a>
                ))}
              </div>
            </div>

            {/* Nav */}
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

            {/* Services */}
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

            {/* Contact */}
            <div>
              <h4 style={{ color:'#F5A623', fontSize:11, fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:18 }}>საკონტაქტო</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:22 }}>
                {[
                  { icon:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, text:"ექვთიმე თაყაიშვილის 58 ბათუმი", href:null },
                  { icon:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.12 2.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, text:"+995 032 242 38 64", href:"tel:+995032242386" },
                  { icon:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text:"ikrehabilitation@gmail.com", href:"mailto:ikrehabilitation@gmail.com" },
                ].map((c,i)=>(
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