"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── Icons ──────────────────────────────────────────────────────────────────
const ArrowRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ArrowLeft = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);
const SparklesIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" fill="#FBBF24"/>
    <path d="M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75L5 3z" fill="#FBBF24" opacity="0.6"/>
    <path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15z" fill="#FBBF24" opacity="0.6"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.28 5.18 2 2 0 015.27 3h3.09a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 11.09a16 16 0 006.83 6.83l1.61-1.61a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Team Data (10 specialists) ───────────────────────────────────────────────
const teamData = [
  {
    id: 1,
    name: "ირმა ხვიჩია",
    role: "ნევროლოგი",
    experience: "8 წელი",
    sessions: "1,200+",
    certs: ["OT სახელმწიფო ლიცენზია", "Sensory Integration", "NDT სერტიფიკატი"],
    bio: "ირმა სენსორული სამყაროს ექსპერტია. ის ბავშვებს ეხმარება, რომ ყოველდღიური გამოწვევები — ტანსაცმლის ჩაცმიდან ფანქრის ჭერამდე — სიამოვნებად იქცეს.",
    fullBio: "ირმა სენსორული სამყაროს ექსპერტია 8 წლიანი გამოცდილებით. ის ბავშვებს ეხმარება, რომ ყოველდღიური გამოწვევები — ტანსაცმლის ჩაცმიდან ფანქრის ჭერამდე — სიამოვნებად იქცეს. მისი ინდივიდუალური მიდგომა და ბავშვებისადმი სიყვარული მას გამარჯვებებს მოჰყავს.",
    image: "/team1.png",
    accent: "#3A7BD5",
    accentRgb: "58,123,213",
    rating: 5.0,
    specialty: "სენსორული ინტეგრაცია",
    category: "ნევროლოგია",
  },
  {
    id: 2,
    name: "გიორგი ბერიძე",
    role: "ქცევითი თერაპევტი (ABA)",
    experience: "10 წელი",
    sessions: "2,000+",
    certs: ["BCBA სერტიფიკატი", "VB-MAPP", "ESDM ტრენინგი"],
    bio: "გიორგი ABA-ს ადამიანურ სახეს წარმოადგენს — სტრუქტურა, სიყვარული და დაჟინება ერთ სივრცეში. ნაბიჯ-ნაბიჯ, გამარჯვება გამარჯვებაზე.",
    fullBio: "გიორგი ABA-ს ადამიანურ სახეს წარმოადგენს — სტრუქტურა, სიყვარული და დაჟინება ერთ სივრცეში. 10 წლიანი გამოცდილებით, ის ბავშვებს ეხმარება ქცევითი გამოწვევების გადალახვაში.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1B6FD4",
    accentRgb: "27,111,212",
    rating: 4.9,
    specialty: "ABA თერაპია",
    category: "ABA",
  },
  {
    id: 3,
    name: "სოფო ლომიძე",
    role: "ფიზიკური თერაპევტი",
    experience: "6 წელი",
    sessions: "900+",
    certs: ["PT სახელმწიფო ლიცენზია", "Bobath მეთოდი", "პედიატრიული PT"],
    bio: "სოფო ყოველ ნაბიჯს ზეიმად აქცევს. მისი პაციენტები ისწავლიან არა მხოლოდ სიარულს — არამედ სიამაყეს, რომ შეძლეს.",
    fullBio: "სოფო ყოველ ნაბიჯს ზეიმად აქცევს. 6 წლიანი გამოცდილებით, მისი პაციენტები ისწავლიან არა მხოლოდ სიარულს — არამედ სიამაყეს, რომ შეძლეს. Bobath მეთოდი და პედიატრიული PT მისი ძირითადი ინსტრუმენტებია.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#2B4A8A",
    accentRgb: "43,74,138",
    rating: 5.0,
    specialty: "ფიზიკური რეაბილიტაცია",
    category: "ფიზიოთერაპია",
  },
  {
    id: 4,
    name: "ნინო კვარაცხელია",
    role: "მეტყველების თერაპევტი",
    experience: "7 წელი",
    sessions: "1,500+",
    certs: ["SLP ლიცენზია", "AAC სერტიფიკატი", "ენობრივი განვითარება"],
    bio: "ნინო სიტყვებს სიმღერად აქცევს. ყოველი ბავშვი მასთან პოულობს საკუთარ ხმას — მშვიდად, ნდობით, სიხარულით.",
    fullBio: "ნინო სიტყვებს სიმღერად აქცევს. 7 წლიანი გამოცდილებით, ყოველი ბავშვი მასთან პოულობს საკუთარ ხმას — მშვიდად, ნდობით, სიხარულით. AAC სისტემები და ენობრივი განვითარება მისი სპეციალობაა.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1E5FAF",
    accentRgb: "30,95,175",
    rating: 4.9,
    specialty: "მეტყველება & კომუნიკაცია",
    category: "მეტყველება",
  },
  {
    id: 5,
    name: "ანი გელაშვილი",
    role: "ოკუპაციური თერაპევტი",
    experience: "9 წელი",
    sessions: "1,800+",
    certs: ["OT ლიცენზია", "Handwriting Without Tears", "SI ტრენინგი"],
    bio: "ანი ბავშვებს ეხმარება ყოველდღიური ცხოვრების დამოუკიდებლობაში — ჩაცმა, ჭამა, სახელის წერა — ყველაფერი ზეიმია მასთან.",
    fullBio: "ანი ბავშვებს ეხმარება ყოველდღიური ცხოვრების დამოუკიდებლობაში. 9 წლიანი გამოცდილებით, ის ფოკუსირებულია ფინომოტორულ უნარებზე, თვითმოვლასა და სასკოლო მზაობაზე.",
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#2563EB",
    accentRgb: "37,99,235",
    rating: 5.0,
    specialty: "ოკუპაციური თერაპია",
    category: "ოკუპაც.",
  },
  {
    id: 6,
    name: "დავით მხეიძე",
    role: "ფსიქოლოგი",
    experience: "12 წელი",
    sessions: "3,000+",
    certs: ["ფსიქოლოგიის სახელმწ. სერტ.", "CBT ტრენინგი", "ბავშვთა ფსიქოლოგია"],
    bio: "დავითი ბავშვის შინაგან სამყაროს მსმენელია. ის ქმნის სივრცეს, სადაც ემოციები სწორ გზას პოულობენ.",
    fullBio: "დავითი ბავშვის შინაგან სამყაროს მსმენელია. 12 წლიანი გამოცდილებით, ის ქმნის სივრცეს, სადაც ემოციები სწორ გზას პოულობენ. CBT და თამაშზე დაფუძნებული თერაპია მისი მთავარი ინსტრუმენტებია.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1D4ED8",
    accentRgb: "29,78,216",
    rating: 4.8,
    specialty: "ბავშვთა ფსიქოლოგია",
    category: "ფსიქოლოგია",
  },
  {
    id: 7,
    name: "ქეთევან ჯავახიშვილი",
    role: "სპეციალური პედაგოგი",
    experience: "11 წელი",
    sessions: "2,400+",
    certs: ["სპეც. განათლების სახელმწ. ლიც.", "TEACCH მეთოდი", "ინკლუზიური განათლება"],
    bio: "ქეთევანი ყოველ ბავშვს სასწავლო გზას ინდივიდუალურად ხატავს. მისთვის სხვაობა არ არის დაბრკოლება — ის ნიჭია.",
    fullBio: "ქეთევანი ყოველ ბავშვს სასწავლო გზას ინდივიდუალურად ხატავს. 11 წლიანი გამოცდილებით, მისთვის სხვაობა არ არის დაბრკოლება — ის ნიჭია. TEACCH და ინკლუზიური განათლება მისი სტრატეგიაა.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1565C0",
    accentRgb: "21,101,192",
    rating: 5.0,
    specialty: "სპეციალური პედაგოგიკა",
    category: "პედაგოგიკა",
  },
  {
    id: 8,
    name: "მარიამ ცხოვრებაძე",
    role: "მუსიკოთერაპევტი",
    experience: "5 წელი",
    sessions: "700+",
    certs: ["MT-BC სერტიფიკატი", "Nordoff-Robbins", "ნეირომუსიკოლოგია"],
    bio: "მარიამი მუსიკას სამკურნალოდ იყენებს. რიტმი, მელოდია და ჰარმონია მის ხელში ბავშვის გულის გასაღებია.",
    fullBio: "მარიამი მუსიკას სამკურნალოდ იყენებს. 5 წლიანი გამოცდილებით, რიტმი, მელოდია და ჰარმონია მის ხელში ბავშვის გულის გასაღებია. Nordoff-Robbins მეთოდი მისი ძირითადი პრაქტიკაა.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1976D2",
    accentRgb: "25,118,210",
    rating: 4.9,
    specialty: "მუსიკოთერაპია",
    category: "ოკუპაც.",
  },
  {
    id: 9,
    name: "ლევან სხირტლაძე",
    role: "ნეიროფსიქოლოგი",
    experience: "14 წელი",
    sessions: "3,500+",
    certs: ["ნეიროფსიქოლ. სახელმწ. ლიც.", "NEPSY-II", "კოგნიტური შეფასება"],
    bio: "ლევანი ბავშვის ტვინის შესაძლებლობებს ავლენს. მისი შეფასებები გზამკვლევია — ოჯახებისთვის, სკოლებისთვის, მთელი გუნდისთვის.",
    fullBio: "ლევანი ბავშვის ტვინის შესაძლებლობებს ავლენს. 14 წლიანი გამოცდილებით, მისი შეფასებები გზამკვლევია — ოჯახებისთვის, სკოლებისთვის და მთელი სამკურნალო გუნდისთვის. NEPSY-II კომპლექსური შეფასება მისი სიძლიერეა.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#0D47A1",
    accentRgb: "13,71,161",
    rating: 5.0,
    specialty: "ნეიროფსიქოლოგია",
    category: "ნევროლოგია",
  },
  {
    id: 10,
    name: "თამარ ელიაშვილი",
    role: "ადრეული ინტერვენციის სპეც.",
    experience: "8 წელი",
    sessions: "1,100+",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "თამარი პირველ წლებს ყველაზე მნიშვნელოვნად თვლის. ის ოჯახებს ეხმარება ადრეულ ეტაპზე — სწრაფად, სიყვარულით, ეფექტურად.",
    fullBio: "თამარი პირველ წლებს ყველაზე მნიშვნელოვნად თვლის. 8 წლიანი გამოცდილებით, ის ოჯახებს ეხმარება ადრეულ ეტაპზე — სწრაფად, სიყვარულით, ეფექტურად. ESDM და DIR/Floortime მეთოდები მისი სპეციალობაა.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 4.9,
    specialty: "ადრეული ინტერვენცია",
    category: "ABA",
  },
];

// ── Hook ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Rating Stars ─────────────────────────────────────────────────────────────
function RatingStars({ rating }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:3 }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < Math.floor(rating) ? "#FBBF24" : "rgba(251,191,36,0.2)", display:"flex" }}>
          <StarIcon />
        </span>
      ))}
      <span style={{ marginLeft:6, fontSize:"0.72rem", fontWeight:700, color:"rgba(255,255,255,0.45)" }}>{rating.toFixed(1)}</span>
    </div>
  );
}

// ── Profile Modal ─────────────────────────────────────────────────────────────
function ProfileModal({ person, onClose }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position:"fixed", inset:0, zIndex:1000,
        background:"rgba(1,10,28,0.88)",
        backdropFilter:"blur(18px)",
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:24,
        opacity: mounted ? 1 : 0,
        transition:"opacity 0.35s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        role="dialog" aria-modal="true"
        style={{
          background:"linear-gradient(145deg,#071222,#04101E)",
          border:`1px solid rgba(${person.accentRgb},0.3)`,
          borderRadius:24,
          overflow:"hidden",
          display:"flex",
          maxWidth:820, width:"100%",
          maxHeight:"90vh",
          boxShadow:`0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(${person.accentRgb},0.12)`,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
          transition:"transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Photo col */}
        <div style={{ width:260, flexShrink:0, position:"relative", overflow:"hidden", background:"#030D1A" }}>
          <img src={person.image} alt={person.name}
            style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", filter:"brightness(0.55) saturate(0.75)" }} />
          <div style={{
            position:"absolute", inset:0,
            background:`linear-gradient(to bottom, rgba(${person.accentRgb},0.25) 0%, rgba(3,13,26,0.95) 100%)`
          }} />
          <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"1.5rem", zIndex:2 }}>
            <span style={{
              display:"inline-block", fontSize:"0.58rem", fontWeight:800, letterSpacing:"0.14em",
              textTransform:"uppercase", color:"#FBBF24",
              background:"rgba(251,191,36,0.12)", border:"1px solid rgba(251,191,36,0.3)",
              padding:"0.28rem 0.75rem", borderRadius:40, marginBottom:"0.9rem"
            }}>{person.specialty}</span>
            <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
              {[{ n: person.experience, l: "გამოცდ." }, { n: person.sessions, l: "სეანსი" }].map((s, i) => (
                <div key={i} style={{ display:"flex", flexDirection:"column" }}>
                  <span style={{ fontSize:"1.15rem", fontWeight:900, color:"#fff", lineHeight:1 }}>{s.n}</span>
                  <span style={{ fontSize:"0.58rem", fontWeight:700, color:"rgba(255,255,255,0.45)", textTransform:"uppercase", letterSpacing:"0.08em" }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex:1, padding:"2rem 1.8rem", position:"relative", overflowY:"auto", display:"flex", flexDirection:"column", gap:"0.9rem" }}>
          <button onClick={onClose} style={{
            position:"absolute", top:"1.1rem", right:"1.1rem",
            background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
            color:"rgba(255,255,255,0.4)", borderRadius:10, width:36, height:36,
            display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer"
          }}><CloseIcon /></button>

          <div style={{ fontSize:"0.6rem", fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase", color: person.accent }}>{person.role}</div>
          <h2 style={{ fontSize:"1.8rem", fontWeight:900, color:"#fff", letterSpacing:"-0.022em", margin:0, lineHeight:1.1 }}>{person.name}</h2>
          <RatingStars rating={person.rating} />
          <p style={{ fontSize:"0.85rem", lineHeight:1.72, color:"rgba(255,255,255,0.6)", margin:0 }}>{person.fullBio}</p>

          <div style={{ fontSize:"0.58rem", fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)" }}>კვალიფიკაცია</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
            {person.certs.map((c, i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:"0.6rem",
                fontSize:"0.78rem", color:"rgba(255,255,255,0.72)",
                padding:"0.48rem 0.75rem",
                background:`rgba(${person.accentRgb},0.08)`,
                border:`1px solid rgba(${person.accentRgb},0.18)`,
                borderRadius:10
              }}>
                <span style={{
                  width:18, height:18, borderRadius:6,
                  background:`rgba(${person.accentRgb},0.25)`,
                  color: person.accent, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0
                }}><CheckIcon /></span>
                {c}
              </div>
            ))}
          </div>

          <div style={{ display:"flex", gap:"0.65rem", marginTop:"auto", paddingTop:"0.5rem" }}>
            <button style={{
              flex:1, display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"0.45rem",
              background: person.accent, border:"none", color:"#fff",
              padding:"0.78rem 1.2rem", borderRadius:12,
              fontSize:"0.78rem", fontWeight:800, cursor:"pointer",
              fontFamily:"'Noto Sans Georgian', sans-serif",
              transition:"all 0.2s ease"
            }}
            onClick={() => { sessionStorage.setItem("selectedSpecialist", person.name);
              window.location.href = "/contact";
              onClose();
            }}
              onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.filter = ""; e.currentTarget.style.transform = ""; }}
            >
              <PhoneIcon /> კონსულტაციის ჩაწერა
            </button>
            <button onClick={onClose} style={{
              display:"inline-flex", alignItems:"center", gap:"0.4rem",
              background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
              color:"rgba(255,255,255,0.45)", padding:"0.78rem 1.1rem", borderRadius:12,
              fontSize:"0.78rem", fontWeight:700, cursor:"pointer",
              fontFamily:"'Noto Sans Georgian', sans-serif",
            }}>
              <ArrowLeft size={13} /> უკან
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Team Card ─────────────────────────────────────────────────────────────────
function TeamCard({ person, idx, onOpenModal }) {
  const [ref, inView] = useInView(0.06);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 8;
    setTilt({ x, y });
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${idx * 0.07}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${idx * 0.07}s`,
      }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
        style={{
          position:"relative",
          background: hovered
            ? `linear-gradient(145deg, rgba(${person.accentRgb},0.12) 0%, rgba(8,22,52,0.97) 100%)`
            : "linear-gradient(145deg, rgba(8,20,45,0.95) 0%, rgba(4,12,30,0.98) 100%)",
          border: hovered ? `1px solid rgba(${person.accentRgb},0.4)` : "1px solid rgba(255,255,255,0.07)",
          borderRadius:22,
          overflow:"hidden",
          cursor:"default",
          transition:"border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease",
          boxShadow: hovered
            ? `0 24px 60px rgba(0,0,0,0.55), 0 0 50px rgba(${person.accentRgb},0.14)`
            : "0 4px 24px rgba(0,0,0,0.4)",
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Glow */}
        <div style={{
          position:"absolute", top:-60, left:-60, width:220, height:220, borderRadius:"50%",
          background:`radial-gradient(circle, rgba(${person.accentRgb},0.22) 0%, transparent 70%)`,
          pointerEvents:"none", zIndex:0,
          opacity: hovered ? 1 : 0, transition:"opacity 0.4s ease"
        }} />

        {/* Photo */}
        <div style={{ position:"relative", height:240, overflow:"hidden", zIndex:1 }}>
          <img src={person.image} alt={person.name} loading="lazy" style={{
            width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 10%", display:"block",
            transition:"transform 0.7s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease",
            filter: hovered ? "saturate(0.95) brightness(0.98)" : "saturate(0.65) brightness(0.7)",
            transform: hovered ? "scale(1.07)" : "scale(1)",
          }} />
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(to bottom, rgba(2,10,30,0.08) 0%, rgba(2,10,30,0.88) 100%)",
            zIndex:1
          }} />
          <div style={{
            position:"absolute", inset:0,
            background:`linear-gradient(135deg, rgba(${person.accentRgb},0.2) 0%, transparent 55%)`,
            zIndex:1, opacity: hovered ? 1 : 0, transition:"opacity 0.4s ease"
          }} />

          {/* Rating pill */}
          <div style={{
            position:"absolute", top:12, right:12, zIndex:3,
            display:"flex", alignItems:"center", gap:4,
            background:"rgba(0,0,0,0.6)", backdropFilter:"blur(10px)",
            border:"1px solid rgba(251,191,36,0.35)",
            borderRadius:40, padding:"4px 10px",
            color:"#FBBF24", fontSize:"0.7rem", fontWeight:800,
          }}>
            <StarIcon />{person.rating.toFixed(1)}
          </div>

          {/* Exp badge */}
          <div style={{
            position:"absolute", bottom:12, left:12, zIndex:3,
            background:`rgba(${person.accentRgb},0.28)`, backdropFilter:"blur(10px)",
            border:`1px solid rgba(${person.accentRgb},0.45)`,
            borderRadius:10, padding:"6px 12px",
            display:"flex", flexDirection:"column",
          }}>
            <span style={{ fontSize:"0.95rem", fontWeight:900, color:"#fff", lineHeight:1 }}>{person.experience}</span>
            <span style={{ fontSize:"0.55rem", fontWeight:700, color:"rgba(255,255,255,0.45)", textTransform:"uppercase", letterSpacing:"0.08em" }}>გამოცდ.</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ position:"relative", zIndex:2, padding:"1.1rem 1.3rem 1.35rem", display:"flex", flexDirection:"column", gap:"0.4rem" }}>
          <span style={{ fontSize:"0.55rem", fontWeight:800, letterSpacing:"0.15em", textTransform:"uppercase", color:"#FBBF24" }}>{person.specialty}</span>
          <h3 style={{ fontSize:"1.08rem", fontWeight:900, color:"#fff", letterSpacing:"-0.02em", lineHeight:1.2, margin:0 }}>{person.name}</h3>
          <span style={{ fontSize:"0.65rem", fontWeight:700, color: person.accent, letterSpacing:"0.03em" }}>{person.role}</span>

          <p style={{
            fontSize:"0.76rem", lineHeight:1.65, color:"rgba(255,255,255,0.48)",
            margin:0, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden"
          }}>{person.bio}</p>

          {/* Certs */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.28rem", marginTop:"0.1rem" }}>
            {person.certs.slice(0, 2).map((c, i) => (
              <span key={i} style={{
                display:"inline-flex", alignItems:"center", gap:"0.28rem",
                fontSize:"0.58rem", fontWeight:600,
                color: hovered ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.5)",
                background: hovered ? `rgba(${person.accentRgb},0.12)` : "rgba(255,255,255,0.05)",
                border: hovered ? `1px solid rgba(${person.accentRgb},0.28)` : "1px solid rgba(255,255,255,0.09)",
                padding:"0.2rem 0.55rem 0.2rem 0.42rem", borderRadius:6, whiteSpace:"nowrap",
                transition:"all 0.25s ease"
              }}>
                <span style={{ color: person.accent }}><CheckIcon /></span>{c}
              </span>
            ))}
            {person.certs.length > 2 && (
              <span style={{
                display:"inline-flex", alignItems:"center",
                fontSize:"0.58rem", fontWeight:700,
                color:"#FBBF24", background:"rgba(251,191,36,0.08)",
                border:"1px solid rgba(251,191,36,0.2)",
                padding:"0.2rem 0.6rem", borderRadius:6
              }}>+{person.certs.length - 2}</span>
            )}
          </div>

          {/* Actions */}
          <div style={{ display:"flex", gap:"0.55rem", marginTop:"0.5rem" }}>
            <button
              onClick={() => onOpenModal(person)}
              onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.15)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 20px rgba(${person.accentRgb},0.4)`; }}
              onMouseLeave={e => { e.currentTarget.style.filter = ""; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              style={{
                flex:1, display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"0.38rem",
                background: person.accent, border:"none", color:"#fff",
                padding:"0.58rem 0.85rem", borderRadius:10,
                fontSize:"0.68rem", fontWeight:800, cursor:"pointer",
                fontFamily:"'Noto Sans Georgian', sans-serif",
                whiteSpace:"nowrap", transition:"all 0.22s ease",
              }}
            >
              სრული პროფილი <ArrowRight size={12} />
            </button>
            <button
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(251,191,36,0.12)"; e.currentTarget.style.borderColor = "rgba(251,191,36,0.3)"; e.currentTarget.style.color = "#FBBF24"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
              style={{
                width:40, height:40, flexShrink:0,
                display:"flex", alignItems:"center", justifyContent:"center",
                background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
                borderRadius:10, color:"rgba(255,255,255,0.5)", cursor:"pointer",
                transition:"all 0.2s ease"
              }}
            ><PhoneIcon /></button>
          </div>
        </div>

        {/* Bottom accent line */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, height:2,
          background:`linear-gradient(to right, transparent, ${person.accent}, transparent)`,
          opacity: hovered ? 1 : 0, transition:"opacity 0.4s ease", zIndex:3
        }} />
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function TeamPage() {
  const [headerRef, headerIn] = useInView(0.08);
  const [activeModal, setActiveModal] = useState(null);
  const [filter, setFilter] = useState("ყველა");
  const [mounted, setMounted] = useState(false);

  const filters = ["ყველა", "ნევროლოგია", "ABA", "ფიზიოთერაპია", "მეტყველება", "ფსიქოლოგია", "პედაგოგიკა", "ოკუპაც."];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const displayed = filter === "ყველა"
    ? teamData
    : teamData.filter(p => p.category === filter);

  return (
    <section style={{
      position:"relative",
      width:"100%",
      minHeight:"100vh",
      background:"linear-gradient(160deg, #051428 0%, #071E3D 40%, #0A2A50 70%, #061828 100%)",
      padding:"5.5rem 0 5rem",
      fontFamily:"'Noto Sans Georgian', sans-serif",
      overflowX:"hidden",
    }}>

      {/* ── @import font ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }

        .tp-anim {
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
          .alink{
          text-decoration:none;
          color:white;
          }
        .tp-anim.vis { opacity: 1; transform: none; }

        .filter-btn {
          font-family: 'Noto Sans Georgian', sans-serif;
          font-size: 0.68rem; font-weight: 700;
          padding: 0.46rem 1rem;
          border-radius: 40px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.45);
          cursor: pointer;
          transition: all 0.22s ease;
          white-space: nowrap;
        }
        .filter-btn:hover { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.85); border-color: rgba(255,255,255,0.2); }
        .filter-btn.active { background: rgba(251,191,36,0.14); border-color: rgba(251,191,36,0.4); color: #FBBF24; }

        .badge-pulse {
          width:6px; height:6px; border-radius:50%;
          background:#FBBF24;
          animation: bpulse 2.2s ease infinite;
        }
        @keyframes bpulse {
          0%,100% { opacity:1; transform:scale(1); box-shadow: 0 0 0 0 rgba(251,191,36,0.5); }
          50%     { opacity:0.6; transform:scale(1.2); box-shadow: 0 0 0 6px rgba(251,191,36,0); }
        }
        @keyframes orbf {
          0%,100% { transform:translate(0,0) scale(1); }
          33%     { transform:translate(30px,-40px) scale(1.06); }
          66%     { transform:translate(-20px,25px) scale(0.95); }
        }
        @keyframes shimmer {
          0%   { transform:translateX(-100%); }
          100% { transform:translateX(100%); }
        }

        .tp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.3rem;
        }
        @media (max-width: 1200px) { .tp-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 900px)  { .tp-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px)  { .tp-grid { grid-template-columns: 1fr; } }

        @media (max-width: 768px) {
          .tp-stats-wrap { flex-wrap: wrap; gap: 0.6rem !important; padding: 0.8rem 1rem !important; }
          .tp-stat-div { display: none; }
          .tp-filters-wrap { justify-content: flex-start !important; overflow-x: auto; padding-bottom: 4px; }
          .cta-inner-wrap { flex-direction: column !important; align-items: flex-start !important; }
          .cta-main-btn { width: 100%; justify-content: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tp-anim { opacity:1 !important; transform:none !important; transition:none !important; }
          .badge-pulse { animation: none !important; }
        }
      `}</style>

      {/* ── Decorative BG ── */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        {/* Orbs */}
        {[
          { w:600, h:600, top:-180, left:-120, color:"27,111,212", delay:"0s", opacity:0.14 },
          { w:450, h:450, top:300, right:-130, color:"251,191,36", delay:"5s", opacity:0.06 },
          { w:400, h:400, bottom:-100, left:"35%", color:"43,74,138", delay:"9s", opacity:0.12 },
        ].map((o, i) => (
          <div key={i} style={{
            position:"absolute", borderRadius:"50%",
            width:o.w, height:o.h, top:o.top, left:o.left, right:o.right, bottom:o.bottom,
            background:`radial-gradient(circle, rgba(${o.color},0.9) 0%, transparent 70%)`,
            filter:"blur(90px)", opacity:o.opacity,
            animation:`orbf 14s ease-in-out ${o.delay} infinite`,
          }} />
        ))}
        {/* Grid */}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:"linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize:"60px 60px",
        }} />
        {/* Noise */}
        <div style={{
          position:"absolute", inset:0, opacity:0.5,
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`
        }} />
      </div>

      {/* ── Container ── */}
      <div style={{ maxWidth:1360, margin:"0 auto", padding:"0 1.5rem", position:"relative", zIndex:1 }}>

        {/* ── Header ── */}
        <div ref={headerRef} style={{ textAlign:"center", marginBottom:"3.5rem" }}>

          {/* Badge */}
          <div className={`tp-anim ${mounted ? "vis" : ""}`} style={{ transitionDelay:"0.05s", display:"inline-flex", alignItems:"center", gap:"0.55rem",
            fontSize:"0.63rem", fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase",
            color:"#FBBF24", background:"rgba(251,191,36,0.08)", border:"1px solid rgba(251,191,36,0.25)",
            padding:"0.38rem 1.1rem 0.38rem 0.85rem", borderRadius:40, marginBottom:"1.2rem",
            backdropFilter:"blur(10px)"
          }}>
            <SparklesIcon />
            <div className="badge-pulse" />
            ჩვენი სპეციალისტები
          </div>

          {/* Title */}
          <h1 className={`tp-anim ${mounted ? "vis" : ""}`} style={{
            transitionDelay:"0.2s",
            fontSize:"clamp(2.1rem, 5vw, 3.7rem)", fontWeight:900, color:"#fff",
            lineHeight:1.14, letterSpacing:"-0.028em", margin:"0 0 0.9rem",
            textShadow:"0 3px 24px rgba(0,0,0,0.4)"
          }}>
            გუნდი, რომელსაც<br />
            <span style={{
              background:"linear-gradient(135deg, #FBBF24 20%, #F59E0B 80%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text"
            }}>ენდობიან ოჯახები</span>
          </h1>

          {/* Subtitle */}
          <p className={`tp-anim ${mounted ? "vis" : ""}`} style={{
            transitionDelay:"0.32s",
            fontSize:"clamp(0.87rem, 1.8vw, 1.02rem)", color:"rgba(255,255,255,0.5)",
            maxWidth:560, margin:"0 auto 2rem", lineHeight:1.72
          }}>
            გამოცდილი, სერტიფიცირებული და გულწრფელი — ჩვენი სპეციალისტები ყოველ ბავშვს პირადად იცნობენ.
          </p>

          {/* Stats strip */}
          <div className={`tp-anim tp-stats-wrap ${mounted ? "vis" : ""}`} style={{
            transitionDelay:"0.44s",
            display:"inline-flex", alignItems:"center", gap:"1.4rem",
            background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
            padding:"0.85rem 2rem", borderRadius:16, marginBottom:"1.6rem",
            backdropFilter:"blur(10px)"
          }}>
            {[
              { v:"10+", l:"სპეციალისტი" },
              { v:"500+", l:"ოჯახი" },
              { v:"16,000+", l:"სეანსი" },
              { v:"100%", l:"სერტიფ." },
            ].map((s, i) => (
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <span style={{ fontSize:"1.2rem", fontWeight:900, color:"#FBBF24", lineHeight:1 }}>{s.v}</span>
                <span style={{ fontSize:"0.58rem", fontWeight:700, color:"rgba(255,255,255,0.38)", textTransform:"uppercase", letterSpacing:"0.08em", marginTop:2 }}>{s.l}</span>
                {i < 3 && <div className="tp-stat-div" style={{ display:"none" }} />}
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div className={`tp-anim tp-filters-wrap ${mounted ? "vis" : ""}`} style={{
            transitionDelay:"0.54s",
            display:"flex", justifyContent:"center", flexWrap:"wrap", gap:"0.45rem"
          }}>
            {filters.map(f => (
              <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="tp-grid" style={{ marginBottom:"3rem" }}>
          {displayed.map((person, idx) => (
            <TeamCard key={person.id} person={person} idx={idx} onOpenModal={setActiveModal} />
          ))}
        </div>

        {/* ── CTA Banner ── */}
        <div className={`tp-anim ${mounted ? "vis" : ""}`} style={{ transitionDelay:"0.8s" }}>
          <div className="cta-inner-wrap" style={{
            display:"flex", alignItems:"center", justifyContent:"space-between",
            background:"linear-gradient(135deg, rgba(27,111,212,0.2) 0%, rgba(43,74,138,0.14) 100%)",
            border:"1px solid rgba(251,191,36,0.2)",
            borderRadius:22, padding:"1.8rem 2.4rem",
            backdropFilter:"blur(14px)", position:"relative", overflow:"hidden", gap:"1.2rem"
          }}>
            <div style={{
              position:"absolute", inset:0,
              background:"linear-gradient(90deg, transparent, rgba(251,191,36,0.04), transparent)",
              animation:"shimmer 4s ease infinite", pointerEvents:"none"
            }} />
            <div style={{ position:"relative", zIndex:1 }}>
              <h3 style={{ fontSize:"1.3rem", fontWeight:900, color:"#fff", margin:"0 0 0.25rem", letterSpacing:"-0.02em" }}>
                მზად ხარ დაიწყო?
              </h3>
              <p style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.48)", margin:0 }}>
                ჩაეწერე  კონსულტაციაზე დღესვე — ჩვენი გუნდი გელოდება.
              </p>
            </div>
            <a href="#contact" className="cta-main-btn" style={{
              display:"inline-flex", alignItems:"center", gap:"0.75rem",
              background:"linear-gradient(105deg, #0066CC, #004C99)",
              color:"#fff", border:"none",
              padding:"0.85rem 2rem", borderRadius:50,
              fontFamily:"'Noto Sans Georgian', sans-serif",
              fontSize:"0.82rem", fontWeight:800,
              textDecoration:"none", cursor:"pointer", whiteSpace:"nowrap",
              flexShrink:0, position:"relative", zIndex:1,
              boxShadow:"0 6px 24px rgba(0,102,204,0.4)",
              transition:"all 0.25s ease"
            }}
              onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.15)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,102,204,0.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.filter = ""; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,102,204,0.4)"; }}
            >
              <a className="alink" href="/contact">კონსულტაციის ჩაწერა</a> <ArrowRight size={15} />
            </a>
          </div>
        </div>

      </div>

      {/* Modal */}
      {activeModal && <ProfileModal person={activeModal} onClose={() => setActiveModal(null)} />}
    </section>
  );
}