import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildNorthAfricaLearningTripJsonLd } from "@/lib/structuredData";
import { isStaticPageActive } from "@/lib/staticPages";
import TestimonialSection from "@/components/TestimonialSection";

const TITLE = "North Africa Learning Trip 2026 | Loxygen Academy";
const DESCRIPTION =
  "Boots-on-the-ground logistics learning across Egypt, Tunisia and Morocco. Six days inside the operations of three hosts who run these corridors for a living. Ten places.";

const STATS = [
  { value: "3", label: "countries" },
  { value: "3", label: "hosts" },
  { value: "Max 10", label: "participants" },
];

const CORRIDORS = [
  {
    title: "Egypt",
    subtitle: "Cairo — inland intermodal, ro-ro and digital customs",
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

const WHAT_YOU_SEE = [
  {
    title: "Rail-linked inland ports",
    description:
      "How Cairo's container traffic consolidates inland, and what a working dry port does that a terminal doesn't.",
  },
  {
    title: "Ro-ro and Mediterranean rolling cargo",
    description:
      "The services connecting southern Europe to North African gateways, seen from the operator's side rather than the schedule.",
  },
  {
    title: "A national customs single window, as it is actually run",
    description:
      "Not as it is described at a conference. What has been digitised, what hasn't, and what that means for your clearance times.",
  },
  {
    title: "Licensed pharma warehousing",
    description:
      "Temperature-controlled and licensed handling — and what compliance genuinely costs in these markets.",
  },
  {
    title: "Renewables project cargo",
    description:
      "Solar and green hydrogen at scale, with the abnormal transport, DG permitting and heavy-lift planning attached.",
  },
  {
    title: "Free zones and the automotive and battery belt",
    description:
      "The manufacturing platform feeding European OEMs, and the flows moving north into Europe.",
  },
  {
    title: "The corridors themselves",
    description:
      "Trans-Maghreb and Trans-Saharan — the overland spine most forwarders have never seen firsthand, and the reach it gives into Algeria, Libya, Mali, Niger, Burkina Faso and Chad.",
  },
];

const HOSTS = [
  {
    company: "Khedivial Marine Logistics",
    country: "Egypt",
    description: "Hosted by Ahmed El Dahshan, Managing Director. Cairo.",
  },
  {
    company: "ITO",
    country: "Tunisia",
    description:
      "The Mediterranean framing, the nearshoring flows, and what the offshore regime actually permits.",
  },
  {
    company: "Ipsen Logistics",
    country: "Morocco",
    description: "Casablanca and Tangier. Tanger Free Zone and Tanger Med.",
  },
];

// Everything date-specific for the current edition lives in this one place —
// next year, update these lines and the page still works.
const EDITION_2026 = {
  dates: "29 November – 4 December 2026",
  places: "Ten places",
  deadline: "Registration closes 2 October 2026",
};

export default function NorthAfricaLearningTrip2026() {
  const jsonLd = buildNorthAfricaLearningTripJsonLd();

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/north-africa-learning-trip-2026`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/north-africa-learning-trip-2026`} />
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
                Production is moving to North Africa.{" "}
                <span className="italic text-brand-accent">See who&apos;s moving it.</span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                The North Africa Learning Trip is boots-on-the-ground learning across Egypt,
                Tunisia and Morocco. Not a conference. Not a sightseeing tour. Six days inside the
                operations of people who run these corridors for a living.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8">
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

        {/* Why this region, now */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-banner tracking-tight text-brand-navy">Why this region, now</h2>
            <div className="mt-10 max-w-3xl space-y-6">
              <p className="text-lg leading-8 text-slate-600">
                The African Continental Free Trade Area removes the tariffs. It does not move the
                cargo.
              </p>
              <p className="text-lg leading-8 text-slate-600">
                Two-thirds of the $450bn that AfCFTA is projected to unlock by 2035 comes from
                trade facilitation — customs, red tape, border delays. Not from tariffs. That
                prize belongs to whoever can actually move goods across these borders.
              </p>
              <p className="text-lg leading-8 text-slate-600">
                Meanwhile battery and EV production is relocating to the Mediterranean rim,
                reconstruction cargo is staging through Egyptian gateways, and Tanger Med has
                become the largest port on the African continent.
              </p>
              <p className="text-lg leading-8 text-slate-600">
                The forwarder who walks the corridor before the volumes arrive captures the
                relationship. That is the whole game.
              </p>
            </div>
          </div>
        </section>

        {/* Corridors */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-banner tracking-tight text-brand-navy">
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

        {/* What we actually do */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-banner tracking-tight text-brand-navy">
              Six days inside the operations
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Every day is hosted by an operator, on their site, in their words. You see how cargo
              moves here — and where the value is shifting.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {WHAT_YOU_SEE.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl bg-white p-8 shadow-card transition-[box-shadow,border-color] hover:shadow-card-hover hover:border-l-4 hover:border-l-brand-navy"
                >
                  <h3 className="font-display text-xl text-brand-navy">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who hosts you */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-banner tracking-tight text-brand-navy">Who hosts you</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Not a supplier tour. Three operators, on their own ground.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {HOSTS.map((host) => (
                <div key={host.company} className="rounded-xl bg-white p-10 shadow-card">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {host.country}
                  </span>
                  <h3 className="font-display mt-4 text-xl text-brand-navy">{host.company}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{host.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-base leading-7 text-slate-600">
              Each opens doors that are not open to visitors. That is what ten places buys you,
              and why there are only ten.
            </p>
          </div>
        </section>

        {/* Who it's for */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-banner tracking-tight text-brand-navy">Who it&apos;s for</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Experienced forwarders with the mandate to act on what they see — in general cargo,
              airfreight, project cargo, breakbulk and new-energy logistics.
            </p>
            <p className="mt-4 max-w-3xl text-sm text-slate-500">
              This trip is not: a sightseeing tour · a conference with slide decks · a week of
              introductions that go nowhere.
            </p>
          </div>
        </section>

        <TestimonialSection
          quote="The 2026 Africa Road Trip was a great opportunity, great experience, very good organisation."
          name="Josu Azkorra"
          role="Comodality Spain"
        />

        {/* 2026 edition */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="bg-grain rounded-3xl bg-brand-navy px-6 py-20 text-center">
              <span className="text-xs font-semibold uppercase tracking-wide text-white/60">
                2026 edition
              </span>
              <p className="font-display mt-4 text-banner tracking-tight text-white">
                {EDITION_2026.dates}
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-white/70">
                {EDITION_2026.places}. Four-star hotels, all meals, local transport and the full
                host-led programme in all three countries are included. Flights are booked by
                participants; we issue the recommended routing so the group travels together.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-white/70">
                An optional extra day in Cairo — the Grand Egyptian Museum and the Pyramids — is
                available to participants arriving a day early.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-white/50">
                The full itinerary, flight routing, hotels and fees are set out in the programme
                document. {EDITION_2026.deadline}.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="mailto:geert@loxygen.world?subject=North%20Africa%20Learning%20Trip%202026%3A%20send%20me%20the%20programme"
                  className="inline-flex items-center justify-center rounded-lg border border-white px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10"
                >
                  Request the programme
                </Link>
                <Link
                  href="mailto:geert@loxygen.world?subject=North%20Africa%20Learning%20Trip%202026%3A%20reserve%20my%20place"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-navy hover:bg-white/90"
                >
                  Reserve a place
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const isActive = await isStaticPageActive("north-africa-learning-trip-2026");
  if (!isActive) return { notFound: true };
  return { props: {}, revalidate: 60 };
}
