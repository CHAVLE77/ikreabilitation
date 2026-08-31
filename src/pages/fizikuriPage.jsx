import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "/fizikuri.css"

const SERVICES = [
  "პირველადი შეფასება და ფუნქციური დიაგნოსტიკა",
  "ინდივიდუალური ფიზიკური თერაპია",
  "კინეზითერაპია (სამკურნალო ვარჯიშები)",
  "მანუალური თერაპია",
  "მიოფასციალური რელიზი და რბილი ქსოვილების ტექნიკები",
  "სამკურნალო მასაჟი",
  "ნეირორეაბილიტაცია",
  "სპორტული რეაბილიტაცია",
  "ოპერაციის შემდგომი რეაბილიტაცია",
  "კინეზიოტეიპინგი (Teiping)",
  "ფიზიოთერაპიული პროცედურები თანამედროვე აპარატურის გამოყენებით",
  "UZAY თერაპია",
];

const INDICATIONS = [
  "კისრის, ზურგისა და წელის ტკივილი",
  "ოსტეოქონდროზი, სპონდილოზი და მალთაშუა დისკის თიაქარი",
  "მხრის, მუხლის, მენჯ-ბარძაყისა და სხვა სახსრების პათოლოგიები",
  "ართროზი და ართრიტი",
  "ტენდინიტი, ბურსიტი და ლიგამენტების დაზიანებები",
  "კუნთების სპაზმი და ქრონიკული ტკივილი",
  "სპორტული ტრავმები",
  "მოტეხილობებისა და ოპერაციების შემდგომი რეაბილიტაცია",
  "ინსულტის შემდგომი რეაბილიტაცია",
  "პერიფერიული ნერვების დაზიანებები",
  "პარეზი, დამბლა და მოძრაობის შეზღუდვა",
  "წონასწორობისა და კოორდინაციის დარღვევები",
  "ტანდეგობის დარღვევები, სკოლიოზი და კიფოზი",
];

const METHODS = [
  "მანუალური თერაპია",
  "კინეზითერაპია",
  "ნეირომუსკულური რეაბილიტაციის ტექნიკები",
  "მიოფასციალური რელიზი",
  "სახსრების მობილიზაცია",
  "თერაპიული გაჭიმვები",
  "სამკურნალო მასაჟი",
  "კინეზიოტეიპინგი",
  "მშრალი ნემსით თერაპია (საჭიროების შემთხვევაში)",
  "UZAY თერაპია",
  "თანამედროვე ფიზიოთერაპიული აპარატურა",
];

const UZAY_BENEFITS = [
  "კუნთოვანი ძალის განვითარებას",
  "წონასწორობისა და კოორდინაციის გაუმჯობესებას",
  "სხეულის პოზიციური კონტროლის განვითარებას",
  "სახსრების მოძრაობის ამპლიტუდის გაზრდას",
  "სწორი ტანდეგობის ფორმირებას",
  "მსხვილი და ნატიფი მოტორიკის განვითარებას",
  "ყოველდღიური ფუნქციური უნარების გაუმჯობესებას",
];

// ========== HOOKS ==========

function useInView(ref, threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isVisible;
}

// ========== COMPONENTS ==========

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const visible = useInView(ref, 0.1);

  return (
    <div
      ref={ref}
      className={`fizio-reveal${visible ? " fizio-reveal-in" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="fizio-pt-check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function FizikuriPage() {
  const heroRef = useRef(null);
  const heroVisible = useInView(heroRef, 0.15);

  return (
    <div className="fizio-page">
      {/* HERO */}
      <header className="fizio-hero" ref={heroRef}>
        <div className="fizio-hero-grid-bg" />
        <div className="fizio-hero-noise" />
        <div className="fizio-hero-orb orb-1" />
        <div className="fizio-hero-orb orb-2" />
        <div className="fizio-hero-orb orb-3" />

        <div className="fizio-hero-inner">
          <span className={`fizio-hero-badge badge-gold${heroVisible ? " badge-in" : ""}`}>
            <span className="fizio-badge-dot" />
            რეაბილიტაცია
          </span>
          <h1 className={`fizio-hero-title${heroVisible ? " title-in" : ""}`}>
            <span className="fizio-title-gold">ფიზიკური თერაპია</span>
          </h1>
          <p className={`fizio-hero-sub${heroVisible ? " sub-in" : ""}`}>
            ფიზიკური თერაპია წარმოადგენს თანამედროვე, მტკიცებულებებზე დაფუძნებულ სამედიცინო მიმართულებას,
            რომელიც მიზნად ისახავს საყრდენ-მამოძრავებელი და ნერვული სისტემის ფუნქციის აღდგენას, ტკივილის
            შემცირებას, მოძრაობის გაუმჯობესებასა და პაციენტის ყოველდღიური აქტივობის ხარისხის ამაღლებას.
          </p>
          <Link to="/" className="fizio-hero-cta">
            აპარატები და სენსორული ოთახი
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="fizio-scroll-hint">
          <span className="fizio-scroll-label">გაიგე მეტი</span>
          <span className="fizio-scroll-pill">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </div>
      </header>

      {/* LEAD */}
      <section className="fizio-pt-section">
        <div className="fizio-section-container">
          <Reveal>
            <p className="fizio-pt-lead">
              ირმა ხვიჩიას რეაბილიტაციის ცენტრში თითოეული პაციენტისთვის მუშავდება ინდივიდუალური
              რეაბილიტაციის გეგმა, რომელიც ეფუძნება დიაგნოზს, ასაკს, ფიზიკურ შესაძლებლობებს,
              ჯანმრთელობის მდგომარეობასა და დასახულ მიზნებს.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="fizio-pt-section alt">
        <div className="fizio-section-container">
          <Reveal>
            <h2 className="fizio-section-title">ჩვენი მომსახურებები</h2>
            <p className="fizio-section-sub">სრული სპექტრი აღდგენითი მკურნალობისთვის</p>
          </Reveal>
          <div className="fizio-pt-card-grid">
            {SERVICES.map((item, i) => (
              <Reveal key={item} delay={Math.min(i, 8) * 60}>
                <div className="fizio-pt-card">
                  <span className="fizio-pt-num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INDICATIONS */}
      <section className="fizio-pt-section">
        <div className="fizio-section-container">
          <Reveal>
            <h2 className="fizio-section-title">როდის არის რეკომენდებული</h2>
            <p className="fizio-section-sub">ფიზიკური თერაპია რეკომენდებულია შემდეგი მდგომარეობების დროს</p>
          </Reveal>
          <div className="fizio-pt-card-grid">
            {INDICATIONS.map((item, i) => (
              <Reveal key={item} delay={Math.min(i, 8) * 60}>
                <div className="fizio-pt-card">
                  <CheckIcon />
                  <span>{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* METHODS */}
      <section className="fizio-pt-section alt">
        <div className="fizio-section-container">
          <Reveal>
            <div className="fizio-pt-panel">
              <span className="fizio-sensory-badge">
                <span className="fizio-sensory-badge-dot" />
                თერაპიული მეთოდები
              </span>
              <h2 className="fizio-sensory-title">თერაპიული მეთოდები</h2>
              <p className="fizio-sensory-desc">
                ჩვენი სპეციალისტები იყენებენ საერთაშორისო სტანდარტებსა და მტკიცებულებებზე დაფუძნებულ
                თანამედროვე რეაბილიტაციის მეთოდებს, მათ შორის:
              </p>
              <div className="fizio-pt-panel-grid">
                <div className="fizio-pt-subpanel">
                  <ul className="fizio-indications-list">
                    {METHODS.slice(0, 6).map((m) => (
                      <li className="fizio-indication-item" key={m}>
                        <span className="fizio-indication-dot" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="fizio-pt-subpanel">
                  <ul className="fizio-indications-list">
                    {METHODS.slice(6).map((m) => (
                      <li className="fizio-indication-item" key={m}>
                        <span className="fizio-indication-dot" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* UZAY */}
      <section className="fizio-pt-section">
        <div className="fizio-section-container">
          <Reveal>
            <div className="fizio-pt-panel">
              <span className="fizio-sensory-badge">
                <span className="fizio-sensory-badge-dot" />
                UZAY
              </span>
              <h2 className="fizio-sensory-title">UZAY თერაპია</h2>
              <p className="fizio-sensory-desc">
                UZAY თერაპია წარმოადგენს თანამედროვე სარეაბილიტაციო მეთოდს, რომელიც ტარდება სპეციალურ
                მრავალფუნქციურ მეტალის კონსტრუქციაში სხვადასხვა დამხმარე აღჭურვილობის გამოყენებით. მეთოდი
                საშუალებას აძლევს პაციენტს უსაფრთხო გარემოში შეასრულოს ინდივიდუალურად შერჩეული ვარჯიშები,
                რომლებიც აუმჯობესებს მოძრაობით ფუნქციებს, სხეულის კონტროლსა და სწორი ტანდეგობის ფორმირებას.
              </p>
              <div className="fizio-pt-panel-grid">
                <div className="fizio-pt-subpanel">
                  <h3 className="fizio-sensory-subtitle">UZAY თერაპია ხელს უწყობს:</h3>
                  <ul className="fizio-indications-list">
                    {UZAY_BENEFITS.map((b) => (
                      <li className="fizio-indication-item" key={b}>
                        <span className="fizio-indication-dot" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="fizio-pt-subpanel">
                  <h3 className="fizio-sensory-subtitle">ვისთვის არის განკუთვნილი?</h3>
                  <p className="fizio-uzay-text">
                    თერაპია განსაკუთრებით ეფექტურია ბავშვების რეაბილიტაციის პროცესში სხვადასხვა
                    ნევროლოგიური, ორთოპედიული და მოძრაობითი დარღვევების დროს და ტარდება ფიზიკური
                    თერაპევტის მუდმივი მეთვალყურეობის ქვეშ, ინდივიდუალური რეაბილიტაციის პროგრამის
                    შესაბამისად.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BACK LINK */}
      <div className="fizio-back-link-wrap">
        <Link to="/" className="fizio-back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          უკან დაბრუნება
        </Link>
      </div>
    </div>
  );
}

export default FizikuriPage;