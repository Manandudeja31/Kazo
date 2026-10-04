import { blogsData } from "../data/blogsData";
import { FiArrowRight, FiClock } from "react-icons/fi";

export default function Journal({ onSelectBlog, onExploreBlogs }) {
  // Showcase top 3 articles on the homepage journal section
  const articles = blogsData.slice(0, 3);

  const handleArticleClick = (slug) => {
    if (onSelectBlog) {
      onSelectBlog(slug);
    } else {
      window.location.hash = `#/blog/${slug}`;
    }
  };

  const handleExploreClick = (e) => {
    e.preventDefault();
    if (onExploreBlogs) {
      onExploreBlogs();
    } else {
      window.location.hash = "#/blogs";
    }
  };

  return (
    <section
      id="journal"
      className="relative overflow-hidden bg-[#090909] py-14 sm:py-16 lg:py-20 px-6 sm:px-10 md:px-20 text-left border-t border-white/5"
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

          <button
            onClick={handleExploreClick}
            className="group inline-flex items-center gap-2 text-[11px] font-bold tracking-[1.5px] text-[#e8b95d] hover:text-[#f4d186] transition cursor-pointer self-start sm:self-auto"
          >
            <span>EXPLORE ALL GUIDES</span>
            <FiArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* ================= 3 CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item) => (
            <article
              key={item.id}
              onClick={() => handleArticleClick(item.slug)}
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
                  <span className="absolute top-4 left-4 rounded bg-black/80 backdrop-blur-md px-2.5 py-1 text-[8px] font-bold tracking-wider text-[#e8b95d] uppercase">
                    {item.category}
                  </span>
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
    </section>
  );
}

