/**
 * Disaster prediction module
 * This version uses intelligent keyword matching
 * and returns realistic confidence scores.
 */

const DISASTER_KEYWORDS = {
  flood: [
    "flood", "flooded", "overflow", "water level", "submerged", "dam burst"
  ],
  fire: [
    "fire", "burning", "blast", "explosion", "smoke"
  ],
  earthquake: [
    "earthquake", "tremor", "seismic", "richter", "aftershock"
  ],
  cyclone: [
    "cyclone", "storm", "hurricane", "typhoon", "strong winds"
  ],
  landslide: [
    "landslide", "mudslide", "hill collapse"
  ]
};

async function predictDisaster(text) {
  const message = text.toLowerCase();

  let bestMatch = {
    disasterType: "unknown",
    confidence: 0.3
  };

  for (const [type, keywords] of Object.entries(DISASTER_KEYWORDS)) {
    let matches = 0;

    keywords.forEach(keyword => {
      if (message.includes(keyword)) {
        matches++;
      }
    });

    if (matches > 0) {
      const confidence = Math.min(0.5 + matches * 0.15, 0.95);

      if (confidence > bestMatch.confidence) {
        bestMatch = {
          disasterType: type,
          confidence
        };
      }
    }
  }

  return bestMatch;
}

module.exports = { predictDisaster };
