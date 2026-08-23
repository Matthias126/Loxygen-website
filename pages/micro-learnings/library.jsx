import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getTopicsWithCourses } from "@/lib/topics";
import { getMicroLearningsAccess } from "@/lib/licenses";
import { supabaseAdmin } from "@/lib/supabase";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import TopicCarousel from "@/components/TopicCarousel";

const TITLE = "Micro-learnings Library | Loxygen Academy";
const DESCRIPTION = "Browse micro-learning modules by topic.";

export default function MicroLearningsLibrary({ topics, ownedCourseIds }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${SITE_URL}/micro-learnings/library`} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pt-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">
              Micro-learnings{" "}
              <span className="italic text-brand-accent">library.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Bite-sized modules, browsable by topic. Pick one up any time.
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl space-y-16 px-6 py-16 lg:px-8">
            {topics.length > 0 ? (
              topics.map((topic) => (
                <TopicCarousel key={topic.id} topic={topic} ownedCourseIds={ownedCourseIds} />
              ))
            ) : (
              <p className="text-base leading-7 text-slate-600">
                No micro-learning modules are available yet. Check back soon.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const topics = await getTopicsWithCourses();
  const session = await getServerSession(req, res, authOptions);

  let ownedCourseIds = [];
  if (session?.user?.id) {
    const hasFullAccess =
      session.user.isAdmin || (await getMicroLearningsAccess(session.user.id));

    if (hasFullAccess) {
      ownedCourseIds = topics.flatMap((topic) => topic.courses.map((course) => course.id));
    } else {
      const { data } = await supabaseAdmin
        .from("purchases")
        .select("course_id")
        .eq("user_id", session.user.id);
      ownedCourseIds = (data ?? []).map((purchase) => purchase.course_id);
    }
  }

  return { props: { topics, ownedCourseIds } };
}
