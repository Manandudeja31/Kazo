import { useState, useEffect, useRef } from "react";
import { categoriesData } from "../data/categoriesData";
import {
  FiArrowLeft,
  FiMaximize2,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiPhone,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function CategoryDetailPage({
  categorySlug,
  onBack,
  onSelectCategory,
}) {
  const currentCategory =
    categoriesData.find((c) => c.slug === categorySlug) || categoriesData[0];

  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const pillsContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to enable/disable scroll buttons
  const checkScroll = () => {
    if (pillsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = pillsContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const handlePillsScroll = (direction) => {
    if (pillsContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      pillsContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 350);
    }
  };

  // Scroll to top when category changes & center active pill
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (pillsContainerRef.current) {
      const activePill = pillsContainerRef.current.querySelector(
        '[data-active="true"]'
      );
      if (activePill) {
        activePill.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }

    setTimeout(checkScroll, 200);
  }, [categorySlug]);

  useEffect(() => {
    checkScroll();
    const container = pillsContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        container.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const products = currentCategory?.products || [];
  const isComingSoon = currentCategory?.isComingSoon || products.length === 0;

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveLightboxIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveLightboxIndex((prev) =>
      prev === products.length - 1 ? 0 : prev + 1
    );
  };

  const activeProduct =
    activeLightboxIndex !== null ? products[activeLightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[#090909] text-[#f2efe9] pt-24 sm:pt-28">

      <div className="sticky top-[65px] sm:top-[95px] z-30 bg-[#0d0d0d]/95 backdrop-blur-md shadow-lg shadow-black/40">
        {/* ================= SUB-NAVIGATION / BREADCRUMB BAR ================= */}
        <div className="border-b border-white/10 bg-[#0d0d0d]/85 backdrop-blur-md px-5 sm:px-8 md:px-14 lg:px-20 py-3.5">
          <div className="mx-auto flex max-w-[1700px] flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <button
                onClick={onBack}
                className="group inline-flex items-center gap-2 rounded-full border border-[#e8b95d]/30 bg-[#e8b95d]/10 px-4 py-1.5 text-[11px] font-semibold tracking-wider text-[#e8b95d] hover:bg-[#e8b95d] hover:text-black transition-all cursor-pointer shadow-sm"
              >
                <FiArrowLeft
                  size={14}
                  className="transition-transform group-hover:-translate-x-1"
                />
                <span className="uppercase tracking-[1px]">Back to Categories</span>
              </button>

              {/* Breadcrumb text */}
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#777]">
                <span>/</span>
                <button
                  onClick={onBack}
                  className="hover:text-white transition cursor-pointer"
                >
                  Categories
                </button>
                <span>/</span>
                <span className="text-[#ccc] font-medium">
                  {currentCategory.title}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="flex items-center gap-3">
              <span className="hidden md:inline text-[11px] text-[#888]">
                Have questions about this category?
              </span>
              <a
                href={`https://wa.me/918810369142?text=${encodeURIComponent(
                  `Hi Kazo, I'm viewing your "${currentCategory.title}" gallery and have a question.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/30 px-3.5 py-1 text-[11px] font-bold tracking-wider transition-all"
              >
                <FaWhatsapp size={14} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* ================= CATEGORY SWITCHER PILLS (NO SCROLLBAR + ARROW BUTTONS) ================= */}
        <div className="border-b border-white/5 bg-[#121212]/95 backdrop-blur-md px-3 sm:px-6 md:px-12 lg:px-16 py-3">
          <div className="mx-auto flex max-w-[1700px] items-center gap-2.5">
            <span className="text-[10px] font-bold tracking-[1.5px] text-[#777] uppercase shrink-0 hidden xl:inline">
              Browse Categories:
            </span>

            {/* Left Arrow Button */}
            <button
              onClick={() => handlePillsScroll("left")}
              disabled={!canScrollLeft}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${canScrollLeft
                ? "border-white/20 bg-[#1e1e1e] text-[#e8b95d] hover:bg-[#e8b95d] hover:text-black cursor-pointer shadow-md hover:scale-105"
                : "border-white/5 bg-[#141414] text-[#444] cursor-not-allowed opacity-30"
                }`}
              aria-label="Scroll categories left"
            >
              <FiChevronLeft size={16} />
            </button>

            {/* Horizontal Pills Container without visible scrollbar */}
            <div
              ref={pillsContainerRef}
              className="no-scrollbar flex-1 overflow-x-auto scroll-smooth py-1 flex items-center gap-2"
            >
              {categoriesData.map((cat) => {
                const isActive = cat.slug === currentCategory.slug;
                return (
                  <button
                    key={cat.id}
                    data-active={isActive}
                    onClick={() => onSelectCategory(cat.slug)}
                    className={`rounded-full px-4 py-2 text-[11px] font-medium tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${isActive
                      ? "bg-[#e8b95d] text-black font-semibold shadow-md shadow-[#e8b95d]/20 scale-102"
                      : "bg-[#1c1c1c] text-[#aaa] hover:text-white hover:bg-[#262626] border border-white/5"
                      }`}
                  >
                    <span>{cat.title}</span>
                    {cat.isComingSoon && (
                      <span
                        className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${isActive
                          ? "bg-black/20 text-black"
                          : "bg-[#e8b95d]/20 text-[#e8b95d]"
                          }`}
                      >
                        Soon
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={() => handlePillsScroll("right")}
              disabled={!canScrollRight}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${canScrollRight
                ? "border-white/20 bg-[#1e1e1e] text-[#e8b95d] hover:bg-[#e8b95d] hover:text-black cursor-pointer shadow-md hover:scale-105"
                : "border-white/5 bg-[#141414] text-[#444] cursor-not-allowed opacity-30"
                }`}
              aria-label="Scroll categories right"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= CATEGORY HERO HEADER ================= */}
      <section className="relative overflow-hidden border-b border-white/5 py-12 sm:py-16 px-5 sm:px-8 md:px-14 lg:px-20 bg-gradient-to-b from-[#141414] to-[#090909]">
        <div className="mx-auto max-w-[1700px]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              {/* Eyebrow */}
              <div className="mb-3 flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#e8b95d] shadow-[0_0_8px_#e8b95d]" />
                <span className="text-[10px] font-bold tracking-[2px] text-[#e8b95d] uppercase">
                  Product Showcase • Category {currentCategory.id} of 11
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-[32px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.15] text-[#f2efe9]">
                {currentCategory.title}
              </h1>

              {/* Tagline */}
              <p className="mt-2 text-[14px] sm:text-[15px] text-[#c9c4bc] font-light">
                {currentCategory.tagline}
              </p>
            </div>

            {/* Stats / Count */}
            <div className="flex items-center gap-4 border-l border-white/10 pl-6 text-left">
              {isComingSoon ? (
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#e8b95d]/30 bg-[#e8b95d]/10 px-3.5 py-1 text-[11px] font-bold tracking-[1.5px] text-[#e8b95d] uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e8b95d] animate-pulse" />
                    In Curation
                  </span>
                  <p className="mt-1 text-[10px] font-semibold tracking-[1.5px] text-[#888] uppercase">
                    Coming Soon
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <span className="font-serif text-[28px] sm:text-[34px] font-light text-[#e8b95d]">
                      {products.length}
                    </span>
                    <p className="text-[10px] font-semibold tracking-[1.5px] text-[#888] uppercase">
                      Featured Designs
                    </p>
                  </div>
                  <div className="h-8 w-px bg-white/10 mx-2" />
                  <div>
                    <span className="font-serif text-[28px] sm:text-[34px] font-light text-[#f2efe9]">
                      0.4mm
                    </span>
                    <p className="text-[10px] font-semibold tracking-[1.5px] text-[#888] uppercase">
                      Built to Last
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT: GALLERY OR COMING SOON ================= */}
      <main className="py-12 sm:py-16 px-5 sm:px-8 md:px-14 lg:px-20">
        <div className="mx-auto max-w-[1700px]">
          {isComingSoon ? (
            /* ================= COMING SOON SHOWCASE ================= */
            <div className="py-8 sm:py-14 text-center max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#181818] via-[#121212] to-[#0c0c0c] border border-white/10 p-8 sm:p-14 shadow-2xl">
                {/* Subtle top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#e8b95d]/10 blur-3xl pointer-events-none rounded-full" />

                <div className="inline-flex items-center gap-2 rounded-full bg-[#e8b95d]/10 border border-[#e8b95d]/30 px-4 py-1.5 text-[11px] font-bold tracking-[2px] text-[#e8b95d] uppercase mb-6">
                  <span className="h-2 w-2 rounded-full bg-[#e8b95d] animate-ping" />
                  <span>Coming Soon</span>
                </div>

                <h2 className="font-serif text-[26px] sm:text-[36px] lg:text-[42px] text-white leading-tight">
                  New {currentCategory.title} Gallery Launching Soon
                </h2>

                <p className="mt-4 text-[13px] sm:text-[15px] text-[#a9a49c] max-w-2xl mx-auto leading-relaxed font-light">
                  We are currently photographing and curating our latest finished architectural projects, profiles, and factory mockups for this collection.
                </p>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  <div className="rounded-xl bg-white/[0.03] border border-white/5 p-5">
                    <span className="text-[10px] font-bold tracking-[1.5px] text-[#e8b95d] uppercase block mb-1">
                      01. Bespoke Fabrication
                    </span>
                    <h4 className="text-[15px] font-semibold text-white">
                      Custom Sizes & Specs
                    </h4>
                    <p className="mt-1.5 text-[12px] text-[#888] leading-relaxed">
                      Custom glass thicknesses, dimensions, and finishes are actively available for ongoing projects.
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/[0.03] border border-white/5 p-5">
                    <span className="text-[10px] font-bold tracking-[1.5px] text-[#e8b95d] uppercase block mb-1">
                      02. On-Site Support
                    </span>
                    <h4 className="text-[15px] font-semibold text-white">
                      Site Measurement Visits
                    </h4>
                    <p className="mt-1.5 text-[12px] text-[#888] leading-relaxed">
                      Our installation engineers can visit your location for precision laser measurements and feasibility.
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/[0.03] border border-white/5 p-5">
                    <span className="text-[10px] font-bold tracking-[1.5px] text-[#e8b95d] uppercase block mb-1">
                      03. Physical Samples
                    </span>
                    <h4 className="text-[15px] font-semibold text-white">
                      Showroom Swatches
                    </h4>
                    <p className="mt-1.5 text-[12px] text-[#888] leading-relaxed">
                      Visit our showroom in Delhi to inspect tactile samples, mockups, and complete architectural profiles.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={`https://wa.me/918810369142?text=${encodeURIComponent(
                      `Hi Kazo, I see the "${currentCategory.title}" gallery is coming soon. Please share your physical catalog, design options, and pricing.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#e8b95d] hover:bg-[#f3cd82] text-black px-7 py-3 text-[12px] font-bold tracking-[1.5px] uppercase transition shadow-lg shadow-[#e8b95d]/20 w-full sm:w-auto"
                  >
                    <FaWhatsapp size={16} />
                    <span>Request Catalogue on WhatsApp</span>
                  </a>

                  <button
                    onClick={onBack}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 text-[12px] font-semibold tracking-wider text-white transition cursor-pointer w-full sm:w-auto"
                  >
                    <span>Explore Other Categories</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ================= REGULAR PRODUCT GALLERY GRID ================= */
            <>
              <div className="mb-8 flex items-center justify-between text-left">
                <h2 className="text-[12px] font-bold tracking-[2px] text-[#888] uppercase">
                  Product Gallery & Designs ({products.length} Items)
                </h2>
                <p className="text-[11px] text-[#666]">
                  Click any image to view in high resolution
                </p>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
                {products.map((product, idx) => (
                  <div
                    key={product.id || idx}
                    className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#121212] border border-white/10 transition-all duration-500 hover:border-[#e8b95d]/60 hover:shadow-2xl hover:shadow-black"
                  >
                    {/* Image Container */}
                    <div
                      onClick={() => setActiveLightboxIndex(idx)}
                      className="relative h-[280px] sm:h-[320px] w-full cursor-pointer overflow-hidden bg-[#181818]"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        loading="lazy"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                      {/* Top Badge */}
                      {/* <div className="absolute top-4 left-4">
                        <span className="rounded bg-black/75 px-3 py-1 text-[9px] font-bold tracking-[1.5px] text-[#e8b95d] uppercase backdrop-blur-md border border-white/10">
                          {product.badge || "Bespoke"}
                        </span>
                      </div> */}

                      {/* Enlarge Hover Pill */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="inline-flex items-center gap-2 rounded-full bg-black/85 px-4 py-2 text-[11px] font-semibold text-white backdrop-blur-md border border-white/20 shadow-xl">
                          <FiMaximize2 size={13} className="text-[#e8b95d]" />
                          <span>View Full Image</span>
                        </span>
                      </div>
                    </div>

                    {/* Content & Actions */}
                    <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 bg-[#141414] border-t border-white/5">
                      <div>
                        <h3 className="font-serif text-[18px] sm:text-[20px] font-semibold text-[#f5f2eb] group-hover:text-[#e8b95d] transition-colors">
                          {product.title}
                        </h3>
                        <p className="mt-2 text-[12px] sm:text-[13px] leading-relaxed text-[#9e988f]">
                          {product.spec}
                        </p>
                      </div>

                      {/* Card Actions */}
                      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setActiveLightboxIndex(idx)}
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-[#b8b2a8] hover:text-[#e8b95d] transition-colors cursor-pointer"
                        >
                          <FiMaximize2 size={12} />
                          <span>Enlarge</span>
                        </button>

                        <a
                          href={`https://wa.me/918810369142?text=${encodeURIComponent(
                            `Hi Kazo, I'm interested in the "${product.title}" from your ${currentCategory.title} collection. Please share pricing and specs.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/30 px-3.5 py-1.5 text-[11px] font-bold tracking-wider transition-all duration-300"
                        >
                          <FaWhatsapp size={13} />
                          <span>Inquire</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ================= BOTTOM CONSULTATION BANNER ================= */}
          <div className="mt-16 sm:mt-20 rounded-2xl bg-gradient-to-r from-[#171717] via-[#1c1c1c] to-[#171717] border border-[#e8b95d]/30 p-8 sm:p-12 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold tracking-[2px] text-[#e8b95d] uppercase">
                Custom Sizes & Fitting
              </span>
              <h3 className="font-serif text-[24px] sm:text-[32px] text-white mt-1">
                Need custom sizes or an on-site visit?
              </h3>
              <p className="mt-2 text-[13px] sm:text-[14px] text-[#a8a298] leading-relaxed">
                Our team provides site visits, accurate measurements, and custom
                fabrication for all{" "}
                <span className="text-[#e8b95d]">{currentCategory.title}</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <a
                href={`https://wa.me/918810369142?text=${encodeURIComponent(
                  `Hi Kazo, I need a consultation and site measurement for ${currentCategory.title}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#e8b95d] hover:bg-[#f3cd82] text-black px-7 py-3 text-[12px] font-bold tracking-[1.5px] uppercase transition shadow-lg shadow-[#e8b95d]/20"
              >
                <FaWhatsapp size={16} />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={onBack}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 text-[12px] font-semibold tracking-wider text-white transition cursor-pointer"
              >
                <span>Browse All Categories</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ================= LIGHTBOX IMAGE MODAL ================= */}
      {activeLightboxIndex !== null && activeProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-xl transition-all"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#e8b95d] hover:text-black transition cursor-pointer"
            aria-label="Close image viewer"
          >
            <FiX size={22} />
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 border border-white/20 text-white hover:bg-[#e8b95d] hover:text-black transition cursor-pointer"
            aria-label="Previous image"
          >
            <FiChevronLeft size={24} />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 border border-white/20 text-white hover:bg-[#e8b95d] hover:text-black transition cursor-pointer"
            aria-label="Next image"
          >
            <FiChevronRight size={24} />
          </button>

          {/* Image & Meta Frame */}
          <div
            className="relative max-h-[92vh] max-w-5xl w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-xl bg-black border border-white/10 shadow-2xl max-h-[75vh]">
              <img
                src={activeProduct.image}
                alt={activeProduct.title}
                className="max-h-[75vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>

            {/* Meta bar */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 w-full bg-[#141414] border border-white/10 px-6 py-4 rounded-xl">
              <div className="text-left">
                <span className="text-[10px] font-bold tracking-[1.5px] text-[#e8b95d] uppercase">
                  {currentCategory.title} • {activeLightboxIndex + 1} of{" "}
                  {products.length}
                </span>
                <h4 className="font-serif text-[18px] sm:text-[20px] text-white">
                  {activeProduct.title}
                </h4>
                <p className="text-[12px] text-[#999]">{activeProduct.spec}</p>
              </div>

              <a
                href={`https://wa.me/918810369142?text=${encodeURIComponent(
                  `Hi Kazo, I'm inquiring about "${activeProduct.title}" (${currentCategory.title}). Please share details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-black px-5 py-2.5 text-[11px] font-bold tracking-wider hover:bg-[#20ba59] transition shrink-0"
              >
                <FaWhatsapp size={15} />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
