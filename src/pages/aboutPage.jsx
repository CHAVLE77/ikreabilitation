import React, { useEffect, useRef, useState, useCallback } from "react"
import {
  Heart,
  Target,
  Compass,
  Award,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Quote,
  Stethoscope,
  ChevronDown,
  Play,
  Star,
  Shield,
  Zap,
  Activity,
  ClipboardList
} from "lucide-react"

function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, shown]
}

function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handler = e => setPos({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2
    })
    window.addEventListener("mousemove", handler, { passive: true })
    return () => window.removeEventListener("mousemove", handler)
  }, [])
  return pos
}

function useCounter(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = null
    const step = ts => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, active])
  return count
}

function StatItem({ num, label, delay, active }) {
  const isPercent = num.includes("%")
  const isPlus = num.includes("+")
  const raw = parseInt(num.replace(/\D/g, ""))
  const counted = useCounter(raw, 1600, active)
  return (
    <div className="stat-item" style={{ "--d": `${delay}ms` }}>
      <div className="stat-num">{counted}{isPlus ? "+" : ""}{isPercent ? "%" : ""}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

function ValueCard({ icon: Icon, title, text, delay, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 })
  const [hovered, setHovered] = useState(false)
  const handleMove = useCallback(e => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({ x: (y - 0.5) * 12, y: (x - 0.5) * -12, gx: x * 100, gy: y * 100 })
  }, [])

  const palette = [
    { accent: "#F7B731", glow: "rgba(247,183,49,0.22)",  iconBg: "rgba(247,183,49,0.15)", iconBorder: "rgba(247,183,49,0.35)" },
    { accent: "#2885ef", glow: "rgba(40,133,239,0.22)",  iconBg: "rgba(40,133,239,0.15)", iconBorder: "rgba(40,133,239,0.35)" },
    { accent: "#10b981", glow: "rgba(16,185,129,0.22)",  iconBg: "rgba(16,185,129,0.15)", iconBorder: "rgba(16,185,129,0.35)" },
    { accent: "#f43f5e", glow: "rgba(244,63,94,0.22)",   iconBg: "rgba(244,63,94,0.15)",  iconBorder: "rgba(244,63,94,0.35)"  },
    { accent: "#a855f7", glow: "rgba(168,85,247,0.22)",  iconBg: "rgba(168,85,247,0.15)", iconBorder: "rgba(168,85,247,0.35)" },
    { accent: "#06b6d4", glow: "rgba(6,182,212,0.22)",   iconBg: "rgba(6,182,212,0.15)",  iconBorder: "rgba(6,182,212,0.35)"  },
  ]
  const p = palette[index % palette.length]

  return (
    <div
      ref={cardRef}
      className="value-card"
      style={{
        "--d": `${delay}ms`,
        "--accent": p.accent,
        "--glow": p.glow,
        "--icon-bg": p.iconBg,
        "--icon-border": p.iconBorder,
        "--icon-color": p.accent,
        "--gx": `${tilt.gx}%`,
        "--gy": `${tilt.gy}%`,
        transform: hovered && window.innerWidth > 1024
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(10px)`
          : "perspective(900px) rotateX(0deg) rotateY(0deg)",
      }}
      onMouseMove={window.innerWidth > 1024 ? handleMove : undefined}
      onMouseEnter={() => window.innerWidth > 1024 && setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x:0, y:0, gx:50, gy:50 }) }}
    >
      {/* Corner glow */}
      <div className="vc-corner-glow" style={{ opacity: hovered ? 1 : 0.5 }} />
      {/* Mouse-follow shine */}
      <div className="vc-shine" style={{ opacity: hovered ? 1 : 0 }} />
      {/* Ghost icon background */}
      <div className="vc-ghost-icon" aria-hidden><Icon size={96} strokeWidth={0.8} /></div>
      {/* Icon */}
      <div className="vc-icon-wrap">
        <Icon size={22} />
      </div>
      <h4 className="vc-title">{title}</h4>
      <p className="vc-text">{text}</p>
      {/* Bottom accent bar */}
      <div className="vc-bar" />
    </div>
  )
}

function TeamMember({ name, role, img, delay }) {
  const [hov, setHov] = useState(false)
  return (
    <div className="team-card" style={{ "--d": `${delay}ms` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div className="team-img-wrap">
        <img src={img} alt={name} className="team-img" style={{ transform: hov ? "scale(1.06)" : "scale(1)" }} />
        <div className="team-overlay" style={{ opacity: hov ? 1 : 0 }}>
          <div className="team-overlay-content">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
          </div>
        </div>
      </div>
      <div className="team-info">
        <div className="team-name">{name}</div>
        <div className="team-role">{role}</div>
      </div>
    </div>
  )
}

/* ─── Goal Item Component ─── */
function GoalItem({ text, icon: Icon, color, num, delay, active }) {
  const [hov, setHov] = useState(false)
  return (
    <li
      className={`goal-item ${active ? "goal-in" : ""}`}
      style={{ "--d": `${delay}ms`, "--gc": color }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="goal-icon-bg" style={{ background: `${color}22`, borderColor: `${color}44` }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div className="goal-body">
        <span className="goal-num-label" style={{ color }}>{String(num).padStart(2, "0")}</span>
        <p className="goal-text">{text}</p>
      </div>
      <div className="goal-corner-num" aria-hidden>{String(num).padStart(2, "0")}</div>
      <div className="goal-bottom-bar" style={{ background: `linear-gradient(90deg, ${color}, transparent)`, opacity: hov ? 1 : 0 }} />
    </li>
  )
}

export default function App() {
  const mouse = useMouseParallax()
  const [heroRef, heroIn] = useReveal(0.05)
  const [storyRef, storyIn] = useReveal(0.1)
  const [missionRef, missionIn] = useReveal(0.1)
  const [valuesRef, valuesIn] = useReveal(0.1)
  const [statsRef, statsIn] = useReveal(0.2)
  const [teamRef, teamIn] = useReveal(0.1)
  const [ctaRef, ctaIn] = useReveal(0.15)
  const [videoOpen, setVideoOpen] = useState(false)

  const values = [
    { icon: Heart, title: "თანაგრძნობა", text: "თითოეულ პაციენტს ვუყურებთ, როგორც ოჯახის წევრს — სითბოთი და პატივისცემით." },
    { icon: Award, title: "ხარისხი", text: "საერთაშორისო სტანდარტების მკურნალობა და დადასტურებული მეთოდები." },
    { icon: Users, title: "გუნდურობა", text: "მულტიდისციპლინური მიდგომა — ექიმები, თერაპევტები და ფსიქოლოგები ერთ გუნდად." },
    { icon: Sparkles, title: "ინოვაცია", text: "თანამედროვე აღჭურვილობა და მუდმივად განახლებული მეთოდიკები." },
    { icon: Shield, title: "სანდოობა", text: "გამჭვირვალე კომუნიკაცია და სრული პასუხისმგებლობა ყოველ ნაბიჯზე." },
    { icon: Zap, title: "ეფექტურობა", text: "სწრაფი, ზუსტი დიაგნოსტიკა და ოპტიმიზებული სამკურნალო პროცესები." }
  ]

  const goals = [
    { text: "ვაბრუნებთ პაციენტებს სრულფასოვან ცხოვრებაში", icon: Activity, color: "#f43f5e" },
    { text: "ვქმნით ინდივიდუალურ რეაბილიტაციის გეგმას", icon: ClipboardList, color: "#2885ef" },
    { text: "ვამცირებთ აღდგენის დროს თანამედროვე მეთოდებით", icon: Zap, color: "#F7B731" },
    { text: "ვუზრუნველყოფთ უწყვეტ მხარდაჭერას მკურნალობის შემდეგაც", icon: Shield, color: "#10b981" }
  ]

  const stats = [
    { num: "12+", label: "წლიანი გამოცდილება" },
    { num: "5000+", label: "გამოჯანმრთელებული პაციენტი" },
    { num: "25+", label: "ექსპერტი სპეციალისტი" },
    { num: "98%", label: "კმაყოფილების მაჩვენებელი" }
  ]

  const team = [
    { name: "ირმა ხვიჩია", role: "დამფუძნებელი & მთავარი ექიმი", img: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1" },
    { name: "გიორგი მამულაძე", role: "ნეიროლოგი", img: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1" },
    { name: "ნინო ბერიძე", role: "ფიზიოთერაპევტი", img: "https://images.pexels.com/photos/5214953/pexels-photo-5214953.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1" },
    { name: "დავით კვარაცხელია", role: "ორთოპედი-ტრავმატოლოგი", img: "https://images.pexels.com/photos/6129049/pexels-photo-6129049.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1" }
  ]

  return (
    <>
      <style>{css}</style>

      {videoOpen && (
        <div className="modal-backdrop" onClick={() => setVideoOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setVideoOpen(false)}>✕</button>
            <div className="modal-video-placeholder">
              <Stethoscope size={64} strokeWidth={1} />
              <p>ვიდეო პრეზენტაცია</p>
            </div>
          </div>
        </div>
      )}

      <main className="page">
        {/* HERO */}
        <section ref={heroRef} className={`hero ${heroIn ? "in" : ""}`}>
          <div className="hero-blobs" aria-hidden>
            <div className="blob blob-1" style={{ transform: `translate(${mouse.x * 18}px, ${mouse.y * 12}px)` }} />
            <div className="blob blob-2" style={{ transform: `translate(${mouse.x * -14}px, ${mouse.y * -10}px)` }} />
            <div className="blob blob-3" style={{ transform: `translate(${mouse.x * 10}px, ${mouse.y * 16}px)` }} />
          </div>
          <div className="hero-grid" aria-hidden />
          <div className="hero-inner">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              ჩვენს შესახებ
              <span className="hero-badge-sep" />
              2013 — დღემდე
            </div>
            <h1 className="hero-h1">
              <span className="hero-line hero-line-1">ვართ <em className="gold">ერთგული</em></span>
              <span className="hero-line hero-line-2">თქვენი ჯანმრთელობის</span>
              <span className="hero-line hero-line-3">
                <span className="hero-word-outline">ყოველ</span>{" "}
                <span className="hero-word-outline">ნაბიჯზე</span>
              </span>
            </h1>
            <p className="hero-sub">
              ირმა ხვიჩიას რეაბილიტაციის ცენტრი — სადაც გამოცდილება, მზრუნველობა
              და თანამედროვე მედიცინა იყრის თავს ერთ სივრცეში.
            </p>
            <div className="hero-actions">
              <a href="/contact" className="btn btn-primary">კონსულტაცია <ArrowRight size={16} /></a>
              <button className="btn btn-ghost" onClick={() => setVideoOpen(true)}>
                <span className="play-ring"><Play size={13} fill="currentColor" /></span>
                ვიდეო პრეზენტაცია
              </button>
            </div>
            <div className="hero-trust">
              {["ISO სერტიფიკატი", "12+ წელი", "5000+ პაციენტი"].map(t => (
                <span key={t} className="trust-badge"><CheckCircle2 size={13} />{t}</span>
              ))}
            </div>
          </div>
          <a href="#story" className="scroll-cue" aria-hidden><ChevronDown size={20} /></a>
          <div className="chip chip-1" aria-hidden>
            <div className="chip-num">98<span>%</span></div>
            <div className="chip-lbl">კმაყოფილება</div>
          </div>
          <div className="chip chip-2" aria-hidden>
            <Heart size={16} fill="currentColor" />
            <div className="chip-lbl">5000+ გამოჯ.</div>
          </div>
        </section>

        {/* STORY */}
        <section id="story" ref={storyRef} className={`section story ${storyIn ? "in" : ""}`}>
          <div className="container story-grid">
            <div className="story-text">
              <span className="eyebrow"><span className="eyebrow-bar" />ჩვენი ისტორია</span>
              <h2 className="h2">გზა, რომელიც <span className="gold">ერთგულებით</span> დაიწყო</h2>
              <p className="story-lead">
                ცენტრი დაარსდა იმ მარტივი იდეით, რომ რეაბილიტაცია უნდა იყოს
                ხელმისაწვდომი, ღირსეული და მაქსიმალურად ეფექტური. წლების
                განმავლობაში ჩვენ შევქმენით სივრცე, სადაც პაციენტი არასოდეს გრძნობს თავს მარტოდ.
              </p>
              <p className="story-body">
                დღეს ვართ ერთ-ერთი წამყვანი რეაბილიტაციის ცენტრი საქართველოში —
                გუნდით, რომელსაც აერთიანებს ერთი მთავარი მიზანი: დაბრუნება სრულფასოვან ცხოვრებაში.
              </p>
              <div className="story-milestones">
                {[
                  { year: "2013", text: "ცენტრის დაარსება" },
                  { year: "2017", text: "ISO სერტიფიკაციის მოპოვება" },
                  { year: "2020", text: "ახალი კლინიკის გახსნა" },
                  { year: "2024", text: "5000+ წარმატებული შემთხვევა" }
                ].map((m, i) => (
                  <div key={m.year} className="milestone" style={{ "--d": `${i * 80}ms` }}>
                    <div className="milestone-year">{m.year}</div>
                    <div className="milestone-dot" />
                    <div className="milestone-text">{m.text}</div>
                  </div>
                ))}
              </div>
              <blockquote className="quote-block">
                <div className="quote-bar" />
                <Quote size={18} className="quote-icon" />
                <p className="quote-text">"ჩვენი მისია არ მთავრდება მკურნალობით — ის იწყება მაშინ, როცა პაციენტი იღიმება."</p>
                <cite className="quote-cite">— ირმა ხვიჩია, დამფუძნებელი</cite>
              </blockquote>
            </div>
            <div className="story-visual" aria-hidden>
              <div className="sv-img-wrap">
                <img src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800" alt="clinic" className="sv-img" />
                <div className="sv-img-overlay" />
              </div>
              <div className="sv-card sv-card-year">
                <div className="sv-big">2013</div>
                <div className="sv-small">დაარსების წელი</div>
              </div>
              <div className="sv-card sv-card-award">
                <Award size={22} className="sv-icon" />
                <div className="sv-small">ISO სერტ.</div>
              </div>
              <div className="sv-decoration" />
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section ref={missionRef} className={`section mission ${missionIn ? "in" : ""}`}>
          <div className="container">
            <div className="section-head">
              <span className="eyebrow"><span className="eyebrow-bar" />მიზანი და ხედვა</span>
              <h2 className="h2">ვიღებთ <span className="gold">პასუხისმგებლობას</span></h2>
            </div>

            <div className="mission-grid">
              {/* MISSION CARD */}
              <article className="mc mc-mission">
                <div className="mc-holo" aria-hidden />
                <div className="mc-bg-label" aria-hidden>MISSION</div>
                <div className="mc-icon-ring">
                  <div className="mc-icon-pulse" />
                  <div className="mc-icon-inner"><Target size={26} /></div>
                </div>
                <div className="mc-tag">01</div>
                <h3 className="h3">მისია</h3>
                <p className="body">
                  მივცეთ ყველა პაციენტს შესაძლებლობა — დაუბრუნდეს მოძრაობის
                  თავისუფლებას, აქტიურ ცხოვრებას და საკუთარ თავში რწმენას.
                </p>
                <div className="mc-footer">
                  <div className="mc-footer-dot mc-dot-blue" />
                  <div className="mc-footer-dot mc-dot-blue" style={{ opacity: 0.5 }} />
                  <div className="mc-footer-dot mc-dot-blue" style={{ opacity: 0.25 }} />
                </div>
              </article>

              {/* VISION CARD */}
              <article className="mc mc-vision">
                <div className="mc-holo mc-holo-gold" aria-hidden />
                <div className="mc-bg-label" aria-hidden>VISION</div>
                <div className="mc-icon-ring mc-icon-ring-gold">
                  <div className="mc-icon-pulse mc-icon-pulse-gold" />
                  <div className="mc-icon-inner mc-icon-inner-gold"><Compass size={26} /></div>
                </div>
                <div className="mc-tag mc-tag-gold">02</div>
                <h3 className="h3 h3-gold">ხედვა</h3>
                <p className="body">
                  ვიყოთ რეგიონის ლიდერი — სადაც საერთაშორისო ხარისხი ხვდება
                  ქართულ მზრუნველობას, ყოველი შემთხვევა კი წარმატების ისტორიად იქცევა.
                </p>
                <div className="mc-footer">
                  <div className="mc-footer-dot mc-dot-gold" />
                  <div className="mc-footer-dot mc-dot-gold" style={{ opacity: 0.5 }} />
                  <div className="mc-footer-dot mc-dot-gold" style={{ opacity: 0.25 }} />
                </div>
              </article>

              {/* GOALS CARD */}
              <article className="mc mc-goals">
                <div className="mc-holo mc-holo-multi" aria-hidden />
                <div className="mc-goals-header">
                  <div className="mc-icon-ring mc-icon-ring-green">
                    <div className="mc-icon-pulse mc-icon-pulse-green" />
                    <div className="mc-icon-inner mc-icon-inner-green"><CheckCircle2 size={24} /></div>
                  </div>
                  <div>
                    <div className="mc-tag mc-tag-green">03</div>
                    <h3 className="h3 h3-green">მიზნები</h3>
                  </div>
                </div>

                <ul className="goals-list">
                  {goals.map((g, i) => (
                    <GoalItem
                      key={i}
                      text={g.text}
                      icon={g.icon}
                      color={g.color}
                      num={i + 1}
                      delay={i * 100}
                      active={missionIn}
                    />
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section ref={valuesRef} className={`section values ${valuesIn ? "in" : ""}`}>
          <div className="container">
            <div className="section-head">
              <span className="eyebrow"><span className="eyebrow-bar" />ჩვენი ღირებულებები</span>
              <h2 className="h2">პრინციპები, რომლებიც <span className="gold">გვმართავს</span></h2>
              <p className="body section-sub" style={{color:"var(--muted)"}}>ყოველი გადაწყვეტილება, ყოველი ნაბიჯი — ეს ღირებულებებით არის განსაზღვრული.</p>
            </div>
            <div className="values-grid">
              {values.map((v, i) => <ValueCard key={v.title} {...v} delay={i * 80} index={i} />)}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section ref={statsRef} className={`section stats-section ${statsIn ? "in" : ""}`}>
          <div className="container">
            <div className="stats-wrap">
              <div className="stats-left">
                <span className="eyebrow eyebrow-light"><span className="eyebrow-bar eyebrow-bar-gold" />ჩვენი შედეგები</span>
                <h2 className="h2 h2-light">რიცხვები, <span className="gold">რომლებიც</span> საუბრობენ</h2>
                <p className="body body-light">12 წლის განმავლობაში ჩვენ ათასობით ადამიანს დავეხმარეთ სრულ გამოჯანმრთელებაში.</p>
              </div>
              <div className="stats-right">
                {stats.map((s, i) => (
                  <StatItem key={s.label} num={s.num} label={s.label} delay={i * 100} active={statsIn} />
                ))}
              </div>
              <div className="stats-glow" aria-hidden />
              <div className="stats-dots" aria-hidden />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;500;600;700;800;900&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }
html, body, #root { width: 100%; overflow-x: hidden; scroll-behavior: smooth; }

:root {
  --navy:  #0D1B35;
  --navy2: #172340;
  --navy3: #1E2D4E;
  --blue:  #2885ef;
  --blue2: #1A6DD4;
  --gold:  #F7B731;
  --gold2: #F5961A;
  --cream: #F4EFE6;
  --cream2:#EDE8DF;
  --ink:   #111827;
  --ink2:  #1f2a3c;
  --muted: #556070;
  --white: #ffffff;
  --r8:    8px;
  --r16:   16px;
  --r24:   24px;
  --r32:   32px;
}

.page {
  font-family: 'Noto Sans Georgian', system-ui, sans-serif;
  background: var(--cream);
  color: var(--ink);
  width: 100%;
  overflow-x: hidden;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 60px);
  width: 100%;
}

.section {
  padding: clamp(72px, 10vw, 128px) 0;
  position: relative;
  width: 100%;
  overflow-x: hidden;
}

.gold {
  background: linear-gradient(115deg, var(--gold) 0%, var(--gold2) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--blue);
  margin-bottom: 16px;
}
.eyebrow-light { color: rgba(255,255,255,0.55); }
.eyebrow-bar {
  width: 30px; height: 2px; border-radius: 2px;
  background: linear-gradient(90deg, var(--gold), var(--gold2));
  flex-shrink: 0;
}
.eyebrow-bar-gold { background: linear-gradient(90deg, var(--gold), var(--gold2)); }

.h2 {
  font-size: clamp(28px, 4.2vw, 52px);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: var(--ink);
  margin: 0 0 20px;
}
.h2-light { color: #fff; }
.h3 {
  font-size: clamp(18px, 1.8vw, 22px);
  font-weight: 800;
  letter-spacing: -0.015em;
  margin: 0 0 12px;
  color: var(--gold);
}
.h3-gold { color: var(--gold); }
.h3-green { color: #10b981; }
.body {
  font-size: clamp(14.5px, 1.1vw, 16.5px);
  line-height: 1.85;
  color: var(--muted);
  font-weight: 400;
  margin: 0 0 18px;
}
.body-light { color: rgba(255,255,255,0.65); }
.mc .body, .stats-wrap .body { color: rgba(255,255,255,0.62); }
.section-sub { max-width: 560px; margin: 0 auto; }
.section-head { text-align: center; margin-bottom: clamp(40px, 6vw, 64px); }
.section-head .eyebrow { justify-content: center; }

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 28px;
  border-radius: 100px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  border: none;
  transition: transform .22s ease, box-shadow .22s ease, background .22s ease;
  white-space: nowrap;
}
.btn-primary {
  background: linear-gradient(108deg, var(--blue) 0%, var(--blue2) 100%);
  color: #fff;
  box-shadow: 0 6px 24px rgba(40,133,239,0.38);
}
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(40,133,239,0.55); }
.btn-primary svg { transition: transform .2s ease; }
.btn-primary:hover svg { transform: translateX(4px); }
.btn-ghost {
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.18);
}
.btn-ghost:hover { background: rgba(255,255,255,0.16); transform: translateY(-2px); }
.play-ring {
  width: 30px; height: 30px; border-radius: 50%;
  background: linear-gradient(135deg, var(--gold), var(--gold2));
  display: flex; align-items: center; justify-content: center;
  color: var(--navy); flex-shrink: 0;
}

/* ── HERO ── */
.hero {
  min-height: clamp(600px, 88vh, 860px);
  background: radial-gradient(ellipse at 18% 55%, rgba(40,133,239,0.28) 0%, transparent 50%),
              radial-gradient(ellipse at 78% 25%, rgba(247,183,49,0.15) 0%, transparent 45%),
              radial-gradient(ellipse at 85% 80%, rgba(40,133,239,0.12) 0%, transparent 40%),
              linear-gradient(150deg, #0D1B35 0%, #172340 50%, #1E2D4E 100%);
  position: relative;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(120px, 16vw, 180px) clamp(20px, 5vw, 60px) clamp(80px, 12vw, 120px);
  color: #fff;
  width: 100%;
}
.hero-blobs { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.blob { position: absolute; border-radius: 50%; filter: blur(80px); will-change: transform; transition: transform 2s cubic-bezier(.25,.1,.25,1); }
.blob-1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(40,133,239,0.22), transparent 70%); top: -200px; right: -150px; }
.blob-2 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(247,183,49,0.14), transparent 70%); bottom: -200px; left: -100px; }
.blob-3 { width: 350px; height: 350px; background: radial-gradient(circle, rgba(40,133,239,0.1), transparent 70%); top: 40%; right: 30%; }
.hero-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image: linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
}
.hero-inner { position: relative; z-index: 2; text-align: center; max-width: 900px; width: 100%; }
.hero-badge {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 9px 22px;
  background: rgba(247,183,49,0.1);
  border: 1px solid rgba(247,183,49,0.32);
  border-radius: 100px;
  font-size: 11.5px; font-weight: 600; letter-spacing: 0.06em; color: var(--gold);
  margin-bottom: 36px;
  opacity: 0; transform: translateY(16px);
  transition: opacity .6s ease, transform .6s ease;
}
.hero.in .hero-badge { opacity: 1; transform: none; }
.hero-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--gold); animation: pulse 2s ease-in-out infinite; }
.hero-badge-sep { width: 1px; height: 14px; background: rgba(247,183,49,0.3); }
.hero-h1 {
  font-size: clamp(36px, 6.5vw, 82px); font-weight: 900; line-height: 1.04;
  letter-spacing: -0.038em; margin: 0 0 28px;
  display: flex; flex-direction: column; align-items: center; gap: 4px;
}
.hero-line { display: block; overflow: hidden; }
.hero-line span, .hero-line em { display: inline-block; }
.hero-line-1, .hero-line-2, .hero-line-3 { opacity: 0; transform: translateY(40px); transition: opacity .7s ease, transform .7s ease; }
.hero.in .hero-line-1 { opacity: 1; transform: none; transition-delay: .1s; }
.hero.in .hero-line-2 { opacity: 1; transform: none; transition-delay: .2s; }
.hero.in .hero-line-3 { opacity: 1; transform: none; transition-delay: .3s; }
.hero-word-outline { -webkit-text-stroke: 1.5px rgba(255,255,255,0.45); color: transparent; }
.hero-sub {
  font-size: clamp(15px, 1.5vw, 18px); line-height: 1.72;
  color: rgba(255,255,255,0.6); font-weight: 300;
  max-width: 580px; margin: 0 auto 36px;
  opacity: 0; transform: translateY(18px);
  transition: opacity .65s ease .38s, transform .65s ease .38s;
}
.hero.in .hero-sub { opacity: 1; transform: none; }
.hero-actions {
  display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap;
  margin-bottom: 32px; opacity: 0; transform: translateY(14px);
  transition: opacity .6s ease .48s, transform .6s ease .48s;
}
.hero.in .hero-actions { opacity: 1; transform: none; }
.hero-trust {
  display: flex; align-items: center; justify-content: center; gap: 18px; flex-wrap: wrap;
  opacity: 0; transition: opacity .6s ease .62s;
}
.hero.in .hero-trust { opacity: 1; }
.trust-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.5); }
.trust-badge svg { color: var(--gold); }
.scroll-cue {
  position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
  display: flex; align-items: center; justify-content: center;
  width: 40px; height: 40px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.5);
  text-decoration: none;
  animation: scrollBob 2s ease-in-out infinite;
  opacity: 0; transition: opacity .6s ease .8s;
}
.hero.in .scroll-cue { opacity: 1; }
.chip {
  position: absolute; z-index: 3;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(16px) saturate(1.6);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: var(--r16);
  padding: 14px 18px;
  display: flex; flex-direction: column; gap: 4px; pointer-events: none;
}
.chip-1 { left: clamp(16px, 4vw, 60px); top: 35%; animation: floatA 7s ease-in-out infinite; }
.chip-2 { right: clamp(16px, 4vw, 60px); bottom: 28%; flex-direction: row; align-items: center; gap: 10px; animation: floatB 8s ease-in-out infinite; color: var(--gold); }
.chip-num { font-size: 28px; font-weight: 900; color: #fff; letter-spacing: -0.03em; line-height: 1; }
.chip-num span { font-size: 18px; }
.chip-lbl { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.55); letter-spacing: 0.04em; }
.chip-2 .chip-lbl { color: rgba(255,255,255,0.7); }
@media (max-width: 640px) { .chip { display: none; } }

/* ── STORY ── */
.story { background: var(--cream); }
.story-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(40px, 6vw, 80px); align-items: center; }
@media (max-width: 900px) { .story-grid { grid-template-columns: 1fr; } }
.story-text > * { opacity: 0; transform: translateY(22px); transition: opacity .55s ease, transform .55s ease; }

/* Story typography */
.story-lead {
  font-size: clamp(15.5px, 1.3vw, 18px);
  line-height: 1.85;
  color: var(--ink2);
  font-weight: 500;
  margin: 0 0 18px;
  padding-left: 18px;
  border-left: 3px solid var(--gold);
  font-style: italic;
}
.story-lead::first-letter {
  font-size: 2.4em;
  font-weight: 900;
  line-height: 0.78;
  margin: 4px 10px 0 0;
  background: linear-gradient(135deg, var(--gold), var(--gold2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-style: normal;
}
.story-body {
  font-size: clamp(14.5px, 1.1vw, 16px);
  line-height: 1.85;
  color: var(--muted);
  font-weight: 400;
  margin: 0 0 18px;
  padding-left: 18px;
  border-left: 1.5px solid rgba(13,27,53,0.1);
}
.story.in .story-text > *:nth-child(1) { opacity:1; transform:none; transition-delay:.0s; }
.story.in .story-text > *:nth-child(2) { opacity:1; transform:none; transition-delay:.08s; }
.story.in .story-text > *:nth-child(3) { opacity:1; transform:none; transition-delay:.16s; }
.story.in .story-text > *:nth-child(4) { opacity:1; transform:none; transition-delay:.24s; }
.story.in .story-text > *:nth-child(5) { opacity:1; transform:none; transition-delay:.32s; }
.story.in .story-text > *:nth-child(6) { opacity:1; transform:none; transition-delay:.4s; }
.story-milestones { display: flex; flex-direction: column; gap: 0; margin: 28px 0; position: relative; }
.story-milestones::before {
  content: ''; position: absolute; left: 48px; top: 12px; bottom: 12px;
  width: 1px; background: linear-gradient(180deg, var(--gold) 0%, rgba(247,183,49,0.15) 100%);
}
.milestone {
  display: flex; align-items: center; gap: 20px; padding: 12px 0;
  opacity: 0; transform: translateX(-16px);
  transition: opacity .5s ease var(--d), transform .5s ease var(--d);
}
.story.in .milestone { opacity: 1; transform: none; }
.milestone-year { width: 48px; text-align: right; font-size: 12px; font-weight: 800; color: var(--blue); letter-spacing: 0.02em; flex-shrink: 0; }
.milestone-dot { width: 10px; height: 10px; border-radius: 50%; background: linear-gradient(135deg, var(--gold), var(--gold2)); flex-shrink: 0; position: relative; z-index: 1; box-shadow: 0 0 0 4px rgba(247,183,49,0.15); }
.milestone-text { font-size: 14px; font-weight: 600; color: var(--ink2); }
.quote-block { position: relative; margin: 8px 0 0; padding: 24px 28px 22px 36px; background: var(--white); border-radius: 0 var(--r16) var(--r16) 0; box-shadow: 0 8px 40px rgba(13,27,53,0.08), 0 2px 8px rgba(13,27,53,0.04); overflow: hidden; }
.quote-bar { position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, var(--gold), var(--gold2)); border-radius: 4px 0 0 4px; }
.quote-icon { position: absolute; top: 18px; right: 20px; color: var(--gold); opacity: 0.4; }
.quote-text { font-size: 16px; font-style: italic; font-weight: 600; color: var(--ink2); line-height: 1.7; margin: 0 0 12px; }
.quote-cite { font-size: 12px; font-weight: 700; color: var(--blue); letter-spacing: 0.05em; font-style: normal; }
.story-visual { position: relative; height: clamp(380px, 44vw, 500px); opacity: 0; transform: translateX(32px) scale(0.97); transition: opacity .8s ease .18s, transform .8s ease .18s; }
.story.in .story-visual { opacity: 1; transform: none; }
.sv-img-wrap { position: absolute; inset: 0 0 0 10%; border-radius: var(--r24); overflow: hidden; box-shadow: 0 32px 64px rgba(13,27,53,0.22); }
.sv-img { width: 100%; height: 100%; object-fit: cover; }
.sv-img-overlay { position: absolute; inset: 0; background: linear-gradient(160deg, rgba(13,27,53,0.1) 0%, rgba(13,27,53,0.5) 100%); }
.sv-card { position: absolute; background: var(--white); border-radius: var(--r16); box-shadow: 0 16px 48px rgba(13,27,53,0.18); padding: 18px 22px; display: flex; flex-direction: column; gap: 4px; }
.sv-card-year { bottom: 10%; left: -4%; animation: floatA 7s ease-in-out infinite; }
.sv-card-award { top: 12%; left: -2%; flex-direction: row; align-items: center; gap: 12px; padding: 14px 18px; background: linear-gradient(135deg, var(--navy), var(--navy2)); color: var(--gold); animation: floatB 8s ease-in-out infinite; }
.sv-card-award .sv-small { color: rgba(255,255,255,0.8); }
.sv-big { font-size: 34px; font-weight: 900; color: var(--navy); letter-spacing: -0.03em; line-height: 1; }
.sv-small { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); }
.sv-icon { color: var(--gold); }
.sv-decoration { position: absolute; top: -6%; right: -6%; width: 140px; height: 140px; border-radius: 50%; border: 1.5px dashed rgba(247,183,49,0.3); animation: spin 24s linear infinite; pointer-events: none; }
.sv-decoration::after { content: ''; position: absolute; top: 12px; left: 12px; right: 12px; bottom: 12px; border-radius: 50%; border: 1px dashed rgba(40,133,239,0.2); }

/* ════════════════════════════════════
   MISSION SECTION — COMPLETELY REDESIGNED
════════════════════════════════════ */
.mission { background: var(--white); }

.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 820px) { .mission-grid { grid-template-columns: 1fr; } }

/* Base card */
.mc {
  padding: clamp(28px, 3.5vw, 44px);
  border-radius: 28px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity .65s ease, transform .65s ease, box-shadow .3s ease;
  background: linear-gradient(145deg, #0c1b36 0%, #15253f 50%, #1c2f52 100%);
  border: 1px solid rgba(255,255,255,0.07);
}
.mission.in .mc { opacity: 1; transform: none; }
.mission.in .mc:nth-child(2) { transition-delay: .12s; }
.mission.in .mc:nth-child(3) { transition-delay: .24s; }
.mc:hover { box-shadow: 0 28px 64px rgba(13,27,53,0.35); }

/* Holographic shimmer layer */
.mc-holo {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at 15% 15%, rgba(40,133,239,0.22) 0%, transparent 55%),
              radial-gradient(ellipse at 85% 80%, rgba(40,133,239,0.1) 0%, transparent 50%);
  opacity: 1;
  transition: opacity .4s ease;
}
.mc-holo-gold {
  background: radial-gradient(ellipse at 20% 15%, rgba(247,183,49,0.22) 0%, transparent 55%),
              radial-gradient(ellipse at 80% 85%, rgba(245,150,26,0.12) 0%, transparent 50%);
}
.mc-holo-multi {
  background: radial-gradient(ellipse at 5% 10%, rgba(40,133,239,0.18) 0%, transparent 45%),
              radial-gradient(ellipse at 90% 90%, rgba(16,185,129,0.15) 0%, transparent 45%),
              radial-gradient(ellipse at 50% 50%, rgba(247,183,49,0.08) 0%, transparent 60%);
}

/* Big decorative background word */
.mc-bg-label {
  position: absolute;
  bottom: -16px;
  right: -8px;
  font-size: clamp(64px, 8vw, 100px);
  font-weight: 900;
  letter-spacing: -0.05em;
  color: rgba(255,255,255,0.025);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

/* Icon ring with pulse */
.mc-icon-ring {
  position: relative;
  width: 62px;
  height: 62px;
  margin-bottom: 22px;
  flex-shrink: 0;
}
.mc-icon-pulse {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1.5px solid rgba(40,133,239,0.3);
  animation: ringPulse 3s ease-in-out infinite;
}
.mc-icon-pulse-gold { border-color: rgba(247,183,49,0.35); animation: ringPulseGold 3s ease-in-out infinite; }
.mc-icon-pulse-green { border-color: rgba(16,185,129,0.35); animation: ringPulseGreen 3s ease-in-out infinite; }

.mc-icon-inner {
  width: 62px;
  height: 62px;
  border-radius: 18px;
  background: rgba(40,133,239,0.15);
  border: 1px solid rgba(40,133,239,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--blue);
  position: relative;
  z-index: 1;
}
.mc-icon-inner-gold {
  background: rgba(247,183,49,0.14);
  border-color: rgba(247,183,49,0.32);
  color: var(--gold);
}
.mc-icon-inner-green {
  background: rgba(16,185,129,0.14);
  border-color: rgba(16,185,129,0.3);
  color: #10b981;
}
.mc-icon-ring-gold .mc-icon-inner { background: rgba(247,183,49,0.14); border-color: rgba(247,183,49,0.32); color: var(--gold); }
.mc-icon-ring-green .mc-icon-inner { background: rgba(16,185,129,0.14); border-color: rgba(16,185,129,0.3); color: #10b981; }

/* Tag (01 / 02 / 03) */
.mc-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  padding: 4px 10px;
  border-radius: 100px;
  background: rgba(40,133,239,0.15);
  border: 1px solid rgba(40,133,239,0.28);
  color: var(--blue);
  margin-bottom: 10px;
}
.mc-tag-gold { background: rgba(247,183,49,0.12); border-color: rgba(247,183,49,0.28); color: var(--gold); }
.mc-tag-green { background: rgba(16,185,129,0.12); border-color: rgba(16,185,129,0.28); color: #10b981; }

/* Footer dots */
.mc-footer { display: flex; align-items: center; gap: 6px; margin-top: 24px; }
.mc-footer-dot { width: 6px; height: 6px; border-radius: 50%; }
.mc-dot-blue { background: var(--blue); }
.mc-dot-gold { background: var(--gold); }

/* Goals card header */
.mc-goals {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, #0c1b36 0%, #152542 40%, #1b3050 100%);
}
@media (max-width: 820px) { .mc-goals { grid-column: auto; } }

.mc-goals-header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 28px;
}
.mc-goals-header .mc-icon-ring { margin-bottom: 0; }
.mc-goals-header > div:last-child { display: flex; flex-direction: column; justify-content: center; gap: 4px; }

/* ──────────────────────────────
   GOAL ITEMS — COMPLETELY NEW
────────────────────────────── */
.goals-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
@media (max-width: 640px) { .goals-list { grid-template-columns: 1fr; } }

.goal-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 20px 22px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  cursor: default;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity .55s ease var(--d), transform .55s ease var(--d), background .25s ease, border-color .25s ease;
}
.goal-item.goal-in { opacity: 1; transform: none; }
.goal-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 0% 100%, color-mix(in srgb, var(--gc, #2885ef) 12%, transparent) 0%, transparent 65%);
  pointer-events: none;
  opacity: 0;
  transition: opacity .35s ease;
}
.goal-item:hover::before { opacity: 1; }
.goal-item:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.13); }

/* Color accent icon box */
.goal-icon-bg {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform .25s ease;
}
.goal-item:hover .goal-icon-bg { transform: scale(1.1) rotate(-4deg); }

/* Text block */
.goal-body {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  min-width: 0;
}
.goal-num-label {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.9;
}
.goal-text {
  font-size: clamp(13px, 1vw, 14.5px);
  font-weight: 600;
  color: rgba(255,255,255,0.82);
  line-height: 1.55;
  margin: 0;
}

/* Large decorative number in corner */
.goal-corner-num {
  position: absolute;
  bottom: -8px;
  right: 10px;
  font-size: 72px;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: rgba(255,255,255,0.025);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

/* Bottom gradient bar on hover */
.goal-bottom-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  transition: opacity .3s ease;
}

/* Drop cap */
.drop-cap {
  float: left;
  font-size: 4.8em;
  font-weight: 900;
  line-height: 0.76;
  margin: 4px 14px 0 0;
  padding: 14px 17px 16px;
  background: linear-gradient(145deg, var(--navy) 0%, var(--navy2) 60%, var(--navy3) 100%);
  color: var(--gold);
  border-radius: 16px;
  box-shadow:
    0 12px 32px rgba(13,27,53,0.22),
    0 0 0 1px rgba(247,183,49,0.2),
    inset 0 1px 0 rgba(255,255,255,0.06);
  font-style: normal;
  position: relative;
  letter-spacing: -0.02em;
}
.drop-cap::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: radial-gradient(circle at 30% 30%, rgba(247,183,49,0.18), transparent 65%);
  pointer-events: none;
}

.story-lead {
  font-size: clamp(15.5px, 1.3vw, 17.5px);
  line-height: 1.85;
  color: var(--ink2);
  font-weight: 500;
  margin: 0 0 20px;
  padding-left: 18px;
  border-left: 3px solid var(--gold);
  overflow: hidden;
}
.story-body {
  font-size: clamp(14.5px, 1.1vw, 16px);
  line-height: 1.85;
  color: var(--muted);
  font-weight: 400;
  margin: 0 0 18px;
  padding-left: 18px;
  border-left: 1.5px solid rgba(13,27,53,0.1);
}

/* ══ VALUES — DARK CARD REDESIGN ══ */
.values { background: var(--cream); }
.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
@media (max-width: 900px) { .values-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 540px)  { .values-grid { grid-template-columns: 1fr; } }

.value-card {
  position: relative;
  padding: 32px 28px 30px;
  background: linear-gradient(145deg, #0c1b36 0%, #15253f 55%, #1c2f52 100%);
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.07);
  overflow: hidden;
  cursor: default;
  will-change: transform;
  transition: transform .3s cubic-bezier(.25,.1,.25,1), box-shadow .3s ease, border-color .35s ease;
  opacity: 0;
  transform: translateY(28px);
  box-shadow: 0 8px 32px rgba(13,27,53,0.18);
}
.values.in .value-card {
  opacity: 1;
  transform: translateY(0);
  transition-delay: var(--d);
}
.value-card:hover {
  border-color: color-mix(in srgb, var(--accent) 40%, transparent);
  box-shadow: 0 24px 56px rgba(13,27,53,0.3), 0 0 0 1px color-mix(in srgb, var(--accent) 25%, transparent);
}

/* Corner glow — always slightly visible, stronger on hover */
.vc-corner-glow {
  position: absolute;
  top: -60px;
  right: -60px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--glow, rgba(247,183,49,0.22)), transparent 70%);
  pointer-events: none;
  transition: opacity .4s ease, transform .4s ease;
}
.value-card:hover .vc-corner-glow {
  transform: scale(1.3);
}

/* Mouse-follow shine */
.vc-shine {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--gx, 50%) var(--gy, 50%),
    rgba(255,255,255,0.07) 0%,
    transparent 55%
  );
  pointer-events: none;
  transition: opacity .25s ease;
  z-index: 0;
}

/* Ghost icon — large semi-transparent in bottom-right */
.vc-ghost-icon {
  position: absolute;
  bottom: -16px;
  right: -16px;
  color: rgba(255,255,255,0.04);
  pointer-events: none;
  user-select: none;
  transition: transform .4s ease, color .4s ease;
  z-index: 0;
}
.value-card:hover .vc-ghost-icon {
  color: color-mix(in srgb, var(--accent) 10%, transparent);
  transform: scale(1.08) rotate(-6deg);
}

/* Icon wrap */
.vc-icon-wrap {
  position: relative;
  z-index: 1;
  width: 52px;
  height: 52px;
  border-radius: 15px;
  background: var(--icon-bg, rgba(247,183,49,0.15));
  border: 1px solid var(--icon-border, rgba(247,183,49,0.3));
  color: var(--icon-color, var(--gold));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: transform .3s ease, box-shadow .3s ease;
}
.value-card:hover .vc-icon-wrap {
  transform: scale(1.08) rotate(-4deg);
  box-shadow: 0 8px 24px color-mix(in srgb, var(--accent) 30%, transparent);
}

.vc-title {
  position: relative;
  z-index: 1;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.015em;
  color: rgba(255,255,255,0.93);
  margin: 0 0 10px;
}
.vc-text {
  position: relative;
  z-index: 1;
  font-size: 13.5px;
  line-height: 1.72;
  color: rgba(255,255,255,0.52);
  margin: 0;
  transition: color .3s ease;
}
.value-card:hover .vc-text { color: rgba(255,255,255,0.68); }

/* Bottom accent bar */
.vc-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2.5px;
  background: linear-gradient(90deg, var(--accent, var(--gold)) 0%, transparent 80%);
  opacity: 0;
  transition: opacity .35s ease;
  z-index: 2;
}
.value-card:hover .vc-bar { opacity: 1; }

@media (hover: none) {
  .vc-bar       { opacity: 0.6; }
  .vc-corner-glow { opacity: 0.6; }
  .vc-ghost-icon  { color: color-mix(in srgb, var(--accent) 8%, transparent); }
}

/* ── STATS ── */
.stats-section { padding-top: 0; }
.stats-wrap {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: clamp(40px, 5vw, 72px);
  align-items: center;
  padding: clamp(48px, 6vw, 72px) clamp(40px, 5vw, 64px);
  border-radius: var(--r32);
  background: radial-gradient(ellipse at 20% 60%, rgba(40,133,239,0.25) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 25%, rgba(247,183,49,0.15) 0%, transparent 45%),
              linear-gradient(145deg, var(--navy) 0%, var(--navy2) 50%, var(--navy3) 100%);
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(13,27,53,0.3);
  border: 1px solid rgba(255,255,255,0.06);
}
@media (max-width: 800px) { .stats-wrap { grid-template-columns: 1fr; } }
.stats-left > * { opacity: 0; transform: translateY(20px); transition: opacity .6s ease, transform .6s ease; }
.stats-section.in .stats-left > *:nth-child(1) { opacity:1; transform:none; transition-delay:.0s; }
.stats-section.in .stats-left > *:nth-child(2) { opacity:1; transform:none; transition-delay:.1s; }
.stats-section.in .stats-left > *:nth-child(3) { opacity:1; transform:none; transition-delay:.2s; }
.stats-right { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 500px) { .stats-right { grid-template-columns: 1fr; } }
.stat-item {
  padding: 22px 24px;
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(10px);
  border-radius: var(--r16);
  border: 1px solid rgba(255,255,255,0.1);
  text-align: center;
  opacity: 0; transform: translateY(20px);
  transition: opacity .7s ease var(--d), transform .7s ease var(--d), background .25s ease;
}
.stats-section.in .stat-item { opacity: 1; transform: none; }
.stat-num {
  font-size: clamp(32px, 4.5vw, 52px); font-weight: 900; line-height: 1;
  letter-spacing: -0.04em;
  background: linear-gradient(120deg, var(--gold), var(--gold2));
  -webkit-background-clip: text; background-clip: text; color: transparent;
  margin-bottom: 8px;
}
.stat-label { font-size: 12.5px; font-weight: 500; color: rgba(255,255,255,0.6); letter-spacing: 0.02em; }
.stats-glow { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse at 75% 50%, rgba(40,133,239,0.12), transparent 60%); }
.stats-dots {
  position: absolute; right: 0; top: 0; bottom: 0; width: 240px; pointer-events: none;
  background-image: radial-gradient(circle, rgba(247,183,49,0.18) 1px, transparent 1px);
  background-size: 20px 20px;
  mask-image: linear-gradient(to left, rgba(0,0,0,0.5), transparent);
  -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,0.5), transparent);
}

/* ── MODAL ── */
.modal-backdrop { position: fixed; inset: 0; z-index: 1000; background: rgba(13,27,53,0.85); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; animation: fadeIn .25s ease; }
.modal-box { position: relative; width: min(600px, 92vw); background: var(--navy2); border-radius: var(--r24); overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 40px 80px rgba(0,0,0,0.4); animation: scaleIn .3s cubic-bezier(.25,.1,.25,1); }
.modal-close { position: absolute; top: 14px; right: 14px; width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,0.1); border: none; color: rgba(255,255,255,0.7); font-size: 16px; cursor: pointer; z-index: 1; transition: background .2s; }
.modal-close:hover { background: rgba(255,255,255,0.2); }
.modal-video-placeholder { aspect-ratio: 16/9; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; color: rgba(255,255,255,0.4); }
.modal-video-placeholder p { font-size: 14px; font-weight: 500; }

/* ── TOUCH FIXES ── */
@media (hover: hover) {
  .value-card:hover { box-shadow: 0 24px 56px rgba(13,27,53,0.12); }
}
@media (hover: none) {
  .value-accent-bar { opacity: 1; }
  .value-shine { opacity: 0; }
  .goal-item::before { opacity: 0.6; }
}

/* ── ANIMATIONS ── */
@keyframes pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.4); }
}
@keyframes floatA {
  0%,100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(1deg); }
}
@keyframes floatB {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes scrollBob {
  0%,100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(6px); }
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes ringPulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.18); opacity: 0.2; }
}
@keyframes ringPulseGold {
  0%, 100% { transform: scale(1); opacity: 0.55; }
  50% { transform: scale(1.18); opacity: 0.18; }
}
@keyframes ringPulseGreen {
  0%, 100% { transform: scale(1); opacity: 0.55; }
  50% { transform: scale(1.18); opacity: 0.18; }
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
  [class].in * { opacity: 1 !important; transform: none !important; }
  .goal-item { opacity: 1 !important; transform: none !important; }
}
`