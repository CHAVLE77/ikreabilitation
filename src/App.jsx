import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Services from "./components/services";
import Team from "./components/team";
import Contact from "./components/contact";
import Banner from "./components/banner";
import PageLoader from "./components/pageLoader";
// lazy-loaded routes — არ ჩაიტვირთება საწყის ბანდლში
const ServicesPage = lazy(() => import("./pages/servicesPage"));
const AboutPage = lazy(() => import("./pages/aboutPage"));
const TeamPage = lazy(() => import("./pages/teamPage"));
const GalleryPage = lazy(() => import("./pages/galleryPage"));
const AdminRoot = lazy(() => import("./admin/AdminRoot"));
const FizioPage = lazy(() => import("./pages/fizioPage"));
const FizikuriPage = lazy(() => import("./pages/fizikuriPage"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // გვერდის ჩატვირთვისას/დარეფრეშებისას თავში დაბრუნება
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // თუ ბრაუზერმა რენდერის შემდეგ სცადა წინა პოზიციაზე გადახტომა
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 50);

    const onBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

/* ───────────────────────────── */
/* Home Page */
/* ───────────────────────────── */

function HomePage() {
  return (
    <>
      <Hero />

      <div style={{ marginTop: "120px" }}>
        <About />
      </div>

      <div style={{ marginTop: "120px" }}>
        <Services />
      </div>

      <div style={{ marginTop: "120px" }}>
        <Team />
      </div>

      <div style={{ marginTop: "120px" }}>
        <Banner />
      </div>

      <div style={{ marginTop: "120px" }}>
        <Contact />
      </div>
    </>
  );
}

/* ───────────────────────────── */
/* App */
/* ───────────────────────────── */

function App() {
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      <PageLoader /> {/* ← ეს დაამატე */}

      {!isAdmin && <Navbar />}

      <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fizio" element={<FizioPage />} />
          <Route path="/fizikuri" element={<FizikuriPage />} />

          {/* ADMIN */}
          <Route path="/admin" element={<AdminRoot />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </>
  );
}
export default App;