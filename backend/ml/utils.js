function detectSeverity(text) {
  const msg = text.toLowerCase();

  if (msg.includes("many") || msg.includes("severe") || msg.includes("trapped")) {
    return "high";
  }
  if (msg.includes("few") || msg.includes("minor")) {
    return "low";
  }
  return "medium";
}

function calculatePriority(severity, confidence, peopleAffected) {
  let score = confidence;

  if (severity === "high") score += 0.3;
  if (severity === "medium") score += 0.2;
  if (peopleAffected > 10) score += 0.2;

  return Math.min(score, 1).toFixed(2);
}

module.exports = { detectSeverity, calculatePriority };

