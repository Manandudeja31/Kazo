import { useState } from "react";
import { FiArrowUp, FiCheck, FiMail } from "react-icons/fi";
import Logo from "./Logo";

export default function Footer() {
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

  return (
    <footer className="relative overflow-hidden bg-[#060606] text-left border-t border-white/10 pt-20 pb-12 px-6 sm:px-10 md:px-20">
      <div className="mx-auto max-w-[1700px]">
        {/* ================= TOP SECTION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14 pb-16 border-b border-white/5">
          {/* Col 1: Brand & Logo */}
          <div className="flex flex-col justify-between">
            <div>
              <Logo size="footer" className="mb-6" />
              <p className="text-[12px] sm:text-[13px] leading-[1.8] text-[#8e8880] max-w-sm">
                Atelier Obsidian bridges the rigor of classical European joinery
                with monolithic stone architecture. Curating ultra-prime private
                sanctuaries worldwide.
              </p>
            </div>

            <div className="mt-8">
              <span className="text-[10px] font-bold tracking-[2px] text-[#e8b95d]">
                REGISTERED BUREAUS:
              </span>
              <p className="text-[11px] text-[#666] mt-1">
                Zurich • New York • Milan • Dubai
              </p>
            </div>
          </div>

          {/* Col 2: Global Ateliers */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[2px] text-[#e8b95d] uppercase mb-6">
              Global Bureaus
            </h4>

            <ul className="space-y-4 text-[12px] text-[#8e8880]">
              <li>
                <strong className="block text-white text-[12px]">ZURICH ATELIER</strong>
                <span>Bahnhofstrasse 42, 8001 Zürich, Switzerland</span>
              </li>
              <li>
                <strong className="block text-white text-[12px]">NEW YORK BUREAU</strong>
                <span>740 Madison Avenue, New York, NY 10065</span>
              </li>
              <li>
                <strong className="block text-white text-[12px]">MILAN JOINERY</strong>
                <span>Via Montenapoleone 18, 20121 Milano, Italy</span>
              </li>
              <li>
                <strong className="block text-white text-[12px]">DUBAI SALON</strong>
                <span>DIFC Gate Village, Building 03, Dubai, UAE</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[2px] text-[#e8b95d] uppercase mb-6">
              Atelier Directory
            </h4>

            <ul className="space-y-3 text-[12px] text-[#9a948c]">
              <li>
                <a href="#home" className="hover:text-[#e8b95d] transition">
                  Principal Overview
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#e8b95d] transition">
                  Artisanal Heritage & Ethos
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#e8b95d] transition">
                  Curated Commissions (2020–2026)
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#e8b95d] transition">
                  5-Phase Execution Methodology
                </a>
              </li>
              <li>
                <a href="#artisans" className="hover:text-[#e8b95d] transition">
                  Master Joiners & Leadership
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#e8b95d] transition">
                  Client Perspectives & Endorsements
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-[#e8b95d] transition">
                  Materiality & Acoustic Journal
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Private Concierge & Newsletter */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[2px] text-[#e8b95d] uppercase mb-6">
              Private Dispatch
            </h4>

            <p className="text-[12px] leading-[1.7] text-[#8e8880] mb-4">
              Receive confidential biannual monographs on rare marble acquisitions,
              architectural acoustics, and private residential commissions.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter private email"
                  className="w-full rounded border border-white/10 bg-[#111] px-4 py-2.5 text-[12px] text-white placeholder-[#555] focus:border-[#e8b95d] focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#e8b95d] text-black rounded text-[10px] font-bold hover:bg-[#f5d084] transition"
                >
                  <FiMail size={13} />
                </button>
              </div>

              {subscribed && (
                <p className="text-[11px] text-[#e8b95d] flex items-center gap-1.5 mt-2">
                  <FiCheck size={13} />
                  <span>Subscribed to private atelier dispatches.</span>
                </p>
              )}
            </form>

            <div className="mt-8 pt-4 border-t border-white/5">
              <p className="text-[10px] tracking-[1px] text-[#777]">
                DIRECT CLIENT DESK:
              </p>
              <a
                href="mailto:concierge@atelierobsidian.com"
                className="text-[12px] text-[#e8b95d] hover:underline"
              >
                concierge@atelierobsidian.com
              </a>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#666]">
          <p>
            © {new Date().getFullYear()} KAZO / ATELIER OBSIDIAN. ALL RIGHTS
            RESERVED.
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#999] cursor-pointer">
              Privacy Protocols
            </span>
            <span className="hover:text-[#999] cursor-pointer">
              Bilateral NDA Terms
            </span>
            <span className="hover:text-[#999] cursor-pointer">
              Architectural Provenance
            </span>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#181818] text-[#e8b95d] hover:bg-[#e8b95d] hover:text-black transition"
              aria-label="Back to top"
            >
              <FiArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
