import { useEffect } from "react";
import Script from "next/script";

// Geert's GA4 property. Public by design — it's in every page's HTML once
// the script loads.
export const GA_MEASUREMENT_ID = "G-TX1GQ7VL3T";

// gtag.js sets _ga and _ga_<container-id> on the top-level domain
// (.loxygen.world), so clear both that and the host-only variant.
function clearGoogleAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
  const domain = window.location.hostname.replace(/^www\./, "");

  for (const name of names) {
    const expired = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    document.cookie = expired;
    document.cookie = `${expired}; domain=.${domain}`;
  }
}

// Mounted by _app.js only while the visitor has accepted analytics. GA4's
// enhanced measurement tracks client-side route changes on its own, so no
// router hook is needed for page views.
export default function GoogleAnalytics() {
  useEffect(() => {
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

    // Consent withdrawn: gtag.js can't be unloaded once it's run, so switch
    // it off for the rest of the visit and remove what it set.
    return () => {
      window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      clearGoogleAnalyticsCookies();
    };
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
