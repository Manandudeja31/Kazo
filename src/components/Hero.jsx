import {
  FiArrowRight,
  FiPlay,
  FiCheckCircle,
  FiAward,
  FiLayers,
} from "react-icons/fi";
import HeroBg from "../assets/HeroBg.png";

const stats = [
  {
    icon: FiCheckCircle,
    title: "200+ Projects Delivered",
    description: "Custom architectural glass facades, pivot doors & slimline systems",
  },
  {
    icon: FiAward,
    title: "40+ Years of Craftsmanship",
    description: "Generational mastery in precision tempering, architectural glass & frame engineering",
  },
  {
    icon: FiLayers,
    title: "11+ Bespoke Categories",
    description: "Pivot doors, fluted glass partitions, sliding systems & acoustic enclosures",
  },
];

function StatCard({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-4 text-left">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#242424] text-[#e8b95d]">
        <Icon size={19} />
      </div>

      <div>
        <h3 className="font-serif text-[18px] text-[#eee] sm:text-[20px]">
          {title}
        </h3>

        <p className="mt-1 max-w-[230px] text-[11px] leading-[1.5] text-[#999]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <main
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#090909] pt-[72px]"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HeroBg})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/50" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black" />

      {/* Hero Content */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] text-left items-center justify-center md:pb-36 pb-66 pt-16 px-10 md:px-20">
        <div className="w-full md:mr-20">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-9 bg-[#dcae59]" />

            <span className="text-[9px] font-semibold tracking-[2px] text-[#dcae59] sm:text-[10px]">
              KAZO ARCHITECTURAL GLASS & DOORS
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-[42px] leading-[1.05] text-[#f4f1ec] sm:text-[56px] md:text-[64px] lg:text-[66px]">
            Curators of Bespoke Glass
            <br />
            <span>
              & <em className="text-[#e8b961]">Architectural Doors.</em>
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-[650px] pb-10 text-[15px] leading-[1.75] text-[#aaa49d] sm:text-[16px]">
            Boutique architectural glazing, monolithic pivot doors, and custom
            sliding partitions tailored to discerning clientele worldwide. We
            sculpt light, spatial transparency, and acoustic comfort into bespoke
            private sanctuaries.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row mb-40">
            <a
              href="#portfolio"
              className="group flex h-12 items-center justify-center gap-4 bg-[#edc16e] px-8 text-[10px] font-semibold tracking-[1px] text-black transition hover:bg-[#f5d084]"
            >
              EXPLORE GLASS & DOORS
              <FiArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="#contact"
              className="flex h-12 items-center justify-center gap-3 border border-white/5 bg-[#202020]/90 px-7 text-[10px] font-semibold tracking-[1px] text-[#ddd] transition hover:bg-[#292929]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3b3425] text-[#e9b95e]">
                <FiPlay size={10} fill="currentColor" />
              </span>
              WATCH ATELIER FILM (2:14)
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="absolute bottom-24 left-1/2 z-20 w-[calc(100%-40px)] -translate-x-1/2 px-10 md:px-14">
        <div className="grid gap-7 bg-[#101010]/95 px-6 py-7 backdrop-blur-md md:w-full grid-cols-1 md:grid-cols-3 lg:px-8">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              icon={stat.icon}
              title={stat.title}
              description={stat.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
