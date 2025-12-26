const { predictDisaster } = require("./textPredictor");
const { predictDisasterFromImage } = require("./imagePredictor");
const { predictDisasterFromVideo } = require("./videoPredictor");

/**
 * Detects disaster type using available inputs
 * @param {Object} inputs
 * @param {string} [inputs.text]
 * @param {string} [inputs.imagePath]
 * @param {string} [inputs.videoPath]
 */
async function detectDisaster({ text, imagePath, videoPath }) {
  const results = [];

  if (text) {
    results.push({
      source: "text",
      ...(await predictDisaster(text))
    });
  }

  if (imagePath) {
    results.push({
      source: "image",
      ...(await predictDisasterFromImage(imagePath))
    });
  }

  if (videoPath) {
    results.push({
      source: "video",
      ...(await predictDisasterFromVideo(videoPath))
    });
  }

  if (results.length === 0) {
    return { disasterType: "unknown", confidence: 0.2 };
  }

  // Pick highest confidence result
  return results.reduce((best, cur) =>
    cur.confidence > best.confidence ? cur : best
  );
}

module.exports = { detectDisaster };
