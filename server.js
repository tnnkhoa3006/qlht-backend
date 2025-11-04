import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
import pool from "./src/config/database.js";

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await pool.connect();
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
