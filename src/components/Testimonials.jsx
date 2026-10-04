import { useState, useRef, useEffect } from "react";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
  {
    product: "Aluminium Window",
    quote:
      "We got aluminium windows installed for our bedrooms and living room. The frames are slim and feel very sturdy. Even during heavy rain, there was no water leakage at all and outside traffic noise has reduced a lot. The team did the measurement and fitting very cleanly without creating any mess.",
    author: "SONAM KOKRA",
    commissionYear: "COMPLETED 2025",
    initials: "SK",
  },
  {
    product: "Sliding Glass",
    quote:
      "Got sliding glass doors installed between our living room and balcony. The glass feels solid and the doors slide very smoothly without getting stuck. It brings in lots of sunlight and makes the space look much bigger. Very satisfied with the timely delivery and fitting.",
    author: "SURINDER KAUR",
    commissionYear: "COMPLETED 2025",
    initials: "SK",
  },
  {
    product: "Shower Cubicle & Designer Mirror",
    quote:
      "Ordered a shower cubicle and a designer mirror for our bathroom. The mirror looks really good on the wall with the backlight, and the shower partition keeps the rest of the bathroom completely dry. Good quality glass and fittings, and the installation was done without any hassle.",
    author: "BOBBY",
    commissionYear: "COMPLETED 2025",
    initials: "B",
  },
  {
    product: "uPVC Window",
    quote:
      "We replaced our old windows with uPVC windows from Kazo. You can see the difference immediately — very little dust comes in now and street noise is almost gone. The handles and locks work smoothly. Really glad we chose them for our home.",
    author: "SHVETA",
    commissionYear: "COMPLETED 2024",
    initials: "S",
  },
  {
    product: "Fabric Glass",
    quote:
      "We chose fabric glass for our partition wall to get privacy without making the room feel dark. The fabric pattern inside the glass looks really nice when lights are turned on. Everyone who visits our house asks where we got it made. Very neat work by the Kazo team.",
    author: "GURVEER SINGH",
    commissionYear: "COMPLETED 2025",
    initials: "GS",
  },
];

export default function Testimonials() {
  const scrollRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft } = scrollRef.current;

    const firstCard = scrollRef.current.children[0];
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const gap = 24; // gap-6
      const newIdx = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIdx(Math.min(Math.max(newIdx, 0), testimonials.length - 1));
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      checkScroll();
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scrollToCard = (index) => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.children[0];
    const cardWidth = firstCard ? firstCard.offsetWidth : 380;
    const scrollAmount = (cardWidth + 24) * index;
    scrollRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const firstCard = scrollRef.current.children[0];
    const cardWidth = firstCard ? firstCard.offsetWidth : 380;
    const scrollAmount = cardWidth + 24;

    if (direction === "right") {
      if (scrollLeft >= scrollWidth - clientWidth - 25) {
        scrollToCard(0);
      } else {
        scrollRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    } else {
      if (scrollLeft <= 25) {
        scrollToCard(testimonials.length - 1);
      } else {
        scrollRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  // Auto-scroll every 3.8s, pauses on hover / touch
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 25;

      if (isAtEnd) {
        scrollToCard(0);
      } else {
        const firstCard = scrollRef.current.children[0];
        const cardWidth = firstCard ? firstCard.offsetWidth : 380;
        const scrollAmount = cardWidth + 24;
        scrollRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#090909] py-14 sm:py-16 lg:py-20 px-6 sm:px-10 md:px-20 text-left border-t border-white/5"
    >
      <div className="mx-auto max-w-[1700px]">
        {/* ================= HEADER & ARROW CONTROLS ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#e8b95d]" />
              <span className="text-[10px] font-semibold tracking-[2px] text-[#e8b95d]">
                WHAT OUR CLIENTS SAY
              </span>
            </div>

            <h2 className="font-serif text-[34px] sm:text-[46px] lg:text-[50px] leading-[1.1] text-[#f1eee9]">
              Real Experiences from{" "}
              <em className="text-[#e8b95d] not-italic italic font-serif">
                People Who Chose Kazo.
              </em>
            </h2>

            <p className="mt-4 text-[13px] sm:text-[14px] leading-[1.8] text-[#938e87]">
              Honest feedback from homeowners who trusted Kazo Glass & Door for
              their spaces.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <button
              onClick={() => handleScroll("left")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8b95d]/30 bg-[#161616] text-[#e8b95d] hover:bg-[#e8b95d] hover:text-black transition cursor-pointer shadow-lg shadow-[#e8b95d]/10"
              aria-label="Previous testimonials"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8b95d]/30 bg-[#161616] text-[#e8b95d] hover:bg-[#e8b95d] hover:text-black transition cursor-pointer shadow-lg shadow-[#e8b95d]/10"
              aria-label="Next testimonials"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ================= HORIZONTAL SCROLLABLE REVIEWS ================= */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth pb-4 pt-2 snap-x snap-mandatory"
        >
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="w-[310px] sm:w-[380px] lg:w-[420px] shrink-0 snap-start flex flex-col justify-between rounded-xl bg-[#111111] p-8 sm:p-9 border border-white/5 shadow-xl transition-all duration-300 hover:border-[#e8b95d]/30 hover:bg-[#131313]"
            >
              <div>
                {/* Product Tag + 5 Stars */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                  <span className="text-[10px] font-semibold tracking-[1px] uppercase text-[#e8b95d] bg-[#e8b95d]/10 px-2.5 py-1 rounded-full border border-[#e8b95d]/20">
                    {item.product}
                  </span>
                  <div className="flex items-center gap-1 text-[#e8b95d]">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-[14px] sm:text-[15px] leading-[1.8] text-[#d6d0c7]">
                  “{item.quote}”
                </blockquote>
              </div>

              {/* Author footer */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1e1c18] border border-[#e8b95d]/30 font-serif text-[13px] font-bold text-[#e8b95d]">
                    {item.initials}
                  </div>

                  <div>
                    <h4 className="text-[12px] font-bold tracking-[1.5px] text-[#f4efe8]">
                      {item.author}
                    </h4>
                  </div>
                </div>

                <span className="text-[9px] tracking-[1px] font-semibold text-[#e8b95d]/80 text-right shrink-0">
                  {item.commissionYear}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ================= PAGINATION / INDICATOR DOTS ================= */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeIdx === idx
                ? "w-8 bg-[#e8b95d]"
                : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
