import Head from "next/head";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getCourseBySlug } from "@/lib/courses";
import { getMicroLearningsAccess } from "@/lib/licenses";
import { COURSE_TYPE_TO_CATEGORY } from "@/lib/courseTypes";
import { buildCourseDetailJsonLd } from "@/lib/structuredData";
import { supabaseAdmin } from "@/lib/supabase";
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
  const jsonLd = buildCourseDetailJsonLd(course, url);
  const ogImage = course.cover_image_url || DEFAULT_OG_IMAGE;

  return (
    <>
      <Head>
        <title>{title}</title>
        {course.description ? <meta name="description" content={course.description} /> : null}
        <link rel="canonical" href={url} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={title} />
        {course.description ? (
          <meta property="og:description" content={course.description} />
        ) : null}
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        {course.description ? (
          <meta name="twitter:description" content={course.description} />
        ) : null}
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main>
        {course.jollydeck_url ? (
          <section className="bg-white">
            <div className="mx-auto max-w-[1800px] px-4 pt-6 lg:px-6">
              <Link
                href="/the-academy"
                className="text-sm font-semibold text-brand-navy hover:underline"
              >
                ← Back to the Academy
              </Link>
              <h1 className="font-display mt-2 text-xl text-brand-navy lg:text-2xl">
                {course.title}
              </h1>

              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                <iframe
                  src={course.jollydeck_url}
                  className="h-[calc(100vh-180px)] w-full"
                  allow="fullscreen"
                  loading="lazy"
                  title={course.title}
                />
              </div>
            </div>
          </section>
        ) : (
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

              <>
                {course.cover_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element -- external Supabase Storage URL, no next/image domain config for this demo pass
                  <img
                    src={course.cover_image_url}
                    alt={course.title}
                    className="mt-10 aspect-[21/9] w-full rounded-xl object-cover"
                  />
                ) : (
                  <PlaceholderImage label={course.type} className="mt-10 aspect-[21/9] w-full" />
                )}

                {course.description ? (
                  <p className="mt-10 text-lg leading-8 text-slate-600">{course.description}</p>
                ) : null}

                {course.tiers?.length > 0 ? (
                  <div className="mt-12 max-w-md divide-y divide-slate-200 rounded-xl border border-slate-200">
                    {course.tiers.map((tier) => (
                      <div
                        key={tier.id ?? tier.label}
                        className="flex items-baseline justify-between gap-4 px-6 py-4"
                      >
                        <span className="text-base font-medium text-brand-navy">
                          {tier.label}
                        </span>
                        <span className="flex items-baseline gap-2">
                          <span className="font-display text-xl text-brand-navy">
                            €{tier.price}
                          </span>
                          {tier.price_note ? (
                            <span className="text-sm text-slate-500">{tier.price_note}</span>
                          ) : null}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  {!course.tiers?.length && course.price ? (
                    <span className="flex items-baseline gap-2">
                      <span className="font-display text-2xl text-brand-navy">
                        €{course.price}
                      </span>
                      {course.price_note ? (
                        <span className="text-sm text-slate-500">{course.price_note}</span>
                      ) : null}
                    </span>
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

                {course.registration_deadline || course.available_at ? (
                  <div className="mt-8 rounded-2xl bg-brand-light px-6 py-10">
                    <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Time left to sign up
                    </p>
                    <CountdownTimer
                      targetDate={course.registration_deadline || course.available_at}
                      variant="light"
                      expiredLabel={
                        course.registration_deadline ? "Registration closed" : "Happening now"
                      }
                    />
                  </div>
                ) : null}
              </>
          </div>
        </section>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps({ params, req, res }) {
  const course = await getCourseBySlug(params.slug);

  if (!course || !course.is_active) {
    return { notFound: true };
  }

  const session = await getServerSession(req, res, authOptions);

  let isOwned = Boolean(session?.user?.isAdmin);
  if (!isOwned && session?.user?.id) {
    const { data } = await supabaseAdmin
      .from("purchases")
      .select("course_id")
      .eq("user_id", session.user.id)
      .eq("course_id", course.id)
      .maybeSingle();
    isOwned = Boolean(data);
  }
  if (!isOwned && session?.user?.id && course.type === "micro-learning") {
    isOwned = await getMicroLearningsAccess(session.user.id);
  }

  // jollydeck_url must never reach the browser for anyone who isn't a
  // verified purchaser (or an admin) — strip it before it's serialized into
  // page props.
  if (!isOwned) {
    delete course.jollydeck_url;
  }

  return { props: { course } };
}
