import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildSustainabilityAwardJsonLd } from "@/lib/structuredData";
import { isStaticPageActive } from "@/lib/staticPages";

const TITLE = "Loxygen Sustainability Award 2026 — Winners | Loxygen Academy";
const DESCRIPTION =
  "The 2026 Loxygen Sustainability Award winners for CrossTrades and SeaBlue Project Logistics Network — Environmental, Governance and Next Generation categories, plus a special mention for Legendre.";

const STATS = [
  { value: "Winners", label: "announced September 2026" },
  { value: "2", label: "network ceremonies" },
  { value: "6", label: "category winners" },
  { value: "1", label: "special mention" },
];

const CATEGORY_LABEL = {
  E: "Environmental · Green Operations & Carbon Reduction",
  G: "Governance · Sustainable Partnerships & Supply Chain",
  "★": "Next Generation · ESG Leader under 35",
};

const WINNERS = [
  {
    network: "CrossTrades",
    edition: "2nd edition",
    cards: [
      {
        letter: "E",
        winner: "Panafric Global Logistics, Ethiopia — “Go Green”",
        description:
          "A company-wide Go Green Day in which every employee takes part in tree planting and environmental awareness. Sustainability embedded in company culture, not a one-off campaign. The jury: starting matters as much as scaling.",
        note: "Nominees: Sonic Interfreight (Thailand), Uniserve (United Kingdom), Legendre (France).",
        image: "/images/award-2026-crosstrades-E-panafric.jpg",
        imageAlt:
          "Panafric Global Logistics receives the 2026 Environmental award at the CrossTrades AGM, Ho Chi Minh City",
      },
      {
        letter: "G",
        winner: "Uniserve, United Kingdom",
        description:
          "A complete sustainability ecosystem rather than a single project: ISO certifications across quality, environment and safety; clean fuels in transport; renewable energy in warehousing; carbon reporting for clients' Scope 3 data; smarter routing and modal optimisation.",
        note: "Nominee: Sonic Interfreight (Thailand).",
        image: "/images/award-2026-crosstrades-G-uniserve.jpg",
        imageAlt:
          "Uniserve receives the 2026 Governance award at the CrossTrades AGM, Ho Chi Minh City",
      },
      {
        letter: "★",
        winner: "ZUFALL logistics group, Germany",
        description:
          "The 2025 winner in Istanbul came back in 2026 and won in a new category. The focus shifted to the next generation: young professionals driving ESG from within the organisation — proof that sustainability deepens every year.",
        note: "Runner-up: Slade Shipping (Singapore).",
        image: "/images/award-2026-crosstrades-NextGen-zufall.jpg",
        imageAlt:
          "ZUFALL logistics group receives the 2026 Next Generation award at the CrossTrades AGM, Ho Chi Minh City",
      },
    ],
  },
  {
    network: "SeaBlue Project Logistics Network",
    edition: "1st edition",
    cards: [
      {
        letter: "E",
        winner: "EccoFreight, Spain — CarbonTech®, driving global freight decarbonisation",
        description:
          "Founded on sustainability in 2014: SBTi member, 196,000 tonnes of CO₂ reduced, UN Global Compact. The Eccologistics360 calculator gives CO₂ per shipment; EccoNetwork spans 30+ countries; EccoForest has planted 4,000+ trees.",
        note: "Nominees: ITO Global Logistics (Germany), KENSA Logistics (Mexico).",
        image: "/images/award-2026-seablue-E-eccofreight.jpg",
        imageAlt: "The 2026 Environmental award trophy for EccoFreight, SeaBlue AGM, Ho Chi Minh City",
      },
      {
        letter: "G",
        winner: "KENSA Logistics, Mexico — “Forwarding the Future”",
        description:
          "Sustainability as a commercial differentiator: a free carbon footprint calculation for every cargo movement, route comparison by emissions so clients can choose the greener option, and investment in the team through the Benelux Port Immersion Week.",
        note: "Nominee: BOLK Transport (Austria).",
        image: "/images/award-2026-seablue-G-kensa.jpg",
        imageAlt:
          "KENSA Logistics receives the 2026 Governance award at the SeaBlue AGM, Ho Chi Minh City",
      },
      {
        letter: "★",
        winner: "BOLK Transport, Austria — Young Forwarders and Break Bulk River Cargo",
        description:
          "A suggestion by Gerhard Wagner in Madrid led directly to the Benelux Port Immersion Week for young forwarders. BOLK also submitted BBRC: modal shift of break bulk cargo from road to inland waterway, with a Lean & Green star.",
        note: null,
        image: "/images/award-2026-seablue-NextGen-bolk.jpg",
        imageAlt:
          "BOLK Transport on stage for the 2026 Next Generation award at the SeaBlue AGM, Ho Chi Minh City",
      },
    ],
  },
];

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
    note: "Social submissions were received in 2026, but none reached the level the jury required — no Social award was presented. The category stays open for 2027.",
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

const JURY_WANTS = [
  "Concrete projects with measurable emission savings.",
  "Numbers: tonnes of CO₂ reduced, modal shift %, energy saved.",
  "Progress counts — you don't need to be perfect, you need to have started.",
  "Your turn: the carriers have invested. The tools exist. Choose the right ship.",
];

const JURY = [
  {
    name: "Dr. Christof Defryn",
    affiliation: "University of Antwerp",
    description:
      "Research on sustainable logistics, green supply chain optimisation and operations research; published on greenwashing detection and digital tools as emissions levers.",
  },
  {
    name: "Guido Van Nuffelen",
    affiliation: "Orchestri",
    description: "Sustainability strategy advisor, BESS and energy transition specialist.",
  },
];

const NEXT_EDITIONS = [
  {
    network: "SeaBlue Project Logistics Network",
    edition: "2nd edition",
    detail:
      "Ceremony at the SeaBlue Project Logistics Network AGM, 14–17 September 2027, Bangkok, Thailand.",
  },
  {
    network: "CrossTrades",
    edition: "3rd edition",
    detail: "Ceremony at the CrossTrades AGM, 20–23 September 2027, Bangkok, Thailand.",
  },
];

export default function SustainableForwarding() {
  const jsonLd = buildSustainabilityAwardJsonLd();

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/sustainable-forwarding`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/sustainable-forwarding`} />
        <meta property="og:image" content={`${SITE_URL}/images/sustainability-award.jpg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
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
              <p className="mt-5 text-lg font-semibold leading-8 text-brand-navy">
                2nd edition for CrossTrades · 1st edition for SeaBlue Project Logistics Network ·
                ceremonies at both network AGMs in Ho Chi Minh City, September 2026.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Most freight forwarders are making sustainability decisions every day: choosing
                carriers, proposing transport modes, investing in their people.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                They just don&apos;t frame them that way.
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

            <a
              href="#winners"
              className="mt-10 inline-flex items-center justify-center rounded-lg bg-brand-navy px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-navy/90"
            >
              See the 2026 winners ↓
            </a>

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

        {/* The 2026 winners */}
        <section id="winners" className="scroll-mt-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">The 2026 winners</h2>

            {/* One shared grid for both networks, filled column by column: the
                header plus 3 cards × 5 rows each (photo, category, winner,
                text, note). Each card is a subgrid over its 5 rows, so the
                E/G/★ cards line up side by side down to the individual rows.
                Below lg it's a single column in DOM order — CrossTrades first. */}
            <div className="mt-10 grid grid-cols-1 lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-[repeat(16,auto)] lg:gap-x-12">
              {WINNERS.map((column) => [
                <h3
                  key={column.network}
                  className="font-display mb-8 border-b border-slate-200 pb-4 text-xl text-brand-navy max-lg:[&:not(:first-child)]:mt-8"
                >
                  {column.network}{" "}
                  <span className="text-base text-slate-500">· {column.edition}</span>
                </h3>,
                ...column.cards.map((card) => (
                  <article
                    key={card.winner}
                    className="mb-8 flex flex-col overflow-hidden rounded-xl bg-white shadow-card lg:row-span-5 lg:grid lg:grid-rows-subgrid"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={card.image}
                        alt={card.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 560px, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-baseline gap-4 px-8 pt-8">
                      <p className="font-display text-4xl text-brand-navy">{card.letter}</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {CATEGORY_LABEL[card.letter]}
                      </p>
                    </div>
                    <h4 className="font-display px-8 pt-4 text-xl text-brand-navy">
                      {card.winner}
                    </h4>
                    <p className="px-8 pt-3 text-base leading-7 text-slate-600">
                      {card.description}
                    </p>
                    <p className="px-8 pt-4 pb-8 text-sm italic text-slate-500">{card.note}</p>
                  </article>
                )),
              ])}
            </div>
          </div>
        </section>

        {/* Special mention: Legendre */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <article className="grid grid-cols-1 overflow-hidden rounded-xl bg-white shadow-card lg:grid-cols-2">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/award-2026-special-mention-legendre.jpg"
                  alt="Legendre presents the Ariane 6 hybrid ro-ro project at the CrossTrades AGM, Ho Chi Minh City"
                  fill
                  sizes="(min-width: 1024px) 576px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Special mention · presented at both ceremonies
                </span>
                <h2 className="font-display mt-4 text-2xl text-brand-navy">Legendre, France</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  <span className="font-semibold text-brand-navy">
                    European Space Center: Ariane 6 on a hybrid ro-ro vessel.
                  </span>{" "}
                  Space infrastructure transported on a hybrid vessel with wind-assisted propulsion
                  (rotor sails), with 24.7% emission savings. Backed by UN Global Compact, Lucie
                  26000, HVO100, an electric fleet, biodiversity work and WEEE recycling.
                </p>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  The most concrete project submission of the 2026 edition — the jury&apos;s
                  benchmark for the editions to come.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Where it started: 2025 winner */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">
              Where it started: the 2025 winner, Istanbul
            </h2>
            <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[20rem_1fr]">
              <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-xl">
                <Image
                  src="/images/sustainability_award_winners.jpg"
                  alt="Friedrich Zufall, cargo bike logistics"
                  fill
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-display text-2xl text-brand-navy">
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

                <p className="mt-8 max-w-xl text-base italic leading-7 text-slate-600">
                  In 2026 ZUFALL came back — and won the Next Generation category.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">Four ways to be recognised</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {CATEGORIES.map((category) => (
                <div
                  key={category.letter}
                  className="rounded-xl bg-white p-8 shadow-card transition-[box-shadow,border-color] hover:shadow-card-hover hover:border-l-4 hover:border-l-brand-navy"
                >
                  <p className="font-display text-4xl text-brand-navy">{category.letter}</p>
                  <h3 className="font-display mt-4 text-lg text-brand-navy">{category.title}</h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {category.subtitle}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{category.description}</p>
                  {category.note ? (
                    <p className="mt-4 text-sm italic leading-6 text-slate-500">{category.note}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What the jury wants to see in 2027 */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">
              What the jury wants to see in 2027
            </h2>
            <ol className="mt-8 space-y-4">
              {JURY_WANTS.map((point, index) => (
                <li key={point} className="flex items-start gap-4">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-brand-navy/30 text-sm font-semibold text-brand-navy">
                    {index + 1}
                  </span>
                  <p className="mt-0.5 text-base leading-7 text-slate-600">{point}</p>
                </li>
              ))}
            </ol>
            <blockquote className="font-display mt-12 text-banner italic tracking-tight text-brand-navy">
              “Amazon builds ecosystems of technology. We build ecosystems of people.”
            </blockquote>
          </div>
        </section>

        {/* Jury */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">The jury</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {JURY.map((member) => (
                <div key={member.name} className="rounded-xl bg-white p-6 shadow-card">
                  <p className="font-display text-base text-brand-navy">{member.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{member.affiliation}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{member.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-base italic leading-7 text-slate-600">
              From 2027 the jury will be further internationalised in collaboration with the
              International Association of Ports and Harbors (IAPH).
            </p>
          </div>
        </section>

        {/* Next edition */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
            <div className="bg-grain rounded-3xl bg-brand-navy px-6 py-16 sm:px-12 lg:py-20">
              <h2 className="font-display text-center text-banner tracking-tight text-white">
                Next edition: start now for your 2027 award.
              </h2>
              <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
                {NEXT_EDITIONS.map((block) => (
                  <div key={block.network} className="rounded-xl border border-white/15 p-8">
                    <h3 className="font-display text-xl text-white">{block.network}</h3>
                    <p className="mt-1 text-sm text-white/50">{block.edition}</p>
                    <p className="mt-4 text-base leading-7 text-white/70">{block.detail}</p>
                    <Link
                      href="/contact"
                      className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-brand-navy hover:bg-white/90"
                    >
                      Talk to us
                    </Link>
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

export async function getStaticProps() {
  const isActive = await isStaticPageActive("sustainable-forwarding");
  if (!isActive) return { notFound: true };
  return { props: {}, revalidate: 60 };
}
