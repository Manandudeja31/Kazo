import { useState } from "react";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";
import logo from "../assets/logo.jpeg";

const navLinks = [
  { name: "HOME", id: "home" },
  { name: "ABOUT US", id: "about" },
  { name: "PORTFOLIO & WORKS", id: "portfolio" },
];
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState("");

  const handleNavClick = (id) => {
    setMenuOpen(false);
    setSelectedLink(id);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#0d0d0d]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1700px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <img
          src={logo}
          alt="logo"
          className="h-10 w-fit object-contain border rounded-sm border-[#e8bb68]"
        />
        {/* Logo */}

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
              href="tel:+12128400210"
              className="flex items-center gap-1 text-[12px] font-medium text-[#e7bb68]"
            >
              <FiPhone size={11} />
              +1 (212) 840-0210
            </a>
          </div>

          <button className="h-9 border border-[#6e5b3d] bg-transparent px-5 text-[10px] font-semibold tracking-wide text-[#e7bb68] transition hover:bg-[#e7bb68] hover:text-black">
            BOOK CONSULTATION
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center border border-white/10 text-white xl:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-[#0d0d0d] transition-all duration-300 xl:hidden ${
          menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-6 py-5">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.id)}
              className={`block border-b border-white/5 py-4 text-[11px] font-semibold tracking-[1.5px] ${
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
              href="tel:+12128400210"
              className="mt-1 block text-sm text-[#e7bb68]"
            >
              +1 (212) 840-0210
            </a>

            <button className="mt-4 w-full bg-[#e7bb68] py-3 text-[10px] font-semibold tracking-wide text-black">
              BOOK CONSULTATION
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
