/**
 * Utility functions for disaster severity & priority
 * Priority scale:
 * 1 = Very destructive
 * 2 = Moderate
 * 3 = Low
 */

function detectSeverity(message, peopleAffected = 0) {
  const text = message.toLowerCase();

  if (peopleAffected >= 50) return "critical";
  if (peopleAffected >= 20) return "high";
  if (peopleAffected >= 5) return "medium";

  if (
    text.includes("collapsed") ||
    text.includes("trapped") ||
    text.includes("emergency") ||
    text.includes("destroyed")
  ) {
    return "high";
  }

  return "low";
}

function rateDisasterPriority({
  confidence,
  severity,
  peopleAffected = 0
}) {
  // ---- Priority 1: Very destructive ----
  if (
    severity === "critical" ||
    (confidence >= 0.75 && peopleAffected >= 50)
  ) {
    return 1;
  }

  // ---- Priority 2: Moderate ----
  if (
    severity === "high" ||
    (confidence >= 0.5 && peopleAffected >= 10)
  ) {
    return 2;
  }

  // ---- Priority 3: Low ----
  return 3;
}

module.exports = {
  detectSeverity,
  rateDisasterPriority
};
