import React, { useEffect, useRef, useState, useCallback } from "react";

/* ───────────── Hooks ───────────── */
function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener?.("change", handler);
    mq.addListener?.(handler);
    return () => {
      mq.removeEventListener?.("change", handler);
      mq.removeListener?.(handler);
    };
  }, [breakpoint]);

  return isMobile;
}

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold });

    const current = ref.current;
    if (current) obs.observe(current);

    return () => {
      if (current) obs.unobserve(current);
      obs.disconnect();
    };
  }, [threshold]);

  return [ref, inView];
}

/* ───────────── Icons ───────────── */
const ArrowRight = React.memo(({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
));

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

const UserPlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// ── Team Data ──────────────────────────────────────────────────────────────
const teamData = [
  {
    id: 1,
    name: "ჯილდა ბლადაძე",
    role: "გენერალური დირექტორი",
    experience: "21 წელი",
    certs: ["გენერალური დირექტორი"],
    bio: "გენერალური დირექტორი.",
    fullBio: "Ჯილდა ბლადაძე არის ირმა ხვიჩიას რეაბილიტაციის ცენტრის გენერალური დირექტორი. ის ხელმძღვანელობს ცენტრის სტრატეგიულ განვითარებას, უზრუნველყოფს სერვისების მაღალ ხარისხს და ქმნის ინოვაციურ გარემოს, სადაც ყველა პაციენტი იღებს ინდივიდუალურ და პროფესიონალურ მხარდაჭერას.",
    image: "/team1.webp",
    accent: "#3A7BD5",
    accentRgb: "58,123,213",
    rating: 5.0,
    specialty: "დირექტორი",
    category: "",
  },
  {
    id: 2,
    name: "ირმა ხვიჩია",
    role: "ნევროლოგი",
    experience: "21 წელი",
    certs: ["ნევროლოგიის სერტიფიკატი", "ბავშვთა ნევროლოგიის ტრენინგი", "EEG დიაგნოსტიკა"],
    bio: "ხელმძღვანელობს ცენტრის კლინიკურ საქმიანობას.",
    fullBio: "ირმა ხვიჩია არის ცენტრის დამფუძნებელი და წამყვანი ნევროლოგი. 21 წლიანი გამოცდილებით, ის ხელმძღვანელობს კლინიკურ საქმიანობას და ჩართულია ბავშვთა ნევროლოგიურ შეფასებასა და მკურნალობაში. მისი მიდგომა ეფუძნება ინდივიდუალურობას და თანამედროვე დიაგნოსტიკურ მეთოდებს.",
    image: "/team1.webp",
    accent: "#1B6FD4",
    accentRgb: "27,111,212",
    rating: 5.0,
    specialty: "კლინიკური დირექტორი",
    category: "ნევროლოგია",
  },
  {
    id: 6,
    name: "ნანა დიდმანიძე",
    role: "კლინიკური ფსიქოლოგი",
    experience: "6 წელი",
    certs: ["ADOS-2", "ABA ტრენინგი", "კოგნიტურ–ბიჰევიორული თერაპია"],
    bio: "ახორციელებს ფსიქოლოგიურ შეფასებასა და თერაპიულ მხარდაჭერას.",
    fullBio: "ნანა დიდმანიძე არის კლინიკური ფსიქოლოგი, რომელსაც აქვს მრავალწლიანი გამოცდილება ბავშვთა და მოზრდილთა ფსიქოლოგიური შეფასებისა და თერაპიის სფეროში. მუშაობს აუტიზმის სპექტრის მქონე ბავშვებთან, განვითარების დარღვევების მქონე პირებთან. იყენებს ქცევის თერაპიის, კოგნიტურ–ბიჰევიორული და ფსიქოკორექციული მიდგომების მეთოდებს.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1D4ED8",
    accentRgb: "29,78,216",
    rating: 5.0,
    specialty: "ბავშვთა ფსიქოლოგია",
    category: "ფსიქოლოგია",
  },
  {
    id: 7,
    name: "საბრი ბრუნჯაძე",
    role: "ფსიქოლოგი",
    experience: "11 წელი",
    certs: ["სპეც. განათლების სახელმწ. ლიც.", "TEACCH მეთოდი", "ინკლუზიური განათლება"],
    bio: "მუშაობს პაციენტების ფსიქო-ემოციურ მხარდაჭერაზე.",
    fullBio: "საბრი ბრუნჯაძე არის ფსიქოლოგი, რომელიც ყოველ ბავშვს სასწავლო გზას ინდივიდუალურად უნიშნავს. 11 წლიანი გამოცდილებით, ის თვლის რომ განსხვავება არ არის დაბრკოლება - არამედ ნიჭი. TEACCH და ინკლუზიური განათლება მისი მთავარი სტრატეგიაა.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1565C0",
    accentRgb: "21,101,192",
    rating: 5.0,
    specialty: "ფსიქოლოგი",
    category: "ფსიქოლოგია",
  },
  {
    id: 8,
    name: "ირმა ვერულიძე",
    role: "ფსიქოლოგი",
    experience: "5 წელი",
    certs: ["MT-BC სერტიფიკატი", "Nordoff-Robbins", "ნეირომუსიკოლოგია"],
    bio: "ჩართულია ინდივიდუალური და ჯგუფური ფსიქოლოგიური მუშაობის პროცესში.",
    fullBio: "ირმა ვერულიძე არის ფსიქოლოგი, რომელიც მუსიკას სამკურნალოდ იყენებს. 5 წლიანი გამოცდილებით, რიტმი, მელოდია და ჰარმონია მის ხელში ბავშვის გულის გასაღებია. Nordoff-Robbins მეთოდი მისი ძირითადი პრაქტიკაა.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1976D2",
    accentRgb: "25,118,210",
    rating: 5.0,
    specialty: "ფსიქოლოგი",
    category: "ფსიქოლოგია",
  },
  {
    id: 9,
    name: "ანა ფოთელიძე",
    role: "ფსიქოლოგი",
    experience: "14 წელი",
    certs: ["ნეიროფსიქოლ. სახელმწ. ლიც.", "NEPSY-II", "კოგნიტური შეფასება"],
    bio: "უზრუნველყოფს ფსიქოლოგიურ კონსულტაციასა და მხარდაჭერას.",
    fullBio: "ანა ფოთელიძე არის ფსიქოლოგი, რომელიც ბავშვის ტვინის შესაძლებლობებს ავლენს. 14 წლიანი გამოცდილებით, მისი შეფასებები გზამკვლევია ოჯახებისთვის, სკოლებისთვის და მთელი სამკურნალო გუნდისთვის. NEPSY-II კომპლექსური შეფასება მისი სიძლიერეა.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#0D47A1",
    accentRgb: "13,71,161",
    rating: 5.0,
    specialty: "ფსიქოლოგი",
    category: "ფსიქოლოგია",
  },
  {
    id: 10,
    name: "ნინო კილასონია",
    role: "ფსიქოლოგი",
    experience: "8 წელი",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "მუშაობს პაციენტების ფსიქო-ემოციური მდგომარეობის გაუმჯობესებაზე.",
    fullBio: "ნინო კილასონია არის ფსიქოლოგი, რომელიც პირველ წლებს ყველაზე მნიშვნელოვნად თვლის. 8 წლიანი გამოცდილებით, ის ოჯახებს ეხმარება ადრეულ ეტაპზე - სწრაფად, სიყვარულით, ეფექტურად. ESDM და DIR/Floortime მეთოდები მისი სპეციალობაა.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 5.0,
    specialty: "ფსიქოლოგი",
    category: "ფსიქოლოგია",
  },
  {
    id: 11,
    name: "რიტა სურმანიძე",
    role: "ფსიქოლოგი",
    experience: "8 წელი",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "ჩართულია თერაპიულ პროცესებში.",
    fullBio: "რიტა სურმანიძე არის ფსიქოლოგი, რომელიც სპეციალიზირებულია ბავშვთა ფსიქოლოგიური მხარდაჭერის სფეროში. იგი მუშაობს თერაპიული პროცესების მართვაზე, ატარებს ინდივიდუალური და ჯგუფური თერაპიის სეანსებს.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 5.0,
    specialty: "ფსიქოლოგი",
    category: "ფსიქოლოგია",
  },
  {
    id: 12,
    name: "რუსუდან კაჭხმაძე",
    role: "ფსიქოლოგი",
    experience: "8 წელი",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "უზრუნველყოფს ფსიქოლოგიურ მხარდაჭერას.",
    fullBio: "რუსუდან კაჭხმაძე არის ფსიქოლოგი, რომელიც უზრუნველყოფს ბავშვებისა და მოზარდების ფსიქოლოგიურ მხარდაჭერას. იგი მუშაობს ემოციური და ქცევითი სირთულეების მართვაზე.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 5.0,
    specialty: "ფსიქოლოგი",
    category: "ფსიქოლოგია",
  },
  {
    id: 13,
    name: "გიორგი წილოსანი",
    role: "ფსიქოლოგი",
    experience: "8 წელი",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "მუშაობს პაციენტების ფსიქოლოგიურ შეფასებასა და მხარდაჭერაზე.",
    fullBio: "გიორგი წილოსანი არის ფსიქოლოგი, რომელიც სპეციალიზირებულია ფსიქოლოგიური შეფასებისა და მხარდაჭერის მიმართულებით. იგი მუშაობს ბავშვებისა და მოზარდების ფსიქო-ემოციური მდგომარეობის გაუმჯობესებაზე.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 5.0,
    specialty: "ფსიქოლოგი",
    category: "ფსიქოლოგია",
  },
  {
    id: 14,
    name: "ირმა ბლადაძე",
    role: "ლოგოპედი",
    experience: "8 წელი",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "მუშაობს მეტყველების განვითარებისა და თერაპიის მიმართულებით.",
    fullBio: "ირმა ბლადაძე არის ლოგოპედი, რომელიც მუშაობს მეტყველების განვითარებისა და თერაპიის მიმართულებით. იგი ეხმარება ბავშვებს კომუნიკაციის უნარების განვითარებაში.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 5.0,
    specialty: "ლოგოპედი",
    category: "ლოგოპედია",
  },
  {
    id: 15,
    name: "მარი ვასაძე",
    role: "ლოგოპედი",
    experience: "8 წელი",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "უზრუნველყოფს მეტყველების თერაპიულ მომსახურებას.",
    fullBio: "მარი ვასაძე არის ლოგოპედი, რომელიც უზრუნველყოფს მეტყველების თერაპიულ მომსახურებას. იგი მუშაობს მეტყველების დარღვევების კორექციაზე.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 5.0,
    specialty: "ლოგოპედი",
    category: "ლოგოპედია",
  },
  {
    id: 16,
    name: "ლია მახაჭაძე",
    role: "ლოგოპედი",
    experience: "8 წელი",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "მუშაობს კომუნიკაციური უნარების განვითარებაზე.",
    fullBio: "ლია მახაჭაძე არის ლოგოპედი, რომელიც მუშაობს კომუნიკაციური უნარების განვითარებაზე. იგი ატარებს ინდივიდუალურ თერაპიას ბავშვებთან.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 5.0,
    specialty: "ლოგოპედი",
    category: "ლოგოპედია",
  },
  {
    id: 17,
    name: "ინგა ჩხაიძე",
    role: "ლოგოპედი",
    experience: "8 წელი",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "ჩართულია მეტყველების თერაპიის პროცესში.",
    fullBio: "ინგა ჩხაიძე არის ლოგოპედი, რომელიც ჩართულია მეტყველების თერაპიის პროცესში. იგი მუშაობს მეტყველების განვითარების ხელშეწყობაზე.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 5.0,
    specialty: "ლოგოპედი",
    category: "ლოგოპედია",
  },
  {
    id: 18,
    name: "ცურა ცხადაძე",
    role: "ლოგოპედი",
    experience: "8 წელი",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "მუშაობს მეტყველების დარღვევების კორექციაზე.",
    fullBio: "ცურა ცხადაძე არის ლოგოპედი, რომელიც მუშაობს მეტყველების დარღვევების კორექციაზე. იგი იყენებს თანამედროვე მეთოდებს ბავშვების მეტყველების უნარების გასავითარებლად.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 5.0,
    specialty: "ლოგოპედი",
    category: "ლოგოპედია",
  },
  {
    id: 19,
    name: "ლეილა ღოღობერიძე",
    role: "ფიზიკური თერაპევტი",
    experience: "8 წელი",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "უზრუნველყოფს მეტყველების თერაპიას.",
    fullBio: "ლეილა ღოღობერიძე არის ფიზიკური თერაპევტი, რომელიც უზრუნველყოფს პაციენტების რეაბილიტაციას. იგი მუშაობს მოტორული ფუნქციების გაუმჯობესებაზე.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 5.0,
    specialty: "ლოგოპედი",
    category: "ლოგოპედია",
  },
  {
    id: 20,
    name: "სოფო გოგუაძე",
    role: "ლოგოპედი",
    experience: "8 წელი",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "ჩართულია მეტყველების თერაპიის პროცესში.",
    fullBio: "სოფო გოგუაძე არის აუტიზმის პროგრამის სუპერვიზორი და ადრეული განვითარების პროგრამის წამყვანი სპეციალისტი. 8 წლიანი გამოცდილებით, იგი ეხმარება ბავშვებს მეტყველებისა და კომუნიკაციის უნარების განვითარებაში.",
    image: "/log7.webp",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 5.0,
    specialty: "მეტყველების თერაპევტი",
    category: "ლოგოპედია",
  },
  {
    id: 21,
    name: "აკაკი გოგელია",
    role: "ფიზიკური თერაპევტი",
    experience: "8 წელი",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "მუშაობს მოძრაობითი ფუნქციების გაუმჯობესებაზე.",
    fullBio: "აკაკი გოგელია არის ფიზიკური თერაპევტი, რომელიც მუშაობს მოძრაობითი ფუნქციების გაუმჯობესებაზე. იგი სპეციალიზირებულია ბავშვთა რეაბილიტაციის მიმართულებით.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 5.0,
    specialty: "ფიზიკური თერაპევტი",
    category: "ფიზიკური თერაპია",
  },
  {
    id: 22,
    name: "ჭაბუკი მელქაძე",
    role: "ფიზიკური თერაპევტი",
    experience: "8 წელი",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "ჩართულია რეაბილიტაციის პროცესში.",
    fullBio: "ჭაბუკი მელქაძე არის ფიზიკური თერაპევტი, რომელიც ჩართულია რეაბილიტაციის პროცესში. იგი მუშაობს პაციენტების ფიზიკური მდგომარეობის გაუმჯობესებაზე.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 5.0,
    specialty: "ფიზიკური თერაპევტი",
    category: "ფიზიკური თერაპია",
  },
  {
    id: 23,
    name: "მთვარე ჩიტიძე",
    role: "ფიზიკური თერაპევტი",
    experience: "8 წელი",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "უზრუნველყოფს ფიზიკურ თერაპიას.",
    fullBio: "მთვარე ჩიტიძე არის ფიზიკური თერაპევტი, რომელიც უზრუნველყოფს ფიზიკურ თერაპიას. იგი მუშაობს პაციენტების მოტორული ფუნქციების გაუმჯობესებაზე.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 5.0,
    specialty: "ფიზიკური თერაპევტი",
    category: "ფიზიკური თერაპია",
  },
  {
    id: 24,
    name: "იზა ჯინჭარაძე",
    role: "ფიზიკური თერაპევტი",
    experience: "8 წელი",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "მუშაობს მოტორული უნარების განვითარებაზე.",
    fullBio: "იზა ჯინჭარაძე არის ფიზიკური თერაპევტი, რომელიც მუშაობს მოტორული უნარების განვითარებაზე. იგი სპეციალიზირებულია ბავშვთა ფიზიკურ რეაბილიტაციაში.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 5.0,
    specialty: "ფიზიკური თერაპევტი",
    category: "ფიზიკური თერაპია",
  },
  {
    id: 25,
    name: "ეკა იაკობაძე",
    role: "ფიზიკური თერაპევტი",
    experience: "8 წელი",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "უზრუნველყოფს ფიზიკურ თერაპიას.",
    fullBio: "ეკა იაკობაძე არის ფიზიკური თერაპევტი, რომელიც უზრუნველყოფს პაციენტების რეაბილიტაციას. იგი მუშაობს სხვადასხვა ასაკის პაციენტების ფიზიკური მდგომარეობის გაუმჯობესებაზე.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 5.0,
    specialty: "ფიზიკური თერაპევტი",
    category: "ფიზიკური თერაპია",
  },
  {
    id: 26,
    name: "ინგა ბაიდოშვილი",
    role: "ფიზიკური თერაპევტი",
    experience: "8 წელი",
    certs: ["ESDM სერტიფიკატი", "DIR/Floortime", "0-3 სპეციალიზაცია"],
    bio: "უზრუნველყოფს ფიზიკურ თერაპიას.",
    fullBio: "ინგა ბაიდოშვილი არის ფიზიკური თერაპევტი, რომელსაც აქვს მრავალწლიანი პრაქტიკული გამოცდილება ბავშვებისა და ზრდასრულების რეაბილიტაციის მიმართულებით. ის სპეციალიზებულია მასაჟსა და ფიზიკურ თერაპიაში და აქტიურად მუშაობს პაციენტების ფუნქციური აღდგენისა და მოძრაობითი უნარების გაუმჯობესებაზე.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1A5FA8",
    accentRgb: "26,95,168",
    rating: 5.0,
    specialty: "ფიზიკური თერაპევტი / მასაჟისტი",
    category: "ფიზიკური თერაპია",
  },
];

// ── Visiting Specialists Data ─────────────────────────────────────────────
const visitingSpecialists = [
  {
    id: 'v1',
    name: "გია მელიქიშვილი",
    role: "ბავშვთა ნევროლოგი, ეპილეფტოლოგი",
    specialty: "ნევროლოგია",
    description: "გამოცდილი ბავშვთა ნევროლოგი და ეპილეფტოლოგი.",
    services: [
      "ბავშვთა ნევროლოგიური დაავადებების დიაგნოსტიკა",
      "ეპილეფსიის დიაგნოსტიკა და მკურნალობა",
      "განვითარების დარღვევების შეფასება",
      "ინდივიდუალური კონსულტაციები",
    ],
    image: "team2.jpg",
    accent: "#2B4A8A",
    accentRgb: "43,74,138",
    fullBio: "გია მელიქიშვილი არის გამოცდილი ბავშვთა ნევროლოგი და ეპილეფტოლოგი, რომელიც უზრუნველყოფს ბავშვებში ნევროლოგიური დარღვევების დიაგნოსტიკასა და მართვას. 10 წლიანი გამოცდილებით, ის მუშაობს ეპილეფსიის სხვადასხვა ფორმის დიაგნოსტიკასა და მკურნალობაზე. მისი მიმართულებები მოიცავს EEG კვლევების შეფასებას, კრუნჩხვითი ეპიზოდების მართვას და თანამედროვე თერაპიული მიდგომების გამოყენებას.",
  },
  {
    id: 'v2',
    name: "ნაზიბროლა ქაჯაია",
    role: "ოკუპაციური თერაპევტი",
    specialty: "ოკუპაციური თერაპია",
    description: "გამოცდილი ოკუპაციური თერაპევტი.",
    services: [
      "ყოველდღიური აქტივობების უნარების განვითარება",
      "მოტორული უნარების გაუმჯობესება",
      "ადაპტაციური ტექნიკების დამუშავება",
      "ინდივიდუალურად მორგებული თერაპია",
    ],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1D4ED8",
    accentRgb: "29,78,216",
    fullBio: "ნაზიბროლა ქაჯაია არის გამოცდილი ოკუპაციური თერაპევტი, რომელიც სპეციალიზირებულია ბავშვების ყოველდღიური აქტივობების უნარების განვითარებაში. ის მუშაობს ბავშვებთან, რომლებსაც აქვთ მოტორული, სენსორული ან კოგნიტური სირთულეები. მისი მიდგომა ეფუძნება ინდივიდუალურად მორგებულ თერაპიულ გეგმებს.",
  },
  {
    id: 'v3',
    name: "ხატია ცინცქილაძე",
    role: "ბავშვთა ნეიროქირურგი",
    specialty: "ნეიროქირურგია",
    description: "სპეციალიზირებული ბავშვთა ნეიროქირურგი.",
    services: [
      "ნევროლოგიური და ნეიროქირურგიული მდგომარეობების დიაგნოსტიკა",
      "თანამედროვე დიაგნოსტიკური მეთოდები",
      "ქირურგიული მკურნალობა",
      "პაციენტის უსაფრთხოების უზრუნველყოფა",
    ],
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&h=700&fit=crop&crop=faces&auto=format",
    accent: "#1565C0",
    accentRgb: "21,101,192",
    fullBio: "ხატია ცინცქილაძე არის სპეციალიზირებული ბავშვთა ნეიროქირურგი, რომელიც ფოკუსირებულია ბავშვების ნევროლოგიური და ნეიროქირურგიული მდგომარეობების დიაგნოსტიკასა და მკურნალობაზე. ის იყენებს თანამედროვე დიაგნოსტიკურ და ქირურგიულ მეთოდებს.",
  },
  {
    id: 'v4',
    name: "ლევან ჩიკვატია",
    role: "ორთოპედ-ტრავმატოლოგი, ქირურგი, პროფესორი",
    specialty: "ორთოპედია",
    description: "წამყვანი ორთოპედ-ტრავმატოლოგი.",
    services: [
      "ორთოპედიული და ტრავმატოლოგიური პრობლემების კომპლექსური მკურნალობა",
      "ქირურგიული ინტერვენციები",
      "რეაბილიტაციის დაგეგმვა",
      "კონსულტაციები",
    ],
    image: "team3.jpg",
    accent: "#1E5FAF",
    accentRgb: "30,95,175",
    fullBio: "ლევან ჩიკვატია არის წამყვანი ორთოპედ-ტრავმატოლოგი, ქირურგი, მედიცინის დოქტორი და პროფესორი, რომელიც უზრუნველყოფს ბავშვებისა და მოზრდილების ორთოპედიული და ტრავმატოლოგიური პრობლემების კომპლექსურ მკურნალობას. 6 წლიანი გამოცდილებით, ის მუშაობს ტრავმების, ხერხემლისა და სახსრების პრობლემების შეფასებასა და მკურნალობაზე.",
  },
];

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

// ── Profile Modal ──────────────────────────────────────────────────────────
function ProfileModal({ person, onClose  }) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    document.body.style.overflow = "hidden";
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  // Animated entry styles
  const fadeStyle = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <div
      onClick={onClose}
      style={{
        position:"fixed", inset:0, zIndex:1000,
        background:"rgba(1,10,28,0.88)",
        backdropFilter:"blur(18px)",
        display:"flex", alignItems:"center", justifyContent:"center",
        padding: isMobile ? "1rem" : "24px",
        opacity: mounted ? 1 : 0,
        transition:"opacity 0.4s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        role="dialog" aria-modal="true"
        style={{
          position: "relative",
          background:"linear-gradient(145deg,#071222,#04101E)",
          border: `1px solid rgba(${person.accentRgb},0.3)`,
          borderRadius: 24,
          overflow:"hidden",
          display:"flex",
          flexDirection: isMobile ? "column" : "row",
          maxWidth: isMobile ? 420 : 820,
          width:"100%",
          maxHeight: isMobile ? "88vh" : "90vh",
          boxShadow: `0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(${person.accentRgb},0.12)`,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
          transition: "opacity 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <button onClick={onClose} style={{
          position:"absolute",
          top: "1rem",
          right: "1rem",
          background:"rgba(0,0,0,0.4)",
          backdropFilter:"blur(8px)",
          border:"1px solid rgba(255,255,255,0.15)",
          color:"rgba(255,255,255,0.8)",
          borderRadius:10,
          width: 36,
          height: 36,
          display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
          transition:"all 0.2s ease",
          zIndex: 30
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.6)"; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.4)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
        ><CloseIcon /></button>

        <div style={{
          width: isMobile ? "100%" : 280,
          height: isMobile ? 320 : "auto",
          flexShrink:0,
          position:"relative",
          overflow:"hidden",
          background:"#030D1A",
        }}>
          <img
            loading="eager"
            src={person.image}
            alt={person.name}
            style={{
              width:"100%",
              height:"100%",
              objectFit:"cover",
              objectPosition:"center 20%",
              filter:"brightness(0.7) saturate(0.85)",
              display:"block",
              animation: mounted ? "modal-img-in 1.2s cubic-bezier(0.22,1,0.36,1) both" : "none",
            }}
          />
          <style>{`
            @keyframes modal-img-in {
              from { transform: scale(1.12); }
              to { transform: scale(1); }
            }
          `}</style>
          <div style={{
            position:"absolute", inset:0,
            background:`linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(3,13,26,0.95) 100%)`
          }} />
          <div style={{
            position:"absolute", bottom:0, left:0, right:0,
            padding: "1.2rem",
            zIndex:2,
            display:"flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            gap: "0.6rem"
          }}>
            <span style={{
              display:"inline-block",
              fontSize: "0.6rem",
              fontWeight:800,
              letterSpacing:"0.14em",
              textTransform:"uppercase",
              color:"#FBBF24",
              background:"rgba(251,191,36,0.12)",
              backdropFilter: "blur(6px)",
              border:"1px solid rgba(251,191,36,0.3)",
              padding: "0.3rem 0.75rem",
              borderRadius:40,
              ...fadeStyle(0.14),
            }}>
              {person.specialty}
            </span>
            <div style={{
              display:"flex",
              alignItems:"center",
              gap: "1.2rem",
              ...fadeStyle(0.24),
            }}>
              {[{ n: person.experience || "50+", l: "გამოცდ." }, { n: (person.rating || 4.9).toFixed(1), l: "რეიტინგი" }].map((s, i) => (
                <div key={i} style={{ display:"flex", flexDirection:"column" }}>
                  <span style={{
                    fontSize: "1.1rem",
                    fontWeight:900,
                    color:"#fff",
                    lineHeight:1
                  }}>{s.n}</span>
                  <span style={{
                    fontSize: "0.58rem",
                    fontWeight:700,
                    color:"rgba(255,255,255,0.45)",
                    textTransform:"uppercase",
                    letterSpacing:"0.08em",
                    marginTop: 4
                  }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          flex:1,
          padding: isMobile ? "1.5rem 1.25rem" : "2rem 1.8rem",
          position:"relative",
          overflowY:"auto",
          display:"flex",
          flexDirection:"column",
          gap: isMobile ? "0.65rem" : "0.9rem",
          wordBreak: "break-word",
        }}>
          <div style={{
            fontSize: "0.6rem",
            fontWeight:800,
            letterSpacing:"0.14em",
            textTransform:"uppercase",
            color: person.accent,
            ...fadeStyle(0.2),
          }}>{person.role}</div>

          <h2 style={{
            fontSize: "clamp(1.4rem, 6vw, 1.8rem)",
            fontWeight:900,
            color:"#fff",
            letterSpacing:"-0.022em",
            margin:0,
            lineHeight:1.1,
            ...fadeStyle(0.19),
          }}>{person.name}</h2>

          {person.rating && (
            <div style={fadeStyle(0.25)}>
              <RatingStars rating={person.rating} />
            </div>
          )}

          <p style={{
            fontSize: "0.85rem",
            lineHeight: 1.6,
            color:"rgba(255,255,255,0.65)",
            margin:"0.3rem 0",
            ...fadeStyle(0.3),
          }}>{person.fullBio || person.bio}</p>

          {person.services && (
            <>
              <div style={{
                fontSize: "0.58rem",
                fontWeight:800,
                letterSpacing:"0.14em",
                textTransform:"uppercase",
                color:"rgba(255,255,255,0.28)",
                marginTop: "0.4rem",
                ...fadeStyle(0.35),
              }}>სერვისები</div>
              <div style={{
                display:"flex",
                flexDirection:"column",
                gap: "0.35rem"
              }}>
                {person.services.map((c, i) => (
                  <div key={i} style={{
                    display:"flex", alignItems:"center", gap:"0.6rem",
                    fontSize: "0.76rem",
                    color:"rgba(255,255,255,0.72)",
                    padding: "0.4rem 0.6rem",
                    background:`rgba(${person.accentRgb},0.08)`,
                    border:`1px solid rgba(${person.accentRgb},0.18)`,
                    borderRadius:10,
                    wordBreak:"break-word",
                    ...fadeStyle(0.4 + i * 0.07),
                  }}>
                    <span style={{
                      width: 18,
                      height: 18,
                      borderRadius:6,
                      background:`rgba(${person.accentRgb},0.25)`,
                      color: person.accent,
                      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0
                    }}><CheckIcon /></span>
                    {c}
                  </div>
                ))}
              </div>
            </>
          )}

          <div style={{
            display:"flex",
            flexDirection: "row",
            gap: "0.5rem",
            marginTop:"auto",
            paddingTop: "0.8rem",
            ...fadeStyle(0.62),
          }}>
            <button style={{
              flex: 1,
              display:"inline-flex",
              alignItems:"center",
              justifyContent:"center",
              gap:"0.45rem",
              background: person.accent,
              border:"none",
              color:"#fff",
              padding: "0.75rem",
              borderRadius:12,
              fontSize: "0.78rem",
              fontWeight:800,
              cursor:"pointer",
              fontFamily:"'Noto Sans Georgian', sans-serif",
              transition:"all 0.2s ease",
            }}
            onClick={() => {
              sessionStorage.setItem("selectedSpecialist", person.name);
              window.location.href = "/contact";
              onClose();
            }}
            onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.filter = ""; e.currentTarget.style.transform = ""; }}
            >
              <PhoneIcon /> კონსულტაცია
            </button>
            <button onClick={onClose} style={{
              flex: 0.6,
              display:"inline-flex",
              alignItems:"center",
              justifyContent:"center",
              gap:"0.4rem",
              background:"rgba(255,255,255,0.05)",
              border:"1px solid rgba(255,255,255,0.1)",
              color:"rgba(255,255,255,0.45)",
              padding: "0.75rem",
              borderRadius:12,
              fontSize: "0.78rem",
              fontWeight:700,
              cursor:"pointer",
              fontFamily:"'Noto Sans Georgian', sans-serif",
              transition:"all 0.2s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              უკან
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Team Card ─────────────────────────────────────────────────────────────────
function TeamCard({ person, idx, onOpenModal  }) {
  const [ref, inView] = useInView(0.06);
  const isMobile = useIsMobile(1024);
  const [hoveredState, setHoveredState] = useState(false);
  const hovered = isMobile || hoveredState;
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
        onMouseEnter={() => setHoveredState(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHoveredState(false); }}
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
        <div style={{
          position:"absolute", top:-60, left:-60, width:220, height:220, borderRadius:"50%",
          background:`radial-gradient(circle, rgba(${person.accentRgb},0.22) 0%, transparent 70%)`,
          pointerEvents:"none", zIndex:0,
          opacity: hovered ? 1 : 0, transition:"opacity 0.4s ease"
        }} />

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

          <div style={{
            position:"absolute", top:12, right:12, zIndex:3,
            display:"inline-flex", alignItems:"center", gap:5,
            background:"rgba(15,10,0,0.65)", backdropFilter:"blur(10px)",
            border:"1px solid rgba(251,191,36,0.45)",
            borderRadius:40, padding:"5px 11px",
            color:"#FBBF24", fontSize:"0.62rem", fontWeight:800,
            letterSpacing:"0.04em", whiteSpace:"nowrap",
            fontFamily:"'Noto Sans Georgian', sans-serif",
          }}>
            <span style={{
              width:5, height:5, borderRadius:"50%",
              background:"#FBBF24", flexShrink:0,
              boxShadow:"0 0 6px rgba(251,191,36,0.8)"
            }} />
            {person.role}
          </div>

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

        <div style={{ position:"relative", zIndex:2, padding:"1.1rem 1.3rem 1.35rem", display:"flex", flexDirection:"column", gap:"0.4rem" }}>
          <span style={{ fontSize:"0.55rem", fontWeight:800, letterSpacing:"0.15em", textTransform:"uppercase", color:"#FBBF24" }}>{person.specialty}</span>
          <h3 style={{ fontSize:"1.08rem", fontWeight:900, color:"#fff", letterSpacing:"-0.02em", lineHeight:1.2, margin:0 }}>{person.name}</h3>
          <span style={{ fontSize:"0.65rem", fontWeight:700, color: person.accent, letterSpacing:"0.03em" }}>{person.role}</span>

          <p style={{
            fontSize:"0.76rem", lineHeight:1.65, color:"rgba(255,255,255,0.48)",
            margin:0, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden"
          }}>{person.bio}</p>

          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.28rem", marginTop:"0.1rem" }}>
            {person.certs?.slice(0, 2).map((c, i) => (
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
            {person.certs?.length > 2 && (
              <span style={{
                display:"inline-flex", alignItems:"center",
                fontSize:"0.58rem", fontWeight:700,
                color:"#FBBF24", background:"rgba(251,191,36,0.08)",
                border:"1px solid rgba(251,191,36,0.2)",
                padding:"0.2rem 0.6rem", borderRadius:6
              }}>+{person.certs.length - 2}</span>
            )}
          </div>

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

        <div style={{
          position:"absolute", bottom:0, left:0, right:0, height:2,
          background:`linear-gradient(to right, transparent, ${person.accent}, transparent)`,
          opacity: hovered ? 1 : 0, transition:"opacity 0.4s ease", zIndex:3
        }} />
      </div>
    </div>
  );
}

// ── Visiting Specialist Card ──────────────────────────────────────────────
function VisitingSpecialistCard({ person, idx, onOpenModal }) {
  const [ref, inView] = useInView(0.06);
  const isMobile = useIsMobile(1024);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${idx * 0.07 + 0.3}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${idx * 0.07 + 0.3}s`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position:"relative",
          background: hovered
            ? `linear-gradient(145deg, rgba(${person.accentRgb},0.15) 0%, rgba(8,22,52,0.97) 100%)`
            : "linear-gradient(145deg, rgba(10,25,55,0.95) 0%, rgba(4,12,30,0.98) 100%)",
          border: hovered ? `1px solid rgba(${person.accentRgb},0.45)` : "1px solid rgba(251,191,36,0.15)",
          borderRadius:22,
          overflow:"hidden",
          cursor:"default",
          transition:"all 0.35s ease",
          boxShadow: hovered
            ? `0 24px 60px rgba(0,0,0,0.55), 0 0 50px rgba(${person.accentRgb},0.14)`
            : "0 4px 24px rgba(0,0,0,0.4)",
        }}
      >
        {/* Premium Badge */}
        <div style={{
          position:"absolute", top:12, left:12, zIndex:5,
          display:"inline-flex", alignItems:"center", gap:5,
          background:"rgba(251,191,36,0.15)", backdropFilter:"blur(10px)",
          border:"1px solid rgba(251,191,36,0.35)",
          borderRadius:40, padding:"4px 12px 4px 8px",
          color:"#FBBF24", fontSize:"0.5rem", fontWeight:800,
          letterSpacing:"0.08em", textTransform:"uppercase",
          fontFamily:"'Noto Sans Georgian', sans-serif",
        }}>
          <UserPlusIcon />
          მოწვეული
        </div>

        <div style={{ position:"relative", height:200, overflow:"hidden", zIndex:1 }}>
          <img src={person.image} alt={person.name} loading="lazy" style={{
            width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 10%", display:"block",
            transition:"transform 0.7s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease",
            filter: hovered ? "saturate(0.95) brightness(0.98)" : "saturate(0.6) brightness(0.65)",
            transform: hovered ? "scale(1.07)" : "scale(1)",
          }} />
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(to bottom, rgba(2,10,30,0.08) 0%, rgba(2,10,30,0.88) 100%)",
            zIndex:1
          }} />
        </div>

        <div style={{ position:"relative", zIndex:2, padding:"1.1rem 1.3rem 1.35rem", display:"flex", flexDirection:"column", gap:"0.3rem" }}>
          <div style={{
            display:"flex", alignItems:"center", gap:"0.4rem",
            fontSize:"0.5rem", fontWeight:700, color:"rgba(255,255,255,0.3)",
            textTransform:"uppercase", letterSpacing:"0.08em"
          }}>
            <BriefcaseIcon />
            {person.specialty}
          </div>

          <h3 style={{ fontSize:"1.05rem", fontWeight:900, color:"#fff", letterSpacing:"-0.02em", lineHeight:1.2, margin:0 }}>
            {person.name}
          </h3>

          <span style={{ fontSize:"0.6rem", fontWeight:700, color: person.accent, letterSpacing:"0.03em" }}>
            {person.role}
          </span>

          <p style={{
            fontSize:"0.72rem", lineHeight:1.6, color:"rgba(255,255,255,0.45)",
            margin:"0.2rem 0 0.1rem", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden"
          }}>{person.description}</p>

          <div style={{ display:"flex", gap:"0.4rem", marginTop:"0.3rem" }}>
            <button
              onClick={() => onOpenModal(person)}
              style={{
                flex:1, display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"0.35rem",
                background: person.accent, border:"none", color:"#fff",
                padding:"0.5rem 0.8rem", borderRadius:10,
                fontSize:"0.65rem", fontWeight:800, cursor:"pointer",
                fontFamily:"'Noto Sans Georgian', sans-serif",
                transition:"all 0.22s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.filter = ""; e.currentTarget.style.transform = ""; }}
            >
              ინფორმაცია <ArrowRight size={11} />
            </button>
            <button
              onClick={() => {
                sessionStorage.setItem("selectedSpecialist", person.name);
                window.location.href = "/contact";
              }}
              style={{
                width:38, height:38, flexShrink:0,
                display:"flex", alignItems:"center", justifyContent:"center",
                background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
                borderRadius:10, color:"rgba(255,255,255,0.5)", cursor:"pointer",
                transition:"all 0.2s ease"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(251,191,36,0.15)"; e.currentTarget.style.borderColor = "rgba(251,191,36,0.3)"; e.currentTarget.style.color = "#FBBF24"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
            ><PhoneIcon /></button>
          </div>
        </div>

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
export default function App() { 
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #051428; }

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
        @media (max-width: 560px)  {
          .tp-grid { grid-template-columns: 1fr; justify-items: center; }
          .tp-grid > div { max-width: 340px; width: 100%; }
        }

        .visiting-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.3rem;
        }
        @media (max-width: 1200px) { .visiting-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 900px)  { .visiting-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px)  {
          .visiting-grid { grid-template-columns: 1fr; justify-items: center; }
          .visiting-grid > div { max-width: 340px; width: 100%; }
        }

        @media (max-width: 768px) {
          .tp-stats-wrap { flex-wrap: wrap; gap: 0.6rem !important; padding: 0.8rem 1rem !important; }
          .tp-stat-div { display: none; }
          .tp-filters-wrap { justify-content: flex-start !important; overflow-x: auto; padding-bottom: 4px; }
          .cta-inner-wrap { flex-direction: column !important; align-items: flex-start !important; }
          .cta-main-btn { width: 100%; justify-content: center; }
          .visiting-header { flex-direction: column !important; align-items: flex-start !important; gap: 0.8rem !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tp-anim { opacity:1 !important; transform:none !important; transition:none !important; }
          .badge-pulse { animation: none !important; }
        }
      `}</style>

      {/* ── Decorative BG ── */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
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
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:"linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize:"60px 60px",
        }} />
      </div>

      {/* ── Container ── */}
      <div style={{ maxWidth:1360, margin:"0 auto", padding:"0 1.5rem", position:"relative", zIndex:1 }}>

        {/* ── Header ── */}
        <div ref={headerRef} style={{ textAlign:"center", marginBottom:"3.5rem" }}>
          <div className={`tp-anim ${mounted ? "vis" : ""}`} style={{
            transitionDelay: "0.05s",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.55rem",
            fontSize: "0.63rem",
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#FBBF24",
            background: "rgba(251,191,36,0.08)",
            border: "1px solid rgba(251,191,36,0.25)",
            padding: "0.38rem 1.1rem 0.38rem 0.85rem",
            borderRadius: 40,
            marginBottom: "1.2rem",
            backdropFilter: "blur(10px)"
          }}>
            <SparklesIcon />
            <div className="badge-pulse" />
            ჩვენი სპეციალისტები
          </div>

          <h1 className={`tp-anim ${mounted ? "vis" : ""}`} style={{
            transitionDelay: "0.2s",
            fontSize: "clamp(2.1rem, 5vw, 3.7rem)",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.2,
            letterSpacing: "-0.028em",
            margin: "0 0 0.9rem",
            textShadow: "0 3px 24px rgba(0,0,0,0.4)",
          }}>
            <span style={{
              display: "inline-block",
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              მულტიდისციპლინარული
            </span>
            <br />
            <span style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #FBBF24 20%, #F59E0B 60%, #FBBF24 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              position: "relative",
              padding: "0 0.1em",
            }}>
              გუნდი
            </span>
            <span style={{
              display: "inline-block",
              background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: "0 0.15em",
            }}>
              {" "}რომელსაც
            </span>
            <br />
            <span style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #FBBF24 20%, #F59E0B 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              position: "relative",
            }}>
              ენდობიან ოჯახები
            </span>
          </h1>

          <p className={`tp-anim ${mounted ? "vis" : ""}`} style={{
            transitionDelay: "0.32s",
            fontSize: "clamp(0.87rem, 1.8vw, 1.02rem)",
            color: "rgba(255,255,255,0.5)",
            maxWidth: 560,
            margin: "0 auto 2rem",
            lineHeight: 1.72
          }}>
            გამოცდილი, სერტიფიცირებული და გულწრფელი — ჩვენი სპეციალისტები ყოველ ბავშვს პირადად იცნობენ.
          </p>

          <div className={`tp-anim tp-stats-wrap ${mounted ? "vis" : ""}`} style={{
            transitionDelay: "0.44s",
            display: "inline-flex",
            alignItems: "center",
            gap: "1.4rem",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "0.85rem 2rem",
            borderRadius: 16,
            marginBottom: "1.6rem",
            backdropFilter: "blur(10px)"
          }}>
            {[
              { v:"50+", l:"სპეციალისტი" },
              { v:"15,000+", l:"მომხმარებელი" },
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

          <div className={`tp-anim tp-filters-wrap ${mounted ? "vis" : ""}`} style={{
            transitionDelay: "0.54s",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.45rem"
          }}>
            {filters.map(f => (
              <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
        </div>

        {/* ── Main Team Grid ── */}
        <div className="tp-grid" style={{ marginBottom:"4rem" }}>
          {displayed.map((person, idx) => (
            <TeamCard key={person.id} person={person} idx={idx} onOpenModal={setActiveModal} />
          ))}
        </div>

        {/* ── Visiting Specialists Section ── */}
        <div style={{ marginBottom:"4rem" }}>
          <div className="visiting-header" style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"space-between",
            marginBottom:"1.8rem",
            gap:"1rem"
          }}>
            <div>
              <div style={{
                display:"inline-flex",
                alignItems:"center",
                gap:"0.5rem",
                fontSize:"0.6rem",
                fontWeight:800,
                letterSpacing:"0.14em",
                textTransform:"uppercase",
                color:"#FBBF24",
                background:"rgba(251,191,36,0.08)",
                border:"1px solid rgba(251,191,36,0.2)",
                padding:"0.3rem 0.9rem",
                borderRadius:40,
                marginBottom:"0.6rem"
              }}>
                <UserPlusIcon />
                მოწვეული სპეციალისტები
              </div>
              <h2 style={{
                fontSize:"clamp(1.4rem, 3vw, 2.2rem)",
                fontWeight:900,
                color:"#fff",
                letterSpacing:"-0.025em",
                margin:0,
                lineHeight:1.1
              }}>
                წამყვანი ექსპერტები <span style={{ color:"#FBBF24" }}>თბილისიდან</span>
              </h2>
            </div>
            <div style={{
              display:"flex",
              alignItems:"center",
              gap:"0.75rem",
              padding:"0.5rem 1.2rem",
              background:"rgba(255,255,255,0.04)",
              border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:12,
              flexShrink:0
            }}>
              <CalendarIcon />
              <span style={{
                fontSize:"0.7rem",
                color:"rgba(255,255,255,0.5)",
                fontWeight:600,
                whiteSpace:"nowrap"
              }}>რეგულარული ვიზიტები</span>
            </div>
          </div>

          <p style={{
            fontSize:"0.85rem",
            color:"rgba(255,255,255,0.45)",
            maxWidth:700,
            margin:"0 0 1.8rem",
            lineHeight:1.7
          }}>
            რეგულარულად ვმასპინძლობთ თბილისიდან მოწვეულ წამყვან სპეციალისტებს. 
            მათი ვიზიტები უზრუნველყოფს ჩვენი პაციენტებისთვის უახლესი დიაგნოსტიკური 
            და თერაპიული მიდგომების ხელმისაწვდომობას, რაც ხელს უწყობს მაღალი 
            ხარისხის სერვისების მიწოდებას.
          </p>

          <div className="visiting-grid">
            {visitingSpecialists.map((person, idx) => (
              <VisitingSpecialistCard
                key={person.id}
                person={person}
                idx={idx}
                onOpenModal={setActiveModal}
              />
            ))}
          </div>
        </div>

        {/* ── CTA Banner ── */}
        <div className={`tp-anim ${mounted ? "vis" : ""}`} style={{ transitionDelay:"0.8s" }}>
          <div className="cta-inner-wrap" style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"space-between",
            background:"linear-gradient(135deg, rgba(27,111,212,0.2) 0%, rgba(43,74,138,0.14) 100%)",
            border:"1px solid rgba(251,191,36,0.2)",
            borderRadius:22,
            padding:"1.8rem 2.4rem",
            backdropFilter:"blur(14px)",
            position:"relative",
            overflow:"hidden",
            gap:"1.2rem"
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
                ჩაეწერე კონსულტაციაზე დღესვე — ჩვენი გუნდი გელოდება.
              </p>
            </div>
            <a href="/contact" className="cta-main-btn" style={{
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
              კონსულტაციის ჩაწერა
            </a>
          </div>
        </div>

      </div>

      {activeModal && <ProfileModal person={activeModal} onClose={() => setActiveModal(null)} />}
    </section>
  );
}