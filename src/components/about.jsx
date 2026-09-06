import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import '../about.css'
const features = [
  "ინდივიდუალური თერაპიული გეგმა",
  "მუდმივი კომუნიკაცია",
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
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className={`about-section ${inView ? "in-view" : ""}`}
        id="about"
      >
        <div className="about-container">
          {/* LEFT — images */}
          <div className="about-images">
            <div className="badge-experience">
              <span className="badge-num">15+</span>
              <span className="badge-text">წლიანი გამოცდილება</span> 
            </div>
            <div className="img-main-wrapper">
<img
  alt="თერაპევტთა გუნდი"
  className="img-main"
  src="/bg2.webp"
  srcSet="/bg2-960.webp 960w, /bg2-1440.webp 1440w, /bg2.webp 1920w"
  sizes="(max-width: 768px) 100vw, 1115px"
  width="1115"
  height="744"
/>
          </div>
            <div className="img-thumb-wrapper">
<img
  alt="რეაბილიტაციათა გუნდი"
  className="img-thumb"
  src="/bg3.webp"
  srcSet="/bg3-480.webp 480w, /bg3-960.webp 960w, /bg3.webp 1920w"
  sizes="(max-width: 768px) 50vw, 373px"
  width="373"
  height="249"
/>        </div>
          </div>
 
          {/* RIGHT — content */}
          <div className="about-content">
            <span className="about-label">ჩვენს შესახებ</span>

            <h2 className="about-title">
              ვინ ვართ <em>ჩვენ?</em> 
            </h2>

            <p className="about-description">
              ირმა ხვიჩიას რეაბილიტაციის ცენტრი წარმოადგენს წამყვან, თანამედროვე და
              მულტიდისციპლინურ სარეაბილიტაციო სივრცეს აჭარაში, რომელიც
              ორიენტირებულია ბავშვთა და ზრდასრულთა ნევროლოგიური, ფიზიკური,
              ინტელექტუალური და მენტალური დარღვევების მართვასა და რეაბილიტაციაზე.
            </p>

            <ul className="about-list">
              {features.map((item, i) => (
                <li key={i}>
                  <span className="check-icon">✓</span>
                  {item}
                </li> 
              ))}
            </ul>

            <Link to="/about" className="about-cta">
              <span>ჩვენი ისტორია</span>
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
