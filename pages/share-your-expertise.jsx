import Head from "next/head";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";
import ShareExpertiseForm from "@/components/ShareExpertiseForm";

const TITLE = "Share Your Expertise | Loxygen Academy";
const DESCRIPTION =
  "Instructor, speaker or industry specialist? Tell us about your area of expertise and help shape Loxygen Academy's courses, webinars and blog.";

export default function ShareYourExpertise() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    url: `${SITE_URL}/share-your-expertise`,
    isPartOf: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/share-your-expertise`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/share-your-expertise`} />
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
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
              <div>
                <h1 className="font-display text-heading tracking-tight text-brand-navy">
                  Share your{" "}
                  <span className="italic text-brand-accent">logistics expertise.</span>
                </h1>
                <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">
                  Loxygen Academy works with industry specialists to build courses, run
                  webinars, and write for our blog. If you have hands-on freight forwarding or
                  supply chain expertise, we&apos;d like to hear from you.
                </p>
                <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Or email us directly
                </p>
                <a
                  href="mailto:geert@loxygen.world"
                  className="mt-2 inline-block text-lg font-semibold text-brand-navy hover:underline"
                >
                  geert@loxygen.world
                </a>
              </div>

              <div className="rounded-xl bg-white p-8 shadow-card lg:p-10">
                <ShareExpertiseForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
