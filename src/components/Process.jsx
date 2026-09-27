import { useState } from "react";
import {
  FiCheckCircle,
  FiMessageSquare,
  FiCompass,
  FiLayers,
  FiFileText,
  FiCpu,
  FiAward,
  FiShield,
} from "react-icons/fi";

const phases = [
  {
    step: "01",
    icon: FiMessageSquare,
    title: "QUERY REQUIREMENTS",
    tagline: "Step 01",
    summary:
      "Initial client consultation to understand spatial design intent, functional criteria, and design vision.",
    deliverables: [
      "Consultation on spatial aesthetics & usage needs",
      "Acoustic and transparency requirement analysis",
      "Preliminary typology & mechanism guidance",
    ],
  },
  {
    step: "02",
    icon: FiCompass,
    title: "MEASUREMENTS OF AREA",
    tagline: "Step 02",
    summary:
      "On-site precision laser surveying to inspect opening dimensions, floor level variances, and wall plumb.",
    deliverables: [
      "Sub-millimeter laser-calibrated aperture mapping",
      "Floor level, ceiling track, and plumb check",
      "Structural load & jamb capacity verification",
    ],
  },
  {
    step: "03",
    icon: FiLayers,
    title: "CHOOSE OF PRODUCT",
    tagline: "Step 03",
    summary:
      "Selecting bespoke door typologies, fluted or clear glass variants, profile aesthetics, and hardware finishes.",
    deliverables: [
      "Door system choice (pivot, sliding, telescopic, partition)",
      "Glass texture selection (low-iron, fluted, reeded, tinted)",
      "Anodized aluminium & PVD titanium hardware sampling",
    ],
  },
  {
    step: "04",
    icon: FiFileText,
    title: "QUOTATION OFFER",
    tagline: "Step 04",
    summary:
      "Transparent commercial quotation detailing engineered specifications, material costs, and delivery timeline.",
    deliverables: [
      "Transparent, itemized pricing breakdown",
      "Production timeline and handover schedule",
      "Engineering specifications & warranty coverage terms",
    ],
  },
  {
    step: "05",
    icon: FiCpu,
    title: "PRODUCTION & MANUFACTURING",
    tagline: "Step 05",
    summary:
      "High-precision CNC cutting, automated tempering furnaces, and custom profile joinery off-site in our atelier.",
    deliverables: [
      "Automated CNC glass edge-polishing and waterjet cutouts",
      "Thermal glass tempering with distortion quality testing",
      "Factory dry-fit assembly & pivot mechanism calibration",
    ],
  },
  {
    step: "06",
    icon: FiAward,
    title: "INSTALLATION",
    tagline: "Step 06",
    summary:
      "White-glove on-site installation by certified glaziers, laser alignment, and soft-close calibration.",
    deliverables: [
      "Dust-free on-site mounting by specialized technicians",
      "Hydraulic soft-close speed and zero-gap alignment tuning",
      "Final optical polish, inspection, and ceremonial handover",
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
              6 Steps of Our Process.
            </em>
          </h2>

          <p className="mt-5 text-[13px] sm:text-[15px] leading-[1.8] text-[#9a948c]">
            A seamless, transparent architectural journey from initial query
            consultation through laser measurement, production, and white-glove
            installation.
          </p>
        </div>

        {/* ================= 6 STEPS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
          {phases.map((phase, idx) => {
            const Icon = phase.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={phase.step}
                onClick={() => setActiveStep(idx)}
                className={`group relative cursor-pointer rounded-xl p-5 sm:p-6 transition-all duration-300 border text-left flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#171614] border-[#e8b95d] shadow-xl shadow-[#e8b95d]/10 translate-y-[-4px]"
                    : "bg-[#101010] border-white/5 hover:border-white/20 hover:bg-[#131313]"
                }`}
              >
                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full font-serif text-[14px] font-bold border transition-all ${
                        isSelected
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
                  <h3 className="font-serif text-[15px] sm:text-[16px] text-[#f1eee9] leading-[1.3] group-hover:text-[#e8b95d] transition-colors">
                    {phase.title}
                  </h3>

                  {/* Summary */}
                  <p className="mt-2.5 text-[11px] leading-[1.6] text-[#8e8880]">
                    {phase.summary}
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isSelected ? "bg-[#e8b95d] animate-pulse" : "bg-[#444]"
                    }`}
                  />
                  <span className="text-[9px] tracking-[1px] font-medium text-[#aaa]">
                    {isSelected ? "ACTIVE STEP" : "VIEW DETAILS"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= EXPANDED ACTIVE STEP DETAILS ================= */}
        <div className="rounded-xl border border-[#e8b95d]/30 bg-[#121110] p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 text-[#e8b95d] text-[10px] font-bold tracking-[2px] mb-2">
                <span>STEP {phases[activeStep].step} DEEP DIVE</span>
                <span>•</span>
                <span>{phases[activeStep].tagline}</span>
              </div>

              <h4 className="font-serif text-[24px] sm:text-[30px] text-white">
                {phases[activeStep].title}
              </h4>

              <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.8] text-[#9f9a91]">
                {phases[activeStep].summary} Executed by Kazo Glass & Door’s
                in-house engineering team and certified glazier technicians to
                guarantee 0.4mm tolerance standards.
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
                Rigorous Turnkey Delivery & Handover Guarantee*
              </h5>
              <p className="text-[11px] text-[#8e8880] mt-0.5">
                Applicable across custom pivot doors, sliding partitions, and architectural glazing systems.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="shrink-0 bg-[#e8b95d] px-6 py-3 text-[10px] font-bold tracking-[1.5px] text-black hover:bg-[#f5d084] transition"
          >
            START YOUR INQUIRY
          </a>
        </div>
      </div>
    </section>
  );
}
