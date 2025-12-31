import express from "express";
import axios from "axios";

const router = express.Router();

/**
 * GET /api/currency?currency=KZT
 * Base currency: USD
*/
router.get("/", async (req, res) => {
  const { currency } = req.query;

  if (!currency) {
    return res.status(400).json({
      error: "Currency code is required (example: KZT)",
    });
  }

  try {
    const response = await axios.get(
      "https://openexchangerates.org/api/latest.json",
      {
        params: {
          app_id: process.env.OPENEXCHANGE_API_KEY,
        },
      }
    );

    const rate = response.data.rates[currency.toUpperCase()];

    if (!rate) {
      return res.status(404).json({
        error: "Currency not found",
      });
    }

    res.status(200).json({
      base: response.data.base,
      currency: currency.toUpperCase(),
      rate: rate,
    });
  } catch (error) {
    console.error("Currency API error:", error.message);

    res.status(500).json({
      error: "Currency service unavailable",
    });
  }
});

export default router;
