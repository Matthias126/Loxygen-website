import Head from "next/head";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { getCourses, getCourseBySlug } from "@/lib/courses";
import { COURSE_TYPE_TO_CATEGORY } from "@/lib/courseTypes";
import PlaceholderImage from "@/components/PlaceholderImage";
import CountdownTimer from "@/components/CountdownTimer";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const CTA_LABEL = {
  "self-paced": "Start learning",
  scheduled: "Reserve your seat",
  immersive: "Apply now",
};

const TEMPLATE_NOTE = {
  "self-paced": "Self-paced. Start anytime.",
  scheduled: null,
  immersive: "Limited spots. Applications reviewed on a rolling basis.",
};

export default function CourseDetail({ course }) {
  const template = COURSE_TYPE_TO_CATEGORY[course.type] ?? "self-paced";
  const title = `${course.title} | Loxygen Academy`;
  const url = `${SITE_URL}/courses/${course.slug}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        {course.description ? <meta name="description" content={course.description} /> : null}
        <link rel="canonical" href={url} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
            <Link
              href="/the-academy"
              className="text-sm font-semibold text-brand-navy hover:underline"
            >
              ← Back to the Academy
            </Link>

            <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {course.type}
              {course.available_at ? ` · ${formatDate(course.available_at)}` : ""}
            </p>
            <h1 className="font-display mt-4 text-heading tracking-tight text-brand-navy">
              {course.title}
            </h1>

            {course.cover_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element -- external Supabase Storage URL, no next/image domain config for this demo pass
              <img
                src={course.cover_image_url}
                alt=""
                className="mt-10 aspect-[21/9] w-full rounded-xl object-cover"
              />
            ) : (
              <PlaceholderImage label={course.type} className="mt-10 aspect-[21/9] w-full" />
            )}

            {template === "scheduled" && course.available_at ? (
              <div className="mt-12 rounded-2xl bg-brand-light px-6 py-10">
                <CountdownTimer
                  targetDate={course.available_at}
                  variant="light"
                  expiredLabel="Happening now"
                />
              </div>
            ) : null}

            {course.description ? (
              <p className="mt-10 text-lg leading-8 text-slate-600">{course.description}</p>
            ) : null}

            <div className="mt-12 flex flex-wrap items-center gap-6">
              {course.price ? (
                <span className="font-display text-2xl text-brand-navy">€{course.price}</span>
              ) : null}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-navy/90"
              >
                {CTA_LABEL[template]}
              </Link>
            </div>

            {TEMPLATE_NOTE[template] ? (
              <p className="mt-4 text-sm text-slate-500">{TEMPLATE_NOTE[template]}</p>
            ) : null}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const courses = await getCourses();
  return {
    paths: courses.map((course) => ({ params: { slug: course.slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const course = await getCourseBySlug(params.slug);

  if (!course || !course.is_active) {
    return { notFound: true };
  }

  return { props: { course }, revalidate: 60 };
}
