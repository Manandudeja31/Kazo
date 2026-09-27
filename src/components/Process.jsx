import { useState } from "react";
import {
  FiCheckCircle,
  FiSliders,
  FiLayers,
  FiFileText,
  FiShield,
  FiAward,
} from "react-icons/fi";

const phases = [
  {
    step: "01",
    icon: FiSliders,
    title: "SPATIAL AUDIT & CONCEPT",
    tagline: "Weeks 1–2",
    summary: "Site tomography, lifestyle blueprint, initial monolithic volume exploration.",
    deliverables: [
      "3D volumetric spatial scans",
      "Acoustic and natural solar orientation mapping",
      "Material palette sensory boards",
    ],
  },
  {
    step: "02",
    icon: FiLayers,
    title: "MATERIAL PROVENANCE",
    tagline: "Weeks 3–4",
    summary: "Private quarry visits, custom millwork mockups, rare veneer selection.",
    deliverables: [
      "Quarry slab inspection in Carrara & Verona",
      "Bookmatch alignment simulations",
      "Custom patinated bronze alloy testing",
    ],
  },
  {
    step: "03",
    icon: FiFileText,
    title: "TECHNICAL SCHEMATICS",
    tagline: "Weeks 5–6",
    summary: "0.4mm tolerance shop drawings, integrated MEP acoustics, lighting simulations.",
    deliverables: [
      "Sub-millimeter BIM coordination",
      "Concealed air-handling acoustic baffles",
      "Lutron & 2400K circadian lighting engineering",
    ],
  },
  {
    step: "04",
    icon: FiShield,
    title: "ATELIER FABRICATION",
    tagline: "Weeks 7–10",
    summary: "In-house European artisans craft every custom element offsite with surgical precision.",
    deliverables: [
      "Hand-finished Veneto joinery & timber ceilings",
      "CNC precision waterjet stone carving",
      "Pre-assembly dry fit at the Zurich atelier",
    ],
  },
  {
    step: "05",
    icon: FiAward,
    title: "WHITE-GLOVE COMMISSION",
    tagline: "Handover",
    summary: "Final turnkey staging, acoustic tuning, art curation, and ceremonial handover.",
    deliverables: [
      "Dust-free micro-installation",
      "Acoustic calibration & final decibel report",
      "Bound provenance archive & master keys in bronze chest",
    ],
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[#090909] py-24 sm:py-28 lg:py-32 px-6 sm:px-10 md:px-20 text-left border-t border-white/5"
    >
      <div className="mx-auto max-w-[1700px]">
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#e8b95d]" />
            <span className="text-[10px] font-semibold tracking-[2px] text-[#e8b95d]">
              OUR METHODOLOGY
            </span>
          </div>

          <h2 className="font-serif text-[34px] sm:text-[46px] lg:text-[52px] leading-[1.1] text-[#f1eee9]">
            Rigorous Execution Framework
            <br />
            <em className="text-[#e8b95d] not-italic italic font-serif">
              5 Phases of Mastery.
            </em>
          </h2>

          <p className="mt-5 text-[13px] sm:text-[15px] leading-[1.8] text-[#9a948c]">
            A bespoke architectural process engineered to eliminate friction,
            ensuring surgical precision and total transparency at every milestone.
          </p>
        </div>

        {/* ================= 5 STEPS ROW ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mb-12">
          {phases.map((phase, idx) => {
            const Icon = phase.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={phase.step}
                onClick={() => setActiveStep(idx)}
                className={`group relative cursor-pointer rounded-xl p-6 sm:p-7 transition-all duration-300 border text-left flex flex-col justify-between ${isSelected
                    ? "bg-[#171614] border-[#e8b95d] shadow-xl shadow-[#e8b95d]/10 translate-y-[-4px]"
                    : "bg-[#101010] border-white/5 hover:border-white/20 hover:bg-[#131313]"
                  }`}
              >
                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full font-serif text-[15px] font-bold border transition-all ${isSelected
                          ? "bg-[#e8b95d] text-black border-[#e8b95d]"
                          : "bg-[#1a1a1a] text-[#e8b95d] border-[#e8b95d]/30 group-hover:border-[#e8b95d]"
                        }`}
                    >
                      {phase.step}
                    </div>

                    <span className="text-[10px] font-semibold tracking-[1px] text-[#777]">
                      {phase.tagline}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-[16px] sm:text-[17px] text-[#f1eee9] leading-[1.3] group-hover:text-[#e8b95d] transition-colors">
                    {phase.title}
                  </h3>

                  {/* Summary */}
                  <p className="mt-3 text-[11px] leading-[1.6] text-[#8e8880]">
                    {phase.summary}
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-[#e8b95d] animate-pulse" : "bg-[#444]"
                      }`}
                  />
                  <span className="text-[9px] tracking-[1px] font-medium text-[#aaa]">
                    {isSelected ? "ACTIVE PHASE" : "VIEW DETAILS"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= EXPANDED ACTIVE PHASE DETAILS ================= */}
        <div className="rounded-xl border border-[#e8b95d]/30 bg-[#121110] p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 text-[#e8b95d] text-[10px] font-bold tracking-[2px] mb-2">
                <span>PHASE {phases[activeStep].step} DEEP DIVE</span>
                <span>•</span>
                <span>{phases[activeStep].tagline}</span>
              </div>

              <h4 className="font-serif text-[24px] sm:text-[30px] text-white">
                {phases[activeStep].title}
              </h4>

              <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.8] text-[#9f9a91]">
                {phases[activeStep].summary} All specifications are coordinated
                directly through dedicated bureau partners in Zurich, Milan, and
                New York, eliminating intermediary contractors.
              </p>
            </div>

            <div className="bg-[#181818] p-5 sm:p-6 rounded-lg border border-white/5">
              <p className="text-[10px] font-bold tracking-[1.5px] text-[#e8b95d] mb-4">
                CORE PROTOCOLS & DELIVERABLES:
              </p>

              <ul className="space-y-3">
                {phases[activeStep].deliverables.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-[12px] text-[#ccc]"
                  >
                    <FiCheckCircle
                      className="text-[#e8b95d] shrink-0 mt-0.5"
                      size={15}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ================= GUARANTEE BANNER ================= */}
        <div className="rounded-xl border border-white/10 bg-gradient-to-r from-[#14120e] via-[#161513] to-[#12110e] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2a2416] text-[#e8b95d] border border-[#e8b95d]/30">
              <FiShield size={22} />
            </div>

            <div>
              <h5 className="font-serif text-[18px] sm:text-[20px] text-[#f4efe8]">
                Rigorous 40 Working Days Handover Guarantee*
              </h5>
              <p className="text-[11px] text-[#8e8880] mt-0.5">
                Applicable for fully pre-fabricated salon suites and bespoke modular penthouses.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="shrink-0 bg-[#e8b95d] px-6 py-3 text-[10px] font-bold tracking-[1.5px] text-black hover:bg-[#f5d084] transition"
          >
            REQUEST TIMELINE AUDIT
          </a>
        </div>
      </div>
    </section>
  );
}
