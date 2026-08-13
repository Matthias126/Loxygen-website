import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getCourses } from "@/lib/courses";
import { isStaticPageActive } from "@/lib/staticPages";
import { supabaseAdmin } from "@/lib/supabase";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { HELP_FAQ } from "@/lib/structuredData";
import CourseCard from "@/components/CourseCard";
import CheckIcon from "@/components/CheckIcon";

const TITLE = "E-learning | Loxygen Academy";
const DESCRIPTION =
  "On-demand e-learning courses covering trade compliance, documentation and freight operations. Purchase individually, sign in any time to pick up where you left off.";

const OUTCOMES = [
  "Standalone courses covering trade compliance, documentation and freight operations",
  "Self-paced: no fixed schedule, work through a course whenever it suits you",
  "Purchased courses are tied to your account, so they're there whenever you sign back in",
  "New courses added by the Academy team over time",
];

const ELEARNING_FAQ = HELP_FAQ.filter((item) =>
  ["How do I create an account?", "Where do I find my e-learning courses after I've bought them?"].includes(
    item.question
  )
);

export default function ELearning({ courses, ownedCourseIds, isSignedIn }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ELEARNING_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/e-learning`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/e-learning`} />
        <meta property="og:image" content={`${SITE_URL}/images/e-learning.jpg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/images/e-learning.jpg`} />

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
                E-learning:{" "}
                <span className="italic text-brand-accent">on-demand courses.</span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                {courses.length > 0
                  ? `${courses.length} course${courses.length === 1 ? "" : "s"} covering trade compliance, documentation and freight operations, at your own pace.`
                  : "Trade compliance, documentation and freight operations, at your own pace."}
              </p>

              {!isSignedIn ? (
                <p className="mt-4 text-sm text-slate-500">
                  Already purchased a course?{" "}
                  <Link
                    href="/login?callbackUrl=%2Fe-learning"
                    className="font-semibold text-brand-navy hover:underline"
                  >
                    Sign in
                  </Link>{" "}
                  to pick up where you left off.
                </p>
              ) : null}
            </div>

            <div className="relative mt-12 aspect-[21/9] w-full overflow-hidden rounded-3xl">
              <Image
                src="/images/e-learning.jpg"
                alt="Rows of stacked tank containers at a logistics storage yard"
                fill
                sizes="(min-width: 1024px) 1152px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">What&apos;s included</h2>
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

        {/* Course catalogue */}
        <section id="catalogue" className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">Browse courses</h2>

            {courses.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isOwned={ownedCourseIds.includes(course.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-10 text-base leading-7 text-slate-600">
                No e-learning courses are available yet. Check back soon.
              </p>
            )}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
            <div className="bg-grain rounded-3xl bg-brand-navy px-6 py-20 text-center">
              <p className="font-display text-banner tracking-tight text-white">
                Ready to start learning?
              </p>
              <p className="mx-auto mt-4 max-w-md text-white/70">
                Pick a course above, or sign in to pick up where you left off.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="#catalogue"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-navy hover:bg-white/90"
                >
                  Browse courses
                </Link>
                {isSignedIn ? (
                  <Link
                    href="/account"
                    className="inline-flex items-center justify-center rounded-lg border border-white px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10"
                  >
                    My account
                  </Link>
                ) : (
                  <Link
                    href="/login?callbackUrl=%2Fe-learning"
                    className="inline-flex items-center justify-center rounded-lg border border-white px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-6 pb-24 lg:px-8">
            <h2 className="font-display text-2xl text-brand-navy">
              Frequently asked questions
            </h2>
            <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200">
              {ELEARNING_FAQ.map((item) => (
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
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const isActive = await isStaticPageActive("e-learning");
  if (!isActive) return { notFound: true };

  const session = await getServerSession(context.req, context.res, authOptions);
  const courses = await getCourses({ type: "e-learning" });

  let ownedCourseIds = [];
  if (session?.user?.id) {
    const { data } = await supabaseAdmin
      .from("purchases")
      .select("course_id")
      .eq("user_id", session.user.id);
    ownedCourseIds = (data ?? []).map((purchase) => purchase.course_id);
  }

  return { props: { courses, ownedCourseIds, isSignedIn: Boolean(session) } };
}
