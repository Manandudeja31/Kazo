import logo from "../assets/logo.jpeg";

export default function Logo({ size = "navbar", className = "" }) {
  if (size === "footer") {
    return (
      <a
        href="#home"
        className={`group flex items-center gap-3.5 select-none transition-all duration-300 ${className}`}
        aria-label="Kazo Home"
      >
        {/* Emblem */}
        <div className="relative h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-lg bg-[#0e0e0e] border border-[#e8b95d]/40 shadow-lg shadow-[#e8b95d]/10 flex items-center justify-center transition-all duration-300 group-hover:border-[#e8b95d] group-hover:shadow-[#e8b95d]/25">
          <img
            src={logo}
            alt="KAZO Logo Emblem"
            className="h-[155%] w-[155%] max-w-none object-cover object-center -translate-y-1.5 filter contrast-125 brightness-120 drop-shadow-[0_2px_10px_rgba(232,185,93,0.45)] transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Vector Text */}
        <div className="flex flex-col text-left">
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-[24px] sm:text-[28px] font-bold tracking-[4px] text-[#f4efe8] leading-none transition-colors group-hover:text-[#e8b95d]">
              KAZO
            </span>
            <span className="text-[10px] font-bold text-[#e8b95d] leading-none">
              TM
            </span>
          </div>
          <span className="text-[8.5px] sm:text-[9.5px] font-semibold tracking-[3px] text-[#e8b95d] mt-1.5 leading-none uppercase">
            Glass & Door
          </span>
        </div>
      </a>
    );
  }

  // Navbar default: Sharp, visible, beautifully integrated
  return (
    <a
      href="#home"
      className={`group flex items-center gap-3 select-none transition-all duration-300 ${className}`}
      aria-label="Kazo Home"
    >
      {/* Precision Emblem Container - Zooms in to crop out dead black margins and enhances contrast & gold luster */}
      <div className="relative h-12 w-12 sm:h-14 sm:w-14 overflow-hidden rounded-md bg-[#12110e] border border-[#e8b95d]/40 shadow-md shadow-[#e8b95d]/15 flex items-center justify-center transition-all duration-300 group-hover:border-[#e8b95d] group-hover:shadow-[#e8b95d]/30">
        <img
          src={logo}
          alt="KAZO Logo"
          className="object-center object-cover -translate-y-1 filter contrast-130 brightness-125 drop-shadow-[0_2px_8px_rgba(232,185,93,0.5)] transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Razor-sharp Vector Brand Typography - 100% crisp on all displays */}
      <div className="flex flex-col text-left justify-center">
        <div className="flex items-baseline gap-1">
          <span className="font-serif text-[20px] sm:text-[23px] font-bold tracking-[3.5px] text-[#f4efe8] leading-none transition-colors duration-300 group-hover:text-[#e8b95d]">
            KAZO
          </span>
          <span className="text-[8px] sm:text-[9px] font-bold text-[#e8b95d] leading-none">
            TM
          </span>
        </div>
        <span className="text-[7.5px] sm:text-[8px] font-semibold tracking-[2.8px] text-[#e8b95d] mt-1.5 leading-none uppercase">
          Glass & Door
        </span>
      </div>
    </a>
  );
}
