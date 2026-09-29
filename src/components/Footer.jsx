import { useState } from "react";
import { FiArrowUp, FiCheck, FiMail } from "react-icons/fi";
import Logo from "./Logo";

export default function Footer({ onNavClick }) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (e, id) => {
    if (onNavClick) {
      e.preventDefault();
      onNavClick(id);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#060606] text-left border-t border-white/10 pt-20 pb-12 px-6 sm:px-10 md:px-20">
      <div className="mx-auto max-w-[1700px]">
        {/* ================= TOP SECTION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14 pb-16 border-b border-white/5">
          {/* Col 1: Brand & Logo */}
          <div className="flex flex-col justify-between">
            <div>
              <button
                onClick={(e) => handleLinkClick(e, "home")}
                className="text-left bg-transparent border-none p-0 cursor-pointer block mb-6"
                aria-label="Kazo Home"
              >
                <Logo size="footer" />
              </button>
              <p className="text-[12px] sm:text-[13px] leading-[1.8] text-[#8e8880] max-w-sm">
                Kazo Glass & Door™ — Masters of bespoke architectural glazing,
                precision pivot doors, and custom sliding systems. Elevating
                residential and commercial spaces with refined practicality.
              </p>
            </div>

            <div className="mt-8">
              <span className="text-[10px] font-bold tracking-[2px] text-[#e8b95d]">
                SHOWROOM & STUDIOS:
              </span>
              <p className="text-[11px] text-[#666] mt-1">
                Rajouri Garden, Delhi
              </p>
            </div>
          </div>

          {/* Col 2: Experience Centres */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[2px] text-[#e8b95d] uppercase mb-6">
              Experience Centres
            </h4>

            <ul className="space-y-4 text-[12px] text-[#8e8880]">
              <li>
                <strong className="block text-white text-[12px]">
                  DELHI FLAGSHIP SHOWROOM
                </strong>
                <span>
                  Experience full-scale pivot doors, acoustic sliding
                  partitions, and walk-in shower suites in person
                </span>
              </li>
              {/* <li>
                <strong className="block text-white text-[12px]">
                  GURUGRAM DESIGN STUDIO
                </strong>
                <span>
                  Consultations for architects, designers, and homeowners with
                  full glass and frame samples
                </span>
              </li> */}
              <li>
                <strong className="block text-white text-[12px]">
                  CENTRAL WORKSHOP
                </strong>
                <span>
                  In-house precision cutting, tempering, custom frame joinery,
                  and pre-fit testing
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[2px] text-[#e8b95d] uppercase mb-6">
              Quick Links
            </h4>

            <ul className="space-y-3 text-[12px] text-[#9a948c]">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleLinkClick(e, "home")}
                  className="hover:text-[#e8b95d] transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, "about")}
                  className="hover:text-[#e8b95d] transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  onClick={(e) => handleLinkClick(e, "portfolio")}
                  className="hover:text-[#e8b95d] transition"
                >
                  Product Categories
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={(e) => handleLinkClick(e, "process")}
                  className="hover:text-[#e8b95d] transition"
                >
                  Our 6-Step Process
                </a>
              </li>
              <li>
                <a
                  href="#transformations"
                  onClick={(e) => handleLinkClick(e, "transformations")}
                  className="hover:text-[#e8b95d] transition"
                >
                  Before & After Transformations
                </a>
              </li>
              <li>
                <a
                  href="#artisans"
                  onClick={(e) => handleLinkClick(e, "artisans")}
                  className="hover:text-[#e8b95d] transition"
                >
                  Our Team & Craftsmen
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => handleLinkClick(e, "testimonials")}
                  className="hover:text-[#e8b95d] transition"
                >
                  Client Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#journal"
                  onClick={(e) => handleLinkClick(e, "journal")}
                  className="hover:text-[#e8b95d] transition"
                >
                  Design Guides & Tips
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Private Concierge & Newsletter */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[2px] text-[#e8b95d] uppercase mb-6">
              Stay in Touch
            </h4>

            <p className="text-[12px] leading-[1.7] text-[#8e8880] mb-4">
              Subscribe for new door designs, glass innovations, and helpful
              tips for your home or project.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded border border-white/10 bg-[#111] px-4 py-2.5 text-[12px] text-white placeholder-[#555] focus:border-[#e8b95d] focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#e8b95d] text-black rounded text-[10px] font-bold hover:bg-[#f5d084] transition"
                >
                  JOIN
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-2 text-[11px] text-[#e8b95d]">
                  <FiCheck size={12} />
                  <span>Subscribed to updates</span>
                </div>
              )}
            </form>

            <div className="mt-8 pt-4 border-t border-white/5 space-y-3">
              <div>
                <p className="text-[9px] font-bold tracking-[1.5px] text-[#777] uppercase">
                  DIRECT EMAIL INQUIRIES:
                </p>
                <a
                  href="mailto:kazoglassndoor@gmail.com"
                  className="text-[12px] text-[#e8b95d] hover:underline font-medium break-all"
                >
                  kazoglassndoor@gmail.com
                </a>
              </div>

              <div>
                <p className="text-[9px] font-bold tracking-[1.5px] text-[#777] uppercase">
                  WHATSAPP DIRECT:
                </p>
                <a
                  href="https://wa.me/918810369142"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] text-white hover:text-[#25D366] transition font-medium"
                >
                  +91 88103 69142
                </a>
              </div>

              <div>
                <p className="text-[9px] font-bold tracking-[1.5px] text-[#777] uppercase">
                  ALTERNATIVE HELPLINES:
                </p>
                <div className="flex flex-col text-[11px] text-[#bbb] mt-0.5 space-y-0.5">
                  <a
                    href="tel:+919217505300"
                    className="hover:text-[#e8b95d] transition"
                  >
                    +91 92175 05300
                  </a>
                  <a
                    href="tel:+919315201616"
                    className="hover:text-[#e8b95d] transition"
                  >
                    +91 93152 01616
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-[11px] text-[#666]">
          <p>
            © {new Date().getFullYear()} KAZO GLASS & DOOR™. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-6">
            {/* <span className="hover:text-[#999] cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-[#999] cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-[#999] cursor-pointer">
              Warranty & Support
            </span> */}

            {/* Back to top */}
            {/* <button
              onClick={scrollToTop}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#181818] text-[#e8b95d] hover:bg-[#e8b95d] hover:text-black transition cursor-pointer"
              aria-label="Back to top"
            >
              <FiArrowUp size={14} />
            </button> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
