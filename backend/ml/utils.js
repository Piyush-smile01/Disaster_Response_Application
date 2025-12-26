function detectSeverity(message, peopleAffected = 0) {
  message = message.toLowerCase();

  if (peopleAffected >= 50) return "high";
  if (peopleAffected >= 20) return "medium";

  if (
    message.includes("earthquake") ||
    message.includes("flood") ||
    message.includes("fire") ||
    message.includes("collapse")
  ) {
    return "medium";
  }

  return "low";
}


function calculatePriority(severity, confidence, peopleAffected) {
  let severityScore = 1;

  if (severity === "high") severityScore = 3;
  else if (severity === "medium") severityScore = 2;

  // confidence is expected between 0 and 1
  return severityScore * 3 + confidence * 2 + Number(peopleAffected || 0);
}

module.exports = { detectSeverity, calculatePriority };
