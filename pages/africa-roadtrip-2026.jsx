import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildAfricaRoadtripJsonLd } from "@/lib/structuredData";
import { isStaticPageActive } from "@/lib/staticPages";
import TestimonialSection from "@/components/TestimonialSection";

const TITLE = "Africa Roadtrip 2026 | Loxygen Academy";
const DESCRIPTION =
  "Africa Roadtrip 2026: a 6-day boots-on-the-ground logistics journey across Egypt, Tunisia and Morocco, 29 November to 4 December 2026. Max 10 places.";

const STATS = [
  { value: "29 Nov", label: "to 4 Dec 2026" },
  { value: "6 days", label: "across 3 corridors" },
  { value: "Max 10", label: "participants" },
  { value: "€3,555", label: "starting price, per person" },
];

const CORRIDORS = [
  {
    title: "Egypt",
    subtitle: "Ain Sokhna and the Suez corridor",
    description:
      "Egypt is no longer somewhere cargo passes through; it is somewhere cargo is going.",
  },
  {
    title: "Tunisia",
    subtitle: "Not a mega-hub — a door",
    description:
      "Reliable access into two of the region's most complex markets: Libya and Algeria.",
  },
  {
    title: "Morocco",
    subtitle: "Tanger Med and the industrial platform serving European OEMs",
    description: "The shortest supply chain into Europe that isn't in Europe.",
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
        <meta property="og:image" content={`${SITE_URL}/images/africa_tour2026.png`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/images/africa_tour2026.png`} />

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
                Production is moving{" "}
                <span className="italic text-brand-accent">to North Africa.</span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                See who&apos;s moving it. Africa Roadtrip 2026 is boots-on-the-ground learning
                across Egypt, Tunisia and Morocco — not a sightseeing tour.
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
                src="/images/africa_tour2026.png"
                alt="A Terex mobile harbour crane and dockworkers at a Marsa Maroc port terminal in Morocco"
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
          quote="The 2026 Africa Road Trip was a great opportunity, great experience, very good organisation."
          name="Josu Azkorra"
          role="Comodality Spain"
        />

        {/* Pre-register CTA */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="bg-grain rounded-3xl bg-brand-navy px-6 py-20 text-center">
              <p className="font-display text-banner tracking-tight text-white">
                Want to be part of our next Africa journey?
              </p>
              <p className="mx-auto mt-4 max-w-md text-white/70">
                29 November – 4 December 2026 · Max 10 places · Starting from €3,555 per person.
              </p>
              <Link
                href="mailto:geert@loxygen.world?subject=Africa%20Roadtrip%202026%3A%20Request%20my%20place"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-navy hover:bg-white/90"
              >
                Request your place
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
