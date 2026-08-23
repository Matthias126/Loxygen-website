export const COURSE_TYPES = [
  "e-learning",
  "webinar",
  "micro-learning",
  "immersive",
  "micro-learning-team",
];

// Maps a course's `type` onto the 3 detail-page templates (self-paced /
// scheduled / immersive) and the Academy hub's filter categories — both
// need the same mapping, kept here once.
export const COURSE_TYPE_TO_CATEGORY = {
  "e-learning": "self-paced",
  "micro-learning": "self-paced",
  webinar: "scheduled",
  immersive: "immersive",
  // Not a real page — this type only exists so the team-plan price tiers
  // have somewhere to live in course_price_tiers (see lib/licenses.js).
  "micro-learning-team": "self-paced",
};
