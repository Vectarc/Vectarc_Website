import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRouter from "../server/routes/contact.js";
import chatRouter from "../server/routes/chat.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// --- Routes ---
app.use("/api/contact", contactRouter);
app.use("/api/chat", chatRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Export for Vercel
export default app;
