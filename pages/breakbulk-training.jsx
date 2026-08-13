import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildBreakbulkJsonLd } from "@/lib/structuredData";
import { isStaticPageActive } from "@/lib/staticPages";
import CountdownTimer from "@/components/CountdownTimer";
import SustainabilityAwardCrossLink from "@/components/SustainabilityAwardCrossLink";

const TITLE = "Breakbulk Training | Loxygen Academy";
const DESCRIPTION =
  "Breakbulk Academy: live online training for freight forwarders handling breakbulk and project cargo, from bite-sized modules to advanced commercial negotiation.";

const TIERS = [
  {
    title: "Micro Learnings",
    format: "Online webinars · 3–5 min",
    description:
      "Bite-sized breakbulk knowledge on the JollyDeck platform, built for busy freight forwarders.",
    topics: null,
    note: null,
    cta: "Register interest",
  },
  {
    title: "Essentials",
    format: "One intensive online webinar",
    description:
      "A comprehensive foundation course for freight forwarders handling breakbulk cargo.",
    topics: "Cargo types · Stowage · Documentation · Pricing · Risk management",
    note: null,
    cta: "Register interest",
  },
  {
    title: "PRO",
    format: "Advanced online webinar",
    description:
      "Deep-dive training for experienced freight professionals handling complex cargo.",
    topics: "Complex cargo · Charterparties · Heavy-lift operations · Commercial negotiations",
    note: null,
    cta: "Register interest",
  },
];

export default function BreakbulkTraining() {
  const jsonLd = buildBreakbulkJsonLd();

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/breakbulk-training`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/breakbulk-training`} />
        <meta property="og:image" content={`${SITE_URL}/images/breakbulk-cargo.jpg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/images/breakbulk-cargo.jpg`} />

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
                Breakbulk Academy:{" "}
                <span className="italic text-brand-accent">live online training.</span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                From bite-sized modules to advanced commercial negotiation, three ways to build
                breakbulk and project cargo expertise, live online.
              </p>
            </div>

            <div className="relative mt-12 aspect-[21/9] w-full overflow-hidden rounded-3xl">
              <Image
                src="/images/breakbulk-cargo.jpg"
                alt="A heavy-lift transformer being loaded onto a vessel during a breakbulk operation"
                fill
                sizes="(min-width: 1024px) 1152px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">
              Three ways to train
            </h2>
            <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-3">
              {TIERS.map((tier) => (
                <div
                  key={tier.title}
                  className="flex flex-col rounded-xl bg-white p-12 shadow-card transition-[box-shadow,border-color] hover:shadow-card-hover hover:border-l-4 hover:border-l-brand-navy lg:p-14"
                >
                  <div className="min-h-10">
                    <span className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                      {tier.format}
                    </span>
                  </div>

                  <h3 className="font-display mt-6 min-h-24 text-4xl leading-tight text-brand-navy">
                    {tier.title}
                  </h3>

                  <p className="mt-6 min-h-32 text-xl leading-9 text-slate-600">
                    {tier.description}
                  </p>

                  <div className="mt-6 min-h-14">
                    {tier.topics ? (
                      <p className="text-base font-medium text-slate-500">{tier.topics}</p>
                    ) : null}

                    {tier.note ? (
                      <p className="text-base font-semibold text-brand-navy">{tier.note}</p>
                    ) : null}
                  </div>

                  <Link
                    href="/contact"
                    className="mt-12 inline-flex items-center justify-center rounded-lg bg-brand-navy px-8 py-4 text-base font-semibold text-white hover:bg-brand-navy/90 lg:mt-auto"
                  >
                    {tier.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event announcement */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
            <div className="bg-grain rounded-3xl bg-brand-navy px-6 py-16 text-center">
              <p className="font-display text-banner tracking-tight text-white">
                Meet us at the Port of Antwerp-Bruges Breakbulk Summit
              </p>
              <p className="mt-4 text-white/70">October 12–13, 2026</p>

              <div className="mt-8">
                <CountdownTimer
                  targetDate="2026-10-12T00:00:00+02:00"
                  expiredLabel="Happening now"
                />
              </div>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-navy hover:bg-white/90"
              >
                Arrange a meeting
              </Link>
            </div>
          </div>
        </section>

        <SustainabilityAwardCrossLink />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const isActive = await isStaticPageActive("breakbulk-training");
  if (!isActive) return { notFound: true };
  return { props: {}, revalidate: 60 };
}
