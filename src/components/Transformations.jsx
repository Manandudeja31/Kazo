import { useState, useRef, useEffect, useCallback } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "Grand Entrance Pivot Door",
    category: "Main Entrance Doors",
    location: "Private Villa, New Delhi",
    beforeImage: "/transformations/project1-before.jpg",
    afterImage: "/transformations/project1-after.jpg",
    beforeLabel: "Architectural Concept",
    afterLabel: "Completed Execution",
    description:
      "From technical architectural sketch to an imposing 3.8-meter tall glass and timber pivot door that glides open effortlessly with just a fingertip touch.",
    features: [
      "3.8m Single Leaf Pivot Door",
      "Concealed Hydraulic Floor Closer",
      "Toughened Clear Safety Glass",
    ],
  },
  {
    id: 2,
    title: "Acoustic Glass Sliding Partition",
    category: "Partitions & Sliding Systems",
    location: "Duplex Residence, Gurugram",
    beforeImage: "/transformations/project2-before.jpg",
    afterImage: "/transformations/project2-after.jpg",
    beforeLabel: "Room Layout Plan",
    afterLabel: "Installed Partition",
    description:
      "Replacing closed, dark walls with a floor-to-ceiling fluted glass sliding partition that lets daylight flow freely while maintaining quiet privacy.",
    features: [
      "Zero-Threshold Ceiling Recessed Track",
      "Textured Fluted Privacy Glass",
      "Ultra-Slim Black Aluminium Frame",
    ],
  },
  {
    id: 3,
    title: "Smoked Glass Walk-In Wardrobe",
    category: "Wardrobe Glass Doors",
    location: "Penthouse Suite, South Delhi",
    beforeImage: "/transformations/project3-before.jpg",
    afterImage: "/transformations/project3-after.jpg",
    beforeLabel: "Cabinetry Blueprint",
    afterLabel: "Finished Wardrobe",
    description:
      "Transforming ordinary closets into an open boutique dressing room with smoked bronze glass doors, soft-close dampers, and warm integrated LED lighting.",
    features: [
      "Smoked Bronze Tinted Glass",
      "Built-in 2700K Warm LED Channels",
      "Soft Air-Damped Sliding Shutters",
    ],
  },
  {
    id: 4,
    title: "Frameless Spa Shower Enclosure",
    category: "Shower Cubicles",
    location: "Master Bathroom, Noida",
    beforeImage: "/transformations/project4-before.jpg",
    afterImage: "/transformations/project4-after.jpg",
    beforeLabel: "Bathroom CAD Layout",
    afterLabel: "Installed Shower Suite",
    description:
      "Replacing cramped bathroom layouts with a clean, walk-in 10mm toughened glass shower cubicle, brushed brass fixtures, and a floating backlit LED mirror.",
    features: [
      "10mm Toughened Low-Iron Glass",
      "Brushed Gold Brass Hardware",
      "Anti-Spot Water-Repellent Coating",
    ],
  },
  {
    id: 5,
    title: "Panoramic Balcony Glass Railing",
    category: "Glass Railings & Balustrades",
    location: "Terrace Villa, Delhi NCR",
    beforeImage: "/transformations/project5-before.jpg",
    afterImage: "/transformations/project5-after.jpg",
    beforeLabel: "Structural Terrace Drawing",
    afterLabel: "Completed Balustrade",
    description:
      "Opening up the rooftop view with a continuous concealed-channel laminated glass railing and slimline aluminium sliding patio glass doors.",
    features: [
      "Concealed Base Shoe Floor Channel",
      "SentryGlas High-Impact Laminated Glass",
      "Unbroken Panoramic Horizon View",
    ],
  },
];

export default function Transformations() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);
  const thumbnailsRef = useRef(null);

  const currentProject = projects[activeIdx];

  // Update slider position based on clientX
  const updateSliderPosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    if (e.touches && e.touches[0]) {
      updateSliderPosition(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        updateSliderPosition(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleEnd);
      window.addEventListener("touchcancel", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
      window.removeEventListener("touchcancel", handleEnd);
    };
  }, [isDragging, updateSliderPosition]);

  // Navigate projects
  const handlePrevProject = () => {
    setActiveIdx((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setSliderPos(50);
  };

  const handleNextProject = () => {
    setActiveIdx((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setSliderPos(50);
  };

  const handleSelectProject = (idx) => {
    setActiveIdx(idx);
    setSliderPos(50);
  };

  return (
    <section
      id="transformations"
      className="relative overflow-hidden bg-[#090909] py-24 sm:py-28 lg:py-32 px-5 sm:px-8 md:px-14 lg:px-20 border-t border-white/5 text-left"
    >
      <div className="mx-auto max-w-[1700px]">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#e8b95d]" />
              <span className="text-[10px] font-semibold tracking-[2px] text-[#e8b95d] uppercase">
                From Design to Reality
              </span>
            </div>

            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[50px] leading-[1.1] text-[#f1eee9]">
              Before & After Transformations.{" "}
              <br className="hidden sm:inline" />
              <em className="text-[#e8b95d] not-italic italic font-serif">
                See the Craft in Action.
              </em>
            </h2>
          </div>

          <div className="max-w-[500px]">
            <p className="text-[13px] sm:text-[14px] leading-[1.8] text-[#9a948c]">
              Drag the slider on any image below to compare our architectural
              design blueprints with the completed on-site glass and door
              installations.
            </p>
          </div>
        </div>

        {/* ================= PROJECT SELECTOR TABS (SCROLLABLE) ================= */}
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          {/* Scrollable pill list */}
          <div
            ref={thumbnailsRef}
            className="no-scrollbar flex items-center gap-2 overflow-x-auto scroll-smooth py-1"
          >
            {projects.map((proj, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleSelectProject(idx)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-[#e8b95d] text-black shadow-lg shadow-[#e8b95d]/20 scale-102"
                      : "bg-[#141414] text-[#aaa] hover:text-white hover:bg-[#202020] border border-white/5"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${
                      isActive
                        ? "bg-black text-[#e8b95d]"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span>{proj.title}</span>
                </button>
              );
            })}
          </div>

          {/* Prev / Next Chevrons */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrevProject}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#161616] text-[#e8b95d] hover:bg-[#e8b95d] hover:text-black transition cursor-pointer"
              aria-label="Previous transformation project"
            >
              <FiChevronLeft size={16} />
            </button>
            <span className="text-[11px] font-semibold text-[#888] px-1">
              0{activeIdx + 1} / 0{projects.length}
            </span>
            <button
              onClick={handleNextProject}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#161616] text-[#e8b95d] hover:bg-[#e8b95d] hover:text-black transition cursor-pointer"
              aria-label="Next transformation project"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* ================= INTERACTIVE BEFORE/AFTER SLIDER STAGE ================= */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#111] shadow-2xl">
          {/* Visual Container */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="relative w-full h-[380px] sm:h-[480px] md:h-[560px] lg:h-[640px] select-none cursor-ew-resize overflow-hidden bg-black"
          >
            {/* 1. AFTER IMAGE (BASE FULL BACKGROUND) */}
            <img
              src={currentProject.afterImage}
              alt={`${currentProject.title} - Completed Installation`}
              className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
              draggable={false}
            />

            {/* 2. BEFORE IMAGE (CLIPPED USING CSS INSET) */}
            <img
              src={currentProject.beforeImage}
              alt={`${currentProject.title} - Architectural Design`}
              className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                WebkitClipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              }}
              draggable={false}
            />

            {/* Subtle Vignette Shadows */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* BEFORE PILL BADGE (Top Left - Exactly like the reference image) */}
            <div className="absolute top-5 left-5 z-20 pointer-events-none">
              <span className="rounded-lg bg-black/75 px-4 py-1.5 text-[11px] font-bold tracking-wider text-white uppercase backdrop-blur-md border border-white/20 shadow-lg">
                Before
              </span>
            </div>

            {/* AFTER PILL BADGE (Top Right) */}
            <div className="absolute top-5 right-5 z-20 pointer-events-none">
              <span className="rounded-lg bg-[#e8b95d]/90 px-4 py-1.5 text-[11px] font-bold tracking-wider text-black uppercase backdrop-blur-md shadow-lg">
                After
              </span>
            </div>

            {/* DRAGGABLE VERTICAL DIVIDER & CIRCULAR HANDLE (Identical to reference image) */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Vertical line */}
              <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)]" />

              {/* Center Circular Knob with < > Chevrons */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-white/95 text-neutral-800 shadow-[0_4px_24px_rgba(0,0,0,0.6)] border border-neutral-300 backdrop-blur-md transition-transform duration-150 ${
                  isDragging ? "scale-115 shadow-[#e8b95d]/40" : "scale-100"
                }`}
              >
                <div className="flex items-center text-neutral-700">
                  <FiChevronLeft size={16} className="-mr-1.5" />
                  <FiChevronRight size={16} className="-ml-1.5" />
                </div>
              </div>
            </div>

            {/* Bottom Drag Instruction Hint */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <span className="rounded-full bg-black/60 px-4 py-1.5 text-[10px] font-medium tracking-wider text-[#ddd] backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <FiChevronLeft size={12} className="text-[#e8b95d]" />
                <span>Drag slider left or right to compare</span>
                <FiChevronRight size={12} className="text-[#e8b95d]" />
              </span>
            </div>
          </div>

          {/* ================= DETAILS BAR UNDER SLIDER ================= */}
          <div className="p-6 sm:p-8 lg:p-10 bg-[#141414] border-t border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="rounded bg-[#e8b95d]/10 px-2.5 py-0.5 text-[9px] font-bold tracking-[1.5px] text-[#e8b95d] uppercase border border-[#e8b95d]/20">
                  {currentProject.category}
                </span>
                <span className="text-[11px] text-[#777]">•</span>
                <span className="text-[11px] text-[#aaa]">
                  {currentProject.location}
                </span>
              </div>

              <h3 className="font-serif text-[22px] sm:text-[26px] text-white">
                {currentProject.title}
              </h3>

              <p className="mt-2 text-[13px] leading-[1.7] text-[#9a948c]">
                {currentProject.description}
              </p>

              {/* Key Features Chips */}
              <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                {currentProject.features.map((feat, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1b1b1b] border border-white/5 px-3 py-1 text-[11px] text-[#cfc8be]"
                  >
                    <FiCheck size={12} className="text-[#e8b95d]" />
                    <span>{feat}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={`https://wa.me/918810369142?text=${encodeURIComponent(
                  `Hi Kazo, I saw your before/after transformation for "${currentProject.title}" and would like to know if something similar can be done for my space.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-6 py-3 text-[11px] font-bold tracking-wider text-black transition shadow-lg"
              >
                <FaWhatsapp size={15} />
                <span>Discuss Similar Project</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 px-6 py-3 text-[11px] font-semibold tracking-wider text-white transition"
              >
                <span>Book Free Site Visit</span>
                <FiArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* ================= 5 THUMBNAIL CARDS STRIP FOR QUICK SCROLLING ================= */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {projects.map((proj, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={proj.id}
                onClick={() => handleSelectProject(idx)}
                className={`group cursor-pointer rounded-xl overflow-hidden border p-2 transition-all duration-300 ${
                  isActive
                    ? "bg-[#1c1a15] border-[#e8b95d] shadow-lg shadow-[#e8b95d]/10 scale-102"
                    : "bg-[#111] border-white/5 hover:border-white/20 hover:bg-[#161616]"
                }`}
              >
                <div className="relative h-24 sm:h-28 w-full overflow-hidden rounded-lg bg-black">
                  <img
                    src={proj.afterImage}
                    alt={proj.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-1.5 left-1.5 bg-black/80 px-2 py-0.5 rounded text-[8px] font-bold text-[#e8b95d]">
                    0{idx + 1}
                  </div>
                  {isActive && (
                    <div className="absolute inset-0 border-2 border-[#e8b95d] rounded-lg pointer-events-none" />
                  )}
                </div>
                <div className="p-1.5 text-left">
                  <h4
                    className={`font-serif text-[12px] sm:text-[13px] line-clamp-1 transition-colors ${
                      isActive ? "text-[#e8b95d] font-bold" : "text-[#ddd]"
                    }`}
                  >
                    {proj.title}
                  </h4>
                  <p className="text-[10px] text-[#777] line-clamp-1">
                    {proj.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
