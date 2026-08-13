import Head from "next/head";
import Link from "next/link";
import { getTopicsWithCourses } from "@/lib/topics";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";
import TopicCarousel from "@/components/TopicCarousel";

const TITLE = "What's Included | Micro-learnings | Loxygen Academy";
const DESCRIPTION =
  "See what's included in the Loxygen Academy micro-learnings subscription, browsable by topic.";

export default function MicroLearningsPreview({ topics }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/micro-learnings/preview`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/micro-learnings/preview`} />
        <meta property="og:image" content={`${SITE_URL}/images/micro-learnings.jpg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/images/micro-learnings.jpg`} />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 pt-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">
              What&apos;s{" "}
              <span className="italic text-brand-accent">included.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              A preview of the modules included in the micro-learnings subscription, by topic.
            </p>
            <Link
              href="/micro-learnings"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-brand-navy px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-navy/90"
            >
              Subscribe to unlock
            </Link>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl space-y-16 px-6 py-16 lg:px-8">
            {topics.length > 0 ? (
              topics.map((topic) => (
                <TopicCarousel key={topic.id} topic={topic} disabled />
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

export async function getStaticProps() {
  const topics = await getTopicsWithCourses();
  return { props: { topics }, revalidate: 60 };
}
