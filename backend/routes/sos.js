/**
 * SOS Controller
 * Handles disaster reports and assigns priority (1–3)
 */

/**
 * SOS Route
 * Uses TensorFlow NLP + priority (1–3)
 */

const express = require("express");
const router = express.Router();

const { predictDisaster } = require("../ml/model");
const { detectSeverity, calculatePriority } = require("../ml/utils");

router.post("/sos", async (req, res) => {
  try {
    const { message, peopleAffected } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const prediction = await predictDisaster(message);
    const severity = detectSeverity(message, peopleAffected || 0);
    const priority = calculatePriority(severity, prediction.confidence);

    res.json({
      disasterType: prediction.disasterType,
      confidence: prediction.confidence,
      severity,
      priority
    });

  } catch (err) {
    console.error("SOS ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
