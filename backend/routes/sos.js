const { detectDisaster } = require("./disasterController");
const { detectSeverity, calculatePriority } = require("./utils");

/**
 * Handle incoming SOS request
 */
async function handleSOS(req, res) {
  try {
    // Text message from SOS
    const { message, peopleAffected } = req.body;

    // Uploaded files (via multer)
    const imagePath = req.files?.image?.[0]?.path || null;
    const videoPath = req.files?.video?.[0]?.path || null;

    // 1️⃣ Detect disaster (AI decision)
    const prediction = await detectDisaster({
      text: message,
      imagePath,
      videoPath
    });

    // 2️⃣ Detect severity
    const severity = detectSeverity(message, prediction.confidence);

    // 3️⃣ Calculate priority score
    const priority = calculatePriority({
      severity,
      confidence: prediction.confidence,
      peopleAffected,
      hasMedia: !!(imagePath || videoPath)
    });

    // 4️⃣ Decide SOS status
    const SOS_TRIGGER_THRESHOLD = 6;

    const status =
      priority >= SOS_TRIGGER_THRESHOLD
        ? "SOS_TRIGGERED"
        : "SOS_REVIEW_REQUIRED";

    // 5️⃣ Send response
    return res.status(200).json({
      status,
      disasterType: prediction.disasterType,
      confidence: prediction.confidence,
      severity,
      priority
    });

  } catch (error) {
    console.error("SOS ERROR:", error);
    return res.status(500).json({
      error: "Failed to process SOS request"
    });
  }
}

module.exports = { handleSOS };

      
