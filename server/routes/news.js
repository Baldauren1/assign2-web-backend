import express from "express";
import axios from "axios";

const router = express.Router();

// GET /api/news?country=us

router.get("/", async (req, res) => {
  const { country } = req.query;

  if (!country) {
    return res.status(400).json({
      error: "Country code is required (example: us)",
    });
  }

  try {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines",
      {
        params: {
          country,
          apiKey: process.env.NEWS_API_KEY,
        },
      }
    );

    res.status(200).json(
      response.data.articles.slice(0, 5).map((article) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.source.name,
      }))
    );
  } catch (error) {
    res.status(500).json({
      error: "News service unavailable",
    });
  }
});

export default router;
