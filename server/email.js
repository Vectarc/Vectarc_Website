import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// --- Transporter (Gmail App Password) ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,      // your Gmail address
    pass: process.env.GMAIL_APP_PASS,  // 16-char App Password (not your login password)
  },
});

// Verify connection on startup
transporter.verify((err) => {
  if (err) {
    console.error("[email] Transporter error:", err.message);
  } else {
    console.log("[email] Gmail transporter ready");
  }
});

// ─────────────────────────────────────────────
// 1. Admin notification email
// ─────────────────────────────────────────────
export async function sendAdminNotification({ id, inquiryType, name, email, phone, company, message, submittedAt }) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #0f0f0f; padding: 28px 32px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.5px;">
          New Contact Submission
        </h1>
        <p style="color: #a0a0a0; margin: 6px 0 0; font-size: 13px;">
          Submission #${id} &nbsp;·&nbsp; ${new Date(submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
        </p>
      </div>

      <div style="background: #f9f9f9; padding: 28px 32px; border: 1px solid #e5e5e5; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #ececec; font-size: 13px; color: #6b6b6b; width: 140px;">Inquiry Type</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #ececec; font-size: 14px; font-weight: 600;">${inquiryType}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #ececec; font-size: 13px; color: #6b6b6b;">Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #ececec; font-size: 14px; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #ececec; font-size: 13px; color: #6b6b6b;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #ececec; font-size: 14px;">
              <a href="mailto:${email}" style="color: #1a1a1a;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #ececec; font-size: 13px; color: #6b6b6b;">Phone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #ececec; font-size: 14px;">${phone || "—"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #ececec; font-size: 13px; color: #6b6b6b;">Company</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #ececec; font-size: 14px;">${company || "—"}</td>
          </tr>
        </table>

        <div style="margin-top: 20px;">
          <p style="font-size: 13px; color: #6b6b6b; margin: 0 0 8px;">Message</p>
          <div style="background: #ffffff; border: 1px solid #e5e5e5; border-radius: 6px; padding: 16px; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
        </div>

        <div style="margin-top: 24px; text-align: center;">
          <a href="mailto:${email}?subject=Re: Your enquiry to Vectarc"
             style="display: inline-block; background: #0f0f0f; color: #ffffff; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600;">
            Reply to ${name}
          </a>
        </div>
      </div>

      <div style="padding: 16px 32px; text-align: center; font-size: 12px; color: #a0a0a0;">
        Vectarc &nbsp;·&nbsp; info@vectarc.com
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Vectarc Notification" <${process.env.GMAIL_USER}>`,
    to: adminEmail,
    replyTo: email,
    subject: `[Vectarc] New ${inquiryType} enquiry from ${name}`,
    html,
  });

  console.log(`[email] Admin notification sent to ${adminEmail} for submission #${id}`);
}

// ─────────────────────────────────────────────
// 2. Submitter confirmation email
// ─────────────────────────────────────────────
export async function sendSubmitterConfirmation({ name, email, inquiryType, message }) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #0f0f0f; padding: 28px 32px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.5px;">
          Thanks for reaching out.
        </h1>
      </div>

      <div style="background: #f9f9f9; padding: 28px 32px; border: 1px solid #e5e5e5; border-top: none;">
        <p style="font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
          Hi <strong>${name}</strong>,
        </p>
        <p style="font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
          We've received your <strong>${inquiryType}</strong> enquiry and will get back to you as soon as possible — usually within 1–2 business days.
        </p>

        <div style="background: #ffffff; border-left: 3px solid #0f0f0f; padding: 14px 18px; border-radius: 0 6px 6px 0; margin: 20px 0; font-size: 14px; line-height: 1.7; color: #4a4a4a; white-space: pre-wrap;">${message}</div>

        <p style="font-size: 14px; color: #6b6b6b; margin: 20px 0 0; line-height: 1.7;">
          If you have anything else to add, simply reply to this email.
        </p>
      </div>

      <div style="padding: 20px 32px; background: #0f0f0f; border-radius: 0 0 8px 8px; text-align: center;">
        <p style="color: #a0a0a0; font-size: 12px; margin: 0;">
          Vectarc &nbsp;·&nbsp; info@vectarc.com
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Vectarc" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `We received your message, ${name}!`,
    html,
  });

  console.log(`[email] Confirmation sent to ${email}`);
}
