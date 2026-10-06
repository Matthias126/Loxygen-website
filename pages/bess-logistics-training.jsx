import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildBessCourseJsonLd, buildBessFaqJsonLd, BESS_FAQ } from "@/lib/structuredData";
import { isStaticPageActive } from "@/lib/staticPages";
import CheckIcon from "@/components/CheckIcon";
import SustainabilityAwardCrossLink from "@/components/SustainabilityAwardCrossLink";

const TITLE = "BESS Logistics Training | Loxygen Academy";
const DESCRIPTION =
  "BESS logistics training for freight forwarders, run by Loxygen and Portilog since March 2026. Edition 4, live online on 9 December 2026: black mass, the import wave and the EU battery passport.";

const STATS = [
  { value: "3 editions", label: "since March 2026" },
  { value: "4.8★", label: "rated by past attendees" },
  { value: "9 Dec", label: "next: Edition 4" },
];

const TIMELINE = [
  {
    date: "Edition 1 — 26 March 2026",
    detail: "Live online · co-produced with Portilog",
  },
  {
    date: "Edition 2 — 5 May 2026",
    detail: "Live online · co-produced with Portilog",
  },
  {
    date: "Edition 3 — 3 September 2026",
    detail:
      "Live online · co-produced with Portilog, led by Hilde Lenaerts (LagoMax). UN 3536 classification, shipping line restrictions, ADR permits, storage, safety and insurance, and market opportunities in Europe and Africa.",
  },
  {
    date: "Alumni update — 10 September 2026",
    detail: "“One Container. Six Businesses.”",
  },
];

const LIFECYCLE_STAGES = [
  {
    title: "Raw materials",
    detail: "African minerals — cobalt, lithium, manganese, nickel — to refineries in Asia and Europe",
  },
  {
    title: "Finished product",
    detail: "Complete BESS units from China, Vietnam and the United States to project sites worldwide",
  },
  {
    title: "Port & storage",
    detail:
      "Discharge, buffer storage and call-off to the site. Value is lost every idle day the asset stands still",
  },
  {
    title: "Repair & return",
    detail: "Reverse logistics on early-life failures — the majority occur in the first two years",
  },
  {
    title: "End of life",
    detail:
      "Decommissioning, recycling and black mass — a regulated waste stream from 9 November 2026",
  },
  {
    title: "Second life & data centres",
    detail:
      "Repurposed units and on-site storage for AI load — structural demand, not a passing spike",
  },
];

const CLOCKS = [
  {
    date: "9 November 2026",
    title: "Black mass",
    detail:
      "Processed battery waste becomes a regulated cross-border stream. End-of-life turns into a compliance question — and a service line.",
  },
  {
    date: "Q4 2026 / Q1 2027",
    title: "The import wave",
    detail:
      "China's export VAT rebate steps to zero in early 2027 and manufacturers are shipping ahead of it. The wave meets units that have grown from about 35 to 55–60 tonnes, moving as exceptional transport, and a 30-day open-air window in Antwerp.",
  },
  {
    date: "February 2027",
    title: "Battery passport",
    detail:
      "Every industrial battery above 2 kWh needs machine-readable passport data. No compliant data, no clean release — and on Chinese imports the legal responsibility sits with the European importer.",
  },
];

const EDITION_4_DETAILS = [
  {
    lead: "Expanded market coverage.",
    text: "New origins (China, Vietnam, the US, India), the project pipeline across Europe, Egypt and India, and data-centre BESS as structural new demand.",
  },
  {
    lead: "Three regimes, one file.",
    text: "Customs check origin, dangerous goods (UN 3536, IMDG Class 9, UN 38.3) and circularity via the passport. A clean passport does not rescue a defective DG file.",
  },
  {
    lead: "Who covers what.",
    text: "Loxygen: the three deadlines, the commercial consequence, classification and origin, storage and evacuation. Portilog / LagoMax: safety and handling — thermal runaway at 55–60 tonnes and storage regimes (spacing, ventilation, detection, compartmentalisation).",
  },
  {
    lead: "Practical.",
    text: "9 December 2026 · 09:00–12:00 CET · live online · €350 per person excl. VAT · with Portilog. For alumni of Editions 1–3 and new overseas agents.",
  },
];

const OUTCOMES = [
  "What is a battery",
  "Battery logistics supply chain operations",
  "How shipping regulations impact your shipments",
  "Why shipping lines restrict battery cargo",
  "Storage, safety & insurance realities",
  "Business opportunities in the EU & Africa",
];

export default function BessLogisticsTraining() {
  const jsonLd = [buildBessCourseJsonLd(), buildBessFaqJsonLd()];

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/bess-logistics-training`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/bess-logistics-training`} />
        <meta property="og:image" content={`${SITE_URL}/images/BESS.jpg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/images/BESS.jpg`} />

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
                BESS Logistics Training:{" "}
                <span className="italic text-brand-accent">
                  navigating complexities in energy.
                </span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Since March 2026, Loxygen and Portilog have run a live webinar series on the
                transport, safety and compliance of battery energy storage systems — for freight
                forwarders across CrossTrades, SeaBlue Project Logistics Network, Flyte and beyond.
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
                src="/images/BESS.jpg"
                alt="Battery energy storage system containers staged at a logistics yard"
                fill
                sizes="(min-width: 1024px) 1152px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* What we have done */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">What we have done</h2>
            <ol className="mt-10 max-w-3xl border-l border-slate-200 pl-8">
              {TIMELINE.map((item) => (
                <li key={item.date} className="relative pb-10">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-[38px] h-3 w-3 rounded-full bg-brand-navy"
                  />
                  <p className="font-display text-lg text-brand-navy">{item.date}</p>
                  <p className="mt-1 text-base leading-7 text-slate-600">{item.detail}</p>
                </li>
              ))}
              <li className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[38px] h-3 w-3 rounded-full border-2 border-brand-navy bg-white"
                />
                <p className="font-display text-lg text-brand-navy">Edition 4 — 9 December 2026</p>
                <p className="mt-1 text-base leading-7 text-slate-600">
                  Registrations open ·{" "}
                  <a href="#edition-4" className="font-semibold text-brand-navy underline">
                    see Edition 4 →
                  </a>
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* One Container. Six Businesses. */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">
              One Container. Six Businesses.
            </h2>

            <Image
              src="/images/Loxygen_BESS_Six_Moves_web.svg"
              alt="One container, six logistics moves: the BESS lifecycle — raw materials, finished product, port and storage, repair and return, end of life, second life and data centres."
              width={900}
              height={660}
              unoptimized
              className="mx-auto mt-10 hidden h-auto w-full max-w-[900px] min-[700px]:block"
            />

            <ol className="mt-10 space-y-6 min-[700px]:hidden">
              {LIFECYCLE_STAGES.map((stage, index) => (
                <li key={stage.title} className="flex gap-4">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-brand-navy">
                      {stage.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{stage.detail}</p>
                  </div>
                </li>
              ))}
              <li className="flex gap-4">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#FF6E03] text-base font-bold text-white">
                  ↺
                </span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-[#FF6E03]">
                    The loop closes
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Recovered material re-enters the raw-material stream. Quote one move and you
                    have quoted one-sixth of the asset; understand the whole loop and you hold the
                    customer for the life of the asset.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Edition 4 */}
        <section id="edition-4" className="scroll-mt-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="bg-grain rounded-3xl bg-brand-navy px-6 py-16 sm:px-12 lg:py-20">
              <h2 className="font-display max-w-3xl text-banner tracking-tight text-white">
                Edition 4 — 9 December 2026: three clocks on one quay
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
                Edition 4 lands one month before the EU battery passport becomes mandatory. Three
                deadlines converge on the same quay, and the market keeps widening.
              </p>

              <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
                {CLOCKS.map((clock) => (
                  <div key={clock.title} className="rounded-xl border border-white/15 p-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                      {clock.date}
                    </p>
                    <h3 className="font-display mt-3 text-xl text-white">{clock.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/70">{clock.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2">
                {EDITION_4_DETAILS.map((item) => (
                  <p key={item.lead} className="text-base leading-7 text-white/70">
                    <span className="font-semibold text-white">{item.lead}</span> {item.text}
                  </p>
                ))}
              </div>

              <Link
                href="/courses/bess-basics"
                className="mt-12 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-navy hover:bg-white/90"
              >
                Reserve your seat for Edition 4
              </Link>
            </div>
          </div>
        </section>

        {/* What the series covers */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">What the series covers</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {OUTCOMES.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3">
                  <CheckIcon />
                  <p className="text-base leading-7 text-slate-600">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why this matters now */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr]">
              <div>
                <h2 className="font-display text-2xl text-brand-navy">Why this matters now</h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                  The UK, Germany and Italy are the most attractive BESS markets in Europe, with
                  Germany&apos;s installed capacity expected to grow sixfold by 2030.
                </p>
                <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
                  New IMDG amendments are adding UN numbers for damaged batteries and sodium-ion
                  cells, and getting classification wrong is common.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 lg:grid-cols-1">
                <div>
                  <p className="font-display text-stat leading-none text-brand-navy">23–27 GW</p>
                  <p className="mt-3 text-sm text-slate-500">
                    Germany&apos;s projected installed capacity by 2030
                  </p>
                </div>
                <div>
                  <p className="font-display text-stat leading-none text-brand-navy">16.98%</p>
                  <p className="mt-3 text-sm text-slate-500">
                    Non-compliance rate across 24,558 containers inspected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Co-production & audience */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="max-w-3xl rounded-xl border border-slate-200 p-8">
              <p className="text-lg leading-8 text-slate-600">
                Co-produced with Portilog. Speakers across the series include Hilde Lenaerts
                (LagoMax) and Geert De Wilde (Loxygen). Built for Operations Managers, Commercial
                Directors, Import &amp; Export Managers and C-level executives at freight
                forwarding companies.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">Frequently asked questions</h2>
            <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200">
              {BESS_FAQ.map((item) => (
                <details key={item.question} className="group px-8 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg text-brand-navy">
                    {item.question}
                    <span className="flex-none text-2xl font-normal text-brand-navy/40 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <SustainabilityAwardCrossLink />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const isActive = await isStaticPageActive("bess-logistics-training");
  if (!isActive) return { notFound: true };
  return { props: {}, revalidate: 60 };
}
