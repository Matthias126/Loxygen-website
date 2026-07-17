import Head from "next/head";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildAcademyJsonLd, buildUpcomingCoursesJsonLd } from "@/lib/structuredData";
import ProgrammeCard from "@/components/ProgrammeCard";
import PlaceholderImage from "@/components/PlaceholderImage";
import TestimonialSection from "@/components/TestimonialSection";

const TITLE = "Freight Forwarding & Logistics Courses | Loxygen Academy";
const DESCRIPTION =
  "Explore Loxygen Academy courses — breakbulk, BESS logistics, international trade, sustainable forwarding, e-learning, micro-learnings and immersive learning trips.";

const LEARNING_TRACKS = [
  { label: "BESS Logistics Training", href: "/bess-logistics-training" },
  { label: "Breakbulk Training", href: "/breakbulk-training" },
  { label: "e-Learning (on-demand modules)", href: "/e-learning" },
  { label: "Micro-Learnings (3–12 minutes each)", href: "/micro-learnings" },
  { label: "Young Forwarders Benelux (immersion week)", href: "/young-forwarders-benelux" },
  { label: "Africa Roadtrip 2026 (learning trip)", href: "/africa-roadtrip-2026" },
  { label: "Sustainable Forwarding", href: "/sustainable-forwarding" },
  { label: "Members' portal (login-gated)", href: "/account" },
];

const UPCOMING_COURSES = [
  {
    title: "Breakbulk Essentials",
    meta: "Online · English · 11–13 August 2026",
    description:
      "Hands-on breakbulk planning webinars covering vessel stowage, lashing and securing, and the documentation project cargo shipments require. Built for operations teams handling out-of-gauge and heavy-lift cargo.",
    details: "Format: Live webinar · Duration: 3 sessions, 90 min each · Level: Intermediate",
    href: "/breakbulk-training",
  },
  {
    title: "BESS Basics",
    meta: "Online webinar · English · 3 September 2026",
    description:
      "An introduction to battery energy storage transport — UN classification, packaging requirements and the safety documentation carriers expect. Written for teams new to BESS moves.",
    details: "Format: Online webinar · Duration: Half-day · Level: Beginner",
    href: "/bess-logistics-training",
  },
  {
    title: "International Trade & Transport",
    meta: "e-learning · English · On demand",
    description:
      "Core international trade rules, Incoterms, customs documentation and multimodal transport planning. Self-paced modules you can start any time.",
    details: "Format: e-learning · Duration: 6 modules, self-paced · Level: All levels",
    href: "/e-learning",
  },
  {
    title: "Benelux Immersion Week",
    meta: "2027 edition · Registration open",
    description:
      "A guided week visiting Rotterdam and Antwerp terminals, meeting operators and seeing port operations firsthand — built for the next generation of Benelux freight forwarders.",
    details: "Format: Immersive programme · Duration: 5 days · Level: Early-career",
    href: "/young-forwarders-benelux",
  },
];

const PARTNER_NETWORKS = ["CrossTrades", "SeaBlue Project Logistics Network"];

const ONGOING = [
  {
    href: "/e-learning",
    format: "E-learning · Sign in required",
    title: "E-learning",
    description:
      "On-demand courses covering trade compliance, documentation and freight operations.",
  },
  {
    href: "/micro-learnings",
    format: "Subscription · €190/year",
    title: "Micro-learnings",
    description:
      "Bite-sized lessons delivered year-round through JollyDeck, for teams that learn in the flow of work.",
  },
];

const SPECIALIST = [
  {
    href: "/breakbulk-training",
    format: "Webinar series",
    title: "Breakbulk Training",
    description: "Webinars on planning and executing breakbulk and project cargo movements.",
  },
  {
    href: "/bess-logistics-training",
    format: "Specialist course",
    title: "BESS Logistics Training",
    description:
      "Transport, safety and compliance training for battery energy storage system logistics.",
  },
];

const IMMERSIVE = [
  {
    href: "/young-forwarders-benelux",
    format: "Immersive programme",
    title: "Young Forwarders Benelux",
    description:
      "A European Ports Immersion Week for the next generation of Benelux freight forwarders.",
    tilt: "lg:-rotate-1",
    imageLabel: "Rotterdam / Antwerp port visit",
  },
  {
    href: "/africa-roadtrip-2026",
    format: "Immersive programme · 2026",
    title: "Africa Roadtrip 2026",
    description: "An immersive road trip through Africa's key logistics corridors.",
    tilt: "lg:rotate-1",
    imageLabel: "Africa corridor road trip",
  },
];

export default function TheAcademy() {
  const jsonLd = [buildAcademyJsonLd(), buildUpcomingCoursesJsonLd()];

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/the-academy`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/the-academy`} />

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
              <h1 className="font-display text-heading font-bold tracking-tight text-brand-navy">
                The Academy —{" "}
                <span className="text-brand-accent">
                  logistics and freight forwarding courses.
                </span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Loxygen Academy delivers practical logistics training for freight forwarders and
                supply chain professionals through live webinars, micro-learnings, e-learning
                modules, in-company programmes and immersive learning trips.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Learn breakbulk and project logistics, BESS logistics, international trade and
                transport, and sustainable forwarding — practical skills you can apply on the job.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-2 gap-y-1 text-sm text-slate-500">
              {LEARNING_TRACKS.map((track, index) => (
                <span key={track.href} className="flex items-center gap-2">
                  <Link href={track.href} className="font-medium text-brand-navy hover:underline">
                    {track.label}
                  </Link>
                  {index < LEARNING_TRACKS.length - 1 ? (
                    <span aria-hidden="true">·</span>
                  ) : null}
                </span>
              ))}
            </div>

            <PlaceholderImage
              label="Port / logistics photo"
              className="mt-12 aspect-[21/9] w-full"
            />
          </div>
        </section>

        {/* Ongoing learning */}
        <section id="tracks" className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl font-semibold text-brand-navy">
              Learn at your own pace
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {ONGOING.map((programme) => (
                <ProgrammeCard key={programme.href} {...programme} />
              ))}
            </div>
          </div>
        </section>

        {/* Specialist courses & webinars */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl font-semibold text-brand-navy">
              Specialist courses &amp; webinars
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {SPECIALIST.map((programme) => (
                <ProgrammeCard key={programme.href} {...programme} />
              ))}
            </div>
          </div>
        </section>

        {/* Immersive programmes — flagship, given more visual weight */}
        <section className="bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl font-semibold text-brand-navy">
              Immersive programmes
            </h2>
            <p className="mt-3 max-w-xl text-slate-600">
              Our most hands-on format — small groups, real ports, real operators.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
              {IMMERSIVE.map((programme) => (
                <Link
                  key={programme.href}
                  href={programme.href}
                  className={`group block rounded-xl border border-slate-200 bg-white p-10 shadow-sm transition-all hover:-translate-y-1 hover:rotate-0 hover:shadow-md hover:border-l-4 hover:border-l-brand-navy ${programme.tilt}`}
                >
                  <PlaceholderImage label={programme.imageLabel} className="aspect-video w-full" />
                  <span className="mt-6 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {programme.format}
                  </span>
                  <h3 className="font-display mt-4 text-2xl font-semibold text-brand-navy group-hover:underline">
                    {programme.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {programme.description}
                  </p>
                  <span className="mt-8 inline-block text-sm font-semibold text-brand-navy">
                    Explore →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Sustainability — standalone feature, not squeezed into a grid */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <Link
              href="/sustainable-forwarding"
              className="group grid grid-cols-1 items-center gap-8 rounded-xl border border-slate-200 p-10 shadow-sm transition-shadow hover:shadow-md lg:grid-cols-[2fr_1fr] lg:p-14"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Award &amp; ESG content
                </span>
                <h3 className="font-display mt-4 text-2xl font-semibold text-brand-navy group-hover:underline">
                  Sustainable Forwarding
                </h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                  ESG strategy, CSRD reporting and the Sustainability Award 2026 — for
                  forwarders building a credible transition plan.
                </p>
                <span className="mt-6 inline-block text-sm font-semibold text-brand-navy">
                  Explore →
                </span>
              </div>
              <PlaceholderImage label="Sustainability Award 2026" className="aspect-square w-full" />
            </Link>
          </div>
        </section>

        {/* Upcoming courses — kept current by whoever owns the catalogue */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl font-semibold text-brand-navy">
              Upcoming courses
            </h2>
            <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200">
              {UPCOMING_COURSES.map((course) => (
                <Link
                  key={course.title}
                  href={course.href}
                  className="group block px-8 py-6 transition-colors hover:bg-brand-light"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-display text-lg font-semibold text-brand-navy group-hover:underline">
                      {course.title}
                    </span>
                    <span className="text-sm text-slate-500">{course.meta}</span>
                  </div>

                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">
                        {course.description}
                      </p>
                      <p className="mt-4 text-sm font-medium text-slate-500">{course.details}</p>
                      <span className="mt-6 mb-2 inline-block text-sm font-semibold text-brand-navy">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <TestimonialSection
          quote="Our organisation has greatly benefited from the exceptional training provided by Loxygen Logistics Academy. The courses were comprehensive, industry-relevant and delivered with a high standard of professionalism."
          name="Glyn Vince"
          role="CEO, Slade Shipping FE PTE Ltd (Singapore)"
        />

        {/* Partner networks + closing CTA */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
            <p className="font-display text-2xl font-semibold text-brand-navy">
              Empowering global partner networks.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {PARTNER_NETWORKS.map((name) => (
                <div
                  key={name}
                  className="rounded-xl border border-slate-200 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-slate-500"
                >
                  {name}
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="#tracks"
                className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-navy/90"
              >
                Browse all courses
              </Link>
              <p className="mt-4 text-sm text-slate-500">
                Not sure where to start?{" "}
                <Link href="/contact" className="font-semibold text-brand-navy hover:underline">
                  Get in touch
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
