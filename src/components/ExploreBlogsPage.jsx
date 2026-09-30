import { useState, useMemo, useEffect } from "react";
import { blogsData } from "../data/blogsData";
import {
  FiArrowLeft,
  FiArrowRight,
  FiSearch,
  FiClock,
  FiX,
  FiBookOpen,
  FiCalendar,
  FiUser,
  FiCheckCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function ExploreBlogsPage({
  onSelectBlog,
  onBackToHome,
  onNavClick,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const list = ["All", ...new Set(blogsData.map((b) => b.category))];
    return list;
  }, []);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogsData.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.summary.toLowerCase().includes(q) ||
        blog.category.toLowerCase().includes(q) ||
        blog.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featuredBlog = blogsData.find((b) => b.featured) || blogsData[0];

  const handleCardClick = (slug) => {
    if (onSelectBlog) {
      onSelectBlog(slug);
    } else {
      window.location.hash = `#/blog/${slug}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-[#f2efe9] pt-24 sm:pt-28">
      {/* ================= SUB-NAV / BREADCRUMB ================= */}
      <div className="border-b border-white/10 bg-[#0d0d0d]/85 backdrop-blur-md px-5 sm:px-8 md:px-14 lg:px-20 py-3.5 sticky top-[73px] z-30">
        <div className="mx-auto flex max-w-[1700px] flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="group inline-flex items-center gap-2 rounded-full border border-[#e8b95d]/30 bg-[#e8b95d]/10 px-4 py-1.5 text-[11px] font-semibold tracking-wider text-[#e8b95d] hover:bg-[#e8b95d] hover:text-black transition-all cursor-pointer shadow-sm"
            >
              <FiArrowLeft
                size={14}
                className="transition-transform group-hover:-translate-x-1"
              />
              <span className="uppercase tracking-[1px]">Back to Home</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#777]">
              <span>/</span>
              <button
                onClick={onBackToHome}
                className="hover:text-white transition"
              >
                Home
              </button>
              <span>/</span>
              <span className="text-[#e8b95d] font-medium">Design Journal & Guides</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#8e8880]">
            <span className="hidden md:inline">
              Showing <strong className="text-white">{filteredBlogs.length}</strong> of{" "}
              {blogsData.length} Guides
            </span>
          </div>
        </div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden px-6 sm:px-10 md:px-20 py-16 sm:py-20 border-b border-white/5 bg-gradient-to-b from-[#121212] via-[#0a0a0a] to-[#090909]">
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[900px] rounded-full bg-[#e8b95d]/5 blur-[160px]" />

        <div className="mx-auto max-w-[1700px] relative z-10 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e8b95d]/20 bg-[#e8b95d]/10 px-3.5 py-1 mb-5">
            <span className="h-2 w-2 rounded-full bg-[#e8b95d]" />
            <span className="text-[10px] font-bold tracking-[2px] text-[#e8b95d] uppercase">
              The Kazo Architectural Journal
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
            <div className="lg:col-span-8">
              <h1 className="font-serif text-[36px] sm:text-[50px] lg:text-[60px] leading-[1.1] text-[#f4f1ec]">
                Knowledge & Craft for{" "}
                <em className="text-[#e8b95d] not-italic italic font-serif">
                  Doors, Windows & Glass.
                </em>
              </h1>
              <p className="mt-5 max-w-2xl text-[14px] sm:text-[15px] leading-[1.8] text-[#9a948c]">
                Explore in-depth technical guides, material comparisons, and architectural insights authored by our glazing engineers, hardware specialists, and interior architects.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="lg:col-span-4 flex items-center lg:justify-end gap-6 pt-4 lg:pt-0">
              <div className="border-l-2 border-[#e8b95d]/40 pl-4">
                <p className="text-[28px] font-serif text-white">9+</p>
                <p className="text-[10px] uppercase tracking-[1.5px] text-[#888]">
                  Technical Guides
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="text-[28px] font-serif text-white">100%</p>
                <p className="text-[10px] uppercase tracking-[1.5px] text-[#888]">
                  Architect Reviewed
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="text-[28px] font-serif text-white">0%</p>
                <p className="text-[10px] uppercase tracking-[1.5px] text-[#888]">
                  Jargon / Practical
                </p>
              </div>
            </div>
          </div>

          {/* ================= SEARCH & FILTER CONTROLS ================= */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <FiSearch
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides (e.g. low-iron, pivot, acoustic, shower)..."
                className="w-full rounded-xl border border-white/10 bg-[#141414] py-3.5 pl-11 pr-10 text-[13px] text-white placeholder-[#666] outline-none transition focus:border-[#e8b95d]/50 focus:bg-[#181818]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-white p-1"
                >
                  <FiX size={15} />
                </button>
              )}
            </div>

            {/* Quick Reset or Status */}
            {(selectedCategory !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-[#e8b95d] hover:underline self-start md:self-auto cursor-pointer"
              >
                <FiX size={13} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const count =
                cat === "All"
                  ? blogsData.length
                  : blogsData.filter((b) => b.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-[11px] font-semibold tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#e8b95d] text-black shadow-lg shadow-[#e8b95d]/20"
                      : "bg-[#141414] text-[#938e87] border border-white/5 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                      isActive ? "bg-black/20 text-black" : "bg-white/10 text-[#aaa]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SPOTLIGHT FEATURED GUIDE (Only shown when no search & "All" is active) ================= */}
      {selectedCategory === "All" && !searchQuery && featuredBlog && (
        <section className="px-6 sm:px-10 md:px-20 py-12 border-b border-white/5">
          <div className="mx-auto max-w-[1700px] text-left">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-[2px] text-[#e8b95d] uppercase">
                ★ FEATURED SPOTLIGHT ARTICLE
              </span>
            </div>

            <div
              onClick={() => handleCardClick(featuredBlog.slug)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#111] border border-white/10 hover:border-[#e8b95d]/50 transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 shadow-2xl"
            >
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-[#181818]">
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#111]" />
                <span className="absolute top-5 left-5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] font-bold tracking-[1.5px] text-[#e8b95d]">
                  {featuredBlog.category}
                </span>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[10px] font-bold tracking-[1.5px] text-[#888] mb-4">
                    <span className="inline-flex items-center gap-1.5 text-[#e8b95d]">
                      <FiClock size={12} />
                      {featuredBlog.readTime}
                    </span>
                    <span>•</span>
                    <span>{featuredBlog.date}</span>
                  </div>

                  <h2 className="font-serif text-[26px] sm:text-[34px] text-[#f2efe9] leading-[1.25] group-hover:text-[#e8b95d] transition-colors">
                    {featuredBlog.title}
                  </h2>

                  <p className="mt-4 text-[13px] sm:text-[14px] leading-[1.8] text-[#938e87]">
                    {featuredBlog.subtitle || featuredBlog.summary}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {featuredBlog.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-white/5 border border-white/5 px-2.5 py-1 text-[10px] text-[#aaa]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredBlog.authorAvatar}
                      alt={featuredBlog.author}
                      className="h-9 w-9 rounded-full object-cover border border-[#e8b95d]/30"
                    />
                    <div>
                      <p className="text-[12px] font-semibold text-white">
                        {featuredBlog.author}
                      </p>
                      <p className="text-[10px] text-[#777]">
                        {featuredBlog.authorRole}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-[#e8b95d] px-4 py-2 text-[10px] font-bold tracking-wider text-black group-hover:bg-[#f5d084] transition">
                    <span>READ GUIDE</span>
                    <FiArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= ALL BLOGS GRID ================= */}
      <section className="px-6 sm:px-10 md:px-20 py-16">
        <div className="mx-auto max-w-[1700px] text-left">
          {/* Section Subhead */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[10px] font-bold tracking-[2px] text-[#e8b95d] uppercase">
                {selectedCategory === "All" ? "ALL PUBLICATIONS" : selectedCategory.toUpperCase()}
              </p>
              <h2 className="font-serif text-[26px] sm:text-[32px] text-[#f1eee9] mt-1">
                {searchQuery
                  ? `Search results for "${searchQuery}"`
                  : selectedCategory === "All"
                  ? "Architectural Guides & Specifications"
                  : `${selectedCategory} Guides`}
              </h2>
            </div>

            <p className="text-[12px] text-[#777]">
              {filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"}
            </p>
          </div>

          {/* Cards Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((item) => (
                <article
                  key={item.id}
                  onClick={() => handleCardClick(item.slug)}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-[#111111] border border-white/5 transition-all duration-500 hover:border-[#e8b95d]/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative h-60 w-full overflow-hidden bg-[#161616]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/25 to-transparent" />

                      {/* Category Badge */}
                      <span className="absolute top-4 left-4 rounded-md bg-black/75 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[9px] font-bold tracking-[1.5px] text-[#e8b95d] uppercase">
                        {item.category}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="p-7">
                      {/* Meta */}
                      <div className="flex items-center gap-2 text-[9px] font-bold tracking-[1.5px] text-[#8e8880] mb-3">
                        <span className="inline-flex items-center gap-1 text-[#e8b95d]">
                          <FiClock size={11} />
                          {item.readTime}
                        </span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-[20px] sm:text-[22px] text-[#f2efe9] leading-[1.3] group-hover:text-[#e8b95d] transition-colors line-clamp-2">
                        {item.title}
                      </h3>

                      {/* Summary */}
                      <p className="mt-3 text-[12px] leading-[1.7] text-[#938e87] line-clamp-3">
                        {item.summary}
                      </p>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="rounded bg-white/5 px-2 py-0.5 text-[9px] text-[#888]"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Author + Read Link */}
                  <div className="px-7 pb-6 pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.authorAvatar}
                        alt={item.author}
                        className="h-7 w-7 rounded-full object-cover border border-white/10"
                      />
                      <span className="text-[11px] text-[#888] truncate max-w-[130px]">
                        {item.author}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[1px] text-[#e8b95d] group-hover:text-[#f3cd82]">
                      <span>READ GUIDE</span>
                      <FiArrowRight
                        size={12}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-2xl border border-white/10 bg-[#121212] p-12 text-center my-12 max-w-xl mx-auto">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-[#e8b95d] mb-4">
                <FiBookOpen size={24} />
              </div>
              <h3 className="font-serif text-[22px] text-white">
                No Guides Found
              </h3>
              <p className="mt-2 text-[13px] text-[#888]">
                We couldn't find any guides matching "{searchQuery}" in the selected category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#e8b95d] px-6 py-2.5 text-[11px] font-bold tracking-wider text-black hover:bg-[#f5d084] transition cursor-pointer"
              >
                <span>CLEAR FILTERS & VIEW ALL</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= CONSULTATION / EXPERT CTA ================= */}
      <section className="px-6 sm:px-10 md:px-20 py-20 border-t border-white/10 bg-[#0c0c0c] text-center">
        <div className="mx-auto max-w-3xl">
          <span className="text-[10px] font-bold tracking-[2px] text-[#e8b95d] uppercase">
            ARCHITECTURAL CONSULTATION
          </span>
          <h2 className="font-serif text-[30px] sm:text-[42px] text-white mt-3 leading-[1.2]">
            Have a Specific Glazing or Door Challenge?
          </h2>
          <p className="mt-4 text-[13px] sm:text-[14px] leading-[1.8] text-[#938e87]">
            Our engineering team consults directly with homeowners, architects, and interior designers across India. Bring your floor plans or site photos for tailored recommendations.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                if (onNavClick) {
                  onNavClick("contact");
                } else {
                  window.location.hash = "#contact";
                }
              }}
              className="rounded-full bg-[#e8b95d] px-8 py-3.5 text-[11px] font-bold tracking-[1.5px] text-black hover:bg-[#f5d084] transition shadow-lg cursor-pointer"
            >
              BOOK PRIVATE CONSULTATION
            </button>
            <a
              href="https://wa.me/918810369142?text=Hi%20Kazo,%20I%20am%20exploring%20your%20design%20guides%20and%20would%20like%20guidance%20for%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-3.5 text-[11px] font-bold tracking-[1px] text-[#25D366] hover:bg-[#25D366] hover:text-black transition"
            >
              <FaWhatsapp size={16} />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
