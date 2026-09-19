import Head from "next/head";
import Link from "next/link";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { OPEN_PREFERENCES_EVENT } from "@/lib/cookieConsent";

const TITLE = "Cookie Policy | Loxygen Academy";
const DESCRIPTION =
  "What cookies and similar technologies loxygen.world uses, why, and how to control them.";
const LAST_UPDATED = "19 September 2026";

const COOKIE_ROWS = [
  {
    name: "next-auth.session-token",
    provider: "Loxygen (set by NextAuth, first-party)",
    purpose: "Keeps you signed in to your account so you can reach purchased e-learning content.",
    duration: "Session / up to 30 days",
    consent: "Strictly necessary — set only if you sign in",
  },
  {
    name: "loxygen-cookie-consent",
    provider: "Loxygen (browser local storage, not a cookie)",
    purpose:
      "Remembers whether you accepted or declined analytics, so we don't ask again every visit.",
    duration: "Until you clear your browser storage",
    consent: "Strictly necessary",
  },
  {
    name: "Vercel Web Analytics",
    provider: "Vercel Inc.",
    purpose:
      "Counts page views and traffic sources in aggregate. Vercel's Web Analytics is cookieless — it does not use cookies or local storage and does not build a profile of you across visits.",
    duration: "No cookie is set — page-view data is retained by Vercel in aggregate form",
    consent: "Only loaded if you accept via the cookie banner",
  },
];

export default function CookiePolicy() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/cookie-policy`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/cookie-policy`} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">
              Cookie{" "}
              <span className="italic text-brand-accent">policy.</span>
            </h1>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Last updated {LAST_UPDATED}
            </p>

            <div className="mt-16 space-y-12">
              <div>
                <h2 className="font-display text-2xl text-brand-navy">What this covers</h2>
                <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
                  <p>
                    This policy explains what cookies and similar technologies (like browser local
                    storage) loxygen.world sets in your browser, why, and how to control them. For
                    how we handle personal data more broadly, see our{" "}
                    <Link href="/privacy-policy" className="underline hover:text-brand-navy/80">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl text-brand-navy">
                  Cookies and similar technologies
                </h2>
                <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
                  <p>
                    The table below lists everything this website sets in your browser. We
                    don&apos;t use advertising or cross-site tracking cookies of any kind.
                  </p>
                  <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 bg-brand-light/60">
                          <th className="px-4 py-3 font-semibold text-brand-navy">Name</th>
                          <th className="px-4 py-3 font-semibold text-brand-navy">Set by</th>
                          <th className="px-4 py-3 font-semibold text-brand-navy">Purpose</th>
                          <th className="px-4 py-3 font-semibold text-brand-navy">Duration</th>
                          <th className="px-4 py-3 font-semibold text-brand-navy">Consent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {COOKIE_ROWS.map((row) => (
                          <tr
                            key={row.name}
                            className="border-b border-slate-100 align-top last:border-0"
                          >
                            <td className="px-4 py-3 font-mono text-xs text-brand-navy">
                              {row.name}
                            </td>
                            <td className="px-4 py-3 text-slate-600">{row.provider}</td>
                            <td className="px-4 py-3 text-slate-600">{row.purpose}</td>
                            <td className="px-4 py-3 text-slate-600">{row.duration}</td>
                            <td className="px-4 py-3 text-slate-600">{row.consent}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl text-brand-navy">Third-party embeds</h2>
                <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
                  <p>
                    If you&apos;ve purchased a micro-learning course, its content is shown to you
                    through an embedded JollyDeck player. That embed runs on JollyDeck&apos;s own
                    domain inside the page and may set its own cookies to run the player, which
                    this policy doesn&apos;t cover — see{" "}
                    <a
                      href="https://jollydeck.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-brand-navy/80"
                    >
                      JollyDeck&apos;s own privacy policy
                    </a>
                    . The same applies to Stripe&apos;s checkout page when you make a purchase.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl text-brand-navy">Managing your choice</h2>
                <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
                  <p>
                    You can accept or decline analytics from the banner shown on your first visit,
                    and change your mind at any time below. Declining means the analytics script
                    never loads — nothing is set or removed retroactively, since Vercel Web
                    Analytics doesn&apos;t use cookies in the first place.
                  </p>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent(OPEN_PREFERENCES_EVENT))}
                    className="inline-flex items-center justify-center rounded-lg border border-brand-navy px-5 py-2.5 text-sm font-semibold text-brand-navy hover:bg-brand-navy/5"
                  >
                    Change my cookie choice
                  </button>
                  <p>
                    You can also block or delete cookies through your browser&apos;s own settings.
                    Blocking the strictly necessary session cookie will sign you out and prevent
                    you from reaching purchased e-learning content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
