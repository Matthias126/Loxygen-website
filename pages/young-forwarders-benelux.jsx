import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildYoungForwardersJsonLd } from "@/lib/structuredData";
import { isStaticPageActive } from "@/lib/staticPages";
import CheckIcon from "@/components/CheckIcon";

const TITLE = "Young Forwarders Benelux: European Ports Immersion Week | Loxygen Academy";
const DESCRIPTION =
  "A 6-day European Ports Immersion Week for freight forwarders aged 22–35, in Antwerp, Rotterdam and the logistics hubs behind them. Next edition: May 2027.";

const STATS = [
  { value: "May 2027", label: "next edition" },
  { value: "6 days", label: "on the ground" },
  { value: "22–35", label: "age range" },
];

const STOPS = [
  {
    title: "Port of Antwerp-Bruges",
    description: "A Port House visit for insights on European ports' future and the freight forwarder's role in it.",
    image: "/images/yfb_port.webp",
  },
  {
    title: "NIKE Logistics Center",
    description: "A large-scale distribution centre in Laakdal shipping apparel across EMEA.",
    image: "/images/yfb_nike.webp",
  },
  {
    title: "Breakbulk Terminal",
    description: "Vessel operations and oversized goods, seen firsthand at the Port of Antwerp-Bruges.",
    image: "/images/yfb_breakbulk.webp",
  },
  {
    title: "Car Logistics",
    description: "The largest covered parking facility in the Benelux.",
    image: "/images/yfb_car_logistics.webp",
  },
  {
    title: "Port of Rotterdam",
    description: "An energy hub with automated container terminals and rail connections.",
    image: "/images/yfb_port_rotterdam.webp",
  },
  {
    title: "Warehousing & Inland Terminals",
    description: "Storage facilities and sustainable transport via rail and barge.",
    image: "/images/yfb_warehousing.webp",
  },
  {
    title: "Airfreight",
    description: "Cargo handling facilities and air shipping expertise.",
    image: "/images/yfb_airfreight.webp",
  },
];

const BENEFITS = [
  "Meet industry agents, port authorities and exporters",
  "Build strategic connections across the network",
  "Learn sales skills for international corporations",
  "Network with the next generation of freight forwarders",
];

export default function YoungForwardersBenelux() {
  const jsonLd = buildYoungForwardersJsonLd();

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/young-forwarders-benelux`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/young-forwarders-benelux`} />
        <meta property="og:image" content={`${SITE_URL}/images/benelux-port-visit.jpg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/images/benelux-port-visit.jpg`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main>
        {/* Intro */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-display text-heading tracking-tight text-brand-navy">
                From curious to{" "}
                <span className="italic text-brand-accent">unstoppable.</span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                A European Ports Immersion Week for the next generation of freight forwarders:
                real ports, real operators, real connections.
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
                src="/images/benelux-port-visit.jpg"
                alt="Freight forwarders touring a container terminal during the Young Forwarders Benelux immersion week"
                fill
                sizes="(min-width: 1024px) 1152px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Pull quote */}
        <section className="bg-grain bg-brand-navy">
          <div className="mx-auto max-w-4xl px-6 py-28 text-center lg:px-8">
            <p className="font-display text-heading leading-tight text-white">
              &ldquo;You do not just visit the most innovative ports. You become part of an
              ecosystem that keeps global trade moving.&rdquo;
            </p>
          </div>
        </section>

        {/* Stops */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">
              Where you&apos;ll go
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {STOPS.map((stop) => (
                <div
                  key={stop.title}
                  className="overflow-hidden rounded-xl bg-white shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="relative aspect-video w-full">
                    <Image
                      src={stop.image}
                      alt={stop.title}
                      fill
                      sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="font-display text-xl text-brand-navy">
                      {stop.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-slate-600">{stop.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">
              What you&apos;ll walk away with
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckIcon />
                  <p className="text-base leading-7 text-slate-600">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility & CTA */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
            <div className="bg-grain rounded-3xl bg-brand-navy px-6 py-20 text-center">
              <p className="font-display text-banner tracking-tight text-white">
                Open exclusively to members of the SeaBlue Project Logistics Network,
                CrossTrades and Flyte.
              </p>
              <p className="mx-auto mt-4 max-w-md text-white/70">
                Freight forwarders aged 22–35 seeking operational mastery, not just theory.
              </p>
              <Link
                href="mailto:geert@loxygen.world?subject=Young%20Forwarders%20Benelux%3A%20Interest"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-navy hover:bg-white/90"
              >
                Get started
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const isActive = await isStaticPageActive("young-forwarders-benelux");
  if (!isActive) return { notFound: true };
  return { props: {}, revalidate: 60 };
}
