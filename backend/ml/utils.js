function detectSeverity(text) {
  text = text.toLowerCase();

  if (/dead|killed|trapped|collapsed|missing/.test(text)) {
    return "high";
  }

  if (/flooded|injured|damage|evacuated/.test(text)) {
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
