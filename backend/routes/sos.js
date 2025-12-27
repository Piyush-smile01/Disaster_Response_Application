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

// ✅ CORRECT IMPORT PATHS
const { predictDisaster } = require("../ml/model");
const { detectSeverity, rateDisasterPriority } = require("../ml/utils");

// POST /sos
router.post("/sos", async (req, res) => {
  try {
    const {
      message,
      peopleAffected = 0,
      location = null
    } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        error: "SOS message is required"
      });
    }

    // 1️⃣ Predict disaster type (TensorFlow NLP)
    const prediction = await predictDisaster(message);

    // 2️⃣ Detect severity
    const severity = detectSeverity(message, peopleAffected);

    // 3️⃣ Rate priority (1–3)
    const priority = rateDisasterPriority({
      confidence: prediction.confidence,
      severity,
      peopleAffected
    });

    // 4️⃣ Final response
    return res.status(200).json({
      disasterType: prediction.disasterType,
      confidence: prediction.confidence,
      severity,
      priority,
      peopleAffected,
      location,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("❌ SOS route error:", error);
    return res.status(500).json({
      error: "Internal server error while processing SOS"
    });
  }
});

module.exports = router;
