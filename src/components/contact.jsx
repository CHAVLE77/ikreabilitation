import { useState, useEffect, useRef } from "react";
import { SERVICES } from "../../data/services";
import '../contact.css'
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

  // return (
  //   <div className={`bx-root ${visible ? "bx-root--in" : ""}`}>
  //     <div className="bx-head">
  //       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  //         <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1M9 13h1M14 9h1M14 13h1"/>
  //       </svg>
  //       ჩვენი ფილიალები
  //     </div>

  //     <div className="bx-grid">
  //       <div className="bx-list">
  //         {branches.map((b) => {
  //           const isActive = selected.id === b.id;
  //           return (
  //             <button
  //               key={b.id}
  //               type="button"
  //               onClick={() => setSelected(b)}
  //               className={`bx-card ${isActive ? "bx-card--active" : ""}`}
  //             >
  //               <div className="bx-card-top">
  //                 <div>
  //                   <span className="bx-card-city">{b.city}</span>
  //                   <h4 className="bx-card-name">{b.name}</h4>
  //                 </div>
  //                 <span className={`bx-badge ${b.isOpen ? "bx-badge--open" : "bx-badge--closed"}`}>
  //                   {b.isOpen ? "ღიაა" : "დაკეტილია"}
  //                 </span>
  //               </div>
  //               <div className="bx-card-rows">
  //                 <div className="bx-card-row">
  //                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  //                     <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  //                   </svg>
  //                   <span>{b.address}</span>
  //                 </div>
  //                 <div className="bx-card-row">
  //                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  //                     <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  //                   </svg>
  //                   <span>{b.hours}</span>
  //                 </div>
  //                 <div className="bx-card-row">
  //                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  //                     <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.12 2.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  //                   </svg>
  //                   <span>{b.phone}</span>
  //                 </div>
  //               </div>
  //             </button>
  //           );
  //         })}
  //       </div>

  //       <div className="bx-detail">
  //         <div className="bx-detail-eyebrow">
  //           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  //             <polygon points="3 11 22 2 13 21 11 13 3 11"/>
  //           </svg>
  //           არჩეული ლოკაცია
  //         </div>
  //         <h3 className="bx-detail-title">{selected.name} — {selected.city}</h3>
  //         <p className="bx-detail-address">{selected.address}</p>

  //         <div className="bx-detail-preview">
  //           <img src={selected.image} alt={selected.name} loading="lazy" />
  //           <div className="bx-detail-preview-overlay">
  //             <a href={selected.mapLink} target="_blank" rel="noopener noreferrer" className="bx-detail-link">
  //               Google Maps-ზე გახსნა
  //               <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
  //                 <path d="M5 12h14M12 5l7 7-7 7"/>
  //               </svg>
  //             </a>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
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
                      <label htmlFor="ct-name">სახელი *</label>
                      <input 
                        id="ct-name"
                        type="text"
                        placeholder="თქვენი სრული სახელი"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="ct-field">
                      <label htmlFor="ct-phone">ტელეფონი *</label>
                      <input
                        id="ct-phone"
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
                    <label htmlFor="ct-spec">სპეციალისტი</label>
                    <input
                      id="ct-spec"
                      type="text"
                      placeholder="სპეციალისტი რომელთანაც ეწერებით"
                      value={formData.specialist}
                      onChange={(e) => setFormData({ ...formData, specialist: e.target.value })}
                      disabled={loading}
                    />
                  </div>

                  <div className={`ct-field ${formData.service ? "ct-field-prefilled" : ""}`}>
                    <label htmlFor="ct-service">სერვისი</label>
                    <select
                      id="ct-service"
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
                      <label htmlFor="ct-eeg-duration">ეეგ-ის ხანგრძლივობა *</label>
                      <select
                        id="ct-eeg-duration"
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
                    <label htmlFor="ct-message">შეტყობინება</label>
                    <textarea
                      id="ct-message"
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
    { 
      href:"https://www.facebook.com/profile.php?id=100063818393741", 
      label: "Facebook", 
      variant: "fb",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    { 
      href:"https://instagram.com", 
      label: "Instagram", 
      variant: "ig",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      )
    },
  ].map((s, i) => (
    <a
      key={i}
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={s.label}
      className={`ft-social-hover ft-social-hover--${s.variant}`}
      style={{ width:36, height:36, borderRadius:9, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(255,255,255,0.5)', textDecoration:'none' }}
    >
      {s.icon}
    </a>
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