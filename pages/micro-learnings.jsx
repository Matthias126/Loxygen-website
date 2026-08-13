import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildMicroLearningsJsonLd } from "@/lib/structuredData";
import { isStaticPageActive } from "@/lib/staticPages";
import CheckIcon from "@/components/CheckIcon";

const TITLE = "Micro-learnings | Loxygen Academy";
const DESCRIPTION =
  "A €190/year subscription to bite-sized logistics and freight forwarding lessons, delivered year-round through JollyDeck.";

const STATS = [
  { value: "€190", label: "per year, excl. VAT" },
  { value: "15 min", label: "average module length" },
  { value: "Year-round", label: "new modules released regularly" },
  { value: "JollyDeck", label: "delivery platform" },
];

const OUTCOMES = [
  "Short, focused modules you can complete between shipments",
  "New content released through the year, not just once",
  "Freight forwarding topics: documentation, compliance, trade lanes and more",
  "Built for teams learning in the flow of work, not in a training room",
];

const MICRO_FAQ = [
  {
    question: "How do I get access after subscribing?",
    answer:
      "Once your payment is confirmed, we set up your JollyDeck account using the email address from checkout and send you the login details. This is a manual step on our side, so allow up to one business day.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel at any time and you'll keep access until the end of your current paid year. We don't offer refunds for already-paid periods.",
  },
  {
    question: "Is this the same as the e-learning courses?",
    answer:
      "No. E-learning courses are longer, standalone courses purchased individually. Micro-learnings are short modules delivered continuously through JollyDeck as part of your subscription.",
  },
];

export default function MicroLearnings() {
  const jsonLd = [
    buildMicroLearningsJsonLd(),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: MICRO_FAQ.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/micro-learnings`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/micro-learnings`} />
        <meta property="og:image" content={`${SITE_URL}/images/micro-learnings.jpg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/images/micro-learnings.jpg`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main>
        {/* Intro */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pt-24 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-display text-heading tracking-tight text-brand-navy">
                Micro-learnings:{" "}
                <span className="italic text-brand-accent">
                  logistics knowledge, year-round.
                </span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Bite-sized lessons delivered continuously through JollyDeck, built for freight
                forwarding teams learning in the flow of work, not a once-a-year training day.
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

            <div className="relative mt-12 aspect-[21/9] w-full overflow-hidden rounded-3xl">
              <Image
                src="/images/micro-learnings.jpg"
                alt="A Loxygen guide pointing out port infrastructure to a group on a dockside walkway"
                fill
                sizes="(min-width: 1024px) 1152px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">What&apos;s included</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {OUTCOMES.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3">
                  <CheckIcon />
                  <p className="text-base leading-7 text-slate-600">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preview CTA */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-16 text-center lg:px-8">
            <p className="font-display text-banner tracking-tight text-brand-navy">
              See every module, by topic
            </p>
            <p className="mx-auto mt-4 max-w-md text-slate-600">
              Browse the full catalogue before you subscribe — no account needed.
            </p>

            <Link
              href="/micro-learnings/preview"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-brand-navy px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-navy/90"
            >
              See what&apos;s included
            </Link>
          </div>
        </section>

        {/* Pricing & CTA */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
            <div className="bg-grain rounded-3xl bg-brand-navy px-6 py-20 text-center">
              <p className="font-display text-banner tracking-tight text-white">
                €190 per year, excl. VAT
              </p>
              <p className="mx-auto mt-4 max-w-md text-white/70">
                Get in touch to get your team set up. Online checkout is coming soon.
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-navy hover:bg-white/90"
              >
                Get started
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">
              Frequently asked questions
            </h2>
            <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200">
              {MICRO_FAQ.map((item) => (
                <details key={item.question} className="group px-8 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg text-brand-navy">
                    {item.question}
                    <span className="flex-none text-2xl font-normal text-brand-navy/40 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const isActive = await isStaticPageActive("micro-learnings");
  if (!isActive) return { notFound: true };
  return { props: {}, revalidate: 60 };
}
