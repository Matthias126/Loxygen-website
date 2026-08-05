import { useMemo, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildAcademyJsonLd, buildUpcomingCoursesJsonLd } from "@/lib/structuredData";
import { getCourses } from "@/lib/courses";
import { COURSE_TYPE_TO_CATEGORY } from "@/lib/courseTypes";
import { getStaticPageVisibility } from "@/lib/staticPages";
import ProgrammeCard from "@/components/ProgrammeCard";
import CourseCard from "@/components/CourseCard";
import TestimonialSection from "@/components/TestimonialSection";

const TITLE = "Freight Forwarding & Logistics Courses | Loxygen Academy";
const DESCRIPTION =
  "Explore Loxygen Academy courses: breakbulk, BESS logistics, international trade, sustainable forwarding, e-learning, micro-learnings and immersive learning trips.";

const FILTERS = [
  { key: "all", label: "All formats" },
  { key: "immersive", label: "Immersive" },
  { key: "scheduled", label: "Scheduled" },
  { key: "self-paced", label: "Self-paced" },
  { key: "sustainability", label: "Sustainability" },
];

const ALL_PROGRAMMES = [
  {
    category: "immersive",
    href: "/young-forwarders-benelux",
    format: "Immersive programme",
    title: "Young Forwarders Benelux",
    description:
      "A European Ports Immersion Week for the next generation of Benelux freight forwarders.",
    imageLabel: "Rotterdam / Antwerp port visit",
  },
  {
    category: "immersive",
    href: "/africa-roadtrip-2026",
    format: "Immersive programme · 2026",
    title: "Africa Roadtrip 2026",
    description: "An immersive road trip through Africa's key logistics corridors.",
    imageLabel: "Africa corridor road trip",
  },
  {
    category: "scheduled",
    href: "/breakbulk-training",
    format: "Webinar series",
    title: "Breakbulk Training",
    description: "Webinars on planning and executing breakbulk and project cargo movements.",
  },
  {
    category: "scheduled",
    href: "/bess-logistics-training",
    format: "Specialist course",
    title: "BESS Logistics Training",
    description:
      "Transport, safety and compliance training for battery energy storage system logistics.",
  },
  {
    category: "self-paced",
    href: "/e-learning",
    format: "E-learning · Sign in required",
    title: "E-learning",
    description:
      "On-demand courses covering trade compliance, documentation and freight operations.",
  },
  {
    category: "self-paced",
    href: "/micro-learnings",
    format: "Subscription · €190/year",
    title: "Micro-learnings",
    description:
      "Bite-sized lessons delivered year-round through JollyDeck, for teams that learn in the flow of work.",
  },
  {
    category: "sustainability",
    href: "/sustainable-forwarding",
    format: "Award & ESG content",
    title: "Sustainable Forwarding",
    description:
      "ESG strategy, CSRD reporting and the Sustainability Award 2026, for forwarders building a credible transition plan.",
  },
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
      "An introduction to battery energy storage transport: UN classification, packaging requirements and the safety documentation carriers expect. Written for teams new to BESS moves.",
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
      "A guided week visiting Rotterdam and Antwerp terminals, meeting operators and seeing port operations firsthand, built for the next generation of Benelux freight forwarders.",
    details: "Format: Immersive programme · Duration: 5 days · Level: Early-career",
    href: "/young-forwarders-benelux",
  },
];

const PARTNER_NETWORKS = [
  { name: "CrossTrades", logo: "/images/partner-crosstrades.png", width: 400, height: 173 },
  {
    name: "SeaBlue Project Logistics Network",
    logo: "/images/partner-seablue.png",
    width: 400,
    height: 283,
  },
];

export default function TheAcademy({ courses, pageVisibility }) {
  const jsonLd = [buildAcademyJsonLd(), buildUpcomingCoursesJsonLd()];
  const [activeFilter, setActiveFilter] = useState("all");

  const catalogueItems = useMemo(() => {
    const staticItems = ALL_PROGRAMMES.filter(
      (programme) => pageVisibility[programme.href.slice(1)] !== false
    ).map((programme) => ({ kind: "static", ...programme }));
    const liveItems = courses
      .filter((course) => COURSE_TYPE_TO_CATEGORY[course.type])
      .map((course) => ({
        kind: "live",
        category: COURSE_TYPE_TO_CATEGORY[course.type],
        course,
      }));
    return [...staticItems, ...liveItems];
  }, [courses, pageVisibility]);

  const visibleUpcomingCourses = useMemo(
    () => UPCOMING_COURSES.filter((course) => pageVisibility[course.href.slice(1)] !== false),
    [pageVisibility]
  );

  const filteredProgrammes = useMemo(() => {
    if (activeFilter === "all") return catalogueItems;
    return catalogueItems.filter((item) => item.category === activeFilter);
  }, [catalogueItems, activeFilter]);

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
        {/* Full-screen hero */}
        <section className="bg-grain relative -mt-16 flex min-h-screen items-center justify-center overflow-hidden bg-brand-navy px-6 text-center">
          <div className="relative z-10 mx-auto max-w-3xl">
            <h1 className="font-display text-hero tracking-tight text-white">
              The Academy:{" "}
              <span className="italic text-brand-accent">
                logistics and freight forwarding courses.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/70">
              Live webinars, micro-learnings, e-learning modules and immersive training
              programmes for freight forwarders and supply chain teams.
            </p>
            <div className="mt-10">
              <Link
                href="#catalogue"
                aria-label="Browse the catalogue"
                className="group inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-lg text-brand-navy hover:bg-white/90"
              >
                <span className="inline-block transition-transform group-hover:translate-y-1">
                  ↓
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Filtered catalogue — one grid, one heading, no repeated sections */}
        <section id="catalogue" className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div data-reveal>
              <h2 className="font-display text-2xl text-brand-navy">Browse the catalogue</h2>
              <p className="mt-3 max-w-xl text-slate-600">
                Filter by format to find what fits how you work.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-b border-slate-200 text-sm font-semibold">
              {FILTERS.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  aria-pressed={activeFilter === filter.key}
                  className={`-mb-px border-b-2 pb-3 transition-colors ${
                    activeFilter === filter.key
                      ? "border-brand-navy text-brand-navy"
                      : "border-transparent text-slate-400 hover:text-brand-navy"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProgrammes.map((item) =>
                item.kind === "static" ? (
                  <ProgrammeCard key={item.href} {...item} />
                ) : (
                  <CourseCard key={item.course.id} course={item.course} />
                )
              )}
            </div>
          </div>
        </section>

        {/* Upcoming courses — kept current by whoever owns the catalogue */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy" data-reveal>
              Upcoming courses
            </h2>
            <div
              className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200"
              data-reveal-group
            >
              {visibleUpcomingCourses.map((course) => (
                <details key={course.title} className="group px-8 py-6" data-reveal-item>
                  <summary className="flex cursor-pointer list-none flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-display text-lg text-brand-navy">{course.title}</span>
                    <span className="flex items-center gap-4">
                      <span className="text-sm text-slate-500">{course.meta}</span>
                      <span
                        aria-hidden="true"
                        className="flex-none text-2xl font-normal text-brand-navy/40 transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </span>
                  </summary>

                  <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">
                    {course.description}
                  </p>
                  <p className="mt-4 text-sm font-medium text-slate-500">{course.details}</p>
                  <Link
                    href={course.href}
                    className="group/explore mt-6 mb-2 inline-flex items-center text-sm font-semibold text-brand-navy hover:underline"
                  >
                    Explore{" "}
                    <span className="ml-1 inline-block transition-transform group-hover/explore:translate-x-1">
                      →
                    </span>
                  </Link>
                </details>
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
          <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8" data-reveal>
            <p className="font-display text-2xl text-brand-navy">
              Empowering global partner networks.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {PARTNER_NETWORKS.map((network) => (
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

            <div className="mt-10">
              <Link
                href="#catalogue"
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

export async function getStaticProps() {
  const courses = await getCourses();
  const pageVisibility = await getStaticPageVisibility();
  return { props: { courses, pageVisibility }, revalidate: 60 };
}
