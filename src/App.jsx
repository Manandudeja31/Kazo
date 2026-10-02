import { useEffect, useState } from "react";
import "./App.css";
import About from "./components/About";
import BlogDetailPage from "./components/BlogDetailPage";
import CategoryDetailPage from "./components/CategoryDetailPage";
import Consultation from "./components/Consultation";
import ExploreBlogsPage from "./components/ExploreBlogsPage";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Journal from "./components/Journal";
import Navbar from "./components/Navbar";
import Philosophy from "./components/Philosophy";
import Portfolio from "./components/Portfolio";
import Process from "./components/Process";
import Teams from "./components/Teams";
import Testimonials from "./components/Testimonials";
import Transformations from "./components/Transformations";

function parseRouteFromHash() {
  const hash = window.location.hash || "";

  // Blog Detail: #/blog/:slug or #/journal/:slug
  const blogDetailMatch = hash.match(/^#\/?(?:blog|journal)\/([a-zA-Z0-9_-]+)/);
  if (blogDetailMatch) {
    return { type: "blog-detail", slug: blogDetailMatch[1] };
  }

  // Explore All Blogs: #/blogs or #blogs
  if (hash === "#/blogs" || hash === "#blogs") {
    return { type: "blogs" };
  }

  // Category Detail: #/category/:slug
  const categoryMatch = hash.match(/^#\/?category\/([a-zA-Z0-9_-]+)/);
  if (categoryMatch) {
    return { type: "category-detail", slug: categoryMatch[1] };
  }

  // Default to home page
  const section = hash.startsWith("#") ? hash.slice(1) : "";
  return { type: "home", section };
}

function App() {
  const [currentRoute, setCurrentRoute] = useState(() => parseRouteFromHash());

  useEffect(() => {
    const handleHashChange = () => {
      const route = parseRouteFromHash();
      setCurrentRoute(route);

      if (route.type === "home") {
        if (route.section) {
          setTimeout(() => {
            const el = document.getElementById(route.section);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 80);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Handlers for navigation
  const handleSelectBlog = (slug) => {
    window.location.hash = `#/blog/${slug}`;
    setCurrentRoute({ type: "blog-detail", slug });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExploreBlogs = () => {
    window.location.hash = "#/blogs";
    setCurrentRoute({ type: "blogs" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectCategory = (slug) => {
    window.location.hash = `#/category/${slug}`;
    setCurrentRoute({ type: "category-detail", slug });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = (section = null) => {
    if (section) {
      window.location.hash = `#${section}`;
      setCurrentRoute({ type: "home", section });
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 50);
    } else {
      window.location.hash = "";
      setCurrentRoute({ type: "home", section: "" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (id) => {
    if (id === "blogs") {
      handleExploreBlogs();
      return;
    }

    if (currentRoute.type !== "home") {
      window.location.hash = `#${id}`;
      setCurrentRoute({ type: "home", section: id });
      setTimeout(() => {
        if (id === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
      }, 100);
    } else {
      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-[#f4f1ec] selection:bg-[#e8b95d]/30 selection:text-[#f4f1ec]">
      {/* Universal Navbar */}
      <Navbar
        onNavClick={handleNavClick}
        currentRoute={currentRoute.type}
      />

      {/* Main Content Router */}
      {currentRoute.type === "blog-detail" ? (
        <BlogDetailPage
          blogSlug={currentRoute.slug}
          onBackToBlogs={handleExploreBlogs}
          onBackToHome={() => handleBackToHome("journal")}
          onSelectBlog={handleSelectBlog}
          onNavClick={handleNavClick}
        />
      ) : currentRoute.type === "blogs" ? (
        <ExploreBlogsPage
          onSelectBlog={handleSelectBlog}
          onBackToHome={() => handleBackToHome("journal")}
          onNavClick={handleNavClick}
        />
      ) : currentRoute.type === "category-detail" ? (
        <CategoryDetailPage
          categorySlug={currentRoute.slug}
          onBack={() => handleBackToHome("portfolio")}
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
          <Teams />
          <Testimonials />
          <Journal
            onSelectBlog={handleSelectBlog}
            onExploreBlogs={handleExploreBlogs}
          />
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
