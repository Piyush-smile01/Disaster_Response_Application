/**
 * SOS Controller
 * Handles disaster reports and assigns priority (1–3)
 */

const express = require("express");
const router = express.Router();

const { predictDisaster } = require("./model");
const { detectSeverity, rateDisasterPriority } = require("./utils");

// POST /sos
router.post("/sos", async (req, res) => {
  try {
    const {
      message,          // text description
      peopleAffected,   // number (optional)
      location          // { lat, lng } (optional)
    } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        error: "SOS message is required"
      });
    }

    // 1️⃣ Predict disaster type using TensorFlow NLP
    const prediction = await predictDisaster(message);

    // 2️⃣ Detect severity
    const severity = detectSeverity(message, peopleAffected || 0);

    // 3️⃣ Rate priority (1–3)
    const priority = rateDisasterPriority({
      confidence: prediction.confidence,
      severity,
      peopleAffected: peopleAffected || 0
    });

    // 4️⃣ Build response object
    const response = {
      disasterType: prediction.disasterType,
      confidence: prediction.confidence,
      severity,
      priority,
      peopleAffected: peopleAffected || 0,
      location: location || null,
      timestamp: new Date().toISOString()
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error("SOS error:", error);
    return res.status(500).json({
      error: "Failed to process SOS request"
    });
  }
});

module.exports = router;
