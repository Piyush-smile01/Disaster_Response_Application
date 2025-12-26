function detectSeverity(message, peopleAffected = 0) {
  const text = message.toLowerCase();

  if (peopleAffected >= 50) return "critical";
  if (peopleAffected >= 20) return "high";
  if (peopleAffected >= 5) return "medium";

  if (
    text.includes("urgent") ||
    text.includes("trapped") ||
    text.includes("emergency")
  ) {
    return "high";
  }

  return "low";
}


function calculatePriority(severity, confidence, peopleAffected = 0) {
  let score = 0;

  // Severity weight
  switch (severity) {
    case "critical":
      score += 4;
      break;
    case "high":
      score += 3;
      break;
    case "medium":
      score += 2;
      break;
    default:
      score += 1;
  }

  // Confidence weight (0–2)
  score += Math.round(confidence * 2);

  // People affected weight (0–3)
  if (peopleAffected >= 50) score += 3;
  else if (peopleAffected >= 20) score += 2;
  else if (peopleAffected >= 5) score += 1;

  return Math.min(score, 10);
}


module.exports = { detectSeverity, calculatePriority };


