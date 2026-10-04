import { useEffect, useRef, useState } from "react";
import { FiCompass } from "react-icons/fi";

export default function Philosophy() {
  const sectionRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalDistance = windowHeight + rect.height;
        const currentDistance = windowHeight - rect.top;
        const progress = currentDistance / totalDistance - 0.5;

        const targetY = progress * 140;
        setOffsetY(targetY);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 px-6 sm:px-10 text-center border-t border-b border-white/5 select-none"
    >
      <div
        className="pointer-events-none absolute inset-x-0 -top-[25%] -bottom-[25%] w-full h-[150%] overflow-hidden"
        style={{
          transform: `translate3d(0, ${offsetY}px, 0)`,
          willChange: "transform",
          transition: "transform 0.05s linear",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2400&auto=format&fit=crop"
          alt="Monolithic Architectural Sanctuary"
          className="h-full w-full object-cover object-center scale-105 filter brightness-75 contrast-110"
        />

        {/* Ambient Dark Overlays */}
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090909] via-black/40 to-[#090909]" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/50 to-black/80" />
      </div>

      {/* Subtle Golden Radial Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[650px] rounded-full bg-[#e8b95d]/10 blur-[130px]" />

      {/* ================= FOREGROUND CONTENT ================= */}
      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Decorative Gold Crest Icon */}
        <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-[#e8b95d]/50 bg-[#12110e]/90 text-[#e8b95d] shadow-xl shadow-[#e8b95d]/15 backdrop-blur-md transition-transform duration-300 hover:scale-105">
          <FiCompass size={22} />
        </div>

        {/* Big Serif Heading */}
        <blockquote className="font-serif text-[34px] sm:text-[48px] md:text-[56px] lg:text-[62px] leading-[1.15] text-[#f4efe8] drop-shadow-md">
          “Great design feels effortless, functional,{" "}
          <span className="font-serif italic font-normal text-[#e8b95d] drop-shadow-[0_2px_12px_rgba(232,185,93,0.3)]">
            and distinctly yours.”
          </span>
        </blockquote>

        {/* Subtext */}
        <p className="mx-auto mt-7 max-w-2xl text-[13px] sm:text-[15px] leading-[1.85] text-[#cfc8be] font-light">
          True quality doesn't have to shout. You experience it in how smoothly
          a door glides, the peaceful quiet of sound-insulated glass, and the
          warm, open feel of natural light flowing through your home.
        </p>

        {/* Gold Diamond Ornament Divider */}
        <div className="mx-auto mt-10 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#e8b95d]/60" />
          <span className="h-2 w-2 rotate-45 border border-[#e8b95d] bg-[#e8b95d]/40" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#e8b95d]/60" />
        </div>
      </div>
    </section>
  );
}
