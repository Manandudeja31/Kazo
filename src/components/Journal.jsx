import { useState } from "react";
import { FiArrowRight, FiClock, FiX } from "react-icons/fi";

const articles = [
  {
    id: 1,
    tag: "MATERIALITY • 5 MIN READ",
    category: "MATERIALITY",
    title: "The Poetics of Roman Travertine in Contemporary Dwellings",
    summary:
      "Why monolithic porous stone provides both acoustic serenity and geological permanence in modern brutalist interiors.",
    image:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1000&auto=format&fit=crop",
    date: "OCTOBER 2025",
    author: "Alistair Vance",
    content:
      "Travertine is not merely a sedimentary limestone; it is frozen hydrothermal time. When extracted from subterranean quarries near Tivoli, its natural voids capture acoustic reverberations, creating an intrinsic acoustic dampen effect unattainable with synthetic surfaces. In our recent penthouse commissions, cross-cut unhoned travertine serves as the tactile spine connecting public salons with private quarters.",
  },
  {
    id: 2,
    tag: "ACOUSTICS • 4 MIN READ",
    category: "ACOUSTICS",
    title: "Designing for Silence: Acoustic Stucco & Concealed Baffles",
    summary:
      "Balancing cavernous double-height volumes with intimate, whisper-soft domestic tranquility.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
    date: "NOVEMBER 2025",
    author: "Elena Rostova",
    content:
      "Acoustic luxury is defined not by the absence of sound, but by the absence of tension. Through hand-troweled lime plasters infused with recycled volcanic pumice and microscopic shadow-reveal perimeter dampers, we reduce reverberation decay times from 2.4 seconds to an intimate 0.6 seconds without a single visible acoustic foam or synthetic panel.",
  },
  {
    id: 3,
    tag: "CRAFTSMANSHIP • 7 MIN READ",
    category: "CRAFTSMANSHIP",
    title: "The Lost Art of Hand-Rubbed Patinated Bronze Joinery",
    summary:
      "A study of Venetian metallurgical finishes that evolve living patinas over decades of human contact.",
    image:
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1000&auto=format&fit=crop",
    date: "DECEMBER 2025",
    author: "Matteo Rossi",
    content:
      "Unlike modern PVD coatings that degrade under ultraviolet exposure, authentic patinated bronze is chemically activated with sulfurated potassium and natural beeswax. Each door pull, reveal trim, and pivot hinge darkens and warms precisely where the client's hand makes contact, recording the organic biography of the residence over centuries.",
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
