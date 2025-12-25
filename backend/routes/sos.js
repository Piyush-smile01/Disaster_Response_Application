const express = require("express");
const router = express.Router();

const db = require("../firebase");
const { predictDisaster } = require("../ml/model");
const { detectSeverity, calculatePriority } = require("../ml/utils");

router.post("/", async (req, res) => {
  console.log("SOS API HIT");
  console.log("REQ BODY:", req.body);
  try {
    const { message, location, peopleAffected } = req.body;

    // 1️⃣ TensorFlow prediction
    const prediction = await predictDisaster(message);

    // 2️⃣ Severity detection
    const severity = detectSeverity(message);

    // 3️⃣ Priority calculation
    const priority = calculatePriority(
      severity,
      prediction.confidence,
      peopleAffected || 0
    );

    // 4️⃣ Save to Firebase
    await db.collection("sos").add({
      message,
      location,
      disasterType: prediction.disasterType,
      confidence: prediction.confidence,
      severity,
      priority,
      createdAt: Date.now()
    });

    // 5️⃣ Send response
    res.json({
      disasterType: prediction.disasterType,
      severity,
      priority
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "SOS processing failed" });
  }
});

module.exports = router;
