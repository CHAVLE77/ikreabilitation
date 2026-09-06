import { useEffect, useRef, useState } from "react";
import '../banner.css'
export default function Banner() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div className="cta-wrap" ref={ref}>
        <div className="cta-card">

          {/* decorative */}
          <div className="cta-ring cta-ring--a" />
          <div className="cta-ring cta-ring--b" />
          <div className="cta-ring cta-ring--c" />
          <div className="cta-dots" />

          <div className="cta-inner">

            {/* badge */}
            <div className={`cta-badge ${visible ? "cta-badge--in" : ""}`}>
              <div className="cta-badge-dot" />
              <span className="cta-badge-text">პირველი კონსულტაცია</span>
            </div>

            {/* heading */}
            <h2 className={`cta-heading ${visible ? "cta-heading--in" : ""}`}>
              მზად ხართ{" "}
              <span className="cta-heading-accent">
                პირველი ნაბიჯისთვის?
                <svg className="cta-underline" viewBox="0 0 360 14" fill="none" aria-hidden="true">
                  <path
                    className="cta-underline-path"
                    d="M3 11 Q90 3 180 8 Q270 13 357 6"
                    stroke="#FBBF24"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>

            {/* subtitle */}
            <p className={`cta-sub ${visible ? "cta-sub--in" : ""}`}>
              დაჯავშნეთ პირველადი კონსულტაცია — ჩვენი
              ექსპერტი დაგეხმარებათ გეგმის შედგენაში და
              სწორი სერვისის შერჩევაში.
            </p>

            {/* buttons */}
            <div className={`cta-btns ${visible ? "cta-btns--in" : ""}`}>
              <a href="#contact" className="cta-btn-primary">
                ჩაეწერე კონსულტაციაზე
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>

              <a href="tel:+995595201811" className="cta-btn-phone">
                <div className="cta-phone-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.12 2.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                +995 595 20 18 11
              </a>
            </div>

            {/* trust chips */}
            <div className={`cta-chips ${visible ? "cta-chips--in" : ""}`}>
              {[
                "პასუხობთ 24 საათში",
                "გამოცდილი სპეციალისტები",
                "ინდივიდუალური მიდგომა",
              ].map((c) => (
                <div key={c} className="cta-chip">
                  <div className="cta-chip-check">✓</div>
                  {c}
                </div>
              ))}
            </div> 

          </div>
        </div>
      </div>
    </>
  );
}