import Head from "next/head";
import Image from "next/image";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildAboutUsJsonLd } from "@/lib/structuredData";
import PlaceholderImage from "@/components/PlaceholderImage";
import ScrollFillText from "@/components/ScrollFillText";

const TITLE = "About Loxygen | Logistics Training & Consulting, Belgium";
const DESCRIPTION =
  "Loxygen BV is a Belgian logistics education and consulting company founded in 2024. Meet the founders behind the Academy and the Virtual Logistics Manager.";

const FOUNDERS = [
  {
    name: "Geert De Wilde",
    role: "Co-founder",
    bio: "35+ years in the maritime industry, with C-level positions in freight forwarding and digital supply chain platforms.",
  },
  {
    name: "Rik Spruyt",
    role: "Co-founder",
    bio: "35+ years in the maritime industry; founder of the CrossTrades and SeaBlue Project Logistics Network partner networks.",
  },
  {
    name: "Guido Van Nuffelen",
    role: "Owner, Orchestri",
    bio: "Strategic ESG and business management consultant.",
  },
];

const NETWORKS = [
  { name: "CrossTrades", logo: "/images/partner-crosstrades.png", width: 400, height: 173 },
  {
    name: "SeaBlue Project Logistics Network",
    logo: "/images/partner-seablue.png",
    width: 400,
    height: 283,
  },
];

export default function AboutUs() {
  const jsonLd = buildAboutUsJsonLd();

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/about-us`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/about-us`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main>
        {/* Hero */}
        <section className="-mt-16 bg-white pt-1.5">
          <div className="px-4 lg:px-6">
            <div className="bg-grain relative flex min-h-[98vh] items-center justify-center overflow-hidden rounded-3xl bg-brand-navy px-6 text-center">
              <Image
                src="/images/loxygen-about.jpeg"
                alt="The Loxygen team"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative mx-auto">
                <h1 className="font-display text-[clamp(4.5rem,14vw+1rem,15rem)] uppercase leading-none tracking-tight text-white">
                  About Loxygen
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="max-w-4xl">
              <ScrollFillText
                className="font-display text-banner leading-snug text-brand-navy"
                text="Loxygen BV is a Belgian logistics education and consulting company, founded in 2024. Loxygen Academy is more than a training platform: it's an investment in the people and potential of logistics networks."
              />
              <ScrollFillText
                className="mt-6 font-display text-banner leading-snug text-brand-navy"
                text="Built on education, sustainability expertise and collaboration, our aim is stronger, more capable supply chain ecosystems, with the Virtual Logistics Manager helping solve the challenges of future value chains."
              />
            </div>
          </div>
        </section>

        {/* Who is who */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">Who is who</h2>
            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {FOUNDERS.map((founder) => (
                <div key={founder.name}>
                  <PlaceholderImage
                    label={`${founder.name} photo`}
                    className="aspect-square w-full"
                  />
                  <h3 className="font-display mt-5 text-xl text-brand-navy">
                    {founder.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {founder.role}
                  </p>
                  <p className="mt-4 text-base leading-7 text-slate-600">{founder.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Networks */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
            <div className="bg-grain rounded-3xl bg-brand-navy px-6 py-16 text-center">
              <p className="font-display text-2xl text-white">
                Backed by two partner networks built for the same mission.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                {NETWORKS.map((network) => (
                  <Image
                    key={network.name}
                    src={network.logo}
                    alt={network.name}
                    width={network.width}
                    height={network.height}
                    className="h-16 w-auto"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
