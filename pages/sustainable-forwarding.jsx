import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildSustainabilityAwardJsonLd } from "@/lib/structuredData";
import { isStaticPageActive } from "@/lib/staticPages";
import { isSustainabilityAwardClosed } from "@/lib/sustainabilityAward";
import PlaceholderImage from "@/components/PlaceholderImage";
import CountdownTimer from "@/components/CountdownTimer";

const TITLE = "Loxygen Sustainability Award 2026 | Loxygen Academy";

const QUALIFY_SURVEY_URL = "https://loxygen-esg-doiqualify.netlify.app";

function getStats(awardClosed) {
  return [
    awardClosed
      ? { value: "Closed", label: "2026 submissions" }
      : { value: "31 Jul", label: "2026 · submission deadline" },
    { value: "Free", label: "no submission cost" },
    { value: "Sep 2026", label: "ceremony · Vietnam AGM" },
    { value: "4", label: "award categories" },
  ];
}

const CATEGORIES = [
  {
    letter: "E",
    title: "Environmental",
    subtitle: "Green operations & carbon reduction",
    description:
      "For asset-based forwarders: fleet electrification, clean fuels, energy-efficient facilities, smarter routing and Scope 1 & 2 measurement.",
  },
  {
    letter: "S",
    title: "Social",
    subtitle: "Community & people impact",
    description:
      "Open to all forwarder profiles: education programmes, worker welfare, fair wages, diversity & inclusion, charitable partnerships.",
  },
  {
    letter: "G",
    title: "Governance",
    subtitle: "Sustainable partnerships & supply chain",
    description:
      "For non-asset forwarders: procurement decisions, greener carriers, modal shift, and requiring emissions data from subcontractors.",
  },
  {
    letter: "★",
    title: "Next Generation ESG Leader",
    subtitle: "Under 35",
    description:
      "For young professionals or teams under 35 who've initiated a sustainability project. Any E, S or G initiative qualifies.",
  },
];

const PROCESS_STEPS = [
  "Submit via form (15 minutes)",
  "Describe your project, why, and its impact",
  "Select your category",
  "Jury reviews in August",
  "Top 3 nominees pitch at the Vietnam AGM, September 2026",
  "Winners announced after the live pitches",
];

const JURY = [
  { name: "Dr. Christof Defryn", affiliation: "University of Antwerp" },
  { name: "Guido Van Nuffelen", affiliation: "Orchestri" },
  { name: "Additional members", affiliation: "To be confirmed" },
];

export default function SustainableForwarding() {
  const jsonLd = buildSustainabilityAwardJsonLd();
  const awardClosed = isSustainabilityAwardClosed();
  const stats = getStats(awardClosed);
  const description = awardClosed
    ? "The Loxygen Sustainability Award 2026 recognises freight forwarders' environmental, social and governance initiatives. 2026 submissions are closed; winners are announced at the Vietnam AGM in September 2026."
    : "The Loxygen Sustainability Award 2026 recognises freight forwarders' environmental, social and governance initiatives. Deadline 31 July 2026, no submission cost.";

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/sustainable-forwarding`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/sustainable-forwarding`} />
        <meta property="og:image" content={`${SITE_URL}/images/sustainability-award.jpg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${SITE_URL}/images/sustainability-award.jpg`} />

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
                Loxygen Sustainability{" "}
                <span className="italic text-brand-accent">Award 2026.</span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Most freight forwarders are making sustainability decisions every day: choosing
                carriers, proposing transport modes, investing in their people.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                They just don&apos;t frame them that way.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((stat) => (
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
                src="/images/sustainability-award.jpg"
                alt="Offshore wind turbines along a coastal energy transition site"
                fill
                sizes="(min-width: 1024px) 1152px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">
              Four ways to be recognised
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {CATEGORIES.map((category) => (
                <div
                  key={category.letter}
                  className="rounded-xl bg-white p-8 shadow-card transition-[box-shadow,border-color] hover:shadow-card-hover hover:border-l-4 hover:border-l-brand-navy"
                >
                  <p className="font-display text-4xl text-brand-navy">
                    {category.letter}
                  </p>
                  <h3 className="font-display mt-4 text-lg text-brand-navy">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {category.subtitle}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2025 Winner spotlight */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr]">
              <PlaceholderImage
                label="Friedrich Zufall, cargo bike logistics"
                className="aspect-square w-full"
              />

              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  2025 Winner
                </span>
                <h3 className="font-display mt-4 text-2xl text-brand-navy">
                  Friedrich Zufall · ZUFALL.lab
                </h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                  Winner of the inaugural Loxygen Sustainability Award, presented at the
                  CrossTrades AGM in Istanbul, for cargo bike city logistics delivering
                  zero-emission last-mile parcels.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-6">
                  <div>
                    <p className="font-display text-2xl text-brand-navy">23,000 km</p>
                    <p className="mt-1 text-xs text-slate-500">cargo bike routes</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl text-brand-navy">10,000+</p>
                    <p className="mt-1 text-xs text-slate-500">zero-emission parcels</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl text-brand-navy">7</p>
                    <p className="mt-1 text-xs text-slate-500">team members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Checklist */}
        {!awardClosed ? (
          <section className="bg-white">
            <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-8">
              <h2 className="font-display text-2xl text-brand-navy">
                Does this qualify?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-slate-600">
                Take 2 minutes to find out if what you&apos;re already doing qualifies.
              </p>

              <Link
                href={QUALIFY_SURVEY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-brand-navy px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-navy/90"
              >
                Take the checklist
              </Link>
            </div>
          </section>
        ) : null}

        {/* Process */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">The process</h2>
            <ol className="mt-8 space-y-4">
              {PROCESS_STEPS.map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-brand-navy/30 text-sm font-semibold text-brand-navy">
                    {index + 1}
                  </span>
                  <p className="mt-0.5 text-base leading-7 text-slate-600">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Jury */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">The jury</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {JURY.map((member) => (
                <div key={member.name} className="rounded-xl bg-white p-6 shadow-card">
                  <p className="font-display text-base text-brand-navy">
                    {member.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{member.affiliation}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Submit CTA */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
            <div className="bg-grain rounded-3xl bg-brand-navy px-6 py-20 text-center">
              {awardClosed ? (
                <>
                  <p className="font-display text-banner tracking-tight text-white">
                    2026 submissions are now closed
                  </p>
                  <p className="mx-auto mt-4 max-w-md text-white/70">
                    Winners will be announced at the Vietnam AGM, September 2026.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-display text-banner tracking-tight text-white">
                    Submissions close 31 July 2026
                  </p>
                  <p className="mx-auto mt-4 max-w-md text-white/70">
                    Open to CrossTrades, SeaBlue Project Logistics Network and Flyte members. No
                    submission cost.
                  </p>

                  <div className="mt-10">
                    <CountdownTimer
                      targetDate="2026-07-31T23:59:59+02:00"
                      expiredLabel="Submissions closed"
                    />
                  </div>

                  <Link
                    href="https://elemental-bridge-2ed.notion.site/6cfeb9f2992448e8885013e3d81bcd6b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-navy hover:bg-white/90"
                  >
                    Submit your entry
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const isActive = await isStaticPageActive("sustainable-forwarding");
  if (!isActive) return { notFound: true };
  return { props: {}, revalidate: 60 };
}
