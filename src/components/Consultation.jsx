import { useState } from "react";
import { FiLock, FiCheckCircle, FiSend } from "react-icons/fi";

export default function Consultation() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    typology: "Penthouse",
    investment: "$3M - $7M",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#090909] py-24 sm:py-28 lg:py-32 px-6 sm:px-10 md:px-20 text-center border-t border-white/5"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-[#e8b95d]/5 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* ================= HEADER ================= */}
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#e8b95d]" />
            <span className="text-[10px] font-semibold tracking-[2px] text-[#e8b95d]">
              COMMISSION AN ATELIER
            </span>
          </div>

          <h2 className="font-serif text-[34px] sm:text-[46px] lg:text-[52px] leading-[1.1] text-[#f1eee9]">
            Reserve Your{" "}
            <em className="text-[#e8b95d] not-italic italic font-serif">
              Private Consultation.
            </em>
          </h2>

          <p className="mt-4 max-w-xl mx-auto text-[13px] sm:text-[14px] leading-[1.8] text-[#938e87]">
            We accept a strictly limited number of private residential
            commissions annually to ensure direct principal immersion and
            sub-millimeter craftsmanship.
          </p>
        </div>

        {/* ================= FORM CARD ================= */}
        <div className="rounded-2xl border border-white/10 bg-[#121212]/90 p-8 sm:p-12 text-left shadow-2xl backdrop-blur-xl">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1f1b13] text-[#e8b95d] border border-[#e8b95d]/30">
                <FiCheckCircle size={32} />
              </div>
              <h3 className="font-serif text-[26px] sm:text-[30px] text-white">
                Consultation Request Received
              </h3>
              <p className="mt-3 max-w-md mx-auto text-[13px] leading-[1.7] text-[#9a948c]">
                Our Managing Principal will review your project brief under
                strict confidentiality and contact you within 24 hours to schedule
                a private virtual or in-person briefing.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 bg-[#1f1f1f] px-6 py-2.5 text-[10px] font-bold tracking-[1.5px] text-[#e8b95d] hover:bg-[#282828] transition border border-[#e8b95d]/30"
              >
                SUBMIT ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-[#aaa] uppercase mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="e.g. Alistair Vance"
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-white placeholder-[#555] focus:border-[#e8b95d] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-[#aaa] uppercase mb-2">
                    Confidential Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="e.g. principal@estate.ch"
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-white placeholder-[#555] focus:border-[#e8b95d] focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-[#aaa] uppercase mb-2">
                    Direct Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 (212) 000-0000"
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-white placeholder-[#555] focus:border-[#e8b95d] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-[#aaa] uppercase mb-2">
                    Project Location / City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g. London, Zurich, Aspen, Minato"
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-white placeholder-[#555] focus:border-[#e8b95d] focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Row 3: Typology & Investment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-[#aaa] uppercase mb-2">
                    Spatial Typology
                  </label>
                  <select
                    value={formData.typology}
                    onChange={(e) =>
                      setFormData({ ...formData, typology: e.target.value })
                    }
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-[#e8b95d] focus:border-[#e8b95d] focus:outline-none transition"
                  >
                    <option value="Penthouse">Penthouse / Duplex</option>
                    <option value="Private Villa">Private Estate / Villa</option>
                    <option value="Alpine Chalet">Alpine Chalet</option>
                    <option value="Superyacht Interior">Superyacht Interior</option>
                    <option value="Boutique Commercial">Boutique Commercial / Atelier</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-[#aaa] uppercase mb-2">
                    Anticipated Investment Scope
                  </label>
                  <select
                    value={formData.investment}
                    onChange={(e) =>
                      setFormData({ ...formData, investment: e.target.value })
                    }
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-[#e8b95d] focus:border-[#e8b95d] focus:outline-none transition"
                  >
                    <option value="$1M - $3M">$1,000,000 — $3,000,000</option>
                    <option value="$3M - $7M">$3,000,000 — $7,000,000</option>
                    <option value="$7M+">$7,000,000+</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Project Brief */}
              <div>
                <label className="block text-[10px] font-bold tracking-[1.5px] text-[#aaa] uppercase mb-2">
                  Project Brief & Material Preferences
                </label>
                <textarea
                  rows="4"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Describe your property volume, desired stone finishes, or target timeline..."
                  className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-white placeholder-[#555] focus:border-[#e8b95d] focus:outline-none transition resize-none"
                ></textarea>
              </div>

              {/* Bottom Submit Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[11px] text-[#777]">
                  <FiLock className="text-[#e8b95d]" size={14} />
                  <span>Strict confidentiality & bilateral NDAs honored</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#e8b95d] px-8 py-3.5 text-[11px] font-bold tracking-[1.5px] text-black hover:bg-[#f5d084] transition shadow-lg shadow-[#e8b95d]/20 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>PROCESSING...</span>
                  ) : (
                    <>
                      <span>CONFIRM CONSULTATION REQUEST</span>
                      <FiSend size={13} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
