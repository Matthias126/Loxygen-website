import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildBessCourseJsonLd, buildBessFaqJsonLd, BESS_FAQ } from "@/lib/structuredData";
import PlaceholderImage from "@/components/PlaceholderImage";
import CheckIcon from "@/components/CheckIcon";
import CountdownTimer from "@/components/CountdownTimer";

const TITLE = "BESS Logistics Training | Loxygen Academy";
const DESCRIPTION =
  "BESS logistics training for freight forwarders — UN 3536 classification, shipping line restrictions, ADR permits and market opportunities across Europe. Live online, 3 September 2026.";

const STATS = [
  { value: "3 Sep", label: "2026 · live online" },
  { value: "3 hrs", label: "9h00–12h00 CET" },
  { value: "€350", label: "excl. VAT · limited seats" },
  { value: "4.8★", label: "rated by past attendees" },
];

const OUTCOMES = [
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
                BESS Logistics Training —{" "}
                <span className="italic text-brand-accent">
                  navigating complexities in energy.
                </span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                UN 3536 classification, shipping line restrictions, ADR permits and market
                opportunities across European markets and beyond.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Live online — 3 September 2026, 9h00–12h00 CET.
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
                src="/images/bess-terminal.jpg"
                alt="A crane loading containers at a European container terminal"
                fill
                sizes="(min-width: 1024px) 1152px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Learning outcomes */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">
              What you&apos;ll walk away with
            </h2>
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
                <h2 className="font-display text-2xl text-brand-navy">
                  Why this matters now
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                  The UK, Germany and Italy are the most attractive BESS markets in Europe, with
                  Germany&apos;s installed capacity expected to grow sixfold by 2030.
                </p>
                <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
                  New IMDG amendments are adding UN numbers for damaged batteries and sodium-ion
                  cells — and getting classification wrong is common.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 lg:grid-cols-1">
                <div>
                  <p className="font-display text-stat leading-none text-brand-navy">
                    23–27 GW
                  </p>
                  <p className="mt-3 text-sm text-slate-500">
                    Germany&apos;s projected installed capacity by 2030
                  </p>
                </div>
                <div>
                  <p className="font-display text-stat leading-none text-brand-navy">
                    16.98%
                  </p>
                  <p className="mt-3 text-sm text-slate-500">
                    Non-compliance rate across 24,558 containers inspected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Speaker & event details */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_2fr]">
              <PlaceholderImage label="Hilde Lenaerts — speaker photo" className="aspect-square w-full" />

              <div>
                <h2 className="font-display text-2xl text-brand-navy">
                  Led by Hilde Lenaerts, LAGOMax
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                  Session co-produced with Portilog. Interactive format with limited seats, built
                  for Operations Managers, Commercial Directors, Import &amp; Export Managers and
                  C-level executives at freight forwarding companies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & CTA */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
            <div className="bg-grain rounded-3xl bg-brand-navy px-6 py-20 text-center">
              <p className="font-display text-banner tracking-tight text-white">
                €350 per person, excl. VAT
              </p>
              <p className="mx-auto mt-4 max-w-md text-white/70">
                Limited seats for Edition 3 — previous editions sold out.
              </p>

              <div className="mt-10">
                <CountdownTimer
                  targetDate="2026-09-03T09:00:00+02:00"
                  expiredLabel="Session is live"
                />
              </div>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-navy hover:bg-white/90"
              >
                Secure your seat
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">
              Frequently asked questions
            </h2>
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
