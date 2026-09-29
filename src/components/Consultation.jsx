import { useState } from "react";
import { FiLock, FiCheckCircle, FiSend } from "react-icons/fi";

export default function Consultation() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    typology: "Pivot Doors (Entrance / Internal)",
    investment: "₹5,00,000 — ₹15,00,000",
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
              GET IN TOUCH
            </span>
          </div>

          <h2 className="font-serif text-[34px] sm:text-[46px] lg:text-[52px] leading-[1.1] text-[#f1eee9]">
            Let’s Talk About{" "}
            <em className="text-[#e8b95d] not-italic italic font-serif">
              Your Project.
            </em>
          </h2>

          <p className="mt-4 max-w-xl mx-auto text-[13px] sm:text-[14px] leading-[1.8] text-[#938e87]">
            Whether you're planning a new home, upgrading your windows, or
            designing an office, our team is ready to answer questions, share
            samples, and help you find the right fit.
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
                Thank You! We’ve Received Your Inquiry
              </h3>
              <p className="mt-3 max-w-md mx-auto text-[13px] leading-[1.7] text-[#9a948c]">
                Our team will review your requirements and get in touch with you
                within 24 hours to discuss options or schedule a visit to our
                Delhi showroom.
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
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-white placeholder-[#555] focus:border-[#e8b95d] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-[#aaa] uppercase mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="e.g. rahul@example.com"
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-white placeholder-[#555] focus:border-[#e8b95d] focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-[#aaa] uppercase mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="e.g. +91 98765 43210"
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
                    placeholder="e.g. South Delhi, Gurugram, Noida"
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-white placeholder-[#555] focus:border-[#e8b95d] focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Row 3: Typology & Investment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-[#aaa] uppercase mb-2">
                    What are you looking for?
                  </label>
                  <select
                    value={formData.typology}
                    onChange={(e) =>
                      setFormData({ ...formData, typology: e.target.value })
                    }
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-[#e8b95d] focus:border-[#e8b95d] focus:outline-none transition"
                  >
                    <option value="Pivot Doors (Entrance / Internal)">Pivot Doors (Entrance / Internal)</option>
                    <option value="Sliding Glass Doors & Partitions">Sliding Glass Doors & Room Partitions</option>
                    <option value="Glass Wardrobe Shutters">Glass Wardrobe Doors & Closets</option>
                    <option value="Shower Cubicles & Enclosures">Shower Cubicles & Enclosures</option>
                    <option value="Aluminium & uPVC Windows">Aluminium & uPVC Doors / Windows</option>
                    <option value="Glass Railings & Balconies">Glass Railings & Balconies</option>
                    <option value="Multiple / Full Project">Multiple / Full House Package</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-[#aaa] uppercase mb-2">
                    Estimated Budget Range
                  </label>
                  <select
                    value={formData.investment}
                    onChange={(e) =>
                      setFormData({ ...formData, investment: e.target.value })
                    }
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-[#e8b95d] focus:border-[#e8b95d] focus:outline-none transition"
                  >
                    <option value="Under ₹5,00,000">Under ₹5,00,000</option>
                    <option value="₹5,00,000 — ₹15,00,000">₹5,00,000 — ₹15,00,000</option>
                    <option value="₹15,00,000 — ₹35,00,000">₹15,00,000 — ₹35,00,000</option>
                    <option value="₹35,00,000+ (Full Home or Commercial Space)">₹35,00,000+ (Full Home or Commercial Space)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Project Brief */}
              <div>
                <label className="block text-[10px] font-bold tracking-[1.5px] text-[#aaa] uppercase mb-2">
                  Tell us a bit about your project
                </label>
                <textarea
                  rows="4"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us what you have in mind—such as room type, glass style (clear, fluted, tinted), rough sizes, or any questions you have..."
                  className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-white placeholder-[#555] focus:border-[#e8b95d] focus:outline-none transition resize-none"
                ></textarea>
              </div>

              {/* Bottom Submit Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[11px] text-[#777]">
                  <FiLock className="text-[#e8b95d]" size={14} />
                  <span>We respect your privacy and never share your details</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#e8b95d] px-8 py-3.5 text-[11px] font-bold tracking-[1.5px] text-black hover:bg-[#f5d084] transition shadow-lg shadow-[#e8b95d]/20 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>SENDING...</span>
                  ) : (
                    <>
                      <span>SEND INQUIRY</span>
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
