import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    quote:
      "The pivot front door and slim sliding glass partitions completely transformed our living space. The door moves with zero effort and closes with a quiet, satisfying feel. The Kazo team handled everything cleanly from measurement to final fitting.",
    author: "VIKRAM MALHOTRA",
    residence: "Private Villa, New Delhi",
    commissionYear: "PROJECT COMPLETED 2025",
    initials: "VM",
  },
  {
    quote:
      "As an architect, finding dependable partners who deliver clean glass detailing on schedule is rare. Kazo fabricated our office fluted partitions and acoustic meeting room doors with great precision. Our clients love the space.",
    author: "ANANYA SEN",
    residence: "Principal Architect, Gurugram",
    commissionYear: "COMMERCIAL PROJECT 2025",
    initials: "AS",
  },
  {
    quote:
      "We visited their showroom in Delhi before deciding on our wardrobe glass shutters and walk-in shower cubicles. Seeing the quality in person made the decision easy. The fitting was smooth, clean, and done right on schedule.",
    author: "RAJESH & NEHA KAPOOR",
    residence: "Apartment Renovation, South Delhi",
    commissionYear: "HOME RENOVATION 2024",
    initials: "RK",
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
            Honest feedback from homeowners, architects, and interior designers
            who trusted Kazo Glass & Door for their spaces.
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
