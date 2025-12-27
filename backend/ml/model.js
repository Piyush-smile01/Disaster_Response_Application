const DISASTER_KEYWORDS = {
  flood: [
    "flood",
    "flooded",
    "water",
    "overflow",
    "submerged",
    "dam",
    "river"
  ],
  fire: [
    "fire",
    "burning",
    "smoke",
    "blast",
    "explosion"
  ],
  earthquake: [
    "earthquake",
    "tremor",
    "seismic",
    "aftershock",
    "collapse"
  ],
  cyclone: [
    "cyclone",
    "storm",
    "hurricane",
    "typhoon",
    "strong winds"
  ],
  landslide: [
    "landslide",
    "mudslide",
    "hill collapse",
    "rocks falling"
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

    for (const keyword of keywords) {
      if (message.includes(keyword)) {
        matches++;
      }
    }

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
