import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;600;700;900&family=DM+Serif+Display:ital@0;1&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --cream: #F5F0E8;
    --navy: #1B2A4A;
    --blue-mid: #2B4A8A;
    --accent: #2885ef;
    --accent-light: #E8EEFF;
    --text-body: #3A3A3A;
    --text-muted: #7A7A8C;
    --dot: #4A90D9;
  }

  .about-section {
    font-family: 'Noto Sans Georgian', sans-serif;
    background: var(--cream);
    padding: 60px 24px;
    overflow: hidden;
  }

  .about-container {
    display: grid;
    grid-template-columns: minmax(280px, 400px) 1fr;
    gap: 48px;
    max-width: 1100px;
    margin: 0 auto;
    align-items: center;
  }

  /* LEFT: images */
  .about-images {
    position: relative;
    background: #D9D3C8;
    overflow: hidden;
    border-radius: 1.5rem;
    max-width: 400px;
    width: 100%;
  }

  .img-main {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
    filter: brightness(0.92) saturate(0.9);
    aspect-ratio: 4/5;
    border-radius: 1.5rem;
  }

  .img-thumb-wrapper {
    position: absolute;
    bottom: 20px;
    right: -16px;
    width: 140px;
    height: 105px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 12px 36px rgba(27, 42, 74, 0.28);
    border: 3px solid white;
    animation: floatUp 0.8s ease 0.4s both;
  }

  .img-thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.95) saturate(0.88);
  }

  /* RIGHT: content */
  .about-content {
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: var(--cream);
  }

  .about-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 16px;
    animation: fadeSlideUp 0.6s ease both;
  }

  .about-title {
    font-family: 'Noto Sans Georgian', sans-serif;
    font-size: clamp(24px, 3.5vw, 40px);
    font-weight: 900;
    line-height: 1.2;
    color: var(--navy);
    margin-bottom: 20px;
    animation: fadeSlideUp 0.6s ease 0.1s both;
  }

  .about-title em {
    font-style: normal;
    color: var(--blue-mid);
  }

  .about-description {
    font-size: 14px;
    line-height: 1.75;
    color: var(--text-body);
    margin-bottom: 28px;
    max-width: 480px;
    animation: fadeSlideUp 0.6s ease 0.2s both;
  }

  .about-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 32px;
    animation: fadeSlideUp 0.6s ease 0.3s both;
  }

  .about-list li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    color: var(--navy);
    font-weight: 500;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--dot);
    flex-shrink: 0;
  }

  .about-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 24px;
    border: 2px solid var(--navy);
    border-radius: 50px;
    background: transparent;
    color: var(--navy);
    font-family: 'Noto Sans Georgian', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.03em;
    cursor: pointer;
    text-decoration: none;
    width: fit-content;
    transition: all 0.22s ease;
    animation: fadeSlideUp 0.6s ease 0.4s both;
  }

  .about-cta:hover {
    background: var(--navy);
    color: var(--cream);
    transform: translateX(3px);
  }

  .arrow {
    font-size: 16px;
    transition: transform 0.2s ease;
  }

  .about-cta:hover .arrow {
    transform: translateX(4px);
  }

  /* Animations */
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes floatUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Tablet */
  @media (max-width: 900px) {
    .about-section {
      padding: 48px 20px;
    }
    .about-container {
      grid-template-columns: minmax(200px, 320px) 1fr;
      gap: 32px;
    }
    .about-images {
      max-width: 320px;
    }
    .img-thumb-wrapper {
      width: 100px;
      height: 75px;
      right: -10px;
      bottom: 16px;
    }
    .about-title {
      font-size: clamp(22px, 3vw, 32px);
    }
    .about-description {
      font-size: 13px;
    }
  }

  /* Mobile */
  @media (max-width: 640px) {
    .about-section {
      padding: 40px 16px;
    }
    .about-container {
      grid-template-columns: 1fr;
      gap: 32px;
      text-align: center;
    }
    .about-images {
      max-width: 280px;
      margin: 0 auto;
    }
    .img-thumb-wrapper {
      width: 90px;
      height: 68px;
      right: -8px;
      bottom: 12px;
      border-width: 2px;
    }
    .about-content {
      align-items: center;
      padding: 0;
    }
    .about-title {
      font-size: 24px;
    }
    .about-title br {
      display: none;
    }
    .about-description {
      font-size: 13px;
      text-align: center;
    }
    .about-list {
      align-items: flex-start;
      text-align: left;
    }
    .about-list li {
      font-size: 13px;
    }
  }

  /* Small Mobile */
  @media (max-width: 380px) {
    .about-images {
      max-width: 240px;
    }
    .img-thumb-wrapper {
      width: 70px;
      height: 52px;
    }
    .about-title {
      font-size: 20px;
    }
  }

  /* ─── SCROLL‑TRIGGERED ANIMATION (ONLY ADDED, NOTHING ELSE CHANGED) ─── */
  .about-section:not(.in-view) .about-label,
  .about-section:not(.in-view) .about-title,
  .about-section:not(.in-view) .about-description,
  .about-section:not(.in-view) .about-list,
  .about-section:not(.in-view) .about-cta {
    opacity: 0;
    transform: translateY(24px);
    animation: none;
  }

  .about-section.in-view .about-label {
    animation: fadeSlideUp 0.6s ease both 0s;
  }
  .about-section.in-view .about-title {
    animation: fadeSlideUp 0.6s ease both 0.1s;
  }
  .about-section.in-view .about-description {
    animation: fadeSlideUp 0.6s ease both 0.2s;
  }
  .about-section.in-view .about-list {
    animation: fadeSlideUp 0.6s ease both 0.3s;
  }
  .about-section.in-view .about-cta {
    animation: fadeSlideUp 0.6s ease both 0.4s;
  }
`;

const features = [
  "ინდივიდუალური თერაპიული გეგმა",
  "მუდმივი კომუნიკაცია მშობელთან",
  "სასიამოვნო, სენსორულად კომფორტული სივრცე",
  "მტკიცებულებებზე დაფუძნებული მეთოდები",
];

export default function About() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // გაჩერება მას შემდეგ რაც ანიმაცია ერთხელ ჩაირთვება
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{style}</style>
      <section ref={sectionRef} className={`about-section ${inView ? "in-view" : ""}`}>
        <div className="about-container">

          {/* LEFT — images */}
          <div className="about-images">
            <img
              className="img-main"
              src="/aboutImg.webp"
              alt="therapist working with child"
              width={1024}
              height={768}
            />
          </div>

          {/* RIGHT — content */}
          <div className="about-content">
            <p className="about-label">ჩვენი მიდგომა</p>

            <h2 className="about-title">
              მეცნიერება და სითბო<br />
              <em>— ერთ სივრცეში</em>
            </h2>

            <p className="about-description">
              ჩვენი თერაპიული გეგმები ეფუძნება საერთაშორისო
              პროტოკოლებს, თუმცა ყოველი ნაბიჯი ბავშვის ხასიათზეა
              მორგებული. ვმუშაობთ მშობლებთან გუნდურად,
              ვუბრუნველყოფთ უსაფრთხო და მხარდამჭერ გარემოს.
            </p>

            <ul className="about-list">
              {features.map((item, i) => (
                <li key={i}>
                  <span className="dot" />
                  {item}
                </li>
              ))}
            </ul>

            <Link to="/about" className="about-cta">
              ჩვენი ისტორია
              <span className="arrow">→</span>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}