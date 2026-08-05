import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildAfricaRoadtripJsonLd } from "@/lib/structuredData";
import { isStaticPageActive } from "@/lib/staticPages";
import TestimonialSection from "@/components/TestimonialSection";
import CountdownTimer from "@/components/CountdownTimer";

const TITLE = "Africa Roadtrip 2026 | Loxygen Academy";
const DESCRIPTION =
  "Africa Roadtrip 2026: a 7-day boots-on-the-ground logistics journey across Ethiopia, Ghana and Namibia. Next edition: February 2027.";

const STATS = [
  { value: "Feb 2027", label: "next roadtrip" },
  { value: "7 days", label: "across 3 corridors" },
  { value: "Max 15", label: "participants" },
  { value: "3", label: "countries: Ethiopia, Ghana, Namibia" },
];

const CORRIDORS = [
  {
    title: "East Africa Corridor",
    subtitle: "Ethiopia: beyond Djibouti",
    description:
      "Inland corridors, Mojo Logistics Park, EDR intermodal terminals and Ethiopian Airlines' cool storage platform.",
  },
  {
    title: "West Africa Corridor",
    subtitle: "Ghana: Tema as a gateway",
    description: "Port operations at Tema and what makes it a gateway for West Africa trade.",
  },
  {
    title: "Namibian Corridor",
    subtitle: "Logistics meets new energy",
    description:
      "The Walvis Bay to Copperbelt corridor and Namibia's energy transition projects.",
  },
];

export default function AfricaRoadtrip2026() {
  const jsonLd = buildAfricaRoadtripJsonLd();

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/africa-roadtrip-2026`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/africa-roadtrip-2026`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />

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
                Africa is not waiting{" "}
                <span className="italic text-brand-accent">to be discovered.</span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                It&apos;s moving fast. You need to know where to look. Africa Roadtrip 2026 is
                boots-on-the-ground learning across three corridors.
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
                src="/images/africa-corridor.jpg"
                alt="A delivery truck at an industrial logistics facility in Ethiopia"
                fill
                sizes="(min-width: 1024px) 1152px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Corridors */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">
              Three corridors, one journey
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {CORRIDORS.map((corridor) => (
                <div
                  key={corridor.title}
                  className="rounded-xl bg-white p-10 shadow-card transition-[box-shadow,border-color] hover:shadow-card-hover hover:border-l-4 hover:border-l-brand-navy"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {corridor.subtitle}
                  </span>
                  <h3 className="font-display mt-4 text-2xl text-brand-navy">
                    {corridor.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {corridor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TestimonialSection
          quote="Great opportunity, great experience, very good organisation."
          name="Comodality"
          role=""
        />

        {/* Pre-register CTA */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="bg-grain rounded-3xl bg-brand-navy px-6 py-20 text-center">
              <p className="font-display text-banner tracking-tight text-white">
                Want to be part of our next Africa journey?
              </p>
              <p className="mx-auto mt-4 max-w-md text-white/70">
                Pre-register for the next Africa Roadtrip, February 2027.
              </p>
              <Link
                href="mailto:geert@loxygen.world?subject=Africa%20Roadtrip%202027%3A%20Pre-register"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-navy hover:bg-white/90"
              >
                Pre-register now
              </Link>
            </div>
          </div>
        </section>

        {/* Sustainability Award cross-link */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
            <div className="bg-grain rounded-3xl bg-brand-navy px-6 py-16 text-center">
              <p className="font-display text-2xl text-white">
                Does this qualify? Take 2 minutes to find out if what you&apos;re already doing
                qualifies for the Loxygen Sustainability Award 2026.
              </p>
              <p className="mt-3 text-sm font-medium text-white/60">
                Deadline: 31 July 2026 · No submission cost
              </p>

              <div className="mt-8">
                <CountdownTimer
                  targetDate="2026-07-31T23:59:59+02:00"
                  expiredLabel="Submissions closed"
                />
              </div>

              <Link
                href="https://loxygen-esg-doiqualify.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-navy hover:bg-white/90"
              >
                Take the checklist
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const isActive = await isStaticPageActive("africa-roadtrip-2026");
  if (!isActive) return { notFound: true };
  return { props: {}, revalidate: 60 };
}
