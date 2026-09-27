import { FiAward } from "react-icons/fi";

const highlights = [
  {
    title: "DELHI SHOWROOM",
    text: "Visit our showroom to experience our doors, windows, partitions, and architectural glass in person.",
  },
  {
    title: "BESPOKE SPATIAL SOLUTIONS",
    text: "Tailored options engineered to elevate your residential or commercial space with refined practicality.",
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

            <span className="text-[10px] font-semibold tracking-[2px] text-[#e7b85d] uppercase">
              About Kazo Glass & Door™
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-[38px] leading-[1.2] text-[#f1eee9] sm:text-[45px] lg:text-[48px]">
            Elevating Spaces.
            <br />
            <em className="text-[#e4b45c]">Defining Luxury.</em>
          </h2>

          {/* Quote Card */}
          <div className="mt-8 rounded-xl bg-[#1d1d1d] px-6 py-7 sm:px-7 border border-white/5">
            <blockquote className="font-serif text-[17px] italic leading-[1.8] text-[#e8d9b7] sm:text-[18px]">
              “At Kazo Glass & Door™, we believe the right details can transform
              a space. From the clarity of an acoustic glass partition to the
              silent glide of a monolithic pivot door, we bring together
              materials and engineering that make interiors and exteriors feel
              considered, functional, and distinctly yours.”
            </blockquote>

            <p className="mt-3 text-[9px] font-medium tracking-[1.5px] text-[#aaa49b] uppercase">
              — KAZO GLASS & DOOR™
            </p>
          </div>

          {/* Description */}
          <div className="py-5 space-y-3.5 text-[14px] leading-[1.75] text-[#99948e]">
            <p>
              Our Delhi showroom offers a wide range of solutions, including
              aluminium and uPVC doors and windows, partitions and sliding
              systems, wardrobe glass doors, shower cubicles, glass railings,
              exterior façade systems, architectural louvers, surfaces,
              ceilings, and specialized acoustic glass.
            </p>
            <p>
              Whether you’re planning a home, renovating a room, or shaping a
              commercial space, we help you explore options that suit your
              vision and practical needs.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-md bg-[#0d0d0d] p-4 border border-white/5"
              >
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
              alt="Kazo Glass & Door architectural space"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />

            {/* Image dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>

          {/* Precision Standard Card */}
          <div className="absolute -bottom-8 left-0 z-10 w-[90%] rounded-xl bg-[#292929] p-5 shadow-2xl sm:-left-8 sm:w-[320px] border border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center text-[#e7b85d]">
                <FiAward size={19} />
              </div>

              <h3 className="text-[10px] font-bold tracking-[0.8px] text-[#ded9d2] uppercase">
                Kazo Glass & Door™
              </h3>
            </div>

            <p className="mt-3 text-[12px] leading-[1.7] text-[#a39e98]">
              Elevating Spaces. Defining Luxury — bringing together materials and
              designs that make every interior and exterior distinctly yours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
