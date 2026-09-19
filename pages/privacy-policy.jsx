import Head from "next/head";
import Link from "next/link";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

const TITLE = "Privacy Policy | Loxygen Academy";
const DESCRIPTION =
  "How Loxygen Academy collects, uses, shares and protects the personal data of visitors and account holders on loxygen.world.";
const LAST_UPDATED = "19 September 2026";

const SECTIONS = [
  {
    title: "Who we are",
    body: (
      <>
        <p>
          This policy covers <strong>loxygen.world</strong>, operated by Loxygen BV (&ldquo;Loxygen&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;), registered office at Jules Bordetstraat 25/402, 2018 Antwerp,
          Belgium, company number 1013.124.814 (RLE Antwerp).
        </p>
        <p>
          It explains what personal data we collect from visitors and account holders on this
          website, why, and who we share it with. For what cookies we use specifically, see our{" "}
          <Link href="/cookie-policy" className="underline hover:text-brand-navy/80">
            Cookie Policy
          </Link>
          . This page is separate from our{" "}
          <Link href="/terms-and-conditions" className="underline hover:text-brand-navy/80">
            Terms &amp; Conditions
          </Link>{" "}
          and{" "}
          <Link href="/dpa" className="underline hover:text-brand-navy/80">
            Data Processing Agreement
          </Link>
          , which govern how we process participant data on behalf of a business that has ordered
          Trainings or Services from us.
        </p>
      </>
    ),
  },
  {
    title: "The data we collect",
    body: (
      <>
        <p>We only collect what a given feature of the site actually needs:</p>
        <ul className="mt-4 list-disc space-y-3 pl-6">
          <li>
            <strong>Creating an account:</strong> name, email address, password (stored as a
            salted hash, never in plain text), business name, country and network affiliation.
            Used to run your account and give you access to what you&apos;ve purchased.
          </li>
          <li>
            <strong>Purchases:</strong> which courses, webinars or subscriptions are linked to
            your account, and the corresponding order. Card and payment details are entered
            directly on Stripe&apos;s own checkout page — we never see or store your card number.
          </li>
          <li>
            <strong>Contact and &ldquo;Share your expertise&rdquo; forms:</strong> name, email,
            company (optional) and your message. These are sent to us by email (via Resend) to
            reply to you — they are not written into our database.
          </li>
          <li>
            <strong>Website analytics:</strong> if you accept our cookie banner, anonymous,
            aggregate page-view counts — see our{" "}
            <Link href="/cookie-policy" className="underline hover:text-brand-navy/80">
              Cookie Policy
            </Link>{" "}
            for detail. If you decline, no analytics script loads at all.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Why we process it, and on what basis",
    body: (
      <ul className="list-disc space-y-3 pl-6">
        <li>
          <strong>Performance of a contract</strong> — creating and running your account,
          delivering the courses or webinars you&apos;ve purchased, processing payment.
        </li>
        <li>
          <strong>Legitimate interest</strong> — replying to a message you sent us through the
          contact form, keeping the site secure and working.
        </li>
        <li>
          <strong>Consent</strong> — website analytics. You can withdraw this at any time from the
          &ldquo;Cookie preferences&rdquo; link in the footer.
        </li>
        <li>
          <strong>Legal obligation</strong> — keeping records (e.g. invoices) for as long as
          Belgian tax and accounting law requires.
        </li>
      </ul>
    ),
  },
  {
    title: "Who we share data with",
    body: (
      <>
        <p>We use a small number of providers to run this site and never sell your data:</p>
        <ul className="mt-4 list-disc space-y-3 pl-6">
          <li>
            <strong>Supabase</strong> — hosts our database (accounts, purchases, course content).
          </li>
          <li>
            <strong>Stripe</strong> — processes payments; you enter card details on their page,
            not ours.
          </li>
          <li>
            <strong>Resend</strong> — sends transactional and contact-form emails on our behalf.
          </li>
          <li>
            <strong>Vercel</strong> — hosts the site and, if you consent, provides cookieless
            analytics.
          </li>
          <li>
            <strong>JollyDeck</strong> — delivers the micro-learning content embedded on course
            pages, for customers who&apos;ve purchased that course.
          </li>
        </ul>
        <p className="mt-4">
          Each acts as our processor and is bound to only use your data to provide their service
          to us, in line with their own security and privacy commitments.
        </p>
      </>
    ),
  },
  {
    title: "How long we keep it",
    body: (
      <p>
        We keep account and purchase data for as long as your account is active, plus a
        reasonable period afterwards, and for as long as Belgian tax and accounting law requires
        us to retain invoices and financial records. Contact-form messages are kept only as long
        as normal email records are kept. You can ask us to delete your account and associated
        data at any time, subject to what we&apos;re legally required to retain.
      </p>
    ),
  },
  {
    title: "Your rights",
    body: (
      <>
        <p>Under the GDPR, you have the right to:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>access the personal data we hold about you;</li>
          <li>ask us to correct or complete it;</li>
          <li>ask us to erase it, where we&apos;re not legally required to keep it;</li>
          <li>restrict or object to certain processing;</li>
          <li>receive your data in a portable format;</li>
          <li>withdraw consent at any time (e.g. for analytics), without affecting anything done before withdrawal.</li>
        </ul>
        <p className="mt-4">
          To exercise any of these, email us at{" "}
          <a href="mailto:geert@loxygen.world" className="underline hover:text-brand-navy/80">
            geert@loxygen.world
          </a>
          . You can also lodge a complaint with the Belgian Data Protection Authority
          (Gegevensbeschermingsautoriteit) if you believe we&apos;ve mishandled your data.
        </p>
      </>
    ),
  },
  {
    title: "Children",
    body: (
      <p>
        This site and its courses are intended for logistics professionals. We don&apos;t
        knowingly collect personal data from children.
      </p>
    ),
  },
  {
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy as the site changes. Significant changes will be reflected by
        updating the date at the top of this page.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/privacy-policy`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/privacy-policy`} />
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
              Privacy{" "}
              <span className="italic text-brand-accent">policy.</span>
            </h1>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Last updated {LAST_UPDATED}
            </p>

            <div className="mt-16 space-y-12">
              {SECTIONS.map((section) => (
                <div key={section.title}>
                  <h2 className="font-display text-2xl text-brand-navy">{section.title}</h2>
                  <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
                    {section.body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
