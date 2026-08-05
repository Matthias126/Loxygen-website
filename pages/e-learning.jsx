import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getCourses } from "@/lib/courses";
import { isStaticPageActive } from "@/lib/staticPages";
import { supabaseAdmin } from "@/lib/supabase";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import CourseCard from "@/components/CourseCard";

const TITLE = "E-learning | Loxygen Academy";
const DESCRIPTION =
  "On-demand e-learning courses covering trade compliance, documentation and freight operations.";

export default function ELearning({ courses, ownedCourseIds }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/e-learning`} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-display text-heading tracking-tight text-brand-navy">
                E-learning:{" "}
                <span className="italic text-brand-accent">on-demand courses.</span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Trade compliance, documentation and freight operations, at your own pace.
              </p>
            </div>

            {courses.length > 0 ? (
              <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isOwned={ownedCourseIds.includes(course.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-16 text-base leading-7 text-slate-600">
                No e-learning courses are available yet. Check back soon.
              </p>
            )}
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

  return { props: { courses, ownedCourseIds } };
}
