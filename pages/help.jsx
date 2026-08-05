import Head from "next/head";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { HELP_FAQ, buildHelpFaqJsonLd } from "@/lib/structuredData";

const TITLE = "Help & FAQ | Loxygen Academy";
const DESCRIPTION =
  "Answers to common questions about creating an account, purchasing courses, accessing e-learning, and getting set up on JollyDeck.";

export default function Help() {
  const jsonLd = buildHelpFaqJsonLd();

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/help`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/help`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-display text-heading tracking-tight text-brand-navy">
                Help &{" "}
                <span className="italic text-brand-accent">frequently asked questions.</span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Can&apos;t find what you need here? Reach us through the{" "}
                <Link href="/contact" className="font-semibold text-brand-navy hover:underline">
                  contact page
                </Link>
                .
              </p>
            </div>

            <div className="mt-16 max-w-3xl divide-y divide-slate-200 border-y border-slate-200">
              {HELP_FAQ.map((item) => (
                <details key={item.question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-brand-navy">
                    {item.question}
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 9 6"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 transition-transform group-open:rotate-180"
                    >
                      <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-base leading-7 text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
