import { useMemo, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { buildAcademyJsonLd, buildUpcomingCoursesJsonLd } from "@/lib/structuredData";
import { getCourses, getUpcomingCourses } from "@/lib/courses";
import { COURSE_TYPE_TO_CATEGORY } from "@/lib/courseTypes";
import { getStaticPageVisibility } from "@/lib/staticPages";
import ProgrammeCard from "@/components/ProgrammeCard";
import CourseCard from "@/components/CourseCard";
import TestimonialSection from "@/components/TestimonialSection";
import MarkdownContent from "@/components/MarkdownContent";

const TITLE = "Freight Forwarding & Logistics Courses | Loxygen Academy";
const DESCRIPTION =
  "Explore Loxygen Academy courses: breakbulk, BESS logistics, international trade, sustainable forwarding, e-learning, micro-learnings and immersive learning trips.";

const FILTERS = [
  { key: "all", label: "All formats" },
  { key: "immersive", label: "Immersive" },
  { key: "self-paced", label: "Self-paced" },
  { key: "sustainability", label: "Sustainability" },
  { key: "upcoming", label: "Upcoming" },
];

const ALL_PROGRAMMES = [
  {
    category: "immersive",
    href: "/young-forwarders-benelux",
    format: "Immersive programme",
    title: "Young Forwarders Benelux",
    description:
      "A European Ports Immersion Week for the next generation of Benelux freight forwarders.",
    image: "/images/benelux-port-visit.jpg",
    imageAlt:
      "Freight forwarders touring a container terminal during the Young Forwarders Benelux immersion week",
  },
  {
    category: "immersive",
    href: "/africa-roadtrip-2026",
    format: "Immersive programme · 2026",
    title: "Africa Roadtrip 2026",
    description: "An immersive road trip through Africa's key logistics corridors.",
    image: "/images/africa_tour2026.png",
    imageAlt: "A Terex mobile harbour crane and dockworkers at a Marsa Maroc port terminal in Morocco",
  },
  {
    category: "scheduled",
    href: "/breakbulk-training",
    format: "Webinar series",
    title: "Breakbulk Training",
    description: "Webinars on planning and executing breakbulk and project cargo movements.",
    image: "/images/breakbulk-cargo.jpg",
    imageAlt: "A heavy-lift transformer being loaded onto a vessel during a breakbulk operation",
  },
  {
    category: "scheduled",
    href: "/bess-logistics-training",
    format: "Specialist course",
    title: "BESS Logistics Training",
    description:
      "Transport, safety and compliance training for battery energy storage system logistics.",
    image: "/images/BESS.jpg",
    imageAlt: "Battery energy storage system containers staged at a logistics yard",
  },
  {
    category: "self-paced",
    href: "/e-learning",
    format: "E-learning · Sign in required",
    title: "E-learning",
    description:
      "On-demand courses covering trade compliance, documentation and freight operations.",
    image: "/images/e-learning.jpg",
    imageAlt: "Rows of stacked tank containers at a logistics storage yard",
  },
  {
    category: "self-paced",
    href: "/micro-learnings",
    format: "Subscription · €190/year",
    title: "Micro-learnings",
    description:
      "Bite-sized lessons delivered year-round, for teams that learn in the flow of work.",
    image: "/images/micro-learnings.jpg",
    imageAlt: "A Loxygen guide pointing out port infrastructure to a group on a dockside walkway",
  },
  {
    category: "sustainability",
    href: "/sustainable-forwarding",
    format: "Award & recognition",
    title: "Sustainability Award",
    description:
      "Recognising freight forwarders' environmental, social and governance initiatives — four categories, judged by an independent jury.",
    image: "/images/sustainability-award.jpg",
    imageAlt: "Offshore wind turbines along a coastal energy transition site",
  },
];

const TYPE_LABEL = {
  "e-learning": "E-learning",
  webinar: "Webinar",
  "micro-learning": "Micro-learning",
  immersive: "Immersive programme",
};

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const PARTNER_NETWORKS = [
  {
    name: "CrossTrades",
    logo: "/images/crosstrades-logo-white.png",
    width: 1107,
    height: 483,
    boxBg: "bg-[#2764DD]",
    url: "https://crosstradesnetwork.com",
  },
  {
    name: "SeaBlue Project Logistics Network",
    logo: "/images/seablue-logo-white.png",
    width: 1000,
    height: 510,
    boxBg: "bg-[#394F78]",
    url: "https://seabluenetwork.com",
  },
  {
    name: "Flyte",
    logo: "/images/flyte-weblogo.svg",
    width: 264,
    height: 135,
    boxBg: "bg-[#FFBA00]",
    url: "https://flyte.network",
  },
];

export default function TheAcademy({ courses, upcomingCourses, pageVisibility }) {
  const jsonLd = [buildAcademyJsonLd(), buildUpcomingCoursesJsonLd(upcomingCourses)];
  const [activeFilter, setActiveFilter] = useState("all");

  const catalogueItems = useMemo(() => {
    const staticItems = ALL_PROGRAMMES.filter(
      (programme) => pageVisibility[programme.href.slice(1)] !== false
    ).map((programme) => ({ kind: "static", ...programme }));
    const liveItems = courses
      .filter(
        (course) => COURSE_TYPE_TO_CATEGORY[course.type] && course.type !== "micro-learning"
      )
      .map((course) => ({
        kind: "live",
        category: COURSE_TYPE_TO_CATEGORY[course.type],
        course,
      }));
    return [...staticItems, ...liveItems];
  }, [courses, pageVisibility]);

  const upcomingCatalogueItems = useMemo(
    () => upcomingCourses.map((course) => ({ kind: "live", category: "upcoming", course })),
    [upcomingCourses]
  );

  const filteredProgrammes = useMemo(() => {
    if (activeFilter === "upcoming") return upcomingCatalogueItems;
    if (activeFilter === "all") return catalogueItems;
    return catalogueItems.filter((item) => item.category === activeFilter);
  }, [catalogueItems, upcomingCatalogueItems, activeFilter]);

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
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

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
                  <CourseCard
                    key={item.course.id}
                    course={item.course}
                    hidePrice
                    ctaLabel="Explore"
                  />
                )
              )}
            </div>
          </div>
        </section>

        {/* Upcoming courses — live from Supabase, managed in /admin/courses */}
        {upcomingCourses.length > 0 ? (
          <section className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
              <h2 className="font-display text-2xl text-brand-navy" data-reveal>
                Upcoming courses
              </h2>
              <div
                className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200"
                data-reveal-group
              >
                {upcomingCourses.map((course) => {
                  const meta = [
                    TYPE_LABEL[course.type] ?? course.type,
                    course.available_at ? formatDate(course.available_at) : null,
                  ]
                    .filter(Boolean)
                    .join(" · ");

                  return (
                    <details key={course.id} className="group px-8 py-6" data-reveal-item>
                      <summary className="flex cursor-pointer list-none flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <span className="font-display text-lg text-brand-navy">
                          {course.title}
                        </span>
                        <span className="flex items-center gap-4">
                          <span className="text-sm text-slate-500">{meta}</span>
                          <span
                            aria-hidden="true"
                            className="flex-none text-2xl font-normal text-brand-navy/40 transition-transform group-open:rotate-45"
                          >
                            +
                          </span>
                        </span>
                      </summary>

                      {course.description ? (
                        <div className="prose prose-slate mt-6 max-w-2xl prose-headings:font-display prose-headings:text-brand-navy prose-h2:text-[40px] prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-base prose-p:leading-7 prose-p:text-slate-600 prose-a:text-brand-navy">
                          <MarkdownContent content={course.description} />
                        </div>
                      ) : null}
                      <Link
                        href={`/courses/${course.slug}`}
                        className="group/explore mt-6 mb-2 inline-flex items-center text-sm font-semibold text-brand-navy hover:underline"
                      >
                        Explore{" "}
                        <span className="ml-1 inline-block transition-transform group-hover/explore:translate-x-1">
                          →
                        </span>
                      </Link>
                    </details>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

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

            <div className="mt-10 flex flex-wrap items-center justify-center gap-10">
              {PARTNER_NETWORKS.map((network) => (
                <a
                  key={network.name}
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={network.name}
                  className={`flex h-24 w-44 items-center justify-center rounded-lg px-6 transition-opacity hover:opacity-90 ${network.boxBg}`}
                >
                  <Image
                    src={network.logo}
                    alt={network.name}
                    width={network.width}
                    height={network.height}
                    className="h-14 w-auto max-w-full object-contain"
                  />
                </a>
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
  const [courses, upcomingCourses, pageVisibility] = await Promise.all([
    getCourses(),
    getUpcomingCourses(),
    getStaticPageVisibility(),
  ]);
  return { props: { courses, upcomingCourses, pageVisibility }, revalidate: 60 };
}
