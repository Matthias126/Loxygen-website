export const SUSTAINABILITY_AWARD_DEADLINE = "2026-07-31T23:59:59+02:00";

export function isSustainabilityAwardClosed() {
  return Date.now() > new Date(SUSTAINABILITY_AWARD_DEADLINE).getTime();
}
