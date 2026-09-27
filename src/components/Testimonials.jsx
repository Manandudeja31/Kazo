import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    quote:
      "Atelier Obsidian transformed our duplex into an acoustic haven. The Calacatta bookmatching in the salon is nothing short of museum sculpture.",
    author: "LORD SEBASTIAN K.",
    residence: "Mayfair Penthouse, London",
    commissionYear: "COMMISSION 2024",
    initials: "SK",
  },
  {
    quote:
      "Their 0.4mm tolerance standard is genuine. In 30 years of commissioning residential properties globally, I have never seen timber joinery executed with such immaculate silence.",
    author: "HIROSHI TANAKA",
    residence: "Private Villa, Kyoto",
    commissionYear: "COMMISSION 2025",
    initials: "HT",
  },
  {
    quote:
      "From direct quarry selection in Carrara to the final ceremonial key handover, the bureau exhibited unparalleled discretion, timing, and architectural prowess.",
    author: "MARIE-CLAIRE DE LA TOUR",
    residence: "Alpine Retreat, Gstaad",
    commissionYear: "COMMISSION 2025",
    initials: "MC",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#090909] py-24 sm:py-28 lg:py-32 px-6 sm:px-10 md:px-20 text-left border-t border-white/5"
    >
      <div className="mx-auto max-w-[1700px]">
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#e8b95d]" />
            <span className="text-[10px] font-semibold tracking-[2px] text-[#e8b95d]">
              CLIENT PERSPECTIVES
            </span>
          </div>

          <h2 className="font-serif text-[34px] sm:text-[46px] lg:text-[50px] leading-[1.1] text-[#f1eee9]">
            Endorsement of{" "}
            <em className="text-[#e8b95d] not-italic italic font-serif">
              Bespoke Mastery.
            </em>
          </h2>

          <p className="mt-4 text-[13px] sm:text-[14px] leading-[1.8] text-[#938e87]">
            Strict discretion governs our relationships. Client identities are
            redacted in accordance with international Non-Disclosure Agreements.
          </p>
        </div>

        {/* ================= 3 CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-xl bg-[#111111] p-8 sm:p-9 border border-white/5 shadow-xl transition-all duration-300 hover:border-[#e8b95d]/30 hover:bg-[#131313]"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#e8b95d] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={15} fill="currentColor" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-serif text-[18px] sm:text-[20px] italic leading-[1.7] text-[#e3ded6]">
                  “{item.quote}”
                </blockquote>
              </div>

              {/* Author footer */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1e1c18] border border-[#e8b95d]/30 font-serif text-[13px] font-bold text-[#e8b95d]">
                  {item.initials}
                </div>

                <div>
                  <h4 className="text-[12px] font-bold tracking-[1.5px] text-[#f4efe8]">
                    {item.author}
                  </h4>
                  <p className="text-[11px] text-[#8e8880] mt-0.5">
                    {item.residence}
                  </p>
                  <span className="text-[9px] tracking-[1px] font-semibold text-[#e8b95d]/80">
                    {item.commissionYear}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
