import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Updated model list based on the 2026 available models
    const modelNames = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-flash-latest",
      "gemini-2.5-pro"
    ];
    
    let lastError = null;

    for (const modelName of modelNames) {
      try {
        console.log(`Trying model: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });

        const chat = model.startChat({
          history: (history || []).map(h => ({
            role: h.role === "model" ? "model" : "user",
            parts: h.parts
          })),
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();
        
        console.log(`Success with model: ${modelName}!`);
        return res.json({ text });
      } catch (error) {
        lastError = error;
        console.warn(`Model ${modelName} failed:`, error.message);
      }
    }

    throw lastError;
  } catch (error) {
    console.error("Gemini API Error details:", error);
    res.status(500).json({ 
      error: "AI Service Error",
      message: error.message 
    });
  }
});

export default router;
