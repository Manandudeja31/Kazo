import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Philosophy from "./components/Philosophy";
import Process from "./components/Process";
import Artisans from "./components/Artisans";
import Testimonials from "./components/Testimonials";
import Journal from "./components/Journal";
import Consultation from "./components/Consultation";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[#090909] text-[#f4f1ec] selection:bg-[#e8b95d]/30 selection:text-[#f4f1ec]">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Philosophy />
      <Process />
      <Artisans />
      <Testimonials />
      <Journal />
      <Consultation />
      <Footer />
    </div>
  );
}

export default App;
