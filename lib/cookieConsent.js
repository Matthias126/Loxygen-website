// Shared between CookieConsent (the banner) and _app.js (which decides
// whether to mount Vercel Analytics) so both agree on the same stored value
// without either one importing the other.
export const CONSENT_STORAGE_KEY = "loxygen-cookie-consent";
export const CONSENT_CHANGE_EVENT = "loxygen:cookie-consent-change";
export const OPEN_PREFERENCES_EVENT = "loxygen:open-cookie-preferences";

export function getStoredConsent() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredConsent(value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // localStorage can be unavailable (private browsing, blocked storage) —
    // the banner just won't remember the choice next visit.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }));
}

// For useSyncExternalStore, which needs a subscribe fn and a snapshot getter
// that stays referentially stable rather than a one-shot effect — reading
// localStorage directly inside an effect body trips the
// react-hooks/set-state-in-effect lint rule.
export function subscribeToConsentChange(callback) {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
}

export function getServerConsentSnapshot() {
  return null;
}
