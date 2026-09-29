import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  const whatsappNumber = "918810369142";
  const defaultMessage = encodeURIComponent(
    "Hello Kazo Glass & Door, I would like to know more about your doors, windows, and glass solutions."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip / Prompt Label */}
      <div
        className={`pointer-events-none hidden sm:flex items-center rounded-full bg-[#121212]/95 border border-[#25D366]/40 px-4 py-2 text-[11px] font-semibold tracking-wide text-white shadow-xl shadow-black/80 backdrop-blur-md transition-all duration-300 ${hovered
          ? "opacity-100 translate-x-0"
          : "opacity-80 translate-x-1"
          }`}
      >
        <span className="flex h-2 w-2 rounded-full bg-[#25D366] mr-2 animate-ping" />
        <span>Chat on WhatsApp</span>
      </div>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Inquiry with Kazo Glass & Door"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 transition-all duration-300 hover:scale-110 hover:shadow-[#25D366]/60 focus:outline-none"
      >
        {/* Pulse Ripple Effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <FaWhatsapp size={32} className="relative z-10 transition-transform duration-300 group-hover:rotate-6" />

        {/* Notification Badge */}
        <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#090909] border border-[#25D366] text-[9px] font-bold text-[#25D366]">
          1
        </span>
      </a>
    </aside>
  );
}
