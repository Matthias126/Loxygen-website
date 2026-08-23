import Head from "next/head";
import Image from "next/image";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildAboutUsJsonLd } from "@/lib/structuredData";
import ScrollFillText from "@/components/ScrollFillText";

const TITLE = "About Loxygen | Logistics Training & Consulting, Belgium";
const DESCRIPTION =
  "Loxygen BV is a Belgian logistics education and consulting company founded in 2024. Meet the founders behind the Academy and the Virtual Logistics Manager.";

const FOUNDERS = [
  {
    name: "Geert De Wilde",
    role: "Co-founder",
    photo: "/images/GDW.jpeg",
    photoClassName: "scale-110 origin-top",
    bio: "35+ years in the maritime industry, with C-level positions in freight forwarding and digital supply chain platforms.",
    linkedIn: "https://www.linkedin.com/in/geertdewilde/",
  },
  {
    name: "Rik Spruyt",
    role: "Co-founder",
    photo: "/images/Rik.png",
    bio: "35+ years in the maritime industry; founder of the CrossTrades and SeaBlue Project Logistics Network partner networks.",
    linkedIn: "https://www.linkedin.com/in/rikspruyt/",
  },
];

const NETWORKS = [
  {
    name: "CrossTrades",
    logo: "/images/crosstrades-logo-white.png",
    width: 1107,
    height: 483,
    boxBg: "bg-[#2764DD]",
  },
  {
    name: "SeaBlue Project Logistics Network",
    logo: "/images/seablue-logo-white.png",
    width: 1000,
    height: 510,
    boxBg: "bg-[#394F78]",
  },
  {
    name: "Flyte",
    logo: "/images/flyte-weblogo.svg",
    width: 264,
    height: 135,
    boxBg: "bg-[#FFBA00]",
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
        <meta property="og:image" content={`${SITE_URL}/images/loxygen-about.jpeg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/images/loxygen-about.jpeg`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main>
        {/* Hero */}
        <section className="-mt-16 bg-white pt-1.5">
          <div className="px-4 lg:px-6">
            <div className="bg-grain relative flex min-h-[70vh] items-center justify-center overflow-hidden rounded-3xl bg-brand-navy px-6 text-center lg:min-h-[98vh]">
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
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <h2 className="font-display text-heading tracking-tight text-brand-navy">
              Who is who
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2">
              {FOUNDERS.map((founder) => (
                <div key={founder.name}>
                  <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-xl bg-brand-light">
                    <Image
                      src={founder.photo}
                      alt={founder.name}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className={`object-cover ${founder.photoClassName ?? ""}`}
                    />
                  </div>
                  <h3 className="font-display mt-5 text-xl text-brand-navy">
                    {founder.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {founder.role}
                  </p>
                  <p className="mt-4 text-base leading-7 text-slate-600">{founder.bio}</p>
                  {founder.linkedIn ? (
                    <a
                      href={founder.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${founder.name} on LinkedIn`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:underline"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
                      </svg>
                      LinkedIn
                    </a>
                  ) : null}
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
                Backed by three partner networks built for the same mission.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                {NETWORKS.map((network) => (
                  <div
                    key={network.name}
                    className={`flex h-16 items-center rounded-lg px-6 ${network.boxBg || "bg-white"}`}
                  >
                    <Image
                      src={network.logo}
                      alt={network.name}
                      width={network.width}
                      height={network.height}
                      className="h-9 w-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
