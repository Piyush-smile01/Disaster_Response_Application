/**
 * Detect severity level from text and AI confidence
 */
function detectSeverity(text, confidence = 0) {
  const msg = (text || "").toLowerCase();
  let severity = "low";

  if (/dead|killed|missing|trapped|collapsed/.test(msg)) {
    severity = "high";
  } else if (/injured|flooded|evacuated|damage/.test(msg)) {
    severity = "medium";
  }

  // Boost severity if AI confidence is very high
  if (confidence >= 0.85 && severity === "medium") {
    severity = "high";
  }

  return severity;
}

/**
 * Calculate priority score for SOS
 */
function calculatePriority({
  severity,
  confidence,
  peopleAffected = 0,
  hasMedia = false
}) {
  let severityScore = 1;

  if (severity === "high") severityScore = 3;
  else if (severity === "medium") severityScore = 2;

  let priority =
    severityScore * 3 +
    confidence * 2 +
    Number(peopleAffected || 0);

  // Media proof increases urgency
  if (hasMedia) priority += 2;

  return priority;
}

module.exports = {
  detectSeverity,
  calculatePriority
};
