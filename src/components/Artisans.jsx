import { FiAward, FiArrowRight } from "react-icons/fi";

const team = [
  {
    name: "ALISTAIR VANCE",
    role: "PRINCIPAL ARCHITECT & FOUNDER",
    location: "ZURICH / NEW YORK",
    bio: "Former protégé of Peter Zumthor, leading conceptual architecture and monolithic stone curation across Europe and North America for over two decades.",
    credentials: "RIBA • SIA • 22 YRS LEADERSHIP",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "ELENA ROSTOVA",
    role: "HEAD OF INTERIOR ARCHITECTURE & MATERIALS",
    location: "MILAN ATELIER",
    bio: "Specializing in rare timber joinery, tactile sensory acoustics, and museum-grade material finishes. Featured in AD100 International Designers.",
    credentials: "MILAN POLY • AD100 • 16 YRS PRACTICE",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "MATTEO ROSSI",
    role: "MASTER CABINETMAKER & ATELIER DIRECTOR",
    location: "VENETO ATELIER",
    bio: "Third-generation Venetian guild master supervising bespoke millwork fabrication, bookmatched rare veneers, and lost-wax cast bronzes.",
    credentials: "VENETO GUILD MASTER • 28 YRS MASTERY",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=900&auto=format&fit=crop",
  },
];

export default function Artisans() {
  return (
    <section
      id="artisans"
      className="relative overflow-hidden bg-[#090909] py-24 sm:py-28 lg:py-32 px-6 sm:px-10 md:px-20 text-left border-t border-white/5"
    >
      <div className="mx-auto max-w-[1700px]">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#e8b95d]" />
              <span className="text-[10px] font-semibold tracking-[2px] text-[#e8b95d]">
                LEADERSHIP & ATELIER
              </span>
            </div>

            <h2 className="font-serif text-[36px] sm:text-[46px] lg:text-[52px] leading-[1.1] text-[#f1eee9]">
              Bespoke Minds shaping{" "}
              <br className="hidden sm:inline" />
              <em className="text-[#e8b95d] not-italic italic font-serif">
                Uncompromising Spaces.
              </em>
            </h2>
          </div>

          <p className="max-w-[480px] text-[13px] sm:text-[14px] leading-[1.8] text-[#9a948c]">
            A coalition of licensed Swiss architects, Venetian cabinetmakers, and
            stone mastercraftsmen dedicated to creating enduring private realms.
          </p>
        </div>

        {/* ================= 3 CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {team.map((member) => (
            <div
              key={member.name}
              className="group relative overflow-hidden rounded-xl bg-[#111] border border-white/5 transition-all duration-500 hover:border-[#e8b95d]/40 hover:shadow-2xl hover:shadow-black"
            >
              {/* Portrait Frame */}
              <div className="relative h-[380px] sm:h-[420px] lg:h-[460px] w-full overflow-hidden bg-[#161616]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover grayscale contrast-115 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  loading="lazy"
                />

                {/* Dramatic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-black/30 to-transparent" />

                {/* Location Badge */}
                <div className="absolute top-5 right-5 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-[9px] font-bold tracking-[1.5px] text-[#e8b95d] border border-white/10">
                  {member.location}
                </div>
              </div>

              {/* Bio Content */}
              <div className="p-7 sm:p-8 bg-[#101010]/95 backdrop-blur-md border-t border-white/5">
                <span className="text-[10px] font-bold tracking-[1.5px] text-[#e8b95d]">
                  {member.role}
                </span>

                <h3 className="font-serif text-[22px] sm:text-[25px] text-white mt-1 group-hover:text-[#e8b95d] transition-colors">
                  {member.name}
                </h3>

                <p className="mt-3 text-[12px] sm:text-[13px] leading-[1.7] text-[#938e87]">
                  {member.bio}
                </p>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-[#aaa]">
                  <div className="flex items-center gap-1.5 text-[#e8b95d]">
                    <FiAward size={13} />
                    <span className="font-semibold tracking-[1px]">
                      {member.credentials}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
