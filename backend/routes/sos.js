const express = require("express");
const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.send("SOS OK");
});

// Report disaster (API for Flutter)
router.post("/report", (req, res) => {
  const { name, description, latitude, longitude } = req.body;

  if (!description || !latitude || !longitude) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  // For now just log (later Firebase will store this)
  console.log("DISASTER REPORTED:", {
    name,
    description,
    latitude,
    longitude,
  });

  res.json({
    success: true,
    message: "Disaster reported successfully",
  });
});

module.exports = router;
