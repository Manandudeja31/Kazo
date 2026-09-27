import { useState } from "react";
import { FiArrowRight, FiClock, FiX } from "react-icons/fi";

const articles = [
  {
    id: 1,
    tag: "OPTICAL CLARITY • 5 MIN READ",
    category: "GLASS INNOVATION",
    title: "The Optical Purity of Low-Iron Crystal in Contemporary Spaces",
    summary:
      "Why eliminating iron oxide creates crystal-clear transparency, truer color fidelity, and breathtaking light transmission.",
    image:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1000&auto=format&fit=crop",
    date: "OCTOBER 2025",
    author: "Kazo Glazing Bureau",
    content:
      "Standard architectural glass contains ferric oxide, casting a greenish hue that compromises modern neutral interiors. Low-iron glass (Starphire) eliminates this tint, offering 91% light transmittance and absolute color neutrality. When applied in full-height partitions and luxury shower cubicles, the glass virtually dissolves, allowing continuous spatial sightlines.",
  },
  {
    id: 2,
    tag: "DOOR MECHANICS • 4 MIN READ",
    category: "PIVOT SYSTEMS",
    title: "The Engineering of Silent Glide: Pivot & Telescopic Sliding Doors",
    summary:
      "Balancing monumental glass weights with effortless zero-resistance movement and concealed hydraulic dampening.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
    date: "NOVEMBER 2025",
    author: "Kazo Technical Team",
    content:
      "A 3.5-meter glass pivot door can easily weigh upwards of 180 kilograms. Our German concealed floor pivots distribute this structural load directly onto the sub-floor slab, eliminating structural frame sag. Paired with magnetic acoustic drop seals and magnetic latch catches, closing the door produces a deep, satisfying tactile thud with zero mechanical rattle.",
  },
  {
    id: 3,
    tag: "FRAMELESS SYSTEMS • 7 MIN READ",
    category: "ARCHITECTURAL GLAZING",
    title: "The Art of Minimalist Profiles: Fluted Glass & PVD Titanium Finishes",
    summary:
      "A study of textured architectural glass, acoustic transmission barriers, and surgical PVD surface metallurgy.",
    image:
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1000&auto=format&fit=crop",
    date: "DECEMBER 2025",
    author: "Kazo Design Atelier",
    content:
      "Fluted and reeded architectural glass introduces tactile rhythm while diffusing directional glare into soft ambient illumination. When framed with ultra-slim aerospace-grade aluminium finished with vacuum-deposited PVD titanium in champagne bronze or deep matte obsidian, doors become sculptural architectural thresholds rather than utilitarian barriers.",
  },
];

export default function Journal() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section
      id="journal"
      className="relative overflow-hidden bg-[#090909] py-24 sm:py-28 lg:py-32 px-6 sm:px-10 md:px-20 text-left border-t border-white/5"
    >
      <div className="mx-auto max-w-[1700px]">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#e8b95d]" />
              <span className="text-[10px] font-semibold tracking-[2px] text-[#e8b95d]">
                ATELIER DISCOURSE
              </span>
            </div>

            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[48px] leading-[1.15] text-[#f1eee9]">
              Insights on{" "}
              <em className="text-[#e8b95d] not-italic italic font-serif">
                Materiality & Space.
              </em>
            </h2>
          </div>

          <a
            href="#journal"
            className="group inline-flex items-center gap-2 text-[11px] font-bold tracking-[1.5px] text-[#e8b95d] hover:text-[#f4d186] transition"
          >
            <span>EXPLORE ALL ESSAYS</span>
            <FiArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* ================= 3 CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedArticle(item)}
              className="group cursor-pointer rounded-xl overflow-hidden bg-[#111] border border-white/5 transition-all duration-500 hover:border-[#e8b95d]/40 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-[#151515]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="flex items-center gap-2 text-[9px] font-bold tracking-[1.5px] text-[#e8b95d] mb-3">
                    <FiClock size={11} />
                    <span>{item.tag}</span>
                  </div>

                  <h3 className="font-serif text-[20px] sm:text-[22px] text-[#f2efe9] leading-[1.3] group-hover:text-[#e8b95d] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[12px] leading-[1.7] text-[#938e87]">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Read Link */}
              <div className="px-7 pb-7 pt-2 flex items-center gap-2 text-[10px] font-bold tracking-[1px] text-[#e8b95d]">
                <span>READ MONOGRAPH</span>
                <FiArrowRight
                  size={12}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ================= ESSAY MODAL ================= */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md text-left"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#121212] border border-[#e8b95d]/30 shadow-2xl p-6 sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#1c1c1c] text-[#ddd] hover:bg-[#e8b95d] hover:text-black transition"
            >
              <FiX size={20} />
            </button>

            <span className="text-[10px] font-bold tracking-[2px] text-[#e8b95d]">
              {selectedArticle.tag} • {selectedArticle.date}
            </span>

            <h3 className="font-serif text-[26px] sm:text-[32px] text-white mt-2 leading-[1.2]">
              {selectedArticle.title}
            </h3>

            <p className="text-[11px] text-[#888] mt-1">
              Authored by {selectedArticle.author}
            </p>

            <div className="my-6 h-60 w-full overflow-hidden rounded-xl">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="h-full w-full object-cover"
              />
            </div>

            <p className="text-[14px] leading-[1.9] text-[#ccc]">
              {selectedArticle.content}
            </p>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-[#e8b95d] px-6 py-2.5 text-[11px] font-bold tracking-[1.5px] text-black hover:bg-[#f5d084] transition"
              >
                CLOSE ESSAY
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
