import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";
import geminiResponse from "./geminiResponse.js"; // 👈 import missing tha

dotenv.config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Gemini test route (POST request)
app.post("/api/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const data = await geminiResponse(prompt);
    res.json({ answer: data });
  } catch (error) {
    console.error("Gemini route error:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Connect DB and start server
const port = process.env.PORT || 8000;
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server started on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });
