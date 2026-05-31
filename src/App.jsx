import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Services from "./components/services";
import Team from "./components/team";
import Gallery from "./components/gallery";
import Contact from "./components/contact";
import Banner from "./components/banner";

import ServicesPage from "./pages/servicesPage";
import AboutPage from "./pages/aboutPage";
import TeamPage from "./pages/teamPage";
import GalleryPage from "./pages/galleryPage";
import AdminRoot from "./admin/AdminRoot";

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

      <Gallery />

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
      {!isAdmin && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<Contact />} />

        {/* ADMIN (Supabase handles auth inside AdminRoot) */}
        <Route path="/admin" element={<AdminRoot />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;