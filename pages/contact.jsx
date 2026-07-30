import Head from "next/head";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import ContactForm from "@/components/ContactForm";

const TITLE = "Contact | Loxygen Academy";
const DESCRIPTION =
  "Get in touch with Loxygen Academy — questions about courses, webinars, immersive programmes or partnerships.";

export default function Contact() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: TITLE,
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      email: "geert@loxygen.world",
      sameAs: SITE_URL,
    },
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/contact`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/contact`} />

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
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
              <div>
                <h1 className="font-display text-heading tracking-tight text-brand-navy">
                  Let&apos;s talk{" "}
                  <span className="italic text-brand-accent">logistics training.</span>
                </h1>
                <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">
                  Questions about a course, a webinar, or bringing the Academy in-company? Send
                  us a message.
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
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
