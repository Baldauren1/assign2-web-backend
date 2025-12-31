import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import weatherRoute from "./routes/weather.js";
import newsRoute from "./routes/news.js";
import currencyRoute from "./routes/currency.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/weather", weatherRoute);
app.use("/api/news", newsRoute);
app.use("/api/currency", currencyRoute);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
