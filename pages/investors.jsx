import Head from "next/head";
import Link from "next/link";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

const TITLE = "Investors | Loxygen Academy";
const DESCRIPTION =
  "Loxygen is building the training and knowledge layer for the freight forwarding industry. Learn about our growth and how to get in touch about investment.";

const STATS = [
  { value: "2024", label: "founded in Belgium" },
  { value: "380+", label: "member companies across our partner networks" },
  { value: "7", label: "training programmes across e-learning, webinars & immersive trips" },
  { value: "3", label: "partner networks: CrossTrades, SeaBlue Project Logistics Network & Flyte" },
];

export default function Investors() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: TITLE,
    url: `${SITE_URL}/investors`,
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      legalName: "Loxygen BV",
      foundingDate: "2024",
      foundingLocation: "Belgium",
      sameAs: SITE_URL,
    },
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/investors`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/investors`} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pt-24 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-display text-heading tracking-tight text-brand-navy">
                Building the{" "}
                <span className="italic text-brand-accent">knowledge layer</span> for freight
                forwarding.
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Loxygen BV was founded in Belgium in 2024 on a simple premise: freight
                forwarders need practical, job-ready training, and the industry hasn&apos;t had
                a platform built specifically for it.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                We&apos;re growing that premise into a full academy: e-learning, micro-learning
                subscriptions, webinars and immersive programmes, backed by two established
                partner networks in the logistics industry.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-stat leading-none text-brand-navy">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="bg-grain rounded-3xl bg-brand-navy px-6 py-16 text-center">
              <p className="font-display text-2xl text-white">
                Interested in Loxygen&apos;s growth story?
              </p>
              <p className="mt-4 text-base leading-7 text-white/70">
                Get in touch and we&apos;ll share more about where the Academy is headed.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-navy hover:bg-white/90"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
