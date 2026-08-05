import Head from "next/head";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const TITLE = "Data Processing Agreement | Loxygen Academy";
const DESCRIPTION =
  "How Loxygen Academy processes personal data on behalf of business customers, including sub-processors, security measures and data subject rights.";
const LAST_UPDATED = "5 August 2026";

const SECTIONS = [
  {
    heading: "1. Purpose & scope",
    paragraphs: [
      "This Data Processing Agreement (DPA) describes how Loxygen BV (\"Loxygen\", \"we\") processes personal data in connection with the Loxygen Academy website, e-learning platform, and micro-learning subscription. It applies alongside our Terms & Conditions for business customers who register employees for training under their organisation's account.",
    ],
  },
  {
    heading: "2. Roles of the parties",
    paragraphs: [
      "For account and billing data, Loxygen acts as the data controller. Where a business customer registers its employees for training, that customer acts as controller for its employees' data, and Loxygen acts as processor, acting only on the customer's documented instructions as set out in this DPA.",
    ],
  },
  {
    heading: "3. Categories of personal data",
    paragraphs: [
      "Name, business email address, company name, course/subscription purchase history, and (where a micro-learning subscription is purchased) the data needed to provision an account on our partner platform, JollyDeck. We do not intentionally collect special categories of personal data.",
    ],
  },
  {
    heading: "4. Purpose of processing",
    paragraphs: [
      "Personal data is processed to create and manage accounts, deliver purchased course and subscription content, provision JollyDeck access, process payments, and send transactional and support emails. It is not used for unrelated marketing without separate consent.",
    ],
  },
  {
    heading: "5. Sub-processors",
    paragraphs: [
      "We use the following sub-processors to deliver the Academy: Stripe (payment processing), Resend (transactional email), Supabase (database and account storage), and JollyDeck (micro-learning content delivery). Each sub-processor is contractually bound to protect personal data to a standard consistent with this DPA.",
    ],
  },
  {
    heading: "6. International transfers",
    paragraphs: [
      "Where a sub-processor stores or processes data outside the European Economic Area, we rely on that provider's own GDPR-compliant transfer mechanisms (such as Standard Contractual Clauses). Details are available on request.",
    ],
  },
  {
    heading: "7. Security measures",
    paragraphs: [
      "Access to personal data is restricted to what's needed to operate the Academy, account passwords are stored using industry-standard hashing, and payment card data is handled entirely by Stripe. Loxygen never stores full card numbers.",
    ],
  },
  {
    heading: "8. Data subject rights",
    paragraphs: [
      "Individuals can request access to, correction of, or deletion of their personal data by contacting us at geert@loxygen.world. Business customers are responsible for handling rights requests from their own employees where Loxygen acts as processor, and we will assist as required by applicable law.",
    ],
  },
  {
    heading: "9. Data breach notification",
    paragraphs: [
      "If we become aware of a personal data breach affecting a business customer's data, we will notify that customer without undue delay so they can meet their own regulatory obligations.",
    ],
  },
  {
    heading: "10. Term & termination",
    paragraphs: [
      "This DPA remains in effect for as long as Loxygen processes personal data on a customer's behalf. On termination, we will delete or return the relevant personal data, unless retention is required by law.",
    ],
  },
  {
    heading: "11. Contact",
    paragraphs: [
      "Questions about this DPA or data protection at Loxygen can be sent to geert@loxygen.world.",
    ],
  },
];

export default function DPA() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/dpa`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/dpa`} />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">
              Data Processing{" "}
              <span className="italic text-brand-accent">Agreement.</span>
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
