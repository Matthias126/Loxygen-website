import Head from "next/head";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

const TITLE = "My Account | Loxygen Academy";
const DESCRIPTION = "Your Loxygen Academy account and purchased courses.";

export default function Account({ email, purchases, hasMicroLearningsAccess }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${SITE_URL}/account`} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">
              My{" "}
              <span className="italic text-brand-accent">account.</span>
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">Signed in as {email}</p>

            <h2 className="font-display mt-16 text-2xl text-brand-navy">Your courses</h2>

            {purchases.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {purchases.map((purchase) => (
                  <div key={purchase.courseId} className="rounded-xl bg-white p-8 shadow-card">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {purchase.type}
                    </span>
                    <h3 className="font-display mt-4 text-xl text-brand-navy">
                      {purchase.title}
                    </h3>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-base leading-7 text-slate-600">
                You haven&apos;t purchased any courses yet. Browse{" "}
                <Link href="/e-learning" className="font-semibold text-brand-navy hover:underline">
                  e-learning courses
                </Link>
                .
              </p>
            )}

            <h2 className="font-display mt-16 text-2xl text-brand-navy">Micro-learnings</h2>

            {hasMicroLearningsAccess ? (
              <div className="mt-8 flex items-center justify-between gap-6 rounded-xl bg-white p-8 shadow-card">
                <p className="text-base leading-7 text-slate-600">
                  Browse bite-sized modules by topic.
                </p>
                <Link
                  href="/micro-learnings/library"
                  className="flex-none rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy/90"
                >
                  Go to library
                </Link>
              </div>
            ) : (
              <p className="mt-6 text-base leading-7 text-slate-600">
                You haven&apos;t purchased any courses yet. Browse{" "}
                <Link
                  href="/micro-learnings"
                  className="font-semibold text-brand-navy hover:underline"
                >
                  micro-learnings
                </Link>
                .
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const { data } = await supabaseAdmin
    .from("purchases")
    .select("purchased_at, courses(id, title, type)")
    .eq("user_id", session.user.id)
    .order("purchased_at", { ascending: false });

  const purchases = (data ?? [])
    .filter((purchase) => purchase.courses && purchase.courses.type === "e-learning")
    .map((purchase) => ({
      courseId: purchase.courses.id,
      title: purchase.courses.title,
      type: purchase.courses.type,
    }));

  // No micro-learnings subscription/checkout exists yet, so admin bypass is
  // the only real "has access" signal right now — swap this for a real
  // subscription check once that's built.
  const hasMicroLearningsAccess = Boolean(session.user.isAdmin);

  return { props: { email: session.user.email, purchases, hasMicroLearningsAccess } };
}
