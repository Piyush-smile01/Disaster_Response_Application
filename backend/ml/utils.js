/**
 * Utility functions for disaster severity & priority
 * Priority scale:
 * 1 = Very destructive
 * 2 = Moderate
 * 3 = Low
 */

function detectSeverity(message, peopleAffected = 0) {
  const text = message.toLowerCase();

  if (peopleAffected > 100 || text.includes("destroyed")) return 3;
  if (peopleAffected > 20 || text.includes("trapped")) return 2;
  return 1;
}

// Priority scale:
// 1 = very destructive
// 2 = moderate
// 3 = low
function calculatePriority(severity, confidence) {
  if (severity === 3 && confidence > 0.6) return 1;
  if (severity === 2) return 2;
  return 3;
}

module.exports = {
  detectSeverity,
  calculatePriority
};
