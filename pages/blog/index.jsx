import Head from "next/head";
import { useRouter } from "next/router";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getBlogPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import CategoryFilter from "@/components/CategoryFilter";

const TITLE = "Blog | Loxygen Academy";
const DESCRIPTION =
  "Practical insights on breakbulk, sustainability, AI and learning in freight forwarding, from the Loxygen Academy team.";

export default function Blog({ posts }) {
  const router = useRouter();
  const activeCategory =
    typeof router.query.blogcategory === "string" ? router.query.blogcategory : null;

  const visiblePosts = activeCategory
    ? posts.filter((post) => post.category === activeCategory)
    : posts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: TITLE,
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/blog`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
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
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-display text-heading tracking-tight text-brand-navy">
                Insights for{" "}
                <span className="italic text-brand-accent">freight forwarding teams.</span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Practical writing on breakbulk, sustainability, technology and learning, from
                the Loxygen Academy team.
              </p>
            </div>

            <div className="mt-12">
              <CategoryFilter posts={posts} activeCategory={activeCategory} />
            </div>

            {visiblePosts.length > 0 ? (
              <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {visiblePosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <p className="mt-12 text-base leading-7 text-slate-600">
                No posts in this category yet. Check back soon.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts: await getBlogPosts(),
    },
    revalidate: 60,
  };
}
