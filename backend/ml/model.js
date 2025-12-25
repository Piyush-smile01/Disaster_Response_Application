const tf = require("@tensorflow/tfjs-node");

let model = null;

// Load model once
async function loadModel() {
  if (!model) {
    const path = require("path");

model = await tf.loadLayersModel(
  "file://" + path.join(__dirname, "../model/model.json")
);

    console.log("TensorFlow model loaded");
  }
}

// Disaster prediction function
async function predictDisaster(text) {
  await loadModel();

  // ⚠ Placeholder input (replace later with real NLP)
  const input = tf.tensor([[text.length]]);
  const prediction = model.predict(input);
  const result = prediction.dataSync();

  return {
    disasterType: "Flood",   // placeholder
    confidence: Number(result[0].toFixed(2))
  };
}

module.exports = { predictDisaster };
