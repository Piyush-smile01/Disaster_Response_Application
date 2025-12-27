/**
 * Disaster prediction module
 * This version uses intelligent keyword matching
 * and returns realistic confidence scores.
 */

/**
 * Disaster prediction module (TensorFlow NLP)
 */

/**
 * Disaster prediction module (TensorFlow NLP)
 * Returns disaster type + confidence
 */

const tf = require("@tensorflow/tfjs-node");
const sharp = require("sharp");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");

/* ---------------- TEXT MODEL ---------------- */

const DISASTERS = ["flood", "fire", "earthquake", "cyclone", "landslide"];

async function predictTextDisaster(text) {
  const lower = text.toLowerCase();

  let scores = {
    flood: lower.includes("flood") || lower.includes("water") ? 0.8 : 0.1,
    fire: lower.includes("fire") || lower.includes("smoke") ? 0.8 : 0.1,
    earthquake: lower.includes("earthquake") ? 0.8 : 0.1,
    cyclone: lower.includes("storm") || lower.includes("wind") ? 0.8 : 0.1,
    landslide: lower.includes("landslide") || lower.includes("mud") ? 0.8 : 0.1
  };

  let best = "unknown";
  let confidence = 0;

  for (let k in scores) {
    if (scores[k] > confidence) {
      confidence = scores[k];
      best = k;
    }
  }

  return { disasterType: best, confidence };
}

/* ---------------- IMAGE MODEL ---------------- */

async function preprocessImage(imagePath) {
  const buffer = await sharp(imagePath)
    .resize(224, 224)
    .toFormat("png")
    .toBuffer();

  return tf.node
    .decodeImage(buffer, 3)
    .expandDims(0)
    .div(255.0);
}

async function predictImageDisaster(imagePath) {
  // Dummy CNN-style logic (replace with trained model later)
  const tensor = await preprocessImage(imagePath);
  tensor.dispose();

  return {
    disasterType: "flood",
    confidence: 0.75
  };
}

/* ---------------- VIDEO MODEL ---------------- */

function extractFrame(videoPath, framePath) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .screenshots({
        count: 1,
        folder: path.dirname(framePath),
        filename: path.basename(framePath)
      })
      .on("end", resolve)
      .on("error", reject);
  });
}

async function predictVideoDisaster(videoPath) {
  const framePath = videoPath.replace(".mp4", "_frame.png");

  await extractFrame(videoPath, framePath);
  const prediction = await predictImageDisaster(framePath);

  fs.unlinkSync(framePath);
  return prediction;
}

module.exports = {
  predictTextDisaster,
  predictImageDisaster,
  predictVideoDisaster
};
