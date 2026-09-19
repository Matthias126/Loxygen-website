import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  OPEN_PREFERENCES_EVENT,
  getStoredConsent,
  setStoredConsent,
  subscribeToConsentChange,
  getServerConsentSnapshot,
} from "@/lib/cookieConsent";

export default function CookieConsent() {
  const storedConsent = useSyncExternalStore(
    subscribeToConsentChange,
    getStoredConsent,
    getServerConsentSnapshot
  );
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const handleReopen = () => setReopened(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, handleReopen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, handleReopen);
  }, []);

  const choose = (value) => {
    setStoredConsent(value);
    setReopened(false);
  };

  if (storedConsent !== null && !reopened) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-xl bg-brand-navy px-6 py-5 text-white shadow-lg shadow-black/20 sm:px-8 sm:py-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-white/90">
          We use cookieless analytics to understand how visitors use this site. See our{" "}
          <Link href="/privacy-cookies" className="underline hover:text-white">
            privacy &amp; cookie policy
          </Link>{" "}
          for details. You can change this choice at any time from the footer.
        </p>
        <div className="flex flex-none items-center gap-3">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="rounded-lg border border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy hover:bg-white/90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
