import { useState } from "react";
import { FiArrowRight, FiMaximize2, FiX, FiCheckCircle } from "react-icons/fi";

const categories = ["ALL", "KITCHEN", "DINING", "BEDROOM", "LIVING", "BATH"];

const projects = [
  {
    id: 1,
    category: "KITCHEN",
    title: "Villa Bianca — Lake Como",
    description: "Calacatta Viola marble, smoked oak, brushed brass finishes",
    location: "LOMBARDY, ITALY • 2025",
    area: "820 m²",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop",
    details:
      "A subterranean kitchen sanctuary featuring bookmatched Italian Calacatta Viola monolithic counters, concealed Sub-Zero integration behind fluted fumed oak cabinetry, and patinated unlacquered brass hardware hand-cast in Brescia.",
  },
  {
    id: 2,
    category: "DINING",
    title: "The Glass Pavilion — St. Moritz",
    description: "Custom bronze chandelier, walnut paneling, hand-troweled stucco",
    location: "ENGADIN, SWITZERLAND • 2024",
    area: "650 m²",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop",
    details:
      "Framed against panoramic Alpine peaks, this dining pavilion is centered around a 4.2-meter single-slab bog oak dining table, illuminated by a bespoke lost-wax cast bronze chandelier tuned to warm 2400K candlelight temperature.",
  },
  {
    id: 3,
    category: "BEDROOM",
    title: "The Kyoto Residence — Minato",
    description: "Hinoki wood ceiling, fluted stone headboard, concealed lighting",
    location: "TOKYO, JAPAN • 2025",
    area: "540 m²",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1400&auto=format&fit=crop",
    details:
      "An acoustic cocoon merging Japanese architectural heritage with European precision. Hand-hewn aromatic Hinoki timber beams float above a monolithic fluted Basaltina stone headboard with concealed fiber-optic perimeter illumination.",
  },
  {
    id: 4,
    category: "LIVING",
    title: "Penthouse VII — Manhattan",
    description: "Double-height travertine hearth, patinated bronze, floor-to-ceiling glazing",
    location: "NEW YORK, USA • 2025",
    area: "980 m²",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop",
    details:
      "Hovering 74 stories above Central Park, the grand reception salon is anchored by an 8-meter monolithic Roman travertine fireplace, acoustic micro-perforated dark walnut panels, and curated collector seating.",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-[#090909] py-24 sm:py-28 lg:py-32 px-6 sm:px-10 md:px-20 border-t border-white/5"
    >
      <div className="mx-auto max-w-[1700px]">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 text-left">
          <div>
            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#e7b85d]" />
              <span className="text-[10px] font-semibold tracking-[2px] text-[#e7b85d]">
                CURATED PORTFOLIO
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-[36px] sm:text-[46px] lg:text-[52px] leading-[1.1] text-[#f1eee9]">
              Architecture in Pursuit of{" "}
              <br className="hidden sm:inline" />
              <em className="text-[#e4b45c] not-italic italic">Tactile Silence.</em>
            </h2>
          </div>

          <div className="max-w-[480px]">
            <p className="text-[13px] sm:text-[14px] leading-[1.8] text-[#9a948c]">
              A retrospective of private residences commissioned by discerning
              collectors, each space an uncompromising study in custom joinery,
              shadow, and proportion.
            </p>
          </div>
        </div>

        {/* ================= CATEGORY FILTER TABS ================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-[10px] tracking-[1.5px] font-semibold transition-all duration-300 rounded-sm cursor-pointer whitespace-nowrap ${activeCategory === cat
                  ? "bg-[#e8b95d] text-black shadow-md shadow-[#e8b95d]/20"
                  : "bg-[#141414] text-[#8e8880] hover:text-[#e8b95d] hover:bg-[#1a1a1a] border border-white/5"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ================= PROJECT GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 text-left">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#111111] border border-white/5 transition-all duration-500 hover:border-[#e8b95d]/40 hover:shadow-2xl hover:shadow-black/80"
            >
              {/* Image Frame */}
              <div className="relative h-[340px] sm:h-[400px] lg:h-[460px] w-full overflow-hidden bg-[#161616]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />

                {/* Ambient Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/20" />
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-0" />

                {/* Massive Watermark Tag */}
                <div className="absolute top-6 left-7 pointer-events-none select-none">
                  <span className="font-serif text-[28px] sm:text-[34px] tracking-[6px] font-bold text-white/70 uppercase drop-shadow-md">
                    {project.category}
                  </span>
                </div>

                {/* Expand Icon Button */}
                <button
                  aria-label="View project details"
                  className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-[#e8b95d] backdrop-blur-md transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:bg-[#e8b95d] group-hover:text-black"
                >
                  <FiMaximize2 size={16} />
                </button>
              </div>

              {/* Card Meta Content */}
              <div className="p-7 sm:p-8 bg-[#101010]/95 backdrop-blur-sm border-t border-white/5">
                <div className="flex items-center justify-between text-[10px] tracking-[1.5px] text-[#e8b95d] font-semibold mb-2">
                  <span>{project.location}</span>
                  <span className="text-[#777]">{project.area}</span>
                </div>

                <h3 className="font-serif text-[22px] sm:text-[26px] text-[#f2efe9] group-hover:text-[#e8b95d] transition-colors">
                  {project.title}
                </h3>

                <p className="mt-2 text-[12px] sm:text-[13px] leading-[1.6] text-[#938e87]">
                  {project.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-[10px] font-semibold tracking-[1px] text-[#e8b95d]">
                  <span>EXPLORE COMMISSION SPECIFICATIONS</span>
                  <FiArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <p className="text-[12px] sm:text-[13px] tracking-wide text-[#8a857e]">
            View all 48 completed residential commissions across 14 global capitals
          </p>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 text-[11px] font-bold tracking-[2px] text-[#e8b95d] transition hover:text-[#f3cd82]"
          >
            <span>REQUEST PRIVATE PORTFOLIO ACCESS</span>
            <FiArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      {/* ================= PROJECT DETAIL MODAL ================= */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md text-left"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[#121212] border border-[#e8b95d]/30 shadow-2xl p-6 sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#1c1c1c] text-[#ddd] hover:bg-[#e8b95d] hover:text-black transition"
            >
              <FiX size={20} />
            </button>

            {/* Modal Image */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-xl">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent" />
            </div>

            {/* Modal Details */}
            <div className="mt-6">
              <span className="text-[10px] font-bold tracking-[2px] text-[#e8b95d]">
                {selectedProject.location}
              </span>
              <h3 className="font-serif text-[28px] sm:text-[34px] text-white mt-1">
                {selectedProject.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.8] text-[#b3ada5]">
                {selectedProject.details}
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-white/10 py-5">
                <div>
                  <p className="text-[10px] tracking-[1px] text-[#777]">CATEGORY</p>
                  <p className="text-[13px] font-semibold text-[#e8b95d] mt-1">
                    {selectedProject.category}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[1px] text-[#777]">SURFACE AREA</p>
                  <p className="text-[13px] font-semibold text-white mt-1">
                    {selectedProject.area}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[1px] text-[#777]">JOINERY TOLERANCE</p>
                  <p className="text-[13px] font-semibold text-[#e8b95d] mt-1">
                    0.4 mm Guaranteed
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[12px] text-[#999]">
                  <FiCheckCircle className="text-[#e8b95d]" />
                  <span>Verified Architectural Provenance</span>
                </div>
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#e8b95d] px-7 py-3 text-[11px] font-bold tracking-[1.5px] text-black hover:bg-[#f5d084] transition"
                >
                  INQUIRE ABOUT SIMILAR COMMISSION
                  <FiArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
