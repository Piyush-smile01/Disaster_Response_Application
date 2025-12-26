const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");
const fs = require("fs");
const { predictDisasterFromImage } = require("./imagePredictor");

ffmpeg.setFfmpegPath(ffmpegPath);

async function predictDisasterFromVideo(videoPath) {
  const framesDir = "./frames";
  if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir);

  // Extract 1 frame every 3 seconds
  await new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .on("end", resolve)
      .on("error", reject)
      .screenshots({
        count: 5,
        folder: framesDir,
        size: "640x?"
      });
  });

  let bestResult = { disasterType: "unknown", confidence: 0 };

  const frames = fs.readdirSync(framesDir);

  for (const frame of frames) {
    const result = await predictDisasterFromImage(
      path.join(framesDir, frame)
    );

    if (result.confidence > bestResult.confidence) {
      bestResult = result;
    }
  }

  return bestResult;
}

module.exports = { predictDisasterFromVideo };
