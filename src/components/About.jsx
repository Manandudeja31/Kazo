import { FiAward } from "react-icons/fi";

const highlights = [
  {
    title: "DIRECT QUARRY ACCESS",
    text: "Hand-selected bookmatched slabs with verified provenance.",
  },
  {
    title: "IN-HOUSE MILLWORK",
    text: "Private Italian fabrication centers achieving sub-millimeter tolerances.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative mx-auto overflow-hidden bg-[#090909] py-20 sm:py-24 lg:py-28 px-10 md:px-20"
    >
      <div className="mx-auto grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-14 lg:px-0">
        {/* ================= LEFT CONTENT ================= */}
        <div className="flex flex-col text-left justify-center">
          {/* Eyebrow */}
          <div className="mb-7 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#e7b85d]" />

            <span className="text-[10px] font-semibold tracking-[2px] text-[#e7b85d]">
              ARTISANAL HERITAGE & ETHOS
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-[38px] leading-[1.2] text-[#f1eee9] sm:text-[45px] lg:text-[43px]">
            Where Monolithic Stone
            <br />
            Meets <em className="text-[#e4b45c]">Sensory Restraint.</em>
          </h2>

          {/* Quote Card */}
          <div className="mt-8 rounded-xl bg-[#1d1d1d] px-6 py-7 sm:px-7">
            <blockquote className="font-serif text-[18px] italic leading-[1.8] text-[#e8d9b7] sm:text-[19px]">
              “Design is not merely visual; it is an intimate sensory sanctuary
              crafted from silence, shadow, and unyielding materiality.”
            </blockquote>

            <p className=" text-[9px] font-medium tracking-[1px] text-[#aaa49b]">
              — ALISTAIR VANCE, PRINCIPAL ARCHITECT
            </p>
          </div>

          {/* Description */}
          <p className="py-4 text-[14px] leading-[1.7] text-[#99948e]">
            Founded in Zurich with active design bureaus in New York, Milan, and
            Dubai, Atelier Obsidian bridges the rigor of classical European
            joinery with bold contemporary spatial planning. We bypass mass
            supply chains, sourcing exclusively through generational quarries in
            Carrara, bespoke cabinetmakers in the Veneto, and hand-applied
            acoustic plasters.
          </p>

          {/* Feature Cards */}
          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-md bg-[#0d0d0d] p-4">
                <h3 className="text-[10px] font-semibold tracking-[0.8px] text-[#e7b85d]">
                  {item.title}
                </h3>

                <p className="mt-2 text-[11px] leading-[1.6] text-[#918c86]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="relative">
          {/* Image */}
          <div className="relative h-[470px] overflow-hidden rounded-t-xl sm:h-[550px] lg:h-[650px] bg-[#141414]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
              alt="Calacatta Viola marble architectural interior"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />

            {/* Image dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>

          {/* Precision Standard Card */}
          <div className="absolute -bottom-8 left-0 z-10 w-[90%] rounded-xl bg-[#292929] p-5 shadow-2xl sm:-left-8 sm:w-[310px]">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center text-[#e7b85d]">
                <FiAward size={19} />
              </div>

              <h3 className="text-[10px] font-bold tracking-[0.8px] text-[#ded9d2]">
                PRECISION STANDARD
              </h3>
            </div>

            <p className="mt-3 text-[12px] leading-[1.7] text-[#a39e98]">
              Every joinery joint and shadow reveal is engineered to 0.4mm
              tolerance before site installation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
