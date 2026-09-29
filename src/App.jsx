import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Philosophy from "./components/Philosophy";
import Process from "./components/Process";
import Transformations from "./components/Transformations";
import Artisans from "./components/Artisans";
import Testimonials from "./components/Testimonials";
import Journal from "./components/Journal";
import Consultation from "./components/Consultation";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import CategoryDetailPage from "./components/CategoryDetailPage";

function parseCategoryFromHash() {
  const hash = window.location.hash || "";
  const match = hash.match(/^#\/?category\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function App() {
  const [categorySlug, setCategorySlug] = useState(() => parseCategoryFromHash());

  useEffect(() => {
    const handleHashChange = () => {
      const slug = parseCategoryFromHash();
      setCategorySlug(slug);
      if (slug) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSelectCategory = (slug) => {
    window.location.hash = `#/category/${slug}`;
    setCategorySlug(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    window.location.hash = "#portfolio";
    setCategorySlug(null);
    setTimeout(() => {
      const el = document.getElementById("portfolio");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);
  };

  const handleNavClick = (id) => {
    if (categorySlug) {
      window.location.hash = `#${id}`;
      setCategorySlug(null);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 80);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-[#f4f1ec] selection:bg-[#e8b95d]/30 selection:text-[#f4f1ec]">
      {/* Universal Navbar */}
      <Navbar onNavClick={handleNavClick} />

      {/* Main Content: Category Page or Full Landing Page */}
      {categorySlug ? (
        <CategoryDetailPage
          categorySlug={categorySlug}
          onBack={handleBackToHome}
          onSelectCategory={handleSelectCategory}
        />
      ) : (
        <>
          <Hero />
          <About />
          <Portfolio onSelectCategory={handleSelectCategory} />
          <Philosophy />
          <Process />
          <Transformations />
          <Artisans />
          <Testimonials />
          <Journal />
          <Consultation />
        </>
      )}

      {/* Universal Footer */}
      <Footer onNavClick={handleNavClick} />

      {/* Universal Floating WhatsApp CTA */}
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
