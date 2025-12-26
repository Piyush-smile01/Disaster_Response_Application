const express = require("express");
const router = express.Router();

const db = require("../firebase");
const { predictDisaster } = require("../ml/model");
const { detectSeverity, calculatePriority } = require("../ml/utils");

router.post("/", async (req, res) => {
  console.log("Disaster Reported");
  console.log("REQ BODY:", req.body);

  try {
    const { message, 
      location, 
      peopleAffected } = req.body;

    if (!message || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const prediction = await predictDisaster(message);
    const severity = detectSeverity(message,peopleAffected ||0);
    const priority = calculatePriority(
      severity,
      prediction.confidence,
      peopleAffected || 0
    );

    const docRef = await db.collection("sos").add({
      message,
      location,
      peopleAffected: peopleAffected || 0,
      disasterType: prediction.disasterType,
      confidence: prediction.confidence,
      severity,
      priority,
      createdAt: new Date()
    });

    res.status(200).json({
      id: docRef.id,
      disasterType: prediction.disasterType,
      severity,
      priority
    });

  } catch (error) {
    console.error(" SOS ERROR:", error);
    res.status(500).json({ error: "SOS processing failed" });
  }
});

module.exports = router;
