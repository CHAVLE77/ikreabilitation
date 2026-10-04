import { useEffect, useState } from "react";
import logo from "/public/ikr.webp"; // ← ლოგოს გზა შეასწორე შენი პროექტის მიხედვით

/**
 * PageLoader — საიტის გახსნისას ლოგოს zoom ანიმაცია (მხოლოდ მთავარ გვერდზე).
 * თეთრი ეკრანი თავიდანვე სრულად ფარავს საიტს, ლოგო შიგნიდან იზრდება (scale),
 * პროგრესის ხაზი ივსება, შემდეგ ლოგო ოდნავ იზრდება და ეკრანი ქრება. ~1.8 წამი.
 */

const DURATION = 1800; // ms — შეგიძლია შეცვალო

const BLUE = "#0B5CC6";
const YELLOW = "#FFC629";

export default function PageLoader() {
  // მხოლოდ საიტის გახსნისას და მხოლოდ მთავარ გვერდზე
  const [active, setActive] = useState(
    () => window.location.pathname === "/"
  );

  // სანამ ლოადერი ჩანს, სქროლს ვბლოკავთ და თავში ვაჩერებთ
  useEffect(() => {
    if (!active) return;
    window.scrollTo(0, 0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      window.scrollTo(0, 0);
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <style>{css}</style>
      <div
        className="pl-overlay"
        role="status"
        aria-label="იტვირთება"
        onAnimationEnd={(e) => {
          if (e.target === e.currentTarget) {
            setActive(false);
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          }
        }}
      >
        <div className="pl-center">
          <div className="pl-glow" />
          <img
            className="pl-logo"
            src={logo}
            alt="ირმა ხვიჩიას რეაბილიტაციის ცენტრი"
            draggable={false}
          />
          <div className="pl-track">
            <div className="pl-fill" />
          </div>
        </div>
      </div>
    </>
  );
}

const css = `
.pl-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  height: 100vh;
  height: 100dvh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
  animation: pl-overlay ${DURATION}ms both;
}

.pl-center {
  position: relative;
  width: min(72vw, 340px);
  display: flex;
  flex-direction: column;
  align-items: center;
  will-change: transform, opacity;
  animation: pl-exit ${DURATION}ms both;
}

.pl-glow {
  position: absolute;
  top: 38%;
  left: 50%;
  width: 130%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%) scale(.4);
  border-radius: 50%;
  background: radial-gradient(circle, ${YELLOW}40 0%, ${BLUE}14 45%, transparent 70%);
  opacity: 0;
  animation: pl-glow 1100ms 100ms cubic-bezier(.16, 1, .3, 1) both;
}

.pl-logo {
  position: relative;
  width: 100%;
  height: auto;
  mix-blend-mode: multiply;
  user-select: none;
  opacity: 0;
  transform: scale(.55);
  filter: blur(8px);
  will-change: transform, opacity, filter;
  animation: pl-zoom 800ms 120ms cubic-bezier(.16, 1, .3, 1) both;
}

.pl-track {
  position: relative;
  width: 56%;
  height: 4px;
  margin-top: 6px;
  border-radius: 4px;
  background: ${BLUE}1A;
  overflow: hidden;
  opacity: 0;
  animation: pl-fade 300ms 450ms ease-out both;
}
.pl-fill {
  height: 100%;
  width: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, ${BLUE}, ${YELLOW});
  transform-origin: left center;
  transform: scaleX(0);
  animation: pl-fill 800ms 450ms cubic-bezier(.45, 0, .2, 1) both;
}

/* ეკრანი თავიდან სრულად ფარავს საიტს, ბოლოს ქრება */
@keyframes pl-overlay {
  0%, 74% { opacity: 1; }
  100%    { opacity: 0; }
}
/* ბოლოს ლოგო ოდნავ იზრდება და ქრება */
@keyframes pl-exit {
  0%, 72% { opacity: 1; transform: scale(1); }
  100%    { opacity: 0; transform: scale(1.18); }
}
/* შესვლა — ლოგო შიგნიდან იზრდება */
@keyframes pl-zoom {
  0%   { opacity: 0; transform: scale(.55); filter: blur(8px); }
  60%  { opacity: 1; filter: blur(0); }
  100% { opacity: 1; transform: scale(1); filter: blur(0); }
}
@keyframes pl-glow {
  0%   { opacity: 0; transform: translate(-50%, -50%) scale(.4); }
  50%  { opacity: 1; }
  100% { opacity: .85; transform: translate(-50%, -50%) scale(1); }
}
@keyframes pl-fade { to { opacity: 1; } }
@keyframes pl-fill { to { transform: scaleX(1); } }

/* მომხმარებლებისთვის, ვისაც მოძრაობა გამორთული აქვს */
@media (prefers-reduced-motion: reduce) {
  .pl-center { animation: none; }
  .pl-glow { display: none; }
  .pl-logo { animation: pl-fade 200ms both; transform: none; filter: none; }
  .pl-fill { animation: pl-fill 700ms 200ms linear both; }
}
`;