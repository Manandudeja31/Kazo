import { useState } from "react";
import { FiArrowRight, FiClock, FiX } from "react-icons/fi";

const articles = [
  {
    id: 1,
    tag: "GLASS GUIDE • 4 MIN READ",
    category: "GLASS CLARITY",
    title: "Why Clear, Low-Iron Glass Makes Rooms Look Bigger and Brighter",
    summary:
      "Standard glass often has a subtle greenish tint. Here's why low-iron clear glass gives you cleaner, brighter views and truer colors.",
    image:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1000&auto=format&fit=crop",
    date: "OCTOBER 2025",
    author: "Kazo Design Team",
    content:
      "Most standard architectural glass has a slight greenish tint caused by iron content. If you want pure clarity—especially for walk-in shower enclosures, large windows, and open glass partitions—low-iron glass is the ideal choice. It lets in up to 91% of natural daylight and shows the true colors of your interior finishes, tiles, and furnishings without any dark or greenish tint.",
  },
  {
    id: 2,
    tag: "DOOR MECHANICS • 4 MIN READ",
    category: "PIVOT SYSTEMS",
    title: "How Heavy Pivot Doors Move with Just a Gentle Push",
    summary:
      "Learn how modern floor pivot systems carry large door weights effortlessly, giving you silent and smooth movement every time.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
    date: "NOVEMBER 2025",
    author: "Kazo Engineering Team",
    content:
      "A large 8-to-10 foot glass pivot door can easily weigh over 150 kg, but opening it shouldn't feel like a workout. By anchoring the pivot mechanism into the floor rather than hanging all the weight from the wall frame, the door swings smoothly with just a fingertip touch. Paired with soft-close hydraulic dampers, it closes securely and quietly without slamming or vibrating.",
  },
  {
    id: 3,
    tag: "DESIGN TIPS • 5 MIN READ",
    category: "PARTITIONS & SHUTTERS",
    title: "Fluted Glass & Slim Frames: Light and Privacy in Perfect Balance",
    summary:
      "Why textured fluted glass and slim aluminum frames are a favorite choice for modern room dividers, bathrooms, and wardrobes.",
    image:
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1000&auto=format&fit=crop",
    date: "DECEMBER 2025",
    author: "Kazo Studio Team",
    content:
      "Fluted (or reeded) glass creates a beautiful striped texture that lets light flow freely while gently blurring the view for privacy. Combined with ultra-slim aluminum frames in matte black, brass, or champagne finishes, it adds character to room dividers, wardrobe doors, and bathroom partitions without blocking natural daylight.",
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
                HELPFUL TIPS & GUIDES
              </span>
            </div>

            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[48px] leading-[1.15] text-[#f1eee9]">
              Simple Guides to Choosing{" "}
              <em className="text-[#e8b95d] not-italic italic font-serif">
                Doors, Windows & Glass.
              </em>
            </h2>
          </div>

          <a
            href="#journal"
            className="group inline-flex items-center gap-2 text-[11px] font-bold tracking-[1.5px] text-[#e8b95d] hover:text-[#f4d186] transition"
          >
            <span>EXPLORE ALL GUIDES</span>
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
                <span>READ ARTICLE</span>
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
                CLOSE ARTICLE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
