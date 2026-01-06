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
      feels_like: data.main.feels_like,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind_speed: data.wind.speed,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon,
      },
      rain_last_3h: data.rain ? data.rain["3h"] : 0,
    });
  } catch (error) {
    res.status(404).json({ error: "City not found" });
  }
});

export default router;
