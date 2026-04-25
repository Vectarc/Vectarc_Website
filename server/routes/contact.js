import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import { sendAdminNotification, sendSubmitterConfirmation } from "../email.js";

const router = Router();
// POST /api/contact
router.post("/", async (req, res) => {
  const { inquiryType, name, email, phone, company, message } = req.body;

  // --- Validation ---
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ error: "Name must be at least 2 characters." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: "A valid email address is required." });
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return res.status(400).json({ error: "Message must be at least 10 characters." });
  }

  const validInquiryTypes = ["New Business", "General Inquiry", "Partnership"];
  const safeInquiryType = validInquiryTypes.includes(inquiryType)
    ? inquiryType
    : "General Inquiry";

  const cleanData = {
    inquiryType: safeInquiryType,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || null,
    company: company?.trim() || null,
    message: message.trim(),
  };

  // --- 1. Send emails ---
  const submissionId = "SUB-" + Date.now();
  const submittedAt = new Date().toISOString();

  Promise.allSettled([
    sendAdminNotification({ 
      id: submissionId, 
      submittedAt: submittedAt, 
      ...cleanData 
    }),
    sendSubmitterConfirmation(cleanData),
  ]).then((results) => {
    results.forEach((r, i) => {
      if (r.status === "rejected") {
        console.error(`[email] Email ${i === 0 ? "admin" : "confirmation"} failed:`, r.reason?.message);
      }
    });
  });

  // --- 2. Respond immediately ---
  return res.status(201).json({
    success: true,
    message: "Your message has been received! We'll be in touch shortly.",
    id: submissionId,
  });
});

export default router;
