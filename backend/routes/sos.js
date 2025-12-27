/**
 * SOS Controller
 * Handles disaster reports and assigns priority (1–3)
 */

/**
 * SOS Route
 * Uses TensorFlow NLP + priority (1–3)
 */

const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  predictTextDisaster,
  predictImageDisaster,
  predictVideoDisaster
} = require("../ml/model");

const {
  detectSeverity,
  calculatePriority
} = require("../ml/utils");

const upload = multer({ dest: "uploads/" });

router.post(
  "/sos",
  upload.fields([{ name: "image" }, { name: "video" }]),
  async (req, res) => {
    try {
      const { message, peopleAffected } = req.body;

      let prediction = { disasterType: "unknown", confidence: 0.3 };

      if (req.files?.image) {
        prediction = await predictImageDisaster(req.files.image[0].path);
      } else if (req.files?.video) {
        prediction = await predictVideoDisaster(req.files.video[0].path);
      } else if (message) {
        prediction = await predictTextDisaster(message);
      }

      const severity = detectSeverity(message || "", peopleAffected || 0);
      const priority = calculatePriority(severity, prediction.confidence);

      res.json({
        disasterType: prediction.disasterType,
        confidence: prediction.confidence,
        severity,
        priority
      });

    } catch (err) {
      console.error("SOS ERROR:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
