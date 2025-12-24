function detectSeverity(text) {
  text = text.toLowerCase();

  if (text.match(/dead|killed|trapped|collapsed|missing/)) return 3;
  if (text.match(/flooded|injured|damage|evacuated/)) return 2;
  return 1;
}

function calculatePriority(severity, confidence, peopleAffected) {
  return severity * 3 + confidence * 2 + peopleAffected;
}

module.exports = { detectSeverity, calculatePriority };
