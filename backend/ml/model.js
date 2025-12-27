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
const natural = require("natural");

const tokenizer = new natural.WordTokenizer();

// Fixed vocabulary (small demo NLP vocab)
const VOCAB = [
  "flood", "water", "rain", "fire", "burn", "smoke",
  "earthquake", "tremor", "shake",
  "cyclone", "storm", "wind",
  "landslide", "mud"
];

const DISASTERS = [
  "flood",
  "fire",
  "earthquake",
  "cyclone",
  "landslide"
];

// Convert text → tensor
function textToTensor(text) {
  const tokens = tokenizer.tokenize(text.toLowerCase());
  const vector = VOCAB.map(word => (tokens.includes(word) ? 1 : 0));
  return tf.tensor2d([vector]);
}

// Simple NN model (loaded once)
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [VOCAB.length], units: 16, activation: "relu" }));
model.add(tf.layers.dense({ units: DISASTERS.length, activation: "softmax" }));

model.compile({
  optimizer: "adam",
  loss: "categoricalCrossentropy"
});

// Fake-trained weights (demo purpose)
const dummyWeights = model.getWeights();
model.setWeights(dummyWeights);

async function predictDisaster(text) {
  const inputTensor = textToTensor(text);
  const prediction = model.predict(inputTensor);
  const scores
