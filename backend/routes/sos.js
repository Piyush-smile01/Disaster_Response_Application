/**
 * SOS Controller
 * Handles disaster reports and assigns priority (1–3)
 */

const express = require("express");
const router = express.Router();

// ✅ Correct path to ML model
const model = require("../ml/model");

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const prediction = await model.predict(text);

    res.status(200).json({
      success: true,
      prediction,
    });
  } catch (error) {
    console.error("SOS route error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
