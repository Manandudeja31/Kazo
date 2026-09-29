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
    description: "Custom doors, windows, and glass installations for homes, villas, and workspaces",
  },
  {
    icon: FiAward,
    title: "40+ Years of Craftsmanship",
    description: "Generations of hands-on experience in glass processing, frame making, and on-site fitting",
  },
  {
    icon: FiLayers,
    title: "11 Product Categories",
    description: "Pivot doors, sliding partitions, windows, shower cubicles, and architectural glass",
  },
];

function StatCard({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3.5 sm:gap-4 text-left">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#202020] border border-white/5 text-[#e8b95d]">
        <Icon size={19} />
      </div>

      <div>
        <h3 className="font-serif text-[17px] text-[#eee] sm:text-[19px]">
          {title}
        </h3>

        <p className="mt-1 text-[12px] sm:text-[11px] leading-[1.5] text-[#999] md:max-w-[240px]">
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
      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] md:min-h-[calc(100vh-72px)] flex-col justify-center text-left pt-8 sm:pt-14 pb-8 md:pb-40 lg:pb-44 px-5 sm:px-8 md:px-16 lg:px-20 max-w-[1500px]">
        <div className="w-full max-w-4xl">
          {/* Eyebrow */}
          <div className="mb-4 sm:mb-6 flex items-center gap-3">
            <span className="h-px w-8 sm:w-9 bg-[#dcae59]" />

            <span className="text-[9px] font-semibold tracking-[2px] text-[#dcae59] sm:text-[10px]">
              KAZO ARCHITECTURAL GLASS & DOORS
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-[32px] sm:text-[46px] md:text-[58px] lg:text-[66px] leading-[1.12] text-[#f4f1ec]">
            Crafting Beautiful Glass
            <br />
            <span>
              & <em className="text-[#e8b961] not-italic font-serif">Architectural Doors.</em>
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 sm:mt-6 max-w-[650px] text-[14px] sm:text-[16px] leading-[1.7] text-[#aaa49d]">
            We design and craft custom doors, windows, and glass solutions that
            bring natural light, quiet comfort, and effortless elegance into your
            home or office. Built with precision, installed with care.
          </p>

          {/* Buttons */}
          <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3.5 mb-6 md:mb-0">
            <a
              href="#portfolio"
              className="group flex h-12 w-full sm:w-auto items-center justify-center gap-3 bg-[#edc16e] px-7 text-[11px] font-semibold tracking-[1.5px] text-black transition hover:bg-[#f5d084] shadow-lg shadow-[#edc16e]/10 cursor-pointer"
            >
              EXPLORE GLASS & DOORS
              <FiArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="#contact"
              className="flex h-12 w-full sm:w-auto items-center justify-center gap-3 border border-white/10 bg-[#202020]/90 px-6 text-[11px] font-semibold tracking-[1.5px] text-[#ddd] transition hover:bg-[#292929] cursor-pointer"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3b3425] text-[#e9b95e]">
                <FiPlay size={10} fill="currentColor" />
              </span>
              WATCH OUR STORY (2:14)
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-20 w-full px-5 sm:px-8 pb-14 md:pb-0 md:absolute md:bottom-8 lg:bottom-12 md:left-1/2 md:-translate-x-1/2 md:w-[calc(100%-80px)] lg:w-[calc(100%-120px)] md:max-w-[84rem] md:px-0">
        <div className="grid gap-6 bg-[#111111]/95 border border-white/10 p-5 sm:p-6 lg:p-7 backdrop-blur-md shadow-2xl rounded-sm grid-cols-1 md:grid-cols-3">
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
