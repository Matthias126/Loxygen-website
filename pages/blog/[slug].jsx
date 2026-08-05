import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog";
import { buildBlogPostJsonLd } from "@/lib/structuredData";
import PlaceholderImage from "@/components/PlaceholderImage";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPost({ post }) {
  const title = `${post.title} | Loxygen Academy`;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = buildBlogPostJsonLd(post);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={post.excerpt} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
            <Link href="/blog" className="text-sm font-semibold text-brand-navy hover:underline">
              ← Back to blog
            </Link>

            <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {post.category} · {formatDate(post.publishedAt)}
            </p>
            <h1 className="font-display mt-4 text-heading tracking-tight text-brand-navy">
              {post.title}
            </h1>

            {post.coverImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- external Supabase Storage URL, no next/image domain config for this demo pass
              <img
                src={post.coverImageUrl}
                alt=""
                className="mt-10 aspect-[21/9] w-full rounded-xl object-cover"
              />
            ) : (
              <PlaceholderImage
                label={post.category}
                className="mt-10 aspect-[21/9] w-full"
              />
            )}

            <div className="prose prose-slate mt-10 max-w-none prose-headings:font-display prose-headings:text-brand-navy prose-p:text-lg prose-p:leading-8 prose-p:text-slate-600 prose-a:text-brand-navy">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = await getAllBlogSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    // "blocking" so posts added later via the admin panel get a page on
    // first request instead of 404ing until the next full rebuild.
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return { notFound: true };
  }

  return { props: { post }, revalidate: 60 };
}
