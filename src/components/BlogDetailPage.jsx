import { useState, useEffect } from "react";
import { blogsData } from "../data/blogsData";
import {
  FiArrowLeft,
  FiArrowRight,
  FiClock,
  FiShare2,
  FiCheck,
  FiCheckCircle,
  FiInfo,
  FiChevronRight,
  FiCalendar,
  FiUser,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function BlogDetailPage({
  blogSlug,
  onBackToBlogs,
  onBackToHome,
  onSelectBlog,
  onNavClick,
}) {
  const [copied, setCopied] = useState(false);

  // Find blog by slug or default to first
  const blog =
    blogsData.find((b) => b.slug === blogSlug) ||
    blogsData.find((b) => String(b.id) === String(blogSlug)) ||
    blogsData[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [blogSlug]);

  // Find previous & next blogs
  const currentIndex = blogsData.findIndex((b) => b.id === blog.id);
  const prevBlog =
    currentIndex > 0 ? blogsData[currentIndex - 1] : blogsData[blogsData.length - 1];
  const nextBlog =
    currentIndex < blogsData.length - 1 ? blogsData[currentIndex + 1] : blogsData[0];

  // Related articles (from relatedSlugs or fallback to others in same category)
  const relatedArticles = blogsData.filter((b) => {
    if (b.id === blog.id) return false;
    if (blog.relatedSlugs && blog.relatedSlugs.includes(b.slug)) return true;
    return b.category === blog.category;
  }).slice(0, 3);

  // Share link handler
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleSelectArticle = (slug) => {
    if (onSelectBlog) {
      onSelectBlog(slug);
    } else {
      window.location.hash = `#/blog/${slug}`;
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Kazo, I read your architectural guide "${blog.title}" and would like to consult on my project.`
  );

  return (
    <div className="min-h-screen bg-[#090909] text-[#f2efe9] pt-24 sm:pt-28">
      {/* ================= SUB-NAVIGATION / BREADCRUMB BAR ================= */}
      <div className="border-b border-white/10 bg-[#0d0d0d]/90 backdrop-blur-md px-5 sm:px-8 md:px-14 lg:px-20 py-3.5 sticky top-[73px] z-30">
        <div className="mx-auto flex max-w-[1700px] flex-wrap items-center justify-between gap-4">
          {/* Back Buttons & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToBlogs}
              className="group inline-flex items-center gap-2 rounded-full border border-[#e8b95d]/30 bg-[#e8b95d]/10 px-4 py-1.5 text-[11px] font-semibold tracking-wider text-[#e8b95d] hover:bg-[#e8b95d] hover:text-black transition-all cursor-pointer shadow-sm"
            >
              <FiArrowLeft
                size={14}
                className="transition-transform group-hover:-translate-x-1"
              />
              <span className="uppercase tracking-[1px]">Back to All Guides</span>
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
              <button
                onClick={onBackToBlogs}
                className="hover:text-[#e8b95d] transition"
              >
                Journal
              </button>
              <span>/</span>
              <span className="text-[#e8b95d] font-medium truncate max-w-[200px] lg:max-w-xs">
                {blog.title}
              </span>
            </div>
          </div>

          {/* Actions: Share & Read Time */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#161616] px-3.5 py-1.5 text-[11px] text-[#aaa] hover:text-white hover:border-[#e8b95d]/40 transition cursor-pointer"
              title="Copy guide link"
            >
              {copied ? (
                <>
                  <FiCheck size={13} className="text-[#25D366]" />
                  <span className="text-[#25D366] font-medium">Link Copied!</span>
                </>
              ) : (
                <>
                  <FiShare2 size={13} />
                  <span>Share</span>
                </>
              )}
            </button>

            <a
              href={`https://wa.me/918810369142?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-3.5 py-1.5 text-[11px] font-semibold text-[#25D366] hover:bg-[#25D366] hover:text-black transition"
            >
              <FaWhatsapp size={13} />
              <span>Ask Architect</span>
            </a>
          </div>
        </div>
      </div>

      {/* ================= ARTICLE HEADER ================= */}
      <header className="px-6 sm:px-10 md:px-20 pt-12 pb-8 border-b border-white/5 bg-gradient-to-b from-[#111111] to-[#090909]">
        <div className="mx-auto max-w-4xl text-left">
          {/* Category & Read Time */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="rounded-md bg-[#e8b95d]/10 border border-[#e8b95d]/30 px-3 py-1 text-[10px] font-bold tracking-[2px] text-[#e8b95d] uppercase">
              {blog.category}
            </span>
            <span className="text-[#666]">•</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#aaa]">
              <FiClock size={12} className="text-[#e8b95d]" />
              {blog.readTime}
            </span>
            <span className="text-[#666]">•</span>
            <span className="text-[11px] text-[#888]">{blog.date}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-[30px] sm:text-[44px] lg:text-[52px] leading-[1.15] text-[#f4f1ec]">
            {blog.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-[15px] sm:text-[17px] leading-[1.8] text-[#aaa39a]">
            {blog.subtitle || blog.summary}
          </p>

          {/* Author Byline Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={blog.authorAvatar}
                alt={blog.author}
                className="h-11 w-11 rounded-full object-cover border border-[#e8b95d]/40 shadow-md"
              />
              <div>
                <p className="text-[13px] font-semibold text-white">
                  {blog.author}
                </p>
                <p className="text-[11px] text-[#888]">
                  {blog.authorRole}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {blog.tags.map((t) => (
                <span
                  key={t}
                  className="rounded bg-white/5 border border-white/5 px-2.5 py-1 text-[10px] text-[#888]"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ================= HERO MEDIA ================= */}
      <div className="px-6 sm:px-10 md:px-20 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141414] shadow-2xl">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full max-h-[520px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-6 text-[11px] text-[#ccc] bg-black/70 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
              Architectural Glazing Detailing • Kazo Bespoke Projects
            </p>
          </div>
        </div>
      </div>

      {/* ================= ARTICLE BODY ================= */}
      <article className="px-6 sm:px-10 md:px-20 pb-16">
        <div className="mx-auto max-w-4xl text-left">
          {/* Lead Paragraph */}
          {blog.content?.lead && (
            <p className="text-[16px] sm:text-[18px] leading-[1.85] text-[#ded8ce] font-serif border-l-2 border-[#e8b95d] pl-6 my-8 italic">
              {blog.content.lead}
            </p>
          )}

          {/* Sections */}
          <div className="space-y-10 my-10 text-[14px] sm:text-[15px] leading-[1.9] text-[#bbb5ac]">
            {blog.content?.sections?.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="font-serif text-[22px] sm:text-[26px] text-[#f1eee9] leading-[1.3] text-left pt-2">
                  {section.heading}
                </h2>

                {section.body && <p>{section.body}</p>}

                {section.bullets && (
                  <ul className="space-y-3 pt-2">
                    {section.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e8b95d]/20 text-[#e8b95d]">
                          <FiCheckCircle size={11} />
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Pull Quote Highlight */}
          {blog.content?.quote && (
            <div className="my-12 rounded-2xl border border-[#e8b95d]/30 bg-gradient-to-br from-[#16140f] to-[#0f0e0c] p-8 sm:p-10 relative overflow-hidden">
              <span className="absolute -top-4 -right-2 text-[90px] font-serif text-[#e8b95d]/10 select-none">
                “
              </span>
              <p className="font-serif text-[18px] sm:text-[22px] leading-[1.6] text-[#e8b95d] italic relative z-10">
                "{blog.content.quote.text}"
              </p>
              <p className="mt-4 text-[11px] font-bold tracking-[2px] text-[#8e8880] uppercase">
                — {blog.content.quote.attribution}
              </p>
            </div>
          )}

          {/* Specification Comparison Table */}
          {blog.content?.specTable && (
            <div className="my-12">
              <div className="flex items-center gap-2 mb-4">
                <FiInfo className="text-[#e8b95d]" size={16} />
                <h3 className="font-serif text-[18px] sm:text-[20px] text-white">
                  Technical Specification Comparison
                </h3>
              </div>

              <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#121212]">
                <table className="w-full text-left text-[12px] sm:text-[13px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#181818] text-[#aaa]">
                      <th className="p-4 font-semibold">Technical Parameter</th>
                      <th className="p-4 font-semibold">Conventional Solution</th>
                      <th className="p-4 font-semibold text-[#e8b95d]">
                        Kazo Architectural Standard
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {blog.content.specTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition">
                        <td className="p-4 font-medium text-white">
                          {row.feature}
                        </td>
                        <td className="p-4 text-[#888]">{row.standard}</td>
                        <td className="p-4 text-[#e8b95d] font-medium">
                          {row.lowIron}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Architectural Pro Tip Callout Box */}
          {blog.content?.proTip && (
            <div className="my-10 rounded-xl border-l-4 border-[#e8b95d] bg-[#141414] p-6 sm:p-7">
              <span className="text-[10px] font-bold tracking-[2px] text-[#e8b95d] uppercase block mb-2">
                ARCHITECT’S PRO TIP
              </span>
              <p className="text-[13px] sm:text-[14px] leading-[1.8] text-[#ccc]">
                {blog.content.proTip}
              </p>
            </div>
          )}

          {/* Author Box */}
          <div className="mt-14 rounded-2xl border border-white/10 bg-[#121212] p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={blog.authorAvatar}
              alt={blog.author}
              className="h-16 w-16 rounded-full object-cover border-2 border-[#e8b95d]/40 shrink-0"
            />
            <div className="text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <h4 className="text-[15px] font-bold text-white">
                  {blog.author}
                </h4>
                <span className="hidden sm:inline text-[#555]">•</span>
                <span className="text-[12px] text-[#e8b95d]">
                  {blog.authorRole}
                </span>
              </div>
              <p className="mt-2 text-[12px] leading-[1.7] text-[#8e8880]">
                Part of Kazo's in-house engineering and architectural team in Delhi NCR. Specializing in bespoke pivot mechanisms, soundproof façade envelopes, and luxury interior partitions.
              </p>
            </div>
          </div>

          {/* Prev / Next Article Navigation */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {prevBlog && (
              <button
                onClick={() => handleSelectArticle(prevBlog.slug)}
                className="group flex flex-col items-start rounded-xl border border-white/5 bg-[#121212] p-5 text-left hover:border-[#e8b95d]/30 transition cursor-pointer"
              >
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[1.5px] text-[#888] uppercase mb-2 group-hover:text-[#e8b95d] transition">
                  <FiArrowLeft size={12} />
                  <span>PREVIOUS GUIDE</span>
                </span>
                <p className="font-serif text-[15px] text-white line-clamp-1 group-hover:text-[#e8b95d] transition">
                  {prevBlog.title}
                </p>
              </button>
            )}

            {nextBlog && (
              <button
                onClick={() => handleSelectArticle(nextBlog.slug)}
                className="group flex flex-col items-end rounded-xl border border-white/5 bg-[#121212] p-5 text-right hover:border-[#e8b95d]/30 transition cursor-pointer"
              >
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[1.5px] text-[#888] uppercase mb-2 group-hover:text-[#e8b95d] transition">
                  <span>NEXT GUIDE</span>
                  <FiArrowRight size={12} />
                </span>
                <p className="font-serif text-[15px] text-white line-clamp-1 group-hover:text-[#e8b95d] transition">
                  {nextBlog.title}
                </p>
              </button>
            )}
          </div>
        </div>
      </article>

      {/* ================= RELATED GUIDES SECTION ================= */}
      {relatedArticles.length > 0 && (
        <section className="px-6 sm:px-10 md:px-20 py-16 border-t border-white/5 bg-[#0b0b0b]">
          <div className="mx-auto max-w-6xl text-left">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-bold tracking-[2px] text-[#e8b95d] uppercase">
                  RECOMMENDED READING
                </span>
                <h2 className="font-serif text-[24px] sm:text-[30px] text-white mt-1">
                  Related Architectural Guides
                </h2>
              </div>

              <button
                onClick={onBackToBlogs}
                className="text-[11px] font-bold tracking-[1px] text-[#e8b95d] hover:underline"
              >
                VIEW ALL GUIDES →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectArticle(item.slug)}
                  className="group cursor-pointer rounded-xl overflow-hidden bg-[#121212] border border-white/5 hover:border-[#e8b95d]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden bg-[#181818]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 rounded bg-black/80 px-2 py-0.5 text-[8px] font-bold tracking-wider text-[#e8b95d]">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <p className="text-[9px] font-bold tracking-[1px] text-[#777] mb-2">
                        {item.readTime} • {item.date}
                      </p>
                      <h4 className="font-serif text-[16px] text-[#f2efe9] group-hover:text-[#e8b95d] transition line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-[11px] leading-[1.6] text-[#8e8880] line-clamp-2">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-1 flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-[#e8b95d]">
                    <span>READ GUIDE</span>
                    <FiArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= IN-ARTICLE CONSULTATION CTA ================= */}
      <section className="px-6 sm:px-10 md:px-20 py-20 border-t border-white/10 bg-gradient-to-t from-[#141414] to-[#0a0a0a] text-center">
        <div className="mx-auto max-w-3xl">
          <span className="text-[10px] font-bold tracking-[2px] text-[#e8b95d] uppercase">
            PLANNING A SIMILAR INSTALLATION?
          </span>
          <h2 className="font-serif text-[28px] sm:text-[38px] text-white mt-2 leading-[1.2]">
            Discuss Your Project with a Glazing Specialist
          </h2>
          <p className="mt-4 text-[13px] sm:text-[14px] leading-[1.8] text-[#9a948c]">
            Get expert guidance on structural calculations, glass specifications, and hardware selection for your villa, penthouse, or commercial workspace.
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
              BOOK SITE CONSULTATION
            </button>
            <a
              href={`https://wa.me/918810369142?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-3.5 text-[11px] font-bold tracking-[1px] text-[#25D366] hover:bg-[#25D366] hover:text-black transition"
            >
              <FaWhatsapp size={16} />
              <span>WHATSAPP INQUIRY</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
