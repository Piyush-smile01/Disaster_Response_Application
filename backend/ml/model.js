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

const LABELS = ["flood", "fire", "earthquake", "cyclone", "landslide"];
const labelToIndex = Object.fromEntries(
  LABELS.map((l, i) => [l, i])
);

// --- Training data (expand later) ---
const TRAINING_DATA = [
  { text: "river overflowed after heavy rain", label: "flood" },
  { text: "houses submerged due to rainfall", label: "flood" },
  { text: "fire broke out in market area", label: "fire" },
  { text: "thick smoke and flames spreading", label: "fire" },
  { text: "strong earthquake tremors felt", label: "earthquake" },
  { text: "aftershocks caused panic", label: "earthquake" },
  { text: "cyclone caused heavy winds and rain", label: "cyclone" },
  { text: "storm surge damaged coastal homes", label: "cyclone" },
  { text: "landslide blocked mountain road", label: "landslide" },
  { text: "mudslide destroyed houses", label: "landslide" }
];

// ---- Tokenization ----
const vocab = {};
let vocabSize = 1;

function textToSequence(text) {
  return tokenizer.tokenize(text.toLowerCase()).map(word => {
    if (!vocab[word]) vocab[word] = vocabSize++;
    return vocab[word];
  });
}

const MAX_LEN = 10;

function padSequence(seq) {
  return seq.slice(0, MAX_LEN).concat(
    Array(Math.max(0, MAX_LEN - seq.length)).fill(0)
  );
}

// ---- Prepare tensors ----
const sequences = TRAINING_DATA.map(d => padSequence(textToSequence(d.text)));
const labels = TRAINING_DATA.map(d => labelToIndex[d.label]);

const xs = tf.tensor2d(sequences);
const ys = tf.oneHot(tf.tensor1d(labels, "int32"), LABELS.length);

// ---- Model ----
const model = tf.sequential();

model.add(
  tf.layers.embedding({
    inputDim: 5000,
    outputDim: 16,
    inputLength: MAX_LEN
  })
);

model.add(tf.layers.flatten());
model.add(tf.layers.dense({ units: 32, activation: "relu" }));
model.add(tf.layers.dense({ units: LABELS.length, activation: "softmax" }));

model.compile({
  optimizer: "adam",
  loss: "categoricalCrossentropy",
  metrics: ["accuracy"]
});

// ---- Train once ----
(async () => {
  await model.fit(xs, ys, { epochs: 50, verbose: 0 });
})();

// ---- Prediction ----
async f
