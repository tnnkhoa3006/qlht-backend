import express from "express";
import cors from "cors";

const app = express();
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:5173', 'https://your-frontend-domain.vercel.app'],
  credentials: true
}));
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express API 🚀" });
});

export default app;
