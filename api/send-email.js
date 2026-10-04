import fs from "fs";
import path from "path";
import "dotenv/config";
import nodemailer from "nodemailer";

// Helper to reliably read environment variables in Vercel or local dev (.env / .env.local)
function getEnvVariable(key, fallback = "") {
  if (process.env[key] && process.env[key].trim()) {
    return process.env[key].trim();
  }

  const envFiles = [".env.local", ".env"];
  for (const file of envFiles) {
    try {
      const filePath = path.resolve(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");
        const match = content.match(new RegExp(`^\\s*${key}\\s*=\\s*(.*)$`, "m"));
        if (match && match[1]) {
          const val = match[1].trim().replace(/^['"]|['"]$/g, "");
          if (val) return val;
        }
      }
    } catch {
      // Ignore filesystem errors in restricted environments
    }
  }

  return fallback;
}

export default async function handler(req, res) {
  // Ensure method is POST
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed. Please use POST.",
    });
  }

  try {
    const {
      fullName,
      phone,
      email,
      location,
      typology,
      investment,
      message,
      images = [],
    } = req.body || {};

    // Validate required fields
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Full Name is required.",
      });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        success: false,
        message: "Phone Number is required.",
      });
    }

    // Email configuration from environment variables or .env
    const emailUser = getEnvVariable("EMAIL_USER", "kazoglassndoor@gmail.com");
    const rawPass = getEnvVariable("EMAIL_PASS", "");
    // Remove spaces, single/double quotes from app password
    const emailPass = rawPass.replace(/[\s'"]+/g, "");
    const emailTo = getEnvVariable("EMAIL_TO", "kazoglassndoor@gmail.com");

    // Verify SMTP credentials
    if (!emailPass) {
      console.warn(
        "[Kazo Mailer] EMAIL_PASS environment variable is missing. Please configure it in your .env or Vercel dashboard."
      );
      return res.status(500).json({
        success: false,
        message:
          "Email server credentials are not configured. Please set EMAIL_PASS in your Vercel Environment Variables or .env file.",
      });
    }

    // Configure Nodemailer transporter (Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Process attachments from base64 array
    const attachments = [];
    if (Array.isArray(images) && images.length > 0) {
      for (let i = 0; i < Math.min(images.length, 5); i++) {
        const item = images[i];
        if (item && item.data) {
          // Remove Data URL prefix (e.g. "data:image/png;base64,")
          const base64Data = item.data.includes("base64,")
            ? item.data.split("base64,")[1]
            : item.data;

          attachments.push({
            filename: item.name || `attachment_${i + 1}.jpg`,
            content: Buffer.from(base64Data, "base64"),
            contentType: item.type || "image/jpeg",
          });
        }
      }
    }

    // Construct a premium HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f7f7f7; color: #222; margin: 0; padding: 20px; }
            .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e5e5; }
            .header { background: #0c0c0c; padding: 28px 24px; text-align: center; border-bottom: 3px solid #e8b95d; }
            .brand { color: #ffffff; font-size: 20px; letter-spacing: 2px; font-weight: 700; margin: 0; text-transform: uppercase; }
            .sub-brand { color: #e8b95d; font-size: 11px; letter-spacing: 1.5px; margin-top: 4px; text-transform: uppercase; }
            .content { padding: 28px 24px; }
            .title { font-size: 18px; font-weight: 700; color: #111; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #eee; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th { text-align: left; padding: 10px 12px; background: #fbfbfb; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; width: 35%; border-bottom: 1px solid #eee; }
            td { padding: 10px 12px; font-size: 13px; color: #111; border-bottom: 1px solid #eee; }
            .highlight { color: #b8860b; font-weight: 600; }
            .message-box { background: #f9f9f9; border-left: 3px solid #e8b95d; padding: 14px 16px; border-radius: 4px; font-size: 13px; line-height: 1.6; color: #333; margin-top: 8px; }
            .badge { display: inline-block; background: #e8b95d; color: #000; font-size: 11px; font-weight: bold; padding: 3px 8px; border-radius: 4px; }
            .footer { background: #f3f3f3; padding: 16px 24px; font-size: 11px; color: #777; text-align: center; border-top: 1px solid #eee; }
            .cta-btn { display: inline-block; background: #25D366; color: #fff !important; text-decoration: none; padding: 8px 16px; font-size: 12px; font-weight: bold; border-radius: 4px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="brand">Kazo Glass & Door™</h1>
              <div class="sub-brand">New Architectural Project Inquiry</div>
            </div>
            <div class="content">
              <div class="title">Lead Details</div>
              <table>
                <tr>
                  <th>Client Full Name</th>
                  <td><strong>${fullName.trim()}</strong></td>
                </tr>
                <tr>
                  <th>Phone Number</th>
                  <td>
                    <a href="tel:${phone.trim()}" style="color: #111; text-decoration: none; font-weight: 600;">
                      ${phone.trim()}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>Email Address</th>
                  <td>
                    ${email && email.trim()
        ? `<a href="mailto:${email.trim()}" style="color: #b8860b;">${email.trim()}</a>`
        : `<span style="color: #888;">Not provided</span>`
      }
                  </td>
                </tr>
                <tr>
                  <th>Project Location</th>
                  <td>${location && location.trim() ? location.trim() : `<span style="color: #888;">Not provided</span>`}</td>
                </tr>
                <tr>
                  <th>Product / Category</th>
                  <td class="highlight">${typology || "Not specified"}</td>
                </tr>
                <tr>
                  <th>Estimated Budget</th>
                  <td>${investment || "Not specified"}</td>
                </tr>
                <tr>
                  <th>Attached Images</th>
                  <td>
                    ${attachments.length > 0
        ? `<span class="badge">${attachments.length} Image(s) Attached</span> (See attachments below)`
        : `<span style="color: #888;">No images attached</span>`
      }
                  </td>
                </tr>
              </table>

              <div style="margin-top: 16px;">
                <div style="font-size: 12px; font-weight: bold; text-transform: uppercase; color: #666; letter-spacing: 1px;">
                  Project Brief / Notes:
                </div>
                <div class="message-box">
                  ${message && message.trim()
        ? message.trim().replace(/\n/g, "<br>")
        : "No additional project brief was entered."
      }
                </div>
              </div>

              <div style="text-align: center; margin-top: 24px;">
                <a class="cta-btn" href="https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        `Hi ${fullName.trim()}, thank you for contacting Kazo Glass & Door regarding your ${typology} project.`
      )}">
                  Chat with Client on WhatsApp
                </a>
              </div>
            </div>
            <div class="footer">
              This lead was submitted through the consultation form on Kazo Glass & Door.
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text alternative
    const textContent = `
NEW PROJECT INQUIRY - KAZO GLASS & DOOR
=======================================
Full Name: ${fullName.trim()}
Phone Number: ${phone.trim()}
Email Address: ${email && email.trim() ? email.trim() : "Not provided"}
Location: ${location && location.trim() ? location.trim() : "Not provided"}
Looking For: ${typology || "Not specified"}
Budget Range: ${investment || "Not specified"}
Attachments: ${attachments.length} image(s) attached

Project Brief:
${message && message.trim() ? message.trim() : "No message provided"}
    `.trim();

    // Dispatch email via Nodemailer
    await transporter.sendMail({
      from: `"Kazo Glass & Door" <${emailUser}>`,
      to: emailTo,
      replyTo: email && email.trim() ? email.trim() : emailUser,
      subject: `New Project Inquiry: ${fullName.trim()} (${phone.trim()}) - ${typology}`,
      text: textContent,
      html: htmlContent,
      attachments,
    });

    return res.status(200).json({
      success: true,
      message: "Inquiry successfully sent with attachments.",
      attachmentsCount: attachments.length,
    });
  } catch (error) {
    console.error("[Kazo Mailer Error]:", error);
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "An error occurred while dispatching your inquiry email.",
    });
  }
}
