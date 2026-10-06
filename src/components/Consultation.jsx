import { useState, useRef } from "react";
import {
  FiLock,
  FiCheckCircle,
  FiSend,
  FiUploadCloud,
  FiImage,
  FiX,
  FiAlertCircle,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { categoriesData } from "../data/categoriesData";

export default function Consultation() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    typology: categoriesData[0]?.title || "Aluminium Doors & Windows",
    investment: "₹5,00,000 — ₹15,00,000",
    message: "",
  });

  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [fileError, setFileError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fileInputRef = useRef(null);

  // Format file size in KB or MB
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Handle files selection
  const handleFiles = (incomingFileList) => {
    setFileError("");
    const newFiles = Array.from(incomingFileList);

    // Filter only images
    const imageFiles = newFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length !== newFiles.length) {
      setFileError("Only image files (JPG, PNG, WEBP, HEIC) are accepted.");
    }

    if (imageFiles.length === 0) return;

    // Check max 5 images limit
    const totalCount = files.length + imageFiles.length;
    let allowedFiles = imageFiles;

    if (totalCount > 5) {
      const remainingSlots = 5 - files.length;
      if (remainingSlots <= 0) {
        setFileError("Maximum 5 images allowed. Please remove existing ones first.");
        return;
      }
      allowedFiles = imageFiles.slice(0, remainingSlots);
      setFileError(`Only up to 5 images can be uploaded. Added ${remainingSlots} image(s).`);
    }

    // Check total size limit (10MB)
    const combinedFiles = [...files, ...allowedFiles];
    const totalSize = combinedFiles.reduce((acc, curr) => acc + curr.size, 0);
    if (totalSize > 10 * 1024 * 1024) {
      setFileError("Total image size exceeds 10MB limit. Please attach smaller images.");
      return;
    }

    // Create preview URLs
    const newPreviews = allowedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: formatFileSize(file.size),
    }));

    setFiles(combinedFiles);
    setFilePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    // Reset input so same file can be selected again if needed
    e.target.value = "";
  };

  const handleRemoveFile = (indexToRemove) => {
    // Revoke URL to prevent memory leaks
    if (filePreviews[indexToRemove]?.url) {
      URL.revokeObjectURL(filePreviews[indexToRemove].url);
    }

    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setFilePreviews((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setFileError("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Helper to read file as Base64 Data URL
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Validate mandatory fields
    if (!formData.fullName.trim()) {
      setSubmitError("Please enter your Full Name.");
      return;
    }
    if (!formData.phone.trim()) {
      setSubmitError("Please enter your Phone Number.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Encode any uploaded images to Base64
      const encodedImages = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
          data: await readFileAsBase64(file),
        }))
      );

      const payload = {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        location: formData.location.trim(),
        typology: formData.typology,
        investment: formData.investment,
        message: formData.message.trim(),
        images: encodedImages,
      };

      // Call PHP mailer endpoint for Hostinger with automatic fallback
      let response;
      try {
        response = await fetch("/api/send-email.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        // If the server returns 404 for .php, try /api/send-email
        if (response.status === 404) {
          response = await fetch("/api/send-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          });
        }
      } catch (postErr) {
        response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        throw new Error(data.message || "Failed to deliver inquiry to email.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(
        err.message ||
          "Could not send inquiry automatically. You can email us directly at kazoglassndoor@gmail.com or contact us on WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    // Clean up preview object URLs
    filePreviews.forEach((item) => {
      if (item.url) URL.revokeObjectURL(item.url);
    });
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      location: "",
      typology: categoriesData[0]?.title || "Aluminium Doors & Windows",
      investment: "₹5,00,000 — ₹15,00,000",
      message: "",
    });
    setFiles([]);
    setFilePreviews([]);
    setFileError("");
    setSubmitError("");
    setSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#090909] py-14 sm:py-16 lg:py-20 px-5 sm:px-10 md:px-20 text-center border-t border-white/5"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-[#e8b95d]/5 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* ================= HEADER ================= */}
        <div className="mb-10 sm:mb-12">
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#e8b95d]" />
            <span className="text-[10px] font-semibold tracking-[2px] text-[#e8b95d]">
              GET IN TOUCH
            </span>
          </div>

          <h2 className="font-serif text-[32px] sm:text-[46px] lg:text-[52px] leading-[1.1] text-[#f1eee9]">
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
        <div className="rounded-2xl border border-white/10 bg-[#121212]/90 p-5 sm:p-10 md:p-12 text-left shadow-2xl backdrop-blur-xl">
          {submitted ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#1f1b13] text-[#e8b95d] border border-[#e8b95d]/40 shadow-lg shadow-[#e8b95d]/10 animate-bounce">
                <FiCheckCircle size={38} />
              </div>
              <h3 className="font-serif text-[26px] sm:text-[32px] text-white">
                Inquiry Sent Successfully!
              </h3>
              <p className="mt-3 max-w-lg mx-auto text-[13px] sm:text-[14px] leading-[1.8] text-[#a49e95]">
                Thank you, <strong className="text-white">{formData.fullName}</strong>.
                Your inquiry has been delivered directly to{" "}
                <span className="text-[#e8b95d] font-medium">kazoglassndoor@gmail.com</span>.
                Our architectural team will review your requirements and reach
                out to you at{" "}
                <strong className="text-white">{formData.phone}</strong> within 24 hours.
              </p>

              {/* Inquiry Summary Pill */}
              <div className="mt-6 mx-auto max-w-md rounded-xl border border-white/10 bg-[#171717] p-4 text-left text-[12px] space-y-1.5 text-[#bbb]">
                <div className="flex justify-between">
                  <span className="text-[#777]">Category:</span>
                  <span className="text-[#e8b95d] font-semibold">{formData.typology}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777]">Phone:</span>
                  <span className="text-white">{formData.phone}</span>
                </div>
                {formData.email && (
                  <div className="flex justify-between">
                    <span className="text-[#777]">Email:</span>
                    <span className="text-white">{formData.email}</span>
                  </div>
                )}
                {files.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#777]">Uploaded Images:</span>
                    <span className="text-[#e8b95d]">{files.length} attached</span>
                  </div>
                )}
              </div>

              {/* Quick WhatsApp CTA Button */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/918810369142?text=${encodeURIComponent(
                    `Hi Kazo Glass & Door, I just sent an inquiry for ${formData.typology}. My name is ${formData.fullName} (${formData.phone}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] hover:bg-[#20ba59] px-6 py-3 text-[11px] font-bold tracking-[1.5px] text-white transition shadow-lg shadow-[#25D366]/20"
                >
                  <FaWhatsapp size={16} />
                  <span>CONNECT ON WHATSAPP INSTANTLY</span>
                </a>

                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto bg-[#1f1f1f] px-6 py-3 text-[11px] font-bold tracking-[1.5px] text-[#e8b95d] hover:bg-[#282828] transition border border-[#e8b95d]/30 rounded-md cursor-pointer"
                >
                  SUBMIT ANOTHER INQUIRY
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Submission Error Alert */}
              {submitError && (
                <div className="rounded-lg border border-red-500/30 bg-red-950/30 p-4 text-[12px] text-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FiAlertCircle className="text-red-400 shrink-0" size={18} />
                    <span>{submitError}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:kazoglassndoor@gmail.com?subject=${encodeURIComponent(
                        `Project Inquiry: ${formData.fullName || "New Client"}`
                      )}&body=${encodeURIComponent(
                        `Name: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nLocation: ${formData.location}\nLooking For: ${formData.typology}\nBudget: ${formData.investment}\nMessage: ${formData.message}`
                      )}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e8b95d] text-black rounded text-[11px] font-bold hover:bg-[#f5d084] transition"
                    >
                      <FiMail size={13} />
                      <span>Send Email</span>
                    </a>
                    <a
                      href={`https://wa.me/918810369142?text=${encodeURIComponent(
                        `Hi Kazo Glass & Door, I would like to inquire about ${formData.typology}. My name is ${formData.fullName}, Phone: ${formData.phone}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white rounded text-[11px] font-bold hover:bg-[#20ba59] transition"
                    >
                      <FaWhatsapp size={13} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Row 1: Full Name (Mandatory) & Phone Number (Mandatory) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-[#aaa] uppercase mb-2">
                    Full Name <span className="text-[#e8b95d]">*</span>
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
                    Phone Number <span className="text-[#e8b95d]">*</span>
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
              </div>

              {/* Row 2: Email Address (Optional) & Project Location (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-[#888] uppercase mb-2">
                    Email Address{" "}
                    <span className="text-[#666] font-normal lowercase">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="e.g. rahul@example.com"
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-white placeholder-[#555] focus:border-[#e8b95d] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-[#888] uppercase mb-2">
                    Project Location / City{" "}
                    <span className="text-[#666] font-normal lowercase">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g. South Delhi, Gurugram, Noida"
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-white placeholder-[#555] focus:border-[#e8b95d] focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Row 3: What are you looking for? (All categories) & Estimated Budget Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-[#aaa] uppercase mb-2">
                    What are you looking for?{" "}
                    <span className="text-[#666] font-normal lowercase">
                      (optional)
                    </span>
                  </label>
                  <select
                    value={formData.typology}
                    onChange={(e) =>
                      setFormData({ ...formData, typology: e.target.value })
                    }
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-[#e8b95d] focus:border-[#e8b95d] focus:outline-none transition"
                  >
                    {categoriesData.map((category) => (
                      <option key={category.id} value={category.title}>
                        {category.title}
                      </option>
                    ))}
                    <option value="Multiple Systems / Full House Package">
                      Multiple Systems / Full House Package
                    </option>
                    <option value="Other / Custom Architectural Glazing">
                      Other / Custom Architectural Glazing
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-[#888] uppercase mb-2">
                    Estimated Budget Range{" "}
                    <span className="text-[#666] font-normal lowercase">
                      (optional)
                    </span>
                  </label>
                  <select
                    value={formData.investment}
                    onChange={(e) =>
                      setFormData({ ...formData, investment: e.target.value })
                    }
                    className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-[#e8b95d] focus:border-[#e8b95d] focus:outline-none transition"
                  >
                    <option value="Under ₹5,00,000">Under ₹5,00,000</option>
                    <option value="₹5,00,000 — ₹15,00,000">
                      ₹5,00,000 — ₹15,00,000
                    </option>
                    <option value="₹15,00,000 — ₹35,00,000">
                      ₹15,00,000 — ₹35,00,000
                    </option>
                    <option value="₹35,00,000+ (Full Home or Commercial Space)">
                      ₹35,00,000+ (Full Home or Commercial Space)
                    </option>
                    <option value="Discuss on Site Visit / Open">
                      Discuss on Site Visit / Open
                    </option>
                  </select>
                </div>
              </div>

              {/* Row 4: Project Brief (Optional) */}
              <div>
                <label className="block text-[10px] font-bold tracking-[1.5px] text-[#888] uppercase mb-2">
                  Tell us a bit about your project{" "}
                  <span className="text-[#666] font-normal lowercase">
                    (optional)
                  </span>
                </label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us what you have in mind—such as room type, glass style (clear, fluted, tinted), rough sizes, or any questions you have..."
                  className="w-full rounded-md border border-white/10 bg-[#181818] px-4 py-3 text-[13px] text-white placeholder-[#555] focus:border-[#e8b95d] focus:outline-none transition resize-none"
                ></textarea>
              </div>

              {/* Row 5: Upload up to 5 images (Optional) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[10px] font-bold tracking-[1.5px] text-[#888] uppercase">
                    Upload Reference Photos or Drawings{" "}
                    <span className="text-[#666] font-normal lowercase">
                      (optional — up to 5 images)
                    </span>
                  </label>
                  <span className="text-[10px] font-medium text-[#e8b95d]">
                    {files.length} / 5 attached
                  </span>
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/heic,image/jpg"
                  multiple
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {/* Drag and Drop Zone */}
                {files.length < 5 && (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`group relative flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-6 text-center transition cursor-pointer ${
                      isDragging
                        ? "border-[#e8b95d] bg-[#e8b95d]/10"
                        : "border-white/15 bg-[#161616] hover:border-[#e8b95d]/50 hover:bg-[#1a1a1a]"
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#202020] text-[#e8b95d] group-hover:scale-110 transition duration-300 border border-white/10">
                      <FiUploadCloud size={22} />
                    </div>
                    <p className="mt-3 text-[12px] font-semibold text-white">
                      Click to browse or drag & drop reference images
                    </p>
                    <p className="mt-1 text-[11px] text-[#777]">
                      Floor plans, site sketches, or design inspirations (PNG,
                      JPG, WEBP, max 10MB total)
                    </p>
                  </div>
                )}

                {/* Error message for files */}
                {fileError && (
                  <p className="mt-2 text-[11px] text-[#f87171] flex items-center gap-1.5">
                    <FiAlertCircle size={13} />
                    <span>{fileError}</span>
                  </p>
                )}

                {/* Uploaded Files Preview Cards */}
                {filePreviews.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {filePreviews.map((preview, idx) => (
                      <div
                        key={idx}
                        className="group relative rounded-lg border border-white/10 bg-[#181818] p-2 overflow-hidden shadow-md flex flex-col justify-between"
                      >
                        <div className="relative aspect-square w-full rounded overflow-hidden bg-black/40">
                          <img
                            src={preview.url}
                            alt={preview.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFile(idx);
                            }}
                            className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/80 text-white hover:bg-red-600 transition flex items-center justify-center shadow"
                            title="Remove image"
                          >
                            <FiX size={13} />
                          </button>
                        </div>
                        <div className="mt-2">
                          <p
                            className="text-[10px] text-[#ddd] truncate font-medium"
                            title={preview.name}
                          >
                            {preview.name}
                          </p>
                          <p className="text-[9px] text-[#777]">
                            {preview.size}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Quick Add More Button when fewer than 5 */}
                    {files.length > 0 && files.length < 5 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center justify-center aspect-square rounded-lg border border-dashed border-[#e8b95d]/40 bg-[#161616] text-[#e8b95d] hover:bg-[#1f1b13] transition cursor-pointer p-3"
                      >
                        <FiImage size={20} />
                        <span className="mt-1 text-[10px] font-bold tracking-wide">
                          + ADD MORE
                        </span>
                        <span className="text-[9px] text-[#777]">
                          ({5 - files.length} left)
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Submit Row */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-[11px] text-[#777]">
                  <FiLock className="text-[#e8b95d]" size={14} />
                  <span>
                    Sent directly to{" "}
                    <span className="text-[#aaa] font-medium">
                      kazoglassndoor@gmail.com
                    </span>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#e8b95d] px-8 py-3.5 text-[11px] font-bold tracking-[1.5px] text-black hover:bg-[#f5d084] transition shadow-lg shadow-[#e8b95d]/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed rounded"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      SENDING INQUIRY...
                    </span>
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
