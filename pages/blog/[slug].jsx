import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getAllBlogSlugs, getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { buildBlogPostJsonLd } from "@/lib/structuredData";
import { extractHeadings } from "@/lib/headings";
import PlaceholderImage from "@/components/PlaceholderImage";
import MarkdownContent from "@/components/MarkdownContent";
import ShareRow from "@/components/ShareRow";
import TableOfContents from "@/components/blog/TableOfContents";
import RelatedPosts from "@/components/blog/RelatedPosts";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPost({ post, nextPost, relatedPosts }) {
  const title = `${post.title} | Loxygen Academy`;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = buildBlogPostJsonLd(post);
  const ogImage = post.coverImageUrl || DEFAULT_OG_IMAGE;
  const headings = extractHeadings(post.content);

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
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
            <Link href="/blog" className="text-sm font-semibold text-brand-navy hover:underline">
              ← Back to blog
            </Link>

            <div className="mt-8 lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {post.category} · {formatDate(post.publishedAt)}
                </p>
                <h1 className="font-display mt-4 text-heading tracking-tight text-brand-navy">
                  {post.title}
                </h1>

                {post.coverImageUrl ? (
                  <div className="relative mt-10 aspect-[21/9] w-full overflow-hidden rounded-xl">
                    <Image
                      src={post.coverImageUrl}
                      alt={post.coverImageAlt || post.title}
                      fill
                      sizes="(min-width: 1024px) 800px, 100vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : (
                  <PlaceholderImage
                    label={post.category}
                    className="mt-10 aspect-[21/9] w-full"
                  />
                )}

                <div className="prose prose-slate mt-10 max-w-none prose-headings:font-display prose-headings:text-brand-navy prose-p:text-lg prose-p:leading-8 prose-p:text-slate-600 prose-a:text-brand-navy">
                  <MarkdownContent content={post.content} />
                </div>

                <div className="mt-12 border-t border-slate-200 pt-8">
                  <ShareRow title={post.title} url={url} />
                </div>

                {nextPost ? (
                  <div className="mt-8 border-t border-slate-200 pt-8">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Next article
                    </p>
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className="group mt-2 inline-flex items-center gap-2 font-display text-xl text-brand-navy hover:underline"
                    >
                      {nextPost.title}
                      <span className="inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                ) : null}
              </div>

              <aside className="mt-12 space-y-6 lg:mt-0">
                <TableOfContents headings={headings} />
                <RelatedPosts posts={relatedPosts} />
              </aside>
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

  // Trim to what the "next article" link and related-posts cards actually
  // render — no need to ship every other post's full content in the payload.
  const toPreview = (p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    coverImageUrl: p.coverImageUrl,
    coverImageAlt: p.coverImageAlt,
  });

  const allPosts = await getBlogPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const nextPostFull = currentIndex >= 0 ? allPosts[currentIndex + 1] ?? null : null;
  const nextPost = nextPostFull ? toPreview(nextPostFull) : null;

  const others = allPosts.filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const relatedPosts = [
    ...sameCategory,
    ...others.filter((p) => !sameCategory.includes(p)),
  ]
    .slice(0, 3)
    .map(toPreview);

  return { props: { post, nextPost, relatedPosts }, revalidate: 60 };
}
