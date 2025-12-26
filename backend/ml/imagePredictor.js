const tf = require("@tensorflow/tfjs-node");
const mobilenet = require("@tensorflow-models/mobilenet");
const fs = require("fs");

let model;

// Load model once
async function loadModel() {
  if (!model) {
    model = await mobilenet.load();
  }
  return model;
}

async function predictDisasterFromImage(imagePath) {
  const model = await loadModel();

  const imageBuffer = fs.readFileSync(imagePath);
  const tensor = tf.node.decodeImage(imageBuffer);

  const predictions = await model.classify(tensor);
  tensor.dispose();

  // Map image labels to disasters
  const disasterMap = {
    flood: ["river", "water", "dam", "flood"],
    fire: ["fire", "smoke", "flame"],
    earthquake: ["building", "rubble", "collapse"],
    cyclone: ["storm", "cyclone", "hurricane"],
    landslide: ["landslide", "mud", "mountain"]
  };

  for (const pred of predictions) {
    const label = pred.className.toLowerCase();

    for (const [type, keywords] of Object.entries(disasterMap)) {
      if (keywords.some(k => label.includes(k))) {
        return {
          disasterType: type,
          confidence: pred.probability
        };
      }
    }
  }

  return { disasterType: "unknown", confidence: 0.3 };
}

module.exports = { predictDisasterFromImage };
