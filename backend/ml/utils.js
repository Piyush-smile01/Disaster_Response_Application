function detectSeverity(message) {
  const text = message.toLowerCase();

  if (
    text.includes("urgent") ||
    text.includes("trapped") ||
    text.includes("emergency") ||
    text.includes("severe")
  ) {
    return "high";
  }

  if (
    text.includes("injured") ||
    text.includes("damage") ||
    text.includes("help")
  ) {
    return "medium";
  }

  return "low";
}

function calculatePriority(severity, confidence, peopleAffected = 0) {
  let priority = 1;

  if (severity === "high") priority += 3;
  if (severity === "medium") priority += 2;

  if (confidence > 0.7) priority += 2;
  if (peopleAffected > 10) priority += 2;

  return Math.min(priority, 10);
}

module.exports = {
  detectSeverity,
  calculatePriority
};
