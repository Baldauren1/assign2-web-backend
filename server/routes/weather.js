import express from "express";
import axios from "axios";

const router = express.Router();

// Get /api/weather?city=Almaty

router.get("/", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          units: "metric",
          appid: process.env.OPENWEATHER_API_KEY,
        },
      }
    );

    const data = response.data;

    res.status(200).json({
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      description: data.weather[0].description,
      coordinates: data.coord,
    });
  } catch {
    res.status(404).json({ error: "City not found" });
  }
});

export default router;
