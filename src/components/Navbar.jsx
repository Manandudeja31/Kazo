import { useState } from "react";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";
import Logo from "./Logo";

const navLinks = [
  { name: "HOME", id: "home" },
  { name: "ABOUT US", id: "about" },
  { name: "PORTFOLIO", id: "portfolio" },
  { name: "CONTACT", id: "contact" },
];

export default function Navbar({ onNavClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState("");

  const handleNavClick = (id) => {
    setMenuOpen(false);
    setSelectedLink(id);

    if (onNavClick) {
      onNavClick(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#0d0d0d]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1700px] items-center justify-between px-5 sm:px-8 lg:px-14 py-2">
        {/* Sharp High-Clarity Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="cursor-pointer text-left bg-transparent border-none p-0 focus:outline-none"
          aria-label="Kazo Home"
        >
          <Logo />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.id)}
              className={`relative py-7 text-[10px] font-semibold tracking-[1.5px] cursor-pointer transition-colors ${
                link.id === selectedLink
                  ? "text-[#e8bb68]"
                  : "text-[#aaa39a] hover:text-[#e8bb68]"
              }`}
            >
              {link.name}

              {link.id === selectedLink && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#e8bb68]" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="text-right">
            <p className="mb-1 text-[8px] tracking-[1px] text-[#777]">
              DIRECT INQUIRIES
            </p>

            <a
              href="tel:+918810369142"
              className="text-xs font-semibold tracking-wider text-[#e8bb68] hover:text-[#f3cd82] transition"
            >
              +91 88103 69142
            </a>
          </div>

          <button
            onClick={() => handleNavClick("contact")}
            className="rounded bg-[#e8bb68] px-5 py-3 text-[10px] font-semibold tracking-[1.5px] text-black transition hover:bg-[#f3cd82] cursor-pointer"
          >
            BOOK CONSULTATION
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded border border-white/20 text-[#e8bb68] lg:hidden cursor-pointer"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-[#0d0d0d] transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-6 py-5">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left border-b border-white/5 py-4 text-[11px] font-semibold tracking-[1.5px] cursor-pointer ${
                link.id === selectedLink ? "text-[#e8bb68]" : "text-[#aaa39a]"
              }`}
            >
              {link.name}
            </button>
          ))}

          <div className="mt-5">
            <p className="text-[9px] tracking-[1px] text-[#777]">
              DIRECT INQUIRIES
            </p>

            <a
              href="tel:+918810369142"
              className="mt-1 block text-sm text-[#e7bb68] hover:text-[#f4d186]"
            >
              +91 88103 69142
            </a>

            <button
              onClick={() => handleNavClick("contact")}
              className="mt-4 w-full bg-[#e7bb68] py-3 text-[10px] font-semibold tracking-wide text-black cursor-pointer hover:bg-[#f5d084] transition"
            >
              BOOK CONSULTATION
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
