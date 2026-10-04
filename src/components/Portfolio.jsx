import { categoriesData } from "../data/categoriesData";
import { FiArrowRight } from "react-icons/fi";

// Attractive, category-specific showcase covers exclusively for the home page Portfolio bento grid
const portfolioCoverImages = {
  "aluminium-doors-windows": "/transformations/project1-after.jpg",
  "upvc-doors-windows": "/categories/upvc-doors-windows.jpg",
  "partitions-sliding-systems": "/transformations/project2-after.jpg",
  "wardrobe-systems": "/transformations/project3-after.jpg",
  "shower-cubicles": "/transformations/shower_real_1790705500243.jpg",
  "glass-railings": "/transformations/project5-after.jpg",
  "exterior-facade-design": "/transformations/facade_real_1790705376980.jpg",
  "designer-mirrors": "/categories/designer-mirrors.jpg",
  "louvers": "/categories/louvers.jpg",
  "surfaces-ceilings": "/categories/surfaces-ceilings.jpg",
  "decorative-architectural-glass": "/categories/decorative-architectural-glass.png",
};

export default function Portfolio({ onSelectCategory }) {
  const handleCategoryClick = (slug) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
    } else {
      window.location.hash = `#/category/${slug}`;
    }
  };

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-[#090909] py-24 sm:py-28 lg:py-32 px-5 sm:px-8 md:px-14 lg:px-20 border-t border-white/5"
    >
      <div className="mx-auto max-w-[1700px]">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 text-left">
          <div>
            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#e7b85d]" />
              <span className="text-[10px] font-semibold tracking-[2px] text-[#e7b85d] uppercase">
                Explore Our Range
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[50px] leading-[1.1] text-[#f1eee9]">
              Doors, Windows & Glass{" "}
              <br className="hidden sm:inline" />
              <em className="text-[#e4b45c] not-italic italic font-serif">
                Crafted for Your Space.
              </em>
            </h2>
          </div>

          <div className="max-w-[500px]">
            <p className="text-[13px] sm:text-[14px] leading-[1.8] text-[#9a948c]">
              Explore our 11 product categories. Click any category to view real
              photos, design styles, and ideas for your home or commercial
              space.
            </p>
          </div>
        </div>

        {/* ================= BENTO COLLAGE GRID ================= */}
        <div className="grid grid-cols-12 gap-3 sm:gap-4 lg:gap-5 text-left">
          {categoriesData.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCategoryClick(item.slug)}
              className={`group relative ${item.colSpan} ${item.height} cursor-pointer overflow-hidden rounded-xl bg-[#141414] border border-white/10 transition-all duration-500 hover:border-[#e8b95d]/60 hover:shadow-2xl hover:shadow-black`}
            >
              {/* Image Frame */}
              <img
                src={portfolioCoverImages[item.slug] || item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
              />

              {/* Cinematic Vignette Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/15 transition-opacity duration-300 group-hover:from-black/95 group-hover:via-black/55" />

              {/* Top Accent Tag */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                <span className="text-[9px] font-semibold tracking-[1.5px] text-[#e8b95d] uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                  {item.tagline}
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex items-end justify-between gap-4">
                <div className="max-w-[80%]">
                  <h3 className="font-serif text-[18px] sm:text-[22px] lg:text-[24px] font-semibold text-white leading-[1.2] drop-shadow-md group-hover:text-[#e8b95d] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-[12px] text-[#aaa] line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.products ? `${item.products.length} product designs` : "Explore gallery"} • Click to view images
                  </p>
                </div>

                {/* View Products Pill Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(item.slug);
                  }}
                  aria-label={`View product images for ${item.title}`}
                  className="shrink-0 flex items-center gap-1.5 rounded bg-[#1a1a1a]/90 hover:bg-[#e8b95d] text-white hover:text-black border border-white/20 hover:border-[#e8b95d] px-3.5 py-1.5 text-[11px] font-semibold tracking-wider transition-all duration-300 backdrop-blur-md shadow-lg cursor-pointer"
                >
                  <span>View Images</span>
                  <FiArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <p className="text-[12px] sm:text-[13px] tracking-wide text-[#8a857e]">
            Visit our Delhi showroom to test our doors, windows, and glass partitions in person
          </p>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 text-[11px] font-bold tracking-[2px] text-[#e8b95d] transition hover:text-[#f3cd82]"
          >
            <span>BOOK A SHOWROOM VISIT OR CONSULTATION</span>
            <FiArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
