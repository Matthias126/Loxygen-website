import Head from "next/head";
import Image from "next/image";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildAboutUsJsonLd } from "@/lib/structuredData";
import PlaceholderImage from "@/components/PlaceholderImage";

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
        <section className="bg-white pt-4 lg:pt-6">
          <div className="px-4 lg:px-6">
            <div className="bg-grain relative flex min-h-[85vh] items-center justify-center overflow-hidden rounded-3xl bg-brand-navy px-6 text-center">
              <div className="mx-auto">
                <h1 className="font-display text-hero uppercase tracking-tight text-white">
                  About Loxygen
                </h1>
              </div>
              <span className="absolute bottom-6 right-6 text-xs font-semibold uppercase tracking-wide text-white/30">
                Team / office photo pending
              </span>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-lg leading-8 text-slate-600">
                Loxygen BV is a Belgian logistics education and consulting company, founded in
                2024. Loxygen Academy is more than a training platform — it&apos;s an investment
                in the people and potential of logistics networks.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Built on education, sustainability expertise and collaboration, our aim is
                stronger, more capable supply chain ecosystems — with the Virtual Logistics
                Manager helping solve the challenges of future value chains.
              </p>
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
                    label={`${founder.name} — photo`}
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
