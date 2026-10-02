import { FiAward, FiArrowRight } from "react-icons/fi";
import PankajPic from '../assets/team/pankaj.jpeg'
import ArshPic from '../assets/team/arsh.jpeg'


const team = [
  {
    name: "Pankaj",
    role: "FOUNDER & MANAGING DIRECTOR",
    bio: "An MCA graduate and former DevOps Engineer at a top MNC, he chose entrepreneurship to build Kazo. He is driven by curiosity, ambition, and a passion for creating something meaningful of his own.",
    credentials: "MCA • FORMER DEVOPS ENGINEER",
    image: PankajPic,
  },
  {
    name: "Arshpreet Singh Sandhu",
    role: "FOUNDER & DIRECTOR",
    bio: "Passionate about business since Class 12 Commerce, he founded Kazo to bring modern design, reliable quality, and complete glass and door solutions under one trusted name.",
    credentials: "FOUNDER • DESIGN & INNOVATION",
    image: ArshPic,
  },
  {
    name: "Sunil Verma",
    role: "CHIEF FABRICATION & INSTALLATION LEAD",
    bio: "Supervises precision glass cutting, tempering quality, and on-site fitting to make sure every pivot door swings silently and every frame aligns perfectly.",
    credentials: "MASTER FABRICATOR • 20 YRS MASTERY",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=900&auto=format&fit=crop",
  },
];

export default function Teams() {
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
                OUR EXPERTS & CRAFTSMEN
              </span>
            </div>

            <h2 className="font-serif text-[36px] sm:text-[46px] lg:text-[52px] leading-[1.1] text-[#f1eee9]">
              The People Behind the Craft.{" "}
              <br className="hidden sm:inline" />
              <em className="text-[#e8b95d] not-italic italic font-serif">
                Experience in Every Detail.
              </em>
            </h2>
          </div>

          <p className="max-w-[480px] text-[13px] sm:text-[14px] leading-[1.8] text-[#9a948c]">
            Our team brings together experienced architectural consultants,
            master glass fabricators, and skilled installation technicians with
            decades of real-world expertise.
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
