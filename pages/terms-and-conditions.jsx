import Head from "next/head";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const TITLE = "Terms & Conditions | Loxygen Academy";
const DESCRIPTION =
  "Terms and conditions for using the Loxygen Academy website, purchasing courses and subscriptions, and accessing e-learning content.";
const LAST_UPDATED = "5 August 2026";

const SECTIONS = [
  {
    heading: "1. Acceptance of these terms",
    paragraphs: [
      "These terms govern your use of the Loxygen Academy website (loxygen.world) and any courses, webinars, micro-learning subscriptions or immersive programmes purchased through it. By creating an account or making a purchase, you agree to these terms.",
    ],
  },
  {
    heading: "2. About Loxygen",
    paragraphs: [
      "Loxygen Academy is operated by Loxygen BV, a company registered in Belgium. References to \"we\", \"us\" or \"Loxygen\" mean Loxygen BV.",
    ],
  },
  {
    heading: "3. Our services",
    paragraphs: [
      "We offer e-learning courses, a micro-learning subscription delivered through our partner platform JollyDeck, live webinars, and immersive on-site training programmes. Course availability, dates and pricing are shown on the relevant pages and may change from time to time.",
    ],
  },
  {
    heading: "4. Accounts",
    paragraphs: [
      "Some content, including e-learning courses and your purchase history, is only accessible after creating an account and signing in. You're responsible for keeping your login details confidential and for all activity under your account.",
    ],
  },
  {
    heading: "5. Orders, pricing & payment",
    paragraphs: [
      "Prices are shown in EUR and, unless stated otherwise, exclude VAT. Payment is processed securely by our payment provider, Stripe; we do not store your card details ourselves. An order is confirmed once payment has been successfully processed, and you'll receive a confirmation email.",
    ],
  },
  {
    heading: "6. Course access & licence",
    paragraphs: [
      "Purchasing a course or subscription grants you a personal, non-transferable licence to access that content for your own learning. Course materials, videos and downloads may not be redistributed, resold, or shared outside your organisation without our written permission.",
    ],
  },
  {
    heading: "7. Cancellations & refunds",
    paragraphs: [
      "For on-demand e-learning content, refund requests are considered on a case-by-case basis and are generally not available once a course has been substantially accessed. For webinars and immersive programmes with fixed dates, cancellation terms (including any applicable deadlines and fees) are stated on the relevant programme page. Micro-learning subscriptions can be cancelled at any time for the following billing period; already-paid periods are non-refundable.",
    ],
  },
  {
    heading: "8. Third-party services",
    paragraphs: [
      "Micro-learning content is delivered through JollyDeck, a third-party platform. After your subscription is confirmed, we create an account for you on JollyDeck using the email address provided at checkout; your use of JollyDeck is also subject to JollyDeck's own terms. Payments are processed by Stripe, and transactional emails are sent via Resend.",
    ],
  },
  {
    heading: "9. Intellectual property",
    paragraphs: [
      "All course content, website content, trademarks and the Loxygen name and logo are the property of Loxygen BV or its licensors, and may not be used without permission.",
    ],
  },
  {
    heading: "10. Limitation of liability",
    paragraphs: [
      "Our courses and content are provided for educational purposes. While we aim for accuracy, Loxygen is not liable for decisions made based on course content, and our liability for any claim relating to these terms is limited to the amount you paid for the relevant course or subscription, except where liability cannot be limited by law.",
    ],
  },
  {
    heading: "11. Changes to these terms",
    paragraphs: [
      "We may update these terms from time to time. Material changes will be reflected on this page with an updated date, and continued use of the site after changes take effect constitutes acceptance of the revised terms.",
    ],
  },
  {
    heading: "12. Governing law & disputes",
    paragraphs: [
      "These terms are governed by Belgian law. Any disputes arising from these terms or your use of the Academy will be subject to the exclusive jurisdiction of the courts of Belgium.",
    ],
  },
  {
    heading: "13. Contact",
    paragraphs: [
      "Questions about these terms can be sent to geert@loxygen.world or via our contact page.",
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/terms-and-conditions`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/terms-and-conditions`} />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">
              Terms &{" "}
              <span className="italic text-brand-accent">conditions.</span>
            </h1>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Last updated {LAST_UPDATED}
            </p>

            <div className="mt-16 space-y-12">
              {SECTIONS.map((section) => (
                <div key={section.heading}>
                  <h2 className="font-display text-2xl text-brand-navy">{section.heading}</h2>
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index} className="mt-4 text-base leading-7 text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
